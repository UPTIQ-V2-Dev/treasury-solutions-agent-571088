import { recommendationService } from "../services/index.js";
import { z } from 'zod';
const recommendationSchema = z.object({
    id: z.string(),
    analysisId: z.string(),
    productId: z.string(),
    priority: z.enum(['high', 'medium', 'low']),
    rationale: z.string(),
    dataPoints: z.array(z.string()),
    benefitProjection: z.record(z.any()),
    status: z.enum(['pending', 'approved', 'rejected']),
    createdAt: z.string(),
    approvedBy: z.string().optional(),
    approvedAt: z.string().optional(),
    product: z
        .object({
        id: z.string(),
        name: z.string(),
        category: z.string(),
        description: z.string(),
        features: z.array(z.string()),
        eligibilityRules: z.record(z.any()),
        benefits: z.record(z.any()),
        pricing: z.record(z.any()),
        isActive: z.boolean()
    })
        .optional(),
    analysis: z
        .object({
        id: z.string(),
        clientId: z.string(),
        statementFileIds: z.array(z.string()),
        createdAt: z.string(),
        status: z.string(),
        summary: z.record(z.any()),
        liquidityMetrics: z.record(z.any()),
        spendingBreakdown: z.record(z.any()),
        idleBalanceAnalysis: z.record(z.any()),
        client: z
            .object({
            id: z.string(),
            name: z.string(),
            accountIds: z.array(z.string()),
            relationshipManager: z.string(),
            status: z.string()
        })
            .optional()
    })
        .optional()
});
const generateRecommendationsTool = {
    id: 'recommendation_generate',
    name: 'Generate Recommendations',
    description: 'Generate treasury product recommendations based on financial analysis data',
    inputSchema: z.object({
        analysisId: z.string(),
        maxRecommendations: z.number().int().min(1).max(20).default(5),
        priorityThreshold: z.number().min(0).max(10).optional(),
        includeInactive: z.boolean().default(false),
        categoryFilters: z.array(z.string()).optional(),
        minPriority: z.enum(['high', 'medium', 'low']).optional()
    }),
    outputSchema: z.object({
        recommendations: z.array(recommendationSchema)
    }),
    fn: async (inputs) => {
        const criteria = {
            analysisId: inputs.analysisId,
            maxRecommendations: inputs.maxRecommendations,
            priorityThreshold: inputs.priorityThreshold
        };
        const options = {
            includeInactive: inputs.includeInactive,
            categoryFilters: inputs.categoryFilters,
            minPriority: inputs.minPriority
        };
        const recommendations = await recommendationService.generateRecommendations(criteria, options);
        return { recommendations };
    }
};
const getRecommendationsTool = {
    id: 'recommendation_get_all',
    name: 'Get Recommendations',
    description: 'Get recommendations with filtering and pagination options',
    inputSchema: z.object({
        analysisId: z.string().optional(),
        status: z.enum(['pending', 'approved', 'rejected']).optional(),
        priority: z.enum(['high', 'medium', 'low']).optional(),
        productId: z.string().optional(),
        sortBy: z.string().optional(),
        sortType: z.enum(['asc', 'desc']).optional(),
        limit: z.number().int().positive().optional(),
        page: z.number().int().positive().optional()
    }),
    outputSchema: z.object({
        recommendations: z.array(recommendationSchema)
    }),
    fn: async (inputs) => {
        const filter = {};
        if (inputs.analysisId)
            filter.analysisId = inputs.analysisId;
        if (inputs.status)
            filter.status = inputs.status;
        if (inputs.priority)
            filter.priority = inputs.priority;
        if (inputs.productId)
            filter.productId = inputs.productId;
        const options = {
            sortBy: inputs.sortBy,
            sortType: inputs.sortType,
            limit: inputs.limit,
            page: inputs.page
        };
        const recommendations = await recommendationService.getRecommendations(filter, options);
        return { recommendations };
    }
};
const getRecommendationTool = {
    id: 'recommendation_get_by_id',
    name: 'Get Recommendation By ID',
    description: 'Get a specific recommendation by its ID with related product and analysis data',
    inputSchema: z.object({
        recommendationId: z.string()
    }),
    outputSchema: recommendationSchema,
    fn: async (inputs) => {
        const recommendation = await recommendationService.getRecommendationById(inputs.recommendationId);
        if (!recommendation) {
            throw new Error('Recommendation not found');
        }
        // Convert date objects to strings
        const result = {
            ...recommendation,
            createdAt: recommendation.createdAt.toISOString(),
            approvedAt: recommendation.approvedAt ? recommendation.approvedAt.toISOString() : undefined
        };
        return result;
    }
};
const getRecommendationsByAnalysisTool = {
    id: 'recommendation_get_by_analysis',
    name: 'Get Recommendations By Analysis',
    description: 'Get all recommendations for a specific analysis',
    inputSchema: z.object({
        analysisId: z.string(),
        status: z.enum(['pending', 'approved', 'rejected']).optional(),
        priority: z.enum(['high', 'medium', 'low']).optional(),
        limit: z.number().int().positive().optional()
    }),
    outputSchema: z.object({
        recommendations: z.array(recommendationSchema)
    }),
    fn: async (inputs) => {
        const filter = { analysisId: inputs.analysisId };
        if (inputs.status)
            filter.status = inputs.status;
        if (inputs.priority)
            filter.priority = inputs.priority;
        const options = {
            limit: inputs.limit || 20,
            sortBy: 'priority',
            sortType: 'desc'
        };
        const recommendations = await recommendationService.getRecommendations(filter, options);
        return { recommendations };
    }
};
const getRecommendationsByPriorityTool = {
    id: 'recommendation_get_by_priority',
    name: 'Get Recommendations By Priority',
    description: 'Get recommendations filtered by priority level',
    inputSchema: z.object({
        priority: z.enum(['high', 'medium', 'low']),
        status: z.enum(['pending', 'approved', 'rejected']).optional(),
        analysisId: z.string().optional(),
        limit: z.number().int().positive().optional()
    }),
    outputSchema: z.object({
        recommendations: z.array(recommendationSchema)
    }),
    fn: async (inputs) => {
        const filter = { priority: inputs.priority };
        if (inputs.status)
            filter.status = inputs.status;
        if (inputs.analysisId)
            filter.analysisId = inputs.analysisId;
        const options = {
            limit: inputs.limit || 50,
            sortBy: 'createdAt',
            sortType: 'desc'
        };
        const recommendations = await recommendationService.getRecommendations(filter, options);
        return { recommendations };
    }
};
const getRecommendationsByStatusTool = {
    id: 'recommendation_get_by_status',
    name: 'Get Recommendations By Status',
    description: 'Get recommendations filtered by approval status',
    inputSchema: z.object({
        status: z.enum(['pending', 'approved', 'rejected']),
        analysisId: z.string().optional(),
        priority: z.enum(['high', 'medium', 'low']).optional(),
        limit: z.number().int().positive().optional()
    }),
    outputSchema: z.object({
        recommendations: z.array(recommendationSchema)
    }),
    fn: async (inputs) => {
        const filter = { status: inputs.status };
        if (inputs.analysisId)
            filter.analysisId = inputs.analysisId;
        if (inputs.priority)
            filter.priority = inputs.priority;
        const options = {
            limit: inputs.limit || 50,
            sortBy: 'createdAt',
            sortType: 'desc'
        };
        const recommendations = await recommendationService.getRecommendations(filter, options);
        return { recommendations };
    }
};
export const recommendationTools = [
    generateRecommendationsTool,
    getRecommendationsTool,
    getRecommendationTool,
    getRecommendationsByAnalysisTool,
    getRecommendationsByPriorityTool,
    getRecommendationsByStatusTool
];
