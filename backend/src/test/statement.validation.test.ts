import statementValidation from '../validations/statement.validation.ts';
import { describe, expect, test } from 'vitest';

describe('Statement Validation', () => {
    describe('uploadStatement', () => {
        test('should validate valid upload statement data', () => {
            const validData = {
                filename: 'test.csv',
                type: 'text/csv',
                size: 1024,
                clientId: 'client123'
            };

            const { error } = statementValidation.uploadStatement.body.validate(validData);
            expect(error).toBeUndefined();
        });

        test('should require all fields', () => {
            const invalidData = {};

            const { error } = statementValidation.uploadStatement.body.validate(invalidData);
            expect(error).toBeDefined();
            expect(error!.details.length).toBeGreaterThanOrEqual(1); // At least one required field missing
        });

        test('should reject invalid file type', () => {
            const invalidData = {
                filename: 'test.txt',
                type: 'text/plain',
                size: 1024,
                clientId: 'client123'
            };

            const { error } = statementValidation.uploadStatement.body.validate(invalidData);
            expect(error).toBeDefined();
            expect(error!.details[0].message).toContain('does not match any of the allowed types');
        });

        test('should reject file size too large', () => {
            const invalidData = {
                filename: 'test.csv',
                type: 'text/csv',
                size: 60 * 1024 * 1024, // 60MB
                clientId: 'client123'
            };

            const { error } = statementValidation.uploadStatement.body.validate(invalidData);
            expect(error).toBeDefined();
            expect(error!.details[0].message).toContain('less than or equal to');
        });

        test('should reject zero or negative file size', () => {
            const invalidData = {
                filename: 'test.csv',
                type: 'text/csv',
                size: 0,
                clientId: 'client123'
            };

            const { error } = statementValidation.uploadStatement.body.validate(invalidData);
            expect(error).toBeDefined();
            expect(error!.details[0].message).toContain('greater than or equal to 1');
        });

        test('should reject filename too long', () => {
            const invalidData = {
                filename: 'a'.repeat(256), // 256 characters
                type: 'text/csv',
                size: 1024,
                clientId: 'client123'
            };

            const { error } = statementValidation.uploadStatement.body.validate(invalidData);
            expect(error).toBeDefined();
            expect(error!.details[0].message).toContain('less than or equal to 255');
        });

        test('should accept all valid file types', () => {
            const validTypes = [
                'application/pdf',
                'text/csv',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ];

            validTypes.forEach(type => {
                const validData = {
                    filename: 'test.csv',
                    type,
                    size: 1024,
                    clientId: 'client123'
                };

                const { error } = statementValidation.uploadStatement.body.validate(validData);
                expect(error).toBeUndefined();
            });
        });
    });

    describe('getUploadStatus', () => {
        test('should validate valid upload ID', () => {
            const validParams = { uploadId: 'statement123' };

            const { error } = statementValidation.getUploadStatus.params.validate(validParams);
            expect(error).toBeUndefined();
        });

        test('should require upload ID', () => {
            const invalidParams = {};

            const { error } = statementValidation.getUploadStatus.params.validate(invalidParams);
            expect(error).toBeDefined();
            expect(error!.details[0].path).toEqual(['uploadId']);
        });
    });

    describe('parseStatement', () => {
        test('should validate valid statement file ID', () => {
            const validData = { statementFileId: 'statement123' };

            const { error } = statementValidation.parseStatement.body.validate(validData);
            expect(error).toBeUndefined();
        });

        test('should require statement file ID', () => {
            const invalidData = {};

            const { error } = statementValidation.parseStatement.body.validate(invalidData);
            expect(error).toBeDefined();
            expect(error!.details[0].path).toEqual(['statementFileId']);
        });
    });

    describe('getStatementFiles', () => {
        test('should validate valid query parameters', () => {
            const validQuery = {
                clientId: 'client123',
                status: 'uploaded',
                filename: 'test.csv',
                type: 'text/csv',
                sortBy: 'uploadedAt',
                sortType: 'desc',
                limit: 10,
                page: 1
            };

            const { error } = statementValidation.getStatementFiles.query.validate(validQuery);
            expect(error).toBeUndefined();
        });

        test('should accept empty query parameters', () => {
            const validQuery = {};

            const { error } = statementValidation.getStatementFiles.query.validate(validQuery);
            expect(error).toBeUndefined();
        });

        test('should validate status enum values', () => {
            const validStatuses = ['uploading', 'uploaded', 'parsing', 'parsed', 'parse_failed', 'failed'];

            validStatuses.forEach(status => {
                const validQuery = { status };
                const { error } = statementValidation.getStatementFiles.query.validate(validQuery);
                expect(error).toBeUndefined();
            });

            const invalidQuery = { status: 'invalid_status' };
            const { error } = statementValidation.getStatementFiles.query.validate(invalidQuery);
            expect(error).toBeDefined();
        });

        test('should validate sortBy enum values', () => {
            const validSortBy = ['uploadedAt', 'filename', 'size', 'status'];

            validSortBy.forEach(sortBy => {
                const validQuery = { sortBy };
                const { error } = statementValidation.getStatementFiles.query.validate(validQuery);
                expect(error).toBeUndefined();
            });

            const invalidQuery = { sortBy: 'invalid_field' };
            const { error } = statementValidation.getStatementFiles.query.validate(invalidQuery);
            expect(error).toBeDefined();
        });

        test('should validate sortType enum values', () => {
            const validSortTypes = ['asc', 'desc'];

            validSortTypes.forEach(sortType => {
                const validQuery = { sortType };
                const { error } = statementValidation.getStatementFiles.query.validate(validQuery);
                expect(error).toBeUndefined();
            });

            const invalidQuery = { sortType: 'invalid_sort' };
            const { error } = statementValidation.getStatementFiles.query.validate(invalidQuery);
            expect(error).toBeDefined();
        });

        test('should validate limit range', () => {
            const validQuery1 = { limit: 1 };
            const validQuery2 = { limit: 100 };

            expect(statementValidation.getStatementFiles.query.validate(validQuery1).error).toBeUndefined();
            expect(statementValidation.getStatementFiles.query.validate(validQuery2).error).toBeUndefined();

            const invalidQuery1 = { limit: 0 };
            const invalidQuery2 = { limit: 101 };

            expect(statementValidation.getStatementFiles.query.validate(invalidQuery1).error).toBeDefined();
            expect(statementValidation.getStatementFiles.query.validate(invalidQuery2).error).toBeDefined();
        });

        test('should validate page minimum value', () => {
            const validQuery = { page: 1 };
            const { error: validError } = statementValidation.getStatementFiles.query.validate(validQuery);
            expect(validError).toBeUndefined();

            const invalidQuery = { page: 0 };
            const { error: invalidError } = statementValidation.getStatementFiles.query.validate(invalidQuery);
            expect(invalidError).toBeDefined();
        });
    });

    describe('getStatementFile', () => {
        test('should validate valid statement file ID', () => {
            const validParams = { id: 'statement123' };

            const { error } = statementValidation.getStatementFile.params.validate(validParams);
            expect(error).toBeUndefined();
        });

        test('should require statement file ID', () => {
            const invalidParams = {};

            const { error } = statementValidation.getStatementFile.params.validate(invalidParams);
            expect(error).toBeDefined();
            expect(error!.details[0].path).toEqual(['id']);
        });
    });

    describe('deleteStatementFile', () => {
        test('should validate valid statement file ID', () => {
            const validParams = { id: 'statement123' };

            const { error } = statementValidation.deleteStatementFile.params.validate(validParams);
            expect(error).toBeUndefined();
        });

        test('should require statement file ID', () => {
            const invalidParams = {};

            const { error } = statementValidation.deleteStatementFile.params.validate(invalidParams);
            expect(error).toBeDefined();
            expect(error!.details[0].path).toEqual(['id']);
        });
    });

    describe('generateUploadUrl', () => {
        test('should validate valid statement file ID', () => {
            const validParams = { id: 'statement123' };

            const { error } = statementValidation.generateUploadUrl.params.validate(validParams);
            expect(error).toBeUndefined();
        });

        test('should require statement file ID', () => {
            const invalidParams = {};

            const { error } = statementValidation.generateUploadUrl.params.validate(invalidParams);
            expect(error).toBeDefined();
            expect(error!.details[0].path).toEqual(['id']);
        });
    });
});
