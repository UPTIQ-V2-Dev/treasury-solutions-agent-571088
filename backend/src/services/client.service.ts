import prisma from '../client.ts';
import { Client, Prisma } from '../generated/prisma/index.js';
import ApiError from '../utils/ApiError.ts';
import httpStatus from 'http-status';

/**
 * Create a client
 * @param {Object} clientData
 * @returns {Promise<Client>}
 */
const createClient = async (
    name: string,
    accountIds: string[],
    relationshipManager: string,
    status?: string
): Promise<Client> => {
    return prisma.client.create({
        data: {
            name,
            accountIds,
            relationshipManager,
            status: status || 'active'
        }
    });
};

/**
 * Query for clients
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryClients = async <Key extends keyof Client>(
    filter: object,
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    },
    keys: Key[] = ['id', 'name', 'accountIds', 'relationshipManager', 'status', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<Client, Key>[]> => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    const clients = await prisma.client.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: page * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortType } : undefined
    });
    return clients as Pick<Client, Key>[];
};

/**
 * Get all clients
 * @returns {Promise<Client[]>}
 */
const getAllClients = async (): Promise<Client[]> => {
    return prisma.client.findMany({
        orderBy: { createdAt: 'desc' }
    });
};

/**
 * Get client by id
 * @param {string} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Client, Key> | null>}
 */
const getClientById = async <Key extends keyof Client>(
    id: string,
    keys: Key[] = ['id', 'name', 'accountIds', 'relationshipManager', 'status', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<Client, Key> | null> => {
    return (await prisma.client.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    })) as Promise<Pick<Client, Key> | null>;
};

/**
 * Update client by id
 * @param {string} clientId
 * @param {Object} updateBody
 * @returns {Promise<Client>}
 */
const updateClientById = async <Key extends keyof Client>(
    clientId: string,
    updateBody: Prisma.ClientUpdateInput,
    keys: Key[] = ['id', 'name', 'accountIds', 'relationshipManager', 'status', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<Client, Key> | null> => {
    const client = await getClientById(clientId, ['id', 'name']);
    if (!client) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Client not found');
    }
    const updatedClient = await prisma.client.update({
        where: { id: client.id },
        data: updateBody,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
    return updatedClient as Pick<Client, Key> | null;
};

/**
 * Delete client by id
 * @param {string} clientId
 * @returns {Promise<Client>}
 */
const deleteClientById = async (clientId: string): Promise<Client> => {
    const client = await getClientById(clientId);
    if (!client) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Client not found');
    }
    await prisma.client.delete({ where: { id: client.id } });
    return client;
};

export default {
    createClient,
    queryClients,
    getAllClients,
    getClientById,
    updateClientById,
    deleteClientById
};
