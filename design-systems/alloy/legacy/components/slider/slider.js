/* ── Single slider ─────────────────────────────────────────── */
function updateSingle(input, output) {
  var min = +input.min || 0, max = +input.max || 100;
  var pct = ((+input.value - min) / (max - min)) * 100;
  input.style.setProperty('--fill', pct + '%');
  if (output) output.textContent = input.value;
}

var singleSlider = document.getElementById('single-slider');
var singleOut    = document.getElementById('single-out');
if (singleSlider) {
  updateSingle(singleSlider, singleOut);
  singleSlider.addEventListener('input', function() { updateSingle(this, singleOut); });
}

/* ── Range slider ──────────────────────────────────────────── */
function updateRange(lower, upper, fill, outLower, outUpper) {
  var min = +lower.min || 0, max = +lower.max || 100;
  // Prevent thumbs from crossing
  if (+lower.value > +upper.value) lower.value = upper.value;
  if (+upper.value < +lower.value) upper.value = lower.value;
  var lPct = ((+lower.value - min) / (max - min)) * 100;
  var uPct = ((+upper.value - min) / (max - min)) * 100;
  fill.style.left  = lPct + '%';
  fill.style.right = (100 - uPct) + '%';
  // z-index: whichever thumb is at max should be below so the other is reachable
  lower.style.zIndex = (+lower.value >= max) ? 5 : 4;
  upper.style.zIndex = (+lower.value >= max) ? 4 : 5;
  if (outLower) outLower.textContent = lower.value;
  if (outUpper) outUpper.textContent = upper.value;
}

var rangeLower   = document.getElementById('range-lower');
var rangeUpper   = document.getElementById('range-upper');
var rangeFill    = document.getElementById('range-fill');
var rangeOutLo   = document.getElementById('range-out-lower');
var rangeOutHi   = document.getElementById('range-out-upper');

if (rangeLower && rangeUpper && rangeFill) {
  updateRange(rangeLower, rangeUpper, rangeFill, rangeOutLo, rangeOutHi);
  rangeLower.addEventListener('input', function() {
    updateRange(rangeLower, rangeUpper, rangeFill, rangeOutLo, rangeOutHi);
  });
  rangeUpper.addEventListener('input', function() {
    updateRange(rangeLower, rangeUpper, rangeFill, rangeOutLo, rangeOutHi);
  });
}

/* ── States: single ───────────────────────────────────────── */
var statesSingle    = document.getElementById('states-single');
var statesSingleOut = document.getElementById('states-single-out');
if (statesSingle) {
  updateSingle(statesSingle, statesSingleOut);
  statesSingle.addEventListener('input', function() { updateSingle(this, statesSingleOut); });
}

/* ── States: range ────────────────────────────────────────── */
var statesRangeLo   = document.getElementById('states-range-lo');
var statesRangeHi   = document.getElementById('states-range-hi');
var statesRangeFill = document.getElementById('states-range-fill');
var statesRangeOutLo = document.getElementById('states-range-out-lo');
var statesRangeOutHi = document.getElementById('states-range-out-hi');
if (statesRangeLo && statesRangeHi && statesRangeFill) {
  updateRange(statesRangeLo, statesRangeHi, statesRangeFill, statesRangeOutLo, statesRangeOutHi);
  statesRangeLo.addEventListener('input', function() {
    updateRange(statesRangeLo, statesRangeHi, statesRangeFill, statesRangeOutLo, statesRangeOutHi);
  });
  statesRangeHi.addEventListener('input', function() {
    updateRange(statesRangeLo, statesRangeHi, statesRangeFill, statesRangeOutLo, statesRangeOutHi);
  });
}
