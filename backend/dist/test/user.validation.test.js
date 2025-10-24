import { Role } from '../generated/prisma/index.js';
import { userValidation } from "../validations/index.js";
import { describe, expect, it } from 'vitest';
describe('User Validation', () => {
    describe('createUser', () => {
        it('should validate valid user creation data', () => {
            const validData = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
                role: Role.USER
            };
            const { error } = userValidation.createUser.body.validate(validData);
            expect(error).toBeUndefined();
        });
        it('should require email', () => {
            const invalidData = {
                password: 'password123',
                name: 'Test User',
                role: Role.USER
            };
            const { error } = userValidation.createUser.body.validate(invalidData);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('required');
        });
        it('should validate email format', () => {
            const invalidData = {
                email: 'invalid-email',
                password: 'password123',
                name: 'Test User',
                role: Role.USER
            };
            const { error } = userValidation.createUser.body.validate(invalidData);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('valid email');
        });
        it('should require password', () => {
            const invalidData = {
                email: 'test@example.com',
                name: 'Test User',
                role: Role.USER
            };
            const { error } = userValidation.createUser.body.validate(invalidData);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('required');
        });
        it('should require name', () => {
            const invalidData = {
                email: 'test@example.com',
                password: 'password123',
                role: Role.USER
            };
            const { error } = userValidation.createUser.body.validate(invalidData);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('required');
        });
        it('should require role', () => {
            const invalidData = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User'
            };
            const { error } = userValidation.createUser.body.validate(invalidData);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('required');
        });
        it('should validate role enum values', () => {
            const invalidData = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
                role: 'INVALID_ROLE'
            };
            const { error } = userValidation.createUser.body.validate(invalidData);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('must be one of');
        });
    });
    describe('getUsers', () => {
        it('should validate valid query parameters', () => {
            const validQuery = {
                name: 'John',
                role: 'USER',
                sortBy: 'name:asc',
                limit: 10,
                page: 1
            };
            const { error } = userValidation.getUsers.query.validate(validQuery);
            expect(error).toBeUndefined();
        });
        it('should allow empty query parameters', () => {
            const emptyQuery = {};
            const { error } = userValidation.getUsers.query.validate(emptyQuery);
            expect(error).toBeUndefined();
        });
        it('should validate limit as integer', () => {
            const invalidQuery = {
                limit: 'not-a-number'
            };
            const { error } = userValidation.getUsers.query.validate(invalidQuery);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('number');
        });
        it('should validate page as integer', () => {
            const invalidQuery = {
                page: 'not-a-number'
            };
            const { error } = userValidation.getUsers.query.validate(invalidQuery);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('number');
        });
    });
    describe('getUser', () => {
        it('should validate valid user ID parameter', () => {
            const validParams = {
                userId: '123'
            };
            const { error } = userValidation.getUser.params.validate(validParams);
            expect(error).toBeUndefined();
        });
        it('should require userId parameter', () => {
            const invalidParams = {};
            const { error } = userValidation.getUser.params.validate(invalidParams);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('required');
        });
    });
    describe('updateUser', () => {
        it('should validate valid update data', () => {
            const validParams = { userId: '123' };
            const validBody = {
                name: 'Updated Name',
                email: 'updated@example.com',
                password: 'newpassword123'
            };
            const paramsValidation = userValidation.updateUser.params.validate(validParams);
            const bodyValidation = userValidation.updateUser.body.validate(validBody);
            expect(paramsValidation.error).toBeUndefined();
            expect(bodyValidation.error).toBeUndefined();
        });
        it('should require userId parameter', () => {
            const invalidParams = {};
            const { error } = userValidation.updateUser.params.validate(invalidParams);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('required');
        });
        it('should require at least one field in body', () => {
            const emptyBody = {};
            const { error } = userValidation.updateUser.body.validate(emptyBody);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('at least');
        });
        it('should validate email format if provided', () => {
            const invalidBody = {
                email: 'invalid-email'
            };
            const { error } = userValidation.updateUser.body.validate(invalidBody);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('valid email');
        });
        it('should allow partial updates', () => {
            const partialBody = {
                name: 'New Name Only'
            };
            const { error } = userValidation.updateUser.body.validate(partialBody);
            expect(error).toBeUndefined();
        });
    });
    describe('deleteUser', () => {
        it('should validate valid user ID parameter', () => {
            const validParams = {
                userId: '123'
            };
            const { error } = userValidation.deleteUser.params.validate(validParams);
            expect(error).toBeUndefined();
        });
        it('should require userId parameter', () => {
            const invalidParams = {};
            const { error } = userValidation.deleteUser.params.validate(invalidParams);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('required');
        });
    });
});
