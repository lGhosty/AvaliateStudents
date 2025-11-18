import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuario } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'fehapolo';

interface RegisterData {
  nome: string;
  email: string;
  senha: string;
}

export class AuthService {

  async register(data: RegisterData): Promise<Omit<Usuario, 'senha'>> {
    const { nome, email, senha } = data;
    
    if (!nome || !email || !senha) {
       throw new Error("Todos os campos são obrigatórios");
    }

    const emailEmUso = await prisma.usuario.findUnique({ where: { email } });
    if (emailEmUso) {
      throw new Error('Este e-mail já está em uso.');
    }

    const senhaHash = await bcrypt.hash(senha, 8);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        role: "ESTUDANTE"
      },
    });

    const { senha: _, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }

  async login(email: string, senha: string): Promise<{ token: string, user: Omit<Usuario, 'senha'> }> {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      throw new Error('Credenciais inválidas.');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error('Credenciais inválidas.');
    }

    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { senha: _, ...user } = usuario;
    return { token, user };
  }

  // --- NOVA FUNÇÃO: Salvar a URL da foto no Banco ---
  async updateAvatar(usuarioId: number, avatarUrl: string): Promise<Usuario> {
    const usuario = await prisma.usuario.update({
      where: { id: usuarioId },
      data: { avatarUrl },
    });
    return usuario;
  }
}
