import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

const router = Router();
const upload = multer(uploadConfig);

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Nenhum ficheiro enviado' });
  }
  // Retorna o nome do ficheiro para o Front-end guardar
  return res.json({ filename: req.file.filename });
});

export { router as uploadRoutes };
