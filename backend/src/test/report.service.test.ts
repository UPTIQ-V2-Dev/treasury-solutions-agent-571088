import prisma from '../client.ts';
import reportService from '../services/report.service.ts';
import * as storageMain from '../storage/main.ts';
import ApiError from '../utils/ApiError.ts';
import ExcelJS from 'exceljs';
import httpStatus from 'http-status';
import puppeteer from 'puppeteer';
import { MockedFunction, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock dependencies
vi.mock('../client.ts', () => ({
    default: {
        report: {
            findUnique: vi.fn(),
            findMany: vi.fn(),
            count: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            updateMany: vi.fn(),
            delete: vi.fn()
        },
        analysis: {
            findUnique: vi.fn()
        }
    }
}));

vi.mock('../storage/main.ts', () => ({
    getInstance: vi.fn()
}));

vi.mock('puppeteer', () => ({
    default: {
        launch: vi.fn()
    }
}));

vi.mock('exceljs', () => ({
    default: {
        Workbook: vi.fn()
    }
}));

// Mock types
const mockAnalysis = {
    id: 'analysis123',
    clientId: 'client123',
    client: {
        name: 'Test Client'
    },
    summary: {
        transactionCount: 100,
        totalInflow: 50000,
        totalOutflow: 30000,
        netCashFlow: 20000,
        avgDailyBalance: 15000,
        dateRange: {
            startDate: '2024-01-01',
            endDate: '2024-01-31'
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
        },
        {
            category: 'Vendor Payments',
            amount: 10000,
            percentage: 33.3,
            transactionCount: 15
        }
    ],
    idleBalanceAnalysis: {
        threshold: 10000,
        avgIdleAmount: 5000,
        daysWithIdleBalance: 20,
        potentialYieldGain: 125
    },
    Recommendation: [
        {
            id: 'rec1',
            priority: 'High',
            rationale: 'Optimize idle cash',
            status: 'pending',
            product: {
                name: 'Money Market Account',
                category: 'Liquidity Management',
                description: 'High-yield money market account'
            },
            benefitProjection: { annualYield: 1250 }
        }
    ]
};

const mockReport = {
    id: 'report123',
    title: 'Test Report',
    analysisId: 'analysis123',
    clientId: 'client123',
    format: 'PDF',
    template: 'comprehensive-treasury-report',
    createdBy: 'user123',
    status: 'completed',
    createdAt: new Date(),
    fileSize: 1024,
    downloadCount: 0,
    filePath: 'reports/test-report.pdf'
};

const mockStorageInstance = {
    uploadData: vi.fn(),
    createReadStream: vi.fn(),
    deleteFile: vi.fn()
};

const mockBrowser = {
    newPage: vi.fn(),
    close: vi.fn()
};

const mockPage = {
    setContent: vi.fn(),
    pdf: vi.fn()
};

const mockWorkbook = {
    creator: '',
    created: null,
    title: '',
    addWorksheet: vi.fn(),
    xlsx: {
        writeBuffer: vi.fn()
    }
};

const mockWorksheet = {
    addRow: vi.fn(),
    getRow: vi.fn(() => ({ font: {} })),
    getColumn: vi.fn(() => ({ numFmt: '' })),
    columns: []
};

describe('Report Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        // Setup storage mock
        (storageMain.getInstance as MockedFunction<typeof storageMain.getInstance>).mockReturnValue(
            mockStorageInstance as any
        );

        // Setup puppeteer mock
        (puppeteer.launch as MockedFunction<typeof puppeteer.launch>).mockResolvedValue(mockBrowser as any);
        mockBrowser.newPage.mockResolvedValue(mockPage as any);
        mockPage.pdf.mockResolvedValue(Buffer.from('mock pdf content'));

        // Setup ExcelJS mock
        (ExcelJS.Workbook as any).mockImplementation(() => mockWorkbook);
        mockWorkbook.addWorksheet.mockReturnValue(mockWorksheet);
        mockWorkbook.xlsx.writeBuffer.mockResolvedValue(Buffer.from('mock excel content'));
    });

    describe('generateReport', () => {
        it('should generate a PDF report successfully', async () => {
            // Setup mocks
            (prisma.analysis.findUnique as MockedFunction<any>).mockResolvedValue(mockAnalysis);
            (prisma.report.create as MockedFunction<any>).mockResolvedValue({ ...mockReport, status: 'generating' });
            (prisma.report.update as MockedFunction<any>).mockResolvedValue(mockReport);
            mockStorageInstance.uploadData.mockResolvedValue(undefined);

            const reportData = {
                analysisId: 'analysis123',
                templateId: 'comprehensive-treasury-report',
                format: 'PDF' as const,
                title: 'Test Report',
                createdBy: 'user123'
            };

            const result = await reportService.generateReport(reportData);

            expect(result).toEqual(mockReport);
            expect(prisma.analysis.findUnique).toHaveBeenCalledWith({
                where: { id: 'analysis123' },
                include: {
                    client: true,
                    Recommendation: {
                        include: {
                            product: true
                        }
                    }
                }
            });
            expect(puppeteer.launch).toHaveBeenCalled();
            expect(mockStorageInstance.uploadData).toHaveBeenCalled();
        });

        it('should generate an Excel report successfully', async () => {
            // Setup mocks
            (prisma.analysis.findUnique as MockedFunction<any>).mockResolvedValue(mockAnalysis);
            (prisma.report.create as MockedFunction<any>).mockResolvedValue({ ...mockReport, status: 'generating' });
            (prisma.report.update as MockedFunction<any>).mockResolvedValue({ ...mockReport, format: 'EXCEL' });
            mockStorageInstance.uploadData.mockResolvedValue(undefined);

            const reportData = {
                analysisId: 'analysis123',
                templateId: 'detailed-data-export',
                format: 'EXCEL' as const,
                title: 'Test Excel Report',
                createdBy: 'user123'
            };

            const result = await reportService.generateReport(reportData);

            expect(result.format).toBe('EXCEL');
            expect(ExcelJS.Workbook).toHaveBeenCalled();
            expect(mockWorkbook.addWorksheet).toHaveBeenCalled();
            expect(mockStorageInstance.uploadData).toHaveBeenCalled();
        });

        it('should throw error when analysis not found', async () => {
            (prisma.analysis.findUnique as MockedFunction<any>).mockResolvedValue(null);

            const reportData = {
                analysisId: 'nonexistent',
                createdBy: 'user123'
            };

            await expect(reportService.generateReport(reportData)).rejects.toThrow(
                new ApiError(httpStatus.NOT_FOUND, 'Analysis not found')
            );
        });

        it('should throw error for unsupported format', async () => {
            (prisma.analysis.findUnique as MockedFunction<any>).mockResolvedValue(mockAnalysis);
            (prisma.report.create as MockedFunction<any>).mockResolvedValue({ ...mockReport, status: 'generating' });

            const reportData = {
                analysisId: 'analysis123',
                format: 'UNSUPPORTED' as any,
                createdBy: 'user123'
            };

            await expect(reportService.generateReport(reportData)).rejects.toThrow(
                new ApiError(httpStatus.BAD_REQUEST, 'Unsupported report format')
            );
        });

        it('should update report status to failed on error', async () => {
            (prisma.analysis.findUnique as MockedFunction<any>).mockResolvedValue(mockAnalysis);
            (prisma.report.create as MockedFunction<any>).mockResolvedValue({ ...mockReport, status: 'generating' });
            (prisma.report.updateMany as MockedFunction<any>).mockResolvedValue({ count: 1 });

            // Make puppeteer fail
            (puppeteer.launch as MockedFunction<any>).mockRejectedValue(new Error('Puppeteer failed'));

            const reportData = {
                analysisId: 'analysis123',
                createdBy: 'user123'
            };

            await expect(reportService.generateReport(reportData)).rejects.toThrow();
            expect(prisma.report.updateMany).toHaveBeenCalledWith({
                where: {
                    analysisId: 'analysis123',
                    createdBy: 'user123',
                    status: 'generating'
                },
                data: { status: 'failed' }
            });
        });
    });

    describe('getReportById', () => {
        it('should return report when found', async () => {
            (prisma.report.findUnique as MockedFunction<any>).mockResolvedValue(mockReport);

            const result = await reportService.getReportById('report123');

            expect(result).toEqual(mockReport);
            expect(prisma.report.findUnique).toHaveBeenCalledWith({
                where: { id: 'report123' },
                include: {
                    client: true,
                    analysis: true
                }
            });
        });

        it('should return null when report not found', async () => {
            (prisma.report.findUnique as MockedFunction<any>).mockResolvedValue(null);

            const result = await reportService.getReportById('nonexistent');

            expect(result).toBeNull();
        });
    });

    describe('getReportDownloadStream', () => {
        const mockStream = { pipe: vi.fn() };

        it('should return download stream successfully', async () => {
            (prisma.report.findUnique as MockedFunction<any>).mockResolvedValue(mockReport);
            (prisma.report.update as MockedFunction<any>).mockResolvedValue({ ...mockReport, downloadCount: 1 });
            mockStorageInstance.createReadStream.mockResolvedValue(mockStream);

            const result = await reportService.getReportDownloadStream('report123');

            expect(result.stream).toBe(mockStream);
            expect(result.filename).toMatch(/\.pdf$/);
            expect(result.contentType).toBe('application/pdf');
            expect(result.size).toBe(1024);

            expect(prisma.report.update).toHaveBeenCalledWith({
                where: { id: 'report123' },
                data: {
                    downloadCount: {
                        increment: 1
                    }
                }
            });
        });

        it('should throw error when report not found', async () => {
            (prisma.report.findUnique as MockedFunction<any>).mockResolvedValue(null);

            await expect(reportService.getReportDownloadStream('nonexistent')).rejects.toThrow(
                new ApiError(httpStatus.NOT_FOUND, 'Report file not found')
            );
        });

        it('should throw error when file path is null', async () => {
            (prisma.report.findUnique as MockedFunction<any>).mockResolvedValue({ ...mockReport, filePath: null });

            await expect(reportService.getReportDownloadStream('report123')).rejects.toThrow(
                new ApiError(httpStatus.NOT_FOUND, 'Report file not found')
            );
        });

        it('should throw error when storage access fails', async () => {
            (prisma.report.findUnique as MockedFunction<any>).mockResolvedValue(mockReport);
            (prisma.report.update as MockedFunction<any>).mockResolvedValue(mockReport);
            mockStorageInstance.createReadStream.mockRejectedValue(new Error('Storage error'));

            await expect(reportService.getReportDownloadStream('report123')).rejects.toThrow(
                new ApiError(httpStatus.NOT_FOUND, 'Report file could not be accessed from storage')
            );
        });
    });

    describe('queryReports', () => {
        const mockReports = [
            { id: 'report1', title: 'Report 1', format: 'PDF' },
            { id: 'report2', title: 'Report 2', format: 'EXCEL' }
        ];

        it('should return paginated reports', async () => {
            (prisma.report.findMany as MockedFunction<any>).mockResolvedValue(mockReports);
            (prisma.report.count as MockedFunction<any>).mockResolvedValue(2);

            const filter = { clientId: 'client123' };
            const options = { page: 1, limit: 10 };

            const result = await reportService.queryReports(filter, options);

            expect(result.reports).toEqual(mockReports);
            expect(result.totalCount).toBe(2);
            expect(result.page).toBe(1);
            expect(result.totalPages).toBe(1);

            expect(prisma.report.findMany).toHaveBeenCalledWith({
                where: { clientId: 'client123' },
                select: expect.any(Object),
                skip: 0,
                take: 10,
                orderBy: { createdAt: 'desc' }
            });
        });

        it('should handle date filters', async () => {
            (prisma.report.findMany as MockedFunction<any>).mockResolvedValue([]);
            (prisma.report.count as MockedFunction<any>).mockResolvedValue(0);

            const dateFrom = new Date('2024-01-01');
            const dateTo = new Date('2024-01-31');
            const filter = { dateFrom, dateTo };
            const options = {};

            await reportService.queryReports(filter, options);

            expect(prisma.report.findMany).toHaveBeenCalledWith({
                where: {
                    createdAt: {
                        gte: dateFrom,
                        lte: dateTo
                    }
                },
                select: expect.any(Object),
                skip: 0,
                take: 10,
                orderBy: { createdAt: 'desc' }
            });
        });
    });

    describe('deleteReportById', () => {
        it('should delete report and file from storage', async () => {
            (prisma.report.findUnique as MockedFunction<any>).mockResolvedValue(mockReport);
            (prisma.report.delete as MockedFunction<any>).mockResolvedValue(mockReport);
            mockStorageInstance.deleteFile.mockResolvedValue(undefined);

            const result = await reportService.deleteReportById('report123');

            expect(result).toEqual(mockReport);
            expect(mockStorageInstance.deleteFile).toHaveBeenCalledWith({
                bucketName: 'treasury-reports',
                key: 'reports/test-report.pdf'
            });
            expect(prisma.report.delete).toHaveBeenCalledWith({
                where: { id: 'report123' }
            });
        });

        it('should throw error when report not found', async () => {
            (prisma.report.findUnique as MockedFunction<any>).mockResolvedValue(null);

            await expect(reportService.deleteReportById('nonexistent')).rejects.toThrow(
                new ApiError(httpStatus.NOT_FOUND, 'Report not found')
            );
        });

        it('should continue deletion even if storage cleanup fails', async () => {
            (prisma.report.findUnique as MockedFunction<any>).mockResolvedValue(mockReport);
            (prisma.report.delete as MockedFunction<any>).mockResolvedValue(mockReport);
            mockStorageInstance.deleteFile.mockRejectedValue(new Error('Storage error'));

            const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            const result = await reportService.deleteReportById('report123');

            expect(result).toEqual(mockReport);
            expect(consoleSpy).toHaveBeenCalled();
            expect(prisma.report.delete).toHaveBeenCalled();

            consoleSpy.mockRestore();
        });
    });

    describe('getTemplates', () => {
        it('should return all active templates', () => {
            const templates = reportService.getTemplates();

            expect(templates).toHaveLength(3);
            expect(templates.every(t => t.isActive)).toBe(true);
            expect(templates.map(t => t.id)).toEqual([
                'comprehensive-treasury-report',
                'executive-summary-report',
                'detailed-data-export'
            ]);
        });
    });

    describe('getTemplate', () => {
        it('should return specific template when found', () => {
            const template = reportService.getTemplate('comprehensive-treasury-report');

            expect(template).toBeDefined();
            expect(template?.id).toBe('comprehensive-treasury-report');
            expect(template?.name).toBe('Comprehensive Treasury Analysis Report');
        });

        it('should return null when template not found', () => {
            const template = reportService.getTemplate('nonexistent');

            expect(template).toBeNull();
        });
    });
});
