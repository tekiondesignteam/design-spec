/* ── Accordion group toggle (single-expand) ─────────────────── */
document.querySelectorAll('.drp-accordion-container-bg[data-group] .drp-accordion-container-summary-bg').forEach(function(header) {
  if (header.disabled) return;
  header.addEventListener('click', function() {
    var accordion = header.closest('.drp-accordion-container-bg');
    var groupId   = accordion.dataset.group;
    var isOpen    = accordion.classList.contains('is-open');

    document.querySelectorAll('.drp-accordion-container-bg[data-group="' + groupId + '"]').forEach(function(a) {
      a.classList.remove('is-open');
      var h = a.querySelector('.drp-accordion-container-summary-bg');
      if (h) h.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      accordion.classList.add('is-open');
      header.setAttribute('aria-expanded', 'true');
    }
  });
});
