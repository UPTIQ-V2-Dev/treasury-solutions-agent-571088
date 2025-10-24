import dashboardController from "../controllers/dashboard.controller.js";
import { dashboardService } from "../services/index.js";
import httpStatus from 'http-status';
import { beforeEach, describe, expect, it, vi } from 'vitest';
// Mock the services index
vi.mock('../services/index.ts', () => ({
    dashboardService: {
        getDashboardMetrics: vi.fn()
    }
}));
// Mock catchAsyncWithAuth
vi.mock('../utils/catchAsyncWithAuth.ts', () => ({
    default: vi.fn(fn => fn)
}));
const mockDashboardService = dashboardService;
describe('Dashboard Controller', () => {
    let mockReq;
    let mockRes;
    let mockNext;
    beforeEach(() => {
        vi.clearAllMocks();
        mockReq = {
            user: { id: 1, role: 'ADMIN' }
        };
        mockRes = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        };
        mockNext = vi.fn();
    });
    describe('getMetrics', () => {
        const mockMetrics = {
            totalClients: 47,
            activeAnalyses: 12,
            pendingRecommendations: 28,
            totalPotentialSavings: 485000,
            recentActivity: [
                {
                    id: 'analysis-1',
                    type: 'analysis',
                    clientName: 'ACME Corporation',
                    timestamp: '2024-10-22T14:30:00Z',
                    status: 'completed'
                }
            ],
            topOpportunities: [
                {
                    clientName: 'Global Manufacturing Ltd',
                    potentialSavings: 125000,
                    productCategory: 'sweep'
                }
            ]
        };
        it('should return dashboard metrics successfully', async () => {
            mockDashboardService.getDashboardMetrics.mockResolvedValue(mockMetrics);
            await dashboardController.getMetrics(mockReq, mockRes, mockNext);
            expect(mockDashboardService.getDashboardMetrics).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(mockRes.send).toHaveBeenCalledWith(mockMetrics);
        });
        it('should handle service errors', async () => {
            const error = new Error('Database connection failed');
            mockDashboardService.getDashboardMetrics.mockRejectedValue(error);
            // Since we're mocking catchAsyncWithAuth to just call the function,
            // errors will be thrown directly
            await expect(dashboardController.getMetrics(mockReq, mockRes, mockNext)).rejects.toThrow('Database connection failed');
        });
        it('should handle empty metrics data', async () => {
            const emptyMetrics = {
                totalClients: 0,
                activeAnalyses: 0,
                pendingRecommendations: 0,
                totalPotentialSavings: 0,
                recentActivity: [],
                topOpportunities: []
            };
            mockDashboardService.getDashboardMetrics.mockResolvedValue(emptyMetrics);
            await dashboardController.getMetrics(mockReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(mockRes.send).toHaveBeenCalledWith(emptyMetrics);
        });
        it('should call service with no parameters', async () => {
            mockDashboardService.getDashboardMetrics.mockResolvedValue(mockMetrics);
            await dashboardController.getMetrics(mockReq, mockRes, mockNext);
            expect(mockDashboardService.getDashboardMetrics).toHaveBeenCalledWith();
        });
        it('should set correct HTTP status and send response', async () => {
            mockDashboardService.getDashboardMetrics.mockResolvedValue(mockMetrics);
            await dashboardController.getMetrics(mockReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.send).toHaveBeenCalledWith(mockMetrics);
        });
    });
});
