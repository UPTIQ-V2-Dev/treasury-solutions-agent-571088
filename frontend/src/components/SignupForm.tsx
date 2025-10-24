import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import type { SignupRequest } from '@/types/user';

const signupSchema = z
    .object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Please enter a valid email address'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
            .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
            .regex(/(?=.*\d)/, 'Password must contain at least one number'),
        confirmPassword: z.string()
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    });

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
    onSuccess?: () => void;
}

export const SignupForm = ({ onSuccess }: SignupFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { signup, isSignupPending, signupError } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        mode: 'onChange'
    });

    const onSubmit = async (data: SignupFormData) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { confirmPassword, ...signupData } = data;
            await signup(signupData as SignupRequest);
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
            {signupError && (
                <Alert variant='destructive'>
                    <AlertDescription>
                        {signupError instanceof Error ? signupError.message : 'Registration failed. Please try again.'}
                    </AlertDescription>
                </Alert>
            )}

            <div className='space-y-2'>
                <Label htmlFor='name'>Full Name</Label>
                <Input
                    id='name'
                    type='text'
                    placeholder='Enter your full name'
                    {...register('name')}
                    className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
            </div>

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
                        placeholder='Create a password'
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

            <div className='space-y-2'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <div className='relative'>
                    <Input
                        id='confirmPassword'
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Confirm your password'
                        {...register('confirmPassword')}
                        className={`pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                    <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='absolute right-0 top-0 h-full px-3 hover:bg-transparent'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? (
                            <EyeOff className='h-4 w-4 text-muted-foreground' />
                        ) : (
                            <Eye className='h-4 w-4 text-muted-foreground' />
                        )}
                    </Button>
                </div>
                {errors.confirmPassword && <p className='text-sm text-red-500'>{errors.confirmPassword.message}</p>}
            </div>

            <Button
                type='submit'
                className='w-full'
                disabled={!isValid || isSignupPending}
            >
                {isSignupPending ? (
                    <>
                        <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent' />
                        Creating Account...
                    </>
                ) : (
                    <>
                        <UserPlus className='mr-2 h-4 w-4' />
                        Create Account
                    </>
                )}
            </Button>
        </form>
    );
};
