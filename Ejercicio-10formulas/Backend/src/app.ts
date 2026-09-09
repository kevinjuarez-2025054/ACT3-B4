import express from 'express';
import cors from 'cors';
import formulaRoutes from './routes/formula.routes';

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(formulaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
