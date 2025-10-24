import Joi from 'joi';

const uploadStatement = {
    body: Joi.alternatives().try(
        // New API format (multiple files)
        Joi.object().keys({
            clientId: Joi.string().required(),
            files: Joi.array()
                .items(
                    Joi.object().keys({
                        filename: Joi.string().required().max(255),
                        type: Joi.string()
                            .required()
                            .valid(
                                'application/pdf',
                                'text/csv',
                                'application/vnd.ms-excel',
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                            ),
                        size: Joi.number()
                            .integer()
                            .min(1)
                            .max(50 * 1024 * 1024)
                            .required() // Max 50MB
                    })
                )
                .required()
                .min(1)
        }),
        // Legacy API format (single file) - for backward compatibility
        Joi.object().keys({
            filename: Joi.string().required().max(255),
            type: Joi.string()
                .required()
                .valid(
                    'application/pdf',
                    'text/csv',
                    'application/vnd.ms-excel',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                ),
            size: Joi.number()
                .integer()
                .min(1)
                .max(50 * 1024 * 1024)
                .required(),
            clientId: Joi.string().required()
        })
    )
};

const getUploadStatus = {
    params: Joi.object().keys({
        uploadId: Joi.string().required()
    })
};

const parseStatement = {
    body: Joi.alternatives().try(
        // New API format (multiple files)
        Joi.object().keys({
            statementFileIds: Joi.array().items(Joi.string()).required().min(1)
        }),
        // Legacy API format (single file)
        Joi.object().keys({
            statementFileId: Joi.string().required()
        })
    )
};

const getStatementFiles = {
    query: Joi.object().keys({
        clientId: Joi.string(),
        status: Joi.string().valid('uploading', 'uploaded', 'parsing', 'parsed', 'parse_failed', 'failed'),
        filename: Joi.string(),
        type: Joi.string(),
        sortBy: Joi.string().valid('uploadedAt', 'filename', 'size', 'status'),
        sortType: Joi.string().valid('asc', 'desc'),
        limit: Joi.number().integer().min(1).max(100),
        page: Joi.number().integer().min(1)
    })
};

const getStatementFile = {
    params: Joi.object().keys({
        id: Joi.string().required()
    })
};

const deleteStatementFile = {
    params: Joi.object().keys({
        id: Joi.string().required()
    })
};

const generateUploadUrl = {
    params: Joi.object().keys({
        id: Joi.string().required()
    })
};

export default {
    uploadStatement,
    getUploadStatus,
    parseStatement,
    getStatementFiles,
    getStatementFile,
    deleteStatementFile,
    generateUploadUrl
};
