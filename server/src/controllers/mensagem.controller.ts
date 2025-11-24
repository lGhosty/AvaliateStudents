import { Response } from 'express';
import { MensagemService } from '../services/mensagem.service';
import { AuthRequest } from '../middleware/auth.middleware';

const service = new MensagemService();

export class MensagemController {
  
  async enviar(req: AuthRequest, res: Response) {
    try {
      const remetenteId = req.user!.id;
      // Aceita tanto 'texto' quanto 'conteudo' para evitar erros se o frontend mandar o antigo
      const { destinatarioId, moradiaId, conteudo, texto } = req.body;

      // Prioriza 'texto', se não tiver, usa 'conteudo'
      const mensagemReal = texto || conteudo;

      // Chama o serviço passando o nome correto do argumento
      const msg = await service.enviar(remetenteId, destinatarioId, moradiaId, mensagemReal);
      
      return res.status(201).json(msg);
    } catch (e) { 
      return res.status(400).json({ error: (e as Error).message }); 
    }
  }

  async listar(req: AuthRequest, res: Response) {
    try {
      // Não precisamos mais do usuarioId aqui, pois simplificamos o service para listar por casa
      const moradiaId = parseInt(req.params.moradiaId);
      
      // CORREÇÃO: O nome do método no Service agora é 'listarPorMoradia'
      const msgs = await service.listarPorMoradia(moradiaId);
      
      return res.json(msgs);
    } catch (e) { 
      return res.status(400).json({ error: (e as Error).message }); 
    }
  }
}