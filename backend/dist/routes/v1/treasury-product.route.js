import treasuryProductController from "../../controllers/treasury-product.controller.js";
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import treasuryProductValidation from "../../validations/treasury-product.validation.js";
import express from 'express';
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     TreasuryProduct:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The treasury product ID
 *         name:
 *           type: string
 *           description: The product name
 *         category:
 *           type: string
 *           description: The product category (e.g., sweep, zba, deposit)
 *         description:
 *           type: string
 *           description: Detailed product description
 *         features:
 *           type: array
 *           items:
 *             type: string
 *           description: List of product features
 *         eligibilityRules:
 *           type: object
 *           description: Rules determining client eligibility
 *         benefits:
 *           type: object
 *           description: Product benefits and value propositions
 *         pricing:
 *           type: object
 *           description: Pricing structure and fees
 *         isActive:
 *           type: boolean
 *           description: Whether the product is currently available
 *       example:
 *         id: "prod-1"
 *         name: "Automated Investment Sweep"
 *         category: "sweep"
 *         description: "Automatically sweep idle balances into interest-bearing accounts"
 *         features: ["Automatic daily sweeping", "Customizable thresholds"]
 *         eligibilityRules: {"minBalance": 250000, "accountTypes": ["Operating", "Money Market"]}
 *         benefits: {"yieldImprovement": 2.5}
 *         pricing: {"setupFee": 500, "monthlyFee": 150, "basisPoints": 15}
 *         isActive: true
 */
/**
 * @swagger
 * tags:
 *   name: Treasury Products
 *   description: Treasury product management and information
 */
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all treasury products
 *     description: Retrieve a list of available treasury products with filtering options
 *     tags: [Treasury Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by product category
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by product name (partial match)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort field (default: name)
 *       - in: query
 *         name: sortType
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort direction (default: asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Maximum number of results per page (default: 50)
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
 *                 $ref: '#/components/schemas/TreasuryProduct'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 *   post:
 *     summary: Create treasury product
 *     description: Create a new treasury product (admin only)
 *     tags: [Treasury Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *               category:
 *                 type: string
 *                 description: Product category
 *               description:
 *                 type: string
 *                 description: Product description
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Product features
 *               eligibilityRules:
 *                 type: object
 *                 description: Eligibility rules
 *               benefits:
 *                 type: object
 *                 description: Product benefits
 *               pricing:
 *                 type: object
 *                 description: Pricing information
 *               isActive:
 *                 type: boolean
 *                 description: Whether product is active
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreasuryProduct'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 *   post:
 *     summary: Create treasury product
 *     description: Create a new treasury product (admin only)
 *     tags: [Treasury Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *               category:
 *                 type: string
 *                 description: Product category
 *               description:
 *                 type: string
 *                 description: Product description
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Product features
 *               eligibilityRules:
 *                 type: object
 *                 description: Eligibility rules
 *               benefits:
 *                 type: object
 *                 description: Product benefits
 *               pricing:
 *                 type: object
 *                 description: Pricing information
 *               isActive:
 *                 type: boolean
 *                 description: Whether product is active
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreasuryProduct'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */
router
    .route('/')
    .get(auth('getProducts'), validate(treasuryProductValidation.getTreasuryProducts), treasuryProductController.getTreasuryProducts)
    .post(auth('manageProducts'), validate(treasuryProductValidation.createTreasuryProduct), treasuryProductController.createTreasuryProduct);
/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get treasury product details
 *     description: Retrieve detailed information about a specific treasury product
 *     tags: [Treasury Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treasury product ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreasuryProduct'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */
router
    .route('/:productId')
    .get(auth('getProducts'), validate(treasuryProductValidation.getTreasuryProduct), treasuryProductController.getTreasuryProduct)
    .patch(auth('manageProducts'), validate(treasuryProductValidation.updateTreasuryProduct), treasuryProductController.updateTreasuryProduct)
    .delete(auth('manageProducts'), validate(treasuryProductValidation.deleteTreasuryProduct), treasuryProductController.deleteTreasuryProduct);
/**
 * @swagger
 * /products/{productId}/eligibility:
 *   post:
 *     summary: Check product eligibility
 *     description: Check if a client meets the eligibility requirements for a specific product
 *     tags: [Treasury Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treasury product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avgDailyBalance:
 *                 type: number
 *                 minimum: 0
 *                 description: Client's average daily balance
 *               transactionCount:
 *                 type: integer
 *                 minimum: 0
 *                 description: Client's transaction count
 *               netCashFlow:
 *                 type: number
 *                 description: Client's net cash flow
 *               volatility:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 1
 *                 description: Client's cash flow volatility
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 eligible:
 *                   type: boolean
 *                   description: Whether the client is eligible
 *                 reasons:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Reasons for ineligibility (if applicable)
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */
router
    .route('/:productId/eligibility')
    .post(auth('getProducts'), validate(treasuryProductValidation.checkProductEligibility), treasuryProductController.checkProductEligibility);
export default router;
