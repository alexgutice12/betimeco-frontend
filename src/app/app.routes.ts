import { Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { authGuard } from './guards/auth.guard';
export const routes: Routes = [
  { path: '', component: CatalogComponent }, { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, { path: 'mis-productos', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'carrito', component: CartComponent }, { path: '**', redirectTo: '' }
];
