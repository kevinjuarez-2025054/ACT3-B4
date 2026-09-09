import express from 'express';
import cors from 'cors';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../models/producto.model';

 
const app = express();
app.use(cors());
app.use(express.json());
 
export class ProductoController {
    private service = new ProductoService();

    async  getProductos(req: express.Request, res: express.Response) {
        try {
            const productos = await this.service.obtenerProductos();
            console.log("GET /productos");
            console.log("Productos: ", productos);
            res.status(200).json(productos);
        } catch (error: any) {
            console.error(error.message);
            res.status(404).json({ message: error.message});
        }
    }

    async getProductoById(req: express.Request, res: express.Response) {
        try {
            const idParam = req.params.id;
            const id = parseInt(typeof idParam === 'string' ? idParam : String(idParam));
            const producto = await this.service.obtenerProductoPorId(id);
            if (producto) {
                console.log('GET /productos/:id');
                console.log("Producto ID: ", id);
                res.json(producto);
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error: any) {
            console.error("Error al obtener producto por ID: ", error);
            res.status(400).json({ message: error.message});
        }
    }

    async createProducto(req: express.Request, res: express.Response) {
        try {
            const { nombre, precio, cantidad } = req.body;
            const newProducto: Producto = {
                nombre,
                precio,
                cantidad
            };
            const createdProducto = await this.service.crearProducto(newProducto);
            console.log('POST /productos');
            console.log("Producto creado: ", createdProducto);
            res.status(201).json(createdProducto);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ message: error.message});
        }
    }

    async putProducto(req: express.Request, res: express.Response) {
        try {
            const idParam = req.params.id;
            const id = parseInt(typeof idParam === 'string' ? idParam : String(idParam));
            const { nombre, precio, cantidad } = req.body;
            const updatedProducto = await this.service.actualizarProducto(id, { nombre, precio, cantidad });
            if (updatedProducto) {
                console.log('PUT /productos/:id');
                console.log("Producto actualizado: ", updatedProducto);
                res.json(updatedProducto);
            } else {
                console.log('PUT /productos/:id');
                console.log("Producto no encontrado id: ", id);
                res.status(400).json({ message: 'Producto no encontrado' });
            }
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ message: error.message});
        }
    }

    async deleteProducto(req: express.Request, res: express.Response) {
        try {
            const idParam = req.params.id;
            const id = parseInt(typeof idParam === 'string' ? idParam : String(idParam));
            const deleted = await this.service.eliminarProducto(id);
            if (deleted) {
                res.json({ message: 'Producto eliminado' });
                console.log('DELETE /productos/:id');
                console.log("Producto ID eliminado: ", id);
            } else {
                console.log('DELETE /productos/:id');
                console.log("Producto no encontrado id: ", id);
                res.status(400).json({ message: 'Producto no encontrado' });
            }
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ message: error.message});
        }
    }
}
