import { PrismaClient, Role } from '../generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin',
            password: adminPassword,
            role: Role.ADMIN,
            isEmailVerified: true
        }
    });

    console.log('✅ Created admin user:', admin.email);

    // Create sample clients
    const client1 = await prisma.client.upsert({
        where: { id: 'sample-client-1' },
        update: {},
        create: {
            id: 'sample-client-1',
            name: 'ACME Corporation',
            accountIds: ['ACC-001', 'ACC-002'],
            relationshipManager: 'Sarah Johnson',
            status: 'active'
        }
    });

    const client2 = await prisma.client.upsert({
        where: { id: 'sample-client-2' },
        update: {},
        create: {
            id: 'sample-client-2',
            name: 'Global Manufacturing Ltd',
            accountIds: ['ACC-003', 'ACC-004', 'ACC-005'],
            relationshipManager: 'Michael Chen',
            status: 'active'
        }
    });

    const client3 = await prisma.client.upsert({
        where: { id: 'sample-client-3' },
        update: {},
        create: {
            id: 'sample-client-3',
            name: 'Tech Innovations Inc',
            accountIds: ['ACC-006'],
            relationshipManager: 'Emma Davis',
            status: 'inactive'
        }
    });

    console.log('✅ Created sample clients:', client1.name, client2.name, client3.name);

    // Create sample treasury products
    const product1 = await prisma.treasuryProduct.upsert({
        where: { name: 'Automated Investment Sweep' },
        update: {},
        create: {
            name: 'Automated Investment Sweep',
            category: 'sweep',
            description: 'Automatically sweep idle balances into interest-bearing accounts',
            features: ['Automatic daily sweeping', 'Customizable thresholds', 'Real-time monitoring'],
            eligibilityRules: {
                minBalance: 250000,
                accountTypes: ['Operating', 'Money Market']
            },
            benefits: {
                yieldImprovement: 2.5,
                annualSavings: 'Variable based on balance'
            },
            pricing: {
                setupFee: 500,
                monthlyFee: 150,
                basisPoints: 15
            },
            isActive: true
        }
    });

    const product2 = await prisma.treasuryProduct.upsert({
        where: { name: 'Zero Balance Account' },
        update: {},
        create: {
            name: 'Zero Balance Account',
            category: 'zba',
            description: 'Centralized cash management with automatic balance transfers',
            features: ['Centralized cash pooling', 'Automatic transfers', 'Enhanced reporting'],
            eligibilityRules: {
                minBalance: 500000,
                accountTypes: ['Operating', 'Payroll', 'Tax']
            },
            benefits: {
                yieldImprovement: 1.8,
                operationalEfficiency: 'High'
            },
            pricing: {
                setupFee: 1000,
                monthlyFee: 250,
                basisPoints: 10
            },
            isActive: true
        }
    });

    const product3 = await prisma.treasuryProduct.upsert({
        where: { name: 'Money Market Account Plus' },
        update: {},
        create: {
            name: 'Money Market Account Plus',
            category: 'deposit',
            description: 'High-yield money market account with tiered interest rates and check writing privileges',
            features: ['Tiered interest rates', 'Check writing privileges', 'Online banking', 'Mobile deposit'],
            eligibilityRules: {
                minBalance: 100000,
                accountTypes: ['Operating', 'Investment']
            },
            benefits: {
                yieldImprovement: 3.2,
                liquidity: 'High',
                fdic_insured: true
            },
            pricing: {
                setupFee: 0,
                monthlyFee: 50,
                basisPoints: 0,
                transactionFees: {
                    checks: 0,
                    transfers: 2.5
                }
            },
            isActive: true
        }
    });

    const product4 = await prisma.treasuryProduct.upsert({
        where: { name: 'Automated ACH Management' },
        update: {},
        create: {
            name: 'Automated ACH Management',
            category: 'payment',
            description: 'Streamlined ACH processing with fraud protection and reconciliation tools',
            features: ['Batch ACH processing', 'Fraud detection', 'Automated reconciliation', 'Same-day ACH'],
            eligibilityRules: {
                minBalance: 1000000,
                accountTypes: ['Operating', 'Payroll'],
                monthlyVolume: 500
            },
            benefits: {
                costReduction: 35,
                processingTime: '1-2 business days',
                securityLevel: 'Enterprise'
            },
            pricing: {
                setupFee: 750,
                monthlyFee: 200,
                perTransactionFee: 0.25,
                basisPoints: 0
            },
            isActive: true
        }
    });

    const product5 = await prisma.treasuryProduct.upsert({
        where: { name: 'Certificate of Deposit Ladder' },
        update: {},
        create: {
            name: 'Certificate of Deposit Ladder',
            category: 'investment',
            description: 'Structured CD ladder program to optimize yield while maintaining liquidity access',
            features: [
                'Staggered maturity dates',
                'Competitive rates',
                'Auto-renewal options',
                'Early withdrawal protection'
            ],
            eligibilityRules: {
                minBalance: 2000000,
                accountTypes: ['Investment', 'Reserve']
            },
            benefits: {
                yieldImprovement: 4.5,
                principalProtection: true,
                liquidity: 'Structured'
            },
            pricing: {
                setupFee: 1500,
                monthlyFee: 0,
                basisPoints: 5,
                penaltyProtection: true
            },
            isActive: true
        }
    });

    const product6 = await prisma.treasuryProduct.upsert({
        where: { name: 'Commercial Lockbox Service' },
        update: {},
        create: {
            name: 'Commercial Lockbox Service',
            category: 'collection',
            description: 'Automated receivables processing to accelerate cash flow and reduce processing costs',
            features: ['Mail processing', 'Image capture', 'Data extraction', 'Exception handling'],
            eligibilityRules: {
                minBalance: 750000,
                accountTypes: ['Operating'],
                monthlyDeposits: 100
            },
            benefits: {
                acceleratedCashFlow: '1-2 days',
                costReduction: 45,
                errorReduction: 90
            },
            pricing: {
                setupFee: 2000,
                monthlyFee: 300,
                perItemFee: 0.35,
                basisPoints: 0
            },
            isActive: true
        }
    });

    console.log(
        '✅ Created sample treasury products:',
        product1.name,
        product2.name,
        product3.name,
        product4.name,
        product5.name,
        product6.name
    );

    // Create sample analyses
    const analysis1 = await prisma.analysis.upsert({
        where: { id: 'sample-analysis-1' },
        update: {},
        create: {
            id: 'sample-analysis-1',
            clientId: client1.id,
            statementFileIds: ['file-001', 'file-002'],
            status: 'completed',
            summary: {
                totalInflow: 875000,
                totalOutflow: 650000,
                netCashFlow: 225000,
                avgDailyBalance: 456000,
                transactionCount: 156,
                dateRange: {
                    startDate: '2024-09-01T00:00:00Z',
                    endDate: '2024-09-30T00:00:00Z'
                }
            },
            liquidityMetrics: {
                avgDailyBalance: 456000,
                minBalance: 385000,
                maxBalance: 525000,
                volatility: 0.15,
                liquidityRatio: 2.8
            },
            spendingBreakdown: [
                {
                    category: 'Payroll',
                    amount: 245000,
                    percentage: 37.7,
                    transactionCount: 8
                }
            ],
            idleBalanceAnalysis: {
                avgIdleAmount: 185000,
                daysWithIdleBalance: 22,
                threshold: 250000,
                potentialYieldGain: 125000
            }
        }
    });

    const analysis2 = await prisma.analysis.upsert({
        where: { id: 'sample-analysis-2' },
        update: {},
        create: {
            id: 'sample-analysis-2',
            clientId: client2.id,
            statementFileIds: ['file-003'],
            status: 'processing',
            summary: {
                totalInflow: 1200000,
                totalOutflow: 980000,
                netCashFlow: 220000,
                avgDailyBalance: 650000,
                transactionCount: 245,
                dateRange: {
                    startDate: '2024-09-01T00:00:00Z',
                    endDate: '2024-09-30T00:00:00Z'
                }
            },
            liquidityMetrics: {
                avgDailyBalance: 650000,
                minBalance: 520000,
                maxBalance: 780000,
                volatility: 0.12,
                liquidityRatio: 3.2
            },
            spendingBreakdown: [
                {
                    category: 'Operations',
                    amount: 420000,
                    percentage: 42.9,
                    transactionCount: 45
                }
            ],
            idleBalanceAnalysis: {
                avgIdleAmount: 275000,
                daysWithIdleBalance: 18,
                threshold: 300000,
                potentialYieldGain: 85000
            }
        }
    });

    console.log('✅ Created sample analyses:', analysis1.id, analysis2.id);

    // Create sample recommendations
    const recommendation1 = await prisma.recommendation.upsert({
        where: { id: 'sample-rec-1' },
        update: {},
        create: {
            id: 'sample-rec-1',
            analysisId: analysis1.id,
            productId: product1.id,
            priority: 'high',
            rationale:
                'Client maintains average idle balances of $185,000 for 22 days per month, well above the sweep threshold',
            dataPoints: [
                'Average idle balance: $185,000',
                '22 days per month above threshold',
                'Current yield opportunity: $125,000 annually'
            ],
            benefitProjection: {
                annualYieldIncrease: 125000,
                paybackPeriod: 3,
                roi: 250.5,
                implementationTime: '2-3 weeks'
            },
            status: 'pending'
        }
    });

    const recommendation2 = await prisma.recommendation.upsert({
        where: { id: 'sample-rec-2' },
        update: {},
        create: {
            id: 'sample-rec-2',
            analysisId: analysis2.id,
            productId: product2.id,
            priority: 'medium',
            rationale:
                'Multiple account structure with significant cash flows could benefit from centralized management',
            dataPoints: [
                'Multiple operating accounts: 3',
                'Average daily balance: $650,000',
                'Monthly cash flow volatility: 12%'
            ],
            benefitProjection: {
                annualYieldIncrease: 85000,
                paybackPeriod: 4,
                roi: 85.2,
                implementationTime: '4-6 weeks'
            },
            status: 'pending'
        }
    });

    const recommendation3 = await prisma.recommendation.upsert({
        where: { id: 'sample-rec-3' },
        update: {},
        create: {
            id: 'sample-rec-3',
            analysisId: analysis1.id,
            productId: product2.id,
            priority: 'low',
            rationale: 'Secondary recommendation for enhanced cash management efficiency',
            dataPoints: ['Current account structure: Basic', 'Potential efficiency gains: Moderate'],
            benefitProjection: {
                annualYieldIncrease: 275000,
                paybackPeriod: 6,
                roi: 137.5,
                implementationTime: '6-8 weeks'
            },
            status: 'pending'
        }
    });

    console.log('✅ Created sample recommendations:', recommendation1.id, recommendation2.id, recommendation3.id);

    // Create sample statement files
    const statementFile1 = await prisma.statementFile.upsert({
        where: { id: 'sample-statement-1' },
        update: {},
        create: {
            id: 'sample-statement-1',
            filename: 'acme_statement_sep_2024.csv',
            type: 'text/csv',
            size: 15420,
            clientId: client1.id,
            status: 'parsed'
        }
    });

    const statementFile2 = await prisma.statementFile.upsert({
        where: { id: 'sample-statement-2' },
        update: {},
        create: {
            id: 'sample-statement-2',
            filename: 'global_mfg_statement_sep_2024.pdf',
            type: 'application/pdf',
            size: 2856740,
            clientId: client2.id,
            status: 'uploaded'
        }
    });

    console.log('✅ Created sample statement files:', statementFile1.filename, statementFile2.filename);

    // Create sample parse results
    const parseResult1 = await prisma.parseResult.upsert({
        where: { id: 'sample-parse-1' },
        update: {},
        create: {
            id: 'sample-parse-1',
            statementFileId: statementFile1.id,
            totalTransactions: 156,
            dateRangeStart: new Date('2024-09-01T00:00:00Z'),
            dateRangeEnd: new Date('2024-09-30T00:00:00Z'),
            accounts: [
                {
                    accountNumber: 'ACC-001',
                    accountName: 'Operating Account',
                    accountType: 'Checking',
                    openingBalance: 385000,
                    closingBalance: 456000,
                    transactions: [
                        {
                            date: new Date('2024-09-15T00:00:00Z'),
                            description: 'Payroll Deposit',
                            amount: 125000,
                            type: 'credit',
                            balance: 510000,
                            category: 'Payroll'
                        },
                        {
                            date: new Date('2024-09-16T00:00:00Z'),
                            description: 'Supplier Payment',
                            amount: 45000,
                            type: 'debit',
                            balance: 465000,
                            category: 'Operations'
                        }
                    ]
                }
            ],
            status: 'completed',
            errors: null as any
        }
    });

    console.log('✅ Created sample parse results:', parseResult1.id);

    // Create default system configuration
    const defaultConfigs = [
        { key: 'thresholds.idleCashThreshold', value: 100000 },
        { key: 'thresholds.liquidityWarningThreshold', value: 50000 },
        { key: 'thresholds.lowBalanceThreshold', value: 10000 },
        { key: 'thresholds.highRiskThreshold', value: 500000 },
        { key: 'features.enableAutoAnalysis', value: true },
        { key: 'features.enableEmailNotifications', value: true },
        { key: 'features.enableRecommendationEngine', value: true },
        { key: 'features.enableAdvancedReports', value: false },
        { key: 'integrations.bankApiEnabled', value: false },
        { key: 'integrations.webhooksEnabled', value: false },
        { key: 'integrations.apiRateLimit', value: 1000 },
        { key: 'integrations.maxFileSize', value: 25 },
        { key: 'security.sessionTimeout', value: 60 },
        { key: 'security.passwordExpiry', value: 90 },
        { key: 'security.requireMfa', value: false },
        { key: 'security.auditLogRetention', value: 365 }
    ];

    for (const config of defaultConfigs) {
        await prisma.systemConfig.upsert({
            where: { configKey: config.key },
            update: {},
            create: {
                configKey: config.key,
                configValue: config.value,
                updatedBy: 'system'
            }
        });
    }

    console.log('✅ Created default system configuration');
}

main()
    .catch(e => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
