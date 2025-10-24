import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { ProtectedRoute } from '../ProtectedRoute';

// Mock the useAuth hook
const mockUseAuth = vi.fn();
vi.mock('@/hooks/useAuth', () => ({
    useAuth: () => mockUseAuth()
}));

const TestComponent = () => <div>Protected Content</div>;

const renderWithRouter = (component: React.ReactElement, initialEntries = ['/']) => {
    return render(<MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>);
};

describe('ProtectedRoute', () => {
    it('renders children when user is authenticated', () => {
        mockUseAuth.mockReturnValue({
            isAuthenticated: true,
            user: { id: 1, role: 'USER' }
        });

        renderWithRouter(
            <ProtectedRoute>
                <TestComponent />
            </ProtectedRoute>
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('redirects to login when user is not authenticated', () => {
        mockUseAuth.mockReturnValue({
            isAuthenticated: false,
            user: null
        });

        renderWithRouter(
            <ProtectedRoute>
                <TestComponent />
            </ProtectedRoute>
        );

        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('renders children when requireAuth is false', () => {
        mockUseAuth.mockReturnValue({
            isAuthenticated: false,
            user: null
        });

        renderWithRouter(
            <ProtectedRoute requireAuth={false}>
                <TestComponent />
            </ProtectedRoute>
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('renders children for admin user when requireAdmin is true', () => {
        mockUseAuth.mockReturnValue({
            isAuthenticated: true,
            user: { id: 1, role: 'ADMIN' }
        });

        renderWithRouter(
            <ProtectedRoute requireAdmin>
                <TestComponent />
            </ProtectedRoute>
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('redirects non-admin user when requireAdmin is true', () => {
        mockUseAuth.mockReturnValue({
            isAuthenticated: true,
            user: { id: 1, role: 'USER' }
        });

        renderWithRouter(
            <ProtectedRoute requireAdmin>
                <TestComponent />
            </ProtectedRoute>
        );

        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });
});
