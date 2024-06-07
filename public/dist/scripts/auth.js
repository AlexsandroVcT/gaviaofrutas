"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const router = express_1.default.Router();
// Rota para registro de usuário
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    console.log(`Registrando usuário: ${username}, ${email}`);
    // Verificar se o e-mail já está em uso
    const userRepository = (0, typeorm_1.getRepository)(User_1.User);
    const existingUser = yield userRepository.findOne({ where: { email } });
    if (existingUser) {
        console.log('E-mail já está em uso.');
        return res.status(400).json({ message: 'E-mail já está em uso.' });
    }
    // Hash da senha
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    // Criar um novo usuário
    const newUser = userRepository.create({
        username,
        email,
        password: hashedPassword,
    });
    yield userRepository.save(newUser);
    console.log(`Usuário registrado com sucesso: ${JSON.stringify(newUser)}`);
    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
}));
// Rota para login de usuário
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(`Tentativa de login: ${email}`);
    // Verificar se o usuário existe
    const userRepository = (0, typeorm_1.getRepository)(User_1.User);
    const user = yield userRepository.findOne({ where: { email } });
    if (!user) {
        console.log('E-mail ou senha incorretos.');
        return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
    }
    // Verificar a senha
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        console.log('E-mail ou senha incorretos.');
        return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
    }
    console.log('Login bem-sucedido.');
    res.status(200).json({ message: 'Login bem-sucedido.' });
}));
exports.default = router;
