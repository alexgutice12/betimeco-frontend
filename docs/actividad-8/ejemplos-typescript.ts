// Actividad 8 - Ejemplos fundamentales para practicar
// Los fragmentos de Angular están explicados en el documento Word.

// Ejemplo 1
const nombre: string = 'Hexa Black';
const precio: number = 189900;
// precio = 'económico'; // TypeScript señala un error de tipo.
console.log(nombre, precio);

// Ejemplo 2
let cantidad: number = 2;
cantidad = 3;
const marca = 'BeTimeCo'; // Se infiere el tipo del valor.
const precios: number[] = [189900, 194900];
precios.push(199900);

// Ejemplo 3
const disponible: boolean = true;
let seleccionado: string | null = null;
seleccionado = 'Hexa Black';
type Estado = 'cargando' | 'listo' | 'error';
let estado: Estado = 'listo';

// Ejemplo 4
function mostrarPrecio(valor: number | null): string {
  if (valor === null) return 'Precio no disponible';
  return '$' + valor.toFixed(0);
}

// Ejemplo 5
const dato: unknown = 'BeTimeCo';
if (typeof dato === 'string') console.log(dato.toUpperCase());

// Ejemplo 6
interface Reloj {
  readonly id: string;
  nombre: string;
  precio: number;
  stock: number;
  descripcion?: string;
}
const reloj: Reloj = {
  id: 'hexa-black', nombre: 'Hexa Black',
  precio: 189900, stock: 8
};

// Ejemplo 7
const relojes: Reloj[] = [reloj];
const disponibles = relojes.filter(item => item.stock > 0);
const nombres = relojes.map(item => item.nombre);
const valorInventario = relojes.reduce(
  (total, item) => total + item.precio * item.stock, 0
);

// Ejemplo 8
type Categoria = 'Deportivo' | 'Clásico' | 'Urbano';
type RelojNuevo = Omit<Reloj, 'id'>;
type CambioDePrecio = Pick<Reloj, 'precio'>;
type Cambios = Partial<RelojNuevo>;

// Ejemplo 9
function calcularSubtotal(precio: number, cantidad: number): number {
  return precio * cantidad;
}
const subtotal = calcularSubtotal(189900, 2); // 379800
const sumar = (a: number, b: number): number => a + b;

function informar(mensaje: string): void {
  console.log(mensaje);
}

// Ejemplo 10
function calcularEnvio(total: number, costo = 12000): number {
  return total + costo;
}
function saludar(nombre?: string): string {
  return nombre ? 'Hola, ' + nombre : 'Hola';
}

// Ejemplo 11
function primero<T>(elementos: T[]): T | undefined {
  return elementos[0];
}
const primerNombre = primero<string>(['Hexa Black', 'Noa Aqua']);
const primerPrecio = primero<number>([189900, 129900]);

// Ejemplo 12
function fallar(mensaje: string): never {
  throw new Error(mensaje);
}

// Ejemplo 13
class Inventario {
  private unidades: number;
  constructor(unidadesIniciales: number) {
    this.unidades = unidadesIniciales;
  }
  hayDisponibilidad(cantidad: number): boolean {
    return cantidad > 0 && cantidad <= this.unidades;
  }
}
const inventario = new Inventario(8);
console.log(inventario.hayDisponibilidad(2)); // true

// Ejemplo 14
// interfaces/reloj.ts
export interface RelojBasico {
  nombre: string;
  precio: number;
}
// En otro archivo:
// import { RelojBasico } from './interfaces/reloj';

// Ejemplo 15
const referencia: [string, number] = ['Hexa Black', 189900];
enum EstadoPedido { Pendiente = 'pendiente', Enviado = 'enviado' }
const estadoPedido = EstadoPedido.Pendiente;

console.log('Subtotal de dos relojes:', subtotal);
console.log('Nombres disponibles:', nombres);
console.log('Valor del inventario:', valorInventario);
console.log('Primer nombre:', primerNombre);
