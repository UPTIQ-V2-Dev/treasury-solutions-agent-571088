import prisma from "../client.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from 'http-status';
/**
 * Default configuration values
 */
const DEFAULT_CONFIG = {
    thresholds: {
        idleCashThreshold: 100000,
        liquidityWarningThreshold: 50000,
        lowBalanceThreshold: 10000,
        highRiskThreshold: 500000
    },
    features: {
        enableAutoAnalysis: true,
        enableEmailNotifications: true,
        enableRecommendationEngine: true,
        enableAdvancedReports: false
    },
    integrations: {
        bankApiEnabled: false,
        webhooksEnabled: false,
        apiRateLimit: 1000,
        maxFileSize: 25
    },
    security: {
        sessionTimeout: 60,
        passwordExpiry: 90,
        requireMfa: false,
        auditLogRetention: 365
    }
};
/**
 * Get system configuration
 * @returns {Promise<Object>} Configuration object
 */
const getConfiguration = async () => {
    const configEntries = await prisma.systemConfig.findMany();
    if (configEntries.length === 0) {
        // Initialize with default values if no configuration exists
        await initializeDefaultConfiguration('system');
        return DEFAULT_CONFIG;
    }
    // Build configuration object from database entries
    const config = {
        thresholds: {},
        features: {},
        integrations: {},
        security: {}
    };
    for (const entry of configEntries) {
        const [category, key] = entry.configKey.split('.');
        if (config[category]) {
            config[category][key] = entry.configValue;
        }
    }
    // Fill in missing values with defaults
    Object.keys(DEFAULT_CONFIG).forEach(category => {
        Object.keys(DEFAULT_CONFIG[category]).forEach(key => {
            if (config[category][key] === undefined) {
                config[category][key] = DEFAULT_CONFIG[category][key];
            }
        });
    });
    return config;
};
/**
 * Update system configuration
 * @param {Object} updateData - Configuration updates
 * @param {string} updatedBy - User ID who is updating the configuration
 * @returns {Promise<Object>} Updated configuration
 */
const updateConfiguration = async (updateData, updatedBy) => {
    // Validate configuration values
    validateConfiguration(updateData);
    // Update configuration entries in the database
    const updatePromises = [];
    Object.keys(updateData).forEach(category => {
        const categoryData = updateData[category];
        if (categoryData && typeof categoryData === 'object') {
            Object.keys(categoryData).forEach(key => {
                const configKey = `${category}.${key}`;
                const configValue = categoryData[key];
                updatePromises.push(prisma.systemConfig.upsert({
                    where: { configKey },
                    update: {
                        configValue,
                        updatedBy
                    },
                    create: {
                        configKey,
                        configValue,
                        updatedBy
                    }
                }));
            });
        }
    });
    await Promise.all(updatePromises);
    // Return the updated configuration
    return await getConfiguration();
};
/**
 * Reset configuration to default values
 * @param {string} updatedBy - User ID who is resetting the configuration
 * @returns {Promise<Object>} Default configuration
 */
const resetConfiguration = async (updatedBy) => {
    // Delete all existing configuration
    await prisma.systemConfig.deleteMany({});
    // Initialize with default configuration
    await initializeDefaultConfiguration(updatedBy);
    return DEFAULT_CONFIG;
};
/**
 * Initialize default configuration in database
 * @param {string} updatedBy - User ID who is initializing the configuration
 */
const initializeDefaultConfiguration = async (updatedBy) => {
    const configEntries = [];
    Object.keys(DEFAULT_CONFIG).forEach(category => {
        Object.keys(DEFAULT_CONFIG[category]).forEach(key => {
            const configKey = `${category}.${key}`;
            const configValue = DEFAULT_CONFIG[category][key];
            configEntries.push({
                configKey,
                configValue,
                updatedBy
            });
        });
    });
    await prisma.systemConfig.createMany({
        data: configEntries
    });
};
/**
 * Validate configuration values
 * @param {Object} config - Configuration object to validate
 */
const validateConfiguration = (config) => {
    if (config.thresholds) {
        const { thresholds } = config;
        if (thresholds.idleCashThreshold !== undefined &&
            (typeof thresholds.idleCashThreshold !== 'number' || thresholds.idleCashThreshold < 0)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'idleCashThreshold must be a non-negative number');
        }
        if (thresholds.liquidityWarningThreshold !== undefined &&
            (typeof thresholds.liquidityWarningThreshold !== 'number' || thresholds.liquidityWarningThreshold < 0)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'liquidityWarningThreshold must be a non-negative number');
        }
        if (thresholds.lowBalanceThreshold !== undefined &&
            (typeof thresholds.lowBalanceThreshold !== 'number' || thresholds.lowBalanceThreshold < 0)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'lowBalanceThreshold must be a non-negative number');
        }
        if (thresholds.highRiskThreshold !== undefined &&
            (typeof thresholds.highRiskThreshold !== 'number' || thresholds.highRiskThreshold < 0)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'highRiskThreshold must be a non-negative number');
        }
    }
    if (config.features) {
        const { features } = config;
        const booleanFeatures = [
            'enableAutoAnalysis',
            'enableEmailNotifications',
            'enableRecommendationEngine',
            'enableAdvancedReports'
        ];
        booleanFeatures.forEach(feature => {
            if (features[feature] !== undefined && typeof features[feature] !== 'boolean') {
                throw new ApiError(httpStatus.BAD_REQUEST, `${feature} must be a boolean`);
            }
        });
    }
    if (config.integrations) {
        const { integrations } = config;
        if (integrations.apiRateLimit !== undefined &&
            (typeof integrations.apiRateLimit !== 'number' || integrations.apiRateLimit < 1)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'apiRateLimit must be a positive number');
        }
        if (integrations.maxFileSize !== undefined &&
            (typeof integrations.maxFileSize !== 'number' || integrations.maxFileSize < 1)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'maxFileSize must be a positive number');
        }
        const booleanIntegrations = ['bankApiEnabled', 'webhooksEnabled'];
        booleanIntegrations.forEach(integration => {
            if (integrations[integration] !== undefined && typeof integrations[integration] !== 'boolean') {
                throw new ApiError(httpStatus.BAD_REQUEST, `${integration} must be a boolean`);
            }
        });
    }
    if (config.security) {
        const { security } = config;
        if (security.sessionTimeout !== undefined &&
            (typeof security.sessionTimeout !== 'number' || security.sessionTimeout < 1)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'sessionTimeout must be a positive number');
        }
        if (security.passwordExpiry !== undefined &&
            (typeof security.passwordExpiry !== 'number' || security.passwordExpiry < 1)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'passwordExpiry must be a positive number');
        }
        if (security.auditLogRetention !== undefined &&
            (typeof security.auditLogRetention !== 'number' || security.auditLogRetention < 1)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'auditLogRetention must be a positive number');
        }
        if (security.requireMfa !== undefined && typeof security.requireMfa !== 'boolean') {
            throw new ApiError(httpStatus.BAD_REQUEST, 'requireMfa must be a boolean');
        }
    }
};
/**
 * Get configuration by key
 * @param {string} key - Configuration key (e.g., 'thresholds.idleCashThreshold')
 * @returns {Promise<any>} Configuration value
 */
const getConfigurationByKey = async (key) => {
    const config = await prisma.systemConfig.findUnique({
        where: { configKey: key }
    });
    if (!config) {
        // Return default value if not found
        const [category, subKey] = key.split('.');
        if (DEFAULT_CONFIG[category] && DEFAULT_CONFIG[category][subKey] !== undefined) {
            return DEFAULT_CONFIG[category][subKey];
        }
        throw new ApiError(httpStatus.NOT_FOUND, 'Configuration key not found');
    }
    return config.configValue;
};
export default {
    getConfiguration,
    updateConfiguration,
    resetConfiguration,
    getConfigurationByKey,
    DEFAULT_CONFIG
};
