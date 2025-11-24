import request from 'supertest';
import { app } from '../../server'; // Importamos o servidor configurado
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcryptjs';

// --- MOCKS ---
// Novamente, interceptamos o banco para não criar lixo no PostgreSQL real
jest.mock('../../lib/prisma', () => ({
  prisma: {
    usuario: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

// Mockamos o Bcrypt para facilitar os testes de senha
jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hash_senha'),
  compare: jest.fn().mockResolvedValue(true), // Sempre diz que a senha está certa
}));

describe('Auth Routes - Testes de Integração', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // TESTE 1: Rota de Registro (Sucesso)
  it('POST /api/auth/register - Deve criar um usuário e retornar 201', async () => {
    // Configura o Mock: Email livre
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue(null);
    // Configura o Mock: Criação retorna usuário
    (prisma.usuario.create as jest.Mock).mockResolvedValue({
      id: 1,
      nome: 'Integration',
      email: 'int@teste.com',
      senha: 'hash_senha',
      role: 'ESTUDANTE'
    });

    // AÇÃO: O Supertest faz a requisição HTTP
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        nome: 'Integration',
        email: 'int@teste.com',
        senha: '123'
      });

    // VERIFICAÇÃO
    expect(response.status).toBe(201); // Created
    expect(response.body).toHaveProperty('user');
    expect(response.body.user.email).toBe('int@teste.com');
  });

  // TESTE 2: Rota de Registro (Falha - Dados Incompletos)
  it('POST /api/auth/register - Deve retornar erro 400 se faltar senha', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        nome: 'Sem Senha',
        email: 'falha@teste.com'
        // Faltou o campo senha
      });

    expect(response.status).toBe(400); // Bad Request
    expect(response.body).toHaveProperty('message');
  });

  // TESTE 3: Rota de Login (Sucesso)
  it('POST /api/auth/login - Deve autenticar e retornar Token JWT', async () => {
    // Configura o Mock: Usuário existe no banco
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      nome: 'Login User',
      email: 'login@teste.com',
      senha: 'hash_senha',
      role: 'ESTUDANTE'
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@teste.com',
        senha: '123'
      });

    // VERIFICAÇÃO
    expect(response.status).toBe(200); // OK
    expect(response.body).toHaveProperty('token'); // Tem que ter o JWT
    expect(response.body).toHaveProperty('user');
  });

});