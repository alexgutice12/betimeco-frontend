import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { AuthService } from "./services/auth.service";
@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: "app-root",
  imports: [RouterOutlet, RouterLink, NavbarComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  constructor() {
    inject(AuthService).cargarPerfil();
  }
}
