import { finalize } from "rxjs";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { Contacto } from "../../interfaces/contacto";
import { ContactService } from "../../services/contact.service";
import { Product } from "../../interfaces/product";
import { ProductService } from "../../services/product.service";
import { CartService } from "../../services/cart.service";
import { ProductDetailComponent } from "../../shared/product-detail/product-detail.component";
import { errorCampo, mensajeError } from "../../utils/errores";
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
  private contactoServicio = inject(ContactService);
  productos: Product[] = [];
  seleccionado: Product | null = null;
  cargando = true;
  error = "";
  aviso = "";
  buscandoDetalle = false;
  contacto: Contacto = { nombre: "", correo: "", mensaje: "" };
  mensajeContacto = "";
  errorContacto = "";
  enviandoContacto = false;
  errorCampo = errorCampo;
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
  enviarContacto(formulario: NgForm) {
    if (this.enviandoContacto) return;
    this.mensajeContacto = "";
    this.errorContacto = "";
    if (formulario.invalid) {
      formulario.form.markAllAsTouched();
      return;
    }
    this.enviandoContacto = true;
    this.contactoServicio.enviar(this.contacto)
      .pipe(finalize(() => {
        this.enviandoContacto = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: (respuesta) => {
          this.mensajeContacto = respuesta.msg;
          formulario.resetForm({ nombre: "", correo: "", mensaje: "" });
        },
        error: (error) => {
          this.errorContacto = mensajeError(error, formulario.form);
        },
      });
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
