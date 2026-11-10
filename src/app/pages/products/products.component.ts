import { finalize } from "rxjs";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Product, DatosProducto } from "../../interfaces/product";
import { ProductService } from "../../services/product.service";
import { mensajeError, errorCampo } from "../../utils/errores";
@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: "app-products",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./products.component.html",
})
export class ProductsComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private servicio = inject(ProductService);
  productos: Product[] = [];
  editando: string | null = null;
  eliminarPendiente: Product | null = null;
  error = "";
  aviso = "";
  cargando = true;
  guardando = false;
  eliminando = false;
  errorCampo = errorCampo;
  categorias = ["Deportivo", "Clásico", "Urbano", "Elegante"];
  imagenes = [
    "reloj-hexa-negro.jpg",
    "reloj-hexa-naranja.jpg",
    "reloj-hexa-plateado.jpg",
    "reloj-kripton-rose.jpg",
    "reloj-gear-negro.jpg",
    "reloj-noa-aqua.jpg",
    "reloj-drakon-verde.jpg",
    "reloj-hexa-rojo.jpg",
    "reloj-skmei-naranja.jpg",
  ];
  form = this.fb.nonNullable.group({
    nombre: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    descripcion: [
      "",
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1500),
      ],
    ],
    precio: [
      189900,
      [Validators.required, Validators.min(1), Validators.max(100000000)],
    ],
    stock: [
      1,
      [
        Validators.required,
        Validators.min(0),
        Validators.max(100000),
        Validators.pattern(/^\d+$/),
      ],
    ],
    categoria: ["Deportivo", Validators.required],
    imagen: ["/img/reloj-hexa-negro.jpg", Validators.required],
  });
  ngOnInit() {
    this.cargar();
  }
  cargar() {
    this.cargando = true;
    this.servicio
      .propios()
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
  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.guardando = true;
    this.error = "";
    this.aviso = "";
    const datos: DatosProducto = this.form.getRawValue();
    const operacion = this.editando
      ? this.servicio.actualizar(this.editando, datos)
      : this.servicio.crear(datos);
    const estabaEditando = Boolean(this.editando);
    operacion.pipe(finalize(() => this.cdr.markForCheck())).subscribe({
      next: () => {
        this.guardando = false;
        this.cancelar();
        this.aviso = estabaEditando
          ? "Cambios guardados."
          : "Producto publicado en la colección.";
        this.cargar();
      },
      error: (error) => {
        this.guardando = false;
        this.error = mensajeError(error, this.form);
      },
    });
  }
  editar(producto: Product) {
    this.editando = producto._id;
    this.error = "";
    this.aviso = "";
    this.form.reset({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      categoria: producto.categoria,
      imagen: producto.imagen,
    });
    document.getElementById("product-name")?.focus();
  }
  cancelar() {
    this.editando = null;
    this.form.reset({
      nombre: "",
      descripcion: "",
      precio: 189900,
      stock: 1,
      categoria: "Deportivo",
      imagen: "/img/reloj-hexa-negro.jpg",
    });
  }
  confirmarEliminar() {
    if (!this.eliminarPendiente) return;
    const id = this.eliminarPendiente._id;
    this.eliminando = true;
    this.error = "";
    this.servicio
      .eliminar(id)
      .pipe(finalize(() => this.cdr.markForCheck()))
      .subscribe({
        next: () => {
          this.eliminando = false;
          this.eliminarPendiente = null;
          if (this.editando === id) this.cancelar();
          this.aviso = "Producto eliminado.";
          this.cargar();
        },
        error: (error) => {
          this.eliminando = false;
          this.eliminarPendiente = null;
          this.error = mensajeError(error);
        },
      });
  }
}
