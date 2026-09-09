import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarritoService, ItemCarrito } from '../../service/carrito.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito',
  standalone: true,
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class CarritoComponent implements OnInit, OnDestroy {
  items: ItemCarrito[] = [];
  private sub!: Subscription;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.sub = this.carritoService.carrito$.subscribe(items => {
      this.items = items;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  eliminarDelCarrito(id: number | undefined): void {
    this.carritoService.eliminarItem(id);
  }

  vaciarCarrito(): void {
    this.carritoService.limpiarCarrito();
  }

  obtenerTotal(): number {
    return this.carritoService.obtenerTotal();
  }

  procesarCompra(): void {
    alert('¡Compra procesada con éxito!');
    this.carritoService.limpiarCarrito();
  }
}
