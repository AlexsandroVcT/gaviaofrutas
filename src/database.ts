import './config/env';
import { DataSource } from 'typeorm';
import { User } from './entities/User';

const databaseUrl =
  process.env.GAVIAO_FRUTAS_DB_URL ||
  process.env.DATABASE_URL ||
  process.env.GAVIAO_FRUTAS_DB_PRISMA_URL;

const parsedPort = Number.parseInt(process.env.GAVIAO_FRUTAS_DB_PORT || '5432', 10);
const port = Number.isFinite(parsedPort) ? parsedPort : 5432;
const shouldUseSsl =
  process.env.GAVIAO_FRUTAS_DB_SSL === 'true' ||
  Boolean(databaseUrl && /sslmode=require/i.test(databaseUrl));

const baseOptions = {
  type: 'postgres' as const,
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: [],
};

export const appDataSource = new DataSource(
  databaseUrl
    ? {
        ...baseOptions,
        url: databaseUrl,
        ...(shouldUseSsl ? { ssl: { rejectUnauthorized: false } } : {}),
      }
    : {
        ...baseOptions,
        host: process.env.GAVIAO_FRUTAS_DB_HOST,
        port,
        username: process.env.GAVIAO_FRUTAS_DB_USER,
        password: process.env.GAVIAO_FRUTAS_DB_PASSWORD,
        database: process.env.GAVIAO_FRUTAS_DB_DATABASE,
        ...(shouldUseSsl ? { ssl: { rejectUnauthorized: false } } : {}),
      },
);
