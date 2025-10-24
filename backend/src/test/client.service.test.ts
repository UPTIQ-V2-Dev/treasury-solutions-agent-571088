import prisma from '../client.ts';
import clientService from '../services/client.service.ts';
import ApiError from '../utils/ApiError.ts';
import httpStatus from 'http-status';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock Prisma client
vi.mock('../client.ts', () => ({
    default: {
        client: {
            create: vi.fn(),
            findMany: vi.fn(),
            findUnique: vi.fn(),
            update: vi.fn(),
            delete: vi.fn()
        }
    }
}));

const mockPrismaClient = prisma as any;

describe('Client Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('createClient', () => {
        const mockClient = {
            id: 'client-1',
            name: 'Test Client',
            accountIds: ['ACC-001', 'ACC-002'],
            relationshipManager: 'John Doe',
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        it('should create a client successfully', async () => {
            mockPrismaClient.client.create.mockResolvedValue(mockClient);

            const result = await clientService.createClient(
                'Test Client',
                ['ACC-001', 'ACC-002'],
                'John Doe',
                'active'
            );

            expect(mockPrismaClient.client.create).toHaveBeenCalledWith({
                data: {
                    name: 'Test Client',
                    accountIds: ['ACC-001', 'ACC-002'],
                    relationshipManager: 'John Doe',
                    status: 'active'
                }
            });
            expect(result).toEqual(mockClient);
        });

        it('should create a client with default active status', async () => {
            mockPrismaClient.client.create.mockResolvedValue(mockClient);

            await clientService.createClient('Test Client', ['ACC-001'], 'John Doe');

            expect(mockPrismaClient.client.create).toHaveBeenCalledWith({
                data: {
                    name: 'Test Client',
                    accountIds: ['ACC-001'],
                    relationshipManager: 'John Doe',
                    status: 'active'
                }
            });
        });
    });

    describe('getAllClients', () => {
        it('should return all clients ordered by creation date', async () => {
            const mockClients = [
                { id: 'client-1', name: 'Client 1', createdAt: new Date() },
                { id: 'client-2', name: 'Client 2', createdAt: new Date() }
            ];
            mockPrismaClient.client.findMany.mockResolvedValue(mockClients);

            const result = await clientService.getAllClients();

            expect(mockPrismaClient.client.findMany).toHaveBeenCalledWith({
                orderBy: { createdAt: 'desc' }
            });
            expect(result).toEqual(mockClients);
        });
    });

    describe('getClientById', () => {
        const mockClient = {
            id: 'client-1',
            name: 'Test Client',
            accountIds: ['ACC-001'],
            relationshipManager: 'John Doe',
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        it('should return client by id', async () => {
            mockPrismaClient.client.findUnique.mockResolvedValue(mockClient);

            const result = await clientService.getClientById('client-1');

            expect(mockPrismaClient.client.findUnique).toHaveBeenCalledWith({
                where: { id: 'client-1' },
                select: {
                    id: true,
                    name: true,
                    accountIds: true,
                    relationshipManager: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            expect(result).toEqual(mockClient);
        });

        it('should return null if client not found', async () => {
            mockPrismaClient.client.findUnique.mockResolvedValue(null);

            const result = await clientService.getClientById('nonexistent-client');

            expect(result).toBeNull();
        });

        it('should return client with custom keys', async () => {
            const clientWithCustomKeys = { id: 'client-1', name: 'Test Client' };
            mockPrismaClient.client.findUnique.mockResolvedValue(clientWithCustomKeys);

            const result = await clientService.getClientById('client-1', ['id', 'name']);

            expect(mockPrismaClient.client.findUnique).toHaveBeenCalledWith({
                where: { id: 'client-1' },
                select: { id: true, name: true }
            });
            expect(result).toEqual(clientWithCustomKeys);
        });
    });

    describe('updateClientById', () => {
        const mockClient = {
            id: 'client-1',
            name: 'Updated Client',
            accountIds: ['ACC-001'],
            relationshipManager: 'Jane Doe',
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        it('should update client successfully', async () => {
            mockPrismaClient.client.findUnique.mockResolvedValue({ id: 'client-1', name: 'Original Client' });
            mockPrismaClient.client.update.mockResolvedValue(mockClient);

            const updateBody = { name: 'Updated Client', relationshipManager: 'Jane Doe' };
            const result = await clientService.updateClientById('client-1', updateBody);

            expect(mockPrismaClient.client.findUnique).toHaveBeenCalledWith({
                where: { id: 'client-1' },
                select: { id: true, name: true }
            });
            expect(mockPrismaClient.client.update).toHaveBeenCalledWith({
                where: { id: 'client-1' },
                data: updateBody,
                select: {
                    id: true,
                    name: true,
                    accountIds: true,
                    relationshipManager: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            expect(result).toEqual(mockClient);
        });

        it('should throw ApiError if client not found', async () => {
            mockPrismaClient.client.findUnique.mockResolvedValue(null);

            const updateBody = { name: 'Updated Client' };

            await expect(clientService.updateClientById('nonexistent-client', updateBody)).rejects.toThrow(
                new ApiError(httpStatus.NOT_FOUND, 'Client not found')
            );
        });
    });

    describe('deleteClientById', () => {
        const mockClient = {
            id: 'client-1',
            name: 'Test Client',
            accountIds: ['ACC-001'],
            relationshipManager: 'John Doe',
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        it('should delete client successfully', async () => {
            mockPrismaClient.client.findUnique.mockResolvedValue(mockClient);
            mockPrismaClient.client.delete.mockResolvedValue(mockClient);

            const result = await clientService.deleteClientById('client-1');

            expect(mockPrismaClient.client.findUnique).toHaveBeenCalledWith({
                where: { id: 'client-1' },
                select: {
                    id: true,
                    name: true,
                    accountIds: true,
                    relationshipManager: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            expect(mockPrismaClient.client.delete).toHaveBeenCalledWith({
                where: { id: 'client-1' }
            });
            expect(result).toEqual(mockClient);
        });

        it('should throw ApiError if client not found', async () => {
            mockPrismaClient.client.findUnique.mockResolvedValue(null);

            await expect(clientService.deleteClientById('nonexistent-client')).rejects.toThrow(
                new ApiError(httpStatus.NOT_FOUND, 'Client not found')
            );
        });
    });

    describe('queryClients', () => {
        const mockClients = [
            { id: 'client-1', name: 'Client 1', status: 'active' },
            { id: 'client-2', name: 'Client 2', status: 'inactive' }
        ];

        it('should query clients with default options', async () => {
            mockPrismaClient.client.findMany.mockResolvedValue(mockClients);

            const result = await clientService.queryClients({}, {});

            expect(mockPrismaClient.client.findMany).toHaveBeenCalledWith({
                where: {},
                select: {
                    id: true,
                    name: true,
                    accountIds: true,
                    relationshipManager: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true
                },
                skip: 1 * 10,
                take: 10,
                orderBy: undefined
            });
            expect(result).toEqual(mockClients);
        });

        it('should query clients with custom options', async () => {
            mockPrismaClient.client.findMany.mockResolvedValue(mockClients);

            const filter = { status: 'active' };
            const options = { page: 2, limit: 5, sortBy: 'name', sortType: 'asc' as const };

            const result = await clientService.queryClients(filter, options);

            expect(mockPrismaClient.client.findMany).toHaveBeenCalledWith({
                where: filter,
                select: {
                    id: true,
                    name: true,
                    accountIds: true,
                    relationshipManager: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true
                },
                skip: 2 * 5,
                take: 5,
                orderBy: { name: 'asc' }
            });
            expect(result).toEqual(mockClients);
        });

        it('should query clients with custom keys', async () => {
            const clientsWithCustomKeys = [
                { id: 'client-1', name: 'Client 1' },
                { id: 'client-2', name: 'Client 2' }
            ];
            mockPrismaClient.client.findMany.mockResolvedValue(clientsWithCustomKeys);

            const result = await clientService.queryClients({}, {}, ['id', 'name']);

            expect(mockPrismaClient.client.findMany).toHaveBeenCalledWith({
                where: {},
                select: { id: true, name: true },
                skip: 1 * 10,
                take: 10,
                orderBy: undefined
            });
            expect(result).toEqual(clientsWithCustomKeys);
        });
    });
});
