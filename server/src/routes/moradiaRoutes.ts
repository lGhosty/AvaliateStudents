import { Router } from 'express';
import { MoradiaController } from '../controllers/MoradiaController';

const router = Router();
const moradiaController = new MoradiaController();
router.get('/', moradiaController.list);
router.post('/', moradiaController.create);

export { router as moradiaRoutes };
