import { Router } from "express";
 
import {
    UsuarioController
} from "../controller/usuario.controller";
 
const router = Router();
 
const controller =
    new UsuarioController();
 
router.get(
    "/",
    (req, res) =>
        controller.obtenerUsuarios(req, res)
);
 
router.get(
    "/:id",
    (req, res) =>
        controller.obtenerUsuario(req, res)
);
 
export default router;