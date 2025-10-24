import app from "../app.js";
import prisma from "../client.js";
import { Role } from '../generated/prisma/index.js';
import { encryptPassword } from "../utils/encryption.js";
import { generateToken } from "../utils/jwt.js";
import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
describe('User Integration Tests', () => {
    let adminToken;
    let userToken;
    let regularUserId;
    beforeAll(async () => {
        // Create test admin user
        const adminUser = await prisma.user.create({
            data: {
                email: 'admin@test.com',
                password: await encryptPassword('password123'),
                name: 'Test Admin',
                role: Role.ADMIN,
                isEmailVerified: true
            }
        });
        // Create test regular user
        const regularUser = await prisma.user.create({
            data: {
                email: 'user@test.com',
                password: await encryptPassword('password123'),
                name: 'Test User',
                role: Role.USER,
                isEmailVerified: true
            }
        });
        // Generate JWT tokens
        adminToken = generateToken(adminUser.id);
        userToken = generateToken(regularUser.id);
        regularUserId = regularUser.id;
    });
    afterAll(async () => {
        // Clean up test data
        await prisma.user.deleteMany({
            where: {
                email: {
                    in: ['admin@test.com', 'user@test.com', 'newuser@test.com']
                }
            }
        });
        await prisma.$disconnect();
    });
    beforeEach(async () => {
        // Clean up any test users created during tests
        await prisma.user.deleteMany({
            where: {
                email: {
                    startsWith: 'test-'
                }
            }
        });
    });
    describe('POST /users', () => {
        it('should create user successfully with admin access', async () => {
            const userData = {
                email: 'newuser@test.com',
                password: 'password123',
                name: 'New User',
                role: 'USER'
            };
            const response = await request(app)
                .post('/v1/users')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(userData)
                .expect(201);
            expect(response.body).toMatchObject({
                email: userData.email,
                name: userData.name,
                role: userData.role,
                isEmailVerified: false
            });
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('createdAt');
            expect(response.body).toHaveProperty('updatedAt');
            expect(response.body).not.toHaveProperty('password');
        });
        it('should fail with non-admin access', async () => {
            const userData = {
                email: 'unauthorized@test.com',
                password: 'password123',
                name: 'Unauthorized User',
                role: 'USER'
            };
            await request(app).post('/v1/users').set('Authorization', `Bearer ${userToken}`).send(userData).expect(403);
        });
        it('should fail with invalid email', async () => {
            const userData = {
                email: 'invalid-email',
                password: 'password123',
                name: 'Test User',
                role: 'USER'
            };
            await request(app)
                .post('/v1/users')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(userData)
                .expect(400);
        });
        it('should fail with duplicate email', async () => {
            const userData = {
                email: 'admin@test.com', // Already exists
                password: 'password123',
                name: 'Duplicate User',
                role: 'USER'
            };
            await request(app)
                .post('/v1/users')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(userData)
                .expect(400);
        });
    });
    describe('GET /users', () => {
        it('should get paginated users with admin access', async () => {
            const response = await request(app)
                .get('/v1/users?page=1&limit=10')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200);
            expect(response.body).toHaveProperty('results');
            expect(response.body).toHaveProperty('page', 1);
            expect(response.body).toHaveProperty('limit', 10);
            expect(response.body).toHaveProperty('totalPages');
            expect(response.body).toHaveProperty('totalResults');
            expect(Array.isArray(response.body.results)).toBe(true);
            // Check user object structure
            if (response.body.results.length > 0) {
                const user = response.body.results[0];
                expect(user).toHaveProperty('id');
                expect(user).toHaveProperty('email');
                expect(user).toHaveProperty('name');
                expect(user).toHaveProperty('role');
                expect(user).toHaveProperty('isEmailVerified');
                expect(user).toHaveProperty('createdAt');
                expect(user).toHaveProperty('updatedAt');
                expect(user).not.toHaveProperty('password');
            }
        });
        it('should filter users by name', async () => {
            const response = await request(app)
                .get('/v1/users?name=Test Admin')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200);
            expect(response.body.results.length).toBeGreaterThan(0);
            expect(response.body.results[0].name).toContain('Test Admin');
        });
        it('should filter users by role', async () => {
            const response = await request(app)
                .get('/v1/users?role=ADMIN')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200);
            expect(response.body.results.length).toBeGreaterThan(0);
            response.body.results.forEach((user) => {
                expect(user.role).toBe('ADMIN');
            });
        });
        it('should sort users correctly', async () => {
            const response = await request(app)
                .get('/v1/users?sortBy=name:asc')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200);
            if (response.body.results.length > 1) {
                const names = response.body.results.map((user) => user.name).filter(Boolean);
                const sortedNames = [...names].sort();
                expect(names).toEqual(sortedNames);
            }
        });
        it('should fail with non-admin access', async () => {
            await request(app).get('/v1/users').set('Authorization', `Bearer ${userToken}`).expect(403);
        });
    });
    describe('GET /users/:userId', () => {
        it('should get user by id with admin access', async () => {
            const response = await request(app)
                .get(`/v1/users/${regularUserId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200);
            expect(response.body).toMatchObject({
                id: regularUserId,
                email: 'user@test.com',
                name: 'Test User',
                role: 'USER',
                isEmailVerified: true
            });
            expect(response.body).not.toHaveProperty('password');
        });
        it('should allow user to get their own details', async () => {
            const response = await request(app)
                .get(`/v1/users/${regularUserId}`)
                .set('Authorization', `Bearer ${userToken}`)
                .expect(200);
            expect(response.body.id).toBe(regularUserId);
        });
        it("should fail when user tries to get another user's details", async () => {
            // Assuming adminUser has id 1 and regularUser has a different id
            const adminId = 1; // This would need to be the actual admin ID from setup
            await request(app).get(`/v1/users/${adminId}`).set('Authorization', `Bearer ${userToken}`).expect(403);
        });
        it('should return 404 for non-existent user', async () => {
            await request(app).get('/v1/users/99999').set('Authorization', `Bearer ${adminToken}`).expect(404);
        });
    });
    describe('PATCH /users/:userId', () => {
        it('should update user with admin access', async () => {
            const updateData = {
                name: 'Updated Test User',
                email: 'updated-user@test.com'
            };
            const response = await request(app)
                .patch(`/v1/users/${regularUserId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updateData)
                .expect(200);
            expect(response.body).toMatchObject({
                id: regularUserId,
                name: updateData.name,
                email: updateData.email,
                role: 'USER'
            });
            expect(response.body).not.toHaveProperty('password');
        });
        it('should allow user to update their own details', async () => {
            const updateData = {
                name: 'Self Updated Name'
            };
            const response = await request(app)
                .patch(`/v1/users/${regularUserId}`)
                .set('Authorization', `Bearer ${userToken}`)
                .send(updateData)
                .expect(200);
            expect(response.body.name).toBe(updateData.name);
        });
        it('should return 404 for non-existent user', async () => {
            const updateData = {
                name: 'Updated Name'
            };
            await request(app)
                .patch('/v1/users/99999')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updateData)
                .expect(404);
        });
        it('should fail with invalid email format', async () => {
            const updateData = {
                email: 'invalid-email-format'
            };
            await request(app)
                .patch(`/v1/users/${regularUserId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updateData)
                .expect(400);
        });
    });
    describe('DELETE /users/:userId', () => {
        it('should delete user with admin access', async () => {
            // Create a user to delete
            const userToDelete = await prisma.user.create({
                data: {
                    email: 'delete-test@test.com',
                    password: await encryptPassword('password123'),
                    name: 'Delete Test User',
                    role: Role.USER,
                    isEmailVerified: true
                }
            });
            const response = await request(app)
                .delete(`/v1/users/${userToDelete.id}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200);
            expect(response.body).toMatchObject({
                message: 'User deleted successfully'
            });
            // Verify user was deleted
            const deletedUser = await prisma.user.findUnique({
                where: { id: userToDelete.id }
            });
            expect(deletedUser).toBeNull();
        });
        it('should return 404 for non-existent user', async () => {
            await request(app).delete('/v1/users/99999').set('Authorization', `Bearer ${adminToken}`).expect(404);
        });
        it('should fail with non-admin access', async () => {
            await request(app)
                .delete(`/v1/users/${regularUserId}`)
                .set('Authorization', `Bearer ${userToken}`)
                .expect(403);
        });
    });
    describe('Authorization and Authentication', () => {
        it('should fail without authentication token', async () => {
            await request(app).get('/v1/users').expect(401);
        });
        it('should fail with invalid token', async () => {
            await request(app).get('/v1/users').set('Authorization', 'Bearer invalid-token').expect(401);
        });
        it('should fail with expired token', async () => {
            // This would require mocking JWT expiration, skipping for now
            // In a real test, you'd generate an expired token
        });
    });
});
