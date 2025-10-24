import { statementService } from "../services/index.js";
import pick from "../utils/pick.js";
import { z } from 'zod';
const statementFileSchema = z.object({
    id: z.string(),
    filename: z.string(),
    type: z.string(),
    size: z.number(),
    uploadedAt: z.string(),
    status: z.string(),
    clientId: z.string()
});
const parseResultSchema = z.object({
    id: z.string(),
    statementFileId: z.string(),
    totalTransactions: z.number(),
    dateRangeStart: z.string(),
    dateRangeEnd: z.string(),
    accounts: z.any(), // JSON object
    status: z.string(),
    errors: z.any().nullable(),
    createdAt: z.string()
});
const uploadStatementTool = {
    id: 'statement_upload',
    name: 'Upload Statement File',
    description: 'Create a new statement file upload record for a client',
    inputSchema: z.object({
        filename: z.string().max(255),
        type: z.enum([
            'application/pdf',
            'text/csv',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ]),
        size: z
            .number()
            .int()
            .min(1)
            .max(50 * 1024 * 1024), // Max 50MB
        clientId: z.string()
    }),
    outputSchema: statementFileSchema,
    fn: async (inputs) => {
        const statementFile = await statementService.uploadStatementFile(inputs);
        return statementFile;
    }
};
const getUploadStatusTool = {
    id: 'statement_get_upload_status',
    name: 'Get Upload Status',
    description: 'Get the current status of a statement file upload',
    inputSchema: z.object({
        uploadId: z.string()
    }),
    outputSchema: z.object({
        id: z.string(),
        status: z.string(),
        filename: z.string(),
        uploadedAt: z.string()
    }),
    fn: async (inputs) => {
        const status = await statementService.getUploadStatus(inputs.uploadId);
        if (!status) {
            throw new Error('Upload not found');
        }
        return status;
    }
};
const parseStatementTool = {
    id: 'statement_parse',
    name: 'Parse Statement File',
    description: 'Parse an uploaded statement file to extract transaction data',
    inputSchema: z.object({
        statementFileId: z.string()
    }),
    outputSchema: parseResultSchema,
    fn: async (inputs) => {
        const parseResult = await statementService.parseStatement(inputs.statementFileId);
        return parseResult;
    }
};
const getStatementFilesTool = {
    id: 'statement_get_files',
    name: 'Get Statement Files',
    description: 'Get a list of statement files with optional filtering and pagination',
    inputSchema: z.object({
        clientId: z.string().optional(),
        status: z.enum(['uploading', 'uploaded', 'parsing', 'parsed', 'parse_failed', 'failed']).optional(),
        filename: z.string().optional(),
        type: z.string().optional(),
        sortBy: z.enum(['uploadedAt', 'filename', 'size', 'status']).optional(),
        sortType: z.enum(['asc', 'desc']).optional(),
        limit: z.number().int().min(1).max(100).optional(),
        page: z.number().int().min(1).optional()
    }),
    outputSchema: z.object({
        statementFiles: z.array(statementFileSchema)
    }),
    fn: async (inputs) => {
        const filter = pick(inputs, ['clientId', 'status', 'filename', 'type']);
        const options = pick(inputs, ['sortBy', 'sortType', 'limit', 'page']);
        const result = await statementService.queryStatementFiles(filter, options);
        return { statementFiles: result };
    }
};
const getStatementFileTool = {
    id: 'statement_get_file',
    name: 'Get Statement File',
    description: 'Get a single statement file with parse results if available',
    inputSchema: z.object({
        id: z.string()
    }),
    outputSchema: z.object({
        statementFile: statementFileSchema,
        parseResult: parseResultSchema.optional()
    }),
    fn: async (inputs) => {
        const statementFile = await statementService.getStatementFileWithParseResult(inputs.id);
        if (!statementFile) {
            throw new Error('Statement file not found');
        }
        return {
            statementFile: {
                id: statementFile.id,
                filename: statementFile.filename,
                type: statementFile.type,
                size: statementFile.size,
                uploadedAt: statementFile.uploadedAt.toISOString(),
                status: statementFile.status,
                clientId: statementFile.clientId
            },
            parseResult: statementFile.ParseResult
                ? {
                    id: statementFile.ParseResult.id,
                    statementFileId: statementFile.ParseResult.statementFileId,
                    totalTransactions: statementFile.ParseResult.totalTransactions,
                    dateRangeStart: statementFile.ParseResult.dateRangeStart.toISOString(),
                    dateRangeEnd: statementFile.ParseResult.dateRangeEnd.toISOString(),
                    accounts: statementFile.ParseResult.accounts,
                    status: statementFile.ParseResult.status,
                    errors: statementFile.ParseResult.errors,
                    createdAt: statementFile.ParseResult.createdAt.toISOString()
                }
                : undefined
        };
    }
};
const deleteStatementFileTool = {
    id: 'statement_delete_file',
    name: 'Delete Statement File',
    description: 'Delete a statement file and its associated parse results',
    inputSchema: z.object({
        id: z.string()
    }),
    outputSchema: z.object({
        success: z.boolean()
    }),
    fn: async (inputs) => {
        await statementService.deleteStatementFileById(inputs.id);
        return { success: true };
    }
};
const generateUploadUrlTool = {
    id: 'statement_generate_upload_url',
    name: 'Generate Upload URL',
    description: 'Generate a signed URL for direct file upload to cloud storage',
    inputSchema: z.object({
        id: z.string()
    }),
    outputSchema: z.object({
        url: z.string(),
        headers: z.record(z.string()).optional()
    }),
    fn: async (inputs) => {
        const uploadUrl = await statementService.generateUploadSignedUrl(inputs.id);
        return uploadUrl;
    }
};
export const statementTools = [
    uploadStatementTool,
    getUploadStatusTool,
    parseStatementTool,
    getStatementFilesTool,
    getStatementFileTool,
    deleteStatementFileTool,
    generateUploadUrlTool
];
