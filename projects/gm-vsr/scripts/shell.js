/* ============================================================================
   gm-vsr — Step 1 shell controller
   ----------------------------------------------------------------------------
   Mirrors Alloy's header.tsx: the tier-3 header uses a DIFFERENT DOM per
   viewport (desktop = one row; tablet = two rows; mobile = brand + actions,
   no nav). We render the matching markup and set data-viewport on header +
   footer so Alloy's own CSS ([data-viewport="..."]) drives the styling.

   Breakpoints follow the Alloy constitution: mobile < 600 · tablet 600–1023 ·
   desktop >= 1024.

   All classes below are Alloy's own (.drp-header*, .drp-button-link-*,
   .drp-avatar*). Nav links and the avatar are naturally focusable (no
   tabindex=-1) to meet constitution §7 keyboard operability — this is a real
   page, not the read-only doc demo that suppressed focus.
   ============================================================================ */
(function () {
  'use strict';

  var LOGO = '../../design-systems/alloy/assets/brand-logos/chevrolet.svg';
  var DEALERSHIP = 'RIVERSIDE CHEVROLET';
  var NAV = ['Search Inventory', 'Build &amp; Buy']; // Alloy TIER_3_NAV

  var header = document.getElementById('site-header');
  var footer = document.getElementById('site-footer');

  // Key off the SAME matchMedia breakpoints the layout CSS uses, so the
  // header DOM and the shell layout can never disagree (a single source of
  // truth for the mobile<600 / tablet<1024 / desktop bands).
  function viewportFor() {
    if (window.matchMedia('(max-width: 599px)').matches) return 'mobile';
    if (window.matchMedia('(max-width: 1023px)').matches) return 'tablet';
    return 'desktop';
  }

  function brandBlock() {
    return (
      '<div class="drp-header__brand">' +
        '<img class="drp-header__logo" src="' + LOGO + '" alt="Chevrolet logo" />' +
        '<div class="drp-header__divider" aria-hidden="true"></div>' +
        '<p class="drp-header__dealership">' + DEALERSHIP + '</p>' +
      '</div>'
    );
  }

  function navLinks() {
    return NAV.map(function (label) {
      return '<a href="#" class="drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-large">' + label + '</a>';
    }).join('');
  }

  function menuButton() {
    return (
      '<button type="button" class="drp-header__icon-btn" aria-label="Open menu">' +
        '<svg width="24" height="24" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
          '<path d="M.5 3.33c0-.27.22-.5.5-.5h14a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5M.5 8c0-.28.22-.5.5-.5h14a.5.5 0 0 1 0 1H1A.5.5 0 0 1 .5 8m0 4.67c0-.28.22-.5.5-.5h14a.5.5 0 1 1 0 1H1a.5.5 0 0 1-.5-.5" fill="currentColor"/>' +
        '</svg>' +
      '</button>'
    );
  }

  function avatar(size) {
    var cls = 'drp-avatar' + (size === 'mobile' ? ' drp-avatar--mobile' : '');
    return (
      '<button type="button" class="' + cls + '" aria-label="Account menu">' +
        '<span class="drp-avatar__initials">AM</span>' +
      '</button>'
    );
  }

  function actions(size) {
    return '<div class="drp-header__actions">' + avatar(size) + menuButton() + '</div>';
  }

  function renderHeader(vp) {
    if (vp === 'mobile') {
      return brandBlock() + actions('mobile');
    }
    if (vp === 'tablet') {
      return (
        '<div class="drp-header__top-row">' + brandBlock() + actions('mobile') + '</div>' +
        '<nav class="drp-header__nav-row" aria-label="Primary">' + navLinks() + '</nav>'
      );
    }
    // desktop
    return (
      brandBlock() +
      '<nav class="drp-header__nav" aria-label="Primary">' + navLinks() + '</nav>' +
      actions('desktop')
    );
  }

  var current = null;
  function sync() {
    var vp = viewportFor();
    header.setAttribute('data-viewport', vp);
    footer.setAttribute('data-viewport', vp);
    if (vp !== current) {
      header.innerHTML = renderHeader(vp);
      current = vp;
    }
  }

  sync();
  var raf = null;
  window.addEventListener('resize', function () {
    if (raf) return;
    raf = window.requestAnimationFrame(function () { raf = null; sync(); });
  });
})();
