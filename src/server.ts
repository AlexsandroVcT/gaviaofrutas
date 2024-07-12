import cors from 'cors';
import 'reflect-metadata';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { login } from './scripts/login';
import { register } from './scripts/register';
import { errorHandler } from './middlewares/error-handler'; // Certifique-se de que o caminho está correto
import { appDataSource } from './database';

dotenv.config({ path: '.env.development.local' });

const app = express();
const port = process.env.PORT || 3000;

// Configuração do CORS
const corsOptions = {
  origin: '*', // Ajuste conforme necessário para maior segurança
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

// Inicialização do DataSource do TypeORM
const main = async () => {
  await appDataSource.initialize();

  // Middleware para servir arquivos estáticos
  app.use(express.static(path.join(__dirname, '../')));
  app.use(express.json());

  // Registro de rotas
  app.use(register);
  app.use(login);

  // Rota raiz
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
  });

  // Middleware de tratamento de erros
  app.use(errorHandler);

  // Inicialização do servidor
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
};

main().catch((error) => {
  console.error('Erro ao inicializar a conexão com o banco de dados:', error);
});
