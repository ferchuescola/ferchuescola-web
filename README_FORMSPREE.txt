FERCHU ESCOLA - FORMSPREE CONECTADO xbgdzngd

FORMULARIO CONECTADO A: https://formspree.io/f/xbgdzngd -> fjescola@gmail.com

CONTENIDO:
- index.html con formulario action=https://formspree.io/f/xbgdzngd
- Campos: name, email, tipo, message, _subject, _gotcha (honeypot)
- Contacto 100% editable en modo ADMIN (sin salto cursor)
- Escola 14px abajo, foto tilt 2.5deg
- Borrar recuadro entero con X, agregar con +

PARA SUBIR:
1. GitHub repo ferchuescola-web o Cloudflare Dashboard > Workers & Pages > ferchuescola-web > Add files via upload
2. Arrastra index.html + pattern.jpg + foto_portada_web_5.png + wrangler.toml
3. Commit / Deploy
4. Probá en ferchuescola-web.fjescola.workers.dev/contacto -> llena form -> te llega a fjescola@gmail.com

ANTISPAM:
- Formspree trae captcha invisible + honeypot _gotcha
- Si llega spam, podes activar en Formspree Dashboard > Form xbgdzngd > Settings > reCAPTCHA

No necesitas configurar Worker ni variables.
