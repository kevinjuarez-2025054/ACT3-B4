import {
    Component,
    OnInit
} from '@angular/core';
 
import {
    CommonModule
} from '@angular/common';
 
import {
    Usuario
} from '../../models/usuario';
 
import {
    UsuarioService
} from '../../services/usuario.service';
 
import {
    MayusculasPipe
} from '../../pipes/mayusculas.pipe';
 
import {
    UsuarioDetalleComponent
} from '../usuario-detalle/usuario-detalle.component';
 
@Component({
 
    selector: 'app-usuarios',
 
    standalone: true,
 
    imports: [
        CommonModule,
        MayusculasPipe,
        UsuarioDetalleComponent
    ],
 
    templateUrl:
        './usuarios.component.html'
 
})
export class UsuariosComponent
    implements OnInit {
 
    usuarios: Usuario[] = [];
 
    usuarioSeleccionado?:
        Usuario;
 
    constructor(
        private usuarioService:
            UsuarioService
    ) {}
 
    ngOnInit(): void {
 
        this.cargarUsuarios();
 
    }
 
    cargarUsuarios(): void {
 
        this.usuarioService
            .obtenerUsuarios()
            .subscribe({
 
                next: (usuarios) => {
 
                    console.log(
                        'Usuarios recibidos:',
                        usuarios
                    );
 
                    this.usuarios =
                        usuarios;
 
                },
 
                error: (error) => {
 
                    console.error(
                        'Error:',
                        error
                    );
 
                }
 
            });
 
    }
 
    seleccionarUsuario(
        usuario: Usuario
    ): void {
 
        this.usuarioSeleccionado =
            usuario;
 
    }
 
    cerrarDetalle(): void {
 
        this.usuarioSeleccionado =
            undefined;
 
    }
 
}