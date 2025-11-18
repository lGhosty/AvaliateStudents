import { Response } from 'express';
import { ReservaService } from '../services/reserva.service';
import { AuthRequest } from '../middleware/auth.middleware';

const reservaService = new ReservaService();

export class ReservaController {

  async create(req: AuthRequest, res: Response) {
    try {
      const usuarioId = req.user!.id;
      const moradiaId = parseInt(req.params.moradiaId);
      const reserva = await reservaService.create(req.body, usuarioId, moradiaId);
      return res.status(201).json(reserva);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  async listByUser(req: AuthRequest, res: Response) {
    try {
      const usuarioId = req.user!.id;
      const reservas = await reservaService.listByUser(usuarioId);
      return res.json(reservas);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  // --- NOVOS MÉTODOS ---

  // Listar pedidos recebidos
  async listReceived(req: AuthRequest, res: Response) {
    try {
      const donoId = req.user!.id;
      const reservas = await reservaService.listReceived(donoId);
      return res.json(reservas);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  // Mudar status (Aceitar/Rejeitar)
  async updateStatus(req: AuthRequest, res: Response) {
    try {
      const donoId = req.user!.id;
      const reservaId = parseInt(req.params.id);
      const { status } = req.body; // Espera receber { "status": "CONFIRMADA" }

      if (!['CONFIRMADA', 'CANCELADA', 'PENDENTE'].includes(status)) {
         return res.status(400).json({ message: "Status inválido." });
      }

      const reserva = await reservaService.updateStatus(reservaId, status, donoId);
      return res.json(reserva);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
}
