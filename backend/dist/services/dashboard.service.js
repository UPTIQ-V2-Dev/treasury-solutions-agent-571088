import prisma from "../client.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from 'http-status';
/**
 * Get dashboard metrics aggregating data from clients, analyses, and recommendations
 * @returns {Promise<DashboardMetrics>}
 */
const getDashboardMetrics = async () => {
    try {
        // Get total clients count
        const totalClients = await prisma.client.count({
            where: { status: 'active' }
        });
        // Get active analyses count (processing or completed)
        const activeAnalyses = await prisma.analysis.count({
            where: {
                status: {
                    in: ['processing', 'completed']
                }
            }
        });
        // Get pending recommendations count
        const pendingRecommendations = await prisma.recommendation.count({
            where: { status: 'pending' }
        });
        // Calculate total potential savings from all pending recommendations
        const recommendationsWithSavings = await prisma.recommendation.findMany({
            where: { status: 'pending' },
            select: {
                benefitProjection: true
            }
        });
        let totalPotentialSavings = 0;
        recommendationsWithSavings.forEach(rec => {
            const benefitData = rec.benefitProjection;
            if (benefitData?.annualYieldIncrease) {
                totalPotentialSavings += parseFloat(benefitData.annualYieldIncrease) || 0;
            }
        });
        // Get recent activity (last 10 analyses)
        const recentAnalyses = await prisma.analysis.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                status: true,
                createdAt: true,
                client: {
                    select: { name: true }
                }
            }
        });
        const recentActivity = recentAnalyses.map(analysis => ({
            id: analysis.id,
            type: 'analysis',
            clientName: analysis.client.name,
            timestamp: analysis.createdAt.toISOString(),
            status: analysis.status
        }));
        // Get top opportunities (recommendations with highest potential savings)
        const topRecommendations = await prisma.recommendation.findMany({
            where: { status: 'pending' },
            take: 5,
            select: {
                benefitProjection: true,
                product: {
                    select: { category: true }
                },
                analysis: {
                    select: {
                        client: {
                            select: { name: true }
                        }
                    }
                }
            }
        });
        const topOpportunities = topRecommendations
            .map(rec => {
            const benefitData = rec.benefitProjection;
            const potentialSavings = parseFloat(benefitData?.annualYieldIncrease || '0') || 0;
            return {
                clientName: rec.analysis.client.name,
                potentialSavings,
                productCategory: rec.product.category
            };
        })
            .filter(opp => opp.potentialSavings > 0)
            .sort((a, b) => b.potentialSavings - a.potentialSavings)
            .slice(0, 5);
        return {
            totalClients,
            activeAnalyses,
            pendingRecommendations,
            totalPotentialSavings: Math.round(totalPotentialSavings),
            recentActivity,
            topOpportunities
        };
    }
    catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to fetch dashboard metrics: ${error.message}`);
    }
};
export default {
    getDashboardMetrics
};
