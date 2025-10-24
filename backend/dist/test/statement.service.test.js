import prisma from "../client.js";
import statementService from "../services/statement.service.js";
import { getInstance as getStorageInstance } from "../storage/main.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from 'http-status';
import { beforeEach, describe, expect, test, vi } from 'vitest';
// Mock Prisma
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
// Mock storage
vi.mock('../storage/main.ts', () => ({
    getInstance: vi.fn(() => ({
        getData: vi.fn(),
        deleteFile: vi.fn(),
        generateUploadSignedUrl: vi.fn()
    }))
}));
describe('Statement Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    describe('uploadStatementFile', () => {
        test('should create statement file record successfully', async () => {
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
            prisma.client.findUnique.mockResolvedValue(mockClient);
            prisma.statementFile.create.mockResolvedValue(mockStatementFile);
            const fileData = {
                filename: 'test.csv',
                type: 'text/csv',
                size: 1024,
                clientId: 'client1'
            };
            const result = await statementService.uploadStatementFile(fileData);
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
            expect(result).toEqual(mockStatementFile);
        });
        test('should throw error if client not found', async () => {
            prisma.client.findUnique.mockResolvedValue(null);
            const fileData = {
                filename: 'test.csv',
                type: 'text/csv',
                size: 1024,
                clientId: 'nonexistent'
            };
            await expect(statementService.uploadStatementFile(fileData)).rejects.toThrow(new ApiError(httpStatus.NOT_FOUND, 'Client not found'));
        });
        test('should throw error for invalid file type', async () => {
            const mockClient = { id: 'client1', name: 'Test Client' };
            prisma.client.findUnique.mockResolvedValue(mockClient);
            const fileData = {
                filename: 'test.txt',
                type: 'text/plain',
                size: 1024,
                clientId: 'client1'
            };
            await expect(statementService.uploadStatementFile(fileData)).rejects.toThrow(new ApiError(httpStatus.BAD_REQUEST, 'Invalid file type. Supported types: PDF, CSV, XLS, XLSX'));
        });
        test('should throw error for file too large', async () => {
            const mockClient = { id: 'client1', name: 'Test Client' };
            prisma.client.findUnique.mockResolvedValue(mockClient);
            const fileData = {
                filename: 'test.csv',
                type: 'text/csv',
                size: 60 * 1024 * 1024, // 60MB
                clientId: 'client1'
            };
            await expect(statementService.uploadStatementFile(fileData)).rejects.toThrow(new ApiError(httpStatus.BAD_REQUEST, 'File too large. Maximum size is 50MB'));
        });
    });
    describe('getUploadStatus', () => {
        test('should return upload status successfully', async () => {
            const mockStatus = {
                id: 'statement1',
                status: 'uploaded',
                filename: 'test.csv',
                uploadedAt: new Date()
            };
            prisma.statementFile.findUnique.mockResolvedValue(mockStatus);
            const result = await statementService.getUploadStatus('statement1');
            expect(prisma.statementFile.findUnique).toHaveBeenCalledWith({
                where: { id: 'statement1' },
                select: {
                    id: true,
                    status: true,
                    filename: true,
                    uploadedAt: true
                }
            });
            expect(result).toEqual(mockStatus);
        });
        test('should return null if statement file not found', async () => {
            prisma.statementFile.findUnique.mockResolvedValue(null);
            const result = await statementService.getUploadStatus('nonexistent');
            expect(result).toBeNull();
        });
    });
    describe('parseStatement', () => {
        test('should parse CSV statement successfully', async () => {
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
                accounts: [
                    {
                        accountNumber: 'UNKNOWN',
                        accountName: 'Primary Account',
                        transactions: [
                            {
                                date: new Date('2024-01-15'),
                                description: 'Payment',
                                amount: 100,
                                type: 'debit'
                            }
                        ]
                    }
                ],
                status: 'completed',
                errors: null,
                createdAt: new Date()
            };
            const csvContent = `Date,Description,Amount,Balance
2024-01-15,Payment,-100.00,1000.00
2024-01-16,Deposit,200.00,1200.00`;
            prisma.statementFile.findUnique.mockResolvedValue(mockStatementFile);
            prisma.parseResult.create.mockResolvedValue(mockParseResult);
            prisma.statementFile.update.mockResolvedValue({ ...mockStatementFile, status: 'parsed' });
            const mockStorage = {
                getData: vi.fn().mockResolvedValue(Buffer.from(csvContent, 'utf-8'))
            };
            getStorageInstance.mockReturnValue(mockStorage);
            const result = await statementService.parseStatement('statement1');
            expect(prisma.statementFile.findUnique).toHaveBeenCalledWith({
                where: { id: 'statement1' },
                include: { ParseResult: true }
            });
            expect(mockStorage.getData).toHaveBeenCalled();
            expect(prisma.parseResult.create).toHaveBeenCalled();
            expect(result).toEqual(mockParseResult);
        });
        test('should throw error if statement file not found', async () => {
            prisma.statementFile.findUnique.mockResolvedValue(null);
            await expect(statementService.parseStatement('nonexistent')).rejects.toThrow(new ApiError(httpStatus.NOT_FOUND, 'Statement file not found'));
        });
        test('should throw error if file not uploaded', async () => {
            const mockStatementFile = {
                id: 'statement1',
                filename: 'test.csv',
                type: 'text/csv',
                status: 'uploading',
                ParseResult: null
            };
            prisma.statementFile.findUnique.mockResolvedValue(mockStatementFile);
            await expect(statementService.parseStatement('statement1')).rejects.toThrow(new ApiError(httpStatus.BAD_REQUEST, 'File must be successfully uploaded before parsing'));
        });
        test('should throw error if already parsed', async () => {
            const mockStatementFile = {
                id: 'statement1',
                filename: 'test.csv',
                type: 'text/csv',
                status: 'uploaded',
                ParseResult: { id: 'existing' }
            };
            prisma.statementFile.findUnique.mockResolvedValue(mockStatementFile);
            await expect(statementService.parseStatement('statement1')).rejects.toThrow(new ApiError(httpStatus.BAD_REQUEST, 'Statement file has already been parsed'));
        });
    });
    describe('queryStatementFiles', () => {
        test('should query statement files successfully', async () => {
            const mockStatementFiles = [
                {
                    id: 'statement1',
                    filename: 'test1.csv',
                    type: 'text/csv',
                    size: 1024,
                    uploadedAt: new Date(),
                    status: 'uploaded',
                    clientId: 'client1'
                },
                {
                    id: 'statement2',
                    filename: 'test2.pdf',
                    type: 'application/pdf',
                    size: 2048,
                    uploadedAt: new Date(),
                    status: 'parsed',
                    clientId: 'client1'
                }
            ];
            prisma.statementFile.findMany.mockResolvedValue(mockStatementFiles);
            const filter = { clientId: 'client1' };
            const options = { limit: 10, page: 1, sortBy: 'uploadedAt', sortType: 'desc' };
            const result = await statementService.queryStatementFiles(filter, options);
            expect(prisma.statementFile.findMany).toHaveBeenCalledWith({
                where: filter,
                select: {
                    id: true,
                    filename: true,
                    type: true,
                    size: true,
                    uploadedAt: true,
                    status: true,
                    clientId: true
                },
                skip: 0,
                take: 10,
                orderBy: { uploadedAt: 'desc' }
            });
            expect(result).toEqual(mockStatementFiles);
        });
    });
    describe('deleteStatementFileById', () => {
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
            prisma.statementFile.findUnique.mockResolvedValue(mockStatementFile);
            prisma.statementFile.delete.mockResolvedValue(mockStatementFile);
            const mockStorage = {
                deleteFile: vi.fn().mockResolvedValue(undefined)
            };
            getStorageInstance.mockReturnValue(mockStorage);
            const result = await statementService.deleteStatementFileById('statement1');
            expect(mockStorage.deleteFile).toHaveBeenCalled();
            expect(prisma.statementFile.delete).toHaveBeenCalledWith({
                where: { id: 'statement1' }
            });
            expect(result).toEqual(mockStatementFile);
        });
        test('should throw error if statement file not found', async () => {
            prisma.statementFile.findUnique.mockResolvedValue(null);
            await expect(statementService.deleteStatementFileById('nonexistent')).rejects.toThrow(new ApiError(httpStatus.NOT_FOUND, 'Statement file not found'));
        });
    });
    describe('generateUploadSignedUrl', () => {
        test('should generate upload signed URL successfully', async () => {
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
            prisma.statementFile.findUnique.mockResolvedValue(mockStatementFile);
            const mockStorage = {
                generateUploadSignedUrl: vi.fn().mockResolvedValue(mockUploadUrl)
            };
            getStorageInstance.mockReturnValue(mockStorage);
            const result = await statementService.generateUploadSignedUrl('statement1');
            expect(mockStorage.generateUploadSignedUrl).toHaveBeenCalledWith({
                bucketName: 'statements',
                key: 'statements/statement1/test.csv',
                contentType: 'text/csv'
            });
            expect(result).toEqual(mockUploadUrl);
        });
        test('should throw error if statement file not found', async () => {
            prisma.statementFile.findUnique.mockResolvedValue(null);
            await expect(statementService.generateUploadSignedUrl('nonexistent')).rejects.toThrow(new ApiError(httpStatus.NOT_FOUND, 'Statement file not found'));
        });
    });
});
