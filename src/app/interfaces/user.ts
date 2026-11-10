export interface User { id: string; nombre: string; email: string; }
export interface Credenciales { email: string; password: string; }
export interface Registro extends Credenciales { nombre: string; }
export interface Sesion { token: string; usuario: User; }
