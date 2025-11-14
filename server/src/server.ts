import 'dotenv/config'; // GARANTE QUE O .ENV SEJA LIDO PRIMEIRO!
import express from 'express';
import cors from 'cors';
import { authRoutes } from './routes/auth.routes';
import { moradiaRoutes } from './routes/moradia.routes';
import { avaliacaoRoutes } from './routes/avaliacao.routes';
import { reservaRoutes } from './routes/reserva.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Registar as rotas
app.use('/api/auth', authRoutes);
app.use('/api/moradias', moradiaRoutes);
app.use('/api/avaliacoes', avaliacaoRoutes);
app.use('/api/reservas', reservaRoutes);

const PORT = 3333;
app.listen(PORT, () => {
  console.log(` Servidor rodando em http://localhost:${PORT}`);
});
