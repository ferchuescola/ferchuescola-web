# Ferchu Escola – sitio web

Sitio estático (HTML, CSS y JavaScript, sin WordPress). Se publica en Cloudflare desde este repositorio:
cada vez que se sube un cambio a GitHub, Cloudflare lo publica solo.

## Qué hay en cada archivo (carpeta `public/`)

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Estructura de la página |
| `style.css` | Colores, tipografías y diseño |
| `i18n.js` | **Todos los textos** en español e inglés |
| `works.json` | **Lista de trabajos** de la galería |
| `media.json` | Notas en medios |
| `clients.json` | Clientes |
| `config.js` | Mail, WhatsApp, redes, enlace del libro y del formulario |
| `images/` | Imágenes (`works/` para trabajos, `arte/` para las obras premium) |

## Agregar un trabajo nuevo

1. Subí la imagen a `public/images/works/` (mejor en JPG o WebP, de hasta 1600 px de ancho).
2. Abrí `public/works.json`, copiá un bloque `{ ... }` existente, pegalo y cambiá `id`, `category`, `image`, `title` y `desc` (en español y en inglés).
   `category` puede ser: `vectors`, `marquees`, `logos` o `mixed`. `accent` puede ser `pink`, `cyan` o `yellow`.
3. Guardá ("Commit changes"). En un minuto está publicado.

## Obras premium (arte digital)

Subí `family-game.jpg` y `gamecube.jpg` a `public/images/arte/`. Para el antes/después, `antes.jpg` y `despues.jpg` en `public/images/`. La tapa del libro va en `public/images/libro-tapa.jpg`.

## Formulario de contacto

Hasta que se configure un servicio, el botón "Enviar" abre el correo del visitante con el mensaje armado hacia ferchucorel@gmail.com.
Para que los mensajes lleguen directo: creá una cuenta gratis en formspree.io, creá un formulario con tu mail y pegá la dirección que te dan en `formEndpoint` dentro de `config.js`.

## Probar en tu compu

Abrí una terminal en la carpeta `public` y ejecutá `python3 -m http.server 8000`, después entrá a http://localhost:8000.
