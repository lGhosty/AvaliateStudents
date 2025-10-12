import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export class UserController {
  async create(req: Request, res: Response) {
    const { nome, email, senha } = req.body;
    const senhaHash = await bcrypt.hash(senha, 8);

    try {
      const usuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: senhaHash,
        },
      });
      const { senha: _, ...usuarioSemSenha } = usuario;
      return res.status(201).json(usuarioSemSenha);

    } catch (error) {
      return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }
  }

  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const { senha: _, ...usuarioSemSenha } = usuario;
    return res.json(usuarioSemSenha);
  }
}
