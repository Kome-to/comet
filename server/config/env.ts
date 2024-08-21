import dotenv from 'dotenv';

export enum Environment {
  Production = 'production',
  Development = 'development',
}

// Load environment
dotenv.config({
  path: './.env',
});

const poolConfig = {
  max: 100,
  min: 0,
  idle: 20000,
  acquire: 20000,
  evict: 30000,
  handleDisconnects: true,
};

const database = {
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'comet',
  host: process.env.DB_HOST || 'postgres',
  pool: process.env.enableConnectionPool ? poolConfig : undefined,
  dialect: 'postgres',
  logging: process.env.NODE_ENV === Environment.Development,
  port: parseInt(process.env.DB_PORT),
  timezone: '+00:00',
};

export default {
  appName: process.env.APP_NAME || 'Comet',
  /**
   * Application environment mode either development or production or test
   */
  environment: process.env.NODE_ENV || Environment.Development,

  /**
   * Database connection for each environment
   */
  database,

  /**
   * Client Url
   */
  clientUrl: process.env.CLIENT_URL,
  supportPageUrl: process.env.SUPPORT_PAGE_URL,
  apiUrl: process.env.API_URL,

  assetsPath: process.env.ASSETS_PATH || 'assets/data',

  salt: process.env.SALT || '10',
};
