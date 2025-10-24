import { analysisService } from '../services/index.ts';
import ApiError from '../utils/ApiError.ts';
import catchAsyncWithAuth from '../utils/catchAsyncWithAuth.ts';
import pick from '../utils/pick.ts';
import httpStatus from 'http-status';

const analyzeStatements = catchAsyncWithAuth(async (req, res) => {
    const analysisData = pick(req.body, ['statementFileIds', 'clientId', 'analysisOptions']);
    const result = await analysisService.analyzeStatements({
        statementFileIds: analysisData.statementFileIds as string[],
        clientId: analysisData.clientId as string,
        analysisOptions: analysisData.analysisOptions as any
    });
    res.status(httpStatus.OK).send(result);
});

const getAnalysis = catchAsyncWithAuth(async (req, res) => {
    const analysis = await analysisService.getAnalysisById(req.params.analysisId);
    if (!analysis) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Analysis not found');
    }
    res.send(analysis);
});

const getAnalysisTransactions = catchAsyncWithAuth(async (req, res) => {
    const options = pick(req.validatedQuery, ['page', 'limit']);
    const result = await analysisService.getAnalysisTransactions(req.params.analysisId, options);
    res.send(result);
});

const getAnalyses = catchAsyncWithAuth(async (req, res) => {
    const filter = pick(req.validatedQuery, ['clientId', 'status']);
    const options = pick(req.validatedQuery, ['sortBy', 'limit', 'page']);
    const result = await analysisService.queryAnalyses(filter, options);
    res.send(result);
});

const deleteAnalysis = catchAsyncWithAuth(async (req, res) => {
    await analysisService.deleteAnalysisById(req.params.analysisId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    analyzeStatements,
    getAnalysis,
    getAnalysisTransactions,
    getAnalyses,
    deleteAnalysis
};
