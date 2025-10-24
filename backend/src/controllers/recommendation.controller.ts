import { User } from '../generated/prisma/index.js';
import { recommendationService } from '../services/index.ts';
import ApiError from '../utils/ApiError.ts';
import catchAsyncWithAuth from '../utils/catchAsyncWithAuth.ts';
import pick from '../utils/pick.ts';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

const generateRecommendations = catchAsyncWithAuth(async (req: Request, res: Response) => {
    const { analysisId, maxRecommendations, priorityThreshold } = req.body;
    const options = pick(req.body, ['includeInactive', 'categoryFilters', 'minPriority']);

    const criteria = {
        analysisId,
        maxRecommendations,
        priorityThreshold
    };

    const recommendations = await recommendationService.generateRecommendations(criteria, options);
    res.status(httpStatus.CREATED).send(recommendations);
});

const getRecommendations = catchAsyncWithAuth(async (req: Request, res: Response) => {
    const filter = pick(req.query, ['analysisId', 'status', 'priority', 'productId']);
    const options = pick(req.query, ['sortBy', 'sortType', 'limit', 'page']);

    const result = await recommendationService.getRecommendations(filter, options);
    res.send(result);
});

const getRecommendation = catchAsyncWithAuth(async (req: Request, res: Response) => {
    const recommendation = await recommendationService.getRecommendationById(req.params.recommendationId);
    if (!recommendation) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Recommendation not found');
    }
    res.send(recommendation);
});

const approveRecommendation = catchAsyncWithAuth(async (req: Request, res: Response) => {
    const { approvedBy } = req.body;
    const recommendation = await recommendationService.approveRecommendation(req.params.recommendationId, approvedBy);
    res.send(recommendation);
});

const rejectRecommendation = catchAsyncWithAuth(async (req: Request, res: Response) => {
    const user = req.user as User;
    const rejectedBy = user.email; // Use authenticated user's email
    const recommendation = await recommendationService.rejectRecommendation(req.params.recommendationId, rejectedBy);
    res.send(recommendation);
});

export default {
    generateRecommendations,
    getRecommendations,
    getRecommendation,
    approveRecommendation,
    rejectRecommendation
};
