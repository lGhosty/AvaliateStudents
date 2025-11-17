import { Request, Response } from 'express';
import { MoradiaService } from '../services/moradia.service';
import { AuthRequest } from '../middleware/auth.middleware';

const moradiaService = new MoradiaService();

export class MoradiaController {

  async list(req: Request, res: Response) {
    try {
      // Lê o filtro da URL (ex: /api/moradias?precoMax=1000)
      const precoMax = req.query.precoMax ? parseFloat(req.query.precoMax as string) : undefined;
      
      const moradias = await moradiaService.list(precoMax);
      return res.json(moradias);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

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
      if (isNaN(id)) return res.status(400).json({ message: 'ID inválido.' });
      
      const moradia = await moradiaService.getById(id);
      if (!moradia) return res.status(404).json({ message: 'Moradia não encontrada.' });
      
      return res.json(moradia);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  // --- DELETE ---
  async delete(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const usuarioId = req.user!.id; // ID de quem está logado
      
      await moradiaService.delete(id, usuarioId);
      return res.status(204).send(); // 204 = Sucesso sem conteúdo
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  // --- UPDATE ---
  async update(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const usuarioId = req.user!.id;
      
      const moradia = await moradiaService.update(id, req.body, usuarioId);
      return res.json(moradia);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
}
