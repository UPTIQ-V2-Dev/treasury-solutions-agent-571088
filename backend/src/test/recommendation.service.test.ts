import prisma from '../client.ts';
import recommendationService from '../services/recommendation.service.ts';
import ApiError from '../utils/ApiError.ts';
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

const mockPrisma = prisma as any;

describe('Recommendation Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('generateRecommendations', () => {
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
            rationale: 'Test rationale',
            dataPoints: ['Test data point'],
            benefitProjection: { annualYieldImprovement: 4625 },
            status: 'pending',
            createdAt: new Date(),
            product: mockProducts[0],
            analysis: mockAnalysis
        };

        it('should generate recommendations successfully', async () => {
            mockPrisma.analysis.findUnique.mockResolvedValue(mockAnalysis);
            mockPrisma.treasuryProduct.findMany.mockResolvedValue(mockProducts);
            mockPrisma.recommendation.create.mockResolvedValue(mockRecommendation);

            const criteria = { analysisId: 'analysis-1' };
            const result = await recommendationService.generateRecommendations(criteria);

            expect(mockPrisma.analysis.findUnique).toHaveBeenCalledWith({
                where: { id: 'analysis-1' },
                include: { client: true }
            });
            expect(mockPrisma.treasuryProduct.findMany).toHaveBeenCalled();
            expect(result).toHaveLength(1);
            expect(result[0].id).toBe('rec-1');
        });

        it('should throw error if analysis not found', async () => {
            mockPrisma.analysis.findUnique.mockResolvedValue(null);

            const criteria = { analysisId: 'nonexistent' };

            await expect(recommendationService.generateRecommendations(criteria)).rejects.toThrow(ApiError);
            await expect(recommendationService.generateRecommendations(criteria)).rejects.toThrow('Analysis not found');
        });

        it('should throw error if analysis not completed', async () => {
            const incompleteAnalysis = { ...mockAnalysis, status: 'processing' };
            mockPrisma.analysis.findUnique.mockResolvedValue(incompleteAnalysis);

            const criteria = { analysisId: 'analysis-1' };

            await expect(recommendationService.generateRecommendations(criteria)).rejects.toThrow(ApiError);
            await expect(recommendationService.generateRecommendations(criteria)).rejects.toThrow(
                'Analysis must be completed'
            );
        });

        it('should return empty array if no products available', async () => {
            mockPrisma.analysis.findUnique.mockResolvedValue(mockAnalysis);
            mockPrisma.treasuryProduct.findMany.mockResolvedValue([]);

            const criteria = { analysisId: 'analysis-1' };
            const result = await recommendationService.generateRecommendations(criteria);

            expect(result).toEqual([]);
        });

        it('should limit recommendations based on maxRecommendations', async () => {
            mockPrisma.analysis.findUnique.mockResolvedValue(mockAnalysis);
            mockPrisma.treasuryProduct.findMany.mockResolvedValue([
                ...mockProducts,
                { ...mockProducts[0], id: 'product-2' }
            ]);
            mockPrisma.recommendation.create.mockResolvedValue(mockRecommendation);

            const criteria = { analysisId: 'analysis-1', maxRecommendations: 1 };
            const result = await recommendationService.generateRecommendations(criteria);

            expect(result).toHaveLength(1);
        });

        it('should filter products by category', async () => {
            mockPrisma.analysis.findUnique.mockResolvedValue(mockAnalysis);
            mockPrisma.treasuryProduct.findMany.mockResolvedValue(mockProducts);
            mockPrisma.recommendation.create.mockResolvedValue(mockRecommendation);

            const criteria = { analysisId: 'analysis-1' };
            const options = { categoryFilters: ['sweep'] };
            await recommendationService.generateRecommendations(criteria, options);

            expect(mockPrisma.treasuryProduct.findMany).toHaveBeenCalledWith({
                where: {
                    isActive: true,
                    category: { in: ['sweep'] }
                }
            });
        });
    });

    describe('getRecommendations', () => {
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
                createdAt: new Date()
            }
        ];

        it('should get recommendations with default options', async () => {
            mockPrisma.recommendation.findMany.mockResolvedValue(mockRecommendations);

            const filter = { analysisId: 'analysis-1' };
            const result = await recommendationService.getRecommendations(filter);

            expect(mockPrisma.recommendation.findMany).toHaveBeenCalledWith({
                where: filter,
                select: expect.any(Object),
                skip: 0,
                take: 10,
                orderBy: { createdAt: 'desc' }
            });
            expect(result).toEqual(mockRecommendations);
        });

        it('should apply pagination options', async () => {
            mockPrisma.recommendation.findMany.mockResolvedValue(mockRecommendations);

            const filter = {};
            const options = { page: 2, limit: 5 };
            await recommendationService.getRecommendations(filter, options);

            expect(mockPrisma.recommendation.findMany).toHaveBeenCalledWith({
                where: filter,
                select: expect.any(Object),
                skip: 5,
                take: 5,
                orderBy: { createdAt: 'desc' }
            });
        });

        it('should apply sorting options', async () => {
            mockPrisma.recommendation.findMany.mockResolvedValue(mockRecommendations);

            const filter = {};
            const options = { sortBy: 'priority', sortType: 'asc' as const };
            await recommendationService.getRecommendations(filter, options);

            expect(mockPrisma.recommendation.findMany).toHaveBeenCalledWith({
                where: filter,
                select: expect.any(Object),
                skip: 0,
                take: 10,
                orderBy: { priority: 'asc' }
            });
        });
    });

    describe('getRecommendationById', () => {
        const mockRecommendation = {
            id: 'rec-1',
            analysisId: 'analysis-1',
            productId: 'product-1',
            priority: 'high',
            rationale: 'Test rationale',
            dataPoints: ['Test data point'],
            benefitProjection: { annualYieldImprovement: 4625 },
            status: 'pending',
            createdAt: new Date(),
            product: { name: 'Test Product' },
            analysis: { client: { name: 'Test Client' } }
        };

        it('should get recommendation by ID successfully', async () => {
            mockPrisma.recommendation.findUnique.mockResolvedValue(mockRecommendation);

            const result = await recommendationService.getRecommendationById('rec-1');

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
            expect(result).toEqual(mockRecommendation);
        });

        it('should return null for non-existent ID', async () => {
            mockPrisma.recommendation.findUnique.mockResolvedValue(null);

            const result = await recommendationService.getRecommendationById('nonexistent');

            expect(result).toBeNull();
        });
    });

    describe('approveRecommendation', () => {
        const mockRecommendation = {
            id: 'rec-1',
            status: 'pending',
            product: { name: 'Test Product' },
            analysis: { client: { name: 'Test Client' } }
        };

        const mockUpdatedRecommendation = {
            ...mockRecommendation,
            status: 'approved',
            approvedBy: 'admin@test.com',
            approvedAt: new Date()
        };

        it('should approve recommendation successfully', async () => {
            mockPrisma.recommendation.findUnique.mockResolvedValue(mockRecommendation);
            mockPrisma.recommendation.update.mockResolvedValue(mockUpdatedRecommendation);

            const result = await recommendationService.approveRecommendation('rec-1', 'admin@test.com');

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
            expect(result.status).toBe('approved');
        });

        it('should throw error if recommendation not found', async () => {
            mockPrisma.recommendation.findUnique.mockResolvedValue(null);

            await expect(recommendationService.approveRecommendation('nonexistent', 'admin@test.com')).rejects.toThrow(
                ApiError
            );
            await expect(recommendationService.approveRecommendation('nonexistent', 'admin@test.com')).rejects.toThrow(
                'Recommendation not found'
            );
        });

        it('should throw error if recommendation not pending', async () => {
            const approvedRecommendation = { ...mockRecommendation, status: 'approved' };
            mockPrisma.recommendation.findUnique.mockResolvedValue(approvedRecommendation);

            await expect(recommendationService.approveRecommendation('rec-1', 'admin@test.com')).rejects.toThrow(
                ApiError
            );
            await expect(recommendationService.approveRecommendation('rec-1', 'admin@test.com')).rejects.toThrow(
                'Only pending recommendations can be approved'
            );
        });
    });

    describe('rejectRecommendation', () => {
        const mockRecommendation = {
            id: 'rec-1',
            status: 'pending',
            product: { name: 'Test Product' },
            analysis: { client: { name: 'Test Client' } }
        };

        const mockUpdatedRecommendation = {
            ...mockRecommendation,
            status: 'rejected',
            approvedBy: 'admin@test.com',
            approvedAt: new Date()
        };

        it('should reject recommendation successfully', async () => {
            mockPrisma.recommendation.findUnique.mockResolvedValue(mockRecommendation);
            mockPrisma.recommendation.update.mockResolvedValue(mockUpdatedRecommendation);

            const result = await recommendationService.rejectRecommendation('rec-1', 'admin@test.com');

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
            expect(result.status).toBe('rejected');
        });

        it('should throw error if recommendation not found', async () => {
            mockPrisma.recommendation.findUnique.mockResolvedValue(null);

            await expect(recommendationService.rejectRecommendation('nonexistent', 'admin@test.com')).rejects.toThrow(
                ApiError
            );
            await expect(recommendationService.rejectRecommendation('nonexistent', 'admin@test.com')).rejects.toThrow(
                'Recommendation not found'
            );
        });

        it('should throw error if recommendation not pending', async () => {
            const rejectedRecommendation = { ...mockRecommendation, status: 'rejected' };
            mockPrisma.recommendation.findUnique.mockResolvedValue(rejectedRecommendation);

            await expect(recommendationService.rejectRecommendation('rec-1', 'admin@test.com')).rejects.toThrow(
                ApiError
            );
            await expect(recommendationService.rejectRecommendation('rec-1', 'admin@test.com')).rejects.toThrow(
                'Only pending recommendations can be rejected'
            );
        });
    });
});
