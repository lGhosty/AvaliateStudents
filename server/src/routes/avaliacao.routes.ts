import { Router } from 'express';
import { AvaliacaoController } from '../controllers/avaliacao.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const avaliacaoController = new AvaliacaoController();

// Ex: POST /api/avaliacoes/moradia/123
router.post('/moradia/:moradiaId', authMiddleware, avaliacaoController.create);

// Ex: GET /api/avaliacoes/moradia/123
router.get('/moradia/:moradiaId', avaliacaoController.listByMoradia);

export { router as avaliacaoRoutes };
