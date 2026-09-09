import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
 
import {
    CommonModule
} from '@angular/common';
 
import {
    Usuario
} from '../../models/usuario';
 
@Component({
 
    selector:
        'app-usuario-detalle',
 
    standalone: true,
 
    imports: [
        CommonModule
    ],
 
    templateUrl:
        './usuario-detalle.component.html'
 
})
export class UsuarioDetalleComponent {
 
    @Input()
    usuario!: Usuario;
 
    @Output()
    cerrar =
        new EventEmitter<void>();
 
    cerrarVentana(): void {
 
        this.cerrar.emit();
 
    }
}