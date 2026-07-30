// Blockquote — core Global Kit component (build-less React; styles in Blockquote.css).
// 1:1 with the Figma "Alloy DS BETA" Blockquote set (node 276-10482).
//
// A quoted passage on a tinted surface with a coloured left rule, an optional
// leading quote mark, the quote body and an optional attribution line.
//
// Props (mirror the Figma variant + property panel):
//   color         'primary' | 'neutral'   (default 'primary')
//                 — the only visual axis: the left rule is brand-blue on
//                   'primary', neutral-grey on 'neutral'.
//   author        string — attribution line (rendered as the <figcaption>).
//   showAuthor    boolean — show the attribution line (default true; only
//                           renders when `author` is non-empty).
//   showQuoteIcon boolean — show the leading quote-mark glyph (default true).
//   children      the quote body.
//
// Brand/theme/device come from the [data-*] cascade — the component never
// branches on them. Colours + spacing resolve through the token custom
// properties in Blockquote.css; the JSX only picks the variant class.
function Blockquote({
  color = 'primary',
  author = '',
  showAuthor = true,
  showQuoteIcon = true,
  className = '',
  children,
  ...rest
}) {
  // Icon is a sibling Global Kit component exposed on window (build-less).
  const IconCmp = typeof Icon !== 'undefined' ? Icon : window.Icon;

  const classes = ['gk-blockquote', `gk-blockquote--${color}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <figure className={classes} {...rest}>
      {showQuoteIcon && (
        // 32px quote mark (Icon "xl"), tinted with the blockquote icon token.
        <IconCmp size="xl" className="gk-blockquote__icon">
          <i className="ph ph-quotes" />
        </IconCmp>
      )}
      <div className="gk-blockquote__content">
        {children != null && (
          <blockquote className="gk-blockquote__quote text-body-medium-paragraph-lg">
            {children}
          </blockquote>
        )}
        {showAuthor && author && (
          <figcaption className="gk-blockquote__cite text-body-medium-paragraph-sm">
            {author}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

window.Blockquote = Blockquote;
