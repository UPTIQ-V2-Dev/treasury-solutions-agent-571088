import { clientService } from "../services/index.js";
import pick from "../utils/pick.js";
import { z } from 'zod';
const clientSchema = z.object({
    id: z.string(),
    name: z.string(),
    accountIds: z.array(z.string()),
    relationshipManager: z.string(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
});
const createClientTool = {
    id: 'client_create',
    name: 'Create Client',
    description: 'Create a new client',
    inputSchema: z.object({
        name: z.string(),
        accountIds: z.array(z.string()),
        relationshipManager: z.string(),
        status: z.string().optional()
    }),
    outputSchema: clientSchema,
    fn: async (inputs) => {
        const client = await clientService.createClient(inputs.name, inputs.accountIds, inputs.relationshipManager, inputs.status);
        return client;
    }
};
const getClientsTool = {
    id: 'client_get_all',
    name: 'Get All Clients',
    description: 'Get all clients',
    inputSchema: z.object({
        name: z.string().optional(),
        status: z.string().optional(),
        relationshipManager: z.string().optional(),
        sortBy: z.string().optional(),
        limit: z.number().int().optional(),
        page: z.number().int().optional()
    }),
    outputSchema: z.object({
        clients: z.array(clientSchema)
    }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fn: async (inputs) => {
        const result = await clientService.getAllClients();
        return { clients: result };
    }
};
const getClientTool = {
    id: 'client_get_by_id',
    name: 'Get Client By ID',
    description: 'Get a single client by their ID',
    inputSchema: z.object({
        clientId: z.string()
    }),
    outputSchema: clientSchema,
    fn: async (inputs) => {
        const client = await clientService.getClientById(inputs.clientId);
        if (!client) {
            throw new Error('Client not found');
        }
        return client;
    }
};
const updateClientTool = {
    id: 'client_update',
    name: 'Update Client',
    description: 'Update client information by ID',
    inputSchema: z.object({
        clientId: z.string(),
        name: z.string().optional(),
        accountIds: z.array(z.string()).optional(),
        relationshipManager: z.string().optional(),
        status: z.string().optional()
    }),
    outputSchema: clientSchema,
    fn: async (inputs) => {
        const updateBody = pick(inputs, ['name', 'accountIds', 'relationshipManager', 'status']);
        const client = await clientService.updateClientById(inputs.clientId, updateBody);
        return client;
    }
};
const deleteClientTool = {
    id: 'client_delete',
    name: 'Delete Client',
    description: 'Delete a client by their ID',
    inputSchema: z.object({
        clientId: z.string()
    }),
    outputSchema: z.object({
        success: z.boolean()
    }),
    fn: async (inputs) => {
        await clientService.deleteClientById(inputs.clientId);
        return { success: true };
    }
};
export const clientTools = [
    createClientTool,
    getClientsTool,
    getClientTool,
    updateClientTool,
    deleteClientTool
];
