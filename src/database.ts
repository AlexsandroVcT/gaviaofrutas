import './config/env';
import { DataSource } from 'typeorm';
import { Announcement } from './entities/Announcement';
import { Category } from './entities/Category';
import { HomeSpotlight } from './entities/HomeSpotlight';
import { Inventory } from './entities/Inventory';
import { Offer } from './entities/Offer';
import { Product } from './entities/Product';
import { StoreProfile } from './entities/StoreProfile';
import { User } from './entities/User';
import { CreatePublicCatalogSchema1760000000000 } from './migrations/1760000000000-CreatePublicCatalogSchema';
import { SyncExpandedPublicCatalog1761000000000 } from './migrations/1761000000000-SyncExpandedPublicCatalog';

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
  synchronize: false,
  logging: true,
  entities: [User, StoreProfile, Category, Product, Inventory, Offer, Announcement, HomeSpotlight],
  migrations: [CreatePublicCatalogSchema1760000000000, SyncExpandedPublicCatalog1761000000000],
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
