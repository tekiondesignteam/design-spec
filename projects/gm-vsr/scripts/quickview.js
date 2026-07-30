/* ============================================================================
   gm-vsr — Step 6: Quick View modal (Alloy vsr-quick-view + vsr-math-box)
   ----------------------------------------------------------------------------
   Desktop-only preview launched from a card's "Quick View" CTA (mobile cards
   have no Quick View — they fall back to full-width "View Details"). Composes
   two Alloy components via their canonical .drp-* classes:
     • vsr-quick-view — gallery + identity + 2x2 specs + Key Options + CTAs
     • vsr-math-box   — itemized Price Summary (the quick-view has no price of
                        its own; pricing lives here), mode = active payment tab,
                        status mapped from availability.
   Alloy ships no overlay for these; the scrim/modal is project-local.
   ============================================================================ */
(function () {
  'use strict';

  var D = window.GMVSR_DATA;
  var modal = document.getElementById('gmvsr-quickview');
  var panel = document.getElementById('gmvsr-quickview-panel');
  if (!D || !modal || !panel) return;

  function money(n) { return '$' + Math.round(n).toLocaleString('en-US'); }
  function swatchFill(value) { for (var i = 0; i < D.COLORS.length; i++) if (D.COLORS[i].value === value) return D.COLORS[i].fill; return '#888'; }
  function glyphFor(v) { return v.tags.indexOf('truck') !== -1 ? 'car-truck' : v.tags.indexOf('suv') !== -1 ? 'car-suv' : 'car'; }
  function isEV(v) { return v.tags.indexOf('electric') !== -1; }

  /* ---- synthesized specs (mock has no drivetrain detail) ----------------- */
  function specs(v) {
    var big = ['Tahoe', 'Suburban', 'Traverse'];
    var seats = v.model === 'Corvette' ? '2 Seater' : v.model === 'Camaro' ? '4 Seater' : big.indexOf(v.model) !== -1 ? '7 Seater' : '5 Seater';
    var engine = isEV(v) ? 'Electric drive unit' : v.tags.indexOf('truck') !== -1 ? '5.3L V8' : v.model === 'Corvette' ? '6.2L V8' : '1.5L Turbo I4';
    var rangeLabel = isEV(v) ? 'Battery Range' : 'Est. Range';
    var rangeVal = isEV(v) ? (260 + (v.daysOnLot % 60)) + ' mi' : (380 + (v.daysOnLot % 90)) + ' mi';
    var trans = isEV(v) ? '1-Speed A/T' : '10-Speed A/T';
    return [
      { glyph: 'engine', label: 'Engine', value: engine },
      { glyph: 'battery-range', label: rangeLabel, value: rangeVal },
      { glyph: 'transmission', label: 'Transmission', value: trans },
      { glyph: 'seats', label: 'Seats', value: seats }
    ];
  }

  var OPTIONS = ['Driver Confidence II Package - $1,095', 'Panoramic Sunroof - $1,595', 'Premium Bose Audio - $ included', 'All-Weather Floor Liners - $325'];

  /* ---- Quick View panel -------------------------------------------------- */
  function navBtn(dir) {
    var g = dir === 'prev' ? 'circle-arrow-left' : 'circle-arrow-right';
    return '<button type="button" aria-label="' + (dir === 'prev' ? 'Previous' : 'Next') + ' image" class="drp-button-contained-icon-container-circle-bg-small drp-button-contained-color-primary-plain drp-vsr-quick-view__nav-' + dir + '" data-qv-nav="' + dir + '"><i class="drp-icon drp-icon--' + g + '" aria-hidden="true"></i></button>';
  }
  function dots(active, total) {
    var out = '';
    for (var i = 0; i < total; i++) out += '<span role="tab" aria-selected="' + (i === active) + '" class="drp-vsr-quick-view__dot' + (i === active ? ' is-active' : '') + '"></span>';
    return out;
  }
  function quickViewHtml(v) {
    var s = specs(v);
    var savedNow = !!(window.GMVSR_RESULTS && window.GMVSR_RESULTS.saved[v.id]);
    return '<div class="drp-vsr-quick-view" role="document" aria-label="' + v.year + ' Chevrolet ' + v.model + ' quick view">' +
      '<button type="button" aria-label="Close quick view" class="drp-button-contained-icon-container-circle-bg-small drp-button-contained-color-primary-plain drp-vsr-quick-view__close" data-qv-close><i class="drp-icon drp-icon--circle-close" aria-hidden="true"></i></button>' +

      '<div class="drp-vsr-quick-view__media">' +
        '<div class="drp-vsr-quick-view__gallery">' + navBtn('prev') +
          '<div class="drp-vsr-quick-view__hero gmvsr-card-image"><i class="drp-icon drp-icon--' + glyphFor(v) + ' gmvsr-card-image__glyph" aria-hidden="true"></i></div>' +
          navBtn('next') +
          '<div class="drp-vsr-quick-view__dots" role="tablist" aria-label="Image position">' + dots(0, 6) + '</div>' +
        '</div>' +
        '<div class="drp-vsr-quick-view__color-row">' +
          '<div class="drp-vsr-quick-view__color-callout"><span class="drp-vsr-quick-view__color-swatch" style="background:' + swatchFill(v.colorExt) + '" aria-hidden="true"></span>' +
            '<div class="drp-vsr-quick-view__color-meta"><span class="drp-vsr-quick-view__color-label">Exterior</span><span class="drp-vsr-quick-view__color-name">' + v.colorExtLabel + '</span></div></div>' +
          '<div class="drp-vsr-quick-view__color-callout"><span class="drp-vsr-quick-view__color-swatch" style="background:#1a1a1a" aria-hidden="true"></span>' +
            '<div class="drp-vsr-quick-view__color-meta"><span class="drp-vsr-quick-view__color-label">Interior</span><span class="drp-vsr-quick-view__color-name">Jet Black</span></div></div>' +
        '</div>' +
      '</div>' +

      '<div class="drp-vsr-quick-view__info">' +
        '<div class="drp-vsr-quick-view__identity">' +
          '<div class="drp-vsr-quick-view__name-block"><h2 class="drp-vsr-quick-view__title">' +
            '<span class="drp-vsr-quick-view__title-line">' + v.year + ' Chevrolet ' + v.model + '</span>' +
            '<span class="drp-vsr-quick-view__title-line">' + v.trim + '</span></h2>' +
            '<span class="drp-vsr-quick-view__vin">VIN: ' + v.vin + '</span></div>' +
          '<div class="drp-vsr-quick-view__status-block"><span class="drp-vsr-quick-view__status">' + v.availability + '</span>' +
            '<span class="drp-vsr-quick-view__dealership">Riverside Chevrolet<span class="drp-vsr-quick-view__distance">(' + v.distanceMi + ' miles)</span></span></div>' +
        '</div>' +

        '<div class="drp-vsr-quick-view__specs">' + s.map(function (sp) {
          return '<div class="drp-vsr-quick-view__spec-item"><div class="drp-vsr-quick-view__spec-icon"><i class="drp-icon drp-icon--' + sp.glyph + '" aria-hidden="true"></i></div>' +
            '<div class="drp-vsr-quick-view__spec-text"><span class="drp-vsr-quick-view__spec-label">' + sp.label + '</span><span class="drp-vsr-quick-view__spec-value">' + sp.value + '</span></div></div>';
        }).join('') + '</div>' +

        '<div><h3 class="drp-vsr-quick-view__options-heading">Key Installed Options</h3>' +
          '<ul class="drp-vsr-quick-view__options-list" style="margin-top:12px">' + OPTIONS.slice(0, 3).map(function (o) { return '<li class="drp-vsr-quick-view__options-item">' + o + '</li>'; }).join('') + '</ul></div>' +

        '<div class="drp-vsr-quick-view__cta-row">' +
          '<button type="button" class="drp-button-contained-container-bg-large drp-button-contained-color-primary-outlined" data-qv-fav aria-pressed="' + savedNow + '">' +
            '<i class="drp-icon drp-icon--' + (savedNow ? 'heart-fill' : 'heart') + ' drp-vsr-quick-view__favorite-icon" aria-hidden="true"></i>' + (savedNow ? 'Saved' : 'Add to Favorites') + '</button>' +
          '<a href="#/vdp/' + v.vin + '" class="drp-button-contained-container-bg-large drp-button-contained-color-primary-filled" data-qv-buy>View &amp; Buy</a>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /* ---- Price Summary (vsr-math-box) -------------------------------------- */
  function line(label, amount, note) {
    return '<div class="drp-vsr-math-box__line"><div class="drp-vsr-math-box__line-row"><span class="drp-vsr-math-box__line-label">' + label + '</span><span class="drp-vsr-math-box__line-amount">' + amount + '</span></div>' +
      (note ? '<p class="drp-vsr-math-box__line-note">' + note + '</p>' : '') + '</div>';
  }
  function total(label, amount) { return '<div class="drp-vsr-math-box__total"><span class="drp-vsr-math-box__total-label">' + label + '</span><span class="drp-vsr-math-box__total-amount">' + amount + '</span></div>'; }

  function statusFor(v) { return v.availability === 'In Stock' ? 'available' : v.availability === 'In Transit' ? 'in-transit' : 'central-stock'; }

  function mathBoxHtml(v, payment) {
    var status = statusFor(v);
    var net = v.price - v.discount;
    var lines = '', totals = '';
    if (payment === 'finance') {
      lines = line('MSRP - Total Vehicle Price', money(v.msrp)) +
        line('Monthly Term', '72 months') +
        line('Annual Percentage Rate', '5.9% APR', 'Subject to credit approval.') +
        line('Down Payment', '-' + money(2500));
      if (status !== 'central-stock') totals += total('Est. Remaining Balance', money(net - 2500));
      totals += total('Est. Monthly Payment', money(v.monthly) + '/mo.');
    } else if (payment === 'lease') {
      lines = line('MSRP - Total Vehicle Price', money(v.msrp)) +
        line('Monthly Term', '36 months') +
        line('Annual Mileage', '12,000 miles', '$0.25 per mile over 12,000 miles/yr.') +
        line('Due at Signing', money(2500));
      totals = total('Est. Monthly Payment', money(Math.round(v.monthly * 0.82)) + '/mo.');
    } else { // cash
      lines = line('MSRP - Total Vehicle Price', money(v.msrp)) +
        line('Dealer Discount & Incentives', '-' + money(v.discount), 'Applied offers vary by eligibility.');
      totals = total(status === 'central-stock' ? 'Price After Offers' : 'Dealer Price After Offers', money(net));
    }

    var offers = '';
    if (status !== 'central-stock' && isEV(v)) {
      offers = '<div class="drp-vsr-math-box__offers"><p class="drp-vsr-math-box__offers-title">Other offers you may qualify for</p><ul class="drp-vsr-math-box__offers-list">' +
        '<li class="drp-vsr-math-box__offer"><span class="drp-vsr-math-box__offer-label">Potential Federal EV Tax Credit<i class="drp-icon drp-icon--asterisk" aria-hidden="true"></i></span><span class="drp-vsr-math-box__offer-value">-$7,500.00</span></li>' +
        '<li class="drp-vsr-math-box__offer"><span class="drp-vsr-math-box__offer-label">California Clean Vehicle Rebate<i class="drp-icon drp-icon--asterisk" aria-hidden="true"></i></span><span class="drp-vsr-math-box__offer-value">-$750.00</span></li>' +
        '</ul></div>';
    }

    var notice = status === 'in-transit' ? '<p class="drp-vsr-math-box__notice">Pricing for in-transit vehicles is subject to change.</p>' : '';
    var disclaimer = (status === 'central-stock' ? 'Subject to final dealer pricing. ' : '') +
      'Tax, title, license, and dealer fees extra. Your payments may vary. You may qualify for additional offers and discounts. Contact dealer for details.';

    return '<section class="drp-vsr-math-box" aria-label="Price summary">' +
      '<header class="drp-vsr-math-box__header"><h3 class="drp-vsr-math-box__title">Price Summary</h3>' +
        '<button type="button" aria-label="Close price summary" class="drp-button-contained-icon-container-rect-bg-small drp-button-contained-color-primary-plain drp-vsr-math-box__close" data-qv-close><i class="drp-icon drp-icon--close" aria-hidden="true"></i></button></header>' +
      '<div class="drp-vsr-math-box__lines">' + lines + '</div>' +
      '<div class="drp-vsr-math-box__totals">' + totals + '</div>' +
      offers +
      '<div class="drp-vsr-math-box__footer">' + notice + '<p class="drp-vsr-math-box__disclaimer">' + disclaimer + '</p></div>' +
    '</section>';
  }

  /* ---- open / close ------------------------------------------------------ */
  var lastTrigger = null;
  function open(v) {
    var payment = window.GMVSR_RESULTS ? window.GMVSR_RESULTS.getPayment() : 'cash';
    panel.innerHTML = quickViewHtml(v) + mathBoxHtml(v, payment);
    panel.setAttribute('data-vehicle', v.id);
    modal.hidden = false;
    document.body.classList.add('gmvsr-modal-open');
    var closeBtn = panel.querySelector('.drp-vsr-quick-view__close');
    if (closeBtn) closeBtn.focus();
  }
  function close() {
    modal.hidden = true;
    panel.innerHTML = '';
    document.body.classList.remove('gmvsr-modal-open');
    if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
  }

  /* ---- events ------------------------------------------------------------ */
  document.addEventListener('click', function (e) {
    var qv = e.target.closest('[data-quick-view]');
    if (qv) {
      var card = qv.closest('[data-vehicle]');
      if (!card) return;
      var id = card.getAttribute('data-vehicle');
      var v = D.fleet.filter(function (x) { return x.id === id; })[0];
      if (v) { lastTrigger = qv; open(v); }
      return;
    }
    if (modal.hidden) return;
    if (e.target.closest('[data-qv-close]')) { close(); return; }
    // Add to Favorites (sync with grid card heart)
    var fav = e.target.closest('[data-qv-fav]');
    if (fav) {
      var vid = panel.getAttribute('data-vehicle');
      var R = window.GMVSR_RESULTS;
      R.saved[vid] = !R.saved[vid];
      var on = !!R.saved[vid];
      fav.setAttribute('aria-pressed', String(on));
      fav.querySelector('.drp-icon').className = 'drp-icon drp-icon--' + (on ? 'heart-fill' : 'heart') + ' drp-vsr-quick-view__favorite-icon';
      fav.lastChild.textContent = on ? 'Saved' : 'Add to Favorites';
      if (R.persistSaved) R.persistSaved();
      R.reflectSaved(vid);
      return;
    }
    // data-qv-buy is a real link-out (anchor) → VDP; no handler needed.
    // scrim click
    if (e.target === modal.querySelector('.gmvsr-modal__scrim')) close();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) close(); });
})();
