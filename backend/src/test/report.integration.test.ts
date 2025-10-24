import app from '../app.ts';
import prisma from '../client.ts';
import httpStatus from 'http-status';
import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

// Dependencies imported for mocking

// Mock heavy dependencies for integration tests
vi.mock('puppeteer', () => ({
    default: {
        launch: vi.fn(() =>
            Promise.resolve({
                newPage: vi.fn(() =>
                    Promise.resolve({
                        setContent: vi.fn(() => Promise.resolve()),
                        pdf: vi.fn(() => Promise.resolve(Buffer.from('mock pdf content')))
                    })
                ),
                close: vi.fn(() => Promise.resolve())
            })
        )
    }
}));

vi.mock('exceljs', () => ({
    default: {
        Workbook: vi.fn(() => ({
            creator: '',
            created: null,
            title: '',
            addWorksheet: vi.fn(() => ({
                addRow: vi.fn(),
                getRow: vi.fn(() => ({ font: {} })),
                getColumn: vi.fn(() => ({ numFmt: '' })),
                columns: []
            })),
            xlsx: {
                writeBuffer: vi.fn(() => Promise.resolve(Buffer.from('mock excel content')))
            }
        }))
    }
}));

vi.mock('../storage/main.ts', () => ({
    getInstance: vi.fn(() => ({
        uploadData: vi.fn(() => Promise.resolve()),
        createReadStream: vi.fn(() =>
            Promise.resolve({
                pipe: vi.fn()
            })
        ),
        deleteFile: vi.fn(() => Promise.resolve())
    }))
}));

// Mock auth middleware for integration tests
vi.mock('../middlewares/auth.ts', () => ({
    auth: () => (req: any, res: any, next: any) => {
        req.user = { id: 1, email: 'test@example.com' };
        next();
    }
}));

describe('Report Integration Tests', () => {
    let testClient: any;
    let testAnalysis: any;

    beforeAll(async () => {
        // Setup test data
        testClient = await prisma.client.create({
            data: {
                id: 'test-client-reports',
                name: 'Test Client for Reports',
                accountIds: ['ACC001', 'ACC002'],
                relationshipManager: 'John Manager',
                status: 'active'
            }
        });

        testAnalysis = await prisma.analysis.create({
            data: {
                id: 'test-analysis-reports',
                clientId: testClient.id,
                statementFileIds: ['file1', 'file2'],
                status: 'completed',
                summary: {
                    transactionCount: 100,
                    totalInflow: 50000,
                    totalOutflow: 30000,
                    netCashFlow: 20000,
                    avgDailyBalance: 15000,
                    dateRange: {
                        startDate: '2024-01-01T00:00:00.000Z',
                        endDate: '2024-01-31T23:59:59.999Z'
                    }
                },
                liquidityMetrics: {
                    avgDailyBalance: 15000,
                    minBalance: 5000,
                    maxBalance: 25000,
                    volatility: 0.2,
                    liquidityRatio: 3.0
                },
                spendingBreakdown: [
                    {
                        category: 'Payroll',
                        amount: 15000,
                        percentage: 50.0,
                        transactionCount: 20
                    }
                ],
                idleBalanceAnalysis: {
                    threshold: 10000,
                    avgIdleAmount: 5000,
                    daysWithIdleBalance: 20,
                    potentialYieldGain: 125
                }
            }
        });
    });

    afterAll(async () => {
        // Cleanup test data
        await prisma.report.deleteMany({
            where: {
                analysisId: testAnalysis.id
            }
        });
        await prisma.analysis.delete({
            where: { id: testAnalysis.id }
        });
        await prisma.client.delete({
            where: { id: testClient.id }
        });
    });

    beforeEach(async () => {
        // Clean up any reports from previous tests
        await prisma.report.deleteMany({
            where: {
                analysisId: testAnalysis.id
            }
        });
    });

    describe('POST /reports/generate', () => {
        it('should generate a PDF report end-to-end', async () => {
            const reportData = {
                analysisId: testAnalysis.id,
                templateId: 'comprehensive-treasury-report',
                format: 'PDF',
                title: 'Integration Test Report'
            };

            const response = await request(app)
                .post('/v1/reports/generate')
                .send(reportData)
                .expect(httpStatus.CREATED);

            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe('Integration Test Report');
            expect(response.body.format).toBe('PDF');
            expect(response.body.status).toBe('completed');
            expect(response.body.analysisId).toBe(testAnalysis.id);
            expect(response.body.clientId).toBe(testClient.id);

            // Verify report was created in database
            const report = await prisma.report.findUnique({
                where: { id: response.body.id }
            });
            expect(report).toBeTruthy();
            expect(report?.filePath).toBeTruthy();
        });

        it('should generate an Excel report end-to-end', async () => {
            const reportData = {
                analysisId: testAnalysis.id,
                templateId: 'detailed-data-export',
                format: 'EXCEL',
                title: 'Excel Integration Test Report'
            };

            const response = await request(app)
                .post('/v1/reports/generate')
                .send(reportData)
                .expect(httpStatus.CREATED);

            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe('Excel Integration Test Report');
            expect(response.body.format).toBe('EXCEL');
            expect(response.body.status).toBe('completed');

            // Verify report was created in database
            const report = await prisma.report.findUnique({
                where: { id: response.body.id }
            });
            expect(report).toBeTruthy();
            expect(report?.filePath).toMatch(/\.xlsx$/);
        });

        it('should generate executive summary report', async () => {
            const reportData = {
                analysisId: testAnalysis.id,
                templateId: 'executive-summary-report',
                format: 'PDF'
            };

            const response = await request(app)
                .post('/v1/reports/generate')
                .send(reportData)
                .expect(httpStatus.CREATED);

            expect(response.body.template).toBe('executive-summary-report');
            expect(response.body.status).toBe('completed');
        });

        it('should handle custom sections', async () => {
            const reportData = {
                analysisId: testAnalysis.id,
                sections: ['exec-summary', 'liquidity-metrics']
            };

            const response = await request(app)
                .post('/v1/reports/generate')
                .send(reportData)
                .expect(httpStatus.CREATED);

            expect(response.body.status).toBe('completed');
        });

        it('should return 404 for non-existent analysis', async () => {
            const reportData = {
                analysisId: 'non-existent-analysis'
            };

            const response = await request(app)
                .post('/v1/reports/generate')
                .send(reportData)
                .expect(httpStatus.NOT_FOUND);

            expect(response.body.message).toBe('Analysis not found');
        });
    });

    describe('GET /reports/history', () => {
        beforeEach(async () => {
            // Create a test report
            const reportData = {
                analysisId: testAnalysis.id,
                format: 'PDF'
            };

            await request(app).post('/v1/reports/generate').send(reportData);
        });

        it('should return paginated report history', async () => {
            const response = await request(app)
                .get('/v1/reports/history')
                .query({ page: 1, limit: 10 })
                .expect(httpStatus.OK);

            expect(response.body).toHaveProperty('reports');
            expect(response.body).toHaveProperty('totalCount');
            expect(response.body).toHaveProperty('page');
            expect(response.body).toHaveProperty('totalPages');
            expect(response.body.reports).toBeInstanceOf(Array);
            expect(response.body.reports.length).toBeGreaterThan(0);
        });

        it('should filter by client ID', async () => {
            const response = await request(app)
                .get('/v1/reports/history')
                .query({ clientId: testClient.id })
                .expect(httpStatus.OK);

            expect(response.body.reports).toBeInstanceOf(Array);
            response.body.reports.forEach((report: any) => {
                expect(report.clientId).toBe(testClient.id);
            });
        });

        it('should filter by format', async () => {
            const response = await request(app)
                .get('/v1/reports/history')
                .query({ format: 'PDF' })
                .expect(httpStatus.OK);

            expect(response.body.reports).toBeInstanceOf(Array);
            response.body.reports.forEach((report: any) => {
                expect(report.format).toBe('PDF');
            });
        });

        it('should sort by creation date', async () => {
            // Create another report to test sorting
            await request(app).post('/v1/reports/generate').send({ analysisId: testAnalysis.id });

            const response = await request(app)
                .get('/v1/reports/history')
                .query({ sortBy: 'createdAt', sortType: 'desc' })
                .expect(httpStatus.OK);

            expect(response.body.reports).toBeInstanceOf(Array);
            if (response.body.reports.length > 1) {
                const dates = response.body.reports.map((r: any) => new Date(r.createdAt));
                expect(dates[0] >= dates[1]).toBe(true);
            }
        });
    });

    describe('GET /reports/:reportId', () => {
        let testReport: any;

        beforeEach(async () => {
            const reportData = {
                analysisId: testAnalysis.id,
                title: 'Test Report Detail'
            };

            const response = await request(app).post('/v1/reports/generate').send(reportData);

            testReport = response.body;
        });

        it('should get report details', async () => {
            const response = await request(app).get(`/v1/reports/${testReport.id}`).expect(httpStatus.OK);

            expect(response.body.id).toBe(testReport.id);
            expect(response.body.title).toBe('Test Report Detail');
            expect(response.body).toHaveProperty('client');
            expect(response.body).toHaveProperty('analysis');
        });

        it('should return 404 for non-existent report', async () => {
            const response = await request(app).get('/v1/reports/non-existent-id').expect(httpStatus.NOT_FOUND);

            expect(response.body.message).toBe('Report not found');
        });
    });

    describe('GET /reports/download/:reportId', () => {
        let testReport: any;

        beforeEach(async () => {
            const reportData = {
                analysisId: testAnalysis.id,
                title: 'Test Download Report'
            };

            const response = await request(app).post('/v1/reports/generate').send(reportData);

            testReport = response.body;
        });

        it('should download report file', async () => {
            const response = await request(app).get(`/v1/reports/download/${testReport.id}`).expect(httpStatus.OK);

            expect(response.headers['content-type']).toBe('application/pdf');
            expect(response.headers['content-disposition']).toContain('attachment');
            expect(response.headers['content-length']).toBeTruthy();

            // Verify download count was incremented
            const updatedReport = await prisma.report.findUnique({
                where: { id: testReport.id }
            });
            expect(updatedReport?.downloadCount).toBe(1);
        });
    });

    describe('GET /reports/templates', () => {
        it('should return available templates', async () => {
            const response = await request(app).get('/v1/reports/templates').expect(httpStatus.OK);

            expect(response.body).toHaveProperty('templates');
            expect(response.body.templates).toBeInstanceOf(Array);
            expect(response.body.templates.length).toBeGreaterThan(0);

            // Check template structure
            response.body.templates.forEach((template: any) => {
                expect(template).toHaveProperty('id');
                expect(template).toHaveProperty('name');
                expect(template).toHaveProperty('description');
                expect(template).toHaveProperty('format');
                expect(template).toHaveProperty('sections');
                expect(template).toHaveProperty('isActive');
                expect(template.isActive).toBe(true);
            });
        });
    });

    describe('DELETE /reports/:reportId', () => {
        let testReport: any;

        beforeEach(async () => {
            const reportData = {
                analysisId: testAnalysis.id,
                title: 'Test Delete Report'
            };

            const response = await request(app).post('/v1/reports/generate').send(reportData);

            testReport = response.body;
        });

        it('should delete report successfully', async () => {
            await request(app).delete(`/v1/reports/${testReport.id}`).expect(httpStatus.NO_CONTENT);

            // Verify report was deleted from database
            const deletedReport = await prisma.report.findUnique({
                where: { id: testReport.id }
            });
            expect(deletedReport).toBeNull();
        });

        it('should return 404 when deleting non-existent report', async () => {
            const response = await request(app).delete('/v1/reports/non-existent-id').expect(httpStatus.NOT_FOUND);

            expect(response.body.message).toBe('Report not found');
        });
    });

    describe('Error handling', () => {
        it('should handle validation errors gracefully', async () => {
            const invalidData = {
                analysisId: '', // Empty analysis ID
                format: 'INVALID_FORMAT'
            };

            const response = await request(app)
                .post('/v1/reports/generate')
                .send(invalidData)
                .expect(httpStatus.BAD_REQUEST);

            expect(response.body).toHaveProperty('message');
        });

        it('should handle missing required fields', async () => {
            const response = await request(app).post('/v1/reports/generate').send({}).expect(httpStatus.BAD_REQUEST);

            expect(response.body).toHaveProperty('message');
        });

        it('should handle pagination edge cases', async () => {
            const response = await request(app)
                .get('/v1/reports/history')
                .query({ page: 0, limit: -1 })
                .expect(httpStatus.BAD_REQUEST);

            expect(response.body).toHaveProperty('message');
        });
    });

    describe('Business logic validation', () => {
        it('should use default template when none specified', async () => {
            const reportData = {
                analysisId: testAnalysis.id
            };

            const response = await request(app)
                .post('/v1/reports/generate')
                .send(reportData)
                .expect(httpStatus.CREATED);

            expect(response.body.template).toBe('comprehensive-treasury-report');
        });

        it('should use default format when none specified', async () => {
            const reportData = {
                analysisId: testAnalysis.id
            };

            const response = await request(app)
                .post('/v1/reports/generate')
                .send(reportData)
                .expect(httpStatus.CREATED);

            expect(response.body.format).toBe('PDF');
        });

        it('should generate appropriate filename based on format', async () => {
            const pdfReport = await request(app)
                .post('/v1/reports/generate')
                .send({ analysisId: testAnalysis.id, format: 'PDF' });

            const excelReport = await request(app)
                .post('/v1/reports/generate')
                .send({ analysisId: testAnalysis.id, format: 'EXCEL' });

            const pdfReportData = await prisma.report.findUnique({
                where: { id: pdfReport.body.id }
            });
            const excelReportData = await prisma.report.findUnique({
                where: { id: excelReport.body.id }
            });

            expect(pdfReportData?.filePath).toMatch(/\.pdf$/);
            expect(excelReportData?.filePath).toMatch(/\.xlsx$/);
        });
    });
});
