import { reportService } from "../services/index.js";
import ApiError from "../utils/ApiError.js";
import catchAsyncWithAuth from "../utils/catchAsyncWithAuth.js";
import pick from "../utils/pick.js";
import httpStatus from 'http-status';
const generateReport = catchAsyncWithAuth(async (req, res) => {
    const reportData = pick(req.body, ['analysisId', 'templateId', 'format', 'title', 'sections']);
    const result = await reportService.generateReport({
        analysisId: reportData.analysisId,
        templateId: reportData.templateId,
        format: reportData.format,
        title: reportData.title,
        sections: reportData.sections,
        createdBy: req.user.id.toString()
    });
    res.status(httpStatus.CREATED).send(result);
});
const getReport = catchAsyncWithAuth(async (req, res) => {
    const report = await reportService.getReportById(req.params.reportId);
    if (!report) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Report not found');
    }
    res.send(report);
});
const downloadReport = catchAsyncWithAuth(async (req, res) => {
    try {
        const { stream, filename, contentType, size } = await reportService.getReportDownloadStream(req.params.reportId);
        res.set({
            'Content-Type': contentType,
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Content-Length': size.toString()
        });
        stream.pipe(res);
    }
    catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to download report');
    }
});
const getReports = catchAsyncWithAuth(async (req, res) => {
    const filter = pick(req.validatedQuery, [
        'clientId',
        'analysisId',
        'format',
        'status',
        'createdBy',
        'dateFrom',
        'dateTo'
    ]);
    const options = pick(req.validatedQuery, ['sortBy', 'sortType', 'limit', 'page']);
    const result = await reportService.queryReports(filter, options);
    res.send(result);
});
const deleteReport = catchAsyncWithAuth(async (req, res) => {
    await reportService.deleteReportById(req.params.reportId);
    res.status(httpStatus.NO_CONTENT).send();
});
// eslint-disable-next-line require-await
const getTemplates = catchAsyncWithAuth(async (req, res) => {
    const templates = reportService.getTemplates();
    res.send({ templates });
});
export default {
    generateReport,
    getReport,
    downloadReport,
    getReports,
    deleteReport,
    getTemplates
};
