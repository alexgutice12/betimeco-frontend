import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';
export interface LineaCarrito { producto: Product; cantidad: number; }
@Injectable({ providedIn: 'root' })
export class CartService {
  private lineas = new BehaviorSubject<LineaCarrito[]>([]);
  lineas$ = this.lineas.asObservable();
  constructor() {
    try {
      const guardadas: unknown = JSON.parse(localStorage.getItem('betimeco-carrito') || '[]');
      if (Array.isArray(guardadas)) this.lineas.next(guardadas.filter(linea => linea?.producto?._id && Number.isInteger(linea.cantidad) && linea.cantidad > 0).slice(0, 100));
    } catch { localStorage.removeItem('betimeco-carrito'); }
  }
  get cantidad() { return this.lineas.value.reduce((suma, linea) => suma + linea.cantidad, 0); }
  get total() { return this.lineas.value.reduce((suma, linea) => suma + linea.producto.precio * linea.cantidad, 0); }
  agregar(producto: Product): boolean {
    const existentes = this.lineas.value;
    const linea = existentes.find(item => item.producto._id === producto._id);
    if ((linea?.cantidad || 0) >= producto.stock) return false;
    this.guardar(linea ? existentes.map(item => item.producto._id === producto._id ? { producto, cantidad: item.cantidad + 1 } : item) : [...existentes, { producto, cantidad: 1 }]);
    return true;
  }
  cambiar(id: string, cantidad: number) {
    if (cantidad < 1) return;
    this.guardar(this.lineas.value.map(linea => linea.producto._id === id ? { ...linea, cantidad: Math.min(cantidad, linea.producto.stock) } : linea));
  }
  quitar(id: string) { this.guardar(this.lineas.value.filter(linea => linea.producto._id !== id)); }
  vaciar() { this.guardar([]); }
  refrescar(productos: Product[]) {
    this.guardar(this.lineas.value.flatMap(linea => {
      const actual = productos.find(producto => producto._id === linea.producto._id);
      return actual && actual.stock > 0 ? [{ producto: actual, cantidad: Math.min(linea.cantidad, actual.stock) }] : [];
    }));
  }
  private guardar(lineas: LineaCarrito[]) {
    this.lineas.next(lineas);
    try { localStorage.setItem('betimeco-carrito', JSON.stringify(lineas)); } catch { /* El carrito sigue disponible durante esta sesión. */ }
  }
}
