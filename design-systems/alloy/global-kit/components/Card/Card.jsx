// Card - core Global Kit surface container (build-less React; styles in Card.css).
// 1:1 with Figma "Alloy DS BETA" Card (node 304-11123 / symbol 276-16861): an outer
// shell (a padded, bordered, rounded surface) wrapping a single content slot.
//
// It has no variant axes: one "default" surface whose background, border colour,
// border width, corner radius and four-side padding all bind to the
// --component-card-* tokens in Card.css. Brand/theme/device retheming is purely the
// [data-*] token cascade (e.g. ARC → square corners, T1 → lg radius).
//
// Props:
//   as        - element/component to render the surface as (default 'div')
//   className - extra classes appended after gk-card
//   children  - the content slot (anything the consumer drops in)
//               slot `children` (Figma "Content Slot" SLOT, property #9179:0,
//               node 276:16862). Verified slotSettings (all Figma defaults):
//               no preferred values, allowPreferredValuesOnly false, min/max
//               children null (unlimited), stretchChildOnInsert false,
//               displayEmptyByDefault false. clipsContent true - the surface
//               clips its content (see overflow:hidden in Card.css).
//   ...rest   - spread onto the surface element (onClick, role, aria-*, style, ...)
function Card({ as: As = 'div', className = '', children, ...rest }) {
  const classes = ['gk-card', className].filter(Boolean).join(' ');
  return (
    <As className={classes} {...rest}>
      {children}
    </As>
  );
}

window.Card = Card;
