import { finalize } from "rxjs";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { CartService } from "../../services/cart.service";
import { ProductService } from "../../services/product.service";
import { mensajeError } from "../../utils/errores";
@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: "app-cart",
  imports: [CommonModule, RouterLink],
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  cart = inject(CartService);
  private productos = inject(ProductService);
  cargando = true;
  error = "";
  confirmarVaciar = false;
  ngOnInit() {
    this.productos
      .listar()
      .pipe(finalize(() => this.cdr.markForCheck()))
      .subscribe({
        next: (productos) => {
          this.cart.refrescar(productos);
          this.cargando = false;
        },
        error: (error) => {
          this.cargando = false;
          this.error = mensajeError(error);
        },
      });
  }
}
