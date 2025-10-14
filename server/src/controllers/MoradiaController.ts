import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MoradiaController {
  async list(req: Request, res: Response) {
    try {
      const moradias = await prisma.moradia.findMany();
      return res.json(moradias);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar moradias.' });
    }
  }

  
  async create(req: Request, res: Response) {
    const criadorId = 1;
    const { nome, endereco, descricao, preco } = req.body;

    if (!nome || !endereco || !descricao || !preco) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
      const moradia = await prisma.moradia.create({
        data: {
          nome,
          endereco,
          descricao,
          preco,
          criadorId,
        },
      });
      return res.status(201).json(moradia);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao cadastrar moradia. Verifique os dados.' });
    }
  }
}
