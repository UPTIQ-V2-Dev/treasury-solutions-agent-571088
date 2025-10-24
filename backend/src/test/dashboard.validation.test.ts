import dashboardValidation from '../validations/dashboard.validation.ts';
import { describe, expect, it } from 'vitest';

describe('Dashboard Validation', () => {
    describe('getMetrics validation', () => {
        it('should pass with empty query object', () => {
            const query = {};
            const { error } = dashboardValidation.getMetrics.query.validate(query);
            expect(error).toBeUndefined();
        });

        it('should pass with undefined query', () => {
            const query = undefined;
            const { error } = dashboardValidation.getMetrics.query.validate(query);
            expect(error).toBeUndefined();
        });

        it('should ignore extra query parameters', () => {
            const query = {
                unknownParam: 'value',
                anotherParam: 123
            };
            const { error } = dashboardValidation.getMetrics.query.validate(query);
            expect(error).toBeUndefined();
        });

        it('should handle null query appropriately', () => {
            const query = null;
            const { error } = dashboardValidation.getMetrics.query.validate(query);
            // Null is not a valid object, so error is expected
            expect(error).toBeDefined();
            expect(error?.message).toContain('must be of type object');
        });
    });
});
