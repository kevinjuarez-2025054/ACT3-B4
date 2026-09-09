import { Router } from "express";
import cors from 'cors';
import { ProductoController } from "../controller/productos.controller";
 
export const productoController = Router();

productoController.get('/api/productos', cors(), (req, res) => {
    const controller = new ProductoController();
    controller.getProductos(req, res);
});

productoController.get('/api/productos/:id', cors(), (req, res) => {
    const controller = new ProductoController();
    controller.getProductoById(req, res);
});

productoController.post('/api/productos', cors(), (req, res) => {
    const controller = new ProductoController();
    controller.createProducto(req, res);
});

productoController.put('/api/productos/:id', cors(), (req, res) => {
    const controller = new ProductoController();
    controller.putProducto(req, res);
});

productoController.delete('/api/productos/:id', cors(), (req, res) => {
    const controller = new ProductoController();
    controller.deleteProducto(req, res);
});
