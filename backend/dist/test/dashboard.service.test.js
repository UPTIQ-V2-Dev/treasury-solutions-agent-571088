import prisma from "../client.js";
import dashboardService from "../services/dashboard.service.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from 'http-status';
import { beforeEach, describe, expect, it, vi } from 'vitest';
// Mock Prisma client
vi.mock('../client.ts', () => ({
    default: {
        client: {
            count: vi.fn()
        },
        analysis: {
            count: vi.fn(),
            findMany: vi.fn()
        },
        recommendation: {
            count: vi.fn(),
            findMany: vi.fn()
        }
    }
}));
const mockPrismaClient = prisma;
describe('Dashboard Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    describe('getDashboardMetrics', () => {
        const mockMetricsData = {
            totalClients: 47,
            activeAnalyses: 12,
            pendingRecommendations: 28,
            recommendationsWithSavings: [
                { benefitProjection: { annualYieldIncrease: 125000 } },
                { benefitProjection: { annualYieldIncrease: 85000 } },
                { benefitProjection: { annualYieldIncrease: 275000 } }
            ],
            recentAnalyses: [
                {
                    id: 'analysis-1',
                    status: 'completed',
                    createdAt: new Date('2024-10-22T14:30:00Z'),
                    client: { name: 'ACME Corporation' }
                },
                {
                    id: 'analysis-2',
                    status: 'processing',
                    createdAt: new Date('2024-10-22T13:30:00Z'),
                    client: { name: 'Global Manufacturing Ltd' }
                }
            ],
            topRecommendations: [
                {
                    benefitProjection: { annualYieldIncrease: 125000 },
                    product: { category: 'sweep' },
                    analysis: { client: { name: 'Global Manufacturing Ltd' } }
                },
                {
                    benefitProjection: { annualYieldIncrease: 85000 },
                    product: { category: 'zba' },
                    analysis: { client: { name: 'Tech Startup Inc' } }
                }
            ]
        };
        it('should return complete dashboard metrics successfully', async () => {
            // Mock all the database calls
            mockPrismaClient.client.count.mockResolvedValue(mockMetricsData.totalClients);
            mockPrismaClient.analysis.count.mockResolvedValue(mockMetricsData.activeAnalyses);
            mockPrismaClient.recommendation.count.mockResolvedValue(mockMetricsData.pendingRecommendations);
            // Mock recommendations for savings calculation
            mockPrismaClient.recommendation.findMany
                .mockResolvedValueOnce(mockMetricsData.recommendationsWithSavings) // For total savings
                .mockResolvedValueOnce(mockMetricsData.topRecommendations); // For top opportunities
            // Mock recent analyses
            mockPrismaClient.analysis.findMany.mockResolvedValue(mockMetricsData.recentAnalyses);
            const result = await dashboardService.getDashboardMetrics();
            // Verify database calls
            expect(mockPrismaClient.client.count).toHaveBeenCalledWith({
                where: { status: 'active' }
            });
            expect(mockPrismaClient.analysis.count).toHaveBeenCalledWith({
                where: {
                    status: {
                        in: ['processing', 'completed']
                    }
                }
            });
            expect(mockPrismaClient.recommendation.count).toHaveBeenCalledWith({
                where: { status: 'pending' }
            });
            expect(mockPrismaClient.recommendation.findMany).toHaveBeenCalledWith({
                where: { status: 'pending' },
                select: {
                    benefitProjection: true
                }
            });
            expect(mockPrismaClient.analysis.findMany).toHaveBeenCalledWith({
                take: 10,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    status: true,
                    createdAt: true,
                    client: {
                        select: { name: true }
                    }
                }
            });
            // Verify response structure and data
            expect(result).toEqual({
                totalClients: 47,
                activeAnalyses: 12,
                pendingRecommendations: 28,
                totalPotentialSavings: 485000, // 125000 + 85000 + 275000
                recentActivity: [
                    {
                        id: 'analysis-1',
                        type: 'analysis',
                        clientName: 'ACME Corporation',
                        timestamp: '2024-10-22T14:30:00.000Z',
                        status: 'completed'
                    },
                    {
                        id: 'analysis-2',
                        type: 'analysis',
                        clientName: 'Global Manufacturing Ltd',
                        timestamp: '2024-10-22T13:30:00.000Z',
                        status: 'processing'
                    }
                ],
                topOpportunities: [
                    {
                        clientName: 'Global Manufacturing Ltd',
                        potentialSavings: 125000,
                        productCategory: 'sweep'
                    },
                    {
                        clientName: 'Tech Startup Inc',
                        potentialSavings: 85000,
                        productCategory: 'zba'
                    }
                ]
            });
        });
        it('should handle zero values correctly', async () => {
            mockPrismaClient.client.count.mockResolvedValue(0);
            mockPrismaClient.analysis.count.mockResolvedValue(0);
            mockPrismaClient.recommendation.count.mockResolvedValue(0);
            mockPrismaClient.recommendation.findMany
                .mockResolvedValueOnce([]) // For total savings
                .mockResolvedValueOnce([]); // For top opportunities
            mockPrismaClient.analysis.findMany.mockResolvedValue([]);
            const result = await dashboardService.getDashboardMetrics();
            expect(result).toEqual({
                totalClients: 0,
                activeAnalyses: 0,
                pendingRecommendations: 0,
                totalPotentialSavings: 0,
                recentActivity: [],
                topOpportunities: []
            });
        });
        it('should handle recommendations with no benefit projection', async () => {
            mockPrismaClient.client.count.mockResolvedValue(5);
            mockPrismaClient.analysis.count.mockResolvedValue(3);
            mockPrismaClient.recommendation.count.mockResolvedValue(2);
            // Mock recommendations with missing or invalid benefit projections
            mockPrismaClient.recommendation.findMany
                .mockResolvedValueOnce([
                { benefitProjection: null },
                { benefitProjection: {} },
                { benefitProjection: { annualYieldIncrease: 'invalid' } },
                { benefitProjection: { annualYieldIncrease: 50000 } }
            ])
                .mockResolvedValueOnce([
                {
                    benefitProjection: { annualYieldIncrease: 50000 },
                    product: { category: 'sweep' },
                    analysis: { client: { name: 'Test Client' } }
                },
                {
                    benefitProjection: null,
                    product: { category: 'zba' },
                    analysis: { client: { name: 'Bad Data Client' } }
                }
            ]);
            mockPrismaClient.analysis.findMany.mockResolvedValue([]);
            const result = await dashboardService.getDashboardMetrics();
            expect(result.totalPotentialSavings).toBe(50000);
            expect(result.topOpportunities).toEqual([
                {
                    clientName: 'Test Client',
                    potentialSavings: 50000,
                    productCategory: 'sweep'
                }
            ]);
        });
        it('should handle database errors gracefully', async () => {
            const errorMessage = 'Database connection failed';
            mockPrismaClient.client.count.mockRejectedValue(new Error(errorMessage));
            await expect(dashboardService.getDashboardMetrics()).rejects.toThrow(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to fetch dashboard metrics: ${errorMessage}`));
        });
        it('should sort top opportunities by potential savings', async () => {
            mockPrismaClient.client.count.mockResolvedValue(5);
            mockPrismaClient.analysis.count.mockResolvedValue(3);
            mockPrismaClient.recommendation.count.mockResolvedValue(4);
            mockPrismaClient.recommendation.findMany
                .mockResolvedValueOnce([]) // For total savings
                .mockResolvedValueOnce([
                {
                    benefitProjection: { annualYieldIncrease: 50000 },
                    product: { category: 'sweep' },
                    analysis: { client: { name: 'Client B' } }
                },
                {
                    benefitProjection: { annualYieldIncrease: 150000 },
                    product: { category: 'zba' },
                    analysis: { client: { name: 'Client A' } }
                },
                {
                    benefitProjection: { annualYieldIncrease: 25000 },
                    product: { category: 'cd' },
                    analysis: { client: { name: 'Client C' } }
                }
            ]);
            mockPrismaClient.analysis.findMany.mockResolvedValue([]);
            const result = await dashboardService.getDashboardMetrics();
            expect(result.topOpportunities).toEqual([
                {
                    clientName: 'Client A',
                    potentialSavings: 150000,
                    productCategory: 'zba'
                },
                {
                    clientName: 'Client B',
                    potentialSavings: 50000,
                    productCategory: 'sweep'
                },
                {
                    clientName: 'Client C',
                    potentialSavings: 25000,
                    productCategory: 'cd'
                }
            ]);
        });
        it('should limit top opportunities to 5 items', async () => {
            mockPrismaClient.client.count.mockResolvedValue(10);
            mockPrismaClient.analysis.count.mockResolvedValue(8);
            mockPrismaClient.recommendation.count.mockResolvedValue(12);
            mockPrismaClient.recommendation.findMany
                .mockResolvedValueOnce([]) // For total savings
                .mockResolvedValueOnce(Array.from({ length: 10 }, (_, i) => ({
                benefitProjection: { annualYieldIncrease: (10 - i) * 10000 },
                product: { category: 'sweep' },
                analysis: { client: { name: `Client ${i + 1}` } }
            })));
            mockPrismaClient.analysis.findMany.mockResolvedValue([]);
            const result = await dashboardService.getDashboardMetrics();
            expect(result.topOpportunities).toHaveLength(5);
            expect(result.topOpportunities[0].potentialSavings).toBe(100000);
            expect(result.topOpportunities[4].potentialSavings).toBe(60000);
        });
    });
});
