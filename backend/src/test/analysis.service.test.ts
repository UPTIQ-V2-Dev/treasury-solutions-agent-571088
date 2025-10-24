import prisma from '../client.ts';
import analysisService from '../services/analysis.service.ts';
import ApiError from '../utils/ApiError.ts';
import httpStatus from 'http-status';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock Prisma
vi.mock('../client.ts', () => ({
    default: {
        client: {
            findUnique: vi.fn()
        },
        statementFile: {
            findMany: vi.fn()
        },
        analysis: {
            create: vi.fn(),
            findUnique: vi.fn(),
            findMany: vi.fn(),
            delete: vi.fn()
        }
    }
}));

describe('Analysis Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('analyzeStatements', () => {
        const mockClient = {
            id: 'client-1',
            name: 'Test Client',
            accountIds: ['ACC-001'],
            relationshipManager: 'John Doe',
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const mockStatementFile = {
            id: 'file-1',
            filename: 'test.csv',
            type: 'text/csv',
            size: 1024,
            uploadedAt: new Date(),
            status: 'uploaded',
            clientId: 'client-1',
            ParseResult: {
                id: 'parse-1',
                statementFileId: 'file-1',
                totalTransactions: 10,
                dateRangeStart: new Date('2024-01-01'),
                dateRangeEnd: new Date('2024-12-31'),
                accounts: [
                    {
                        accountId: 'ACC-001',
                        accountType: 'Operating',
                        openingBalance: 100000,
                        closingBalance: 150000,
                        transactions: [
                            {
                                date: '2024-01-15',
                                description: 'PAYROLL DEPOSIT',
                                amount: 50000,
                                type: 'credit',
                                balance: 150000
                            },
                            {
                                date: '2024-01-16',
                                description: 'VENDOR PAYMENT',
                                amount: -25000,
                                type: 'debit',
                                balance: 125000
                            }
                        ]
                    }
                ],
                status: 'success',
                errors: null,
                createdAt: new Date()
            }
        };

        const mockCreatedAnalysis = {
            id: 'analysis-1',
            clientId: 'client-1',
            statementFileIds: ['file-1'],
            createdAt: new Date(),
            status: 'completed',
            summary: {},
            liquidityMetrics: {},
            spendingBreakdown: [],
            idleBalanceAnalysis: {}
        };

        it('should successfully analyze statements', async () => {
            vi.mocked(prisma.client.findUnique).mockResolvedValue(mockClient);
            vi.mocked(prisma.statementFile.findMany).mockResolvedValue([mockStatementFile]);
            vi.mocked(prisma.analysis.create).mockResolvedValue(mockCreatedAnalysis);

            const result = await analysisService.analyzeStatements({
                statementFileIds: ['file-1'],
                clientId: 'client-1'
            });

            expect(result).toEqual(mockCreatedAnalysis);
            expect(prisma.client.findUnique).toHaveBeenCalledWith({
                where: { id: 'client-1' }
            });
            expect(prisma.statementFile.findMany).toHaveBeenCalledWith({
                where: {
                    id: { in: ['file-1'] },
                    clientId: 'client-1'
                },
                include: { ParseResult: true }
            });
        });

        it('should throw error if client not found', async () => {
            vi.mocked(prisma.client.findUnique).mockResolvedValue(null);

            await expect(
                analysisService.analyzeStatements({
                    statementFileIds: ['file-1'],
                    clientId: 'invalid-client'
                })
            ).rejects.toThrow(new ApiError(httpStatus.NOT_FOUND, 'Client not found'));
        });

        it('should throw error if statement files not found', async () => {
            vi.mocked(prisma.client.findUnique).mockResolvedValue(mockClient);
            vi.mocked(prisma.statementFile.findMany).mockResolvedValue([]);

            await expect(
                analysisService.analyzeStatements({
                    statementFileIds: ['file-1'],
                    clientId: 'client-1'
                })
            ).rejects.toThrow(new ApiError(httpStatus.NOT_FOUND, 'One or more statement files not found'));
        });

        it('should throw error if statement files not parsed', async () => {
            const unparsedFile = { ...mockStatementFile, ParseResult: null };
            vi.mocked(prisma.client.findUnique).mockResolvedValue(mockClient);
            vi.mocked(prisma.statementFile.findMany).mockResolvedValue([unparsedFile]);

            await expect(
                analysisService.analyzeStatements({
                    statementFileIds: ['file-1'],
                    clientId: 'client-1'
                })
            ).rejects.toThrow(
                new ApiError(httpStatus.BAD_REQUEST, 'All statement files must be successfully parsed before analysis')
            );
        });

        it('should handle analysis options', async () => {
            vi.mocked(prisma.client.findUnique).mockResolvedValue(mockClient);
            vi.mocked(prisma.statementFile.findMany).mockResolvedValue([mockStatementFile]);
            vi.mocked(prisma.analysis.create).mockResolvedValue(mockCreatedAnalysis);

            const result = await analysisService.analyzeStatements({
                statementFileIds: ['file-1'],
                clientId: 'client-1',
                analysisOptions: {
                    idleBalanceThreshold: 500000,
                    volatilityPeriod: 30
                }
            });

            expect(result).toEqual(mockCreatedAnalysis);
        });
    });

    describe('getAnalysisById', () => {
        const mockAnalysis = {
            id: 'analysis-1',
            clientId: 'client-1',
            statementFileIds: ['file-1'],
            createdAt: new Date(),
            status: 'completed',
            summary: {},
            liquidityMetrics: {},
            spendingBreakdown: [],
            idleBalanceAnalysis: {}
        };

        it('should return analysis when found', async () => {
            vi.mocked(prisma.analysis.findUnique).mockResolvedValue(mockAnalysis);

            const result = await analysisService.getAnalysisById('analysis-1');

            expect(result).toEqual(mockAnalysis);
            expect(prisma.analysis.findUnique).toHaveBeenCalledWith({
                where: { id: 'analysis-1' }
            });
        });

        it('should return null when analysis not found', async () => {
            vi.mocked(prisma.analysis.findUnique).mockResolvedValue(null);

            const result = await analysisService.getAnalysisById('invalid-analysis');

            expect(result).toBeNull();
        });
    });

    describe('getAnalysisTransactions', () => {
        const mockAnalysis = {
            id: 'analysis-1',
            clientId: 'client-1',
            statementFileIds: ['file-1'],
            createdAt: new Date(),
            status: 'completed',
            summary: {},
            liquidityMetrics: {},
            spendingBreakdown: [],
            idleBalanceAnalysis: {}
        };

        const mockStatementFile = {
            id: 'file-1',
            filename: 'test.csv',
            type: 'text/csv',
            size: 1024,
            uploadedAt: new Date(),
            status: 'parsed',
            clientId: 'client-1',
            ParseResult: {
                id: 'parse-1',
                statementFileId: 'file-1',
                totalTransactions: 2,
                dateRangeStart: new Date('2024-01-01'),
                dateRangeEnd: new Date('2024-12-31'),
                accounts: [
                    {
                        accountId: 'ACC-001',
                        transactions: [
                            {
                                date: '2024-01-15',
                                description: 'PAYROLL DEPOSIT',
                                amount: 50000,
                                type: 'credit',
                                balance: 150000
                            },
                            {
                                date: '2024-01-16',
                                description: 'VENDOR PAYMENT',
                                amount: -25000,
                                type: 'debit',
                                balance: 125000
                            }
                        ]
                    }
                ],
                status: 'success',
                createdAt: new Date()
            }
        };

        it('should return paginated transactions', async () => {
            vi.mocked(prisma.analysis.findUnique).mockResolvedValue(mockAnalysis);
            vi.mocked(prisma.statementFile.findMany).mockResolvedValue([mockStatementFile]);

            const result = await analysisService.getAnalysisTransactions('analysis-1', {
                page: 1,
                limit: 50
            });

            expect(result).toHaveProperty('transactions');
            expect(result).toHaveProperty('totalCount');
            expect(result).toHaveProperty('page', 1);
            expect(result).toHaveProperty('totalPages');
            expect(result.transactions).toHaveLength(2);
        });

        it('should throw error if analysis not found', async () => {
            vi.mocked(prisma.analysis.findUnique).mockResolvedValue(null);

            await expect(analysisService.getAnalysisTransactions('invalid-analysis')).rejects.toThrow(
                new ApiError(httpStatus.NOT_FOUND, 'Analysis not found')
            );
        });

        it('should handle pagination correctly', async () => {
            vi.mocked(prisma.analysis.findUnique).mockResolvedValue(mockAnalysis);
            vi.mocked(prisma.statementFile.findMany).mockResolvedValue([mockStatementFile]);

            const result = await analysisService.getAnalysisTransactions('analysis-1', {
                page: 1,
                limit: 1
            });

            expect(result.transactions).toHaveLength(1);
            expect(result.totalPages).toBe(2);
        });
    });

    describe('queryAnalyses', () => {
        const mockAnalyses = [
            {
                id: 'analysis-1',
                clientId: 'client-1',
                statementFileIds: ['file-1'],
                createdAt: new Date(),
                status: 'completed',
                summary: {},
                liquidityMetrics: {},
                spendingBreakdown: [],
                idleBalanceAnalysis: {}
            },
            {
                id: 'analysis-2',
                clientId: 'client-1',
                statementFileIds: ['file-2'],
                createdAt: new Date(),
                status: 'processing',
                summary: {},
                liquidityMetrics: {},
                spendingBreakdown: [],
                idleBalanceAnalysis: {}
            }
        ];

        it('should return filtered analyses', async () => {
            vi.mocked(prisma.analysis.findMany).mockResolvedValue(mockAnalyses);

            const result = await analysisService.queryAnalyses({ clientId: 'client-1' }, { limit: 10, page: 1 });

            expect(result).toEqual(mockAnalyses);
            expect(prisma.analysis.findMany).toHaveBeenCalledWith({
                where: { clientId: 'client-1' },
                select: expect.any(Object),
                skip: 0,
                take: 10,
                orderBy: { createdAt: 'desc' }
            });
        });

        it('should handle sorting', async () => {
            vi.mocked(prisma.analysis.findMany).mockResolvedValue(mockAnalyses);

            await analysisService.queryAnalyses({}, { sortBy: 'status', sortType: 'asc' });

            expect(prisma.analysis.findMany).toHaveBeenCalledWith({
                where: {},
                select: expect.any(Object),
                skip: 0,
                take: 10,
                orderBy: { status: 'asc' }
            });
        });
    });

    describe('deleteAnalysisById', () => {
        const mockAnalysis = {
            id: 'analysis-1',
            clientId: 'client-1',
            statementFileIds: ['file-1'],
            createdAt: new Date(),
            status: 'completed',
            summary: {},
            liquidityMetrics: {},
            spendingBreakdown: [],
            idleBalanceAnalysis: {}
        };

        it('should delete analysis successfully', async () => {
            vi.mocked(prisma.analysis.findUnique).mockResolvedValue(mockAnalysis);
            vi.mocked(prisma.analysis.delete).mockResolvedValue(mockAnalysis);

            const result = await analysisService.deleteAnalysisById('analysis-1');

            expect(result).toEqual(mockAnalysis);
            expect(prisma.analysis.delete).toHaveBeenCalledWith({
                where: { id: 'analysis-1' }
            });
        });

        it('should throw error if analysis not found', async () => {
            vi.mocked(prisma.analysis.findUnique).mockResolvedValue(null);

            await expect(analysisService.deleteAnalysisById('invalid-analysis')).rejects.toThrow(
                new ApiError(httpStatus.NOT_FOUND, 'Analysis not found')
            );
        });
    });
});
