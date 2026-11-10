import { finalize } from "rxjs";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { errorCampo, mensajeError } from "../../utils/errores";
@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: "app-register",
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./register.component.html",
})
export class RegisterComponent {
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  form = this.fb.nonNullable.group({
    nombre: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(80)],
    ],
    email: [
      "",
      [Validators.required, Validators.email, Validators.maxLength(254)],
    ],
    password: [
      "",
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/,
        ),
      ],
    ],
  });
  cargando = false;
  error = "";
  errorCampo = errorCampo;
  registrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.cargando = true;
    this.error = "";
    this.auth
      .registrar(this.form.getRawValue())
      .pipe(finalize(() => this.cdr.markForCheck()))
      .subscribe({
        next: () => {
          this.cargando = false;
          void this.router.navigate(["/login"], {
            queryParams: { registro: "creado" },
          });
        },
        error: (error) => {
          this.cargando = false;
          this.error = mensajeError(error, this.form);
        },
      });
  }
}
