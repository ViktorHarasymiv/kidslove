import { randomBytes } from 'node:crypto';
import { ONE_DAY, TWO_HOUR } from '../constants/index.js';

export const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const now = Date.now();

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: now + TWO_HOUR,
    refreshTokenValidUntil: now + ONE_DAY,
  };
};
