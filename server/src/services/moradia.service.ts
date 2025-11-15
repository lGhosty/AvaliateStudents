import { prisma } from '../lib/prisma';
import { Moradia } from '@prisma/client';

export class MoradiaService {
  async list(): Promise<Moradia[]> {
    const moradias = await prisma.moradia.findMany({
      include: {
        avaliacoes: { // Inclui as avaliações
          select: { nota: true }
        },
        criador: { // Inclui o nome do criador
          select: { nome: true }
        }
      }
    });
    return moradias;
  }
  
  async create(data: any, criadorId: number): Promise<Moradia> {
    const { nome, endereco, descricao, preco, latitude, longitude } = data;

    if (!nome || !endereco || !descricao || !preco) {
      throw new Error('Campos obrigatórios em falta.');
    }

    const moradia = await prisma.moradia.create({
      data: {
        nome,
        endereco,
        descricao,
        preco,
        latitude: latitude || 0.0,
        longitude: longitude || 0.0,
        criadorId: criadorId,
      },
    });
    return moradia;
  }

  async getById(id: number): Promise<Moradia | null> {
    const moradia = await prisma.moradia.findUnique({
      where: { id },
      include: {
        criador: { select: { nome: true } }, // Para mostrar "Anunciado por:"
        avaliacoes: { // Carrega as avaliações desta moradia
          include: { autor: { select: { nome: true } } }, // E o autor de cada avaliação
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    return moradia;
  }
}
