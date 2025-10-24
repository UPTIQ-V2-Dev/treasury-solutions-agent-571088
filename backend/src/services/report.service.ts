/* eslint-disable require-await */
import prisma from '../client.ts';
import { Report } from '../generated/prisma/index.js';
import { getInstance } from '../storage/main.ts';
import ApiError from '../utils/ApiError.ts';
import ExcelJS from 'exceljs';
import httpStatus from 'http-status';
import puppeteer from 'puppeteer';
import { Readable } from 'stream';

export interface ReportTemplate {
    id: string;
    name: string;
    description: string;
    format: 'PDF' | 'EXCEL';
    sections: ReportSection[];
    isActive: boolean;
}

export interface ReportSection {
    id: string;
    name: string;
    type:
        | 'executive_summary'
        | 'analysis_summary'
        | 'liquidity_metrics'
        | 'spending_breakdown'
        | 'recommendations'
        | 'data_tables'
        | 'charts';
    order: number;
    required: boolean;
    configuration?: Record<string, any>;
}

export interface GenerateReportData {
    analysisId: string;
    templateId?: string;
    format?: 'PDF' | 'EXCEL';
    title?: string;
    sections?: string[];
    createdBy: string;
}

export interface ReportFilter {
    clientId?: string;
    analysisId?: string;
    format?: string;
    status?: string;
    createdBy?: string;
    dateFrom?: Date;
    dateTo?: Date;
}

export interface ReportOptions {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
}

// Default report templates
const DEFAULT_TEMPLATES: ReportTemplate[] = [
    {
        id: 'comprehensive-treasury-report',
        name: 'Comprehensive Treasury Analysis Report',
        description: 'Complete treasury analysis including executive summary, detailed metrics, and recommendations',
        format: 'PDF',
        sections: [
            { id: 'exec-summary', name: 'Executive Summary', type: 'executive_summary', order: 1, required: true },
            { id: 'analysis-summary', name: 'Analysis Overview', type: 'analysis_summary', order: 2, required: true },
            { id: 'liquidity-metrics', name: 'Liquidity Metrics', type: 'liquidity_metrics', order: 3, required: true },
            {
                id: 'spending-analysis',
                name: 'Spending Breakdown',
                type: 'spending_breakdown',
                order: 4,
                required: true
            },
            {
                id: 'recommendations',
                name: 'Treasury Recommendations',
                type: 'recommendations',
                order: 5,
                required: true
            },
            { id: 'supporting-data', name: 'Supporting Data Tables', type: 'data_tables', order: 6, required: false }
        ],
        isActive: true
    },
    {
        id: 'executive-summary-report',
        name: 'Executive Summary Report',
        description: 'High-level executive summary with key findings and recommendations',
        format: 'PDF',
        sections: [
            { id: 'exec-summary', name: 'Executive Summary', type: 'executive_summary', order: 1, required: true },
            { id: 'key-metrics', name: 'Key Metrics', type: 'liquidity_metrics', order: 2, required: true },
            {
                id: 'top-recommendations',
                name: 'Top Recommendations',
                type: 'recommendations',
                order: 3,
                required: true,
                configuration: { maxRecommendations: 5 }
            }
        ],
        isActive: true
    },
    {
        id: 'detailed-data-export',
        name: 'Detailed Data Export',
        description: 'Comprehensive data export in Excel format with all metrics and transaction details',
        format: 'EXCEL',
        sections: [
            { id: 'summary-sheet', name: 'Summary', type: 'analysis_summary', order: 1, required: true },
            { id: 'metrics-sheet', name: 'Metrics', type: 'liquidity_metrics', order: 2, required: true },
            { id: 'spending-sheet', name: 'Spending Analysis', type: 'spending_breakdown', order: 3, required: true },
            { id: 'recommendations-sheet', name: 'Recommendations', type: 'recommendations', order: 4, required: true },
            { id: 'data-sheet', name: 'Raw Data', type: 'data_tables', order: 5, required: true }
        ],
        isActive: true
    }
];

/**
 * Generate a report based on analysis data
 * @param {GenerateReportData} reportData
 * @returns {Promise<Report>}
 */
const generateReport = async (reportData: GenerateReportData): Promise<Report> => {
    const {
        analysisId,
        templateId = 'comprehensive-treasury-report',
        format = 'PDF',
        title,
        sections,
        createdBy
    } = reportData;

    // Validate analysis exists
    const analysis = await prisma.analysis.findUnique({
        where: { id: analysisId },
        include: {
            client: true,
            Recommendation: {
                include: {
                    product: true
                }
            }
        }
    });

    if (!analysis) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Analysis not found');
    }

    // Get template
    const template = getTemplate(templateId);
    if (!template) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Report template not found');
    }

    // Determine sections to include
    const sectionsToInclude = sections || template.sections.map(s => s.id);
    const filteredSections = template.sections.filter(s => sectionsToInclude.includes(s.id));

    const reportTitle = title || `Treasury Analysis Report - ${analysis.client.name}`;

    try {
        // Create report record
        const report = await prisma.report.create({
            data: {
                title: reportTitle,
                analysisId,
                clientId: analysis.clientId,
                format: format,
                template: templateId,
                createdBy,
                status: 'generating'
            }
        });

        // Generate report file based on format
        let filePath: string;
        let fileSize: number;

        if (format === 'PDF') {
            const result = await generatePDFReport(analysis, template, filteredSections, reportTitle);
            filePath = result.filePath;
            fileSize = result.fileSize;
        } else if (format === 'EXCEL') {
            const result = await generateExcelReport(analysis, template, filteredSections, reportTitle);
            filePath = result.filePath;
            fileSize = result.fileSize;
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Unsupported report format');
        }

        // Update report with file details
        const updatedReport = await prisma.report.update({
            where: { id: report.id },
            data: {
                status: 'completed',
                filePath: filePath,
                fileSize: fileSize
            }
        });

        return updatedReport;
    } catch (error) {
        // Update report status to failed
        await prisma.report.updateMany({
            where: {
                analysisId,
                createdBy,
                status: 'generating'
            },
            data: { status: 'failed' }
        });

        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            `Failed to generate report: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};

/**
 * Generate PDF report
 */
const generatePDFReport = async (
    analysis: any,
    template: ReportTemplate,
    sections: ReportSection[],
    title: string
): Promise<{ filePath: string; fileSize: number }> => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // Generate HTML content
        const htmlContent = await generateHTMLContent(analysis, template, sections, title);

        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '15mm',
                bottom: '20mm',
                left: '15mm'
            }
        });

        // Store in cloud storage
        const storage = getInstance();
        const bucketName = process.env.REPORTS_BUCKET || 'treasury-reports';
        const fileName = `${analysis.id}-${Date.now()}.pdf`;

        await storage.uploadData({
            bucketName,
            data: Buffer.from(pdfBuffer),
            destinationKey: fileName,
            contentType: 'application/pdf'
        });

        return {
            filePath: fileName,
            fileSize: pdfBuffer.length
        };
    } finally {
        await browser.close();
    }
};

/**
 * Generate Excel report
 */
const generateExcelReport = async (
    analysis: any,
    template: ReportTemplate,
    sections: ReportSection[],
    title: string
): Promise<{ filePath: string; fileSize: number }> => {
    const workbook = new ExcelJS.Workbook();

    workbook.creator = 'Treasury Analysis System';
    workbook.created = new Date();
    workbook.title = title;

    for (const section of sections.sort((a, b) => a.order - b.order)) {
        await addExcelSection(workbook, analysis, section);
    }

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Store in cloud storage
    const storage = getInstance();
    const bucketName = process.env.REPORTS_BUCKET || 'treasury-reports';
    const fileName = `${analysis.id}-${Date.now()}.xlsx`;

    await storage.uploadData({
        bucketName,
        data: Buffer.from(buffer),
        destinationKey: fileName,
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    return {
        filePath: fileName,
        fileSize: buffer.byteLength
    };
};

/**
 * Generate HTML content for PDF reports
 */
const generateHTMLContent = async (
    analysis: any,
    template: ReportTemplate,
    sections: ReportSection[],
    title: string
): Promise<string> => {
    let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 210mm;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                border-bottom: 2px solid #2c5f41;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .header h1 {
                color: #2c5f41;
                margin: 0;
                font-size: 24px;
            }
            .header .subtitle {
                color: #666;
                font-size: 14px;
                margin-top: 5px;
            }
            .section {
                margin-bottom: 30px;
                page-break-inside: avoid;
            }
            .section h2 {
                color: #2c5f41;
                border-bottom: 1px solid #eee;
                padding-bottom: 8px;
                font-size: 18px;
            }
            .section h3 {
                color: #444;
                font-size: 14px;
                margin-top: 20px;
            }
            .metrics-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin: 20px 0;
            }
            .metric-card {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                border-left: 4px solid #2c5f41;
            }
            .metric-value {
                font-size: 24px;
                font-weight: bold;
                color: #2c5f41;
            }
            .metric-label {
                color: #666;
                font-size: 12px;
                text-transform: uppercase;
            }
            .table {
                width: 100%;
                border-collapse: collapse;
                margin: 15px 0;
            }
            .table th, .table td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
                font-size: 12px;
            }
            .table th {
                background: #f5f5f5;
                font-weight: bold;
            }
            .recommendation {
                background: #f8f9fa;
                padding: 15px;
                margin: 10px 0;
                border-left: 4px solid #2c5f41;
                border-radius: 0 5px 5px 0;
            }
            .priority-high {
                border-left-color: #dc3545;
            }
            .priority-medium {
                border-left-color: #ffc107;
            }
            .priority-low {
                border-left-color: #28a745;
            }
            .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                font-size: 10px;
                color: #666;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>${title}</h1>
            <div class="subtitle">
                Client: ${analysis.client.name} | 
                Generated: ${new Date().toLocaleDateString()} |
                Analysis Period: ${formatDateRange(analysis)}
            </div>
        </div>
    `;

    for (const section of sections.sort((a, b) => a.order - b.order)) {
        html += await generateHTMLSection(analysis, section);
    }

    html += `
        <div class="footer">
            Generated by Treasury Analysis System | ${new Date().toISOString()}
        </div>
    </body>
    </html>
    `;

    return html;
};

/**
 * Generate HTML section content
 */
const generateHTMLSection = async (analysis: any, section: ReportSection): Promise<string> => {
    let content = `<div class="section">`;
    content += `<h2>${section.name}</h2>`;

    switch (section.type) {
        case 'executive_summary':
            content += generateExecutiveSummaryHTML(analysis);
            break;
        case 'analysis_summary':
            content += generateAnalysisSummaryHTML(analysis);
            break;
        case 'liquidity_metrics':
            content += generateLiquidityMetricsHTML(analysis);
            break;
        case 'spending_breakdown':
            content += generateSpendingBreakdownHTML(analysis);
            break;
        case 'recommendations':
            content += generateRecommendationsHTML(analysis, section.configuration);
            break;
        case 'data_tables':
            content += await generateDataTablesHTML(analysis);
            break;
    }

    content += `</div>`;
    return content;
};

/**
 * Generate executive summary HTML
 */
const generateExecutiveSummaryHTML = (analysis: any): string => {
    const summary = analysis.summary as any;
    const liquidityMetrics = analysis.liquidityMetrics as any;
    const recommendationCount = analysis.Recommendation?.length || 0;

    return `
        <p>This comprehensive treasury analysis provides insights into ${analysis.client.name}'s cash management and liquidity position based on ${summary.transactionCount} transactions over the period from ${new Date(summary.dateRange.startDate).toLocaleDateString()} to ${new Date(summary.dateRange.endDate).toLocaleDateString()}.</p>
        
        <h3>Key Findings</h3>
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-value">$${formatCurrency(summary.avgDailyBalance)}</div>
                <div class="metric-label">Average Daily Balance</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">$${formatCurrency(summary.netCashFlow)}</div>
                <div class="metric-label">Net Cash Flow</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${liquidityMetrics.volatility}%</div>
                <div class="metric-label">Balance Volatility</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${recommendationCount}</div>
                <div class="metric-label">Treasury Recommendations</div>
            </div>
        </div>
        
        <p><strong>Overall Assessment:</strong> ${generateOverallAssessment(analysis)}</p>
    `;
};

/**
 * Generate analysis summary HTML
 */
const generateAnalysisSummaryHTML = (analysis: any): string => {
    const summary = analysis.summary as any;

    return `
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-value">${summary.transactionCount}</div>
                <div class="metric-label">Total Transactions</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">$${formatCurrency(summary.totalInflow)}</div>
                <div class="metric-label">Total Inflow</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">$${formatCurrency(summary.totalOutflow)}</div>
                <div class="metric-label">Total Outflow</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">$${formatCurrency(summary.netCashFlow)}</div>
                <div class="metric-label">Net Cash Flow</div>
            </div>
        </div>
        
        <p><strong>Analysis Period:</strong> ${new Date(summary.dateRange.startDate).toLocaleDateString()} to ${new Date(summary.dateRange.endDate).toLocaleDateString()}</p>
        <p><strong>Data Quality:</strong> Analysis based on ${summary.transactionCount} processed transactions with complete balance information available.</p>
    `;
};

/**
 * Generate liquidity metrics HTML
 */
const generateLiquidityMetricsHTML = (analysis: any): string => {
    const metrics = analysis.liquidityMetrics as any;
    const idleAnalysis = analysis.idleBalanceAnalysis as any;

    return `
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-value">$${formatCurrency(metrics.avgDailyBalance)}</div>
                <div class="metric-label">Average Daily Balance</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">$${formatCurrency(metrics.minBalance)}</div>
                <div class="metric-label">Minimum Balance</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">$${formatCurrency(metrics.maxBalance)}</div>
                <div class="metric-label">Maximum Balance</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${metrics.volatility}%</div>
                <div class="metric-label">Volatility Coefficient</div>
            </div>
        </div>
        
        <h3>Idle Balance Analysis</h3>
        <p><strong>Threshold:</strong> $${formatCurrency(idleAnalysis.threshold)}</p>
        <p><strong>Average Idle Amount:</strong> $${formatCurrency(idleAnalysis.avgIdleAmount)}</p>
        <p><strong>Days with Excess Liquidity:</strong> ${idleAnalysis.daysWithIdleBalance}</p>
        <p><strong>Potential Annual Yield:</strong> $${formatCurrency(idleAnalysis.potentialYieldGain)} (assuming 2.5% yield)</p>
    `;
};

/**
 * Generate spending breakdown HTML
 */
const generateSpendingBreakdownHTML = (analysis: any): string => {
    const breakdown = analysis.spendingBreakdown as any[];

    let html = `
        <table class="table">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Percentage</th>
                    <th>Transaction Count</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (const category of breakdown) {
        html += `
            <tr>
                <td>${category.category}</td>
                <td>$${formatCurrency(category.amount)}</td>
                <td>${category.percentage}%</td>
                <td>${category.transactionCount}</td>
            </tr>
        `;
    }

    html += `
            </tbody>
        </table>
    `;

    return html;
};

/**
 * Generate recommendations HTML
 */
const generateRecommendationsHTML = (analysis: any, config?: Record<string, any>): string => {
    const recommendations = analysis.Recommendation || [];
    const maxRecommendations = config?.maxRecommendations;
    const displayRecommendations = maxRecommendations ? recommendations.slice(0, maxRecommendations) : recommendations;

    let html = '';

    for (const rec of displayRecommendations) {
        const priorityClass = `priority-${rec.priority.toLowerCase()}`;
        html += `
            <div class="recommendation ${priorityClass}">
                <h3>${rec.product.name} (${rec.priority} Priority)</h3>
                <p><strong>Category:</strong> ${rec.product.category}</p>
                <p><strong>Rationale:</strong> ${rec.rationale}</p>
                <p><strong>Key Benefits:</strong> ${rec.product.description}</p>
                ${rec.benefitProjection ? `<p><strong>Projected Benefit:</strong> ${formatBenefitProjection(rec.benefitProjection)}</p>` : ''}
            </div>
        `;
    }

    return html;
};

/**
 * Generate data tables HTML
 */
const generateDataTablesHTML = async (analysis: any): Promise<string> => {
    // This would include detailed transaction data if needed
    return `
        <p><strong>Note:</strong> Detailed transaction data is available in the Excel export version of this report.</p>
        <p><strong>Analysis ID:</strong> ${analysis.id}</p>
        <p><strong>Statement Files Processed:</strong> ${analysis.statementFileIds.length}</p>
    `;
};

/**
 * Add Excel section
 */
const addExcelSection = async (workbook: ExcelJS.Workbook, analysis: any, section: ReportSection): Promise<void> => {
    const worksheet = workbook.addWorksheet(section.name);

    switch (section.type) {
        case 'analysis_summary':
            await addAnalysisSummarySheet(worksheet, analysis);
            break;
        case 'liquidity_metrics':
            await addLiquidityMetricsSheet(worksheet, analysis);
            break;
        case 'spending_breakdown':
            await addSpendingBreakdownSheet(worksheet, analysis);
            break;
        case 'recommendations':
            await addRecommendationsSheet(worksheet, analysis);
            break;
        case 'data_tables':
            await addDataTablesSheet(worksheet, analysis);
            break;
        default:
            // Add basic summary for other section types
            await addAnalysisSummarySheet(worksheet, analysis);
    }
};

/**
 * Add analysis summary sheet to Excel
 */
const addAnalysisSummarySheet = async (worksheet: ExcelJS.Worksheet, analysis: any): Promise<void> => {
    const summary = analysis.summary as any;

    worksheet.addRow(['Analysis Summary']);
    worksheet.addRow(['Client', analysis.client.name]);
    worksheet.addRow(['Analysis ID', analysis.id]);
    worksheet.addRow(['Generated', new Date().toISOString()]);
    worksheet.addRow([]);

    worksheet.addRow(['Metric', 'Value']);
    worksheet.addRow(['Total Transactions', summary.transactionCount]);
    worksheet.addRow(['Total Inflow', summary.totalInflow]);
    worksheet.addRow(['Total Outflow', summary.totalOutflow]);
    worksheet.addRow(['Net Cash Flow', summary.netCashFlow]);
    worksheet.addRow(['Average Daily Balance', summary.avgDailyBalance]);
    worksheet.addRow(['Period Start', summary.dateRange.startDate]);
    worksheet.addRow(['Period End', summary.dateRange.endDate]);

    // Style the header
    worksheet.getRow(1).font = { bold: true, size: 14 };
    worksheet.getRow(6).font = { bold: true };

    // Format currency columns
    worksheet.getColumn(2).numFmt = '$#,##0.00';
};

/**
 * Add liquidity metrics sheet to Excel
 */
const addLiquidityMetricsSheet = async (worksheet: ExcelJS.Worksheet, analysis: any): Promise<void> => {
    const metrics = analysis.liquidityMetrics as any;
    const idleAnalysis = analysis.idleBalanceAnalysis as any;

    worksheet.addRow(['Liquidity Metrics']);
    worksheet.addRow([]);

    worksheet.addRow(['Balance Metrics', 'Value']);
    worksheet.addRow(['Average Daily Balance', metrics.avgDailyBalance]);
    worksheet.addRow(['Minimum Balance', metrics.minBalance]);
    worksheet.addRow(['Maximum Balance', metrics.maxBalance]);
    worksheet.addRow(['Volatility', metrics.volatility + '%']);
    worksheet.addRow(['Liquidity Ratio', metrics.liquidityRatio]);
    worksheet.addRow([]);

    worksheet.addRow(['Idle Balance Analysis', 'Value']);
    worksheet.addRow(['Threshold', idleAnalysis.threshold]);
    worksheet.addRow(['Average Idle Amount', idleAnalysis.avgIdleAmount]);
    worksheet.addRow(['Days with Idle Balance', idleAnalysis.daysWithIdleBalance]);
    worksheet.addRow(['Potential Annual Yield', idleAnalysis.potentialYieldGain]);

    // Style headers
    worksheet.getRow(1).font = { bold: true, size: 14 };
    worksheet.getRow(3).font = { bold: true };
    worksheet.getRow(9).font = { bold: true };

    // Format currency columns
    worksheet.getColumn(2).numFmt = '$#,##0.00';
};

/**
 * Add spending breakdown sheet to Excel
 */
const addSpendingBreakdownSheet = async (worksheet: ExcelJS.Worksheet, analysis: any): Promise<void> => {
    const breakdown = analysis.spendingBreakdown as any[];

    worksheet.addRow(['Spending Breakdown']);
    worksheet.addRow([]);

    worksheet.addRow(['Category', 'Amount', 'Percentage', 'Transaction Count']);

    for (const category of breakdown) {
        worksheet.addRow([
            category.category,
            category.amount,
            category.percentage / 100, // Convert to decimal for Excel percentage formatting
            category.transactionCount
        ]);
    }

    // Style headers
    worksheet.getRow(1).font = { bold: true, size: 14 };
    worksheet.getRow(3).font = { bold: true };

    // Format columns
    worksheet.getColumn(2).numFmt = '$#,##0.00'; // Amount
    worksheet.getColumn(3).numFmt = '0.0%'; // Percentage
};

/**
 * Add recommendations sheet to Excel
 */
const addRecommendationsSheet = async (worksheet: ExcelJS.Worksheet, analysis: any): Promise<void> => {
    const recommendations = analysis.Recommendation || [];

    worksheet.addRow(['Treasury Recommendations']);
    worksheet.addRow([]);

    worksheet.addRow(['Product Name', 'Category', 'Priority', 'Rationale', 'Status', 'Created Date']);

    for (const rec of recommendations) {
        worksheet.addRow([
            rec.product.name,
            rec.product.category,
            rec.priority,
            rec.rationale,
            rec.status,
            rec.createdAt
        ]);
    }

    // Style headers
    worksheet.getRow(1).font = { bold: true, size: 14 };
    worksheet.getRow(3).font = { bold: true };

    // Auto-fit columns
    worksheet.columns.forEach(column => {
        column.width = 20;
    });
};

/**
 * Add data tables sheet to Excel
 */
const addDataTablesSheet = async (worksheet: ExcelJS.Worksheet, analysis: any): Promise<void> => {
    worksheet.addRow(['Analysis Data']);
    worksheet.addRow([]);

    worksheet.addRow(['Field', 'Value']);
    worksheet.addRow(['Analysis ID', analysis.id]);
    worksheet.addRow(['Client ID', analysis.clientId]);
    worksheet.addRow(['Status', analysis.status]);
    worksheet.addRow(['Created At', analysis.createdAt]);
    worksheet.addRow(['Statement File IDs', analysis.statementFileIds.join(', ')]);

    // Style headers
    worksheet.getRow(1).font = { bold: true, size: 14 };
    worksheet.getRow(3).font = { bold: true };
};

/**
 * Get report by ID
 */
const getReportById = async (reportId: string): Promise<Report | null> => {
    return await prisma.report.findUnique({
        where: { id: reportId },
        include: {
            client: true,
            analysis: true
        }
    });
};

/**
 * Get report download stream
 */
const getReportDownloadStream = async (
    reportId: string
): Promise<{ stream: Readable; filename: string; contentType: string; size: number }> => {
    const report = await getReportById(reportId);
    if (!report || !report.filePath) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Report file not found');
    }

    // Increment download count
    await prisma.report.update({
        where: { id: reportId },
        data: {
            downloadCount: {
                increment: 1
            }
        }
    });

    const storage = getInstance();
    const bucketName = process.env.REPORTS_BUCKET || 'treasury-reports';

    try {
        const stream = await storage.createReadStream({
            bucketName,
            key: report.filePath
        });

        const contentType =
            report.format === 'PDF'
                ? 'application/pdf'
                : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const extension = report.format === 'PDF' ? 'pdf' : 'xlsx';
        const filename = `${report.title.replace(/[^a-zA-Z0-9]/g, '_')}.${extension}`;

        return {
            stream,
            filename,
            contentType,
            size: report.fileSize
        };
    } catch (error) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Report file could not be accessed from storage');
    }
};

/**
 * Query reports
 */
const queryReports = async <Key extends keyof Report>(
    filter: ReportFilter,
    options: ReportOptions,
    keys: Key[] = [
        'id',
        'title',
        'format',
        'status',
        'createdAt',
        'downloadCount',
        'fileSize',
        'clientId',
        'analysisId'
    ] as Key[]
): Promise<{ reports: Pick<Report, Key>[]; totalCount: number; page: number; totalPages: number }> => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy ?? 'createdAt';
    const sortType = options.sortType ?? 'desc';

    // Build where clause
    const where: any = {};
    if (filter.clientId) where.clientId = filter.clientId;
    if (filter.analysisId) where.analysisId = filter.analysisId;
    if (filter.format) where.format = filter.format;
    if (filter.status) where.status = filter.status;
    if (filter.createdBy) where.createdBy = filter.createdBy;
    if (filter.dateFrom || filter.dateTo) {
        where.createdAt = {};
        if (filter.dateFrom) where.createdAt.gte = filter.dateFrom;
        if (filter.dateTo) where.createdAt.lte = filter.dateTo;
    }

    const selectObject = keys.reduce((obj, k) => ({ ...obj, [k]: true }), {});

    const [reports, totalCount] = await Promise.all([
        prisma.report.findMany({
            where,
            select: selectObject,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { [sortBy]: sortType }
        }),
        prisma.report.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
        reports: reports as Pick<Report, Key>[],
        totalCount,
        page,
        totalPages
    };
};

/**
 * Delete report by ID
 */
const deleteReportById = async (reportId: string): Promise<Report> => {
    const report = await getReportById(reportId);
    if (!report) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Report not found');
    }

    // Delete from storage if file exists
    if (report.filePath) {
        try {
            const storage = getInstance();
            const bucketName = process.env.REPORTS_BUCKET || 'treasury-reports';
            await storage.deleteFile({
                bucketName,
                key: report.filePath
            });
        } catch (error) {
            // Log but don't fail the deletion if storage cleanup fails
            console.warn(
                `Failed to delete report file from storage: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    await prisma.report.delete({ where: { id: reportId } });
    return report;
};

/**
 * Get available report templates
 */
const getTemplates = (): ReportTemplate[] => {
    return DEFAULT_TEMPLATES.filter(template => template.isActive);
};

/**
 * Get specific template by ID
 */
const getTemplate = (templateId: string): ReportTemplate | null => {
    return DEFAULT_TEMPLATES.find(template => template.id === templateId) || null;
};

// Utility functions
const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(Math.abs(amount));
};

const formatDateRange = (analysis: any): string => {
    const summary = analysis.summary as any;
    const startDate = new Date(summary.dateRange.startDate).toLocaleDateString();
    const endDate = new Date(summary.dateRange.endDate).toLocaleDateString();
    return `${startDate} to ${endDate}`;
};

const formatBenefitProjection = (projection: any): string => {
    if (typeof projection === 'object') {
        return JSON.stringify(projection);
    }
    return String(projection);
};

const generateOverallAssessment = (analysis: any): string => {
    const summary = analysis.summary as any;
    const liquidityMetrics = analysis.liquidityMetrics as any;
    const idleAnalysis = analysis.idleBalanceAnalysis as any;

    let assessment = 'Based on the analysis, ';

    if (summary.netCashFlow > 0) {
        assessment += 'the organization shows positive cash flow, indicating healthy operational performance. ';
    } else {
        assessment +=
            'the organization shows negative cash flow, which may require attention to cash management strategies. ';
    }

    if (liquidityMetrics.volatility > 0.3) {
        assessment +=
            'Balance volatility is relatively high, suggesting opportunities for better cash flow forecasting and management. ';
    } else {
        assessment += 'Balance volatility is well-controlled, indicating stable cash management practices. ';
    }

    if (idleAnalysis.avgIdleAmount > 0) {
        assessment += `There are opportunities to optimize ${formatCurrency(idleAnalysis.avgIdleAmount)} in idle balances through strategic treasury products.`;
    } else {
        assessment += 'Cash utilization appears to be well-optimized with minimal idle balances.';
    }

    return assessment;
};

export default {
    generateReport,
    getReportById,
    getReportDownloadStream,
    queryReports,
    deleteReportById,
    getTemplates,
    getTemplate
};
