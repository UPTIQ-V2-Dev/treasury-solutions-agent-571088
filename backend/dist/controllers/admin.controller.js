import { adminService } from "../services/index.js";
import catchAsyncWithAuth from "../utils/catchAsyncWithAuth.js";
import pick from "../utils/pick.js";
const getConfig = catchAsyncWithAuth(async (req, res) => {
    const config = await adminService.getConfig();
    res.send(config);
});
const updateConfig = catchAsyncWithAuth(async (req, res) => {
    const updatedBy = req.user?.email || 'unknown';
    // Create audit log entry
    await adminService.createAuditEntry({
        userId: req.user?.id || 0,
        userName: req.user?.name || 'Unknown',
        userEmail: req.user?.email || 'unknown@system',
        action: 'update_config',
        resource: 'system_config',
        details: `Updated system configuration: ${JSON.stringify(Object.keys(req.body))}`,
        severity: 'medium',
        ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
        userAgent: req.get('User-Agent')
    });
    const config = await adminService.updateConfig(req.body, updatedBy);
    res.send(config);
});
const resetConfig = catchAsyncWithAuth(async (req, res) => {
    const updatedBy = req.user?.email || 'unknown';
    // Create audit log entry
    await adminService.createAuditEntry({
        userId: req.user?.id || 0,
        userName: req.user?.name || 'Unknown',
        userEmail: req.user?.email || 'unknown@system',
        action: 'reset_config',
        resource: 'system_config',
        details: 'Reset system configuration to defaults',
        severity: 'high',
        ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
        userAgent: req.get('User-Agent')
    });
    const config = await adminService.resetConfig(updatedBy);
    res.send(config);
});
const getAuditLogs = catchAsyncWithAuth(async (req, res) => {
    const filter = pick(req.query, ['search', 'userId', 'action', 'dateFrom', 'dateTo']);
    const options = pick(req.query, ['page', 'limit']);
    // Convert date strings to Date objects
    if (filter.dateFrom && typeof filter.dateFrom === 'string') {
        filter.dateFrom = new Date(filter.dateFrom);
    }
    if (filter.dateTo && typeof filter.dateTo === 'string') {
        filter.dateTo = new Date(filter.dateTo);
    }
    const result = await adminService.queryAuditLogs(filter, options);
    res.send(result);
});
const exportAuditLogs = catchAsyncWithAuth(async (req, res) => {
    const filter = pick(req.query, ['search', 'userId', 'action', 'dateFrom', 'dateTo']);
    // Convert date strings to Date objects
    if (filter.dateFrom && typeof filter.dateFrom === 'string') {
        filter.dateFrom = new Date(filter.dateFrom);
    }
    if (filter.dateTo && typeof filter.dateTo === 'string') {
        filter.dateTo = new Date(filter.dateTo);
    }
    // Create audit log entry
    await adminService.createAuditEntry({
        userId: req.user?.id || 0,
        userName: req.user?.name || 'Unknown',
        userEmail: req.user?.email || 'unknown@system',
        action: 'export_audit_logs',
        resource: 'audit_logs',
        details: `Exported audit logs with filters: ${JSON.stringify(filter)}`,
        severity: 'medium',
        ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
        userAgent: req.get('User-Agent')
    });
    const csvData = await adminService.exportAuditLogs(filter);
    // Set CSV headers
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="audit-logs-${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(csvData);
});
export default {
    getConfig,
    updateConfig,
    resetConfig,
    getAuditLogs,
    exportAuditLogs
};
