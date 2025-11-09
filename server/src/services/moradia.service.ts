import { prisma } from '../lib/prisma';
import { Moradia } from '@prisma/client';

export class MoradiaService {

  // Lógica de listagem (movida do MoradiaController)
  async list(): Promise<Moradia[]> {
    const moradias = await prisma.moradia.findMany();
    return moradias;
  }

  // Lógica de criação (movida do MoradiaController)
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
}
