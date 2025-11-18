import { prisma } from '../lib/prisma';

export class MensagemService {
  async enviar(remetenteId: number, destinatarioId: number, moradiaId: number, conteudo: string) {
    return prisma.mensagem.create({
      data: { remetenteId, destinatarioId, moradiaId, conteudo }
    });
  }

  // Listar conversa entre dois usuários sobre uma moradia
  async listarConversa(usuarioId: number, moradiaId: number) {
    return prisma.mensagem.findMany({
      where: {
        moradiaId,
        OR: [
          { remetenteId: usuarioId },
          { destinatarioId: usuarioId }
        ]
      },
      include: { remetente: { select: { nome: true } } },
      orderBy: { createdAt: 'asc' }
    });
  }
}
