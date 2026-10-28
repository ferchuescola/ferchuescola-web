(function () {
  'use strict';
  var T = window.I18N, S = window.SITE || {};
  var lang = 'es', filter = 'all', works = [], media = [], clients = [];

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function pick(obj) { return obj && (obj[lang] || obj.es) || ''; }
  function t(key) { return (T[lang] && T[lang][key]) || T.es[key] || ''; }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }

  // Si la imagen existe se muestra; si no, queda el marcador gris.
  function useImage(img, box) {
    var test = new Image();
    test.onload = function () { img.hidden = false; box.classList.add('has-img'); };
    test.src = img.getAttribute('src');
  }

  function applyLang(l) {
    lang = T[l] ? l : 'es';
    document.documentElement.lang = lang;
    document.title = t('meta.title');
    var d = document.querySelector('meta[name="description"]'); if (d) d.setAttribute('content', t('meta.desc'));
    document.querySelectorAll('[data-i18n]').forEach(function (n) { n.textContent = t(n.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (n) { n.setAttribute('alt', t(n.getAttribute('data-i18n-alt'))); });
    document.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false'); });
    store('lang', lang);
    renderWorks(); renderMedia(); renderClients();
  }

  function renderWorks() {
    var grid = document.getElementById('works-grid'); if (!grid) return;
    grid.textContent = '';
    works.filter(function (w) { return filter === 'all' || w.category === filter; }).forEach(function (w) {
      var f = el('figure', 'work a-' + (w.accent || 'pink'));
      var ph = el('div', 'ph');
      var img = el('img'); img.alt = pick(w.title); img.src = w.image; img.loading = 'lazy'; img.hidden = true;
      ph.appendChild(img);
      ph.appendChild(el('span', 'mono ph-label', '[' + pick(w.title) + ']'));
      useImage(img, ph);
      var c = el('figcaption'); c.appendChild(el('strong', '', pick(w.title))); c.appendChild(el('span', '', pick(w.desc)));
      f.appendChild(ph); f.appendChild(c); grid.appendChild(f);
    });
  }

  function renderMedia() {
    var g = document.getElementById('media-grid'); if (!g) return; g.textContent = '';
    media.forEach(function (m) {
      var node = m.url ? el('a', 'media-item') : el('div', 'media-item');
      if (m.url) { node.href = m.url; node.target = '_blank'; node.rel = 'noopener'; }
      var inner = el('span', '', m.outlet);
      var ttl = pick(m.title); if (ttl) inner.appendChild(el('small', '', ttl));
      node.appendChild(inner); g.appendChild(node);
    });
  }

  function renderClients() {
    var g = document.getElementById('clients-grid'); if (!g) return; g.textContent = '';
    clients.forEach(function (c) {
      var n = el('div', 'logo-item');
      if (c.logo) { var i = el('img'); i.src = c.logo; i.alt = c.name; n.appendChild(i); } else { n.textContent = c.name; }
      g.appendChild(n);
    });
  }

  function load(url) { return fetch(url).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; }); }

  function setupLinks() {
    var set = function (id, href) { var a = document.getElementById(id); if (!a) return; if (href) { a.href = href; a.hidden = false; } else if (a.hasAttribute('hidden')) { a.hidden = true; } };
    set('link-wa', 'https://wa.me/' + S.whatsapp);
    var wa = document.getElementById('link-wa'); if (wa) wa.textContent = 'WhatsApp · ' + (S.whatsappLabel || '');
    set('link-in', S.linkedin); set('link-ig', S.instagram); set('link-ig2', S.instagramDesigns);
    set('link-yt', S.youtube); set('link-pod', S.podcast);
    var b = document.getElementById('book-link'); if (b && S.bookUrl) { b.href = S.bookUrl; b.target = '_blank'; b.rel = 'noopener'; }
  }

  function setupForm() {
    var form = document.getElementById('contact-form'), status = document.getElementById('form-status'); if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = new FormData(form);
      if (data.get('_gotcha')) return;
      if (!S.formEndpoint) { // Sin servicio configurado: abre el mail del visitante con el mensaje armado.
        var body = 'Nombre: ' + data.get('nombre') + '\nE-mail: ' + data.get('email') + '\nMotivo: ' + data.get('motivo') + '\n\n' + data.get('mensaje');
        window.location.href = 'mailto:' + S.email + '?subject=' + encodeURIComponent('Consulta web: ' + data.get('motivo')) + '&body=' + encodeURIComponent(body);
        return;
      }
      status.className = 'status'; status.textContent = t('form.sending');
      fetch(S.formEndpoint, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(); status.className = 'status ok'; status.textContent = t('form.ok'); form.reset(); })
        .catch(function () { status.className = 'status err'; status.textContent = t('form.err'); });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var q = (location.search.match(/[?&]lang=(es|en)/) || [])[1];
    var saved = store('lang');
    var start = q || saved || ((navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en');

    document.querySelectorAll('[data-lang]').forEach(function (b) { b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); }); });
    document.querySelectorAll('[data-filter]').forEach(function (b) {
      b.addEventListener('click', function () {
        filter = b.getAttribute('data-filter');
        document.querySelectorAll('[data-filter]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        renderWorks();
      });
    });
    [['ba-before'], ['ba-after'], ['art-1'], ['art-2']].forEach(function (p) { var box = document.getElementById(p[0]); var img = box && box.querySelector('img'); if (img) useImage(img, box); });
    var cover = document.querySelector('.book-cover img'); if (cover) useImage(cover, cover.parentNode);

    setupLinks(); setupForm();
    Promise.all([load('works.json'), load('media.json'), load('clients.json')]).then(function (r) {
      works = r[0]; media = r[1]; clients = r[2]; applyLang(start);
    });
  });
})();
