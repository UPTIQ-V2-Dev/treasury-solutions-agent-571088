import Joi from 'joi';
const getMetrics = {
    // No query parameters needed for dashboard metrics endpoint
    query: Joi.object().keys({}).unknown(true)
};
export default {
    getMetrics
};
