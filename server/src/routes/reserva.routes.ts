import { Router } from 'express';
import { ReservaController } from '../controllers/reserva.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const reservaController = new ReservaController();


// Ex: GET /api/reservas/minhas
router.get('/minhas', authMiddleware, reservaController.listByUser);

// Ex: POST /api/reservas/moradia/123
router.post('/moradia/:moradiaId', authMiddleware, reservaController.create);

export { router as reservaRoutes };
