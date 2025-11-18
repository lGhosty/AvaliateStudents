import { prisma } from '../lib/prisma';
import { Reserva } from '@prisma/client';

export class ReservaService {
  
  // Criar Reserva (Estudante)
  async create(data: { dataEntrada: string; dataSaida: string }, usuarioId: number, moradiaId: number): Promise<Reserva> {
    const { dataEntrada, dataSaida } = data;

    if (new Date(dataEntrada) >= new Date(dataSaida)) {
      throw new Error('Data de saída deve ser após a data de entrada.');
    }

    // Verifica se já existe reserva nas datas (opcional, mas recomendado)
    const conflito = await prisma.reserva.findFirst({
      where: {
        moradiaId,
        status: 'CONFIRMADA',
        OR: [
          { dataEntrada: { lte: new Date(dataSaida) }, dataSaida: { gte: new Date(dataEntrada) } }
        ]
      }
    });

    if (conflito) {
      throw new Error('Esta moradia já está reservada nestas datas.');
    }

    const reserva = await prisma.reserva.create({
      data: {
        dataEntrada: new Date(dataEntrada),
        dataSaida: new Date(dataSaida),
        status: 'PENDENTE',
        moradiaId,
        usuarioId,
      }
    });
    return reserva;
  }

  // Listar Reservas que EU FIZ (Estudante)
  async listByUser(usuarioId: number): Promise<Reserva[]> {
    return prisma.reserva.findMany({
      where: { usuarioId },
      include: {
        moradia: { select: { nome: true, imageUrl: true, endereco: true } }
      },
      orderBy: { dataEntrada: 'asc' }
    });
  }

  // --- NOVAS FUNÇÕES ---

  // 1. Listar Reservas RECEBIDAS (Dono da Casa)
  async listReceived(donoId: number): Promise<Reserva[]> {
    return prisma.reserva.findMany({
      where: {
        moradia: { criadorId: donoId } // Busca reservas onde a moradia é minha
      },
      include: {
        usuario: { select: { nome: true, email: true, avatarUrl: true } }, // Quem pediu?
        moradia: { select: { nome: true } } // Qual casa?
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // 2. Aceitar ou Rejeitar Reserva
  async updateStatus(reservaId: number, status: string, donoId: number): Promise<Reserva> {
    // Verifica se a reserva existe e se a casa pertence a quem está a tentar aceitar
    const reserva = await prisma.reserva.findUnique({
      where: { id: reservaId },
      include: { moradia: true }
    });

    if (!reserva) throw new Error('Reserva não encontrada.');
    if (reserva.moradia.criadorId !== donoId) throw new Error('Você não é o dono desta moradia.');

    return prisma.reserva.update({
      where: { id: reservaId },
      data: { status } // 'CONFIRMADA' ou 'CANCELADA'
    });
  }
}
