import cors from 'cors';
import 'reflect-metadata';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
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
  try {
    await appDataSource.initialize();
    console.log('Conexão com o banco de dados inicializada com sucesso.');

    // Middleware para servir arquivos estáticos
    app.use(express.static(path.join(__dirname, '../pages')));
    app.use(express.json());

    // Middleware para servir arquivos estáticos da pasta pages
    app.use('/pages', express.static(path.join(__dirname, '../pages')));

    // Registro de rotas
    app.use(register);
    app.use(login);

    // Rota raiz
    app.get('/', (req, res) => {
      const loginFilePath = path.join(__dirname, '../pages/login.html');
      console.log('Caminho do arquivo login.html:', loginFilePath);
      res.sendFile(loginFilePath, (err) => {
        if (err) {
          console.error('Erro ao enviar login.html:', err);
          res.status(res.statusCode).end();
        }
      });
    });

    // Middleware de tratamento de erros
    app.use(errorHandler);

    // Inicialização do servidor
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Erro ao inicializar a conexão com o banco de dados:', error);
  }
};

main().catch((error) => {
  console.error('Erro ao inicializar a aplicação:', error);
});
