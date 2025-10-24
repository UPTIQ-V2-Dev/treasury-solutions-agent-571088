import prisma from '../client.ts';
import { Recommendation, TreasuryProduct } from '../generated/prisma/index.js';
import ApiError from '../utils/ApiError.ts';
import httpStatus from 'http-status';

export interface RecommendationCriteria {
    analysisId: string;
    maxRecommendations?: number;
    priorityThreshold?: number;
}

export interface BenefitProjection {
    annualYieldImprovement?: number;
    potentialSavings?: number;
    riskReduction?: number;
    liquidityImprovement?: number;
    operationalEfficiency?: number;
    estimatedROI?: number;
}

export interface RecommendationData {
    analysisId: string;
    productId: string;
    priority: 'high' | 'medium' | 'low';
    rationale: string;
    dataPoints: string[];
    benefitProjection: BenefitProjection;
}

export interface GenerateRecommendationsOptions {
    includeInactive?: boolean;
    categoryFilters?: string[];
    minPriority?: 'high' | 'medium' | 'low';
}

/**
 * Generate recommendations based on analysis data
 * @param {RecommendationCriteria} criteria
 * @param {GenerateRecommendationsOptions} options
 * @returns {Promise<Recommendation[]>}
 */
const generateRecommendations = async (
    criteria: RecommendationCriteria,
    options: GenerateRecommendationsOptions = {}
): Promise<Recommendation[]> => {
    const { analysisId, maxRecommendations = 5 } = criteria;

    // Get the analysis data
    const analysis = await prisma.analysis.findUnique({
        where: { id: analysisId },
        include: {
            client: true
        }
    });

    if (!analysis) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Analysis not found');
    }

    if (analysis.status !== 'completed') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Analysis must be completed before generating recommendations');
    }

    // Get available treasury products
    const products = await prisma.treasuryProduct.findMany({
        where: {
            isActive: options.includeInactive ? undefined : true,
            category: options.categoryFilters ? { in: options.categoryFilters } : undefined
        }
    });

    if (products.length === 0) {
        return [];
    }

    // Analyze financial data
    const summary = analysis.summary as any;
    const liquidityMetrics = analysis.liquidityMetrics as any;
    const spendingBreakdown = analysis.spendingBreakdown as any;
    const idleBalanceAnalysis = analysis.idleBalanceAnalysis as any;

    // Generate recommendations for each eligible product
    const recommendationData: RecommendationData[] = [];

    for (const product of products) {
        const recommendation = evaluateProductForClient(
            product,
            {
                summary,
                liquidityMetrics,
                spendingBreakdown,
                idleBalanceAnalysis
            },
            analysisId
        );

        if (recommendation) {
            recommendationData.push(recommendation);
        }
    }

    // Sort by priority and limit results
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    recommendationData.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

    const filteredRecommendations = options.minPriority
        ? recommendationData.filter(rec => priorityOrder[rec.priority] >= priorityOrder[options.minPriority!])
        : recommendationData;

    const limitedRecommendations = filteredRecommendations.slice(0, maxRecommendations);

    // Create recommendation records
    const recommendations: Recommendation[] = [];
    for (const recData of limitedRecommendations) {
        const recommendation = await prisma.recommendation.create({
            data: {
                analysisId: recData.analysisId,
                productId: recData.productId,
                priority: recData.priority,
                rationale: recData.rationale,
                dataPoints: recData.dataPoints,
                benefitProjection: recData.benefitProjection as any,
                status: 'pending'
            },
            include: {
                product: true,
                analysis: {
                    include: {
                        client: true
                    }
                }
            }
        });

        recommendations.push(recommendation);
    }

    return recommendations;
};

/**
 * Evaluate a product for a specific client based on their financial analysis
 */
const evaluateProductForClient = (
    product: TreasuryProduct,
    financialData: any,
    analysisId: string
): RecommendationData | null => {
    const eligibilityRules = product.eligibilityRules as any;

    // Check eligibility
    if (!isClientEligible(eligibilityRules, financialData)) {
        return null;
    }

    // Generate recommendation based on product category
    switch (product.category.toLowerCase()) {
        case 'sweep':
            return evaluateSweepProduct(product, financialData, analysisId);
        case 'zba':
            return evaluateZBAProduct(product, financialData, analysisId);
        case 'deposit':
            return evaluateDepositProduct(product, financialData, analysisId);
        case 'liquidity':
            return evaluateLiquidityProduct(product, financialData, analysisId);
        case 'investment':
            return evaluateInvestmentProduct(product, financialData, analysisId);
        default:
            return evaluateGenericProduct(product, financialData, analysisId);
    }
};

/**
 * Check if client meets product eligibility requirements
 */
const isClientEligible = (eligibilityRules: any, financialData: any): boolean => {
    const { summary, liquidityMetrics } = financialData;

    // Check minimum balance requirement
    if (eligibilityRules.minBalance && liquidityMetrics.avgDailyBalance < eligibilityRules.minBalance) {
        return false;
    }

    // Check minimum transaction volume
    if (eligibilityRules.minTransactionVolume && summary.transactionCount < eligibilityRules.minTransactionVolume) {
        return false;
    }

    // Check minimum cash flow
    if (eligibilityRules.minCashFlow && Math.abs(summary.netCashFlow) < eligibilityRules.minCashFlow) {
        return false;
    }

    return true;
};

/**
 * Evaluate sweep account products
 */
const evaluateSweepProduct = (
    product: TreasuryProduct,
    financialData: any,
    analysisId: string
): RecommendationData | null => {
    const { idleBalanceAnalysis } = financialData;
    const benefits = product.benefits as any;
    const pricing = product.pricing as any;

    if (idleBalanceAnalysis.avgIdleAmount <= 0) {
        return null;
    }

    const yieldImprovement = benefits.yieldImprovement || 2.5;
    const annualYieldImprovement = (idleBalanceAnalysis.avgIdleAmount * yieldImprovement) / 100;
    const annualFees = (pricing.monthlyFee || 0) * 12 + (pricing.setupFee || 0);
    const netBenefit = annualYieldImprovement - annualFees;

    if (netBenefit <= 0) {
        return null;
    }

    const priority =
        idleBalanceAnalysis.avgIdleAmount > 1000000
            ? 'high'
            : idleBalanceAnalysis.avgIdleAmount > 500000
              ? 'medium'
              : 'low';

    return {
        analysisId,
        productId: product.id,
        priority,
        rationale: `Client has significant idle balances (avg $${idleBalanceAnalysis.avgIdleAmount.toLocaleString()}) that could benefit from automatic sweep functionality. Estimated annual yield improvement of $${Math.round(annualYieldImprovement).toLocaleString()}.`,
        dataPoints: [
            `Average idle balance: $${idleBalanceAnalysis.avgIdleAmount.toLocaleString()}`,
            `Days with idle balance: ${idleBalanceAnalysis.daysWithIdleBalance}`,
            `Current yield opportunity: $${idleBalanceAnalysis.potentialYieldGain.toLocaleString()}`,
            `Projected net benefit: $${Math.round(netBenefit).toLocaleString()}`
        ],
        benefitProjection: {
            annualYieldImprovement: Math.round(annualYieldImprovement),
            potentialSavings: Math.round(netBenefit),
            liquidityImprovement: 15,
            operationalEfficiency: 20,
            estimatedROI: annualFees > 0 ? Math.round((netBenefit / annualFees) * 100) : 999
        }
    };
};

/**
 * Evaluate Zero Balance Account (ZBA) products
 */
const evaluateZBAProduct = (
    product: TreasuryProduct,
    financialData: any,
    analysisId: string
): RecommendationData | null => {
    const { summary, liquidityMetrics } = financialData;

    // ZBA is beneficial for clients with predictable cash flows
    const hasStableInflows = liquidityMetrics.volatility < 0.3;

    if (!hasStableInflows) {
        return null;
    }

    const benefits = product.benefits as any;
    const pricing = product.pricing as any;

    const operationalSavings = benefits.operationalSavings || 5000;
    const annualFees = (pricing.monthlyFee || 0) * 12 + (pricing.setupFee || 0);
    const netBenefit = operationalSavings - annualFees;

    const priority = liquidityMetrics.avgDailyBalance > 2000000 ? 'high' : 'medium';

    return {
        analysisId,
        productId: product.id,
        priority,
        rationale: `Client's cash flow patterns and balance management needs make them a strong candidate for Zero Balance Account structure. Low volatility (${(liquidityMetrics.volatility * 100).toFixed(1)}%) indicates predictable flows suitable for ZBA.`,
        dataPoints: [
            `Average daily balance: $${liquidityMetrics.avgDailyBalance.toLocaleString()}`,
            `Cash flow volatility: ${(liquidityMetrics.volatility * 100).toFixed(1)}%`,
            `Net cash flow: $${summary.netCashFlow.toLocaleString()}`,
            `Estimated operational savings: $${operationalSavings.toLocaleString()}`
        ],
        benefitProjection: {
            potentialSavings: Math.round(netBenefit),
            liquidityImprovement: 25,
            operationalEfficiency: 30,
            riskReduction: 20,
            estimatedROI: annualFees > 0 ? Math.round((netBenefit / annualFees) * 100) : 999
        }
    };
};

/**
 * Evaluate deposit products (CDs, money market accounts)
 */
const evaluateDepositProduct = (
    product: TreasuryProduct,
    financialData: any,
    analysisId: string
): RecommendationData | null => {
    const { liquidityMetrics, idleBalanceAnalysis } = financialData;
    const benefits = product.benefits as any;

    // Only recommend if client has stable excess liquidity
    const hasExcessLiquidity = liquidityMetrics.avgDailyBalance > liquidityMetrics.minBalance * 1.5;
    const lowVolatility = liquidityMetrics.volatility < 0.4;

    if (!hasExcessLiquidity || !lowVolatility) {
        return null;
    }

    const yieldRate = benefits.yieldRate || 3.5;
    const recommendedAmount = Math.min(idleBalanceAnalysis.avgIdleAmount, liquidityMetrics.avgDailyBalance * 0.3);
    const annualYieldImprovement = (recommendedAmount * yieldRate) / 100;

    const priority = recommendedAmount > 500000 ? 'high' : 'medium';

    return {
        analysisId,
        productId: product.id,
        priority,
        rationale: `Client has stable excess liquidity that could benefit from higher-yield deposit products. Low volatility (${(liquidityMetrics.volatility * 100).toFixed(1)}%) indicates funds suitable for term deposits.`,
        dataPoints: [
            `Recommended deposit amount: $${recommendedAmount.toLocaleString()}`,
            `Current yield rate: ${yieldRate}%`,
            `Balance volatility: ${(liquidityMetrics.volatility * 100).toFixed(1)}%`,
            `Excess liquidity ratio: ${(liquidityMetrics.avgDailyBalance / liquidityMetrics.minBalance - 1).toFixed(1)}`
        ],
        benefitProjection: {
            annualYieldImprovement: Math.round(annualYieldImprovement),
            liquidityImprovement: -10, // Slight reduction due to term commitment
            riskReduction: 5,
            estimatedROI: Math.round(yieldRate * 100)
        }
    };
};

/**
 * Evaluate liquidity management products
 */
const evaluateLiquidityProduct = (
    product: TreasuryProduct,
    financialData: any,
    analysisId: string
): RecommendationData | null => {
    const { liquidityMetrics, summary } = financialData;

    // Recommend for clients with high volatility or tight liquidity
    const hasVolatileCashFlow = liquidityMetrics.volatility > 0.5;
    const hasTightLiquidity = liquidityMetrics.liquidityRatio < 2.0;

    if (!hasVolatileCashFlow && !hasTightLiquidity) {
        return null;
    }

    const benefits = product.benefits as any;
    const riskReduction = benefits.riskReduction || 25;

    const priority = hasTightLiquidity ? 'high' : 'medium';

    return {
        analysisId,
        productId: product.id,
        priority,
        rationale: `Client's cash flow patterns show ${hasVolatileCashFlow ? 'high volatility' : 'tight liquidity management'}, making liquidity management tools valuable for financial stability.`,
        dataPoints: [
            `Cash flow volatility: ${(liquidityMetrics.volatility * 100).toFixed(1)}%`,
            `Liquidity ratio: ${liquidityMetrics.liquidityRatio.toFixed(1)}`,
            `Min/Avg balance ratio: ${(liquidityMetrics.minBalance / liquidityMetrics.avgDailyBalance).toFixed(2)}`,
            `Net cash flow variability: ${Math.abs(summary.netCashFlow).toLocaleString()}`
        ],
        benefitProjection: {
            riskReduction,
            liquidityImprovement: 35,
            operationalEfficiency: 15,
            estimatedROI: 150 // Value-based ROI for risk management
        }
    };
};

/**
 * Evaluate investment products
 */
const evaluateInvestmentProduct = (
    product: TreasuryProduct,
    financialData: any,
    analysisId: string
): RecommendationData | null => {
    const { liquidityMetrics, summary, idleBalanceAnalysis } = financialData;
    const benefits = product.benefits as any;

    // Only for clients with substantial excess liquidity and growth potential
    const hasSubstantialAssets = liquidityMetrics.avgDailyBalance > 1000000;
    const hasGrowthCashFlow = summary.netCashFlow > 0;
    const hasIdleCapacity = idleBalanceAnalysis.avgIdleAmount > 250000;

    if (!hasSubstantialAssets || !hasGrowthCashFlow || !hasIdleCapacity) {
        return null;
    }

    const expectedReturn = benefits.expectedReturn || 5.5;
    const investmentAmount = Math.min(idleBalanceAnalysis.avgIdleAmount * 0.6, liquidityMetrics.avgDailyBalance * 0.25);
    const annualYieldImprovement = (investmentAmount * expectedReturn) / 100;

    const priority = investmentAmount > 1000000 ? 'high' : 'medium';

    return {
        analysisId,
        productId: product.id,
        priority,
        rationale: `Client has strong financial position with positive cash flow growth and substantial idle capacity suitable for investment products. Recommended investment amount: $${investmentAmount.toLocaleString()}.`,
        dataPoints: [
            `Recommended investment: $${investmentAmount.toLocaleString()}`,
            `Expected annual return: ${expectedReturn}%`,
            `Net cash flow growth: $${summary.netCashFlow.toLocaleString()}`,
            `Available idle capacity: $${idleBalanceAnalysis.avgIdleAmount.toLocaleString()}`
        ],
        benefitProjection: {
            annualYieldImprovement: Math.round(annualYieldImprovement),
            riskReduction: -5, // Investment carries some risk
            liquidityImprovement: -15, // Reduced liquidity for investment
            estimatedROI: Math.round(expectedReturn * 100)
        }
    };
};

/**
 * Evaluate generic products
 */
const evaluateGenericProduct = (
    product: TreasuryProduct,
    financialData: any,
    analysisId: string
): RecommendationData | null => {
    const { liquidityMetrics, summary } = financialData;
    const benefits = product.benefits as any;

    // Generic evaluation based on client size and activity
    const priority = liquidityMetrics.avgDailyBalance > 1000000 ? 'medium' : 'low';

    return {
        analysisId,
        productId: product.id,
        priority,
        rationale: `Client profile indicates potential value from ${product.name}. Further consultation recommended to assess specific needs and implementation requirements.`,
        dataPoints: [
            `Average daily balance: $${liquidityMetrics.avgDailyBalance.toLocaleString()}`,
            `Transaction volume: ${summary.transactionCount}`,
            `Net cash flow: $${summary.netCashFlow.toLocaleString()}`
        ],
        benefitProjection: {
            operationalEfficiency: benefits.operationalEfficiency || 10,
            estimatedROI: 100 // Conservative estimate for generic products
        }
    };
};

/**
 * Get recommendations for an analysis
 * @param {string} analysisId
 * @param {object} filter - Additional filters
 * @param {object} options - Query options
 * @returns {Promise<Recommendation[]>}
 */
const getRecommendations = async <Key extends keyof Recommendation>(
    filter: object,
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    } = {},
    keys: Key[] = [
        'id',
        'analysisId',
        'productId',
        'priority',
        'rationale',
        'dataPoints',
        'benefitProjection',
        'status',
        'createdAt'
    ] as Key[]
): Promise<Pick<Recommendation, Key>[]> => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy ?? 'createdAt';
    const sortType = options.sortType ?? 'desc';

    const recommendations = await prisma.recommendation.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortType }
    });

    return recommendations as Pick<Recommendation, Key>[];
};

/**
 * Get recommendation by ID with related data
 * @param {string} id
 * @returns {Promise<Recommendation | null>}
 */
const getRecommendationById = async (id: string): Promise<Recommendation | null> => {
    return await prisma.recommendation.findUnique({
        where: { id },
        include: {
            product: true,
            analysis: {
                include: {
                    client: true
                }
            }
        }
    });
};

/**
 * Approve a recommendation
 * @param {string} recommendationId
 * @param {string} approvedBy
 * @returns {Promise<Recommendation>}
 */
const approveRecommendation = async (recommendationId: string, approvedBy: string): Promise<Recommendation> => {
    const recommendation = await getRecommendationById(recommendationId);
    if (!recommendation) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Recommendation not found');
    }

    if (recommendation.status !== 'pending') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Only pending recommendations can be approved');
    }

    return await prisma.recommendation.update({
        where: { id: recommendationId },
        data: {
            status: 'approved',
            approvedBy,
            approvedAt: new Date()
        },
        include: {
            product: true,
            analysis: {
                include: {
                    client: true
                }
            }
        }
    });
};

/**
 * Reject a recommendation
 * @param {string} recommendationId
 * @param {string} rejectedBy
 * @returns {Promise<Recommendation>}
 */
const rejectRecommendation = async (recommendationId: string, rejectedBy: string): Promise<Recommendation> => {
    const recommendation = await getRecommendationById(recommendationId);
    if (!recommendation) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Recommendation not found');
    }

    if (recommendation.status !== 'pending') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Only pending recommendations can be rejected');
    }

    return await prisma.recommendation.update({
        where: { id: recommendationId },
        data: {
            status: 'rejected',
            approvedBy: rejectedBy, // Reusing field for rejected by
            approvedAt: new Date()
        },
        include: {
            product: true,
            analysis: {
                include: {
                    client: true
                }
            }
        }
    });
};

export default {
    generateRecommendations,
    getRecommendations,
    getRecommendationById,
    approveRecommendation,
    rejectRecommendation
};
