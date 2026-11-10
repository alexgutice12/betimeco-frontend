import { finalize } from "rxjs";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Product } from "../../interfaces/product";
import { ProductService } from "../../services/product.service";
import { CartService } from "../../services/cart.service";
import { ProductDetailComponent } from "../../shared/product-detail/product-detail.component";
import { mensajeError } from "../../utils/errores";
@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: "app-catalog",
  imports: [CommonModule, FormsModule, ProductDetailComponent],
  templateUrl: "./catalog.component.html",
  styleUrl: "./catalog.component.css",
})
export class CatalogComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private servicio = inject(ProductService);
  private cart = inject(CartService);
  productos: Product[] = [];
  seleccionado: Product | null = null;
  cargando = true;
  error = "";
  aviso = "";
  buscandoDetalle = false;
  contacto = { nombre: "", correo: "", mensaje: "" };
  mensajeContacto = "";
  get destacados() {
    const orden = [
      "Hexa Black",
      "Hexa Orange",
      "Hexa Silver",
      "Kripton Rose",
      "Noa Aqua",
      "Drakon Green",
    ];
    return orden.flatMap((nombre) => {
      const producto = this.productos.find((item) => item.nombre === nombre);
      return producto ? [producto] : [];
    });
  }
  enviarContacto() {
    this.mensajeContacto =
      "Gracias, " +
      this.contacto.nombre.trim() +
      ". Este formulario es una demostración; no se ha enviado ningún mensaje.";
  }
  ngOnInit() {
    this.cargar();
  }
  cargar() {
    this.cargando = true;
    this.error = "";
    this.servicio
      .listar()
      .pipe(finalize(() => this.cdr.markForCheck()))
      .subscribe({
        next: (productos) => {
          this.productos = productos;
          this.cargando = false;
        },
        error: (error) => {
          this.error = mensajeError(error);
          this.cargando = false;
        },
      });
  }
  detalle(id: string) {
    this.error = "";
    this.buscandoDetalle = true;
    this.servicio
      .detalle(id)
      .pipe(finalize(() => this.cdr.markForCheck()))
      .subscribe({
        next: (producto) => {
          this.seleccionado = producto;
          this.buscandoDetalle = false;
        },
        error: (error) => {
          this.error = mensajeError(error);
          this.buscandoDetalle = false;
        },
      });
  }
  agregar(producto: Product) {
    this.aviso = this.cart.agregar(producto)
      ? `${producto.nombre} añadido al carrito.`
      : "Ya tienes en el carrito todas las unidades disponibles.";
    this.seleccionado = null;
  }
}
