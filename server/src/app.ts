import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/userRoutes';
import { moradiaRoutes } from './routes/moradiaRoutes'; // <--

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/moradias', moradiaRoutes);
export { app };

