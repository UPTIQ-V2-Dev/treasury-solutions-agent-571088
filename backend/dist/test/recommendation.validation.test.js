import recommendationValidation from "../validations/recommendation.validation.js";
import { describe, expect, it } from 'vitest';
describe('Recommendation Validation', () => {
    describe('generateRecommendations validation', () => {
        const { body: schema } = recommendationValidation.generateRecommendations;
        it('should validate valid generate recommendations request', () => {
            const validData = {
                analysisId: 'analysis-123',
                maxRecommendations: 5,
                priorityThreshold: 5,
                includeInactive: false,
                categoryFilters: ['sweep', 'zba'],
                minPriority: 'high'
            };
            const { error } = schema.validate(validData);
            expect(error).toBeUndefined();
        });
        it('should require analysisId', () => {
            const invalidData = {
                maxRecommendations: 5
            };
            const { error } = schema.validate(invalidData);
            expect(error).toBeDefined();
            expect(error.details[0].path).toEqual(['analysisId']);
        });
        it('should validate maxRecommendations range', () => {
            const invalidData = {
                analysisId: 'analysis-123',
                maxRecommendations: 0 // Below minimum
            };
            const { error } = schema.validate(invalidData);
            expect(error).toBeDefined();
            expect(error.details[0].path).toEqual(['maxRecommendations']);
        });
        it('should validate maxRecommendations upper bound', () => {
            const invalidData = {
                analysisId: 'analysis-123',
                maxRecommendations: 25 // Above maximum
            };
            const { error } = schema.validate(invalidData);
            expect(error).toBeDefined();
            expect(error.details[0].path).toEqual(['maxRecommendations']);
        });
        it('should validate priorityThreshold range', () => {
            const invalidData = {
                analysisId: 'analysis-123',
                priorityThreshold: -1 // Below minimum
            };
            const { error } = schema.validate(invalidData);
            expect(error).toBeDefined();
            expect(error.details[0].path).toEqual(['priorityThreshold']);
        });
        it('should validate minPriority enum', () => {
            const invalidData = {
                analysisId: 'analysis-123',
                minPriority: 'invalid'
            };
            const { error } = schema.validate(invalidData);
            expect(error).toBeDefined();
            expect(error.details[0].path).toEqual(['minPriority']);
        });
        it('should validate categoryFilters as array of strings', () => {
            const invalidData = {
                analysisId: 'analysis-123',
                categoryFilters: ['sweep', 123] // Invalid type in array
            };
            const { error } = schema.validate(invalidData);
            expect(error).toBeDefined();
            expect(error.details[0].path).toEqual(['categoryFilters', 1]);
        });
        it('should use default values', () => {
            const data = {
                analysisId: 'analysis-123'
            };
            const { value } = schema.validate(data);
            expect(value.maxRecommendations).toBe(5);
            expect(value.includeInactive).toBe(false);
        });
    });
    describe('getRecommendations validation', () => {
        const { query: schema } = recommendationValidation.getRecommendations;
        it('should validate valid get recommendations query', () => {
            const validQuery = {
                analysisId: 'analysis-123',
                status: 'pending',
                priority: 'high',
                productId: 'product-456',
                sortBy: 'createdAt',
                sortType: 'desc',
                limit: 10,
                page: 1
            };
            const { error } = schema.validate(validQuery);
            expect(error).toBeUndefined();
        });
        it('should validate status enum values', () => {
            const invalidQuery = {
                status: 'invalid-status'
            };
            const { error } = schema.validate(invalidQuery);
            expect(error).toBeDefined();
            expect(error.details[0].path).toEqual(['status']);
        });
        it('should validate priority enum values', () => {
            const invalidQuery = {
                priority: 'invalid-priority'
            };
            const { error } = schema.validate(invalidQuery);
            expect(error).toBeDefined();
            expect(error.details[0].path).toEqual(['priority']);
        });
        it('should validate sortType enum values', () => {
            const invalidQuery = {
                sortType: 'invalid-sort'
            };
            const { error } = schema.validate(invalidQuery);
            expect(error).toBeDefined();
            expect(error.details[0].path).toEqual(['sortType']);
        });
        it('should validate limit as positive integer', () => {
            const invalidQuery = {
                limit: -5
            };
            const { error } = schema.validate(invalidQuery);
            expect(error).toBeDefined();
            expect(error.details[0].path).toEqual(['limit']);
        });
        it('should validate page as positive integer', () => {
            const invalidQuery = {
                page: 0
            };
            const { error } = schema.validate(invalidQuery);
            expect(error).toBeDefined();
            expect(error.details[0].path).toEqual(['page']);
        });
        it('should accept empty query', () => {
            const { error } = schema.validate({});
            expect(error).toBeUndefined();
        });
    });
    describe('getRecommendation validation', () => {
        const { params: schema } = recommendationValidation.getRecommendation;
        it('should validate valid recommendation ID', () => {
            const validParams = {
                recommendationId: 'rec-123'
            };
            const { error } = schema.validate(validParams);
            expect(error).toBeUndefined();
        });
        it('should require recommendationId', () => {
            const invalidParams = {};
            const { error } = schema.validate(invalidParams);
            expect(error).toBeDefined();
            expect(error.details[0].path).toEqual(['recommendationId']);
        });
        it('should validate recommendationId as string', () => {
            const invalidParams = {
                recommendationId: 123
            };
            const { error } = schema.validate(invalidParams);
            expect(error).toBeDefined();
        });
    });
    describe('approveRecommendation validation', () => {
        const validation = recommendationValidation.approveRecommendation;
        it('should validate valid approve request', () => {
            const validParams = { recommendationId: 'rec-123' };
            const validBody = { approvedBy: 'admin@test.com' };
            const { error: paramsError } = validation.params.validate(validParams);
            const { error: bodyError } = validation.body.validate(validBody);
            expect(paramsError).toBeUndefined();
            expect(bodyError).toBeUndefined();
        });
        it('should require recommendationId in params', () => {
            const invalidParams = {};
            const { error } = validation.params.validate(invalidParams);
            expect(error).toBeDefined();
            expect(error.details[0].path).toEqual(['recommendationId']);
        });
        it('should require approvedBy in body', () => {
            const invalidBody = {};
            const { error } = validation.body.validate(invalidBody);
            expect(error).toBeDefined();
            expect(error.details[0].path).toEqual(['approvedBy']);
        });
        it('should validate approvedBy as email', () => {
            const invalidBody = {
                approvedBy: 'not-an-email'
            };
            const { error } = validation.body.validate(invalidBody);
            expect(error).toBeDefined();
            expect(error.details[0].path).toEqual(['approvedBy']);
        });
    });
    describe('rejectRecommendation validation', () => {
        const { params: schema } = recommendationValidation.rejectRecommendation;
        it('should validate valid reject request', () => {
            const validParams = {
                recommendationId: 'rec-123'
            };
            const { error } = schema.validate(validParams);
            expect(error).toBeUndefined();
        });
        it('should require recommendationId', () => {
            const invalidParams = {};
            const { error } = schema.validate(invalidParams);
            expect(error).toBeDefined();
            expect(error.details[0].path).toEqual(['recommendationId']);
        });
        it('should validate recommendationId as string', () => {
            const invalidParams = {
                recommendationId: 123
            };
            const { error } = schema.validate(invalidParams);
            expect(error).toBeDefined();
        });
    });
});
