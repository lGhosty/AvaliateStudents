import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware'; // Importante!

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);

// --- NOVA ROTA ---
router.patch('/avatar', authMiddleware, authController.updateAvatar);

export { router as authRoutes };
