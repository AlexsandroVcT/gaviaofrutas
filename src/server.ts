import 'reflect-metadata';
import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import bcrypt from 'bcryptjs';
import authRouter from './scripts/auth';
import { User } from './entities/User';

dotenv.config({ path: '.env.development.local' });

const app = express();
const port = process.env.PORT || 3000;

createConnection({
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
}).then(connection => {
  const userRepository = connection.getRepository(User);

  app.use(express.static(path.join(__dirname, '../')));
  app.use(express.json());
  app.use('/auth', authRouter);

  app.post('/register', async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      console.log(`Recebido POST request para registro de usuário: ${username}, ${email}`);

      const existingUser = await userRepository.findOne({ where: { email } });

      if (existingUser) {
        console.log('Usuário já existe.');
        return res.status(400).json({ message: 'Usuário já existe.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = userRepository.create({
        username,
        email,
        password: hashedPassword,
      });

      await userRepository.save(newUser);

      console.log('Usuário registrado com sucesso!');
      res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
  });

  app.post('/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      console.log(`Recebido POST request para login com o email: ${email}`);

      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        console.log('Email ou senha incorretos.');
        return res.status(401).json({ message: 'Email ou senha incorretos.' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        console.log('Email ou senha incorretos.');
        return res.status(401).json({ message: 'Email ou senha incorretos.' });
      }

      console.log('Login bem-sucedido.');
      res.status(200).json({ message: 'Login bem-sucedido.' });
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      res.status(500).json({ message: 'Erro ao realizar login.' });
    }
  });

  app.get('/users', async (req: Request, res: Response) => {
    try {
      const users = await userRepository.find();
      res.status(200).json(users);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
  });

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Erro ao inicializar a conexão com o banco de dados:', error);
});