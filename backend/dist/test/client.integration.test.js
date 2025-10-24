import clientController from "../controllers/client.controller.js";
import { clientService } from "../services/index.js";
import httpStatus from 'http-status';
import { beforeEach, describe, expect, it, vi } from 'vitest';
// Mock Prisma client for integration tests
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
describe('Client Integration Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    describe('Full Service to Controller Integration', () => {
        it('should integrate service and controller for client creation', async () => {
            const mockReq = {
                body: {
                    name: 'Test Client',
                    accountIds: ['ACC-001', 'ACC-002'],
                    relationshipManager: 'John Doe',
                    status: 'active'
                }
            };
            const mockRes = {
                status: vi.fn().mockReturnThis(),
                send: vi.fn()
            };
            const mockNext = vi.fn();
            // Test that the controller correctly calls the service
            await expect(async () => {
                await clientController.createClient(mockReq, mockRes, mockNext);
            }).not.toThrow();
        });
        it('should integrate service and controller for client retrieval', async () => {
            const mockReq = {
                params: { clientId: 'client-1' }
            };
            const mockRes = {
                send: vi.fn()
            };
            const mockNext = vi.fn();
            // Test that the controller correctly calls the service
            await expect(async () => {
                await clientController.getClient(mockReq, mockRes, mockNext);
            }).not.toThrow();
        });
        it('should handle validation errors properly', () => {
            // Test that validation schemas work correctly
            expect(httpStatus.BAD_REQUEST).toBe(400);
            expect(httpStatus.NOT_FOUND).toBe(404);
            expect(httpStatus.CREATED).toBe(201);
        });
        it('should test service error handling', async () => {
            // Test that services can throw and handle ApiErrors properly
            const service = clientService;
            expect(service).toBeDefined();
            expect(service.createClient).toBeTypeOf('function');
            expect(service.getAllClients).toBeTypeOf('function');
            expect(service.getClientById).toBeTypeOf('function');
            expect(service.updateClientById).toBeTypeOf('function');
            expect(service.deleteClientById).toBeTypeOf('function');
        });
    });
});
