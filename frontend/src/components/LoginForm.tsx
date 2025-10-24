import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import type { LoginRequest } from '@/types/user';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
    onSuccess?: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const { login, isLoginPending, loginError } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange'
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data as LoginRequest);
            onSuccess?.();
        } catch {
            // Error is handled by the hook
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4'
        >
            {loginError && (
                <Alert variant='destructive'>
                    <AlertDescription>
                        {loginError instanceof Error
                            ? loginError.message
                            : 'Invalid email or password. Please try again.'}
                    </AlertDescription>
                </Alert>
            )}

            <div className='space-y-2'>
                <Label htmlFor='email'>Email Address</Label>
                <Input
                    id='email'
                    type='email'
                    placeholder='Enter your email'
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
            </div>

            <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                    <Input
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        {...register('password')}
                        className={`pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    />
                    <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='absolute right-0 top-0 h-full px-3 hover:bg-transparent'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff className='h-4 w-4 text-muted-foreground' />
                        ) : (
                            <Eye className='h-4 w-4 text-muted-foreground' />
                        )}
                    </Button>
                </div>
                {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
            </div>

            <Button
                type='submit'
                className='w-full'
                disabled={!isValid || isLoginPending}
            >
                {isLoginPending ? (
                    <>
                        <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent' />
                        Signing In...
                    </>
                ) : (
                    <>
                        <LogIn className='mr-2 h-4 w-4' />
                        Sign In
                    </>
                )}
            </Button>

            <div className='text-center text-sm text-muted-foreground mt-4'>
                <p>Demo credentials:</p>
                <p>
                    <strong>Email:</strong> user@example.com
                </p>
                <p>
                    <strong>Password:</strong> password
                </p>
            </div>
        </form>
    );
};
