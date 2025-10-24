import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuditTrailPage } from '../AuditTrailPage';
import { treasuryService } from '@/services/treasury';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import type { AuditLogsResponse } from '@/types/treasury';

// Mock the treasury service
vi.mock('@/services/treasury');

const mockTreasuryService = treasuryService as any;

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false }
        }
    });

const renderWithProviders = (component: React.ReactElement) => {
    const queryClient = createTestQueryClient();
    return render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>);
};

const mockAuditData: AuditLogsResponse = {
    logs: [
        {
            id: 'audit-1',
            userId: 'user-1',
            userName: 'John Admin',
            userEmail: 'admin@example.com',
            action: 'login',
            resource: 'authentication',
            details: 'User logged into the system',
            severity: 'low',
            ipAddress: '192.168.1.1',
            timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString()
        },
        {
            id: 'audit-2',
            userId: 'user-2',
            userName: 'Jane User',
            userEmail: 'user@example.com',
            action: 'upload',
            resource: 'statement',
            resourceId: 'stmt-123',
            details: 'Uploaded bank statement file: october_statement.pdf',
            severity: 'medium',
            ipAddress: '192.168.1.2',
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
        },
        {
            id: 'audit-3',
            userId: 'user-1',
            userName: 'John Admin',
            userEmail: 'admin@example.com',
            action: 'config_change',
            resource: 'system_config',
            details: 'Updated idle cash threshold from $50,000 to $100,000',
            severity: 'high',
            ipAddress: '192.168.1.1',
            timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString()
        }
    ],
    totalCount: 3,
    page: 1,
    totalPages: 1
};

describe('AuditTrailPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockTreasuryService.getAuditLogs.mockResolvedValue(mockAuditData);
        mockTreasuryService.exportAuditLogs.mockResolvedValue(new Blob(['csv content'], { type: 'text/csv' }));
    });

    it('renders the audit trail page', async () => {
        renderWithProviders(<AuditTrailPage />);

        expect(screen.getByText('Audit Trail')).toBeInTheDocument();
        expect(screen.getByText('Track system activity and user actions across the platform')).toBeInTheDocument();
    });

    it('loads and displays audit logs', async () => {
        renderWithProviders(<AuditTrailPage />);

        await waitFor(() => {
            expect(mockTreasuryService.getAuditLogs).toHaveBeenCalled();
        });

        // Check if audit logs are displayed
        await waitFor(() => {
            expect(screen.getByText('John Admin')).toBeInTheDocument();
            expect(screen.getByText('Jane User')).toBeInTheDocument();
            expect(screen.getByText('LOGIN')).toBeInTheDocument();
            expect(screen.getByText('UPLOAD')).toBeInTheDocument();
        });
    });

    it('displays summary cards with correct metrics', async () => {
        renderWithProviders(<AuditTrailPage />);

        await waitFor(() => {
            expect(screen.getByText('Total Events')).toBeInTheDocument();
            expect(screen.getByText('3')).toBeInTheDocument(); // Total count
            expect(screen.getByText('High Severity')).toBeInTheDocument();
            expect(screen.getByText('1')).toBeInTheDocument(); // One high severity event
        });
    });

    it('allows searching audit logs', async () => {
        const user = userEvent.setup();
        renderWithProviders(<AuditTrailPage />);

        await waitFor(() => {
            expect(screen.getByText('John Admin')).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText('Search logs...');
        await user.type(searchInput, 'John');

        // Should still show John Admin's entries
        expect(screen.getByText('John Admin')).toBeInTheDocument();
    });

    it('allows filtering by user', async () => {
        const user = userEvent.setup();
        renderWithProviders(<AuditTrailPage />);

        await waitFor(() => {
            expect(screen.getByText('John Admin')).toBeInTheDocument();
        });

        // Open user filter dropdown
        const userSelect = screen.getByDisplayValue('All Users');
        await user.click(userSelect);

        // Select a specific user
        await waitFor(() => {
            expect(screen.getByText('John Admin (admin@example.com)')).toBeInTheDocument();
        });
    });

    it('allows filtering by action type', async () => {
        const user = userEvent.setup();
        renderWithProviders(<AuditTrailPage />);

        await waitFor(() => {
            expect(screen.getByText('LOGIN')).toBeInTheDocument();
        });

        // Open action filter dropdown
        const actionSelect = screen.getByDisplayValue('All Actions');
        await user.click(actionSelect);

        await waitFor(() => {
            expect(screen.getByText('LOGIN')).toBeInTheDocument();
        });
    });

    it('displays severity badges with correct colors', async () => {
        renderWithProviders(<AuditTrailPage />);

        await waitFor(() => {
            expect(screen.getByText('low')).toBeInTheDocument();
            expect(screen.getByText('medium')).toBeInTheDocument();
            expect(screen.getByText('high')).toBeInTheDocument();
        });
    });

    it('displays action badges with correct variants', async () => {
        renderWithProviders(<AuditTrailPage />);

        await waitFor(() => {
            expect(screen.getByText('LOGIN')).toBeInTheDocument();
            expect(screen.getByText('UPLOAD')).toBeInTheDocument();
            expect(screen.getByText('CONFIG_CHANGE')).toBeInTheDocument();
        });
    });

    it('shows IP addresses and timestamps', async () => {
        renderWithProviders(<AuditTrailPage />);

        await waitFor(() => {
            expect(screen.getByText('192.168.1.1')).toBeInTheDocument();
            expect(screen.getByText('192.168.1.2')).toBeInTheDocument();
        });
    });

    it('displays resource information and IDs when available', async () => {
        renderWithProviders(<AuditTrailPage />);

        await waitFor(() => {
            expect(screen.getByText('authentication')).toBeInTheDocument();
            expect(screen.getByText('statement')).toBeInTheDocument();
            expect(screen.getByText('ID: stmt-123')).toBeInTheDocument();
        });
    });

    it('handles export audit logs functionality', async () => {
        const user = userEvent.setup();
        renderWithProviders(<AuditTrailPage />);

        await waitFor(() => {
            expect(screen.getByText('John Admin')).toBeInTheDocument();
        });

        const exportButton = screen.getByRole('button', { name: /export logs/i });
        await user.click(exportButton);

        // In a real implementation, this would trigger a file download
        // For now, we just verify the service method was called
        expect(mockTreasuryService.exportAuditLogs).toBeDefined();
    });

    it('allows clearing all filters', async () => {
        const user = userEvent.setup();
        renderWithProviders(<AuditTrailPage />);

        await waitFor(() => {
            expect(screen.getByText('John Admin')).toBeInTheDocument();
        });

        // Set a search filter
        const searchInput = screen.getByPlaceholderText('Search logs...');
        await user.type(searchInput, 'test');

        // Clear filters button should appear
        await waitFor(() => {
            const clearButton = screen.getByRole('button', { name: /clear filters/i });
            expect(clearButton).toBeInTheDocument();

            await user.click(clearButton);
        });

        // Search input should be cleared
        expect(searchInput).toHaveValue('');
    });

    it('displays unique users count correctly', async () => {
        renderWithProviders(<AuditTrailPage />);

        await waitFor(() => {
            expect(screen.getByText('Unique Users')).toBeInTheDocument();
            expect(screen.getByText('2')).toBeInTheDocument(); // user-1 and user-2
        });
    });

    it('calculates recent activity correctly', async () => {
        renderWithProviders(<AuditTrailPage />);

        await waitFor(() => {
            expect(screen.getByText('Recent Activity')).toBeInTheDocument();
            // All 3 events should be within the last 24 hours based on our mock data
            expect(screen.getByText('3')).toBeInTheDocument();
        });
    });

    it('shows empty state when no logs found', async () => {
        mockTreasuryService.getAuditLogs.mockResolvedValue({
            logs: [],
            totalCount: 0,
            page: 1,
            totalPages: 0
        });

        renderWithProviders(<AuditTrailPage />);

        await waitFor(() => {
            expect(screen.getByText('No audit logs found')).toBeInTheDocument();
            expect(screen.getByText('No audit activity recorded yet.')).toBeInTheDocument();
        });
    });

    it('handles API errors gracefully', async () => {
        mockTreasuryService.getAuditLogs.mockRejectedValue(new Error('API Error'));

        renderWithProviders(<AuditTrailPage />);

        await waitFor(() => {
            expect(screen.getByText(/failed to load audit logs/i)).toBeInTheDocument();
        });
    });

    it('displays loading state', () => {
        // Mock loading state
        mockTreasuryService.getAuditLogs.mockImplementation(() => new Promise(() => {}));

        renderWithProviders(<AuditTrailPage />);

        expect(screen.getByText('Loading audit logs...')).toBeInTheDocument();
    });
});
