import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../service/producto.service';
import { CarritoService } from '../../service/carrito.service';
import { Producto } from '../../models/producto.model';

@Component({
  imports: [RouterLink],
  selector: 'app-producto',
  styleUrl: './producto.css',
  templateUrl: './producto.html',
})
export class ProductoComponent implements OnInit {

  productos: Producto[] = [];
  eliminando: number | null = null;
  errorEliminar: string | null = null;

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  recargarPagina(): void {
    window.location.reload();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
      }
    });
  }

  // Permite agregar la cantidad exacta digitada por el usuario
  agregarAlCarrito(producto: Producto, cantidad: number): void {
    if (cantidad <= 0) return;
    this.carritoService.agregarProducto(producto, cantidad);
    alert(`${cantidad}x ${producto.nombre} agregados al carrito.`);
  }

  // Lee de forma reactiva cuántos productos se han acumulado
  obtenerArticulosEnCarrito(): number {
    return this.carritoService.obtenerConteoTotal();
  }

  // Redirecciona al pulsar sobre el icono del carrito
  irAlCarrito(): void {
    this.router.navigate(['/carrito']);
  }

  eliminarProducto(id: number | undefined): void {
    if (id === undefined) return;

    const confirmado = window.confirm('¿Seguro que desea eliminar este producto?');
    if (!confirmado) return;

    this.errorEliminar = null;
    this.eliminando = id;

    this.productoService.eliminarProducto(id).subscribe({
      next: (respuesta) => {
        this.productos = this.productos.filter((p) => p.id !== id);
        this.eliminando = null;
      },
      error: (error) => {
        this.errorEliminar = 'No se pudo eliminar el producto.';
        this.eliminando = null;
      },
    });
  }
}
