import treasuryProductValidation from "../validations/treasury-product.validation.js";
import { describe, expect, it } from 'vitest';
describe('Treasury Product Validation', () => {
    describe('getTreasuryProducts validation', () => {
        it('should validate query parameters correctly', () => {
            const validQueries = [
                {},
                { category: 'sweep' },
                { isActive: true },
                { name: 'Investment Sweep' },
                { sortBy: 'name' },
                { sortType: 'asc' },
                { sortType: 'desc' },
                { limit: 25 },
                { page: 2 },
                {
                    category: 'zba',
                    isActive: false,
                    name: 'Zero Balance',
                    sortBy: 'category',
                    sortType: 'desc',
                    limit: 50,
                    page: 1
                }
            ];
            validQueries.forEach(query => {
                const { error } = treasuryProductValidation.getTreasuryProducts.query.validate(query);
                expect(error).toBeUndefined();
            });
        });
        it('should reject invalid query parameters', () => {
            const invalidQueries = [
                { sortType: 'invalid' },
                { limit: -1 },
                { limit: 0 },
                { limit: 'not-a-number' },
                { page: -1 },
                { page: 0 },
                { page: 'not-a-number' },
                { isActive: 'not-a-boolean' }
            ];
            invalidQueries.forEach(query => {
                const { error } = treasuryProductValidation.getTreasuryProducts.query.validate(query);
                expect(error).toBeDefined();
            });
        });
        it('should allow valid sortType values', () => {
            const validSortTypes = ['asc', 'desc'];
            validSortTypes.forEach(sortType => {
                const { error } = treasuryProductValidation.getTreasuryProducts.query.validate({ sortType });
                expect(error).toBeUndefined();
            });
        });
        it('should validate positive integers for limit and page', () => {
            const validNumbers = [1, 10, 100, 1000];
            validNumbers.forEach(num => {
                const { error: limitError } = treasuryProductValidation.getTreasuryProducts.query.validate({
                    limit: num
                });
                const { error: pageError } = treasuryProductValidation.getTreasuryProducts.query.validate({
                    page: num
                });
                expect(limitError).toBeUndefined();
                expect(pageError).toBeUndefined();
            });
        });
    });
    describe('getTreasuryProduct validation', () => {
        it('should validate productId parameter correctly', () => {
            const validParams = [
                { productId: 'prod-1' },
                { productId: 'treasury-product-123' },
                { productId: 'sweep-account-product' },
                { productId: 'a1b2c3d4e5f6' }
            ];
            validParams.forEach(params => {
                const { error } = treasuryProductValidation.getTreasuryProduct.params.validate(params);
                expect(error).toBeUndefined();
            });
        });
        it('should reject invalid productId parameter', () => {
            const invalidParams = [
                {},
                { productId: '' },
                { productId: null },
                { productId: undefined },
                { productId: 123 },
                { productId: true }
            ];
            invalidParams.forEach(params => {
                const { error } = treasuryProductValidation.getTreasuryProduct.params.validate(params);
                expect(error).toBeDefined();
            });
        });
        it('should require productId parameter', () => {
            const { error } = treasuryProductValidation.getTreasuryProduct.params.validate({});
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('required');
        });
    });
    describe('Edge cases and data types', () => {
        it('should handle boolean values for isActive', () => {
            const booleanValues = [true, false];
            booleanValues.forEach(value => {
                const { error } = treasuryProductValidation.getTreasuryProducts.query.validate({ isActive: value });
                expect(error).toBeUndefined();
            });
        });
        it('should handle string values properly', () => {
            const stringFields = {
                category: 'sweep',
                name: 'Test Product Name',
                sortBy: 'name'
            };
            Object.entries(stringFields).forEach(([field, value]) => {
                const { error } = treasuryProductValidation.getTreasuryProducts.query.validate({ [field]: value });
                expect(error).toBeUndefined();
            });
        });
        it('should handle integer boundaries', () => {
            const maxSafeInteger = Number.MAX_SAFE_INTEGER;
            const { error: limitError } = treasuryProductValidation.getTreasuryProducts.query.validate({
                limit: maxSafeInteger
            });
            const { error: pageError } = treasuryProductValidation.getTreasuryProducts.query.validate({
                page: maxSafeInteger
            });
            expect(limitError).toBeUndefined();
            expect(pageError).toBeUndefined();
        });
    });
});
