// StatusIcon - core Global Kit component (build-less React; styles in StatusIcon.css).
// 1:1 with the Figma "Alloy DS BETA" Status Icon set (node 306-11300).
//
// A small colour-coded status indicator: a single glyph - a dot or a flag,
// filled or outline - tinted with one of the DS accent colours. It is the
// leading marker the Status component embeds, but stands alone too.
//
// The Figma set exposes Color x Open; the dot-vs-flag choice is the set's
// second glyph layer (each variant documents both shapes). A real status
// marker only ever shows ONE, so that choice is surfaced as the `shape` prop.
//
// Props (mirror the Figma variant axes):
//   color  'blue'|'gray'|'pink'|'purple'|'green'|'teal'|'lightGray'|
//          'darkGray'|'red'|'orange'|'yellow'   (default 'blue')
//          -> tints via --semantic-color-accent-<c>. 'teal' binds the accent
//             the Figma source references (cyan).
//   open   boolean - outline (Phosphor Regular) glyph when true, solid
//          (Phosphor Fill) when false. (default false)
//          NOTE: the Figma set only draws the outline state for grey - every
//          other colour is filled-only. So `open` is honoured ONLY when
//          color==='gray'; for any other colour the glyph is always filled.
//   shape  'dot' | 'flag' - Phosphor `circle` (12px box) or `flag` (16px box).
//          (default 'dot')
//
// Depends on the Global Kit `Icon` (the sizing/box wrapper); the glyph is a
// Phosphor <i>. StatusIcon owns no component tokens of its own (like Flag and
// Icon) - its only styling input is the semantic accent colour, exposed to the
// child Icon through --gk-icon-color.
//
// Brand/theme/device come from the [data-*] cascade - the component never
// branches on them.
function StatusIcon({
  color = 'blue',
  open = false,
  shape = 'dot',
  className = '',
  ...rest
}) {
  const IconCmp = typeof Icon !== 'undefined' ? Icon : window.Icon;

  const glyphName = shape === 'flag' ? 'flag' : 'circle';
  // Figma draws the outline (open) state only for grey; every other colour is
  // filled-only. Honour `open` just for grey, otherwise force the filled glyph.
  const outline = open && color === 'gray';
  const weightClass = outline ? 'ph' : 'ph-fill'; // Regular outline vs Fill
  const size = shape === 'flag' ? 'sm' : 'xs'; // flag 16 - dot 12

  const classes = ['gk-status-icon', `gk-status-icon--${color}`, `gk-status-icon--${shape}`, className]
    .filter(Boolean)
    .join(' ');

  const glyph = <i className={`${weightClass} ph-${glyphName}`} aria-hidden="true" />;

  return (
    <span className={classes} {...rest}>
      {IconCmp ? <IconCmp size={size}>{glyph}</IconCmp> : glyph}
    </span>
  );
}

window.StatusIcon = StatusIcon;
