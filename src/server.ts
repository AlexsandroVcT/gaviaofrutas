import cors from 'cors';
import 'reflect-metadata';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { login } from './scripts/login';
import { register } from './scripts/register';

dotenv.config({ path: '.env.development.local' });

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

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
  }
});

const main = async () => {
  await appDataSource.initialize();

  app.use(express.static(path.join(__dirname, '../')));
  app.use(express.json());


  app.use(register);
  app.use(login);

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
  });

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}

main().catch (error => {
  console.error('Erro ao inicializar a conexão com o banco de dados:', error);
});
