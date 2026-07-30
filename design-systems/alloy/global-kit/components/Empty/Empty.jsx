// Empty - core Global Kit empty-state block (build-less React; styles in Empty.css).
// 1:1 with Figma "Alloy DS BETA" Empty (node 276-16677): a centered stack -
// an optional leading media/icon, a title + subtitle, an optional actions row,
// and an optional footer. No variant axes (a single "default" composition, like
// Card); brand/theme/device retheming is purely the [data-*] token cascade.
//
// Slots (Figma) - each is a React node prop, never a hardcoded child. media +
// footer are native Figma SLOTs; actions is an instance-swap property.
//   media    node - "Slot Content" native SLOT (property #8699:0, node 276:16678,
//                   24x24). OPEN slot: no preferred values, unlimited, no fill,
//                   no display-empty; clipsContent false (does NOT clip). Pass ANY
//                   node - a Global Kit <Icon>, a raw inline <svg>, an <img> / spot
//                   illustration, or any component. Centered; rendered when supplied.
//   footer   node - "Footer" native SLOT (property #8699:4). Verified slotSettings
//                   are all Figma defaults: no preferred values (OPEN - Link is the
//                   conventional fill, NOT a Figma-declared preferred value),
//                   allowPreferredValuesOnly false, min/max children null (unlimited),
//                   stretchChildOnInsert false, displayEmptyByDefault false;
//                   clipsContent false. Fill with helper copy + a Global Kit <Link>.
//   actions  node - the "Action" instance-swap property (#410:0, Button Group area,
//                   node 410:20857) - an instance-swap, NOT a native slot. Conventional
//                   fill: the Global Kit <ButtonGroup> of <Button>s. Rendered when supplied.
//
// Text props (plain text nodes in Figma, not slots):
//   title    node - the heading (Body/Semibold/Paragraph/md, primary text token).
//                   default 'Title' (the Figma placeholder).
//   subtitle node - the description (Body/Regular/Paragraph/md, secondary token).
//                   default matches the Figma placeholder copy.
//
// The kit component never instantiates Button / ButtonGroup / Link itself - those
// arrive through the actions / footer slots (reuse window.<Name>, never inline a
// raw button/anchor). The JSX only assembles structure and picks classes; colours,
// spacing and typography resolve through the --component-empty-* tokens in
// Empty.css and the text-* classes from computedStyles.css.
//
// Props:
//   title     default 'Title'
//   subtitle  default placeholder copy
//   media     node   default null (not rendered)
//   actions   node   default null (not rendered) - fill with <ButtonGroup>
//   footer    node   default null (not rendered) - fill with helper text + <Link>
//   className extra classes appended after gk-empty
//   ...rest   spread onto the root element (role, aria-*, style, ...)
function Empty({
  title = 'Title',
  subtitle = 'Placeholder text describing the purpose of this empty state.',
  media = null,
  actions = null,
  footer = null,
  className = '',
  ...rest
}) {
  const classes = ['gk-empty', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {media != null && <div className="gk-empty__media">{media}</div>}
      <div className="gk-empty__content">
        {title != null && (
          <div className="gk-empty__title text-body-semibold-paragraph-md">{title}</div>
        )}
        {subtitle != null && (
          <div className="gk-empty__subtitle text-body-regular-paragraph-md">{subtitle}</div>
        )}
      </div>
      {actions != null && <div className="gk-empty__actions">{actions}</div>}
      {footer != null && <div className="gk-empty__footer text-body-regular-paragraph-md">{footer}</div>}
    </div>
  );
}

window.Empty = Empty;
