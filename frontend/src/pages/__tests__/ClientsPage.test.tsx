import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@/test/test-utils';
import { ClientsPage } from '../ClientsPage';
import { server } from '@/test/mocks/server';
import { http, HttpResponse } from 'msw';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

const mockClients = [
    {
        id: 'client-1',
        name: 'ACME Corporation',
        accountIds: ['account-1', 'account-2'],
        relationshipManager: 'John Smith',
        status: 'active' as const,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'client-2',
        name: 'TechStart Inc',
        accountIds: ['account-3'],
        relationshipManager: 'Jane Doe',
        status: 'pending' as const,
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z'
    }
];

describe('ClientsPage', () => {
    beforeEach(() => {
        server.use(
            http.get('/api/clients', () => {
                return HttpResponse.json(mockClients);
            })
        );
    });

    it('renders client management header', async () => {
        render(<ClientsPage />);

        expect(screen.getByRole('heading', { name: /client management/i })).toBeInTheDocument();
        expect(screen.getByText(/manage your client relationships/i)).toBeInTheDocument();
    });

    it('displays clients list after loading', async () => {
        render(<ClientsPage />);

        await waitFor(() => {
            expect(screen.getByText('ACME Corporation')).toBeInTheDocument();
            expect(screen.getByText('TechStart Inc')).toBeInTheDocument();
        });

        expect(screen.getByText('John Smith')).toBeInTheDocument();
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });

    it('filters clients by search term', async () => {
        const user = userEvent.setup();
        render(<ClientsPage />);

        await waitFor(() => {
            expect(screen.getByText('ACME Corporation')).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText(/search clients/i);
        await user.type(searchInput, 'ACME');

        expect(screen.getByText('ACME Corporation')).toBeInTheDocument();
        expect(screen.queryByText('TechStart Inc')).not.toBeInTheDocument();
    });

    it('filters clients by status', async () => {
        const user = userEvent.setup();
        render(<ClientsPage />);

        await waitFor(() => {
            expect(screen.getByText('ACME Corporation')).toBeInTheDocument();
        });

        const statusFilter = screen.getByRole('combobox');
        await user.click(statusFilter);

        const activeOption = screen.getByRole('option', { name: /active/i });
        await user.click(activeOption);

        expect(screen.getByText('ACME Corporation')).toBeInTheDocument();
        expect(screen.queryByText('TechStart Inc')).not.toBeInTheDocument();
    });

    it('opens add client dialog when add button is clicked', async () => {
        const user = userEvent.setup();
        render(<ClientsPage />);

        const addButton = screen.getByRole('button', { name: /add client/i });
        await user.click(addButton);

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText(/add new client/i)).toBeInTheDocument();
    });

    it('navigates to client profile when view profile is clicked', async () => {
        const user = userEvent.setup();
        render(<ClientsPage />);

        await waitFor(() => {
            expect(screen.getByText('ACME Corporation')).toBeInTheDocument();
        });

        const moreButton = screen.getAllByRole('button', { name: /more options/i })[0];
        await user.click(moreButton);

        const viewProfileButton = screen.getByRole('menuitem', { name: /view profile/i });
        await user.click(viewProfileButton);

        expect(mockNavigate).toHaveBeenCalledWith('/clients/client-1');
    });

    it('displays empty state when no clients match filter', async () => {
        const user = userEvent.setup();
        render(<ClientsPage />);

        await waitFor(() => {
            expect(screen.getByText('ACME Corporation')).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText(/search clients/i);
        await user.type(searchInput, 'NonexistentClient');

        expect(screen.getByText(/no clients match your search criteria/i)).toBeInTheDocument();
    });
});
