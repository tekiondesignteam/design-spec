#!/usr/bin/env node
/**
 * T1 Design System — Unified Dev Tool  (dev.js)
 *
 * Replaces:
 *   compile-scss.js          → node dev.js --build
 *   watch.js                 → node dev.js --watch
 *   ui_kit/template/server.js→ node dev.js --prototype
 *   ui_kit/docs/docs-server.js→ node dev.js --docs
 *
 * Usage
 * ─────────────────────────────────────────────────────────────────
 *   node dev.js              Start everything: build + watch + both servers
 *   node dev.js --build      One-off build (CSS + JSX), then exit
 *   node dev.js --watch      Build + watch for changes (no servers)
 *   node dev.js --serve      Server only, no build/watch  (port 3030)
 *   node dev.js --prototype  alias for --serve
 *   node dev.js --docs       alias for --serve
 */

'use strict';

const fs   = require('fs');
const http = require('http');
const path = require('path');

/* ══════════════════════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════════════════════ */
const ROOT     = __dirname;
const UI_KIT   = path.join(ROOT, 'ui_kit');
const COMP_DIR = path.join(UI_KIT, 'components');
const TOKENS   = path.join(ROOT, 'tokens.scss');
const MANIFEST = path.join(COMP_DIR, 'manifest.js');
const DOCS_DIR = path.join(UI_KIT, 'docs');

const PORT = 3030;

/* ══════════════════════════════════════════════════════════════════
   CLI FLAGS
══════════════════════════════════════════════════════════════════ */
const args      = new Set(process.argv.slice(2));
const FLAG_BUILD = args.has('--build');
const FLAG_WATCH = args.has('--watch');
const FLAG_PROTO = args.has('--prototype');
const FLAG_DOCS  = args.has('--docs');
const FLAG_SERVE = args.has('--serve');
const FLAG_ALL   = !FLAG_BUILD && !FLAG_WATCH && !FLAG_PROTO && !FLAG_DOCS && !FLAG_SERVE;

/* ══════════════════════════════════════════════════════════════════
   COLOUR HELPERS
══════════════════════════════════════════════════════════════════ */
const C = {
  reset:  '\x1b[0m',  dim:    '\x1b[2m',
  cyan:   '\x1b[36m', green:  '\x1b[32m',
  red:    '\x1b[31m', yellow: '\x1b[33m',
  blue:   '\x1b[34m', bold:   '\x1b[1m',
};
const ts    = () => new Date().toLocaleTimeString('en-US', { hour12: false });
const log   = (tag, msg) => console.log (`${C.dim}${ts()}${C.reset}  ${C.cyan}[${tag}]${C.reset}  ${C.green}✓${C.reset}  ${msg}`);
const err   = (tag, msg) => console.error(`${C.dim}${ts()}${C.reset}  ${C.cyan}[${tag}]${C.reset}  ${C.red}✗${C.reset}  ${msg}`);
const info  = (msg)      => console.log (`${C.dim}${ts()}${C.reset}  ${C.yellow}[info]${C.reset}  ${msg}`);
const line  = (n = 52)   => C.dim + '─'.repeat(n) + C.reset;

/* ══════════════════════════════════════════════════════════════════
   SHARED MIME MAP
══════════════════════════════════════════════════════════════════ */
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.jsx':  'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md':   'text/plain; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.woff': 'font/woff',  '.woff2': 'font/woff2',
  '.ttf':  'font/ttf',   '.otf':   'font/otf',
};

/* ══════════════════════════════════════════════════════════════════
   CSS BUILD  (compile-scss.js inlined — no subprocess needed)
══════════════════════════════════════════════════════════════════ */
function parseVars(src) {
  const vars = {};
  const re = /^\$([a-zA-Z0-9_-]+)\s*:\s*(.+?);/gm;
  let m;
  while ((m = re.exec(src)) !== null) vars[m[1]] = m[2].trim();
  return vars;
}

function resolveVars(src, vars) {
  let out = src, prev, passes = 0;
  do {
    prev = out;
    out = out.replace(/\$([a-zA-Z0-9_-]+)/g, (_, k) => vars[k] ?? `$${k}`);
  } while (out !== prev && ++passes < 10);
  return out;
}

function scssToCSS(src, vars = {}) {
  let out = src;
  out = out.replace(/\/\/[^\n]*/g, '');
  out = out.replace(/^\$[a-zA-Z0-9_-]+\s*:.*?;[ \t]*/gm, '');
  if (Object.keys(vars).length) out = resolveVars(out, vars);
  out = out.replace(/^@(?:use|import|forward)\s+[^\n]+\n/gm, '');
  out = out.replace(/^\/\*\s*Partial[^*]*\*\/\s*\n?/m, '');
  out = out.replace(/\n{3,}/g, '\n\n');
  return out.trim();
}

function readManifestOrder() {
  const src = fs.readFileSync(MANIFEST, 'utf8');
  const m   = src.match(/\[([^\]]+)\]/s);
  if (!m) throw new Error('Cannot parse manifest.js');
  return m[1].split(',').map(s => s.replace(/["'\s]/g, '')).filter(Boolean);
}

function buildCSS() {
  const t0       = Date.now();
  const tokenSrc = fs.readFileSync(TOKENS, 'utf8');
  const vars     = parseVars(tokenSrc);
  for (const k of Object.keys(vars)) vars[k] = resolveVars(vars[k], vars);

  const order = readManifestOrder();
  const parts = [];
  for (const name of order) {
    if (name === '_core') continue;
    const f = path.join(COMP_DIR, name, `${name}.scss`);
    if (!fs.existsSync(f)) continue;
    const css = scssToCSS(fs.readFileSync(f, 'utf8'), vars);
    if (css) parts.push(`/* -------- ${name} -------- */\n${css}`);
  }

  const out = [
    '/* T1 Design System — compiled component styles',
    ` * Generated: ${new Date().toISOString()}`,
    ' * DO NOT EDIT — run: node dev.js --build',
    ' */',
    '',
    ...parts,
    '',
  ].join('\n');

  const dest = path.join(UI_KIT, 'components.css');
  fs.writeFileSync(dest, out);
  log('CSS', `components.css  ${out.split('\n').length} lines · ${(Buffer.byteLength(out)/1024).toFixed(1)} KB  (${Date.now()-t0}ms)`);
}

/* ══════════════════════════════════════════════════════════════════
   JSX BUNDLE BUILD
══════════════════════════════════════════════════════════════════ */
function buildJSX() {
  const t0    = Date.now();
  const order = readManifestOrder();
  const parts = [];

  const core = path.join(UI_KIT, '_core.jsx');
  if (fs.existsSync(core)) parts.push(`/* -------- _core -------- */\n${fs.readFileSync(core, 'utf8')}`);

  for (const name of order) {
    if (name === '_core') continue;
    const f = path.join(COMP_DIR, name, `${name}.jsx`);
    if (fs.existsSync(f)) parts.push(`/* -------- ${name} -------- */\n${fs.readFileSync(f, 'utf8')}`);
  }

  const app = path.join(UI_KIT, 'app.jsx');
  if (fs.existsSync(app)) parts.push(`/* -------- app -------- */\n${fs.readFileSync(app, 'utf8')}`);

  const out  = parts.join('\n');
  const dest = path.join(UI_KIT, 'components.jsx');
  fs.writeFileSync(dest, out);
  log('JSX', `components.jsx  ${out.split('\n').length} lines · ${(Buffer.byteLength(out,'utf8')/1024).toFixed(1)} KB  (${Date.now()-t0}ms)`);
}

function build() {
  try { buildCSS(); } catch (e) { err('CSS', e.message); }
  try { buildJSX(); } catch (e) { err('JSX', e.message); }
}

/* ══════════════════════════════════════════════════════════════════
   FILE WATCHER
══════════════════════════════════════════════════════════════════ */
function debounce(fn, ms) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

const triggerCSS = debounce((reason) => { try { buildCSS(); } catch(e) { err('CSS', e.message); } }, 120);
const triggerJSX = debounce((reason) => { try { buildJSX(); } catch(e) { err('JSX', e.message); } }, 120);

function watch() {
  const IGNORE = new Set(['components.css', 'components.jsx']);

  /* Component subdirectories */
  try {
    for (const name of fs.readdirSync(COMP_DIR)) {
      const dir = path.join(COMP_DIR, name);
      if (!fs.statSync(dir).isDirectory()) continue;
      fs.watch(dir, (_, f) => {
        if (!f) return;
        if (f.endsWith('.scss')) triggerCSS(`${name}/${f}`);
        if (f.endsWith('.jsx'))  triggerJSX(`${name}/${f}`);
      });
    }
  } catch (_) {}

  /* ui_kit root (app.jsx, _core.jsx) */
  fs.watch(UI_KIT, (_, f) => {
    if (!f || IGNORE.has(f)) return;
    if (f.endsWith('.jsx'))  triggerJSX(f);
    if (f.endsWith('.scss') || f.endsWith('.css')) triggerCSS(f);
  });

  /* Project root (tokens.scss) */
  fs.watch(ROOT, (_, f) => {
    if (f === 'tokens.scss' || f === 'colors_and_type.css') triggerCSS(f);
  });

  /* components dir (new folders) */
  fs.watch(COMP_DIR, (_, f) => {
    if (!f) return;
    if (f.endsWith('.scss')) triggerCSS(f);
    if (f.endsWith('.jsx'))  triggerJSX(f);
  });

  info('Watching .scss and .jsx for changes…');
}

/* ══════════════════════════════════════════════════════════════════
   UNIFIED SERVER  (single port 3030)

   URL aliases (browser sees → served from disk):
     /template/* → ui_kit/template/*   e.g. /template/chat-interface.html
     /docs/*     → ui_kit/docs/*        e.g. /docs/docs-preview.html
     /api/docs   → JSON list of .md files in ui_kit/docs/
     /events     → SSE live-reload stream for docs .md changes
     everything else served from project ROOT (fonts/, assets/, ui_kit/)
══════════════════════════════════════════════════════════════════ */
function startServer() {
  const sseClients = new Set();

  function broadcast(payload) {
    const msg = `data: ${JSON.stringify(payload)}\n\n`;
    for (const r of sseClients) { try { r.write(msg); } catch { sseClients.delete(r); } }
  }

  /* Watch ui_kit/docs/*.md → push live-reload events */
  const watcher = fs.watch(DOCS_DIR, { recursive: true }, (event, filename) => {
    if (!filename || !filename.endsWith('.md')) return;
    info(`[docs-watch] ${event}: ui_kit/docs/${filename}`);
    broadcast({ event, file: filename });
  });

  const srv = http.createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    res.setHeader('Access-Control-Allow-Origin', '*');

    /* ── Default route ── */
    if (urlPath === '/') urlPath = '/template/chat-interface.html';

    /* ── SSE live-reload (used by docs-preview.html) ── */
    if (urlPath === '/events') {
      res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' });
      res.write('data: "connected"\n\n');
      sseClients.add(res);
      const ping = setInterval(() => { try { res.write(': ping\n\n'); } catch { clearInterval(ping); sseClients.delete(res); } }, 20_000);
      req.on('close', () => { clearInterval(ping); sseClients.delete(res); });
      return;
    }

    /* ── API: list docs ── */
    if (urlPath === '/api/docs') {
      try {
        const files = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.md')).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(files));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
      return;
    }

    /* ── Path aliases → disk paths ── */
    let filePath;

    if (urlPath.startsWith('/template/')) {
      /* /template/* → ui_kit/template/* */
      filePath = path.join(ROOT, 'ui_kit', urlPath);

    } else if (urlPath.startsWith('/docs/')) {
      /* /docs/* → ui_kit/docs/* */
      filePath = path.join(DOCS_DIR, urlPath.slice('/docs/'.length));

    } else {
      /* Everything else served from project ROOT (fonts/, assets/, ui_kit/) */
      const resolved = path.resolve(ROOT, urlPath.replace(/^\//, ''));
      filePath = (resolved.startsWith(ROOT + path.sep) || resolved === ROOT) ? resolved : null;
    }

    if (!filePath) { res.writeHead(403); res.end('Forbidden'); return; }

    fs.readFile(filePath, (e, data) => {
      if (e) {
        res.writeHead(e.code === 'ENOENT' ? 404 : 500);
        res.end(e.code === 'ENOENT' ? `404 Not Found: ${urlPath}` : '500 Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
      res.end(data);
    });
  });

  srv.listen(PORT, '127.0.0.1', () => {
    log('serve', `Prototype  →  http://localhost:${PORT}/template/chat-interface.html`);
    log('serve', `Docs       →  http://localhost:${PORT}/docs/docs-preview.html`);
  });
  srv.on('error', e => {
    if (e.code === 'EADDRINUSE') err('serve', `Port ${PORT} in use — kill with: kill $(lsof -ti:${PORT})`);
    else err('serve', e.message);
    watcher.close();
  });

  return { srv, watcher };
}

/* ══════════════════════════════════════════════════════════════════
   ENTRY POINT
══════════════════════════════════════════════════════════════════ */
console.log(`\n${C.bold}${C.yellow}T1 Design System${C.reset}  ${C.dim}dev.js${C.reset}`);
console.log(line());

if (FLAG_BUILD) {
  /* ── One-off build then exit ── */
  build();
  console.log(line());

} else if (FLAG_WATCH) {
  /* ── Build + watch (no servers) ── */
  build();
  console.log(line());
  watch();

} else if (FLAG_PROTO || FLAG_DOCS || FLAG_SERVE) {
  /* ── Server only (no build/watch) ── */
  startServer();

} else {
  /* ── Default: build + watch + server ── */
  build();
  console.log(line());
  const { watcher: docsWatcher } = startServer();
  console.log(line());
  watch();

  process.on('SIGINT', () => {
    console.log('\n\n  Stopping…');
    docsWatcher.close();
    process.exit(0);
  });
}
