// ======================================================================
// Icon glyphs — a shared, build-less Global Kit helper (lib/). One file,
// two React-free globals:
//
//   GKIconGlyphs    the glyph-name CATALOG — the single source of truth for
//                   the set of glyph names the <Icon> component can render
//                   (Phosphor "regular"), parsed from the exact stylesheet
//                   the Icon links so it can't drift, fetched once + cached.
//
//   GKGlyphCombobox a reusable, dependency-free searchable icon PICKER that
//                   filters that catalog — mount it instead of forking your
//                   own (keyboard nav, per-option glyph preview, onChange).
//
// The picker reads the catalog from GKIconGlyphs (defined above it in this
// same file, so load order is never a concern). A consumer needs one tag:
//   <script src=".../lib/glyphs.js"></script>
//   GKGlyphCombobox.create({ mount, value, onChange });   // picker
//   GKIconGlyphs.loadGlyphs().then(names => …);            // catalog only
//
// Picker colours read the host panel's --panel-* custom props when present,
// with standalone fallbacks so it looks right anywhere.
// ======================================================================

// ---- Catalog -----------------------------------------------------------
(function (global) {
  var GLYPHS_URL = 'https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css';
  // Minimal fallback if the stylesheet can't be fetched (offline / blocked).
  var FALLBACK = ['plus', 'caret-down', 'check', 'star', 'x', 'trash', 'pencil-simple',
                  'gear', 'magnifying-glass', 'arrow-right', 'arrow-left', 'download-simple'];
  var cache = null;

  function loadGlyphs() {
    if (cache) return cache;
    cache = fetch(GLYPHS_URL)
      .then(function (r) { return r.text(); })
      .then(function (css) {
        var seen = {}, names = [], m, re = /\.ph\.ph-([a-z0-9-]+):before/g;
        while ((m = re.exec(css)) !== null) {
          if (!seen[m[1]]) { seen[m[1]] = 1; names.push(m[1]); }
        }
        names.sort();
        return names.length ? names : FALLBACK.slice();
      })
      .catch(function () { return FALLBACK.slice(); });
    return cache;
  }

  var api = { GLYPHS_URL: GLYPHS_URL, FALLBACK: FALLBACK, loadGlyphs: loadGlyphs };

  // Standalone handle for React-free consumers…
  global.GKIconGlyphs = api;
  // …and attach to the Icon component when it's present (either load order).
  if (global.Icon) { global.Icon.GLYPHS_URL = GLYPHS_URL; global.Icon.loadGlyphs = loadGlyphs; }
})(window);

// ---- Picker ------------------------------------------------------------
(function (global) {
  var CSS = [
    '.gk-combo{position:relative;}',
    '.gk-combo--disabled{opacity:.45;pointer-events:none;}',
    '.gk-combo__field{display:flex;align-items:center;gap:8px;height:34px;padding:0 9px;',
      'background:var(--panel-field,#2b2d31);border:1px solid var(--panel-line,#33353a);',
      'border-radius:6px;cursor:text;}',
    ".gk-combo__field::after{content:'';flex-shrink:0;width:10px;height:6px;",
      "background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23a0a3aa' fill='none' stroke-width='1.3'/%3E%3C/svg%3E\") no-repeat center;}",
    '.gk-combo__field > .ph{font-size:16px;color:var(--panel-text,#e9eaec);flex-shrink:0;}',
    '.gk-combo__input{flex:1;min-width:0;border:none;background:none;color:var(--panel-text,#e9eaec);',
      'font:inherit;font-size:13px;padding:0;outline:none;}',
    '.gk-combo__input::placeholder{color:var(--panel-label,#a0a3aa);}',
    '.gk-combo__list{position:absolute;z-index:10;top:calc(100% + 4px);left:auto;right:0;',
      'width:140%;max-height:320px;overflow-y:auto;margin:0;padding:4px;',
      'list-style:none;background:#26282c;border:1px solid var(--panel-line,#33353a);',
      'border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.45);}',
    '.gk-combo__list[hidden]{display:none;}',
    '.gk-combo__opt{display:flex;align-items:center;gap:10px;padding:7px 9px;border-radius:5px;',
      'cursor:pointer;font-size:13px;color:var(--panel-text,#e9eaec);}',
    '.gk-combo__opt > .ph{font-size:18px;width:20px;text-align:center;color:#c9ccd2;flex-shrink:0;}',
    '.gk-combo__opt:hover,.gk-combo__opt.is-active{background:#34373c;}',
    '.gk-combo__opt mark{background:none;color:#4285f4;font-weight:600;}',
    '.gk-combo__empty,.gk-combo__more{padding:9px;font-size:12px;color:var(--panel-label,#a0a3aa);text-align:center;}',
  ].join('');

  function injectCSS() {
    if (document.getElementById('gk-glyph-combobox-css')) return;
    var s = document.createElement('style');
    s.id = 'gk-glyph-combobox-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  var MAX_SHOWN = 300;

  function create(opts) {
    injectCSS();
    var mount = opts.mount;
    var value = opts.value || 'star';
    var onChange = opts.onChange || function () {};
    var glyphNames = [value];
    var activeIdx = -1;
    var disabled = !!opts.disabled;

    // ---- markup ----
    var combo = document.createElement('div'); combo.className = 'gk-combo';
    var field = document.createElement('div'); field.className = 'gk-combo__field';
    var preview = document.createElement('i'); preview.className = 'ph ph-' + value;
    var input = document.createElement('input');
    input.type = 'text'; input.className = 'gk-combo__input';
    input.placeholder = 'Search icons…'; input.autocomplete = 'off';
    var list = document.createElement('ul'); list.className = 'gk-combo__list'; list.hidden = true;
    field.appendChild(preview); field.appendChild(input);
    combo.appendChild(field); combo.appendChild(list);
    mount.innerHTML = ''; mount.appendChild(combo);

    function setGlyph(name, fire) {
      value = name; input.value = name; preview.className = 'ph ph-' + name;
      if (fire) onChange(name);
    }

    function renderList() {
      var q = input.value.trim().toLowerCase();
      var matches = (!q || q === value)
        ? glyphNames
        : glyphNames.filter(function (n) { return n.indexOf(q) > -1; });
      var shown = matches.slice(0, MAX_SHOWN);
      var showQ = (q && q !== value) ? q : '';
      activeIdx = -1;
      list.innerHTML = '';

      if (!matches.length) {
        var e = document.createElement('li');
        e.className = 'gk-combo__empty';
        e.textContent = 'No icons match “' + q + '”';
        list.appendChild(e);
        return;
      }
      shown.forEach(function (n) {
        var li = document.createElement('li');
        li.className = 'gk-combo__opt'; li.dataset.name = n;
        var ic = document.createElement('i'); ic.className = 'ph ph-' + n;
        var label = document.createElement('span');
        var i = showQ ? n.indexOf(showQ) : -1;
        if (i > -1) {
          label.appendChild(document.createTextNode(n.slice(0, i)));
          var mk = document.createElement('mark'); mk.textContent = n.slice(i, i + showQ.length);
          label.appendChild(mk);
          label.appendChild(document.createTextNode(n.slice(i + showQ.length)));
        } else { label.textContent = n; }
        li.appendChild(ic); li.appendChild(label);
        li.addEventListener('mousedown', function (ev) { ev.preventDefault(); setGlyph(n, true); close(); });
        list.appendChild(li);
      });
      if (matches.length > shown.length) {
        var more = document.createElement('li');
        more.className = 'gk-combo__more';
        more.textContent = '+' + (matches.length - shown.length) + ' more — keep typing to narrow';
        list.appendChild(more);
      }
    }

    function open() { if (disabled) return; renderList(); list.hidden = false; }
    function close() { list.hidden = true; input.value = value; }
    function setActive(els) {
      els.forEach(function (o) { o.classList.remove('is-active'); });
      if (activeIdx > -1 && els[activeIdx]) { els[activeIdx].classList.add('is-active'); els[activeIdx].scrollIntoView({ block: 'nearest' }); }
    }

    field.addEventListener('mousedown', function (e) { if (disabled) { e.preventDefault(); return; } if (e.target !== input) { e.preventDefault(); input.focus(); } });
    input.addEventListener('focus', function () { if (disabled) return; input.select(); open(); });
    input.addEventListener('input', open);
    input.addEventListener('keydown', function (e) {
      var els = list.querySelectorAll('.gk-combo__opt');
      if (e.key === 'ArrowDown') { e.preventDefault(); if (list.hidden) open(); activeIdx = Math.min(activeIdx + 1, els.length - 1); setActive(els); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); activeIdx = Math.max(activeIdx - 1, 0); setActive(els); }
      else if (e.key === 'Enter') { if (activeIdx > -1 && els[activeIdx]) { e.preventDefault(); setGlyph(els[activeIdx].dataset.name, true); close(); } }
      else if (e.key === 'Escape') { close(); input.blur(); }
    });
    document.addEventListener('mousedown', function (e) { if (!combo.contains(e.target)) close(); });

    function setDisabled(v) {
      disabled = !!v;
      input.disabled = disabled;          // blocks focus + typing
      combo.classList.toggle('gk-combo--disabled', disabled);
      if (disabled) close();              // never leave the list open
    }

    setGlyph(value, false);
    setDisabled(disabled);

    // catalog comes from GKIconGlyphs (defined above in this same file)
    (global.GKIconGlyphs ? global.GKIconGlyphs.loadGlyphs() : Promise.resolve([value]))
      .then(function (names) {
        glyphNames = names;
        if (names.indexOf(value) < 0) setGlyph(names[0], true);
        input.placeholder = 'Search ' + names.length + ' icons…';
        if (opts.onReady) opts.onReady(names);
      });

    return {
      el: combo,
      getValue: function () { return value; },
      setValue: function (n) { setGlyph(n, false); },
      setDisabled: setDisabled,
    };
  }

  global.GKGlyphCombobox = { create: create };
})(window);
