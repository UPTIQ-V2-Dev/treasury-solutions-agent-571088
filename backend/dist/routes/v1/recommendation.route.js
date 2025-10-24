import recommendationController from "../../controllers/recommendation.controller.js";
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import recommendationValidation from "../../validations/recommendation.validation.js";
import express from 'express';
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Recommendation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The recommendation ID
 *         analysisId:
 *           type: string
 *           description: The analysis this recommendation is based on
 *         productId:
 *           type: string
 *           description: The recommended treasury product ID
 *         priority:
 *           type: string
 *           enum: [high, medium, low]
 *           description: Recommendation priority level
 *         rationale:
 *           type: string
 *           description: Explanation for why this product is recommended
 *         dataPoints:
 *           type: array
 *           items:
 *             type: string
 *           description: Key data points supporting the recommendation
 *         benefitProjection:
 *           type: object
 *           description: Projected benefits and ROI calculations
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           description: Current approval status
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the recommendation was created
 *         approvedBy:
 *           type: string
 *           description: Who approved/rejected the recommendation
 *         approvedAt:
 *           type: string
 *           format: date-time
 *           description: When the recommendation was approved/rejected
 *         product:
 *           $ref: '#/components/schemas/TreasuryProduct'
 *       example:
 *         id: "rec-123"
 *         analysisId: "analysis-456"
 *         productId: "product-789"
 *         priority: "high"
 *         rationale: "Client has significant idle balances that could benefit from sweep functionality"
 *         dataPoints: ["Average idle balance: $750,000", "Days with idle balance: 180"]
 *         benefitProjection: {"annualYieldImprovement": 18750, "estimatedROI": 125}
 *         status: "pending"
 *         createdAt: "2024-01-01T12:00:00Z"
 */
/**
 * @swagger
 * tags:
 *   name: Recommendations
 *   description: Treasury product recommendation management
 */
/**
 * @swagger
 * /recommendations/generate:
 *   post:
 *     summary: Generate recommendations for an analysis
 *     description: Generate treasury product recommendations based on financial analysis data
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - analysisId
 *             properties:
 *               analysisId:
 *                 type: string
 *                 description: The analysis ID to generate recommendations for
 *               maxRecommendations:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 20
 *                 default: 5
 *                 description: Maximum number of recommendations to generate
 *               priorityThreshold:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 10
 *                 description: Minimum priority threshold for recommendations
 *               includeInactive:
 *                 type: boolean
 *                 default: false
 *                 description: Whether to include inactive products
 *               categoryFilters:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Filter by specific product categories
 *               minPriority:
 *                 type: string
 *                 enum: [high, medium, low]
 *                 description: Minimum priority level for recommendations
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recommendation'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */
router
    .route('/generate')
    .post(auth('manageAnalysis'), validate(recommendationValidation.generateRecommendations), recommendationController.generateRecommendations);
/**
 * @swagger
 * /recommendations:
 *   get:
 *     summary: Get recommendations
 *     description: Retrieve recommendations with filtering and pagination
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: analysisId
 *         schema:
 *           type: string
 *         description: Filter by analysis ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         description: Filter by approval status
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [high, medium, low]
 *         description: Filter by priority level
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *         description: Filter by product ID
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort field (default: createdAt)
 *       - in: query
 *         name: sortType
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort direction (default: desc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Maximum number of results per page (default: 10)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Current page (default: 1)
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recommendation'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */
router
    .route('/')
    .get(auth('getAnalysis'), validate(recommendationValidation.getRecommendations), recommendationController.getRecommendations);
/**
 * @swagger
 * /recommendations/{recommendationId}:
 *   get:
 *     summary: Get recommendation details
 *     description: Retrieve detailed information about a specific recommendation
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recommendationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Recommendation ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recommendation'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */
router
    .route('/:recommendationId')
    .get(auth('getAnalysis'), validate(recommendationValidation.getRecommendation), recommendationController.getRecommendation);
/**
 * @swagger
 * /recommendations/{recommendationId}/approve:
 *   put:
 *     summary: Approve a recommendation
 *     description: Approve a pending recommendation
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recommendationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Recommendation ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recommendation'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */
router
    .route('/:recommendationId/approve')
    .put(auth('manageAnalysis'), validate(recommendationValidation.approveRecommendation), recommendationController.approveRecommendation);
/**
 * @swagger
 * /recommendations/{recommendationId}/reject:
 *   put:
 *     summary: Reject a recommendation
 *     description: Reject a pending recommendation
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recommendationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Recommendation ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recommendation'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */
router
    .route('/:recommendationId/reject')
    .put(auth('manageAnalysis'), validate(recommendationValidation.rejectRecommendation), recommendationController.rejectRecommendation);
export default router;
