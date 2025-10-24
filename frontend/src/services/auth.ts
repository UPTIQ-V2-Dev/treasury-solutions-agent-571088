import { mockAuthResponse } from '@/data/mockData';
import { api, clearAuthData, getStoredRefreshToken, setAuthData } from '@/lib/api';
import { mockApiDelay } from '@/lib/utils';
import type { AuthResponse, LoginRequest, SignupRequest } from '@/types/user';

export const authService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: login ---', credentials);
            await mockApiDelay();

            // Validate mock credentials
            if (credentials.email === 'user@example.com' && credentials.password === 'password') {
                setAuthData(mockAuthResponse);
                return mockAuthResponse;
            } else if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
                const adminAuthResponse = {
                    ...mockAuthResponse,
                    user: {
                        ...mockAuthResponse.user,
                        id: 2,
                        email: 'admin@example.com',
                        name: 'Jane Smith',
                        role: 'ADMIN' as const
                    }
                };
                setAuthData(adminAuthResponse);
                return adminAuthResponse;
            } else {
                throw new Error('Invalid credentials');
            }
        }
        const response = await api.post('/auth/login', credentials);
        console.log('response in login', response);
        setAuthData(response.data);
        return response.data;
    },

    register: async (userData: SignupRequest): Promise<AuthResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: register ---', userData);
            await mockApiDelay();
            setAuthData(mockAuthResponse);
            return mockAuthResponse;
        }
        const response = await api.post('/auth/register', userData);
        setAuthData(response.data);
        return response.data;
    },

    refreshToken: async (): Promise<AuthResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: refreshToken ---');
            await mockApiDelay();
            setAuthData(mockAuthResponse);
            return mockAuthResponse;
        }
        const response = await api.post('/auth/refresh');
        setAuthData(response.data);
        return response.data;
    },

    logout: async (): Promise<void> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: logout ---');
            await mockApiDelay();
            clearAuthData();
            return;
        }
        const refreshToken = getStoredRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token found');
        }
        await api.post('/auth/logout', { refreshToken });
        clearAuthData();
    }
};
