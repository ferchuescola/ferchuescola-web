# Ferchu Escola - BASE FINAL BLOQUEADA
Aprobado: diseño ARCADE WORKSHOP fusion (captura que enviaste)
- Tipografia FERCHU ESCOLA achicada: clamp(48px, 8vw, 88px) -> no se parte en 3 en mobile
- Foto vertical 3:4 (foto_portada_web_5.png) - se ve tu cara
- Pattern pattern.jpg al 60% + grid cuadriculada 9% conviviendo (ambos visibles)
- Puntos offset CMYK restaurados + nodos solo Corel (sin diamantes Illustrator)
- Full scroll + plantillas internas /trabajos/:slug /vectores/:slug /libro etc

## Que incluye
- index.html = tu web completa (esta que aprobaste)
- src/App.tsx = codigo fuente React para editar incremental (no rediseñar)
- assets/pattern.jpg y assets/foto_portada_web_5.png

## Deploy Cloudflare Pages (como tenes cuentas)
1. GitHub: nuevo repo ferchu-escola-site -> subir index.html y assets/
2. Cloudflare Pages: New Project -> Connect to Git -> seleccionar repo
3. Build: Framework preset = None, Build command = (vacio), Output dir = /
4. Deploy -> te da *.pages.dev
5. Custom domain -> ferchuescola.com

## Edicion futura (sin pedirme sitio nuevo)
- /admin -> panel Decap CMS
  - Badges: cada cuadradito (MORTAL KOMBAT, etc) tiene switch Mostrar/Ocultar
  - Trabajos: agregar/quitar, cambiar titulo, medidas, cliente
  - Pattern: cambiar opacidad 20/40/60% sin codigo
- ?edit=1 -> edicion directa clickeando texto

Las plantillas internas ya estan: al clickear una marquesina va a /trabajos/slug
Podes reemplazar placeholders con tus fotos reales desde /admin.

Este ZIP es la base bloqueada. De aca en mas solo edito incremental sobre este archivo.
