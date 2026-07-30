// Link — core Global Kit component (build-less React; styles in Link.css).
// 1:1 with the Figma "Alloy DS BETA" Link set (node 276-12109).
//
// A text link with optional leading/trailing glyph. No background or border -
// just the label + icons, tinted by the per-state colour token.
//
// Props (mirror the Figma variant axes):
//   state        'default' | 'hover' | 'visited'   (default 'default')
//                — 'hover' forces the hover treatment without a real pointer
//                  (real :hover still applies on the interactive default);
//                  'visited' shows the visited colour.
//   disabled     boolean — greys the link and blocks interaction (wins over state).
//   href         the destination (dropped when disabled). (default '#')
//   leadingIcon  node — glyph rendered before the label. Wrapped in the Global
//                        Kit <Icon> component (20px "md" per Figma, tinted with
//                        the per-state icon token).
//   trailingIcon node — glyph rendered after the label (same treatment).
//   children     the label.
//
// Brand/theme/device come from the [data-*] cascade — the component never
// branches on them. Colours resolve through the token custom properties in
// Link.css; the JSX only picks state classes.
function Link({
  state = 'default',
  disabled = false,
  href = '#',
  leadingIcon = null,
  trailingIcon = null,
  className = '',
  children,
  ...rest
}) {
  // Icon is a sibling Global Kit component, found on window (build-less, no import).
  const IconCmp = typeof Icon !== 'undefined' ? Icon : window.Icon;

  const forcedState =
    state === 'hover' ? 'gk-link--hover' : state === 'visited' ? 'gk-link--visited' : null;
  const classes = [
    'gk-link',
    forcedState,
    disabled && 'gk-link--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      className={classes}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {leadingIcon && (
        <IconCmp size="md" className="gk-link__icon">
          {leadingIcon}
        </IconCmp>
      )}
      {children != null && (
        <span className="gk-link__label text-body-medium-paragraph-md">{children}</span>
      )}
      {trailingIcon && (
        <IconCmp size="md" className="gk-link__icon">
          {trailingIcon}
        </IconCmp>
      )}
    </a>
  );
}

window.Link = Link;
