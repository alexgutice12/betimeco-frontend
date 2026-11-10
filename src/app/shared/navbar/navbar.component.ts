import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CartService } from "../../services/cart.service";
@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: "app-navbar",
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent {
  auth = inject(AuthService);
  cart = inject(CartService);
  private router = inject(Router);
  abierto = false;
  salir() {
    this.auth.logout();
    this.abierto = false;
    void this.router.navigate(["/"]);
  }
}
