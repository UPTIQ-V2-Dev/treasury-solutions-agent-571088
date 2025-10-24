import { dashboardController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import { dashboardValidation } from "../../validations/index.js";
import express from 'express';
const router = express.Router();
router
    .route('/metrics')
    .get(auth('getDashboard'), validate(dashboardValidation.getMetrics), dashboardController.getMetrics);
export default router;
/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard metrics and overview data
 */
/**
 * @swagger
 * /dashboard/metrics:
 *   get:
 *     summary: Get dashboard overview metrics
 *     description: Get dashboard metrics including total clients, active analyses, pending recommendations, potential savings, recent activity, and top opportunities.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalClients:
 *                   type: integer
 *                   description: Total number of active clients
 *                   example: 47
 *                 activeAnalyses:
 *                   type: integer
 *                   description: Number of active analyses (processing or completed)
 *                   example: 12
 *                 pendingRecommendations:
 *                   type: integer
 *                   description: Number of pending recommendations
 *                   example: 28
 *                 totalPotentialSavings:
 *                   type: number
 *                   format: float
 *                   description: Total potential savings from all pending recommendations
 *                   example: 485000
 *                 recentActivity:
 *                   type: array
 *                   description: Array of recent activity items
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "act-1"
 *                       type:
 *                         type: string
 *                         example: "analysis"
 *                       clientName:
 *                         type: string
 *                         example: "ACME Corporation"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-22T14:30:00Z"
 *                       status:
 *                         type: string
 *                         example: "completed"
 *                 topOpportunities:
 *                   type: array
 *                   description: Array of top saving opportunities
 *                   items:
 *                     type: object
 *                     properties:
 *                       clientName:
 *                         type: string
 *                         example: "Global Manufacturing Ltd"
 *                       potentialSavings:
 *                         type: number
 *                         format: float
 *                         example: 125000
 *                       productCategory:
 *                         type: string
 *                         example: "sweep"
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */
