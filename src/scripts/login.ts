import express from 'express';
import bcrypt from 'bcryptjs';
import { appDataSource } from '../server';
import { User } from '../entities/User';

export const login = express.Router();

login.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log(`Recebido POST request para login com o email: ${email}`);
      const userRepo = appDataSource.getRepository(User);

      const user = await userRepo.findOne({ where: { email } });

      if (!user) {
        console.log('Email ou senha incorretos.');
        return res.status(401).json({ message: 'Email ou senha incorretos.' });
      }

      const isPasswordValid = await bcrypt.compareSync(password, user.password);

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