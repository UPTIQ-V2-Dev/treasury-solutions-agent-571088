import { recommendationService } from "../services/index.js";
import { recommendationTools } from "../tools/recommendation.tool.js";
import { beforeEach, describe, expect, it, vi } from 'vitest';
// Mock the recommendation service
vi.mock('../services/index.ts', () => ({
    recommendationService: {
        generateRecommendations: vi.fn(),
        getRecommendations: vi.fn(),
        getRecommendationById: vi.fn()
    }
}));
const mockRecommendationService = recommendationService;
describe('Recommendation Tools', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
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
            product: {
                id: 'product-1',
                name: 'Test Product',
                category: 'sweep',
                description: 'Test description',
                features: ['feature1'],
                eligibilityRules: { minBalance: 100000 },
                benefits: { yieldImprovement: 2.5 },
                pricing: { monthlyFee: 150 },
                isActive: true
            },
            analysis: {
                id: 'analysis-1',
                clientId: 'client-1',
                statementFileIds: ['file-1'],
                createdAt: '2024-01-01T00:00:00.000Z',
                status: 'completed',
                summary: {},
                liquidityMetrics: {},
                spendingBreakdown: {},
                idleBalanceAnalysis: {},
                client: {
                    id: 'client-1',
                    name: 'Test Client',
                    accountIds: ['ACC-001'],
                    relationshipManager: 'John Doe',
                    status: 'active'
                }
            }
        }
    ];
    describe('generateRecommendationsTool', () => {
        const generateTool = recommendationTools.find(tool => tool.id === 'recommendation_generate');
        it('should be defined with correct properties', () => {
            expect(generateTool).toBeDefined();
            expect(generateTool.id).toBe('recommendation_generate');
            expect(generateTool.name).toBe('Generate Recommendations');
            expect(generateTool.description).toContain('Generate treasury product recommendations');
            expect(generateTool.inputSchema).toBeDefined();
            expect(generateTool.outputSchema).toBeDefined();
            expect(generateTool.fn).toBeInstanceOf(Function);
        });
        it('should validate input schema correctly', () => {
            const validInput = {
                analysisId: 'analysis-1',
                maxRecommendations: 5,
                includeInactive: false
            };
            const result = generateTool.inputSchema.safeParse(validInput);
            expect(result.success).toBe(true);
        });
        it('should invalidate input with missing analysisId', () => {
            const invalidInput = {
                maxRecommendations: 5
            };
            const result = generateTool.inputSchema.safeParse(invalidInput);
            expect(result.success).toBe(false);
        });
        it('should generate recommendations successfully', async () => {
            mockRecommendationService.generateRecommendations.mockResolvedValue(mockRecommendations);
            const input = {
                analysisId: 'analysis-1',
                maxRecommendations: 5,
                includeInactive: false,
                categoryFilters: ['sweep'],
                minPriority: 'high'
            };
            const result = await generateTool.fn(input);
            expect(mockRecommendationService.generateRecommendations).toHaveBeenCalledWith({
                analysisId: 'analysis-1',
                maxRecommendations: 5,
                priorityThreshold: undefined
            }, {
                includeInactive: false,
                categoryFilters: ['sweep'],
                minPriority: 'high'
            });
            expect(result).toEqual({ recommendations: mockRecommendations });
        });
        it('should use default values when not provided', async () => {
            mockRecommendationService.generateRecommendations.mockResolvedValue(mockRecommendations);
            const input = { analysisId: 'analysis-1' };
            await generateTool.fn(input);
            expect(mockRecommendationService.generateRecommendations).toHaveBeenCalledWith({
                analysisId: 'analysis-1',
                maxRecommendations: undefined,
                priorityThreshold: undefined
            }, {
                includeInactive: undefined,
                categoryFilters: undefined,
                minPriority: undefined
            });
        });
    });
    describe('getRecommendationsTool', () => {
        const getTool = recommendationTools.find(tool => tool.id === 'recommendation_get_all');
        it('should be defined with correct properties', () => {
            expect(getTool).toBeDefined();
            expect(getTool.id).toBe('recommendation_get_all');
            expect(getTool.name).toBe('Get Recommendations');
            expect(getTool.description).toContain('Get recommendations with filtering');
            expect(getTool.inputSchema).toBeDefined();
            expect(getTool.outputSchema).toBeDefined();
            expect(getTool.fn).toBeInstanceOf(Function);
        });
        it('should validate input schema correctly', () => {
            const validInput = {
                analysisId: 'analysis-1',
                status: 'pending',
                priority: 'high',
                limit: 10,
                page: 1
            };
            const result = getTool.inputSchema.safeParse(validInput);
            expect(result.success).toBe(true);
        });
        it('should get recommendations with filters', async () => {
            mockRecommendationService.getRecommendations.mockResolvedValue(mockRecommendations);
            const input = {
                analysisId: 'analysis-1',
                status: 'pending',
                priority: 'high',
                limit: 10
            };
            const result = await getTool.fn(input);
            expect(mockRecommendationService.getRecommendations).toHaveBeenCalledWith({
                analysisId: 'analysis-1',
                status: 'pending',
                priority: 'high'
            }, {
                sortBy: undefined,
                sortType: undefined,
                limit: 10,
                page: undefined
            });
            expect(result).toEqual({ recommendations: mockRecommendations });
        });
        it('should handle empty input', async () => {
            mockRecommendationService.getRecommendations.mockResolvedValue([]);
            const result = await getTool.fn({});
            expect(mockRecommendationService.getRecommendations).toHaveBeenCalledWith({}, {
                sortBy: undefined,
                sortType: undefined,
                limit: undefined,
                page: undefined
            });
            expect(result).toEqual({ recommendations: [] });
        });
    });
    describe('getRecommendationTool', () => {
        const getByIdTool = recommendationTools.find(tool => tool.id === 'recommendation_get_by_id');
        it('should be defined with correct properties', () => {
            expect(getByIdTool).toBeDefined();
            expect(getByIdTool.id).toBe('recommendation_get_by_id');
            expect(getByIdTool.name).toBe('Get Recommendation By ID');
            expect(getByIdTool.description).toContain('Get a specific recommendation by its ID');
            expect(getByIdTool.inputSchema).toBeDefined();
            expect(getByIdTool.outputSchema).toBeDefined();
            expect(getByIdTool.fn).toBeInstanceOf(Function);
        });
        it('should validate input schema correctly', () => {
            const validInput = { recommendationId: 'rec-123' };
            const result = getByIdTool.inputSchema.safeParse(validInput);
            expect(result.success).toBe(true);
        });
        it('should get recommendation by ID successfully', async () => {
            const mockRecommendation = {
                ...mockRecommendations[0],
                createdAt: new Date('2024-01-01'),
                approvedAt: new Date('2024-01-02')
            };
            mockRecommendationService.getRecommendationById.mockResolvedValue(mockRecommendation);
            const input = { recommendationId: 'rec-1' };
            const result = await getByIdTool.fn(input);
            expect(mockRecommendationService.getRecommendationById).toHaveBeenCalledWith('rec-1');
            expect(result.id).toBe('rec-1');
            expect(result.createdAt).toBe('2024-01-01T00:00:00.000Z');
            expect(result.approvedAt).toBe('2024-01-02T00:00:00.000Z');
        });
        it('should handle dates correctly when approvedAt is null', async () => {
            const mockRecommendation = {
                ...mockRecommendations[0],
                createdAt: new Date('2024-01-01'),
                approvedAt: null
            };
            mockRecommendationService.getRecommendationById.mockResolvedValue(mockRecommendation);
            const result = await getByIdTool.fn({ recommendationId: 'rec-1' });
            expect(result.createdAt).toBe('2024-01-01T00:00:00.000Z');
            expect(result.approvedAt).toBeUndefined();
        });
        it('should throw error if recommendation not found', async () => {
            mockRecommendationService.getRecommendationById.mockResolvedValue(null);
            await expect(getByIdTool.fn({ recommendationId: 'nonexistent' })).rejects.toThrow('Recommendation not found');
        });
    });
    describe('getRecommendationsByAnalysisTool', () => {
        const getByAnalysisTool = recommendationTools.find(tool => tool.id === 'recommendation_get_by_analysis');
        it('should be defined with correct properties', () => {
            expect(getByAnalysisTool).toBeDefined();
            expect(getByAnalysisTool.id).toBe('recommendation_get_by_analysis');
            expect(getByAnalysisTool.name).toBe('Get Recommendations By Analysis');
            expect(getByAnalysisTool.description).toContain('Get all recommendations for a specific analysis');
        });
        it('should get recommendations by analysis ID', async () => {
            mockRecommendationService.getRecommendations.mockResolvedValue(mockRecommendations);
            const input = {
                analysisId: 'analysis-1',
                status: 'pending',
                limit: 10
            };
            const result = await getByAnalysisTool.fn(input);
            expect(mockRecommendationService.getRecommendations).toHaveBeenCalledWith({
                analysisId: 'analysis-1',
                status: 'pending'
            }, {
                limit: 10,
                sortBy: 'priority',
                sortType: 'desc'
            });
            expect(result).toEqual({ recommendations: mockRecommendations });
        });
    });
    describe('getRecommendationsByPriorityTool', () => {
        const getByPriorityTool = recommendationTools.find(tool => tool.id === 'recommendation_get_by_priority');
        it('should be defined with correct properties', () => {
            expect(getByPriorityTool).toBeDefined();
            expect(getByPriorityTool.id).toBe('recommendation_get_by_priority');
            expect(getByPriorityTool.name).toBe('Get Recommendations By Priority');
        });
        it('should get recommendations by priority', async () => {
            mockRecommendationService.getRecommendations.mockResolvedValue(mockRecommendations);
            const input = {
                priority: 'high',
                status: 'pending',
                limit: 25
            };
            const result = await getByPriorityTool.fn(input);
            expect(mockRecommendationService.getRecommendations).toHaveBeenCalledWith({
                priority: 'high',
                status: 'pending'
            }, {
                limit: 25,
                sortBy: 'createdAt',
                sortType: 'desc'
            });
            expect(result).toEqual({ recommendations: mockRecommendations });
        });
    });
    describe('getRecommendationsByStatusTool', () => {
        const getByStatusTool = recommendationTools.find(tool => tool.id === 'recommendation_get_by_status');
        it('should be defined with correct properties', () => {
            expect(getByStatusTool).toBeDefined();
            expect(getByStatusTool.id).toBe('recommendation_get_by_status');
            expect(getByStatusTool.name).toBe('Get Recommendations By Status');
        });
        it('should get recommendations by status', async () => {
            mockRecommendationService.getRecommendations.mockResolvedValue(mockRecommendations);
            const input = {
                status: 'approved',
                analysisId: 'analysis-1',
                priority: 'high'
            };
            const result = await getByStatusTool.fn(input);
            expect(mockRecommendationService.getRecommendations).toHaveBeenCalledWith({
                status: 'approved',
                analysisId: 'analysis-1',
                priority: 'high'
            }, {
                limit: 50,
                sortBy: 'createdAt',
                sortType: 'desc'
            });
            expect(result).toEqual({ recommendations: mockRecommendations });
        });
    });
    describe('Tool input/output validation', () => {
        it('should validate all tools have required properties', () => {
            recommendationTools.forEach(tool => {
                expect(tool.id).toBeTruthy();
                expect(tool.name).toBeTruthy();
                expect(tool.description).toBeTruthy();
                expect(tool.inputSchema).toBeDefined();
                expect(tool.outputSchema).toBeDefined();
                expect(tool.fn).toBeInstanceOf(Function);
            });
        });
        it('should have unique tool IDs', () => {
            const ids = recommendationTools.map(tool => tool.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(ids.length);
        });
    });
});
