import prisma from '../client.ts';
import { Prisma, Role, User } from '../generated/prisma/index.js';
import ApiError from '../utils/ApiError.ts';
import { encryptPassword } from '../utils/encryption.ts';
import httpStatus from 'http-status';

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (email: string, password: string, name?: string, role: Role = Role.USER): Promise<User> => {
    if (await getUserByEmail(email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return prisma.user.create({
        data: {
            email,
            name,
            password: await encryptPassword(password),
            role
        }
    });
};

/**
 * Query for users
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async <Key extends keyof User>(
    filter: any,
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    },
    keys: Key[] = ['id', 'email', 'name', 'role', 'isEmailVerified', 'createdAt', 'updatedAt'] as Key[]
): Promise<{
    results: Pick<User, Key>[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
}> => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;

    // Build where clause with proper filtering
    const whereClause: any = {};
    if (filter.name) {
        whereClause.name = {
            contains: filter.name,
            mode: 'insensitive'
        };
    }
    if (filter.role) {
        whereClause.role = filter.role;
    }

    // Parse sortBy parameter in format: field:direction
    let orderBy = undefined;
    if (options.sortBy) {
        const [sortField, sortDirection] = options.sortBy.split(':');
        const direction = sortDirection === 'asc' ? 'asc' : 'desc';
        orderBy = { [sortField]: direction };
    }

    // Get total count for pagination
    const totalResults = await prisma.user.count({
        where: whereClause
    });

    const totalPages = Math.ceil(totalResults / limit);
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({
        where: whereClause,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: skip,
        take: limit,
        orderBy: orderBy
    });

    return {
        results: users as Pick<User, Key>[],
        page,
        limit,
        totalPages,
        totalResults
    };
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserById = async <Key extends keyof User>(
    id: number,
    keys: Key[] = ['id', 'email', 'name', 'password', 'role', 'isEmailVerified', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<User, Key> | null> => {
    return (await prisma.user.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    })) as Promise<Pick<User, Key> | null>;
};

/**
 * Get user by email
 * @param {string} email
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserByEmail = async <Key extends keyof User>(
    email: string,
    keys: Key[] = ['id', 'email', 'name', 'password', 'role', 'isEmailVerified', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<User, Key> | null> => {
    return await (prisma.user.findUnique({
        where: { email },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }) as Promise<Pick<User, Key> | null>);
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async <Key extends keyof User>(
    userId: number,
    updateBody: Prisma.UserUpdateInput,
    keys: Key[] = ['id', 'email', 'name', 'role', 'isEmailVerified', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<User, Key> | null> => {
    const user = await getUserById(userId, ['id', 'email', 'name']);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email) {
        const existingUser = await getUserByEmail(updateBody.email as string, ['id']);
        if (existingUser && existingUser.id !== userId) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
        }
    }

    // Encrypt password if provided
    if (updateBody.password) {
        updateBody.password = await encryptPassword(updateBody.password as string);
    }

    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: updateBody,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
    return updatedUser as Pick<User, Key> | null;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId: number): Promise<User> => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await prisma.user.delete({ where: { id: user.id } });
    return user;
};

export default {
    createUser,
    queryUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById
};
