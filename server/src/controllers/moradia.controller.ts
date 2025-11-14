import { Request, Response } from 'express';
import { MoradiaService } from '../services/moradia.service';
import { AuthRequest } from '../middleware/auth.middleware';

const moradiaService = new MoradiaService();

export class MoradiaController {

  async list(req: Request, res: Response) {
    try {
      const moradias = await moradiaService.list();
      return res.json(moradias);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  async create(req: AuthRequest, res: Response) {
    try {
      // Obtém o ID do utilizador a partir do token (é um número)
      const criadorId = req.user!.id;
      
      const moradia = await moradiaService.create(req.body, criadorId);
      return res.status(201).json(moradia);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
}
