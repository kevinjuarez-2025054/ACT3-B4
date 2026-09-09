import express from 'express';
import cors from 'cors';

import { productoController } from './routers/producto.router';

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(productoController);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});