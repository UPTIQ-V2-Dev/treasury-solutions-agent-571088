import clientValidation from "../validations/client.validation.js";
import Joi from 'joi';
import { describe, expect, it } from 'vitest';
describe('Client Validation', () => {
    describe('createClient', () => {
        const { body } = clientValidation.createClient;
        it('should validate valid client data', () => {
            const validData = {
                name: 'ACME Corporation',
                accountIds: ['ACC-001', 'ACC-002'],
                relationshipManager: 'John Doe',
                status: 'active'
            };
            const { error } = body.validate(validData);
            expect(error).toBeUndefined();
        });
        it('should validate client data without status (optional)', () => {
            const validData = {
                name: 'ACME Corporation',
                accountIds: ['ACC-001', 'ACC-002'],
                relationshipManager: 'John Doe'
            };
            const { error } = body.validate(validData);
            expect(error).toBeUndefined();
        });
        it('should reject missing name', () => {
            const invalidData = {
                accountIds: ['ACC-001'],
                relationshipManager: 'John Doe'
            };
            const { error } = body.validate(invalidData);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('name');
        });
        it('should reject missing accountIds', () => {
            const invalidData = {
                name: 'ACME Corporation',
                relationshipManager: 'John Doe'
            };
            const { error } = body.validate(invalidData);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('accountIds');
        });
        it('should reject missing relationshipManager', () => {
            const invalidData = {
                name: 'ACME Corporation',
                accountIds: ['ACC-001']
            };
            const { error } = body.validate(invalidData);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('relationshipManager');
        });
        it('should reject empty accountIds array', () => {
            const invalidData = {
                name: 'ACME Corporation',
                accountIds: [],
                relationshipManager: 'John Doe'
            };
            const { error } = body.validate(invalidData);
            expect(error).toBeDefined();
        });
        it('should reject invalid status values', () => {
            const invalidData = {
                name: 'ACME Corporation',
                accountIds: ['ACC-001'],
                relationshipManager: 'John Doe',
                status: 'invalid_status'
            };
            const { error } = body.validate(invalidData);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('must be one of');
        });
        it('should accept valid status values', () => {
            const validActiveData = {
                name: 'ACME Corporation',
                accountIds: ['ACC-001'],
                relationshipManager: 'John Doe',
                status: 'active'
            };
            const validInactiveData = {
                name: 'ACME Corporation',
                accountIds: ['ACC-001'],
                relationshipManager: 'John Doe',
                status: 'inactive'
            };
            expect(body.validate(validActiveData).error).toBeUndefined();
            expect(body.validate(validInactiveData).error).toBeUndefined();
        });
    });
    describe('getClients', () => {
        const { query } = clientValidation.getClients;
        it('should validate empty query', () => {
            const { error } = query.validate({});
            expect(error).toBeUndefined();
        });
        it('should validate query with all optional parameters', () => {
            const validQuery = {
                name: 'ACME',
                status: 'active',
                relationshipManager: 'John Doe',
                sortBy: 'name',
                limit: 10,
                page: 1
            };
            const { error } = query.validate(validQuery);
            expect(error).toBeUndefined();
        });
        it('should reject invalid status in query', () => {
            const invalidQuery = {
                status: 'invalid_status'
            };
            const { error } = query.validate(invalidQuery);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('must be one of');
        });
        it('should reject non-integer limit', () => {
            const invalidQuery = {
                limit: 'not_a_number'
            };
            const { error } = query.validate(invalidQuery);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('number');
        });
        it('should reject non-integer page', () => {
            const invalidQuery = {
                page: 1.5
            };
            const { error } = query.validate(invalidQuery);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('integer');
        });
    });
    describe('getClient', () => {
        const { params } = clientValidation.getClient;
        it('should validate valid client ID', () => {
            const validParams = {
                clientId: 'client-123'
            };
            const { error } = params.validate(validParams);
            expect(error).toBeUndefined();
        });
        it('should reject missing client ID', () => {
            const invalidParams = {};
            const { error } = params.validate(invalidParams);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('clientId');
        });
        it('should reject empty client ID', () => {
            const invalidParams = {
                clientId: ''
            };
            const { error } = params.validate(invalidParams);
            expect(error).toBeDefined();
        });
    });
    describe('updateClient', () => {
        const { params, body } = clientValidation.updateClient;
        it('should validate valid params and body', () => {
            const validParams = { clientId: 'client-123' };
            const validBody = {
                name: 'Updated ACME Corporation',
                relationshipManager: 'Jane Doe',
                status: 'inactive'
            };
            expect(params.validate(validParams).error).toBeUndefined();
            expect(body.validate(validBody).error).toBeUndefined();
        });
        it('should validate partial updates', () => {
            const validBody = {
                name: 'Updated Name Only'
            };
            const { error } = body.validate(validBody);
            expect(error).toBeUndefined();
        });
        it('should reject empty update body', () => {
            const emptyBody = {};
            const { error } = body.validate(emptyBody);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('at least');
        });
        it('should reject invalid status in update', () => {
            const invalidBody = {
                status: 'invalid_status'
            };
            const { error } = body.validate(invalidBody);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('must be one of');
        });
        it('should validate accountIds array in update', () => {
            const validBody = {
                accountIds: ['ACC-001', 'ACC-002', 'ACC-003']
            };
            const { error } = body.validate(validBody);
            expect(error).toBeUndefined();
        });
        it('should reject empty accountIds array in update', () => {
            const invalidBody = {
                accountIds: []
            };
            const { error } = body.validate(invalidBody);
            expect(error).toBeDefined();
        });
    });
    describe('deleteClient', () => {
        const { params } = clientValidation.deleteClient;
        it('should validate valid client ID', () => {
            const validParams = {
                clientId: 'client-123'
            };
            const { error } = params.validate(validParams);
            expect(error).toBeUndefined();
        });
        it('should reject missing client ID', () => {
            const invalidParams = {};
            const { error } = params.validate(invalidParams);
            expect(error).toBeDefined();
            expect(error?.details[0].message).toContain('clientId');
        });
    });
    describe('Schema structure', () => {
        it('should have all required validation schemas', () => {
            expect(clientValidation.createClient).toBeDefined();
            expect(clientValidation.getClients).toBeDefined();
            expect(clientValidation.getClient).toBeDefined();
            expect(clientValidation.updateClient).toBeDefined();
            expect(clientValidation.deleteClient).toBeDefined();
        });
        it('should have proper schema types', () => {
            expect(clientValidation.createClient.body).toBeInstanceOf(Joi.constructor);
            expect(clientValidation.getClients.query).toBeInstanceOf(Joi.constructor);
            expect(clientValidation.getClient.params).toBeInstanceOf(Joi.constructor);
            expect(clientValidation.updateClient.params).toBeInstanceOf(Joi.constructor);
            expect(clientValidation.updateClient.body).toBeInstanceOf(Joi.constructor);
            expect(clientValidation.deleteClient.params).toBeInstanceOf(Joi.constructor);
        });
    });
});
