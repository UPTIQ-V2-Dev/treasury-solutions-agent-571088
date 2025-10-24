import { clientService } from '../services/index.ts';
import { clientTools } from '../tools/client.tool.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the services index
vi.mock('../services/index.ts', () => ({
    clientService: {
        createClient: vi.fn(),
        getAllClients: vi.fn(),
        getClientById: vi.fn(),
        updateClientById: vi.fn(),
        deleteClientById: vi.fn()
    }
}));

// Mock pick utility
vi.mock('../utils/pick.ts', () => ({
    default: vi.fn((obj, keys) => {
        const result: any = {};
        keys.forEach((key: string) => {
            if (obj[key] !== undefined) {
                result[key] = obj[key];
            }
        });
        return result;
    })
}));

const mockClientService = clientService as any;

describe('Client Tools', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('createClientTool', () => {
        const createClientTool = clientTools.find(tool => tool.id === 'client_create');

        it('should have correct metadata', () => {
            expect(createClientTool).toBeDefined();
            expect(createClientTool?.name).toBe('Create Client');
            expect(createClientTool?.description).toBe('Create a new client');
        });

        it('should create client successfully', async () => {
            const mockClient = {
                id: 'client-1',
                name: 'Test Client',
                accountIds: ['ACC-001', 'ACC-002'],
                relationshipManager: 'John Doe',
                status: 'active',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            mockClientService.createClient.mockResolvedValue(mockClient);

            const inputs = {
                name: 'Test Client',
                accountIds: ['ACC-001', 'ACC-002'],
                relationshipManager: 'John Doe',
                status: 'active'
            };

            const result = await createClientTool?.fn(inputs);

            expect(mockClientService.createClient).toHaveBeenCalledWith(
                'Test Client',
                ['ACC-001', 'ACC-002'],
                'John Doe',
                'active'
            );
            expect(result).toEqual(mockClient);
        });

        it('should create client without status', async () => {
            const mockClient = {
                id: 'client-1',
                name: 'Test Client',
                accountIds: ['ACC-001'],
                relationshipManager: 'John Doe',
                status: 'active',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            mockClientService.createClient.mockResolvedValue(mockClient);

            const inputs = {
                name: 'Test Client',
                accountIds: ['ACC-001'],
                relationshipManager: 'John Doe'
            };

            const result = await createClientTool?.fn(inputs);

            expect(mockClientService.createClient).toHaveBeenCalledWith(
                'Test Client',
                ['ACC-001'],
                'John Doe',
                undefined
            );
            expect(result).toEqual(mockClient);
        });
    });

    describe('getClientsTool', () => {
        const getClientsTool = clientTools.find(tool => tool.id === 'client_get_all');

        it('should have correct metadata', () => {
            expect(getClientsTool).toBeDefined();
            expect(getClientsTool?.name).toBe('Get All Clients');
            expect(getClientsTool?.description).toBe('Get all clients');
        });

        it('should get all clients successfully', async () => {
            const mockClients = [
                {
                    id: 'client-1',
                    name: 'Client 1',
                    accountIds: ['ACC-001'],
                    relationshipManager: 'John Doe',
                    status: 'active',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: 'client-2',
                    name: 'Client 2',
                    accountIds: ['ACC-002'],
                    relationshipManager: 'Jane Doe',
                    status: 'inactive',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ];

            mockClientService.getAllClients.mockResolvedValue(mockClients);

            const inputs = {};
            const result = await getClientsTool?.fn(inputs);

            expect(mockClientService.getAllClients).toHaveBeenCalled();
            expect(result).toEqual({ clients: mockClients });
        });

        it('should handle empty client list', async () => {
            mockClientService.getAllClients.mockResolvedValue([]);

            const inputs = {};
            const result = await getClientsTool?.fn(inputs);

            expect(mockClientService.getAllClients).toHaveBeenCalled();
            expect(result).toEqual({ clients: [] });
        });
    });

    describe('getClientTool', () => {
        const getClientTool = clientTools.find(tool => tool.id === 'client_get_by_id');

        it('should have correct metadata', () => {
            expect(getClientTool).toBeDefined();
            expect(getClientTool?.name).toBe('Get Client By ID');
            expect(getClientTool?.description).toBe('Get a single client by their ID');
        });

        it('should get client by id successfully', async () => {
            const mockClient = {
                id: 'client-1',
                name: 'Test Client',
                accountIds: ['ACC-001'],
                relationshipManager: 'John Doe',
                status: 'active',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            mockClientService.getClientById.mockResolvedValue(mockClient);

            const inputs = { clientId: 'client-1' };
            const result = await getClientTool?.fn(inputs);

            expect(mockClientService.getClientById).toHaveBeenCalledWith('client-1');
            expect(result).toEqual(mockClient);
        });

        it('should throw error when client not found', async () => {
            mockClientService.getClientById.mockResolvedValue(null);

            const inputs = { clientId: 'nonexistent-client' };

            await expect(getClientTool?.fn(inputs)).rejects.toThrow('Client not found');
        });
    });

    describe('updateClientTool', () => {
        const updateClientTool = clientTools.find(tool => tool.id === 'client_update');

        it('should have correct metadata', () => {
            expect(updateClientTool).toBeDefined();
            expect(updateClientTool?.name).toBe('Update Client');
            expect(updateClientTool?.description).toBe('Update client information by ID');
        });

        it('should update client successfully', async () => {
            const mockUpdatedClient = {
                id: 'client-1',
                name: 'Updated Client',
                accountIds: ['ACC-001'],
                relationshipManager: 'Jane Smith',
                status: 'active',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            mockClientService.updateClientById.mockResolvedValue(mockUpdatedClient);

            const inputs = {
                clientId: 'client-1',
                name: 'Updated Client',
                relationshipManager: 'Jane Smith'
            };

            const result = await updateClientTool?.fn(inputs);

            expect(mockClientService.updateClientById).toHaveBeenCalledWith('client-1', {
                name: 'Updated Client',
                relationshipManager: 'Jane Smith'
            });
            expect(result).toEqual(mockUpdatedClient);
        });

        it('should update client with partial data', async () => {
            const mockUpdatedClient = {
                id: 'client-1',
                name: 'Test Client',
                accountIds: ['ACC-001'],
                relationshipManager: 'John Doe',
                status: 'inactive',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            mockClientService.updateClientById.mockResolvedValue(mockUpdatedClient);

            const inputs = {
                clientId: 'client-1',
                status: 'inactive'
            };

            const result = await updateClientTool?.fn(inputs);

            expect(mockClientService.updateClientById).toHaveBeenCalledWith('client-1', { status: 'inactive' });
            expect(result).toEqual(mockUpdatedClient);
        });
    });

    describe('deleteClientTool', () => {
        const deleteClientTool = clientTools.find(tool => tool.id === 'client_delete');

        it('should have correct metadata', () => {
            expect(deleteClientTool).toBeDefined();
            expect(deleteClientTool?.name).toBe('Delete Client');
            expect(deleteClientTool?.description).toBe('Delete a client by their ID');
        });

        it('should delete client successfully', async () => {
            mockClientService.deleteClientById.mockResolvedValue({});

            const inputs = { clientId: 'client-1' };
            const result = await deleteClientTool?.fn(inputs);

            expect(mockClientService.deleteClientById).toHaveBeenCalledWith('client-1');
            expect(result).toEqual({ success: true });
        });

        it('should handle service errors', async () => {
            const error = new Error('Client not found');
            mockClientService.deleteClientById.mockRejectedValue(error);

            const inputs = { clientId: 'nonexistent-client' };

            await expect(deleteClientTool?.fn(inputs)).rejects.toThrow(error);
        });
    });

    describe('Tool schemas', () => {
        it('should have valid input and output schemas', () => {
            clientTools.forEach(tool => {
                expect(tool.inputSchema).toBeDefined();
                expect(tool.outputSchema).toBeDefined();
                expect(tool.id).toBeDefined();
                expect(tool.name).toBeDefined();
                expect(tool.description).toBeDefined();
                expect(tool.fn).toBeTypeOf('function');
            });
        });

        it('should have unique tool IDs', () => {
            const ids = clientTools.map(tool => tool.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(ids.length);
        });
    });
});
