document.querySelectorAll('.drp-stepper-container[data-stepgroup]').forEach(function(stepper) {
  var items = stepper.querySelectorAll('.drp-stepper-item');
  var prevBtn = stepper.querySelector('.drp-stepper-nav--prev');
  var nextBtn = stepper.querySelector('.drp-stepper-nav--next');

  function getActiveIdx() {
    return Array.from(items).findIndex(function(i) { return i.classList.contains('is-active'); });
  }

  function setActive(idx) {
    items.forEach(function(item, j) {
      item.classList.toggle('is-active', j === idx);
      item.setAttribute('aria-selected', j === idx ? 'true' : 'false');
    });
    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.disabled = idx === items.length - 1;
    // Scroll active step into view on mobile track
    var track = items[idx] && items[idx].closest('.drp-stepper-track');
    if (track) {
      items[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }

  items.forEach(function(item, idx) {
    item.addEventListener('click', function() { setActive(idx); });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      var cur = getActiveIdx();
      if (cur > 0) setActive(cur - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      var cur = getActiveIdx();
      if (cur < items.length - 1) setActive(cur + 1);
    });
  }

  // Initialise nav button disabled states
  var initIdx = getActiveIdx();
  if (initIdx >= 0) {
    if (prevBtn) prevBtn.disabled = initIdx === 0;
    if (nextBtn) nextBtn.disabled = initIdx === items.length - 1;
  }
});
