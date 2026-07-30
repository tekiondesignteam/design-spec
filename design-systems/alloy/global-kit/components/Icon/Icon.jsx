// Icon — core Global Kit component (build-less React; styles in Icon.css).
// 1:1 with the Figma "Alloy DS BETA" Icon set (node 304-9596 / 276-11443).
//
// A sizing + optional-background wrapper around a single glyph. The glyph
// itself is passed in (Phosphor <i>, inline <svg>, or <img>) — the component
// owns the box, the corner radius and, when `background` is on, the brand
// container. It never draws the glyph.
//
// Props (mirror the Figma variant axes):
//   size        'xl' | 'lg' | 'md' | 'sm' | 'xs'   (default 'md')
//               box: xl 32 · lg 24 · md 20 · sm 16 · xs 12 (px)
//   background  boolean — wraps the glyph in the brand-coloured, rounded
//               container; the glyph shrinks to 75% of the box and flips to
//               the inverse icon colour. (default false)
//   children    the glyph node (icon element). Alias: `icon`.
//
// slot `children` (Figma "Name" INSTANCE_SWAP): allowed - any glyph from the
//   Phosphor icon library (Figma preferred values list the full icon set;
//   default glyph node 96:2528). The wrapper is glyph-agnostic - pass any
//   Phosphor <i>, inline <svg> or <img>; the box/radius/background are owned here.
//
// Brand/theme/device come from the [data-*] cascade — the component never
// branches on them. Colours + radii resolve through the token custom
// properties in Icon.css; the JSX only picks the size/background classes.
function Icon({
  size = 'md',
  background = false,
  icon = null,
  className = '',
  children,
  ...rest
}) {
  const glyph = children != null ? children : icon;
  const classes = [
    'gk-icon',
    `gk-icon--${size}`,
    background && 'gk-icon--bg',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} aria-hidden="true" {...rest}>
      <span className="gk-icon__glyph">{glyph}</span>
    </span>
  );
}

// Glyph catalog lives in the shared ../../lib/glyphs.js (single source of truth).
// Expose it on the component so consumers do `Icon.loadGlyphs().then(names => …)`.
// (glyphs.js also self-attaches if it loads after this file.)
if (window.GKIconGlyphs) {
  Icon.GLYPHS_URL = window.GKIconGlyphs.GLYPHS_URL;
  Icon.loadGlyphs = window.GKIconGlyphs.loadGlyphs;
}

window.Icon = Icon;
