import Joi from 'joi';
const updateConfig = {
    body: Joi.object()
        .keys({
        thresholds: Joi.object().keys({
            idleCashThreshold: Joi.number().min(0).max(10000000),
            liquidityWarningThreshold: Joi.number().min(0).max(10000000),
            lowBalanceThreshold: Joi.number().min(0).max(10000000),
            highRiskThreshold: Joi.number().min(0).max(100000000)
        }),
        features: Joi.object().keys({
            enableAutoAnalysis: Joi.boolean(),
            enableEmailNotifications: Joi.boolean(),
            enableRecommendationEngine: Joi.boolean(),
            enableAdvancedReports: Joi.boolean()
        }),
        integrations: Joi.object().keys({
            bankApiEnabled: Joi.boolean(),
            webhooksEnabled: Joi.boolean(),
            apiRateLimit: Joi.number().min(1).max(10000),
            maxFileSize: Joi.number().min(1).max(100)
        }),
        security: Joi.object().keys({
            sessionTimeout: Joi.number().min(1).max(1440), // Max 24 hours in minutes
            passwordExpiry: Joi.number().min(1).max(365), // Max 1 year in days
            requireMfa: Joi.boolean(),
            auditLogRetention: Joi.number().min(30).max(2555) // Min 30 days, max 7 years
        })
    })
        .min(1)
};
const queryAuditLogs = {
    query: Joi.object().keys({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(25),
        search: Joi.string().max(255),
        userId: Joi.string(),
        action: Joi.string().max(100),
        dateFrom: Joi.date().iso(),
        dateTo: Joi.date().iso().min(Joi.ref('dateFrom'))
    })
};
const exportAuditLogs = {
    query: Joi.object().keys({
        search: Joi.string().max(255),
        userId: Joi.string(),
        action: Joi.string().max(100),
        dateFrom: Joi.date().iso(),
        dateTo: Joi.date().iso().min(Joi.ref('dateFrom'))
    })
};
export default {
    updateConfig,
    queryAuditLogs,
    exportAuditLogs
};
