import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth';
import { getStoredUser, clearAuthData, isAuthenticated as checkAuthStatus } from '@/lib/api';
import type { User, LoginRequest, SignupRequest } from '@/types/user';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(getStoredUser());
    const [isAuthenticated, setIsAuthenticated] = useState(checkAuthStatus());

    useEffect(() => {
        const storedUser = getStoredUser();
        const authStatus = checkAuthStatus();
        setUser(storedUser);
        setIsAuthenticated(authStatus);
    }, []);

    const loginMutation = useMutation({
        mutationFn: authService.login,
        onSuccess: authResponse => {
            setUser(authResponse.user);
            setIsAuthenticated(true);
        },
        onError: () => {
            setUser(null);
            setIsAuthenticated(false);
        }
    });

    const signupMutation = useMutation({
        mutationFn: authService.register,
        onSuccess: authResponse => {
            setUser(authResponse.user);
            setIsAuthenticated(true);
        },
        onError: () => {
            setUser(null);
            setIsAuthenticated(false);
        }
    });

    const logoutMutation = useMutation({
        mutationFn: authService.logout,
        onSettled: () => {
            clearAuthData();
            setUser(null);
            setIsAuthenticated(false);
        }
    });

    const login = (credentials: LoginRequest) => {
        return loginMutation.mutateAsync(credentials);
    };

    const signup = (userData: SignupRequest) => {
        return signupMutation.mutateAsync(userData);
    };

    const logout = () => {
        return logoutMutation.mutateAsync();
    };

    return {
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        isLoading: loginMutation.isPending || signupMutation.isPending || logoutMutation.isPending,
        loginError: loginMutation.error,
        signupError: signupMutation.error,
        isLoginPending: loginMutation.isPending,
        isSignupPending: signupMutation.isPending
    };
};
