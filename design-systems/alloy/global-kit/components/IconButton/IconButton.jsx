// IconButton — core Global Kit component (build-less React; styles in IconButton.css).
// 1:1 with the Figma "Alloy DS BETA" Icon Button set (node 276-11081).
//
// A square, icon-only button. It is Button's twin: same variant axes and the same
// --component-button-* token set (the Figma source authors Icon Button directly
// against the button tokens; it has no dedicated --component-iconbutton-* set), but
// no label - a single centred glyph, sized to the button.
//
// Props (mirror the Figma variant axes, matching the sibling <Button>):
//   type       'filled' | 'stroke' | 'ghost'          (default 'filled')
//   intent     'primary' | 'destructive' | 'neutral'  (default 'primary')
//   size       'lg' | 'md' | 'sm'                      (default 'md')
//              box: lg 36 · md 32 · sm 24 (px, square)
//   state      'default' | 'hover' | 'active'          (default 'default')
//              - forces the visual state without pointer interaction; leave
//                'default' for normal interactive :hover / :active.
//   loading    boolean - per Figma, shows the disabled colour treatment + a
//                        centred spinner, and blocks interaction.
//   disabled   boolean
//   icon       node - the glyph to render. Alias: `children`. Wrapped in the
//                     Global Kit <Icon>, tinted with the per-state icon token.
//
// Icon size follows the button size (from the Figma inner-glyph sizes):
//   lg → Icon "md" (20px) · md → Icon "sm" (16px) · sm → Icon "sm" (16px).
//
// Icon-only: pass an `aria-label` (via ...rest) so the control is named.
//
// Brand/theme/device come from the [data-*] cascade - the component never branches
// on them. Colours resolve through the token custom properties in IconButton.css;
// the JSX only picks variant classes.
function IconButton({
  type = 'filled',
  intent = 'primary',
  size = 'md',
  state = 'default',
  loading = false,
  disabled = false,
  icon = null,
  className = '',
  children,
  ...rest
}) {
  // Map the button size onto the Icon / Spinner size scale (per Figma glyph sizes).
  const ICON_SIZE = { lg: 'md', md: 'sm', sm: 'sm' };
  const iconSize = ICON_SIZE[size] || 'sm';
  const glyph = children != null ? children : icon;
  // Icon + Spinner are sibling Global Kit components exposed on window (build-less).
  const IconCmp = typeof Icon !== 'undefined' ? Icon : window.Icon;
  const SpinnerCmp = typeof Spinner !== 'undefined' ? Spinner : window.Spinner;

  const forcedState =
    state === 'hover'
      ? 'gk-icon-button--hover'
      : state === 'active'
      ? 'gk-icon-button--pressed'
      : null;
  const classes = [
    'gk-icon-button',
    `gk-icon-button--${type}`,
    `gk-icon-button--${intent}`,
    `gk-icon-button--${size}`,
    forcedState,
    loading && 'gk-icon-button--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={disabled} aria-busy={loading || undefined} {...rest}>
      {loading ? (
        <SpinnerCmp size={iconSize} className="gk-icon-button__spinner" />
      ) : (
        <IconCmp size={iconSize} className="gk-icon-button__icon">
          {glyph}
        </IconCmp>
      )}
    </button>
  );
}

window.IconButton = IconButton;
