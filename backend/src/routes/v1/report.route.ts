import { reportController } from '../../controllers/index.ts';
import auth from '../../middlewares/auth.ts';
import validate from '../../middlewares/validate.ts';
import { reportValidation } from '../../validations/index.ts';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Report generation and management
 */

/**
 * @swagger
 * /reports/generate:
 *   post:
 *     summary: Generate a report
 *     description: Generate a report based on analysis data with customizable templates and formats
 *     tags: [Reports]
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
 *                 description: ID of the analysis to generate report for
 *               templateId:
 *                 type: string
 *                 enum: [comprehensive-treasury-report, executive-summary-report, detailed-data-export]
 *                 description: Template to use for report generation
 *               format:
 *                 type: string
 *                 enum: [PDF, EXCEL]
 *                 description: Output format for the report
 *               title:
 *                 type: string
 *                 maxLength: 200
 *                 description: Custom title for the report
 *               sections:
 *                 type: array
 *                 items:
 *                   type: string
 *                 maxItems: 10
 *                 description: Specific sections to include in the report
 *             example:
 *               analysisId: "clh123456789"
 *               templateId: "comprehensive-treasury-report"
 *               format: "PDF"
 *               title: "Q4 2024 Treasury Analysis Report"
 *               sections: ["exec-summary", "liquidity-metrics", "recommendations"]
 *     responses:
 *       "201":
 *         description: Report generation initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 analysisId:
 *                   type: string
 *                 clientId:
 *                   type: string
 *                 format:
 *                   type: string
 *                 template:
 *                   type: string
 *                 status:
 *                   type: string
 *                   enum: [generating, completed, failed]
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 createdBy:
 *                   type: string
 *                 fileSize:
 *                   type: integer
 *                 downloadCount:
 *                   type: integer
 *                 filePath:
 *                   type: string
 *                   nullable: true
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router.post(
    '/generate',
    auth('generateReports'),
    validate(reportValidation.generateReport),
    reportController.generateReport
);

/**
 * @swagger
 * /reports/download/{reportId}:
 *   get:
 *     summary: Download a report file
 *     description: Download the generated report file and increment download counter
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: string
 *         description: Report ID
 *     responses:
 *       "200":
 *         description: Report file download
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *         headers:
 *           Content-Disposition:
 *             description: Attachment with filename
 *             schema:
 *               type: string
 *               example: attachment; filename="Treasury_Analysis_Report.pdf"
 *           Content-Length:
 *             description: File size in bytes
 *             schema:
 *               type: integer
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router.get(
    '/download/:reportId',
    auth('downloadReports'),
    validate(reportValidation.downloadReport),
    reportController.downloadReport
);

/**
 * @swagger
 * /reports/history:
 *   get:
 *     summary: Get paginated list of reports
 *     description: Retrieve a paginated list of generated reports with optional filtering
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         description: Filter by client ID
 *       - in: query
 *         name: analysisId
 *         schema:
 *           type: string
 *         description: Filter by analysis ID
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [PDF, EXCEL]
 *         description: Filter by report format
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [generating, completed, failed]
 *         description: Filter by report status
 *       - in: query
 *         name: createdBy
 *         schema:
 *           type: string
 *         description: Filter by creator user ID
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter reports created after this date
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter reports created before this date
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, title, format, status, downloadCount, fileSize]
 *         description: Sort field
 *       - in: query
 *         name: sortType
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort direction
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Maximum number of reports per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: Paginated list of reports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reports:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       format:
 *                         type: string
 *                       status:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       downloadCount:
 *                         type: integer
 *                       fileSize:
 *                         type: integer
 *                       clientId:
 *                         type: string
 *                       analysisId:
 *                         type: string
 *                 totalCount:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
router.get('/history', auth('getReports'), validate(reportValidation.queryReports), reportController.getReports);

/**
 * @swagger
 * /reports/templates:
 *   get:
 *     summary: Get available report templates
 *     description: Retrieve all available report templates with their configurations
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: List of available report templates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 templates:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       format:
 *                         type: string
 *                         enum: [PDF, EXCEL]
 *                       sections:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             name:
 *                               type: string
 *                             type:
 *                               type: string
 *                               enum: [executive_summary, analysis_summary, liquidity_metrics, spending_breakdown, recommendations, data_tables, charts]
 *                             order:
 *                               type: integer
 *                             required:
 *                               type: boolean
 *                             configuration:
 *                               type: object
 *                       isActive:
 *                         type: boolean
 *               example:
 *                 templates:
 *                   - id: "comprehensive-treasury-report"
 *                     name: "Comprehensive Treasury Analysis Report"
 *                     description: "Complete treasury analysis including executive summary, detailed metrics, and recommendations"
 *                     format: "PDF"
 *                     sections:
 *                       - id: "exec-summary"
 *                         name: "Executive Summary"
 *                         type: "executive_summary"
 *                         order: 1
 *                         required: true
 *                     isActive: true
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
router.get('/templates', auth('getReports'), validate(reportValidation.getTemplates), reportController.getTemplates);

/**
 * @swagger
 * /reports/{reportId}:
 *   get:
 *     summary: Get report details
 *     description: Get detailed information about a specific report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: string
 *         description: Report ID
 *     responses:
 *       "200":
 *         description: Report details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 analysisId:
 *                   type: string
 *                 clientId:
 *                   type: string
 *                 format:
 *                   type: string
 *                 template:
 *                   type: string
 *                 status:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 createdBy:
 *                   type: string
 *                 fileSize:
 *                   type: integer
 *                 downloadCount:
 *                   type: integer
 *                 filePath:
 *                   type: string
 *                   nullable: true
 *                 client:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                 analysis:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     status:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:reportId', auth('getReports'), validate(reportValidation.getReport), reportController.getReport);

/**
 * @swagger
 * /reports/{reportId}:
 *   delete:
 *     summary: Delete a report
 *     description: Delete a report and its associated file from storage
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: string
 *         description: Report ID
 *     responses:
 *       "204":
 *         description: Report deleted successfully
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router.delete(
    '/:reportId',
    auth('deleteReports'),
    validate(reportValidation.deleteReport),
    reportController.deleteReport
);

export default router;
