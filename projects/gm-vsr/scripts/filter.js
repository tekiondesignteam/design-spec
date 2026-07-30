/* ============================================================================
   gm-vsr — Step 2: filter panel (Alloy vsr-filter)
   ----------------------------------------------------------------------------
   Composes Alloy atoms via their canonical .drp-* classes (atoms aren't
   exported as components — classname reuse is the intended model):
     tabs-contained · slider(range) · accordion · checkbox · quick-filter
     + vsr-filter's own scaffold (location, count-badge, color swatches, mobile chrome)

   Behavior per spec:
     • Desktop: persistent rail, filters APPLY INSTANTLY, live count in the
       results toolbar (#gmvsr-count).
     • Mobile: bottom sheet, changes stage into a DRAFT; only "Apply (N)"
       commits; "Clear all" resets. (Real-time updates hurt scroll perf.)
     • Groups: Price · Model · Color · Features. Price + Model expanded by
       default; Color + Features collapsed.

   Targeted DOM updates (not full re-render) keep keyboard focus on the control
   the user is operating. Full re-render only on Clear All and sheet open.
   ============================================================================ */
(function () {
  'use strict';

  var D = window.GMVSR_DATA;
  if (!D) { return; }

  var MIN = D.PRICE_MIN, MAX = D.PRICE_MAX;

  // Search-radius presets (miles); null = Nationwide (no distance limit).
  var RADII = [
    { value: '10', label: '10 miles' }, { value: '25', label: '25 miles' },
    { value: '50', label: '50 miles' }, { value: '100', label: '100 miles' },
    { value: '200', label: '200 miles' }, { value: '', label: 'Nationwide' }
  ];

  function freshState() {
    return {
      payment: 'cash',
      zip: '92504', radius: 100,   // search location (context, not a clearable filter)
      priceLo: MIN, priceHi: MAX,
      open: { price: true, model: true, color: false, features: false },
      models: [], colors: [], features: [], quick: []
    };
  }
  function clone(s) {
    return {
      payment: s.payment, zip: s.zip, radius: s.radius,
      priceLo: s.priceLo, priceHi: s.priceHi,
      open: { price: s.open.price, model: s.open.model, color: s.open.color, features: s.open.features },
      models: s.models.slice(), colors: s.colors.slice(),
      features: s.features.slice(), quick: s.quick.slice()
    };
  }

  var state = freshState();   // committed (desktop / results)
  var draft = null;           // mobile working copy

  // Last-used filters persist within the session (no login). Session-scoped.
  var FILTER_KEY = 'gmvsr-filters';
  function persistFilters() {
    try {
      sessionStorage.setItem(FILTER_KEY, JSON.stringify({
        payment: state.payment, zip: state.zip, radius: state.radius,
        priceLo: state.priceLo, priceHi: state.priceHi, open: state.open,
        models: state.models, colors: state.colors, features: state.features, quick: state.quick
      }));
    } catch (e) {}
  }
  function restoreFilters() {
    try {
      var s = JSON.parse(sessionStorage.getItem(FILTER_KEY));
      if (!s) return;
      ['payment', 'zip', 'priceLo', 'priceHi'].forEach(function (k) { if (s[k] != null) state[k] = s[k]; });
      if ('radius' in s) state.radius = s.radius; // may be null (Nationwide)
      if (s.open) state.open = s.open;
      ['models', 'colors', 'features', 'quick'].forEach(function (k) { if (Array.isArray(s[k])) state[k] = s[k]; });
    } catch (e) {}
  }

  /* ---- formatting -------------------------------------------------------- */
  function fmtPrice(n) { return '$' + n.toLocaleString('en-US'); }

  function criteriaFrom(s) {
    return {
      radius: s.radius,
      priceMin: s.priceLo > MIN ? s.priceLo : null,
      priceMax: s.priceHi < MAX ? s.priceHi : null,
      models: s.models, colors: s.colors, features: s.features, quick: s.quick
    };
  }
  function countFor(s) { return D.count(criteriaFrom(s)); }
  function narrowedPrice(s) { return s.priceLo > MIN || s.priceHi < MAX; }
  function hasSelections(s) {
    return s.models.length || s.colors.length || s.features.length || s.quick.length || narrowedPrice(s);
  }
  function inArr(a, v) { return a.indexOf(v) !== -1; }
  function toggle(a, v) { var i = a.indexOf(v); if (i === -1) a.push(v); else a.splice(i, 1); }

  /* ---- markup builders --------------------------------------------------- */
  function milesLabel(s) { return s.radius == null ? '(Nationwide)' : '(' + s.radius + ' miles)'; }

  function locationDisplay(s) {
    return '<div class="drp-vsr-filter__location-row">' +
        '<i class="drp-icon drp-icon--map-pin drp-vsr-filter__location-pin" aria-hidden="true"></i>' +
        '<span class="drp-vsr-filter__location-zip">' + s.zip + '</span>' +
        '<button type="button" class="drp-vsr-filter__location-edit" aria-label="Edit ZIP and search radius" data-loc-edit>' +
          '<i class="drp-icon drp-icon--pencil" aria-hidden="true"></i>' +
        '</button>' +
      '</div>' +
      '<div class="drp-vsr-filter__location-miles">' + milesLabel(s) + '</div>';
  }

  function locationEdit(s) {
    var radiusVal = s.radius == null ? '' : String(s.radius);
    var opts = RADII.map(function (r) {
      return '<option value="' + r.value + '"' + (r.value === radiusVal ? ' selected' : '') + '>' + r.label + '</option>';
    }).join('');
    return '<div class="gmvsr-loc-edit">' +
      '<div class="drp-input-standard-outlined-container-bg-large" data-zip-container>' +
        '<div class="drp-input-standard-outlined-field">' +
          '<input class="drp-input-standard-outlined-input" data-loc-zip type="text" inputmode="numeric" maxlength="5" placeholder=" " value="' + s.zip + '" aria-label="ZIP code" aria-describedby="gmvsr-zip-err">' +
          '<label class="drp-input-standard-outlined-label">ZIP code</label>' +
        '</div>' +
        '<p class="gmvsr-loc-error" id="gmvsr-zip-err" hidden>Enter a 5-digit ZIP code.</p>' +
      '</div>' +
      '<label class="gmvsr-loc-radius-wrap"><span class="gmvsr-loc-radius-label">Search radius</span>' +
        '<select class="gmvsr-loc-radius" data-loc-radius aria-label="Search radius">' + opts + '</select>' +
      '</label>' +
      '<div class="gmvsr-loc-actions">' +
        '<button type="button" class="drp-button-contained-container-bg-small drp-button-contained-color-primary-filled" data-loc-apply>Apply</button>' +
        '<button type="button" class="drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-medium" data-loc-cancel>Cancel</button>' +
      '</div>' +
    '</div>';
  }

  function location(s) {
    return '<div class="drp-vsr-filter__location">' + locationDisplay(s) + '</div>';
  }

  function paymentTabs(s) {
    var tabs = [['cash', 'Cash'], ['finance', 'Finance'], ['lease', 'Lease']];
    return '<div class="drp-tab-contained-container drp-tab-contained-container--lg drp-vsr-filter__payment-tabs" role="tablist" aria-label="Payment method">' +
      tabs.map(function (t) {
        var sel = s.payment === t[0];
        return '<button type="button" class="drp-tab-contained-tab-container-bg' + (sel ? ' is-selected' : '') +
          '" role="tab" aria-selected="' + sel + '" data-payment="' + t[0] + '"><span>' + t[1] + '</span></button>';
      }).join('') +
    '</div>';
  }

  function quickFilters(s) {
    return '<div class="drp-quick-filter-group" role="group" aria-label="Quick filters">' +
      D.QUICK.map(function (q) {
        var sel = inArr(s.quick, q.value);
        return '<button type="button" class="drp-quick-filter' + (sel ? ' is-selected' : '') +
          '" aria-pressed="' + sel + '" data-quick="' + q.value + '">' +
          '<i class="drp-icon drp-icon--' + q.icon + ' drp-quick-filter__icon" aria-hidden="true"></i>' +
          '<span class="drp-quick-filter__label">' + q.label + '</span></button>';
      }).join('') +
    '</div>';
  }

  function headingRow(showClear) {
    // NOTE: use inline display, NOT the `hidden` attr — Alloy's button/badge
    // classes set `display:…`, which overrides the UA `[hidden]{display:none}`.
    return '<div class="drp-vsr-filter__heading-row">' +
      '<h2 class="drp-vsr-filter__heading">Filters</h2>' +
      (showClear
        ? '<button type="button" class="drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-medium" data-clear style="display:none">Clear All</button>'
        : '') +
    '</div>';
  }

  function badge(id, n) {
    return '<span class="drp-vsr-filter__count-badge" data-badge="' + id + '" style="display:' + (n ? 'inline-flex' : 'none') + '">' + (n || '') + '</span>';
  }

  function section(id, label, open, bodyHtml, badgeN) {
    return '<div class="drp-accordion-container-bg' + (open ? ' is-open' : '') + '" data-section="' + id + '">' +
      '<button type="button" class="drp-accordion-container-summary-bg" aria-expanded="' + open + '" aria-controls="sec-' + id + '">' +
        '<div class="accordion__label-wrap"><span class="accordion__label">' + label + '</span></div>' +
        '<div class="drp-vsr-filter__summary-right">' + badge(id, badgeN) +
          '<span class="accordion__icon" aria-hidden="true">' +
            '<i class="drp-icon drp-icon--plus accordion__icon-closed"></i>' +
            '<i class="drp-icon drp-icon--circle-minus accordion__icon-open"></i>' +
          '</span>' +
        '</div>' +
      '</button>' +
      '<div class="drp-accordion-details" role="region" id="sec-' + id + '">' +
        '<div class="drp-vsr-filter__filter-body">' + bodyHtml + '</div>' +
      '</div>' +
    '</div>';
  }

  function priceBody(s) {
    var lPct = ((s.priceLo - MIN) / (MAX - MIN)) * 100;
    var rPct = 100 - ((s.priceHi - MIN) / (MAX - MIN)) * 100;
    return '<div class="drp-slider-container drp-slider-container--range" data-price>' +
      '<div class="drp-slider-header">' +
        '<span class="drp-slider-typography-title">Price</span>' +
        '<span class="drp-slider-value">' +
          '<output data-price-lo>' + fmtPrice(s.priceLo) + '</output>' +
          '<span class="drp-slider-to">to</span>' +
          '<output data-price-hi>' + fmtPrice(s.priceHi) + (s.priceHi >= MAX ? '+' : '') + '</output>' +
        '</span>' +
      '</div>' +
      '<div class="drp-slider-track-wrap">' +
        '<div class="drp-slider-range-track"><div class="drp-slider-range-fill" data-price-fill style="left:' + lPct + '%;right:' + rPct + '%"></div></div>' +
        '<input type="range" class="drp-slider-input drp-slider-input--lower" data-role="min" min="' + MIN + '" max="' + MAX + '" step="1000" value="' + s.priceLo + '" aria-label="Minimum price">' +
        '<input type="range" class="drp-slider-input drp-slider-input--upper" data-role="max" min="' + MIN + '" max="' + MAX + '" step="1000" value="' + s.priceHi + '" aria-label="Maximum price">' +
      '</div>' +
      '<div class="drp-slider-footer"><span class="drp-slider-typography-range">' + fmtPrice(MIN) + '</span><span class="drp-slider-typography-range">' + fmtPrice(MAX) + '+</span></div>' +
    '</div>';
  }

  function checkboxRow(group, value, label, count, checked) {
    return '<label class="drp-checkbox-container drp-vsr-filter__checkbox-row' + (checked ? ' is-checked' : '') + '" data-group="' + group + '" data-value="' + value + '">' +
      '<input type="checkbox" class="checkbox__input"' + (checked ? ' checked' : '') + '>' +
      '<span class="checkbox__box">' +
        '<svg class="checkbox__check" viewBox="0 0 11 9" fill="none" aria-hidden="true"><path d="M1 4.5L4 7.5L10 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '<span class="checkbox__dash"></span>' +
      '</span>' +
      '<span class="drp-checkbox-typography-large drp-vsr-filter__option-label">' + label +
        (count != null ? '<span class="drp-vsr-filter__option-count"> (' + count + ')</span>' : '') +
      '</span>' +
    '</label>';
  }

  function modelBody(s) {
    var counts = D.modelCounts();
    return '<div class="drp-vsr-filter__filter-options">' +
      D.MODELS.map(function (m) { return checkboxRow('model', m, m, counts[m], inArr(s.models, m)); }).join('') +
    '</div>';
  }

  function colorBody(s) {
    return '<div class="drp-vsr-filter__color-grid" role="group" aria-label="Exterior color">' +
      D.COLORS.map(function (c) {
        var sel = inArr(s.colors, c.value);
        return '<button type="button" class="drp-vsr-filter__swatch' + (c.bordered ? ' drp-vsr-filter__swatch--bordered' : '') + (sel ? ' is-selected' : '') +
          '" aria-label="' + c.label + '" aria-pressed="' + sel + '" data-group="color" data-value="' + c.value + '">' +
          '<span class="drp-vsr-filter__swatch-disc" style="background:' + c.fill + '"></span></button>';
      }).join('') +
    '</div>';
  }

  function featuresBody(s) {
    return '<div class="drp-vsr-filter__filter-options">' +
      D.FEATURES.map(function (f) { return checkboxRow('features', f, f, null, inArr(s.features, f)); }).join('') +
    '</div>';
  }

  function sections(s) {
    return '<div class="drp-accordion-group drp-vsr-filter__sections">' +
      section('price', 'Price', s.open.price, priceBody(s), narrowedPrice(s) ? 1 : 0) +
      section('model', 'Model', s.open.model, modelBody(s), s.models.length) +
      section('color', 'Color', s.open.color, colorBody(s), s.colors.length) +
      section('features', 'Features', s.open.features, featuresBody(s), s.features.length) +
    '</div>';
  }

  function body(s, opts) {
    return location(s) + paymentTabs(s) + quickFilters(s) + headingRow(opts.desktopClear) + sections(s);
  }

  function desktopHtml(s) {
    return '<div class="drp-vsr-filter drp-vsr-filter--desktop" data-viewport="desktop" data-filter-root="desktop">' +
      body(s, { desktopClear: true }) +
    '</div>';
  }

  function mobileHtml(s) {
    var n = countFor(s);
    return '<div class="drp-vsr-filter drp-vsr-filter--mobile" data-viewport="mobile" data-filter-root="mobile">' +
      '<header class="drp-vsr-filter__mobile-header">' +
        '<div class="drp-vsr-filter__mobile-title"><i class="drp-icon drp-icon--sliders-horizontal" aria-hidden="true"></i><span>Filters</span></div>' +
        '<button type="button" class="drp-button-contained-icon-container-circle-bg-small drp-button-contained-color-primary-plain" aria-label="Close filters" data-sheet-close>' +
          '<i class="drp-icon drp-icon--close" aria-hidden="true"></i>' +
        '</button>' +
      '</header>' +
      body(s, { desktopClear: false }) +
      '<div class="drp-vsr-filter__mobile-actions">' +
        '<div class="drp-vsr-filter__count-row" data-count-row>' + n + ' Vehicle(s)</div>' +
        '<div class="drp-vsr-filter__action-row">' +
          '<button type="button" class="drp-button-contained-container-bg-medium drp-button-contained-color-primary-outlined' + (hasSelections(s) ? '' : ' drp-disabled') + '" data-clear' + (hasSelections(s) ? '' : ' disabled') + '>Clear all</button>' +
          '<button type="button" class="drp-button-contained-container-bg-medium drp-button-contained-color-primary-filled" data-apply>Apply (' + n + ')</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /* ---- DOM refs ---------------------------------------------------------- */
  var deskHost = document.getElementById('gmvsr-filter-desktop');
  var sheet = document.getElementById('gmvsr-sheet');
  var sheetPanel = document.getElementById('gmvsr-filter-mobile');
  var countEl = document.getElementById('gmvsr-count');
  var filtersBtn = document.getElementById('gmvsr-filters-btn');
  var chipsEl = document.getElementById('gmvsr-chips');

  /* ---- active-filter chips (Alloy .chip--dismissable) -------------------- */
  function quickLabel(v) { for (var i = 0; i < D.QUICK.length; i++) if (D.QUICK[i].value === v) return D.QUICK[i].label; return v; }
  function colorLabel(v) { for (var i = 0; i < D.COLORS.length; i++) if (D.COLORS[i].value === v) return D.COLORS[i].label; return v; }

  function activeChips(s) {
    var chips = [];
    if (narrowedPrice(s)) {
      chips.push({ g: 'price', v: '', label: 'Price: ' + fmtPrice(s.priceLo) + ' – ' + fmtPrice(s.priceHi) + (s.priceHi >= MAX ? '+' : '') });
    }
    s.quick.forEach(function (v) { chips.push({ g: 'quick', v: v, label: quickLabel(v) }); });
    s.models.forEach(function (v) { chips.push({ g: 'model', v: v, label: v }); });
    s.colors.forEach(function (v) { chips.push({ g: 'color', v: v, label: 'Color: ' + colorLabel(v) }); });
    s.features.forEach(function (v) { chips.push({ g: 'features', v: v, label: v }); });
    return chips;
  }

  function chipHtml(c) {
    return '<span class="chip chip--dismissable chip--md">' + c.label +
      '<button type="button" class="chip__dismiss" aria-label="Remove ' + c.label + '" data-chip-remove data-chip-group="' + c.g + '" data-chip-value="' + c.v + '">' +
        '<i class="drp-icon drp-icon--close" aria-hidden="true"></i>' +
      '</button></span>';
  }

  function renderChips() {
    var chips = activeChips(state);
    if (!chips.length) { chipsEl.hidden = true; chipsEl.innerHTML = ''; return; }
    chipsEl.hidden = false;
    chipsEl.innerHTML = chips.map(chipHtml).join('') +
      '<button type="button" class="drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-medium gmvsr-chips__clear" data-chips-clear>Clear all</button>';
  }

  function currentMobile() { return window.matchMedia('(max-width: 599px)').matches; }
  function syncResults(opts) {
    opts = opts || {};
    persistFilters();
    refreshResultsCount();
    renderChips();
    if (!window.GMVSR_RESULTS) return;
    var list = state.forceEmpty ? [] : D.filter(criteriaFrom(state));
    // Partial-match: color/feature narrowing that hides otherwise-matching vehicles.
    var partialExtra = 0;
    if (list.length > 0 && (state.colors.length || state.features.length)) {
      var relaxed = criteriaFrom(state); relaxed.colors = []; relaxed.features = [];
      partialExtra = D.count(relaxed) - list.length;
    }
    // Relaxable-filter suggestions for the zero-result state.
    var relax = [];
    if (list.length === 0 && !state.error) {
      if (state.models.length) relax.push({ group: 'model', label: 'Any model' });
      if (state.colors.length) relax.push({ group: 'color', label: 'Any color' });
      if (state.features.length) relax.push({ group: 'features', label: 'Any features' });
      if (state.quick.length) relax.push({ group: 'quick', label: 'Any type' });
      if (narrowedPrice(state)) relax.push({ group: 'price', label: 'Any price' });
      if (state.radius != null) relax.push({ group: 'radius', label: 'Nationwide radius' });
    }
    window.GMVSR_RESULTS.render(list, {
      payment: state.payment, mobile: currentMobile(),
      loading: opts.loading, loadingForced: state.forceLoading, error: state.error,
      emptyRelax: relax, partialExtra: partialExtra
    });
  }

  // Clear one filter group (from zero-result suggestions / partial banner).
  function relaxGroup(group) {
    if (group === 'price') { state.priceLo = MIN; state.priceHi = MAX; }
    else if (group === 'radius') { state.radius = null; }
    else { state[group === 'model' ? 'models' : group === 'color' ? 'colors' : group === 'features' ? 'features' : 'quick'] = []; }
    deskHost.innerHTML = desktopHtml(state);
    syncResults();
  }

  function removeChip(group, value) {
    if (group === 'price') { state.priceLo = MIN; state.priceHi = MAX; }
    else {
      var arr = group === 'quick' ? state.quick : group === 'model' ? state.models : group === 'color' ? state.colors : state.features;
      var i = arr.indexOf(value); if (i !== -1) arr.splice(i, 1);
    }
    deskHost.innerHTML = desktopHtml(state); // reflect removal in the rail controls
    syncResults();
    if (chipsEl.querySelector('.chip__dismiss')) chipsEl.querySelector('.chip__dismiss').focus();
    else if (filtersBtn) filtersBtn.focus();
  }

  function clearAllFilters() {
    var reset = freshState();
    reset.payment = state.payment; reset.open = state.open; reset.zip = state.zip; reset.radius = state.radius;
    state = reset;
    deskHost.innerHTML = desktopHtml(state);
    syncResults();
  }

  function stateForRoot(rootEl) {
    return rootEl && rootEl.getAttribute('data-filter-root') === 'mobile' ? draft : state;
  }

  /* ---- live count + badge/clear refresh (targeted) ----------------------- */
  function refreshResultsCount() {
    if (countEl) countEl.textContent = String(countFor(state));
  }

  function refreshWithin(rootEl) {
    var s = stateForRoot(rootEl);
    // badges
    var map = { price: narrowedPrice(s) ? 1 : 0, model: s.models.length, color: s.colors.length, features: s.features.length };
    Object.keys(map).forEach(function (id) {
      var b = rootEl.querySelector('[data-badge="' + id + '"]');
      if (!b) return;
      if (map[id]) { b.textContent = map[id]; b.style.display = 'inline-flex'; } else { b.textContent = ''; b.style.display = 'none'; }
    });
    // clear-all
    var clear = rootEl.querySelector('[data-clear]');
    if (clear) {
      if (rootEl.getAttribute('data-filter-root') === 'mobile') {
        var dis = !hasSelections(s);
        clear.disabled = dis;
        clear.classList.toggle('drp-disabled', dis);
      } else {
        clear.style.display = hasSelections(s) ? '' : 'none';
      }
    }
    if (rootEl.getAttribute('data-filter-root') === 'mobile') {
      var n = countFor(s);
      var cr = rootEl.querySelector('[data-count-row]');
      if (cr) cr.textContent = n + ' Vehicle(s)';
      var apply = rootEl.querySelector('[data-apply]');
      if (apply) apply.textContent = 'Apply (' + n + ')';
    } else {
      syncResults(); // desktop = committed → update count + chips
    }
  }

  /* ---- interaction handlers (event delegation) --------------------------- */
  function onClick(e) {
    // active-filter chips (live above the results, outside any filter root)
    var chipBtn = e.target.closest('[data-chip-remove]');
    if (chipBtn) { removeChip(chipBtn.getAttribute('data-chip-group'), chipBtn.getAttribute('data-chip-value')); return; }
    if (e.target.closest('[data-chips-clear]')) { clearAllFilters(); return; }

    // Zero-result / partial-match / error actions (rendered in the results area)
    var relaxBtn = e.target.closest('[data-relax-group]');
    if (relaxBtn) { relaxGroup(relaxBtn.getAttribute('data-relax-group')); return; }
    if (e.target.closest('[data-clear-filters]')) { clearAllFilters(); return; }
    if (e.target.closest('[data-show-similar]')) { state.colors = []; state.features = []; deskHost.innerHTML = desktopHtml(state); syncResults(); return; }
    if (e.target.closest('[data-retry]')) { state.error = false; syncResults({ loading: true }); return; }

    var rootEl = e.target.closest('[data-filter-root]');
    if (!rootEl) {
      // sheet chrome outside the filter root (scrim / close)
      if (e.target.closest('[data-sheet-close]')) { closeSheet(false); }
      return;
    }
    var s = stateForRoot(rootEl);

    // close (mobile header)
    if (e.target.closest('[data-sheet-close]')) { closeSheet(false); return; }
    // apply (mobile)
    if (e.target.closest('[data-apply]')) { closeSheet(true); return; }
    // clear all — resets vehicle filters only; preserves location context + payment
    if (e.target.closest('[data-clear]')) {
      var reset = freshState();
      reset.payment = s.payment; reset.open = s.open;
      reset.zip = s.zip; reset.radius = s.radius;
      if (rootEl.getAttribute('data-filter-root') === 'mobile') { draft = reset; sheetPanel.innerHTML = mobileHtml(draft); }
      else { state = reset; deskHost.innerHTML = desktopHtml(state); syncResults(); }
      return;
    }
    // location: enter edit mode
    if (e.target.closest('[data-loc-edit]')) {
      var locEl = rootEl.querySelector('.drp-vsr-filter__location');
      locEl.innerHTML = locationEdit(s);
      var zipInput = locEl.querySelector('[data-loc-zip]');
      if (zipInput) { zipInput.focus(); zipInput.select(); }
      return;
    }
    // location: cancel edit
    if (e.target.closest('[data-loc-cancel]')) {
      var locC = rootEl.querySelector('.drp-vsr-filter__location');
      locC.innerHTML = locationDisplay(s);
      return;
    }
    // location: apply edit (validate ZIP, set radius, recompute)
    if (e.target.closest('[data-loc-apply]')) {
      var locA = rootEl.querySelector('.drp-vsr-filter__location');
      var zip = (locA.querySelector('[data-loc-zip]').value || '').trim();
      var radiusRaw = locA.querySelector('[data-loc-radius]').value;
      if (!/^\d{5}$/.test(zip)) {
        locA.querySelector('[data-zip-container]').classList.add('drp-input-standard-outlined-container-bg-large--error');
        var err = locA.querySelector('#gmvsr-zip-err'); if (err) err.hidden = false;
        return; // keep editor open on invalid ZIP
      }
      s.zip = zip;
      s.radius = radiusRaw === '' ? null : parseInt(radiusRaw, 10);
      locA.innerHTML = locationDisplay(s);
      refreshWithin(rootEl);
      return;
    }
    // accordion toggle
    var summary = e.target.closest('.drp-accordion-container-summary-bg');
    if (summary) {
      var item = summary.closest('[data-section]');
      var id = item.getAttribute('data-section');
      var nowOpen = !item.classList.contains('is-open');
      item.classList.toggle('is-open', nowOpen);
      summary.setAttribute('aria-expanded', String(nowOpen));
      s.open[id] = nowOpen;
      return;
    }
    // payment tab
    var tab = e.target.closest('[data-payment]');
    if (tab) {
      s.payment = tab.getAttribute('data-payment');
      rootEl.querySelectorAll('[data-payment]').forEach(function (t) {
        var sel = t === tab;
        t.classList.toggle('is-selected', sel);
        t.setAttribute('aria-selected', String(sel));
      });
      // Payment context doesn't change the count, but it changes how each card
      // prices (cash total vs monthly). Re-render cards from committed state.
      if (rootEl.getAttribute('data-filter-root') !== 'mobile') syncResults();
      return;
    }
    // quick filter
    var qf = e.target.closest('[data-quick]');
    if (qf) {
      var qv = qf.getAttribute('data-quick');
      toggle(s.quick, qv);
      var on = inArr(s.quick, qv);
      qf.classList.toggle('is-selected', on);
      qf.setAttribute('aria-pressed', String(on));
      refreshWithin(rootEl);
      return;
    }
    // color swatch
    var sw = e.target.closest('.drp-vsr-filter__swatch');
    if (sw) {
      var cv = sw.getAttribute('data-value');
      toggle(s.colors, cv);
      var csel = inArr(s.colors, cv);
      sw.classList.toggle('is-selected', csel);
      sw.setAttribute('aria-pressed', String(csel));
      refreshWithin(rootEl);
      return;
    }
  }

  // checkbox toggles fire 'change' on the input
  function onChange(e) {
    var input = e.target;
    if (!input.classList || !input.classList.contains('checkbox__input')) return;
    var rootEl = input.closest('[data-filter-root]');
    if (!rootEl) return;
    var s = stateForRoot(rootEl);
    var row = input.closest('.drp-checkbox-container');
    var group = row.getAttribute('data-group');
    var value = row.getAttribute('data-value');
    var arr = group === 'model' ? s.models : s.features;
    toggle(arr, value);
    var on = inArr(arr, value);
    row.classList.toggle('is-checked', on);
    input.checked = on;
    refreshWithin(rootEl);
  }

  // range slider dragging — update fill/outputs/count WITHOUT re-render
  function onInput(e) {
    var input = e.target;
    if (!input.classList || !input.classList.contains('drp-slider-input')) return;
    var rootEl = input.closest('[data-filter-root]');
    if (!rootEl) return;
    var s = stateForRoot(rootEl);
    var wrap = input.closest('[data-price]');
    var lo = parseInt(wrap.querySelector('[data-role="min"]').value, 10);
    var hi = parseInt(wrap.querySelector('[data-role="max"]').value, 10);
    if (lo > hi) { // prevent crossover
      if (input.getAttribute('data-role') === 'min') { lo = hi; input.value = lo; }
      else { hi = lo; input.value = hi; }
    }
    s.priceLo = lo; s.priceHi = hi;
    var lPct = ((lo - MIN) / (MAX - MIN)) * 100;
    var rPct = 100 - ((hi - MIN) / (MAX - MIN)) * 100;
    var fill = wrap.querySelector('[data-price-fill]');
    if (fill) { fill.style.left = lPct + '%'; fill.style.right = rPct + '%'; }
    var lo$ = wrap.querySelector('[data-price-lo]'), hi$ = wrap.querySelector('[data-price-hi]');
    if (lo$) lo$.textContent = fmtPrice(lo);
    if (hi$) hi$.textContent = fmtPrice(hi) + (hi >= MAX ? '+' : '');
    refreshWithin(rootEl);
  }

  /* ---- mobile sheet open / close ----------------------------------------- */
  function openSheet() {
    draft = clone(state);
    sheetPanel.innerHTML = mobileHtml(draft);
    sheet.hidden = false;
    document.body.classList.add('gmvsr-sheet-open');
    var closeBtn = sheetPanel.querySelector('[data-sheet-close]');
    if (closeBtn) closeBtn.focus();
  }
  function closeSheet(apply) {
    if (apply && draft) {
      state = clone(draft);
      deskHost.innerHTML = desktopHtml(state);
      syncResults({ loading: true }); // full re-query on Apply → skeletons
    }
    draft = null;
    sheet.hidden = true;
    document.body.classList.remove('gmvsr-sheet-open');
    if (filtersBtn) filtersBtn.focus();
  }

  /* ---- init -------------------------------------------------------------- */
  restoreFilters(); // last-used filters (session)

  // State override for review: ?state=loading|empty|error
  try {
    var forced = new URLSearchParams(window.location.search).get('state');
    if (forced === 'error') state.error = true;
    else if (forced === 'empty') state.forceEmpty = true;
    else if (forced === 'loading') state.forceLoading = true;
  } catch (e) {}

  deskHost.innerHTML = desktopHtml(state);
  syncResults({ loading: true }); // initial load → skeletons briefly

  document.addEventListener('click', onClick);
  document.addEventListener('change', onChange);
  document.addEventListener('input', onInput);
  if (filtersBtn) filtersBtn.addEventListener('click', openSheet);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !sheet.hidden) closeSheet(false);
  });
  // Re-render cards (desktop vs mobile variant) when the viewport band changes.
  window.matchMedia('(max-width: 599px)').addEventListener('change', function () { syncResults(); });
})();
