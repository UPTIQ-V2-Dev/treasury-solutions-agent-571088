import app from "../app.js";
import prisma from "../client.js";
import { TokenType } from '../generated/prisma/index.js';
import httpStatus from 'http-status';
import request from 'supertest';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
// Integration tests that test the full authentication flow
describe('Auth Integration Tests', () => {
    beforeAll(async () => {
        // Clean up test data
        await prisma.token.deleteMany();
        await prisma.user.deleteMany();
    });
    beforeEach(async () => {
        // Clean up between tests
        await prisma.token.deleteMany();
        await prisma.user.deleteMany();
    });
    describe('Complete Authentication Flow', () => {
        const testUser = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        };
        it('should complete full auth flow: register -> login -> refresh -> logout', async () => {
            // 1. Register
            const registerResponse = await request(app)
                .post('/v1/auth/register')
                .send(testUser)
                .expect(httpStatus.CREATED);
            expect(registerResponse.body).toHaveProperty('user');
            expect(registerResponse.body).toHaveProperty('tokens');
            expect(registerResponse.body.user.email).toBe(testUser.email);
            expect(registerResponse.body.user.name).toBe(testUser.name);
            expect(registerResponse.body.user.role).toBe('USER');
            expect(registerResponse.body.user.isEmailVerified).toBe(false);
            expect(registerResponse.body.user).not.toHaveProperty('password');
            expect(registerResponse.body.tokens).toHaveProperty('access');
            expect(registerResponse.body.tokens).toHaveProperty('refresh');
            // const { refreshToken } = registerResponse.body.tokens.refresh; // Not used in this test
            // 2. Login
            const loginResponse = await request(app)
                .post('/v1/auth/login')
                .send({ email: testUser.email, password: testUser.password })
                .expect(httpStatus.OK);
            expect(loginResponse.body).toHaveProperty('user');
            expect(loginResponse.body).toHaveProperty('tokens');
            expect(loginResponse.body.user.email).toBe(testUser.email);
            const newRefreshToken = loginResponse.body.tokens.refresh.token;
            // 3. Refresh tokens
            const refreshResponse = await request(app)
                .post('/v1/auth/refresh')
                .send({ refreshToken: newRefreshToken })
                .expect(httpStatus.OK);
            expect(refreshResponse.body).toHaveProperty('tokens');
            expect(refreshResponse.body.tokens).toHaveProperty('access');
            expect(refreshResponse.body.tokens).toHaveProperty('refresh');
            const finalRefreshToken = refreshResponse.body.tokens.refresh.token;
            // 4. Logout
            await request(app)
                .post('/v1/auth/logout')
                .send({ refreshToken: finalRefreshToken })
                .expect(httpStatus.NO_CONTENT);
            // Verify token is deleted
            const tokenCount = await prisma.token.count({
                where: { token: finalRefreshToken }
            });
            expect(tokenCount).toBe(0);
        });
        it('should handle password reset flow', async () => {
            // Register user first
            await request(app).post('/v1/auth/register').send(testUser).expect(httpStatus.CREATED);
            // Request password reset
            await request(app)
                .post('/v1/auth/forgot-password')
                .send({ email: testUser.email })
                .expect(httpStatus.NO_CONTENT);
            // Check that reset token was created
            const resetToken = await prisma.token.findFirst({
                where: { type: TokenType.RESET_PASSWORD }
            });
            expect(resetToken).toBeDefined();
            // Reset password
            const newPassword = 'newPassword123';
            await request(app)
                .post(`/v1/auth/reset-password?token=${resetToken?.token}`)
                .send({ password: newPassword })
                .expect(httpStatus.NO_CONTENT);
            // Verify old password doesn't work
            await request(app)
                .post('/v1/auth/login')
                .send({ email: testUser.email, password: testUser.password })
                .expect(httpStatus.UNAUTHORIZED);
            // Verify new password works
            await request(app)
                .post('/v1/auth/login')
                .send({ email: testUser.email, password: newPassword })
                .expect(httpStatus.OK);
        });
        it('should handle email verification flow', async () => {
            // Register user
            const registerResponse = await request(app)
                .post('/v1/auth/register')
                .send(testUser)
                .expect(httpStatus.CREATED);
            const accessToken = registerResponse.body.tokens.access.token;
            // Check user is not verified initially
            expect(registerResponse.body.user.isEmailVerified).toBe(false);
            // Send verification email
            await request(app)
                .post('/v1/auth/send-verification-email')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(httpStatus.NO_CONTENT);
            // Get verification token
            const verifyToken = await prisma.token.findFirst({
                where: { type: TokenType.VERIFY_EMAIL }
            });
            expect(verifyToken).toBeDefined();
            // Verify email
            await request(app).post(`/v1/auth/verify-email?token=${verifyToken?.token}`).expect(httpStatus.NO_CONTENT);
            // Check user is now verified
            const user = await prisma.user.findUnique({
                where: { email: testUser.email }
            });
            expect(user?.isEmailVerified).toBe(true);
        });
    });
    describe('Error Handling', () => {
        it('should reject duplicate email registration', async () => {
            const userData = {
                name: 'User One',
                email: 'duplicate@example.com',
                password: 'password123'
            };
            // Register first user
            await request(app).post('/v1/auth/register').send(userData).expect(httpStatus.CREATED);
            // Try to register with same email
            await request(app)
                .post('/v1/auth/register')
                .send({ ...userData, name: 'User Two' })
                .expect(httpStatus.BAD_REQUEST);
        });
        it('should reject invalid credentials', async () => {
            // Try to login with non-existent user
            await request(app)
                .post('/v1/auth/login')
                .send({ email: 'nonexistent@example.com', password: 'password123' })
                .expect(httpStatus.UNAUTHORIZED);
        });
        it('should reject invalid tokens', async () => {
            // Try logout with invalid token
            await request(app)
                .post('/v1/auth/logout')
                .send({ refreshToken: 'invalid-token' })
                .expect(httpStatus.NOT_FOUND);
            // Try refresh with invalid token
            await request(app)
                .post('/v1/auth/refresh')
                .send({ refreshToken: 'invalid-token' })
                .expect(httpStatus.UNAUTHORIZED);
            // Try reset password with invalid token
            await request(app)
                .post('/v1/auth/reset-password?token=invalid-token')
                .send({ password: 'newPassword123' })
                .expect(httpStatus.UNAUTHORIZED);
            // Try verify email with invalid token
            await request(app).post('/v1/auth/verify-email?token=invalid-token').expect(httpStatus.UNAUTHORIZED);
        });
        it('should handle non-existent email in forgot password', async () => {
            await request(app)
                .post('/v1/auth/forgot-password')
                .send({ email: 'nonexistent@example.com' })
                .expect(httpStatus.NOT_FOUND);
        });
    });
    describe('Response Format Compliance', () => {
        const testUser = {
            name: 'Format Test User',
            email: 'format@example.com',
            password: 'password123'
        };
        it('should return correct response format for register', async () => {
            const response = await request(app).post('/v1/auth/register').send(testUser).expect(httpStatus.CREATED);
            // Verify response structure matches API specification
            expect(response.body).toHaveProperty('user');
            expect(response.body).toHaveProperty('tokens');
            // User object structure
            expect(response.body.user).toHaveProperty('id');
            expect(response.body.user).toHaveProperty('email');
            expect(response.body.user).toHaveProperty('name');
            expect(response.body.user).toHaveProperty('role');
            expect(response.body.user).toHaveProperty('isEmailVerified');
            expect(response.body.user).toHaveProperty('createdAt');
            expect(response.body.user).toHaveProperty('updatedAt');
            expect(response.body.user).not.toHaveProperty('password');
            // Tokens structure
            expect(response.body.tokens).toHaveProperty('access');
            expect(response.body.tokens).toHaveProperty('refresh');
            expect(response.body.tokens.access).toHaveProperty('token');
            expect(response.body.tokens.access).toHaveProperty('expires');
            expect(response.body.tokens.refresh).toHaveProperty('token');
            expect(response.body.tokens.refresh).toHaveProperty('expires');
        });
        it('should return correct response format for login', async () => {
            // Register first
            await request(app).post('/v1/auth/register').send(testUser).expect(httpStatus.CREATED);
            const response = await request(app)
                .post('/v1/auth/login')
                .send({ email: testUser.email, password: testUser.password })
                .expect(httpStatus.OK);
            // Same structure as register
            expect(response.body).toHaveProperty('user');
            expect(response.body).toHaveProperty('tokens');
            expect(response.body.user).not.toHaveProperty('password');
        });
        it('should return correct response format for refresh', async () => {
            const registerResponse = await request(app)
                .post('/v1/auth/register')
                .send(testUser)
                .expect(httpStatus.CREATED);
            const refreshToken = registerResponse.body.tokens.refresh.token;
            const response = await request(app).post('/v1/auth/refresh').send({ refreshToken }).expect(httpStatus.OK);
            expect(response.body).toHaveProperty('tokens');
            expect(response.body.tokens).toHaveProperty('access');
            expect(response.body.tokens).toHaveProperty('refresh');
        });
    });
});
