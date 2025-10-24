import adminConfigValidation from "../validations/admin-config.validation.js";
import { describe, expect, it } from 'vitest';
describe('Admin Config Validation', () => {
    describe('updateConfiguration', () => {
        const { body: schema } = adminConfigValidation.updateConfiguration;
        it('should validate valid configuration update', () => {
            const validData = {
                thresholds: {
                    idleCashThreshold: 150000,
                    liquidityWarningThreshold: 75000
                },
                features: {
                    enableAutoAnalysis: false,
                    enableAdvancedReports: true
                },
                integrations: {
                    apiRateLimit: 2000,
                    maxFileSize: 50
                },
                security: {
                    sessionTimeout: 120,
                    requireMfa: true
                }
            };
            const { error } = schema.validate(validData);
            expect(error).toBeUndefined();
        });
        it('should reject empty body', () => {
            const { error } = schema.validate({});
            expect(error).toBeDefined();
            expect(error?.message).toContain('must contain at least 1 keys');
        });
        it('should validate threshold values', () => {
            const validThresholds = {
                thresholds: {
                    idleCashThreshold: 100000,
                    liquidityWarningThreshold: 0
                }
            };
            const { error } = schema.validate(validThresholds);
            expect(error).toBeUndefined();
        });
        it('should reject negative threshold values', () => {
            const invalidThresholds = {
                thresholds: {
                    idleCashThreshold: -100
                }
            };
            const { error } = schema.validate(invalidThresholds);
            expect(error).toBeDefined();
            expect(error?.message).toContain('must be greater than or equal to 0');
        });
        it('should validate feature flags as booleans', () => {
            const validFeatures = {
                features: {
                    enableAutoAnalysis: true,
                    enableEmailNotifications: false
                }
            };
            const { error } = schema.validate(validFeatures);
            expect(error).toBeUndefined();
        });
        it('should reject non-boolean feature flags', () => {
            const invalidFeatures = {
                features: {
                    enableAutoAnalysis: 'yes'
                }
            };
            const { error } = schema.validate(invalidFeatures);
            expect(error).toBeDefined();
            expect(error?.message).toContain('must be a boolean');
        });
        it('should validate integration settings', () => {
            const validIntegrations = {
                integrations: {
                    bankApiEnabled: true,
                    apiRateLimit: 500,
                    maxFileSize: 25
                }
            };
            const { error } = schema.validate(validIntegrations);
            expect(error).toBeUndefined();
        });
        it('should reject invalid rate limit values', () => {
            const invalidIntegrations = {
                integrations: {
                    apiRateLimit: 0
                }
            };
            const { error } = schema.validate(invalidIntegrations);
            expect(error).toBeDefined();
            expect(error?.message).toContain('must be greater than or equal to 1');
        });
        it('should validate security settings', () => {
            const validSecurity = {
                security: {
                    sessionTimeout: 30,
                    passwordExpiry: 90,
                    requireMfa: false,
                    auditLogRetention: 365
                }
            };
            const { error } = schema.validate(validSecurity);
            expect(error).toBeUndefined();
        });
        it('should reject invalid session timeout', () => {
            const invalidSecurity = {
                security: {
                    sessionTimeout: 0
                }
            };
            const { error } = schema.validate(invalidSecurity);
            expect(error).toBeDefined();
            expect(error?.message).toContain('must be greater than or equal to 1');
        });
        it('should allow partial updates', () => {
            const partialUpdate = {
                thresholds: {
                    idleCashThreshold: 200000
                }
            };
            const { error } = schema.validate(partialUpdate);
            expect(error).toBeUndefined();
        });
    });
    describe('getConfiguration', () => {
        const { query: schema } = adminConfigValidation.getConfiguration;
        it('should accept empty query', () => {
            const { error } = schema.validate({});
            expect(error).toBeUndefined();
        });
    });
    describe('resetConfiguration', () => {
        const { body: schema } = adminConfigValidation.resetConfiguration;
        it('should accept empty body', () => {
            const { error } = schema.validate({});
            expect(error).toBeUndefined();
        });
    });
});
