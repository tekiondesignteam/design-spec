/* =============================================================================
   DRP Design System — Brand Switcher
   Reads localStorage on init, marks the active tab, and wires click events.
   The inline <script> in <head> already applied data-brand to <html> before
   first paint — this script only handles the tab UI wiring.
   ============================================================================= */

(function () {
  var STORAGE_KEY = 'drp-brand';
  var VALID = ['chevrolet', 'buick', 'gmc', 'cadillac'];

  function getStored() {
    try {
      var b = localStorage.getItem(STORAGE_KEY);
      return (b && VALID.indexOf(b) !== -1) ? b : 'chevrolet';
    } catch (e) {
      return 'chevrolet';
    }
  }

  function applyBrand(brand) {
    document.documentElement.dataset.brand = brand;
    try { localStorage.setItem(STORAGE_KEY, brand); } catch (e) {}
    var tabs = document.querySelectorAll('.brand-tabs__tab');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle('is-active', tabs[i].dataset.brand === brand);
    }
  }

  function init() {
    var tabs = document.querySelectorAll('.brand-tabs__tab');
    if (!tabs.length) return;
    var current = getStored();
    applyBrand(current);
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', function () {
        applyBrand(this.dataset.brand);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
