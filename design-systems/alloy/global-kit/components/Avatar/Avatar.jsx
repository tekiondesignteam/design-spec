// Avatar - core Global Kit component (build-less React; styles in Avatar.css).
// 1:1 with the Figma "Alloy DS BETA" Avatar set (node 304-9611).
//
// A fixed-size, shaped container that shows ONE of three content types:
//   type 'image'    - a photo fills the (clipped) container (src + alt).
//   type 'icon'     - a glyph centred on the grey container, tinted with the
//                     icon-grey token; defaults to a person glyph. Rendered
//                     with the sibling Global Kit <Icon> component.
//   type 'initials' - 1-2 letters on a coloured container.
//
// Props (mirror the Figma variant axes):
//   size     '2xs' | 'xs' | 'sm' | 'md' | 'lg'          (default 'md')
//            box: 2xs 16 · xs 20 · sm 24 · md 32 · lg 40 (px, from height tokens)
//   shape    'round' | 'square'                         (default 'round')
//   type     'image' | 'icon' | 'initials'              (default 'initials')
//   color    'grey'|'purple'|'blue'|'teal'|'pink'|'orange'  (default 'grey')
//            - the container fill for the initials type. Text flips to inverse
//              on the five coloured fills, default (dark) on grey. Ignored by
//              the image/icon types, which always sit on the grey container.
//   src, alt image source + alt text     (type 'image')
//   initials the letters to render        (type 'initials'; alias: children)
//   icon     glyph node                   (type 'icon'; alias: children;
//                                          defaults to a Phosphor person glyph)
//
// Brand/theme/device come from the [data-*] cascade - the component never
// branches on them. Colours/radii/sizes resolve through the token custom
// properties in Avatar.css; the JSX only picks variant classes.
function Avatar({
  size = 'md',
  shape = 'round',
  type = 'initials',
  color = 'grey',
  src = '',
  alt = '',
  initials = '',
  icon = null,
  className = '',
  children,
  ...rest
}) {
  // Icon + Avatar are sibling Global Kit components exposed on window (build-less).
  const IconCmp = typeof Icon !== 'undefined' ? Icon : window.Icon;
  // Avatar size -> Icon component size: the Icon box lands smaller than the
  // avatar box, so the glyph reads with even padding inside the container.
  const ICON_SIZE = { '2xs': 'xs', xs: 'xs', sm: 'sm', md: 'md', lg: 'lg' };

  const classes = [
    'gk-avatar',
    `gk-avatar--${size}`,
    `gk-avatar--${shape}`,
    `gk-avatar--${type}`,
    `gk-avatar--${color}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  let content = null;
  if (type === 'image') {
    content = <img className="gk-avatar__img" src={src} alt={alt} />;
  } else if (type === 'icon') {
    const glyph = icon != null ? icon : children != null ? children
      : <i className="ph ph-user" aria-hidden="true"></i>;
    content = IconCmp ? (
      <IconCmp size={ICON_SIZE[size] || 'md'} className="gk-avatar__icon">{glyph}</IconCmp>
    ) : (
      <span className="gk-avatar__icon">{glyph}</span>
    );
  } else {
    const text = (initials != null && initials !== '' ? initials : children || '')
      .toString().slice(0, 2).toUpperCase();
    content = <span className="gk-avatar__initials">{text}</span>;
  }

  // role="img" + a label so image/initials avatars are announced meaningfully.
  const label = alt || (type === 'initials' ? initials : undefined);
  return (
    <span className={classes} role="img" aria-label={label} {...rest}>
      {content}
    </span>
  );
}

window.Avatar = Avatar;
