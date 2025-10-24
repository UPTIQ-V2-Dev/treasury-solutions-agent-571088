import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@/test/test-utils';
import { LoginForm } from '../LoginForm';

// Mock the useAuth hook
vi.mock('@/hooks/useAuth', () => ({
    useAuth: vi.fn(() => ({
        login: vi.fn(),
        isLoginPending: false,
        loginError: null
    }))
}));

describe('LoginForm', () => {
    it('renders login form elements', () => {
        render(<LoginForm />);

        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('shows validation errors for empty fields', async () => {
        const user = userEvent.setup();
        render(<LoginForm />);

        const submitButton = screen.getByRole('button', { name: /sign in/i });

        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
            expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
        });
    });

    it('shows validation error for invalid email', async () => {
        const user = userEvent.setup();
        render(<LoginForm />);

        const emailInput = screen.getByLabelText(/email address/i);
        await user.type(emailInput, 'invalid-email');

        const submitButton = screen.getByRole('button', { name: /sign in/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
        });
    });

    it('shows validation error for short password', async () => {
        const user = userEvent.setup();
        render(<LoginForm />);

        const passwordInput = screen.getByLabelText(/password/i);
        await user.type(passwordInput, '123');

        const submitButton = screen.getByRole('button', { name: /sign in/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
        });
    });

    it('toggles password visibility', async () => {
        const user = userEvent.setup();
        render(<LoginForm />);

        const passwordInput = screen.getByLabelText(/password/i);
        const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });

        expect(passwordInput).toHaveAttribute('type', 'password');

        await user.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'text');

        await user.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('displays demo credentials information', () => {
        render(<LoginForm />);

        expect(screen.getByText(/demo credentials/i)).toBeInTheDocument();
        expect(screen.getByText(/user@example\.com/)).toBeInTheDocument();
        expect(screen.getByText(/password/)).toBeInTheDocument();
    });
});
