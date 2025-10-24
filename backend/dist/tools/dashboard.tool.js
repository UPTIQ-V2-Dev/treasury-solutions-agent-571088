import { dashboardService } from "../services/index.js";
import { z } from 'zod';
const recentActivitySchema = z.object({
    id: z.string(),
    type: z.string(),
    clientName: z.string(),
    timestamp: z.string(),
    status: z.string()
});
const topOpportunitySchema = z.object({
    clientName: z.string(),
    potentialSavings: z.number(),
    productCategory: z.string()
});
const dashboardMetricsSchema = z.object({
    totalClients: z.number(),
    activeAnalyses: z.number(),
    pendingRecommendations: z.number(),
    totalPotentialSavings: z.number(),
    recentActivity: z.array(recentActivitySchema),
    topOpportunities: z.array(topOpportunitySchema)
});
const getDashboardMetricsTool = {
    id: 'dashboard_get_metrics',
    name: 'Get Dashboard Metrics',
    description: 'Get comprehensive dashboard overview metrics including client counts, analyses, recommendations, potential savings, recent activity, and top opportunities',
    inputSchema: z.object({}),
    outputSchema: dashboardMetricsSchema,
    fn: async () => {
        const metrics = await dashboardService.getDashboardMetrics();
        return metrics;
    }
};
export const dashboardTools = [getDashboardMetricsTool];
