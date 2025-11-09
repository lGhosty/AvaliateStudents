import { prisma } from '../lib/prisma';
import { Avaliacao } from '@prisma/client';

export class AvaliacaoService {
  
  async create(data: { nota: number; comentario?: string }, autorId: number, moradiaId: number): Promise<Avaliacao> {
    const { nota, comentario } = data;

    if (nota < 1 || nota > 5) {
      throw new Error('A nota deve ser entre 1 e 5.');
    }
    
    const moradia = await prisma.moradia.findUnique({ where: { id: moradiaId } });
    if (!moradia) {
      throw new Error('Moradia não encontrada.');
    }

    const avaliacaoExistente = await prisma.avaliacao.findFirst({
      where: { moradiaId, autorId }
    });
    if (avaliacaoExistente) {
      throw new Error('Você já avaliou esta moradia.');
    }

    const avaliacao = await prisma.avaliacao.create({
      data: {
        nota,
        comentario,
        moradiaId,
        autorId,
      },
    });
    return avaliacao;
  }

  async listByMoradia(moradiaId: number): Promise<Avaliacao[]> {
    const avaliacoes = await prisma.avaliacao.findMany({
      where: { moradiaId },
      include: { autor: { select: { nome: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return avaliacoes;
  }
}
