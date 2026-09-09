import { Request, Response } from "express";
import { UsuarioService } from "../services/usuario.service";
 
export class UsuarioController {
 
    private service =
        new UsuarioService();
 
    obtenerUsuarios(
        req: Request,
        res: Response
    ) {
 
        const usuarios =
            this.service.obtenerTodos();
 
        res.json(usuarios);
 
    }
 
    obtenerUsuario(
        req: Request,
        res: Response
    ) {
 
        const id =
            Number(req.params.id);
 
        const usuario =
            this.service.obtenerPorId(id);
 
        if (!usuario) {
 
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
 
        }
 
        res.json(usuario);
 
    }
 
}