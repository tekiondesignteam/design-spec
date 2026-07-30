/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   BADGE
   BEM prefix: t1-badge

   Props
   ─────────────────────────────────────────────────────────────────────────
   color     'primary'|'success'      default 'primary'
   size      'md'|'sm'                default 'md'  (number variant only)
   dot       boolean                  render as dot indicator, default false
   icon      string                   Phosphor icon name → icon variant
   count     number                   numeric count to display
   max       number                   cap value, shows max+ when exceeded, default 99
   children  ReactNode                overrides count display
   className string
   ========================================================================== */

const Badge = ({
  color     = 'primary',
  size      = 'md',
  dot       = false,
  icon,
  count,
  max       = 99,
  className,
  children,
  ...rest
}) => {
  /* ── Dot variant ─────────────────────────────────────────────────────── */
  if (dot) {
    return (
      <span
        className={['t1-badge', `t1-badge--${color}`, 't1-badge--dot', className].filter(Boolean).join(' ')}
        role="status"
        {...rest}
      />
    );
  }

  /* ── Icon variant ────────────────────────────────────────────────────── */
  if (icon) {
    return (
      <span
        className={['t1-badge', `t1-badge--${color}`, 't1-badge--icon', className].filter(Boolean).join(' ')}
        {...rest}
      >
        <i className={`ph-fill ph-${icon}`} style={{ fontSize: 12 }} aria-hidden="true" />
      </span>
    );
  }

  /* ── Number variant ──────────────────────────────────────────────────── */
  const label = children !== undefined
    ? children
    : count !== undefined
      ? (count > max ? `${max}+` : count)
      : '';

  return (
    <span
      className={['t1-badge', `t1-badge--${color}`, `t1-badge--${size}`, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {label}
    </span>
  );
};
