// Local: server/src/server.ts

import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/userRoutes';
import { moradiaRoutes } from './routes/moradiaRoutes'; // <-- ADICIONE ESTA LINHA

const app = express();

app.use(cors());
app.use(express.json());

// Registra as rotas de Usuário
app.use('/api/users', userRoutes);
// Registra as rotas de Moradia
app.use('/api/moradias', moradiaRoutes); // <-- ADICIONE ESTA LINHA

const PORT = 3333;
app.listen(PORT, () => {
  console.log(` Servidor rodando em http://localhost:${PORT}`);
});
