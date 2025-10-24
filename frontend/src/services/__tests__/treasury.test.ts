import { describe, it, expect, vi, beforeEach } from 'vitest';
import { treasuryService } from '../treasury';
import { mockDashboardMetrics, mockClients, mockAnalysisData, mockTreasuryProducts } from '../../data/treasuryMockData';

// Mock the environment variable
Object.defineProperty(import.meta, 'env', {
    value: {
        VITE_USE_MOCK_DATA: 'true'
    },
    writable: true
});

describe('treasuryService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Ensure we're using mock data for tests
        import.meta.env.VITE_USE_MOCK_DATA = 'true';
    });

    describe('getDashboardMetrics', () => {
        it('returns dashboard metrics', async () => {
            const metrics = await treasuryService.getDashboardMetrics();

            expect(metrics).toEqual(mockDashboardMetrics);
            expect(metrics.totalClients).toBe(47);
            expect(metrics.activeAnalyses).toBe(12);
            expect(metrics.pendingRecommendations).toBe(28);
            expect(metrics.totalPotentialSavings).toBe(485000);
        });

        it('includes recent activity and top opportunities', async () => {
            const metrics = await treasuryService.getDashboardMetrics();

            expect(metrics.recentActivity).toBeDefined();
            expect(metrics.recentActivity.length).toBeGreaterThan(0);
            expect(metrics.topOpportunities).toBeDefined();
            expect(metrics.topOpportunities.length).toBeGreaterThan(0);
        });
    });

    describe('getClients', () => {
        it('returns list of clients', async () => {
            const clients = await treasuryService.getClients();

            expect(clients).toEqual(mockClients);
            expect(clients.length).toBe(3);
            expect(clients[0].name).toBe('ACME Corporation');
        });

        it('returns clients with proper structure', async () => {
            const clients = await treasuryService.getClients();

            clients.forEach(client => {
                expect(client).toHaveProperty('id');
                expect(client).toHaveProperty('name');
                expect(client).toHaveProperty('accountIds');
                expect(client).toHaveProperty('relationshipManager');
                expect(client).toHaveProperty('status');
                expect(['active', 'pending', 'inactive']).toContain(client.status);
            });
        });
    });

    describe('getClientById', () => {
        it('returns specific client by ID', async () => {
            const client = await treasuryService.getClientById('1');

            expect(client.id).toBe('1');
            expect(client.name).toBe('ACME Corporation');
            expect(client.relationshipManager).toBe('Sarah Johnson');
        });

        it('throws error for non-existent client', async () => {
            await expect(treasuryService.getClientById('999')).rejects.toThrow('Request failed with status code 404');
        });
    });

    describe('createClient', () => {
        it('creates new client with generated ID', async () => {
            const clientData = {
                name: 'Test Corp',
                accountIds: ['TEST-001'],
                relationshipManager: 'John Doe',
                status: 'active' as const
            };

            const newClient = await treasuryService.createClient(clientData);

            expect(newClient.name).toBe('Test Corp');
            expect(newClient.id).toMatch(/^client-\d+$/);
            expect(newClient.createdAt).toBeDefined();
            expect(newClient.updatedAt).toBeDefined();
        });
    });

    describe('uploadStatements', () => {
        it.skip('handles file upload request', async () => {
            const files = [
                new File(['content1'], 'statement1.pdf', { type: 'application/pdf' }),
                new File(['content2'], 'statement2.csv', { type: 'text/csv' })
            ];

            const uploadRequest = {
                clientId: '1',
                files
            };

            const results = await treasuryService.uploadStatements(uploadRequest);

            expect(results.length).toBe(2);
            expect(results[0].filename).toBe('statement1.pdf');
            expect(results[1].filename).toBe('statement2.csv');
            expect(results[0].status).toBe('completed');
        }, 10000);
    });

    describe('parseStatements', () => {
        it('parses uploaded statement files', async () => {
            const fileIds = ['file1', 'file2'];
            const parseResults = await treasuryService.parseStatements(fileIds);

            expect(parseResults.length).toBe(2);
            expect(parseResults[0].statementFileId).toBe('file1');
            expect(parseResults[1].statementFileId).toBe('file2');
            expect(parseResults[0].status).toBe('success');
        });

        it('returns transaction counts and date ranges', async () => {
            const fileIds = ['file1'];
            const parseResults = await treasuryService.parseStatements(fileIds);

            expect(parseResults[0].totalTransactions).toBe(156);
            expect(parseResults[0].dateRange.startDate).toBeDefined();
            expect(parseResults[0].dateRange.endDate).toBeDefined();
        });
    });

    describe('analyzeStatements', () => {
        it('analyzes parsed statements', async () => {
            const analyzeRequest = {
                statementFileIds: ['file1'],
                clientId: '1'
            };

            const analysis = await treasuryService.analyzeStatements(analyzeRequest);

            expect(analysis.clientId).toBe('1');
            expect(analysis.statementFileIds).toEqual(['file1']);
            expect(analysis.status).toBe('completed');
            expect(analysis.summary).toBeDefined();
            expect(analysis.liquidityMetrics).toBeDefined();
        });

        it('includes comprehensive analysis data', async () => {
            const analyzeRequest = {
                statementFileIds: ['file1'],
                clientId: '1'
            };

            const analysis = await treasuryService.analyzeStatements(analyzeRequest);

            expect(analysis.summary.totalInflow).toBe(875000);
            expect(analysis.summary.totalOutflow).toBe(650000);
            expect(analysis.summary.netCashFlow).toBe(225000);
            expect(analysis.spendingBreakdown.length).toBeGreaterThan(0);
            expect(analysis.idleBalanceAnalysis).toBeDefined();
        });
    });

    describe('getAnalysis', () => {
        it('retrieves analysis by ID', async () => {
            const analysis = await treasuryService.getAnalysis('analysis-1');

            expect(analysis.id).toBe('analysis-1');
            expect(analysis).toEqual(
                expect.objectContaining({
                    ...mockAnalysisData,
                    id: 'analysis-1'
                })
            );
        });
    });

    describe('getAnalysisTransactions', () => {
        it('returns paginated transactions', async () => {
            const result = await treasuryService.getAnalysisTransactions('analysis-1', 1, 10);

            expect(result.transactions).toBeDefined();
            expect(result.totalCount).toBeDefined();
            expect(result.page).toBe(1);
            expect(result.totalPages).toBeDefined();
        });

        it('respects pagination parameters', async () => {
            const result = await treasuryService.getAnalysisTransactions('analysis-1', 2, 5);

            expect(result.page).toBe(2);
            expect(result.transactions.length).toBeLessThanOrEqual(5);
        });
    });

    describe('getTreasuryProducts', () => {
        it('returns available treasury products', async () => {
            const products = await treasuryService.getTreasuryProducts();

            expect(products).toEqual(mockTreasuryProducts);
            expect(products.length).toBe(4);
            expect(products[0].name).toBe('Automated Investment Sweep');
        });

        it('includes product eligibility and benefits', async () => {
            const products = await treasuryService.getTreasuryProducts();

            products.forEach(product => {
                expect(product).toHaveProperty('eligibilityRules');
                expect(product).toHaveProperty('benefits');
                expect(product).toHaveProperty('pricing');
                expect(['sweep', 'zba', 'merchant', 'lockbox', 'rdc', 'disbursement']).toContain(product.category);
            });
        });
    });

    describe('generateRecommendations', () => {
        it('generates recommendations for analysis', async () => {
            const request = {
                analysisId: 'analysis-1'
            };

            const recommendations = await treasuryService.generateRecommendations(request);

            expect(recommendations.length).toBe(3);
            expect(recommendations[0].analysisId).toBe('analysis-1');
            expect(recommendations[0].status).toBe('pending');
        });

        it('includes rationale and benefit projections', async () => {
            const request = {
                analysisId: 'analysis-1'
            };

            const recommendations = await treasuryService.generateRecommendations(request);

            recommendations.forEach(rec => {
                expect(rec.rationale).toBeDefined();
                expect(rec.benefitProjection).toBeDefined();
                expect(rec.dataPoints).toBeDefined();
                expect(['high', 'medium', 'low']).toContain(rec.priority);
            });
        });
    });

    describe('getRecommendations', () => {
        it('retrieves recommendations for analysis', async () => {
            const recommendations = await treasuryService.getRecommendations('analysis-1');

            expect(recommendations.length).toBe(3);
            expect(recommendations[0].analysisId).toBe('analysis-1');
        });
    });

    describe('approveRecommendation', () => {
        it('approves recommendation with approver info', async () => {
            const approved = await treasuryService.approveRecommendation('rec-1', 'john.doe');

            expect(approved.status).toBe('approved');
            expect(approved.approvedBy).toBe('john.doe');
            expect(approved.approvedAt).toBeDefined();
        });

        it('throws error for non-existent recommendation', async () => {
            await expect(treasuryService.approveRecommendation('non-existent', 'user')).rejects.toThrow(
                'Request failed with status code 404'
            );
        });
    });

    describe('rejectRecommendation', () => {
        it('rejects recommendation', async () => {
            const rejected = await treasuryService.rejectRecommendation('rec-1');

            expect(rejected.status).toBe('rejected');
        });
    });

    describe('generateReport', () => {
        it('generates report with download URL', async () => {
            const request = {
                analysisId: 'analysis-1',
                format: 'pdf' as const,
                template: 'standard' as const
            };

            const result = await treasuryService.generateReport(request);

            expect(result.reportId).toMatch(/^report-\d+$/);
            expect(result.downloadUrl).toMatch(/^\/reports\/download\/report-\d+\.pdf$/);
        });
    });

    describe('downloadReport', () => {
        it('returns report blob', async () => {
            const blob = await treasuryService.downloadReport('report-123');

            expect(blob).toBeInstanceOf(Blob);
            expect(blob.type).toBe('application/pdf');
        });
    });
});
