import { describe, it, expect, beforeEach, vi } from 'vitest';
import { treasuryService } from '../treasury';
import { mockReportHistory, mockReportTemplates } from '@/data/treasuryMockData';

// Mock the environment variable
Object.defineProperty(import.meta, 'env', {
    value: {
        VITE_USE_MOCK_DATA: 'true'
    },
    writable: true
});

describe('Treasury Service - Reports', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Ensure we're using mock data for tests
        import.meta.env.VITE_USE_MOCK_DATA = 'true';
    });

    describe('getReportHistory', () => {
        it('returns paginated report history', async () => {
            const result = await treasuryService.getReportHistory(1, 10);

            expect(result).toHaveProperty('reports');
            expect(result).toHaveProperty('totalCount');
            expect(result).toHaveProperty('page');
            expect(result).toHaveProperty('totalPages');
            expect(result.page).toBe(1);
            expect(result.reports.length).toBeLessThanOrEqual(10);
            expect(result.totalCount).toBe(mockReportHistory.length);
        });

        it('filters reports by client ID', async () => {
            const clientId = '1';
            const result = await treasuryService.getReportHistory(1, 10, clientId);

            expect(result.reports.every(report => report.clientId === clientId)).toBe(true);
            expect(result.totalCount).toBeLessThanOrEqual(mockReportHistory.length);
        });

        it('handles pagination correctly', async () => {
            const page1 = await treasuryService.getReportHistory(1, 3);
            const page2 = await treasuryService.getReportHistory(2, 3);

            expect(page1.page).toBe(1);
            expect(page2.page).toBe(2);
            expect(page1.reports.length).toBe(3);
            expect(page2.reports.length).toBeGreaterThan(0);
            expect(page1.totalPages).toBe(Math.ceil(mockReportHistory.length / 3));
        });

        it('returns empty results for non-existent client', async () => {
            const result = await treasuryService.getReportHistory(1, 10, 'non-existent-client');

            expect(result.reports).toHaveLength(0);
            expect(result.totalCount).toBe(0);
        });

        it('handles page beyond total pages', async () => {
            const result = await treasuryService.getReportHistory(999, 10);

            expect(result.reports).toHaveLength(0);
            expect(result.page).toBe(999);
            expect(result.totalPages).toBe(Math.ceil(mockReportHistory.length / 10));
        });
    });

    describe('getReportTemplates', () => {
        it('returns all available templates', async () => {
            const result = await treasuryService.getReportTemplates();

            expect(Array.isArray(result)).toBe(true);
            expect(result).toHaveLength(mockReportTemplates.length);
            expect(result[0]).toHaveProperty('id');
            expect(result[0]).toHaveProperty('name');
            expect(result[0]).toHaveProperty('description');
            expect(result[0]).toHaveProperty('format');
            expect(result[0]).toHaveProperty('sections');
            expect(result[0]).toHaveProperty('isCustomizable');
        });

        it('includes template with correct structure', async () => {
            const result = await treasuryService.getReportTemplates();
            const standardTemplate = result.find(t => t.id === 'template-1');

            expect(standardTemplate).toBeDefined();
            expect(standardTemplate?.name).toBe('Standard Analysis Report');
            expect(standardTemplate?.format).toBe('pdf');
            expect(Array.isArray(standardTemplate?.sections)).toBe(true);
            expect(standardTemplate?.isCustomizable).toBe(true);
        });

        it('includes different template formats', async () => {
            const result = await treasuryService.getReportTemplates();

            const pdfTemplates = result.filter(t => t.format === 'pdf');
            const excelTemplates = result.filter(t => t.format === 'excel');

            expect(pdfTemplates.length).toBeGreaterThan(0);
            expect(excelTemplates.length).toBeGreaterThan(0);
        });
    });

    describe('generateReport', () => {
        it('creates report with correct request data', async () => {
            const request = {
                analysisId: 'analysis-123',
                format: 'pdf' as const,
                template: 'Standard Analysis Report',
                includeDataTables: true
            };

            const result = await treasuryService.generateReport(request);

            expect(result).toHaveProperty('reportId');
            expect(result).toHaveProperty('downloadUrl');
            expect(result.reportId).toMatch(/^report-\d+$/);
            expect(result.downloadUrl).toContain(request.format);
        });

        it('generates report with different formats', async () => {
            const pdfRequest = {
                analysisId: 'analysis-123',
                format: 'pdf' as const,
                template: 'Standard Analysis Report',
                includeDataTables: true
            };

            const excelRequest = {
                analysisId: 'analysis-123',
                format: 'excel' as const,
                template: 'Detailed Technical Report',
                includeDataTables: true
            };

            const pdfResult = await treasuryService.generateReport(pdfRequest);
            const excelResult = await treasuryService.generateReport(excelRequest);

            expect(pdfResult.downloadUrl).toContain('.pdf');
            expect(excelResult.downloadUrl).toContain('.excel');
        });

        it('includes optional recommendation IDs', async () => {
            const request = {
                analysisId: 'analysis-123',
                recommendationIds: ['rec-1', 'rec-2'],
                format: 'pdf' as const,
                template: 'Executive Summary',
                includeDataTables: false
            };

            const result = await treasuryService.generateReport(request);

            expect(result.reportId).toBeDefined();
            expect(result.downloadUrl).toBeDefined();
        });
    });

    describe('downloadReport', () => {
        it('returns blob for report download', async () => {
            const reportId = 'report-123';
            const result = await treasuryService.downloadReport(reportId);

            expect(result).toBeInstanceOf(Blob);
            expect(result.type).toBe('application/pdf');
        });

        it('handles different report IDs', async () => {
            const reportIds = ['report-1', 'report-2', 'report-3'];

            for (const reportId of reportIds) {
                const result = await treasuryService.downloadReport(reportId);
                expect(result).toBeInstanceOf(Blob);
            }
        });
    });

    describe('deleteReport', () => {
        it('deletes report successfully', async () => {
            const reportId = 'report-123';

            // Should not throw an error
            await expect(treasuryService.deleteReport(reportId)).resolves.toBeUndefined();
        });

        it('handles multiple delete operations', async () => {
            const reportIds = ['report-1', 'report-2', 'report-3'];

            for (const reportId of reportIds) {
                await expect(treasuryService.deleteReport(reportId)).resolves.toBeUndefined();
            }
        });
    });

    describe('Mock data integrity', () => {
        it('has consistent mock report history data', () => {
            expect(Array.isArray(mockReportHistory)).toBe(true);
            expect(mockReportHistory.length).toBeGreaterThan(0);

            mockReportHistory.forEach(report => {
                expect(report).toHaveProperty('id');
                expect(report).toHaveProperty('title');
                expect(report).toHaveProperty('analysisId');
                expect(report).toHaveProperty('clientId');
                expect(report).toHaveProperty('clientName');
                expect(report).toHaveProperty('format');
                expect(report).toHaveProperty('template');
                expect(report).toHaveProperty('createdAt');
                expect(report).toHaveProperty('createdBy');
                expect(report).toHaveProperty('fileSize');
                expect(report).toHaveProperty('downloadCount');
                expect(report).toHaveProperty('status');

                // Validate format
                expect(['pdf', 'html', 'excel']).toContain(report.format);

                // Validate status
                expect(['generating', 'ready', 'error']).toContain(report.status);

                // Validate types
                expect(typeof report.id).toBe('string');
                expect(typeof report.title).toBe('string');
                expect(typeof report.clientName).toBe('string');
                expect(typeof report.fileSize).toBe('number');
                expect(typeof report.downloadCount).toBe('number');
            });
        });

        it('has consistent mock template data', () => {
            expect(Array.isArray(mockReportTemplates)).toBe(true);
            expect(mockReportTemplates.length).toBeGreaterThan(0);

            mockReportTemplates.forEach(template => {
                expect(template).toHaveProperty('id');
                expect(template).toHaveProperty('name');
                expect(template).toHaveProperty('description');
                expect(template).toHaveProperty('format');
                expect(template).toHaveProperty('sections');
                expect(template).toHaveProperty('isCustomizable');

                // Validate types
                expect(typeof template.id).toBe('string');
                expect(typeof template.name).toBe('string');
                expect(typeof template.description).toBe('string');
                expect(['pdf', 'html', 'excel']).toContain(template.format);
                expect(Array.isArray(template.sections)).toBe(true);
                expect(typeof template.isCustomizable).toBe('boolean');

                // Validate sections
                expect(template.sections.length).toBeGreaterThan(0);
                template.sections.forEach(section => {
                    expect(typeof section).toBe('string');
                    expect(section.length).toBeGreaterThan(0);
                });
            });
        });

        it('has reports with different statuses', () => {
            const statuses = mockReportHistory.map(r => r.status);
            const uniqueStatuses = [...new Set(statuses)];

            expect(uniqueStatuses).toContain('ready');
            expect(uniqueStatuses.length).toBeGreaterThan(1);
        });

        it('has reports for different clients', () => {
            const clientIds = mockReportHistory.map(r => r.clientId);
            const uniqueClientIds = [...new Set(clientIds)];

            expect(uniqueClientIds.length).toBeGreaterThan(1);
        });

        it('has templates with different formats', () => {
            const formats = mockReportTemplates.map(t => t.format);
            const uniqueFormats = [...new Set(formats)];

            expect(uniqueFormats).toContain('pdf');
            expect(uniqueFormats.length).toBeGreaterThan(1);
        });
    });
});
