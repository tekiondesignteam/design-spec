/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   AVATAR
   BEM prefix: t1-av

   Props
   ─────────────────────────────────────────────────────────────────────────
   type      'image'|'icon'|'letter'   default 'icon'
   variant   'rounded'|'square'        default 'rounded'
             rounded = 50% radius (circle)
             square  = 2px radius
   size      'lg'|'md'|'sm'|'2xs'     default 'lg'
             lg=40px  md=32px  sm=24px  2xs=16px
   src       string    image URL (type='image')
   initials  string    1–2 chars shown (type='letter')  default 'XD'
   alt       string    img alt text                      default ''
   className string    extra class
   ========================================================================== */

const Avatar = ({
  type     = 'icon',
  variant  = 'rounded',
  size     = 'lg',
  src,
  initials = 'XD',
  alt      = '',
  className,
  ...rest
}) => {
  /* Phosphor icon — Fill style for rounded, Regular for square */
  const iconClass = variant === 'rounded' ? 'ph-fill ph-user' : 'ph ph-user';

  return (
    <span
      className={[
        't1-av',
        `t1-av--${size}`,
        `t1-av--${variant}`,
        `t1-av--${type}`,
        className,
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      {type === 'image' && (
        <img className="t1-av__img" src={src} alt={alt} />
      )}
      {type === 'letter' && (
        <span className="t1-av__initials" aria-hidden="true">
          {initials}
        </span>
      )}
      {type === 'icon' && (
        <i className={`t1-av__icon ${iconClass}`} aria-hidden="true" />
      )}
    </span>
  );
};
