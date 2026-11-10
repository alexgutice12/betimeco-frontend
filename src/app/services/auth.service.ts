import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, tap } from "rxjs";
import { Credenciales, Registro, Sesion, User } from "../interfaces/user";
import { apiUrl } from "../utils/api";
@Injectable({ providedIn: "root" })
export class AuthService {
  private http = inject(HttpClient);
  private usuarioActual = new BehaviorSubject<User | null>(null);
  usuario$ = this.usuarioActual.asObservable();
  registrar(datos: Registro) {
    return this.http.post<{ msg: string; usuario: User }>(
      `${apiUrl}/auth/registrar`,
      datos,
    );
  }
  login(datos: Credenciales) {
    return this.http.post<Sesion>(`${apiUrl}/auth/login`, datos).pipe(
      tap((sesion) => {
        sessionStorage.setItem("token", sesion.token);
        this.usuarioActual.next(sesion.usuario);
      }),
    );
  }
  token(): string | null {
    return sessionStorage.getItem("token");
  }
  estaAutenticado(): boolean {
    const token = this.token();
    if (!token) return false;
    try {
      const datos = JSON.parse(
        atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
      );
      if (typeof datos.exp === "number" && datos.exp * 1000 > Date.now())
        return true;
    } catch {
      /* Una sesión incompleta debe volver al login. */
    }
    this.logout();
    return false;
  }
  cargarPerfil() {
    if (this.estaAutenticado())
      this.http.get<{ usuario: User }>(`${apiUrl}/auth/perfil`).subscribe({
        next: (datos) => this.usuarioActual.next(datos.usuario),
        error: () => this.logout(),
      });
  }
  logout() {
    sessionStorage.removeItem("token");
    this.usuarioActual.next(null);
  }
}
