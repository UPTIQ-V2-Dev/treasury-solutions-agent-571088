import { adminConfigService } from "../services/index.js";
import catchAsyncWithAuth from "../utils/catchAsyncWithAuth.js";
const getConfiguration = catchAsyncWithAuth(async (req, res) => {
    const config = await adminConfigService.getConfiguration();
    res.send(config);
});
const updateConfiguration = catchAsyncWithAuth(async (req, res) => {
    const updatedBy = req.user.email || req.user.id.toString();
    const config = await adminConfigService.updateConfiguration(req.body, updatedBy);
    res.send(config);
});
const resetConfiguration = catchAsyncWithAuth(async (req, res) => {
    const updatedBy = req.user.email || req.user.id.toString();
    const config = await adminConfigService.resetConfiguration(updatedBy);
    res.send(config);
});
export default {
    getConfiguration,
    updateConfiguration,
    resetConfiguration
};
