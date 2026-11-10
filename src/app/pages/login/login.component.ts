import { finalize } from "rxjs";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { errorCampo, mensajeError } from "../../utils/errores";
@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: "app-login",
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  form = this.fb.nonNullable.group({
    email: [
      "",
      [Validators.required, Validators.email, Validators.maxLength(254)],
    ],
    password: ["", Validators.required],
  });
  cargando = false;
  error = "";
  errorCampo = errorCampo;
  aviso = this.route.snapshot.queryParamMap.has("sesion")
    ? "Tu sesión venció. Ingresa de nuevo."
    : this.route.snapshot.queryParamMap.has("registro")
      ? "Cuenta creada. Ya puedes ingresar."
      : "";
  ingresar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.cargando = true;
    this.error = "";
    this.auth
      .login(this.form.getRawValue())
      .pipe(finalize(() => this.cdr.markForCheck()))
      .subscribe({
        next: () => {
          this.cargando = false;
          void this.router.navigate(["/mis-productos"]);
        },
        error: (error) => {
          this.cargando = false;
          this.error = mensajeError(error, this.form);
        },
      });
  }
}
