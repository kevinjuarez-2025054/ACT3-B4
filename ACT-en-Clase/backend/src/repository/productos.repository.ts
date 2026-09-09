import connection from "../config/database";
import { Producto } from "../models/producto.model";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class ProductosRepository {
    async obtenerProductos(): Promise<Producto[]> {
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM productos");
        return rows as Producto[];
    }

    async obtenerProductoPorId(id: number): Promise<Producto | undefined> {
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM productos WHERE id = ?",
            [id]
        );
        return rows[0] as Producto | undefined;
    }

    async crearProducto(producto: Producto): Promise<Producto> {
        await connection.query<ResultSetHeader>("INSERT INTO productos (nombre,precio,cantidad) VALUES (?,?,?)",
            [producto.nombre, producto.precio, producto.cantidad]
        );
        return producto;
    }

    async actualizarProducto(id: number, producto: Producto): Promise<Producto | undefined> {
        const [result] = await connection.query<ResultSetHeader>("UPDATE productos SET nombre = ?, precio = ?, cantidad = ? WHERE id = ?",
            [producto.nombre, producto.precio, producto.cantidad, id]
        );
        return result.affectedRows > 0 ? producto : undefined;
    }

    async eliminarProducto(id: number): Promise<boolean> {
        const [result] = await connection.query<ResultSetHeader>("DELETE FROM productos WHERE id = ?",
            [id]
        );
        return result.affectedRows > 0;
    }
}