import { reportService } from "../services/index.js";
import pick from "../utils/pick.js";
import { z } from 'zod';
// Schema definitions
const reportSectionSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum([
        'executive_summary',
        'analysis_summary',
        'liquidity_metrics',
        'spending_breakdown',
        'recommendations',
        'data_tables',
        'charts'
    ]),
    order: z.number(),
    required: z.boolean(),
    configuration: z.record(z.any()).optional()
});
const reportTemplateSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    format: z.enum(['PDF', 'EXCEL']),
    sections: z.array(reportSectionSchema),
    isActive: z.boolean()
});
const reportSchema = z.object({
    id: z.string(),
    title: z.string(),
    analysisId: z.string(),
    clientId: z.string(),
    format: z.string(),
    template: z.string(),
    createdAt: z.string(),
    createdBy: z.string(),
    fileSize: z.number(),
    downloadCount: z.number(),
    status: z.string(),
    filePath: z.string().nullable()
});
const reportsResponseSchema = z.object({
    reports: z.array(reportSchema),
    totalCount: z.number(),
    page: z.number(),
    totalPages: z.number()
});
// Tool definitions
const generateReportTool = {
    id: 'report_generate',
    name: 'Generate Report',
    description: 'Generate a report based on analysis data with customizable templates and formats',
    inputSchema: z.object({
        analysisId: z.string(),
        templateId: z
            .enum(['comprehensive-treasury-report', 'executive-summary-report', 'detailed-data-export'])
            .optional(),
        format: z.enum(['PDF', 'EXCEL']).optional(),
        title: z.string().max(200).optional(),
        sections: z.array(z.string()).max(10).optional(),
        createdBy: z.string() // Required for MCP tools since we don't have auth context
    }),
    outputSchema: reportSchema,
    fn: async (inputs) => {
        const reportData = {
            analysisId: inputs.analysisId,
            templateId: inputs.templateId,
            format: inputs.format,
            title: inputs.title,
            sections: inputs.sections,
            createdBy: inputs.createdBy
        };
        const report = await reportService.generateReport(reportData);
        return report;
    }
};
const getReportTool = {
    id: 'report_get',
    name: 'Get Report',
    description: 'Get detailed information about a specific report',
    inputSchema: z.object({
        reportId: z.string()
    }),
    outputSchema: reportSchema,
    fn: async (inputs) => {
        const report = await reportService.getReportById(inputs.reportId);
        if (!report) {
            throw new Error(`Report not found with ID: ${inputs.reportId}`);
        }
        return report;
    }
};
const queryReportsTool = {
    id: 'report_query',
    name: 'Query Reports',
    description: 'Query and filter reports with optional filters and pagination',
    inputSchema: z.object({
        clientId: z.string().optional(),
        analysisId: z.string().optional(),
        format: z.enum(['PDF', 'EXCEL']).optional(),
        status: z.enum(['generating', 'completed', 'failed']).optional(),
        createdBy: z.string().optional(),
        dateFrom: z.string().datetime().optional(),
        dateTo: z.string().datetime().optional(),
        sortBy: z.enum(['createdAt', 'title', 'format', 'status', 'downloadCount', 'fileSize']).optional(),
        sortType: z.enum(['asc', 'desc']).optional(),
        limit: z.number().int().min(1).max(100).optional(),
        page: z.number().int().min(1).optional()
    }),
    outputSchema: reportsResponseSchema,
    fn: async (inputs) => {
        const filter = pick(inputs, ['clientId', 'analysisId', 'format', 'status', 'createdBy', 'dateFrom', 'dateTo']);
        const options = pick(inputs, ['sortBy', 'sortType', 'limit', 'page']);
        // Convert date strings to Date objects if provided
        const processedFilter = { ...filter };
        if (processedFilter.dateFrom) {
            processedFilter.dateFrom = new Date(processedFilter.dateFrom);
        }
        if (processedFilter.dateTo) {
            processedFilter.dateTo = new Date(processedFilter.dateTo);
        }
        const result = await reportService.queryReports(processedFilter, options);
        return result;
    }
};
const deleteReportTool = {
    id: 'report_delete',
    name: 'Delete Report',
    description: 'Delete a report and its associated file from storage',
    inputSchema: z.object({
        reportId: z.string()
    }),
    outputSchema: reportSchema,
    fn: async (inputs) => {
        const deletedReport = await reportService.deleteReportById(inputs.reportId);
        return deletedReport;
    }
};
const getTemplatesTool = {
    id: 'report_get_templates',
    name: 'Get Report Templates',
    description: 'Get all available report templates with their configurations',
    inputSchema: z.object({}),
    outputSchema: z.object({
        templates: z.array(reportTemplateSchema)
    }),
    // eslint-disable-next-line require-await
    fn: async () => {
        const templates = reportService.getTemplates();
        return { templates };
    }
};
const getTemplateTool = {
    id: 'report_get_template',
    name: 'Get Report Template',
    description: 'Get a specific report template by ID',
    inputSchema: z.object({
        templateId: z.string()
    }),
    outputSchema: z.object({
        template: reportTemplateSchema.nullable()
    }),
    // eslint-disable-next-line require-await
    fn: async (inputs) => {
        const template = reportService.getTemplate(inputs.templateId);
        return { template };
    }
};
// Export tools array
export const reportTools = [
    generateReportTool,
    getReportTool,
    queryReportsTool,
    deleteReportTool,
    getTemplatesTool,
    getTemplateTool
];
