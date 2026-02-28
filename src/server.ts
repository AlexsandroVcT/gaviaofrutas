import cors from 'cors';
import 'reflect-metadata';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { login } from './scripts/login';
import { register } from './scripts/register';
import { homeApi } from './scripts/home-api';
import { errorHandler } from './middlewares/error-handler'; // Certifique-se de que o caminho está correto
import { appDataSource } from './database';

dotenv.config({ path: '.env.development.local' });

const app = express();
const port = process.env.PORT || 3000;
const rootDir = path.resolve(__dirname, '..');
const pagesDir = path.join(rootDir, 'pages');
const assetsDir = path.join(rootDir, 'assets');
const iconPath = path.join(assetsDir, 'imgs', 'icongaviaofrutas.webp');
let dataSourceInitPromise: Promise<void> | null = null;

// Configuração do CORS
const corsOptions = {
  origin: '*', // Ajuste conforme necessário para maior segurança
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

const ensureDataSource = async () => {
  if (appDataSource.isInitialized) return;

  if (!dataSourceInitPromise) {
    dataSourceInitPromise = appDataSource
      .initialize()
      .then(() => {
        console.log('Conexão com o banco de dados inicializada com sucesso.');
      })
      .catch((error) => {
        dataSourceInitPromise = null;
        throw error;
      });
  }

  await dataSourceInitPromise;
};

// Middleware para servir arquivos estáticos do projeto (index, assets, manifest, css/js)
app.use(express.static(rootDir));

// Middleware para servir arquivos estáticos da pasta pages e assets
app.use('/pages', express.static(pagesDir));
app.use('/assets', express.static(assetsDir));

// Compatibilidade para evitar 404 de favicon em navegadores/crawlers
app.get(['/favicon.ico', '/favicon.png'], (_req, res) => {
  res.sendFile(iconPath);
});

// Rota raiz: redireciona para manter paths relativos de login.html funcionando
app.get('/', (_req, res) => {
  res.redirect('/pages/login.html');
});

// API publica de home/produtos para o novo front-end em Nuxt
app.use(homeApi);

// Garante conexão com o banco antes das rotas de API
app.use(async (_req, _res, next) => {
  try {
    await ensureDataSource();
    next();
  } catch (error) {
    next(error);
  }
});

// Registro de rotas
app.use(register);
app.use(login);

// Middleware de tratamento de erros
app.use(errorHandler);

export default app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}
