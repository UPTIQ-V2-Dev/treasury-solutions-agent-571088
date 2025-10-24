import type {
    Client,
    AnalysisData,
    TreasuryProduct,
    Recommendation,
    DashboardMetrics,
    UploadStatus,
    ParseResult,
    Transaction
} from '@/types/treasury';

// Mock Clients
export const mockClients: Client[] = [
    {
        id: '1',
        name: 'ACME Corporation',
        accountIds: ['ACC-001', 'ACC-002'],
        relationshipManager: 'Sarah Johnson',
        status: 'active',
        createdAt: '2024-01-15T09:00:00Z',
        updatedAt: '2024-10-20T14:30:00Z'
    },
    {
        id: '2',
        name: 'TechStart Solutions',
        accountIds: ['ACC-003'],
        relationshipManager: 'Mike Chen',
        status: 'active',
        createdAt: '2024-02-10T11:00:00Z',
        updatedAt: '2024-10-18T16:45:00Z'
    },
    {
        id: '3',
        name: 'Global Manufacturing Ltd',
        accountIds: ['ACC-004', 'ACC-005', 'ACC-006'],
        relationshipManager: 'Emily Rodriguez',
        status: 'pending',
        createdAt: '2024-03-05T08:30:00Z',
        updatedAt: '2024-10-22T10:15:00Z'
    }
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
    {
        id: 'txn-1',
        date: '2024-10-20T00:00:00Z',
        amount: 25000,
        type: 'credit',
        category: 'Customer Payment',
        description: 'WIRE TRANSFER FROM ABC CLIENT',
        counterparty: 'ABC CLIENT CORP',
        balanceAfter: 485000,
        accountId: 'ACC-001'
    },
    {
        id: 'txn-2',
        date: '2024-10-20T00:00:00Z',
        amount: -15000,
        type: 'debit',
        category: 'Payroll',
        description: 'PAYROLL ACH BATCH 2024102',
        counterparty: 'PAYROLL PROCESSOR',
        balanceAfter: 470000,
        accountId: 'ACC-001'
    },
    {
        id: 'txn-3',
        date: '2024-10-19T00:00:00Z',
        amount: -5000,
        type: 'check',
        category: 'Vendor Payment',
        description: 'CHECK #1001 - OFFICE SUPPLIES',
        counterparty: 'OFFICE DEPOT',
        balanceAfter: 485000,
        accountId: 'ACC-001'
    },
    {
        id: 'txn-4',
        date: '2024-10-19T00:00:00Z',
        amount: 50000,
        type: 'wire',
        category: 'Customer Payment',
        description: 'INCOMING WIRE - INV 2024-1001',
        counterparty: 'MAJOR CLIENT LLC',
        balanceAfter: 490000,
        accountId: 'ACC-001'
    },
    {
        id: 'txn-5',
        date: '2024-10-18T00:00:00Z',
        amount: -2500,
        type: 'ach',
        category: 'Utilities',
        description: 'ACH DEBIT - ELECTRIC BILL',
        counterparty: 'POWER COMPANY',
        balanceAfter: 440000,
        accountId: 'ACC-001'
    }
];

// Mock Upload Status
export const mockUploadStatus: UploadStatus = {
    id: 'upload-1',
    status: 'completed',
    progress: 100,
    filename: 'acme-corp-statement-oct-2024.pdf'
};

// Mock Parse Result
export const mockParseResult: ParseResult = {
    id: 'parse-1',
    statementFileId: 'file-1',
    totalTransactions: 156,
    dateRange: {
        startDate: '2024-10-01T00:00:00Z',
        endDate: '2024-10-31T00:00:00Z'
    },
    accounts: [
        {
            accountId: 'ACC-001',
            accountType: 'Operating',
            openingBalance: 425000,
            closingBalance: 470000
        }
    ],
    status: 'success'
};

// Mock Analysis Data
export const mockAnalysisData: AnalysisData = {
    id: 'analysis-1',
    clientId: '1',
    statementFileIds: ['file-1'],
    createdAt: '2024-10-22T10:00:00Z',
    status: 'completed',
    summary: {
        totalInflow: 875000,
        totalOutflow: 650000,
        netCashFlow: 225000,
        avgDailyBalance: 456000,
        transactionCount: 156,
        dateRange: {
            startDate: '2024-10-01T00:00:00Z',
            endDate: '2024-10-31T00:00:00Z'
        }
    },
    liquidityMetrics: {
        avgDailyBalance: 456000,
        minBalance: 385000,
        maxBalance: 525000,
        volatility: 0.15,
        liquidityRatio: 2.8,
        cashFlowTrends: [
            { date: '2024-10-01', inflow: 50000, outflow: 25000, balance: 450000 },
            { date: '2024-10-02', inflow: 30000, outflow: 35000, balance: 445000 },
            { date: '2024-10-03', inflow: 75000, outflow: 20000, balance: 500000 },
            { date: '2024-10-04', inflow: 25000, outflow: 45000, balance: 480000 },
            { date: '2024-10-05', inflow: 40000, outflow: 30000, balance: 490000 }
        ]
    },
    spendingBreakdown: [
        {
            category: 'Payroll',
            amount: 245000,
            percentage: 37.7,
            transactionCount: 8,
            avgTransactionSize: 30625,
            topVendors: [{ name: 'Payroll Processor', amount: 245000, transactionCount: 8 }]
        },
        {
            category: 'Vendor Payments',
            amount: 180000,
            percentage: 27.7,
            transactionCount: 45,
            avgTransactionSize: 4000,
            topVendors: [
                { name: 'Main Supplier Co', amount: 85000, transactionCount: 12 },
                { name: 'Tech Services LLC', amount: 45000, transactionCount: 8 },
                { name: 'Office Supplies Inc', amount: 25000, transactionCount: 15 }
            ]
        },
        {
            category: 'Utilities',
            amount: 15000,
            percentage: 2.3,
            transactionCount: 6,
            avgTransactionSize: 2500,
            topVendors: [
                { name: 'Electric Company', amount: 8000, transactionCount: 2 },
                { name: 'Gas Utility', amount: 4000, transactionCount: 2 },
                { name: 'Water District', amount: 3000, transactionCount: 2 }
            ]
        }
    ],
    idleBalanceAnalysis: {
        avgIdleAmount: 185000,
        daysWithIdleBalance: 22,
        threshold: 250000,
        potentialYieldGain: 8500,
        idleBalanceHistory: [
            { date: '2024-10-01', amount: 175000 },
            { date: '2024-10-02', amount: 180000 },
            { date: '2024-10-03', amount: 220000 },
            { date: '2024-10-04', amount: 195000 },
            { date: '2024-10-05', amount: 210000 }
        ]
    }
};

// Mock Treasury Products
export const mockTreasuryProducts: TreasuryProduct[] = [
    {
        id: 'prod-1',
        name: 'Automated Investment Sweep',
        category: 'sweep',
        description: 'Automatically sweep idle balances into interest-bearing accounts',
        features: [
            'Automatic daily sweeping',
            'Customizable thresholds',
            'Real-time balance optimization',
            'Multiple investment options'
        ],
        eligibilityRules: {
            minBalance: 250000,
            accountTypes: ['Operating', 'Money Market']
        },
        benefits: {
            yieldImprovement: 2.5,
            costReduction: 0,
            efficiencyGain: 'Automated cash management'
        },
        pricing: {
            setupFee: 500,
            monthlyFee: 150,
            basisPoints: 15
        }
    },
    {
        id: 'prod-2',
        name: 'Zero Balance Account System',
        category: 'zba',
        description: 'Centralized cash management with subsidiary accounts',
        features: [
            'Master-subsidiary structure',
            'Automatic fund transfers',
            'Centralized reporting',
            'Improved cash visibility'
        ],
        eligibilityRules: {
            minTransactionVolume: 100,
            accountTypes: ['Operating', 'Payroll', 'Tax']
        },
        benefits: {
            yieldImprovement: 1.8,
            costReduction: 5000,
            efficiencyGain: 'Simplified account management'
        },
        pricing: {
            setupFee: 1000,
            monthlyFee: 75,
            transactionFee: 0.5
        }
    },
    {
        id: 'prod-3',
        name: 'Remote Deposit Capture',
        category: 'rdc',
        description: 'Deposit checks electronically from your office',
        features: ['Mobile and desktop capture', 'Same-day availability', 'Fraud detection', 'Digital imaging'],
        eligibilityRules: {
            minTransactionVolume: 20,
            accountTypes: ['Operating', 'Collection']
        },
        benefits: {
            costReduction: 2500,
            efficiencyGain: 'Faster deposit processing',
            riskReduction: 'Reduced transportation risk'
        },
        pricing: {
            setupFee: 250,
            monthlyFee: 45,
            transactionFee: 0.15
        }
    },
    {
        id: 'prod-4',
        name: 'ACH Origination Platform',
        category: 'disbursement',
        description: 'Streamlined electronic payment processing',
        features: ['Batch payment processing', 'Payment scheduling', 'Exception management', 'Detailed reporting'],
        eligibilityRules: {
            minTransactionVolume: 50,
            accountTypes: ['Operating', 'Payroll']
        },
        benefits: {
            costReduction: 8000,
            efficiencyGain: 'Automated payment processing',
            riskReduction: 'Reduced manual errors'
        },
        pricing: {
            setupFee: 750,
            monthlyFee: 125,
            transactionFee: 0.25
        }
    }
];

// Mock Recommendations
export const mockRecommendations: Recommendation[] = [
    {
        id: 'rec-1',
        analysisId: 'analysis-1',
        productId: 'prod-1',
        priority: 'high',
        rationale:
            'Client maintains average idle balances of $185,000 for 22 days per month, exceeding the $250,000 threshold for sweep account eligibility.',
        dataPoints: [
            'Average idle balance: $185,000',
            'Days with idle balance: 22/31',
            'Potential annual yield gain: $8,500'
        ],
        benefitProjection: {
            annualYieldIncrease: 8500,
            paybackPeriod: 3,
            roi: 12.5
        },
        status: 'pending',
        createdAt: '2024-10-22T11:00:00Z'
    },
    {
        id: 'rec-2',
        analysisId: 'analysis-1',
        productId: 'prod-4',
        priority: 'medium',
        rationale:
            'High volume of vendor payments (45 transactions totaling $180,000) suggests significant savings potential with ACH automation.',
        dataPoints: [
            'Vendor payment volume: $180,000',
            'Manual check processing: 35 transactions',
            'Estimated annual savings: $8,000'
        ],
        benefitProjection: {
            annualCostSavings: 8000,
            efficiencyMetrics: {
                timeReduction: '15 hours per month',
                manualProcessElimination: '80% of check payments'
            },
            paybackPeriod: 2,
            roi: 18.2
        },
        status: 'pending',
        createdAt: '2024-10-22T11:00:00Z'
    },
    {
        id: 'rec-3',
        analysisId: 'analysis-1',
        productId: 'prod-3',
        priority: 'low',
        rationale: 'Moderate check deposit volume could benefit from remote capture capabilities.',
        dataPoints: [
            'Check deposits: 12 per month',
            'Average deposit amount: $15,000',
            'Current processing delay: 1-2 business days'
        ],
        benefitProjection: {
            annualCostSavings: 2500,
            efficiencyMetrics: {
                timeReduction: '4 hours per month'
            },
            paybackPeriod: 4,
            roi: 8.5
        },
        status: 'pending',
        createdAt: '2024-10-22T11:00:00Z'
    }
];

// Mock Dashboard Metrics
export const mockDashboardMetrics: DashboardMetrics = {
    totalClients: 47,
    activeAnalyses: 12,
    pendingRecommendations: 28,
    totalPotentialSavings: 485000,
    recentActivity: [
        {
            id: 'act-1',
            type: 'analysis',
            clientName: 'ACME Corporation',
            timestamp: '2024-10-22T14:30:00Z',
            status: 'completed'
        },
        {
            id: 'act-2',
            type: 'upload',
            clientName: 'TechStart Solutions',
            timestamp: '2024-10-22T13:15:00Z',
            status: 'processing'
        },
        {
            id: 'act-3',
            type: 'recommendation',
            clientName: 'Global Manufacturing Ltd',
            timestamp: '2024-10-22T11:45:00Z',
            status: 'pending_review'
        },
        {
            id: 'act-4',
            type: 'approval',
            clientName: 'ACME Corporation',
            timestamp: '2024-10-22T09:30:00Z',
            status: 'approved'
        }
    ],
    topOpportunities: [
        {
            clientName: 'Global Manufacturing Ltd',
            potentialSavings: 125000,
            productCategory: 'sweep'
        },
        {
            clientName: 'TechStart Solutions',
            potentialSavings: 85000,
            productCategory: 'zba'
        },
        {
            clientName: 'Regional Retail Chain',
            potentialSavings: 65000,
            productCategory: 'rdc'
        }
    ]
};

// Mock API delay utility (reuse from existing mockData.ts pattern)
export const mockApiDelay = (ms: number = 1500): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
