import express from 'express';
import { compare } from 'bcryptjs';
import { appDataSource } from '../server';
import { User } from '../entities/User';
import { z } from 'zod';
import { UnauthorizedError } from '../errors/unauthorized-error';

export const login = express.Router();

const loginSchema = z.object({
  email: z.string().min(6, 'O e-mail fornecido não é válido.').email('O e-mail fornecido não é válido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

login.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    console.log(`Recebido POST request para login com o email: ${email}`);
    const userRepo = appDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
      console.log('Email ou senha incorretos.');

      throw new UnauthorizedError('Email ou senha incorretos.')
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Email ou senha incorretos.');
      throw new UnauthorizedError('Email ou senha incorretos.')

    }

    console.log('Login bem-sucedido.');
    res.status(200).json({ message: 'Login bem-sucedido.' });
  } catch (error) {
    next(error);
  }
});
