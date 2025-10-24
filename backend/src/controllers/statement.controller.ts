import { statementService } from '../services/index.ts';
import ApiError from '../utils/ApiError.ts';
import catchAsyncWithAuth from '../utils/catchAsyncWithAuth.ts';
import pick from '../utils/pick.ts';
import httpStatus from 'http-status';

const uploadStatement = catchAsyncWithAuth(async (req, res) => {
    // Check if it's the new format (has files array) or old format (single file)
    if (req.body.files) {
        // New API format - multiple files
        const { clientId, files } = req.body;

        const results = await statementService.uploadStatementFiles({
            clientId,
            files
        });

        res.status(httpStatus.CREATED).json(results);
    } else {
        // Legacy API format - single file
        const { filename, type, size, clientId } = req.body;

        const result = await statementService.uploadStatementFile({
            filename,
            type,
            size,
            clientId
        });

        res.status(httpStatus.CREATED).json(result);
    }
});

const getUploadStatus = catchAsyncWithAuth(async (req, res) => {
    const { uploadId } = req.params;

    const status = await statementService.getUploadStatus(uploadId);

    if (!status) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Upload not found');
    }

    res.json(status);
});

const parseStatement = catchAsyncWithAuth(async (req, res) => {
    // Check if it's the new format (array) or old format (single ID)
    if (req.body.statementFileIds) {
        // New API format - multiple files
        const { statementFileIds } = req.body;

        const parseResults = await statementService.parseStatementFiles(statementFileIds);

        res.status(httpStatus.OK).json(parseResults);
    } else {
        // Legacy API format - single file
        const { statementFileId } = req.body;

        const parseResult = await statementService.parseStatement(statementFileId);

        res.status(httpStatus.CREATED).json(parseResult);
    }
});

const getStatementFiles = catchAsyncWithAuth(async (req, res) => {
    const filter = pick(req.validatedQuery, ['clientId', 'status', 'filename', 'type']);
    const options = pick(req.validatedQuery, ['sortBy', 'sortType', 'limit', 'page']);

    const statementFiles = await statementService.queryStatementFiles(filter, options);

    res.json(statementFiles);
});

const getStatementFile = catchAsyncWithAuth(async (req, res) => {
    const { id } = req.params;

    const statementFile = await statementService.getStatementFileWithParseResult(id);

    if (!statementFile) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Statement file not found');
    }

    res.json(statementFile);
});

const deleteStatementFile = catchAsyncWithAuth(async (req, res) => {
    const { id } = req.params;

    await statementService.deleteStatementFileById(id);

    res.status(httpStatus.NO_CONTENT).send();
});

const generateUploadUrl = catchAsyncWithAuth(async (req, res) => {
    const { id } = req.params;

    const uploadUrl = await statementService.generateUploadSignedUrl(id);

    res.json(uploadUrl);
});

const updateUploadStatus = catchAsyncWithAuth(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const statementFile = await statementService.updateStatementFileStatus(id, status);

    res.json(statementFile);
});

export default {
    uploadStatement,
    getUploadStatus,
    parseStatement,
    getStatementFiles,
    getStatementFile,
    deleteStatementFile,
    generateUploadUrl,
    updateUploadStatus
};
