export interface Product {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagen: string;
  usuario: string;
}
export type DatosProducto = Omit<Product, "_id" | "usuario">;
