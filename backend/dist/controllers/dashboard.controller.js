import { dashboardService } from "../services/index.js";
import catchAsyncWithAuth from "../utils/catchAsyncWithAuth.js";
import httpStatus from 'http-status';
const getMetrics = catchAsyncWithAuth(async (req, res) => {
    const metrics = await dashboardService.getDashboardMetrics();
    res.status(httpStatus.OK).send(metrics);
});
export default {
    getMetrics
};
