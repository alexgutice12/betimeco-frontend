import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
export function mensajeError(
  error: HttpErrorResponse,
  formulario?: FormGroup,
): string {
  if (formulario && Array.isArray(error.error?.errors)) {
    for (const detalle of error.error.errors) {
      const control = formulario.get(detalle.path);
      if (control) {
        control.setErrors({ servidor: detalle.msg });
        control.markAsTouched();
      }
    }
  }
  if (error.status === 0)
    return "No podemos conectar con el servidor. Comprueba que el backend esté encendido.";
  return (
    error.error?.msg ||
    "No fue posible completar la operación. Inténtalo de nuevo."
  );
}
export function errorCampo(formulario: FormGroup, campo: string): string {
  const control = formulario.get(campo);
  if (!control?.touched || !control.errors) return "";
  if (control.hasError("servidor")) return control.getError("servidor");
  if (control.hasError("required")) return "Completa este campo.";
  if (control.hasError("email")) return "Escribe un correo válido.";
  if (control.hasError("minlength"))
    return `Usa al menos ${control.getError("minlength").requiredLength} caracteres.`;
  if (control.hasError("maxlength")) return "El texto es demasiado largo.";
  if (control.hasError("min")) return "El valor es menor al permitido.";
  if (control.hasError("max")) return "El valor supera el máximo permitido.";
  if (control.hasError("pattern")) return "Revisa el formato indicado.";
  return "Revisa este campo.";
}
