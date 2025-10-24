import { analysisService } from '../services/index.ts';
import { MCPTool } from '../types/mcp.ts';
import pick from '../utils/pick.ts';
import { z } from 'zod';

// Schema definitions
const analysisSchema = z.object({
    id: z.string(),
    clientId: z.string(),
    statementFileIds: z.array(z.string()),
    createdAt: z.string(),
    status: z.string(),
    summary: z.any(),
    liquidityMetrics: z.any(),
    spendingBreakdown: z.any(),
    idleBalanceAnalysis: z.any()
});

const transactionSchema = z.object({
    id: z.string(),
    date: z.string(),
    amount: z.number(),
    type: z.enum(['credit', 'debit']),
    category: z.string().optional(),
    description: z.string(),
    counterparty: z.string().optional(),
    balanceAfter: z.number().optional(),
    accountId: z.string()
});

const transactionsResponseSchema = z.object({
    transactions: z.array(transactionSchema),
    totalCount: z.number(),
    page: z.number(),
    totalPages: z.number()
});

// Tool definitions
const analyzeStatementsTool: MCPTool = {
    id: 'analysis_create',
    name: 'Analyze Statements',
    description: 'Perform comprehensive financial analysis on parsed statement data',
    inputSchema: z.object({
        statementFileIds: z.array(z.string()).min(1),
        clientId: z.string(),
        analysisOptions: z
            .object({
                idleBalanceThreshold: z.number().int().min(0).optional(),
                volatilityPeriod: z.number().int().min(1).max(365).optional(),
                includeProjections: z.boolean().optional()
            })
            .optional()
    }),
    outputSchema: analysisSchema,
    fn: async (inputs: {
        statementFileIds: string[];
        clientId: string;
        analysisOptions?: {
            idleBalanceThreshold?: number;
            volatilityPeriod?: number;
            includeProjections?: boolean;
        };
    }) => {
        const analysis = await analysisService.analyzeStatements({
            statementFileIds: inputs.statementFileIds,
            clientId: inputs.clientId,
            analysisOptions: inputs.analysisOptions
        });
        return analysis;
    }
};

const getAnalysisTool: MCPTool = {
    id: 'analysis_get',
    name: 'Get Analysis',
    description: 'Get specific analysis details',
    inputSchema: z.object({
        analysisId: z.string()
    }),
    outputSchema: analysisSchema,
    fn: async (inputs: { analysisId: string }) => {
        const analysis = await analysisService.getAnalysisById(inputs.analysisId);
        if (!analysis) {
            throw new Error(`Analysis not found with ID: ${inputs.analysisId}`);
        }
        return analysis;
    }
};

const getAnalysisTransactionsTool: MCPTool = {
    id: 'analysis_get_transactions',
    name: 'Get Analysis Transactions',
    description: 'Get paginated transaction data for a specific analysis',
    inputSchema: z.object({
        analysisId: z.string(),
        page: z.number().int().min(1).optional(),
        limit: z.number().int().min(1).max(200).optional()
    }),
    outputSchema: transactionsResponseSchema,
    fn: async (inputs: { analysisId: string; page?: number; limit?: number }) => {
        const options = pick(inputs, ['page', 'limit']);
        const result = await analysisService.getAnalysisTransactions(inputs.analysisId, options);
        return result;
    }
};

const queryAnalysesTool: MCPTool = {
    id: 'analysis_query',
    name: 'Query Analyses',
    description: 'Query and filter analyses with optional filters and pagination',
    inputSchema: z.object({
        clientId: z.string().optional(),
        status: z.enum(['processing', 'completed', 'failed']).optional(),
        sortBy: z.string().optional(),
        limit: z.number().int().min(1).optional(),
        page: z.number().int().min(1).optional()
    }),
    outputSchema: z.object({
        analyses: z.array(analysisSchema)
    }),
    fn: async (inputs: {
        clientId?: string;
        status?: 'processing' | 'completed' | 'failed';
        sortBy?: string;
        limit?: number;
        page?: number;
    }) => {
        const filter = pick(inputs, ['clientId', 'status']);
        const options = pick(inputs, ['sortBy', 'limit', 'page']);
        const analyses = await analysisService.queryAnalyses(filter, options);
        return { analyses };
    }
};

const deleteAnalysisTool: MCPTool = {
    id: 'analysis_delete',
    name: 'Delete Analysis',
    description: 'Delete an analysis record and its associated data',
    inputSchema: z.object({
        analysisId: z.string()
    }),
    outputSchema: analysisSchema,
    fn: async (inputs: { analysisId: string }) => {
        const deletedAnalysis = await analysisService.deleteAnalysisById(inputs.analysisId);
        return deletedAnalysis;
    }
};

// Export tools array
export const analysisTools: MCPTool[] = [
    analyzeStatementsTool,
    getAnalysisTool,
    getAnalysisTransactionsTool,
    queryAnalysesTool,
    deleteAnalysisTool
];
