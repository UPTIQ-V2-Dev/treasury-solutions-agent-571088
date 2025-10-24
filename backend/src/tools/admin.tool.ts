import { adminService } from '../services/index.ts';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const getSystemConfigTool: Tool = {
    name: 'get_system_config',
    description: 'Get system configuration settings',
    inputSchema: {
        type: 'object',
        properties: {},
        required: []
    }
};

export const updateSystemConfigTool: Tool = {
    name: 'update_system_config',
    description: 'Update system configuration settings',
    inputSchema: {
        type: 'object',
        properties: {
            config: {
                type: 'object',
                description: 'Configuration updates to apply',
                properties: {
                    thresholds: {
                        type: 'object',
                        properties: {
                            idleCashThreshold: { type: 'number', minimum: 0, maximum: 10000000 },
                            liquidityWarningThreshold: { type: 'number', minimum: 0, maximum: 10000000 },
                            lowBalanceThreshold: { type: 'number', minimum: 0, maximum: 10000000 },
                            highRiskThreshold: { type: 'number', minimum: 0, maximum: 100000000 }
                        }
                    },
                    features: {
                        type: 'object',
                        properties: {
                            enableAutoAnalysis: { type: 'boolean' },
                            enableEmailNotifications: { type: 'boolean' },
                            enableRecommendationEngine: { type: 'boolean' },
                            enableAdvancedReports: { type: 'boolean' }
                        }
                    },
                    integrations: {
                        type: 'object',
                        properties: {
                            bankApiEnabled: { type: 'boolean' },
                            webhooksEnabled: { type: 'boolean' },
                            apiRateLimit: { type: 'number', minimum: 1, maximum: 10000 },
                            maxFileSize: { type: 'number', minimum: 1, maximum: 100 }
                        }
                    },
                    security: {
                        type: 'object',
                        properties: {
                            sessionTimeout: { type: 'number', minimum: 1, maximum: 1440 },
                            passwordExpiry: { type: 'number', minimum: 1, maximum: 365 },
                            requireMfa: { type: 'boolean' },
                            auditLogRetention: { type: 'number', minimum: 30, maximum: 2555 }
                        }
                    }
                }
            },
            updatedBy: {
                type: 'string',
                description: 'Email of the user making the update'
            }
        },
        required: ['config', 'updatedBy']
    }
};

export const resetSystemConfigTool: Tool = {
    name: 'reset_system_config',
    description: 'Reset system configuration to default values',
    inputSchema: {
        type: 'object',
        properties: {
            updatedBy: {
                type: 'string',
                description: 'Email of the user making the reset'
            }
        },
        required: ['updatedBy']
    }
};

export const getAuditLogsTool: Tool = {
    name: 'get_audit_logs',
    description: 'Get paginated audit log entries with optional filtering',
    inputSchema: {
        type: 'object',
        properties: {
            filter: {
                type: 'object',
                properties: {
                    search: { type: 'string', maxLength: 255 },
                    userId: { type: 'string' },
                    action: { type: 'string', maxLength: 100 },
                    dateFrom: { type: 'string', format: 'date-time' },
                    dateTo: { type: 'string', format: 'date-time' }
                }
            },
            options: {
                type: 'object',
                properties: {
                    page: { type: 'number', minimum: 1, default: 1 },
                    limit: { type: 'number', minimum: 1, maximum: 100, default: 25 }
                }
            }
        },
        required: []
    }
};

export const exportAuditLogsTool: Tool = {
    name: 'export_audit_logs',
    description: 'Export audit logs as CSV data with optional filtering',
    inputSchema: {
        type: 'object',
        properties: {
            filter: {
                type: 'object',
                properties: {
                    search: { type: 'string', maxLength: 255 },
                    userId: { type: 'string' },
                    action: { type: 'string', maxLength: 100 },
                    dateFrom: { type: 'string', format: 'date-time' },
                    dateTo: { type: 'string', format: 'date-time' }
                }
            }
        },
        required: []
    }
};

export const createAuditEntryTool: Tool = {
    name: 'create_audit_entry',
    description: 'Create an audit log entry for tracking system actions',
    inputSchema: {
        type: 'object',
        properties: {
            userId: { type: 'number' },
            userName: { type: 'string' },
            userEmail: { type: 'string' },
            action: { type: 'string' },
            resource: { type: 'string' },
            resourceId: { type: 'string' },
            details: { type: 'string' },
            severity: { type: 'string', enum: ['low', 'medium', 'high'] },
            ipAddress: { type: 'string' },
            userAgent: { type: 'string' }
        },
        required: ['userId', 'userName', 'userEmail', 'action', 'resource', 'details', 'severity', 'ipAddress']
    }
};

export async function handleAdminToolCall(name: string, args: any) {
    switch (name) {
        case 'get_system_config':
            return await adminService.getConfig();

        case 'update_system_config':
            return await adminService.updateConfig(args.config, args.updatedBy);

        case 'reset_system_config':
            return await adminService.resetConfig(args.updatedBy);

        case 'get_audit_logs':
            // Convert date strings to Date objects if present
            const filter = { ...args.filter };
            if (filter.dateFrom) filter.dateFrom = new Date(filter.dateFrom);
            if (filter.dateTo) filter.dateTo = new Date(filter.dateTo);

            return await adminService.queryAuditLogs(filter, args.options || {});

        case 'export_audit_logs':
            // Convert date strings to Date objects if present
            const exportFilter = { ...args.filter };
            if (exportFilter.dateFrom) exportFilter.dateFrom = new Date(exportFilter.dateFrom);
            if (exportFilter.dateTo) exportFilter.dateTo = new Date(exportFilter.dateTo);

            return await adminService.exportAuditLogs(exportFilter);

        case 'create_audit_entry':
            return await adminService.createAuditEntry(args);

        default:
            throw new Error(`Unknown admin tool: ${name}`);
    }
}

export const adminTools = [
    getSystemConfigTool,
    updateSystemConfigTool,
    resetSystemConfigTool,
    getAuditLogsTool,
    exportAuditLogsTool,
    createAuditEntryTool
];
