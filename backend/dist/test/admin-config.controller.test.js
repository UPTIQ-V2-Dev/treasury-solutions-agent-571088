import app from "../app.js";
import { adminConfigService } from "../services/index.js";
import httpStatus from 'http-status';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
// Mock the auth middleware
vi.mock('../middlewares/auth.ts', () => ({
    default: vi.fn(() => (req, res, next) => {
        req.user = {
            id: 1,
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'ADMIN'
        };
        next();
    })
}));
// Mock the admin config service
vi.mock('../services/index.ts', async () => {
    const actual = await vi.importActual('../services/index.ts');
    return {
        ...actual,
        adminConfigService: {
            getConfiguration: vi.fn(),
            updateConfiguration: vi.fn(),
            resetConfiguration: vi.fn()
        }
    };
});
const mockAdminConfigService = adminConfigService;
describe('Admin Config Controller', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    describe('GET /admin/config', () => {
        it('should get system configuration', async () => {
            const mockConfig = {
                thresholds: { idleCashThreshold: 100000 },
                features: { enableAutoAnalysis: true },
                integrations: { bankApiEnabled: false },
                security: { sessionTimeout: 60 }
            };
            mockAdminConfigService.getConfiguration.mockResolvedValue(mockConfig);
            const response = await request(app).get('/v1/admin/config').expect(httpStatus.OK);
            expect(response.body).toEqual(mockConfig);
            expect(mockAdminConfigService.getConfiguration).toHaveBeenCalledOnce();
        });
    });
    describe('PUT /admin/config', () => {
        it('should update system configuration', async () => {
            const updateData = {
                thresholds: { idleCashThreshold: 150000 }
            };
            const updatedConfig = {
                thresholds: { idleCashThreshold: 150000 },
                features: { enableAutoAnalysis: true },
                integrations: { bankApiEnabled: false },
                security: { sessionTimeout: 60 }
            };
            mockAdminConfigService.updateConfiguration.mockResolvedValue(updatedConfig);
            const response = await request(app).put('/v1/admin/config').send(updateData).expect(httpStatus.OK);
            expect(response.body).toEqual(updatedConfig);
            expect(mockAdminConfigService.updateConfiguration).toHaveBeenCalledWith(updateData, 'admin@example.com');
        });
        it('should validate request body', async () => {
            const invalidData = {
                thresholds: { idleCashThreshold: 'invalid' }
            };
            await request(app).put('/v1/admin/config').send(invalidData).expect(httpStatus.BAD_REQUEST);
        });
    });
    describe('POST /admin/config/reset', () => {
        it('should reset configuration to defaults', async () => {
            const defaultConfig = {
                thresholds: { idleCashThreshold: 100000 },
                features: { enableAutoAnalysis: true },
                integrations: { bankApiEnabled: false },
                security: { sessionTimeout: 60 }
            };
            mockAdminConfigService.resetConfiguration.mockResolvedValue(defaultConfig);
            const response = await request(app).post('/v1/admin/config/reset').expect(httpStatus.OK);
            expect(response.body).toEqual(defaultConfig);
            expect(mockAdminConfigService.resetConfiguration).toHaveBeenCalledWith('admin@example.com');
        });
    });
});
