import { Router } from 'express';
import { ReservaController } from '../controllers/reserva.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const reservaController = new ReservaController();

// Reservas que eu fiz (Minhas viagens)
router.get('/minhas', authMiddleware, reservaController.listByUser);

// Reservas que recebi (Nas minhas casas) <-- NOVA
router.get('/recebidas', authMiddleware, reservaController.listReceived);

// Criar reserva
router.post('/moradia/:moradiaId', authMiddleware, reservaController.create);

// Alterar status (Confirmar/Cancelar) <-- NOVA
// Exemplo: PATCH /api/reservas/15/status
router.patch('/:id/status', authMiddleware, reservaController.updateStatus);

export { router as reservaRoutes };
