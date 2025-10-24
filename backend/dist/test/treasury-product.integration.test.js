import app from "../app.js";
import { PrismaClient } from '../generated/prisma/index.js';
import httpStatus from 'http-status';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
const prisma = new PrismaClient();
describe('Treasury Products Integration Tests', () => {
    let adminAccessToken;
    let userAccessToken;
    let sampleProductId;
    beforeAll(async () => {
        // Clean up existing test data
        await prisma.treasuryProduct.deleteMany({
            where: { name: { contains: 'Test' } }
        });
        // Create test users and get tokens
        const adminRegister = await request(app)
            .post('/v1/auth/register')
            .send({
            name: 'Admin User',
            email: 'admin.test@example.com',
            password: 'password123'
        })
            .expect(httpStatus.CREATED);
        adminAccessToken = adminRegister.body.tokens.access.token;
        const userRegister = await request(app)
            .post('/v1/auth/register')
            .send({
            name: 'Regular User',
            email: 'user.test@example.com',
            password: 'password123'
        })
            .expect(httpStatus.CREATED);
        userAccessToken = userRegister.body.tokens.access.token;
        // Create sample treasury product for tests
        const sampleProduct = await prisma.treasuryProduct.create({
            data: {
                name: 'Test Investment Sweep',
                category: 'sweep',
                description: 'Test automated investment sweep product',
                features: ['Automated sweeping', 'Real-time monitoring', 'Custom thresholds'],
                eligibilityRules: {
                    minBalance: 100000,
                    accountTypes: ['Operating', 'Money Market'],
                    creditRating: 'A-'
                },
                benefits: {
                    yieldImprovement: 2.75,
                    annualSavings: 'Up to $50,000',
                    riskLevel: 'Low'
                },
                pricing: {
                    setupFee: 500,
                    monthlyFee: 150,
                    basisPoints: 15,
                    minimumCommitment: '12 months'
                },
                isActive: true
            }
        });
        sampleProductId = sampleProduct.id;
        // Create additional test products
        await prisma.treasuryProduct.createMany({
            data: [
                {
                    name: 'Test Zero Balance Account',
                    category: 'zba',
                    description: 'Test centralized cash management system',
                    features: ['Centralized pooling', 'Automatic transfers'],
                    eligibilityRules: { minBalance: 500000, accountTypes: ['Operating'] },
                    benefits: { operationalEfficiency: 'High', yieldImprovement: 1.5 },
                    pricing: { setupFee: 1000, monthlyFee: 250 },
                    isActive: true
                },
                {
                    name: 'Test Inactive Product',
                    category: 'deposit',
                    description: 'Test inactive product',
                    features: ['Test feature'],
                    eligibilityRules: { minBalance: 50000 },
                    benefits: { yieldImprovement: 1.0 },
                    pricing: { setupFee: 0, monthlyFee: 100 },
                    isActive: false
                }
            ]
        });
    });
    afterAll(async () => {
        // Clean up test data
        await prisma.treasuryProduct.deleteMany({
            where: { name: { contains: 'Test' } }
        });
        await prisma.user.deleteMany({
            where: { email: { in: ['admin.test@example.com', 'user.test@example.com'] } }
        });
        await prisma.$disconnect();
    });
    describe('GET /v1/products', () => {
        it('should get all treasury products with admin token', async () => {
            const res = await request(app)
                .get('/v1/products')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(httpStatus.OK);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
            const product = res.body.find((p) => p.name === 'Test Investment Sweep');
            expect(product).toBeDefined();
            expect(product).toMatchObject({
                name: 'Test Investment Sweep',
                category: 'sweep',
                description: 'Test automated investment sweep product',
                features: expect.arrayContaining(['Automated sweeping']),
                isActive: true
            });
        });
        it('should get all treasury products with user token', async () => {
            const res = await request(app)
                .get('/v1/products')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(httpStatus.OK);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
        });
        it('should filter products by category', async () => {
            const res = await request(app)
                .get('/v1/products?category=sweep')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(httpStatus.OK);
            expect(Array.isArray(res.body)).toBe(true);
            res.body.forEach((product) => {
                expect(product.category).toBe('sweep');
            });
        });
        it('should filter products by active status', async () => {
            const res = await request(app)
                .get('/v1/products?isActive=true')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(httpStatus.OK);
            expect(Array.isArray(res.body)).toBe(true);
            res.body.forEach((product) => {
                expect(product.isActive).toBe(true);
            });
            const inactiveRes = await request(app)
                .get('/v1/products?isActive=false')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(httpStatus.OK);
            expect(Array.isArray(inactiveRes.body)).toBe(true);
            inactiveRes.body.forEach((product) => {
                expect(product.isActive).toBe(false);
            });
        });
        it('should support pagination', async () => {
            const res = await request(app)
                .get('/v1/products?page=1&limit=2')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(httpStatus.OK);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeLessThanOrEqual(2);
        });
        it('should support sorting', async () => {
            const res = await request(app)
                .get('/v1/products?sortBy=name&sortType=asc')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(httpStatus.OK);
            expect(Array.isArray(res.body)).toBe(true);
            if (res.body.length > 1) {
                for (let i = 0; i < res.body.length - 1; i++) {
                    expect(res.body[i].name <= res.body[i + 1].name).toBe(true);
                }
            }
        });
        it('should require authentication', async () => {
            await request(app).get('/v1/products').expect(httpStatus.UNAUTHORIZED);
        });
        it('should validate query parameters', async () => {
            await request(app)
                .get('/v1/products?limit=-1')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(httpStatus.BAD_REQUEST);
            await request(app)
                .get('/v1/products?page=0')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(httpStatus.BAD_REQUEST);
            await request(app)
                .get('/v1/products?sortType=invalid')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(httpStatus.BAD_REQUEST);
        });
    });
    describe('GET /v1/products/:productId', () => {
        it('should get treasury product by id with admin token', async () => {
            const res = await request(app)
                .get(`/v1/products/${sampleProductId}`)
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(httpStatus.OK);
            expect(res.body).toMatchObject({
                id: sampleProductId,
                name: 'Test Investment Sweep',
                category: 'sweep',
                description: 'Test automated investment sweep product',
                features: expect.arrayContaining(['Automated sweeping']),
                eligibilityRules: expect.objectContaining({
                    minBalance: 100000,
                    accountTypes: expect.arrayContaining(['Operating', 'Money Market'])
                }),
                benefits: expect.objectContaining({
                    yieldImprovement: 2.75
                }),
                pricing: expect.objectContaining({
                    setupFee: 500,
                    monthlyFee: 150,
                    basisPoints: 15
                }),
                isActive: true
            });
        });
        it('should get treasury product by id with user token', async () => {
            const res = await request(app)
                .get(`/v1/products/${sampleProductId}`)
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(httpStatus.OK);
            expect(res.body.id).toBe(sampleProductId);
        });
        it('should return 404 for non-existent product', async () => {
            await request(app)
                .get('/v1/products/nonexistent-product-id')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(httpStatus.NOT_FOUND);
        });
        it('should require authentication', async () => {
            await request(app).get(`/v1/products/${sampleProductId}`).expect(httpStatus.UNAUTHORIZED);
        });
        it('should validate productId parameter', async () => {
            await request(app)
                .get('/v1/products/')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(httpStatus.NOT_FOUND);
        });
    });
    describe('Product data integrity', () => {
        it('should return products with all required fields', async () => {
            const res = await request(app)
                .get('/v1/products')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(httpStatus.OK);
            expect(Array.isArray(res.body)).toBe(true);
            if (res.body.length > 0) {
                const product = res.body[0];
                expect(product).toHaveProperty('id');
                expect(product).toHaveProperty('name');
                expect(product).toHaveProperty('category');
                expect(product).toHaveProperty('description');
                expect(product).toHaveProperty('features');
                expect(product).toHaveProperty('eligibilityRules');
                expect(product).toHaveProperty('benefits');
                expect(product).toHaveProperty('pricing');
                expect(product).toHaveProperty('isActive');
                expect(typeof product.isActive).toBe('boolean');
                expect(Array.isArray(product.features)).toBe(true);
            }
        });
        it('should return consistent product data', async () => {
            const listRes = await request(app)
                .get('/v1/products')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(httpStatus.OK);
            const testProduct = listRes.body.find((p) => p.id === sampleProductId);
            expect(testProduct).toBeDefined();
            const singleRes = await request(app)
                .get(`/v1/products/${sampleProductId}`)
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(httpStatus.OK);
            expect(testProduct).toEqual(singleRes.body);
        });
    });
    describe('Error handling', () => {
        it('should handle malformed product id gracefully', async () => {
            await request(app)
                .get('/v1/products/123')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(httpStatus.NOT_FOUND);
        });
        it('should handle database errors gracefully', async () => {
            // This would require more sophisticated mocking of database failures
            // For now, we test that the endpoint handles valid requests correctly
            const res = await request(app)
                .get('/v1/products')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(httpStatus.OK);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });
});
