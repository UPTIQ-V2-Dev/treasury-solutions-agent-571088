import Joi from 'joi';
const generateRecommendations = {
    body: Joi.object().keys({
        analysisId: Joi.string().required(),
        maxRecommendations: Joi.number().integer().min(1).max(20).default(5),
        priorityThreshold: Joi.number().min(0).max(10),
        includeInactive: Joi.boolean().default(false),
        categoryFilters: Joi.array().items(Joi.string()),
        minPriority: Joi.string().valid('high', 'medium', 'low')
    })
};
const getRecommendations = {
    query: Joi.object().keys({
        analysisId: Joi.string(),
        status: Joi.string().valid('pending', 'approved', 'rejected'),
        priority: Joi.string().valid('high', 'medium', 'low'),
        productId: Joi.string(),
        sortBy: Joi.string(),
        sortType: Joi.string().valid('asc', 'desc'),
        limit: Joi.number().integer().positive(),
        page: Joi.number().integer().positive()
    })
};
const getRecommendation = {
    params: Joi.object().keys({
        recommendationId: Joi.string().required()
    })
};
const approveRecommendation = {
    params: Joi.object().keys({
        recommendationId: Joi.string().required()
    }),
    body: Joi.object().keys({
        approvedBy: Joi.string().email().required()
    })
};
const rejectRecommendation = {
    params: Joi.object().keys({
        recommendationId: Joi.string().required()
    })
};
export default {
    generateRecommendations,
    getRecommendations,
    getRecommendation,
    approveRecommendation,
    rejectRecommendation
};
