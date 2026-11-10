import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { HttpErrorResponse, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { apiUrl } from './utils/api';
const sesionInterceptor: HttpInterceptorFn = (peticion, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.token();
  const protegida = peticion.url.startsWith(apiUrl + '/') && Boolean(token) && !/\/auth\/(login|registrar)$/.test(peticion.url);
  return next(protegida ? peticion.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : peticion).pipe(catchError((error: HttpErrorResponse) => {
    if (error.status === 401 && protegida) { auth.logout(); void router.navigate(['/login'], { queryParams: { sesion: 'vencida' } }); }
    return throwError(() => error);
  }));
};
export const appConfig: ApplicationConfig = { providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' })), provideHttpClient(withInterceptors([sesionInterceptor]))] };
