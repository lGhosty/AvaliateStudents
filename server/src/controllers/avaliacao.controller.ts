import { Request, Response } from 'express';
import { AvaliacaoService } from '../services/avaliacao.service';
import { AuthRequest } from '../middleware/auth.middleware';

const avaliacaoService = new AvaliacaoService();

export class AvaliacaoController {
  async create(req: AuthRequest, res: Response) {
    try {
      const autorId = req.user!.id;
      const moradiaId = parseInt(req.params.moradiaId); // ID da moradia (da URL)

      const avaliacao = await avaliacaoService.create(req.body, autorId, moradiaId);
      return res.status(201).json(avaliacao);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
  async listByMoradia(req: Request, res: Response) {
    try {
      const moradiaId = parseInt(req.params.moradiaId);
      const avaliacoes = await avaliacaoService.listByMoradia(moradiaId);
      return res.json(avaliacoes);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
