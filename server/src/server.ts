import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';

import { authRoutes } from './routes/auth.routes';
import { moradiaRoutes } from './routes/moradia.routes';
import { avaliacaoRoutes } from './routes/avaliacao.routes';
import { reservaRoutes } from './routes/reserva.routes';
import { uploadRoutes } from './routes/upload.routes';
import { mensagemRoutes } from './routes/mensagem.routes';

// 1. Mudança: Adicione 'export' antes de const app
export const app = express();

app.use(cors());
app.use(express.json());

// Servir imagens estáticas
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/moradias', moradiaRoutes);
app.use('/api/avaliacoes', avaliacaoRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/mensagens', mensagemRoutes);

// 2. Mudança: Só inicia o servidor se NÃO estiver em modo de teste
if (require.main === module) {
  const PORT = 3333;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}