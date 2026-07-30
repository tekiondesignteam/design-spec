// Badge - core Global Kit component (build-less React; styles in Badge.css).
// 1:1 with the Figma "Alloy DS BETA" Badge set (node 276-11371).
//
// A small feedback marker in one of two shapes:
//   dot=false  - a pill/circle carrying a short count or label (e.g. "7").
//   dot=true   - a bare 8px status dot with no content.
//
// Props (mirror the Figma variant axes):
//   color   'info' | 'error' | 'warning' | 'success'   (default 'info')
//   light   boolean - the subtle "light" treatment (Figma Light=True). When
//                     false, the solid "filled" treatment (default false).
//   dot     boolean - dot form (no content), fixed 8px (default false).
//   size    'md' | 'sm'                                 (default 'md')
//           box: md 20 · sm 16 (px, from the height tokens). Dot form is a
//           fixed 8px for both sizes (the dot-height tokens).
//   children the count / short label (ignored when dot=true).
//
// Brand/theme/device come from the [data-*] cascade - the component never
// branches on them. Colours/radii/sizes resolve through the token custom
// properties in Badge.css; the JSX only picks variant classes.
function Badge({
  color = 'info',
  light = false,
  dot = false,
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  // Count typography = the smallest DS body style, from computedStyles.css.
  // sm and md both read comfortably at paragraph-xs; line-height is pinned to 1
  // in the CSS so the glyph centres in the circle.
  const TEXT_STYLE = { md: 'text-body-semibold-paragraph-xs', sm: 'text-body-semibold-paragraph-xs' };
  const textStyle = TEXT_STYLE[size] || TEXT_STYLE.md;

  const classes = [
    'gk-badge',
    `gk-badge--${color}`,
    `gk-badge--${size}`,
    light ? 'gk-badge--light' : 'gk-badge--filled',
    dot && 'gk-badge--dot',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Dot form is purely decorative and announced via role/label by the consumer;
  // the count form exposes its content as text.
  return (
    <span className={classes} role={dot ? 'presentation' : undefined} {...rest}>
      {!dot && children != null && (
        <span className={`gk-badge__count ${textStyle}`}>{children}</span>
      )}
    </span>
  );
}

window.Badge = Badge;
