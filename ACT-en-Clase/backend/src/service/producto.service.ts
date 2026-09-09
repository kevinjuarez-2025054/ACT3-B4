import { ProductosRepository } from "../repository/productos.repository";
import { Producto } from "../models/producto.model";

export class ProductoService {

    private repository = new ProductosRepository();

    async obtenerProductos(): Promise<Producto[]> {
        return this.repository.obtenerProductos();
    }

    async obtenerProductoPorId(id: number): Promise<Producto | undefined> {
        if(id === undefined || id === null){
            throw new Error("El id de la categoría es obligatorio")
        }

        if(!Number.isInteger(id) || id <= 0){
            throw new Error("El id proporcionado no es válido.");
        }

        return this.repository.obtenerProductoPorId(id);
    }

    async crearProducto(producto: Producto): Promise<Producto> {
        if(!producto.nombre || !producto.precio || !producto.cantidad){
            throw new Error("Todos los campos son obligatorios");
        }

        if(!Number.isFinite(producto.precio) || producto.precio <= 0){
            throw new Error("El precio proporcionado no es válido.");
        }

        if(!Number.isInteger(producto.cantidad) || producto.cantidad <= 0){
            throw new Error("La cantidad proporcionada no es válida.");
        }

        return this.repository.crearProducto(producto);
    }

    async actualizarProducto(id: number, producto: Producto): Promise<Producto | undefined> {
        if(id === undefined || id === null){
            throw new Error("El id de la categoría es obligatorio")
        }

        if(!Number.isInteger(id) || id <= 0){
            throw new Error("El id proporcionado no es válido.");
        }

        if(!producto.nombre || !producto.precio || !producto.cantidad){
            throw new Error("Todos los campos son obligatorios");
        }

        if(!Number.isFinite(producto.precio) || producto.precio <= 0){
            throw new Error("El precio proporcionado no es válido.");
        }

        if(!Number.isInteger(producto.cantidad) || producto.cantidad <= 0){
            throw new Error("La cantidad proporcionada no es válida.");
        }

        return this.repository.actualizarProducto(id, producto);
    }

    async eliminarProducto(id: number): Promise<boolean> {
        if(id === undefined || id === null){
            throw new Error("El id de la categoría es obligatorio")
        }

        if(!Number.isInteger(id) || id <= 0){
            throw new Error("El id proporcionado no es válido.");
        }

        return this.repository.eliminarProducto(id);
    }
}