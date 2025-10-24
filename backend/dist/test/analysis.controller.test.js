import app from "../app.js";
import { analysisService } from "../services/index.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from 'http-status';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
// Mock the analysis service
vi.mock('../services/index.ts', async () => {
    const actual = await vi.importActual('../services/index.ts');
    return {
        ...actual,
        analysisService: {
            analyzeStatements: vi.fn(),
            getAnalysisById: vi.fn(),
            getAnalysisTransactions: vi.fn(),
            queryAnalyses: vi.fn(),
            deleteAnalysisById: vi.fn()
        }
    };
});
// Mock authentication middleware
vi.mock('../middlewares/auth.ts', () => ({
    default: () => (req, res, next) => {
        req.user = { id: 1, role: 'ADMIN' };
        next();
    }
}));
describe('Analysis Controller', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    describe('POST /v1/statements/analyze', () => {
        const mockAnalysis = {
            id: 'analysis-1',
            clientId: 'client-1',
            statementFileIds: ['file-1'],
            createdAt: new Date('2024-01-01T00:00:00.000Z'),
            status: 'completed',
            summary: {
                totalInflow: 100000,
                totalOutflow: 50000,
                netCashFlow: 50000,
                avgDailyBalance: 75000,
                transactionCount: 10,
                dateRange: {
                    startDate: '2024-01-01T00:00:00.000Z',
                    endDate: '2024-12-31T00:00:00.000Z'
                }
            },
            liquidityMetrics: {
                avgDailyBalance: 75000,
                minBalance: 50000,
                maxBalance: 100000,
                volatility: 0.2,
                liquidityRatio: 1.5
            },
            spendingBreakdown: [
                {
                    category: 'Payroll',
                    amount: 30000,
                    percentage: 60,
                    transactionCount: 5
                }
            ],
            idleBalanceAnalysis: {
                avgIdleAmount: 25000,
                daysWithIdleBalance: 15,
                threshold: 250000,
                potentialYieldGain: 1250
            }
        };
        it('should analyze statements successfully', async () => {
            vi.mocked(analysisService.analyzeStatements).mockResolvedValue(mockAnalysis);
            const response = await request(app)
                .post('/v1/statements/analyze')
                .send({
                statementFileIds: ['file-1'],
                clientId: 'client-1'
            })
                .expect(httpStatus.OK);
            expect(response.body).toEqual(mockAnalysis);
            expect(analysisService.analyzeStatements).toHaveBeenCalledWith({
                statementFileIds: ['file-1'],
                clientId: 'client-1'
            });
        });
        it('should analyze statements with options', async () => {
            vi.mocked(analysisService.analyzeStatements).mockResolvedValue(mockAnalysis);
            await request(app)
                .post('/v1/statements/analyze')
                .send({
                statementFileIds: ['file-1'],
                clientId: 'client-1',
                analysisOptions: {
                    idleBalanceThreshold: 500000
                }
            })
                .expect(httpStatus.OK);
            expect(analysisService.analyzeStatements).toHaveBeenCalledWith({
                statementFileIds: ['file-1'],
                clientId: 'client-1',
                analysisOptions: {
                    idleBalanceThreshold: 500000
                }
            });
        });
        it('should return 400 for missing required fields', async () => {
            await request(app)
                .post('/v1/statements/analyze')
                .send({
                clientId: 'client-1'
                // missing statementFileIds
            })
                .expect(httpStatus.BAD_REQUEST);
        });
        it('should return 400 for empty statementFileIds', async () => {
            await request(app)
                .post('/v1/statements/analyze')
                .send({
                statementFileIds: [],
                clientId: 'client-1'
            })
                .expect(httpStatus.BAD_REQUEST);
        });
        it('should handle service errors', async () => {
            vi.mocked(analysisService.analyzeStatements).mockRejectedValue(new ApiError(httpStatus.NOT_FOUND, 'Client not found'));
            await request(app)
                .post('/v1/statements/analyze')
                .send({
                statementFileIds: ['file-1'],
                clientId: 'invalid-client'
            })
                .expect(httpStatus.NOT_FOUND);
        });
    });
    describe('GET /v1/analysis/:analysisId', () => {
        const mockAnalysis = {
            id: 'analysis-1',
            clientId: 'client-1',
            statementFileIds: ['file-1'],
            createdAt: new Date('2024-01-01T00:00:00.000Z'),
            status: 'completed',
            summary: {
                totalInflow: 100000,
                totalOutflow: 50000,
                netCashFlow: 50000,
                avgDailyBalance: 75000,
                transactionCount: 10,
                dateRange: {
                    startDate: '2024-01-01T00:00:00.000Z',
                    endDate: '2024-12-31T00:00:00.000Z'
                }
            },
            liquidityMetrics: {
                avgDailyBalance: 75000,
                minBalance: 50000,
                maxBalance: 100000,
                volatility: 0.2,
                liquidityRatio: 1.5
            },
            spendingBreakdown: [
                {
                    category: 'Payroll',
                    amount: 30000,
                    percentage: 60,
                    transactionCount: 5
                }
            ],
            idleBalanceAnalysis: {
                avgIdleAmount: 25000,
                daysWithIdleBalance: 15,
                threshold: 250000,
                potentialYieldGain: 1250
            }
        };
        it('should get analysis successfully', async () => {
            vi.mocked(analysisService.getAnalysisById).mockResolvedValue(mockAnalysis);
            const response = await request(app).get('/v1/analysis/analysis-1').expect(httpStatus.OK);
            expect(response.body).toEqual(mockAnalysis);
            expect(analysisService.getAnalysisById).toHaveBeenCalledWith('analysis-1');
        });
        it('should return 404 when analysis not found', async () => {
            vi.mocked(analysisService.getAnalysisById).mockResolvedValue(null);
            await request(app).get('/v1/analysis/invalid-analysis').expect(httpStatus.NOT_FOUND);
        });
    });
    describe('GET /v1/analysis/:analysisId/transactions', () => {
        const mockTransactions = {
            transactions: [
                {
                    id: 'txn-1',
                    date: '2024-01-15T00:00:00.000Z',
                    amount: 25000,
                    type: 'credit',
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
        it('should get analysis transactions successfully', async () => {
            vi.mocked(analysisService.getAnalysisTransactions).mockResolvedValue(mockTransactions);
            const response = await request(app).get('/v1/analysis/analysis-1/transactions').expect(httpStatus.OK);
            expect(response.body).toEqual(mockTransactions);
            expect(analysisService.getAnalysisTransactions).toHaveBeenCalledWith('analysis-1', {});
        });
        it('should handle pagination parameters', async () => {
            vi.mocked(analysisService.getAnalysisTransactions).mockResolvedValue(mockTransactions);
            await request(app).get('/v1/analysis/analysis-1/transactions?page=2&limit=25').expect(httpStatus.OK);
            expect(analysisService.getAnalysisTransactions).toHaveBeenCalledWith('analysis-1', {
                page: 2,
                limit: 25
            });
        });
        it('should return 404 when analysis not found', async () => {
            vi.mocked(analysisService.getAnalysisTransactions).mockRejectedValue(new ApiError(httpStatus.NOT_FOUND, 'Analysis not found'));
            await request(app).get('/v1/analysis/invalid-analysis/transactions').expect(httpStatus.NOT_FOUND);
        });
        it('should validate pagination parameters', async () => {
            await request(app)
                .get('/v1/analysis/analysis-1/transactions?page=0&limit=300')
                .expect(httpStatus.BAD_REQUEST);
        });
    });
    describe('GET /v1/analysis', () => {
        const mockAnalyses = [
            {
                id: 'analysis-1',
                clientId: 'client-1',
                statementFileIds: ['file-1'],
                createdAt: new Date('2024-01-01T00:00:00.000Z'),
                status: 'completed',
                summary: {
                    totalInflow: 100000,
                    totalOutflow: 50000,
                    netCashFlow: 50000,
                    avgDailyBalance: 75000,
                    transactionCount: 10,
                    dateRange: {
                        startDate: '2024-01-01T00:00:00.000Z',
                        endDate: '2024-12-31T00:00:00.000Z'
                    }
                },
                liquidityMetrics: {
                    avgDailyBalance: 75000,
                    minBalance: 50000,
                    maxBalance: 100000,
                    volatility: 0.2,
                    liquidityRatio: 1.5
                },
                spendingBreakdown: [
                    {
                        category: 'Payroll',
                        amount: 30000,
                        percentage: 60,
                        transactionCount: 5
                    }
                ],
                idleBalanceAnalysis: {
                    avgIdleAmount: 25000,
                    daysWithIdleBalance: 15,
                    threshold: 250000,
                    potentialYieldGain: 1250
                }
            },
            {
                id: 'analysis-2',
                clientId: 'client-1',
                statementFileIds: ['file-2'],
                createdAt: new Date('2024-01-02T00:00:00.000Z'),
                status: 'processing',
                summary: {
                    totalInflow: 80000,
                    totalOutflow: 40000,
                    netCashFlow: 40000,
                    avgDailyBalance: 60000,
                    transactionCount: 8,
                    dateRange: {
                        startDate: '2024-01-01T00:00:00.000Z',
                        endDate: '2024-12-31T00:00:00.000Z'
                    }
                },
                liquidityMetrics: {
                    avgDailyBalance: 60000,
                    minBalance: 40000,
                    maxBalance: 80000,
                    volatility: 0.15,
                    liquidityRatio: 1.2
                },
                spendingBreakdown: [
                    {
                        category: 'Operations',
                        amount: 20000,
                        percentage: 50,
                        transactionCount: 4
                    }
                ],
                idleBalanceAnalysis: {
                    avgIdleAmount: 20000,
                    daysWithIdleBalance: 12,
                    threshold: 250000,
                    potentialYieldGain: 1000
                }
            }
        ];
        it('should get all analyses successfully', async () => {
            vi.mocked(analysisService.queryAnalyses).mockResolvedValue(mockAnalyses);
            const response = await request(app).get('/v1/analysis').expect(httpStatus.OK);
            expect(response.body).toEqual(mockAnalyses);
            expect(analysisService.queryAnalyses).toHaveBeenCalledWith({}, {});
        });
        it('should handle filter parameters', async () => {
            vi.mocked(analysisService.queryAnalyses).mockResolvedValue(mockAnalyses);
            await request(app)
                .get('/v1/analysis?clientId=client-1&status=completed&page=1&limit=10')
                .expect(httpStatus.OK);
            expect(analysisService.queryAnalyses).toHaveBeenCalledWith({ clientId: 'client-1', status: 'completed' }, { page: 1, limit: 10 });
        });
        it('should validate status parameter', async () => {
            await request(app).get('/v1/analysis?status=invalid-status').expect(httpStatus.BAD_REQUEST);
        });
    });
    describe('DELETE /v1/analysis/:analysisId', () => {
        const mockAnalysis = {
            id: 'analysis-1',
            clientId: 'client-1',
            statementFileIds: ['file-1'],
            createdAt: new Date('2024-01-01T00:00:00.000Z'),
            status: 'completed',
            summary: {
                totalInflow: 100000,
                totalOutflow: 50000,
                netCashFlow: 50000,
                avgDailyBalance: 75000,
                transactionCount: 10,
                dateRange: {
                    startDate: '2024-01-01T00:00:00.000Z',
                    endDate: '2024-12-31T00:00:00.000Z'
                }
            },
            liquidityMetrics: {
                avgDailyBalance: 75000,
                minBalance: 50000,
                maxBalance: 100000,
                volatility: 0.2,
                liquidityRatio: 1.5
            },
            spendingBreakdown: [
                {
                    category: 'Payroll',
                    amount: 30000,
                    percentage: 60,
                    transactionCount: 5
                }
            ],
            idleBalanceAnalysis: {
                avgIdleAmount: 25000,
                daysWithIdleBalance: 15,
                threshold: 250000,
                potentialYieldGain: 1250
            }
        };
        it('should delete analysis successfully', async () => {
            vi.mocked(analysisService.deleteAnalysisById).mockResolvedValue(mockAnalysis);
            await request(app).delete('/v1/analysis/analysis-1').expect(httpStatus.NO_CONTENT);
            expect(analysisService.deleteAnalysisById).toHaveBeenCalledWith('analysis-1');
        });
        it('should return 404 when analysis not found', async () => {
            vi.mocked(analysisService.deleteAnalysisById).mockRejectedValue(new ApiError(httpStatus.NOT_FOUND, 'Analysis not found'));
            await request(app).delete('/v1/analysis/invalid-analysis').expect(httpStatus.NOT_FOUND);
        });
    });
});
