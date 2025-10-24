import Joi from 'joi';

const getConfiguration = {
    query: Joi.object().keys({})
};

const updateConfiguration = {
    body: Joi.object()
        .keys({
            thresholds: Joi.object().keys({
                idleCashThreshold: Joi.number().min(0),
                liquidityWarningThreshold: Joi.number().min(0),
                lowBalanceThreshold: Joi.number().min(0),
                highRiskThreshold: Joi.number().min(0)
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
                apiRateLimit: Joi.number().min(1),
                maxFileSize: Joi.number().min(1)
            }),
            security: Joi.object().keys({
                sessionTimeout: Joi.number().min(1),
                passwordExpiry: Joi.number().min(1),
                requireMfa: Joi.boolean(),
                auditLogRetention: Joi.number().min(1)
            })
        })
        .min(1)
};

const resetConfiguration = {
    body: Joi.object().keys({})
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
    getConfiguration,
    updateConfiguration,
    resetConfiguration,
    queryAuditLogs,
    exportAuditLogs
};
