import { Role } from '../generated/prisma/index.js';
const allRoles = {
    [Role.USER]: ['getClients', 'getDashboard', 'getStatements', 'getAnalysis', 'getProducts'],
    [Role.ADMIN]: [
        'getUsers',
        'manageUsers',
        'getClients',
        'manageClients',
        'getDashboard',
        'getStatements',
        'manageStatements',
        'getAnalysis',
        'manageAnalysis',
        'getProducts',
        'manageProducts',
        'getAdminConfig',
        'manageAdminConfig'
    ]
};
export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
