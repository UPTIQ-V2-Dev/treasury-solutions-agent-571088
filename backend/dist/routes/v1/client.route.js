import { clientController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import { clientValidation } from "../../validations/index.js";
import express from 'express';
const router = express.Router();
// Authenticated routes
router
    .route('/')
    .post(auth('manageClients'), validate(clientValidation.createClient), clientController.createClient)
    .get(auth('getClients'), validate(clientValidation.getClients), clientController.getClients);
router
    .route('/:clientId')
    .get(auth('getClients'), validate(clientValidation.getClient), clientController.getClient)
    .patch(auth('manageClients'), validate(clientValidation.updateClient), clientController.updateClient)
    .delete(auth('manageClients'), validate(clientValidation.deleteClient), clientController.deleteClient);
export default router;
/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management and retrieval
 */
/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Create a client
 *     description: Create a new client. Requires manageClients permission.
 *     tags: [Clients]
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
 *               - accountIds
 *               - relationshipManager
 *             properties:
 *               name:
 *                 type: string
 *                 description: Client name
 *               accountIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of account IDs associated with the client
 *               relationshipManager:
 *                 type: string
 *                 description: Name of the relationship manager
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 default: active
 *                 description: Client status
 *             example:
 *               name: "ACME Corporation"
 *               accountIds: ["ACC-001", "ACC-002"]
 *               relationshipManager: "Sarah Johnson"
 *               status: "active"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all clients
 *     description: Retrieve all clients. Requires getClients permission.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Client name filter
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *         description: Client status filter
 *       - in: query
 *         name: relationshipManager
 *         schema:
 *           type: string
 *         description: Relationship manager filter
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of clients
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
/**
 * @swagger
 * /clients/{clientId}:
 *   get:
 *     summary: Get a client
 *     description: Get specific client details by ID. Requires getClients permission.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a client
 *     description: Update client information by ID. Requires manageClients permission.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Client name
 *               accountIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of account IDs associated with the client
 *               relationshipManager:
 *                 type: string
 *                 description: Name of the relationship manager
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 description: Client status
 *             example:
 *               name: "ACME Corporation Updated"
 *               relationshipManager: "John Smith"
 *               status: "active"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a client
 *     description: Delete a client by ID. Requires manageClients permission.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Client ID
 *         name:
 *           type: string
 *           description: Client name
 *         accountIds:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of account IDs associated with the client
 *         relationshipManager:
 *           type: string
 *           description: Name of the relationship manager
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           description: Client status
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Client creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Client last update timestamp
 *       example:
 *         id: "clx1234567890abcdef"
 *         name: "ACME Corporation"
 *         accountIds: ["ACC-001", "ACC-002"]
 *         relationshipManager: "Sarah Johnson"
 *         status: "active"
 *         createdAt: "2024-01-15T09:00:00Z"
 *         updatedAt: "2024-10-20T14:30:00Z"
 */
