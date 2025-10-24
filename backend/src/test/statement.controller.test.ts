import statementController from '../controllers/statement.controller.ts';
import { statementService } from '../services/index.ts';
import ApiError from '../utils/ApiError.ts';
import pick from '../utils/pick.ts';
import httpStatus from 'http-status';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock the service
vi.mock('../services/index.ts', () => ({
    statementService: {
        uploadStatementFile: vi.fn(),
        getUploadStatus: vi.fn(),
        parseStatement: vi.fn(),
        queryStatementFiles: vi.fn(),
        getStatementFileWithParseResult: vi.fn(),
        deleteStatementFileById: vi.fn(),
        generateUploadSignedUrl: vi.fn(),
        updateStatementFileStatus: vi.fn()
    }
}));

// Mock utilities
vi.mock('../utils/pick.ts', () => ({
    default: vi.fn((obj: any, keys: any[]) => {
        const result: any = {};
        keys.forEach((key: any) => {
            if (obj[key] !== undefined) {
                result[key] = obj[key];
            }
        });
        return result;
    })
}));

describe('Statement Controller', () => {
    let req: any;
    let res: any;
    let next: any;

    beforeEach(() => {
        vi.clearAllMocks();

        req = {
            body: {},
            params: {},
            validatedQuery: {},
            user: { id: 1, role: 'ADMIN' }
        };

        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
            send: vi.fn()
        };

        next = vi.fn();
    });

    describe('uploadStatement', () => {
        test('should upload statement successfully', async () => {
            const mockStatementFile = {
                id: 'statement1',
                filename: 'test.csv',
                type: 'text/csv',
                size: 1024,
                clientId: 'client1',
                status: 'uploading',
                uploadedAt: new Date()
            };

            req.body = {
                filename: 'test.csv',
                type: 'text/csv',
                size: 1024,
                clientId: 'client1'
            };

            (statementService.uploadStatementFile as any).mockResolvedValue(mockStatementFile);

            await statementController.uploadStatement(req, res, next);

            expect(statementService.uploadStatementFile).toHaveBeenCalledWith({
                filename: 'test.csv',
                type: 'text/csv',
                size: 1024,
                clientId: 'client1'
            });
            expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
            expect(res.json).toHaveBeenCalledWith(mockStatementFile);
        });

        test('should handle service error', async () => {
            const error = new ApiError(httpStatus.NOT_FOUND, 'Client not found');

            req.body = {
                filename: 'test.csv',
                type: 'text/csv',
                size: 1024,
                clientId: 'nonexistent'
            };

            (statementService.uploadStatementFile as any).mockRejectedValue(error);

            try {
                await statementController.uploadStatement(req, res, next);
            } catch (thrownError) {
                expect(thrownError).toBe(error);
            }
        });
    });

    describe('getUploadStatus', () => {
        test('should get upload status successfully', async () => {
            const mockStatus = {
                id: 'statement1',
                status: 'uploaded',
                filename: 'test.csv',
                uploadedAt: new Date()
            };

            req.params = { uploadId: 'statement1' };
            (statementService.getUploadStatus as any).mockResolvedValue(mockStatus);

            await statementController.getUploadStatus(req, res, next);

            expect(statementService.getUploadStatus).toHaveBeenCalledWith('statement1');
            expect(res.json).toHaveBeenCalledWith(mockStatus);
        });

        test('should throw error if upload not found', async () => {
            req.params = { uploadId: 'nonexistent' };
            (statementService.getUploadStatus as any).mockResolvedValue(null);

            try {
                await statementController.getUploadStatus(req, res, next);
            } catch (thrownError) {
                expect(thrownError).toBeInstanceOf(ApiError);
                expect((thrownError as ApiError).statusCode).toBe(httpStatus.NOT_FOUND);
            }
        });
    });

    describe('parseStatement', () => {
        test('should parse statement successfully', async () => {
            const mockParseResult = {
                id: 'parse1',
                statementFileId: 'statement1',
                totalTransactions: 10,
                dateRangeStart: new Date('2024-01-01'),
                dateRangeEnd: new Date('2024-01-31'),
                accounts: [],
                status: 'completed',
                errors: null,
                createdAt: new Date()
            };

            req.body = { statementFileId: 'statement1' };
            (statementService.parseStatement as any).mockResolvedValue(mockParseResult);

            await statementController.parseStatement(req, res, next);

            expect(statementService.parseStatement).toHaveBeenCalledWith('statement1');
            expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
            expect(res.json).toHaveBeenCalledWith(mockParseResult);
        });
    });

    describe('getStatementFiles', () => {
        test('should get statement files successfully', async () => {
            const mockStatementFiles = [
                {
                    id: 'statement1',
                    filename: 'test1.csv',
                    type: 'text/csv',
                    size: 1024,
                    uploadedAt: new Date(),
                    status: 'uploaded',
                    clientId: 'client1'
                }
            ];

            req.validatedQuery = {
                clientId: 'client1',
                status: 'uploaded',
                limit: 10,
                page: 1
            };

            (pick as any)
                .mockReturnValueOnce({ clientId: 'client1', status: 'uploaded' })
                .mockReturnValueOnce({ limit: 10, page: 1 });

            (statementService.queryStatementFiles as any).mockResolvedValue(mockStatementFiles);

            await statementController.getStatementFiles(req, res, next);

            expect(pick).toHaveBeenCalledWith(req.validatedQuery, ['clientId', 'status', 'filename', 'type']);
            expect(pick).toHaveBeenCalledWith(req.validatedQuery, ['sortBy', 'sortType', 'limit', 'page']);
            expect(statementService.queryStatementFiles).toHaveBeenCalledWith(
                { clientId: 'client1', status: 'uploaded' },
                { limit: 10, page: 1 }
            );
            expect(res.json).toHaveBeenCalledWith(mockStatementFiles);
        });
    });

    describe('getStatementFile', () => {
        test('should get statement file successfully', async () => {
            const mockStatementFile = {
                id: 'statement1',
                filename: 'test.csv',
                type: 'text/csv',
                size: 1024,
                uploadedAt: new Date(),
                status: 'parsed',
                clientId: 'client1',
                ParseResult: {
                    id: 'parse1',
                    totalTransactions: 10,
                    dateRangeStart: new Date(),
                    dateRangeEnd: new Date(),
                    accounts: [],
                    status: 'completed',
                    errors: null,
                    createdAt: new Date()
                }
            };

            req.params = { id: 'statement1' };
            (statementService.getStatementFileWithParseResult as any).mockResolvedValue(mockStatementFile);

            await statementController.getStatementFile(req, res, next);

            expect(statementService.getStatementFileWithParseResult).toHaveBeenCalledWith('statement1');
            expect(res.json).toHaveBeenCalledWith(mockStatementFile);
        });

        test('should throw error if statement file not found', async () => {
            req.params = { id: 'nonexistent' };
            (statementService.getStatementFileWithParseResult as any).mockResolvedValue(null);

            try {
                await statementController.getStatementFile(req, res, next);
            } catch (thrownError) {
                expect(thrownError).toBeInstanceOf(ApiError);
                expect((thrownError as ApiError).statusCode).toBe(httpStatus.NOT_FOUND);
            }
        });
    });

    describe('deleteStatementFile', () => {
        test('should delete statement file successfully', async () => {
            req.params = { id: 'statement1' };
            (statementService.deleteStatementFileById as any).mockResolvedValue({});

            await statementController.deleteStatementFile(req, res, next);

            expect(statementService.deleteStatementFileById).toHaveBeenCalledWith('statement1');
            expect(res.status).toHaveBeenCalledWith(httpStatus.NO_CONTENT);
            expect(res.send).toHaveBeenCalled();
        });
    });

    describe('generateUploadUrl', () => {
        test('should generate upload URL successfully', async () => {
            const mockUploadUrl = {
                url: 'https://example.com/upload',
                headers: { 'Content-Type': 'text/csv' }
            };

            req.params = { id: 'statement1' };
            (statementService.generateUploadSignedUrl as any).mockResolvedValue(mockUploadUrl);

            await statementController.generateUploadUrl(req, res, next);

            expect(statementService.generateUploadSignedUrl).toHaveBeenCalledWith('statement1');
            expect(res.json).toHaveBeenCalledWith(mockUploadUrl);
        });
    });

    describe('updateUploadStatus', () => {
        test('should update upload status successfully', async () => {
            const mockStatementFile = {
                id: 'statement1',
                filename: 'test.csv',
                status: 'uploaded',
                uploadedAt: new Date()
            };

            req.params = { id: 'statement1' };
            req.body = { status: 'uploaded' };
            (statementService.updateStatementFileStatus as any).mockResolvedValue(mockStatementFile);

            await statementController.updateUploadStatus(req, res, next);

            expect(statementService.updateStatementFileStatus).toHaveBeenCalledWith('statement1', 'uploaded');
            expect(res.json).toHaveBeenCalledWith(mockStatementFile);
        });
    });
});
