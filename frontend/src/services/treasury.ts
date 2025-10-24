import { api } from '@/lib/api';
import { mockApiDelay } from '@/lib/utils';
import {
    mockAnalysisData,
    mockClients,
    mockDashboardMetrics,
    mockParseResult,
    mockRecommendations,
    mockTreasuryProducts,
    mockTransactions,
    mockUploadStatus,
    mockReportHistory,
    mockReportTemplates
} from '@/data/treasuryMockData';
import type {
    AnalysisData,
    AnalyzeStatementRequest,
    AuditEntry,
    AuditLogsRequest,
    AuditLogsResponse,
    Client,
    CreateReportRequest,
    DashboardMetrics,
    GenerateRecommendationsRequest,
    ParseResult,
    Recommendation,
    ReportListResponse,
    ReportTemplate,
    SystemConfig,
    Transaction,
    TreasuryProduct,
    UploadStatementRequest,
    UploadStatus
} from '@/types/treasury';

export const treasuryService = {
    // Dashboard
    getDashboardMetrics: async (): Promise<DashboardMetrics> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getDashboardMetrics ---');
            await mockApiDelay();
            return mockDashboardMetrics;
        }
        const response = await api.get('/dashboard/metrics');
        return response.data;
    },

    // Client Management
    getClients: async (): Promise<Client[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getClients ---');
            await mockApiDelay();
            return mockClients;
        }
        const response = await api.get('/clients');
        return response.data;
    },

    getClientById: async (clientId: string): Promise<Client> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getClientById ---', clientId);
            await mockApiDelay();
            const client = mockClients.find(c => c.id === clientId);
            if (!client) throw new Error('Client not found');
            return client;
        }
        const response = await api.get(`/clients/${clientId}`);
        return response.data;
    },

    createClient: async (clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: createClient ---', clientData);
            await mockApiDelay();
            return {
                ...clientData,
                id: `client-${Date.now()}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
        }
        const response = await api.post('/clients', clientData);
        return response.data;
    },

    // Statement Upload & Processing
    uploadStatements: async (request: UploadStatementRequest): Promise<UploadStatus[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: uploadStatements ---', request);
            await mockApiDelay();
            return request.files.map((file, index) => ({
                ...mockUploadStatus,
                id: `upload-${Date.now()}-${index}`,
                filename: file.name,
                status: 'completed' as const
            }));
        }
        const formData = new FormData();
        formData.append('clientId', request.clientId);
        request.files.forEach((file, index) => {
            formData.append(`files[${index}]`, file);
        });
        const response = await api.post('/statements/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    getUploadStatus: async (uploadId: string): Promise<UploadStatus> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getUploadStatus ---', uploadId);
            await mockApiDelay();
            return { ...mockUploadStatus, id: uploadId };
        }
        const response = await api.get(`/statements/upload/${uploadId}/status`);
        return response.data;
    },

    parseStatements: async (statementFileIds: string[]): Promise<ParseResult[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: parseStatements ---', statementFileIds);
            await mockApiDelay(3000); // Longer delay for parsing simulation
            return statementFileIds.map((fileId, index) => ({
                ...mockParseResult,
                id: `parse-${Date.now()}-${index}`,
                statementFileId: fileId
            }));
        }
        const response = await api.post('/statements/parse', { statementFileIds });
        return response.data;
    },

    // Analysis
    analyzeStatements: async (request: AnalyzeStatementRequest): Promise<AnalysisData> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: analyzeStatements ---', request);
            await mockApiDelay(4000); // Longer delay for analysis simulation
            return {
                ...mockAnalysisData,
                id: `analysis-${Date.now()}`,
                clientId: request.clientId,
                statementFileIds: request.statementFileIds,
                createdAt: new Date().toISOString()
            };
        }
        const response = await api.post('/statements/analyze', request);
        return response.data;
    },

    getAnalysis: async (analysisId: string): Promise<AnalysisData> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getAnalysis ---', analysisId);
            await mockApiDelay();
            return { ...mockAnalysisData, id: analysisId };
        }
        const response = await api.get(`/analysis/${analysisId}`);
        return response.data;
    },

    getAnalysisTransactions: async (
        analysisId: string,
        page: number = 1,
        limit: number = 50
    ): Promise<{
        transactions: Transaction[];
        totalCount: number;
        page: number;
        totalPages: number;
    }> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getAnalysisTransactions ---', analysisId, page, limit);
            await mockApiDelay();
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedTransactions = mockTransactions.slice(startIndex, endIndex);

            return {
                transactions: paginatedTransactions,
                totalCount: mockTransactions.length,
                page,
                totalPages: Math.ceil(mockTransactions.length / limit)
            };
        }
        const response = await api.get(`/analysis/${analysisId}/transactions?page=${page}&limit=${limit}`);
        return response.data;
    },

    // Treasury Products & Recommendations
    getTreasuryProducts: async (): Promise<TreasuryProduct[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getTreasuryProducts ---');
            await mockApiDelay();
            return mockTreasuryProducts;
        }
        const response = await api.get('/products');
        return response.data;
    },

    generateRecommendations: async (request: GenerateRecommendationsRequest): Promise<Recommendation[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: generateRecommendations ---', request);
            await mockApiDelay(3000);
            return mockRecommendations.map(rec => ({
                ...rec,
                analysisId: request.analysisId
            }));
        }
        const response = await api.post('/recommendations/generate', request);
        return response.data;
    },

    getRecommendations: async (analysisId: string): Promise<Recommendation[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getRecommendations ---', analysisId);
            await mockApiDelay();
            return mockRecommendations.map(rec => ({
                ...rec,
                analysisId
            }));
        }
        const response = await api.get(`/recommendations?analysisId=${analysisId}`);
        return response.data;
    },

    approveRecommendation: async (recommendationId: string, approvedBy: string): Promise<Recommendation> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: approveRecommendation ---', recommendationId, approvedBy);
            await mockApiDelay();
            const recommendation = mockRecommendations.find(r => r.id === recommendationId);
            if (!recommendation) throw new Error('Recommendation not found');
            return {
                ...recommendation,
                status: 'approved',
                approvedBy,
                approvedAt: new Date().toISOString()
            };
        }
        const response = await api.put(`/recommendations/${recommendationId}/approve`, { approvedBy });
        return response.data;
    },

    rejectRecommendation: async (recommendationId: string): Promise<Recommendation> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: rejectRecommendation ---', recommendationId);
            await mockApiDelay();
            const recommendation = mockRecommendations.find(r => r.id === recommendationId);
            if (!recommendation) throw new Error('Recommendation not found');
            return {
                ...recommendation,
                status: 'rejected'
            };
        }
        const response = await api.put(`/recommendations/${recommendationId}/reject`);
        return response.data;
    },

    // Reports
    generateReport: async (request: CreateReportRequest): Promise<{ reportId: string; downloadUrl: string }> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: generateReport ---', request);
            await mockApiDelay(2000);
            return {
                reportId: `report-${Date.now()}`,
                downloadUrl: `/reports/download/report-${Date.now()}.${request.format}`
            };
        }
        const response = await api.post('/reports/generate', request);
        return response.data;
    },

    downloadReport: async (reportId: string): Promise<Blob> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: downloadReport ---', reportId);
            await mockApiDelay();
            // Return a mock PDF blob
            const mockPdfContent = 'Mock PDF Report Content';
            return new Blob([mockPdfContent], { type: 'application/pdf' });
        }
        const response = await api.get(`/reports/download/${reportId}`, {
            responseType: 'blob'
        });
        return response.data;
    },

    getReportHistory: async (page: number = 1, limit: number = 10, clientId?: string): Promise<ReportListResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getReportHistory ---', { page, limit, clientId });
            await mockApiDelay();

            let filteredReports = mockReportHistory;
            if (clientId) {
                filteredReports = mockReportHistory.filter(r => r.clientId === clientId);
            }

            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedReports = filteredReports.slice(startIndex, endIndex);

            return {
                reports: paginatedReports,
                totalCount: filteredReports.length,
                page,
                totalPages: Math.ceil(filteredReports.length / limit)
            };
        }
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString()
        });
        if (clientId) {
            queryParams.append('clientId', clientId);
        }
        const response = await api.get(`/reports/history?${queryParams}`);
        return response.data;
    },

    getReportTemplates: async (): Promise<ReportTemplate[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getReportTemplates ---');
            await mockApiDelay();
            return mockReportTemplates;
        }
        const response = await api.get('/reports/templates');
        return response.data;
    },

    deleteReport: async (reportId: string): Promise<void> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: deleteReport ---', reportId);
            await mockApiDelay();
            return;
        }
        await api.delete(`/reports/${reportId}`);
    },

    // Admin configuration endpoints
    getSystemConfig: async (): Promise<SystemConfig> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getSystemConfig ---');
            await mockApiDelay();
            return {
                thresholds: {
                    idleCashThreshold: 100000,
                    liquidityWarningThreshold: 50000,
                    lowBalanceThreshold: 10000,
                    highRiskThreshold: 500000
                },
                features: {
                    enableAutoAnalysis: true,
                    enableEmailNotifications: true,
                    enableRecommendationEngine: true,
                    enableAdvancedReports: true
                },
                integrations: {
                    bankApiEnabled: false,
                    webhooksEnabled: false,
                    apiRateLimit: 1000,
                    maxFileSize: 50
                },
                security: {
                    sessionTimeout: 60,
                    passwordExpiry: 90,
                    requireMfa: false,
                    auditLogRetention: 365
                }
            };
        }
        const response = await api.get('/admin/config');
        return response.data;
    },

    updateSystemConfig: async (config: SystemConfig): Promise<SystemConfig> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: updateSystemConfig ---', config);
            await mockApiDelay();
            return config;
        }
        const response = await api.put('/admin/config', config);
        return response.data;
    },

    resetConfigToDefaults: async (): Promise<SystemConfig> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: resetConfigToDefaults ---');
            await mockApiDelay();
            return {
                thresholds: {
                    idleCashThreshold: 100000,
                    liquidityWarningThreshold: 50000,
                    lowBalanceThreshold: 10000,
                    highRiskThreshold: 500000
                },
                features: {
                    enableAutoAnalysis: true,
                    enableEmailNotifications: true,
                    enableRecommendationEngine: true,
                    enableAdvancedReports: false
                },
                integrations: {
                    bankApiEnabled: false,
                    webhooksEnabled: false,
                    apiRateLimit: 1000,
                    maxFileSize: 25
                },
                security: {
                    sessionTimeout: 60,
                    passwordExpiry: 90,
                    requireMfa: false,
                    auditLogRetention: 365
                }
            };
        }
        const response = await api.post('/admin/config/reset');
        return response.data;
    },

    // Audit trail endpoints
    getAuditLogs: async (request: AuditLogsRequest = {}): Promise<AuditLogsResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getAuditLogs ---', request);
            await mockApiDelay();

            const mockAuditLogs: AuditEntry[] = [
                {
                    id: 'audit-1',
                    userId: 'user-1',
                    userName: 'John Admin',
                    userEmail: 'admin@example.com',
                    action: 'login',
                    resource: 'authentication',
                    details: 'User logged into the system',
                    severity: 'low',
                    ipAddress: '192.168.1.1',
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString()
                },
                {
                    id: 'audit-2',
                    userId: 'user-2',
                    userName: 'Jane User',
                    userEmail: 'user@example.com',
                    action: 'upload',
                    resource: 'statement',
                    resourceId: 'stmt-123',
                    details: 'Uploaded bank statement file: october_statement.pdf',
                    severity: 'medium',
                    ipAddress: '192.168.1.2',
                    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
                },
                {
                    id: 'audit-3',
                    userId: 'user-1',
                    userName: 'John Admin',
                    userEmail: 'admin@example.com',
                    action: 'config_change',
                    resource: 'system_config',
                    details: 'Updated idle cash threshold from $50,000 to $100,000',
                    severity: 'high',
                    ipAddress: '192.168.1.1',
                    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString()
                },
                {
                    id: 'audit-4',
                    userId: 'user-2',
                    userName: 'Jane User',
                    userEmail: 'user@example.com',
                    action: 'delete',
                    resource: 'report',
                    resourceId: 'rpt-456',
                    details: 'Deleted report: Q3 Analysis Summary',
                    severity: 'medium',
                    ipAddress: '192.168.1.2',
                    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString()
                },
                {
                    id: 'audit-5',
                    userId: 'user-3',
                    userName: 'Bob Manager',
                    userEmail: 'manager@example.com',
                    action: 'security',
                    resource: 'authentication',
                    details: 'Failed login attempt - incorrect password',
                    severity: 'high',
                    ipAddress: '192.168.1.100',
                    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString()
                }
            ];

            const page = request.page || 1;
            const limit = request.limit || 25;

            return {
                logs: mockAuditLogs,
                totalCount: mockAuditLogs.length,
                page,
                totalPages: Math.ceil(mockAuditLogs.length / limit)
            };
        }

        const queryParams = new URLSearchParams({
            page: (request.page || 1).toString(),
            limit: (request.limit || 25).toString()
        });

        if (request.search) queryParams.append('search', request.search);
        if (request.userId) queryParams.append('userId', request.userId);
        if (request.action) queryParams.append('action', request.action);
        if (request.dateFrom) queryParams.append('dateFrom', request.dateFrom);
        if (request.dateTo) queryParams.append('dateTo', request.dateTo);

        const response = await api.get(`/admin/audit?${queryParams}`);
        return response.data;
    },

    exportAuditLogs: async (request: AuditLogsRequest = {}): Promise<Blob> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: exportAuditLogs ---', request);
            await mockApiDelay();
            // In a real app, this would return a CSV blob
            const csvContent =
                'timestamp,user,action,resource,details,severity,ip_address\n2024-01-15T10:30:00Z,admin@example.com,login,authentication,User logged in,low,192.168.1.1';
            return new Blob([csvContent], { type: 'text/csv' });
        }

        const queryParams = new URLSearchParams();
        if (request.search) queryParams.append('search', request.search);
        if (request.userId) queryParams.append('userId', request.userId);
        if (request.action) queryParams.append('action', request.action);
        if (request.dateFrom) queryParams.append('dateFrom', request.dateFrom);
        if (request.dateTo) queryParams.append('dateTo', request.dateTo);

        const response = await api.get(`/admin/audit/export?${queryParams}`, {
            responseType: 'blob'
        });
        return response.data;
    }
};
