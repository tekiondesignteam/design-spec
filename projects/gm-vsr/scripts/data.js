/* ============================================================================
   gm-vsr — mock Chevrolet inventory (Step 2+)
   ----------------------------------------------------------------------------
   Design-against-mock data (real search API is OUT OF SCOPE per spec). This is
   the single inventory source for the whole VSR: the filter live-count (Step 2)
   and the vehicle cards (Step 4) both read from it. Chevrolet only.
   ============================================================================ */
(function () {
  'use strict';

  // Filter taxonomies (labels + values + option glyphs for quick filters).
  var MODELS = [
    'Blazer EV', 'Equinox EV', 'Silverado EV', 'Silverado 1500',
    'Colorado', 'Tahoe', 'Suburban', 'Traverse', 'Equinox', 'Trax',
    'Malibu', 'Corvette', 'Camaro'
  ];

  // Exterior colors → swatch fills (Alloy documented neutral literals / brand-safe hexes).
  var COLORS = [
    { value: 'black', label: 'Mosaic Black', fill: '#0a0a0a', bordered: false },
    { value: 'white', label: 'Summit White', fill: '#ffffff', bordered: true },
    { value: 'silver', label: 'Silver Ice', fill: '#c9ccce', bordered: true },
    { value: 'gray', label: 'Sterling Gray', fill: '#6b6f73', bordered: false },
    { value: 'red', label: 'Red Hot', fill: '#b3141c', bordered: false },
    { value: 'blue', label: 'Riptide Blue', fill: '#1c4fb3', bordered: false },
    { value: 'twotone', label: 'Two-tone', fill: 'linear-gradient(90deg,#0a0a0a 0 50%,#b3141c 50% 100%)', bordered: false }
  ];

  var FEATURES = [
    'Super Cruise', 'AWD / 4WD', 'Sunroof / Moonroof', 'Heated Seats',
    'Adaptive Cruise', 'Tow Package', 'Bose Audio', 'Ventilated Seats'
  ];

  // Quick filters map to body tags carried on each vehicle.
  var QUICK = [
    { value: 'electric', label: 'Electric', icon: 'zap' },
    { value: 'suv', label: 'SUV', icon: 'car-suv' },
    { value: 'truck', label: 'Truck', icon: 'car-truck' },
    { value: 'performance', label: 'Performance', icon: 'car' }
  ];

  // Per-model traits used to build the fleet deterministically.
  var MODEL_TRAITS = {
    'Blazer EV':      { tags: ['electric', 'suv'],   base: 46900, trims: ['LT', 'RS', 'SS'] },
    'Equinox EV':     { tags: ['electric', 'suv'],   base: 34995, trims: ['LT', 'RS'] },
    'Silverado EV':   { tags: ['electric', 'truck'], base: 74800, trims: ['WT', 'RST'] },
    'Silverado 1500': { tags: ['truck'],             base: 38300, trims: ['WT', 'LT', 'RST', 'High Country'] },
    'Colorado':       { tags: ['truck'],             base: 31500, trims: ['WT', 'Trail Boss', 'Z71'] },
    'Tahoe':          { tags: ['suv'],               base: 58200, trims: ['LS', 'LT', 'Z71', 'Premier'] },
    'Suburban':       { tags: ['suv'],               base: 61200, trims: ['LS', 'LT', 'Premier'] },
    'Traverse':       { tags: ['suv'],               base: 39900, trims: ['LT', 'RS', 'Z71'] },
    'Equinox':        { tags: ['suv'],               base: 28600, trims: ['LT', 'RS', 'Activ'] },
    'Trax':           { tags: ['suv'],               base: 21495, trims: ['LS', 'LT', 'ACTIV'] },
    'Malibu':         { tags: [],                    base: 26700, trims: ['LS', 'RS'] },
    'Corvette':       { tags: ['performance'],       base: 68300, trims: ['Stingray', 'Z06'] },
    'Camaro':         { tags: ['performance'],       base: 32500, trims: ['LT', 'SS', 'ZL1'] }
  };

  var FEATURE_POOL = FEATURES.slice();
  var AVAIL = ['In Stock', 'In Stock', 'In Stock', 'In Transit', 'Factory Order'];

  // Deterministic pseudo-random so counts are stable across reloads.
  function seeded(i) { var x = Math.sin(i * 99.13) * 10000; return x - Math.floor(x); }

  function buildFleet() {
    var fleet = [];
    var id = 1000;
    var modelNames = Object.keys(MODEL_TRAITS);
    // ~2 units per model = 26 vehicles.
    for (var m = 0; m < modelNames.length; m++) {
      var name = modelNames[m];
      var t = MODEL_TRAITS[name];
      var units = 2;
      for (var u = 0; u < units; u++) {
        var r = seeded(id);
        var trim = t.trims[Math.floor(r * t.trims.length)];
        var color = COLORS[Math.floor(seeded(id + 1) * COLORS.length)];
        var price = t.base + Math.round((seeded(id + 2) * 12000) / 100) * 100;
        var discount = Math.round((seeded(id + 3) * 3500) / 100) * 100;
        // 1–3 features, deterministic.
        var feats = [];
        for (var f = 0; f < FEATURE_POOL.length; f++) {
          if (seeded(id + 10 + f) > 0.62) feats.push(FEATURE_POOL[f]);
        }
        if (feats.length === 0) feats.push(FEATURE_POOL[m % FEATURE_POOL.length]);
        var qty = 1 + Math.floor(seeded(id + 4) * 6); // trim inventory qty (low-inventory later)
        // Synthetic VIN (hidden; used for the VDP link per spec).
        var vin = '1GC' + (Math.floor(seeded(id + 9) * 1e11)).toString(36).toUpperCase().slice(0, 14).padEnd(14, '0');
        fleet.push({
          id: 'V' + id,
          year: 2026,
          make: 'Chevrolet',
          model: name,
          trim: trim,
          vin: vin,
          tags: t.tags.slice(),
          price: price,
          discount: discount,
          msrp: price + discount,
          monthly: Math.round(((price - discount) * 0.0148) / 1) , // rough est payment
          colorExt: color.value,
          colorExtLabel: color.label,
          features: feats,
          availability: AVAIL[Math.floor(seeded(id + 5) * AVAIL.length)],
          qty: qty,
          daysOnLot: 1 + Math.floor(seeded(id + 6) * 80),
          distanceMi: Math.round(seeded(id + 7) * 40),
          photoCount: 8 + Math.floor(seeded(id + 8) * 22)
        });
        id++;
      }
    }
    return fleet;
  }

  var FLEET = buildFleet();

  // Pure matcher. criteria = {priceMin, priceMax, models:[], colors:[], features:[], quick:[]}
  function matches(v, c) {
    if (c.radius != null && v.distanceMi > c.radius) return false; // ZIP search radius (miles)
    if (c.priceMin != null && v.price < c.priceMin) return false;
    if (c.priceMax != null && v.price > c.priceMax) return false;
    if (c.models && c.models.length && c.models.indexOf(v.model) === -1) return false;
    if (c.colors && c.colors.length && c.colors.indexOf(v.colorExt) === -1) return false;
    if (c.quick && c.quick.length) {
      // OR within quick filters: vehicle must carry at least one selected tag.
      var hit = false;
      for (var i = 0; i < c.quick.length; i++) { if (v.tags.indexOf(c.quick[i]) !== -1) { hit = true; break; } }
      if (!hit) return false;
    }
    if (c.features && c.features.length) {
      // AND within features: vehicle must have every selected feature.
      for (var j = 0; j < c.features.length; j++) { if (v.features.indexOf(c.features[j]) === -1) return false; }
    }
    return true;
  }

  function filter(criteria) { return FLEET.filter(function (v) { return matches(v, criteria || {}); }); }
  function count(criteria) { return filter(criteria).length; }

  // Per-model available counts (for the option-row "(N)" hints), unfiltered.
  function modelCounts() {
    var out = {};
    MODELS.forEach(function (m) { out[m] = 0; });
    FLEET.forEach(function (v) { out[v.model] = (out[v.model] || 0) + 1; });
    return out;
  }

  window.GMVSR_DATA = {
    MODELS: MODELS, COLORS: COLORS, FEATURES: FEATURES, QUICK: QUICK,
    fleet: FLEET, total: FLEET.length,
    filter: filter, count: count, modelCounts: modelCounts,
    PRICE_MIN: 20000, PRICE_MAX: 120000
  };
})();
