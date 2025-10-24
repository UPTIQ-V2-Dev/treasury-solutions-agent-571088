import authValidation from "../validations/auth.validation.js";
import { describe, expect, it } from 'vitest';
describe('Auth validations', () => {
    describe('register', () => {
        it('should pass with valid data', () => {
            const validData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123'
            };
            const { error } = authValidation.register.body.validate(validData);
            expect(error).toBeUndefined();
        });
        it('should fail without required fields', () => {
            const invalidData = {};
            const { error } = authValidation.register.body.validate(invalidData);
            expect(error).toBeDefined();
            expect(error?.details).toHaveLength(3); // name, email, password required
        });
        it('should fail with invalid email format', () => {
            const invalidData = {
                name: 'John Doe',
                email: 'invalid-email',
                password: 'password123'
            };
            const { error } = authValidation.register.body.validate(invalidData);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('email');
        });
        it('should fail with weak password', () => {
            const invalidData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: '123' // Too weak
            };
            const { error } = authValidation.register.body.validate(invalidData);
            expect(error).toBeDefined();
        });
    });
    describe('login', () => {
        it('should pass with valid credentials', () => {
            const validData = {
                email: 'john@example.com',
                password: 'password123'
            };
            const { error } = authValidation.login.body.validate(validData);
            expect(error).toBeUndefined();
        });
        it('should fail without email', () => {
            const invalidData = {
                password: 'password123'
            };
            const { error } = authValidation.login.body.validate(invalidData);
            expect(error).toBeDefined();
        });
        it('should fail without password', () => {
            const invalidData = {
                email: 'john@example.com'
            };
            const { error } = authValidation.login.body.validate(invalidData);
            expect(error).toBeDefined();
        });
    });
    describe('logout', () => {
        it('should pass with refresh token', () => {
            const validData = {
                refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            };
            const { error } = authValidation.logout.body.validate(validData);
            expect(error).toBeUndefined();
        });
        it('should fail without refresh token', () => {
            const invalidData = {};
            const { error } = authValidation.logout.body.validate(invalidData);
            expect(error).toBeDefined();
        });
    });
    describe('refreshTokens', () => {
        it('should pass with refresh token', () => {
            const validData = {
                refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            };
            const { error } = authValidation.refreshTokens.body.validate(validData);
            expect(error).toBeUndefined();
        });
        it('should fail without refresh token', () => {
            const invalidData = {};
            const { error } = authValidation.refreshTokens.body.validate(invalidData);
            expect(error).toBeDefined();
        });
    });
    describe('forgotPassword', () => {
        it('should pass with valid email', () => {
            const validData = {
                email: 'john@example.com'
            };
            const { error } = authValidation.forgotPassword.body.validate(validData);
            expect(error).toBeUndefined();
        });
        it('should fail with invalid email', () => {
            const invalidData = {
                email: 'invalid-email'
            };
            const { error } = authValidation.forgotPassword.body.validate(invalidData);
            expect(error).toBeDefined();
        });
        it('should fail without email', () => {
            const invalidData = {};
            const { error } = authValidation.forgotPassword.body.validate(invalidData);
            expect(error).toBeDefined();
        });
    });
    describe('resetPassword', () => {
        it('should pass with valid token and password', () => {
            const validQuery = { token: 'reset-token-123' };
            const validBody = { password: 'newPassword123' };
            const queryError = authValidation.resetPassword.query.validate(validQuery).error;
            const bodyError = authValidation.resetPassword.body.validate(validBody).error;
            expect(queryError).toBeUndefined();
            expect(bodyError).toBeUndefined();
        });
        it('should fail without token in query', () => {
            const invalidQuery = {};
            const { error } = authValidation.resetPassword.query.validate(invalidQuery);
            expect(error).toBeDefined();
        });
        it('should fail without password in body', () => {
            const invalidBody = {};
            const { error } = authValidation.resetPassword.body.validate(invalidBody);
            expect(error).toBeDefined();
        });
        it('should fail with weak password', () => {
            const invalidBody = { password: '123' };
            const { error } = authValidation.resetPassword.body.validate(invalidBody);
            expect(error).toBeDefined();
        });
    });
    describe('verifyEmail', () => {
        it('should pass with valid token', () => {
            const validQuery = { token: 'verify-token-123' };
            const { error } = authValidation.verifyEmail.query.validate(validQuery);
            expect(error).toBeUndefined();
        });
        it('should fail without token', () => {
            const invalidQuery = {};
            const { error } = authValidation.verifyEmail.query.validate(invalidQuery);
            expect(error).toBeDefined();
        });
    });
});
