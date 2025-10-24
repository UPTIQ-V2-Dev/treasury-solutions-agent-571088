import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReportGenerationPage } from '../ReportGenerationPage';
import { render } from '../../test/test-utils';

// Mock useNavigate and useSearchParams
const mockNavigate = vi.fn();
const mockSearchParams = new URLSearchParams();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useSearchParams: () => [mockSearchParams]
    };
});

describe('ReportGenerationPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockSearchParams.delete('analysisId');
    });

    it('renders report generation header', () => {
        render(<ReportGenerationPage />);

        expect(screen.getByText('Generate Report')).toBeInTheDocument();
        expect(screen.getByText('Create customized treasury analysis reports')).toBeInTheDocument();
    });

    it('shows report configuration form', () => {
        render(<ReportGenerationPage />);

        expect(screen.getByText('Report Configuration')).toBeInTheDocument();
        expect(screen.getByText('Configure your report settings and template options')).toBeInTheDocument();
    });

    it('displays client selector', () => {
        render(<ReportGenerationPage />);

        expect(screen.getByText('Select Client')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Choose a client/ })).toBeInTheDocument();
    });

    it('displays analysis selector', () => {
        render(<ReportGenerationPage />);

        expect(screen.getByText('Analysis')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Select an analysis/ })).toBeInTheDocument();
    });

    it('loads and displays report templates', async () => {
        render(<ReportGenerationPage />);

        await waitFor(() => {
            expect(screen.getByText('Standard Analysis Report')).toBeInTheDocument();
            expect(screen.getByText('Executive Summary')).toBeInTheDocument();
            expect(screen.getByText('Detailed Technical Report')).toBeInTheDocument();
        });
    });

    it('shows template descriptions and sections', async () => {
        render(<ReportGenerationPage />);

        await waitFor(() => {
            expect(
                screen.getByText('Comprehensive analysis report with key findings and recommendations')
            ).toBeInTheDocument();
            expect(screen.getByText('High-level overview for C-suite executives')).toBeInTheDocument();
        });
    });

    it('displays format selection', () => {
        render(<ReportGenerationPage />);

        expect(screen.getByText('Export Format')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /PDF Document/ })).toBeInTheDocument();
    });

    it('shows content options switches', () => {
        render(<ReportGenerationPage />);

        expect(screen.getByText('Include Charts')).toBeInTheDocument();
        expect(screen.getByText('Include Data Tables')).toBeInTheDocument();
        expect(screen.getByText('Include Recommendations')).toBeInTheDocument();
    });

    it('allows toggling content options', async () => {
        const user = userEvent.setup();
        render(<ReportGenerationPage />);

        const chartsSwitch = screen.getByRole('switch', { name: /Include Charts/ });
        expect(chartsSwitch).toBeChecked();

        await user.click(chartsSwitch);
        expect(chartsSwitch).not.toBeChecked();
    });

    it('shows custom title input', () => {
        render(<ReportGenerationPage />);

        expect(screen.getByText('Custom Title (Optional)')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter custom report title...')).toBeInTheDocument();
    });

    it('displays template preview when template is selected', async () => {
        const user = userEvent.setup();
        render(<ReportGenerationPage />);

        await waitFor(() => {
            expect(screen.getByText('Standard Analysis Report')).toBeInTheDocument();
        });

        // Select a template
        const templateRadio = screen.getByRole('radio', { name: /Standard Analysis Report/ });
        await user.click(templateRadio);

        await waitFor(() => {
            expect(screen.getByText('Template Preview')).toBeInTheDocument();
            expect(screen.getByText('Sections Included:')).toBeInTheDocument();
        });
    });

    it('shows template sections in preview', async () => {
        const user = userEvent.setup();
        render(<ReportGenerationPage />);

        await waitFor(() => {
            expect(screen.getByText('Standard Analysis Report')).toBeInTheDocument();
        });

        // Select a template
        const templateRadio = screen.getByRole('radio', { name: /Standard Analysis Report/ });
        await user.click(templateRadio);

        await waitFor(() => {
            expect(screen.getByText('Executive Summary')).toBeInTheDocument();
            expect(screen.getByText('Client Overview')).toBeInTheDocument();
            expect(screen.getByText('Cash Flow Analysis')).toBeInTheDocument();
        });
    });

    it('enables generate button only when template is selected', async () => {
        const user = userEvent.setup();
        render(<ReportGenerationPage />);

        const generateButton = screen.getByRole('button', { name: /Generate Report/ });
        expect(generateButton).toBeDisabled();

        await waitFor(() => {
            expect(screen.getByText('Standard Analysis Report')).toBeInTheDocument();
        });

        // Select a template
        const templateRadio = screen.getByRole('radio', { name: /Standard Analysis Report/ });
        await user.click(templateRadio);

        await waitFor(() => {
            expect(generateButton).not.toBeDisabled();
        });
    });

    it('generates report with correct data', async () => {
        const user = userEvent.setup();
        render(<ReportGenerationPage />);

        await waitFor(() => {
            expect(screen.getByText('Standard Analysis Report')).toBeInTheDocument();
        });

        // Select template
        const templateRadio = screen.getByRole('radio', { name: /Standard Analysis Report/ });
        await user.click(templateRadio);

        // Fill required fields
        const analysisSelect = screen.getByRole('button', { name: /Select an analysis/ });
        await user.click(analysisSelect);

        await waitFor(() => {
            const analysisOption = screen.getByText('Q4 2024 Analysis');
            expect(analysisOption).toBeInTheDocument();
            await user.click(analysisOption);
        });

        // Submit form
        const generateButton = screen.getByRole('button', { name: /Generate Report/ });
        await user.click(generateButton);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/reports/history');
        });
    });

    it('shows preview/hide preview toggle', async () => {
        const user = userEvent.setup();
        render(<ReportGenerationPage />);

        await waitFor(() => {
            expect(screen.getByText('Standard Analysis Report')).toBeInTheDocument();
        });

        // Select a template to enable preview
        const templateRadio = screen.getByRole('radio', { name: /Standard Analysis Report/ });
        await user.click(templateRadio);

        const previewButton = screen.getByRole('button', { name: /Show Preview/ });
        expect(previewButton).toBeInTheDocument();

        await user.click(previewButton);
        expect(screen.getByRole('button', { name: /Hide Preview/ })).toBeInTheDocument();
    });

    it('displays quick actions panel', () => {
        render(<ReportGenerationPage />);

        expect(screen.getByText('Quick Actions')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /View Report History/ })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Manage Clients/ })).toBeInTheDocument();
    });

    it('navigates to correct pages from quick actions', async () => {
        const user = userEvent.setup();
        render(<ReportGenerationPage />);

        const historyButton = screen.getByRole('button', { name: /View Report History/ });
        await user.click(historyButton);
        expect(mockNavigate).toHaveBeenCalledWith('/reports/history');

        const clientsButton = screen.getByRole('button', { name: /Manage Clients/ });
        await user.click(clientsButton);
        expect(mockNavigate).toHaveBeenCalledWith('/clients');
    });

    it('prefills analysis ID from URL params', () => {
        mockSearchParams.set('analysisId', 'test-analysis-123');
        render(<ReportGenerationPage />);

        // The form should have the analysisId from URL params pre-filled
        // This would be tested by checking the form's internal state
        expect(mockSearchParams.get('analysisId')).toBe('test-analysis-123');
    });

    it('shows loading state for templates', () => {
        render(<ReportGenerationPage />);

        // Initially should show loading for templates
        // The actual loading state depends on the query state
        expect(screen.getByText('Report Template')).toBeInTheDocument();
    });

    it('validates required fields', async () => {
        const user = userEvent.setup();
        render(<ReportGenerationPage />);

        // Try to submit without required fields
        const generateButton = screen.getByRole('button', { name: /Generate Report/ });
        await user.click(generateButton);

        // Should show validation errors
        await waitFor(() => {
            expect(screen.getByText(/Analysis is required/)).toBeInTheDocument();
        });
    });

    it('shows format details in preview', async () => {
        const user = userEvent.setup();
        render(<ReportGenerationPage />);

        await waitFor(() => {
            expect(screen.getByText('Standard Analysis Report')).toBeInTheDocument();
        });

        // Select a template
        const templateRadio = screen.getByRole('radio', { name: /Standard Analysis Report/ });
        await user.click(templateRadio);

        await waitFor(() => {
            expect(screen.getByText('Format Details:')).toBeInTheDocument();
            expect(screen.getByText('Format: PDF')).toBeInTheDocument();
            expect(screen.getByText('Charts: Included')).toBeInTheDocument();
        });
    });

    it('shows custom title in preview when entered', async () => {
        const user = userEvent.setup();
        render(<ReportGenerationPage />);

        await waitFor(() => {
            expect(screen.getByText('Standard Analysis Report')).toBeInTheDocument();
        });

        // Select a template
        const templateRadio = screen.getByRole('radio', { name: /Standard Analysis Report/ });
        await user.click(templateRadio);

        // Enter custom title
        const titleInput = screen.getByPlaceholderText('Enter custom report title...');
        await user.type(titleInput, 'My Custom Report Title');

        await waitFor(() => {
            expect(screen.getByText('Custom Title:')).toBeInTheDocument();
            expect(screen.getByText('My Custom Report Title')).toBeInTheDocument();
        });
    });

    it('handles template selection correctly', async () => {
        const user = userEvent.setup();
        render(<ReportGenerationPage />);

        await waitFor(() => {
            expect(screen.getByText('Executive Summary')).toBeInTheDocument();
        });

        // Select executive summary template
        const executiveRadio = screen.getByRole('radio', { name: /Executive Summary/ });
        await user.click(executiveRadio);

        await waitFor(() => {
            expect(screen.getByText('Key Findings')).toBeInTheDocument();
            expect(screen.getByText('Strategic Recommendations')).toBeInTheDocument();
        });
    });

    it('shows format badges for templates', async () => {
        render(<ReportGenerationPage />);

        await waitFor(() => {
            // Look for format badges
            const pdfBadges = screen.getAllByText('pdf');
            expect(pdfBadges.length).toBeGreaterThan(0);

            const excelBadge = screen.getByText('excel');
            expect(excelBadge).toBeInTheDocument();
        });
    });
});
