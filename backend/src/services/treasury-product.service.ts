import prisma from '../client.ts';
import { TreasuryProduct } from '../generated/prisma/index.js';
import ApiError from '../utils/ApiError.ts';
import httpStatus from 'http-status';

/**
 * Get all treasury products
 * @param {object} filter - Prisma filter
 * @param {object} options - Query options
 * @returns {Promise<TreasuryProduct[]>}
 */
const queryTreasuryProducts = async <Key extends keyof TreasuryProduct>(
    filter: object = {},
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    } = {},
    keys: Key[] = [
        'id',
        'name',
        'category',
        'description',
        'features',
        'eligibilityRules',
        'benefits',
        'pricing',
        'isActive'
    ] as Key[]
): Promise<Pick<TreasuryProduct, Key>[]> => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 50; // Higher default limit for products
    const sortBy = options.sortBy ?? 'name';
    const sortType = options.sortType ?? 'asc';

    const products = await prisma.treasuryProduct.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortType }
    });

    return products as Pick<TreasuryProduct, Key>[];
};

/**
 * Get treasury product by id
 * @param {string} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<TreasuryProduct, Key> | null>}
 */
const getTreasuryProductById = async <Key extends keyof TreasuryProduct>(
    id: string,
    keys: Key[] = [
        'id',
        'name',
        'category',
        'description',
        'features',
        'eligibilityRules',
        'benefits',
        'pricing',
        'isActive'
    ] as Key[]
): Promise<Pick<TreasuryProduct, Key> | null> => {
    return (await prisma.treasuryProduct.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    })) as Pick<TreasuryProduct, Key> | null;
};

/**
 * Get treasury product by name
 * @param {string} name
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<TreasuryProduct, Key> | null>}
 */
const getTreasuryProductByName = async <Key extends keyof TreasuryProduct>(
    name: string,
    keys: Key[] = [
        'id',
        'name',
        'category',
        'description',
        'features',
        'eligibilityRules',
        'benefits',
        'pricing',
        'isActive'
    ] as Key[]
): Promise<Pick<TreasuryProduct, Key> | null> => {
    return await (prisma.treasuryProduct.findUnique({
        where: { name },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }) as Promise<Pick<TreasuryProduct, Key> | null>);
};

/**
 * Get all active treasury products
 * @returns {Promise<TreasuryProduct[]>}
 */
const getActiveTreasuryProducts = async (): Promise<TreasuryProduct[]> => {
    return await prisma.treasuryProduct.findMany({
        where: { isActive: true },
        orderBy: { name: 'asc' }
    });
};

/**
 * Get treasury products by category
 * @param {string} category
 * @returns {Promise<TreasuryProduct[]>}
 */
const getTreasuryProductsByCategory = async (category: string): Promise<TreasuryProduct[]> => {
    return await prisma.treasuryProduct.findMany({
        where: {
            category,
            isActive: true
        },
        orderBy: { name: 'asc' }
    });
};

/**
 * Create treasury product
 * @param {object} productBody
 * @returns {Promise<TreasuryProduct>}
 */
const createTreasuryProduct = async (productBody: {
    name: string;
    category: string;
    description: string;
    features?: string[];
    eligibilityRules?: object;
    benefits?: object;
    pricing?: object;
    isActive?: boolean;
}): Promise<TreasuryProduct> => {
    // Check if product with name already exists
    const existingProduct = await getTreasuryProductByName(productBody.name);
    if (existingProduct) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Product name already taken');
    }

    return await prisma.treasuryProduct.create({
        data: {
            name: productBody.name,
            category: productBody.category,
            description: productBody.description,
            features: productBody.features || [],
            eligibilityRules: productBody.eligibilityRules || {},
            benefits: productBody.benefits || {},
            pricing: productBody.pricing || {},
            isActive: productBody.isActive !== undefined ? productBody.isActive : true
        }
    });
};

/**
 * Update treasury product by id
 * @param {string} productId
 * @param {object} updateBody
 * @returns {Promise<TreasuryProduct>}
 */
const updateTreasuryProductById = async (
    productId: string,
    updateBody: {
        name?: string;
        category?: string;
        description?: string;
        features?: string[];
        eligibilityRules?: object;
        benefits?: object;
        pricing?: object;
        isActive?: boolean;
    }
): Promise<TreasuryProduct> => {
    const product = await getTreasuryProductById(productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Treasury product not found');
    }

    // If updating name, check for conflicts
    if (updateBody.name && updateBody.name !== product.name) {
        const existingProduct = await getTreasuryProductByName(updateBody.name);
        if (existingProduct) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Product name already taken');
        }
    }

    return await prisma.treasuryProduct.update({
        where: { id: productId },
        data: updateBody
    });
};

/**
 * Delete treasury product by id
 * @param {string} productId
 * @returns {Promise<TreasuryProduct>}
 */
const deleteTreasuryProductById = async (productId: string): Promise<TreasuryProduct> => {
    const product = await getTreasuryProductById(productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Treasury product not found');
    }

    // Check if product is referenced by any recommendations
    const recommendationCount = await prisma.recommendation.count({
        where: { productId }
    });

    if (recommendationCount > 0) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            'Cannot delete product that is referenced by recommendations. Consider deactivating instead.'
        );
    }

    return await prisma.treasuryProduct.delete({
        where: { id: productId }
    });
};

/**
 * Check product eligibility for specific criteria
 * @param {string} productId
 * @param {object} clientCriteria
 * @returns {Promise<{eligible: boolean, reasons?: string[]}>}
 */
const checkProductEligibility = async (
    productId: string,
    clientCriteria: {
        avgDailyBalance?: number;
        transactionCount?: number;
        netCashFlow?: number;
        volatility?: number;
    }
): Promise<{ eligible: boolean; reasons?: string[] }> => {
    const product = await getTreasuryProductById(productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Treasury product not found');
    }

    if (!product.isActive) {
        return { eligible: false, reasons: ['Product is currently inactive'] };
    }

    const eligibilityRules = product.eligibilityRules as any;
    const reasons: string[] = [];
    let eligible = true;

    // Check minimum balance
    if (
        eligibilityRules.minBalance &&
        clientCriteria.avgDailyBalance &&
        clientCriteria.avgDailyBalance < eligibilityRules.minBalance
    ) {
        eligible = false;
        reasons.push(
            `Minimum balance requirement not met (required: $${eligibilityRules.minBalance.toLocaleString()}, current: $${clientCriteria.avgDailyBalance.toLocaleString()})`
        );
    }

    // Check minimum transaction volume
    if (
        eligibilityRules.minTransactionVolume &&
        clientCriteria.transactionCount &&
        clientCriteria.transactionCount < eligibilityRules.minTransactionVolume
    ) {
        eligible = false;
        reasons.push(
            `Minimum transaction volume not met (required: ${eligibilityRules.minTransactionVolume}, current: ${clientCriteria.transactionCount})`
        );
    }

    // Check minimum cash flow
    if (
        eligibilityRules.minCashFlow &&
        clientCriteria.netCashFlow !== undefined &&
        Math.abs(clientCriteria.netCashFlow) < eligibilityRules.minCashFlow
    ) {
        eligible = false;
        reasons.push(
            `Minimum cash flow requirement not met (required: $${eligibilityRules.minCashFlow.toLocaleString()}, current: $${Math.abs(clientCriteria.netCashFlow).toLocaleString()})`
        );
    }

    // Check maximum volatility
    if (
        eligibilityRules.maxVolatility &&
        clientCriteria.volatility &&
        clientCriteria.volatility > eligibilityRules.maxVolatility
    ) {
        eligible = false;
        reasons.push(
            `Volatility too high for this product (maximum: ${(eligibilityRules.maxVolatility * 100).toFixed(1)}%, current: ${(clientCriteria.volatility * 100).toFixed(1)}%)`
        );
    }

    return { eligible, reasons: eligible ? undefined : reasons };
};

export default {
    queryTreasuryProducts,
    getTreasuryProductById,
    getTreasuryProductByName,
    getActiveTreasuryProducts,
    getTreasuryProductsByCategory,
    createTreasuryProduct,
    updateTreasuryProductById,
    deleteTreasuryProductById,
    checkProductEligibility
};
