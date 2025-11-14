import { prisma } from '../lib/prisma';
import { Avaliacao } from '@prisma/client';

export class AvaliacaoService {
  
  async create(data: { nota: any; comentario?: string }, autorId: number, moradiaId: number): Promise<Avaliacao> {
    const { nota, comentario } = data;

    // Converte a nota para Float e valida
    const notaFloat = parseFloat(String(nota));
    if (isNaN(notaFloat) || notaFloat < 1 || notaFloat > 5) {
      throw new Error('A nota deve ser um número entre 1 e 5.');
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
        nota: notaFloat,
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
