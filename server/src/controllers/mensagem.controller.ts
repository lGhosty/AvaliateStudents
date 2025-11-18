import { Response } from 'express';
import { MensagemService } from '../services/mensagem.service';
import { AuthRequest } from '../middleware/auth.middleware';

const service = new MensagemService();

export class MensagemController {
  async enviar(req: AuthRequest, res: Response) {
    try {
      const remetenteId = req.user!.id;
      const { destinatarioId, moradiaId, conteudo } = req.body;
      const msg = await service.enviar(remetenteId, destinatarioId, moradiaId, conteudo);
      return res.status(201).json(msg);
    } catch (e) { return res.status(400).json({ error: (e as Error).message }); }
  }

  async listar(req: AuthRequest, res: Response) {
    try {
      const usuarioId = req.user!.id;
      const moradiaId = parseInt(req.params.moradiaId);
      const msgs = await service.listarConversa(usuarioId, moradiaId);
      return res.json(msgs);
    } catch (e) { return res.status(400).json({ error: (e as Error).message }); }
  }
}
