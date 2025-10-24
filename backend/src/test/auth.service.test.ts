import prisma from '../client.ts';
import { Role, TokenType } from '../generated/prisma/index.js';
import authService from '../services/auth.service.ts';
import tokenService from '../services/token.service.ts';
import userService from '../services/user.service.ts';
import ApiError from '../utils/ApiError.ts';
import httpStatus from 'http-status';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock services
vi.mock('../client.ts');
vi.mock('../services/token.service.ts');
vi.mock('../services/user.service.ts');

const mockPrisma = {
    token: {
        findFirst: vi.fn(),
        delete: vi.fn(),
        deleteMany: vi.fn()
    },
    user: {
        update: vi.fn()
    }
};

vi.mocked(prisma).token = mockPrisma.token as any;
vi.mocked(prisma).user = mockPrisma.user as any;

describe('Auth Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('loginUserWithEmailAndPassword', () => {
        it('should return user without password on valid credentials', async () => {
            const mockUser = {
                id: 1,
                email: 'john@example.com',
                name: 'John Doe',
                password: '$2a$10$hashedpassword',
                role: Role.USER,
                isEmailVerified: true,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            vi.mocked(userService.getUserByEmail).mockResolvedValue(mockUser);
            vi.mocked(authService.isPasswordMatch).mockResolvedValue(true);

            const result = await authService.loginUserWithEmailAndPassword('john@example.com', 'password123');

            expect(result).toEqual({
                id: 1,
                email: 'john@example.com',
                name: 'John Doe',
                role: Role.USER,
                isEmailVerified: true,
                createdAt: mockUser.createdAt,
                updatedAt: mockUser.updatedAt
            });
            expect(result).not.toHaveProperty('password');
        });

        it('should throw error for invalid credentials', async () => {
            const mockUser = {
                id: 1,
                email: 'john@example.com',
                name: 'John Doe',
                password: '$2a$10$hashedpassword',
                role: Role.USER,
                isEmailVerified: true,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            vi.mocked(userService.getUserByEmail).mockResolvedValue(mockUser);
            vi.mocked(authService.isPasswordMatch).mockResolvedValue(false);

            await expect(
                authService.loginUserWithEmailAndPassword('john@example.com', 'wrongpassword')
            ).rejects.toThrow(new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password'));
        });

        it('should throw error for non-existent user', async () => {
            vi.mocked(userService.getUserByEmail).mockResolvedValue(null);

            await expect(
                authService.loginUserWithEmailAndPassword('nonexistent@example.com', 'password123')
            ).rejects.toThrow(new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password'));
        });
    });

    describe('logout', () => {
        it('should delete refresh token on valid token', async () => {
            const mockToken = {
                id: 1,
                token: 'refresh-token',
                type: TokenType.REFRESH,
                blacklisted: false
            };

            mockPrisma.token.findFirst.mockResolvedValue(mockToken);
            mockPrisma.token.delete.mockResolvedValue(mockToken);

            await authService.logout('refresh-token');

            expect(mockPrisma.token.findFirst).toHaveBeenCalledWith({
                where: {
                    token: 'refresh-token',
                    type: TokenType.REFRESH,
                    blacklisted: false
                }
            });
            expect(mockPrisma.token.delete).toHaveBeenCalledWith({ where: { id: 1 } });
        });

        it('should throw error for invalid token', async () => {
            mockPrisma.token.findFirst.mockResolvedValue(null);

            await expect(authService.logout('invalid-token')).rejects.toThrow(
                new ApiError(httpStatus.NOT_FOUND, 'Not found')
            );
        });
    });

    describe('refreshAuth', () => {
        it('should return new tokens on valid refresh token', async () => {
            const mockTokenData = { id: 1, userId: 123 };
            const mockAuthTokens = {
                access: { token: 'new-access-token', expires: new Date() },
                refresh: { token: 'new-refresh-token', expires: new Date() }
            };

            vi.mocked(tokenService.verifyToken).mockResolvedValue(mockTokenData as any);
            mockPrisma.token.delete.mockResolvedValue({});
            vi.mocked(tokenService.generateAuthTokens).mockResolvedValue(mockAuthTokens);

            const result = await authService.refreshAuth('valid-refresh-token');

            expect(result).toEqual(mockAuthTokens);
            expect(tokenService.verifyToken).toHaveBeenCalledWith('valid-refresh-token', TokenType.REFRESH);
            expect(mockPrisma.token.delete).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(tokenService.generateAuthTokens).toHaveBeenCalledWith({ id: 123 });
        });

        it('should throw error on invalid refresh token', async () => {
            vi.mocked(tokenService.verifyToken).mockRejectedValue(new Error('Invalid token'));

            await expect(authService.refreshAuth('invalid-token')).rejects.toThrow(
                new ApiError(httpStatus.UNAUTHORIZED, 'Invalid or expired refresh token')
            );
        });
    });

    describe('resetPassword', () => {
        it('should reset password with valid token', async () => {
            const mockTokenData = { userId: 123 };
            const mockUser = {
                id: 123,
                email: 'john@example.com',
                name: 'John Doe',
                password: '$2a$10$oldhashedpassword',
                role: Role.USER,
                isEmailVerified: true,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            const encryptedPassword = '$2a$10$newhashedpassword';

            vi.mocked(tokenService.verifyToken).mockResolvedValue(mockTokenData as any);
            vi.mocked(userService.getUserById).mockResolvedValue(mockUser);
            vi.mocked(authService.encryptPassword).mockResolvedValue(encryptedPassword);
            vi.mocked(userService.updateUserById).mockResolvedValue(mockUser);
            mockPrisma.token.deleteMany.mockResolvedValue({ count: 1 });

            await authService.resetPassword('valid-reset-token', 'newPassword123');

            expect(tokenService.verifyToken).toHaveBeenCalledWith('valid-reset-token', TokenType.RESET_PASSWORD);
            expect(userService.updateUserById).toHaveBeenCalledWith(123, { password: encryptedPassword });
            expect(mockPrisma.token.deleteMany).toHaveBeenCalledWith({
                where: { userId: 123, type: TokenType.RESET_PASSWORD }
            });
        });

        it('should throw error for invalid token', async () => {
            vi.mocked(tokenService.verifyToken).mockRejectedValue(new Error('Invalid token'));

            await expect(authService.resetPassword('invalid-token', 'newPassword123')).rejects.toThrow(
                new ApiError(httpStatus.UNAUTHORIZED, 'Invalid or expired reset token')
            );
        });

        it('should throw error if user not found', async () => {
            const mockTokenData = { userId: 123 };

            vi.mocked(tokenService.verifyToken).mockResolvedValue(mockTokenData as any);
            vi.mocked(userService.getUserById).mockResolvedValue(null);

            await expect(authService.resetPassword('valid-token', 'newPassword123')).rejects.toThrow(
                new ApiError(httpStatus.UNAUTHORIZED, 'Invalid or expired reset token')
            );
        });
    });

    describe('verifyEmail', () => {
        it('should verify email with valid token', async () => {
            const mockTokenData = { userId: 123 };
            const mockUser = {
                id: 123,
                email: 'john@example.com',
                name: 'John Doe',
                password: '$2a$10$hashedpassword',
                role: Role.USER,
                isEmailVerified: true,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            vi.mocked(tokenService.verifyToken).mockResolvedValue(mockTokenData as any);
            mockPrisma.token.deleteMany.mockResolvedValue({ count: 1 });
            vi.mocked(userService.updateUserById).mockResolvedValue(mockUser);

            await authService.verifyEmail('valid-verify-token');

            expect(tokenService.verifyToken).toHaveBeenCalledWith('valid-verify-token', TokenType.VERIFY_EMAIL);
            expect(mockPrisma.token.deleteMany).toHaveBeenCalledWith({
                where: { userId: 123, type: TokenType.VERIFY_EMAIL }
            });
            expect(userService.updateUserById).toHaveBeenCalledWith(123, { isEmailVerified: true });
        });

        it('should throw error for invalid token', async () => {
            vi.mocked(tokenService.verifyToken).mockRejectedValue(new Error('Invalid token'));

            await expect(authService.verifyEmail('invalid-token')).rejects.toThrow(
                new ApiError(httpStatus.UNAUTHORIZED, 'Invalid or expired verification token')
            );
        });
    });
});
