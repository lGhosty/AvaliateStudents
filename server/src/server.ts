import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path'; // <-- Importar path

import { authRoutes } from './routes/auth.routes';
import { moradiaRoutes } from './routes/moradia.routes';
import { avaliacaoRoutes } from './routes/avaliacao.routes';
import { reservaRoutes } from './routes/reserva.routes';
import { uploadRoutes } from './routes/upload.routes'; // <-- Importar rota de upload

const app = express();

app.use(cors());
app.use(express.json());

// Servir imagens estáticas (para o app conseguir carregar as fotos)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))); // <-- IMPORTANTE
// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/moradias', moradiaRoutes);
app.use('/api/avaliacoes', avaliacaoRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/upload', uploadRoutes); // <-- Registar rota

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
