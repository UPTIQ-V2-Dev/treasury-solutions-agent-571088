import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthLayout } from '@/components/AuthLayout';
import { LoginForm } from '@/components/LoginForm';
import { useAuth } from '@/hooks/useAuth';

export const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    const from = (location.state as any)?.from?.pathname || '/';

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleLoginSuccess = () => {
        // Small delay to ensure auth state is updated
        setTimeout(() => {
            navigate(from, { replace: true });
        }, 100);
    };

    return (
        <AuthLayout
            title='Welcome Back'
            description='Sign in to your treasury solutions account'
        >
            <LoginForm onSuccess={handleLoginSuccess} />

            <div className='mt-6 text-center'>
                <p className='text-sm text-muted-foreground'>
                    Don't have an account?{' '}
                    <Link
                        to='/signup'
                        className='font-medium text-primary hover:text-primary/80 underline'
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};
