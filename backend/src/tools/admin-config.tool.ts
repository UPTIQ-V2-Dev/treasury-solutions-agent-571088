/* eslint-disable require-await */
import { adminConfigService } from '../services/index.ts';
import { MCPTool } from '../types/mcp.ts';
import { z } from 'zod';

const configurationSchema = z.object({
    thresholds: z.object({
        idleCashThreshold: z.number(),
        liquidityWarningThreshold: z.number(),
        lowBalanceThreshold: z.number(),
        highRiskThreshold: z.number()
    }),
    features: z.object({
        enableAutoAnalysis: z.boolean(),
        enableEmailNotifications: z.boolean(),
        enableRecommendationEngine: z.boolean(),
        enableAdvancedReports: z.boolean()
    }),
    integrations: z.object({
        bankApiEnabled: z.boolean(),
        webhooksEnabled: z.boolean(),
        apiRateLimit: z.number(),
        maxFileSize: z.number()
    }),
    security: z.object({
        sessionTimeout: z.number(),
        passwordExpiry: z.number(),
        requireMfa: z.boolean(),
        auditLogRetention: z.number()
    })
});

const getConfigurationTool: MCPTool = {
    id: 'admin_config_get',
    name: 'Get System Configuration',
    description: 'Get current system configuration settings',
    inputSchema: z.object({}),
    outputSchema: configurationSchema,
    fn: async () => {
        const config = await adminConfigService.getConfiguration();
        return config;
    }
};

const updateConfigurationTool: MCPTool = {
    id: 'admin_config_update',
    name: 'Update System Configuration',
    description: 'Update system configuration settings (partial updates allowed)',
    inputSchema: z.object({
        thresholds: z
            .object({
                idleCashThreshold: z.number().min(0).optional(),
                liquidityWarningThreshold: z.number().min(0).optional(),
                lowBalanceThreshold: z.number().min(0).optional(),
                highRiskThreshold: z.number().min(0).optional()
            })
            .optional(),
        features: z
            .object({
                enableAutoAnalysis: z.boolean().optional(),
                enableEmailNotifications: z.boolean().optional(),
                enableRecommendationEngine: z.boolean().optional(),
                enableAdvancedReports: z.boolean().optional()
            })
            .optional(),
        integrations: z
            .object({
                bankApiEnabled: z.boolean().optional(),
                webhooksEnabled: z.boolean().optional(),
                apiRateLimit: z.number().min(1).optional(),
                maxFileSize: z.number().min(1).optional()
            })
            .optional(),
        security: z
            .object({
                sessionTimeout: z.number().min(1).optional(),
                passwordExpiry: z.number().min(1).optional(),
                requireMfa: z.boolean().optional(),
                auditLogRetention: z.number().min(1).optional()
            })
            .optional(),
        updatedBy: z.string()
    }),
    outputSchema: configurationSchema,
    fn: async (inputs: { thresholds?: any; features?: any; integrations?: any; security?: any; updatedBy: string }) => {
        const { updatedBy, ...updateData } = inputs;
        const config = await adminConfigService.updateConfiguration(updateData, updatedBy);
        return config;
    }
};

const resetConfigurationTool: MCPTool = {
    id: 'admin_config_reset',
    name: 'Reset System Configuration',
    description: 'Reset system configuration to default values',
    inputSchema: z.object({
        updatedBy: z.string()
    }),
    outputSchema: configurationSchema,
    fn: async (inputs: { updatedBy: string }) => {
        const config = await adminConfigService.resetConfiguration(inputs.updatedBy);
        return config;
    }
};

const getConfigurationByKeyTool: MCPTool = {
    id: 'admin_config_get_by_key',
    name: 'Get Configuration by Key',
    description: 'Get a specific configuration value by key (e.g., "thresholds.idleCashThreshold")',
    inputSchema: z.object({
        key: z.string()
    }),
    outputSchema: z.object({
        value: z.union([z.string(), z.number(), z.boolean()])
    }),
    fn: async (inputs: { key: string }) => {
        const value = await adminConfigService.getConfigurationByKey(inputs.key);
        return { value };
    }
};

const getDefaultConfigurationTool: MCPTool = {
    id: 'admin_config_get_defaults',
    name: 'Get Default Configuration',
    description: 'Get the default system configuration values',
    inputSchema: z.object({}),
    outputSchema: configurationSchema,
    fn: async () => {
        return adminConfigService.DEFAULT_CONFIG;
    }
};

export const adminConfigTools: MCPTool[] = [
    getConfigurationTool,
    updateConfigurationTool,
    resetConfigurationTool,
    getConfigurationByKeyTool,
    getDefaultConfigurationTool
];
