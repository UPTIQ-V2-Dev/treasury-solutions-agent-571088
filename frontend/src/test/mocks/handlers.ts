import { http, HttpResponse } from 'msw';
import {
    mockClients,
    mockDashboardMetrics,
    mockAnalysisData,
    mockTreasuryProducts,
    mockRecommendations,
    mockReportHistory,
    mockReportTemplates
} from '@/data/treasuryMockData';

export const handlers = [
    // Dashboard metrics
    http.get('/api/v1/dashboard/metrics', () => {
        return HttpResponse.json(mockDashboardMetrics);
    }),

    // Clients
    http.get('/api/v1/clients', () => {
        return HttpResponse.json(mockClients);
    }),

    http.get('/api/v1/clients/:id', ({ params }) => {
        const client = mockClients.find(c => c.id === params.id);
        if (!client) {
            return new HttpResponse(null, { status: 404 });
        }
        return HttpResponse.json(client);
    }),

    http.post('/api/v1/clients', async ({ request }) => {
        const clientData = (await request.json()) as any;
        const newClient = {
            ...clientData,
            id: `client-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        return HttpResponse.json(newClient, { status: 201 });
    }),

    // Statement upload
    http.post('/api/v1/statements/upload', async ({ request }) => {
        const formData = await request.formData();
        formData.get('clientId'); // Just access to avoid unused variable warning

        // Get all files from formData with the pattern files[0], files[1], etc.
        const files: File[] = [];
        for (const [key, value] of formData.entries()) {
            if (key.startsWith('files[') && value instanceof File) {
                files.push(value);
            }
        }

        // Simulate file upload results for each file
        const uploadResults =
            files.length > 0
                ? files.map((file, index) => ({
                      id: `upload-${index + 1}`,
                      status: 'completed' as const,
                      progress: 100,
                      filename: file.name
                  }))
                : [
                      {
                          id: 'upload-1',
                          status: 'completed' as const,
                          progress: 100,
                          filename: 'test-statement.pdf'
                      }
                  ];

        return HttpResponse.json(uploadResults);
    }),

    http.post('/api/v1/statements/parse', async ({ request }) => {
        const { statementFileIds } = (await request.json()) as any;

        const parseResults = statementFileIds.map((fileId: string) => ({
            id: `parse-${Date.now()}`,
            statementFileId: fileId,
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
            status: 'success' as const
        }));

        return HttpResponse.json(parseResults);
    }),

    // Analysis
    http.post('/api/v1/statements/analyze', async ({ request }) => {
        const analyzeRequest = (await request.json()) as any;
        const analysisResult = {
            ...mockAnalysisData,
            id: `analysis-${Date.now()}`,
            clientId: analyzeRequest.clientId,
            statementFileIds: analyzeRequest.statementFileIds,
            createdAt: new Date().toISOString()
        };

        return HttpResponse.json(analysisResult);
    }),

    http.get('/api/v1/analysis/:id', ({ params }) => {
        return HttpResponse.json({ ...mockAnalysisData, id: params.id });
    }),

    http.get('/api/v1/analysis/:id/transactions', ({ params, request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '50');

        // Mock paginated transactions
        const mockTransactions = Array.from({ length: 20 }, (_, i) => ({
            id: `txn-${i + 1}`,
            date: new Date(2024, 9, i + 1).toISOString(),
            amount: (Math.random() - 0.5) * 50000,
            type: ['credit', 'debit', 'wire', 'ach'][Math.floor(Math.random() * 4)] as any,
            category: ['Payroll', 'Vendor Payment', 'Customer Payment', 'Utilities'][Math.floor(Math.random() * 4)],
            description: `Transaction ${i + 1}`,
            balanceAfter: 450000 + (Math.random() - 0.5) * 100000,
            accountId: 'ACC-001'
        }));

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedTransactions = mockTransactions.slice(startIndex, endIndex);

        return HttpResponse.json({
            transactions: paginatedTransactions,
            totalCount: mockTransactions.length,
            page,
            totalPages: Math.ceil(mockTransactions.length / limit)
        });
    }),

    // Treasury products
    http.get('/api/v1/products', () => {
        return HttpResponse.json(mockTreasuryProducts);
    }),

    // Recommendations
    http.post('/api/v1/recommendations/generate', async ({ request }) => {
        const generateRequest = (await request.json()) as any;
        const recommendations = mockRecommendations.map(rec => ({
            ...rec,
            analysisId: generateRequest.analysisId
        }));

        return HttpResponse.json(recommendations);
    }),

    http.get('/api/v1/recommendations', ({ request }) => {
        const url = new URL(request.url);
        const analysisId = url.searchParams.get('analysisId');

        const recommendations = mockRecommendations.map(rec => ({
            ...rec,
            analysisId: analysisId || rec.analysisId
        }));

        return HttpResponse.json(recommendations);
    }),

    http.put('/api/v1/recommendations/:id/approve', async ({ params, request }) => {
        const { approvedBy } = (await request.json()) as any;
        const recommendation = mockRecommendations.find(r => r.id === params.id);

        if (!recommendation) {
            return new HttpResponse(null, { status: 404 });
        }

        return HttpResponse.json({
            ...recommendation,
            status: 'approved' as const,
            approvedBy,
            approvedAt: new Date().toISOString()
        });
    }),

    http.put('/api/v1/recommendations/:id/reject', async ({ params, request }) => {
        const recommendation = mockRecommendations.find(r => r.id === params.id);

        if (!recommendation) {
            return new HttpResponse(null, { status: 404 });
        }

        // Try to parse body, but don't fail if it's empty
        let rejectedBy = 'test-user';
        let reason = 'Test rejection';
        try {
            const body = await request.json();
            if (body.rejectedBy) rejectedBy = body.rejectedBy;
            if (body.reason) reason = body.reason;
        } catch {
            // Ignore parsing errors
        }

        return HttpResponse.json({
            ...recommendation,
            status: 'rejected' as const,
            rejectedBy,
            rejectionReason: reason,
            rejectedAt: new Date().toISOString()
        });
    }),

    // Reports
    http.post('/api/v1/reports/generate', async ({ request }) => {
        const reportRequest = (await request.json()) as any;

        return HttpResponse.json({
            reportId: `report-${Date.now()}`,
            downloadUrl: `/reports/download/report-${Date.now()}.${reportRequest.format}`
        });
    }),

    http.get('/api/v1/reports/download/:reportId', ({ params }) => {
        const mockPdfContent = 'Mock PDF Report Content';
        return HttpResponse.text(mockPdfContent, {
            headers: {
                'Content-Type': 'application/pdf'
            }
        });
    }),

    // Report History
    http.get('/api/v1/reports/history', ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '10');
        const clientId = url.searchParams.get('clientId');

        let filteredReports = mockReportHistory;
        if (clientId) {
            filteredReports = mockReportHistory.filter(r => r.clientId === clientId);
        }

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedReports = filteredReports.slice(startIndex, endIndex);

        return HttpResponse.json({
            reports: paginatedReports,
            totalCount: filteredReports.length,
            page,
            totalPages: Math.ceil(filteredReports.length / limit)
        });
    }),

    // Report Templates
    http.get('/api/v1/reports/templates', () => {
        return HttpResponse.json(mockReportTemplates);
    }),

    // Delete Report
    http.delete('/api/v1/reports/:reportId', ({ params }) => {
        return new HttpResponse(null, { status: 204 });
    })
];
