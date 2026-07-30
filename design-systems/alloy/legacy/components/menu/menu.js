/* ── Toggle menu open/close ────────────────────────────────── */
document.querySelectorAll('[data-menu]').forEach(function(trigger) {
  trigger.addEventListener('click', function(e) {
    e.stopPropagation();
    var menu = document.getElementById(trigger.dataset.menu);
    if (!menu) return;
    var opening = !menu.classList.contains('is-open');
    // Close all open triggered menus (exclude static demo panels which have no id)
    document.querySelectorAll('.drp-list-container-bg.is-open[id]').forEach(function(m) {
      m.classList.remove('is-open');
    });
    document.querySelectorAll('[data-menu]').forEach(function(t) {
      t.setAttribute('aria-expanded', 'false');
    });
    if (opening) {
      menu.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ── Item selection (single-select, closes menu after pick) ── */
document.querySelectorAll('.drp-list-container-bg[id]').forEach(function(menu) {
  menu.querySelectorAll('.drp-list-item-container-bg:not([disabled])').forEach(function(item) {
    item.addEventListener('click', function() {
      menu.querySelectorAll('.drp-list-item-container-bg').forEach(function(i) {
        i.classList.remove('is-selected');
        i.setAttribute('aria-checked', 'false');
      });
      item.classList.add('is-selected');
      item.setAttribute('aria-checked', 'true');
      // Close the triggered menu
      if (menu.id) {
        menu.classList.remove('is-open');
        var trigger = document.querySelector('[data-menu="' + menu.id + '"]');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });
});

/* ── Search filtering ─────────────────────────────────────── */
document.querySelectorAll('.menu__search-input').forEach(function(input) {
  input.addEventListener('input', function() {
    var q = input.value.toLowerCase();
    var menu = input.closest('.drp-list-container-bg');
    if (!menu) return;
    menu.querySelectorAll('.drp-list-item-container-bg').forEach(function(item) {
      var lbl = item.querySelector('.menu__label');
      var match = !q || (lbl && lbl.textContent.toLowerCase().includes(q));
      item.style.display = match ? '' : 'none';
    });
  });
  // Prevent outside-click handler from firing when typing
  input.addEventListener('click', function(e) { e.stopPropagation(); });
});

/* ── Close on outside click ───────────────────────────────── */
document.addEventListener('click', function() {
  document.querySelectorAll('.drp-list-container-bg.is-open').forEach(function(menu) {
    if (menu.id) { // only for triggered menus, not static demos
      menu.classList.remove('is-open');
      var trigger = document.querySelector('[data-menu="' + menu.id + '"]');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }
  });
});
