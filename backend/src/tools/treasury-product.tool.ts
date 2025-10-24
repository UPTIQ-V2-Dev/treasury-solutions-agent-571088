import { treasuryProductService } from '../services/index.ts';
import { MCPTool } from '../types/mcp.ts';
import { z } from 'zod';

const treasuryProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    category: z.string(),
    description: z.string(),
    features: z.array(z.string()),
    eligibilityRules: z.record(z.any()),
    benefits: z.record(z.any()),
    pricing: z.record(z.any()),
    isActive: z.boolean()
});

const getTreasuryProductsTool: MCPTool = {
    id: 'treasury_product_get_all',
    name: 'Get All Treasury Products',
    description: 'Get all available treasury products with optional filtering',
    inputSchema: z.object({
        category: z.string().optional(),
        isActive: z.boolean().optional(),
        name: z.string().optional(),
        sortBy: z.string().optional(),
        sortType: z.enum(['asc', 'desc']).optional(),
        limit: z.number().int().positive().optional(),
        page: z.number().int().positive().optional()
    }),
    outputSchema: z.object({
        products: z.array(treasuryProductSchema)
    }),
    fn: async (inputs: {
        category?: string;
        isActive?: boolean;
        name?: string;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
        limit?: number;
        page?: number;
    }) => {
        const filter: any = {};
        if (inputs.category) filter.category = inputs.category;
        if (inputs.isActive !== undefined) filter.isActive = inputs.isActive;
        if (inputs.name) filter.name = { contains: inputs.name, mode: 'insensitive' };

        const options = {
            sortBy: inputs.sortBy,
            sortType: inputs.sortType,
            limit: inputs.limit,
            page: inputs.page
        };

        const products = await treasuryProductService.queryTreasuryProducts(filter, options);
        return { products };
    }
};

const getTreasuryProductTool: MCPTool = {
    id: 'treasury_product_get_by_id',
    name: 'Get Treasury Product By ID',
    description: 'Get a specific treasury product by its ID',
    inputSchema: z.object({
        productId: z.string()
    }),
    outputSchema: treasuryProductSchema,
    fn: async (inputs: { productId: string }) => {
        const product = await treasuryProductService.getTreasuryProductById(inputs.productId);
        if (!product) {
            throw new Error('Treasury product not found');
        }
        return product;
    }
};

const getTreasuryProductsByCategoryTool: MCPTool = {
    id: 'treasury_product_get_by_category',
    name: 'Get Treasury Products By Category',
    description: 'Get all active treasury products in a specific category',
    inputSchema: z.object({
        category: z.string()
    }),
    outputSchema: z.object({
        products: z.array(treasuryProductSchema)
    }),
    fn: async (inputs: { category: string }) => {
        const products = await treasuryProductService.getTreasuryProductsByCategory(inputs.category);
        return { products };
    }
};

const getActiveTreasuryProductsTool: MCPTool = {
    id: 'treasury_product_get_active',
    name: 'Get Active Treasury Products',
    description: 'Get all currently active treasury products',
    inputSchema: z.object({}),
    outputSchema: z.object({
        products: z.array(treasuryProductSchema)
    }),
    fn: async () => {
        const products = await treasuryProductService.getActiveTreasuryProducts();
        return { products };
    }
};

const checkProductEligibilityTool: MCPTool = {
    id: 'treasury_product_check_eligibility',
    name: 'Check Product Eligibility',
    description: 'Check if a client meets the eligibility requirements for a specific treasury product',
    inputSchema: z.object({
        productId: z.string(),
        avgDailyBalance: z.number().min(0).optional(),
        transactionCount: z.number().int().min(0).optional(),
        netCashFlow: z.number().optional(),
        volatility: z.number().min(0).max(1).optional()
    }),
    outputSchema: z.object({
        eligible: z.boolean(),
        reasons: z.array(z.string()).optional()
    }),
    fn: async (inputs: {
        productId: string;
        avgDailyBalance?: number;
        transactionCount?: number;
        netCashFlow?: number;
        volatility?: number;
    }) => {
        const clientCriteria = {
            avgDailyBalance: inputs.avgDailyBalance,
            transactionCount: inputs.transactionCount,
            netCashFlow: inputs.netCashFlow,
            volatility: inputs.volatility
        };

        const result = await treasuryProductService.checkProductEligibility(inputs.productId, clientCriteria);
        return result;
    }
};

export const treasuryProductTools: MCPTool[] = [
    getTreasuryProductsTool,
    getTreasuryProductTool,
    getTreasuryProductsByCategoryTool,
    getActiveTreasuryProductsTool,
    checkProductEligibilityTool
];
