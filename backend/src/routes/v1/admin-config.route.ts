import { adminConfigController } from '../../controllers/index.ts';
import auth from '../../middlewares/auth.ts';
import validate from '../../middlewares/validate.ts';
import { adminConfigValidation } from '../../validations/index.ts';
import express from 'express';

const router = express.Router();

// Admin configuration routes
router
    .route('/config')
    .get(
        auth('getAdminConfig'),
        validate(adminConfigValidation.getConfiguration),
        adminConfigController.getConfiguration
    )
    .put(
        auth('manageAdminConfig'),
        validate(adminConfigValidation.updateConfiguration),
        adminConfigController.updateConfiguration
    );

router
    .route('/config/reset')
    .post(
        auth('manageAdminConfig'),
        validate(adminConfigValidation.resetConfiguration),
        adminConfigController.resetConfiguration
    );

export default router;

/**
 * @swagger
 * tags:
 *   name: Admin Configuration
 *   description: System configuration management (admin access only)
 */

/**
 * @swagger
 * /admin/config:
 *   get:
 *     summary: Get system configuration settings
 *     description: Only admins can retrieve system configuration settings.
 *     tags: [Admin Configuration]
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
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 *
 *   put:
 *     summary: Update system configuration settings
 *     description: Only admins can update system configuration settings.
 *     tags: [Admin Configuration]
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
 *                     example: 150000
 *                   liquidityWarningThreshold:
 *                     type: number
 *                     minimum: 0
 *                     example: 75000
 *                   lowBalanceThreshold:
 *                     type: number
 *                     minimum: 0
 *                     example: 15000
 *                   highRiskThreshold:
 *                     type: number
 *                     minimum: 0
 *                     example: 750000
 *               features:
 *                 type: object
 *                 properties:
 *                   enableAutoAnalysis:
 *                     type: boolean
 *                     example: true
 *                   enableEmailNotifications:
 *                     type: boolean
 *                     example: false
 *                   enableRecommendationEngine:
 *                     type: boolean
 *                     example: true
 *                   enableAdvancedReports:
 *                     type: boolean
 *                     example: true
 *               integrations:
 *                 type: object
 *                 properties:
 *                   bankApiEnabled:
 *                     type: boolean
 *                     example: true
 *                   webhooksEnabled:
 *                     type: boolean
 *                     example: true
 *                   apiRateLimit:
 *                     type: number
 *                     minimum: 1
 *                     example: 1500
 *                   maxFileSize:
 *                     type: number
 *                     minimum: 1
 *                     example: 50
 *               security:
 *                 type: object
 *                 properties:
 *                   sessionTimeout:
 *                     type: number
 *                     minimum: 1
 *                     example: 120
 *                   passwordExpiry:
 *                     type: number
 *                     minimum: 1
 *                     example: 180
 *                   requireMfa:
 *                     type: boolean
 *                     example: true
 *                   auditLogRetention:
 *                     type: number
 *                     minimum: 1
 *                     example: 730
 *             example:
 *               thresholds:
 *                 idleCashThreshold: 150000
 *               features:
 *                 enableAdvancedReports: true
 *               security:
 *                 requireMfa: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SystemConfiguration'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */

/**
 * @swagger
 * /admin/config/reset:
 *   post:
 *     summary: Reset configuration to default values
 *     description: Only admins can reset system configuration to default values.
 *     tags: [Admin Configuration]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK - Configuration reset to default values
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SystemConfiguration'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SystemConfiguration:
 *       type: object
 *       properties:
 *         thresholds:
 *           type: object
 *           properties:
 *             idleCashThreshold:
 *               type: number
 *               description: Threshold for idle cash detection
 *             liquidityWarningThreshold:
 *               type: number
 *               description: Threshold for liquidity warnings
 *             lowBalanceThreshold:
 *               type: number
 *               description: Threshold for low balance alerts
 *             highRiskThreshold:
 *               type: number
 *               description: Threshold for high risk alerts
 *         features:
 *           type: object
 *           properties:
 *             enableAutoAnalysis:
 *               type: boolean
 *               description: Enable automatic analysis processing
 *             enableEmailNotifications:
 *               type: boolean
 *               description: Enable email notifications
 *             enableRecommendationEngine:
 *               type: boolean
 *               description: Enable recommendation generation
 *             enableAdvancedReports:
 *               type: boolean
 *               description: Enable advanced reporting features
 *         integrations:
 *           type: object
 *           properties:
 *             bankApiEnabled:
 *               type: boolean
 *               description: Enable bank API integrations
 *             webhooksEnabled:
 *               type: boolean
 *               description: Enable webhook notifications
 *             apiRateLimit:
 *               type: number
 *               description: API rate limit per hour
 *             maxFileSize:
 *               type: number
 *               description: Maximum file size in MB
 *         security:
 *           type: object
 *           properties:
 *             sessionTimeout:
 *               type: number
 *               description: Session timeout in minutes
 *             passwordExpiry:
 *               type: number
 *               description: Password expiry in days
 *             requireMfa:
 *               type: boolean
 *               description: Require multi-factor authentication
 *             auditLogRetention:
 *               type: number
 *               description: Audit log retention in days
 */

/**
 * @swagger
 * /admin/audit:
 *   get:
 *     summary: Get paginated audit log entries
 *     description: Only admins can access audit logs.
 *     tags: [Admin Configuration]
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
 *                     $ref: '#/components/schemas/AuditEntry'
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
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */

/**
 * @swagger
 * /admin/audit/export:
 *   get:
 *     summary: Export audit logs as CSV file
 *     description: Only admins can export audit logs.
 *     tags: [Admin Configuration]
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
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuditEntry:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Audit entry ID
 *         userId:
 *           type: integer
 *           description: ID of the user who performed the action
 *         userName:
 *           type: string
 *           description: Name of the user who performed the action
 *         userEmail:
 *           type: string
 *           description: Email of the user who performed the action
 *         action:
 *           type: string
 *           description: Action performed
 *         resource:
 *           type: string
 *           description: Resource affected by the action
 *         resourceId:
 *           type: string
 *           description: ID of the affected resource
 *         details:
 *           type: string
 *           description: Detailed description of the action
 *         severity:
 *           type: string
 *           enum: [low, medium, high]
 *           description: Severity level of the action
 *         ipAddress:
 *           type: string
 *           description: IP address of the user
 *         userAgent:
 *           type: string
 *           description: User agent string
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: When the action was performed
 */
