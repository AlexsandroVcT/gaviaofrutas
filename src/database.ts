import { DataSource } from "typeorm";
import { User } from "./entities/User";

export const appDataSource = new DataSource({
    type: 'postgres',
    host: process.env.GAVIAO_FRUTAS_DB_HOST,
    port: parseInt(process.env.GAVIAO_FRUTAS_DB_PORT || '0'),
    username: process.env.GAVIAO_FRUTAS_DB_USER,
    password: process.env.GAVIAO_FRUTAS_DB_PASSWORD,
    database: process.env.GAVIAO_FRUTAS_DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
    ssl: {
      rejectUnauthorized: false,
    },
  });
  