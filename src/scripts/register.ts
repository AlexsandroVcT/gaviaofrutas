import express from 'express';
import { hash } from 'bcryptjs';
import { appDataSource } from '../server';
import { User } from '../entities/User';
import { z } from 'zod';

export const register = express.Router();

const registerSchema = z.object({
  username: z.string().min(3, 'O nome de usuário deve ter pelo menos 3 caracteres.'),
  email: z.string().min(6, 'O e-mail fornecido não é válido.').email('O e-mail fornecido não é válido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  tel: z.string().min(10, 'O telefone fornecido não é válido.').max(11, 'O telefone fornecido não é válido.'),
  bairro: z.string().min(1, 'O Bairro fornecido não é válido.'),
});

register.post('/register', async (req, res, next) => {
  try {
    const { username, email, password, tel, bairro } = await registerSchema.parseAsync(req.body);
    const userRepo = appDataSource.getRepository(User);

    console.log(`Recebido POST request para registro de usuário: ${username}, ${email}`);

    const existingUser = await userRepo.findOne({ where: { email } });

    if (existingUser) {
      console.log('Usuário já existe.');
      return res.status(400).json({ message: 'Usuário já existe.' });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = userRepo.create({
      username,
      email,
      password: hashedPassword,
      telefone: tel,
      bairro,
    });

    await userRepo.save(newUser);

    console.log('Usuário registrado com sucesso!');
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    next(error);
  }
});
