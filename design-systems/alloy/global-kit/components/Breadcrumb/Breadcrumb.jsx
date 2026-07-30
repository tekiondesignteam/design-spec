// Breadcrumb — core Global Kit component (build-less React; styles in Breadcrumb.css).
// 1:1 with the Figma "Alloy DS BETA" Breadcrumb page (node 304-11122):
//   the assembled Breadcrumb symbol (276-16835) + the .Breadcrumb Item set
//   (276-16842) whose "Type" axis is Home Icon · Default · Default Hover ·
//   Truncation · Active · Active Hover.
//
// A horizontal trail of crumbs joined by chevron separators. Each crumb is a
// link; the LAST crumb is the current page (Active) and drops its separator.
// A crumb can instead be a home glyph (icon-only link) or a truncation "..."
// standing in for collapsed middle crumbs.
//
// Props:
//   items       array of crumb descriptors, rendered left→right. The last one
//               is treated as Active automatically. Each item:
//                 label       the crumb text (omit for home/truncation)
//                 href        destination (default '#')
//                 home        boolean — render as an icon-only home link
//                 truncation  boolean — render as a "..." collapsed-items marker
//                 icon        override glyph name for a home crumb
//                 state       'default' | 'hover' — force the hover treatment
//                             without a pointer (real :hover applies otherwise)
//   separator   Phosphor glyph name for the crumb separator (default 'caret-right')
//   homeGlyph   Phosphor glyph name for home crumbs (default 'house')
//
// Sibling glyphs render through the Global Kit <Icon> component at size "xs"
// (12px, matching the Figma icon frames). Brand/theme/device come from the
// [data-*] cascade — the component never branches on them; colours resolve
// through the token custom properties in Breadcrumb.css, the JSX only picks
// classes.
function Breadcrumb({
  items = [],
  separator = 'caret-right',
  homeGlyph = 'house',
  className = '',
  ...rest
}) {
  // Icon is a sibling Global Kit component, found on window (build-less, no import).
  const IconCmp = typeof Icon !== 'undefined' ? Icon : window.Icon;
  const glyph = (name) => <i className={`ph ph-${name}`} aria-hidden="true" />;

  return (
    <nav
      className={['gk-breadcrumb', className].filter(Boolean).join(' ')}
      aria-label="Breadcrumb"
      {...rest}
    >
      <ol className="gk-breadcrumb__list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const forced = item.state === 'hover' ? 'gk-breadcrumb__link--hover' : null;
          const itemCls = [
            'gk-breadcrumb__item',
            isLast && 'gk-breadcrumb__item--active',
          ]
            .filter(Boolean)
            .join(' ');

          let content;
          if (item.truncation) {
            content = (
              <span className="gk-breadcrumb__ellipsis" role="img" aria-label="Collapsed items">
                <IconCmp size="xs">{glyph('dots-three')}</IconCmp>
              </span>
            );
          } else if (item.home) {
            content = (
              <a
                className={['gk-breadcrumb__link', 'gk-breadcrumb__link--home', forced]
                  .filter(Boolean)
                  .join(' ')}
                href={item.href || '#'}
                aria-current={isLast ? 'page' : undefined}
                aria-label={item.label || 'Home'}
              >
                <IconCmp size="xs">{glyph(item.icon || homeGlyph)}</IconCmp>
              </a>
            );
          } else {
            content = (
              <a
                className={['gk-breadcrumb__link', forced].filter(Boolean).join(' ')}
                href={item.href || '#'}
                aria-current={isLast ? 'page' : undefined}
              >
                <span className="gk-breadcrumb__label text-body-medium-paragraph-md">
                  {item.label}
                </span>
              </a>
            );
          }

          return (
            <li key={i} className={itemCls}>
              {content}
              {!isLast && (
                <span className="gk-breadcrumb__sep" aria-hidden="true">
                  <IconCmp size="xs">{glyph(separator)}</IconCmp>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

window.Breadcrumb = Breadcrumb;
