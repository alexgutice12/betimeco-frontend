import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DatosProducto, Product } from "../interfaces/product";
import { apiUrl } from "../utils/api";
@Injectable({ providedIn: "root" })
export class ProductService {
  private http = inject(HttpClient);
  listar() {
    return this.http.get<Product[]>(`${apiUrl}/product`);
  }
  propios() {
    return this.http.get<Product[]>(`${apiUrl}/product/mis-productos`);
  }
  detalle(id: string) {
    return this.http.get<Product>(`${apiUrl}/product/${id}`);
  }
  crear(datos: DatosProducto) {
    return this.http.post<Product>(`${apiUrl}/product`, datos);
  }
  actualizar(id: string, datos: DatosProducto) {
    return this.http.put<Product>(`${apiUrl}/product/${id}`, datos);
  }
  eliminar(id: string) {
    return this.http.delete<{ msg: string }>(`${apiUrl}/product/${id}`);
  }
}
