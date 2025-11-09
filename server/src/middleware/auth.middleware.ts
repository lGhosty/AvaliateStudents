import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'fehapolo';


export interface AuthRequest extends Request {
  user?: {
    id: number; 
    role: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifica o token usando o seu segredo
    const payload = jwt.verify(token, JWT_SECRET) as { id: number; role: string };
    
    // Adiciona os dados do utilizador ao objeto 'req'
    req.user = payload;
    
    next(); // Permite que a requisição continue
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};
