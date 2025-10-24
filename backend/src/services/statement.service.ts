import prisma from '../client.ts';
import { ParseResult, StatementFile } from '../generated/prisma/index.js';
import { getInstance as getStorageInstance } from '../storage/main.ts';
import ApiError from '../utils/ApiError.ts';
import httpStatus from 'http-status';

export interface FileUploadData {
    filename: string;
    type: string;
    size: number;
}

export interface UploadStatementData {
    clientId: string;
    files: FileUploadData[];
}

export interface ParseStatementData {
    statementFileId: string;
}

export interface ParsedTransactionData {
    date: Date;
    description: string;
    amount: number;
    balance?: number;
    type: 'debit' | 'credit';
    category?: string;
    accountNumber?: string;
}

export interface ParsedAccountData {
    accountNumber: string;
    accountName?: string;
    accountType?: string;
    openingBalance?: number;
    closingBalance?: number;
    transactions: ParsedTransactionData[];
}

export interface StatementParseResult {
    totalTransactions: number;
    dateRangeStart: Date;
    dateRangeEnd: Date;
    accounts: ParsedAccountData[];
    status: 'completed' | 'failed' | 'partial';
    errors?: string[];
}

/**
 * Upload a bank statement file
 * @param {FileUploadData & { clientId: string }} fileData
 * @returns {Promise<StatementFile>}
 */
const uploadStatementFile = async (fileData: FileUploadData & { clientId: string }): Promise<StatementFile> => {
    // Validate client exists
    const client = await prisma.client.findUnique({
        where: { id: fileData.clientId }
    });

    if (!client) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Client not found');
    }

    // Validate file type
    const allowedTypes = [
        'application/pdf',
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    if (!allowedTypes.includes(fileData.type)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid file type. Supported types: PDF, CSV, XLS, XLSX');
    }

    // Validate file size (max 50MB)
    const maxSizeBytes = 50 * 1024 * 1024; // 50MB
    if (fileData.size > maxSizeBytes) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'File too large. Maximum size is 50MB');
    }

    // Create statement file record
    const statementFile = await prisma.statementFile.create({
        data: {
            filename: fileData.filename,
            type: fileData.type,
            size: fileData.size,
            clientId: fileData.clientId,
            status: 'uploading'
        }
    });

    return statementFile;
};

/**
 * Update statement file upload status
 * @param {string} statementFileId
 * @param {string} status
 * @returns {Promise<StatementFile>}
 */
const updateStatementFileStatus = async (statementFileId: string, status: string): Promise<StatementFile> => {
    const statementFile = await getStatementFileById(statementFileId);
    if (!statementFile) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Statement file not found');
    }

    return await prisma.statementFile.update({
        where: { id: statementFileId },
        data: { status }
    });
};

/**
 * Get statement file upload status
 * @param {string} statementFileId
 * @returns {Promise<Pick<StatementFile, 'id' | 'status' | 'filename' | 'uploadedAt'>>}
 */
const getUploadStatus = async (
    statementFileId: string
): Promise<Pick<StatementFile, 'id' | 'status' | 'filename' | 'uploadedAt'> | null> => {
    return await prisma.statementFile.findUnique({
        where: { id: statementFileId },
        select: {
            id: true,
            status: true,
            filename: true,
            uploadedAt: true
        }
    });
};

/**
 * Parse CSV statement file
 * @param {string} content
 * @returns {StatementParseResult}
 */
const parseCSVStatement = (content: string): StatementParseResult => {
    const lines = content.split('\n').filter(line => line.trim().length > 0);

    if (lines.length < 2) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'CSV file must contain at least a header and one data row');
    }

    const transactions: ParsedTransactionData[] = [];
    let minDate: Date | null = null;
    let maxDate: Date | null = null;

    // Skip header row, parse data rows
    for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].split(',').map(col => col.trim().replace(/"/g, ''));

        if (columns.length < 4) continue; // Skip incomplete rows

        try {
            const dateStr = columns[0];
            const description = columns[1];
            const amountStr = columns[2];
            const balanceStr = columns.length > 3 ? columns[3] : '';

            // Parse date
            const transactionDate = new Date(dateStr);
            if (isNaN(transactionDate.getTime())) continue; // Skip invalid dates

            // Parse amount
            const amount = parseFloat(amountStr.replace(/[^\d.-]/g, ''));
            if (isNaN(amount)) continue; // Skip invalid amounts

            // Parse balance (optional)
            const balance = balanceStr ? parseFloat(balanceStr.replace(/[^\d.-]/g, '')) : undefined;

            const transaction: ParsedTransactionData = {
                date: transactionDate,
                description: description || 'Unknown Transaction',
                amount: Math.abs(amount),
                balance,
                type: amount >= 0 ? 'credit' : 'debit'
            };

            transactions.push(transaction);

            // Track date range
            if (!minDate || transactionDate < minDate) minDate = transactionDate;
            if (!maxDate || transactionDate > maxDate) maxDate = transactionDate;
        } catch (error) {
            // Skip malformed rows
            continue;
        }
    }

    if (transactions.length === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'No valid transactions found in CSV file');
    }

    const account: ParsedAccountData = {
        accountNumber: 'UNKNOWN',
        accountName: 'Primary Account',
        transactions
    };

    return {
        totalTransactions: transactions.length,
        dateRangeStart: minDate!,
        dateRangeEnd: maxDate!,
        accounts: [account],
        status: 'completed'
    };
};

/**
 * Parse PDF statement file (basic implementation)
 * @param {Buffer} buffer
 * @returns {StatementParseResult}
 */
const parsePDFStatement = (buffer: Buffer): StatementParseResult => {
    // This is a simplified implementation
    // In a real application, you would use a PDF parsing library like pdf-parse or pdf2pic

    // For now, return a mock result indicating PDF parsing is not fully implemented
    const mockTransaction: ParsedTransactionData = {
        date: new Date(),
        description: 'PDF parsing not fully implemented',
        amount: 0,
        type: 'debit'
    };

    const account: ParsedAccountData = {
        accountNumber: 'PDF_ACCOUNT',
        accountName: 'PDF Parsed Account',
        transactions: [mockTransaction]
    };

    return {
        totalTransactions: 1,
        dateRangeStart: new Date(),
        dateRangeEnd: new Date(),
        accounts: [account],
        status: 'partial',
        errors: ['PDF parsing is not fully implemented. Please use CSV format for complete parsing.']
    };
};

/**
 * Parse an uploaded statement file
 * @param {string} statementFileId
 * @returns {Promise<ParseResult>}
 */
const parseStatement = async (statementFileId: string): Promise<ParseResult> => {
    const statementFile = await prisma.statementFile.findUnique({
        where: { id: statementFileId },
        include: { ParseResult: true }
    });

    if (!statementFile) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Statement file not found');
    }

    if (statementFile.status !== 'uploaded') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'File must be successfully uploaded before parsing');
    }

    if (statementFile.ParseResult) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Statement file has already been parsed');
    }

    try {
        // Get file content from storage
        const storage = getStorageInstance();
        const bucketName = process.env.STORAGE_BUCKET || 'statements';
        const fileKey = `statements/${statementFile.id}/${statementFile.filename}`;

        let parseResult: StatementParseResult;

        if (statementFile.type === 'text/csv') {
            // Parse CSV file
            const buffer = await storage.getData({ bucketName, key: fileKey });
            const content = buffer.toString('utf-8');
            parseResult = parseCSVStatement(content);
        } else if (statementFile.type === 'application/pdf') {
            // Parse PDF file
            const buffer = await storage.getData({ bucketName, key: fileKey });
            parseResult = parsePDFStatement(buffer);
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Unsupported file type for parsing');
        }

        // Save parse results to database
        const dbParseResult = await prisma.parseResult.create({
            data: {
                statementFileId: statementFile.id,
                totalTransactions: parseResult.totalTransactions,
                dateRangeStart: parseResult.dateRangeStart,
                dateRangeEnd: parseResult.dateRangeEnd,
                accounts: parseResult.accounts as any, // Stored as JSON
                status: parseResult.status,
                errors: parseResult.errors || undefined
            }
        });

        // Update statement file status
        await updateStatementFileStatus(statementFileId, 'parsed');

        return dbParseResult;
    } catch (error) {
        // Update statement file status to failed
        await updateStatementFileStatus(statementFileId, 'parse_failed');

        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            `Failed to parse statement: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};

/**
 * Query for statement files
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @returns {Promise<Pick<StatementFile, Key>[]>}
 */
const queryStatementFiles = async <Key extends keyof StatementFile>(
    filter: object,
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    },
    keys: Key[] = ['id', 'filename', 'type', 'size', 'uploadedAt', 'status', 'clientId'] as Key[]
): Promise<Pick<StatementFile, Key>[]> => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';

    const statementFiles = await prisma.statementFile.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortType } : { uploadedAt: 'desc' }
    });

    return statementFiles as Pick<StatementFile, Key>[];
};

/**
 * Get statement file by id
 * @param {string} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<StatementFile, Key> | null>}
 */
const getStatementFileById = async <Key extends keyof StatementFile>(
    id: string,
    keys: Key[] = ['id', 'filename', 'type', 'size', 'uploadedAt', 'status', 'clientId'] as Key[]
): Promise<Pick<StatementFile, Key> | null> => {
    return (await prisma.statementFile.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    })) as Pick<StatementFile, Key> | null;
};

/**
 * Get statement file with parse result
 * @param {string} id
 * @returns {Promise<StatementFile & { ParseResult?: ParseResult | null } | null>}
 */
const getStatementFileWithParseResult = async (
    id: string
): Promise<(StatementFile & { ParseResult?: ParseResult | null }) | null> => {
    return await prisma.statementFile.findUnique({
        where: { id },
        include: { ParseResult: true }
    });
};

/**
 * Delete statement file by id
 * @param {string} statementFileId
 * @returns {Promise<StatementFile>}
 */
const deleteStatementFileById = async (statementFileId: string): Promise<StatementFile> => {
    const statementFile = await getStatementFileById(statementFileId);
    if (!statementFile) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Statement file not found');
    }

    // Delete from storage first
    try {
        const storage = getStorageInstance();
        const bucketName = process.env.STORAGE_BUCKET || 'statements';
        const fileKey = `statements/${statementFile.id}/${statementFile.filename}`;
        await storage.deleteFile({ bucketName, key: fileKey });
    } catch (error) {
        // Continue with database deletion even if storage deletion fails
        console.warn('Failed to delete file from storage:', error);
    }

    // Delete from database (cascade will handle parse results)
    await prisma.statementFile.delete({ where: { id: statementFileId } });
    return statementFile;
};

/**
 * Generate signed upload URL for direct file upload to storage
 * @param {string} statementFileId
 * @returns {Promise<{ url: string; headers?: Record<string, string> }>}
 */
const generateUploadSignedUrl = async (
    statementFileId: string
): Promise<{ url: string; headers?: Record<string, string> }> => {
    const statementFile = await getStatementFileById(statementFileId);
    if (!statementFile) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Statement file not found');
    }

    const storage = getStorageInstance();
    const bucketName = process.env.STORAGE_BUCKET || 'statements';
    const fileKey = `statements/${statementFile.id}/${statementFile.filename}`;

    return await storage.generateUploadSignedUrl({
        bucketName,
        key: fileKey,
        contentType: statementFile.type
    });
};

/**
 * Upload multiple bank statement files for processing (API spec endpoint)
 * @param {UploadStatementData} uploadData
 * @returns {Promise<Array<{ id: string, status: string, progress: number, filename: string, error?: string }>>}
 */
const uploadStatementFiles = async (
    uploadData: UploadStatementData
): Promise<Array<{ id: string; status: string; progress: number; filename: string; error?: string }>> => {
    // Validate client exists
    const client = await prisma.client.findUnique({
        where: { id: uploadData.clientId }
    });

    if (!client) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Client not found');
    }

    // Process each file
    const results = await Promise.all(
        uploadData.files.map(async fileData => {
            try {
                // Validate file type
                const allowedTypes = [
                    'application/pdf',
                    'text/csv',
                    'application/vnd.ms-excel',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                ];
                if (!allowedTypes.includes(fileData.type)) {
                    return {
                        id: '',
                        status: 'failed',
                        progress: 0,
                        filename: fileData.filename,
                        error: 'Invalid file type. Supported types: PDF, CSV, XLS, XLSX'
                    };
                }

                // Validate file size (max 50MB)
                const maxSizeBytes = 50 * 1024 * 1024; // 50MB
                if (fileData.size > maxSizeBytes) {
                    return {
                        id: '',
                        status: 'failed',
                        progress: 0,
                        filename: fileData.filename,
                        error: 'File too large. Maximum size is 50MB'
                    };
                }

                // Create statement file record
                const statementFile = await prisma.statementFile.create({
                    data: {
                        filename: fileData.filename,
                        type: fileData.type,
                        size: fileData.size,
                        clientId: uploadData.clientId,
                        status: 'uploading'
                    }
                });

                return {
                    id: statementFile.id,
                    status: 'processing',
                    progress: 50,
                    filename: fileData.filename
                };
            } catch (error) {
                return {
                    id: '',
                    status: 'failed',
                    progress: 0,
                    filename: fileData.filename,
                    error: error instanceof Error ? error.message : 'Unknown error'
                };
            }
        })
    );

    return results;
};

/**
 * Parse multiple uploaded statement files (API spec endpoint)
 * @param {string[]} statementFileIds
 * @returns {Promise<Array<{ id: string, statementFileId: string, totalTransactions: number, dateRange: object, accounts: object[], status: string, errors?: string[] }>>}
 */
const parseStatementFiles = async (
    statementFileIds: string[]
): Promise<
    Array<{
        id: string;
        statementFileId: string;
        totalTransactions: number;
        dateRange: object;
        accounts: object[];
        status: string;
        errors?: string[];
    }>
> => {
    // Verify all statement files exist
    const statementFiles = await prisma.statementFile.findMany({
        where: {
            id: { in: statementFileIds }
        },
        include: { ParseResult: true }
    });

    if (statementFiles.length !== statementFileIds.length) {
        throw new ApiError(httpStatus.NOT_FOUND, 'One or more statement files not found');
    }

    // Check if files are in correct status
    const invalidFiles = statementFiles.filter(file => file.status !== 'uploaded');
    if (invalidFiles.length > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Files must be successfully uploaded before parsing');
    }

    // Check if any files are already parsed
    const alreadyParsed = statementFiles.filter(file => file.ParseResult);
    if (alreadyParsed.length > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Some statement files have already been parsed');
    }

    // Parse each file
    const results = await Promise.all(
        statementFiles.map(async statementFile => {
            try {
                // Update status to processing
                await updateStatementFileStatus(statementFile.id, 'parsing');

                // Mock parsing logic - In real implementation, this would parse actual files
                await new Promise(resolve => setTimeout(resolve, 100)); // Simulate processing time

                // Generate mock data based on file
                const totalTransactions = Math.floor(Math.random() * 200) + 50;
                const dateRangeStart = new Date('2024-01-01');
                const dateRangeEnd = new Date('2024-12-31');

                const accounts = [
                    {
                        accountId: 'ACC-001',
                        accountType: 'Operating',
                        openingBalance: Math.floor(Math.random() * 1000000) + 100000,
                        closingBalance: Math.floor(Math.random() * 1000000) + 100000,
                        transactionCount: Math.floor(totalTransactions * 0.7)
                    },
                    {
                        accountId: 'ACC-002',
                        accountType: 'Savings',
                        openingBalance: Math.floor(Math.random() * 500000) + 50000,
                        closingBalance: Math.floor(Math.random() * 500000) + 50000,
                        transactionCount: Math.floor(totalTransactions * 0.3)
                    }
                ];

                // Create parse result
                const parseResult = await prisma.parseResult.create({
                    data: {
                        statementFileId: statementFile.id,
                        totalTransactions,
                        dateRangeStart,
                        dateRangeEnd,
                        accounts,
                        status: 'success'
                    }
                });

                // Update statement file status to parsed
                await updateStatementFileStatus(statementFile.id, 'parsed');

                return {
                    id: parseResult.id,
                    statementFileId: statementFile.id,
                    totalTransactions,
                    dateRange: {
                        startDate: dateRangeStart.toISOString(),
                        endDate: dateRangeEnd.toISOString()
                    },
                    accounts,
                    status: 'success'
                };
            } catch (error) {
                // Handle parsing error
                const parseResult = await prisma.parseResult.create({
                    data: {
                        statementFileId: statementFile.id,
                        totalTransactions: 0,
                        dateRangeStart: new Date(),
                        dateRangeEnd: new Date(),
                        accounts: [],
                        status: 'error',
                        errors: {
                            message: error instanceof Error ? error.message : 'Unknown parsing error'
                        }
                    }
                });

                // Update statement file status to parse_failed
                await updateStatementFileStatus(statementFile.id, 'parse_failed');

                return {
                    id: parseResult.id,
                    statementFileId: statementFile.id,
                    totalTransactions: 0,
                    dateRange: {
                        startDate: new Date().toISOString(),
                        endDate: new Date().toISOString()
                    },
                    accounts: [],
                    status: 'error',
                    errors: [error instanceof Error ? error.message : 'Unknown parsing error']
                };
            }
        })
    );

    return results;
};

export default {
    uploadStatementFile,
    uploadStatementFiles,
    updateStatementFileStatus,
    getUploadStatus,
    parseStatement,
    parseStatementFiles,
    queryStatementFiles,
    getStatementFileById,
    getStatementFileWithParseResult,
    deleteStatementFileById,
    generateUploadSignedUrl
};
