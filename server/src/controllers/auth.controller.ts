import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class AuthController {
  
  // O controlador agora apenas lida com 'req' e 'res'
  async register(req: Request, res: Response) {
    try {
      const usuario = await authService.register(req.body);
      return res.status(201).json(usuario);
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
