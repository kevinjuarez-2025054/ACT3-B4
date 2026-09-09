import { UsuarioRepository } from "../repositories/usuario.repository";
 
export class UsuarioService {
 
    private repository =
        new UsuarioRepository();
 
    obtenerTodos() {
 
        return this.repository.obtenerTodos();
 
    }
 
    obtenerPorId(id: number) {
 
        return this.repository.obtenerPorId(id);
 
    }
 
}