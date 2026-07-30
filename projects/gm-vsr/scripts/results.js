/* ============================================================================
   gm-vsr — Step 4+5: results grid (Alloy vsr-card) + sort + pagination
   ----------------------------------------------------------------------------
   Step 4: renders real Alloy VSR Cards from the filtered mock inventory.
   Step 5: "Best Match" sort via Alloy menu; desktop 24/page numbered pager
           (NET-NEW, constitution §4); mobile infinite scroll, 12 at a time.

   NET-NEW (constitution §4): photo-count badge, days-on-lot line, numbered
   pagination. Distance is native to the card (.drp-vsr-card__distance).
   ============================================================================ */
(function () {
  'use strict';

  var D = window.GMVSR_DATA;
  var grid = document.getElementById('gmvsr-grid');
  var sortHost = document.getElementById('gmvsr-sort');
  var pager = document.getElementById('gmvsr-pager');
  var sentinel = document.getElementById('gmvsr-sentinel');
  var banner = document.getElementById('gmvsr-banner');
  if (!D || !grid) return;

  var PAGE_DESKTOP = 24, PAGE_MOBILE = 12;

  // Favorites persist within the session (no login). Restored before first render.
  var FAV_KEY = 'gmvsr-favorites';
  var saved = {};
  (function loadSaved() {
    try { var a = JSON.parse(sessionStorage.getItem(FAV_KEY)); (Array.isArray(a) ? a : []).forEach(function (id) { saved[id] = true; }); } catch (e) {}
  })();
  function persistSaved() {
    try { sessionStorage.setItem(FAV_KEY, JSON.stringify(Object.keys(saved).filter(function (k) { return saved[k]; }))); } catch (e) {}
  }

  /* ---- sort definitions -------------------------------------------------- */
  function availRank(v) { return v.availability === 'In Stock' ? 2 : v.availability === 'In Transit' ? 1 : 0; }
  function net(v) { return v.price - v.discount; }
  var SORTS = [
    { value: 'best', label: 'Best Match', fn: function (a, b) { return score(b) - score(a); } },
    { value: 'price-asc', label: 'Price: Low to High', fn: function (a, b) { return net(a) - net(b); } },
    { value: 'price-desc', label: 'Price: High to Low', fn: function (a, b) { return net(b) - net(a); } },
    { value: 'distance', label: 'Distance: Nearest', fn: function (a, b) { return a.distanceMi - b.distanceMi; } },
    { value: 'days', label: 'Newest to lot', fn: function (a, b) { return a.daysOnLot - b.daysOnLot; } }
  ];
  // Best Match = availability + distance + incentive (per spec).
  function score(v) { return availRank(v) * 1e6 - v.distanceMi * 1e3 + v.discount; }
  function sortFn(value) { for (var i = 0; i < SORTS.length; i++) if (SORTS[i].value === value) return SORTS[i].fn; return SORTS[0].fn; }
  function sortLabel(value) { for (var i = 0; i < SORTS.length; i++) if (SORTS[i].value === value) return SORTS[i].label; return SORTS[0].label; }

  /* ---- state ------------------------------------------------------------- */
  var state = { list: [], sorted: [], sort: 'best', page: 1, shown: PAGE_MOBILE, mobile: false, payment: 'cash', error: false, partialExtra: 0 };

  /* ---- card markup (Step 4) ---------------------------------------------- */
  function money(n) { return '$' + Math.round(n).toLocaleString('en-US'); }
  function glyphFor(v) {
    if (v.tags.indexOf('truck') !== -1) return 'car-truck';
    if (v.tags.indexOf('suv') !== -1) return 'car-suv';
    return 'car';
  }
  function payment(v, type) {
    if (type === 'finance') {
      return { value: money(v.monthly) + '/mo.', terms: ['72 mo. | 5.9% APR | ' + money(2500) + ' down pymt.', 'Subject to credit approval'],
        tip: 'Estimated payment assumes 5.9% APR for 72 months with ' + money(2500) + ' down, subject to credit approval. Your actual rate may vary.' };
    }
    if (type === 'lease') {
      return { value: money(Math.round(v.monthly * 0.82)) + '/mo.', terms: ['36 mo. | 12,000 mi./yr. | ' + money(2500) + ' due at signing', '$0 security dep. | Subject to credit approval'],
        tip: 'Estimated lease: 36 months, 12,000 mi./yr., ' + money(2500) + ' due at signing. Tax, title, and fees extra. Subject to credit approval.' };
    }
    return { value: money(net(v)), terms: null,
      tip: 'Dealer Price After Offers reflects ' + money(v.discount) + ' in dealer discounts/incentives off the ' + money(v.msrp) + ' MSRP. Plus tax, title, and fees.' };
  }
  function tooltip(tip) {
    return '<span class="gmvsr-tip">' +
      '<button type="button" class="gmvsr-tip__trigger" aria-label="Pricing details"><i class="drp-icon drp-icon--info" aria-hidden="true"></i></button>' +
      '<span class="tooltip tooltip--arrow-bottom-left gmvsr-tip__pop" role="tooltip"><p class="tooltip__body">' + tip + '</p></span></span>';
  }
  function cardHtml(v, type, isMobile) {
    var p = payment(v, type);
    var heartGlyph = saved[v.id] ? 'heart-fill' : 'heart';
    var vdp = '#/vdp/' + v.vin; // VDP link-out (destination out of scope)
    var footer = isMobile
      ? '<span class="drp-vsr-card__vin"><span class="drp-vsr-card__vin-label">Stock #:</span> <span class="drp-vsr-card__vin-value">' + v.id + '</span></span>' +
        '<div class="drp-vsr-card__cta-row drp-vsr-card__cta-row--single"><a href="' + vdp + '" class="drp-button-contained-container-bg-large drp-button-contained-color-primary-filled" data-view-details>View Details</a></div>'
      : '<span class="drp-vsr-card__vin"><span class="drp-vsr-card__vin-label">Stock #:</span> <span class="drp-vsr-card__vin-value">' + v.id + '</span></span>' +
        '<div class="drp-vsr-card__cta-row"><button type="button" class="drp-button-contained-container-bg-large drp-button-contained-color-primary-outlined" data-quick-view>Quick View</button>' +
        '<a href="' + vdp + '" class="drp-button-contained-container-bg-large drp-button-contained-color-primary-filled" data-view-details>View Details</a></div>';

    return '<div class="drp-vsr-card' + (isMobile ? ' drp-vsr-card--mobile' : '') + '" role="listitem" data-vehicle="' + v.id + '" data-vin="' + v.vin + '">' +
      '<div class="drp-vsr-card__status-row"><span class="drp-vsr-card__status">' + v.availability + '</span>' +
        '<button type="button" class="drp-button-contained-icon-container-rect-bg-small drp-button-contained-color-primary-plain drp-vsr-card__heart" aria-label="' + (saved[v.id] ? 'Remove from saved' : 'Save vehicle') + '" aria-pressed="' + (!!saved[v.id]) + '" data-heart><i class="drp-icon drp-icon--' + heartGlyph + '" aria-hidden="true"></i></button></div>' +
      '<div class="drp-vsr-card__info"><div class="drp-vsr-card__name"><span>' + v.year + ' Chevrolet ' + v.model + '</span><span>' + v.trim + ' · ' + v.colorExtLabel + '</span></div>' +
        '<div class="drp-vsr-card__msrp"><span class="drp-vsr-card__msrp-label">MSRP:</span><span class="drp-vsr-card__msrp-value">' + money(v.msrp) + '</span></div></div>' +
      '<div class="drp-vsr-card__content"><div class="drp-vsr-card__image gmvsr-card-image">' +
          (v.qty <= 2 ? '<span class="chip chip--information chip--sm chip--color-warning gmvsr-lowinv">Only ' + v.qty + ' left in this trim</span>' : '') +
          '<i class="drp-icon drp-icon--' + glyphFor(v) + ' gmvsr-card-image__glyph" aria-hidden="true"></i>' +
          '<span class="gmvsr-photo-badge"><i class="drp-icon drp-icon--layout-grid" aria-hidden="true"></i>' + v.photoCount + '</span></div>' +
        '<div class="drp-vsr-card__pricing-wrap"><div class="drp-vsr-card__dealership"><span>Riverside Chevrolet</span><span class="drp-vsr-card__distance">(' + v.distanceMi + ' mi.)</span></div>' +
          '<div class="drp-vsr-card__price-block">' +
            '<span class="drp-vsr-card__price-label">Dealer Price After Offers</span>' +
            '<div class="drp-vsr-card__price-row"><span class="drp-vsr-card__price-value">' + p.value + '</span>' + tooltip(p.tip) +
              (window.GMVSR_COMPARE ? window.GMVSR_COMPARE.controlHtml(v) : '') + '</div>' +
            (v.discount > 0 ? '<span class="gmvsr-savings">' + money(v.discount) + ' off MSRP</span>' : '') +
            (p.terms ? '<div class="drp-vsr-card__terms"><span>' + p.terms[0] + '</span><span>' + p.terms[1] + '</span></div>' : '') +
            '<span class="gmvsr-days">' + v.daysOnLot + ' days on lot</span></div></div></div>' +
      '<div class="drp-vsr-card__footer">' + footer + '</div></div>';
  }

  /* ---- sort control (Alloy menu) ----------------------------------------- */
  function chevron() {
    return '<span class="gmvsr-sort__chevron" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
  }
  function tick() {
    return '<span class="menu__tick"><svg viewBox="0 0 16 16" fill="none"><path d="M2.5 8.5L6 12L13.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
  }
  function buildSortControl() {
    if (!sortHost) return;
    sortHost.innerHTML =
      '<button type="button" class="drp-button-contained-container-bg-medium drp-button-contained-color-primary-plain gmvsr-sort__trigger" aria-haspopup="menu" aria-expanded="false" data-sort-trigger>' +
        'Sort: <span data-sort-label>' + sortLabel(state.sort) + '</span>' + chevron() + '</button>' +
      '<div class="drp-list-container-bg gmvsr-sort__menu" role="menu" aria-label="Sort vehicles">' +
        SORTS.map(function (s) {
          return '<button type="button" class="drp-list-item-container-bg' + (s.value === state.sort ? ' is-selected' : '') + '" role="menuitemradio" aria-checked="' + (s.value === state.sort) + '" data-sort-value="' + s.value + '">' +
            '<div class="menu__body"><span class="menu__label">' + s.label + '</span></div>' + tick() + '</button>';
        }).join('') +
      '</div>';
  }
  function closeSortMenu() {
    var menu = sortHost.querySelector('.gmvsr-sort__menu');
    var trig = sortHost.querySelector('[data-sort-trigger]');
    if (menu) menu.classList.remove('is-open');
    if (trig) trig.setAttribute('aria-expanded', 'false');
  }

  /* ---- pager (NET-NEW, desktop) + sentinel (mobile) ---------------------- */
  function pageBtn(n, current) {
    return '<button type="button" class="gmvsr-pager__page' + (n === current ? ' is-current' : '') + '"' + (n === current ? ' aria-current="page"' : '') + ' data-page="' + n + '">' + n + '</button>';
  }
  function renderPager(totalPages) {
    if (state.mobile || totalPages <= 1) { pager.hidden = true; pager.innerHTML = ''; return; }
    pager.hidden = false;
    var html = '<button type="button" class="gmvsr-pager__nav" data-page-rel="-1"' + (state.page === 1 ? ' disabled' : '') + ' aria-label="Previous page">‹ Prev</button>';
    for (var n = 1; n <= totalPages; n++) html += pageBtn(n, state.page);
    html += '<button type="button" class="gmvsr-pager__nav" data-page-rel="1"' + (state.page === totalPages ? ' disabled' : '') + ' aria-label="Next page">Next ›</button>';
    pager.innerHTML = html;
  }

  /* ---- non-populated states (Step 8) ------------------------------------ */
  function hideChrome() { pager.hidden = true; sentinel.hidden = true; if (banner) { banner.hidden = true; banner.innerHTML = ''; } }

  // Skeleton cards (GAP — no Alloy skeleton primitive). NOT spinners, per spec.
  function skeletonCard() {
    return '<div class="gmvsr-skeleton" aria-hidden="true">' +
      '<div class="gmvsr-skeleton__line gmvsr-skeleton__line--status"></div>' +
      '<div class="gmvsr-skeleton__line gmvsr-skeleton__line--title"></div>' +
      '<div class="gmvsr-skeleton__line gmvsr-skeleton__line--sub"></div>' +
      '<div class="gmvsr-skeleton__image"></div>' +
      '<div class="gmvsr-skeleton__line gmvsr-skeleton__line--price"></div>' +
      '<div class="gmvsr-skeleton__line gmvsr-skeleton__line--footer"></div>' +
    '</div>';
  }
  function renderSkeletons() {
    hideChrome();
    var n = state.mobile ? 6 : 9;
    var out = '';
    for (var i = 0; i < n; i++) out += skeletonCard();
    grid.innerHTML = out;
    grid.setAttribute('aria-busy', 'true');
  }

  function renderError() {
    hideChrome();
    grid.removeAttribute('aria-busy');
    grid.innerHTML =
      '<div class="gmvsr-state gmvsr-state--error" role="alert">' +
        '<h2 class="gmvsr-state__title">We couldn’t load results</h2>' +
        '<p class="gmvsr-state__body">Something went wrong reaching inventory. Your filters are still applied — try again.</p>' +
        '<button type="button" class="drp-button-contained-container-bg-large drp-button-contained-color-primary-filled" data-retry>Retry</button>' +
      '</div>';
  }

  function renderEmpty() {
    hideChrome();
    grid.removeAttribute('aria-busy');
    var relax = state.emptyRelax || [];
    var suggestions = relax.length
      ? '<p class="gmvsr-state__suggest-label">Try relaxing a filter:</p><div class="gmvsr-state__suggestions">' +
          relax.map(function (r) {
            return '<button type="button" class="chip chip--selectable chip--md" data-relax-group="' + r.group + '">' + r.label + '</button>';
          }).join('') + '</div>'
      : '';
    grid.innerHTML =
      '<div class="gmvsr-state gmvsr-state--empty">' +
        '<h2 class="gmvsr-state__title">No matching vehicles</h2>' +
        '<p class="gmvsr-state__body">No Chevrolets match your current filters. Widen your search to see more.</p>' +
        suggestions +
        '<button type="button" class="drp-button-contained-container-bg-large drp-button-contained-color-primary-outlined" data-clear-filters>Clear all filters</button>' +
      '</div>';
  }

  function renderBanner() {
    if (!banner) return;
    if (state.partialExtra > 0) {
      banner.hidden = false;
      banner.innerHTML = '<div class="gmvsr-banner__inner"><span class="gmvsr-banner__text">' +
        state.partialExtra + ' similar vehicle' + (state.partialExtra === 1 ? '' : 's') + ' available with a different color or features.</span>' +
        '<button type="button" class="drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-medium" data-show-similar>Show similar</button></div>';
    } else { banner.hidden = true; banner.innerHTML = ''; }
  }

  /* ---- draw -------------------------------------------------------------- */
  function draw() {
    grid.removeAttribute('aria-busy');
    if (state.error) { renderError(); return; }
    state.sorted = state.list.slice().sort(sortFn(state.sort));
    var total = state.sorted.length;
    if (total === 0) { renderEmpty(); return; }
    renderBanner();
    var visible;
    if (state.mobile) {
      state.shown = Math.min(state.shown, total);
      visible = state.sorted.slice(0, state.shown);
      pager.hidden = true;
      sentinel.hidden = state.shown >= total;
    } else {
      var totalPages = Math.ceil(total / PAGE_DESKTOP);
      if (state.page > totalPages) state.page = totalPages;
      if (state.page < 1) state.page = 1;
      visible = state.sorted.slice((state.page - 1) * PAGE_DESKTOP, state.page * PAGE_DESKTOP);
      renderPager(totalPages);
      sentinel.hidden = true;
    }
    grid.innerHTML = visible.map(function (v) { return cardHtml(v, state.payment, state.mobile); }).join('');
  }

  /* ---- public: called by filter.js syncResults --------------------------- */
  var loadTimer = null, loadToken = 0;
  function render(list, opts) {
    opts = opts || {};
    state.list = list;
    state.payment = opts.payment || 'cash';
    state.mobile = !!opts.mobile;
    state.error = !!opts.error;
    state.emptyRelax = opts.emptyRelax || [];
    state.partialExtra = opts.partialExtra || 0;
    if (!opts.keepPage) { state.page = 1; state.shown = PAGE_MOBILE; }
    if (opts.loadingForced && !state.error) { loadToken++; renderSkeletons(); return; } // held for review
    if (opts.loading && !state.error) {
      var tok = ++loadToken;
      renderSkeletons();
      clearTimeout(loadTimer);
      loadTimer = setTimeout(function () { if (tok === loadToken) draw(); }, 500);
      return;
    }
    loadToken++; // cancel any pending skeleton→draw
    draw();
  }

  /* ---- events ------------------------------------------------------------ */
  grid.addEventListener('click', function (e) {
    var heart = e.target.closest('[data-heart]');
    if (heart) {
      var id = heart.closest('[data-vehicle]').getAttribute('data-vehicle');
      saved[id] = !saved[id];
      persistSaved();
      heart.setAttribute('aria-pressed', String(!!saved[id]));
      heart.setAttribute('aria-label', saved[id] ? 'Remove from saved' : 'Save vehicle');
      heart.querySelector('.drp-icon').className = 'drp-icon drp-icon--' + (saved[id] ? 'heart-fill' : 'heart');
      return;
    }
    // Quick View is handled by quickview.js; View Details is a real link-out (anchor) → VDP.
  });

  // Sort menu (open/close + select)
  document.addEventListener('click', function (e) {
    var trig = e.target.closest('[data-sort-trigger]');
    if (trig) {
      var menu = sortHost.querySelector('.gmvsr-sort__menu');
      var open = !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', open);
      trig.setAttribute('aria-expanded', String(open));
      return;
    }
    var item = e.target.closest('[data-sort-value]');
    if (item) {
      state.sort = item.getAttribute('data-sort-value');
      state.page = 1; state.shown = PAGE_MOBILE;
      buildSortControl(); // reflect selected + tick
      draw();
      return;
    }
    // outside click closes the sort menu
    if (sortHost && !e.target.closest('#gmvsr-sort')) closeSortMenu();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSortMenu(); });

  // Pager (delegated)
  pager.addEventListener('click', function (e) {
    var rel = e.target.closest('[data-page-rel]');
    if (rel) { state.page += parseInt(rel.getAttribute('data-page-rel'), 10); draw(); grid.scrollIntoView({ block: 'start' }); return; }
    var pg = e.target.closest('[data-page]');
    if (pg) { state.page = parseInt(pg.getAttribute('data-page'), 10); draw(); grid.scrollIntoView({ block: 'start' }); }
  });

  // Mobile infinite scroll
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && state.mobile && state.shown < state.sorted.length) {
          state.shown += PAGE_MOBILE;
          draw();
        }
      });
    }, { rootMargin: '200px' });
    io.observe(sentinel);
  }

  // Reflect a vehicle's saved state onto its card heart in the grid (if present).
  function reflectSaved(id) {
    var card = grid.querySelector('[data-vehicle="' + id + '"]');
    if (!card) return;
    var heart = card.querySelector('[data-heart]');
    if (!heart) return;
    heart.setAttribute('aria-pressed', String(!!saved[id]));
    heart.setAttribute('aria-label', saved[id] ? 'Remove from saved' : 'Save vehicle');
    heart.querySelector('.drp-icon').className = 'drp-icon drp-icon--' + (saved[id] ? 'heart-fill' : 'heart');
  }

  buildSortControl();
  window.GMVSR_RESULTS = {
    render: render, saved: saved,
    getPayment: function () { return state.payment; },
    reflectSaved: reflectSaved, persistSaved: persistSaved
  };
})();
