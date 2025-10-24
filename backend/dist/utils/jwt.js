import { TokenType } from '../generated/prisma/index.js';
import { tokenService } from "../services/index.js";
import moment from 'moment';
/**
 * Generate token for testing purposes
 * @param {number} userId
 * @returns {string}
 */
export const generateToken = (userId) => {
    const expires = moment().add(1, 'hour');
    return tokenService.generateToken(userId, expires, TokenType.ACCESS);
};
