import prisma from "../client.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from 'http-status';
/**
 * Perform comprehensive financial analysis on parsed statement data
 * @param {AnalyzeStatementData} analyzeData
 * @returns {Promise<Analysis>}
 */
const analyzeStatements = async (analyzeData) => {
    const { statementFileIds, clientId, analysisOptions = {} } = analyzeData;
    // Validate client exists
    const client = await prisma.client.findUnique({
        where: { id: clientId }
    });
    if (!client) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Client not found');
    }
    // Validate statement files exist and are parsed
    const statementFiles = await prisma.statementFile.findMany({
        where: {
            id: { in: statementFileIds },
            clientId: clientId
        },
        include: { ParseResult: true }
    });
    if (statementFiles.length !== statementFileIds.length) {
        throw new ApiError(httpStatus.NOT_FOUND, 'One or more statement files not found');
    }
    const unparsedFiles = statementFiles.filter(file => !file.ParseResult || file.ParseResult.status !== 'success');
    if (unparsedFiles.length > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'All statement files must be successfully parsed before analysis');
    }
    try {
        // Extract all transaction data from parsed results
        const allTransactions = [];
        // let totalTransactionCount = 0;
        let dateRangeStart = null;
        let dateRangeEnd = null;
        for (const statementFile of statementFiles) {
            const parseResult = statementFile.ParseResult;
            // totalTransactionCount += parseResult.totalTransactions;
            // Track overall date range
            if (!dateRangeStart || parseResult.dateRangeStart < dateRangeStart) {
                dateRangeStart = parseResult.dateRangeStart;
            }
            if (!dateRangeEnd || parseResult.dateRangeEnd > dateRangeEnd) {
                dateRangeEnd = parseResult.dateRangeEnd;
            }
            // Extract transactions from accounts
            const accounts = parseResult.accounts;
            for (const account of accounts) {
                if (account.transactions && Array.isArray(account.transactions)) {
                    for (const [index, transaction] of account.transactions.entries()) {
                        allTransactions.push({
                            id: `${parseResult.id}-${account.accountId || account.accountNumber || 'unknown'}-${index}`,
                            date: new Date(transaction.date).toISOString(),
                            amount: Math.abs(transaction.amount || 0),
                            type: transaction.type || (transaction.amount >= 0 ? 'credit' : 'debit'),
                            category: transaction.category || categorizeTransaction(transaction.description || ''),
                            description: transaction.description || 'Unknown Transaction',
                            counterparty: transaction.counterparty || extractCounterparty(transaction.description || ''),
                            balanceAfter: transaction.balance || transaction.balanceAfter,
                            accountId: account.accountId || account.accountNumber || 'UNKNOWN'
                        });
                    }
                }
            }
        }
        // Perform financial analysis calculations
        const summary = calculateAnalysisSummary(allTransactions, dateRangeStart, dateRangeEnd);
        const liquidityMetrics = calculateLiquidityMetrics(allTransactions);
        const spendingBreakdown = calculateSpendingBreakdown(allTransactions);
        const idleBalanceAnalysis = calculateIdleBalanceAnalysis(allTransactions, analysisOptions.idleBalanceThreshold || 250000);
        // Create analysis record
        const analysis = await prisma.analysis.create({
            data: {
                clientId,
                statementFileIds,
                status: 'completed',
                summary: summary,
                liquidityMetrics: liquidityMetrics,
                spendingBreakdown: spendingBreakdown,
                idleBalanceAnalysis: idleBalanceAnalysis
            }
        });
        return analysis;
    }
    catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to analyze statements: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
/**
 * Calculate analysis summary metrics
 */
const calculateAnalysisSummary = (transactions, startDate, endDate) => {
    const totalInflow = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
    const totalOutflow = transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0);
    const netCashFlow = totalInflow - totalOutflow;
    // Calculate average daily balance (simplified calculation)
    const transactionsWithBalance = transactions.filter(t => t.balanceAfter !== undefined);
    const avgDailyBalance = transactionsWithBalance.length > 0
        ? transactionsWithBalance.reduce((sum, t) => sum + (t.balanceAfter || 0), 0) /
            transactionsWithBalance.length
        : 0;
    return {
        totalInflow,
        totalOutflow,
        netCashFlow,
        avgDailyBalance,
        transactionCount: transactions.length,
        dateRange: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        }
    };
};
/**
 * Calculate liquidity metrics
 */
const calculateLiquidityMetrics = (transactions) => {
    const balances = transactions
        .filter(t => t.balanceAfter !== undefined)
        .map(t => t.balanceAfter)
        .sort((a, b) => a - b);
    if (balances.length === 0) {
        return {
            avgDailyBalance: 0,
            minBalance: 0,
            maxBalance: 0,
            volatility: 0,
            liquidityRatio: 0
        };
    }
    const avgDailyBalance = balances.reduce((sum, b) => sum + b, 0) / balances.length;
    const minBalance = balances[0];
    const maxBalance = balances[balances.length - 1];
    // Calculate volatility as coefficient of variation
    const variance = balances.reduce((sum, b) => sum + Math.pow(b - avgDailyBalance, 2), 0) / balances.length;
    const standardDeviation = Math.sqrt(variance);
    const volatility = avgDailyBalance > 0 ? standardDeviation / avgDailyBalance : 0;
    // Simple liquidity ratio calculation
    const liquidityRatio = minBalance > 0 ? avgDailyBalance / minBalance : 0;
    return {
        avgDailyBalance: Math.round(avgDailyBalance),
        minBalance: Math.round(minBalance),
        maxBalance: Math.round(maxBalance),
        volatility: Math.round(volatility * 100) / 100,
        liquidityRatio: Math.round(liquidityRatio * 100) / 100
    };
};
/**
 * Calculate spending breakdown by category
 */
const calculateSpendingBreakdown = (transactions) => {
    const outflowTransactions = transactions.filter(t => t.type === 'debit');
    const totalOutflow = outflowTransactions.reduce((sum, t) => sum + t.amount, 0);
    if (totalOutflow === 0) {
        return [];
    }
    const categoryTotals = new Map();
    for (const transaction of outflowTransactions) {
        const category = transaction.category || 'Other';
        const current = categoryTotals.get(category) || { amount: 0, count: 0 };
        categoryTotals.set(category, {
            amount: current.amount + transaction.amount,
            count: current.count + 1
        });
    }
    return Array.from(categoryTotals.entries())
        .map(([category, data]) => ({
        category,
        amount: Math.round(data.amount),
        percentage: Math.round((data.amount / totalOutflow) * 1000) / 10,
        transactionCount: data.count
    }))
        .sort((a, b) => b.amount - a.amount);
};
/**
 * Calculate idle balance analysis
 */
const calculateIdleBalanceAnalysis = (transactions, threshold) => {
    const balances = transactions.filter(t => t.balanceAfter !== undefined).map(t => t.balanceAfter);
    if (balances.length === 0) {
        return {
            avgIdleAmount: 0,
            daysWithIdleBalance: 0,
            threshold,
            potentialYieldGain: 0
        };
    }
    const idleBalances = balances.filter(b => b > threshold);
    const avgIdleAmount = idleBalances.length > 0 ? idleBalances.reduce(sum => sum - threshold, 0) / idleBalances.length : 0;
    const daysWithIdleBalance = idleBalances.length;
    // Calculate potential yield gain (assuming 2.5% annual yield)
    const annualYieldRate = 0.025;
    const potentialYieldGain = Math.round(avgIdleAmount * annualYieldRate);
    return {
        avgIdleAmount: Math.round(avgIdleAmount),
        daysWithIdleBalance,
        threshold,
        potentialYieldGain
    };
};
/**
 * Categorize transaction based on description
 */
const categorizeTransaction = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('payroll') || desc.includes('salary') || desc.includes('wage')) {
        return 'Payroll';
    }
    if (desc.includes('transfer') || desc.includes('wire')) {
        return 'Transfers';
    }
    if (desc.includes('vendor') || desc.includes('supplier') || desc.includes('payment')) {
        return 'Vendor Payments';
    }
    if (desc.includes('interest') || desc.includes('dividend')) {
        return 'Investment Income';
    }
    if (desc.includes('fee') || desc.includes('charge')) {
        return 'Bank Fees';
    }
    if (desc.includes('loan') || desc.includes('credit')) {
        return 'Financing';
    }
    if (desc.includes('tax') || desc.includes('irs')) {
        return 'Taxes';
    }
    if (desc.includes('utilities') || desc.includes('electric') || desc.includes('gas')) {
        return 'Utilities';
    }
    if (desc.includes('rent') || desc.includes('lease')) {
        return 'Rent & Facilities';
    }
    return 'Other';
};
/**
 * Extract counterparty from transaction description
 */
const extractCounterparty = (description) => {
    // Simple extraction logic - in practice, this would be more sophisticated
    const patterns = [/FROM\s+([A-Z\s]+)/i, /TO\s+([A-Z\s]+)/i, /^([A-Z\s]+)\s+PAYMENT/i, /WIRE\s+([A-Z\s]+)/i];
    for (const pattern of patterns) {
        const match = description.match(pattern);
        if (match && match[1]) {
            return match[1].trim();
        }
    }
    return undefined;
};
/**
 * Get analysis by id
 * @param {string} analysisId
 * @returns {Promise<Analysis | null>}
 */
const getAnalysisById = async (analysisId) => {
    return await prisma.analysis.findUnique({
        where: { id: analysisId }
    });
};
/**
 * Get paginated transaction data for an analysis
 * @param {string} analysisId
 * @param {Object} options - Pagination options
 * @returns {Promise<{ transactions: TransactionData[], totalCount: number, page: number, totalPages: number }>}
 */
const getAnalysisTransactions = async (analysisId, options = {}) => {
    const analysis = await getAnalysisById(analysisId);
    if (!analysis) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Analysis not found');
    }
    // Get statement files for this analysis
    const statementFiles = await prisma.statementFile.findMany({
        where: {
            id: { in: analysis.statementFileIds }
        },
        include: { ParseResult: true }
    });
    // Extract all transactions from parsed results
    const allTransactions = [];
    for (const statementFile of statementFiles) {
        const parseResult = statementFile.ParseResult;
        if (!parseResult)
            continue;
        const accounts = parseResult.accounts;
        for (const account of accounts) {
            if (account.transactions && Array.isArray(account.transactions)) {
                for (const [index, transaction] of account.transactions.entries()) {
                    allTransactions.push({
                        id: `${parseResult.id}-${account.accountId || account.accountNumber || 'unknown'}-${index}`,
                        date: new Date(transaction.date).toISOString(),
                        amount: Math.abs(transaction.amount || 0),
                        type: transaction.type || (transaction.amount >= 0 ? 'credit' : 'debit'),
                        category: transaction.category || categorizeTransaction(transaction.description || ''),
                        description: transaction.description || 'Unknown Transaction',
                        counterparty: transaction.counterparty || extractCounterparty(transaction.description || ''),
                        balanceAfter: transaction.balance || transaction.balanceAfter,
                        accountId: account.accountId || account.accountNumber || 'UNKNOWN'
                    });
                }
            }
        }
    }
    // Sort transactions by date (newest first)
    allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    // Apply pagination
    const page = options.page || 1;
    const limit = options.limit || 50;
    const totalCount = allTransactions.length;
    const totalPages = Math.ceil(totalCount / limit);
    const offset = (page - 1) * limit;
    const transactions = allTransactions.slice(offset, offset + limit);
    return {
        transactions,
        totalCount,
        page,
        totalPages
    };
};
/**
 * Query for analyses
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @returns {Promise<Pick<Analysis, Key>[]>}
 */
const queryAnalyses = async (filter, options, keys = ['id', 'clientId', 'statementFileIds', 'createdAt', 'status']) => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    const analyses = await prisma.analysis.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortType } : { createdAt: 'desc' }
    });
    return analyses;
};
/**
 * Delete analysis by id
 * @param {string} analysisId
 * @returns {Promise<Analysis>}
 */
const deleteAnalysisById = async (analysisId) => {
    const analysis = await getAnalysisById(analysisId);
    if (!analysis) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Analysis not found');
    }
    await prisma.analysis.delete({ where: { id: analysisId } });
    return analysis;
};
export default {
    analyzeStatements,
    getAnalysisById,
    getAnalysisTransactions,
    queryAnalyses,
    deleteAnalysisById
};
