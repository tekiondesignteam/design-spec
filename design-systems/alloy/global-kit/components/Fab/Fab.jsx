// Fab - core Global Kit component (build-less React; styles in Fab.css).
// 1:1 with the Figma "Alloy DS BETA" FAB set (node 304-9604 / 276-11464).
//
// A pill-shaped action control (label + trailing glyph) that collapses to a
// circular icon-only button. Same anatomy as Button, but its own token set
// (--component-fab-*) and a fixed pill radius.
//
// Props (mirror the Figma variant axes):
//   intent      'primary' | 'destructive' | 'inverse'   (Color axis, default 'primary')
//   size        'lg' | 'md' | 'sm' | 'xs'               (default 'lg')
//   iconOnly    boolean - the "Only Icon" Variant: a circle with just the
//                         glyph, no label (default false → the Default pill).
//   state       'default' | 'hover' | 'active'          (default 'default')
//               - forces the visual state without pointer interaction;
//                 leave 'default' for normal interactive :hover / :active.
//   loading     boolean - per Figma, shows the disabled colour treatment +
//                         a spinner in place of the glyph, and blocks interaction.
//   disabled    boolean
//   icon        node - the glyph. Wrapped in the Global Kit <Icon>, sized to
//                      the FAB and tinted with the per-state icon token.
//   children    the label (Default variant only; ignored when iconOnly).
//
// slot `icon` (Figma "Icon" INSTANCE_SWAP): allowed - any glyph from the
//   Phosphor icon library (same preferred-values list as <Icon>). Rendered
//   through <Icon> so the box/radius are owned by the kit. Defaults to a Plus.
//
// Icon size follows the FAB size (Figma icon box: lg 24 · md 20 · sm 16 · xs 12).
//
// Brand/theme/device come from the [data-*] cascade - the component never
// branches on them. Colours resolve through the token custom properties in
// Fab.css; the JSX only picks variant classes.
function Fab({
  intent = 'primary',
  size = 'lg',
  iconOnly = false,
  state = 'default',
  loading = false,
  disabled = false,
  icon = null,
  className = '',
  children,
  ...rest
}) {
  // Map the FAB size onto the Icon / Spinner size scale (matches Figma boxes).
  const ICON_SIZE = { lg: 'lg', md: 'md', sm: 'sm', xs: 'xs' };
  const iconSize = ICON_SIZE[size] || 'lg';
  // Label typography = the DS text style the Figma FAB uses per size
  // (Body/Medium/Paragraph/*), from tokens/dist/computedStyles.css.
  const TEXT_STYLE = {
    lg: 'text-body-medium-paragraph-lg',
    md: 'text-body-medium-paragraph-md',
    sm: 'text-body-medium-paragraph-sm',
    xs: 'text-body-medium-paragraph-xs',
  };
  const textStyle = TEXT_STYLE[size] || TEXT_STYLE.lg;
  // Icon + Spinner are sibling Global Kit components exposed on window (build-less).
  const IconCmp = typeof Icon !== 'undefined' ? Icon : window.Icon;
  const SpinnerCmp = typeof Spinner !== 'undefined' ? Spinner : window.Spinner;

  // Default glyph (Plus) when no icon is supplied - a FAB always shows a glyph.
  const glyph = icon != null ? icon : <i className="ph ph-plus" />;
  const showLabel = !iconOnly && children != null;

  const forcedState =
    state === 'hover' ? 'gk-fab--hover' : state === 'active' ? 'gk-fab--active' : null;
  const classes = [
    'gk-fab',
    `gk-fab--${intent}`,
    `gk-fab--${size}`,
    iconOnly && 'gk-fab--icon-only',
    forcedState,
    loading && 'gk-fab--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      disabled={disabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {showLabel && (
        <span className={`gk-fab__label ${textStyle}`}>{children}</span>
      )}
      {loading ? (
        <SpinnerCmp size={iconSize} className="gk-fab__spinner" />
      ) : (
        <IconCmp size={iconSize} className="gk-fab__icon">
          {glyph}
        </IconCmp>
      )}
    </button>
  );
}

window.Fab = Fab;
