#!/usr/bin/env node
/**
 * Token compiler (§8 — Authoring vs Build Inputs).
 *
 * Reads the ONE combined token file (tokens/source/Tokens.json) and performs a
 * dynamic separation driven SOLELY by the Brand-collection modes. Emits:
 *
 *   tokens/dist/primitives.css      shared primitives (emitted once), grouped by family
 *   tokens/dist/tokens.css          full runtime-composable layers (:root + every [data-*] mode)
 *   tokens/dist/brand/<mode>.css    one self-contained slice per Brand mode (NA-dropped)
 *   tokens/dist/build-report.json   counts + dropped/dangling summary
 *
 * Arrangement in every file: Components -> Semantics, and the Component category
 * is further segregated by component name (button, badge, …). Every axis mode
 * gets its own commented section; sections with no overrides are still emitted
 * with a comment explaining why they are empty.
 *
 * No dependencies — plain Node.
 */
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');        // repo root (this script lives in <repo>/build/)
const ROOT = path.join(REPO, 'tokens');            // the tokens package — holds source/ + dist/
const SRC = path.join(ROOT, 'source', 'Tokens.json');
const DIST = path.join(ROOT, 'dist');
// Folder(name) → CSS font-family, for fonts referenced by the tokens. Files live in <repo>/fonts/<dir>/.
const FONT_FAMILIES = [{ dir: 'proxima-nova', family: 'Proxima Nova' }];
const FONT_FMT = { '.woff2': 'woff2', '.woff': 'woff', '.otf': 'opentype', '.ttf': 'truetype' };
// Infer { weight, style } from a font file name (case-insensitive).
function inferFace(file) {
  const n = file.toLowerCase();
  const style = /(?:italic|[-_ ]it)(?:[-_. ]|$)/.test(n) ? 'italic' : 'normal';
  let weight = 400;
  if (/thin|hairline/.test(n)) weight = 100;
  else if (/extra[-_ ]?light|ultra[-_ ]?light/.test(n)) weight = 200;
  else if (/light/.test(n)) weight = 300;
  else if (/medium/.test(n)) weight = 500;
  else if (/semi[-_ ]?bold|demi[-_ ]?bold/.test(n)) weight = 600;
  else if (/extra[-_ ]?bold|ultra[-_ ]?bold/.test(n)) weight = 800;
  else if (/black|heavy/.test(n)) weight = 900;
  else if (/bold/.test(n)) weight = 700;
  else if (/regular|normal|book/.test(n)) weight = 400;
  return { weight, style };
}
// Map a Figma font-weight NAME (e.g. "Medium", "Semi Bold", "Regular Italic")
// to the numeric CSS `font-weight` it must emit. Figma exports fontWeight tokens
// as style-name STRINGS; `font-weight: "Medium"` is invalid CSS (browsers ignore
// it and fall back to 400), and the numeric value is what selects the matching
// @font-face. The italic suffix is irrelevant to weight, so it is stripped.
function fontWeightNumber(name) {
  const n = String(name).toLowerCase();
  if (/thin|hairline/.test(n)) return 100;
  if (/extra[-_ ]?light|ultra[-_ ]?light/.test(n)) return 200;
  if (/semi[-_ ]?bold|demi[-_ ]?bold/.test(n)) return 600;
  if (/extra[-_ ]?bold|ultra[-_ ]?bold/.test(n)) return 800;
  if (/black|heavy/.test(n)) return 900;
  if (/light/.test(n)) return 300;
  if (/medium/.test(n)) return 500;
  if (/bold/.test(n)) return 700;
  if (/regular|normal|book/.test(n)) return 400;
  return null;
}

const doc = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const collections = doc.collections;
const modeNames = (c) => (c.modes || []).map((m) => (typeof m === 'string' ? m : m.name));

// ---- collection layer config ------------------------------------------------
const COL = {
  'Primitive': { slug: 'primitive', axis: null, default: 'Value' },
  'ARC':       { slug: 'arc',       axis: null, default: 'Value' },
  'T1':        { slug: 't1',        axis: null, default: 'Mode 1' },
  '02. Theme': { slug: 'theme',     axis: 'theme',  default: 'Light',
                 selector: (m) => `[data-theme="${m.toLowerCase()}"]` },
  '03. Device':{ slug: 'device',    axis: 'device', default: 'Desktop',
                 selector: (m) => `[data-device="${m.toLowerCase()}"]` },
  '01. Brand': { slug: 'brand',     axis: 'brand',  default: 'ARC',
                 selector: (m) => `[data-brand="${m.toLowerCase()}"]` },
};
const byName = {};
for (const c of collections) byName[c.name] = c;
const primitiveVars = new Set((byName['Primitive'] || { variables: [] }).variables);
const cfgOf = (name) => COL[name] || { slug: slug(name), axis: null, default: modeNames(byName[name])[0] };

// ---- name / value helpers ---------------------------------------------------
function slug(s) { return String(s).replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }

const nameCount = {};
for (const c of collections) for (const v of c.variables) nameCount[v.name] = (nameCount[v.name] || 0) + 1;
const cssVarMap = new Map();
const keyOf = (col, name) => `${col}::${name}`;
for (const c of collections) {
  const cs = cfgOf(c.name).slug;
  for (const v of c.variables) {
    const unique = nameCount[v.name] === 1;
    cssVarMap.set(keyOf(c.name, v.name), unique ? `--${slug(v.name)}` : `--${cs}-${slug(v.name)}`);
  }
}
const cssVar = (col, name) => cssVarMap.get(keyOf(col, name));
// Reverse lookup: emitted CSS var name -> its source { collection, name }.
const reverseVar = new Map();
for (const [k, cv] of cssVarMap) { const i = k.indexOf('::'); reverseVar.set(cv, { col: k.slice(0, i), name: k.slice(i + 2) }); }
const isAlias = (val) => val && typeof val === 'object' && val.type === 'VARIABLE_ALIAS';

let danglingAliases = 0;
function fmtValue(val, v) {
  if (isAlias(val)) {
    const target = cssVar(val.collectionName, val.variableName);
    if (!target) { danglingAliases++; return null; }
    return `var(${target})`;
  }
  if (v.resolvedType === 'COLOR') return colorCss(val);
  if (v.resolvedType === 'FLOAT') return floatCss(val, v);
  if (v.resolvedType === 'STRING') {
    // fontWeight tokens carry a Figma style-NAME string ("Medium", "Semi Bold").
    // Emit the numeric CSS weight so `font-weight` is valid and selects the face.
    if (/fontweight/i.test(v.name)) { const w = fontWeightNumber(val); if (w != null) return String(w); }
    return stringCss(val);
  }
  return null;
}
function colorCss(c) {
  if (!c || typeof c !== 'object') return null;
  const R = Math.round(c.r * 255), G = Math.round(c.g * 255), B = Math.round(c.b * 255);
  const a = c.a == null ? 1 : c.a;
  if (a >= 1) return '#' + [R, G, B].map((n) => n.toString(16).padStart(2, '0')).join('');
  return `rgba(${R}, ${G}, ${B}, ${+a.toFixed(3)})`;
}
const UNITLESS_SCOPE = new Set(['OPACITY', 'FONT_WEIGHT']);
const PX_SCOPE = new Set(['CORNER_RADIUS', 'WIDTH_HEIGHT', 'GAP', 'FONT_SIZE', 'STROKE_FLOAT', 'LETTER_SPACING']);
function floatCss(n, v) {
  if (typeof n !== 'number') return null;
  const sc = v.scopes || [];
  const nm = v.name.toLowerCase();
  if (sc.some((s) => UNITLESS_SCOPE.has(s)) || nm.includes('opacity') || nm.includes('weight')) return String(n);
  // Line-height: in the PRIMITIVE set only, emit as a percentage taken from the
  // trailing number in the token name (primitive/…/lineHeight/150 -> 150%).
  if (sc.includes('LINE_HEIGHT') || nm.includes('lineheight')) {
    const m = v.name.match(/(\d+)(?!.*\d)/);
    if (primitiveVars.has(v) && m) return `${m[1]}%`;
    return n <= 4 ? String(n) : `${n}px`;
  }
  if (sc.some((s) => PX_SCOPE.has(s))) return `${n}px`;
  if (/(sizing|spacing|radius|size|width|height|gap|space|stroke|border)/.test(nm)) return `${n}px`;
  return String(n);
}
function stringCss(s) {
  if (s == null) return null;
  return /^-?\d+(\.\d+)?$/.test(String(s)) ? String(s) : JSON.stringify(String(s));
}

// ---- text styles (doc.styles) ----------------------------------------------
// Each TEXT style becomes one `.text-*` utility class whose properties are bound
// (via var()) to the tokens its bindings reference. Line-height carries NO
// binding in the source, so it is inferred from the style's PERCENT value and
// bound to the matching semantic/typography/lineHeight/{N} token in 01. Brand.
const STYLES = doc.styles || [];
const STYLE_COLLECTION = '01. Brand'; // styles may ONLY reference this collection
// Figma binding field -> CSS property. `fontStyle` binds to a fontWeight token.
const STYLE_FIELD_CSS = { fontFamily: 'font-family', fontSize: 'font-size', fontStyle: 'font-weight', letterSpacing: 'letter-spacing' };
const styleClassName = (name) => 'text-' + slug(name).toLowerCase();
// The 01. Brand line-height token a style resolves to (or null if not a PERCENT lh).
const styleLineHeightRef = (st) => {
  const lh = st.lineHeight;
  if (!lh || lh.unit !== 'PERCENT' || typeof lh.value !== 'number') return null;
  return { collectionName: STYLE_COLLECTION, variableName: `semantic/typography/lineHeight/${Math.round(lh.value)}` };
};
// Build one CSS rule for a style. Property order: family, size, weight, line-height, letter-spacing.
function styleRule(st) {
  const byField = {};
  for (const b of st.bindings || []) if (b && b.ref) byField[b.field] = b.ref;
  const decls = [];
  const push = (prop, ref) => { if (!ref) return; const cv = cssVar(ref.collectionName, ref.variableName); if (cv) decls.push(`  ${prop}: var(${cv});`); };
  push('font-family', byField.fontFamily);
  push('font-size', byField.fontSize);
  push('font-weight', byField.fontStyle);
  push('line-height', styleLineHeightRef(st));
  push('letter-spacing', byField.letterSpacing);
  return `.${styleClassName(st.name)} {\n${decls.join('\n')}\n}`;
}

// ---- resolver (for NA detection) -------------------------------------------
function terminalName(col, name, ctx, seen = new Set()) {
  const k = keyOf(col, name);
  if (seen.has(k)) return name;
  seen.add(k);
  const c = byName[col];
  const v = c && c.variables.find((x) => x.name === name);
  if (!v) return name;
  const cfg = cfgOf(col);
  const mode = cfg.axis ? (ctx[cfg.axis] || cfg.default) : cfg.default;
  const val = v.valuesByMode[mode] != null ? v.valuesByMode[mode] : v.valuesByMode[cfg.default];
  if (isAlias(val)) return terminalName(val.collectionName, val.variableName, ctx, seen);
  return name;
}
const isNA = (name) => /^primitive\/NA\//i.test(name) || (/\/na\//i.test(name) && /notrelevant/i.test(name));

// ---- comment / block formatting --------------------------------------------
const BAR = '='.repeat(70);
const banner = `/* ${BAR}\n   GENERATED by build/compile-tokens.js — DO NOT EDIT.\n   Source: tokens/source/Tokens.json (${doc.exportedFrom} v${doc.version}).\n   Regenerate with: npm run build\n   ${BAR} */\n`;
const section = (title) => `/* ${BAR}\n   ${title}\n   ${BAR} */`;
const sub = (title) => `  /* ---- ${title} ${'-'.repeat(Math.max(2, 58 - title.length))} */`;

// Nested comment segregation that mirrors the token-name hierarchy
// ("as per the tokens context"). Headers and value lines are indented by depth.
const reindent = (line, n) => line.replace(/^\s+/, ' '.repeat(n));
const hdr = (depth, bullet, label) => `${' '.repeat(2 + 2 * depth)}/*   ${bullet} ${label} */`;
// Natural/numeric ascending compare so values order 2 < 4 < 8 < 10 (not lexically 10 < 2).
const natCmp = (a, b) => String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
// Values within any category are always emitted in ascending order (by token name).
const leaf = (entries, depth) => entries.slice().sort((a, b) => natCmp(a.name, b.name)).map((e) => reindent(e.line, 2 + 2 * depth));
const sortLines = (lines) => lines.slice().sort(natCmp); // ascending sort of raw `--x: y;` value lines
function groupBy(entries, keyFn) { const g = {}; for (const e of entries) { const k = keyFn(e); (g[k] = g[k] || []).push(e); } return g; }
const emitGroups = (g, depth, bullet, renderVal) => {
  const out = [];
  Object.keys(g).sort(natCmp).forEach((k, i) => { if (i) out.push(''); out.push(hdr(depth, bullet, k)); out.push(...renderVal(k, g[k])); });
  return out;
};

// A color surface can sit at a variable depth in the name (component tokens put
// variant/intent before it), so detect it by keyword rather than a fixed index.
const SURFACES = ['bg', 'text', 'border', 'icon', 'stroke', 'fill', 'ring', 'shadow'];
const detectSurface = (name) => { for (const s of name.split('/')) if (SURFACES.includes(s)) return s; return 'other'; };
// group = { title, lines:[], emptyNote }
function renderGroups(groups) {
  return groups.map((g) => g.lines.length
    ? `${sub(g.title)}\n${g.lines.join('\n')}`
    : `${sub(g.title)}\n  /* ${g.emptyNote || 'No tokens in this group.'} */`).join('\n\n');
}
function selectorBlock(selector, groups, allEmptyNote) {
  const any = groups.some((g) => g.lines.length);
  if (!any) return `${selector} {\n  /* ${allEmptyNote} */\n}\n`;
  return `${selector} {\n${renderGroups(groups)}\n}\n`;
}

fs.mkdirSync(path.join(DIST, 'brand'), { recursive: true });
const report = { source: path.relative(ROOT, SRC), version: doc.version, brandModes: modeNames(byName['01. Brand']),
                 files: {}, danglingAliases: 0, slices: {} };

// Split output is BUILT into these first, then written only after the
// self-containment gate passes (see GOVERNANCE GATE 2 near the end).
let PRIM_DEFS = new Set();   // --vars defined by primitives.css
let TOKENS_CSS = '';         // deferred tokens.css content
const SLICES = [];           // [{ brand, rel, css }] deferred per-brand slices
const definedVars = (css) => new Set([...css.matchAll(/^\s*(--[A-Za-z0-9_-]+)\s*:/gm)].map((m) => m[1]));
const refVars = (css) => [...new Set([...css.matchAll(/var\((--[A-Za-z0-9_-]+)\)/g)].map((m) => m[1]))];
// Write an offender report in the SAME schema as Tokens.json. offBy: { collectionName -> Set(variableName) }.
const writeSourceReport = (file, offBy) => {
  const collectionsOut = doc.collections
    .filter((c) => offBy[c.name] && offBy[c.name].size)
    .map((c) => ({ name: c.name, modes: c.modes, variables: c.variables.filter((v) => offBy[c.name].has(v.name)) }));
  fs.writeFileSync(file, JSON.stringify({ version: doc.version, exportedFrom: doc.exportedFrom, exportedAt: doc.exportedAt, collections: collectionsOut }, null, 2));
};

const rootLine = (col, v, mode) => { const s = fmtValue(v.valuesByMode[mode], v); return s == null ? null : `  ${cssVar(col, v.name)}: ${s};`; };
const overrideLine = (col, v, m, defMode) => {
  const def = fmtValue(v.valuesByMode[defMode], v);
  const s = fmtValue(v.valuesByMode[m], v);
  return (s != null && s !== def) ? `  ${cssVar(col, v.name)}: ${s};` : null;
};
const brandOf = (name) => (name.split('/')[1] || '').toUpperCase();

// Collect component/semantic entries for a Brand-collection var-set, at a mode,
// either as root values or as overrides vs a default mode.
function brandEntries(vars, mode, defMode) {
  const comp = [], sem = [];
  for (const v of vars) {
    const ln = defMode ? overrideLine('01. Brand', v, mode, defMode) : rootLine('01. Brand', v, mode);
    if (!ln) continue;
    (v.name.startsWith('component/') ? comp : sem).push({ name: v.name, line: ln });
  }
  return { comp, sem };
}
// Component tokens: component name -> type; the `color` type further segregates
// by surface (bg / text / border / icon / stroke …).
function segmentComponent(entries) {
  return emitGroups(groupBy(entries, (e) => e.name.split('/')[1] || 'misc'), 0, '•', (comp, cEntries) =>
    emitGroups(groupBy(cEntries, (e) => e.name.split('/')[2] || 'misc'), 1, '–', (type, tEntries) =>
      type === 'color'
        ? emitGroups(groupBy(tEntries, (e) => detectSurface(e.name)), 2, '·', (surf, sEntries) => leaf(sEntries, 3))
        : leaf(tEntries, 2)));
}
const compGroup = (title, entries, note) => ({ title, lines: segmentComponent(entries), emptyNote: note });
// Semantic tokens: category; the `color` category further segregates by surface
// (bg / border / icon / text / accent). Scalar categories (spacing, borderRadius…) stay flat.
function segmentSemantic(entries) {
  return emitGroups(groupBy(entries, (e) => e.name.split('/')[1] || 'misc'), 0, '•', (cat, cEntries) =>
    cat === 'color'
      ? emitGroups(groupBy(cEntries, (e) => e.name.split('/')[2] || 'other'), 1, '–', (surf, sEntries) => leaf(sEntries, 2))
      : leaf(cEntries, 1));
}
const semGroup = (title, entries, note) => ({ title, lines: segmentSemantic(entries), emptyNote: note });

// ============================================================================
// 1) primitives.css — shared; families ascending, color/typography sub-segregated.
//    Always emitted, BEFORE the governance gate (primitives may hold literals).
// ============================================================================
{
  const c = byName['Primitive'], def = cfgOf('Primitive').default;
  const entries = [];
  for (const v of c.variables) { const ln = rootLine('Primitive', v, def); if (ln) entries.push({ name: v.name, line: ln }); }
  const isNumericKey = (k) => /^-?\d+(\.\d+)?$/.test(k);
  const familyLines = (ents) => {
    // Nest when the 2nd name segment is a named category: color -> hue;
    // typography -> fontSize / fontWeight / fontFamily / lineHeight / letterSpacing …
    // Scalar families (sizing, spacing, borderRadius, borderWidth) stay flat.
    const keys = [...new Set(ents.map((e) => e.name.split('/')[2] || ''))];
    const nest = keys.some((k) => k && !isNumericKey(k));
    return nest
      ? emitGroups(groupBy(ents, (e) => e.name.split('/')[2] || 'misc'), 0, '•', (k, g) => leaf(g, 1))
      : leaf(ents, 0);
  };
  const byFam = groupBy(entries, (e) => e.name.split('/')[1] || 'misc');
  const groups = Object.keys(byFam).sort(natCmp).map((f) => ({ title: `primitive / ${f}`, lines: familyLines(byFam[f]) }));
  const primitivesCss = banner + '\n' + section('PRIMITIVES — raw values, shared across every slice (emitted once)') + '\n'
    + selectorBlock(':root', groups, 'No primitives.');
  fs.writeFileSync(path.join(DIST, 'primitives.css'), primitivesCss);
  PRIM_DEFS = definedVars(primitivesCss);
  report.files['primitives.css'] = c.variables.length;
}

// ============================================================================
// fonts.css — @font-face for the font families the TOKENS reference. Discovers
// files under <repo>/fonts/<dir>/ and infers weight/style from each file name.
// Always emitted (before the gates), and @import-ed by tokens.css + each slice.
// ============================================================================
{
  const referenced = new Set();
  for (const col of collections) for (const v of col.variables) if (/fontfamily/i.test(v.name))
    for (const val of Object.values(v.valuesByMode)) if (typeof val === 'string') referenced.add(val);

  const blocks = [], notes = [];
  let faceCount = 0;
  for (const { dir, family } of FONT_FAMILIES) {
    if (!referenced.has(family)) continue;
    let files = [];
    try { files = fs.readdirSync(path.join(REPO, 'fonts', dir)).filter((f) => FONT_FMT[path.extname(f).toLowerCase()]); } catch {}
    if (!files.length) { notes.push(`No font files in fonts/${dir}/ for "${family}" — drop the files there and rebuild.`); continue; }
    const faces = files.slice().sort(natCmp).map((f) => {
      const { weight, style } = inferFace(f);
      faceCount++;
      return `@font-face {\n  font-family: ${JSON.stringify(family)};\n  font-style: ${style};\n  font-weight: ${weight};\n  font-display: swap;\n  src: url("../../fonts/${dir}/${f}") format("${FONT_FMT[path.extname(f).toLowerCase()]}");\n}`;
    });
    blocks.push(`/* ${family} — ${faces.length} face(s) from fonts/${dir}/ */\n` + faces.join('\n\n'));
  }
  for (const fam of referenced) if (!FONT_FAMILIES.some((F) => F.family === fam))
    notes.push(`Font family "${fam}" is referenced by tokens but has no folder mapping in FONT_FAMILIES.`);

  const fontsCss = banner + '\n' + section('FONTS — @font-face for families referenced by the tokens') + '\n'
    + (blocks.length ? blocks.join('\n\n') + '\n' : '/* No @font-face emitted yet. */\n')
    + (notes.length ? '\n' + notes.map((n) => `/* NOTE: ${n} */`).join('\n') + '\n' : '');
  fs.writeFileSync(path.join(DIST, 'fonts.css'), fontsCss);
  report.files['fonts.css'] = faceCount;
  if (notes.length) report.fontNotes = notes;
}

// ============================================================================
// GOVERNANCE GATE — text styles may ONLY reference the 01. Brand collection.
// Every style property (each binding ref AND the inferred line-height) must
// resolve to a variable in `01. Brand`; referencing any other layer (Primitive
// / ARC / T1 / Theme / Device) HALTS the build and is flagged.
// ============================================================================
{
  const offenders = [];
  for (const st of STYLES) {
    const refs = (st.bindings || []).map((b) => ({ field: b.field, ref: b.ref })).filter((x) => x.ref);
    const lh = styleLineHeightRef(st);
    if (lh) refs.push({ field: 'lineHeight', ref: lh });
    for (const { field, ref } of refs) {
      if (ref.collectionName !== STYLE_COLLECTION)
        offenders.push({ style: st.name, field, collectionName: ref.collectionName, variableName: ref.variableName });
    }
  }
  const violationsFile = path.join(DIST, 'style-collection-violations.json');
  if (offenders.length) {
    fs.writeFileSync(violationsFile, JSON.stringify({
      status: 'HALTED',
      rule: `Text styles may only reference the "${STYLE_COLLECTION}" collection — no style property may bind to any other layer.`,
      totalViolations: offenders.length,
      offenders,
    }, null, 2));
    const bar = '─'.repeat(74);
    console.error('\n' + bar);
    console.error('  BUILD HALTED — text styles reference a collection other than 01. Brand.');
    console.error('  Rule: every style property must bind to the 01. Brand collection.');
    console.error(bar);
    for (const o of offenders.slice(0, 12)) console.error(`      ${o.style}  [${o.field}] → ${o.collectionName} :: ${o.variableName}`);
    if (offenders.length > 12) console.error(`      … and ${offenders.length - 12} more`);
    for (const f of ['tokens.css', path.join('brand', 'arc.css'), path.join('brand', 't1.css')]) {
      try { fs.unlinkSync(path.join(DIST, f)); } catch {}
    }
    console.error('\n  Split output removed (not valid until fixed): tokens.css, brand/arc.css, brand/t1.css');
    console.error('  computedStyles.css NOT written until every style binds to 01. Brand.');
    console.error('  Full list written to: tokens/dist/style-collection-violations.json');
    console.error('\n  Fix: re-point the flagged style bindings at 01. Brand tokens in the source, re-export, then rebuild.\n');
    process.exit(1);
  }
  try { fs.unlinkSync(violationsFile); } catch {} // passed — clear any stale report
}

// ============================================================================
// computedStyles.css — one `.text-*` utility class per source TEXT style, every
// property bound (var()) to a token. Emitted here (holds no raw values, only
// var() refs), @import-ed by tokens.css + every slice. A single class set works
// across all modes: the tokens it references recompose per brand/theme/device.
// ============================================================================
let COMPUTED_STYLES_CSS = '';
{
  const byFamily = groupBy(STYLES.map((st) => ({ name: st.name, st })), (e) => e.name.split('/')[0] || 'misc');
  const blocks = Object.keys(byFamily).sort(natCmp).map((fam) => {
    const rules = byFamily[fam].slice().sort((a, b) => natCmp(a.name, b.name)).map((e) => styleRule(e.st)).join('\n\n');
    return `/* ${fam} */\n${rules}`;
  });
  COMPUTED_STYLES_CSS = banner + '\n' + section('TYPOGRAPHY STYLES — .text-* classes, every property bound to a token') + '\n'
    + (blocks.length ? blocks.join('\n\n') + '\n' : '/* No text styles in source. */\n');
  fs.writeFileSync(path.join(DIST, 'computedStyles.css'), COMPUTED_STYLES_CSS);
  report.files['computedStyles.css'] = STYLES.length;
}

// ============================================================================
// GOVERNANCE GATE — no raw values outside the Primitive collection.
// primitives.css above is always written (primitives may hold literals); the
// SPLIT below is gated. If any non-primitive token carries a raw value, HALT
// here and flag every offender so the source can be corrected.
// ============================================================================
{
  const offenders = [];
  for (const col of collections) {
    if (col.name === 'Primitive') continue;
    for (const v of col.variables) {
      for (const [mode, val] of Object.entries(v.valuesByMode)) {
        if (val != null && !isAlias(val)) {
          const shown = v.resolvedType === 'COLOR' ? colorCss(val) : v.resolvedType === 'FLOAT' ? floatCss(val, v) : stringCss(val);
          offenders.push({ collection: col.name, token: v.name, mode, type: v.resolvedType, value: shown });
        }
      }
    }
  }
  const violationsFile = path.join(DIST, 'raw-value-violations.json');
  if (offenders.length) {
    const byCol = {};
    for (const o of offenders) (byCol[o.collection] = byCol[o.collection] || []).push(o);
    fs.writeFileSync(violationsFile, JSON.stringify({
      status: 'HALTED',
      rule: 'No raw values outside the Primitive collection — every non-primitive token must alias down to a primitive.',
      totalViolations: offenders.length,
      byCollection: Object.fromEntries(Object.entries(byCol).map(([k, v]) => [k, v.length])),
      offenders,
    }, null, 2));
    const bar = '─'.repeat(74);
    console.error('\n' + bar);
    console.error('  BUILD HALTED — raw values found outside the Primitive collection.');
    console.error('  Rule: only Primitive may hold literals; every other token must alias a primitive.');
    console.error(bar);
    for (const [col, list] of Object.entries(byCol)) {
      console.error(`\n  ✗ ${col} — ${list.length} raw value(s):`);
      for (const o of list.slice(0, 8)) console.error(`      ${o.token}  [${o.mode}] = ${o.value}`);
      if (list.length > 8) console.error(`      … and ${list.length - 8} more`);
    }
    for (const f of ['tokens.css', path.join('brand', 'arc.css'), path.join('brand', 't1.css')]) {
      try { fs.unlinkSync(path.join(DIST, f)); } catch {}
    }
    console.error('\n  Split output removed (not valid until fixed): tokens.css, brand/arc.css, brand/t1.css');
    console.error('  primitives.css WAS updated (primitives are allowed to hold literals).');
    console.error('  Full list written to: tokens/dist/raw-value-violations.json');
    console.error('\n  Fix: re-point each token above to a primitive (or add the missing primitive) in the');
    console.error('  source, re-export Tokens.json, then run `npm run build` again.\n');
    process.exit(1);
  }
  try { fs.unlinkSync(violationsFile); } catch {} // passed — clear any stale report
}

// ============================================================================
// GOVERNANCE GATE 1b — Brand / Theme / Device must not alias Primitive directly.
// Only the Styleguide (ARC / T1) layer may reference primitives. Brand, Theme and
// Device tokens must consume through the intermediate layers, never reach straight
// into a raw primitive. HALT and flag if they do.
// ============================================================================
{
  const GATED = new Set(['01. Brand', '02. Theme', '03. Device']);
  const offBy = {};
  const offenders = [];
  for (const c of collections) {
    if (!GATED.has(c.name)) continue;
    for (const v of c.variables) {
      for (const [mode, val] of Object.entries(v.valuesByMode)) {
        if (isAlias(val) && val.collectionName === 'Primitive') {
          (offBy[c.name] = offBy[c.name] || new Set()).add(v.name);
          offenders.push({ collection: c.name, token: v.name, mode, target: val.variableName });
        }
      }
    }
  }
  const violationsFile = path.join(DIST, 'primitive-alias-violations.json');
  if (offenders.length) {
    writeSourceReport(violationsFile, offBy);
    const byCol = {};
    for (const o of offenders) (byCol[o.collection] = byCol[o.collection] || []).push(o);
    const bar = '─'.repeat(74);
    console.error('\n' + bar);
    console.error('  BUILD HALTED — Brand/Theme/Device tokens alias the Primitive collection directly.');
    console.error('  Rule: only the Styleguide (ARC/T1) may reference primitives; Brand/Theme/Device must not.');
    console.error(bar);
    for (const [col, list] of Object.entries(byCol)) {
      console.error(`\n  ✗ ${col} — ${list.length} direct-primitive alias(es):`);
      for (const o of list.slice(0, 8)) console.error(`      ${o.token}  [${o.mode}] → ${o.target}`);
      if (list.length > 8) console.error(`      … and ${list.length - 8} more`);
    }
    for (const f of ['tokens.css', path.join('brand', 'arc.css'), path.join('brand', 't1.css')]) {
      try { fs.unlinkSync(path.join(DIST, f)); } catch {}
    }
    console.error('\n  Split output removed (not valid until fixed): tokens.css, brand/arc.css, brand/t1.css');
    console.error('  Full list written to: tokens/dist/primitive-alias-violations.json');
    console.error('\n  Fix: re-point these tokens through the Styleguide layer (not straight to a primitive) in the');
    console.error('  source, re-export Tokens.json, then run `npm run build` again.\n');
    process.exit(1);
  }
  try { fs.unlinkSync(violationsFile); } catch {} // passed — clear any stale report
}

// ============================================================================
// 2) tokens.css — full runtime-composable layers, every mode present
// ============================================================================
{
  const brand = byName['01. Brand'], theme = byName['02. Theme'], device = byName['03. Device'];
  let out = banner + '\n@import "./fonts.css";\n@import "./primitives.css";\n@import "./computedStyles.css";\n\n';

  // ---- BASE :root defaults (brand=ARC, theme=Light, device=Desktop) ----
  const { comp: rComp, sem: rSem } = brandEntries(brand.variables, 'ARC', null);
  const rPalArc = [], rPalT1 = [], rThemeArc = [], rThemeT1 = [], rDevArc = [], rDevT1 = [];
  for (const v of (byName['ARC'] || {}).variables || []) { const l = rootLine('ARC', v, cfgOf('ARC').default); if (l) rPalArc.push(l); }
  for (const v of (byName['T1'] || {}).variables || []) { const l = rootLine('T1', v, cfgOf('T1').default); if (l) rPalT1.push(l); }
  for (const v of theme.variables) { const l = rootLine('02. Theme', v, 'Light'); if (l) (brandOf(v.name) === 'ARC' ? rThemeArc : rThemeT1).push(l); }
  for (const v of device.variables) { const l = rootLine('03. Device', v, 'Desktop'); if (l) (brandOf(v.name) === 'ARC' ? rDevArc : rDevT1).push(l); }

  out += section('BASE — :root defaults  (brand = ARC · theme = Light · device = Desktop)') + '\n';
  out += selectorBlock(':root', [
    compGroup('Component tokens (product-specific)', rComp),
    semGroup('Semantic tokens (Global Kit)', rSem),
    { title: 'Theme Defaults · ARC', lines: sortLines(rThemeArc) },
    { title: 'Theme Defaults · T1', lines: sortLines(rThemeT1) },
    { title: 'Device Defaults · ARC', lines: sortLines(rDevArc) },
    { title: 'Device Defaults · T1', lines: sortLines(rDevT1) },
    { title: 'Styleguide · ARC', lines: sortLines(rPalArc) },
    { title: 'Styleguide · T1', lines: sortLines(rPalT1) },
  ], 'No base tokens.') + '\n';

  // ---- BRAND LAYER ----
  out += section('BRAND LAYER — switch with <html data-brand="…">') + '\n';
  for (const m of modeNames(brand)) {
    if (m === 'ARC') { out += `[data-brand="arc"] {\n  /* Default brand — values are the :root defaults; no overrides needed. */\n}\n\n`; continue; }
    const { comp, sem } = brandEntries(brand.variables, m, 'ARC');
    out += selectorBlock(cfgOf('01. Brand').selector(m), [
      compGroup('Component tokens', comp, `No component-token changes for ${m}.`),
      semGroup('Semantic tokens', sem, `No semantic-token changes for ${m}.`),
    ], `No changes for ${m} — matches ARC.`) + '\n';
  }

  // ---- THEME LAYER ----
  out += section('THEME LAYER — switch with <html data-theme="…">') + '\n';
  for (const m of modeNames(theme)) {
    if (m === 'Light') { out += `[data-theme="light"] {\n  /* Default theme — values are the :root defaults; no overrides needed. */\n}\n\n`; continue; }
    const arc = [], t1 = [];
    for (const v of theme.variables) { const ln = overrideLine('02. Theme', v, m, 'Light'); if (ln) (brandOf(v.name) === 'ARC' ? arc : t1).push(ln); }
    out += selectorBlock(cfgOf('02. Theme').selector(m), [
      { title: 'Brand · ARC', lines: sortLines(arc), emptyNote: `No ${m}-mode changes for ARC — its ${m} mode mirrors Light.` },
      { title: 'Brand · T1', lines: sortLines(t1), emptyNote: `No ${m}-mode changes for T1.` },
    ], `No ${m}-mode changes.`) + '\n';
  }

  // ---- DEVICE LAYER ----
  out += section('DEVICE LAYER — switch with <html data-device="…">') + '\n';
  for (const m of modeNames(device)) {
    if (m === 'Desktop') { out += `[data-device="desktop"] {\n  /* Default device — values are the :root defaults; no overrides needed. */\n}\n\n`; continue; }
    const arc = [], t1 = [];
    for (const v of device.variables) { const ln = overrideLine('03. Device', v, m, 'Desktop'); if (ln) (brandOf(v.name) === 'ARC' ? arc : t1).push(ln); }
    out += selectorBlock(cfgOf('03. Device').selector(m), [
      { title: 'Brand · ARC', lines: sortLines(arc), emptyNote: `No ${m} changes for ARC — not responsive at token level.` },
      { title: 'Brand · T1', lines: sortLines(t1), emptyNote: `No ${m} changes for T1.` },
    ], `No ${m} changes.`) + '\n';
  }

  TOKENS_CSS = out; // deferred — written after the self-containment gate
  report.files['tokens.css'] = 'ok';
}

// ============================================================================
// 3) per-Brand self-contained slices (NA-dropped), every mode present
// ============================================================================
for (const bmode of modeNames(byName['01. Brand'])) {
  const ctx = { brand: bmode, theme: 'Light', device: 'Desktop' };
  let dropped = 0, kept = 0;
  const drop = (col, name) => { if (isNA(terminalName(col, name, ctx))) { dropped++; return true; } kept++; return false; };

  // :root
  const comp = [], sem = [], rPal = [], rTheme = [], rDev = [];
  for (const v of byName['01. Brand'].variables) {
    if (drop('01. Brand', v.name)) continue;
    const ln = rootLine('01. Brand', v, bmode);
    if (ln) (v.name.startsWith('component/') ? comp : sem).push({ name: v.name, line: ln });
  }
  for (const v of (byName[bmode] || {}).variables || []) { if (drop(bmode, v.name)) continue; const l = rootLine(bmode, v, cfgOf(bmode).default); if (l) rPal.push(l); }
  const tPrefix = `theme/${bmode}/`, dPrefix = `device/${bmode}/`;
  for (const v of byName['02. Theme'].variables) if (v.name.startsWith(tPrefix)) { if (drop('02. Theme', v.name)) continue; const l = rootLine('02. Theme', v, 'Light'); if (l) rTheme.push(l); }
  for (const v of byName['03. Device'].variables) if (v.name.startsWith(dPrefix)) { if (drop('03. Device', v.name)) continue; const l = rootLine('03. Device', v, 'Desktop'); if (l) rDev.push(l); }

  let out = banner + `\n/* Self-contained slice — Brand mode: ${bmode}  (defaults: theme = Light, device = Desktop) */\n`
          + '@import "../fonts.css";\n@import "../primitives.css";\n@import "../computedStyles.css";\n\n'
          + section(`BASE — :root  (brand = ${bmode} · theme = Light · device = Desktop)`) + '\n'
          + selectorBlock(':root', [
              compGroup('Component tokens (product-specific)', comp),
              semGroup('Semantic tokens (Global Kit)', sem),
              { title: 'Theme Defaults', lines: sortLines(rTheme) },
              { title: 'Device Defaults', lines: sortLines(rDev) },
              { title: `Styleguide · ${bmode}`, lines: sortLines(rPal) },
            ], 'No base tokens.') + '\n';

  // THEME layer
  out += section('THEME LAYER') + '\n';
  for (const m of modeNames(byName['02. Theme'])) {
    if (m === 'Light') { out += `[data-theme="light"] {\n  /* Default theme — values are the :root defaults. */\n}\n\n`; continue; }
    const lines = [];
    for (const v of byName['02. Theme'].variables) if (v.name.startsWith(tPrefix) && !isNA(terminalName('02. Theme', v.name, ctx))) { const ln = overrideLine('02. Theme', v, m, 'Light'); if (ln) lines.push(ln); }
    out += selectorBlock(cfgOf('02. Theme').selector(m),
      [{ title: `${m} overrides`, lines: sortLines(lines), emptyNote: `No ${m}-mode changes for ${bmode} — its ${m} mode mirrors Light.` }],
      `No ${m}-mode changes for ${bmode} — its ${m} mode mirrors Light.`) + '\n';
  }

  // DEVICE layer
  out += section('DEVICE LAYER') + '\n';
  for (const m of modeNames(byName['03. Device'])) {
    if (m === 'Desktop') { out += `[data-device="desktop"] {\n  /* Default device — values are the :root defaults. */\n}\n\n`; continue; }
    const lines = [];
    for (const v of byName['03. Device'].variables) if (v.name.startsWith(dPrefix) && !isNA(terminalName('03. Device', v.name, ctx))) { const ln = overrideLine('03. Device', v, m, 'Desktop'); if (ln) lines.push(ln); }
    out += selectorBlock(cfgOf('03. Device').selector(m),
      [{ title: `${m} overrides`, lines: sortLines(lines), emptyNote: `No ${m} changes for ${bmode} — not responsive at token level.` }],
      `No ${m} changes for ${bmode} — not responsive at token level.`) + '\n';
  }

  SLICES.push({ brand: bmode, rel: `brand/${bmode.toLowerCase()}.css`, css: out }); // deferred — written after the gate
  report.slices[bmode] = { kept, droppedByNA: dropped, file: `brand/${bmode.toLowerCase()}.css` };
}

// ============================================================================
// GOVERNANCE GATE 2 — every split file must be self-contained.
// Each slice and tokens.css must resolve all var() references within itself
// plus primitives.css. A common cause of failure is a cross-brand alias in the
// source (e.g. a T1 token pointing at the ARC namespace). HALT and flag if not.
// ============================================================================
{
  const refLines = (css, v) => css.split('\n').filter((l) => l.includes(`var(${v})`)).map((l) => l.trim());
  // computedStyles.css defines no vars of its own; it is always @import-ed alongside a
  // full token file, so validate its refs against PRIM_DEFS ∪ the tokens.css defs.
  const files = [
    { rel: 'tokens.css', css: TOKENS_CSS },
    { rel: 'computedStyles.css', css: COMPUTED_STYLES_CSS, extraDefs: definedVars(TOKENS_CSS) },
    ...SLICES.map((s) => ({ rel: s.rel, css: s.css })),
  ];
  const problems = [];
  for (const f of files) {
    const defs = new Set([...PRIM_DEFS, ...definedVars(f.css), ...(f.extraDefs || [])]);
    for (const r of refVars(f.css)) if (!defs.has(r)) problems.push({ file: f.rel, missing: r, from: refLines(f.css, r) });
  }
  const violationsFile = path.join(DIST, 'slice-violations.json');
  if (problems.length) {
    const byFile = {};
    for (const p of problems) (byFile[p.file] = byFile[p.file] || []).push(p);
    // Report the offending SOURCE variables (the tokens that alias out of their
    // own slice) in the SAME schema as Tokens.json — version + collections + variables.
    const offBy = {};
    const lhsRe = /(--[A-Za-z0-9_-]+)\s*:/;
    for (const p of problems) for (const line of p.from) {
      const m = line.match(lhsRe); const src = m && reverseVar.get(m[1]);
      if (src) (offBy[src.col] = offBy[src.col] || new Set()).add(src.name);
    }
    writeSourceReport(violationsFile, offBy);
    const bar = '─'.repeat(74);
    console.error('\n' + bar);
    console.error('  BUILD HALTED — split files are not self-contained (unresolved references).');
    console.error('  Rule: every slice must resolve all var() refs within itself + primitives.css.');
    console.error(bar);
    for (const [file, list] of Object.entries(byFile)) {
      console.error(`\n  ✗ ${file} — ${list.length} unresolved reference(s):`);
      for (const p of list.slice(0, 8)) {
        console.error(`      ${p.missing}`);
        for (const fr of p.from.slice(0, 3)) console.error(`          referenced by: ${fr}`);
      }
      if (list.length > 8) console.error(`      … and ${list.length - 8} more`);
    }
    for (const f of ['tokens.css', path.join('brand', 'arc.css'), path.join('brand', 't1.css')]) {
      try { fs.unlinkSync(path.join(DIST, f)); } catch {}
    }
    console.error('\n  Split output removed (not valid until fixed): tokens.css, brand/arc.css, brand/t1.css');
    console.error('  Usual cause: a cross-brand alias in the source (e.g. a T1 token pointing at the ARC namespace).');
    console.error('  Full list written to: tokens/dist/slice-violations.json');
    console.error('\n  Fix: re-point the flagged tokens within their own brand/mode in the source, re-export, then rebuild.\n');
    process.exit(1);
  }
  try { fs.unlinkSync(violationsFile); } catch {} // passed — clear any stale report
  // Self-contained — commit the split to disk.
  fs.writeFileSync(path.join(DIST, 'tokens.css'), TOKENS_CSS);
  for (const s of SLICES) fs.writeFileSync(path.join(DIST, s.rel), s.css);
}

report.danglingAliases = danglingAliases;
fs.writeFileSync(path.join(DIST, 'build-report.json'), JSON.stringify(report, null, 2));
console.log('Token build complete.');
console.log(JSON.stringify(report, null, 2));
