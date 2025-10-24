import { dashboardService } from '../services/index.ts';
import catchAsyncWithAuth from '../utils/catchAsyncWithAuth.ts';
import httpStatus from 'http-status';

const getMetrics = catchAsyncWithAuth(async (req, res) => {
    const metrics = await dashboardService.getDashboardMetrics();
    res.status(httpStatus.OK).send(metrics);
});

export default {
    getMetrics
};
