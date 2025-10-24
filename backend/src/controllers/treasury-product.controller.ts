import { treasuryProductService } from '../services/index.ts';
import ApiError from '../utils/ApiError.ts';
import catchAsyncWithAuth from '../utils/catchAsyncWithAuth.ts';
import pick from '../utils/pick.ts';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

const getTreasuryProducts = catchAsyncWithAuth(async (req: Request, res: Response) => {
    const filter = pick(req.query, ['category', 'isActive', 'name']);
    const options = pick(req.query, ['sortBy', 'sortType', 'limit', 'page']);

    // Convert isActive string to boolean if provided
    if (filter.isActive !== undefined) {
        filter.isActive = filter.isActive === 'true';
    }

    const result = await treasuryProductService.queryTreasuryProducts(filter, options, [
        'id',
        'name',
        'category',
        'description',
        'features',
        'eligibilityRules',
        'benefits',
        'pricing',
        'isActive'
    ]);
    res.send(result);
});

const getTreasuryProduct = catchAsyncWithAuth(async (req: Request, res: Response) => {
    const product = await treasuryProductService.getTreasuryProductById(req.params.productId, [
        'id',
        'name',
        'category',
        'description',
        'features',
        'eligibilityRules',
        'benefits',
        'pricing',
        'isActive'
    ]);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Treasury product not found');
    }
    res.send(product);
});

const createTreasuryProduct = catchAsyncWithAuth(async (req: Request, res: Response) => {
    const product = await treasuryProductService.createTreasuryProduct(req.body);
    res.status(httpStatus.CREATED).send(product);
});

const updateTreasuryProduct = catchAsyncWithAuth(async (req: Request, res: Response) => {
    const product = await treasuryProductService.updateTreasuryProductById(req.params.productId, req.body);
    res.send(product);
});

const deleteTreasuryProduct = catchAsyncWithAuth(async (req: Request, res: Response) => {
    await treasuryProductService.deleteTreasuryProductById(req.params.productId);
    res.status(httpStatus.NO_CONTENT).send();
});

const checkProductEligibility = catchAsyncWithAuth(async (req: Request, res: Response) => {
    const eligibilityResult = await treasuryProductService.checkProductEligibility(req.params.productId, req.body);
    res.send(eligibilityResult);
});

export default {
    getTreasuryProducts,
    getTreasuryProduct,
    createTreasuryProduct,
    updateTreasuryProduct,
    deleteTreasuryProduct,
    checkProductEligibility
};
