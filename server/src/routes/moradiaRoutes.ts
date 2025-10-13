// Local: server/src/routes/moradiaRoutes.ts

import { Router } from 'express';
import { MoradiaController } from '../controllers/MoradiaController';

const router = Router();
const moradiaController = new MoradiaController();

// Rota para listar todas as moradias
router.get('/', moradiaController.list);

// Rota para criar uma nova moradia
router.post('/', moradiaController.create);

export { router as moradiaRoutes };
