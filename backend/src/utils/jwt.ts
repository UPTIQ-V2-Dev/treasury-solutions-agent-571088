import { TokenType } from '../generated/prisma/index.js';
import { tokenService } from '../services/index.ts';
import moment from 'moment';

/**
 * Generate token for testing purposes
 * @param {number} userId
 * @returns {string}
 */
export const generateToken = (userId: number): string => {
    const expires = moment().add(1, 'hour');
    return tokenService.generateToken(userId, expires, TokenType.ACCESS);
};
