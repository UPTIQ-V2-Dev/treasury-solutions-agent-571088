import { adminConfigService } from '../services/index.ts';
import { adminConfigTools } from '../tools/admin-config.tool.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the admin config service
vi.mock('../services/index.ts', async () => {
    const actual = await vi.importActual('../services/index.ts');
    return {
        ...actual,
        adminConfigService: {
            getConfiguration: vi.fn(),
            updateConfiguration: vi.fn(),
            resetConfiguration: vi.fn(),
            getConfigurationByKey: vi.fn(),
            DEFAULT_CONFIG: {
                thresholds: { idleCashThreshold: 100000 },
                features: { enableAutoAnalysis: true },
                integrations: { bankApiEnabled: false },
                security: { sessionTimeout: 60 }
            }
        }
    };
});

const mockAdminConfigService = adminConfigService as any;

describe('Admin Config Tools', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getConfigurationTool', () => {
        it('should get system configuration', async () => {
            const mockConfig = {
                thresholds: { idleCashThreshold: 100000 },
                features: { enableAutoAnalysis: true },
                integrations: { bankApiEnabled: false },
                security: { sessionTimeout: 60 }
            };

            mockAdminConfigService.getConfiguration.mockResolvedValue(mockConfig);

            const tool = adminConfigTools.find(t => t.id === 'admin_config_get');
            expect(tool).toBeDefined();

            const result = await tool!.fn({});
            expect(result).toEqual(mockConfig);
            expect(mockAdminConfigService.getConfiguration).toHaveBeenCalledOnce();
        });

        it('should validate empty input', () => {
            const tool = adminConfigTools.find(t => t.id === 'admin_config_get');
            const { error } = tool!.inputSchema.safeParse({});
            expect(error).toBeUndefined();
        });
    });

    describe('updateConfigurationTool', () => {
        it('should update system configuration', async () => {
            const updateData = {
                thresholds: { idleCashThreshold: 150000 },
                updatedBy: 'admin@example.com'
            };
            const updatedConfig = {
                thresholds: { idleCashThreshold: 150000 },
                features: { enableAutoAnalysis: true },
                integrations: { bankApiEnabled: false },
                security: { sessionTimeout: 60 }
            };

            mockAdminConfigService.updateConfiguration.mockResolvedValue(updatedConfig);

            const tool = adminConfigTools.find(t => t.id === 'admin_config_update');
            expect(tool).toBeDefined();

            const result = await tool!.fn(updateData);
            expect(result).toEqual(updatedConfig);
            expect(mockAdminConfigService.updateConfiguration).toHaveBeenCalledWith(
                { thresholds: { idleCashThreshold: 150000 } },
                'admin@example.com'
            );
        });

        it('should validate input schema', () => {
            const tool = adminConfigTools.find(t => t.id === 'admin_config_update');

            const validInput = {
                thresholds: { idleCashThreshold: 150000 },
                updatedBy: 'admin@example.com'
            };
            const { error: validError } = tool!.inputSchema.safeParse(validInput);
            expect(validError).toBeUndefined();

            const invalidInput = {
                thresholds: { idleCashThreshold: -100 } // Invalid negative value
            };
            const { error: invalidError } = tool!.inputSchema.safeParse(invalidInput);
            expect(invalidError).toBeDefined();
        });
    });

    describe('resetConfigurationTool', () => {
        it('should reset configuration to defaults', async () => {
            const input = { updatedBy: 'admin@example.com' };
            const defaultConfig = {
                thresholds: { idleCashThreshold: 100000 },
                features: { enableAutoAnalysis: true },
                integrations: { bankApiEnabled: false },
                security: { sessionTimeout: 60 }
            };

            mockAdminConfigService.resetConfiguration.mockResolvedValue(defaultConfig);

            const tool = adminConfigTools.find(t => t.id === 'admin_config_reset');
            expect(tool).toBeDefined();

            const result = await tool!.fn(input);
            expect(result).toEqual(defaultConfig);
            expect(mockAdminConfigService.resetConfiguration).toHaveBeenCalledWith('admin@example.com');
        });

        it('should validate required updatedBy field', () => {
            const tool = adminConfigTools.find(t => t.id === 'admin_config_reset');

            const validInput = { updatedBy: 'admin@example.com' };
            const { error: validError } = tool!.inputSchema.safeParse(validInput);
            expect(validError).toBeUndefined();

            const invalidInput = {};
            const { error: invalidError } = tool!.inputSchema.safeParse(invalidInput);
            expect(invalidError).toBeDefined();
        });
    });

    describe('getConfigurationByKeyTool', () => {
        it('should get configuration by key', async () => {
            const input = { key: 'thresholds.idleCashThreshold' };
            const expectedValue = 150000;

            mockAdminConfigService.getConfigurationByKey.mockResolvedValue(expectedValue);

            const tool = adminConfigTools.find(t => t.id === 'admin_config_get_by_key');
            expect(tool).toBeDefined();

            const result = await tool!.fn(input);
            expect(result).toBe(expectedValue);
            expect(mockAdminConfigService.getConfigurationByKey).toHaveBeenCalledWith('thresholds.idleCashThreshold');
        });

        it('should validate key parameter', () => {
            const tool = adminConfigTools.find(t => t.id === 'admin_config_get_by_key');

            const validInput = { key: 'thresholds.idleCashThreshold' };
            const { error: validError } = tool!.inputSchema.safeParse(validInput);
            expect(validError).toBeUndefined();

            const invalidInput = {};
            const { error: invalidError } = tool!.inputSchema.safeParse(invalidInput);
            expect(invalidError).toBeDefined();
        });
    });

    describe('getDefaultConfigurationTool', () => {
        it('should get default configuration', async () => {
            const tool = adminConfigTools.find(t => t.id === 'admin_config_get_defaults');
            expect(tool).toBeDefined();

            const result = await tool!.fn({});
            expect(result).toEqual(mockAdminConfigService.DEFAULT_CONFIG);
        });
    });

    it('should export all admin config tools', () => {
        expect(adminConfigTools).toHaveLength(5);

        const expectedToolIds = [
            'admin_config_get',
            'admin_config_update',
            'admin_config_reset',
            'admin_config_get_by_key',
            'admin_config_get_defaults'
        ];

        const actualToolIds = adminConfigTools.map(tool => tool.id);
        expect(actualToolIds).toEqual(expect.arrayContaining(expectedToolIds));
    });
});
