import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class AuthController {
  
  async register(req: Request, res: Response) {
    try {
      const { nome, email, senha } = req.body;

      // CORREÇÃO: Passamos um objeto { } com os dados dentro
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
}
