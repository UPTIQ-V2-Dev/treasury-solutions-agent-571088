import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAuth = true, requireAdmin = false }: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    if (requireAuth && !isAuthenticated) {
        return (
            <Navigate
                to='/login'
                state={{ from: location }}
                replace
            />
        );
    }

    if (requireAuth && requireAdmin && user?.role !== 'ADMIN') {
        return (
            <Navigate
                to='/'
                replace
            />
        );
    }

    return <>{children}</>;
};
