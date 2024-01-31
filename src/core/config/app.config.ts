import { registerAs } from '@nestjs/config';
import 'dotenv/config';

export interface IConfig {
  database: { database_uri: string };
  general: { port: Number };
}

const config = {
  database: {
    database_uri: process.env.DATABASE_URI,
  },
  general: {
    port: process.env.PORT || 5000,
  },
};

export const appConfig = registerAs('app', () => config);
