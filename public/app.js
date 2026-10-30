(function () {
  'use strict';
  var T = window.I18N, S = window.SITE || {};
  var lang = 'es', filter = 'all', caseId = null, artView = {};
  var sacoa = [], works = [], casos = [], arte = [], media = [], clients = [];

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function pick(obj) { return obj && (obj[lang] || obj.es) || ''; }
  function t(key) { return (T[lang] && T[lang][key]) || T.es[key] || ''; }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }
  function clear(n) { while (n.firstChild) n.removeChild(n.firstChild); }

  // Ampliar imagen
  function zoom(src, caption) {
    var d = document.getElementById('lightbox'); if (!d || !d.showModal) { window.open(src, '_blank'); return; }
    d.querySelector('img').src = src; d.querySelector('img').alt = caption || '';
    d.querySelector('p').textContent = caption || '';
    d.querySelector('button').textContent = t('close');
    d.showModal();
  }
  function zoomable(img, caption, full) {
    img.tabIndex = 0; img.setAttribute('role', 'button');
    img.addEventListener('click', function () { zoom(full || img.getAttribute('src'), caption); });
    img.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); zoom(full || img.getAttribute('src'), caption); } });
  }

  function applyLang(l) {
    lang = T[l] ? l : 'es';
    document.documentElement.lang = lang;
    var bt = document.body.getAttribute('data-title') || 'meta';
    document.title = t(bt + '.title');
    var d = document.querySelector('meta[name="description"]'); if (d) d.setAttribute('content', t(bt + '.desc'));
    document.querySelectorAll('[data-i18n]').forEach(function (n) { n.textContent = t(n.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (n) { n.setAttribute('alt', t(n.getAttribute('data-i18n-alt'))); });
    document.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false'); });
    store('lang', lang);
    renderWorks(); renderSacoa(); renderCases(); renderArt(); renderMedia(); renderClients();
  }

  // Trabajos: si la imagen existe se muestra; si no, queda el marcador gris.
  function workFig(w) {
    var f = el('figure', 'work a-' + (w.accent || 'pink'));
    var ph = el('div', 'ph');
    var img = el('img'); img.alt = pick(w.title); img.hidden = true;
    var label = el('span', 'mono ph-label', '[' + pick(w.title) + ']');
    ph.appendChild(img); ph.appendChild(label);
    img.onload = function () {
      img.hidden = false; ph.classList.add('has-img');
      if (w.category === 'logos') ph.classList.add('is-logo');
      if (/\/logos\//.test(w.image) || w.transparent) ph.classList.add('is-png');
      if (img.naturalWidth && img.naturalHeight) f.style.setProperty('--r', (img.naturalWidth / img.naturalHeight).toFixed(3));
      zoomable(img, pick(w.title) + ' · ' + pick(w.desc), w.full);
    };
    img.onerror = function () { label.textContent = '[' + pick(w.title) + '] ' + w.image + ' (no se pudo cargar)'; };
    img.src = w.image;
    var c = el('figcaption'); c.appendChild(el('strong', '', pick(w.title))); c.appendChild(el('span', '', pick(w.desc)));
    f.appendChild(ph); f.appendChild(c); return f;
  }
  var ORDER = ['vectors', 'marquees', 'logos', 'tablet', 'flyers', 'mixed'], PREVIEW = { vectors: 3, marquees: 2, logos: 4, tablet: 3, flyers: 4, mixed: 3 };
  function setFilter(f) {
    filter = f;
    document.querySelectorAll('[data-filter]').forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-filter') === f ? 'true' : 'false'); });
    renderWorks();
  }
  function renderWorks() {
    var grid = document.getElementById('works-grid'); if (!grid) return;
    clear(grid);
    var list = works.filter(function (w) { return filter === 'all' || w.category === filter || w.client === filter; });
    var groups = filter === 'all' ? ORDER : [filter];
    groups.forEach(function (cat) {
      var items = filter === 'all' ? list.filter(function (w) { return w.category === cat; }) : list;
      if (!items.length) return;
      var sec = el('section', 'work-group');
      if (filter === 'all') {
        var head = el('div', 'work-group-head'); head.appendChild(el('h3', '', t('filter.' + cat)));
        if (items.length > PREVIEW[cat]) {
          var more = el('button', 'more-btn', t('works.seeAll') + ' (' + items.length + ') →'); more.type = 'button';
          more.addEventListener('click', function () { setFilter(cat); document.getElementById('trabajos').scrollIntoView(); });
          head.appendChild(more);
        }
        sec.appendChild(head);
        items = items.slice(0, PREVIEW[cat]);
      }
      if (cat === 'logos' || filter === 'logos') sec.appendChild(el('p', 'mono note', t('logos.note')));
      var row = el('div', 'tgrid tg-' + cat); items.forEach(function (w) { row.appendChild(workFig(w)); });
      sec.appendChild(row); grid.appendChild(sec);
    });
  }
  function renderSacoa() {
    document.querySelectorAll('[data-sacoa-group]').forEach(function (g) {
      clear(g); var k = g.getAttribute('data-sacoa-group');
      sacoa.filter(function (w) { return w.group === k; }).forEach(function (w) { g.appendChild(workFig(w)); });
    });
  }

  // Antes / después
  function renderCases() {
    var tabs = document.getElementById('ba-tabs'), panels = document.getElementById('ba-panels'); if (!tabs || !panels || !casos.length) return;
    if (!caseId) caseId = casos[0].id;
    clear(tabs); clear(panels);
    casos.forEach(function (c) {
      var b = el('button', '', pick(c.title)); b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', c.id === caseId ? 'true' : 'false');
      b.addEventListener('click', function () { caseId = c.id; renderCases(); });
      tabs.appendChild(b);
    });
    var cur = casos.filter(function (c) { return c.id === caseId; })[0];
    [['before', 'ba.before', ''], ['after', 'ba.after', ' is-after'], ['outline', 'ba.outline', ' is-outline']].forEach(function (p) {
      if (!cur[p[0]]) return;
      var fig = el('figure', 'ba-panel' + p[2]); var img = el('img'); img.src = cur[p[0]]; img.alt = pick(cur.title) + ' · ' + t(p[1]); img.loading = 'lazy';
      zoomable(img, pick(cur.title) + ' · ' + t(p[1]));
      fig.appendChild(img); fig.appendChild(el('figcaption', '', t(p[1])));
      panels.appendChild(fig);
    });
  }

  // Arte digital (con vistas: obra / detalle / contornos / foto de referencia)
  function renderArt() {
    var list = document.getElementById('art-list'); if (!list) return; clear(list);
    arte.forEach(function (a) {
      var cur = artView[a.id] || a.views[0].key;
      var view = a.views.filter(function (v) { return v.key === cur; })[0] || a.views[0];
      var fig = el('figure', 'art-piece a-' + (a.accent || 'pink')); fig.style.margin = '0';
      var img = el('img', 'art-img'); img.src = view.image; img.alt = pick(a.title) + ' · ' + t('art.view.' + view.key); img.loading = 'lazy';
      zoomable(img, pick(a.title) + ' · ' + t('art.view.' + view.key));
      fig.appendChild(img);
      var meta = el('div', 'art-meta'); var left = el('div');
      left.appendChild(el('h3', '', pick(a.title))); left.appendChild(el('p', '', pick(a.desc)));
      if (a.size) left.appendChild(el('p', 'mono', t('art.size') + ': ' + pick(a.size)));
      var chips = el('div', 'chips'); chips.style.marginBottom = '0';
      a.views.forEach(function (v) {
        var b = el('button', '', t('art.view.' + v.key)); b.type = 'button'; b.setAttribute('aria-pressed', v.key === view.key ? 'true' : 'false');
        b.addEventListener('click', function () { artView[a.id] = v.key; renderArt(); });
        chips.appendChild(b);
      });
      meta.appendChild(left); meta.appendChild(chips); fig.appendChild(meta);
      list.appendChild(fig);
    });
  }

  function renderMedia() {
    var g = document.getElementById('media-grid'); if (!g) return; clear(g);
    media.forEach(function (m) {
      var node = m.url ? el('a', 'media-item') : el('div', 'media-item');
      if (m.url) { node.href = m.url; node.target = '_blank'; node.rel = 'noopener'; }
      if (m.image) { node.classList.add('has-photo'); if (m.fit === 'contain') node.classList.add('fit-contain'); var pic = el('img'); pic.src = m.image; pic.alt = ''; pic.loading = 'lazy'; node.appendChild(pic); }
      var inner = el('span', '', m.outlet);
      var ttl = pick(m.title); if (ttl) inner.appendChild(el('small', '', ttl));
      node.appendChild(inner); g.appendChild(node);
    });
  }

  function renderClients() {
    var g = document.getElementById('clients-grid'); if (!g) return; clear(g);
    clients.forEach(function (c) {
      var n = el('div', 'logo-item');
      if (c.logo) { var i = el('img'); i.src = c.logo; i.alt = c.name; n.appendChild(i); } else { n.textContent = c.name; }
      if (c.page) { var a = el('a', 'logo-item'); a.href = c.page; a.title = c.name; while (n.firstChild) a.appendChild(n.firstChild); g.appendChild(a); return; }
      g.appendChild(n);
    });
  }

  function load(url) { return fetch(url).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; }); }

  function setupLinks() {
    var set = function (id, href) { var a = document.getElementById(id); if (!a) return; if (href) { a.href = href; a.hidden = false; } };
    set('link-wa', 'https://wa.me/' + S.whatsapp);
    var wa = document.getElementById('link-wa'); if (wa) wa.textContent = 'WhatsApp · ' + (S.whatsappLabel || '');
    set('link-in', S.linkedin); set('link-ig', S.instagram); set('link-ig2', S.instagramDesigns);
    set('link-yt', S.youtube); set('link-tree', S.linktree); set('link-griyo', S.griyo); set('link-x', S.x); set('link-museo', S.museoRetro); set('link-pod', S.podcast);
    var b = document.getElementById('book-link'); if (b && S.bookUrl) { b.href = S.bookUrl; b.target = '_blank'; b.rel = 'noopener'; }
    var by = document.getElementById('book-buy'); if (by && S.bookBuyUrl) { by.href = S.bookBuyUrl; by.target = '_blank'; by.rel = 'noopener'; by.hidden = false; }
  }

  function setupForm() {
    var form = document.getElementById('contact-form'), status = document.getElementById('form-status'); if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = new FormData(form);
      if (data.get('_gotcha')) return;
      if (!S.formEndpoint) {
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
    document.querySelectorAll('[data-filter]').forEach(function (b) { b.addEventListener('click', function () { setFilter(b.getAttribute('data-filter')); }); });
    var lb = document.getElementById('lightbox');
    if (lb) { lb.querySelector('button').addEventListener('click', function () { lb.close(); }); lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); }); }
    var cover = document.querySelector('.book-cover img'); if (cover) { var tst = new Image(); tst.onload = function () { cover.hidden = false; cover.parentNode.classList.add('has-img'); }; tst.src = cover.getAttribute('src'); }

    setupLinks(); setupForm();
    Promise.all([load('sacoa.json'), load('works.json'), load('casos.json'), load('arte.json'), load('media.json'), load('clients.json')]).then(function (r) {
      sacoa = r[0]; works = r[1]; casos = r[2]; arte = r[3]; media = r[4]; clients = r[5]; applyLang(start);
    });
  });
})();
