import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {  Producto } from "../models/producto.model";

@Injectable({
  providedIn: "root",
})
export class ProductoService {
    private apiUrl = "http://localhost:3000/api/productos";

    constructor(private http: HttpClient){}

    obtenerProductos(): Observable<Producto[]> {
        return this.http.get<Producto[]>(this.apiUrl);
    }

    obtenerProductoPorId(id: number): Observable<Producto> {
        return this.http.get<Producto>(`${this.apiUrl}/${id}`);
    }

    // Envía un nuevo producto al backend (POST /api/productos).
    // Solo debe invocarse cuando el formulario reactivo es válido.
    crearProducto(producto: Producto): Observable<Producto> {
        return this.http.post<Producto>(this.apiUrl, producto);
    }

    // Actualiza un producto existente (PUT /api/productos/:id).
    // Solo debe invocarse cuando el formulario reactivo es válido.
    actualizarProducto(id: number, producto: Producto): Observable<Producto> {
        return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
    }

    // Elimina un producto (DELETE /api/productos/:id).
    eliminarProducto(id: number): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
    }
}
