import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/userRoutes';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
