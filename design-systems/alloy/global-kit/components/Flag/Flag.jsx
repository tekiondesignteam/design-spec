// Flag — core Global Kit component (build-less React; styles in Flag.css).
// 1:1 with the Figma "Alloy DS BETA" Country Flag set (node 351-1690 /
// 276-12581). The Figma set has exactly ONE axis - Country - holding ~250
// flag variants, each drawn at 21x15. There is no size / state / colour axis:
// which country is CONTENT, not style. That is why Flag carries no design
// tokens - it has no colours, radii or sizes of its own to bind.
//
// Artwork source: the open-source `flag-icons` sprite (ISO 3166-1 alpha-2),
// loaded at runtime via one CDN <link> (see Flag.css header + preview.html) -
// the same pattern Icon uses for Phosphor. The sprite is em-based, so a Flag
// scales with the inherited font-size; a consumer sizes it by setting
// font-size on the Flag (or an ancestor), never with a hardcoded box here.
//
// Props (mirror the Figma variant axis + the sprite's native options):
//   country   ISO 3166-1 alpha-2 code, case-insensitive (e.g. 'IN', 'us',
//             'GB'). Alias: `code`. This is the Figma "Country" axis.
//   squared   boolean - render the 1:1 square variant (flag-icons `.fis`)
//             instead of the default 4:3 rectangle. (default false)
//   label     accessible name / tooltip. Defaults to the uppercased code;
//             pass the country name (e.g. 'India') for the best a11y.
//
// Brand/theme/device come from the [data-*] cascade - the component never
// branches on them (and the flag artwork is brand-independent by nature).
function Flag({
  country,
  code,
  squared = false,
  label,
  className = '',
  ...rest
}) {
  const iso = String(country != null ? country : code || '')
    .trim()
    .toLowerCase();
  const name = label != null ? label : iso.toUpperCase();

  const classes = [
    'gk-flag',
    'fi',
    iso && `fi-${iso}`,
    squared && 'fis',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={classes}
      role="img"
      aria-label={name}
      title={name}
      {...rest}
    />
  );
}

window.Flag = Flag;
