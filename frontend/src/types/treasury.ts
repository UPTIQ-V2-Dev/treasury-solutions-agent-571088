// Treasury Solutions Core Types

export interface Client {
    id: string;
    name: string;
    accountIds: string[];
    relationshipManager: string;
    status: 'active' | 'pending' | 'inactive';
    createdAt: string;
    updatedAt: string;
}

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    type: 'credit' | 'debit' | 'transfer' | 'check' | 'ach' | 'wire' | 'card';
    category: string;
    description: string;
    counterparty?: string;
    balanceAfter: number;
    accountId: string;
}

export interface StatementFile {
    id: string;
    filename: string;
    type: 'pdf' | 'csv' | 'ofx';
    size: number;
    uploadedAt: string;
    status: 'uploading' | 'processing' | 'completed' | 'error';
    clientId: string;
}

export interface UploadStatus {
    id: string;
    status: 'uploading' | 'processing' | 'completed' | 'error';
    progress: number;
    filename: string;
    error?: string;
}

export interface ParseResult {
    id: string;
    statementFileId: string;
    totalTransactions: number;
    dateRange: {
        startDate: string;
        endDate: string;
    };
    accounts: Array<{
        accountId: string;
        accountType: string;
        openingBalance: number;
        closingBalance: number;
    }>;
    status: 'success' | 'partial' | 'error';
    errors?: string[];
}

export interface AnalysisData {
    id: string;
    clientId: string;
    statementFileIds: string[];
    createdAt: string;
    status: 'processing' | 'completed' | 'error';
    summary: {
        totalInflow: number;
        totalOutflow: number;
        netCashFlow: number;
        avgDailyBalance: number;
        transactionCount: number;
        dateRange: {
            startDate: string;
            endDate: string;
        };
    };
    liquidityMetrics: LiquidityMetrics;
    spendingBreakdown: SpendingCategory[];
    idleBalanceAnalysis: IdleBalanceAnalysis;
}

export interface LiquidityMetrics {
    avgDailyBalance: number;
    minBalance: number;
    maxBalance: number;
    volatility: number;
    liquidityRatio: number;
    cashFlowTrends: Array<{
        date: string;
        inflow: number;
        outflow: number;
        balance: number;
    }>;
}

export interface SpendingCategory {
    category: string;
    amount: number;
    percentage: number;
    transactionCount: number;
    avgTransactionSize: number;
    topVendors: Array<{
        name: string;
        amount: number;
        transactionCount: number;
    }>;
}

export interface IdleBalanceAnalysis {
    avgIdleAmount: number;
    daysWithIdleBalance: number;
    threshold: number;
    potentialYieldGain: number;
    idleBalanceHistory: Array<{
        date: string;
        amount: number;
    }>;
}

export interface TreasuryProduct {
    id: string;
    name: string;
    category: 'sweep' | 'zba' | 'merchant' | 'lockbox' | 'rdc' | 'disbursement';
    description: string;
    features: string[];
    eligibilityRules: {
        minBalance?: number;
        minTransactionVolume?: number;
        accountTypes: string[];
        businessTypes?: string[];
    };
    benefits: {
        yieldImprovement?: number;
        costReduction?: number;
        efficiencyGain?: string;
        riskReduction?: string;
    };
    pricing: {
        setupFee?: number;
        monthlyFee?: number;
        transactionFee?: number;
        basisPoints?: number;
    };
}

export interface Recommendation {
    id: string;
    analysisId: string;
    productId: string;
    priority: 'high' | 'medium' | 'low';
    rationale: string;
    dataPoints: string[];
    benefitProjection: BenefitProjection;
    status: 'pending' | 'approved' | 'rejected' | 'implemented';
    createdAt: string;
    approvedBy?: string;
    approvedAt?: string;
}

export interface BenefitProjection {
    annualYieldIncrease?: number;
    annualCostSavings?: number;
    efficiencyMetrics?: {
        timeReduction?: string;
        manualProcessElimination?: string;
        errorReduction?: string;
    };
    paybackPeriod?: number;
    roi?: number;
}

// Request/Response Types
export interface UploadStatementRequest {
    clientId: string;
    files: File[];
}

export interface AnalyzeStatementRequest {
    statementFileIds: string[];
    clientId: string;
    analysisOptions?: {
        idleBalanceThreshold?: number;
        excludeCategories?: string[];
        customDateRange?: {
            startDate: string;
            endDate: string;
        };
    };
}

export interface GenerateRecommendationsRequest {
    analysisId: string;
    productFilters?: {
        categories?: string[];
        minBenefitThreshold?: number;
    };
}

export interface CreateReportRequest {
    analysisId: string;
    recommendationIds?: string[];
    format: 'pdf' | 'html' | 'excel';
    template: 'standard' | 'executive' | 'detailed';
    includeDataTables?: boolean;
}

export interface ReportTemplate {
    id: string;
    name: string;
    description: string;
    format: 'pdf' | 'html' | 'excel';
    sections: string[];
    isCustomizable: boolean;
}

export interface ReportConfig {
    templateId: string;
    format: 'pdf' | 'html' | 'excel';
    includeCharts: boolean;
    includeDataTables: boolean;
    includeRecommendations: boolean;
    customSections?: string[];
}

export type ExportFormat = 'pdf' | 'html' | 'excel';

export interface ReportMetadata {
    id: string;
    title: string;
    analysisId: string;
    clientId: string;
    clientName: string;
    format: ExportFormat;
    template: string;
    createdAt: string;
    createdBy: string;
    fileSize: number;
    downloadCount: number;
    status: 'generating' | 'ready' | 'error';
}

export interface ReportListResponse {
    reports: ReportMetadata[];
    totalCount: number;
    page: number;
    totalPages: number;
}

// Dashboard Types
export interface DashboardMetrics {
    totalClients: number;
    activeAnalyses: number;
    pendingRecommendations: number;
    totalPotentialSavings: number;
    recentActivity: Array<{
        id: string;
        type: 'upload' | 'analysis' | 'recommendation' | 'approval';
        clientName: string;
        timestamp: string;
        status: string;
    }>;
    topOpportunities: Array<{
        clientName: string;
        potentialSavings: number;
        productCategory: string;
    }>;
}

// Admin Configuration Types
export interface SystemConfig {
    thresholds?: {
        idleCashThreshold: number;
        liquidityWarningThreshold: number;
        lowBalanceThreshold: number;
        highRiskThreshold: number;
    };
    features?: {
        enableAutoAnalysis: boolean;
        enableEmailNotifications: boolean;
        enableRecommendationEngine: boolean;
        enableAdvancedReports: boolean;
    };
    integrations?: {
        bankApiEnabled: boolean;
        webhooksEnabled: boolean;
        apiRateLimit: number;
        maxFileSize: number;
    };
    security?: {
        sessionTimeout: number;
        passwordExpiry: number;
        requireMfa: boolean;
        auditLogRetention: number;
    };
}

export interface AuditEntry {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    action: string;
    resource: string;
    resourceId?: string;
    details: string;
    severity: 'low' | 'medium' | 'high';
    ipAddress: string;
    userAgent?: string;
    timestamp: string;
}

export interface AuditLogsResponse {
    logs: AuditEntry[];
    totalCount: number;
    page: number;
    totalPages: number;
}

export interface AuditLogsRequest {
    page?: number;
    limit?: number;
    search?: string;
    userId?: string;
    action?: string;
    dateFrom?: string;
    dateTo?: string;
}
