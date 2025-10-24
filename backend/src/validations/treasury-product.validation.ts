import Joi from 'joi';

const getTreasuryProducts = {
    query: Joi.object().keys({
        category: Joi.string(),
        isActive: Joi.boolean(),
        name: Joi.string(),
        sortBy: Joi.string(),
        sortType: Joi.string().valid('asc', 'desc'),
        limit: Joi.number().integer().positive(),
        page: Joi.number().integer().positive()
    })
};

const getTreasuryProduct = {
    params: Joi.object().keys({
        productId: Joi.string().required()
    })
};

const createTreasuryProduct = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        features: Joi.array().items(Joi.string()),
        eligibilityRules: Joi.object(),
        benefits: Joi.object(),
        pricing: Joi.object(),
        isActive: Joi.boolean()
    })
};

const updateTreasuryProduct = {
    params: Joi.object().keys({
        productId: Joi.string().required()
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        category: Joi.string(),
        description: Joi.string(),
        features: Joi.array().items(Joi.string()),
        eligibilityRules: Joi.object(),
        benefits: Joi.object(),
        pricing: Joi.object(),
        isActive: Joi.boolean()
    })
};

const deleteTreasuryProduct = {
    params: Joi.object().keys({
        productId: Joi.string().required()
    })
};

const checkProductEligibility = {
    params: Joi.object().keys({
        productId: Joi.string().required()
    }),
    body: Joi.object().keys({
        avgDailyBalance: Joi.number().min(0),
        transactionCount: Joi.number().integer().min(0),
        netCashFlow: Joi.number(),
        volatility: Joi.number().min(0).max(1)
    })
};

export default {
    getTreasuryProducts,
    getTreasuryProduct,
    createTreasuryProduct,
    updateTreasuryProduct,
    deleteTreasuryProduct,
    checkProductEligibility
};
