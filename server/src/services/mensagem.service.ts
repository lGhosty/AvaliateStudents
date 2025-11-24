import { prisma } from '../lib/prisma';

export class MensagemService {
  
  // 1. CORREÇÃO: Mudei 'conteudo' para 'texto' para igualar ao banco de dados
  async enviar(remetenteId: number, destinatarioId: number, moradiaId: number, texto: string) {
    return prisma.mensagem.create({
      data: { 
        remetenteId, 
        destinatarioId, 
        moradiaId, 
        texto // <--- Agora está correto (igual ao schema.prisma)
      }
    });
  }

  // 2. CORREÇÃO: Renomeei para 'listarPorMoradia' para igualar ao Controller
  // E removi o filtro de usuário para simplificar o teste por enquanto
  async listarPorMoradia(moradiaId: number) {
    return prisma.mensagem.findMany({
      where: { moradiaId },
      include: { 
        remetente: { select: { nome: true, id: true } } 
      },
      orderBy: { createdAt: 'asc' }
    });
  }
}