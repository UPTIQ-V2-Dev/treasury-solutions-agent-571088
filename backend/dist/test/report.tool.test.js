import { reportService } from "../services/index.js";
import { reportTools } from "../tools/report.tool.js";
import { beforeEach, describe, expect, it, vi } from 'vitest';
// Mock the report service
vi.mock('../services/index.ts', () => ({
    reportService: {
        generateReport: vi.fn(),
        getReportById: vi.fn(),
        queryReports: vi.fn(),
        deleteReportById: vi.fn(),
        getTemplates: vi.fn(),
        getTemplate: vi.fn()
    }
}));
const mockReport = {
    id: 'report123',
    title: 'Test Report',
    analysisId: 'analysis123',
    clientId: 'client123',
    format: 'PDF',
    template: 'comprehensive-treasury-report',
    createdBy: 'user123',
    status: 'completed',
    createdAt: new Date().toISOString(),
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
const mockTemplate = {
    id: 'comprehensive-treasury-report',
    name: 'Comprehensive Treasury Analysis Report',
    description: 'Complete treasury analysis',
    format: 'PDF',
    sections: [
        {
            id: 'exec-summary',
            name: 'Executive Summary',
            type: 'executive_summary',
            order: 1,
            required: true
        }
    ],
    isActive: true
};
describe('Report MCP Tools', () => {
    let generateReportTool;
    let getReportTool;
    let queryReportsTool;
    let deleteReportTool;
    let getTemplatesTool;
    let getTemplateTool;
    beforeEach(() => {
        vi.clearAllMocks();
        // Find tools by their IDs
        generateReportTool = reportTools.find(t => t.id === 'report_generate');
        getReportTool = reportTools.find(t => t.id === 'report_get');
        queryReportsTool = reportTools.find(t => t.id === 'report_query');
        deleteReportTool = reportTools.find(t => t.id === 'report_delete');
        getTemplatesTool = reportTools.find(t => t.id === 'report_get_templates');
        getTemplateTool = reportTools.find(t => t.id === 'report_get_template');
    });
    describe('generateReportTool', () => {
        it('should generate a report successfully', async () => {
            reportService.generateReport.mockResolvedValue(mockReport);
            const inputs = {
                analysisId: 'analysis123',
                templateId: 'comprehensive-treasury-report',
                format: 'PDF',
                title: 'Test Report',
                sections: ['exec-summary', 'analysis-summary'],
                createdBy: 'user123'
            };
            const result = await generateReportTool.fn(inputs);
            expect(result).toEqual(mockReport);
            expect(reportService.generateReport).toHaveBeenCalledWith({
                analysisId: 'analysis123',
                templateId: 'comprehensive-treasury-report',
                format: 'PDF',
                title: 'Test Report',
                sections: ['exec-summary', 'analysis-summary'],
                createdBy: 'user123'
            });
        });
        it('should handle missing optional parameters', async () => {
            reportService.generateReport.mockResolvedValue(mockReport);
            const inputs = {
                analysisId: 'analysis123',
                createdBy: 'user123'
            };
            const result = await generateReportTool.fn(inputs);
            expect(result).toEqual(mockReport);
            expect(reportService.generateReport).toHaveBeenCalledWith({
                analysisId: 'analysis123',
                templateId: undefined,
                format: undefined,
                title: undefined,
                sections: undefined,
                createdBy: 'user123'
            });
        });
        it('should propagate service errors', async () => {
            reportService.generateReport.mockRejectedValue(new Error('Generation failed'));
            const inputs = {
                analysisId: 'analysis123',
                createdBy: 'user123'
            };
            await expect(generateReportTool.fn(inputs)).rejects.toThrow('Generation failed');
        });
    });
    describe('getReportTool', () => {
        it('should get report successfully', async () => {
            reportService.getReportById.mockResolvedValue(mockReport);
            const inputs = { reportId: 'report123' };
            const result = await getReportTool.fn(inputs);
            expect(result).toEqual(mockReport);
            expect(reportService.getReportById).toHaveBeenCalledWith('report123');
        });
        it('should throw error when report not found', async () => {
            reportService.getReportById.mockResolvedValue(null);
            const inputs = { reportId: 'nonexistent' };
            await expect(getReportTool.fn(inputs)).rejects.toThrow('Report not found with ID: nonexistent');
        });
    });
    describe('queryReportsTool', () => {
        it('should query reports successfully', async () => {
            reportService.queryReports.mockResolvedValue(mockReportsResponse);
            const inputs = {
                clientId: 'client123',
                format: 'PDF',
                status: 'completed',
                sortBy: 'createdAt',
                sortType: 'desc',
                limit: 10,
                page: 1
            };
            const result = await queryReportsTool.fn(inputs);
            expect(result).toEqual(mockReportsResponse);
            expect(reportService.queryReports).toHaveBeenCalledWith({
                clientId: 'client123',
                format: 'PDF',
                status: 'completed'
            }, {
                sortBy: 'createdAt',
                sortType: 'desc',
                limit: 10,
                page: 1
            });
        });
        it('should handle date filters', async () => {
            reportService.queryReports.mockResolvedValue(mockReportsResponse);
            const inputs = {
                dateFrom: '2024-01-01T00:00:00.000Z',
                dateTo: '2024-01-31T23:59:59.999Z'
            };
            const result = await queryReportsTool.fn(inputs);
            expect(result).toEqual(mockReportsResponse);
            expect(reportService.queryReports).toHaveBeenCalledWith({
                dateFrom: new Date('2024-01-01T00:00:00.000Z'),
                dateTo: new Date('2024-01-31T23:59:59.999Z')
            }, {});
        });
        it('should handle empty filters', async () => {
            reportService.queryReports.mockResolvedValue(mockReportsResponse);
            const inputs = {};
            const result = await queryReportsTool.fn(inputs);
            expect(result).toEqual(mockReportsResponse);
            expect(reportService.queryReports).toHaveBeenCalledWith({}, {});
        });
    });
    describe('deleteReportTool', () => {
        it('should delete report successfully', async () => {
            reportService.deleteReportById.mockResolvedValue(mockReport);
            const inputs = { reportId: 'report123' };
            const result = await deleteReportTool.fn(inputs);
            expect(result).toEqual(mockReport);
            expect(reportService.deleteReportById).toHaveBeenCalledWith('report123');
        });
        it('should propagate service errors', async () => {
            reportService.deleteReportById.mockRejectedValue(new Error('Deletion failed'));
            const inputs = { reportId: 'report123' };
            await expect(deleteReportTool.fn(inputs)).rejects.toThrow('Deletion failed');
        });
    });
    describe('getTemplatesTool', () => {
        it('should get all templates successfully', async () => {
            const mockTemplates = [mockTemplate];
            reportService.getTemplates.mockReturnValue(mockTemplates);
            const inputs = {};
            const result = await getTemplatesTool.fn(inputs);
            expect(result).toEqual({ templates: mockTemplates });
            expect(reportService.getTemplates).toHaveBeenCalled();
        });
        it('should handle empty template list', async () => {
            reportService.getTemplates.mockReturnValue([]);
            const inputs = {};
            const result = await getTemplatesTool.fn(inputs);
            expect(result).toEqual({ templates: [] });
        });
    });
    describe('getTemplateTool', () => {
        it('should get template by ID successfully', async () => {
            reportService.getTemplate.mockReturnValue(mockTemplate);
            const inputs = { templateId: 'comprehensive-treasury-report' };
            const result = await getTemplateTool.fn(inputs);
            expect(result).toEqual(mockTemplate);
            expect(reportService.getTemplate).toHaveBeenCalledWith('comprehensive-treasury-report');
        });
        it('should return null when template not found', async () => {
            reportService.getTemplate.mockReturnValue(null);
            const inputs = { templateId: 'nonexistent' };
            const result = await getTemplateTool.fn(inputs);
            expect(result).toBeNull();
            expect(reportService.getTemplate).toHaveBeenCalledWith('nonexistent');
        });
    });
    describe('Tool schemas', () => {
        it('should have correct tool IDs', () => {
            const expectedIds = [
                'report_generate',
                'report_get',
                'report_query',
                'report_delete',
                'report_get_templates',
                'report_get_template'
            ];
            const actualIds = reportTools.map(tool => tool.id);
            expect(actualIds).toEqual(expectedIds);
        });
        it('should have all tools with proper structure', () => {
            reportTools.forEach(tool => {
                expect(tool).toHaveProperty('id');
                expect(tool).toHaveProperty('name');
                expect(tool).toHaveProperty('description');
                expect(tool).toHaveProperty('inputSchema');
                expect(tool).toHaveProperty('outputSchema');
                expect(tool).toHaveProperty('fn');
                expect(typeof tool.fn).toBe('function');
            });
        });
    });
    describe('Input validation', () => {
        it('should validate generateReport inputs', () => {
            const schema = generateReportTool.inputSchema;
            // Valid input
            const validInput = {
                analysisId: 'analysis123',
                createdBy: 'user123'
            };
            expect(() => schema.parse(validInput)).not.toThrow();
            // Invalid input - missing required fields
            const invalidInput = {
                templateId: 'comprehensive-treasury-report'
            };
            expect(() => schema.parse(invalidInput)).toThrow();
        });
        it('should validate template IDs in generateReport', () => {
            const schema = generateReportTool.inputSchema;
            // Valid template ID
            const validInput = {
                analysisId: 'analysis123',
                templateId: 'comprehensive-treasury-report',
                createdBy: 'user123'
            };
            expect(() => schema.parse(validInput)).not.toThrow();
            // Invalid template ID
            const invalidInput = {
                analysisId: 'analysis123',
                templateId: 'invalid-template',
                createdBy: 'user123'
            };
            expect(() => schema.parse(invalidInput)).toThrow();
        });
        it('should validate format in generateReport', () => {
            const schema = generateReportTool.inputSchema;
            // Valid format
            const validInput = {
                analysisId: 'analysis123',
                format: 'PDF',
                createdBy: 'user123'
            };
            expect(() => schema.parse(validInput)).not.toThrow();
            // Invalid format
            const invalidInput = {
                analysisId: 'analysis123',
                format: 'INVALID',
                createdBy: 'user123'
            };
            expect(() => schema.parse(invalidInput)).toThrow();
        });
        it('should validate sections array length', () => {
            const schema = generateReportTool.inputSchema;
            // Valid sections array
            const validInput = {
                analysisId: 'analysis123',
                sections: ['section1', 'section2'],
                createdBy: 'user123'
            };
            expect(() => schema.parse(validInput)).not.toThrow();
            // Too many sections
            const invalidInput = {
                analysisId: 'analysis123',
                sections: new Array(15).fill('section'),
                createdBy: 'user123'
            };
            expect(() => schema.parse(invalidInput)).toThrow();
        });
    });
});
