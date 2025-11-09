import { prisma } from '../lib/prisma';
import { Reserva } from '@prisma/client';

export class ReservaService {
  async create(data: { dataEntrada: string; dataSaida: string }, usuarioId: number, moradiaId: number): Promise<Reserva> {
    const { dataEntrada, dataSaida } = data;

    if (new Date(dataEntrada) >= new Date(dataSaida)) {
      throw new Error('Data de saída deve ser após a data de entrada.');
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

  async listByUser(usuarioId: number): Promise<Reserva[]> {
    const reservas = await prisma.reserva.findMany({
      where: { usuarioId },
      include: {
        moradia: { select: { nome: true, imageUrl: true } }
      },
      orderBy: { dataEntrada: 'asc' }
    });
    return reservas;
  }
}
