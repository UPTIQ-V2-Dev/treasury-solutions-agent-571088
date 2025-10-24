import prisma from "../client.js";
import treasuryProductService from "../services/treasury-product.service.js";
import { beforeEach, describe, expect, it, vi } from 'vitest';
// Mock Prisma client
vi.mock('../client.ts', () => ({
    default: {
        treasuryProduct: {
            findMany: vi.fn(),
            findUnique: vi.fn()
        }
    }
}));
const mockPrismaTreasuryProduct = prisma;
describe('Treasury Product Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    describe('queryTreasuryProducts', () => {
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
                isActive: true
            }
        ];
        it('should return products with default options', async () => {
            mockPrismaTreasuryProduct.treasuryProduct.findMany.mockResolvedValue(mockProducts);
            const result = await treasuryProductService.queryTreasuryProducts({}, {});
            expect(mockPrismaTreasuryProduct.treasuryProduct.findMany).toHaveBeenCalledWith({
                where: {},
                select: {
                    id: true,
                    name: true,
                    category: true,
                    description: true,
                    features: true,
                    eligibilityRules: true,
                    benefits: true,
                    pricing: true,
                    isActive: true
                },
                skip: 0,
                take: 50,
                orderBy: { name: 'asc' }
            });
            expect(result).toEqual(mockProducts);
        });
        it('should return products with custom options', async () => {
            mockPrismaTreasuryProduct.treasuryProduct.findMany.mockResolvedValue(mockProducts);
            const filter = { category: 'sweep', isActive: true };
            const options = { page: 2, limit: 10, sortBy: 'category', sortType: 'desc' };
            const result = await treasuryProductService.queryTreasuryProducts(filter, options);
            expect(mockPrismaTreasuryProduct.treasuryProduct.findMany).toHaveBeenCalledWith({
                where: filter,
                select: {
                    id: true,
                    name: true,
                    category: true,
                    description: true,
                    features: true,
                    eligibilityRules: true,
                    benefits: true,
                    pricing: true,
                    isActive: true
                },
                skip: 10,
                take: 10,
                orderBy: { category: 'desc' }
            });
            expect(result).toEqual(mockProducts);
        });
        it('should return products with custom keys', async () => {
            const productsWithCustomKeys = [
                { id: 'prod-1', name: 'Test Product 1', category: 'sweep' },
                { id: 'prod-2', name: 'Test Product 2', category: 'zba' }
            ];
            mockPrismaTreasuryProduct.treasuryProduct.findMany.mockResolvedValue(productsWithCustomKeys);
            const result = await treasuryProductService.queryTreasuryProducts({}, {}, ['id', 'name', 'category']);
            expect(mockPrismaTreasuryProduct.treasuryProduct.findMany).toHaveBeenCalledWith({
                where: {},
                select: { id: true, name: true, category: true },
                skip: 0,
                take: 50,
                orderBy: { name: 'asc' }
            });
            expect(result).toEqual(productsWithCustomKeys);
        });
    });
    describe('getTreasuryProductById', () => {
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
        it('should return product by id', async () => {
            mockPrismaTreasuryProduct.treasuryProduct.findUnique.mockResolvedValue(mockProduct);
            const result = await treasuryProductService.getTreasuryProductById('prod-1');
            expect(mockPrismaTreasuryProduct.treasuryProduct.findUnique).toHaveBeenCalledWith({
                where: { id: 'prod-1' },
                select: {
                    id: true,
                    name: true,
                    category: true,
                    description: true,
                    features: true,
                    eligibilityRules: true,
                    benefits: true,
                    pricing: true,
                    isActive: true
                }
            });
            expect(result).toEqual(mockProduct);
        });
        it('should return null if product not found', async () => {
            mockPrismaTreasuryProduct.treasuryProduct.findUnique.mockResolvedValue(null);
            const result = await treasuryProductService.getTreasuryProductById('nonexistent-product');
            expect(result).toBeNull();
        });
        it('should return product with custom keys', async () => {
            const productWithCustomKeys = { id: 'prod-1', name: 'Test Product', category: 'sweep' };
            mockPrismaTreasuryProduct.treasuryProduct.findUnique.mockResolvedValue(productWithCustomKeys);
            const result = await treasuryProductService.getTreasuryProductById('prod-1', ['id', 'name', 'category']);
            expect(mockPrismaTreasuryProduct.treasuryProduct.findUnique).toHaveBeenCalledWith({
                where: { id: 'prod-1' },
                select: { id: true, name: true, category: true }
            });
            expect(result).toEqual(productWithCustomKeys);
        });
    });
    describe('getTreasuryProductByName', () => {
        const mockProduct = {
            id: 'prod-1',
            name: 'Test Product',
            category: 'sweep',
            description: 'Test description',
            features: ['feature1'],
            eligibilityRules: { minBalance: 100000 },
            benefits: { yieldImprovement: 2.5 },
            pricing: { setupFee: 500 },
            isActive: true
        };
        it('should return product by name', async () => {
            mockPrismaTreasuryProduct.treasuryProduct.findUnique.mockResolvedValue(mockProduct);
            const result = await treasuryProductService.getTreasuryProductByName('Test Product');
            expect(mockPrismaTreasuryProduct.treasuryProduct.findUnique).toHaveBeenCalledWith({
                where: { name: 'Test Product' },
                select: {
                    id: true,
                    name: true,
                    category: true,
                    description: true,
                    features: true,
                    eligibilityRules: true,
                    benefits: true,
                    pricing: true,
                    isActive: true
                }
            });
            expect(result).toEqual(mockProduct);
        });
        it('should return null if product not found', async () => {
            mockPrismaTreasuryProduct.treasuryProduct.findUnique.mockResolvedValue(null);
            const result = await treasuryProductService.getTreasuryProductByName('Nonexistent Product');
            expect(result).toBeNull();
        });
    });
    describe('getActiveTreasuryProducts', () => {
        const mockActiveProducts = [
            {
                id: 'prod-1',
                name: 'Active Product 1',
                category: 'sweep',
                isActive: true
            },
            {
                id: 'prod-2',
                name: 'Active Product 2',
                category: 'zba',
                isActive: true
            }
        ];
        it('should return all active products', async () => {
            mockPrismaTreasuryProduct.treasuryProduct.findMany.mockResolvedValue(mockActiveProducts);
            const result = await treasuryProductService.getActiveTreasuryProducts();
            expect(mockPrismaTreasuryProduct.treasuryProduct.findMany).toHaveBeenCalledWith({
                where: { isActive: true },
                orderBy: { name: 'asc' }
            });
            expect(result).toEqual(mockActiveProducts);
        });
    });
    describe('getTreasuryProductsByCategory', () => {
        const mockCategoryProducts = [
            {
                id: 'prod-1',
                name: 'Sweep Product 1',
                category: 'sweep',
                isActive: true
            },
            {
                id: 'prod-2',
                name: 'Sweep Product 2',
                category: 'sweep',
                isActive: true
            }
        ];
        it('should return products by category', async () => {
            mockPrismaTreasuryProduct.treasuryProduct.findMany.mockResolvedValue(mockCategoryProducts);
            const result = await treasuryProductService.getTreasuryProductsByCategory('sweep');
            expect(mockPrismaTreasuryProduct.treasuryProduct.findMany).toHaveBeenCalledWith({
                where: {
                    category: 'sweep',
                    isActive: true
                },
                orderBy: { name: 'asc' }
            });
            expect(result).toEqual(mockCategoryProducts);
        });
    });
});
