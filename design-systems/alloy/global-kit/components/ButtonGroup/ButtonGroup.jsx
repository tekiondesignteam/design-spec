// ButtonGroup - core Global Kit component (build-less React; styles in ButtonGroup.css).
// 1:1 with the Figma "Alloy DS BETA" Button Group set (node 304-9598; symbol 276-15700).
//
// A horizontal row of Buttons spaced by a single group gap token
// (--component-buttonGroup-gap-default = 8px). The group is a PURE layout
// container - it owns only the spacing between actions; every button's
// colour/size/state comes from the composed <Button> and its own tokens.
//
// The Figma set has no variant axes of its own (only its content varies), so the
// group exposes no orientation / brand / theme / device switches - it is
// horizontal, and brand/theme/device flow through the [data-*] cascade like every
// other component. The JSX only assembles structure; it never branches on
// brand/theme/device.
//
// Composition: buttons reuse the sibling Global Kit <Button> component. Two ways to
// supply them (provide one; `children` wins when both are given):
//   buttons   array of Button prop objects ({ type, intent, size, ... }); the
//             data-driven form. Each entry's `label` (or `children`) is the button
//             text. Use this for plain label buttons.
//   children  Button elements passed directly - use when a button needs a click
//             handler, an icon node, or any prop that does not serialise into the
//             array form. Rendered as-is; the group only supplies the gap.
//
// slot `children` (Figma "Content" SLOT): allowed - Button (Figma preferred
//   values; the slot's single preferredValue resolves to the Button set). Fill
//   only with the sibling Global Kit <Button>; never inline a raw button.
//
// Props:
//   buttons    array of Button prop objects (see above)   default []
//   children   Button elements passed directly            default undefined
//   className  extra classes on the group container
function ButtonGroup({ buttons = [], className = '', children, ...rest }) {
  // Button is a sibling Global Kit component exposed on window (build-less, no import).
  const ButtonCmp = typeof Button !== 'undefined' ? Button : window.Button;

  const classes = ['gk-button-group', className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="group" {...rest}>
      {children != null
        ? children
        : ButtonCmp
          ? buttons.map(({ label, children: kids, ...props }, i) => (
              <ButtonCmp key={i} {...props}>
                {kids != null ? kids : label}
              </ButtonCmp>
            ))
          : null}
    </div>
  );
}

window.ButtonGroup = ButtonGroup;
