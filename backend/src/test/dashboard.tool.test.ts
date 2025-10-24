import { dashboardService } from '../services/index.ts';
import { dashboardTools } from '../tools/dashboard.tool.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the dashboard service
vi.mock('../services/dashboard.service.ts', () => ({
    default: {
        getDashboardMetrics: vi.fn()
    }
}));

const mockDashboardService = dashboardService as any;

describe('Dashboard Tools', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getDashboardMetricsTool', () => {
        const getDashboardMetricsTool = dashboardTools.find(tool => tool.id === 'dashboard_get_metrics');

        it('should have correct tool configuration', () => {
            expect(getDashboardMetricsTool).toBeDefined();
            expect(getDashboardMetricsTool!.id).toBe('dashboard_get_metrics');
            expect(getDashboardMetricsTool!.name).toBe('Get Dashboard Metrics');
            expect(getDashboardMetricsTool!.description).toBe(
                'Get comprehensive dashboard overview metrics including client counts, analyses, recommendations, potential savings, recent activity, and top opportunities'
            );
        });

        it('should call dashboardService.getDashboardMetrics and return metrics', async () => {
            const mockMetrics = {
                totalClients: 47,
                activeAnalyses: 12,
                pendingRecommendations: 28,
                totalPotentialSavings: 485000,
                recentActivity: [
                    {
                        id: 'analysis-1',
                        type: 'analysis',
                        clientName: 'ACME Corporation',
                        timestamp: '2024-10-22T14:30:00Z',
                        status: 'completed'
                    }
                ],
                topOpportunities: [
                    {
                        clientName: 'Global Manufacturing Ltd',
                        potentialSavings: 125000,
                        productCategory: 'sweep'
                    }
                ]
            };

            mockDashboardService.getDashboardMetrics.mockResolvedValue(mockMetrics);

            const result = await getDashboardMetricsTool!.fn({});

            expect(mockDashboardService.getDashboardMetrics).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockMetrics);
        });

        it('should handle empty metrics data', async () => {
            const emptyMetrics = {
                totalClients: 0,
                activeAnalyses: 0,
                pendingRecommendations: 0,
                totalPotentialSavings: 0,
                recentActivity: [],
                topOpportunities: []
            };

            mockDashboardService.getDashboardMetrics.mockResolvedValue(emptyMetrics);

            const result = await getDashboardMetricsTool!.fn({});

            expect(result).toEqual(emptyMetrics);
        });

        it('should propagate errors from dashboardService', async () => {
            const errorMessage = 'Database connection failed';
            mockDashboardService.getDashboardMetrics.mockRejectedValue(new Error(errorMessage));

            await expect(getDashboardMetricsTool!.fn({})).rejects.toThrow(errorMessage);
        });

        it('should validate input schema accepts empty object', () => {
            expect(getDashboardMetricsTool).toBeDefined();
            const inputSchema = getDashboardMetricsTool!.inputSchema;
            const result = inputSchema.safeParse({});
            expect(result.success).toBe(true);
        });

        it('should validate output schema with complete metrics', () => {
            expect(getDashboardMetricsTool).toBeDefined();
            expect(getDashboardMetricsTool?.outputSchema).toBeDefined();

            const outputSchema = getDashboardMetricsTool?.outputSchema;
            if (!outputSchema) return;

            const mockOutput = {
                totalClients: 47,
                activeAnalyses: 12,
                pendingRecommendations: 28,
                totalPotentialSavings: 485000,
                recentActivity: [
                    {
                        id: 'analysis-1',
                        type: 'analysis',
                        clientName: 'ACME Corporation',
                        timestamp: '2024-10-22T14:30:00Z',
                        status: 'completed'
                    }
                ],
                topOpportunities: [
                    {
                        clientName: 'Global Manufacturing Ltd',
                        potentialSavings: 125000,
                        productCategory: 'sweep'
                    }
                ]
            };

            const result = outputSchema.safeParse(mockOutput);
            expect(result.success).toBe(true);
        });

        it('should validate output schema with empty arrays', () => {
            expect(getDashboardMetricsTool).toBeDefined();
            expect(getDashboardMetricsTool?.outputSchema).toBeDefined();

            const outputSchema = getDashboardMetricsTool?.outputSchema;
            if (!outputSchema) return;

            const mockOutput = {
                totalClients: 0,
                activeAnalyses: 0,
                pendingRecommendations: 0,
                totalPotentialSavings: 0,
                recentActivity: [],
                topOpportunities: []
            };

            const result = outputSchema.safeParse(mockOutput);
            expect(result.success).toBe(true);
        });

        it('should reject invalid output schema', () => {
            expect(getDashboardMetricsTool).toBeDefined();
            expect(getDashboardMetricsTool?.outputSchema).toBeDefined();

            const outputSchema = getDashboardMetricsTool?.outputSchema;
            if (!outputSchema) return;

            const invalidOutput = {
                totalClients: 'not a number',
                activeAnalyses: 12,
                pendingRecommendations: 28,
                totalPotentialSavings: 485000,
                recentActivity: 'not an array',
                topOpportunities: []
            };

            const result = outputSchema.safeParse(invalidOutput);
            expect(result.success).toBe(false);
        });
    });

    describe('dashboardTools array', () => {
        it('should export dashboard tools array', () => {
            expect(dashboardTools).toBeDefined();
            expect(Array.isArray(dashboardTools)).toBe(true);
            expect(dashboardTools.length).toBe(1);
        });

        it('should contain getDashboardMetrics tool', () => {
            const toolIds = dashboardTools.map(tool => tool.id);
            expect(toolIds).toContain('dashboard_get_metrics');
        });
    });
});
