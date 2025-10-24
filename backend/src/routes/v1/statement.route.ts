import { analysisController, statementController } from '../../controllers/index.ts';
import auth from '../../middlewares/auth.ts';
import validate from '../../middlewares/validate.ts';
import { analysisValidation, statementValidation } from '../../validations/index.ts';
import express from 'express';

const router = express.Router();

// Statement upload and management routes
router
    .route('/upload')
    .post(auth('manageStatements'), validate(statementValidation.uploadStatement), statementController.uploadStatement);

router
    .route('/upload/:uploadId/status')
    .get(auth('getStatements'), validate(statementValidation.getUploadStatus), statementController.getUploadStatus);

router
    .route('/parse')
    .post(auth('manageStatements'), validate(statementValidation.parseStatement), statementController.parseStatement);

router
    .route('/analyze')
    .post(
        auth('manageStatements'),
        validate(analysisValidation.analyzeStatements),
        analysisController.analyzeStatements
    );

// Statement file management routes
router
    .route('/')
    .get(auth('getStatements'), validate(statementValidation.getStatementFiles), statementController.getStatementFiles);

router
    .route('/:id')
    .get(auth('getStatements'), validate(statementValidation.getStatementFile), statementController.getStatementFile)
    .delete(
        auth('manageStatements'),
        validate(statementValidation.deleteStatementFile),
        statementController.deleteStatementFile
    );

router
    .route('/:id/upload-url')
    .get(
        auth('manageStatements'),
        validate(statementValidation.generateUploadUrl),
        statementController.generateUploadUrl
    );

export default router;

/**
 * @swagger
 * tags:
 *   name: Statements
 *   description: Bank statement file upload and processing
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StatementFile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the statement file
 *         filename:
 *           type: string
 *           description: Original filename
 *         type:
 *           type: string
 *           description: MIME type of the file
 *         size:
 *           type: integer
 *           description: File size in bytes
 *         uploadedAt:
 *           type: string
 *           format: date-time
 *           description: Upload timestamp
 *         status:
 *           type: string
 *           enum: [uploading, uploaded, parsing, parsed, parse_failed, failed]
 *           description: Current status of the file
 *         clientId:
 *           type: string
 *           description: ID of the associated client
 *       required:
 *         - id
 *         - filename
 *         - type
 *         - size
 *         - uploadedAt
 *         - status
 *         - clientId
 *
 *     ParseResult:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the parse result
 *         statementFileId:
 *           type: string
 *           description: ID of the associated statement file
 *         totalTransactions:
 *           type: integer
 *           description: Total number of transactions parsed
 *         dateRangeStart:
 *           type: string
 *           format: date-time
 *           description: Start date of the statement period
 *         dateRangeEnd:
 *           type: string
 *           format: date-time
 *           description: End date of the statement period
 *         accounts:
 *           type: object
 *           description: Parsed account and transaction data (JSON)
 *         status:
 *           type: string
 *           enum: [completed, failed, partial]
 *           description: Parse result status
 *         errors:
 *           type: object
 *           description: Parse errors if any (JSON)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Parse timestamp
 *       required:
 *         - id
 *         - statementFileId
 *         - totalTransactions
 *         - dateRangeStart
 *         - dateRangeEnd
 *         - accounts
 *         - status
 *         - createdAt
 */

/**
 * @swagger
 * /statements/upload:
 *   post:
 *     summary: Upload a bank statement file
 *     description: Create a new statement file upload record. Use the returned ID to get upload URL and upload the actual file.
 *     tags: [Statements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - filename
 *               - type
 *               - size
 *               - clientId
 *             properties:
 *               filename:
 *                 type: string
 *                 maxLength: 255
 *                 description: Original filename
 *               type:
 *                 type: string
 *                 enum: [application/pdf, text/csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet]
 *                 description: MIME type of the file
 *               size:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 52428800
 *                 description: File size in bytes (max 50MB)
 *               clientId:
 *                 type: string
 *                 description: ID of the client this statement belongs to
 *             example:
 *               filename: "statement_2024_01.csv"
 *               type: "text/csv"
 *               size: 1024000
 *               clientId: "clr1a2b3c4d5e6f7g8h9"
 *     responses:
 *       "201":
 *         description: Statement file upload record created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StatementFile'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         description: Client not found
 */

/**
 * @swagger
 * /statements/upload/{uploadId}/status:
 *   get:
 *     summary: Get upload status
 *     description: Retrieve the current status of a statement file upload
 *     tags: [Statements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uploadId
 *         required: true
 *         schema:
 *           type: string
 *         description: Statement file ID
 *     responses:
 *       "200":
 *         description: Upload status retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 status:
 *                   type: string
 *                   enum: [uploading, uploaded, parsing, parsed, parse_failed, failed]
 *                 filename:
 *                   type: string
 *                 uploadedAt:
 *                   type: string
 *                   format: date-time
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         description: Upload not found
 */

/**
 * @swagger
 * /statements/parse:
 *   post:
 *     summary: Parse uploaded statement files to extract transaction data
 *     description: Parse uploaded statement files to extract transaction data
 *     tags: [Statements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - statementFileIds
 *             properties:
 *               statementFileIds:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: string
 *                 description: Array of statement file IDs to parse
 *             example:
 *               statementFileIds: ["clr1a2b3c4d5e6f7g8h9", "clr2b3c4d5e6f7g8h0"]
 *     responses:
 *       "200":
 *         description: Statements parsed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   statementFileId:
 *                     type: string
 *                   totalTransactions:
 *                     type: integer
 *                   dateRange:
 *                     type: object
 *                     properties:
 *                       startDate:
 *                         type: string
 *                         format: date-time
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                   accounts:
 *                     type: array
 *                     items:
 *                       type: object
 *                   status:
 *                     type: string
 *                   errors:
 *                     type: array
 *                     items:
 *                       type: string
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         description: Statement files not found
 */

/**
 * @swagger
 * /statements:
 *   get:
 *     summary: Get statement files
 *     description: Retrieve a list of statement files with optional filtering
 *     tags: [Statements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         description: Filter by client ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [uploading, uploaded, parsing, parsed, parse_failed, failed]
 *         description: Filter by status
 *       - in: query
 *         name: filename
 *         schema:
 *           type: string
 *         description: Filter by filename (partial match)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by file type
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [uploadedAt, filename, size, status]
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
 *           default: 10
 *         description: Maximum number of results
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: Statement files retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StatementFile'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /statements/{id}:
 *   get:
 *     summary: Get statement file
 *     description: Retrieve a single statement file with parse results if available
 *     tags: [Statements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Statement file ID
 *     responses:
 *       "200":
 *         description: Statement file retrieved
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/StatementFile'
 *                 - type: object
 *                   properties:
 *                     ParseResult:
 *                       $ref: '#/components/schemas/ParseResult'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         description: Statement file not found
 *
 *   delete:
 *     summary: Delete statement file
 *     description: Delete a statement file and its parse results
 *     tags: [Statements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Statement file ID
 *     responses:
 *       "204":
 *         description: Statement file deleted
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         description: Statement file not found
 */

/**
 * @swagger
 * /statements/{id}/upload-url:
 *   get:
 *     summary: Generate upload URL
 *     description: Generate a signed URL for direct file upload to cloud storage
 *     tags: [Statements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Statement file ID
 *     responses:
 *       "200":
 *         description: Upload URL generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: Signed upload URL
 *                 headers:
 *                   type: object
 *                   description: Required headers for upload
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         description: Statement file not found
 */

/**
 * @swagger
 * /statements/analyze:
 *   post:
 *     summary: Perform comprehensive analysis on parsed statement data
 *     description: Analyze financial data and return comprehensive metrics like cash flow, liquidity, spending patterns, and idle balance analysis
 *     tags: [Statements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - statementFileIds
 *               - clientId
 *             properties:
 *               statementFileIds:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: string
 *                 description: Array of statement file IDs to analyze
 *               clientId:
 *                 type: string
 *                 description: ID of the client
 *               analysisOptions:
 *                 type: object
 *                 properties:
 *                   idleBalanceThreshold:
 *                     type: integer
 *                     minimum: 0
 *                     description: Threshold for idle balance analysis (default 250000)
 *                   volatilityPeriod:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 365
 *                     description: Period in days for volatility calculation
 *                   includeProjections:
 *                     type: boolean
 *                     description: Whether to include future projections
 *             example:
 *               statementFileIds: ["clr1a2b3c4d5e6f7g8h9"]
 *               clientId: "clr0a1b2c3d4e5f6g7h8"
 *               analysisOptions:
 *                 idleBalanceThreshold: 250000
 *     responses:
 *       "200":
 *         description: Analysis completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Analysis ID
 *                 clientId:
 *                   type: string
 *                   description: Client ID
 *                 statementFileIds:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Statement file IDs analyzed
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Analysis creation timestamp
 *                 status:
 *                   type: string
 *                   enum: [processing, completed, failed]
 *                   description: Analysis status
 *                 summary:
 *                   type: object
 *                   properties:
 *                     totalInflow:
 *                       type: number
 *                     totalOutflow:
 *                       type: number
 *                     netCashFlow:
 *                       type: number
 *                     avgDailyBalance:
 *                       type: number
 *                     transactionCount:
 *                       type: integer
 *                     dateRange:
 *                       type: object
 *                       properties:
 *                         startDate:
 *                           type: string
 *                           format: date-time
 *                         endDate:
 *                           type: string
 *                           format: date-time
 *                 liquidityMetrics:
 *                   type: object
 *                   properties:
 *                     avgDailyBalance:
 *                       type: number
 *                     minBalance:
 *                       type: number
 *                     maxBalance:
 *                       type: number
 *                     volatility:
 *                       type: number
 *                     liquidityRatio:
 *                       type: number
 *                 spendingBreakdown:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       percentage:
 *                         type: number
 *                       transactionCount:
 *                         type: integer
 *                 idleBalanceAnalysis:
 *                   type: object
 *                   properties:
 *                     avgIdleAmount:
 *                       type: number
 *                     daysWithIdleBalance:
 *                       type: integer
 *                     threshold:
 *                       type: number
 *                     potentialYieldGain:
 *                       type: number
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         description: Statement files or client not found
 */
