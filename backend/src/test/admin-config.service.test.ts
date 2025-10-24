import prisma from '../client.ts';
import adminConfigService from '../services/admin-config.service.ts';
import ApiError from '../utils/ApiError.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock Prisma client
vi.mock('../client.ts', () => ({
    default: {
        systemConfig: {
            findMany: vi.fn(),
            findUnique: vi.fn(),
            upsert: vi.fn(),
            deleteMany: vi.fn(),
            createMany: vi.fn()
        }
    }
}));

const mockPrisma = prisma as any;

describe('Admin Config Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getConfiguration', () => {
        it('should return default configuration when no config exists', async () => {
            mockPrisma.systemConfig.findMany.mockResolvedValue([]);

            const result = await adminConfigService.getConfiguration();

            expect(result).toEqual(adminConfigService.DEFAULT_CONFIG);
            expect(mockPrisma.systemConfig.findMany).toHaveBeenCalledOnce();
        });

        it('should return merged configuration from database', async () => {
            const mockConfigs = [
                { configKey: 'thresholds.idleCashThreshold', configValue: 150000 },
                { configKey: 'features.enableAutoAnalysis', configValue: false }
            ];
            mockPrisma.systemConfig.findMany.mockResolvedValue(mockConfigs);

            const result = await adminConfigService.getConfiguration();

            expect(result.thresholds.idleCashThreshold).toBe(150000);
            expect(result.features.enableAutoAnalysis).toBe(false);
            expect(result.thresholds.liquidityWarningThreshold).toBe(50000); // Default value
        });
    });

    describe('updateConfiguration', () => {
        it('should update configuration successfully', async () => {
            const updateData = {
                thresholds: { idleCashThreshold: 200000 },
                features: { enableAdvancedReports: true }
            };
            const updatedBy = 'admin@example.com';

            mockPrisma.systemConfig.upsert
                .mockResolvedValueOnce({ configKey: 'thresholds.idleCashThreshold', configValue: 200000 })
                .mockResolvedValueOnce({ configKey: 'features.enableAdvancedReports', configValue: true });

            mockPrisma.systemConfig.findMany.mockResolvedValue([
                { configKey: 'thresholds.idleCashThreshold', configValue: 200000 },
                { configKey: 'features.enableAdvancedReports', configValue: true }
            ]);

            const result = await adminConfigService.updateConfiguration(updateData, updatedBy);

            expect(mockPrisma.systemConfig.upsert).toHaveBeenCalledTimes(2);
            expect(result.thresholds.idleCashThreshold).toBe(200000);
            expect(result.features.enableAdvancedReports).toBe(true);
        });

        it('should validate configuration values', async () => {
            const invalidData = {
                thresholds: { idleCashThreshold: -100 } // Invalid negative value
            };

            await expect(adminConfigService.updateConfiguration(invalidData, 'admin@example.com')).rejects.toThrow(
                ApiError
            );
        });
    });

    describe('resetConfiguration', () => {
        it('should reset to default configuration', async () => {
            const updatedBy = 'admin@example.com';

            mockPrisma.systemConfig.deleteMany.mockResolvedValue({ count: 5 });
            mockPrisma.systemConfig.createMany.mockResolvedValue({ count: 10 });

            const result = await adminConfigService.resetConfiguration(updatedBy);

            expect(mockPrisma.systemConfig.deleteMany).toHaveBeenCalledOnce();
            expect(mockPrisma.systemConfig.createMany).toHaveBeenCalledOnce();
            expect(result).toEqual(adminConfigService.DEFAULT_CONFIG);
        });
    });

    describe('getConfigurationByKey', () => {
        it('should return specific configuration value', async () => {
            const key = 'thresholds.idleCashThreshold';
            const mockConfig = {
                configKey: key,
                configValue: 150000
            };

            mockPrisma.systemConfig.findUnique.mockResolvedValue(mockConfig);

            const result = await adminConfigService.getConfigurationByKey(key);

            expect(result).toBe(150000);
            expect(mockPrisma.systemConfig.findUnique).toHaveBeenCalledWith({
                where: { configKey: key }
            });
        });

        it('should return default value if key not found', async () => {
            const key = 'thresholds.idleCashThreshold';

            mockPrisma.systemConfig.findUnique.mockResolvedValue(null);

            const result = await adminConfigService.getConfigurationByKey(key);

            expect(result).toBe(100000); // Default value
        });

        it('should throw error for invalid key', async () => {
            const key = 'invalid.key';

            mockPrisma.systemConfig.findUnique.mockResolvedValue(null);

            await expect(adminConfigService.getConfigurationByKey(key)).rejects.toThrow(ApiError);
        });
    });
});
