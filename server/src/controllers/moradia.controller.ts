import { Request, Response } from 'express';
import { MoradiaService } from '../services/moradia.service';
import { AuthRequest } from '../middleware/auth.middleware';

const moradiaService = new MoradiaService();

export class MoradiaController {
  async create(req: AuthRequest, res: Response) {
    try {
      const criadorId = req.user!.id;
      const moradia = await moradiaService.create(req.body, criadorId);
      return res.status(201).json(moradia);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
    
  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID da moradia inválido.' });
      }
      
      const moradia = await moradiaService.getById(id);
      
      if (!moradia) {
        return res.status(404).json({ message: 'Moradia não encontrada.' });
      }
      
      return res.json(moradia);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
