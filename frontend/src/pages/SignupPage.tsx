import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/AuthLayout';
import { SignupForm } from '@/components/SignupForm';
import { useAuth } from '@/hooks/useAuth';

export const SignupPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSignupSuccess = () => {
        navigate('/', { replace: true });
    };

    return (
        <AuthLayout
            title='Create Account'
            description='Join thousands of businesses optimizing their treasury operations'
        >
            <SignupForm onSuccess={handleSignupSuccess} />

            <div className='mt-6 text-center'>
                <p className='text-sm text-muted-foreground'>
                    Already have an account?{' '}
                    <Link
                        to='/login'
                        className='font-medium text-primary hover:text-primary/80 underline'
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};
