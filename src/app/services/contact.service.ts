import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Contacto } from "../interfaces/contacto";
import { apiUrl } from "../utils/api";
@Injectable({ providedIn: "root" })
export class ContactService {
  private http = inject(HttpClient);
  enviar(datos: Contacto) {
    return this.http.post<{ msg: string }>(`${apiUrl}/contacto`, datos);
  }
}
