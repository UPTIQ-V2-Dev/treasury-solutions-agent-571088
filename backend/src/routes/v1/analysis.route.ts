import { analysisController } from '../../controllers/index.ts';
import auth from '../../middlewares/auth.ts';
import validate from '../../middlewares/validate.ts';
import { analysisValidation } from '../../validations/index.ts';
import express from 'express';

const router = express.Router();

// Analysis routes
router
    .route('/')
    .get(auth('getStatements'), validate(analysisValidation.queryAnalyses), analysisController.getAnalyses);

router
    .route('/:analysisId')
    .get(auth('getStatements'), validate(analysisValidation.getAnalysis), analysisController.getAnalysis)
    .delete(auth('manageStatements'), validate(analysisValidation.deleteAnalysis), analysisController.deleteAnalysis);

router
    .route('/:analysisId/transactions')
    .get(
        auth('getStatements'),
        validate(analysisValidation.getAnalysisTransactions),
        analysisController.getAnalysisTransactions
    );

export default router;

/**
 * @swagger
 * tags:
 *   name: Analysis
 *   description: Financial analysis and transaction data retrieval
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Analysis:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the analysis
 *         clientId:
 *           type: string
 *           description: ID of the associated client
 *         statementFileIds:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of statement file IDs analyzed
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Analysis creation timestamp
 *         status:
 *           type: string
 *           enum: [processing, completed, failed]
 *           description: Analysis status
 *         summary:
 *           type: object
 *           description: Analysis summary metrics (JSON)
 *         liquidityMetrics:
 *           type: object
 *           description: Liquidity analysis metrics (JSON)
 *         spendingBreakdown:
 *           type: object
 *           description: Spending breakdown by category (JSON)
 *         idleBalanceAnalysis:
 *           type: object
 *           description: Idle balance analysis results (JSON)
 *       required:
 *         - id
 *         - clientId
 *         - statementFileIds
 *         - createdAt
 *         - status
 *         - summary
 *         - liquidityMetrics
 *         - spendingBreakdown
 *         - idleBalanceAnalysis
 *
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the transaction
 *         date:
 *           type: string
 *           format: date-time
 *           description: Transaction date
 *         amount:
 *           type: number
 *           description: Transaction amount (absolute value)
 *         type:
 *           type: string
 *           enum: [credit, debit]
 *           description: Transaction type
 *         category:
 *           type: string
 *           description: Transaction category
 *         description:
 *           type: string
 *           description: Transaction description
 *         counterparty:
 *           type: string
 *           description: Transaction counterparty
 *         balanceAfter:
 *           type: number
 *           description: Account balance after transaction
 *         accountId:
 *           type: string
 *           description: Account identifier
 *       required:
 *         - id
 *         - date
 *         - amount
 *         - type
 *         - description
 *         - accountId
 */

/**
 * @swagger
 * /analysis:
 *   get:
 *     summary: Get all analyses
 *     description: Retrieve a list of analyses with optional filtering
 *     tags: [Analysis]
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
 *           enum: [processing, completed, failed]
 *         description: Filter by status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, status]
 *         description: Sort field
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
 *         description: Analyses retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Analysis'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /analysis/{analysisId}:
 *   get:
 *     summary: Get specific analysis details
 *     description: Retrieve comprehensive analysis details including summary, metrics, and breakdowns
 *     tags: [Analysis]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: analysisId
 *         required: true
 *         schema:
 *           type: string
 *         description: Analysis ID
 *     responses:
 *       "200":
 *         description: Analysis retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Analysis'
 *             example:
 *               id: "analysis-123"
 *               clientId: "1"
 *               statementFileIds: ["file-123"]
 *               createdAt: "2024-10-22T10:00:00Z"
 *               status: "completed"
 *               summary:
 *                 totalInflow: 875000
 *                 totalOutflow: 650000
 *                 netCashFlow: 225000
 *                 avgDailyBalance: 456000
 *                 transactionCount: 156
 *                 dateRange:
 *                   startDate: "2024-10-01T00:00:00Z"
 *                   endDate: "2024-10-31T00:00:00Z"
 *               liquidityMetrics:
 *                 avgDailyBalance: 456000
 *                 minBalance: 385000
 *                 maxBalance: 525000
 *                 volatility: 0.15
 *                 liquidityRatio: 2.8
 *               spendingBreakdown:
 *                 - category: "Payroll"
 *                   amount: 245000
 *                   percentage: 37.7
 *                   transactionCount: 8
 *               idleBalanceAnalysis:
 *                 avgIdleAmount: 185000
 *                 daysWithIdleBalance: 22
 *                 threshold: 250000
 *                 potentialYieldGain: 8500
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         description: Analysis not found
 *
 *   delete:
 *     summary: Delete an analysis
 *     description: Delete an analysis record and its associated data
 *     tags: [Analysis]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: analysisId
 *         required: true
 *         schema:
 *           type: string
 *         description: Analysis ID
 *     responses:
 *       "204":
 *         description: Analysis deleted
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         description: Analysis not found
 */

/**
 * @swagger
 * /analysis/{analysisId}/transactions:
 *   get:
 *     summary: Get paginated transaction data for an analysis
 *     description: Retrieve transaction data associated with a specific analysis with pagination
 *     tags: [Analysis]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: analysisId
 *         required: true
 *         schema:
 *           type: string
 *         description: Analysis ID
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
 *           maximum: 200
 *           default: 50
 *         description: Maximum number of transactions per page
 *     responses:
 *       "200":
 *         description: Transactions retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *                 totalCount:
 *                   type: integer
 *                   description: Total number of transactions
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *             example:
 *               transactions:
 *                 - id: "txn-1"
 *                   date: "2024-10-20T00:00:00Z"
 *                   amount: 25000
 *                   type: "credit"
 *                   category: "Customer Payment"
 *                   description: "WIRE TRANSFER FROM ABC CLIENT"
 *                   counterparty: "ABC CLIENT CORP"
 *                   balanceAfter: 485000
 *                   accountId: "ACC-001"
 *               totalCount: 156
 *               page: 1
 *               totalPages: 4
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         description: Analysis not found
 */
