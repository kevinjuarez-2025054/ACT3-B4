import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/producto.model';

export interface ItemCarrito {
  producto: Producto;
  cantidadSeleccionada: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoSubject = new BehaviorSubject<ItemCarrito[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  obtenerItems(): ItemCarrito[] {
    return this.carritoSubject.value;
  }

    agregarProducto(producto: Producto, cantidad: number = 1): void {
        const items = [...this.obtenerItems()];
        const itemExistente = items.find(item => item.producto.id === producto.id);

        if (itemExistente) {
            itemExistente.cantidadSeleccionada += cantidad;
        } else {
            items.push({ producto, cantidadSeleccionada: cantidad });
        }
        this.carritoSubject.next(items);
    }

    // Añade esta función para pintar el total de artículos en el icono
    obtenerConteoTotal(): number {
    return this.obtenerItems().reduce((total, item) => total + item.cantidadSeleccionada, 0);
    }


  eliminarItem(id: number | undefined): void {
    if (id === undefined) return;
    const items = this.obtenerItems().filter(item => item.producto.id !== id);
    this.carritoSubject.next(items);
  }

  limpiarCarrito(): void {
    this.carritoSubject.next([]);
  }

  obtenerTotal(): number {
    return this.obtenerItems().reduce((total, item) => {
      return total + (item.producto.precio * item.cantidadSeleccionada);
    }, 0);
  }
}
