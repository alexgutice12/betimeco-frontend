# BeTimeCo · Frontend Angular

Catálogo de relojes conectado al backend de BeTimeCo en MongoDB Atlas. Incluye registro, login, detalle de las tarjetas, CRUD de productos propios y carrito.

## Ejecutarlo

Primero enciende el backend en su carpeta con `npm.cmd run dev`. Después, en esta carpeta:

```powershell
npm.cmd install
npm.cmd start
```

Abre http://localhost:4200. El backend debe responder en http://localhost:3000/api/estado. La dirección de la API se configura en `src/app/utils/api.ts`. Si los paquetes ya están instalados, omite la instalación.

En el equipo de Alex la carpeta de trabajo es `G:\Mi unidad\BIT Bootcamp Desarrollo Web Full Stack\betimeco-frontend`. Se utilizó una copia local para instalar y compilar, porque npm produjo errores de escritura en la unidad virtual de Drive. El código y los paquetes comprobados se copiaron a la carpeta del curso.

## Estructura del profesor

```text
src/app/
  guards/auth.guard.ts
  interfaces/user.ts
  interfaces/product.ts
  pages/catalog/
  pages/register/
  pages/login/
  pages/products/
  pages/cart/
  services/auth.service.ts
  services/product.service.ts
  services/cart.service.ts
  shared/navbar/
  shared/product-detail/
  utils/api.ts
  utils/errores.ts
  app.routes.ts
  app.config.ts
```

Las páginas muestran información; los servicios se comunican con la API usando HttpClient; las interfaces definen los datos. FormBuilder y Validators controlan los formularios. Los errores de express-validator se muestran junto a los campos. El guard redirige a login cuando falta la sesión; el backend comprueba el JWT y el propietario en cada operación protegida.

El proyecto utiliza Angular 22 con formularios reactivos y la organización de clase. Se eligió una versión mantenida en lugar de las dependencias antiguas del ejemplo. Se usa detección de cambios explícita al completar las consultas HTTP para actualizar las vistas.

## Qué puedes mostrar

1. Portada original de HTML y CSS, con sus seis relojes destacados leídos de MongoDB y todas sus secciones.
2. Clic en un reloj: el servicio consulta su detalle por ID y abre un diálogo.
3. Registro con validaciones y login con JWT guardado en sessionStorage.
4. Mis productos: crear, editar nombre, descripción, precio, stock, categoría e imagen, y eliminar con confirmación.
5. Carrito: añadir, cambiar cantidades, quitar y calcular total en COP. Al abrirlo, se actualizan los precios y existencias desde la API. No se realizan pagos ni reservas.
6. Menú y disposición adaptados a móvil.

La colección pública muestra los productos de todas las cuentas. Cada cuenta administra sólo sus propios productos. El listado tiene un máximo de 200 registros en esta versión académica.

## Comprobar la compilación

```powershell
npm.cmd run build
```

El resultado queda en `dist/betimeco-frontend/browser`. No contiene el backend: para usar la aplicación sigue siendo necesario ejecutar la API. Esta entrega no incluye despliegue público.

Para mostrar una compilación ya preparada puedes usar `npm.cmd run preview` en lugar de `npm.cmd start`. Este servidor usa únicamente Node y facilita la demostración desde Google Drive. Si descargaste el repositorio, primero debes ejecutar `npm.cmd install` y `npm.cmd run build`, porque dist no se guarda en Git.

## Recursos y autoría

Se reutilizaron las imágenes y logotipos del proyecto HTML y CSS de BeTimeCo de Alex. El desarrollo se realizó con asistencia de Codex; debe revisarse y explicarse respetando la exigencia de escritura manual del profesor.
