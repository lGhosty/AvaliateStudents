import { MoradiaService } from '../../services/moradia.service';
import { prisma } from '../../lib/prisma';

// 1. MOCK: Fingimos que o Prisma existe
jest.mock('../../lib/prisma', () => ({
  prisma: {
    moradia: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    },
  },
}));

describe('MoradiaService - Testes de Unidade', () => {
  let moradiaService: MoradiaService;

  beforeEach(() => {
    moradiaService = new MoradiaService();
    jest.clearAllMocks();
  });

  // CASO DE USO 3: Criar Moradia com Sucesso
  it('Deve criar uma moradia com sucesso', async () => {
    // Configuração: O banco devolve a moradia criada
    (prisma.moradia.create as jest.Mock).mockResolvedValue({
      id: 10,
      nome: 'Republica Teste',
      endereco: 'Rua 123',
      descricao: 'Legal',
      preco: 500,
      criadorId: 1
    });

    const result = await moradiaService.create({
      nome: 'Republica Teste',
      endereco: 'Rua 123',
      descricao: 'Legal',
      preco: 500
    }, 1); // ID do usuário 1

    expect(result).toHaveProperty('id', 10);
    expect(result.nome).toBe('Republica Teste');
  });

  // CASO DE USO 4: Erro ao Criar (Faltam dados)
  it('Não deve criar moradia se faltar campos obrigatórios', async () => {
    // Tenta criar sem nome e sem preço
    await expect(
      moradiaService.create({
        endereco: 'Rua sem nome',
        descricao: 'Teste'
      }, 1)
    ).rejects.toThrow('Campos obrigatórios em falta.');
  });

  // CASO DE USO 5: Listar Moradias
  it('Deve listar todas as moradias', async () => {
    // Configuração: O banco devolve uma lista (array)
    (prisma.moradia.findMany as jest.Mock).mockResolvedValue([
      { id: 1, nome: 'Casa A', preco: 400 },
      { id: 2, nome: 'Casa B', preco: 600 }
    ]);

    const result = await moradiaService.list();

    expect(result).toHaveLength(2); // Espera 2 itens
    expect(result[0].nome).toBe('Casa A');
  });

  // CASO DE USO 6: Segurança na Exclusão (Tentar apagar casa dos outros)
  it('Não deve permitir excluir uma moradia se não for o dono', async () => {
    // 1. Configuração: O banco diz que a casa existe e o dono é o ID 99
    (prisma.moradia.findUnique as jest.Mock).mockResolvedValue({
      id: 5,
      nome: 'Casa do João',
      criadorId: 99 // Dono é o 99
    });

    // 2. Ação: O usuário ID 1 (Intruso) tenta apagar a casa 5
    await expect(
      moradiaService.delete(5, 1) // Passamos ID da casa e ID do usuário intruso
    ).rejects.toThrow('Não tem permissão para excluir esta moradia.');
  });

});