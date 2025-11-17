import { Router } from 'express';
import { MoradiaController } from '../controllers/moradia.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const moradiaController = new MoradiaController();

// Públicas
router.get('/', moradiaController.list);
router.get('/:id', moradiaController.getById);

// Protegidas (Precisa de Token)
router.post('/', authMiddleware, moradiaController.create);
router.delete('/:id', authMiddleware, moradiaController.delete); // <-- NOVA
router.put('/:id', authMiddleware, moradiaController.update);    // <-- NOVA

export { router as moradiaRoutes };
