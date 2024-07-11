import express from 'express';
import bcrypt from 'bcryptjs';
import { validatePhoneNumber } from '../utils';
import { appDataSource } from '../server';
import { User } from '../entities/User';
import { validate } from 'email-validator';

export const register = express.Router();

register.post('/register', async (req, res) => {
    try {
      const { username, email, password, tel, bairro } = req.body;
      const userRepo = appDataSource.getRepository(User);

      console.log(`Recebido POST request para registro de usuário: ${username}, ${email}`);
  
      // Validar o nome de usuário
      if (!username || typeof username !== 'string' || username.trim().length < 3) {
        console.log('O nome de usuário fornecido não é válido.');
        return res.status(400).json({ message: 'O nome de usuário deve ter pelo menos 3 caracteres.' });
      }
  
      // Validar o e-mail
      if (!email || typeof email !== 'string' || email.trim().length < 6 || !validate(email)) {
        console.log('O e-mail fornecido não é válido.');
        return res.status(400).json({ message: 'O e-mail fornecido não é válido.' });
      }
  
      // Validar a senha
      if (!password || typeof password !== 'string' || password.trim().length < 6) {
        console.log('A senha fornecida não é válida.');
        return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
      }
  
      // Validar o telefone
      if (!validatePhoneNumber(tel)) {
        console.log('O telefone fornecido não é válido.');
        return res.status(400).json({ message: 'O telefone fornecido não é válido.' });
      }
  
      const existingUser = await userRepo.findOne({ where: { email } });
  
      if (existingUser) {
        console.log('Usuário já existe.');
        return res.status(400).json({ message: 'Usuário já existe.' });
      }
  
      const hashedPassword = await bcrypt.hashSync(password, 10);
  
      const newUser = userRepo.create({
        username,
        email,
        password: hashedPassword,
        telefone: tel,
        bairro
      });
  
      await userRepo.save(newUser);
  
      console.log('Usuário registrado com sucesso!');
      res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
  });
  