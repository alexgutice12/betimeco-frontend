# BeTimeCo · Frontend Angular

Catálogo de relojes conectado al backend de BeTimeCo en MongoDB Atlas. Incluye registro, login, detalle de las tarjetas, CRUD de productos propios y carrito.

## Ejecutarlo

Con el backend en ejecución en el puerto 3000, instala las dependencias e inicia Angular:

```powershell
npm.cmd install
npm.cmd start
```

Abre http://localhost:4200. El backend debe responder en http://localhost:3000/api/estado. La dirección de la API se configura en `src/app/utils/api.ts`. Si los paquetes ya están instalados, omite la instalación.

## Organización

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

El proyecto utiliza Angular 22, TypeScript y formularios reactivos.

## Funcionalidades

1. Portada original de HTML y CSS, con sus seis relojes destacados leídos de MongoDB y todas sus secciones.
2. Consulta del detalle de cada reloj por ID en un diálogo.
3. Registro con validaciones y login con JWT guardado en sessionStorage.
4. Mis productos: crear, editar nombre, descripción, precio, stock, categoría e imagen, y eliminar con confirmación.
5. Carrito: añadir, cambiar cantidades, quitar y calcular total en COP. Al abrirlo, se actualizan los precios y existencias desde la API. No se realizan pagos ni reservas.
6. Menú y disposición adaptados a móvil.
7. Formulario de contacto conectado a MongoDB, con validaciones, estado de envío y confirmación después de guardar el mensaje.

La API permite consultar hasta 200 productos. La portada selecciona los seis modelos destacados del diseño original. Cada cuenta administra sólo sus propios productos en «Mis productos».

## Comprobar la compilación

```powershell
npm.cmd run build
```

El resultado queda en `dist/betimeco-frontend/browser`. No contiene el backend: para usar la aplicación sigue siendo necesario ejecutar la API. Esta entrega no incluye despliegue público.

Para servir la compilación localmente:

```powershell
npm.cmd run preview
```

Este comando requiere una compilación previa. La carpeta `dist` no se guarda en Git.

## Créditos

Las imágenes, logotipos y el diseño corresponden al proyecto original de HTML y CSS de BeTimeCo.

Desarrollo con asistencia de Codex.
