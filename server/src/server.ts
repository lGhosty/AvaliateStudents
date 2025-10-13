import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/userRoutes';
import { moradiaRoutes } from './routes/moradiaRoutes'; // <--

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/moradias', moradiaRoutes);
const PORT = 3333;
app.listen(PORT, () => {
  console.log(` Servidor rodando em http://localhost:${PORT}`);
});
