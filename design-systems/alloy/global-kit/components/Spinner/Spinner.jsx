// Spinner — core Global Kit loading indicator (build-less React; styles in Spinner.css).
// 1:1 with the Figma "Alloy DS BETA" Spinner set (node 276-11352): a full `track`
// ring behind a 270° round-capped `thumb` arc that rotates.
//
// Colours, sizes and stroke width are all bound to semantic tokens in Spinner.css
// (track → border/inverse, thumb → icon/secondary, size → sizing scale, stroke →
// borderWidth/default). The JSX only picks the size-variant class.
//
// `size` accepts a Figma size keyword (xs 12 · sm 16 · md 20 · lg 24 · xl 28 ·
// 2xl 32 px) — applied via the `.gk-spinner--<size>` class so the token drives it.
// Any other value is treated as a raw CSS length (applied as font-size). Omit it
// to inherit font-size (Button sizes it this way).
function Spinner({ size, className = '', style, ...rest }) {
  const KEYWORDS = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const isKeyword = typeof size === 'string' && KEYWORDS.includes(size);
  const classes = ['gk-spinner', isKeyword && `gk-spinner--${size}`, className]
    .filter(Boolean)
    .join(' ');
  const mergedStyle = !isKeyword && size ? { fontSize: size, ...style } : style;
  return (
    <span className={classes} role="status" aria-label="Loading" style={mergedStyle} {...rest}>
      <svg className="gk-spinner__svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <circle className="gk-spinner__track" cx="12" cy="12" r="8.5" />
        <circle
          className="gk-spinner__thumb"
          cx="12"
          cy="12"
          r="8.5"
          pathLength="100"
          strokeDasharray="75 25"
        />
      </svg>
    </span>
  );
}

window.Spinner = Spinner;
