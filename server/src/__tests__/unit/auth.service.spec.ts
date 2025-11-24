import { AuthService } from '../../services/auth.service';
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcryptjs';

// MOCKS
jest.mock('../../lib/prisma', () => ({
  prisma: {
    usuario: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('AuthService - Testes de Unidade', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  // TESTE 1: Sucesso
  it('Deve ser capaz de registrar um novo usuário', async () => {
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.usuario.create as jest.Mock).mockResolvedValue({
      id: 1,
      nome: 'Teste Unitario',
      email: 'teste@unitario.com',
      senha: 'hash',
      role: 'ESTUDANTE'
    });
    (bcrypt.hash as jest.Mock).mockResolvedValue('hash');

    const result = await authService.register({
      nome: 'Teste Unitario',
      email: 'teste@unitario.com',
      senha: '123'
    });

    expect(result).toHaveProperty('id');
    expect(result.email).toBe('teste@unitario.com');
  });

  // TESTE 2: Erro (Email duplicado)
  it('Não deve registrar usuário com email duplicado', async () => {
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue({ 
        id: 1, 
        email: 'duplicado@email.com' 
    });

    await expect(
      authService.register({
        nome: 'Teste',
        email: 'duplicado@email.com',
        senha: '123'
      })
    ).rejects.toThrow('Este e-mail já está em uso.');
  });
});