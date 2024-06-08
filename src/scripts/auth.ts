import express from 'express';
import bcrypt from 'bcryptjs';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

const router = express.Router();

// Rota para registro de usuário
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    console.log(`Registrando usuário: ${username}, ${email}`);

    // Verificar se o email tem pelo menos 6 caracteres
    if (email.length < 6) {
        console.log('O e-mail fornecido não é válido.');
        return res.status(400).json({ message: 'O e-mail fornecido não é válido.' });
    }

    // Verificar se o e-mail já está em uso
    const userRepository = getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
        console.log('E-mail já está em uso.');
        return res.status(400).json({ message: 'E-mail já está em uso.' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar um novo usuário
    const newUser = userRepository.create({
        username,
        email,
        password: hashedPassword,
    });

    await userRepository.save(newUser);

    console.log(`Usuário registrado com sucesso: ${JSON.stringify(newUser)}`);
    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
});


// Rota para login de usuário
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log(`Tentativa de login: ${email}`);

    // Verificar se o usuário existe
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
        console.log('E-mail ou senha incorretos.');
        return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
    }

    // Verificar a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log('E-mail ou senha incorretos.');
        return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
    }

    console.log('Login bem-sucedido.');
    res.status(200).json({ message: 'Login bem-sucedido.' });
});

export default router;