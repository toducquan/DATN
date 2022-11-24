import { config } from 'dotenv';

config();
export const jwtConstants = {
  secret: `${process.env.JWT_SECRET}` || 'secretKey',
  expiresIn: process.env.JWT_EXPIRE || '5m',
};
