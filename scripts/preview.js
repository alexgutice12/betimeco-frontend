const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const carpeta = path.resolve(__dirname, '../dist/betimeco-frontend/browser');
const tipos = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' };

const servidor = http.createServer(async (peticion, respuesta) => {
  if (peticion.method !== 'GET' && peticion.method !== 'HEAD') { respuesta.writeHead(405); respuesta.end(); return; }
  try {
    const ruta = decodeURIComponent(new URL(peticion.url, 'http://localhost').pathname);
    const archivo = path.resolve(carpeta, '.' + ruta);
    if (archivo !== carpeta && !archivo.startsWith(carpeta + path.sep)) { respuesta.writeHead(403); respuesta.end(); return; }
    let destino = archivo;
    try { if (!(await fs.stat(destino)).isFile()) destino = path.join(carpeta, 'index.html'); }
    catch { if (path.extname(ruta)) { respuesta.writeHead(404); respuesta.end(); return; } destino = path.join(carpeta, 'index.html'); }
    const contenido = await fs.readFile(destino);
    respuesta.writeHead(200, { 'Content-Type': tipos[path.extname(destino)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    respuesta.end(peticion.method === 'HEAD' ? undefined : contenido);
  } catch { respuesta.writeHead(400); respuesta.end('No fue posible abrir la página'); }
});

fs.access(path.join(carpeta, 'index.html')).then(() => {
  servidor.listen(Number(process.env.PORT || 4200), '127.0.0.1', () => console.log('BeTimeCo: http://localhost:' + (process.env.PORT || 4200)));
}).catch(() => { console.error('Primero ejecuta npm.cmd run build'); process.exitCode = 1; });
servidor.on('error', error => { console.error(error.code === 'EADDRINUSE' ? 'El puerto ya está ocupado' : 'No fue posible iniciar la vista previa'); process.exitCode = 1; });
