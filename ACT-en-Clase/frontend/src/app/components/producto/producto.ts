import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../service/producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  imports: [RouterLink],
  selector: 'app-producto',
  styleUrl: './producto.css',
  templateUrl: './producto.html',
})
export class ProductoComponent {

  productos: Producto[] = [];
  eliminando: number | null = null;
  errorEliminar: string | null = null;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  recargarPagina(): void {
    window.location.reload();
}

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe({
        next: (data) => {
          console.log('Productos recibidos:', data);
          this.productos = data;
        },

        error: (error) => {
          console.error('Error al obtener productos:', error);
        }
    });
  }

  eliminarProducto(id: number | undefined): void {
    if (id === undefined) {
      return;
    }

    const confirmado = window.confirm('¿Seguro que desea eliminar este producto?');
    if (!confirmado) {
      return;
    }

    this.errorEliminar = null;
    this.eliminando = id;

    this.productoService.eliminarProducto(id).subscribe({
      next: (respuesta) => {
        console.log('Producto eliminado:', respuesta);
        this.productos = this.productos.filter((p) => p.id !== id);
        this.eliminando = null;
      },
      error: (error) => {
        console.error('Error al eliminar producto:', error);
        this.errorEliminar = 'No se pudo eliminar el producto.';
        this.eliminando = null;
      },
    });
  }
}
