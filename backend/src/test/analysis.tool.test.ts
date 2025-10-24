import { analysisService } from '../services/index.ts';
import { analysisTools } from '../tools/analysis.tool.ts';
import ApiError from '../utils/ApiError.ts';
import httpStatus from 'http-status';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the analysis service
vi.mock('../services/index.ts', () => ({
    analysisService: {
        analyzeStatements: vi.fn(),
        getAnalysisById: vi.fn(),
        getAnalysisTransactions: vi.fn(),
        queryAnalyses: vi.fn(),
        deleteAnalysisById: vi.fn()
    }
}));

describe('Analysis Tools', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('analysis_create tool', () => {
        const createTool = analysisTools.find(tool => tool.id === 'analysis_create')!;

        const mockAnalysis = {
            id: 'analysis-1',
            clientId: 'client-1',
            statementFileIds: ['file-1'],
            createdAt: new Date('2024-01-01T00:00:00.000Z'),
            status: 'completed',
            summary: {},
            liquidityMetrics: {},
            spendingBreakdown: [],
            idleBalanceAnalysis: {}
        };

        it('should have correct metadata', () => {
            expect(createTool.name).toBe('Analyze Statements');
            expect(createTool.description).toBe('Perform comprehensive financial analysis on parsed statement data');
        });

        it('should analyze statements successfully', async () => {
            vi.mocked(analysisService.analyzeStatements).mockResolvedValue(mockAnalysis);

            const result = await createTool.fn({
                statementFileIds: ['file-1'],
                clientId: 'client-1'
            });

            expect(result).toEqual(mockAnalysis);
            expect(analysisService.analyzeStatements).toHaveBeenCalledWith({
                statementFileIds: ['file-1'],
                clientId: 'client-1'
            });
        });

        it('should analyze statements with options', async () => {
            vi.mocked(analysisService.analyzeStatements).mockResolvedValue(mockAnalysis);

            const result = await createTool.fn({
                statementFileIds: ['file-1'],
                clientId: 'client-1',
                analysisOptions: {
                    idleBalanceThreshold: 500000
                }
            });

            expect(result).toEqual(mockAnalysis);
            expect(analysisService.analyzeStatements).toHaveBeenCalledWith({
                statementFileIds: ['file-1'],
                clientId: 'client-1',
                analysisOptions: {
                    idleBalanceThreshold: 500000
                }
            });
        });

        it('should handle service errors', async () => {
            vi.mocked(analysisService.analyzeStatements).mockRejectedValue(
                new ApiError(httpStatus.NOT_FOUND, 'Client not found')
            );

            await expect(
                createTool.fn({
                    statementFileIds: ['file-1'],
                    clientId: 'invalid-client'
                })
            ).rejects.toThrow('Client not found');
        });
    });

    describe('analysis_get tool', () => {
        const getTool = analysisTools.find(tool => tool.id === 'analysis_get')!;

        const mockAnalysis = {
            id: 'analysis-1',
            clientId: 'client-1',
            statementFileIds: ['file-1'],
            createdAt: new Date('2024-01-01T00:00:00.000Z'),
            status: 'completed',
            summary: {},
            liquidityMetrics: {},
            spendingBreakdown: [],
            idleBalanceAnalysis: {}
        };

        it('should have correct metadata', () => {
            expect(getTool.name).toBe('Get Analysis');
            expect(getTool.description).toBe('Get specific analysis details');
        });

        it('should get analysis successfully', async () => {
            vi.mocked(analysisService.getAnalysisById).mockResolvedValue(mockAnalysis);

            const result = await getTool.fn({ analysisId: 'analysis-1' });

            expect(result).toEqual(mockAnalysis);
            expect(analysisService.getAnalysisById).toHaveBeenCalledWith('analysis-1');
        });

        it('should throw error when analysis not found', async () => {
            vi.mocked(analysisService.getAnalysisById).mockResolvedValue(null);

            await expect(getTool.fn({ analysisId: 'invalid-analysis' })).rejects.toThrow(
                'Analysis not found with ID: invalid-analysis'
            );
        });
    });

    describe('analysis_get_transactions tool', () => {
        const getTransactionsTool = analysisTools.find(tool => tool.id === 'analysis_get_transactions')!;

        const mockTransactions = {
            transactions: [
                {
                    id: 'txn-1',
                    date: '2024-01-15T00:00:00.000Z',
                    amount: 25000,
                    type: 'credit' as const,
                    category: 'Customer Payment',
                    description: 'WIRE TRANSFER FROM ABC CLIENT',
                    counterparty: 'ABC CLIENT CORP',
                    balanceAfter: 485000,
                    accountId: 'ACC-001'
                }
            ],
            totalCount: 100,
            page: 1,
            totalPages: 2
        };

        it('should have correct metadata', () => {
            expect(getTransactionsTool.name).toBe('Get Analysis Transactions');
            expect(getTransactionsTool.description).toBe('Get paginated transaction data for a specific analysis');
        });

        it('should get transactions successfully', async () => {
            vi.mocked(analysisService.getAnalysisTransactions).mockResolvedValue(mockTransactions);

            const result = await getTransactionsTool.fn({ analysisId: 'analysis-1' });

            expect(result).toEqual(mockTransactions);
            expect(analysisService.getAnalysisTransactions).toHaveBeenCalledWith('analysis-1', {});
        });

        it('should handle pagination parameters', async () => {
            vi.mocked(analysisService.getAnalysisTransactions).mockResolvedValue(mockTransactions);

            const result = await getTransactionsTool.fn({
                analysisId: 'analysis-1',
                page: 2,
                limit: 25
            });

            expect(result).toEqual(mockTransactions);
            expect(analysisService.getAnalysisTransactions).toHaveBeenCalledWith('analysis-1', {
                page: 2,
                limit: 25
            });
        });

        it('should handle service errors', async () => {
            vi.mocked(analysisService.getAnalysisTransactions).mockRejectedValue(
                new ApiError(httpStatus.NOT_FOUND, 'Analysis not found')
            );

            await expect(getTransactionsTool.fn({ analysisId: 'invalid-analysis' })).rejects.toThrow(
                'Analysis not found'
            );
        });
    });

    describe('analysis_query tool', () => {
        const queryTool = analysisTools.find(tool => tool.id === 'analysis_query')!;

        const mockAnalyses = [
            {
                id: 'analysis-1',
                clientId: 'client-1',
                statementFileIds: ['file-1'],
                createdAt: new Date('2024-01-01T00:00:00.000Z'),
                status: 'completed',
                summary: {},
                liquidityMetrics: {},
                spendingBreakdown: [],
                idleBalanceAnalysis: {}
            }
        ];

        it('should have correct metadata', () => {
            expect(queryTool.name).toBe('Query Analyses');
            expect(queryTool.description).toBe('Query and filter analyses with optional filters and pagination');
        });

        it('should query analyses successfully', async () => {
            vi.mocked(analysisService.queryAnalyses).mockResolvedValue(mockAnalyses);

            const result = await queryTool.fn({});

            expect(result).toEqual({ analyses: mockAnalyses });
            expect(analysisService.queryAnalyses).toHaveBeenCalledWith({}, {});
        });

        it('should handle filter parameters', async () => {
            vi.mocked(analysisService.queryAnalyses).mockResolvedValue(mockAnalyses);

            const result = await queryTool.fn({
                clientId: 'client-1',
                status: 'completed',
                sortBy: 'createdAt',
                limit: 10,
                page: 1
            });

            expect(result).toEqual({ analyses: mockAnalyses });
            expect(analysisService.queryAnalyses).toHaveBeenCalledWith(
                { clientId: 'client-1', status: 'completed' },
                { sortBy: 'createdAt', limit: 10, page: 1 }
            );
        });

        it('should filter out undefined parameters', async () => {
            vi.mocked(analysisService.queryAnalyses).mockResolvedValue(mockAnalyses);

            await queryTool.fn({
                clientId: 'client-1',
                limit: 20
            });

            expect(analysisService.queryAnalyses).toHaveBeenCalledWith({ clientId: 'client-1' }, { limit: 20 });
        });
    });

    describe('analysis_delete tool', () => {
        const deleteTool = analysisTools.find(tool => tool.id === 'analysis_delete')!;

        const mockAnalysis = {
            id: 'analysis-1',
            clientId: 'client-1',
            statementFileIds: ['file-1'],
            createdAt: new Date('2024-01-01T00:00:00.000Z'),
            status: 'completed',
            summary: {},
            liquidityMetrics: {},
            spendingBreakdown: [],
            idleBalanceAnalysis: {}
        };

        it('should have correct metadata', () => {
            expect(deleteTool.name).toBe('Delete Analysis');
            expect(deleteTool.description).toBe('Delete an analysis record and its associated data');
        });

        it('should delete analysis successfully', async () => {
            vi.mocked(analysisService.deleteAnalysisById).mockResolvedValue(mockAnalysis);

            const result = await deleteTool.fn({ analysisId: 'analysis-1' });

            expect(result).toEqual(mockAnalysis);
            expect(analysisService.deleteAnalysisById).toHaveBeenCalledWith('analysis-1');
        });

        it('should handle service errors', async () => {
            vi.mocked(analysisService.deleteAnalysisById).mockRejectedValue(
                new ApiError(httpStatus.NOT_FOUND, 'Analysis not found')
            );

            await expect(deleteTool.fn({ analysisId: 'invalid-analysis' })).rejects.toThrow('Analysis not found');
        });
    });

    describe('Tool schema validation', () => {
        it('should have correct number of tools', () => {
            expect(analysisTools).toHaveLength(5);
        });

        it('should have all required tool properties', () => {
            analysisTools.forEach(tool => {
                expect(tool).toHaveProperty('id');
                expect(tool).toHaveProperty('name');
                expect(tool).toHaveProperty('description');
                expect(tool).toHaveProperty('inputSchema');
                expect(tool).toHaveProperty('outputSchema');
                expect(tool).toHaveProperty('fn');
                expect(typeof tool.fn).toBe('function');
            });
        });

        it('should have unique tool IDs', () => {
            const ids = analysisTools.map(tool => tool.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(ids.length);
        });
    });
});
