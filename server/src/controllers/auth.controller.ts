import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../middleware/auth.middleware'; // Certifique-se que este import existe

const authService = new AuthService();

export class AuthController {
  
  async register(req: Request, res: Response) {
    try {
      const { nome, email, senha } = req.body;

      const user = await authService.register({ nome, email, senha });

      return res.status(201).json({
        message: "Sucesso, usuário criado!",
        user: { id: user.id, nome: user.nome, email: user.email }
      });
      
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
    
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const result = await authService.login(email, senha);
      return res.json(result);
    } catch (error) {
      return res.status(401).json({ message: (error as Error).message });
    }
  }

  // --- NOVO MÉTODO: Recebe a URL e chama o serviço ---
  async updateAvatar(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id; // O ID vem do Token JWT
      const { avatarUrl } = req.body; // A URL vem do App
      
      await authService.updateAvatar(userId, avatarUrl);
      
      return res.json({ message: "Avatar atualizado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: "Erro ao atualizar avatar." });
    }
  }
}
