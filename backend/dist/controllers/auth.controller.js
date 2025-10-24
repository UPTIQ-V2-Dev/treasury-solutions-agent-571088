import { authService, emailService, tokenService, userService } from "../services/index.js";
import catchAsync from "../utils/catchAsync.js";
import exclude from "../utils/exclude.js";
import httpStatus from 'http-status';
const register = catchAsync(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await userService.createUser(email, password, name);
    const userWithoutPassword = exclude(user, ['password']);
    const tokens = await tokenService.generateAuthTokens(user);
    // Ensure dates are in ISO string format
    const formattedUser = {
        ...userWithoutPassword,
        createdAt: userWithoutPassword.createdAt.toISOString(),
        updatedAt: userWithoutPassword.updatedAt.toISOString()
    };
    res.status(httpStatus.CREATED).send({ user: formattedUser, tokens });
});
const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    // Ensure dates are in ISO string format
    const formattedUser = {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
    };
    res.send({ user: formattedUser, tokens });
});
const logout = catchAsync(async (req, res) => {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
});
const refreshTokens = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ tokens });
});
const forgotPassword = catchAsync(async (req, res) => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
    await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
    res.status(httpStatus.NO_CONTENT).send();
});
const resetPassword = catchAsync(async (req, res) => {
    await authService.resetPassword(req.query.token, req.body.password);
    res.status(httpStatus.NO_CONTENT).send();
});
const sendVerificationEmail = catchAsync(async (req, res) => {
    const user = req.user;
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
    await emailService.sendVerificationEmail(user.email, verifyEmailToken);
    res.status(httpStatus.NO_CONTENT).send();
});
const verifyEmail = catchAsync(async (req, res) => {
    await authService.verifyEmail(req.query.token);
    res.status(httpStatus.NO_CONTENT).send();
});
export default {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail
};
