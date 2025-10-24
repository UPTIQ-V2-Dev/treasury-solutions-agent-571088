import app from "../app.js";
import { reportService } from "../services/index.js";
import httpStatus from 'http-status';
import { Readable } from 'stream';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
// Mock the report service
vi.mock('../services/index.ts', () => ({
    reportService: {
        generateReport: vi.fn(),
        getReportById: vi.fn(),
        getReportDownloadStream: vi.fn(),
        queryReports: vi.fn(),
        deleteReportById: vi.fn(),
        getTemplates: vi.fn()
    }
}));
// Mock auth middleware
vi.mock('../middlewares/auth.ts', () => ({
    auth: () => (req, res, next) => {
        req.user = { id: 1, email: 'test@example.com' };
        next();
    }
}));
const mockReport = {
    id: 'report123',
    title: 'Test Report',
    analysisId: 'analysis123',
    clientId: 'client123',
    format: 'PDF',
    template: 'comprehensive-treasury-report',
    createdBy: '1',
    status: 'completed',
    createdAt: new Date(),
    fileSize: 1024,
    downloadCount: 0,
    filePath: 'reports/test-report.pdf'
};
const mockReportsResponse = {
    reports: [mockReport],
    totalCount: 1,
    page: 1,
    totalPages: 1
};
const mockTemplates = [
    {
        id: 'comprehensive-treasury-report',
        name: 'Comprehensive Treasury Analysis Report',
        description: 'Complete treasury analysis',
        format: 'PDF',
        sections: [],
        isActive: true
    }
];
describe('Report Controller', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    describe('POST /reports/generate', () => {
        it('should generate a report successfully', async () => {
            reportService.generateReport.mockResolvedValue(mockReport);
            const reportData = {
                analysisId: 'analysis123',
                templateId: 'comprehensive-treasury-report',
                format: 'PDF',
                title: 'Test Report'
            };
            const response = await request(app)
                .post('/v1/reports/generate')
                .send(reportData)
                .expect(httpStatus.CREATED);
            expect(response.body).toEqual(mockReport);
            expect(reportService.generateReport).toHaveBeenCalledWith({
                analysisId: 'analysis123',
                templateId: 'comprehensive-treasury-report',
                format: 'PDF',
                title: 'Test Report',
                sections: undefined,
                createdBy: '1'
            });
        });
        it('should handle validation errors', async () => {
            const response = await request(app).post('/v1/reports/generate').send({}).expect(httpStatus.BAD_REQUEST);
            expect(response.body).toHaveProperty('message');
        });
        it('should handle service errors', async () => {
            reportService.generateReport.mockRejectedValue(new Error('Service error'));
            const reportData = {
                analysisId: 'analysis123'
            };
            const response = await request(app)
                .post('/v1/reports/generate')
                .send(reportData)
                .expect(httpStatus.INTERNAL_SERVER_ERROR);
            expect(response.body).toHaveProperty('message');
        });
        it('should validate template ID', async () => {
            const reportData = {
                analysisId: 'analysis123',
                templateId: 'invalid-template'
            };
            const response = await request(app)
                .post('/v1/reports/generate')
                .send(reportData)
                .expect(httpStatus.BAD_REQUEST);
            expect(response.body).toHaveProperty('message');
        });
        it('should validate format', async () => {
            const reportData = {
                analysisId: 'analysis123',
                format: 'INVALID'
            };
            const response = await request(app)
                .post('/v1/reports/generate')
                .send(reportData)
                .expect(httpStatus.BAD_REQUEST);
            expect(response.body).toHaveProperty('message');
        });
    });
    describe('GET /reports/:reportId', () => {
        it('should get report by ID successfully', async () => {
            reportService.getReportById.mockResolvedValue(mockReport);
            const response = await request(app).get('/v1/reports/report123').expect(httpStatus.OK);
            expect(response.body).toEqual(mockReport);
            expect(reportService.getReportById).toHaveBeenCalledWith('report123');
        });
        it('should return 404 when report not found', async () => {
            reportService.getReportById.mockResolvedValue(null);
            const response = await request(app).get('/v1/reports/nonexistent').expect(httpStatus.NOT_FOUND);
            expect(response.body).toHaveProperty('message', 'Report not found');
        });
    });
    describe('GET /reports/download/:reportId', () => {
        it('should download report successfully', async () => {
            const mockStream = new Readable({
                read() {
                    this.push('mock file content');
                    this.push(null);
                }
            });
            reportService.getReportDownloadStream.mockResolvedValue({
                stream: mockStream,
                filename: 'test-report.pdf',
                contentType: 'application/pdf',
                size: 1024
            });
            const response = await request(app).get('/v1/reports/download/report123').expect(httpStatus.OK);
            expect(response.headers['content-type']).toBe('application/pdf');
            expect(response.headers['content-disposition']).toBe('attachment; filename="test-report.pdf"');
            expect(response.headers['content-length']).toBe('1024');
        });
        it('should handle service errors during download', async () => {
            reportService.getReportDownloadStream.mockRejectedValue(new Error('File not found'));
            const response = await request(app)
                .get('/v1/reports/download/report123')
                .expect(httpStatus.INTERNAL_SERVER_ERROR);
            expect(response.body).toHaveProperty('message', 'Failed to download report');
        });
    });
    describe('GET /reports/history', () => {
        it('should get reports history successfully', async () => {
            reportService.queryReports.mockResolvedValue(mockReportsResponse);
            const response = await request(app)
                .get('/v1/reports/history')
                .query({ page: 1, limit: 10 })
                .expect(httpStatus.OK);
            expect(response.body).toEqual(mockReportsResponse);
            expect(reportService.queryReports).toHaveBeenCalledWith({}, { page: 1, limit: 10 });
        });
        it('should handle query filters', async () => {
            reportService.queryReports.mockResolvedValue(mockReportsResponse);
            await request(app)
                .get('/v1/reports/history')
                .query({
                clientId: 'client123',
                format: 'PDF',
                status: 'completed',
                sortBy: 'createdAt',
                sortType: 'desc'
            })
                .expect(httpStatus.OK);
            expect(reportService.queryReports).toHaveBeenCalledWith({
                clientId: 'client123',
                format: 'PDF',
                status: 'completed'
            }, {
                sortBy: 'createdAt',
                sortType: 'desc'
            });
        });
        it('should validate date filters', async () => {
            const response = await request(app)
                .get('/v1/reports/history')
                .query({
                dateFrom: '2024-01-01T00:00:00.000Z',
                dateTo: '2023-12-31T00:00:00.000Z' // dateTo before dateFrom
            })
                .expect(httpStatus.BAD_REQUEST);
            expect(response.body).toHaveProperty('message');
        });
        it('should validate limit parameter', async () => {
            const response = await request(app)
                .get('/v1/reports/history')
                .query({ limit: 200 }) // Over maximum
                .expect(httpStatus.BAD_REQUEST);
            expect(response.body).toHaveProperty('message');
        });
    });
    describe('GET /reports/templates', () => {
        it('should get report templates successfully', async () => {
            reportService.getTemplates.mockReturnValue(mockTemplates);
            const response = await request(app).get('/v1/reports/templates').expect(httpStatus.OK);
            expect(response.body).toEqual({ templates: mockTemplates });
            expect(reportService.getTemplates).toHaveBeenCalled();
        });
    });
    describe('DELETE /reports/:reportId', () => {
        it('should delete report successfully', async () => {
            reportService.deleteReportById.mockResolvedValue(mockReport);
            await request(app).delete('/v1/reports/report123').expect(httpStatus.NO_CONTENT);
            expect(reportService.deleteReportById).toHaveBeenCalledWith('report123');
        });
        it('should handle service errors during deletion', async () => {
            reportService.deleteReportById.mockRejectedValue(new Error('Deletion failed'));
            const response = await request(app)
                .delete('/v1/reports/report123')
                .expect(httpStatus.INTERNAL_SERVER_ERROR);
            expect(response.body).toHaveProperty('message');
        });
    });
    describe('Validation', () => {
        it('should validate reportId parameter format', async () => {
            await request(app).get('/v1/reports/').expect(httpStatus.NOT_FOUND);
        });
        it('should validate query parameters', async () => {
            const response = await request(app)
                .get('/v1/reports/history')
                .query({
                page: 0, // Invalid page number
                limit: -1, // Invalid limit
                sortBy: 'invalid-field'
            })
                .expect(httpStatus.BAD_REQUEST);
            expect(response.body).toHaveProperty('message');
        });
        it('should validate sections array length', async () => {
            const reportData = {
                analysisId: 'analysis123',
                sections: new Array(15).fill('section') // Too many sections
            };
            const response = await request(app)
                .post('/v1/reports/generate')
                .send(reportData)
                .expect(httpStatus.BAD_REQUEST);
            expect(response.body).toHaveProperty('message');
        });
        it('should validate title length', async () => {
            const reportData = {
                analysisId: 'analysis123',
                title: 'a'.repeat(250) // Title too long
            };
            const response = await request(app)
                .post('/v1/reports/generate')
                .send(reportData)
                .expect(httpStatus.BAD_REQUEST);
            expect(response.body).toHaveProperty('message');
        });
    });
});
