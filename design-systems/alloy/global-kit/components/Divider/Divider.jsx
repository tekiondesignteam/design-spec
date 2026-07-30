// Divider — core Global Kit separator line (build-less React; styles in Divider.css).
// 1:1 with Figma "Alloy DS BETA" Divider set (node 276-12094): a 1px rule drawn in
// two orientations with optional inset.
//
// Props:
//   · orientation 'horizontal' | 'vertical'   (default 'horizontal')
//   · variant     'full-width' | 'inset-left' | 'inset-right' | 'middle' | 'inset'
//                 (default 'full-width')
//     Per Figma, which variants apply depends on orientation:
//       horizontal → full-width · inset-left · inset-right · middle
//       vertical   → full-width · middle · inset
//     An inapplicable combo simply renders as full-width (no inset rule matches).
//
// No slots and no child components. The line colour binds to the divider colour
// token; thickness + inset are handled in Divider.css. The JSX only assembles class
// names and renders the line element.
function Divider({ orientation = 'horizontal', variant = 'full-width', className = '', ...rest }) {
  const classes = ['gk-divider', `gk-divider--${orientation}`, `gk-divider--${variant}`, className]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={classes} role="separator" aria-orientation={orientation} {...rest}>
      <span className="gk-divider__line" />
    </div>
  );
}

window.Divider = Divider;
