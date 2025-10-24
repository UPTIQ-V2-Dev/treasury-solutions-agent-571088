import app from "../app.js";
import prisma from "../client.js";
import { Role } from '../generated/prisma/index.js';
import { userService } from "../services/index.js";
import httpStatus from 'http-status';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
// Mock auth middleware to inject admin user
vi.mock('../middlewares/auth.ts', () => ({
    default: vi.fn(() => (req, res, next) => {
        req.user = {
            id: 1,
            name: 'Admin User',
            email: 'admin@example.com',
            role: Role.ADMIN
        };
        next();
    })
}));
describe('Admin Config Integration', () => {
    beforeEach(async () => {
        // Clean up test data
        await prisma.systemConfig.deleteMany({});
        // Create test admin user
        await userService.createUser('admin@example.com', 'password123', 'Admin User', Role.ADMIN);
    });
    afterEach(async () => {
        // Clean up test data
        await prisma.systemConfig.deleteMany({});
        await prisma.user.deleteMany({});
        await prisma.token.deleteMany({});
    });
    describe('Configuration Management', () => {
        it('should manage system configuration end-to-end', async () => {
            // 1. Get initial configuration (should be defaults)
            const getResponse = await request(app).get('/v1/admin/config').expect(httpStatus.OK);
            expect(getResponse.body).toMatchObject({
                thresholds: {
                    idleCashThreshold: 100000,
                    liquidityWarningThreshold: 50000,
                    lowBalanceThreshold: 10000,
                    highRiskThreshold: 500000
                },
                features: {
                    enableAutoAnalysis: true,
                    enableEmailNotifications: true,
                    enableRecommendationEngine: true,
                    enableAdvancedReports: false
                }
            });
            // 2. Update configuration
            const updateData = {
                thresholds: {
                    idleCashThreshold: 150000,
                    liquidityWarningThreshold: 75000
                },
                features: {
                    enableAdvancedReports: true
                },
                security: {
                    sessionTimeout: 120,
                    requireMfa: true
                }
            };
            const updateResponse = await request(app).put('/v1/admin/config').send(updateData).expect(httpStatus.OK);
            expect(updateResponse.body).toMatchObject({
                thresholds: {
                    idleCashThreshold: 150000,
                    liquidityWarningThreshold: 75000,
                    lowBalanceThreshold: 10000, // Unchanged
                    highRiskThreshold: 500000 // Unchanged
                },
                features: {
                    enableAutoAnalysis: true, // Unchanged
                    enableEmailNotifications: true, // Unchanged
                    enableRecommendationEngine: true, // Unchanged
                    enableAdvancedReports: true // Updated
                },
                security: {
                    sessionTimeout: 120, // Updated
                    passwordExpiry: 90, // Unchanged
                    requireMfa: true, // Updated
                    auditLogRetention: 365 // Unchanged
                }
            });
            // 3. Verify configuration persists
            const verifyResponse = await request(app).get('/v1/admin/config').expect(httpStatus.OK);
            expect(verifyResponse.body.thresholds.idleCashThreshold).toBe(150000);
            expect(verifyResponse.body.features.enableAdvancedReports).toBe(true);
            expect(verifyResponse.body.security.requireMfa).toBe(true);
            // 4. Reset configuration
            const resetResponse = await request(app).post('/v1/admin/config/reset').expect(httpStatus.OK);
            expect(resetResponse.body.thresholds.idleCashThreshold).toBe(100000);
            expect(resetResponse.body.features.enableAdvancedReports).toBe(false);
            expect(resetResponse.body.security.requireMfa).toBe(false);
            // 5. Verify reset persists
            const finalVerifyResponse = await request(app).get('/v1/admin/config').expect(httpStatus.OK);
            expect(finalVerifyResponse.body.thresholds.idleCashThreshold).toBe(100000);
            expect(finalVerifyResponse.body.features.enableAdvancedReports).toBe(false);
        });
        it('should validate configuration updates', async () => {
            // Test invalid threshold values
            await request(app)
                .put('/v1/admin/config')
                .send({
                thresholds: {
                    idleCashThreshold: -100 // Invalid negative value
                }
            })
                .expect(httpStatus.BAD_REQUEST);
            // Test invalid feature flag
            await request(app)
                .put('/v1/admin/config')
                .send({
                features: {
                    enableAutoAnalysis: 'yes' // Should be boolean
                }
            })
                .expect(httpStatus.BAD_REQUEST);
            // Test invalid rate limit
            await request(app)
                .put('/v1/admin/config')
                .send({
                integrations: {
                    apiRateLimit: 0 // Should be >= 1
                }
            })
                .expect(httpStatus.BAD_REQUEST);
        });
    });
    describe('Error Handling', () => {
        it('should handle validation errors gracefully', async () => {
            // Invalid configuration update
            await request(app)
                .put('/v1/admin/config')
                .send({ thresholds: { idleCashThreshold: 'invalid' } })
                .expect(httpStatus.BAD_REQUEST);
        });
        it('should require at least one field in configuration update', async () => {
            await request(app)
                .put('/v1/admin/config')
                .send({}) // Empty body
                .expect(httpStatus.BAD_REQUEST);
        });
    });
});
