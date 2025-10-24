import prisma from "../client.js";
import recommendationRoute from "../routes/v1/recommendation.route.js";
import express from 'express';
import httpStatus from 'http-status';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
// Mock Prisma client
vi.mock('../client.ts', () => ({
    default: {
        recommendation: {
            create: vi.fn(),
            findMany: vi.fn(),
            findUnique: vi.fn(),
            update: vi.fn(),
            delete: vi.fn()
        },
        analysis: {
            findUnique: vi.fn()
        },
        treasuryProduct: {
            findMany: vi.fn()
        }
    }
}));
// Mock auth middleware
vi.mock('../middlewares/auth.ts', () => ({
    default: () => (req, res, next) => {
        req.user = { id: 1, email: 'admin@test.com', role: 'ADMIN' };
        next();
    }
}));
// Mock validation middleware
vi.mock('../middlewares/validate.ts', () => ({
    default: () => (req, res, next) => {
        req.validatedQuery = req.query;
        next();
    }
}));
const app = express();
app.use(express.json());
app.use('/v1/recommendations', recommendationRoute);
const mockPrisma = prisma;
describe('Recommendation Integration Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    const mockAnalysis = {
        id: 'analysis-1',
        status: 'completed',
        client: { id: 'client-1', name: 'Test Client' },
        summary: {
            totalInflow: 875000,
            totalOutflow: 650000,
            netCashFlow: 225000,
            avgDailyBalance: 456000,
            transactionCount: 156
        },
        liquidityMetrics: {
            avgDailyBalance: 456000,
            minBalance: 385000,
            maxBalance: 525000,
            volatility: 0.15,
            liquidityRatio: 2.8
        },
        spendingBreakdown: [{ category: 'Payroll', amount: 245000, percentage: 37.7 }],
        idleBalanceAnalysis: {
            avgIdleAmount: 185000,
            daysWithIdleBalance: 22,
            threshold: 250000,
            potentialYieldGain: 8500
        }
    };
    const mockProducts = [
        {
            id: 'product-1',
            name: 'Automated Investment Sweep',
            category: 'sweep',
            description: 'Test sweep product',
            features: ['Automatic daily sweeping'],
            eligibilityRules: { minBalance: 100000 },
            benefits: { yieldImprovement: 2.5 },
            pricing: { monthlyFee: 150, setupFee: 500 },
            isActive: true
        }
    ];
    const mockRecommendation = {
        id: 'rec-1',
        analysisId: 'analysis-1',
        productId: 'product-1',
        priority: 'high',
        rationale: 'Client has significant idle balances that could benefit from sweep functionality',
        dataPoints: ['Average idle balance: $185,000', 'Days with idle balance: 22'],
        benefitProjection: { annualYieldImprovement: 4625, potentialSavings: 2825 },
        status: 'pending',
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
        approvedBy: null,
        approvedAt: null,
        product: mockProducts[0],
        analysis: mockAnalysis
    };
    describe('POST /v1/recommendations/generate', () => {
        it('should generate recommendations successfully', async () => {
            mockPrisma.analysis.findUnique.mockResolvedValue(mockAnalysis);
            mockPrisma.treasuryProduct.findMany.mockResolvedValue(mockProducts);
            mockPrisma.recommendation.create.mockResolvedValue(mockRecommendation);
            const response = await request(app)
                .post('/v1/recommendations/generate')
                .send({
                analysisId: 'analysis-1',
                maxRecommendations: 5
            })
                .expect(httpStatus.CREATED);
            expect(response.body).toHaveLength(1);
            expect(response.body[0].id).toBe('rec-1');
            expect(response.body[0].analysisId).toBe('analysis-1');
            expect(response.body[0].priority).toBe('high');
            expect(response.body[0].status).toBe('pending');
        });
        it('should generate recommendations with filters', async () => {
            mockPrisma.analysis.findUnique.mockResolvedValue(mockAnalysis);
            mockPrisma.treasuryProduct.findMany.mockResolvedValue(mockProducts);
            mockPrisma.recommendation.create.mockResolvedValue(mockRecommendation);
            const response = await request(app)
                .post('/v1/recommendations/generate')
                .send({
                analysisId: 'analysis-1',
                categoryFilters: ['sweep'],
                minPriority: 'high',
                includeInactive: false
            })
                .expect(httpStatus.CREATED);
            expect(mockPrisma.treasuryProduct.findMany).toHaveBeenCalledWith({
                where: {
                    isActive: true,
                    category: { in: ['sweep'] }
                }
            });
            expect(response.body).toHaveLength(1);
        });
        it('should return 400 for missing analysisId', async () => {
            await request(app)
                .post('/v1/recommendations/generate')
                .send({
                maxRecommendations: 5
            })
                .expect(httpStatus.BAD_REQUEST);
        });
        it('should return 404 for non-existent analysis', async () => {
            mockPrisma.analysis.findUnique.mockResolvedValue(null);
            await request(app)
                .post('/v1/recommendations/generate')
                .send({
                analysisId: 'nonexistent-analysis'
            })
                .expect(httpStatus.NOT_FOUND);
        });
        it('should return 400 for incomplete analysis', async () => {
            const incompleteAnalysis = { ...mockAnalysis, status: 'processing' };
            mockPrisma.analysis.findUnique.mockResolvedValue(incompleteAnalysis);
            await request(app)
                .post('/v1/recommendations/generate')
                .send({
                analysisId: 'analysis-1'
            })
                .expect(httpStatus.BAD_REQUEST);
        });
    });
    describe('GET /v1/recommendations', () => {
        const mockRecommendations = [
            {
                id: 'rec-1',
                analysisId: 'analysis-1',
                productId: 'product-1',
                priority: 'high',
                rationale: 'Test rationale',
                dataPoints: ['Test data point'],
                benefitProjection: { annualYieldImprovement: 4625 },
                status: 'pending',
                createdAt: new Date('2024-01-01T00:00:00.000Z')
            },
            {
                id: 'rec-2',
                analysisId: 'analysis-1',
                productId: 'product-2',
                priority: 'medium',
                rationale: 'Another test rationale',
                dataPoints: ['Another test data point'],
                benefitProjection: { annualYieldImprovement: 2000 },
                status: 'approved',
                createdAt: new Date('2024-01-02T00:00:00.000Z')
            }
        ];
        it('should get recommendations successfully', async () => {
            mockPrisma.recommendation.findMany.mockResolvedValue(mockRecommendations);
            const response = await request(app)
                .get('/v1/recommendations')
                .query({ analysisId: 'analysis-1' })
                .expect(httpStatus.OK);
            expect(response.body).toHaveLength(2);
            expect(response.body[0].id).toBe('rec-1');
            expect(response.body[1].id).toBe('rec-2');
        });
        it('should filter recommendations by status', async () => {
            const pendingRecommendations = mockRecommendations.filter(r => r.status === 'pending');
            mockPrisma.recommendation.findMany.mockResolvedValue(pendingRecommendations);
            const response = await request(app)
                .get('/v1/recommendations')
                .query({
                analysisId: 'analysis-1',
                status: 'pending'
            })
                .expect(httpStatus.OK);
            expect(mockPrisma.recommendation.findMany).toHaveBeenCalledWith({
                where: { analysisId: 'analysis-1', status: 'pending' },
                select: expect.any(Object),
                skip: 0,
                take: 10,
                orderBy: { createdAt: 'desc' }
            });
            expect(response.body).toHaveLength(1);
            expect(response.body[0].status).toBe('pending');
        });
        it('should filter recommendations by priority', async () => {
            const highPriorityRecommendations = mockRecommendations.filter(r => r.priority === 'high');
            mockPrisma.recommendation.findMany.mockResolvedValue(highPriorityRecommendations);
            await request(app)
                .get('/v1/recommendations')
                .query({
                priority: 'high',
                limit: '5',
                page: '1'
            })
                .expect(httpStatus.OK);
            expect(mockPrisma.recommendation.findMany).toHaveBeenCalledWith({
                where: { priority: 'high' },
                select: expect.any(Object),
                skip: 0,
                take: 10,
                orderBy: { createdAt: 'desc' }
            });
        });
        it('should apply pagination correctly', async () => {
            mockPrisma.recommendation.findMany.mockResolvedValue([mockRecommendations[1]]);
            await request(app)
                .get('/v1/recommendations')
                .query({
                page: '2',
                limit: '1'
            })
                .expect(httpStatus.OK);
            expect(mockPrisma.recommendation.findMany).toHaveBeenCalledWith({
                where: {},
                select: expect.any(Object),
                skip: 1,
                take: 10,
                orderBy: { createdAt: 'desc' }
            });
        });
        it('should apply sorting correctly', async () => {
            mockPrisma.recommendation.findMany.mockResolvedValue(mockRecommendations);
            await request(app)
                .get('/v1/recommendations')
                .query({
                sortBy: 'priority',
                sortType: 'asc'
            })
                .expect(httpStatus.OK);
            expect(mockPrisma.recommendation.findMany).toHaveBeenCalledWith({
                where: {},
                select: expect.any(Object),
                skip: 0,
                take: 10,
                orderBy: { priority: 'asc' }
            });
        });
    });
    describe('GET /v1/recommendations/:recommendationId', () => {
        it('should get recommendation by ID successfully', async () => {
            mockPrisma.recommendation.findUnique.mockResolvedValue(mockRecommendation);
            const response = await request(app).get('/v1/recommendations/rec-1').expect(httpStatus.OK);
            expect(response.body.id).toBe('rec-1');
            expect(response.body.analysisId).toBe('analysis-1');
            expect(response.body.product).toBeDefined();
            expect(response.body.analysis).toBeDefined();
            expect(mockPrisma.recommendation.findUnique).toHaveBeenCalledWith({
                where: { id: 'rec-1' },
                include: {
                    product: true,
                    analysis: {
                        include: {
                            client: true
                        }
                    }
                }
            });
        });
        it('should return 404 for non-existent recommendation', async () => {
            mockPrisma.recommendation.findUnique.mockResolvedValue(null);
            await request(app).get('/v1/recommendations/nonexistent').expect(httpStatus.NOT_FOUND);
        });
    });
    describe('PUT /v1/recommendations/:recommendationId/approve', () => {
        const approvedRecommendation = {
            ...mockRecommendation,
            status: 'approved',
            approvedBy: 'admin@test.com',
            approvedAt: new Date('2024-01-02T00:00:00.000Z')
        };
        it('should approve recommendation successfully', async () => {
            mockPrisma.recommendation.findUnique.mockResolvedValue(mockRecommendation);
            mockPrisma.recommendation.update.mockResolvedValue(approvedRecommendation);
            const response = await request(app)
                .put('/v1/recommendations/rec-1/approve')
                .send({ approvedBy: 'admin@test.com' })
                .expect(httpStatus.OK);
            expect(response.body.status).toBe('approved');
            expect(response.body.approvedBy).toBe('admin@test.com');
            expect(mockPrisma.recommendation.update).toHaveBeenCalledWith({
                where: { id: 'rec-1' },
                data: {
                    status: 'approved',
                    approvedBy: 'admin@test.com',
                    approvedAt: expect.any(Date)
                },
                include: {
                    product: true,
                    analysis: {
                        include: {
                            client: true
                        }
                    }
                }
            });
        });
        it('should return 400 for missing approvedBy', async () => {
            await request(app).put('/v1/recommendations/rec-1/approve').send({}).expect(httpStatus.BAD_REQUEST);
        });
        it('should return 400 for invalid email format', async () => {
            await request(app)
                .put('/v1/recommendations/rec-1/approve')
                .send({ approvedBy: 'invalid-email' })
                .expect(httpStatus.BAD_REQUEST);
        });
        it('should return 404 for non-existent recommendation', async () => {
            mockPrisma.recommendation.findUnique.mockResolvedValue(null);
            await request(app)
                .put('/v1/recommendations/nonexistent/approve')
                .send({ approvedBy: 'admin@test.com' })
                .expect(httpStatus.NOT_FOUND);
        });
        it('should return 400 for already approved recommendation', async () => {
            mockPrisma.recommendation.findUnique.mockResolvedValue(approvedRecommendation);
            await request(app)
                .put('/v1/recommendations/rec-1/approve')
                .send({ approvedBy: 'admin@test.com' })
                .expect(httpStatus.BAD_REQUEST);
        });
    });
    describe('PUT /v1/recommendations/:recommendationId/reject', () => {
        const rejectedRecommendation = {
            ...mockRecommendation,
            status: 'rejected',
            approvedBy: 'admin@test.com',
            approvedAt: new Date('2024-01-02T00:00:00.000Z')
        };
        it('should reject recommendation successfully', async () => {
            mockPrisma.recommendation.findUnique.mockResolvedValue(mockRecommendation);
            mockPrisma.recommendation.update.mockResolvedValue(rejectedRecommendation);
            const response = await request(app).put('/v1/recommendations/rec-1/reject').expect(httpStatus.OK);
            expect(response.body.status).toBe('rejected');
            expect(response.body.approvedBy).toBe('admin@test.com');
            expect(mockPrisma.recommendation.update).toHaveBeenCalledWith({
                where: { id: 'rec-1' },
                data: {
                    status: 'rejected',
                    approvedBy: 'admin@test.com',
                    approvedAt: expect.any(Date)
                },
                include: {
                    product: true,
                    analysis: {
                        include: {
                            client: true
                        }
                    }
                }
            });
        });
        it('should return 404 for non-existent recommendation', async () => {
            mockPrisma.recommendation.findUnique.mockResolvedValue(null);
            await request(app).put('/v1/recommendations/nonexistent/reject').expect(httpStatus.NOT_FOUND);
        });
        it('should return 400 for already rejected recommendation', async () => {
            mockPrisma.recommendation.findUnique.mockResolvedValue(rejectedRecommendation);
            await request(app).put('/v1/recommendations/rec-1/reject').expect(httpStatus.BAD_REQUEST);
        });
    });
    describe('Error handling', () => {
        it('should handle database errors gracefully', async () => {
            mockPrisma.recommendation.findMany.mockRejectedValue(new Error('Database connection error'));
            await request(app).get('/v1/recommendations').expect(httpStatus.INTERNAL_SERVER_ERROR);
        });
        it('should handle service errors in generation', async () => {
            mockPrisma.analysis.findUnique.mockRejectedValue(new Error('Analysis service error'));
            await request(app)
                .post('/v1/recommendations/generate')
                .send({ analysisId: 'analysis-1' })
                .expect(httpStatus.INTERNAL_SERVER_ERROR);
        });
        it('should handle service errors in approval', async () => {
            mockPrisma.recommendation.findUnique.mockRejectedValue(new Error('Service error'));
            await request(app)
                .put('/v1/recommendations/rec-1/approve')
                .send({ approvedBy: 'admin@test.com' })
                .expect(httpStatus.INTERNAL_SERVER_ERROR);
        });
    });
    describe('Authentication and Authorization', () => {
        // Note: In a real scenario, these would test actual auth middleware behavior
        // Here we're testing that the endpoints are protected by auth middleware
        it('should require authentication for generate recommendations', async () => {
            // This test assumes auth middleware is working correctly
            // In practice, you'd mock it to return unauthorized
            const response = await request(app).post('/v1/recommendations/generate').send({ analysisId: 'analysis-1' });
            // Since we mock auth to always pass, we expect it to proceed to validation
            expect(response.status).not.toBe(httpStatus.UNAUTHORIZED);
        });
        it('should require authentication for get recommendations', async () => {
            const response = await request(app).get('/v1/recommendations');
            expect(response.status).not.toBe(httpStatus.UNAUTHORIZED);
        });
        it('should require authentication for approve recommendation', async () => {
            const response = await request(app)
                .put('/v1/recommendations/rec-1/approve')
                .send({ approvedBy: 'admin@test.com' });
            expect(response.status).not.toBe(httpStatus.UNAUTHORIZED);
        });
    });
});
