import prisma from '../client.ts';
import { AuditEntry } from '../generated/prisma/index.js';
import ApiError from '../utils/ApiError.ts';
import httpStatus from 'http-status';

// Default configuration values
const DEFAULT_CONFIG = {
    thresholds: {
        idleCashThreshold: 100000,
        liquidityWarningThreshold: 50000,
        lowBalanceThreshold: 10000,
        highRiskThreshold: 500000
    },
    features: {
        enableAutoAnalysis: true,
        enableEmailNotifications: true,
        enableRecommendationEngine: true,
        enableAdvancedReports: false
    },
    integrations: {
        bankApiEnabled: false,
        webhooksEnabled: false,
        apiRateLimit: 1000,
        maxFileSize: 25
    },
    security: {
        sessionTimeout: 60,
        passwordExpiry: 90,
        requireMfa: false,
        auditLogRetention: 365
    }
};

/**
 * Get system configuration settings
 * @returns {Promise<object>}
 */
const getConfig = async (): Promise<object> => {
    const configs = await prisma.systemConfig.findMany();

    // Start with defaults
    const result: Record<string, any> = { ...DEFAULT_CONFIG };

    // Override with database values
    configs.forEach(config => {
        const category = config.configKey.split('.')[0];
        const key = config.configKey.split('.')[1];

        if (result[category] && key) {
            result[category][key] = config.configValue;
        } else if (!key) {
            // Handle top-level config keys
            result[config.configKey] = config.configValue;
        }
    });

    return result;
};

/**
 * Update system configuration settings
 * @param {object} configUpdates - Configuration updates
 * @param {string} updatedBy - User who made the update
 * @returns {Promise<object>}
 */
const updateConfig = async (configUpdates: object, updatedBy: string): Promise<object> => {
    const flattenedUpdates = flattenConfig(configUpdates);

    // Validate configuration values
    validateConfig(flattenedUpdates);

    // Update each configuration key
    for (const [key, value] of Object.entries(flattenedUpdates)) {
        await prisma.systemConfig.upsert({
            where: { configKey: key },
            update: {
                configValue: value,
                updatedBy
            },
            create: {
                configKey: key,
                configValue: value,
                updatedBy
            }
        });
    }

    return await getConfig();
};

/**
 * Reset configuration to default values
 * @param {string} updatedBy - User who made the reset
 * @returns {Promise<object>}
 */
const resetConfig = async (updatedBy: string): Promise<object> => {
    // Delete all existing config
    await prisma.systemConfig.deleteMany({});

    // Create default config
    const flattenedDefaults = flattenConfig(DEFAULT_CONFIG);

    for (const [key, value] of Object.entries(flattenedDefaults)) {
        await prisma.systemConfig.create({
            data: {
                configKey: key,
                configValue: value,
                updatedBy
            }
        });
    }

    return DEFAULT_CONFIG;
};

/**
 * Create an audit log entry
 * @param {object} auditData - Audit entry data
 * @returns {Promise<AuditEntry>}
 */
const createAuditEntry = async (auditData: {
    userId: number;
    userName: string;
    userEmail: string;
    action: string;
    resource: string;
    resourceId?: string;
    details: string;
    severity: 'low' | 'medium' | 'high';
    ipAddress: string;
    userAgent?: string;
}): Promise<AuditEntry> => {
    return await prisma.auditEntry.create({
        data: auditData
    });
};

/**
 * Query audit log entries
 * @param {object} filter - Filter criteria
 * @param {object} options - Query options
 * @returns {Promise<object>}
 */
const queryAuditLogs = async (
    filter: {
        search?: string;
        userId?: string;
        action?: string;
        dateFrom?: Date;
        dateTo?: Date;
    },
    options: {
        page?: number;
        limit?: number;
    }
): Promise<{
    logs: AuditEntry[];
    totalCount: number;
    page: number;
    totalPages: number;
}> => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 25;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (filter.userId) {
        where.userId = parseInt(filter.userId);
    }

    if (filter.action) {
        where.action = filter.action;
    }

    if (filter.dateFrom || filter.dateTo) {
        where.timestamp = {};
        if (filter.dateFrom) {
            where.timestamp.gte = filter.dateFrom;
        }
        if (filter.dateTo) {
            where.timestamp.lte = filter.dateTo;
        }
    }

    if (filter.search) {
        where.OR = [
            { userName: { contains: filter.search, mode: 'insensitive' } },
            { userEmail: { contains: filter.search, mode: 'insensitive' } },
            { action: { contains: filter.search, mode: 'insensitive' } },
            { resource: { contains: filter.search, mode: 'insensitive' } },
            { details: { contains: filter.search, mode: 'insensitive' } }
        ];
    }

    const [logs, totalCount] = await Promise.all([
        prisma.auditEntry.findMany({
            where,
            orderBy: { timestamp: 'desc' },
            skip,
            take: limit,
            include: {
                user: {
                    select: { id: true, name: true, email: true }
                }
            }
        }),
        prisma.auditEntry.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
        logs,
        totalCount,
        page,
        totalPages
    };
};

/**
 * Export audit logs as CSV data
 * @param {object} filter - Filter criteria
 * @returns {Promise<string>}
 */
const exportAuditLogs = async (filter: {
    search?: string;
    userId?: string;
    action?: string;
    dateFrom?: Date;
    dateTo?: Date;
}): Promise<string> => {
    // Build where clause (same as queryAuditLogs)
    const where: any = {};

    if (filter.userId) {
        where.userId = parseInt(filter.userId);
    }

    if (filter.action) {
        where.action = filter.action;
    }

    if (filter.dateFrom || filter.dateTo) {
        where.timestamp = {};
        if (filter.dateFrom) {
            where.timestamp.gte = filter.dateFrom;
        }
        if (filter.dateTo) {
            where.timestamp.lte = filter.dateTo;
        }
    }

    if (filter.search) {
        where.OR = [
            { userName: { contains: filter.search, mode: 'insensitive' } },
            { userEmail: { contains: filter.search, mode: 'insensitive' } },
            { action: { contains: filter.search, mode: 'insensitive' } },
            { resource: { contains: filter.search, mode: 'insensitive' } },
            { details: { contains: filter.search, mode: 'insensitive' } }
        ];
    }

    const logs = await prisma.auditEntry.findMany({
        where,
        orderBy: { timestamp: 'desc' },
        include: {
            user: {
                select: { id: true, name: true, email: true }
            }
        }
    });

    // Generate CSV
    const headers = [
        'ID',
        'User ID',
        'User Name',
        'User Email',
        'Action',
        'Resource',
        'Resource ID',
        'Details',
        'Severity',
        'IP Address',
        'User Agent',
        'Timestamp'
    ];

    const csvRows = [headers.join(',')];

    logs.forEach(log => {
        const row = [
            escapeCSV(log.id),
            escapeCSV(log.userId.toString()),
            escapeCSV(log.userName),
            escapeCSV(log.userEmail),
            escapeCSV(log.action),
            escapeCSV(log.resource),
            escapeCSV(log.resourceId || ''),
            escapeCSV(log.details),
            escapeCSV(log.severity),
            escapeCSV(log.ipAddress),
            escapeCSV(log.userAgent || ''),
            escapeCSV(log.timestamp.toISOString())
        ];
        csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
};

/**
 * Flatten nested configuration object
 * @param {object} config - Configuration object
 * @param {string} prefix - Key prefix
 * @returns {object}
 */
function flattenConfig(config: object, prefix = ''): Record<string, any> {
    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(config)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            Object.assign(result, flattenConfig(value, fullKey));
        } else {
            result[fullKey] = value;
        }
    }

    return result;
}

/**
 * Validate configuration values
 * @param {object} config - Flattened configuration object
 */
function validateConfig(config: Record<string, any>): void {
    for (const [key, value] of Object.entries(config)) {
        // Validate threshold values
        if (key.includes('threshold') || key.includes('Threshold')) {
            if (typeof value !== 'number' || value < 0) {
                throw new ApiError(httpStatus.BAD_REQUEST, `Invalid threshold value for ${key}`);
            }
        }

        // Validate timeout values
        if (key.includes('timeout') || key.includes('Timeout')) {
            if (typeof value !== 'number' || value < 1 || value > 1440) {
                // Max 24 hours
                throw new ApiError(
                    httpStatus.BAD_REQUEST,
                    `Invalid timeout value for ${key}: must be between 1 and 1440 minutes`
                );
            }
        }

        // Validate expiry values
        if (key.includes('expiry') || key.includes('Expiry')) {
            if (typeof value !== 'number' || value < 1 || value > 365) {
                // Max 1 year
                throw new ApiError(
                    httpStatus.BAD_REQUEST,
                    `Invalid expiry value for ${key}: must be between 1 and 365 days`
                );
            }
        }

        // Validate retention values
        if (key.includes('retention') || key.includes('Retention')) {
            if (typeof value !== 'number' || value < 30 || value > 2555) {
                // Min 30 days, max 7 years
                throw new ApiError(
                    httpStatus.BAD_REQUEST,
                    `Invalid retention value for ${key}: must be between 30 and 2555 days`
                );
            }
        }

        // Validate rate limits
        if (key.includes('rateLimit') || key.includes('RateLimit')) {
            if (typeof value !== 'number' || value < 1 || value > 10000) {
                throw new ApiError(
                    httpStatus.BAD_REQUEST,
                    `Invalid rate limit value for ${key}: must be between 1 and 10000`
                );
            }
        }

        // Validate file sizes (in MB)
        if (key.includes('fileSize') || key.includes('FileSize')) {
            if (typeof value !== 'number' || value < 1 || value > 100) {
                throw new ApiError(
                    httpStatus.BAD_REQUEST,
                    `Invalid file size value for ${key}: must be between 1 and 100 MB`
                );
            }
        }
    }
}

/**
 * Escape CSV values
 * @param {string} value - Value to escape
 * @returns {string}
 */
function escapeCSV(value: string): string {
    if (typeof value !== 'string') {
        value = String(value);
    }

    // Escape quotes and wrap in quotes if contains comma, quote, or newline
    if (value.includes('"') || value.includes(',') || value.includes('\n') || value.includes('\r')) {
        return `"${value.replace(/"/g, '""')}"`;
    }

    return value;
}

export default {
    getConfig,
    updateConfig,
    resetConfig,
    createAuditEntry,
    queryAuditLogs,
    exportAuditLogs
};
