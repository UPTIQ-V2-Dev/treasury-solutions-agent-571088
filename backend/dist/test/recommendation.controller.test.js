import recommendationController from "../controllers/recommendation.controller.js";
import { recommendationService } from "../services/index.js";
import express from 'express';
import httpStatus from 'http-status';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
// Mock services
vi.mock('../services/index.ts', () => ({
    recommendationService: {
        generateRecommendations: vi.fn(),
        getRecommendations: vi.fn(),
        getRecommendationById: vi.fn(),
        approveRecommendation: vi.fn(),
        rejectRecommendation: vi.fn()
    }
}));
// Mock utilities
vi.mock('../utils/pick.ts', () => ({
    default: vi.fn((obj, keys) => {
        const result = {};
        keys.forEach((key) => {
            if (obj[key] !== undefined) {
                result[key] = obj[key];
            }
        });
        return result;
    })
}));
const app = express();
app.use(express.json());
// Mock auth middleware
const mockAuth = (req, res, next) => {
    req.user = { id: 1, email: 'admin@test.com', role: 'ADMIN' };
    next();
};
// Mock validation middleware
const mockValidate = (req, res, next) => {
    req.validatedQuery = req.query;
    next();
};
// Set up routes
app.post('/recommendations/generate', mockAuth, mockValidate, recommendationController.generateRecommendations);
app.get('/recommendations', mockAuth, mockValidate, recommendationController.getRecommendations);
app.get('/recommendations/:recommendationId', mockAuth, mockValidate, recommendationController.getRecommendation);
app.put('/recommendations/:recommendationId/approve', mockAuth, mockValidate, recommendationController.approveRecommendation);
app.put('/recommendations/:recommendationId/reject', mockAuth, mockValidate, recommendationController.rejectRecommendation);
const mockRecommendationService = recommendationService;
describe('Recommendation Controller', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    describe('POST /recommendations/generate', () => {
        const mockRecommendations = [
            {
                id: 'rec-1',
                analysisId: 'analysis-1',
                productId: 'product-1',
                priority: 'high',
                rationale: 'Test rationale',
                dataPoints: ['Test data point'],
                benefitProjection: { annualYieldImprovement: 4625 },
                status: 'pending',
                createdAt: new Date(),
                product: { name: 'Test Product' },
                analysis: { client: { name: 'Test Client' } }
            }
        ];
        it('should generate recommendations successfully', async () => {
            mockRecommendationService.generateRecommendations.mockResolvedValue(mockRecommendations);
            const response = await request(app)
                .post('/recommendations/generate')
                .send({
                analysisId: 'analysis-1',
                maxRecommendations: 5
            })
                .expect(httpStatus.CREATED);
            expect(response.body).toEqual(mockRecommendations);
            expect(mockRecommendationService.generateRecommendations).toHaveBeenCalledWith({
                analysisId: 'analysis-1',
                maxRecommendations: 5,
                priorityThreshold: undefined
            }, {});
        });
        it('should generate recommendations with options', async () => {
            mockRecommendationService.generateRecommendations.mockResolvedValue(mockRecommendations);
            await request(app)
                .post('/recommendations/generate')
                .send({
                analysisId: 'analysis-1',
                includeInactive: true,
                categoryFilters: ['sweep'],
                minPriority: 'high'
            })
                .expect(httpStatus.CREATED);
            expect(mockRecommendationService.generateRecommendations).toHaveBeenCalledWith({
                analysisId: 'analysis-1',
                maxRecommendations: undefined,
                priorityThreshold: undefined
            }, {
                includeInactive: true,
                categoryFilters: ['sweep'],
                minPriority: 'high'
            });
        });
    });
    describe('GET /recommendations', () => {
        const mockRecommendations = [
            {
                id: 'rec-1',
                analysisId: 'analysis-1',
                productId: 'product-1',
                priority: 'high',
                status: 'pending',
                createdAt: new Date()
            }
        ];
        it('should get recommendations successfully', async () => {
            mockRecommendationService.getRecommendations.mockResolvedValue(mockRecommendations);
            const response = await request(app)
                .get('/recommendations')
                .query({ analysisId: 'analysis-1' })
                .expect(httpStatus.OK);
            expect(response.body).toEqual(mockRecommendations);
            expect(mockRecommendationService.getRecommendations).toHaveBeenCalledWith({ analysisId: 'analysis-1' }, {});
        });
        it('should get recommendations with pagination', async () => {
            mockRecommendationService.getRecommendations.mockResolvedValue(mockRecommendations);
            await request(app)
                .get('/recommendations')
                .query({
                analysisId: 'analysis-1',
                page: '2',
                limit: '5',
                sortBy: 'priority',
                sortType: 'asc'
            })
                .expect(httpStatus.OK);
            expect(mockRecommendationService.getRecommendations).toHaveBeenCalledWith({ analysisId: 'analysis-1' }, {
                page: '2',
                limit: '5',
                sortBy: 'priority',
                sortType: 'asc'
            });
        });
    });
    describe('GET /recommendations/:recommendationId', () => {
        const mockRecommendation = {
            id: 'rec-1',
            analysisId: 'analysis-1',
            productId: 'product-1',
            priority: 'high',
            status: 'pending',
            product: { name: 'Test Product' },
            analysis: { client: { name: 'Test Client' } }
        };
        it('should get recommendation by ID successfully', async () => {
            mockRecommendationService.getRecommendationById.mockResolvedValue(mockRecommendation);
            const response = await request(app).get('/recommendations/rec-1').expect(httpStatus.OK);
            expect(response.body).toEqual(mockRecommendation);
            expect(mockRecommendationService.getRecommendationById).toHaveBeenCalledWith('rec-1');
        });
        it('should return 404 if recommendation not found', async () => {
            mockRecommendationService.getRecommendationById.mockResolvedValue(null);
            await request(app).get('/recommendations/nonexistent').expect(httpStatus.NOT_FOUND);
        });
    });
    describe('PUT /recommendations/:recommendationId/approve', () => {
        const mockApprovedRecommendation = {
            id: 'rec-1',
            analysisId: 'analysis-1',
            productId: 'product-1',
            priority: 'high',
            status: 'approved',
            approvedBy: 'admin@test.com',
            approvedAt: new Date(),
            product: { name: 'Test Product' },
            analysis: { client: { name: 'Test Client' } }
        };
        it('should approve recommendation successfully', async () => {
            mockRecommendationService.approveRecommendation.mockResolvedValue(mockApprovedRecommendation);
            const response = await request(app)
                .put('/recommendations/rec-1/approve')
                .send({ approvedBy: 'admin@test.com' })
                .expect(httpStatus.OK);
            expect(response.body).toEqual(mockApprovedRecommendation);
            expect(mockRecommendationService.approveRecommendation).toHaveBeenCalledWith('rec-1', 'admin@test.com');
        });
        it('should handle service errors', async () => {
            mockRecommendationService.approveRecommendation.mockRejectedValue(new Error('Recommendation not found'));
            await request(app)
                .put('/recommendations/nonexistent/approve')
                .send({ approvedBy: 'admin@test.com' })
                .expect(httpStatus.INTERNAL_SERVER_ERROR);
        });
    });
    describe('PUT /recommendations/:recommendationId/reject', () => {
        const mockRejectedRecommendation = {
            id: 'rec-1',
            analysisId: 'analysis-1',
            productId: 'product-1',
            priority: 'high',
            status: 'rejected',
            approvedBy: 'admin@test.com',
            approvedAt: new Date(),
            product: { name: 'Test Product' },
            analysis: { client: { name: 'Test Client' } }
        };
        it('should reject recommendation successfully', async () => {
            mockRecommendationService.rejectRecommendation.mockResolvedValue(mockRejectedRecommendation);
            const response = await request(app).put('/recommendations/rec-1/reject').expect(httpStatus.OK);
            expect(response.body).toEqual(mockRejectedRecommendation);
            expect(mockRecommendationService.rejectRecommendation).toHaveBeenCalledWith('rec-1', 'admin@test.com');
        });
        it('should handle service errors', async () => {
            mockRecommendationService.rejectRecommendation.mockRejectedValue(new Error('Recommendation not found'));
            await request(app).put('/recommendations/nonexistent/reject').expect(httpStatus.INTERNAL_SERVER_ERROR);
        });
    });
});
