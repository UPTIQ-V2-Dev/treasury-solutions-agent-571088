import { describe, it, expect, beforeEach, vi } from 'vitest';
import { userService } from '../services/index.ts';
import { Role } from '../generated/prisma/index.js';
import ApiError from '../utils/ApiError.ts';
import prisma from '../client.ts';
import { encryptPassword } from '../utils/encryption.ts';

vi.mock('../client.ts');
vi.mock('../utils/encryption.ts');

const mockPrisma = vi.mocked(prisma);
const mockEncryptPassword = vi.mocked(encryptPassword);

describe('User Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('createUser', () => {
        it('should create a user successfully', async () => {
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
                createdAt: new Date(),
                updatedAt: new Date(),
                password: 'encrypted_password'
            };

            mockPrisma.user.findUnique.mockResolvedValue(null);
            mockEncryptPassword.mockResolvedValue('encrypted_password');
            mockPrisma.user.create.mockResolvedValue(mockUser);

            const result = await userService.createUser(
                userData.email,
                userData.password,
                userData.name,
                userData.role
            );

            expect(result).toEqual(mockUser);
            expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
                where: { email: userData.email },
                select: expect.any(Object)
            });
            expect(mockEncryptPassword).toHaveBeenCalledWith(userData.password);
            expect(mockPrisma.user.create).toHaveBeenCalledWith({
                data: {
                    email: userData.email,
                    name: userData.name,
                    password: 'encrypted_password',
                    role: userData.role
                }
            });
        });

        it('should throw error if email already exists', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123'
            };

            mockPrisma.user.findUnique.mockResolvedValue({ id: 1, email: userData.email });

            await expect(
                userService.createUser(userData.email, userData.password)
            ).rejects.toThrow(ApiError);
        });
    });

    describe('queryUsers', () => {
        it('should return paginated users with filters', async () => {
            const filter = { name: 'John', role: 'USER' };
            const options = { page: 1, limit: 10, sortBy: 'name:asc' };

            const mockUsers = [
                {
                    id: 1,
                    email: 'john@example.com',
                    name: 'John Doe',
                    role: 'USER',
                    isEmailVerified: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ];

            mockPrisma.user.count.mockResolvedValue(1);
            mockPrisma.user.findMany.mockResolvedValue(mockUsers);

            const result = await userService.queryUsers(filter, options);

            expect(result).toEqual({
                results: mockUsers,
                page: 1,
                limit: 10,
                totalPages: 1,
                totalResults: 1
            });

            expect(mockPrisma.user.count).toHaveBeenCalledWith({
                where: {
                    name: { contains: 'John', mode: 'insensitive' },
                    role: 'USER'
                }
            });

            expect(mockPrisma.user.findMany).toHaveBeenCalledWith({
                where: {
                    name: { contains: 'John', mode: 'insensitive' },
                    role: 'USER'
                },
                select: expect.any(Object),
                skip: 0,
                take: 10,
                orderBy: { name: 'asc' }
            });
        });

        it('should handle pagination correctly', async () => {
            const filter = {};
            const options = { page: 2, limit: 5 };

            mockPrisma.user.count.mockResolvedValue(12);
            mockPrisma.user.findMany.mockResolvedValue([]);

            const result = await userService.queryUsers(filter, options);

            expect(result.page).toBe(2);
            expect(result.limit).toBe(5);
            expect(result.totalPages).toBe(3);
            expect(result.totalResults).toBe(12);

            expect(mockPrisma.user.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    skip: 5,
                    take: 5
                })
            );
        });
    });

    describe('getUserById', () => {
        it('should return user by id', async () => {
            const mockUser = {
                id: 1,
                email: 'test@example.com',
                name: 'Test User',
                role: 'USER',
                isEmailVerified: true,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            mockPrisma.user.findUnique.mockResolvedValue(mockUser);

            const result = await userService.getUserById(1);

            expect(result).toEqual(mockUser);
            expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
                select: expect.any(Object)
            });
        });

        it('should return null if user not found', async () => {
            mockPrisma.user.findUnique.mockResolvedValue(null);

            const result = await userService.getUserById(999);

            expect(result).toBeNull();
        });
    });

    describe('updateUserById', () => {
        it('should update user successfully', async () => {
            const userId = 1;
            const updateData = { name: 'Updated Name', email: 'updated@example.com' };
            
            const existingUser = { id: userId, email: 'old@example.com', name: 'Old Name' };
            const updatedUser = { 
                id: userId, 
                email: updateData.email, 
                name: updateData.name,
                role: 'USER',
                isEmailVerified: true,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            mockPrisma.user.findUnique
                .mockResolvedValueOnce(existingUser)
                .mockResolvedValueOnce(null); // No existing user with new email
            mockPrisma.user.update.mockResolvedValue(updatedUser);

            const result = await userService.updateUserById(userId, updateData);

            expect(result).toEqual(updatedUser);
            expect(mockPrisma.user.update).toHaveBeenCalledWith({
                where: { id: userId },
                data: updateData,
                select: expect.any(Object)
            });
        });

        it('should throw error if user not found', async () => {
            mockPrisma.user.findUnique.mockResolvedValue(null);

            await expect(
                userService.updateUserById(999, { name: 'Test' })
            ).rejects.toThrow(ApiError);
        });

        it('should throw error if email already taken by another user', async () => {
            const userId = 1;
            const updateData = { email: 'taken@example.com' };
            
            const existingUser = { id: userId, email: 'old@example.com', name: 'Old Name' };
            const userWithSameEmail = { id: 2 };

            mockPrisma.user.findUnique
                .mockResolvedValueOnce(existingUser)
                .mockResolvedValueOnce(userWithSameEmail);

            await expect(
                userService.updateUserById(userId, updateData)
            ).rejects.toThrow(ApiError);
        });

        it('should encrypt password if provided', async () => {
            const userId = 1;
            const updateData = { password: 'newpassword123' };
            
            const existingUser = { id: userId, email: 'test@example.com', name: 'Test' };
            const updatedUser = { 
                id: userId, 
                email: 'test@example.com',
                name: 'Test',
                role: 'USER',
                isEmailVerified: true,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            mockPrisma.user.findUnique.mockResolvedValue(existingUser);
            mockEncryptPassword.mockResolvedValue('encrypted_new_password');
            mockPrisma.user.update.mockResolvedValue(updatedUser);

            await userService.updateUserById(userId, updateData);

            expect(mockEncryptPassword).toHaveBeenCalledWith('newpassword123');
            expect(mockPrisma.user.update).toHaveBeenCalledWith({
                where: { id: userId },
                data: { password: 'encrypted_new_password' },
                select: expect.any(Object)
            });
        });
    });

    describe('deleteUserById', () => {
        it('should delete user successfully', async () => {
            const userId = 1;
            const mockUser = {
                id: userId,
                email: 'test@example.com',
                name: 'Test User',
                role: 'USER',
                isEmailVerified: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                password: 'encrypted_password'
            };

            mockPrisma.user.findUnique.mockResolvedValue(mockUser);
            mockPrisma.user.delete.mockResolvedValue(mockUser);

            const result = await userService.deleteUserById(userId);

            expect(result).toEqual(mockUser);
            expect(mockPrisma.user.delete).toHaveBeenCalledWith({
                where: { id: userId }
            });
        });

        it('should throw error if user not found', async () => {
            mockPrisma.user.findUnique.mockResolvedValue(null);

            await expect(
                userService.deleteUserById(999)
            ).rejects.toThrow(ApiError);
        });
    });
});