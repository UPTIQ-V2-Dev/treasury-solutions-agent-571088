import { treasuryProductService } from '../services/index.ts';
import { treasuryProductTools } from '../tools/treasury-product.tool.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the treasury product service
vi.mock('../services/index.ts', () => ({
    treasuryProductService: {
        queryTreasuryProducts: vi.fn(),
        getTreasuryProductById: vi.fn(),
        getTreasuryProductsByCategory: vi.fn(),
        getActiveTreasuryProducts: vi.fn()
    }
}));

const mockTreasuryProductService = treasuryProductService as any;

describe('Treasury Product Tools', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('treasury_product_get_all tool', () => {
        const getTreasuryProductsTool = treasuryProductTools.find(tool => tool.id === 'treasury_product_get_all');

        const mockProducts = [
            {
                id: 'prod-1',
                name: 'Test Product 1',
                category: 'sweep',
                description: 'Test description 1',
                features: ['feature1', 'feature2'],
                eligibilityRules: { minBalance: 100000 },
                benefits: { yieldImprovement: 2.5 },
                pricing: { setupFee: 500 },
                isActive: true
            },
            {
                id: 'prod-2',
                name: 'Test Product 2',
                category: 'zba',
                description: 'Test description 2',
                features: ['feature3', 'feature4'],
                eligibilityRules: { minBalance: 200000 },
                benefits: { yieldImprovement: 1.8 },
                pricing: { setupFee: 1000 },
                isActive: false
            }
        ];

        it('should exist and have correct properties', () => {
            expect(getTreasuryProductsTool).toBeDefined();
            expect(getTreasuryProductsTool?.name).toBe('Get All Treasury Products');
            expect(getTreasuryProductsTool?.description).toBe(
                'Get all available treasury products with optional filtering'
            );
        });

        it('should get all treasury products without filters', async () => {
            mockTreasuryProductService.queryTreasuryProducts.mockResolvedValue(mockProducts);

            const result = await getTreasuryProductsTool!.fn({});

            expect(mockTreasuryProductService.queryTreasuryProducts).toHaveBeenCalledWith({}, {});
            expect(result).toEqual({ products: mockProducts });
        });

        it('should get treasury products with filters', async () => {
            const activeProducts = [mockProducts[0]];
            mockTreasuryProductService.queryTreasuryProducts.mockResolvedValue(activeProducts);

            const inputs = {
                category: 'sweep',
                isActive: true,
                name: 'Test',
                sortBy: 'name',
                sortType: 'asc' as const,
                limit: 10,
                page: 1
            };

            const result = await getTreasuryProductsTool!.fn(inputs);

            expect(mockTreasuryProductService.queryTreasuryProducts).toHaveBeenCalledWith(
                {
                    category: 'sweep',
                    isActive: true,
                    name: { contains: 'Test', mode: 'insensitive' }
                },
                {
                    sortBy: 'name',
                    sortType: 'asc',
                    limit: 10,
                    page: 1
                }
            );
            expect(result).toEqual({ products: activeProducts });
        });

        it('should validate input schema', () => {
            const validInputs = [
                {},
                { category: 'sweep' },
                { isActive: true },
                { name: 'test product' },
                { sortBy: 'name' },
                { sortType: 'desc' },
                { limit: 25 },
                { page: 2 }
            ];

            validInputs.forEach(input => {
                const result = getTreasuryProductsTool!.inputSchema.safeParse(input);
                expect(result.success).toBe(true);
            });
        });

        it('should reject invalid input schema', () => {
            const invalidInputs = [{ sortType: 'invalid' }, { limit: -1 }, { page: 0 }, { isActive: 'not-boolean' }];

            invalidInputs.forEach(input => {
                const result = getTreasuryProductsTool!.inputSchema.safeParse(input);
                expect(result.success).toBe(false);
            });
        });
    });

    describe('treasury_product_get_by_id tool', () => {
        const getTreasuryProductTool = treasuryProductTools.find(tool => tool.id === 'treasury_product_get_by_id');

        const mockProduct = {
            id: 'prod-1',
            name: 'Test Product',
            category: 'sweep',
            description: 'Test description',
            features: ['feature1', 'feature2'],
            eligibilityRules: { minBalance: 100000 },
            benefits: { yieldImprovement: 2.5 },
            pricing: { setupFee: 500 },
            isActive: true
        };

        it('should exist and have correct properties', () => {
            expect(getTreasuryProductTool).toBeDefined();
            expect(getTreasuryProductTool?.name).toBe('Get Treasury Product By ID');
            expect(getTreasuryProductTool?.description).toBe('Get a specific treasury product by its ID');
        });

        it('should get treasury product by id', async () => {
            mockTreasuryProductService.getTreasuryProductById.mockResolvedValue(mockProduct);

            const result = await getTreasuryProductTool!.fn({ productId: 'prod-1' });

            expect(mockTreasuryProductService.getTreasuryProductById).toHaveBeenCalledWith('prod-1');
            expect(result).toEqual(mockProduct);
        });

        it('should throw error if product not found', async () => {
            mockTreasuryProductService.getTreasuryProductById.mockResolvedValue(null);

            await expect(getTreasuryProductTool!.fn({ productId: 'nonexistent' })).rejects.toThrow(
                'Treasury product not found'
            );
        });

        it('should validate input schema', () => {
            const validInput = { productId: 'prod-1' };
            const result = getTreasuryProductTool!.inputSchema.safeParse(validInput);
            expect(result.success).toBe(true);
        });

        it('should reject invalid input schema', () => {
            const invalidInputs = [{}, { productId: '' }, { productId: 123 }, { productId: null }];

            invalidInputs.forEach(input => {
                const result = getTreasuryProductTool!.inputSchema.safeParse(input);
                expect(result.success).toBe(false);
            });
        });
    });

    describe('treasury_product_get_by_category tool', () => {
        const getTreasuryProductsByCategoryTool = treasuryProductTools.find(
            tool => tool.id === 'treasury_product_get_by_category'
        );

        const mockCategoryProducts = [
            {
                id: 'prod-1',
                name: 'Sweep Product 1',
                category: 'sweep',
                description: 'Sweep description 1',
                features: ['feature1'],
                eligibilityRules: { minBalance: 100000 },
                benefits: { yieldImprovement: 2.5 },
                pricing: { setupFee: 500 },
                isActive: true
            }
        ];

        it('should exist and have correct properties', () => {
            expect(getTreasuryProductsByCategoryTool).toBeDefined();
            expect(getTreasuryProductsByCategoryTool?.name).toBe('Get Treasury Products By Category');
            expect(getTreasuryProductsByCategoryTool?.description).toBe(
                'Get all active treasury products in a specific category'
            );
        });

        it('should get treasury products by category', async () => {
            mockTreasuryProductService.getTreasuryProductsByCategory.mockResolvedValue(mockCategoryProducts);

            const result = await getTreasuryProductsByCategoryTool!.fn({ category: 'sweep' });

            expect(mockTreasuryProductService.getTreasuryProductsByCategory).toHaveBeenCalledWith('sweep');
            expect(result).toEqual({ products: mockCategoryProducts });
        });

        it('should validate input schema', () => {
            const validInput = { category: 'sweep' };
            const result = getTreasuryProductsByCategoryTool!.inputSchema.safeParse(validInput);
            expect(result.success).toBe(true);
        });

        it('should reject invalid input schema', () => {
            const invalidInputs = [{}, { category: '' }, { category: 123 }, { category: null }];

            invalidInputs.forEach(input => {
                const result = getTreasuryProductsByCategoryTool!.inputSchema.safeParse(input);
                expect(result.success).toBe(false);
            });
        });
    });

    describe('treasury_product_get_active tool', () => {
        const getActiveTreasuryProductsTool = treasuryProductTools.find(
            tool => tool.id === 'treasury_product_get_active'
        );

        const mockActiveProducts = [
            {
                id: 'prod-1',
                name: 'Active Product 1',
                category: 'sweep',
                description: 'Active description 1',
                features: ['feature1'],
                eligibilityRules: { minBalance: 100000 },
                benefits: { yieldImprovement: 2.5 },
                pricing: { setupFee: 500 },
                isActive: true
            }
        ];

        it('should exist and have correct properties', () => {
            expect(getActiveTreasuryProductsTool).toBeDefined();
            expect(getActiveTreasuryProductsTool?.name).toBe('Get Active Treasury Products');
            expect(getActiveTreasuryProductsTool?.description).toBe('Get all currently active treasury products');
        });

        it('should get all active treasury products', async () => {
            mockTreasuryProductService.getActiveTreasuryProducts.mockResolvedValue(mockActiveProducts);

            const result = await getActiveTreasuryProductsTool!.fn({});

            expect(mockTreasuryProductService.getActiveTreasuryProducts).toHaveBeenCalledWith();
            expect(result).toEqual({ products: mockActiveProducts });
        });

        it('should validate empty input schema', () => {
            const validInput = {};
            const result = getActiveTreasuryProductsTool!.inputSchema.safeParse(validInput);
            expect(result.success).toBe(true);
        });
    });

    describe('Tool array structure', () => {
        it('should export all four tools', () => {
            expect(treasuryProductTools).toHaveLength(4);

            const toolIds = treasuryProductTools.map(tool => tool.id);
            expect(toolIds).toContain('treasury_product_get_all');
            expect(toolIds).toContain('treasury_product_get_by_id');
            expect(toolIds).toContain('treasury_product_get_by_category');
            expect(toolIds).toContain('treasury_product_get_active');
        });

        it('should have unique tool ids', () => {
            const toolIds = treasuryProductTools.map(tool => tool.id);
            const uniqueIds = [...new Set(toolIds)];
            expect(uniqueIds).toHaveLength(toolIds.length);
        });

        it('should have valid output schemas for all tools', () => {
            treasuryProductTools.forEach(tool => {
                expect(tool.outputSchema).toBeDefined();
                if (tool.outputSchema) {
                    expect(typeof tool.outputSchema.safeParse).toBe('function');
                }
            });
        });
    });
});
