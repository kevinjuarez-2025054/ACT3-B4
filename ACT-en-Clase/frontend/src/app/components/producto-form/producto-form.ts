import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../service/producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.css',
})
export class ProductoFormComponent implements OnInit {
  // Formulario reactivo: modelo de datos definido con FormBuilder.
  // Cada control representa un campo del Producto (models/producto.model.ts).
  productoForm: FormGroup;

  // Si hay un id en la ruta (/productos/editar/:id), el formulario
  // pasa a modo "edición" y usa PUT en lugar de POST.
  modoEdicion = false;
  productoId: number | null = null;

  enviando = false;
  envioExitoso = false;
  errorBackend: string | null = null;
  ultimoProductoEnviado: Producto | null = null;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      precio: [null, [Validators.required, Validators.min(0.01), Validators.max(999999)]],
      cantidad: [null, [Validators.required, Validators.min(1), Validators.max(100000)]],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const id = Number(idParam);
      this.modoEdicion = true;
      this.productoId = id;

      // Carga el producto existente y llena el formulario (data binding modelo -> vista).
      this.productoService.obtenerProductoPorId(id).subscribe({
        next: (producto) => {
          this.productoForm.patchValue(producto);
        },
        error: (err) => {
          console.error('Error al cargar el producto para editar:', err);
          this.errorBackend = 'No se pudo cargar el producto solicitado.';
        },
      });
    }
  }

  // Getters de conveniencia para acceder a los controles desde la plantilla.
  get nombre() {
    return this.productoForm.get('nombre');
  }
  get precio() {
    return this.productoForm.get('precio');
  }
  get cantidad() {
    return this.productoForm.get('cantidad');
  }

  // Mensajes de error por campo. Se listan con *ngFor en la plantilla.
  obtenerErrores(controlName: 'nombre' | 'precio' | 'cantidad'): string[] {
    const control = this.productoForm.get(controlName);
    const mensajes: string[] = [];

    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return mensajes;
    }

    const errores = control.errors;

    if (errores['required']) {
      mensajes.push('Este campo es obligatorio.');
    }
    if (errores['minlength']) {
      mensajes.push(
        `Debe tener al menos ${errores['minlength'].requiredLength} caracteres.`,
      );
    }
    if (errores['maxlength']) {
      mensajes.push(
        `No puede superar los ${errores['maxlength'].requiredLength} caracteres.`,
      );
    }
    if (errores['min']) {
      mensajes.push(`El valor mínimo permitido es ${errores['min'].min}.`);
    }
    if (errores['max']) {
      mensajes.push(`El valor máximo permitido es ${errores['max'].max}.`);
    }

    return mensajes;
  }

  // Determina si un control debe mostrarse resaltado como inválido.
  campoInvalido(controlName: 'nombre' | 'precio' | 'cantidad'): boolean {
    const control = this.productoForm.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  onSubmit(): void {
    this.envioExitoso = false;
    this.errorBackend = null;

    // Si el formulario es inválido, se marcan todos los controles como
    // "touched" para forzar la aparición de los mensajes de error y
    // NO se envían datos al backend.
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const datosProducto: Producto = this.productoForm.value;
    this.enviando = true;

    // Solo se llega aquí cuando el formulario es válido.
    const peticion$ =
      this.modoEdicion && this.productoId !== null
        ? this.productoService.actualizarProducto(this.productoId, datosProducto)
        : this.productoService.crearProducto(datosProducto);

    peticion$.subscribe({
      next: (resultado) => {
        console.log(
          this.modoEdicion
            ? 'Producto actualizado correctamente:'
            : 'Producto enviado y creado correctamente:',
          resultado,
        );
        this.ultimoProductoEnviado = resultado;
        this.envioExitoso = true;
        this.enviando = false;

        if (this.modoEdicion) {
          // Tras actualizar, regresamos al listado para verificar el cambio.
          this.router.navigate(['/productos']);
        } else {
          this.resetFormulario();
        }
      },
      error: (err) => {
        console.error('Error al enviar el producto al backend:', err);
        this.errorBackend =
          err?.error?.message ?? 'Ocurrió un error al enviar el producto.';
        this.enviando = false;
      },
    });
  }

  resetFormulario(): void {
    this.productoForm.reset();
  }
}
