import { Routes } from '@angular/router';
import {  ProductoComponent } from './components/producto/producto';
import { ProductoFormComponent } from './components/producto-form/producto-form';
import { CarritoComponent } from './components/carrito/carrito';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'productos',
    pathMatch: 'full'
  },
  {
    path: 'productos',
    component: ProductoComponent
  },
  {
    path: 'productos/nuevo',
    component: ProductoFormComponent
  },
  {
    path: 'productos/editar/:id',
    component: ProductoFormComponent
  },
  {
    path: 'carrito',
    component: CarritoComponent
  }
];