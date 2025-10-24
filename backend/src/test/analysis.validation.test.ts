import analysisValidation from '../validations/analysis.validation.ts';
import { describe, expect, it } from 'vitest';

describe('Analysis Validation', () => {
    describe('analyzeStatements', () => {
        const { body } = analysisValidation.analyzeStatements;

        it('should validate correct analyze statements input', () => {
            const validInput = {
                statementFileIds: ['file-1', 'file-2'],
                clientId: 'client-1'
            };

            const { error, value } = body.validate(validInput);

            expect(error).toBeUndefined();
            expect(value).toEqual(validInput);
        });

        it('should validate analyze statements input with options', () => {
            const validInput = {
                statementFileIds: ['file-1'],
                clientId: 'client-1',
                analysisOptions: {
                    idleBalanceThreshold: 500000,
                    volatilityPeriod: 30,
                    includeProjections: true
                }
            };

            const { error, value } = body.validate(validInput);

            expect(error).toBeUndefined();
            expect(value).toEqual(validInput);
        });

        it('should reject missing statementFileIds', () => {
            const invalidInput = {
                clientId: 'client-1'
            };

            const { error } = body.validate(invalidInput);

            expect(error).toBeDefined();
            expect(error?.details[0].path).toEqual(['statementFileIds']);
        });

        it('should reject empty statementFileIds array', () => {
            const invalidInput = {
                statementFileIds: [],
                clientId: 'client-1'
            };

            const { error } = body.validate(invalidInput);

            expect(error).toBeDefined();
            expect(error?.details[0].path).toEqual(['statementFileIds']);
        });

        it('should reject missing clientId', () => {
            const invalidInput = {
                statementFileIds: ['file-1']
            };

            const { error } = body.validate(invalidInput);

            expect(error).toBeDefined();
            expect(error?.details[0].path).toEqual(['clientId']);
        });

        it('should reject invalid analysisOptions', () => {
            const invalidInput = {
                statementFileIds: ['file-1'],
                clientId: 'client-1',
                analysisOptions: {
                    idleBalanceThreshold: -100, // negative value
                    volatilityPeriod: 400, // exceeds max
                    includeProjections: 'yes' // wrong type
                }
            };

            const { error } = body.validate(invalidInput);

            expect(error).toBeDefined();
        });

        it('should accept valid threshold values', () => {
            const validInput = {
                statementFileIds: ['file-1'],
                clientId: 'client-1',
                analysisOptions: {
                    idleBalanceThreshold: 0, // minimum value
                    volatilityPeriod: 1, // minimum value
                    includeProjections: false
                }
            };

            const { error } = body.validate(validInput);

            expect(error).toBeUndefined();
        });
    });

    describe('getAnalysis', () => {
        const { params } = analysisValidation.getAnalysis;

        it('should validate correct analysisId', () => {
            const validInput = { analysisId: 'analysis-123' };

            const { error, value } = params.validate(validInput);

            expect(error).toBeUndefined();
            expect(value).toEqual(validInput);
        });

        it('should reject missing analysisId', () => {
            const invalidInput = {};

            const { error } = params.validate(invalidInput);

            expect(error).toBeDefined();
            expect(error?.details[0].path).toEqual(['analysisId']);
        });

        it('should reject empty analysisId', () => {
            const invalidInput = { analysisId: '' };

            const { error } = params.validate(invalidInput);

            expect(error).toBeDefined();
        });
    });

    describe('getAnalysisTransactions', () => {
        const { params, query } = analysisValidation.getAnalysisTransactions;

        it('should validate correct params', () => {
            const validInput = { analysisId: 'analysis-123' };

            const { error, value } = params.validate(validInput);

            expect(error).toBeUndefined();
            expect(value).toEqual(validInput);
        });

        it('should validate correct query parameters', () => {
            const validInput = { page: 2, limit: 25 };

            const { error, value } = query.validate(validInput);

            expect(error).toBeUndefined();
            expect(value).toEqual(validInput);
        });

        it('should accept empty query parameters', () => {
            const validInput = {};

            const { error, value } = query.validate(validInput);

            expect(error).toBeUndefined();
            expect(value).toEqual(validInput);
        });

        it('should reject invalid page number', () => {
            const invalidInput = { page: 0 };

            const { error } = query.validate(invalidInput);

            expect(error).toBeDefined();
            expect(error?.details[0].path).toEqual(['page']);
        });

        it('should reject invalid limit', () => {
            const invalidInput = { limit: 0 };

            const { error } = query.validate(invalidInput);

            expect(error).toBeDefined();
            expect(error?.details[0].path).toEqual(['limit']);
        });

        it('should reject limit exceeding maximum', () => {
            const invalidInput = { limit: 300 };

            const { error } = query.validate(invalidInput);

            expect(error).toBeDefined();
            expect(error?.details[0].path).toEqual(['limit']);
        });

        it('should accept maximum limit', () => {
            const validInput = { limit: 200 };

            const { error } = query.validate(validInput);

            expect(error).toBeUndefined();
        });
    });

    describe('queryAnalyses', () => {
        const { query } = analysisValidation.queryAnalyses;

        it('should validate correct query parameters', () => {
            const validInput = {
                clientId: 'client-1',
                status: 'completed',
                sortBy: 'createdAt',
                limit: 20,
                page: 1
            };

            const { error, value } = query.validate(validInput);

            expect(error).toBeUndefined();
            expect(value).toEqual(validInput);
        });

        it('should accept empty query parameters', () => {
            const validInput = {};

            const { error, value } = query.validate(validInput);

            expect(error).toBeUndefined();
            expect(value).toEqual(validInput);
        });

        it('should validate status enum values', () => {
            const validStatuses = ['processing', 'completed', 'failed'];

            for (const status of validStatuses) {
                const input = { status };
                const { error } = query.validate(input);
                expect(error).toBeUndefined();
            }
        });

        it('should reject invalid status', () => {
            const invalidInput = { status: 'invalid-status' };

            const { error } = query.validate(invalidInput);

            expect(error).toBeDefined();
            expect(error?.details[0].path).toEqual(['status']);
        });

        it('should reject invalid pagination parameters', () => {
            const invalidInputs = [{ page: 0 }, { page: -1 }, { limit: 0 }, { limit: -5 }];

            invalidInputs.forEach(input => {
                const { error } = query.validate(input);
                expect(error).toBeDefined();
            });
        });
    });

    describe('deleteAnalysis', () => {
        const { params } = analysisValidation.deleteAnalysis;

        it('should validate correct analysisId', () => {
            const validInput = { analysisId: 'analysis-123' };

            const { error, value } = params.validate(validInput);

            expect(error).toBeUndefined();
            expect(value).toEqual(validInput);
        });

        it('should reject missing analysisId', () => {
            const invalidInput = {};

            const { error } = params.validate(invalidInput);

            expect(error).toBeDefined();
            expect(error?.details[0].path).toEqual(['analysisId']);
        });

        it('should reject empty analysisId', () => {
            const invalidInput = { analysisId: '' };

            const { error } = params.validate(invalidInput);

            expect(error).toBeDefined();
        });
    });
});
