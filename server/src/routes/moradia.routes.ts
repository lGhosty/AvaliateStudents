import { Router } from 'express';
import { MoradiaController } from '../controllers/moradia.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const moradiaController = new MoradiaController();

// A rota de 'list' (GET) é pública
router.get('/', moradiaController.list);

// A rota de 'create' (POST) agora é protegida
router.post('/', authMiddleware, moradiaController.create);

export { router as moradiaRoutes };
