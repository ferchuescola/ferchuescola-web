FERCHU ESCOLA WEB - Escola abajo + foto tilt

Contenido:
- index.html con:
  * Escola 14px mas abajo, rotacion -1.5deg
  * Foto inclinada 2.5deg, movida 8px derecha 12px abajo, sombra doble
  * Todo editable (FERCHU, ESCOLA, marquesinas, botones) sin salto de cursor
  * Borrar recuadro entero con X, agregar con + AGREGAR
  * Auto-translate ES->EN con diccionario
  * Modo ADMIN sin clave (click ADMIN)

Para publicar:
1. GitHub -> repo ferchuescola-web -> Add file -> Upload files
2. Arrastra index.html + pattern.jpg + foto_portada_web_5.png + wrangler.toml
3. Commit -> Cloudflare redeploya 30s en ferchuescola-web.fjescola.workers.dev
4. Luego en Cloudflare: ferchuescola.com apunta a ese deployment
