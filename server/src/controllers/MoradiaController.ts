// Local: server/src/controllers/MoradiaController.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MoradiaController {
  // --- CASO DE USO 3: LISTAR MORADIAS ---
  async list(req: Request, res: Response) {
    try {
      const moradias = await prisma.moradia.findMany();
      return res.json(moradias);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar moradias.' });
    }
  }

  // --- CASO DE USO 4: CADASTRAR MORADIA ---
  async create(req: Request, res: Response) {
    // NOTA: Por enquanto, o ID do criador está fixo.
    // Na Entrega 03, vamos pegar o ID do usuário logado (via token JWT).
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
          criadorId, // Associa a moradia a um usuário
        },
      });
      return res.status(201).json(moradia);
    } catch (error) {
      // Este erro pode acontecer se o usuário com criadorId=1 não existir.
      return res.status(400).json({ message: 'Erro ao cadastrar moradia. Verifique os dados.' });
    }
  }
}
