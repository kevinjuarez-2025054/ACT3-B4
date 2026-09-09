import express from "express";
import cors from "cors";
 
import usuarioRoutes
    from "./routes/usuario.routes";
 
const app = express();
 
app.use(cors());
 
app.use(express.json());
 
app.use(
    "/api/usuarios",
    usuarioRoutes
);

app.listen(3000, () => {
    console.log(
        "Servidor backend escuchando en el puerto 3000"
    );
});
 
export default app;