import { userController } from "../controllers/index.js";
import { userService } from "../services/index.js";
import { Role } from '../generated/prisma/index.js';
import httpStatus from 'http-status';
import { beforeEach, describe, expect, it, vi } from 'vitest';
vi.mock('../services/index.ts');
const mockUserService = vi.mocked(userService);
// Mock Express app setup for testing controllers
const mockRequest = {
    body: {},
    params: {},
    validatedQuery: {},
    user: {}
};
const mockResponse = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis()
};
const mockNext = vi.fn();
describe('User Controller', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    describe('createUser', () => {
        it('should create user successfully', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
                role: Role.USER
            };
            const mockUser = {
                id: 1,
                email: userData.email,
                name: userData.name,
                role: userData.role,
                isEmailVerified: false,
                createdAt: new Date('2024-10-24T10:00:00Z'),
                updatedAt: new Date('2024-10-24T10:00:00Z'),
                password: 'encrypted_password'
            };
            mockRequest.body = userData;
            mockUserService.createUser.mockResolvedValue(mockUser);
            await userController.createUser(mockRequest, mockResponse, mockNext);
            expect(mockUserService.createUser).toHaveBeenCalledWith(userData.email, userData.password, userData.name, userData.role);
            expect(mockResponse.status).toHaveBeenCalledWith(httpStatus.CREATED);
            expect(mockResponse.send).toHaveBeenCalledWith({
                id: mockUser.id,
                email: mockUser.email,
                name: mockUser.name,
                role: mockUser.role,
                isEmailVerified: mockUser.isEmailVerified,
                createdAt: mockUser.createdAt,
                updatedAt: mockUser.updatedAt
            });
        });
    });
    describe('getUsers', () => {
        it('should return paginated users', async () => {
            const queryParams = {
                name: 'John',
                role: Role.USER,
                sortBy: 'name:asc',
                page: 1,
                limit: 10
            };
            const mockResult = {
                results: [
                    {
                        id: 1,
                        email: 'john@example.com',
                        name: 'John Doe',
                        role: Role.USER,
                        isEmailVerified: true,
                        createdAt: new Date('2024-10-24T10:00:00Z'),
                        updatedAt: new Date('2024-10-24T10:00:00Z')
                    }
                ],
                page: 1,
                limit: 10,
                totalPages: 1,
                totalResults: 1
            };
            mockRequest.validatedQuery = queryParams;
            mockUserService.queryUsers.mockResolvedValue(mockResult);
            await userController.getUsers(mockRequest, mockResponse, mockNext);
            expect(mockUserService.queryUsers).toHaveBeenCalledWith({ name: 'John', role: Role.USER }, { sortBy: 'name:asc', limit: 10, page: 1 });
            expect(mockResponse.send).toHaveBeenCalledWith(mockResult);
        });
    });
    describe('getUser', () => {
        it('should return user by id', async () => {
            const mockUser = {
                id: 1,
                email: 'test@example.com',
                name: 'Test User',
                role: Role.USER,
                isEmailVerified: true,
                createdAt: new Date('2024-10-24T10:00:00Z'),
                updatedAt: new Date('2024-10-24T10:00:00Z'),
                password: 'encrypted_password'
            };
            mockRequest.params = { userId: '1' };
            mockUserService.getUserById.mockResolvedValue(mockUser);
            await userController.getUser(mockRequest, mockResponse, mockNext);
            expect(mockUserService.getUserById).toHaveBeenCalledWith(1);
            expect(mockResponse.send).toHaveBeenCalledWith({
                id: mockUser.id,
                email: mockUser.email,
                name: mockUser.name,
                role: mockUser.role,
                isEmailVerified: mockUser.isEmailVerified,
                createdAt: mockUser.createdAt,
                updatedAt: mockUser.updatedAt
            });
        });
        it('should throw error if user not found', async () => {
            mockRequest.params = { userId: '999' };
            mockUserService.getUserById.mockResolvedValue(null);
            await userController.getUser(mockRequest, mockResponse, mockNext);
            expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
                statusCode: httpStatus.NOT_FOUND,
                message: 'User not found'
            }));
        });
    });
    describe('updateUser', () => {
        it('should update user successfully', async () => {
            const updateData = { name: 'Updated Name' };
            const mockUser = {
                id: 1,
                email: 'test@example.com',
                name: 'Updated Name',
                role: Role.USER,
                isEmailVerified: true,
                createdAt: new Date('2024-10-24T10:00:00Z'),
                updatedAt: new Date('2024-10-24T10:30:00Z'),
                password: 'encrypted_password'
            };
            mockRequest.params = { userId: '1' };
            mockRequest.body = updateData;
            mockUserService.updateUserById.mockResolvedValue(mockUser);
            await userController.updateUser(mockRequest, mockResponse, mockNext);
            expect(mockUserService.updateUserById).toHaveBeenCalledWith(1, updateData);
            expect(mockResponse.send).toHaveBeenCalledWith({
                id: mockUser.id,
                email: mockUser.email,
                name: mockUser.name,
                role: mockUser.role,
                isEmailVerified: mockUser.isEmailVerified,
                createdAt: mockUser.createdAt,
                updatedAt: mockUser.updatedAt
            });
        });
        it('should throw error if user not found during update', async () => {
            mockRequest.params = { userId: '999' };
            mockRequest.body = { name: 'Test' };
            mockUserService.updateUserById.mockResolvedValue(null);
            await userController.updateUser(mockRequest, mockResponse, mockNext);
            expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
                statusCode: httpStatus.NOT_FOUND,
                message: 'User not found'
            }));
        });
    });
    describe('deleteUser', () => {
        it('should delete user successfully', async () => {
            const mockUser = {
                id: 1,
                email: 'test@example.com',
                name: 'Test User',
                role: Role.USER,
                isEmailVerified: true,
                createdAt: new Date('2024-10-24T10:00:00Z'),
                updatedAt: new Date('2024-10-24T10:00:00Z'),
                password: 'encrypted_password'
            };
            mockRequest.params = { userId: '1' };
            mockUserService.deleteUserById.mockResolvedValue(mockUser);
            await userController.deleteUser(mockRequest, mockResponse, mockNext);
            expect(mockUserService.deleteUserById).toHaveBeenCalledWith(1);
            expect(mockResponse.send).toHaveBeenCalledWith({
                message: 'User deleted successfully'
            });
        });
    });
});
