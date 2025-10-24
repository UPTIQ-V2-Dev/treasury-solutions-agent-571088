import Joi from 'joi';

const analyzeStatements = {
    body: Joi.object().keys({
        statementFileIds: Joi.array().items(Joi.string()).required().min(1),
        clientId: Joi.string().required(),
        analysisOptions: Joi.object()
            .keys({
                idleBalanceThreshold: Joi.number().integer().min(0),
                volatilityPeriod: Joi.number().integer().min(1).max(365),
                includeProjections: Joi.boolean()
            })
            .optional()
    })
};

const getAnalysis = {
    params: Joi.object().keys({
        analysisId: Joi.string().required()
    })
};

const getAnalysisTransactions = {
    params: Joi.object().keys({
        analysisId: Joi.string().required()
    }),
    query: Joi.object().keys({
        page: Joi.number().integer().min(1),
        limit: Joi.number().integer().min(1).max(200)
    })
};

const queryAnalyses = {
    query: Joi.object().keys({
        clientId: Joi.string(),
        status: Joi.string().valid('processing', 'completed', 'failed'),
        sortBy: Joi.string(),
        limit: Joi.number().integer().min(1),
        page: Joi.number().integer().min(1)
    })
};

const deleteAnalysis = {
    params: Joi.object().keys({
        analysisId: Joi.string().required()
    })
};

export default {
    analyzeStatements,
    getAnalysis,
    getAnalysisTransactions,
    queryAnalyses,
    deleteAnalysis
};
