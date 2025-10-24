import treasuryProductController from "../controllers/treasury-product.controller.js";
import { treasuryProductService } from "../services/index.js";
import ApiError from "../utils/ApiError.js";
import pick from "../utils/pick.js";
import httpStatus from 'http-status';
import { beforeEach, describe, expect, it, vi } from 'vitest';
// Mock services and utilities
vi.mock('../services/index.ts', () => ({
    treasuryProductService: {
        queryTreasuryProducts: vi.fn(),
        getTreasuryProductById: vi.fn()
    }
}));
vi.mock('../utils/pick.ts', () => ({
    default: vi.fn()
}));
vi.mock('../utils/catchAsyncWithAuth.ts', () => ({
    default: (fn) => (req, res, next) => fn(req, res, next)
}));
const mockTreasuryProductService = treasuryProductService;
const mockPick = pick;
describe('Treasury Product Controller', () => {
    let mockRequest;
    let mockResponse;
    let mockNext;
    beforeEach(() => {
        vi.clearAllMocks();
        mockRequest = {
            query: {},
            params: {}
        };
        mockResponse = {
            send: vi.fn(),
            status: vi.fn().mockReturnThis()
        };
        mockNext = vi.fn();
        // Reset mock implementations
        mockPick.mockImplementation((obj, keys) => {
            const result = {};
            keys.forEach((key) => {
                if (obj[key] !== undefined) {
                    result[key] = obj[key];
                }
            });
            return result;
        });
    });
    describe('getTreasuryProducts', () => {
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
        it('should get treasury products successfully', async () => {
            mockTreasuryProductService.queryTreasuryProducts.mockResolvedValue(mockProducts);
            mockRequest.query = {
                category: 'sweep',
                isActive: 'true',
                sortBy: 'name',
                limit: 10,
                page: 1
            };
            await treasuryProductController.getTreasuryProducts(mockRequest, mockResponse, mockNext);
            expect(mockTreasuryProductService.queryTreasuryProducts).toHaveBeenCalledWith({ category: 'sweep', isActive: true }, { sortBy: 'name', limit: 10, page: 1 }, expect.any(Array));
            expect(mockResponse.send).toHaveBeenCalledWith(mockProducts);
        });
        it('should handle isActive string to boolean conversion', async () => {
            mockTreasuryProductService.queryTreasuryProducts.mockResolvedValue([]);
            mockRequest.query = { isActive: 'false' };
            await treasuryProductController.getTreasuryProducts(mockRequest, mockResponse, mockNext);
            expect(mockTreasuryProductService.queryTreasuryProducts).toHaveBeenCalledWith({ isActive: false }, {}, expect.any(Array));
        });
        it('should handle undefined isActive filter', async () => {
            mockTreasuryProductService.queryTreasuryProducts.mockResolvedValue([]);
            await treasuryProductController.getTreasuryProducts(mockRequest, mockResponse, mockNext);
            expect(mockTreasuryProductService.queryTreasuryProducts).toHaveBeenCalledWith({}, {}, expect.any(Array));
        });
    });
    describe('getTreasuryProduct', () => {
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
        it('should get treasury product by id successfully', async () => {
            mockRequest.params.productId = 'prod-1';
            mockTreasuryProductService.getTreasuryProductById.mockResolvedValue(mockProduct);
            await treasuryProductController.getTreasuryProduct(mockRequest, mockResponse, mockNext);
            expect(mockTreasuryProductService.getTreasuryProductById).toHaveBeenCalledWith('prod-1', expect.any(Array));
            expect(mockResponse.send).toHaveBeenCalledWith(mockProduct);
        });
        it('should throw ApiError if product not found', async () => {
            mockRequest.params.productId = 'nonexistent-product';
            mockTreasuryProductService.getTreasuryProductById.mockResolvedValue(null);
            await expect(treasuryProductController.getTreasuryProduct(mockRequest, mockResponse, mockNext)).rejects.toThrow(new ApiError(httpStatus.NOT_FOUND, 'Treasury product not found'));
            expect(mockTreasuryProductService.getTreasuryProductById).toHaveBeenCalledWith('nonexistent-product', expect.any(Array));
            expect(mockResponse.send).not.toHaveBeenCalled();
        });
    });
});
