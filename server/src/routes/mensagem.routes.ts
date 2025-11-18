import { Router } from 'express';
import { MensagemController } from '../controllers/mensagem.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const controller = new MensagemController();

router.post('/', authMiddleware, controller.enviar);
router.get('/moradia/:moradiaId', authMiddleware, controller.listar);

export { router as mensagemRoutes };
