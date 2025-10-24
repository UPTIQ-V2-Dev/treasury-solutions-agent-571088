import { adminController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import { adminValidation } from "../../validations/index.js";
import express from 'express';
const router = express.Router();
// Configuration routes
router
    .route('/config')
    .get(auth('getAdminConfig'), adminController.getConfig)
    .put(auth('manageAdminConfig'), validate(adminValidation.updateConfig), adminController.updateConfig);
router.route('/config/reset').post(auth('manageAdminConfig'), adminController.resetConfig);
// Audit routes
router
    .route('/audit')
    .get(auth('getAdminConfig'), validate(adminValidation.queryAuditLogs), adminController.getAuditLogs);
router
    .route('/audit/export')
    .get(auth('getAdminConfig'), validate(adminValidation.exportAuditLogs), adminController.exportAuditLogs);
export default router;
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: System administration and configuration
 */
/**
 * @swagger
 * /admin/config:
 *   get:
 *     summary: Get system configuration settings
 *     description: Only admins can access system configuration.
 *     tags: [Admin]
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
 *                 thresholds:
 *                   type: object
 *                   properties:
 *                     idleCashThreshold:
 *                       type: number
 *                       example: 100000
 *                     liquidityWarningThreshold:
 *                       type: number
 *                       example: 50000
 *                     lowBalanceThreshold:
 *                       type: number
 *                       example: 10000
 *                     highRiskThreshold:
 *                       type: number
 *                       example: 500000
 *                 features:
 *                   type: object
 *                   properties:
 *                     enableAutoAnalysis:
 *                       type: boolean
 *                       example: true
 *                     enableEmailNotifications:
 *                       type: boolean
 *                       example: true
 *                     enableRecommendationEngine:
 *                       type: boolean
 *                       example: true
 *                     enableAdvancedReports:
 *                       type: boolean
 *                       example: false
 *                 integrations:
 *                   type: object
 *                   properties:
 *                     bankApiEnabled:
 *                       type: boolean
 *                       example: false
 *                     webhooksEnabled:
 *                       type: boolean
 *                       example: false
 *                     apiRateLimit:
 *                       type: number
 *                       example: 1000
 *                     maxFileSize:
 *                       type: number
 *                       example: 25
 *                 security:
 *                   type: object
 *                   properties:
 *                     sessionTimeout:
 *                       type: number
 *                       example: 60
 *                     passwordExpiry:
 *                       type: number
 *                       example: 90
 *                     requireMfa:
 *                       type: boolean
 *                       example: false
 *                     auditLogRetention:
 *                       type: number
 *                       example: 365
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   put:
 *     summary: Update system configuration settings
 *     description: Only admins can update system configuration.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               thresholds:
 *                 type: object
 *                 properties:
 *                   idleCashThreshold:
 *                     type: number
 *                     minimum: 0
 *                     maximum: 10000000
 *                   liquidityWarningThreshold:
 *                     type: number
 *                     minimum: 0
 *                     maximum: 10000000
 *                   lowBalanceThreshold:
 *                     type: number
 *                     minimum: 0
 *                     maximum: 10000000
 *                   highRiskThreshold:
 *                     type: number
 *                     minimum: 0
 *                     maximum: 100000000
 *               features:
 *                 type: object
 *                 properties:
 *                   enableAutoAnalysis:
 *                     type: boolean
 *                   enableEmailNotifications:
 *                     type: boolean
 *                   enableRecommendationEngine:
 *                     type: boolean
 *                   enableAdvancedReports:
 *                     type: boolean
 *               integrations:
 *                 type: object
 *                 properties:
 *                   bankApiEnabled:
 *                     type: boolean
 *                   webhooksEnabled:
 *                     type: boolean
 *                   apiRateLimit:
 *                     type: number
 *                     minimum: 1
 *                     maximum: 10000
 *                   maxFileSize:
 *                     type: number
 *                     minimum: 1
 *                     maximum: 100
 *               security:
 *                 type: object
 *                 properties:
 *                   sessionTimeout:
 *                     type: number
 *                     minimum: 1
 *                     maximum: 1440
 *                   passwordExpiry:
 *                     type: number
 *                     minimum: 1
 *                     maximum: 365
 *                   requireMfa:
 *                     type: boolean
 *                   auditLogRetention:
 *                     type: number
 *                     minimum: 30
 *                     maximum: 2555
 *             example:
 *               thresholds:
 *                 idleCashThreshold: 150000
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Config'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
/**
 * @swagger
 * /admin/config/reset:
 *   post:
 *     summary: Reset configuration to default values
 *     description: Only admins can reset system configuration.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Config'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
/**
 * @swagger
 * /admin/audit:
 *   get:
 *     summary: Get paginated audit log entries
 *     description: Only admins can access audit logs.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 25
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           maxLength: 255
 *         description: Search term
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *           maxLength: 100
 *         description: Filter by action
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter from date (ISO 8601)
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter to date (ISO 8601)
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       userId:
 *                         type: integer
 *                       userName:
 *                         type: string
 *                       userEmail:
 *                         type: string
 *                       action:
 *                         type: string
 *                       resource:
 *                         type: string
 *                       resourceId:
 *                         type: string
 *                       details:
 *                         type: string
 *                       severity:
 *                         type: string
 *                         enum: [low, medium, high]
 *                       ipAddress:
 *                         type: string
 *                       userAgent:
 *                         type: string
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                 totalCount:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
/**
 * @swagger
 * /admin/audit/export:
 *   get:
 *     summary: Export audit logs as CSV file
 *     description: Only admins can export audit logs.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           maxLength: 255
 *         description: Search term
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *           maxLength: 100
 *         description: Filter by action
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter from date (ISO 8601)
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter to date (ISO 8601)
 *     responses:
 *       "200":
 *         description: CSV file
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
