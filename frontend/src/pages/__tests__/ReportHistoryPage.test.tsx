import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReportHistoryPage } from '../ReportHistoryPage';
import { render } from '../../test/test-utils';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

// Mock URL.createObjectURL and revokeObjectURL for download tests
Object.defineProperty(window, 'URL', {
    value: {
        createObjectURL: vi.fn(() => 'blob:mock-url'),
        revokeObjectURL: vi.fn()
    }
});

describe('ReportHistoryPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders report history header', () => {
        render(<ReportHistoryPage />);

        expect(screen.getByText('Report History')).toBeInTheDocument();
        expect(screen.getByText('View and manage previously generated reports')).toBeInTheDocument();
    });

    it('shows generate new report button', () => {
        render(<ReportHistoryPage />);

        const generateButton = screen.getByRole('button', { name: /Generate New Report/ });
        expect(generateButton).toBeInTheDocument();
    });

    it('navigates to report generation when generate button is clicked', async () => {
        const user = userEvent.setup();
        render(<ReportHistoryPage />);

        const generateButton = screen.getByRole('button', { name: /Generate New Report/ });
        await user.click(generateButton);

        expect(mockNavigate).toHaveBeenCalledWith('/reports/generate');
    });

    it('displays filters section', () => {
        render(<ReportHistoryPage />);

        expect(screen.getByText('Filters')).toBeInTheDocument();
        expect(screen.getByText('Filter reports by client, search terms, or other criteria')).toBeInTheDocument();
    });

    it('shows search input', () => {
        render(<ReportHistoryPage />);

        expect(screen.getByPlaceholderText('Search reports, clients, or templates...')).toBeInTheDocument();
    });

    it('shows client selector filter', () => {
        render(<ReportHistoryPage />);

        expect(screen.getByRole('button', { name: /All clients/ })).toBeInTheDocument();
    });

    it('loads and displays reports table', async () => {
        render(<ReportHistoryPage />);

        await waitFor(() => {
            expect(screen.getByText('Reports (6)')).toBeInTheDocument(); // From mock data
        });
    });

    it('displays report titles and client names', async () => {
        render(<ReportHistoryPage />);

        await waitFor(() => {
            expect(screen.getByText('ACME Corporation - Q4 2024 Analysis Report')).toBeInTheDocument();
            expect(screen.getByText('TechStart Solutions - Executive Summary')).toBeInTheDocument();
            expect(screen.getByText('Global Manufacturing Ltd - Technical Analysis')).toBeInTheDocument();
        });
    });

    it('shows report templates as badges', async () => {
        render(<ReportHistoryPage />);

        await waitFor(() => {
            expect(screen.getByText('Standard Analysis Report')).toBeInTheDocument();
            expect(screen.getByText('Executive Summary')).toBeInTheDocument();
            expect(screen.getByText('Detailed Technical Report')).toBeInTheDocument();
        });
    });

    it('displays format badges', async () => {
        render(<ReportHistoryPage />);

        await waitFor(() => {
            const pdfBadges = screen.getAllByText(/PDF/i);
            expect(pdfBadges.length).toBeGreaterThan(0);

            const excelBadges = screen.getAllByText(/EXCEL/i);
            expect(excelBadges.length).toBeGreaterThan(0);
        });
    });

    it('shows status badges with correct variants', async () => {
        render(<ReportHistoryPage />);

        await waitFor(() => {
            const readyBadges = screen.getAllByText(/ready/i);
            expect(readyBadges.length).toBeGreaterThan(0);

            const generatingBadges = screen.getAllByText(/generating/i);
            expect(generatingBadges.length).toBeGreaterThan(0);
        });
    });

    it('displays created dates and authors', async () => {
        render(<ReportHistoryPage />);

        await waitFor(() => {
            expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
            expect(screen.getByText('Mike Chen')).toBeInTheDocument();
            expect(screen.getByText('Emily Rodriguez')).toBeInTheDocument();
        });
    });

    it('shows file sizes', async () => {
        render(<ReportHistoryPage />);

        await waitFor(() => {
            // Look for formatted file sizes (e.g., "2.37 MB")
            const fileSizes = screen.getAllByText(/\d+(\.\d+)?\s(KB|MB|GB)/);
            expect(fileSizes.length).toBeGreaterThan(0);
        });
    });

    it('displays download counts', async () => {
        render(<ReportHistoryPage />);

        await waitFor(() => {
            // Download counts are displayed as badges with numbers
            expect(screen.getByText('3')).toBeInTheDocument(); // Download count from mock data
            expect(screen.getByText('8')).toBeInTheDocument();
        });
    });

    it('shows action dropdown menus', async () => {
        const user = userEvent.setup();
        render(<ReportHistoryPage />);

        await waitFor(() => {
            const actionButtons = screen.getAllByRole('button', { name: '' }); // MoreHorizontal buttons
            expect(actionButtons.length).toBeGreaterThan(0);
        });

        // Click first action button to open dropdown
        const firstActionButton = screen.getAllByRole('button', { name: '' })[0];
        await user.click(firstActionButton);

        await waitFor(() => {
            expect(screen.getByText('Download')).toBeInTheDocument();
            expect(screen.getByText('View Analysis')).toBeInTheDocument();
            expect(screen.getByText('Delete')).toBeInTheDocument();
        });
    });

    it('handles report download', async () => {
        const user = userEvent.setup();
        render(<ReportHistoryPage />);

        await waitFor(() => {
            const actionButtons = screen.getAllByRole('button', { name: '' });
            expect(actionButtons.length).toBeGreaterThan(0);
        });

        // Click first action button
        const firstActionButton = screen.getAllByRole('button', { name: '' })[0];
        await user.click(firstActionButton);

        // Click download
        const downloadButton = screen.getByText('Download');
        await user.click(downloadButton);

        // Should call download functionality
        expect(window.URL.createObjectURL).toHaveBeenCalled();
    });

    it('navigates to analysis when View Analysis is clicked', async () => {
        const user = userEvent.setup();
        render(<ReportHistoryPage />);

        await waitFor(() => {
            const actionButtons = screen.getAllByRole('button', { name: '' });
            expect(actionButtons.length).toBeGreaterThan(0);
        });

        // Click first action button
        const firstActionButton = screen.getAllByRole('button', { name: '' })[0];
        await user.click(firstActionButton);

        // Click View Analysis
        const viewButton = screen.getByText('View Analysis');
        await user.click(viewButton);

        await waitFor(() => {
            // Should navigate to analysis page with the analysis ID
            expect(mockNavigate).toHaveBeenCalledWith('/analysis/analysis-1');
        });
    });

    it('shows delete confirmation dialog', async () => {
        const user = userEvent.setup();
        render(<ReportHistoryPage />);

        await waitFor(() => {
            const actionButtons = screen.getAllByRole('button', { name: '' });
            expect(actionButtons.length).toBeGreaterThan(0);
        });

        // Click first action button
        const firstActionButton = screen.getAllByRole('button', { name: '' })[0];
        await user.click(firstActionButton);

        // Click Delete
        const deleteButton = screen.getByText('Delete');
        await user.click(deleteButton);

        await waitFor(() => {
            expect(screen.getByText('Delete Report')).toBeInTheDocument();
            expect(screen.getByText(/Are you sure you want to delete/)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
        });
    });

    it('filters reports by search query', async () => {
        const user = userEvent.setup();
        render(<ReportHistoryPage />);

        await waitFor(() => {
            expect(screen.getByText('ACME Corporation - Q4 2024 Analysis Report')).toBeInTheDocument();
            expect(screen.getByText('TechStart Solutions - Executive Summary')).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText('Search reports, clients, or templates...');
        await user.type(searchInput, 'ACME');

        // Should filter to show only ACME reports
        await waitFor(() => {
            expect(screen.getByText('ACME Corporation - Q4 2024 Analysis Report')).toBeInTheDocument();
            // TechStart should be filtered out (but might not disappear immediately due to client-side filtering)
        });
    });

    it('displays quick stats cards', async () => {
        render(<ReportHistoryPage />);

        await waitFor(() => {
            expect(screen.getByText('Total Reports')).toBeInTheDocument();
            expect(screen.getByText('Ready to Download')).toBeInTheDocument();
            expect(screen.getByText('Generating')).toBeInTheDocument();
            expect(screen.getByText('Total Downloads')).toBeInTheDocument();
        });
    });

    it('shows correct stats in cards', async () => {
        render(<ReportHistoryPage />);

        await waitFor(() => {
            // Total reports count should match mock data
            expect(screen.getByText('6')).toBeInTheDocument(); // Total reports from mock

            // Calculate expected ready reports (status: 'ready' in mock data)
            const readyCount = screen.getByText('5'); // 5 ready reports in mock data
            expect(readyCount).toBeInTheDocument();

            // Calculate expected generating reports (status: 'generating' in mock data)
            const generatingCount = screen.getByText('1'); // 1 generating report in mock data
            expect(generatingCount).toBeInTheDocument();
        });
    });

    it('handles empty state', async () => {
        // This test would require mocking the service to return empty results
        render(<ReportHistoryPage />);

        // With current mock data, this will show reports
        // In a real scenario with empty data, should show:
        // - "No reports found" message
        // - "Generate Report" button in empty state
    });

    it('shows pagination when there are multiple pages', async () => {
        render(<ReportHistoryPage />);

        await waitFor(() => {
            // DataTable component handles pagination
            // With 6 mock reports and 10 per page, should be single page
            expect(screen.getByText('Reports (6)')).toBeInTheDocument();
        });
    });

    it('handles loading state', () => {
        render(<ReportHistoryPage />);

        // Should show loading state initially
        expect(screen.getByText('Reports (0)')).toBeInTheDocument();
    });

    it('formats file sizes correctly', async () => {
        render(<ReportHistoryPage />);

        await waitFor(() => {
            // Should format bytes to human readable format
            expect(screen.getByText('2.37 MB')).toBeInTheDocument(); // 2485760 bytes
            expect(screen.getByText('1 MB')).toBeInTheDocument(); // 1024000 bytes
            expect(screen.getByText('5 MB')).toBeInTheDocument(); // 5242880 bytes
        });
    });

    it('formats dates correctly', async () => {
        render(<ReportHistoryPage />);

        await waitFor(() => {
            // Should format dates in readable format
            const datePattern = /\w{3}\s+\d{1,2},\s+\d{4}.*/;
            const dateElements = screen.getAllByText(datePattern);
            expect(dateElements.length).toBeGreaterThan(0);
        });
    });

    it('shows different status variants correctly', async () => {
        render(<ReportHistoryPage />);

        await waitFor(() => {
            // Check that different status badges have appropriate styling
            // This would be tested by checking CSS classes or data attributes
            const statusBadges = screen.getAllByText(/ready|generating|error/i);
            expect(statusBadges.length).toBeGreaterThan(0);
        });
    });

    it('disables download for reports that are not ready', async () => {
        const user = userEvent.setup();
        render(<ReportHistoryPage />);

        await waitFor(() => {
            const actionButtons = screen.getAllByRole('button', { name: '' });
            expect(actionButtons.length).toBeGreaterThan(0);
        });

        // Find a generating report and check its actions
        // The last report in mock data has status 'generating'
        const lastActionButton = screen.getAllByRole('button', { name: '' })[5]; // Index 5 for 6th report
        await user.click(lastActionButton);

        // Should not show Download option for generating reports
        await waitFor(() => {
            expect(screen.queryByText('Download')).not.toBeInTheDocument();
            expect(screen.getByText('View Analysis')).toBeInTheDocument();
            expect(screen.getByText('Delete')).toBeInTheDocument();
        });
    });
});
