import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminConfigPage } from '../AdminConfigPage';
import { treasuryService } from '@/services/treasury';
import { vi, describe, it, expect, beforeEach } from 'vitest';

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

const mockSystemConfig = {
    thresholds: {
        idleCashThreshold: 100000,
        liquidityWarningThreshold: 50000,
        lowBalanceThreshold: 10000,
        highRiskThreshold: 500000
    },
    features: {
        enableAutoAnalysis: true,
        enableEmailNotifications: true,
        enableRecommendationEngine: true,
        enableAdvancedReports: true
    },
    integrations: {
        bankApiEnabled: false,
        webhooksEnabled: false,
        apiRateLimit: 1000,
        maxFileSize: 50
    },
    security: {
        sessionTimeout: 60,
        passwordExpiry: 90,
        requireMfa: false,
        auditLogRetention: 365
    }
};

describe('AdminConfigPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockTreasuryService.getSystemConfig.mockResolvedValue(mockSystemConfig);
        mockTreasuryService.updateSystemConfig.mockResolvedValue(mockSystemConfig);
        mockTreasuryService.resetConfigToDefaults.mockResolvedValue(mockSystemConfig);
    });

    it('renders the admin configuration page', async () => {
        renderWithProviders(<AdminConfigPage />);

        expect(screen.getByText('System Configuration')).toBeInTheDocument();
        expect(screen.getByText('Configure system settings, thresholds, and integrations')).toBeInTheDocument();

        // Wait for data to load
        await waitFor(() => {
            expect(screen.getByText('Financial Thresholds')).toBeInTheDocument();
        });
    });

    it('loads and displays system configuration data', async () => {
        renderWithProviders(<AdminConfigPage />);

        await waitFor(() => {
            expect(mockTreasuryService.getSystemConfig).toHaveBeenCalled();
        });

        // Check if threshold values are displayed
        await waitFor(() => {
            expect(screen.getByDisplayValue('100000')).toBeInTheDocument(); // Idle cash threshold
        });
    });

    it('allows switching between configuration tabs', async () => {
        const user = userEvent.setup();
        renderWithProviders(<AdminConfigPage />);

        await waitFor(() => {
            expect(screen.getByText('Financial Thresholds')).toBeInTheDocument();
        });

        // Click Features tab
        await user.click(screen.getByText('Features'));
        expect(screen.getByText('Platform Features')).toBeInTheDocument();

        // Click Integrations tab
        await user.click(screen.getByText('Integrations'));
        expect(screen.getByText('External Integrations')).toBeInTheDocument();

        // Click Security tab
        await user.click(screen.getByText('Security'));
        expect(screen.getByText('Security Settings')).toBeInTheDocument();
    });

    it('enables save button when form values change', async () => {
        const user = userEvent.setup();
        renderWithProviders(<AdminConfigPage />);

        await waitFor(() => {
            expect(screen.getByDisplayValue('100000')).toBeInTheDocument();
        });

        const saveButton = screen.getByRole('button', { name: /save changes/i });
        expect(saveButton).toBeDisabled();

        // Change a threshold value
        const idleCashInput = screen.getByDisplayValue('100000');
        await user.clear(idleCashInput);
        await user.type(idleCashInput, '150000');

        await waitFor(() => {
            expect(saveButton).not.toBeDisabled();
        });
    });

    it('saves configuration changes', async () => {
        const user = userEvent.setup();
        renderWithProviders(<AdminConfigPage />);

        await waitFor(() => {
            expect(screen.getByDisplayValue('100000')).toBeInTheDocument();
        });

        // Change a threshold value
        const idleCashInput = screen.getByDisplayValue('100000');
        await user.clear(idleCashInput);
        await user.type(idleCashInput, '150000');

        // Save changes
        const saveButton = screen.getByRole('button', { name: /save changes/i });
        await user.click(saveButton);

        await waitFor(() => {
            expect(mockTreasuryService.updateSystemConfig).toHaveBeenCalled();
        });
    });

    it('toggles feature switches correctly', async () => {
        const user = userEvent.setup();
        renderWithProviders(<AdminConfigPage />);

        await waitFor(() => {
            expect(screen.getByText('Financial Thresholds')).toBeInTheDocument();
        });

        // Switch to Features tab
        await user.click(screen.getByText('Features'));

        await waitFor(() => {
            expect(screen.getByText('Auto Analysis')).toBeInTheDocument();
        });

        // Find and toggle a feature switch
        const autoAnalysisSwitch = screen.getByRole('switch', { name: /auto analysis/i });
        expect(autoAnalysisSwitch).toBeChecked();

        await user.click(autoAnalysisSwitch);
        expect(autoAnalysisSwitch).not.toBeChecked();
    });

    it('resets configuration to defaults', async () => {
        const user = userEvent.setup();
        renderWithProviders(<AdminConfigPage />);

        await waitFor(() => {
            expect(screen.getByText('Financial Thresholds')).toBeInTheDocument();
        });

        const resetButton = screen.getByRole('button', { name: /reset to defaults/i });
        await user.click(resetButton);

        await waitFor(() => {
            expect(mockTreasuryService.resetConfigToDefaults).toHaveBeenCalled();
        });
    });

    it('displays validation errors for invalid inputs', async () => {
        const user = userEvent.setup();
        renderWithProviders(<AdminConfigPage />);

        await waitFor(() => {
            expect(screen.getByDisplayValue('100000')).toBeInTheDocument();
        });

        // Enter invalid value (negative number)
        const idleCashInput = screen.getByDisplayValue('100000');
        await user.clear(idleCashInput);
        await user.type(idleCashInput, '-1000');

        // Try to save (which should trigger validation)
        const saveButton = screen.getByRole('button', { name: /save changes/i });
        await user.click(saveButton);

        await waitFor(() => {
            expect(screen.getByText('Must be non-negative')).toBeInTheDocument();
        });
    });

    it('shows unsaved changes warning', async () => {
        const user = userEvent.setup();
        renderWithProviders(<AdminConfigPage />);

        await waitFor(() => {
            expect(screen.getByDisplayValue('100000')).toBeInTheDocument();
        });

        // Change a value to trigger unsaved changes
        const idleCashInput = screen.getByDisplayValue('100000');
        await user.clear(idleCashInput);
        await user.type(idleCashInput, '150000');

        await waitFor(() => {
            expect(screen.getByText(/you have unsaved changes/i)).toBeInTheDocument();
        });
    });

    it('displays configuration status overview', async () => {
        renderWithProviders(<AdminConfigPage />);

        await waitFor(() => {
            expect(screen.getByText('Configuration Status')).toBeInTheDocument();
        });

        // Check status indicators
        expect(screen.getByText('$100,000')).toBeInTheDocument(); // Idle Cash Threshold
        expect(screen.getByText('1000')).toBeInTheDocument(); // API Rate Limit
        expect(screen.getByText('60m')).toBeInTheDocument(); // Session Timeout
        expect(screen.getByText('50MB')).toBeInTheDocument(); // Max File Size
    });

    it('handles API errors gracefully', async () => {
        mockTreasuryService.getSystemConfig.mockRejectedValue(new Error('API Error'));

        renderWithProviders(<AdminConfigPage />);

        await waitFor(() => {
            expect(screen.getByText(/failed to load system configuration/i)).toBeInTheDocument();
        });
    });
});
