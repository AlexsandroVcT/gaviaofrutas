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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = __importDefault(require("./scripts/auth"));
const User_1 = require("./entities/User");
dotenv_1.default.config({ path: '.env.development.local' });
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, typeorm_1.createConnection)({
    type: 'postgres',
    host: process.env.GAVIAO_FRUTAS_DB_HOST,
    port: parseInt(process.env.GAVIAO_FRUTAS_DB_PORT || '0'),
    username: process.env.GAVIAO_FRUTAS_DB_USER,
    password: process.env.GAVIAO_FRUTAS_DB_PASSWORD,
    database: process.env.GAVIAO_FRUTAS_DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [User_1.User],
    migrations: [],
    subscribers: [],
    ssl: {
        rejectUnauthorized: false,
    },
}).then(connection => {
    const userRepository = connection.getRepository(User_1.User);
    app.use(express_1.default.static(path_1.default.join(__dirname, '../')));
    app.use(express_1.default.json());
    app.use('/auth', auth_1.default);
    app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, email, password } = req.body;
            console.log(`Recebido POST request para registro de usuário: ${username}, ${email}`);
            const existingUser = yield userRepository.findOne({ where: { email } });
            if (existingUser) {
                console.log('Usuário já existe.');
                return res.status(400).json({ message: 'Usuário já existe.' });
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const newUser = userRepository.create({
                username,
                email,
                password: hashedPassword,
            });
            yield userRepository.save(newUser);
            console.log('Usuário registrado com sucesso!');
            res.status(201).json({ message: 'Usuário registrado com sucesso!' });
        }
        catch (error) {
            console.error('Erro ao registrar usuário:', error);
            res.status(500).json({ message: 'Erro ao registrar usuário.' });
        }
    }));
    app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            console.log(`Recebido POST request para login com o email: ${email}`);
            const user = yield userRepository.findOne({ where: { email } });
            if (!user) {
                console.log('Email ou senha incorretos.');
                return res.status(401).json({ message: 'Email ou senha incorretos.' });
            }
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                console.log('Email ou senha incorretos.');
                return res.status(401).json({ message: 'Email ou senha incorretos.' });
            }
            console.log('Login bem-sucedido.');
            res.status(200).json({ message: 'Login bem-sucedido.' });
        }
        catch (error) {
            console.error('Erro ao realizar login:', error);
            res.status(500).json({ message: 'Erro ao realizar login.' });
        }
    }));
    app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userRepository.find();
            res.status(200).json(users);
        }
        catch (error) {
            console.error('Erro ao buscar usuários:', error);
            res.status(500).json({ message: 'Erro ao buscar usuários.' });
        }
    }));
    app.get('/', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../public/login.html'));
    });
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}).catch(error => {
    console.error('Erro ao inicializar a conexão com o banco de dados:', error);
});
