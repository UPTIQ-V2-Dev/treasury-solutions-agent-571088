import clientController from "../controllers/client.controller.js";
import { clientService } from "../services/index.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from 'http-status';
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
// Mock catchAsyncWithAuth
vi.mock('../utils/catchAsyncWithAuth.ts', () => ({
    default: vi.fn(fn => fn)
}));
const mockClientService = clientService;
describe('Client Controller', () => {
    let mockReq;
    let mockRes;
    let mockNext;
    beforeEach(() => {
        vi.clearAllMocks();
        mockReq = {
            body: {},
            params: {},
            validatedQuery: {},
            user: { id: 1, role: 'ADMIN' }
        };
        mockRes = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis()
        };
        mockNext = vi.fn();
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
        it('should create client successfully', async () => {
            mockReq.body = {
                name: 'Test Client',
                accountIds: ['ACC-001', 'ACC-002'],
                relationshipManager: 'John Doe',
                status: 'active'
            };
            mockClientService.createClient.mockResolvedValue(mockClient);
            await clientController.createClient(mockReq, mockRes, mockNext);
            expect(mockClientService.createClient).toHaveBeenCalledWith('Test Client', ['ACC-001', 'ACC-002'], 'John Doe', 'active');
            expect(mockRes.status).toHaveBeenCalledWith(httpStatus.CREATED);
            expect(mockRes.send).toHaveBeenCalledWith(mockClient);
        });
        it('should create client without status (defaults to active)', async () => {
            mockReq.body = {
                name: 'Test Client',
                accountIds: ['ACC-001'],
                relationshipManager: 'Jane Doe'
            };
            mockClientService.createClient.mockResolvedValue(mockClient);
            await clientController.createClient(mockReq, mockRes, mockNext);
            expect(mockClientService.createClient).toHaveBeenCalledWith('Test Client', ['ACC-001'], 'Jane Doe', undefined);
            expect(mockRes.status).toHaveBeenCalledWith(httpStatus.CREATED);
            expect(mockRes.send).toHaveBeenCalledWith(mockClient);
        });
    });
    describe('getClients', () => {
        const mockClients = [
            {
                id: 'client-1',
                name: 'Client 1',
                accountIds: ['ACC-001'],
                relationshipManager: 'John Doe',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 'client-2',
                name: 'Client 2',
                accountIds: ['ACC-002'],
                relationshipManager: 'Jane Doe',
                status: 'inactive',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
        it('should get all clients successfully', async () => {
            mockClientService.getAllClients.mockResolvedValue(mockClients);
            await clientController.getClients(mockReq, mockRes, mockNext);
            expect(mockClientService.getAllClients).toHaveBeenCalled();
            expect(mockRes.send).toHaveBeenCalledWith(mockClients);
        });
        it('should return empty array when no clients exist', async () => {
            mockClientService.getAllClients.mockResolvedValue([]);
            await clientController.getClients(mockReq, mockRes, mockNext);
            expect(mockClientService.getAllClients).toHaveBeenCalled();
            expect(mockRes.send).toHaveBeenCalledWith([]);
        });
    });
    describe('getClient', () => {
        const mockClient = {
            id: 'client-1',
            name: 'Test Client',
            accountIds: ['ACC-001'],
            relationshipManager: 'John Doe',
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        it('should get client by id successfully', async () => {
            mockReq.params = { clientId: 'client-1' };
            mockClientService.getClientById.mockResolvedValue(mockClient);
            await clientController.getClient(mockReq, mockRes, mockNext);
            expect(mockClientService.getClientById).toHaveBeenCalledWith('client-1');
            expect(mockRes.send).toHaveBeenCalledWith(mockClient);
        });
        it('should throw ApiError when client not found', async () => {
            mockReq.params = { clientId: 'nonexistent-client' };
            mockClientService.getClientById.mockResolvedValue(null);
            await expect(clientController.getClient(mockReq, mockRes, mockNext)).rejects.toThrow(new ApiError(httpStatus.NOT_FOUND, 'Client not found'));
        });
    });
    describe('updateClient', () => {
        const mockUpdatedClient = {
            id: 'client-1',
            name: 'Updated Client',
            accountIds: ['ACC-001'],
            relationshipManager: 'Jane Smith',
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        it('should update client successfully', async () => {
            mockReq.params = { clientId: 'client-1' };
            mockReq.body = { name: 'Updated Client', relationshipManager: 'Jane Smith' };
            mockClientService.updateClientById.mockResolvedValue(mockUpdatedClient);
            await clientController.updateClient(mockReq, mockRes, mockNext);
            expect(mockClientService.updateClientById).toHaveBeenCalledWith('client-1', {
                name: 'Updated Client',
                relationshipManager: 'Jane Smith'
            });
            expect(mockRes.send).toHaveBeenCalledWith(mockUpdatedClient);
        });
        it('should update client with partial data', async () => {
            mockReq.params = { clientId: 'client-1' };
            mockReq.body = { status: 'inactive' };
            mockClientService.updateClientById.mockResolvedValue(mockUpdatedClient);
            await clientController.updateClient(mockReq, mockRes, mockNext);
            expect(mockClientService.updateClientById).toHaveBeenCalledWith('client-1', { status: 'inactive' });
            expect(mockRes.send).toHaveBeenCalledWith(mockUpdatedClient);
        });
    });
    describe('deleteClient', () => {
        it('should delete client successfully', async () => {
            mockReq.params = { clientId: 'client-1' };
            mockClientService.deleteClientById.mockResolvedValue({});
            await clientController.deleteClient(mockReq, mockRes, mockNext);
            expect(mockClientService.deleteClientById).toHaveBeenCalledWith('client-1');
            expect(mockRes.status).toHaveBeenCalledWith(httpStatus.NO_CONTENT);
            expect(mockRes.send).toHaveBeenCalled();
        });
        it('should handle delete with service error', async () => {
            mockReq.params = { clientId: 'nonexistent-client' };
            const error = new ApiError(httpStatus.NOT_FOUND, 'Client not found');
            mockClientService.deleteClientById.mockRejectedValue(error);
            await expect(clientController.deleteClient(mockReq, mockRes, mockNext)).rejects.toThrow(error);
        });
    });
});
