import { prisma } from '../lib/prisma';
import { Moradia } from '@prisma/client';

export class MoradiaService {

  // 1. LISTAR COM FILTROS (Preço máximo)
  async list(precoMax?: number): Promise<Moradia[]> {
    const moradias = await prisma.moradia.findMany({
      where: {
        // Se precoMax for enviado, filtra. Se não, traz tudo.
        preco: precoMax ? { lte: precoMax } : undefined
      },
      include: {
        avaliacoes: { select: { nota: true } },
        criador: { select: { id: true, nome: true } }
      }
    });
    return moradias;
  }

  async create(data: any, criadorId: number): Promise<Moradia> {
    const { nome, endereco, descricao, preco, latitude, longitude, imageUrl } = data;

    if (!nome || !endereco || !descricao || !preco) {
      throw new Error('Campos obrigatórios em falta.');
    }

    const moradia = await prisma.moradia.create({
      data: {
        nome, endereco, descricao, preco,
        latitude: latitude || 0.0,
        longitude: longitude || 0.0,
        imageUrl: imageUrl || null,
        criadorId,
      },
    });
    return moradia;
  }

  async getById(id: number): Promise<Moradia | null> {
    const moradia = await prisma.moradia.findUnique({
      where: { id },
      include: {
        criador: { select: { id: true, nome: true } }, // Incluímos o ID para saber se somos o dono
        avaliacoes: {
          include: { autor: { select: { nome: true } } },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    return moradia;
  }

  // 2. DELETAR MORADIA (Apenas o dono pode)
  async delete(id: number, usuarioId: number): Promise<void> {
    // Primeiro, verifica se a moradia existe
    const moradia = await prisma.moradia.findUnique({ where: { id } });
    
    if (!moradia) {
      throw new Error('Moradia não encontrada.');
    }

    // Verifica se o utilizador que quer apagar é o dono
    if (moradia.criadorId !== usuarioId) {
      throw new Error('Não tem permissão para excluir esta moradia.');
    }

    await prisma.moradia.delete({ where: { id } });
  }

  // 3. EDITAR MORADIA (Apenas o dono pode)
  async update(id: number, data: any, usuarioId: number): Promise<Moradia> {
    const moradia = await prisma.moradia.findUnique({ where: { id } });
    
    if (!moradia) throw new Error('Moradia não encontrada.');
    if (moradia.criadorId !== usuarioId) throw new Error('Não tem permissão.');

    const updated = await prisma.moradia.update({
      where: { id },
      data: {
        nome: data.nome,
        endereco: data.endereco,
        descricao: data.descricao,
        preco: data.preco,
        // Adicione outros campos se necessário
      }
    });
    return updated;
  }
}
