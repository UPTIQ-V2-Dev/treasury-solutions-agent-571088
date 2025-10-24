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
    mockUploadStatus
} from '@/data/treasuryMockData';
import type {
    AnalysisData,
    AnalyzeStatementRequest,
    Client,
    CreateReportRequest,
    DashboardMetrics,
    GenerateRecommendationsRequest,
    ParseResult,
    Recommendation,
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
    }
};
