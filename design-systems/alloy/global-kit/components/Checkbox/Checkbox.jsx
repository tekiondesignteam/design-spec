// Checkbox — core Global Kit component (build-less React; styles in Checkbox.css).
// 1:1 with the Figma "Alloy DS BETA" Checkbox set (node 276-15704).
//
// A selection control: a square or circular box with an optional trailing
// label. The box tints and fills through tokens; the check / indeterminate
// mark is a self-contained inline SVG tinted with the per-state icon token
// (no kit-component dependency, no slots).
//
// Props (mirror the Figma variant axes):
//   shape         'square' | 'circle'         (default 'square')
//   color         'brand'  | 'success'        (default 'brand')
//   size          'sm' | 'md' | 'lg'          (default 'md')
//                 box: sm 16 · md 20 · lg 24 (px)
//   checked       boolean — shows the checkmark, fills with the checked tokens
//   indeterminate boolean — shows the dash mark; uses the checked token group.
//                 (Figma draws indeterminate for Brand; the checked tokens make
//                  it render correctly for Success too.)
//   disabled      boolean
//   state         'default' | 'hover' | 'active'   (default 'default')
//                 — forces the visual state without pointer interaction so a
//                   tool/preview can show it; leave 'default' for normal
//                   interactive :hover / :active.
//   onChange      change handler for the underlying native input
//   children      the label text (optional)
//
// Brand/theme/device come from the [data-*] cascade — the component never
// branches on them. Colours + sizing resolve through the token custom
// properties in Checkbox.css; the JSX only picks the variant classes.
function Checkbox({
  shape = 'square',
  color = 'brand',
  size = 'md',
  checked = false,
  indeterminate = false,
  disabled = false,
  state = 'default',
  onChange,
  className = '',
  children,
  ...rest
}) {
  // Label typography = the DS Body/Regular/Paragraph text style per size,
  // from tokens/dist/computedStyles.css.
  const TEXT_STYLE = {
    lg: 'text-body-regular-paragraph-lg',
    md: 'text-body-regular-paragraph-md',
    sm: 'text-body-regular-paragraph-sm',
  };
  const textStyle = TEXT_STYLE[size] || TEXT_STYLE.md;

  const forcedState =
    state === 'hover' ? 'gk-checkbox--hover' : state === 'active' ? 'gk-checkbox--pressed' : null;

  const classes = [
    'gk-checkbox',
    `gk-checkbox--${shape}`,
    `gk-checkbox--${color}`,
    `gk-checkbox--${size}`,
    (checked || indeterminate) && 'gk-checkbox--checked',
    indeterminate && 'gk-checkbox--indeterminate',
    disabled && 'gk-checkbox--disabled',
    forcedState,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Native `indeterminate` is a DOM property, not an attribute — set it via a
  // ref callback (no hooks needed in the build-less runtime).
  const setIndeterminate = (el) => {
    if (el) el.indeterminate = indeterminate;
  };

  return (
    <label className={classes}>
      <input
        type="checkbox"
        className="gk-checkbox__input"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        readOnly={onChange ? undefined : true}
        aria-checked={indeterminate ? 'mixed' : checked}
        ref={setIndeterminate}
        {...rest}
      />
      <span className="gk-checkbox__box" aria-hidden="true">
        <svg
          className="gk-checkbox__mark"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {indeterminate ? (
            <path d="M4 8 H12" />
          ) : (
            <path d="M12.5 5 L6.75 11 L3.5 7.75" />
          )}
        </svg>
      </span>
      {children != null && (
        <span className={`gk-checkbox__label ${textStyle}`}>{children}</span>
      )}
    </label>
  );
}

window.Checkbox = Checkbox;
