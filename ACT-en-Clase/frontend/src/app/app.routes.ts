import { Routes } from '@angular/router';
import {  ProductoComponent } from './components/producto/producto';
import { ProductoFormComponent } from './components/producto-form/producto-form';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'productos/nuevo',
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
  }
];