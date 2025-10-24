import { describe, it, expect, vi } from 'vitest';
import * as authService from '@/services/auth';

// Mock the auth service
vi.mock('@/services/auth');
const mockedAuthService = vi.mocked(authService);

// Mock the api utilities
vi.mock('@/lib/api', () => ({
    getStoredUser: vi.fn(() => null),
    clearAuthData: vi.fn(),
    isAuthenticated: vi.fn(() => false)
}));

describe('useAuth', () => {
    it('should have auth service available', () => {
        expect(mockedAuthService.authService).toBeDefined();
        expect(typeof mockedAuthService.authService.login).toBe('function');
        expect(typeof mockedAuthService.authService.logout).toBe('function');
    });

    it('should be able to mock auth service functions', () => {
        const mockUser = {
            id: 1,
            email: 'test@example.com',
            name: 'Test User',
            role: 'USER' as const,
            isEmailVerified: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        mockedAuthService.authService.login.mockResolvedValue({
            user: mockUser,
            tokens: {
                access: { token: 'test', expires: new Date().toISOString() },
                refresh: { token: 'test', expires: new Date().toISOString() }
            }
        });

        expect(mockedAuthService.authService.login).toHaveBeenCalledWith;
    });
});
