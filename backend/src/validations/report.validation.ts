import Joi from 'joi';

const generateReport = {
    body: Joi.object().keys({
        analysisId: Joi.string().required(),
        templateId: Joi.string().valid(
            'comprehensive-treasury-report',
            'executive-summary-report',
            'detailed-data-export'
        ),
        format: Joi.string().valid('PDF', 'EXCEL'),
        title: Joi.string().max(200),
        sections: Joi.array().items(Joi.string()).max(10)
    })
};

const getReport = {
    params: Joi.object().keys({
        reportId: Joi.string().required()
    })
};

const downloadReport = {
    params: Joi.object().keys({
        reportId: Joi.string().required()
    })
};

const queryReports = {
    query: Joi.object().keys({
        clientId: Joi.string(),
        analysisId: Joi.string(),
        format: Joi.string().valid('PDF', 'EXCEL'),
        status: Joi.string().valid('generating', 'completed', 'failed'),
        createdBy: Joi.string(),
        dateFrom: Joi.date().iso(),
        dateTo: Joi.date().iso().min(Joi.ref('dateFrom')),
        sortBy: Joi.string().valid('createdAt', 'title', 'format', 'status', 'downloadCount', 'fileSize'),
        sortType: Joi.string().valid('asc', 'desc'),
        limit: Joi.number().integer().min(1).max(100),
        page: Joi.number().integer().min(1)
    })
};

const deleteReport = {
    params: Joi.object().keys({
        reportId: Joi.string().required()
    })
};

const getTemplates = {
    // No validation needed for getting templates
};

export default {
    generateReport,
    getReport,
    downloadReport,
    queryReports,
    deleteReport,
    getTemplates
};
