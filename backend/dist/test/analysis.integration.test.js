import app from "../app.js";
import prisma from "../client.js";
import httpStatus from 'http-status';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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
// Mock authentication middleware
vi.mock('../middlewares/auth.ts', () => ({
    default: () => (req, res, next) => {
        req.user = { id: 1, role: 'ADMIN' };
        next();
    }
}));
describe('Analysis Integration Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });
    describe('POST /v1/statements/analyze', () => {
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
            status: 'parsed',
            clientId: 'client-1',
            ParseResult: {
                id: 'parse-1',
                statementFileId: 'file-1',
                totalTransactions: 3,
                dateRangeStart: new Date('2024-01-01'),
                dateRangeEnd: new Date('2024-12-31'),
                accounts: [
                    {
                        accountId: 'ACC-001',
                        accountType: 'Operating',
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
                                description: 'VENDOR PAYMENT XYZ CORP',
                                amount: -25000,
                                type: 'debit',
                                balance: 125000
                            },
                            {
                                date: '2024-01-17',
                                description: 'WIRE TRANSFER FROM ABC CLIENT',
                                amount: 75000,
                                type: 'credit',
                                balance: 200000
                            }
                        ]
                    }
                ],
                status: 'success',
                createdAt: new Date()
            }
        };
        const mockCreatedAnalysis = {
            id: 'analysis-1',
            clientId: 'client-1',
            statementFileIds: ['file-1'],
            createdAt: new Date(),
            status: 'completed',
            summary: expect.any(Object),
            liquidityMetrics: expect.any(Object),
            spendingBreakdown: expect.any(Array),
            idleBalanceAnalysis: expect.any(Object)
        };
        it('should create comprehensive financial analysis', async () => {
            vi.mocked(prisma.client.findUnique).mockResolvedValue(mockClient);
            vi.mocked(prisma.statementFile.findMany).mockResolvedValue([mockStatementFile]);
            vi.mocked(prisma.analysis.create).mockResolvedValue(mockCreatedAnalysis);
            const response = await request(app)
                .post('/v1/statements/analyze')
                .send({
                statementFileIds: ['file-1'],
                clientId: 'client-1',
                analysisOptions: {
                    idleBalanceThreshold: 100000
                }
            })
                .expect(httpStatus.OK);
            expect(response.body).toMatchObject({
                id: 'analysis-1',
                clientId: 'client-1',
                statementFileIds: ['file-1'],
                status: 'completed'
            });
            // Verify analysis was created with proper data structure
            expect(prisma.analysis.create).toHaveBeenCalledWith({
                data: expect.objectContaining({
                    clientId: 'client-1',
                    statementFileIds: ['file-1'],
                    status: 'completed',
                    summary: expect.any(Object),
                    liquidityMetrics: expect.any(Object),
                    spendingBreakdown: expect.any(Array),
                    idleBalanceAnalysis: expect.any(Object)
                })
            });
        });
        it('should handle multiple statement files', async () => {
            const multipleFiles = [
                { ...mockStatementFile, id: 'file-1' },
                { ...mockStatementFile, id: 'file-2' }
            ];
            vi.mocked(prisma.client.findUnique).mockResolvedValue(mockClient);
            vi.mocked(prisma.statementFile.findMany).mockResolvedValue(multipleFiles);
            vi.mocked(prisma.analysis.create).mockResolvedValue({
                ...mockCreatedAnalysis,
                statementFileIds: ['file-1', 'file-2']
            });
            const response = await request(app)
                .post('/v1/statements/analyze')
                .send({
                statementFileIds: ['file-1', 'file-2'],
                clientId: 'client-1'
            })
                .expect(httpStatus.OK);
            expect(response.body.statementFileIds).toEqual(['file-1', 'file-2']);
        });
        it('should validate comprehensive error handling', async () => {
            // Test client not found
            vi.mocked(prisma.client.findUnique).mockResolvedValue(null);
            await request(app)
                .post('/v1/statements/analyze')
                .send({
                statementFileIds: ['file-1'],
                clientId: 'invalid-client'
            })
                .expect(httpStatus.NOT_FOUND);
            // Test files not found
            vi.mocked(prisma.client.findUnique).mockResolvedValue(mockClient);
            vi.mocked(prisma.statementFile.findMany).mockResolvedValue([]);
            await request(app)
                .post('/v1/statements/analyze')
                .send({
                statementFileIds: ['invalid-file'],
                clientId: 'client-1'
            })
                .expect(httpStatus.NOT_FOUND);
            // Test unparsed files
            const unparsedFile = { ...mockStatementFile, ParseResult: null };
            vi.mocked(prisma.statementFile.findMany).mockResolvedValue([unparsedFile]);
            await request(app)
                .post('/v1/statements/analyze')
                .send({
                statementFileIds: ['file-1'],
                clientId: 'client-1'
            })
                .expect(httpStatus.BAD_REQUEST);
        });
    });
    describe('GET /v1/analysis/:analysisId', () => {
        const mockAnalysis = {
            id: 'analysis-1',
            clientId: 'client-1',
            statementFileIds: ['file-1'],
            createdAt: new Date(),
            status: 'completed',
            summary: {
                totalInflow: 125000,
                totalOutflow: 25000,
                netCashFlow: 100000,
                avgDailyBalance: 158333,
                transactionCount: 3
            },
            liquidityMetrics: {
                avgDailyBalance: 158333,
                minBalance: 125000,
                maxBalance: 200000,
                volatility: 0.24,
                liquidityRatio: 1.27
            },
            spendingBreakdown: [
                {
                    category: 'Vendor Payments',
                    amount: 25000,
                    percentage: 100,
                    transactionCount: 1
                }
            ],
            idleBalanceAnalysis: {
                avgIdleAmount: 58333,
                daysWithIdleBalance: 3,
                threshold: 100000,
                potentialYieldGain: 1458
            }
        };
        it('should return detailed analysis', async () => {
            vi.mocked(prisma.analysis.findUnique).mockResolvedValue(mockAnalysis);
            const response = await request(app).get('/v1/analysis/analysis-1').expect(httpStatus.OK);
            expect(response.body).toEqual(mockAnalysis);
            expect(response.body.summary).toHaveProperty('totalInflow');
            expect(response.body.summary).toHaveProperty('totalOutflow');
            expect(response.body.summary).toHaveProperty('netCashFlow');
            expect(response.body.liquidityMetrics).toHaveProperty('avgDailyBalance');
            expect(response.body.spendingBreakdown).toBeInstanceOf(Array);
            expect(response.body.idleBalanceAnalysis).toHaveProperty('potentialYieldGain');
        });
        it('should return 404 for non-existent analysis', async () => {
            vi.mocked(prisma.analysis.findUnique).mockResolvedValue(null);
            await request(app).get('/v1/analysis/invalid-analysis').expect(httpStatus.NOT_FOUND);
        });
    });
    describe('GET /v1/analysis/:analysisId/transactions', () => {
        const mockAnalysis = {
            id: 'analysis-1',
            clientId: 'client-1',
            statementFileIds: ['file-1'],
            createdAt: new Date(),
            status: 'completed',
            summary: {
                totalInflow: 125000,
                totalOutflow: 25000,
                netCashFlow: 100000,
                avgDailyBalance: 158333,
                transactionCount: 3,
                dateRange: {
                    startDate: '2024-01-01T00:00:00.000Z',
                    endDate: '2024-12-31T00:00:00.000Z'
                }
            },
            liquidityMetrics: {
                avgDailyBalance: 158333,
                minBalance: 125000,
                maxBalance: 200000,
                volatility: 0.24,
                liquidityRatio: 1.27
            },
            spendingBreakdown: [
                {
                    category: 'Vendor Payments',
                    amount: 25000,
                    percentage: 100,
                    transactionCount: 1
                }
            ],
            idleBalanceAnalysis: {
                avgIdleAmount: 50000,
                daysWithIdleBalance: 20,
                threshold: 250000,
                potentialYieldGain: 2500
            }
        };
        const mockStatementFile = {
            id: 'file-1',
            type: 'text/csv',
            status: 'processed',
            filename: 'statement.csv',
            size: 2048,
            uploadedAt: new Date(),
            clientId: 'client-1',
            ParseResult: {
                id: 'parse-1',
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
                                description: 'VENDOR PAYMENT XYZ CORP',
                                amount: -25000,
                                type: 'debit',
                                balance: 125000
                            }
                        ]
                    }
                ]
            }
        };
        it('should return paginated transactions', async () => {
            vi.mocked(prisma.analysis.findUnique).mockResolvedValue(mockAnalysis);
            vi.mocked(prisma.statementFile.findMany).mockResolvedValue([mockStatementFile]);
            const response = await request(app)
                .get('/v1/analysis/analysis-1/transactions?page=1&limit=50')
                .expect(httpStatus.OK);
            expect(response.body).toHaveProperty('transactions');
            expect(response.body).toHaveProperty('totalCount');
            expect(response.body).toHaveProperty('page', 1);
            expect(response.body).toHaveProperty('totalPages');
            expect(response.body.transactions).toBeInstanceOf(Array);
            if (response.body.transactions.length > 0) {
                const transaction = response.body.transactions[0];
                expect(transaction).toHaveProperty('id');
                expect(transaction).toHaveProperty('date');
                expect(transaction).toHaveProperty('amount');
                expect(transaction).toHaveProperty('type');
                expect(transaction).toHaveProperty('description');
                expect(transaction).toHaveProperty('accountId');
            }
        });
        it('should handle pagination correctly', async () => {
            vi.mocked(prisma.analysis.findUnique).mockResolvedValue(mockAnalysis);
            vi.mocked(prisma.statementFile.findMany).mockResolvedValue([mockStatementFile]);
            const response = await request(app)
                .get('/v1/analysis/analysis-1/transactions?page=1&limit=1')
                .expect(httpStatus.OK);
            expect(response.body.transactions.length).toBeLessThanOrEqual(1);
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
        it('should return filtered analyses', async () => {
            vi.mocked(prisma.analysis.findMany).mockResolvedValue(mockAnalyses);
            const response = await request(app)
                .get('/v1/analysis?clientId=client-1&status=completed')
                .expect(httpStatus.OK);
            expect(response.body).toBeInstanceOf(Array);
            expect(prisma.analysis.findMany).toHaveBeenCalledWith({
                where: { clientId: 'client-1', status: 'completed' },
                select: expect.any(Object),
                skip: 0,
                take: 10,
                orderBy: { createdAt: 'desc' }
            });
        });
        it('should handle pagination', async () => {
            vi.mocked(prisma.analysis.findMany).mockResolvedValue(mockAnalyses);
            await request(app).get('/v1/analysis?page=2&limit=5').expect(httpStatus.OK);
            expect(prisma.analysis.findMany).toHaveBeenCalledWith({
                where: {},
                select: expect.any(Object),
                skip: 5,
                take: 5,
                orderBy: { createdAt: 'desc' }
            });
        });
    });
    describe('DELETE /v1/analysis/:analysisId', () => {
        const mockAnalysis = {
            id: 'analysis-1',
            clientId: 'client-1',
            statementFileIds: ['file-1'],
            createdAt: new Date(),
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
            vi.mocked(prisma.analysis.findUnique).mockResolvedValue(mockAnalysis);
            vi.mocked(prisma.analysis.delete).mockResolvedValue(mockAnalysis);
            await request(app).delete('/v1/analysis/analysis-1').expect(httpStatus.NO_CONTENT);
            expect(prisma.analysis.delete).toHaveBeenCalledWith({
                where: { id: 'analysis-1' }
            });
        });
        it('should return 404 for non-existent analysis', async () => {
            vi.mocked(prisma.analysis.findUnique).mockResolvedValue(null);
            await request(app).delete('/v1/analysis/invalid-analysis').expect(httpStatus.NOT_FOUND);
        });
    });
    describe('End-to-End Analysis Flow', () => {
        it('should handle complete analysis workflow', async () => {
            const client = {
                id: 'client-1',
                name: 'Complete Test Client',
                createdAt: new Date(),
                updatedAt: new Date(),
                accountIds: ['ACC-001'],
                relationshipManager: 'John Doe',
                status: 'active'
            };
            const statementFile = {
                id: 'file-1',
                type: 'text/csv',
                status: 'processed',
                filename: 'complete-test-statement.csv',
                size: 4096,
                uploadedAt: new Date(),
                clientId: 'client-1',
                ParseResult: {
                    accounts: [
                        {
                            accountId: 'ACC-001',
                            transactions: [
                                {
                                    date: '2024-01-15',
                                    description: 'Large deposit for analysis',
                                    amount: 1000000,
                                    type: 'credit',
                                    balance: 1000000
                                }
                            ]
                        }
                    ]
                }
            };
            const createdAnalysis = {
                id: 'analysis-complete',
                clientId: 'client-1',
                statementFileIds: ['file-1'],
                createdAt: new Date(),
                status: 'completed',
                summary: {
                    totalInflow: 1000000,
                    totalOutflow: 0,
                    netCashFlow: 1000000,
                    avgDailyBalance: 1000000,
                    transactionCount: 1,
                    dateRange: {
                        startDate: '2024-01-15T00:00:00.000Z',
                        endDate: '2024-01-15T00:00:00.000Z'
                    }
                },
                liquidityMetrics: {
                    avgDailyBalance: 1000000,
                    minBalance: 1000000,
                    maxBalance: 1000000,
                    volatility: 0,
                    liquidityRatio: 10
                },
                spendingBreakdown: [],
                idleBalanceAnalysis: {
                    avgIdleAmount: 750000,
                    daysWithIdleBalance: 1,
                    threshold: 250000,
                    potentialYieldGain: 37500
                }
            };
            // Step 1: Create analysis
            vi.mocked(prisma.client.findUnique).mockResolvedValue(client);
            vi.mocked(prisma.statementFile.findMany).mockResolvedValue([statementFile]);
            vi.mocked(prisma.analysis.create).mockResolvedValue(createdAnalysis);
            const createResponse = await request(app)
                .post('/v1/statements/analyze')
                .send({
                statementFileIds: ['file-1'],
                clientId: 'client-1'
            })
                .expect(httpStatus.OK);
            const analysisId = createResponse.body.id;
            // Step 2: Get analysis details
            vi.mocked(prisma.analysis.findUnique).mockResolvedValue({
                ...createdAnalysis,
                summary: { totalInflow: 1000000 },
                liquidityMetrics: { avgDailyBalance: 1000000 }
            });
            await request(app).get(`/v1/analysis/${analysisId}`).expect(httpStatus.OK);
            // Step 3: Get transactions
            vi.mocked(prisma.statementFile.findMany).mockResolvedValue([statementFile]);
            await request(app).get(`/v1/analysis/${analysisId}/transactions`).expect(httpStatus.OK);
            // Step 4: Delete analysis
            vi.mocked(prisma.analysis.delete).mockResolvedValue(createdAnalysis);
            await request(app).delete(`/v1/analysis/${analysisId}`).expect(httpStatus.NO_CONTENT);
        });
    });
});
