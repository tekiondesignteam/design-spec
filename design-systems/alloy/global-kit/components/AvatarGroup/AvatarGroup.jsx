// AvatarGroup - core Global Kit component (build-less React; styles in AvatarGroup.css).
// 1:1 with the Figma "Alloy DS BETA" Avatar Group set (node 304-11132).
//
// A horizontal row of overlapping Avatars, each ringed (inverse border) so it
// reads as a separate token even where it laps the neighbour. When more avatars
// are supplied than `max`, the surplus collapses into a trailing "+N" overflow
// chip (grey fill, default text) that occupies the last slot.
//
// Avatars in a group are ALWAYS round - the Figma set has no square variant, so
// the group forces the round shape on every avatar (and the overflow chip);
// there is no `shape` prop.
//
// Composition: the real avatars reuse the sibling Global Kit <Avatar> component.
// The overflow chip reuses Avatar's own token-bound classes directly (not the
// component) for one reason - Avatar caps initials at 2 characters, which would
// truncate a count like "+12" to "+1". The chip needs the full count, so the
// group renders that single leaf itself using the identical gk-avatar tokens
// (grey fill + default text), staying visually and token-wise an Avatar.
//
// Group-level Avatar props: every Avatar prop EXCEPT shape (size, type, color,
// src, alt, initials, icon) is exposed on the group and applied to every avatar
// as a default. A per-avatar entry in `avatars[]` overrides the group default for
// that one avatar; anything the entry omits falls back to the group value. shape
// is intentionally not exposed - group avatars are always round (see above).
//
// forwards Avatar.{size,type,color,src,alt,initials,icon} (exposed nested props)
//   -> <Avatar {...} /> on every composed child avatar; Avatar.shape is NOT
//   forwarded (no Figma square variant - always round).
//
// Props (mirror the Figma structure):
//   avatars  array of Avatar prop objects ({type,color,initials,src,alt,icon}).
//            The data-driven alternative to `children`. Each entry overrides the
//            group-level Avatar props below for that single avatar.
//   size     '2xs' | 'xs' | 'sm' | 'md' | 'lg'   (default 'sm') - the Figma set is
//            drawn at sm/24.
//   type     'image' | 'icon' | 'initials'       group default for every avatar.
//   color    'grey'|'purple'|'blue'|'teal'|'pink'|'orange'   group default fill.
//   src,alt  image source + alt text             group default (type 'image').
//   initials letters                              group default (type 'initials').
//   icon     glyph node                           group default (type 'icon').
//   max      max real avatars shown before the overflow chip appears (default 4).
//   overflow explicit "+N" count override. When > 0 the overflow chip shows even
//            if avatars.length <= max (e.g. a server-provided remainder count).
//   children Avatar elements passed directly instead of `avatars`; they still get
//            the ring + overlap. `max`/overflow collapsing is skipped in this mode
//            (the caller has already decided what to render).
//            slot `children` (Figma "Slot" SLOT): open slot - Figma defines no
//            preferred values; the group composes the sibling <Avatar> (never
//            inline a raw avatar).
//
// The overlap distance and the ring resolve through tokens in AvatarGroup.css;
// brand/theme/device come from the [data-*] cascade - the component never
// branches on them. The JSX only picks variant classes and composes Avatar.
function AvatarGroup({
  avatars = [],
  size = 'sm',
  type,
  color,
  src,
  alt,
  initials,
  icon,
  max = 4,
  overflow = 0,
  className = '',
  children,
  ...rest
}) {
  // Avatar + AvatarGroup are sibling Global Kit components exposed on window (build-less).
  const AvatarCmp = typeof Avatar !== 'undefined' ? Avatar : window.Avatar;

  // Group-level Avatar defaults - only the ones actually provided, so unset props
  // fall through to Avatar's own defaults instead of clobbering them with undefined.
  const avatarDefaults = { size };
  if (type !== undefined) avatarDefaults.type = type;
  if (color !== undefined) avatarDefaults.color = color;
  if (src !== undefined) avatarDefaults.src = src;
  if (alt !== undefined) avatarDefaults.alt = alt;
  if (initials !== undefined) avatarDefaults.initials = initials;
  if (icon !== undefined) avatarDefaults.icon = icon;

  const classes = ['gk-avatar-group', `gk-avatar-group--${size}`, className]
    .filter(Boolean)
    .join(' ');

  // children mode: render the provided Avatar elements as-is. Ring + overlap are
  // applied by CSS to any .gk-avatar child, so no per-child wiring is needed.
  if (children != null) {
    return (
      <span className={classes} role="group" {...rest}>
        {children}
      </span>
    );
  }

  const shown = avatars.slice(0, max);
  const hidden = Math.max(0, avatars.length - max);
  const overflowCount = overflow > 0 ? overflow : hidden;

  return (
    <span className={classes} role="group" {...rest}>
      {AvatarCmp
        ? shown.map((a, i) => <AvatarCmp key={i} {...avatarDefaults} {...a} shape="round" />)
        : null}
      {overflowCount > 0 && (
        // Overflow chip - a grey initials avatar carrying the full "+N" count.
        // Reuses Avatar's token classes so it is identical to a grey Avatar while
        // sidestepping Avatar's 2-char initials cap (see header note).
        <span
          className={`gk-avatar gk-avatar--${size} gk-avatar--round gk-avatar--initials gk-avatar--grey gk-avatar-group__overflow`}
          role="img"
          aria-label={`${overflowCount} more`}
        >
          <span className="gk-avatar__initials">{'+' + overflowCount}</span>
        </span>
      )}
    </span>
  );
}

window.AvatarGroup = AvatarGroup;
