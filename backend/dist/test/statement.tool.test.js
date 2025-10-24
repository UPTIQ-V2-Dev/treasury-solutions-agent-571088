import { statementService } from "../services/index.js";
import { statementTools } from "../tools/statement.tool.js";
import pick from "../utils/pick.js";
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
        generateUploadSignedUrl: vi.fn()
    }
}));
// Mock utilities
vi.mock('../utils/pick.ts', () => ({
    default: vi.fn((obj, keys) => {
        const result = {};
        keys.forEach((key) => {
            if (obj[key] !== undefined) {
                result[key] = obj[key];
            }
        });
        return result;
    })
}));
describe('Statement Tools', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    describe('uploadStatementTool', () => {
        const tool = statementTools.find(t => t.id === 'statement_upload');
        test('should have correct schema and metadata', () => {
            expect(tool.id).toBe('statement_upload');
            expect(tool.name).toBe('Upload Statement File');
            expect(tool.description).toBe('Create a new statement file upload record for a client');
            expect(tool.inputSchema).toBeDefined();
            expect(tool.outputSchema).toBeDefined();
        });
        test('should validate valid input', () => {
            const validInput = {
                filename: 'test.csv',
                type: 'text/csv',
                size: 1024,
                clientId: 'client123'
            };
            const result = tool.inputSchema.safeParse(validInput);
            expect(result.success).toBe(true);
        });
        test('should reject invalid file type', () => {
            const invalidInput = {
                filename: 'test.txt',
                type: 'text/plain',
                size: 1024,
                clientId: 'client123'
            };
            const result = tool.inputSchema.safeParse(invalidInput);
            expect(result.success).toBe(false);
        });
        test('should call service and return result', async () => {
            const mockResult = {
                id: 'statement1',
                filename: 'test.csv',
                type: 'text/csv',
                size: 1024,
                uploadedAt: '2024-01-01T00:00:00Z',
                status: 'uploading',
                clientId: 'client123'
            };
            const input = {
                filename: 'test.csv',
                type: 'text/csv',
                size: 1024,
                clientId: 'client123'
            };
            statementService.uploadStatementFile.mockResolvedValue(mockResult);
            const result = await tool.fn(input);
            expect(statementService.uploadStatementFile).toHaveBeenCalledWith(input);
            expect(result).toEqual(mockResult);
        });
    });
    describe('getUploadStatusTool', () => {
        const tool = statementTools.find(t => t.id === 'statement_get_upload_status');
        test('should have correct schema and metadata', () => {
            expect(tool.id).toBe('statement_get_upload_status');
            expect(tool.name).toBe('Get Upload Status');
            expect(tool.description).toBe('Get the current status of a statement file upload');
            expect(tool.inputSchema).toBeDefined();
            expect(tool.outputSchema).toBeDefined();
        });
        test('should call service and return result', async () => {
            const mockResult = {
                id: 'statement1',
                status: 'uploaded',
                filename: 'test.csv',
                uploadedAt: '2024-01-01T00:00:00Z'
            };
            const input = { uploadId: 'statement1' };
            statementService.getUploadStatus.mockResolvedValue(mockResult);
            const result = await tool.fn(input);
            expect(statementService.getUploadStatus).toHaveBeenCalledWith('statement1');
            expect(result).toEqual(mockResult);
        });
        test('should throw error if upload not found', async () => {
            const input = { uploadId: 'nonexistent' };
            statementService.getUploadStatus.mockResolvedValue(null);
            await expect(tool.fn(input)).rejects.toThrow('Upload not found');
        });
    });
    describe('parseStatementTool', () => {
        const tool = statementTools.find(t => t.id === 'statement_parse');
        test('should have correct schema and metadata', () => {
            expect(tool.id).toBe('statement_parse');
            expect(tool.name).toBe('Parse Statement File');
            expect(tool.description).toBe('Parse an uploaded statement file to extract transaction data');
            expect(tool.inputSchema).toBeDefined();
            expect(tool.outputSchema).toBeDefined();
        });
        test('should call service and return result', async () => {
            const mockResult = {
                id: 'parse1',
                statementFileId: 'statement1',
                totalTransactions: 10,
                dateRangeStart: '2024-01-01T00:00:00Z',
                dateRangeEnd: '2024-01-31T00:00:00Z',
                accounts: [],
                status: 'completed',
                errors: null,
                createdAt: '2024-01-01T00:00:00Z'
            };
            const input = { statementFileId: 'statement1' };
            statementService.parseStatement.mockResolvedValue(mockResult);
            const result = await tool.fn(input);
            expect(statementService.parseStatement).toHaveBeenCalledWith('statement1');
            expect(result).toEqual(mockResult);
        });
    });
    describe('getStatementFilesTool', () => {
        const tool = statementTools.find(t => t.id === 'statement_get_files');
        test('should have correct schema and metadata', () => {
            expect(tool.id).toBe('statement_get_files');
            expect(tool.name).toBe('Get Statement Files');
            expect(tool.description).toBe('Get a list of statement files with optional filtering and pagination');
            expect(tool.inputSchema).toBeDefined();
            expect(tool.outputSchema).toBeDefined();
        });
        test('should validate input with all parameters', () => {
            const validInput = {
                clientId: 'client1',
                status: 'uploaded',
                filename: 'test.csv',
                type: 'text/csv',
                sortBy: 'uploadedAt',
                sortType: 'desc',
                limit: 10,
                page: 1
            };
            const result = tool.inputSchema.safeParse(validInput);
            expect(result.success).toBe(true);
        });
        test('should validate input with optional parameters', () => {
            const validInput = {};
            const result = tool.inputSchema.safeParse(validInput);
            expect(result.success).toBe(true);
        });
        test('should call service with picked parameters', async () => {
            const mockResult = [
                {
                    id: 'statement1',
                    filename: 'test.csv',
                    type: 'text/csv',
                    size: 1024,
                    uploadedAt: '2024-01-01T00:00:00Z',
                    status: 'uploaded',
                    clientId: 'client1'
                }
            ];
            const input = {
                clientId: 'client1',
                status: 'uploaded',
                limit: 10,
                page: 1
            };
            pick
                .mockReturnValueOnce({ clientId: 'client1', status: 'uploaded' })
                .mockReturnValueOnce({ limit: 10, page: 1 });
            statementService.queryStatementFiles.mockResolvedValue(mockResult);
            const result = await tool.fn(input);
            expect(pick).toHaveBeenCalledWith(input, ['clientId', 'status', 'filename', 'type']);
            expect(pick).toHaveBeenCalledWith(input, ['sortBy', 'sortType', 'limit', 'page']);
            expect(statementService.queryStatementFiles).toHaveBeenCalledWith({ clientId: 'client1', status: 'uploaded' }, { limit: 10, page: 1 });
            expect(result).toEqual({ statementFiles: mockResult });
        });
    });
    describe('getStatementFileTool', () => {
        const tool = statementTools.find(t => t.id === 'statement_get_file');
        test('should have correct schema and metadata', () => {
            expect(tool.id).toBe('statement_get_file');
            expect(tool.name).toBe('Get Statement File');
            expect(tool.description).toBe('Get a single statement file with parse results if available');
            expect(tool.inputSchema).toBeDefined();
            expect(tool.outputSchema).toBeDefined();
        });
        test('should call service and format result without parse result', async () => {
            const mockStatementFile = {
                id: 'statement1',
                filename: 'test.csv',
                type: 'text/csv',
                size: 1024,
                uploadedAt: new Date('2024-01-01'),
                status: 'uploaded',
                clientId: 'client1',
                ParseResult: null
            };
            const input = { id: 'statement1' };
            statementService.getStatementFileWithParseResult.mockResolvedValue(mockStatementFile);
            const result = await tool.fn(input);
            expect(statementService.getStatementFileWithParseResult).toHaveBeenCalledWith('statement1');
            expect(result).toEqual({
                statementFile: {
                    id: 'statement1',
                    filename: 'test.csv',
                    type: 'text/csv',
                    size: 1024,
                    uploadedAt: '2024-01-01T00:00:00.000Z',
                    status: 'uploaded',
                    clientId: 'client1'
                },
                parseResult: undefined
            });
        });
        test('should call service and format result with parse result', async () => {
            const mockStatementFile = {
                id: 'statement1',
                filename: 'test.csv',
                type: 'text/csv',
                size: 1024,
                uploadedAt: new Date('2024-01-01'),
                status: 'parsed',
                clientId: 'client1',
                ParseResult: {
                    id: 'parse1',
                    statementFileId: 'statement1',
                    totalTransactions: 10,
                    dateRangeStart: new Date('2024-01-01'),
                    dateRangeEnd: new Date('2024-01-31'),
                    accounts: [],
                    status: 'completed',
                    errors: null,
                    createdAt: new Date('2024-01-01')
                }
            };
            const input = { id: 'statement1' };
            statementService.getStatementFileWithParseResult.mockResolvedValue(mockStatementFile);
            const result = await tool.fn(input);
            expect(result.parseResult).toBeDefined();
            expect(result.parseResult?.id).toBe('parse1');
            expect(result.parseResult?.dateRangeStart).toBe('2024-01-01T00:00:00.000Z');
        });
        test('should throw error if statement file not found', async () => {
            const input = { id: 'nonexistent' };
            statementService.getStatementFileWithParseResult.mockResolvedValue(null);
            await expect(tool.fn(input)).rejects.toThrow('Statement file not found');
        });
    });
    describe('deleteStatementFileTool', () => {
        const tool = statementTools.find(t => t.id === 'statement_delete_file');
        test('should have correct schema and metadata', () => {
            expect(tool.id).toBe('statement_delete_file');
            expect(tool.name).toBe('Delete Statement File');
            expect(tool.description).toBe('Delete a statement file and its associated parse results');
            expect(tool.inputSchema).toBeDefined();
            expect(tool.outputSchema).toBeDefined();
        });
        test('should call service and return success', async () => {
            const input = { id: 'statement1' };
            statementService.deleteStatementFileById.mockResolvedValue({});
            const result = await tool.fn(input);
            expect(statementService.deleteStatementFileById).toHaveBeenCalledWith('statement1');
            expect(result).toEqual({ success: true });
        });
    });
    describe('generateUploadUrlTool', () => {
        const tool = statementTools.find(t => t.id === 'statement_generate_upload_url');
        test('should have correct schema and metadata', () => {
            expect(tool.id).toBe('statement_generate_upload_url');
            expect(tool.name).toBe('Generate Upload URL');
            expect(tool.description).toBe('Generate a signed URL for direct file upload to cloud storage');
            expect(tool.inputSchema).toBeDefined();
            expect(tool.outputSchema).toBeDefined();
        });
        test('should call service and return URL', async () => {
            const mockResult = {
                url: 'https://example.com/upload',
                headers: { 'Content-Type': 'text/csv' }
            };
            const input = { id: 'statement1' };
            statementService.generateUploadSignedUrl.mockResolvedValue(mockResult);
            const result = await tool.fn(input);
            expect(statementService.generateUploadSignedUrl).toHaveBeenCalledWith('statement1');
            expect(result).toEqual(mockResult);
        });
    });
    test('should export all expected tools', () => {
        const expectedToolIds = [
            'statement_upload',
            'statement_get_upload_status',
            'statement_parse',
            'statement_get_files',
            'statement_get_file',
            'statement_delete_file',
            'statement_generate_upload_url'
        ];
        const actualToolIds = statementTools.map(tool => tool.id);
        expectedToolIds.forEach(id => {
            expect(actualToolIds).toContain(id);
        });
        expect(statementTools).toHaveLength(expectedToolIds.length);
    });
});
