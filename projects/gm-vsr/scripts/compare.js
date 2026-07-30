/* ============================================================================
   gm-vsr — Step 7: Compare tray + compare modal (NET-NEW, constitution §4)
   ----------------------------------------------------------------------------
   No Alloy component exists for either; both are composed from Alloy atoms
   (checkbox, chip, button) + tokens.

     • Compare control — an Alloy checkbox on each card ("Compare").
     • Compare tray    — sticky bottom bar, max 3, persists across navigation
                         within the session (sessionStorage). 4th add blocked
                         with a "Maximum 3 vehicles" message.
     • Compare Now     — side-by-side spec table modal; requires >= 2 vehicles.
   ============================================================================ */
(function () {
  'use strict';

  var D = window.GMVSR_DATA;
  var tray = document.getElementById('gmvsr-compare-tray');
  var modal = document.getElementById('gmvsr-compare-modal');
  var panel = document.getElementById('gmvsr-compare-panel');
  var grid = document.getElementById('gmvsr-grid');
  if (!D || !tray || !modal || !panel) return;

  var MAX = 3;
  var KEY = 'gmvsr-compare';

  function load() {
    try { var v = JSON.parse(sessionStorage.getItem(KEY)); return Array.isArray(v) ? v.slice(0, MAX) : []; }
    catch (e) { return []; }
  }
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(ids)); } catch (e) {} }

  var ids = load();
  function has(id) { return ids.indexOf(id) !== -1; }
  function vehicle(id) { return D.fleet.filter(function (x) { return x.id === id; })[0]; }
  function money(n) { return '$' + Math.round(n).toLocaleString('en-US'); }

  /* ---- per-card compare control (Alloy checkbox) ------------------------- */
  function controlHtml(v) {
    var checked = has(v.id);
    var disabled = !checked && ids.length >= MAX;
    return '<label class="drp-checkbox-container gmvsr-compare-check' + (checked ? ' is-checked' : '') + (disabled ? ' drp-disabled' : '') + '" data-compare data-vehicle="' + v.id + '">' +
      '<input type="checkbox" class="checkbox__input"' + (checked ? ' checked' : '') + (disabled ? ' disabled' : '') + '>' +
      '<span class="checkbox__box"><svg class="checkbox__check" viewBox="0 0 11 9" fill="none" aria-hidden="true"><path d="M1 4.5L4 7.5L10 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="checkbox__dash"></span></span>' +
      '<span class="drp-checkbox-typography-small">Compare</span></label>';
  }

  // Reflect checked/disabled onto every compare control currently in the grid.
  function reflectControls() {
    if (!grid) return;
    grid.querySelectorAll('[data-compare]').forEach(function (label) {
      var id = label.getAttribute('data-vehicle');
      var checked = has(id);
      var disabled = !checked && ids.length >= MAX;
      var input = label.querySelector('.checkbox__input');
      label.classList.toggle('is-checked', checked);
      label.classList.toggle('drp-disabled', disabled);
      if (input) { input.checked = checked; input.disabled = disabled; }
    });
  }

  /* ---- tray -------------------------------------------------------------- */
  function chip(v) {
    return '<span class="chip chip--dismissable chip--md">' + v.year + ' ' + v.model +
      '<button type="button" class="chip__dismiss" aria-label="Remove ' + v.model + ' from compare" data-cmp-remove="' + v.id + '"><i class="drp-icon drp-icon--close" aria-hidden="true"></i></button></span>';
  }
  function renderTray() {
    if (!ids.length) {
      tray.hidden = true; tray.innerHTML = '';
      document.body.classList.remove('gmvsr-has-tray');
      return;
    }
    tray.hidden = false;
    document.body.classList.add('gmvsr-has-tray');
    var full = ids.length >= MAX;
    tray.innerHTML =
      '<div class="gmvsr-compare-tray__inner">' +
        '<div class="gmvsr-compare-tray__items">' +
          '<span class="gmvsr-compare-tray__title">Compare' + (full ? ' <span class="gmvsr-compare-tray__hint">(maximum 3 vehicles)</span>' : '') + '</span>' +
          ids.map(function (id) { return chip(vehicle(id)); }).join('') +
        '</div>' +
        '<div class="gmvsr-compare-tray__actions">' +
          '<button type="button" class="drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-medium" data-cmp-clear>Clear all</button>' +
          '<button type="button" class="drp-button-contained-container-bg-medium drp-button-contained-color-primary-filled' + (ids.length < 2 ? ' drp-disabled' : '') + '" data-cmp-open' + (ids.length < 2 ? ' disabled' : '') + '>Compare Now (' + ids.length + ')</button>' +
        '</div>' +
      '</div>';
  }

  /* ---- toggle / mutations ------------------------------------------------ */
  function toggle(id) {
    if (has(id)) { ids.splice(ids.indexOf(id), 1); }
    else if (ids.length < MAX) { ids.push(id); }
    save(); reflectControls(); renderTray();
  }
  function remove(id) { if (has(id)) { ids.splice(ids.indexOf(id), 1); save(); reflectControls(); renderTray(); } }
  function clearAll() { ids = []; save(); reflectControls(); renderTray(); }

  /* ---- compare modal (side-by-side spec table) --------------------------- */
  function warranty(v) {
    var base = '3-yr / 36,000-mi bumper-to-bumper · 5-yr / 60,000-mi powertrain';
    return v.tags.indexOf('electric') !== -1 ? base + ' · 8-yr / 100,000-mi battery' : base;
  }
  function driveType(v) { return v.tags.indexOf('truck') !== -1 || v.tags.indexOf('suv') !== -1 ? 'AWD / 4WD available' : v.tags.indexOf('performance') !== -1 ? 'RWD' : 'FWD'; }
  function seatsOf(v) { var big = ['Tahoe', 'Suburban', 'Traverse']; return v.model === 'Corvette' ? '2' : v.model === 'Camaro' ? '4' : big.indexOf(v.model) !== -1 ? '7' : '5'; }

  function row(label, cells, isHead) {
    return '<tr class="gmvsr-cmp__row' + (isHead ? ' gmvsr-cmp__row--head' : '') + '"><th scope="row" class="gmvsr-cmp__rowlabel">' + label + '</th>' +
      cells.map(function (c) { return '<td class="gmvsr-cmp__cell">' + c + '</td>'; }).join('') + '</tr>';
  }
  function openModal() {
    if (ids.length < 2) return;
    var vs = ids.map(vehicle);
    var head = '<tr><th scope="col" class="gmvsr-cmp__corner">Compare (' + vs.length + ')</th>' +
      vs.map(function (v) {
        return '<th scope="col" class="gmvsr-cmp__vehhead"><span class="gmvsr-cmp__vehname">' + v.year + ' Chevrolet ' + v.model + '</span><span class="gmvsr-cmp__vehtrim">' + v.trim + ' · ' + v.colorExtLabel + '</span></th>';
      }).join('') + '</tr>';
    var body =
      row('Price After Offers', vs.map(function (v) { return '<strong>' + money(v.price - v.discount) + '</strong>'; })) +
      row('MSRP', vs.map(function (v) { return money(v.msrp); })) +
      row('Est. Monthly (finance)', vs.map(function (v) { return money(v.monthly) + '/mo.'; })) +
      row('Availability', vs.map(function (v) { return v.availability; })) +
      row('Distance', vs.map(function (v) { return v.distanceMi + ' mi.'; })) +
      row('Days on lot', vs.map(function (v) { return v.daysOnLot; })) +
      row('Drivetrain', vs.map(driveType)) +
      row('Seats', vs.map(seatsOf)) +
      row('Exterior color', vs.map(function (v) { return v.colorExtLabel; })) +
      row('Key features', vs.map(function (v) { return v.features.join(', '); })) +
      row('Warranty', vs.map(warranty));

    panel.innerHTML =
      '<div class="gmvsr-cmp">' +
        '<div class="gmvsr-cmp__header"><h2 class="gmvsr-cmp__heading">Compare vehicles</h2>' +
          '<button type="button" class="drp-button-contained-icon-container-circle-bg-small drp-button-contained-color-primary-plain" aria-label="Close compare" data-cmp-close><i class="drp-icon drp-icon--circle-close" aria-hidden="true"></i></button></div>' +
        '<div class="gmvsr-cmp__scroll"><table class="gmvsr-cmp__table"><thead>' + head + '</thead><tbody>' + body + '</tbody></table></div>' +
      '</div>';
    modal.hidden = false;
    document.body.classList.add('gmvsr-modal-open');
    var c = panel.querySelector('[data-cmp-close]'); if (c) c.focus();
  }
  function closeModal() {
    modal.hidden = true; panel.innerHTML = '';
    document.body.classList.remove('gmvsr-modal-open');
  }

  /* ---- events ------------------------------------------------------------ */
  document.addEventListener('change', function (e) {
    var label = e.target.closest && e.target.closest('[data-compare]');
    if (label && e.target.classList.contains('checkbox__input')) { toggle(label.getAttribute('data-vehicle')); }
  });
  document.addEventListener('click', function (e) {
    var rm = e.target.closest('[data-cmp-remove]');
    if (rm) { remove(rm.getAttribute('data-cmp-remove')); return; }
    if (e.target.closest('[data-cmp-clear]')) { clearAll(); return; }
    if (e.target.closest('[data-cmp-open]')) { openModal(); return; }
    if (!modal.hidden && (e.target.closest('[data-cmp-close]') || e.target === modal.querySelector('.gmvsr-modal__scrim'))) { closeModal(); return; }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  window.GMVSR_COMPARE = { controlHtml: controlHtml, reflectControls: reflectControls };
  renderTray();
})();
