import Joi from 'joi';
const createClient = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        accountIds: Joi.array().items(Joi.string()).min(1).required(),
        relationshipManager: Joi.string().required(),
        status: Joi.string().valid('active', 'inactive').optional()
    })
};
const getClients = {
    query: Joi.object().keys({
        name: Joi.string(),
        status: Joi.string().valid('active', 'inactive'),
        relationshipManager: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    })
};
const getClient = {
    params: Joi.object().keys({
        clientId: Joi.string().required()
    })
};
const updateClient = {
    params: Joi.object().keys({
        clientId: Joi.string().required()
    }),
    body: Joi.object()
        .keys({
        name: Joi.string(),
        accountIds: Joi.array().items(Joi.string()).min(1),
        relationshipManager: Joi.string(),
        status: Joi.string().valid('active', 'inactive')
    })
        .min(1)
};
const deleteClient = {
    params: Joi.object().keys({
        clientId: Joi.string().required()
    })
};
export default {
    createClient,
    getClients,
    getClient,
    updateClient,
    deleteClient
};
