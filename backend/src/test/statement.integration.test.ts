import prisma from '../client.ts';
import statementController from '../controllers/statement.controller.ts';
import { getInstance as getStorageInstance } from '../storage/main.ts';
import httpStatus from 'http-status';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock Prisma client for integration tests
vi.mock('../client.ts', () => ({
    default: {
        client: {
            findUnique: vi.fn()
        },
        statementFile: {
            create: vi.fn(),
            findUnique: vi.fn(),
            findMany: vi.fn(),
            update: vi.fn(),
            delete: vi.fn()
        },
        parseResult: {
            create: vi.fn()
        }
    }
}));

vi.mock('../storage/main.ts', () => ({
    getInstance: vi.fn(() => ({
        getData: vi.fn(),
        deleteFile: vi.fn(),
        generateUploadSignedUrl: vi.fn()
    }))
}));

describe('Statement Integration Tests', () => {
    let mockReq: any;
    let mockRes: any;
    let mockNext: any;

    beforeEach(() => {
        vi.clearAllMocks();

        mockReq = {
            body: {},
            params: {},
            validatedQuery: {},
            user: { id: 1, role: 'ADMIN' }
        };

        mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        };

        mockNext = vi.fn();
    });

    describe('Statement File Upload', () => {
        test('should create statement file upload record', async () => {
            const mockClient = { id: 'client1', name: 'Test Client' };
            const mockStatementFile = {
                id: 'statement1',
                filename: 'test.csv',
                type: 'text/csv',
                size: 1024,
                clientId: 'client1',
                status: 'uploading',
                uploadedAt: new Date()
            };

            mockReq.body = {
                filename: 'test.csv',
                type: 'text/csv',
                size: 1024,
                clientId: 'client1'
            };

            (prisma.client.findUnique as any).mockResolvedValue(mockClient);
            (prisma.statementFile.create as any).mockResolvedValue(mockStatementFile);

            await statementController.uploadStatement(mockReq, mockRes, mockNext);

            expect(prisma.client.findUnique).toHaveBeenCalledWith({
                where: { id: 'client1' }
            });
            expect(prisma.statementFile.create).toHaveBeenCalledWith({
                data: {
                    filename: 'test.csv',
                    type: 'text/csv',
                    size: 1024,
                    clientId: 'client1',
                    status: 'uploading'
                }
            });
            expect(mockRes.status).toHaveBeenCalledWith(httpStatus.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith(mockStatementFile);
        });

        test('should return error for non-existent client', async () => {
            mockReq.body = {
                filename: 'test.csv',
                type: 'text/csv',
                size: 1024,
                clientId: 'nonexistent'
            };

            (prisma.client.findUnique as any).mockResolvedValue(null);

            await expect(statementController.uploadStatement(mockReq, mockRes, mockNext)).rejects.toThrow(
                expect.objectContaining({ statusCode: httpStatus.NOT_FOUND })
            );
        });
    });

    describe('Upload Status', () => {
        test('should get upload status successfully', async () => {
            const mockStatus = {
                id: 'statement1',
                status: 'uploaded',
                filename: 'test.csv',
                uploadedAt: new Date()
            };

            mockReq.params = { uploadId: 'statement1' };
            (prisma.statementFile.findUnique as any).mockResolvedValue(mockStatus);

            await statementController.getUploadStatus(mockReq, mockRes, mockNext);

            expect(prisma.statementFile.findUnique).toHaveBeenCalledWith({
                where: { id: 'statement1' },
                select: {
                    id: true,
                    status: true,
                    filename: true,
                    uploadedAt: true
                }
            });
            expect(mockRes.json).toHaveBeenCalledWith(mockStatus);
        });

        test('should return error for non-existent upload', async () => {
            mockReq.params = { uploadId: 'nonexistent' };
            (prisma.statementFile.findUnique as any).mockResolvedValue(null);

            await expect(statementController.getUploadStatus(mockReq, mockRes, mockNext)).rejects.toThrow(
                expect.objectContaining({ statusCode: httpStatus.NOT_FOUND })
            );
        });
    });

    describe('Statement Parsing', () => {
        test('should parse statement successfully', async () => {
            const mockStatementFile = {
                id: 'statement1',
                filename: 'test.csv',
                type: 'text/csv',
                status: 'uploaded',
                ParseResult: null
            };

            const mockParseResult = {
                id: 'parse1',
                statementFileId: 'statement1',
                totalTransactions: 2,
                dateRangeStart: new Date('2024-01-01'),
                dateRangeEnd: new Date('2024-01-31'),
                accounts: [],
                status: 'completed',
                errors: null,
                createdAt: new Date()
            };

            const csvContent = `Date,Description,Amount,Balance
2024-01-15,Payment,-100.00,1000.00
2024-01-16,Deposit,200.00,1200.00`;

            mockReq.body = { statementFileId: 'statement1' };

            (prisma.statementFile.findUnique as any).mockResolvedValue(mockStatementFile);
            (prisma.parseResult.create as any).mockResolvedValue(mockParseResult);
            (prisma.statementFile.update as any).mockResolvedValue({ ...mockStatementFile, status: 'parsed' });

            const mockStorage = {
                getData: vi.fn().mockResolvedValue(Buffer.from(csvContent, 'utf-8'))
            };
            (getStorageInstance as any).mockReturnValue(mockStorage);

            await statementController.parseStatement(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(httpStatus.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith(mockParseResult);
        });

        test('should return error for non-existent statement file', async () => {
            mockReq.body = { statementFileId: 'nonexistent' };
            (prisma.statementFile.findUnique as any).mockResolvedValue(null);

            await expect(statementController.parseStatement(mockReq, mockRes, mockNext)).rejects.toThrow(
                expect.objectContaining({ statusCode: httpStatus.NOT_FOUND })
            );
        });
    });

    describe('Statement File Management', () => {
        test('should get statement files with filters', async () => {
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

            mockReq.validatedQuery = {
                clientId: 'client1',
                status: 'uploaded',
                limit: 10,
                page: 1
            };

            (prisma.statementFile.findMany as any).mockResolvedValue(mockStatementFiles);

            await statementController.getStatementFiles(mockReq, mockRes, mockNext);

            expect(mockRes.json).toHaveBeenCalledWith(mockStatementFiles);
        });

        test('should get statement file by ID', async () => {
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

            mockReq.params = { id: 'statement1' };
            (prisma.statementFile.findUnique as any).mockResolvedValue(mockStatementFile);

            await statementController.getStatementFile(mockReq, mockRes, mockNext);

            expect(mockRes.json).toHaveBeenCalledWith(mockStatementFile);
        });

        test('should delete statement file successfully', async () => {
            const mockStatementFile = {
                id: 'statement1',
                filename: 'test.csv',
                type: 'text/csv',
                size: 1024,
                uploadedAt: new Date(),
                status: 'uploaded',
                clientId: 'client1'
            };

            mockReq.params = { id: 'statement1' };
            (prisma.statementFile.findUnique as any).mockResolvedValue(mockStatementFile);
            (prisma.statementFile.delete as any).mockResolvedValue(mockStatementFile);

            const mockStorage = {
                deleteFile: vi.fn().mockResolvedValue(undefined)
            };
            (getStorageInstance as any).mockReturnValue(mockStorage);

            await statementController.deleteStatementFile(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(httpStatus.NO_CONTENT);
            expect(mockRes.send).toHaveBeenCalled();
        });

        test('should generate upload URL successfully', async () => {
            const mockStatementFile = {
                id: 'statement1',
                filename: 'test.csv',
                type: 'text/csv',
                size: 1024,
                uploadedAt: new Date(),
                status: 'uploading',
                clientId: 'client1'
            };

            const mockUploadUrl = {
                url: 'https://example.com/upload',
                headers: { 'Content-Type': 'text/csv' }
            };

            mockReq.params = { id: 'statement1' };
            (prisma.statementFile.findUnique as any).mockResolvedValue(mockStatementFile);

            const mockStorage = {
                generateUploadSignedUrl: vi.fn().mockResolvedValue(mockUploadUrl)
            };
            (getStorageInstance as any).mockReturnValue(mockStorage);

            await statementController.generateUploadUrl(mockReq, mockRes, mockNext);

            expect(mockRes.json).toHaveBeenCalledWith(mockUploadUrl);
        });
    });
});
