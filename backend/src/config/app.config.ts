import { registerAs } from '@nestjs/config';
import * as process from 'process';

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  port: process.env.SERVER_PORT || 3000,
}));
