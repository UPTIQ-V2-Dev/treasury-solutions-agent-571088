import { userService } from '../services/index.ts';
import ApiError from '../utils/ApiError.ts';
import catchAsyncWithAuth from '../utils/catchAsyncWithAuth.ts';
import pick from '../utils/pick.ts';
import httpStatus from 'http-status';

const createUser = catchAsyncWithAuth(async (req, res) => {
    const { email, password, name, role } = req.body;
    const user = await userService.createUser(email, password, name, role);
    // Remove password from response
    const { password: _, ...userResponse } = user;
    res.status(httpStatus.CREATED).send(userResponse);
});

const getUsers = catchAsyncWithAuth(async (req, res) => {
    const filter = pick(req.validatedQuery, ['name', 'role']);
    const options = pick(req.validatedQuery, ['sortBy', 'limit', 'page']);
    const result = await userService.queryUsers(filter, options);
    res.send(result);
});

const getUser = catchAsyncWithAuth(async (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = await userService.getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    // Remove password from response
    const { password: _, ...userResponse } = user;
    res.send(userResponse);
});

const updateUser = catchAsyncWithAuth(async (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = await userService.updateUserById(userId, req.body);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    // Remove password from response
    const { password: _, ...userResponse } = user;
    res.send(userResponse);
});

const deleteUser = catchAsyncWithAuth(async (req, res) => {
    const userId = parseInt(req.params.userId);
    await userService.deleteUserById(userId);
    res.send({ message: 'User deleted successfully' });
});

export default {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};
