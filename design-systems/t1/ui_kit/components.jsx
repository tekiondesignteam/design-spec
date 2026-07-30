/* -------- _core -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   ICON  (inline SVG icon set, Lucide-style neutral strokes)
   ========================================================================== */
const Icon = ({ name, size = 16, color = 'currentColor', strokeWidth = 1.6 }) => {
  const paths = {
    'x': <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
    'minus': <line x1="5" y1="12" x2="19" y2="12" />,
    'plus': <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
    'expand': <><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></>,
    'chevron-up': <polyline points="18 15 12 9 6 15" />,
    'chevron-down': <polyline points="6 9 12 15 18 9" />,
    'chevron-left': <polyline points="15 18 9 12 15 6" />,
    'chevron-right': <polyline points="9 18 15 12 9 6" />,
    'search': <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
    'menu': <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>,
    'check': <polyline points="20 6 9 17 4 12" />,
    'user': <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    'send': <><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></>,
    'mic': <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></>,
    'paperclip': <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />,
    'sparkles': <><path d="M12 3l1.8 4.8L18.6 9.6 13.8 11.4 12 16.2l-1.8-4.8L5.4 9.6l4.8-1.8L12 3z" /><path d="M19 14l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4L15.7 17.3l2.4-.9L19 14z" /></>,
    'drag': <><circle cx="9" cy="5" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="9" cy="19" r="1" /><circle cx="15" cy="5" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="19" r="1" /></>,
    'more-horiz': <><circle cx="12" cy="12" r="1.5" /><circle cx="5" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></>,
    'info': <><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></>,
    'alert': <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
    'check-circle': <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
    'bell': <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
    'settings': <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
    'home': <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
    'history': <><path d="M3 3v5h5" /><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" /><polyline points="12 7 12 12 16 14" /></>,
    'thumbs-up': <path d="M7 10v12M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H7V10l5-7 2 1.88z" />,
    'thumbs-down': <path d="M17 14V2M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H17v12l-5 7-2-1.88z" />,
    'copy': <><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>,
    'refresh': <><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></>,
    'building': <><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="9" y1="6" x2="9" y2="6.01" /><line x1="15" y1="6" x2="15" y2="6.01" /><line x1="9" y1="10" x2="9" y2="10.01" /><line x1="15" y1="10" x2="15" y2="10.01" /><line x1="9" y1="14" x2="9" y2="14.01" /><line x1="15" y1="14" x2="15" y2="14.01" /><path d="M10 22v-4h4v4" /></>,
    'arrow-up-right': <><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></>,
    'calendar': <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
    'clock': <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
    'phone': <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
    'mail': <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
    'link': <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
    'grid': <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
    'star': <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
    'heart': <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
    'trash': <><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
    'edit': <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
    'car': <><path d="M7 17h10M5 17h14a2 2 0 0 0 2-2v-5l-3-6H6L3 10v5a2 2 0 0 0 2 2z" /><circle cx="7.5" cy="17.5" r="1.5" /><circle cx="16.5" cy="17.5" r="1.5" /></>,
    'dot-grid': <><circle cx="5" cy="6" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="5" cy="18" r="1"/><circle cx="9" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="18" r="1"/></>,
    'tag': <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></>,
    'filter': <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></>,
    'flag': <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></>,
    'bookmark': <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
    'eye': <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>,
    'download': <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>,
    'upload': <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></>,
    'lock': <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
    'zap': <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
      viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      {paths[name] || null}
    </svg>
  );
};

/* ---------- T1 Logo mark (gradient wordmark from app-bar) ---------- */

const T1Mark = ({ size = 20 }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="t1g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgb(37,200,165)" />
        <stop offset="55%" stopColor="rgb(27,144,180)" />
        <stop offset="100%" stopColor="rgb(26,108,196)" />
      </linearGradient>
    </defs>
    <path d="M8 10 L48 10 L32 52 L22 52 L34 20 L8 20 Z" fill="url(#t1g)"/>
    <path d="M55 10 L72 10 L72 52 L62 52 L62 20 L53 22 Z" fill="url(#t1g)"/>
  </svg>
);

/* ==========================================================================
   PHOSPHOR ICON  (uses @phosphor-icons/web loaded via CDN in index.html)
   Usage:  <Phi name="magnifying-glass" size={16} weight="bold" />
   weights: thin | light | regular | bold | fill | duotone
   ========================================================================== */
const Phi = ({ name, size = 16, weight = 'bold', color = 'currentColor', style }) => (
  <i className={`ph${weight === 'regular' ? '' : `-${weight}`} ph-${name}`}
     style={{ fontSize: size, lineHeight: 1, color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, ...style }} />
);

/* -------- Button -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   BUTTON  (Figma: aiT1Button)
   Exact values from Figma variable defs.

   Props
   ─────────────────────────────────────────────────────────────────────────
   variant    'contained' | 'outlined' | 'text'          default: 'contained'
   color      'primary' | 'neutral' | 'error'            default: 'primary'
   size       'lg' | 'md' | 'sm'                         default: 'lg'
   state      'default' | 'hover' | 'active'             (showcase only)
   disabled   boolean
   loading    boolean  — shows spinner, disables interaction
   iconStart  ReactNode | string  — icon before label
   iconEnd    ReactNode | string  — icon after label

   Sizes (border: 1px)
   ─────────────────────────────────────────────────────────────────────────
   lg  h:36  padding:0 20px  radius:8px
   md  h:32  padding:0 16px  radius:6px
   sm  h:24  padding:0 12px  radius:4px
   ========================================================================== */

const Button = ({
  children  = 'Label',
  variant   = 'contained',
  color     = 'primary',
  size      = 'lg',
  state     = 'default',
  disabled  = false,
  loading   = false,
  iconStart,
  iconEnd,
  style,
  className,
  ...rest
}) => {
  const cls = [
    't1-btn',
    `t1-btn--${variant}`,
    `t1-btn--${color}`,
    `t1-btn--${size}`,
    state !== 'default' && `is-${state}`,
    loading  && 'is-loading',
    disabled && 'is-disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={cls}
      disabled={disabled || loading}
      style={style}
      {...rest}
    >
      {iconStart && !loading && (
        <span className="t1-btn__icon">
          {typeof iconStart === 'string' ? <Phi name={iconStart} /> : iconStart}
        </span>
      )}
      <span className="t1-btn__label">{children}</span>
      {loading  && <span className="t1-btn__spinner" aria-hidden="true" />}
      {iconEnd && !loading && (
        <span className="t1-btn__icon">
          {typeof iconEnd === 'string' ? <Phi name={iconEnd} /> : iconEnd}
        </span>
      )}
    </button>
  );
};

/* -------- Icon-Button -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   ICON-BUTTON  (Figma: )

   Square icon-only button with two colours and two styles.

   Props
   ─────────────────────────────────────────────────────────────────────────
   color     "neutral" | "inverse"                   default "neutral"
   style     "contained" | "plain"                   default "plain"
   size      "sm" | "md" | "lg"                      default "md"
   disabled   boolean
   loading    boolean — replaces icon with a spinning arc
   states    "default"|"hover"|"active"|"disabled"   (frozen Figma demo)
   icon / children  ReactNode — the icon to render
   onClick    function
   aria-label string

   Sizes (px)
   ─────────────────────────────────────────────────────────────────────────
   sm  24×24  ·  icon 14px  ·  border-radius 2px
   md  32×32  ·  icon 16px  ·  border-radius 2px
   lg  40×40  ·  icon 20px  ·  border-radius 2px

   Color × Style combinations
   ─────────────────────────────────────────────────────────────────────────
   neutral/contained  — white bg, border, neutral icon
   neutral/plain      — transparent bg, neutral icon
   inverse/contained  — white bg, no border, neutral icon
   inverse/plain      — transparent bg, white icon (for dark surfaces)
   ========================================================================== */

const IconButton = ({
  color      = 'neutral',
  style: styleProp = 'plain',
  size       = 'md',
  disabled   = false,
  loading    = false,
  states,
  icon,
  children,
  onClick,
  className,
  'aria-label': ariaLabel,
  ...rest
}) => {
  const isDisabled = disabled || states === 'disabled';

  const cls = [
    't1-ibtn',
    `t1-ibtn--${color}`,
    `t1-ibtn--${styleProp}`,
    `t1-ibtn--${size}`,
    isDisabled            ? 'is-disabled'  : '',
    loading               ? 'is-loading'   : '',
    states === 'hover'    ? 'is-hover'     : '',
    states === 'active'   ? 'is-active'    : '',
    className || '',
  ].filter(Boolean).join(' ');

  const iconNode = icon !== undefined ? icon : children;

  return (
    <button
      className={cls}
      type="button"
      disabled={isDisabled}
      onClick={!isDisabled && !loading ? onClick : undefined}
      aria-label={ariaLabel || 'action'}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading
        ? <span className="t1-ibtn__spinner" aria-hidden="true" />
        : <span className="t1-ibtn__icon"    aria-hidden="true">{iconNode}</span>
      }
    </button>
  );
};

/* -------- Badge -------- */
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

/* -------- Avatar -------- */
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

/* -------- Chip -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   CHIP — 1:1 Figma /Chip
   Proxima Nova 600 · pill shape · 2 sizes (md 24px, xs 16px)
   2 variants (outlined, soft) · 2 colors (neutral, primary)
   Slots: avatar (md only), startIcon, endIcon
   States: default / hover / active / disabled

   Key Figma measurements:
     md — h 24px · font 14px/16 · chip-pad 0 6px · icon slot 16×16 · icon SVG 12
     xs — h 16px · font 12px/16 · chip-pad 0 6px 0 4px · icon slot 12×12 · icon SVG 10
     label-container — px 4px (both sizes)
     avatar — 16×16 visible, 20×20 image clipped (overflow: clip), radius 2px
   ========================================================================== */
const Chip = ({
  className,              /* merged onto root element                        */
  variant  = 'outlined',  /* 'outlined' | 'soft'                             */
  color    = 'neutral',   /* 'neutral'  | 'primary'                          */
  size     = 'md',        /* 'md'       | 'xs'                               */
  disabled = false,
  startIcon,              /* icon name string — uses <Icon>                  */
  endIcon,                /* icon name string — uses <Icon>                  */
  avatar,                 /* img src string (md size only)                   */
  onClick,
  children = 'Chip',
}) => {
  const iconSize = size === 'xs' ? 10 : 12;   /* SVG size: 10px xs, 12px md  */

  const cls = [
    't1-chip',
    `t1-chip--${variant}`,
    `t1-chip--${color}`,
    `t1-chip--${size}`,
    disabled ? 'is-disabled' : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <span
      className={cls}
      onClick={!disabled && onClick ? onClick : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      aria-disabled={disabled || undefined}
    >
      {/* Avatar — md only, 16×16 visible / 20×20 image clipped (Figma spec) */}
      {avatar && size === 'md' && (
        <span className="t1-chip__avatar">
          <span className="t1-chip__avatar-img">
            <img src={avatar} alt="" />
          </span>
        </span>
      )}

      {/* Start icon — 16×16 slot (md) or 12×12 slot (xs) */}
      {startIcon && (
        <span className="t1-chip__icon">
          <Icon name={startIcon} size={iconSize} color="currentColor" />
        </span>
      )}

      {/* Label — outer has line-height:0 to prevent container bleed;
          inner <span> carries the real line-height (matches Figma's <p> trick) */}
      <span className="t1-chip__label">
        <span className="t1-chip__label-text">{children}</span>
      </span>

      {/* End icon */}
      {endIcon && (
        <span className="t1-chip__icon t1-chip__icon--end">
          <Icon name={endIcon} size={iconSize} color="currentColor" />
        </span>
      )}
    </span>
  );
};

/* -------- Switch -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   SWITCH — 1:1 Figma /Switch
   Single "inset" style · one size · unchecked / checked states.
   Optional label string rendered to the right of the track.

   Key Figma measurements:
     track   — 48×24px · border-radius 8px · padding 2px · border 1px transparent
     handle  — 20×20px · border-radius 6px · bg white   · border 1px transparent
     travel  — 22px  (48 − 2 border − 4 padding − 20 handle)

   Colors:
     unselected track  #cfd4dc
     selected   track  #00bfa5
     handle (both)     #ffffff

   Props — Figma-exact (no size / color variants):
     checked   boolean  default false
     disabled  boolean  default false
     label     string   optional text to the right of track
     onChange  function called on toggle
     className string
   ========================================================================== */
const Switch = ({
  className,
  checked  = false,
  disabled = false,
  label,
  onChange,
}) => {
  /* Internal state drives the visual — syncs when the checked prop changes.
     This makes the component work standalone (no parent onChange required)
     while still being controllable from outside.                            */
  const [on, setOn] = React.useState(checked);
  React.useEffect(() => { setOn(checked); }, [checked]);

  const toggle = () => {
    if (disabled) return;
    const next = !on;
    setOn(next);
    if (onChange) onChange(next);
  };

  const handleKey = e => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
  };

  const cls = [
    't1-switch',
    on       ? 'is-checked'  : '',
    disabled ? 'is-disabled' : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <label
      className={cls}
      role="switch"
      aria-checked={on}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? undefined : 0}
      onClick={toggle}
      onKeyDown={handleKey}
    >
      {/* Track + sliding handle */}
      <span className="t1-switch__track" aria-hidden="true">
        <span className="t1-switch__handle" />
      </span>

      {/* Optional label to the right */}
      {label && <span className="t1-switch__label">{label}</span>}
    </label>
  );
};

/* -------- Checkbox -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   CHECKBOX  (Figma: Checkbox)
   BEM prefix: t1-chk

   Props
   ─────────────────────────────────────────────────────────────────────────
   checked        boolean                              default: false
   indeterminate  boolean                              default: false
   shape          'square' | 'circle'                  default: 'square'
   color          'brand'  | 'success'                 default: 'brand'
   state          'default' | 'hover' | 'active'       (showcase only)
   disabled       boolean                              default: false
   label          string | ReactNode                   optional
   description    string | ReactNode                   optional
   onChange       function(checked: boolean)           optional
   className      string                               optional
   ========================================================================== */

const Checkbox = ({
  checked       = false,
  indeterminate = false,
  shape         = 'square',
  color         = 'brand',
  state         = 'default',
  disabled      = false,
  label,
  description,
  onChange,
  className,
  ...rest
}) => {
  const [isChecked, setIsChecked] = React.useState(checked);
  React.useEffect(() => setIsChecked(checked), [checked]);

  const isDisabled = disabled || state === 'disabled';

  const handleToggle = () => {
    if (isDisabled) return;
    const next = !isChecked;
    setIsChecked(next);
    onChange && onChange(next);
  };

  const cls = [
    't1-chk',
    `t1-chk--${shape}`,
    `t1-chk--${color}`,
    isChecked     && 'is-checked',
    indeterminate && 'is-indeterminate',
    state === 'hover'  && 'is-hover',
    state === 'active' && 'is-active',
    isDisabled         && 'is-disabled',
    className,
  ].filter(Boolean).join(' ');

  const showCheck         = isChecked && !indeterminate;
  const showIndeterminate = indeterminate;

  return (
    <label className={cls} {...rest}>
      <span
        className="t1-chk__box"
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : isChecked}
        tabIndex={isDisabled ? -1 : 0}
        onClick={handleToggle}
        onKeyDown={e => {
          if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleToggle(); }
        }}
      >
        {showIndeterminate && (
          <i className="ph-bold ph-minus t1-chk__icon" aria-hidden="true" />
        )}
        {showCheck && (
          <i className="ph-bold ph-check t1-chk__icon" aria-hidden="true" />
        )}
      </span>
      {(label || description) && (
        <span className="t1-chk__text">
          {label       && <span className="t1-chk__label">{label}</span>}
          {description && <span className="t1-chk__desc">{description}</span>}
        </span>
      )}
    </label>
  );
};

/* -------- Input-Text -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   INPUT-TEXT — 1:1 Figma /Input-Text
   Single size (md) · 4 states (default / hover / active / error / disabled)
   Optional label above · optional assistive/error text + character counter below

   Key Figma measurements:
     container gap          4px   (--input/md/gap)
     label font             14px / 400wt / 16px lh / 0ls
     label color            #444f5c  (--inputlabel/label/default/text)
     box height             32px
     box border             1px solid
     box border-radius      2px   (--input/md/prefixsuffixcontainer/borderradius)
     box outer padding      1px   (--input/md/prefixsuffixcontainer/verticalpadding)
     text-field inner h-pad 10px  (--input/md/textfieldcontainer/horizontalpadding)
     text-field gap         8px   (--input/md/textfieldcontainer/gap — for icons)
     input font             14px / 400wt / 16px lh / 0ls

   State colors:
     default  border #969aa3  bg white     text #161616
     hover    border #969aa3  bg white     text #161616  (same as default)
     active   border #4285f4  bg white     text #161616
     disabled border #d4d5d6  bg #edeef0   text #6d707a
     error    border #f52f1d  bg white     text #161616

   Assistive row (below box):
     error message  12px / 400wt / #a01b05  (--assistivetext/error/text) — left
     character ctr  12px / 400wt / #a01b05  (error) or #969aa3 (default) — right

   Props — Figma-exact:
     label       string         optional label above the input
     placeholder string         input placeholder
     value       string         controlled value
     disabled    boolean        default false
     error       string         error message — triggers error state + styles assist row red
     assistive   string         helper text shown when no error
     startIcon   node           optional prefix icon slot (left, inside box)
     endIcon     node           optional suffix icon slot (right, inside box)
     maxLength   number         enables character counter display (n/maxLength)
     onChange    function       (newValue: string) => void
     className   string
   ========================================================================== */
const InputText = ({
  className,
  label,
  placeholder,
  value,
  disabled  = false,
  error,
  assistive,
  startIcon,
  endIcon,
  maxLength,
  onChange,
}) => {
  /* Internal state — works standalone; syncs when value prop changes */
  const [v, setV] = React.useState(value !== undefined ? value : '');
  React.useEffect(() => { if (value !== undefined) setV(value); }, [value]);

  const handleChange = e => {
    const next = e.target.value;
    setV(next);
    if (onChange) onChange(next);
  };

  const cls = [
    't1-input',
    error    ? 'is-error'    : '',
    disabled ? 'is-disabled' : '',
    className || '',
  ].filter(Boolean).join(' ');

  const showAssist  = !!(error || assistive);
  const showCounter = maxLength !== undefined;

  return (
    <div className={cls}>
      {/* Label — 14px / #444f5c */}
      {label && <label className="t1-input__label">{label}</label>}

      {/* Input box — 32px h, 1px outer padding, 1px border, 2px radius */}
      <div className="t1-input__box">
        {/* text-field-container — 10px h-pad, 8px gap between prefix/text/suffix */}
        <div className="t1-input__ctrl-wrap">
          {startIcon && <span className="t1-input__prefix">{startIcon}</span>}
          <input
            className="t1-input__ctrl"
            type="text"
            value={v}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            onChange={handleChange}
          />
          {endIcon && <span className="t1-input__suffix">{endIcon}</span>}
        </div>
      </div>

      {/* Assistive row — error/helper text (left) + character counter (right) */}
      {(showAssist || showCounter) && (
        <div className="t1-input__assist-row">
          {showAssist && (
            <div className={`t1-input__assist${error ? ' is-error' : ''}`}>
              {error || assistive}
            </div>
          )}
          {showCounter && (
            <div className={`t1-input__counter${error ? ' is-error' : ''}`}>
              {v.length}/{maxLength}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* -------- Seperator -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   SEPARATOR / DIVIDER — from /Seperator and /Divider
   ========================================================================== */
const Separator = ({ orientation = 'horizontal', variant = 'fullWidth' }) => (
  <div className={`t1-sep t1-sep--${orientation} t1-sep--${variant}`} />
);
const Divider = Separator;

/* -------- Progress-Bar -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   PROGRESS-BAR  (Figma: aiT1ProgressBarStraight)
   BEM prefix: t1-pb

   Props
   ─────────────────────────────────────────────────────────────────────────
   value        number 0–100        fill percentage          default: 0
   color        'brand' | 'success'                          default: 'brand'
   label        string              optional label row       default: undefined
   determinate  boolean             false = indeterminate    default: true
   className    string                                       optional
   ========================================================================== */

const ProgressBar = ({
  value       = 0,
  color       = 'brand',
  label,
  determinate = true,
  className,
  ...rest
}) => {
  const pct = Math.max(0, Math.min(100, value));

  const cls = [
    't1-pb',
    `t1-pb--${color}`,
    !determinate && 'is-indeterminate',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>

      {/* Label row — only when a label is provided */}
      {label && (
        <div className="t1-pb__labels">
          <span className="t1-pb__label">{label}</span>
          {determinate && <span className="t1-pb__value">{pct}%</span>}
        </div>
      )}

      {/* Track + fill */}
      <div className="t1-pb__track">
        <div
          className="t1-pb__fill"
          style={determinate ? { width: `${pct}%` } : undefined}
          role="progressbar"
          aria-valuenow={determinate ? pct : undefined}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label || 'Progress'}
        />
      </div>

    </div>
  );
};

/* -------- Link -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   LINK — from /Link
   ========================================================================== */
const Link = ({ children, href = '#', underlined = false, size = 'medium', appearance = 'primary' }) => (
  <a href={href} className={`t1-link t1-link--${size} t1-link--${appearance}${underlined ? ' is-underlined' : ''}`}>{children}</a>
);

/* -------- Interactive-Icon -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   INTERACTIVE-ICON  (Figma: AiT1InteractiveIcon)

   Icon-only Chip — same outlined style as Chip, no label text.

   Props
   ─────────────────────────────────────────────────────────────────────────
   color    "neutral" | "primary" | "error"   default "neutral"
   size     "xs" | "sm" | "md" | "lg" | "xl"  default "xs"
   disabled  boolean                            default false
   states    "default"|"hover"|"active"|"disabled"  (optional — CSS handles
              real interaction; pass this for Figma-frozen state demos)
   icon / children  ReactNode — the icon to render
   onClick   function
   aria-label string

   Size → container px × icon px
   ─────────────────────────────────────────────────────────────────────────
   xs  16 × 16   icon 10px
   sm  20 × 20   icon 12px
   md  24 × 24   icon 14px
   lg  32 × 32   icon 16px
   xl  40 × 40   icon 20px

   Colors  (outlined, same tokens as Chip)
   ─────────────────────────────────────────────────────────────────────────
   neutral  border $t1-neutral-200  icon $t1-neutral-600
   primary  border $t1-blue-400     icon $t1-blue-500
   error    border $t1-red-400      icon $t1-red-500
   ========================================================================== */

const InteractiveIcon = ({
  color    = 'neutral',
  size     = 'xs',
  disabled = false,
  states,
  icon,
  children,
  onClick,
  className,
  'aria-label': ariaLabel,
  ...rest
}) => {
  const isDisabled = disabled || states === 'disabled';

  const cls = [
    't1-iicon',
    `t1-iicon--${size}`,
    `t1-iicon--${color}`,
    isDisabled        ? 'is-disabled' : '',
    states === 'hover'   ? 'is-hover'   : '',
    states === 'active'  ? 'is-active'  : '',
    className || '',
  ].filter(Boolean).join(' ');

  const iconNode = icon !== undefined ? icon : children;

  return (
    <button
      className={cls}
      type="button"
      disabled={isDisabled}
      onClick={!isDisabled ? onClick : undefined}
      aria-label={ariaLabel || 'action'}
      {...rest}
    >
      <span className="t1-iicon__icon" aria-hidden="true">{iconNode}</span>
    </button>
  );
};

/* -------- App-Bar -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   APP-BAR  (Figma: aiT1AppBar · node 8:47311)
   BEM prefix: t1-ab

   Variants (`type`)
   ─────────────────────────────────────────────────────────────────────────
   'panel'            400px  gradient 143.74°  floating / docked chrome
   'fullscreen'       100%   gradient 167.99°  full-width expanded chrome
   'stickyMaximized'  400px  gradient 143.74°  panel + drag grip on left
   'stickyMinimized'  400px  gradient 143.74°  collapsed bar + drag grip
   'mobileDrag'       400px  gradient 143.74°  stacked, drag pill at top

   Legacy aliases (kept for backward compat):
   'default'   → 'panel'
   'expanded'  → 'fullscreen'
   'minimized' → 'stickyMinimized'

   Props
   ─────────────────────────────────────────────────────────────────────────
   type               variant (see above)                                 'panel'
   title              header text                                         'AI Assistant'
   orientation        'left'|'right' — affects panel variant's default
                      move menu items                                     'right'

   showMoveMenu       show the Move & Resize popover on supported
                      variants (panel, fullscreen, stickyMaximized)       true
   moveMenuItems      optional custom list [{ key, icon, label, target,
                      flipX? }]; overrides per-variant defaults
   moveMenuOpen       controlled open state (use with onMoveMenuChange)
   onMoveMenuChange   (open) => void
   onMove             (target) => void   target = 'left'|'right'|
                                                  'fullscreen'|'popover'

   onMinimize         minimize button clicked
   onFullscreen       fullscreen button clicked (alias: onExpand)
   onRestore          restore button clicked
   onCollapse         collapse button clicked (from stickyMinimized)
   onClose            close button clicked
   onDragStart        pointerdown on drag grip / pill — (e) => void

   className          extra class on root

   Self-managed state
   ─────────────────────────────────────────────────────────────────────────
   Without `onMove` / drag handlers the component tracks its own type so
   all variants and their transitions work standalone in the preview.
   ========================================================================== */

const AppBar = ({
  type             = 'panel',
  title            = 'AI Assistant',
  orientation      = 'right',

  showMoveMenu     = true,
  moveMenuItems,
  moveMenuOpen,
  onMoveMenuChange,
  onMove,

  onMinimize,
  onFullscreen,
  onExpand,
  onRestore,
  onCollapse,
  onClose,
  onDragStart,
  className,
  ...rest
}) => {
  const handleFullscreenCb = onFullscreen || onExpand;

  /* ── Legacy type aliases ────────────────────────────────────────────────── */
  const normalize = (v) => ({
    'default'  : 'panel',
    'expanded' : 'fullscreen',
    'minimized': 'stickyMinimized',
  }[v] || v);

  const [localType, setLocalType] = React.useState(() => normalize(type));
  React.useEffect(() => { setLocalType(normalize(type)); }, [type]);

  /* ── Move menu open state (controlled / uncontrolled) ──────────────────── */
  const [internalOpen, setInternalOpen] = React.useState(false);
  const menuOpen = moveMenuOpen !== undefined ? moveMenuOpen : internalOpen;
  const setMenuOpen = (next) => {
    if (moveMenuOpen === undefined) setInternalOpen(next);
    onMoveMenuChange && onMoveMenuChange(next);
  };

  const rootRef = React.useRef(null);

  /* Close on outside click / Escape */
  React.useEffect(() => {
    if (!menuOpen) return;
    const handleDocMouse = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setMenuOpen(false);
    };
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('mousedown', handleDocMouse);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleDocMouse);
      document.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  const t                 = localType;
  const isPanel           = t === 'panel';
  const isFullscreen      = t === 'fullscreen';
  const isStickyMaximized = t === 'stickyMaximized';
  const isStickyMinimized = t === 'stickyMinimized';
  const isMobileDrag      = t === 'mobileDrag';
  const hasGrip           = isStickyMaximized || isStickyMinimized;
  const hasMoveMenu       = showMoveMenu && (isPanel || isFullscreen || isStickyMaximized);

  /* ── Handlers ───────────────────────────────────────────────────────────── */
  const handleMinimize = () => {
    setMenuOpen(false);
    setLocalType(isFullscreen ? 'stickyMinimized' : 'stickyMinimized');
    onMinimize && onMinimize();
  };
  const handleFullscreen = () => {
    setMenuOpen(false);
    setLocalType('fullscreen');
    handleFullscreenCb && handleFullscreenCb();
  };
  const handleRestore = () => {
    setMenuOpen(false);
    setLocalType('panel');
    onRestore && onRestore();
  };
  const handleCollapse = () => {
    setMenuOpen(false);
    setLocalType('panel');
    onCollapse && onCollapse();
  };
  const handleClose = () => {
    setMenuOpen(false);
    onClose && onClose();
  };
  const handleDragPointerDown = (e) => { onDragStart && onDragStart(e); };
  const handleMove = (target) => {
    setMenuOpen(false);
    if (onMove) { onMove(target); return; }
    /* Self-managed demo fallback */
    if (target === 'fullscreen')               setLocalType('fullscreen');
    else if (target === 'popover')             setLocalType('stickyMaximized');
    else /* 'left' | 'right' */                setLocalType('panel');
  };

  /* ── Default menu items per variant (Figma 1:1) ────────────────────────── */
  const defaultItems = React.useMemo(() => {
    const LEFT   = { key: 'left',       icon: 'sidebar-simple',   label: 'Left of the Screen',  target: 'left'       };
    const RIGHT  = { key: 'right',      icon: 'sidebar-simple',   label: 'Right of the Screen', target: 'right',     flipX: true };
    const FULL   = { key: 'fullscreen', icon: 'corners-out',      label: 'Full Screen',         target: 'fullscreen' };
    const POPOUT = { key: 'popover',    icon: 'arrow-square-out', label: 'Pop Out',             target: 'popover'    };
    if (isPanel)           return orientation === 'left' ? [LEFT, FULL, POPOUT] : [RIGHT, FULL, POPOUT];
    if (isFullscreen)      return [LEFT, RIGHT, POPOUT];
    if (isStickyMaximized) return [LEFT, RIGHT, FULL];
    return [];
  }, [isPanel, isFullscreen, isStickyMaximized, orientation]);

  const items = moveMenuItems || defaultItems;

  /* Trigger icon reflects the CURRENT layout state so the user can see
     at a glance what position is active. */
  const triggerIcon  = isFullscreen  ? 'corners-out'
                     : isPanel       ? 'sidebar-simple'
                     :                 'arrows-out';     /* stickyMaximized = floating */
  const triggerFlipX = isPanel && orientation === 'left'; /* right-docked panel */
  const triggerLabel = 'Move & Resize';

  /* ── Sub-components ─────────────────────────────────────────────────────── */
  /* T1 logo — CSS-masked span; gradient shows through via .t1-ab__logo */
  const Logo = () => (
    <span className="t1-ab__logo" role="img" aria-label="T1 AI logo" />
  );

  const TitleBlock = () => (
    <div className="t1-ab__title">
      <Logo />
      <span className="t1-ab__name">{title}</span>
    </div>
  );

  const CtrlBtn = ({ icon, onClick, label, extraClass, pressed, flipX }) => (
    <button
      className={[
        't1-ab__ctrl-btn',
        extraClass,
        pressed && 't1-ab__ctrl-btn--open',
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      aria-label={label}
      aria-haspopup={pressed !== undefined ? 'menu' : undefined}
      aria-expanded={pressed !== undefined ? pressed : undefined}
      type="button"
    >
      <i
        className={`ph ph-${icon} t1-ab__ctrl-icon`}
        style={flipX ? { transform: 'scaleX(-1)' } : undefined}
        aria-hidden="true"
      />
    </button>
  );

  const MoveMenu = () => (
    <div className="t1-ab__menu-wrap">
      <CtrlBtn
        icon={triggerIcon}
        label={triggerLabel}
        pressed={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
        flipX={triggerFlipX}
      />
      {menuOpen && (
        <div className="t1-ab__menu" role="menu">
          <div className="t1-ab__menu-header">Move &amp; Resize</div>
          {items.map(opt => (
            <button
              key={opt.key}
              className="t1-ab__menu-item"
              onClick={() => handleMove(opt.target)}
              role="menuitem"
              type="button"
            >
              <span className={`t1-ab__menu-item-icon${opt.flipX ? ' t1-ab__menu-item-icon--flip' : ''}`}>
                <i className={`ph ph-${opt.icon}`} aria-hidden="true" />
              </span>
              <span className="t1-ab__menu-item-label">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const DragGrip = () => (
    <button
      className="t1-ab__drag-grip"
      onPointerDown={handleDragPointerDown}
      aria-label="Drag to reposition"
      type="button"
    >
      <i className="ph ph-dots-six-vertical t1-ab__drag-grip-icon" aria-hidden="true" />
    </button>
  );

  const DragPill = () => (
    <div
      className="t1-ab__drag-pill"
      onPointerDown={handleDragPointerDown}
      role="presentation"
    />
  );

  /* ── Root class ─────────────────────────────────────────────────────────── */
  const rootClass = [
    't1-ab',
    isPanel           && 't1-ab--panel',
    isFullscreen      && 't1-ab--fullscreen',
    isStickyMaximized && 't1-ab--sticky-maximized',
    isStickyMinimized && 't1-ab--sticky-minimized',
    isMobileDrag      && 't1-ab--mobile-drag',
    hasGrip           && 't1-ab--has-grip',
    className,
  ].filter(Boolean).join(' ');

  /* ── Mobile drag — stacked column with pill at top ──────────────────────── */
  if (isMobileDrag) {
    return (
      <div ref={rootRef} className={rootClass} {...rest}>
        <DragPill />
        <div className="t1-ab__content-row">
          <TitleBlock />
          <div className="t1-ab__controls">
            <CtrlBtn icon="x" onClick={handleClose} label="Close" extraClass="t1-ab__ctrl-btn--close" />
          </div>
        </div>
      </div>
    );
  }

  /* ── Default row layout (panel / fullscreen / sticky*) ──────────────────── */
  return (
    <div ref={rootRef} className={rootClass} {...rest}>
      {hasGrip && <DragGrip />}
      <TitleBlock />
      <div className="t1-ab__controls">
        {isStickyMinimized ? (
          <>
            <CtrlBtn icon="caret-up" onClick={handleCollapse} label="Collapse" />
            <CtrlBtn icon="x"        onClick={handleClose}    label="Close"    extraClass="t1-ab__ctrl-btn--close" />
          </>
        ) : (
          <>
            <CtrlBtn icon="minus" onClick={handleMinimize} label="Minimize" />
            {hasMoveMenu
              ? <MoveMenu />
              : (isFullscreen
                  ? <CtrlBtn icon="arrows-in"  onClick={handleRestore}    label="Restore" />
                  : <CtrlBtn icon="arrows-out" onClick={handleFullscreen} label="Fullscreen" />)
            }
            <CtrlBtn icon="x" onClick={handleClose} label="Close" extraClass="t1-ab__ctrl-btn--close" />
          </>
        )}
      </div>
    </div>
  );
};

/* -------- Chat-Bubble -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   CHAT-BUBBLE  (Figma: AiT1ChatBubble)

   User message bubble only. Assistant replies use the Response component.

   Props
   ─────────────────────────────────────────────────────────────────────────
   children   string | ReactNode   message text / content
   state      "default" | "hover"  frozen Figma demo state (CSS :hover works)
   actions    ReactNode[]          fully override the hover action row
   onCopy     (text) => void       called after text is written to clipboard
   onEdit     (newText) => void    called when the user saves an inline edit;
                                   also triggers re-send in the prototype

   Copy behaviour
   ─────────────────────────────────────────────────────────────────────────
   Writes children (string) to navigator.clipboard, shows check icon for 2 s.

   Edit behaviour
   ─────────────────────────────────────────────────────────────────────────
   Click Edit → bubble body becomes an auto-growing textarea pre-filled with
   the current message text.
   • Ctrl/Cmd + Enter → save & call onEdit(newText)
   • Escape           → cancel, revert text
   • Cancel button    → same as Escape
   • Send button      → same as Ctrl+Enter

   Auto-grow: textarea height is reset to 'auto' then set to scrollHeight on
   every keystroke, so the bubble expands naturally with the content.

   Anatomy
   ─────────────────────────────────────────────────────────────────────────
   .t1-bubble[.is-hover][.is-editing]
     .t1-bubble__body[.t1-bubble__body--editing]
       .t1-bubble__text          — normal display
       .t1-bubble__textarea      — edit mode (replaces __text)
       .t1-bubble__edit-actions  — Cancel + Send (edit mode only)
     .t1-bubble__actions         — copy + edit icons (hidden in edit mode)
   ========================================================================== */

const ChatBubble = ({
  state    = 'default',
  actions,
  onCopy,
  onEdit,
  children,
  className,
  ...rest
}) => {
  const [editing,  setEditing]  = React.useState(false);
  const [editText, setEditText] = React.useState('');
  const [copied,   setCopied]   = React.useState(false);

  const textareaRef = React.useRef(null);
  const textContent = typeof children === 'string' ? children : '';

  /* Auto-grow textarea whenever text changes */
  React.useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  }, [editText]);

  /* Focus textarea and position cursor at end when entering edit mode */
  React.useEffect(() => {
    if (!editing || !textareaRef.current) return;
    const ta = textareaRef.current;
    ta.focus();
    ta.setSelectionRange(ta.value.length, ta.value.length);
  }, [editing]);

  /* ── Handlers ─────────────────────────────────────────────────────────── */
  const handleCopy = () => {
    if (textContent && navigator.clipboard) {
      navigator.clipboard.writeText(textContent).catch(() => {});
    }
    setCopied(true);
    onCopy && onCopy(textContent);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditStart = () => {
    setEditText(textContent);
    setEditing(true);
  };

  const handleSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    setEditing(false);
    onEdit && onEdit(trimmed);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditText('');
  };

  const handleTextareaKey = (e) => {
    if (e.key === 'Escape') { handleCancel(); return; }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSave();
  };

  /* ── Tooltip wrapper ─────────────────────────────────────────────────── */
  const Tip = ({ label, children: tipChildren }) => (
    <div className="t1-bubble__tip" data-tip={label}>
      {tipChildren}
    </div>
  );

  /* ── Default hover actions ───────────────────────────────────────────── */
  const defaultActions = [
    <Tip key="copy" label={copied ? 'Copied!' : 'Copy'}>
      <IconButton
        color="neutral" style="plain" size="sm"
        onClick={handleCopy}
        aria-label={copied ? 'Copied!' : 'Copy message'}
      >
        <i className={`${copied ? 'ph ph-check' : 'ph ph-copy'} t1-bubble__action-icon`} aria-hidden="true" />
      </IconButton>
    </Tip>,
    <Tip key="edit" label="Edit">
      <IconButton
        color="neutral" style="plain" size="sm"
        onClick={handleEditStart}
        aria-label="Edit message"
      >
        <i className="ph ph-pencil-simple t1-bubble__action-icon" aria-hidden="true" />
      </IconButton>
    </Tip>,
  ];

  const actionItems = actions || defaultActions;

  const cls = [
    't1-bubble',
    state === 'hover' ? 'is-hover' : '',
    editing ? 'is-editing' : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>

      <div className={`t1-bubble__body${editing ? ' t1-bubble__body--editing' : ''}`}>
        {editing ? (
          <>
            {/* Auto-growing textarea */}
            <textarea
              ref={textareaRef}
              className="t1-bubble__textarea"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleTextareaKey}
              aria-label="Edit message"
              rows={1}
            />
            {/* Edit action row: Cancel + Send */}
            <div className="t1-bubble__edit-actions">
              <Button
                variant="text"
                color="neutral"
                size="sm"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="sm"
                onClick={handleSave}
                disabled={!editText.trim()}
              >
                Send
              </Button>
            </div>
          </>
        ) : (
          <p className="t1-bubble__text">{children}</p>
        )}
      </div>

      {/* Action row — hidden while editing */}
      {!editing && (
        <div className="t1-bubble__actions" aria-hidden={state !== 'hover'}>
          {actionItems}
        </div>
      )}

    </div>
  );
};

/* -------- Notification-Banner-Toast -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   TOAST  (Figma: aiT1Toast)
   BEM prefix: t1-toast

   Props
   ─────────────────────────────────────────────────────────────────────────
   color        "info" | "error" | "warning" | "success"   default "info"
   title        string                                       required
   description  string                                       optional
   onClose      function                                     optional close handler

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Phi          — icon inside colored block (weight="fill", size=20, white)
   IconButton   — optional close button (color="neutral" style="plain" size="sm")
   ========================================================================== */

/* ==========================================================================
   NOTIFICATION BANNER  (Figma: aiT1NotificationBanner)
   BEM prefix: t1-banner

   Props
   ─────────────────────────────────────────────────────────────────────────
   color        "neutral" | "info" | "error" | "warning" | "success"   default "neutral"
   title        string                                                    required
   description  string                                                    optional
   onClose      function                                                  optional close handler

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Phi          — variant-colored icon (weight="regular", size=20)
   IconButton   — close button (color="neutral" style="plain" size="sm")
   ========================================================================== */

/* ── Icon name lookup ─────────────────────────────────────────────────────────
   All variants use the Phosphor "info" icon (circle with lowercase 'i').
   The colored block / status bar is what communicates severity — not the icon.
   ──────────────────────────────────────────────────────────────────────────── */
const _T1_NOTIF_ICON = {
  info:    'info',
  error:   'info',
  warning: 'info',
  success: 'info',
  neutral: 'info',
};

/* ══════════════════════════════════════════════════════════════════════════
   TOAST
   ══════════════════════════════════════════════════════════════════════════ */

const Toast = ({
  color       = 'info',
  title,
  description,
  onClose,
  className,
  ...rest
}) => {
  const iconName = _T1_NOTIF_ICON[color] || 'info';

  return (
    <div
      className={['t1-toast', `t1-toast--${color}`, description && 't1-toast--with-desc', className].filter(Boolean).join(' ')}
      role="alert"
      aria-live="polite"
      {...rest}
    >
      {/* ── Colored icon block ──────────────────────────────────────────── */}
      <div className="t1-toast__icon-wrap" aria-hidden="true">
        <div className="t1-toast__icon-block">
          <Phi name={iconName} size={20} weight="regular" />
        </div>
      </div>

      {/* ── Content: title + description ────────────────────────────────── */}
      <div className="t1-toast__content">
        {title       && <div className="t1-toast__title">{title}</div>}
        {description && <div className="t1-toast__desc">{description}</div>}
      </div>

      {/* ── Optional close button ───────────────────────────────────────── */}
      {onClose && (
        <div className="t1-toast__close">
          <IconButton
            color="neutral"
            style="plain"
            size="sm"
            aria-label="Dismiss"
            onClick={onClose}
          >
            <Phi name="x" size={14} weight="bold" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   NOTIFICATION BANNER
   ══════════════════════════════════════════════════════════════════════════ */

const NotificationBanner = ({
  color       = 'neutral',
  title,
  description,
  onClose,
  className,
  ...rest
}) => {
  const iconName = _T1_NOTIF_ICON[color] || 'info';

  return (
    <div
      className={['t1-banner', `t1-banner--${color}`, className].filter(Boolean).join(' ')}
      role="status"
      aria-live="polite"
      {...rest}
    >
      {/* ── 4px left status bar ─────────────────────────────────────────── */}
      <div className="t1-banner__bar" aria-hidden="true" />

      {/* ── Inner: icon · labels · close ────────────────────────────────── */}
      <div className="t1-banner__inner">

        {/* Icon block — colored rounded square, white icon inside */}
        <div className="t1-banner__icon" aria-hidden="true">
          <div className="t1-banner__icon-block">
            <Phi name={iconName} size={20} weight="regular" />
          </div>
        </div>

        {/* Labels: title + description inline */}
        <div className="t1-banner__labels">
          {title       && <span className="t1-banner__title">{title}</span>}
          {description && <span className="t1-banner__desc">{description}</span>}
        </div>

        {/* Optional close button */}
        {onClose && (
          <div className="t1-banner__close">
            <IconButton
              color="neutral"
              style="plain"
              size="sm"
              aria-label="Dismiss"
              onClick={onClose}
            >
              <Phi name="x" size={14} weight="bold" />
            </IconButton>
          </div>
        )}

      </div>
    </div>
  );
};

/* Legacy alias (keeps any existing references working) */
const NotificationBannerToast = NotificationBanner;

/* -------- Suggestion-List -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   SUGGESTION-LIST  (Figma: aiT1SuggestionList)
                    item states (Figma: aiT1SuggestionListItem)
   BEM prefix: t1-sug

   Props
   ─────────────────────────────────────────────────────────────────────────
   items      Array<string | {
                label:    string
                icon?:    string    Phosphor name without "ph-" prefix
                                    default: "chat-circle-text"
                state?:   "default" | "hover" | "active"
                                    frozen state for Figma demo/showcase
                disabled?: boolean  per-item disabled flag
              }>
              String shorthand → { label: string, icon: "chat-circle-text" }

   onSelect   (item: { label, icon }, index: number) => void
              Called on click. Disabled items never fire this.

   className  string   extra class on the container

   Item states (Figma )
   ─────────────────────────────────────────────────────────────────────────
   default    bg #ffffff    text #444f5c
   hover      bg #dbebff    text #6d707a   (CSS :hover + .is-hover frozen)
   active     bg #dbebff    text #6d707a   (CSS :active + .is-active frozen)
   disabled   bg #f4f5f6    text #969aa3   (HTML disabled + .is-disabled)

   Anatomy
   ─────────────────────────────────────────────────────────────────────────
   .t1-sug
     .t1-sug__divider     — 1px neutral-200, between pairs
     .t1-sug__item        — <button>, min-h 32px, px 12 py 8, r 2px, gap 8px
       .t1-sug__icon-wrap — 16×16, neutral-400
         <i ph-*>
       .t1-sug__label     — body2Regular 14/16, neutral-600, ellipsis
   ========================================================================== */

const SuggestionList = ({
  items     = [],
  onSelect,
  className,
  ...rest
}) => {

  /* Normalise string shorthand → { label, icon, state, disabled } */
  const normalise = (it) => {
    if (typeof it === 'string') {
      return { label: it, icon: 'chat-circle-text', state: 'default', disabled: false };
    }
    return {
      icon:     'chat-circle-text',
      state:    'default',
      disabled: false,
      ...it,
    };
  };

  const cls = ['t1-sug', className].filter(Boolean).join(' ');

  return (
    <div className={cls} role="list" {...rest}>
      {items.map((raw, i) => {
        const item = normalise(raw);

        /* Frozen CSS state classes for Figma demo / showcase mode */
        const stateClass = item.disabled
          ? 'is-disabled'
          : item.state === 'hover'   ? 'is-hover'
          : item.state === 'active'  ? 'is-active'
          : '';

        const itemCls = ['t1-sug__item', stateClass].filter(Boolean).join(' ');

        return (
          <React.Fragment key={i}>

            {/* 1px divider between adjacent rows — never before the first */}
            {i > 0 && <div className="t1-sug__divider" aria-hidden="true" />}

            <button
              className={itemCls}
              type="button"
              role="listitem"
              disabled={item.disabled || undefined}
              onClick={(!item.disabled && onSelect) ? () => onSelect(item, i) : undefined}
            >
              {/* 16×16 icon — neutral-400 colour from CSS */}
              <span className="t1-sug__icon-wrap" aria-hidden="true">
                <i className={`ph ph-${item.icon}`} />
              </span>

              {/* Truncated label */}
              <span className="t1-sug__label">{item.label}</span>
            </button>

          </React.Fragment>
        );
      })}
    </div>
  );
};

/* -------- Welcome -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   WELCOME  (Figma: aiT1Welcome)
   BEM prefix: t1-wlc

   Props
   ─────────────────────────────────────────────────────────────────────────
   name          string   first name shown in heading  default "John"
   description   string   subtitle line                default "How can I help you today?"
   className     string   optional extra class
   ========================================================================== */

/* Inline SVG — aiT1Welcome.svg (40×40 Tekion AI dot mark)
   Single consolidated gradient replaces 34 identical defs for cleaner output.
   Visual result is pixel-identical to the source SVG.                         */
const AiT1WelcomeSvg = () => (
  <svg
    className="t1-wlc__logo"
    width="40" height="40" viewBox="0 0 40 40"
    fill="none" xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="t1-wlc-grad" x1="32.8439" y1="39.8955" x2="2.50831" y2="4.05332" gradientUnits="userSpaceOnUse">
        <stop offset="0.01" stopColor="#2157F5"/>
        <stop offset="0.371064" stopColor="#258DFF"/>
        <stop offset="1" stopColor="#86FFBB"/>
      </linearGradient>
    </defs>
    <path d="M18.1309 28.2818C17.4356 29.4861 15.8956 29.8987 14.6913 29.2034C13.4869 28.5081 13.0743 26.9681 13.7696 25.7638C14.4649 24.5595 16.0049 24.1468 17.2092 24.8422C18.4136 25.5375 18.8262 27.0774 18.1309 28.2818Z" fill="url(#t1-wlc-grad)"/>
    <path d="M13.7696 14.1902C14.4649 15.3945 16.0049 15.8071 17.2092 15.1118C18.4135 14.4165 18.8262 12.8765 18.1309 11.6722C17.4355 10.4679 15.8956 10.0552 14.6912 10.7505C13.4869 11.4459 13.0743 12.9858 13.7696 14.1902Z" fill="url(#t1-wlc-grad)"/>
    <path d="M17.143 21.6245C18.0626 23.2172 20.0991 23.7629 21.6918 22.8433C23.2844 21.9238 23.8301 19.8873 22.9106 18.2946C21.9911 16.7019 19.9545 16.1562 18.3619 17.0757C16.7692 17.9953 16.2235 20.0318 17.143 21.6245Z" fill="url(#t1-wlc-grad)"/>
    <path d="M21.9054 28.2818C22.6007 29.4861 24.1407 29.8988 25.345 29.2034C26.5493 28.5081 26.962 26.9681 26.2667 25.7638C25.5713 24.5595 24.0314 24.1468 22.827 24.8422C21.6227 25.5375 21.2101 27.0775 21.9054 28.2818Z" fill="url(#t1-wlc-grad)"/>
    <path d="M18.4499 33.6C18.4499 34.4594 19.1466 35.1561 20.006 35.1561C20.8655 35.1561 21.5622 34.4594 21.5622 33.6C21.5622 32.7405 20.8655 32.0438 20.006 32.0438C19.1466 32.0438 18.4499 32.7405 18.4499 33.6Z" fill="url(#t1-wlc-grad)"/>
    <path d="M10.8078 32.8221C10.3781 33.5664 10.6331 34.5182 11.3774 34.9479C12.1217 35.3776 13.0734 35.1226 13.5032 34.3783C13.9329 33.634 13.6779 32.6823 12.9336 32.2525C12.1893 31.8228 11.2375 32.0778 10.8078 32.8221Z" fill="url(#t1-wlc-grad)"/>
    <path d="M35.7071 18.4264C34.8476 18.4264 34.1509 19.1231 34.1509 19.9825C34.1509 20.842 34.8476 21.5387 35.7071 21.5387C36.5665 21.5387 37.2632 20.842 37.2632 19.9825C37.2632 19.1231 36.5665 18.4264 35.7071 18.4264Z" fill="url(#t1-wlc-grad)"/>
    <path d="M4.30489 18.4264C3.44544 18.4264 2.74872 19.1231 2.74872 19.9825C2.74872 20.842 3.44544 21.5387 4.30489 21.5387C5.16433 21.5387 5.86105 20.842 5.86105 19.9825C5.86105 19.1231 5.16433 18.4264 4.30489 18.4264Z" fill="url(#t1-wlc-grad)"/>
    <path d="M32.6287 25.4733C31.8844 25.0436 30.9327 25.2986 30.5029 26.0429C30.0732 26.7872 30.3282 27.739 31.0725 28.1687C31.8168 28.5984 32.7686 28.3434 33.1983 27.5991C33.628 26.8548 33.373 25.903 32.6287 25.4733Z" fill="url(#t1-wlc-grad)"/>
    <path d="M8.9697 11.8199C8.2254 11.3901 7.27366 11.6451 6.84394 12.3895C6.41421 13.1338 6.66923 14.0855 7.41353 14.5152C8.15784 14.9449 9.10957 14.6899 9.5393 13.9456C9.96902 13.2013 9.714 12.2496 8.9697 11.8199Z" fill="url(#t1-wlc-grad)"/>
    <path d="M29.2042 32.8221C28.7745 32.0778 27.8227 31.8228 27.0784 32.2525C26.3341 32.6823 26.0791 33.634 26.5088 34.3783C26.9386 35.1226 27.8903 35.3776 28.6346 34.9479C29.3789 34.5182 29.6339 33.5664 29.2042 32.8221Z" fill="url(#t1-wlc-grad)"/>
    <path d="M13.5031 5.60695C13.0734 4.86265 12.1217 4.60764 11.3774 5.03736C10.6331 5.46708 10.378 6.41882 10.8078 7.16312C11.2375 7.90743 12.1892 8.16244 12.9335 7.73272C13.6778 7.303 13.9328 6.35126 13.5031 5.60695Z" fill="url(#t1-wlc-grad)"/>
    <path d="M35.9099 9.70375C35.4499 9.96935 35.2923 10.5576 35.5579 11.0176C35.8235 11.4776 36.4117 11.6353 36.8718 11.3697C37.3318 11.1041 37.4894 10.5158 37.2238 10.0558C36.9582 9.59577 36.37 9.43815 35.9099 9.70375Z" fill="url(#t1-wlc-grad)"/>
    <path d="M3.12978 28.6293C2.66975 28.8949 2.51213 29.4831 2.77773 29.9432C3.04332 30.4032 3.63156 30.5608 4.09159 30.2952C4.55162 30.0296 4.70924 29.4414 4.44364 28.9814C4.17804 28.5213 3.58981 28.3637 3.12978 28.6293Z" fill="url(#t1-wlc-grad)"/>
    <path d="M36.8718 28.6293C36.4118 28.3637 35.8235 28.5213 35.5579 28.9813C35.2923 29.4413 35.4499 30.0296 35.91 30.2952C36.37 30.5608 36.9582 30.4032 37.2238 29.9431C37.4894 29.4831 37.3318 28.8949 36.8718 28.6293Z" fill="url(#t1-wlc-grad)"/>
    <path d="M4.09161 9.70376C3.63158 9.43816 3.04335 9.59578 2.77775 10.0558C2.51215 10.5158 2.66977 11.1041 3.1298 11.3697C3.58983 11.6353 4.17806 11.4777 4.44366 11.0176C4.70926 10.5576 4.55164 9.96936 4.09161 9.70376Z" fill="url(#t1-wlc-grad)"/>
    <path d="M20.9625 39.0176C20.9625 38.4864 20.5319 38.0558 20.0007 38.0558C19.4695 38.0558 19.0389 38.4864 19.0389 39.0176C19.0389 39.5488 19.4695 39.9794 20.0007 39.9794C20.5319 39.9794 20.9625 39.5488 20.9625 39.0176Z" fill="url(#t1-wlc-grad)"/>
    <path d="M20.9626 0.981347C20.9626 0.450151 20.532 0.0195313 20.0008 0.0195312C19.4696 0.0195312 19.0389 0.450151 19.0389 0.981347C19.0389 1.51254 19.4696 1.94316 20.0008 1.94316C20.532 1.94316 20.9626 1.51254 20.9626 0.981347Z" fill="url(#t1-wlc-grad)"/>
    <path d="M15.2611 38.4277C15.3985 37.9146 15.0941 37.3872 14.581 37.2497C14.0679 37.1122 13.5405 37.4167 13.403 37.9298C13.2655 38.4429 13.57 38.9703 14.0831 39.1078C14.5962 39.2453 15.1236 38.9408 15.2611 38.4277Z" fill="url(#t1-wlc-grad)"/>
    <path d="M26.5985 2.0691C26.736 1.556 26.4315 1.0286 25.9184 0.891118C25.4053 0.753634 24.8779 1.05813 24.7404 1.57122C24.6029 2.08432 24.9074 2.61172 25.4205 2.7492C25.9336 2.88669 26.461 2.58219 26.5985 2.0691Z" fill="url(#t1-wlc-grad)"/>
    <path d="M7.77144 34.6784C8.14706 34.3028 8.14706 33.6938 7.77144 33.3182C7.39583 32.9426 6.78684 32.9426 6.41123 33.3182C6.03562 33.6938 6.03562 34.3028 6.41123 34.6784C6.78684 35.054 7.39583 35.054 7.77144 34.6784Z" fill="url(#t1-wlc-grad)"/>
    <path d="M33.5903 6.68069C33.9659 6.30508 33.9659 5.69609 33.5903 5.32048C33.2147 4.94487 32.6057 4.94487 32.2301 5.32048C31.8545 5.69609 31.8545 6.30508 32.2301 6.68069C32.6057 7.0563 33.2147 7.0563 33.5903 6.68069Z" fill="url(#t1-wlc-grad)"/>
    <path d="M1.6716 25.109C2.1847 24.9715 2.48919 24.4441 2.35171 23.931C2.21422 23.4179 1.68682 23.1134 1.17373 23.2509C0.660632 23.3884 0.356137 23.9158 0.493621 24.4289C0.631105 24.942 1.1585 25.2465 1.6716 25.109Z" fill="url(#t1-wlc-grad)"/>
    <path d="M38.8278 16.7481C39.3409 16.6106 39.6454 16.0832 39.5079 15.5701C39.3705 15.057 38.8431 14.7525 38.33 14.89C37.8169 15.0275 37.5124 15.5549 37.6499 16.068C37.7873 16.5811 38.3147 16.8856 38.8278 16.7481Z" fill="url(#t1-wlc-grad)"/>
    <path d="M1.17373 16.7481C1.68683 16.8856 2.21423 16.5811 2.35171 16.068C2.4892 15.5549 2.1847 15.0275 1.67161 14.89C1.15851 14.7525 0.63111 15.057 0.493626 15.5701C0.356142 16.0832 0.660636 16.6106 1.17373 16.7481Z" fill="url(#t1-wlc-grad)"/>
    <path d="M38.33 25.1089C38.8431 25.2464 39.3705 24.9419 39.5079 24.4288C39.6454 23.9157 39.3409 23.3883 38.8278 23.2509C38.3147 23.1134 37.7873 23.4179 37.6499 23.931C37.5124 24.4441 37.8169 24.9715 38.33 25.1089Z" fill="url(#t1-wlc-grad)"/>
    <path d="M6.41128 6.68068C6.78689 7.05629 7.39588 7.05629 7.77149 6.68068C8.1471 6.30507 8.1471 5.69608 7.77149 5.32047C7.39588 4.94485 6.78689 4.94485 6.41128 5.32047C6.03566 5.69608 6.03566 6.30507 6.41128 6.68068Z" fill="url(#t1-wlc-grad)"/>
    <path d="M32.2301 34.6784C32.6057 35.054 33.2147 35.054 33.5903 34.6784C33.966 34.3028 33.966 33.6938 33.5903 33.3182C33.2147 32.9426 32.6057 32.9426 32.2301 33.3182C31.8545 33.6938 31.8545 34.3028 32.2301 34.6784Z" fill="url(#t1-wlc-grad)"/>
    <path d="M13.4031 2.06909C13.5406 2.58219 14.068 2.88668 14.5811 2.7492C15.0942 2.61172 15.3986 2.08432 15.2612 1.57122C15.1237 1.05812 14.5963 0.75363 14.0832 0.891114C13.5701 1.0286 13.2656 1.556 13.4031 2.06909Z" fill="url(#t1-wlc-grad)"/>
    <path d="M24.7405 38.4277C24.8779 38.9408 25.4053 39.2453 25.9184 39.1078C26.4315 38.9703 26.736 38.4429 26.5985 37.9298C26.4611 37.4167 25.9337 37.1122 25.4206 37.2497C24.9075 37.3872 24.603 37.9146 24.7405 38.4277Z" fill="url(#t1-wlc-grad)"/>
    <path d="M18.4455 6.36503C18.4455 7.22448 19.1423 7.9212 20.0017 7.9212C20.8612 7.9212 21.5579 7.22448 21.5579 6.36503C21.5579 5.50559 20.8612 4.80887 20.0017 4.80887C19.1423 4.80887 18.4455 5.50559 18.4455 6.36503Z" fill="url(#t1-wlc-grad)"/>
    <path d="M29.4032 22.0736C30.6076 21.3783 31.0202 19.8383 30.3249 18.634C30.074 18.1995 29.7132 17.8681 29.2979 17.6545C28.4014 17.1935 27.3216 16.8348 26.8176 15.9618C26.3135 15.0887 26.5428 13.9742 26.5918 12.9673C26.6145 12.5009 26.5079 12.0227 26.257 11.5882C25.5617 10.3839 24.0217 9.97124 22.8174 10.6666C21.6131 11.3619 21.2004 12.9019 21.8957 14.1062C22.1466 14.5407 22.5074 14.8721 22.9227 15.0857C23.8192 15.5467 24.899 15.9054 25.403 16.7784C25.9071 17.6515 25.6779 18.7659 25.6288 19.7729C25.6061 20.2393 25.7128 20.7175 25.9636 21.152C26.6589 22.3563 28.1989 22.7689 29.4032 22.0736Z" fill="url(#t1-wlc-grad)"/>
    <path d="M27.0898 5.04549C27.8341 4.61576 28.7858 4.87078 29.2155 5.61509C29.7747 6.58358 29.4583 7.98957 30.0175 8.95806L30.6251 10.0105C31.1917 10.9918 32.5998 11.4178 33.1664 12.3991C33.5961 13.1434 33.3411 14.0951 32.5968 14.5249C31.8525 14.9546 30.9007 14.6996 30.471 13.9553C29.9045 12.974 30.2396 11.5415 29.673 10.5602L29.1081 9.58166C28.5343 8.5879 27.0939 8.16502 26.5202 7.17125C26.0905 6.42695 26.3455 5.47521 27.0898 5.04549Z" fill="url(#t1-wlc-grad)"/>
    <path d="M13.1455 17.7798C11.9411 17.0845 10.4012 17.4971 9.70584 18.7014C9.53872 18.9909 9.43561 19.2997 9.3921 19.6116C9.21143 20.9066 9.56999 22.4093 8.91621 23.5417L8.85516 23.6475C8.34289 24.5347 7.15857 24.9764 6.64629 25.8637C6.21657 26.608 6.47159 27.5597 7.21589 27.9894C7.96019 28.4191 8.91193 28.1641 9.34165 27.4198C9.83568 26.5641 9.66225 25.3763 10.1563 24.5206L10.2345 24.3851C10.9095 23.2159 12.4507 22.7617 13.4913 21.9016C13.7163 21.7156 13.9126 21.4871 14.0671 21.2194C14.7624 20.0151 14.3498 18.4751 13.1455 17.7798Z" fill="url(#t1-wlc-grad)"/>
  </svg>
);

const Welcome = ({
  name        = 'John',
  description = 'How can I help you today?',
  className,
  ...rest
}) => (
  <div className={['t1-wlc', className].filter(Boolean).join(' ')} {...rest}>
    <AiT1WelcomeSvg />
    <div className="t1-wlc__labels">
      <span className="t1-wlc__heading">Hi {name},</span>
      <span className="t1-wlc__description">{description}</span>
    </div>
  </div>
);

/* -------- Prompt-Input -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   PROMPT-INPUT  (Figma: Desktop  · Mobile )
   BEM prefix: t1-pi

   Props
   ─────────────────────────────────────────────────────────────────────────
   placeholder          string    single static placeholder (no animation)
   placeholders         string[]  cycling texts; defaults to built-in AI set
   placeholderInterval  number    ms between placeholder switches  default 3000
   mobile          bool      switch to mobile layout        default false
   disabled        bool      disabled state                 default false
   loading         bool      loading / streaming state      default false
   showSearchChip  bool      show "Search" chip in toolbar  default false
   onSend          function  called with (value: string) on send
   onAttach        function  called when attach (+) clicked
   onMic           function  called when mic clicked
   onSearchChip    function  called when Search chip × is clicked
   className       string    optional extra class

   Slash-command templates menu
   ─────────────────────────────────────────────────────────────────────────
   Typing "/" opens a popover above the input listing prompt templates that
   match the query. No matches → "No Results" empty state.
   Props
     templates             array     [{ command, description, icon }]
     templatesTitle        string    header title    default "Prompt Templates"
     showCreateTemplate    bool      show "+ Create" header action  default true
     showViewAllTemplates  bool      show "View all" footer button  default true
     onSelectTemplate      function  called with (template) on pick
     onCreateTemplate      function  called when "+ Create" clicked
     onViewAllTemplates    function  called when "View all" clicked
   Description supports [bracketed slots] which render in violet.

   Animated placeholder — two-slot technique (matches reference design)
   ─────────────────────────────────────────────────────────────────────────
   Two absolutely-positioned spans sit inside an overflow:hidden wrapper.
   One is always `visible` (translateY 0), one is always off-screen.
   On each cycle:
     1. Next slot text is set, class snapped to `hidden-down` (no transition)
     2. Force reflow (offsetHeight read)
     3. Current → `hidden-up`, Next → `visible` (both animate 600ms ease-in-out)
   Matches: tekiondesignteam.github.io/design-experimentations/archive/ai4-home.html

   Border animation / Mobile layout / Focus-loop fix
   ─────────────────────────────────────────────────────────────────────────
   Unchanged from original.
   ========================================================================== */

const _DEFAULT_PH = [
  'Ask anything or press "/" for shortcuts',
  'Summarize my open pipeline...',
  'Draft a follow-up for the Accord deal...',
  'Which leads are highest priority this week?',
  'Show me deals closing this month...',
  'What should I focus on today?',
];

const _DEFAULT_TEMPLATES = [
  {
    command: '/approve-pending-deals',
    icon: 'tag',
    description: 'CRM  ·  Review and approve deals pending under [salesperson] or [deal type].',
  },
  {
    command: '/check-lead-response-time',
    icon: 'clock-counter-clockwise',
    description: 'CRM  ·  Analyze response time for [team/salesperson] over [time period].',
  },
  {
    command: '/find-stuck-deals',
    icon: 'tag',
    description: 'CRM  ·  Detect deals not progressed in the last [time duration].',
  },
  {
    command: '/trade-in-value',
    icon: 'chart-line-up',
    description: 'CRM  ·  Based on current market factors determine the trade-in value of [Item] using [Model].',
  },
  {
    command: '/view-likely-closures-today',
    icon: 'arrows-left-right',
    description: 'CRM  ·  Show deals likely to close by [time] today.',
  },
];

const _renderTplDesc = (text) =>
  String(text || '').split(/(\[[^\]]+\])/g).map((part, i) =>
    /^\[[^\]]+\]$/.test(part)
      ? <span key={i} className="t1-pi__tpl-slot">{part}</span>
      : <React.Fragment key={i}>{part}</React.Fragment>
  );

const PromptInput = ({
  placeholder    = 'Ask anything or press "/" for shortcuts',
  placeholders,
  placeholderInterval = 3000,
  mobile         = false,
  disabled       = false,
  loading        = false,
  showSearchChip = false,
  templates             = _DEFAULT_TEMPLATES,
  templatesTitle        = 'Prompt Templates',
  showCreateTemplate    = true,
  showViewAllTemplates  = true,
  onSelectTemplate,
  onCreateTemplate,
  onViewAllTemplates,
  onSend,
  onAttach,
  onMic,
  onSearchChip,
  className,
  ...rest
}) => {
  const [value,   setValue]   = React.useState('');
  const [focused, setFocused] = React.useState(false);
  const [templatesOpen, setTemplatesOpen] = React.useState(false);
  const [highlighted, setHighlighted] = React.useState(0);
  const textareaRef = React.useRef(null);
  const rootRef = React.useRef(null);
  const transitioning = React.useRef(false);

  /* ── Slash-command templates menu ────────────────────────────────────── */
  const startsWithSlash = value.startsWith('/');
  const showTemplates   = templatesOpen && startsWithSlash;
  const tplQuery        = startsWithSlash ? value.slice(1).toLowerCase() : '';
  const filteredTemplates = startsWithSlash
    ? templates.filter((t) => {
        const cmd  = (t.command || '').toLowerCase().replace(/^\//, '');
        const desc = (t.description || '').toLowerCase();
        return cmd.includes(tplQuery) || desc.includes(tplQuery);
      })
    : [];

  /* Reset highlight whenever the filtered list changes shape */
  React.useEffect(() => { setHighlighted(0); }, [tplQuery, showTemplates]);

  /* Close templates on outside click */
  React.useEffect(() => {
    if (!showTemplates) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setTemplatesOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [showTemplates]);

  const handleSelectTemplate = (tpl) => {
    if (!tpl) return;
    setValue(tpl.command + ' ');
    setTemplatesOpen(false);
    setHighlighted(0);
    if (onSelectTemplate) onSelectTemplate(tpl);
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleCloseTemplates = () => {
    setValue('');
    setTemplatesOpen(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.focus();
    }
  };

  /* ── Two-slot animated placeholder ──────────────────────────────────── */
  const phList    = placeholders || _DEFAULT_PH;
  const slot1Ref  = React.useRef(null);
  const slot2Ref  = React.useRef(null);
  const activeRef = React.useRef(1); /* which slot is currently 'visible' */
  const phIdxRef  = React.useRef(0); /* index of the NEXT text to show    */

  /* Hide the overlay when the field has content or is focused */
  const showPh = value === '' && !focused;

  React.useEffect(() => {
    if (phList.length <= 1) return;

    /* Initialise slot 2 with the second placeholder text, hidden below */
    if (slot2Ref.current) {
      slot2Ref.current.textContent = phList[1 % phList.length];
    }

    const loop = setInterval(() => {
      const curr = activeRef.current === 1 ? slot1Ref.current : slot2Ref.current;
      const next = activeRef.current === 1 ? slot2Ref.current : slot1Ref.current;
      if (!curr || !next) return;

      /* Advance index */
      phIdxRef.current = (phIdxRef.current + 1) % phList.length;

      /* 1. Snap next slot to bottom with no transition */
      next.textContent = phList[phIdxRef.current];
      next.className   = 't1-pi__ph-item t1-pi__ph-item--no-transition t1-pi__ph-item--down';

      /* 2. Force reflow so the browser registers the initial position */
      /* eslint-disable-next-line no-unused-expressions */
      next.offsetHeight;

      /* 3. Animate: current exits upward, next enters from below */
      next.className = 't1-pi__ph-item t1-pi__ph-item--visible';
      curr.className = 't1-pi__ph-item t1-pi__ph-item--up';

      activeRef.current = activeRef.current === 1 ? 2 : 1;
    }, placeholderInterval);

    return () => clearInterval(loop);
  }, [phList, placeholderInterval]);

  /* ── Core input logic (unchanged) ─────────────────────────────────── */
  const isActive = focused || value.length > 0;
  const canSend  = value.trim().length > 0 && !disabled && !loading;

  const autoResize = (el) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  };

  const handleChange  = (e) => {
    const next = e.target.value;
    const prev = value;
    setValue(next);
    autoResize(e.target);
    /* Open menu when "/" newly appears at start; close when it leaves */
    if (next.startsWith('/') && !prev.startsWith('/')) setTemplatesOpen(true);
    else if (!next.startsWith('/') && prev.startsWith('/')) setTemplatesOpen(false);
  };
  const handleKeyDown = (e) => {
    if (showTemplates) {
      if (e.key === 'Escape') {
        e.preventDefault();
        setTemplatesOpen(false);
        return;
      }
      if (filteredTemplates.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setHighlighted((h) => (h + 1) % filteredTemplates.length);
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setHighlighted((h) => (h - 1 + filteredTemplates.length) % filteredTemplates.length);
          return;
        }
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSelectTemplate(filteredTemplates[highlighted]);
          return;
        }
      }
    }
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };
  const handleSend = () => {
    if (!canSend) return;
    onSend && onSend(value);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };
  const handleFocus = () => {
    transitioning.current = true;
    setFocused(true);
    setTimeout(() => { transitioning.current = false; }, 200);
  };
  const handleBlur = () => { if (!transitioning.current) setFocused(false); };

  React.useEffect(() => {
    if (!mobile || !isActive) return;
    const t = setTimeout(() => { if (textareaRef.current) textareaRef.current.focus(); }, 10);
    return () => clearTimeout(t);
  }, [mobile, isActive]);

  /* ── Sub-components (unchanged) ────────────────────────────────────── */
  const AttachBtn = () => (
    <button className="t1-pi__icon-btn" onClick={onAttach} aria-label="Attach file" type="button">
      <i className="ph ph-plus t1-pi__icon-btn-icon" aria-hidden="true" />
    </button>
  );
  const MicBtn = () => (
    <button className="t1-pi__icon-btn" onClick={onMic} aria-label="Voice input" type="button">
      <i className="ph ph-microphone t1-pi__icon-btn-icon" aria-hidden="true" />
    </button>
  );
  const SendBtn = ({ lg = false }) => (
    <button
      className={['t1-pi__send', canSend && 't1-pi__send--enabled', lg && 't1-pi__send--lg'].filter(Boolean).join(' ')}
      onClick={handleSend} disabled={!canSend} aria-label="Send message" type="button"
    >
      <i className={['ph ph-arrow-up t1-pi__send-icon', canSend && 't1-pi__send-icon--active'].filter(Boolean).join(' ')} aria-hidden="true" />
    </button>
  );
  const SearchChipEl = () => (
    <Chip variant="soft" color="primary" size="md" startIcon="search" endIcon="x" onClick={onSearchChip}>
      Search
    </Chip>
  );

  /* ── Templates popover ────────────────────────────────────────────────── */
  const TemplatesPanel = () => {
    if (!showTemplates) return null;
    const isEmpty = filteredTemplates.length === 0;
    /* Keep textarea focus on panel interactions */
    const keepFocus = (e) => e.preventDefault();
    return (
      <div
        className={['t1-pi__templates', isEmpty && 't1-pi__templates--empty'].filter(Boolean).join(' ')}
        role="listbox"
        aria-label={templatesTitle}
        onMouseDown={keepFocus}
      >
        <div className="t1-pi__templates-header">
          <span className="t1-pi__templates-title">{templatesTitle}</span>
          <div className="t1-pi__templates-header-actions">
            {showCreateTemplate && !isEmpty && (
              <button
                type="button"
                className="t1-pi__templates-action"
                onClick={() => { if (onCreateTemplate) onCreateTemplate(); }}
              >
                <i className="ph ph-plus t1-pi__templates-action-icon" aria-hidden="true" />
                <span>Create</span>
              </button>
            )}
            <button
              type="button"
              className="t1-pi__templates-close"
              onClick={handleCloseTemplates}
              aria-label="Close prompt templates"
            >
              <i className="ph ph-x" aria-hidden="true" />
            </button>
          </div>
        </div>

        {isEmpty ? (
          <div className="t1-pi__templates-empty-body">
            <div className="t1-pi__templates-empty-icon">
              <i className="ph ph-sparkle" aria-hidden="true" />
            </div>
            <div className="t1-pi__templates-empty-content">
              <div className="t1-pi__templates-empty-title">No Results</div>
              <div className="t1-pi__templates-empty-subtitle">
                No prompt templates available for this search
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="t1-pi__templates-list">
              {filteredTemplates.map((tpl, idx) => (
                <button
                  key={tpl.command}
                  type="button"
                  role="option"
                  aria-selected={idx === highlighted}
                  className={[
                    't1-pi__templates-item',
                    idx === highlighted && 't1-pi__templates-item--active',
                  ].filter(Boolean).join(' ')}
                  onMouseEnter={() => setHighlighted(idx)}
                  onClick={() => handleSelectTemplate(tpl)}
                >
                  {tpl.icon && (
                    <i className={`ph ph-${tpl.icon} t1-pi__templates-item-icon`} aria-hidden="true" />
                  )}
                  <div className="t1-pi__templates-item-content">
                    <div className="t1-pi__templates-item-title">{tpl.command}</div>
                    <div className="t1-pi__templates-item-desc">
                      {_renderTplDesc(tpl.description)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {showViewAllTemplates && (
              <div className="t1-pi__templates-footer">
                <div className="t1-pi__templates-divider" />
                <button
                  type="button"
                  className="t1-pi__templates-viewall"
                  onClick={() => {
                    if (onViewAllTemplates) onViewAllTemplates();
                    setTemplatesOpen(false);
                  }}
                >
                  View all
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  /* The two-slot placeholder overlay — always rendered, hidden via opacity */
  const PhSlots = ({ inlineRow }) => (
    <div
      className={`t1-pi__ph-wrap${inlineRow ? ' t1-pi__ph-wrap--inline' : ''}${showPh ? '' : ' t1-pi__ph-wrap--hidden'}`}
      aria-hidden="true"
    >
      <span ref={slot1Ref} className="t1-pi__ph-item t1-pi__ph-item--visible">
        {phList[0]}
      </span>
      <span ref={slot2Ref} className="t1-pi__ph-item t1-pi__ph-item--down">
        {phList[1] || ''}
      </span>
    </div>
  );

  /* ── Mobile collapsed (UNCHANGED DOM structure) ─────────────────────── */
  if (mobile && !isActive) {
    return (
      <div
        ref={rootRef}
        className={['t1-pi', 't1-pi--mobile', 't1-pi--mobile-row', disabled && 't1-pi--disabled', className].filter(Boolean).join(' ')}
        {...rest}
      >
        <AttachBtn />
        <div className="t1-pi__input-wrap">
          <textarea
            ref={textareaRef}
            className="t1-pi__textarea t1-pi__textarea--inline"
            placeholder=""
            value={value}
            rows={1}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
          />
          <PhSlots inlineRow />
        </div>
        <MicBtn />
        <SendBtn lg />
      </div>
    );
  }

  /* ── Desktop / mobile-expanded (UNCHANGED DOM structure) ────────────── */
  const rootClass = [
    't1-pi',
    isActive  && 't1-pi--active',
    loading   && 't1-pi--loading',
    disabled  && 't1-pi--disabled',
    mobile    && 't1-pi--mobile',
    mobile    && 't1-pi--mobile-expanded',
    showTemplates && 't1-pi--templates-open',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div ref={rootRef} className={rootClass} {...rest}>
      <TemplatesPanel />
      <textarea
        ref={textareaRef}
        className="t1-pi__textarea"
        placeholder=""
        value={value}
        rows={1}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <PhSlots />
      <div className="t1-pi__toolbar">
        <div className="t1-pi__toolbar-left">
          <AttachBtn />
          {showSearchChip && <SearchChipEl />}
        </div>
        <div className="t1-pi__toolbar-right">
          <MicBtn />
          <SendBtn lg={mobile} />
        </div>
      </div>
    </div>
  );
};

/* -------- Side-Navigation -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   SIDE-NAVIGATION  (Figma: aiT1SideNavUpdated)
   BEM prefix: t1-sn

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Phi    — icons (search 16px, nav 24px, chevrons 16px, task items 16px)
   Button — "Start a New Chat" (variant="contained" color="neutral" size="md")
   Link   — "View all" (appearance="neutral", underlined)

   Props
   ─────────────────────────────────────────────────────────────────────────
   scheduledTask    bool       Show Recent Tasks section           false
   sections         string     "Expanded" | "Collapsed"            "Expanded"
                               Initial state — component manages it internally
   task             string     "Default" | "Collapsed" | "Expanded" "Default"
   activeNav        string     Initial active nav item             "tasks"
                               "home" | "tasks" | "shortcuts"
   searchValue      string     Controlled search input value       ""
   onSearch         fn         (value: string) => void
   onNewChat        fn         () => void
   onNavSelect      fn         ({ id, label }) => void
   pinnedChats      array      [{ id, label }]
   recentTasks      array      [{
                                  id, label,
                                  status?: "active"|"error"|"warning",
                                  subItems?: [{ id, label, status? }]
                                }]
   recentChats      array      [{ id, label }]
   onViewAllPinned  fn         () => void
   onViewAllTasks   fn         () => void
   onChatSelect     fn         (item) => void
   className        string

   Recent Tasks icon mapping  (Figma )
   ─────────────────────────────────────────────────────────────────────────
   Each task item always has a caret-right on the left (toggle).
   When expanded → caret-down.
   status="active"  → small filled blue circle dot  (#0060ff)
   status="error"   → small filled red circle dot   (#e53935)
   status="warning" → small warning triangle         (#f59e0b)
   No status        → no dot, just the caret
   Sub-items (date-prefixed runs) appear indented when parent is expanded.

   Design tokens
   ─────────────────────────────────────────────────────────────────────────
   Container        width 280px · bg #ffffff · border-right 1px #d4d5d6
   Search container sticky top · padding 16px · gap 16px
   Search field     h 32px · border 1px #969aa3 · radius 2px · px 10px
   New Chat button  neutral/contained/md · full width
   Primary nav      px 16px · pb 16px · flex-col
   Nav item         px 8px · py 8px · gap 12px · radius 8px
                    default: bg #ffffff · body2Bold 14/600/16 · #161616
                    active:  bg #edeef0 · body2Bold 14/600/16 · #161616
   Nav icon         24px
   Section header   px 16px · gap 8px · label body2Medium 14/500/16 · #969aa3
   Task item        pl 32px · pr 12px · py 12px · radius 4px · gap 8px
                    caret 16px + optional status dot 8px + label
   Sub-item         pl 40px · pr 12px · py 8px · radius 4px · gap 8px
   Chat item        pl 32px · pr 12px · py 12px · radius 4px
   View all link    neutral · underline · pl 32px
   ========================================================================== */

/* ── Default sample data (mirrors Figma canvas) ────────────────────────── */
const _SN_PINNED_DEFAULT = [
  { id: 'pc1', label: 'Monthly Sales Review' },
  { id: 'pc2', label: 'Summarize recent hot leads' },
  { id: 'pc3', label: 'Draft quote for Model X' },
];

/* recentTasks — rich structure with status + sub-items */
const _SN_TASKS_DEFAULT = [
  {
    id: 'rt1',
    label: 'Daily Sales Report',
    status: 'active',
    subItems: [
      { id: 'rt1-1', label: 'Apr 8 - Daily Sales Report', status: 'active' },
      { id: 'rt1-2', label: 'Apr 7 - Daily Sales Report' },
      { id: 'rt1-3', label: 'Apr 6 - Daily Sales Report' },
      { id: 'rt1-4', label: 'Apr 5 - Daily Sales Report' },
    ],
  },
  { id: 'rt2', label: 'Prepare monthly performance reports' },
  { id: 'rt3', label: 'Analyze quarterly revenue trends', status: 'error' },
  { id: 'rt4', label: 'Sales Leaderboard Update', status: 'warning' },
  { id: 'rt5', label: 'Daily pipeline summary' },
];

const _SN_CHATS_DEFAULT = [
  { id: 'rc1', label: 'Monthly Sales Review' },
  { id: 'rc2', label: 'Summarize recent hot leads' },
  { id: 'rc3', label: 'Draft quote for Model X' },
  { id: 'rc4', label: 'Last high-priority test drives' },
  { id: 'rc5', label: 'Coordinate follow-up calls with prospects' },
  { id: 'rc6', label: 'Schedule follow-up meetings' },
  { id: 'rc7', label: 'Prepare presentation for upcoming trade show' },
  { id: 'rc8', label: 'Update inventory status for shipment' },
];

/* Status icons removed — task items show caret + label only */

const SideNavigation = ({
  scheduledTask    = false,
  sections         = 'Expanded',
  task             = 'Default',
  activeNav:       activeNavProp = 'tasks',
  searchValue      = '',
  onSearch,
  onNewChat,
  onNavSelect,
  pinnedChats      = _SN_PINNED_DEFAULT,
  recentTasks      = _SN_TASKS_DEFAULT,
  recentChats      = _SN_CHATS_DEFAULT,
  onViewAllPinned,
  onViewAllTasks,
  onChatSelect,
  className,
  ...rest
}) => {

  /* ── Internal state ──────────────────────────────────────────────────── */
  const [activeNav,      setActiveNav]      = React.useState(activeNavProp);
  const [pinnedOpen,     setPinnedOpen]     = React.useState(sections === 'Expanded');
  const [tasksOpen,      setTasksOpen]      = React.useState(sections === 'Expanded');
  const [chatsOpen,      setChatsOpen]      = React.useState(sections === 'Expanded');
  const [selectedChat,   setSelectedChat]   = React.useState(null);
  /* Set of task IDs that are currently expanded.
     When task="Expanded", start with the first item that has sub-items open */
  const [expandedTasks,  setExpandedTasks]  = React.useState(() => {
    if (task === 'Expanded') {
      const firstWithSubs = recentTasks.find(t => t.subItems && t.subItems.length > 0);
      if (firstWithSubs) return new Set([firstWithSubs.id]);
    }
    return new Set();
  });

  /* Sync when parent drives props */
  React.useEffect(() => {
    const open = sections === 'Expanded';
    setPinnedOpen(open);
    setTasksOpen(open);
    setChatsOpen(open);
  }, [sections]);

  React.useEffect(() => { setActiveNav(activeNavProp); }, [activeNavProp]);

  /* ── Handlers ────────────────────────────────────────────────────────── */
  const handleNavClick = (item) => {
    setActiveNav(item.id);
    if (onNavSelect) onNavSelect(item);
  };

  const handleChatClick = (item) => {
    setSelectedChat(item.id);
    if (onChatSelect) onChatSelect(item);
  };

  const toggleTask = (id) => {
    setExpandedTasks((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /* ── Primary nav items ───────────────────────────────────────────────── */
  const NAV_ITEMS = [
    { id: 'home',      label: 'Home',      icon: 'house'          },
    { id: 'tasks',     label: 'Tasks',     icon: 'clipboard-text' },
    { id: 'shortcuts', label: 'Shortcuts', icon: 'lightning'      },
  ];

  /* ── NavItem ─────────────────────────────────────────────────────────── */
  const NavItem = ({ item }) => {
    const isActive = item.id === activeNav;
    return (
      <div
        className={['t1-sn__nav-item', isActive ? 'is-active' : ''].filter(Boolean).join(' ')}
        role="button"
        tabIndex={0}
        onClick={() => handleNavClick(item)}
        onKeyDown={(e) => e.key === 'Enter' && handleNavClick(item)}
        aria-current={isActive ? 'page' : undefined}
      >
        <div className="t1-sn__nav-icon" aria-hidden="true">
          <Phi name={item.icon} size={24} weight="regular" />
        </div>
        <span className="t1-sn__nav-label">{item.label}</span>
      </div>
    );
  };

  /* ── Section header (collapsible) ────────────────────────────────────── */
  const SectionHeader = ({ label, expanded, onToggle }) => (
    <div
      className="t1-sn__section-header"
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      aria-expanded={expanded}
    >
      <span className="t1-sn__section-chevron" aria-hidden="true">
        <Phi name={expanded ? 'caret-down' : 'caret-right'} size={16} weight="regular" />
      </span>
      <span className="t1-sn__section-label">{label}</span>
    </div>
  );

  /* ── "View all" link row ─────────────────────────────────────────────── */
  const ViewAllRow = ({ onClick, indent }) => (
    <div className={['t1-sn__view-all', indent ? 't1-sn__view-all--sub' : ''].filter(Boolean).join(' ')}>
      <Link
        href="#"
        appearance="neutral"
        size="medium"
        className="is-underlined"
        onClick={(e) => { e.preventDefault(); if (onClick) onClick(); }}
      >
        View all
      </Link>
    </div>
  );

  /* ── TaskItem — caret + label + expandable sub-items ────────────────── */
  const TaskItem = ({ item }) => {
    const isExpanded  = expandedTasks.has(item.id);
    const hasSubItems = item.subItems && item.subItems.length > 0;

    return (
      <div className="t1-sn__task-group">
        {/* ── Main row ── */}
        <div
          className="t1-sn__task-item"
          role="button"
          tabIndex={0}
          onClick={() => toggleTask(item.id)}
          onKeyDown={(e) => e.key === 'Enter' && toggleTask(item.id)}
          title={item.label}
        >
          <span className="t1-sn__task-caret" aria-hidden="true">
            <Phi
              name={isExpanded ? 'caret-down' : 'caret-right'}
              size={16}
              weight="regular"
            />
          </span>
          <span className="t1-sn__chat-label">{item.label}</span>
        </div>

        {/* ── Sub-items (expanded state) ── */}
        {isExpanded && hasSubItems && (
          <div className="t1-sn__task-subitems">
            {item.subItems.map((sub) => (
              <div
                key={sub.id}
                className="t1-sn__task-subitem"
                role="button"
                tabIndex={0}
                onClick={() => handleChatClick(sub)}
                onKeyDown={(e) => e.key === 'Enter' && handleChatClick(sub)}
                title={sub.label}
              >
                <span className="t1-sn__chat-label">{sub.label}</span>
              </div>
            ))}
            {/* "View all" at sub-item indent level */}
            <ViewAllRow indent />
          </div>
        )}
      </div>
    );
  };

  /* ── Plain chat item (Pinned Chats / Recent Chats — no icons) ─────────── */
  const ChatItem = ({ item }) => {
    const isSelected = item.id === selectedChat;
    return (
      <div
        className={['t1-sn__chat-item', isSelected ? 'is-selected' : ''].filter(Boolean).join(' ')}
        role="button"
        tabIndex={0}
        onClick={() => handleChatClick(item)}
        onKeyDown={(e) => e.key === 'Enter' && handleChatClick(item)}
        title={item.label}
      >
        <span className="t1-sn__chat-label">{item.label}</span>
      </div>
    );
  };

  /* ── Task expanded sub-list (task="Expanded" — primary nav) ─────────── */
  const TaskSubItem = ({ item }) => (
    <div
      className="t1-sn__task-sub-item"
      role="button"
      tabIndex={0}
      onClick={() => handleChatClick(item)}
      onKeyDown={(e) => e.key === 'Enter' && handleChatClick(item)}
    >
      <span className="t1-sn__task-sub-icon" aria-hidden="true">
        <Phi name="plus-circle" size={16} weight="regular" />
      </span>
      <span className="t1-sn__task-sub-label">{item.label}</span>
    </div>
  );

  const cls = ['t1-sn', className].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>
      <div className="t1-sn__body">

        {/* ── Sticky search container ───────────────────────────────── */}
        <div className="t1-sn__search-container">
          <Search
            size="md"
            placeholder="Search..."
            value={searchValue}
            onChange={onSearch ? (e) => onSearch(e.target.value) : undefined}
          />
          <Button
            variant="contained"
            color="neutral"
            size="md"
            iconStart="plus"
            onClick={onNewChat}
            className="t1-sn__new-chat-btn"
          >
            Start a New Chat
          </Button>
        </div>

        {/* ── Scrollable list ──────────────────────────────────────── */}
        <div className="t1-sn__list">

          {/* Primary navigation: Home / Tasks / Shortcuts */}
          <div className="t1-sn__primary-nav">
            <div className="t1-sn__nav-actions">
              {NAV_ITEMS.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="t1-sn__sections">

            {/* Pinned Chats */}
            <div className="t1-sn__section">
              <SectionHeader
                label="Pinned Chats"
                expanded={pinnedOpen}
                onToggle={() => setPinnedOpen(o => !o)}
              />
              {pinnedOpen && (
                <div className="t1-sn__section-body">
                  {pinnedChats.map((item) => <ChatItem key={item.id} item={item} />)}
                  <ViewAllRow onClick={onViewAllPinned} />
                </div>
              )}
            </div>

            {/* Recent Tasks — only when scheduledTask=true */}
            {/* Each item rendered as TaskItem with caret + status dot */}
            {scheduledTask && (
              <div className="t1-sn__section">
                <SectionHeader
                  label="Recent Tasks"
                  expanded={tasksOpen}
                  onToggle={() => setTasksOpen(o => !o)}
                />
                {tasksOpen && (
                  <div className="t1-sn__section-body">
                    {recentTasks.map((item) => <TaskItem key={item.id} item={item} />)}
                    <ViewAllRow onClick={onViewAllTasks} />
                  </div>
                )}
              </div>
            )}

            {/* Recent Chats — collapsible */}
            <div className="t1-sn__section">
              <SectionHeader
                label="Recent Chats"
                expanded={chatsOpen}
                onToggle={() => setChatsOpen(o => !o)}
              />
              {chatsOpen && (
                <div className="t1-sn__section-body">
                  {recentChats.map((item) => <ChatItem key={item.id} item={item} />)}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

/* -------- Nav-Bar -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   NAV-BAR  (Figma: aiT1NavBar)
   Responsive top navigation bar

   Figma refs
   ─────────────────────────────────────────────────────────────────────────
   Mobile  : T1-Components
   Desktop : Tasks file

   BEM prefix: t1-nb

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Phi    — icons (size=24 for icon buttons)
   Button — action button (variant="contained" color="primary" size="md" iconStart)

   Props
   ─────────────────────────────────────────────────────────────────────────
   title          string   Bar title text                        "Title"
   onMenuClick    fn       If provided → shows hamburger (≡)     undefined
   showMore       bool     Show ⋮ dots-three-vertical on right   false
   onMore         fn       Click handler for ⋮                   undefined
   showNewChat    bool     Show compose/pencil icon before ⋮     false
   onNewChat      fn       Click handler for new-chat icon       undefined
   actionLabel    string   If set → shows action button (right)  undefined
   actionIcon     string   Phi name for action button icon       "plus"
   onAction       fn       Action button click handler           undefined
   className      string

   Variants
   ─────────────────────────────────────────────────────────────────────────
   Mobile   : onMenuClick + title + showMore (+ showNewChat)
   Desktop  : title + actionLabel + onAction
   ========================================================================== */

const NavBar = ({
  title         = 'Title',
  onMenuClick,
  showMore      = false,
  onMore,
  showNewChat   = false,
  onNewChat,
  actionLabel,
  actionIcon    = 'plus',
  onAction,
  className,
  ...rest
}) => {

  const hasIcons  = !actionLabel && (showMore || showNewChat);
  const hasAction = !!actionLabel;

  const cls = ['t1-nb', className].filter(Boolean).join(' ');

  return (
    <div className={cls} role="banner" {...rest}>
      <div className="t1-nb__inner">

        {/* ── Prefix — hamburger OR empty balance spacer ───────────────────── */}
        <div className="t1-nb__prefix">
          {onMenuClick ? (
            <button
              className="t1-nb__icon-btn"
              onClick={onMenuClick}
              aria-label="Open menu"
            >
              <Phi name="list" size={24} weight="regular" />
            </button>
          ) : null}
        </div>

        {/* ── Title ────────────────────────────────────────────────────────── */}
        <h1 className="t1-nb__title">{title}</h1>

        {/* ── Suffix ───────────────────────────────────────────────────────── */}
        <div className="t1-nb__suffix">

          {/* Mobile: optional new-chat icon */}
          {hasIcons && showNewChat && (
            <button
              className="t1-nb__icon-btn"
              onClick={onNewChat}
              aria-label="New chat"
            >
              <Phi name="chat" size={24} weight="regular" />
            </button>
          )}

          {/* Mobile: more ⋮ */}
          {hasIcons && showMore && (
            <button
              className="t1-nb__icon-btn"
              onClick={onMore}
              aria-label="More options"
            >
              <Phi name="dots-three-vertical" size={24} weight="bold" />
            </button>
          )}

          {/* Desktop: action button — uses kit Button component */}
          {hasAction && (
            <>
              {/* 40px invisible spacer mirrors prefix so title stays centered */}
              <div className="t1-nb__balance" aria-hidden="true" />
              <Button
                variant="contained"
                color="primary"
                size="md"
                iconStart={actionIcon}
                onClick={onAction}
              >
                {actionLabel}
              </Button>
            </>
          )}

          {/* No suffix: 40px spacer to keep title visually centered */}
          {!hasIcons && !hasAction && (
            <div className="t1-nb__balance" aria-hidden="true" />
          )}

        </div>
      </div>
    </div>
  );
};

/* -------- Modal -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   MODAL  (Figma: aiT1Modal)
   BEM prefix: t1-modal

   Props
   ─────────────────────────────────────────────────────────────────────────
   open            boolean    Show / hide the modal             default true
   title           string     Header title text                 required
   subtitle        string     Optional header subtitle          optional
   onClose         function   Close handler (X + overlay click) optional
   children        node       Content slot                      optional
   primaryLabel    string     Primary button label              optional
   onPrimary       function   Primary button handler            optional
   secondaryLabel  string     Secondary button label            optional
   onSecondary     function   Secondary button handler          optional
   width           number     Modal width in px                 default 480
   scoped          boolean    Constrain overlay to nearest positioned ancestor
                              (position:absolute) instead of full viewport
                              (position:fixed). Use inside panels/drawers.   default false
   className       string     Extra classes on modal panel      optional

   Layout
   ─────────────────────────────────────────────────────────────────────────
   [overlay / backdrop]
     [modal panel]
       [header: neutral-100 bg · title / subtitle · ×close]
       [body: content slot]
       [footer: border-top · secondary outlined · primary contained]

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   IconButton  — close button (color="neutral" style="plain" size="sm")
   Button      — secondary (outlined/neutral/md) + primary (contained/primary/md)
   Phi         — X icon inside close button
   ========================================================================== */

const Modal = ({
  open           = true,
  title,
  subtitle,
  onClose,
  children,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  width          = 480,
  scoped         = false,
  className,
  ...rest
}) => {
  if (!open) return null;

  const hasFooter = primaryLabel || secondaryLabel;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && onClose) onClose();
  };

  const overlayCls = ['t1-modal-overlay', scoped && 't1-modal-overlay--scoped'].filter(Boolean).join(' ');

  return (
    <div className={overlayCls} onClick={handleOverlayClick}>
      <div
        className={['t1-modal', className].filter(Boolean).join(' ')}
        style={{ width }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="t1-modal-title"
        {...rest}
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="t1-modal__header">
          <div className="t1-modal__header-content">
            {title    && <p id="t1-modal-title" className="t1-modal__title">{title}</p>}
            {subtitle && <p className="t1-modal__subtitle">{subtitle}</p>}
          </div>

          {onClose && (
            <div className="t1-modal__close">
              <IconButton
                color="neutral"
                style="plain"
                size="sm"
                aria-label="Close"
                onClick={onClose}
              >
                <Phi name="x" size={16} weight="bold" />
              </IconButton>
            </div>
          )}
        </div>

        {/* ── Body / content slot ─────────────────────────────────────────── */}
        {children && (
          <div className="t1-modal__body">{children}</div>
        )}

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        {hasFooter && (
          <div className="t1-modal__footer">
            {secondaryLabel && (
              <Button
                variant="outlined"
                color="neutral"
                size="md"
                onClick={onSecondary || onClose}
              >
                {secondaryLabel}
              </Button>
            )}
            {primaryLabel && (
              <Button
                variant="contained"
                color="primary"
                size="md"
                onClick={onPrimary}
              >
                {primaryLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* -------- Search -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   SEARCH  (Figma: )
   T1 search input — label + magnifier icon + text field + optional dropdown

   Figma ref : T1-Components
   BEM prefix: t1-srch

   Variants (Figma)
   ─────────────────────────────────────────────────────────────────────────
   size:  lg (40px) | md (32px)
   state: default | hover | active | error | disabled

   Props
   ─────────────────────────────────────────────────────────────────────────
   size          "lg"|"md"          Field height                     "md"
   label         string             Label text above field           undefined
   placeholder   string             Input placeholder                "Search"
   value         string             Controlled value                 undefined
   defaultValue  string             Uncontrolled initial value       ""
   onChange      fn(e)              Input change handler             undefined
   error         string             Error message (triggers error state) undefined
   disabled      bool               Disabled state                   false
   options       string[]|{label}[] Dropdown options list            []
   onSelect      fn(option)         Called when an option is clicked undefined
   className     string
   ========================================================================== */

const Search = ({
  size          = 'md',
  label,
  placeholder   = 'Search',
  value:        valueProp,
  defaultValue  = '',
  onChange,
  error,
  disabled      = false,
  options       = [],
  onSelect,
  className,
  ...rest
}) => {
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [focused,       setFocused]       = React.useState(false);

  const value = isControlled ? valueProp : internalValue;

  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange && onChange(e);
  };

  const handleSelect = (opt) => {
    const lbl = typeof opt === 'string' ? opt : opt.label;
    if (!isControlled) setInternalValue(lbl);
    setFocused(false);
    onSelect && onSelect(opt);
  };

  /* Filter options by current input */
  const filteredOptions = React.useMemo(() => {
    if (!value) return options;
    const q = value.toLowerCase();
    return options.filter(o => {
      const lbl = typeof o === 'string' ? o : o.label;
      return lbl.toLowerCase().includes(q);
    });
  }, [options, value]);

  const showDropdown = focused && filteredOptions.length > 0;

  /* BEM modifiers */
  const fieldMods = [
    focused && !disabled && 't1-srch__field--active',
    error   && !disabled && 't1-srch__field--error',
    disabled              && 't1-srch__field--disabled',
  ].filter(Boolean);

  const fieldCls = ['t1-srch__field', ...fieldMods].join(' ');
  const rootCls  = ['t1-srch', `t1-srch--${size}`, className].filter(Boolean).join(' ');

  return (
    <div className={rootCls} {...rest}>

      {/* Label */}
      {label && <div className="t1-srch__label">{label}</div>}

      {/* Field + dropdown anchor */}
      <div className="t1-srch__field-wrap">

        {/* Field row */}
        <div className={fieldCls} onClick={() => !disabled && document.activeElement !== document.querySelector('.t1-srch__input')}>
          <span className="t1-srch__icon">
            <Phi name="magnifying-glass" size={16} weight="regular" />
          </span>
          <input
            className="t1-srch__input"
            type="text"
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            aria-label={label || placeholder}
            aria-expanded={showDropdown}
            aria-autocomplete="list"
            role="combobox"
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
          />
        </div>

        {/* Dropdown — shown when focused and options available */}
        {showDropdown && (
          <div className="t1-srch__dropdown" role="listbox">
            {filteredOptions.map((opt, i) => {
              const lbl = typeof opt === 'string' ? opt : opt.label;
              return (
                <div
                  key={i}
                  className="t1-srch__option"
                  role="option"
                  onMouseDown={e => { e.preventDefault(); handleSelect(opt); }}
                >
                  {lbl}
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Assistive error text */}
      {error && !disabled && (
        <div className="t1-srch__assist" role="alert">{error}</div>
      )}

    </div>
  );
};

/* -------- Global-Search -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   GLOBAL-SEARCH  (Figma: aiT1GlobalSearch)
   T1 AI-powered search bar — segment switch + search field

   Figma ref : T1-Components
   BEM prefix: t1-gs

   Variants (type × state from Figma)
   ─────────────────────────────────────────────────────────────────────────
   normalSearch / default → mode="ai",     empty, "Search here…"
   aiSearch     / active  → mode="ai",     focused, value, blue border, Ask btn
   Search       / default → mode="search", empty, "Ask • Find • Summarize"
   aiSearch     / typing  → mode="search", value, blue border, Ask btn

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Phi    — magnifying-glass icon in search segment slot (size=16 weight="regular")
   Button — "Ask" suffix button (variant="contained" color="primary" size="sm"
             iconStart="arrow-bend-down-left") — only rendered when mode=ai + value present

   Props
   ─────────────────────────────────────────────────────────────────────────
   initialMode   "ai"|"search"    Which segment is active on mount    "ai"
   placeholder   string           Override the resolved placeholder   undefined
   onAsk         fn(value)        Called when Ask is clicked / Enter  undefined
   className     string
   ========================================================================== */

/* ── T1 mark SVG — two render states (inline — path-independent) ─────────── */
const _GS_LOGO_WHITE = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.0275 4.57162C7.70578 3.22474 9.44818 2.13244 10.9184 2.13244H15.5774L14.3486 4.57162L11.1368 4.68878C10.2383 4.72137 9.42704 5.2367 9.01478 6.03654L6.08408 11.7288H3.42202L7.0275 4.57162Z" fill="white"/><path d="M1.65233 2.13244L7.30849 2.13509L6.07968 4.57427H0.422607L1.65233 2.13244Z" fill="white"/><path d="M13.9847 6.58877L11.7974 6.5923L10.5677 9.03412L12.0274 9.04204C12.2159 9.03942 12.3401 9.23674 12.2555 9.40499L10.0075 13.8675H12.6695L15.2822 8.65623C15.7623 7.69783 15.0559 6.57205 13.9838 6.58877H13.9847Z" fill="white"/></svg>';
const _GS_LOGO_GRAD  = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.0275 4.57162C7.70578 3.22474 9.44818 2.13244 10.9184 2.13244H15.5774L14.3486 4.57162L11.1368 4.68878C10.2383 4.72137 9.42704 5.2367 9.01478 6.03654L6.08408 11.7288H3.42202L7.0275 4.57162Z" fill="url(#gs-grad)"/><path d="M1.65233 2.13244L7.30849 2.13509L6.07968 4.57427H0.422607L1.65233 2.13244Z" fill="url(#gs-grad)"/><path d="M13.9847 6.58877L11.7974 6.5923L10.5677 9.03412L12.0274 9.04204C12.2159 9.03942 12.3401 9.23674 12.2555 9.40499L10.0075 13.8675H12.6695L15.2822 8.65623C15.7623 7.69783 15.0559 6.57205 13.9838 6.58877H13.9847Z" fill="url(#gs-grad)"/><defs><linearGradient id="gs-grad" x1="0.422607" y1="2.13244" x2="17.3755" y2="6.01376" gradientUnits="userSpaceOnUse"><stop stop-color="#25C8A5"/><stop offset="0.5" stop-color="#1B90B4"/><stop offset="1" stop-color="#1A6CC4"/></linearGradient></defs></svg>';

const GlobalSearch = ({
  initialMode = 'ai',
  placeholder,
  onAsk,
  className,
  ...rest
}) => {
  const [mode,    setMode]    = React.useState(initialMode);
  const [value,   setValue]   = React.useState('');
  const [focused, setFocused] = React.useState(false);

  const isAi     = mode === 'ai';
  const showAsk  = isAi && value.trim().length > 0;
  const isActive = focused || value.length > 0;

  /* Placeholder matches Figma copy per mode */
  const defaultPlaceholder = isAi ? 'Search here...' : 'Ask \u2022 Find \u2022 Summarize';
  const resolvedPlaceholder = placeholder != null ? placeholder : defaultPlaceholder;

  /* BEM class builder */
  const fieldCls = [
    't1-gs__field',
    isActive  && 't1-gs__field--active',
    showAsk   && 't1-gs__field--has-ask',
  ].filter(Boolean).join(' ');

  const cls = ['t1-gs', className].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>

      {/* ── Segment Switch ─────────────────────────────────────────────────── */}
      <div className="t1-gs__seg" role="tablist" aria-label="Search mode">

        {/* T1 logo slot — active when mode=ai */}
        <button
          className={`t1-gs__seg-slot${isAi ? ' t1-gs__seg-slot--logo-active' : ''}`}
          role="tab"
          aria-selected={isAi}
          aria-label="AI search"
          onClick={() => setMode('ai')}
        >
          <span
            className="t1-gs__seg-logo"
            dangerouslySetInnerHTML={{ __html: isAi ? _GS_LOGO_WHITE : _GS_LOGO_GRAD }}
          />
        </button>

        {/* Magnifier slot — active when mode=search */}
        <button
          className={`t1-gs__seg-slot${!isAi ? ' t1-gs__seg-slot--search-active' : ''}`}
          role="tab"
          aria-selected={!isAi}
          aria-label="Regular search"
          onClick={() => setMode('search')}
        >
          <Phi name="magnifying-glass" size={16} weight="regular" />
        </button>

      </div>

      {/* ── Search Field — kit Search component; icon hidden via CSS ───────── */}
      <div
        className={`t1-gs__field-wrap${showAsk ? ' t1-gs__field-wrap--has-ask' : ''}`}
        onFocus={() => setFocused(true)}
        onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
        onKeyDown={e => { if (e.key === 'Enter' && showAsk && onAsk) onAsk(value); }}
      >
        <Search
          className="t1-gs__search"
          placeholder={resolvedPlaceholder}
          value={value}
          onChange={e => setValue(e.target.value)}
          size="md"
          aria-label={isAi ? 'AI search' : 'Search'}
        />

        {/* Ask button — absolutely positioned inside the right of the search field */}
        {showAsk && (
          <div className="t1-gs__ask-slot">
            <Button
              variant="contained"
              color="primary"
              size="sm"
              iconStart="arrow-bend-down-left"
              onClick={() => onAsk && onAsk(value)}
            >
              Ask
            </Button>
          </div>
        )}
      </div>

    </div>
  );
};

/* -------- Dropdown -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   DROPDOWN  (Figma: AiT1DropdownList · section "T1 Dropdown")
   BEM prefix: t1-dropdown

   Interaction model
   ─────────────────────────────────────────────────────────────────────────
   • The DropdownHeader IS the trigger — click it to open / close the panel.
   • When open, the panel appears below the header.
   • If search=true, a search input sits at the top of the panel; typing
     filters items live without needing to press Enter.
   • Click an item → selects it, closes panel.
   • Click outside → closes panel, clears query.
   • Selected value is reflected in the header description slot.

   Props
   ─────────────────────────────────────────────────────────────────────────
   title          string          Header title text                  required
   description    string          Header subtitle / hint             optional
   placeholder    string          Shown in header until selection    default 'Select...'
   value          string          Controlled selected value          optional
   onChange       function        (value: string) => void            optional

   search         boolean         Show search input in panel         default false
   items          string[]        Options in primary section         default []
   sections       { label, items[] }[]  Extra labelled sections      default []
   dividers       boolean         Dividers between items             default false

   type           string          'singleSelect'                     default 'singleSelect'
   width          number|string   Component width — px number or CSS string
                                  e.g. 268, '100%', '50%'           default '100%'
   className      string          Extra classes on root              optional

   Figma nested props honoured
   ─────────────────────────────────────────────────────────────────────────
   DropdownHeader.description  → description / selected value in header
   DropdownHeader.search       → search prop (in panel, not header)
   DropdownList.header         → always true (header IS the trigger)
   DropdownList.section2–5     → sections[] (up to 4)
   DropdownListSection.divider → dividers prop
   DropdownListSection.subHeader → driven by section.label presence

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Search      — search input inside panel (md size, handles icon + styling)
   Phi         — caret-down icon in header
   ========================================================================== */

/* ── DropdownSubHeader ────────────────────────────────────────────────────── */
const DropdownSubHeader = ({ label }) => (
  <div className="t1-dropdown__subheader">
    <span className="t1-dropdown__subheader-label">{label}</span>
  </div>
);

/* ── DropdownListItem ─────────────────────────────────────────────────────── */
const DropdownListItem = ({ label = 'Option', selected = false, onClick }) => (
  <div
    className={['t1-dropdown__item', selected && 't1-dropdown__item--selected'].filter(Boolean).join(' ')}
    onClick={onClick}
    role="option"
    aria-selected={selected}
  >
    <span className="t1-dropdown__item-label">{label}</span>
    {selected && (
      <span className="t1-dropdown__item-check" aria-hidden="true">
        <Phi name="check" size={14} weight="bold" />
      </span>
    )}
  </div>
);

/* ── DropdownListSection ──────────────────────────────────────────────────── */
const DropdownListSection = ({ label, items = [], dividers = false, selectedValue, onSelect }) => (
  <div className="t1-dropdown__section">
    {label && <DropdownSubHeader label={label} />}
    {items.map((item, i) => {
      const itemLabel = typeof item === 'string' ? item : item.label;
      return (
        <React.Fragment key={i}>
          {dividers && i > 0 && <div className="t1-dropdown__divider" aria-hidden="true" />}
          <DropdownListItem
            label={itemLabel}
            selected={itemLabel === selectedValue}
            onClick={() => onSelect && onSelect(itemLabel)}
          />
        </React.Fragment>
      );
    })}
  </div>
);

/* ── Dropdown ─────────────────────────────────────────────────────────────── */
const Dropdown = ({
  title         = 'Title',
  description,
  placeholder   = 'Select...',
  value,
  onChange,
  search        = false,
  items         = [],
  sections      = [],
  dividers      = false,
  type          = 'singleSelect',
  width         = '100%',
  className,
  ...rest
}) => {
  const [open, setOpen]         = React.useState(false);
  const [query, setQuery]       = React.useState('');
  const [selected, setSelected] = React.useState(value !== undefined ? value : null);
  const wrapRef                 = React.useRef(null);

  /* Sync controlled value */
  React.useEffect(() => {
    if (value !== undefined) setSelected(value);
  }, [value]);

  /* Close on outside click */
  React.useEffect(() => {
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const handleToggle = () => {
    setOpen(o => !o);
    if (open) setQuery('');
  };

  const handleSelect = (val) => {
    setSelected(val);
    setOpen(false);
    setQuery('');
    if (onChange) onChange(val);
  };

  /* Live filter */
  const filterItems = (arr) => {
    if (!query.trim()) return arr;
    const q = query.toLowerCase();
    return arr.filter(item => {
      const label = typeof item === 'string' ? item : item.label;
      return label.toLowerCase().includes(q);
    });
  };

  const filteredItems    = filterItems(items);
  const filteredSections = sections
    .slice(0, 4)
    .map(sec => ({ ...sec, items: filterItems(sec.items || []) }))
    .filter(sec => sec.items.length > 0);

  const hasResults = filteredItems.length > 0 || filteredSections.length > 0;

  /* Header shows selected value in description slot when something is chosen */
  const headerDescription = selected || description || placeholder;

  return (
    <div
      className={['t1-dropdown', open && 't1-dropdown--open', className].filter(Boolean).join(' ')}
      style={{ width: typeof width === 'number' ? width + 'px' : width }}
      ref={wrapRef}
      {...rest}
    >
      {/* ── Header — the clickable trigger ───────────────────────────── */}
      <div
        className="t1-dropdown__header"
        onClick={handleToggle}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleToggle()}
      >
        <div className="t1-dropdown__header-content">
          <p className="t1-dropdown__header-title">{title}</p>
          <p className={['t1-dropdown__header-desc', !selected && 't1-dropdown__header-desc--placeholder'].filter(Boolean).join(' ')}>
            {headerDescription}
          </p>
        </div>
        <span className="t1-dropdown__header-caret">
          <Phi name="caret-down" size={16} weight="bold" />
        </span>
      </div>

      {/* ── Panel ─────────────────────────────────────────────────────── */}
      {open && (
        <div className="t1-dropdown__panel" role="listbox" aria-label={title}>

          {/* Search input at top of panel */}
          {search && (
            <div className="t1-dropdown__search-bar">
              <Search
                size="md"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          )}

          {/* Items */}
          {hasResults ? (
            <>
              {filteredItems.length > 0 && (
                <DropdownListSection
                  items={filteredItems}
                  dividers={dividers}
                  selectedValue={selected}
                  onSelect={handleSelect}
                />
              )}
              {filteredSections.map((sec, i) => (
                <DropdownListSection
                  key={i}
                  label={sec.label}
                  items={sec.items}
                  dividers={dividers}
                  selectedValue={selected}
                  onSelect={handleSelect}
                />
              ))}
            </>
          ) : (
            <div className="t1-dropdown__empty">No results for "{query}"</div>
          )}
        </div>
      )}
    </div>
  );
};

/* -------- Quote -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   QUOTE  (Figma: aiT1MessageQuote)
   BEM prefix: t1-quote

   Props
   ─────────────────────────────────────────────────────────────────────────
   children   string / node   Quote text content          required
   className  string          Extra classes               optional

   Layout
   ─────────────────────────────────────────────────────────────────────────
   [2px bar — full height]  [content: italic medium text]

   No kit primitives needed — purely structural
   ========================================================================== */

const Quote = ({
  children,
  className,
  ...rest
}) => (
  <div
    className={['t1-quote', className].filter(Boolean).join(' ')}
    {...rest}
  >
    {/* ── 2px left status bar — self-stretch fills full container height ── */}
    <div className="t1-quote__bar-wrap" aria-hidden="true">
      <div className="t1-quote__bar" />
    </div>

    {/* ── Quote text ──────────────────────────────────────────────────── */}
    <div className="t1-quote__content">
      <p className="t1-quote__text">{children}</p>
    </div>
  </div>
);

/* -------- FAB-Icon -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   FAB-ICON — AI Chat Floating Action Button
   Figma: /T1-Components    (aiT1ChatFab component set)

   Shape     32 × 32 px · border-radius 24px (rounded square, not circle)
   States    default · hover · active  — handled by CSS pseudo-classes
   Icon      aiLogoT1  (16 × 16 px, inline SVG from assets/aiLogoT1.svg)

   Props
   ─────────────────────────────────────────────────────────────────────────
   disabled  boolean  — muted, pointer-events off
   onClick   fn       — click handler
   className string   — extra class names
   ========================================================================== */

/* ── Inline aiLogoT1 SVG ─────────────────────────────────────────────────── */
/*   Uses a unique gradient ID per instance to avoid conflicts when           */
/*   multiple FABs appear on the same page.                                   */
let _fabLogoCounter = 0;
const AiLogoT1 = ({ size = 16 }) => {
  const id = React.useRef('fab-g-' + (++_fabLogoCounter)).current;
  return (
    <svg
      className="t1-fab__logo"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0.422607" y1="2.13244" x2="17.3755" y2="6.01376" gradientUnits="userSpaceOnUse">
          <stop stopColor={`rgb(${37},${200},${165})`} />
          <stop offset="0.5" stopColor={`rgb(${27},${144},${180})`} />
          <stop offset="1" stopColor={`rgb(${26},${108},${196})`} />
        </linearGradient>
      </defs>
      <path
        d="M7.0275 4.57162C7.70578 3.22474 9.44818 2.13244 10.9184 2.13244H15.5774L14.3486 4.57162L11.1368 4.68878C10.2383 4.72137 9.42704 5.2367 9.01478 6.03654L6.08408 11.7288H3.42202L7.0275 4.57162Z"
        fill={`url(#${id})`}
      />
      <path
        d="M1.65233 2.13244L7.30849 2.13509L6.07968 4.57427H0.422607L1.65233 2.13244Z"
        fill={`url(#${id})`}
      />
      <path
        d="M13.9847 6.58877L11.7974 6.5923L10.5677 9.03412L12.0274 9.04204C12.2159 9.03942 12.3401 9.23674 12.2555 9.40499L10.0075 13.8675H12.6695L15.2822 8.65623C15.7623 7.69783 15.0559 6.57205 13.9838 6.58877H13.9847Z"
        fill={`url(#${id})`}
      />
    </svg>
  );
};

/* ── FabIcon component ───────────────────────────────────────────────────── */
const FabIcon = ({
  disabled  = false,
  onClick,
  className,
  ...rest
}) => {
  const cls = [
    't1-fab',
    disabled ? 'is-disabled' : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={cls}
      disabled={disabled}
      onClick={onClick}
      type="button"
      aria-label="Open AI assistant"
      {...rest}
    >
      <AiLogoT1 size={16} />
    </button>
  );
};

/* -------- Fav-Bar-Icon -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   FAV-BAR-ICON — AI Sidebar Favourite Bar Item
   Figma: /T1-Components    (aiT1FavBarItem)

   Container   56px tall · 12px h-pad · 6px v-pad · flex-column centre
   Logo tile   40×40px · border-radius 4px · brand gradient background
   T1 mark     24×18px white SVG wordmark centred inside tile
   ========================================================================== */

const T1LogoWhite = () => (
  <svg
    className="t1-favbar-icon__logo"
    width="24"
    height="18"
    viewBox="0 0 24 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M10.4468 3.74071C11.5196 1.67514 14.2755 0 16.6009 0H23.9699L22.0263 3.74071L16.9464 3.92038C15.5252 3.97036 14.242 4.76066 13.59 5.9873L8.95458 14.7169H4.74408L10.4468 3.74071Z" fill="white"/>
    <path d="M1.94501 0L10.8912 0.00405277L8.94763 3.74476H0L1.94501 0Z" fill="white"/>
    <path d="M21.4507 6.83419L17.9912 6.8396L16.0462 10.5844L18.3549 10.5965C18.6531 10.5925 18.8495 10.8951 18.7158 11.1531L15.1601 17.9969H19.3706L23.503 10.0048C24.2624 8.53504 23.145 6.80856 21.4494 6.83419H21.4507Z" fill="white"/>
  </svg>
);

const FavBarIcon = ({ onClick, className, 'aria-label': ariaLabel, ...rest }) => (
  <div
    className={['t1-favbar-icon', className || ''].filter(Boolean).join(' ')}
    onClick={onClick}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    aria-label={ariaLabel || 'T1 AI assistant'}
    onKeyDown={onClick ? (e => { if (e.key === 'Enter' || e.key === ' ') onClick(e); }) : undefined}
    {...rest}
  >
    <div className="t1-favbar-icon__tile">
      <T1LogoWhite />
    </div>
  </div>
);

/* -------- Gradient-Icon-Button -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   GRADIENT-ICON-BUTTON  (Figma: AiT1GradientIconButton)

   Brand-gradient icon button — square with 8px radius.

   Props
   ─────────────────────────────────────────────────────────────────────────
   state     "default"|"hover"|"active"|"disabled"   (frozen Figma demo)
   disabled   boolean
   icon / children  ReactNode — the icon to render (should be white SVG/Phosphor)
   onClick    function
   aria-label string

   Size: fixed 36×36px  ·  border-radius: 2px  ·  icon: white

   Gradients (100.05deg, L→R)
   ─────────────────────────────────────────────────────────────────────────
   default   teal #25C8A5 → cyan #1B90B4 → blue #1A6CC4
   hover     teal #1E9F83 → cyan #156E89 → blue #135295
   active    teal #167460 → cyan #0E4B5D → blue #0E3968
   disabled  bg #F4F5F6  ·  icon #969AA3
   ========================================================================== */

const GradientIconButton = ({
  state    = 'default',
  disabled = false,
  icon,
  children,
  onClick,
  className,
  'aria-label': ariaLabel,
  ...rest
}) => {
  const isDisabled = disabled || state === 'disabled';

  const cls = [
    't1-gib',
    isDisabled       ? 'is-disabled' : '',
    state === 'hover'   ? 'is-hover'   : '',
    state === 'active'  ? 'is-active'  : '',
    className || '',
  ].filter(Boolean).join(' ');

  const iconNode = icon !== undefined ? icon : children;

  return (
    <button
      className={cls}
      type="button"
      disabled={isDisabled}
      onClick={!isDisabled ? onClick : undefined}
      aria-label={ariaLabel || 'action'}
      {...rest}
    >
      <span className="t1-gib__icon" aria-hidden="true">{iconNode}</span>
    </button>
  );
};

/* -------- Feedback-Action -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   FEEDBACK-ACTION  (Figma: aiT1FeedbackAction)
   BEM prefix: t1-fa

   Props
   ─────────────────────────────────────────────────────────────────────────
   filterCount     number    badge count on filter chip          default 2
   sourceCount     number    badge count on sources chip         default 2
   showFilter      bool      show filter chip                    default true
   showSource      bool      show sources chip                   default true

   responseText    string    plain text of the response; used by the copy
                             button (navigator.clipboard) and shown as
                             tooltip label while copying.

   filterItems     string[]  filter labels shown in modal when chip clicked
   sourceItems     string[]  source labels shown in modal when chip clicked

   onFilterClick   function  override filter chip click (skips built-in modal)
   onSourceClick   function  override source chip click (skips built-in modal)

   onCopy          function  called after copy (in addition to clipboard write)
   onThumbUp       function  called with (active: bool)
   onThumbDown     function  called with (active: bool)
   onMore          function  called when ⋯ is clicked
   onRegenerate    function  called when regenerate is clicked
   className       string    optional extra class

   Tooltips
   ─────────────────────────────────────────────────────────────────────────
   Every icon button is wrapped in .t1-fa__tip[data-tip="…"].
   The tooltip appears centered above the button on hover/focus.

   Copy behaviour
   ─────────────────────────────────────────────────────────────────────────
   If responseText is provided → writes to navigator.clipboard, then calls
   onCopy (if supplied).  Falls back to onCopy-only when clipboard API is
   unavailable.  Shows check icon for 2 s then resets.

   Chip interaction
   ─────────────────────────────────────────────────────────────────────────
   If onFilterClick / onSourceClick is supplied → call it.
   Otherwise → open built-in Modal.

   State machines
   ─────────────────────────────────────────────────────────────────────────
   thumbUp / thumbDown  — mutually exclusive toggles (regular ↔ fill icon)
   copy                 — click → 2 s "copied" state (check icon) → reset
   filterModal / sourceModal — open while viewing details
   ========================================================================== */

const FeedbackAction = ({
  filterCount   = 2,
  sourceCount   = 2,
  showFilter    = true,
  showSource    = true,

  responseText,

  filterItems,
  sourceItems,
  onFilterClick,
  onSourceClick,

  onCopy,
  onThumbUp,
  onThumbDown,
  onMore,
  onRegenerate,
  className,
  ...rest
}) => {
  const [thumbUp,    setThumbUp]    = React.useState(false);
  const [thumbDown,  setThumbDown]  = React.useState(false);
  const [copied,     setCopied]     = React.useState(false);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [sourceOpen, setSourceOpen] = React.useState(false);

  /* ── Action handlers ─────────────────────────────────────────────────── */
  const handleThumbUp = () => {
    const next = !thumbUp;
    setThumbUp(next);
    if (next) setThumbDown(false);
    onThumbUp && onThumbUp(next);
  };

  const handleThumbDown = () => {
    const next = !thumbDown;
    setThumbDown(next);
    if (next) setThumbUp(false);
    onThumbDown && onThumbDown(next);
  };

  const fallbackCopy = (text) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;pointer-events:none;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(ta);
  };

  const handleCopy = () => {
    if (copied) return;
    const text = responseText || '';
    if (text) {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
      } else {
        fallbackCopy(text);
      }
    }
    setCopied(true);
    onCopy && onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── Chip handlers ───────────────────────────────────────────────────── */
  const handleFilterChip = () => {
    if (onFilterClick) { onFilterClick(); return; }
    setFilterOpen(true);
  };

  const handleSourceChip = () => {
    if (onSourceClick) { onSourceClick(); return; }
    setSourceOpen(true);
  };

  const handleChipKey = (handler) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
  };

  /* ── Default modal items ─────────────────────────────────────────────── */
  const defaultFilterItems = filterItems || Array.from({ length: filterCount }, (_, i) => `Filter ${i + 1}`);
  const defaultSourceItems = sourceItems || Array.from({ length: sourceCount }, (_, i) => `Source ${i + 1}`);

  /* ── Tooltip wrapper ─────────────────────────────────────────────────── */
  const Tip = ({ label, children }) => (
    <div className="t1-fa__tip" data-tip={label}>
      {children}
    </div>
  );

  return (
    <>
      <div className={['t1-fa', className].filter(Boolean).join(' ')} {...rest}>

        {/* ── Action icon buttons ── */}
        <div className="t1-fa__actions">

          <Tip label="Helpful">
            <IconButton
              color="inverse" style="contained" size="sm"
              onClick={handleThumbUp}
              aria-label="Helpful"
              aria-pressed={thumbUp}
              className={thumbUp ? 't1-fa__ibtn--active' : undefined}
            >
              <i className={`${thumbUp ? 'ph-fill ph-thumbs-up' : 'ph ph-thumbs-up'} t1-fa__icon`} aria-hidden="true" />
            </IconButton>
          </Tip>

          <Tip label="Not helpful">
            <IconButton
              color="inverse" style="contained" size="sm"
              onClick={handleThumbDown}
              aria-label="Not helpful"
              aria-pressed={thumbDown}
              className={thumbDown ? 't1-fa__ibtn--active' : undefined}
            >
              <i className={`${thumbDown ? 'ph-fill ph-thumbs-down' : 'ph ph-thumbs-down'} t1-fa__icon`} aria-hidden="true" />
            </IconButton>
          </Tip>

          <Tip label="Regenerate">
            <IconButton
              color="inverse" style="contained" size="sm"
              onClick={onRegenerate}
              aria-label="Regenerate"
            >
              <i className="ph ph-arrow-clockwise t1-fa__icon" aria-hidden="true" />
            </IconButton>
          </Tip>

          <Tip label={copied ? 'Copied!' : 'Copy response'}>
            <IconButton
              color="inverse" style="contained" size="sm"
              onClick={handleCopy}
              aria-label={copied ? 'Copied!' : 'Copy response'}
            >
              <i className={`${copied ? 'ph ph-check' : 'ph ph-copy'} t1-fa__icon`} aria-hidden="true" />
            </IconButton>
          </Tip>

          <Tip label="More options">
            <IconButton
              color="inverse" style="contained" size="sm"
              onClick={onMore}
              aria-label="More options"
            >
              <i className="ph ph-dots-three-vertical t1-fa__icon" aria-hidden="true" />
            </IconButton>
          </Tip>

        </div>

        {/* ── Chips ── */}
        {(showFilter || showSource) && (
          <div className="t1-fa__chips">

            {showFilter && (
              <div
                className="t1-fa__chip"
                role="button"
                tabIndex={0}
                onClick={handleFilterChip}
                onKeyDown={handleChipKey(handleFilterChip)}
                aria-label={`${filterCount} filter${filterCount !== 1 ? 's' : ''} applied — click to view`}
                aria-haspopup="dialog"
              >
                <i className="ph ph-funnel t1-fa__chip-icon" aria-hidden="true" />
                <span className="t1-fa__chip-label">
                  <span className="t1-fa__chip-count">{filterCount}</span>
                  <span className="t1-fa__chip-text"> Filter{filterCount !== 1 ? 's' : ''} Applied</span>
                </span>
              </div>
            )}

            {showSource && (
              <div
                className="t1-fa__chip"
                role="button"
                tabIndex={0}
                onClick={handleSourceChip}
                onKeyDown={handleChipKey(handleSourceChip)}
                aria-label={`${sourceCount} source${sourceCount !== 1 ? 's' : ''} — click to view`}
                aria-haspopup="dialog"
              >
                <i className="ph ph-book-open t1-fa__chip-icon" aria-hidden="true" />
                <span className="t1-fa__chip-label">
                  <span className="t1-fa__chip-count">{sourceCount}</span>
                  <span className="t1-fa__chip-text"> Source{sourceCount !== 1 ? 's' : ''}</span>
                </span>
              </div>
            )}

          </div>
        )}
      </div>

      {/* ── Filters Modal ── */}
      <Modal
        open={filterOpen}
        title="Filters Applied"
        subtitle={`${filterCount} filter${filterCount !== 1 ? 's' : ''} were used to generate this response`}
        onClose={() => setFilterOpen(false)}
        secondaryLabel="Close"
        onSecondary={() => setFilterOpen(false)}
        width={480}
        scoped
      >
        <ul className="t1-fa__modal-list">
          {defaultFilterItems.map((item, i) => (
            <li key={i} className="t1-fa__modal-item"><span>{item}</span></li>
          ))}
        </ul>
      </Modal>

      {/* ── Sources Modal ── */}
      <Modal
        open={sourceOpen}
        title="Sources"
        subtitle={`${sourceCount} source${sourceCount !== 1 ? 's' : ''} were referenced to generate this response`}
        onClose={() => setSourceOpen(false)}
        secondaryLabel="Close"
        onSecondary={() => setSourceOpen(false)}
        width={480}
        scoped
      >
        <ul className="t1-fa__modal-list">
          {defaultSourceItems.map((item, i) => (
            <li key={i} className="t1-fa__modal-item"><span>{item}</span></li>
          ))}
        </ul>
      </Modal>
    </>
  );
};

/* -------- Empty -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   EMPTY  (Figma: aiT1Empty)
   BEM prefix: t1-empty

   Props
   ─────────────────────────────────────────────────────────────────────────
   icon            string     Phosphor icon name                default "image-broken"
   title           string     Heading text                      required
   description     string     Subtitle / body copy              optional
   primaryLabel    string     Contained primary button label    optional
   onPrimary       function   Primary button handler            optional
   secondaryLabel  string     Outlined neutral button label     optional
   onSecondary     function   Secondary button handler          optional
   helpText        string     Static copy before link           default "Need help?"
   linkText        string     Link label                        default "Contact support"
   onLink          function   Link click handler                optional

   Layout
   ─────────────────────────────────────────────────────────────────────────
   [icon block 48×48 neutral bg]
   [content: title / description]
   [button group: secondary outlined · primary contained]   ← only when a label provided
   [link row: helpText · Link]                              ← only when linkText provided

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Phi      — icon inside block (size=24, weight="regular")
   Button   — primary (contained/primary/lg) + secondary (outlined/neutral/lg)
   Link     — "Contact support" (appearance="primary" size="medium")
   ========================================================================== */

const Empty = ({
  icon           = 'image-broken',
  title,
  description,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  helpText       = 'Need help?',
  linkText       = 'Contact support',
  onLink,
  className,
  ...rest
}) => {
  const hasActions = primaryLabel || secondaryLabel;
  const hasLink    = linkText;

  return (
    <div
      className={['t1-empty', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {/* ── Icon block ──────────────────────────────────────────────────── */}
      <div className="t1-empty__icon-block" aria-hidden="true">
        <Phi name={icon} size={24} weight="regular" />
      </div>

      {/* ── Text content ────────────────────────────────────────────────── */}
      {(title || description) && (
        <div className="t1-empty__content">
          {title       && <p className="t1-empty__title">{title}</p>}
          {description && <p className="t1-empty__desc">{description}</p>}
        </div>
      )}

      {/* ── Button group ────────────────────────────────────────────────── */}
      {hasActions && (
        <div className="t1-empty__actions">
          {secondaryLabel && (
            <Button variant="outlined" color="neutral" size="lg" onClick={onSecondary}>
              {secondaryLabel}
            </Button>
          )}
          {primaryLabel && (
            <Button variant="contained" color="primary" size="lg" onClick={onPrimary}>
              {primaryLabel}
            </Button>
          )}
        </div>
      )}

      {/* ── Link row ────────────────────────────────────────────────────── */}
      {hasLink && (
        <div className="t1-empty__link-row">
          {helpText && <span className="t1-empty__help-text">{helpText}</span>}
          <Link appearance="primary" size="medium" href="#" onClick={onLink}>
            {linkText}
          </Link>
        </div>
      )}
    </div>
  );
};

/* -------- Message-Draft -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   MESSAGE-DRAFT  (Figma: aiT1MessageDraft)
   BEM prefix: t1-md

   Props
   ─────────────────────────────────────────────────────────────────────────
   to          string    recipient name (shown in Chip)
   body        string    message text (\n = line break)
   note        string    footer disclaimer
   onSend      function  called with message body when sent
   className   string    optional extra class

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   • Chip       — "To:" recipient (variant="outlined" color="neutral" size="md")
   • Separator  — horizontal divider between To row and message body
   • Button     — Send / Sending… / Try Again (size="md")

   Interactive state machine
   ─────────────────────────────────────────────────────────────────────────
   idle  →  active  (click inside content area)
   active → idle    (click outside content area on card)
   active → sending (click "Send")
   sending → success | error  (after 1.5 s simulated delay)
   error  → idle    (click "Try Again")
   ========================================================================== */

const MessageDraft = ({
  to        = 'Flora Fleisher',
  body      = 'Hi Flora,\n\nGreat speaking with you! I have you down for Tuesday at 10 AM to drive the 2023 AeroVibe.\n\nSee you then!\nDean',
  note      = 'Note: Once you send this message, it cannot be undone.',
  onSend,
  className,
  ...rest
}) => {
  /* idle | active | sending | success | error */
  const [status, setStatus] = React.useState('idle');

  /* ── Handlers ─────────────────────────────────────────────────────────── */

  // Card background click deactivates (only when active)
  const handleCardClick = () => {
    if (status === 'active') setStatus('idle');
  };

  // Content area click activates (idle → active)
  const handleContentClick = (e) => {
    e.stopPropagation(); // don't bubble to card → idle
    if (status === 'idle') setStatus('active');
  };

  // Send button
  const handleSend = (e) => {
    e.stopPropagation();
    setStatus('sending');
    onSend && onSend(body);
    // Simulate: 80% success, 20% error for demo realism
    setTimeout(() => {
      setStatus(Math.random() < 0.8 ? 'success' : 'error');
    }, 1500);
  };

  // Try Again resets to idle
  const handleRetry = (e) => {
    e.stopPropagation();
    setStatus('idle');
  };

  /* ── Derived ──────────────────────────────────────────────────────────── */
  const cls = [
    't1-md',
    status !== 'idle' && `t1-md--${status}`,
    className,
  ].filter(Boolean).join(' ');

  const showSendBtn    = status === 'idle' || status === 'active';
  const showSendingBtn = status === 'sending';
  const showRetryBtn   = status === 'error';
  const showSuccess    = status === 'success';
  const showError      = status === 'error';

  return (
    <div className={cls} {...rest}>

      {/* ── Card ── */}
      <div className="t1-md__card" onClick={handleCardClick}>

        {/* ── Main: To row + divider + content ── */}
        <div className="t1-md__main">

          {/* To: row */}
          <div className="t1-md__to-row">
            <span className="t1-md__to-label">To:</span>
            <Chip variant="outlined" color="neutral" size="md">{to}</Chip>
          </div>

          {/* Horizontal divider */}
          <Separator />

          {/* Content area — hover/active/default visuals via CSS class */}
          <div
            className="t1-md__content"
            onClick={handleContentClick}
            role="textbox"
            aria-multiline="true"
            tabIndex={status === 'idle' ? 0 : -1}
          >
            {/* Message body */}
            <div className="t1-md__text">
              {body.split('\n').map((line, i, arr) => (
                <React.Fragment key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>

            {/* Success alert — inside content area */}
            {showSuccess && (
              <div className="t1-md__alert t1-md__alert--success" role="status">
                <i className="ph-fill ph-check-circle t1-md__alert-icon" aria-hidden="true" />
                <span className="t1-md__alert-text">Text successfully sent to {to}</span>
              </div>
            )}

            {/* Error alert — inside content area */}
            {showError && (
              <div className="t1-md__alert t1-md__alert--error" role="alert">
                <i className="ph-fill ph-x-circle t1-md__alert-icon" aria-hidden="true" />
                <span className="t1-md__alert-text">Could not be sent due to technical error</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Action buttons — right-aligned by parent align-items: flex-end ── */}

        {showSendBtn && (
          <Button
            size="md"
            variant="contained"
            color="primary"
            onClick={handleSend}
          >
            Send
          </Button>
        )}

        {showSendingBtn && (
          <Button
            size="md"
            variant="outlined"
            color="neutral"
            disabled
            iconEnd={<i className="ph ph-circle-notch t1-md__spinner" aria-hidden="true" />}
          >
            Sending...
          </Button>
        )}

        {showRetryBtn && (
          <Button
            size="md"
            variant="contained"
            color="primary"
            onClick={handleRetry}
          >
            Try Again
          </Button>
        )}

      </div>

      {/* ── Footer note ── */}
      <div className="t1-md__note">{note}</div>

    </div>
  );
};

/* -------- Tip-Card -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   TIP-CARD — from /Tip-Card (4:420)
   BackgroundColorSuccessRadiusMd: bg rgb(239,250,238), border rgb(6,188,117),
   radius 6. Type=tip (64h) or Type=insight (96h). Content: green label + green body.
   ========================================================================== */
const TipCard = ({
  type = 'tip',
  body = type === 'insight'
    ? 'She is currently comparing offer with a competitor\u2019s AeroVibe inventory. Focus on her specific requirement to differentiate'
    : 'Shift the focus to the tax savings she gets by trading in vs. selling privately.',
}) => {
  const label = type === 'insight' ? 'AI Insight:' : 'Tip:';
  return (
    <div className={`t1-tip-v2 t1-tip-v2--${type}`}>
      <span className="t1-tip-v2__label">{label}</span>
      <span className="t1-tip-v2__body">{body}</span>
    </div>
  );
};

/* -------- Task-Card -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   TASK-CARD  (Figma: )
   BEM prefix: t1-tc

   Read-only display card — task state is driven entirely by the AI assistant.
   Users CANNOT toggle checkboxes. The AI passes updated `tasks` props to
   reflect progress; the card renders whatever state it receives.

   Props
   ─────────────────────────────────────────────────────────────────────────
   title        string              card heading          default: 'Task title'
   tasks        array               [{id, label, done}]   AI-controlled state
   onStop       function            callback: user clicks "Stop"
   onNotify     function            callback: user clicks "Notify When Done"
   className    string              extra class

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Checkbox  — shape="circle" color="success" — display only, not user-toggleable
   Link      — "Stop" (neutral) + "Notify When Done" (primary)
   ========================================================================== */

const TaskCard = ({
  title    = 'Task title',
  tasks    = [
    { id: 1, label: 'Review and confirm the final pricing details',      done: true  },
    { id: 2, label: 'Verify customer financing approval',                done: true  },
    { id: 3, label: 'Prepare all necessary paperwork and contracts',     done: true  },
    { id: 4, label: 'Schedule vehicle delivery or pickup',               done: false },
  ],
  onStop,
  onNotify,
  className,
  ...rest
}) => (
  <div className={['t1-tc', className].filter(Boolean).join(' ')} {...rest}>

    {/* ── Icon block ─────────────────────────────────────────────────────── */}
    <div className="t1-tc__icon-block" aria-hidden="true">
      <i className="ph ph-article" />
    </div>

    {/* ── Right-hand container ───────────────────────────────────────────── */}
    <div className="t1-tc__container">

      {/* Title */}
      <div className="t1-tc__title">{title}</div>

      {/* Task list — read-only; pointer-events blocked in CSS */}
      <div className="t1-tc__tasks">
        {tasks.map(task => (
          <div
            key={task.id}
            className={['t1-tc__task', task.done && 't1-tc__task--done'].filter(Boolean).join(' ')}
          >
            {/* onChange is a no-op — state is AI-controlled, not user-toggleable */}
            <Checkbox
              shape="circle"
              color="success"
              checked={task.done}
              onChange={() => {}}
            />
            <span className="t1-tc__task-label">{task.label}</span>
          </div>
        ))}
      </div>

      {/* Action links — these ARE user-facing (Stop / Notify the AI) */}
      <div className="t1-tc__actions">
        <Link
          appearance="neutral"
          size="medium"
          href="#"
          onClick={e => { e.preventDefault(); onStop && onStop(); }}
        >
          Stop
        </Link>
        <Link
          appearance="primary"
          size="medium"
          href="#"
          onClick={e => { e.preventDefault(); onNotify && onNotify(); }}
        >
          Notify When Done
        </Link>
      </div>

    </div>
  </div>
);

/* -------- Deal-Card -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   DEAL-CARD
   BEM prefix: t1-dc

   Props
   ─────────────────────────────────────────────────────────────────────────
   dealId        string    e.g. '#DEAL-001'             default '#DEAL-NO'
   vehicle       string    'Year Make Model Trim'       default placeholder
   salesperson   string    salesperson name             default placeholder
   purchaseType  string    e.g. 'Finance', 'Cash'       default placeholder
   status        string    deal status label            default placeholder
   lastUpdated   string    formatted date string        default placeholder
   onView        function  callback for View button
   className     string    extra class

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Button    — "View" CTA (size md, contained primary)
   Separator — horizontal rule between body and footer
   ========================================================================== */

const DealCard = ({
  dealId       = '#DEAL-NO',
  vehicle      = 'Year Make Model Trim',
  salesperson  = 'Sales person name',
  purchaseType = 'Purchase type',
  status       = 'Purchase status',
  lastUpdated  = 'MON DD, YYYY',
  onView,
  className,
  ...rest
}) => (
  <div className={['t1-dc', className].filter(Boolean).join(' ')} {...rest}>

    {/* ── Header ─────────────────────────────────────────────────────────── */}
    <div className="t1-dc__header">
      <div className="t1-dc__icon-block" aria-hidden="true">
        <i className="ph ph-car" />
      </div>
      <div className="t1-dc__deal-info">
        <div className="t1-dc__deal-id">{dealId}</div>
        <div className="t1-dc__vehicle">{vehicle}</div>
      </div>
    </div>

    {/* ── Container ──────────────────────────────────────────────────────── */}
    <div className="t1-dc__container">

      {/* Body — 3 fields */}
      <div className="t1-dc__body">
        <div className="t1-dc__field">
          <div className="t1-dc__field-label">Salesperson</div>
          <div className="t1-dc__field-value">{salesperson}</div>
        </div>
        <div className="t1-dc__field">
          <div className="t1-dc__field-label">Type</div>
          <div className="t1-dc__field-value">{purchaseType}</div>
        </div>
        <div className="t1-dc__field">
          <div className="t1-dc__field-label">Status</div>
          <div className="t1-dc__field-value">{status}</div>
        </div>
      </div>

      {/* Separator (kit) */}
      <Separator />

      {/* Footer — last updated + View button */}
      <div className="t1-dc__footer">
        <div className="t1-dc__field">
          <div className="t1-dc__field-label">Last Updated</div>
          <div className="t1-dc__field-value">{lastUpdated}</div>
        </div>
        <Button size="md" onClick={onView}>View</Button>
      </div>

    </div>
  </div>
);

/* -------- Listing-Card -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   LISTING-CARD  (Figma: aiT1ListingCard)
   Vertical list card — 1–N stacked item rows separated by 1px dividers.

   Figma ref : T1-Components
   BEM prefix: t1-lc

   Figma variants
   ─────────────────────────────────────────────────────────────────────────
   count=1–5  × expanded=true  → full width, avatar prefix shown per row
   count=1–5  × expanded=false → compact width, no avatar prefix

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Avatar — type="letter" variant="square" size="lg"
            40×40, border-radius 2px, bg #edeef0, text #6d707a
   Chip   — variant="soft" color="primary" size="md"
            24px pill, bg #ebf4ff, text #3373dd

   Props (ListingCard root)
   ─────────────────────────────────────────────────────────────────────────
   items      object[]   Array of item row data (see below)  []
   expanded   bool       Show avatar prefix per row          true
   onItemClick fn(item, idx)  Row click callback             undefined
   className  string

   Each item object (all fields optional)
   ─────────────────────────────────────────────────────────────────────────
   initials     string   2-char avatar label          'CN'
   title        string   Primary name / title         ''
   id           string   Secondary ID (e.g. '#123')   ''
   chip         string   Chip label text              undefined
   chipColor    string   Chip color prop              'primary'
   subtitle1    string   First subtitle               ''
   subtitle2    string   Second subtitle (no dot)     ''
   description  string   Third text line              ''
   suffixLabel  string   Right-side label (muted)     ''
   suffixDetail string   Right-side detail (bold)     ''
   ========================================================================== */

const ListingCard = ({
  items       = [],
  expanded    = true,
  onItemClick,
  className,
  ...rest
}) => {
  const rootCls = ['t1-lc', className].filter(Boolean).join(' ');

  return (
    <div className={rootCls} {...rest}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <div className="t1-lc__divider" />}

          <div
            className="t1-lc__item"
            onClick={() => onItemClick && onItemClick(item, i)}
            style={onItemClick ? { cursor: 'pointer' } : undefined}
          >
            {/* ── Avatar prefix (expanded only) ──────────────────────────── */}
            {expanded && (
              <Avatar
                type="letter"
                variant="square"
                size="lg"
                initials={item.initials || 'CN'}
                className="t1-lc__avatar"
              />
            )}

            {/* ── Body: info + suffix ────────────────────────────────────── */}
            <div className="t1-lc__body">

              {/* Info column */}
              <div className="t1-lc__info">

                {/* nameId row: Title · #ID · Chip */}
                <div className="t1-lc__nameid">
                  {item.title && (
                    <span className="t1-lc__title">{item.title}</span>
                  )}
                  {item.id && (
                    <span className="t1-lc__id">{item.id}</span>
                  )}
                  {item.chip && (
                    <Chip
                      variant="soft"
                      color={item.chipColor || 'primary'}
                      size="md"
                    >
                      {item.chip}
                    </Chip>
                  )}
                </div>

                {/* Subtitles row: Subtitle1 • Subtitle2 */}
                {(item.subtitle1 || item.subtitle2) && (
                  <div className="t1-lc__subtitles">
                    {item.subtitle1 && (
                      <span className="t1-lc__subtitle-group">
                        <span className="t1-lc__sub">{item.subtitle1}</span>
                        {item.subtitle2 && <span className="t1-lc__dot" />}
                      </span>
                    )}
                    {item.subtitle2 && (
                      <span className="t1-lc__sub">{item.subtitle2}</span>
                    )}
                  </div>
                )}

                {/* Description */}
                {item.description && (
                  <div className="t1-lc__desc">{item.description}</div>
                )}

              </div>{/* /info */}

              {/* Suffix column: Label + Detail (right-aligned) */}
              {(item.suffixLabel || item.suffixDetail) && (
                <div className="t1-lc__suffix">
                  {item.suffixLabel && (
                    <span className="t1-lc__suffix-label">{item.suffixLabel}</span>
                  )}
                  {item.suffixDetail && (
                    <span className="t1-lc__suffix-detail">{item.suffixDetail}</span>
                  )}
                </div>
              )}

            </div>{/* /body */}
          </div>{/* /item */}
        </React.Fragment>
      ))}
    </div>
  );
};

/* -------- Credit-Score-Card -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   CREDIT-SCORE-CARD  (Figma: )
   BEM prefix: t1-csc

   Props
   ─────────────────────────────────────────────────────────────────────────
   score          number    credit score 300–850          default: 745
   maxApproval    string    max loan amount               default: '$65,000'
   eligibleApr    string    eligible APR                  default: '3.99%'
   showChip       boolean   show "Tier 1 Qualified" chip  default: true
   chipLabel      string    chip text                     default: 'Tier 1 Qualified'
   onDownload     function  Download button callback
   onApply        function  Apply to Deal button callback
   className      string    extra class

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Button  — "Download" (contained neutral) + "Apply to Deal" (contained primary)

   Animation
   ─────────────────────────────────────────────────────────────────────────
   • Score counter animates from 300 → target over 1.4 s (ease-out cubic)
   • Handle slides along the arc in sync with the counter via requestAnimationFrame
   • "Tier 1 Qualified" chip fades + slides in after 1.2 s delay (CSS transition)

   Arc segment approach
   ─────────────────────────────────────────────────────────────────────────
   • 6 equal-angular segments (each ≈ 30°) — equal visual weight on the gauge
   • HALF_GAP = 12 score pts pulled back from every internal boundary so that
     adjacent strokeLinecap="round" caps produce a clean ~3–4 px gap between
     segments, exactly matching the Figma pill-shaped band design
   • sweep=1 selects the correct outer (top) arc using center (135, 125)
   ========================================================================== */

(function () {

  const ARC_CX = 135, ARC_CY = 125, ARC_R = 120, ARC_SW = 14;
  const MIN_S = 300, MAX_S = 850;

  /*
   * Equal-angular segment boundaries (raw, before gap inset):
   *   550 pts ÷ 6 ≈ 91.67 pts each → boundaries 300, 392, 483, 575, 667, 758, 850
   *
   * HALF_GAP = 12 pts pulled from each side of every internal boundary.
   * With ARC_R=120 and strokeWidth=14 (cap radius 7), a 12-pt inset on each
   * side creates ~24 pts of dead space = 7.9° of arc = 16.5 px, so the two
   * adjacent round caps (each 7 px) leave ≈ 2.5 px of clear background between
   * them — the subtle gap seen in the Figma.
   */
  const G = 12; // half-gap score points
  const ARC_SEGMENTS = [
    { s1: 300,     s2: 392 - G, color: '#8B2020' }, // maroon   300 → 380
    { s1: 392 + G, s2: 483 - G, color: '#F52F1D' }, // red      404 → 471
    { s1: 483 + G, s2: 667 - G, color: '#F5C03A' }, // yellow   495 → 655  (merged orange+amber)
    { s1: 667 + G, s2: 758 - G, color: '#7BC86C' }, // lt-green 679 → 746
    { s1: 758 + G, s2: 850,     color: '#06BC75' }, // green    770 → 850
  ];

  /* Convert credit score → SVG angle (180° at score 300, 0° at score 850) */
  function scoreToAngle(s) {
    return 180 - ((s - MIN_S) / (MAX_S - MIN_S)) * 180;
  }

  /* Polar → SVG cartesian (y-axis inverted in SVG) */
  function polar(deg) {
    const rad = (deg * Math.PI) / 180;
    return {
      x: +(ARC_CX + ARC_R * Math.cos(rad)).toFixed(4),
      y: +(ARC_CY - ARC_R * Math.sin(rad)).toFixed(4),
    };
  }

  /*
   * SVG arc path from score s1 → s2.
   * sweep=1 (CW in SVG) selects the top semicircle using center (ARC_CX, ARC_CY).
   * large-arc-flag=0 always; all segments are < 30° so always the minor arc.
   */
  function arcPath(s1, s2) {
    const p1 = polar(scoreToAngle(s1));
    const p2 = polar(scoreToAngle(s2));
    return `M ${p1.x} ${p1.y} A ${ARC_R} ${ARC_R} 0 0 1 ${p2.x} ${p2.y}`;
  }

  /* Score → arc segment / handle ring color (vivid, matches the arc band) */
  function getScoreColor(s) {
    if (s >= 770) return '#06BC75';
    if (s >= 690) return '#7BC86C';
    if (s >= 510) return '#F5C03A'; // merged yellow band
    if (s >= 420) return '#F52F1D';
    return '#8B2020';
  }

  /*
   * Score → rating label text color.
   * Uses darker semantic tones for legibility inside the gauge.
   * Excellent (#057a4c) is the Figma-confirmed value; others follow the same
   * "dark variant of the arc hue" pattern.
   */
  function getScoreLabelColor(s) {
    if (s >= 740) return '#057a4c'; // Excellent — Figma token confirmed
    if (s >= 670) return '#2d9154'; // Good
    if (s >= 580) return '#b55c00'; // Fair
    return '#c0291a';               // Poor
  }

  /* Score → rating label */
  function getScoreLabel(s) {
    if (s >= 740) return 'Excellent Score';
    if (s >= 670) return 'Good Score';
    if (s >= 580) return 'Fair Score';
    return 'Poor Score';
  }

  /* ── CreditScoreGauge — the animated SVG arc ─────────────────────────────── */
  const CreditScoreGauge = ({ targetScore }) => {
    const [displayed, setDisplayed] = React.useState(MIN_S);
    const rafRef = React.useRef(null);

    React.useEffect(() => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const startTime = performance.now();
      const from = MIN_S;
      const to   = targetScore;
      const duration = 1400;

      const tick = (now) => {
        const t = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        setDisplayed(Math.round(from + (to - from) * eased));
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafRef.current);
    }, [targetScore]);

    const handle     = polar(scoreToAngle(displayed));
    const scoreColor = getScoreColor(displayed);
    const scoreLabel = getScoreLabel(displayed);

    return (
      <svg
        className="t1-csc__arc"
        viewBox="0 0 270 145"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`Credit score ${displayed} — ${scoreLabel}`}
      >
        {/*
         * ── 6 pill-shaped arc segments ────────────────────────────────────
         * Each segment uses strokeLinecap="round" so both ends are naturally
         * rounded, matching the Figma pill/capsule design.
         * The HALF_GAP insets in ARC_SEGMENTS ensure adjacent round caps do
         * NOT touch — a clean ~3 px background gap shows between each band.
         * sweep=1 draws the correct outward-facing (top) semicircle.
         */}
        {ARC_SEGMENTS.map(seg => (
          <path
            key={seg.s1}
            d={arcPath(seg.s1, seg.s2)}
            fill="none"
            stroke={seg.color}
            strokeWidth={ARC_SW}
            strokeLinecap="round"
          />
        ))}

        {/* ── Handle: white filled circle + thick colored ring (no center dot) ── */}
        <circle cx={handle.x} cy={handle.y} r="12" fill="white" />
        <circle cx={handle.x} cy={handle.y} r="9.5" fill="none" stroke={scoreColor} strokeWidth="5" />

        {/* ── Score number ── */}
        <text
          x="135" y="82"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="32"
          fontWeight="600"
          fill="#444f5c"
          style={{ fontFamily: 'inherit' }}
        >
          {displayed}
        </text>

        {/* ── Score rating label ── */}
        <text
          x="135" y="110"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="14"
          fontWeight="500"
          fill={getScoreLabelColor(displayed)}
          style={{ fontFamily: 'inherit' }}
        >
          {scoreLabel}
        </text>

        {/* ── Range labels (positioned below arc endpoints) ── */}
        <text
          x="15" y="138"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="12"
          fontWeight="400"
          fill="#969aa3"
          style={{ fontFamily: 'inherit' }}
        >
          300
        </text>
        <text
          x="255" y="138"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="12"
          fontWeight="400"
          fill="#969aa3"
          style={{ fontFamily: 'inherit' }}
        >
          850
        </text>
      </svg>
    );
  };

  /* ── CreditScoreCard ─────────────────────────────────────────────────────── */
  window.CreditScoreCard = ({
    score        = 745,
    maxApproval  = '$65,000',
    eligibleApr  = '3.99%',
    showChip     = true,
    chipLabel    = 'Tier 1 Qualified',
    onDownload,
    onApply,
    className,
    ...rest
  }) => {
    /* Chip fades in after the score animation finishes (1.2 s delay set in CSS) */
    const [chipReady, setChipReady] = React.useState(false);
    React.useEffect(() => {
      setChipReady(false);
      const t = setTimeout(() => setChipReady(true), 50);
      return () => clearTimeout(t);
    }, [score]);

    return (
      <div className={['t1-csc', className].filter(Boolean).join(' ')} {...rest}>

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="t1-csc__header">CREDIT PRE-QUALIFICATION</div>

        {/* ── Body ────────────────────────────────────────────────────────── */}
        <div className="t1-csc__body">

          {/* Score estimate label */}
          <div className="t1-csc__est-label">SCORE ESTIMATE</div>

          {/* Gauge + qualification chip */}
          <div className="t1-csc__gauge">
            <CreditScoreGauge targetScore={score} />
            {showChip && (
              <span
                className={[
                  't1-csc__qual-chip',
                  chipReady ? '' : 't1-csc__qual-chip--hidden',
                ].filter(Boolean).join(' ')}
                role="status"
              >
                {chipLabel}
              </span>
            )}
          </div>

          {/* Stat mini-cards */}
          <div className="t1-csc__stats">
            <div className="t1-csc__stat">
              <div className="t1-csc__stat-label">MAX APPROVAL</div>
              <div className="t1-csc__stat-value">{maxApproval}</div>
            </div>
            <div className="t1-csc__stat">
              <div className="t1-csc__stat-label">ELIGIBLE APR</div>
              <div className="t1-csc__stat-value t1-csc__stat-value--apr">{eligibleApr}</div>
            </div>
          </div>

        </div>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <div className="t1-csc__footer">
          <Button
            variant="contained"
            color="neutral"
            size="md"
            onClick={onDownload}
          >
            Download
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="md"
            onClick={onApply}
          >
            Apply to Deal
          </Button>
        </div>

      </div>
    );
  };

})();

/* -------- Completion-Card -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   COMPLETION-CARD  (Figma: aiT1completionCard)

   Displays an AI action completion summary: a status header with avatar +
   title/subtitle, a list of label-value detail rows, and a primary CTA button.

   Props
   ─────────────────────────────────────────────────────────────────────────
   title       string      — headline in the header
   subtitle    string      — secondary line in the header
   icon        ReactNode   — icon inside the avatar (default: ph-check bold)
   rows        { label, value }[]  — detail rows in the body
   action      string | ReactNode  — button label or custom button element
   onAction    function    — click handler for the default button
   className   string
   ========================================================================== */

const CompletionCard = ({
  title    = 'Test Drive Confirmed',
  subtitle = 'SMS notification sent to customer',
  icon,
  rows = [
    { label: 'CUSTOMER',   value: 'Curtis Gable'           },
    { label: 'VEHICLE',    value: '2023 Galactic Mirage'   },
    { label: 'DATE & TIME',value: 'Jan 28, 2026 at 10:00 AM' },
  ],
  action   = 'View in Calendar',
  onAction,
  className,
  ...rest
}) => {
  const avatarIcon = icon || (
    <i className="ph-bold ph-check t1-cc__avatar-icon" aria-hidden="true" />
  );

  const actionEl = typeof action === 'string'
    ? (
      <Button
        variant="contained"
        color="primary"
        size="lg"
        onClick={onAction}
      >
        {action}
      </Button>
    )
    : action;

  const cls = ['t1-cc', className].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>

      {/* ── Header ── */}
      <div className="t1-cc__header">
        <div className="t1-cc__avatar" aria-hidden="true">
          {avatarIcon}
        </div>
        <div className="t1-cc__header-content">
          <div className="t1-cc__title">{title}</div>
          <div className="t1-cc__subtitle">{subtitle}</div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="t1-cc__body">

        {/* Detail rows */}
        <div className="t1-cc__rows">
          {rows.map((row, i) => (
            <React.Fragment key={i}>
              <div className="t1-cc__row">
                <span className="t1-cc__row-label">{row.label}</span>
                <span className="t1-cc__row-value">{row.value}</span>
              </div>
              {i < rows.length - 1 && <div className="t1-cc__row-sep" />}
            </React.Fragment>
          ))}
        </div>

        {/* CTA button */}
        <div className="t1-cc__action">
          {actionEl}
        </div>

      </div>
    </div>
  );
};

/* -------- Conversation-History-Card -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   CONVERSATION-HISTORY-CARD — from /Conversation-History-Card (15:75727)
   326×136. Title 16/700 + "(subText)" 14/500 + right-aligned time 12/500
   · description 14/regular · "View conversation" 148×32 button.
   ========================================================================== */
const ConversationHistoryCard = ({
  title = 'Text Message',
  subText = '(Incoming)',
  when = 'Yesterday at 4:30 pm',
  preview = 'She asked about pricing for a white AeroVibe Limited trim.',
  action = 'View conversation',
}) => (
  <div className="t1-history-v2">
    <div className="t1-history-v2__head">
      <div className="t1-history-v2__title-row">
        <span className="t1-history-v2__title">{title}</span>
        {subText && <span className="t1-history-v2__subtext">{subText}</span>}
      </div>
      <span className="t1-history-v2__when">{when}</span>
    </div>
    <div className="t1-history-v2__preview">{preview}</div>
    <Button size="md" variant="contained" color="primary">{action}</Button>
  </div>
);

/* -------- Notify-My-Card -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   NOTIFY-MY-CARD  (Figma: aiT1NotifyMeCard)
   BEM prefix: t1-nmc

   Props
   ─────────────────────────────────────────────────────────────────────────
   notified      boolean           initial notified state      default: false
   heading       string            main status text
   description   string            sub-text (shown in both states)
   actionLabel   string            button copy                 default: 'Notify me when ready'
   onNotify      function          called when button clicked
   className     string            optional extra class

   Interaction
   ─────────────────────────────────────────────────────────────────────────
   Clicking the button transitions from default → notified state.
   The card shrinks from the tall default layout to the compact notified row,
   using the kit Button component internally.
   ========================================================================== */

const NotifyMyCard = ({
  notified     = false,
  heading      = 'Generating this report is taking more time than usual.',
  description  = "We'll notify you as soon as the report is generated.",
  actionLabel  = 'Notify me when ready',
  onNotify,
  className,
  ...rest
}) => {
  const [isNotified, setIsNotified] = React.useState(notified);
  React.useEffect(() => setIsNotified(notified), [notified]);

  const handleNotify = () => {
    setIsNotified(true);
    onNotify && onNotify();
  };

  /* ── Notified (compact) state ───────────────────────────────────────────── */
  if (isNotified) {
    return (
      <div
        className={['t1-nmc t1-nmc--notified', className].filter(Boolean).join(' ')}
        {...rest}
      >
        <span className="t1-nmc__check-block">
          <i className="ph-bold ph-check t1-nmc__icon" aria-hidden="true" />
        </span>
        <span className="t1-nmc__notified-text">{description}</span>
      </div>
    );
  }

  /* ── Default state ──────────────────────────────────────────────────────── */
  return (
    <div
      className={['t1-nmc t1-nmc--default', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {/* Top row: icon block + text */}
      <div className="t1-nmc__top">
        <span className="t1-nmc__icon-block">
          <i className="ph ph-clock t1-nmc__icon" aria-hidden="true" />
        </span>
        <div className="t1-nmc__body">
          <span className="t1-nmc__heading">{heading}</span>
          <span className="t1-nmc__desc">{description}</span>
        </div>
      </div>

      {/* Full-width action button */}
      <div className="t1-nmc__action">
        <Button
          variant="contained"
          color="primary"
          size="md"
          onClick={handleNotify}
          style={{ width: '100%' }}
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
};

/* -------- Planner-Card -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   PLANNER-CARD  (Figma: aiT1PlannerCard)
   BEM prefix: t1-pc

   Props
   ─────────────────────────────────────────────────────────────────────────
   title      string                          card heading
   lists      Array<{ label: string,          numbered list label e.g. "1. List"
                       items: Array<{
                         text:    string,     item label
                         checked: boolean     current check state (display only)
                       }>
                     }>
   className  string                          optional extra class

   Display-only — no internal state. All checked states come from props.
   The AI controls which items are checked; this component just renders them.
   ========================================================================== */

const PlannerCard = ({
  title     = 'Flora Fleisher: Action Plan',
  lists     = [
    {
      label: '1. List',
      items: [
        { text: 'Select Customer',        checked: true  },
        { text: 'Draft follow-up SMS',     checked: true  },
        { text: 'Check inventory status',  checked: false },
        { text: 'Schedule test drive',     checked: false },
        { text: 'Send calendar invite',    checked: false },
      ],
    },
    {
      label: '2. List',
      items: [
        { text: 'Prepare trade-in quote',   checked: false },
        { text: 'Run credit pre-check',     checked: false },
        { text: 'Review financing options', checked: false },
        { text: 'Confirm delivery date',    checked: false },
        { text: 'Schedule follow-up call',  checked: false },
      ],
    },
  ],
  className,
  ...rest
}) => {
  /* ── Derived counts (from props — display only) ────────────────────────── */
  const allItems   = lists.flatMap(g => g.items);
  const totalCount = allItems.length;
  const doneCount  = allItems.filter(it => it.checked).length;
  const completed  = totalCount > 0 && doneCount === totalCount;
  const pct        = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  /* ── Root class ─────────────────────────────────────────────────────────── */
  const cls = ['t1-pc', completed && 't1-pc--completed', className]
    .filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>

      {/* ── Progress header ── */}
      <div className="t1-pc__head">
        <div className="t1-pc__title-row">
          <span className="t1-pc__title">{title}</span>
          <span className="t1-pc__suffix">
            {completed ? 'COMPLETED' : `${doneCount}/${totalCount} DONE`}
          </span>
        </div>
        <ProgressBar
          value={pct}
          color={completed ? 'success' : 'brand'}
        />
      </div>

      {/* ── List groups ── */}
      <div className="t1-pc__groups">
        {lists.map((group, gi) => (
          <React.Fragment key={gi}>
            {gi > 0 && <Separator />}
            <div className="t1-pc__group">
              <span className="t1-pc__group-label">{group.label}</span>
              <div className="t1-pc__items">
                {group.items.map((item, ii) => (
                  <div
                    key={ii}
                    className={['t1-pc__item', item.checked && 't1-pc__item--checked']
                      .filter(Boolean).join(' ')}
                  >
                    <span style={{ pointerEvents: 'none' }}>
                      <Checkbox
                        checked={item.checked}
                        color={completed ? 'success' : 'brand'}
                        shape="square"
                      />
                    </span>
                    <span className="t1-pc__item-text">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

    </div>
  );
};

/* -------- Reasoning-Log -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   REASONING-LOG  (Figma: AiT1ReasoningLog)

   Interactive thinking-indicator that shows the AI's reasoning steps.

   Props
   ─────────────────────────────────────────────────────────────────────────
   inProgress  boolean    — true while AI is still reasoning
   interrupted boolean    — user stopped the response mid-way
   steps       string[]   — reasoning step labels (default: 5 CRM steps)
   className   string

   Behaviour
   ─────────────────────────────────────────────────────────────────────────
   • Header row is clickable — toggles step list open/closed.
   • Elapsed timer ticks every 100 ms while inProgress is true.
   • Logo SVG rotates continuously while inProgress.
   • "Thinking…" text has an animated moving-gradient shimmer.
   • Step list expands/collapses via CSS grid-template-rows transition.
   • Steps are revealed one at a time: the next step only appears after the
     current step's typewriter animation has finished typing completely.
   • Last step gets a blue active indicator while inProgress.
   • Chevron icon rotates 180° when collapsed.

   Anatomy
   ─────────────────────────────────────────────────────────────────────────
   .t1-rl[--in-progress | --done | --interrupted]
     .t1-rl__logo-col
       svg.t1-rl__logo[.t1-rl__logo--spin]
     .t1-rl__main
       button.t1-rl__header [.t1-rl__header--static]
         .t1-rl__header-left
           span.t1-rl__status [--thinking | --done | --interrupted]
           span.t1-rl__timer
         i.t1-rl__chevron [.t1-rl__chevron--collapsed]
       p.t1-rl__subtitle
       .t1-rl__steps-wrap [.is-open]
         .t1-rl__steps-inner
           .t1-rl__step [.t1-rl__step--active]
             span.t1-rl__bar
             span.t1-rl__step-text
   ========================================================================== */

/* ── Typewriter text ────────────────────────────────────────────────────── */
/* Starts typing on mount if active=true. When active later turns false     */
/* (next step revealed), the interval keeps running to completion — no snap. */
/* Calls onDone() once the full sentence has been typed out.                */
const TypewriterText = ({ text, active, onDone }) => {
  const [chars,    setChars]    = React.useState(active ? 0 : text.length);
  const [isTyping, setIsTyping] = React.useState(active);

  /* Empty deps: run exactly once on mount. If active=false on mount,        */
  /* nothing starts — full text is already shown via useState initialiser.   */
  React.useEffect(() => {
    if (!active) return;

    let i = 0;
    const id = setInterval(() => {
      i++;
      setChars(i);
      if (i >= text.length) {
        clearInterval(id);
        setIsTyping(false);
        if (onDone) onDone();        /* notify parent: typing complete */
      }
    }, 65);                          /* ~65 ms per character */

    return () => clearInterval(id); /* only fires on unmount */
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const stillTyping = isTyping && chars < text.length;
  return (
    <>
      {text.slice(0, chars)}
      {stillTyping && <span className="t1-rl__cursor" aria-hidden="true" />}
    </>
  );
};

/* ── Animated step entry ────────────────────────────────────────────────── */
/* CSS keyframe fires the moment the element enters the DOM — no JS state,  */
/* no one-frame gap that caused the step list to flicker between steps.      */
/* instant=true skips the animation for already-complete (done-state) steps. */
const AnimatedStep = ({ text, isActive, instant, onDone }) => (
  <div className={'t1-rl__step-entry' + (instant ? ' t1-rl__step-entry--instant' : '')}>
    <div className={'t1-rl__step' + (isActive ? ' t1-rl__step--active' : '')}>
      <span className="t1-rl__bar" aria-hidden="true" />
      <span className="t1-rl__step-text">
        <TypewriterText text={text} active={isActive} onDone={onDone} />
      </span>
    </div>
  </div>
);

/* ── Inline SVG logo (aiLogoTekionProduct.svg) ──────────────────────────── */
const T1AiLogo = ({ spinning }) => (
  <svg
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    className={'t1-rl__logo' + (spinning ? ' t1-rl__logo--spin' : '')}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="t1rl-g" x1="1" y1="2" x2="16.87" y2="5.12" gradientUnits="userSpaceOnUse">
        <stop stopColor="#25C8A5"/>
        <stop offset="0.5" stopColor="#1B90B4"/>
        <stop offset="1" stopColor="#1A6CC4"/>
      </linearGradient>
    </defs>
    <path d="M3.90234 12.1417C4.35913 11.3507 5.37099 11.0796 6.1621 11.5362C6.95276 11.993 7.22378 13.004 6.76757 13.795C6.31077 14.5862 5.299 14.8573 4.50781 14.4005C3.71688 13.9436 3.44577 12.9327 3.90234 12.1417Z" fill="url(#t1rl-g)"/>
    <path d="M9.85253 11.5362C10.6436 11.0795 11.6554 11.3507 12.1123 12.1417C12.5687 12.9327 12.2976 13.9436 11.5068 14.4005C10.7156 14.8573 9.70386 14.5862 9.24706 13.795C8.79076 13.0039 9.06163 11.9929 9.85253 11.5362Z" fill="url(#t1rl-g)"/>
    <path d="M1.82714 6.87897C2.61816 6.42229 3.62997 6.69366 4.08691 7.48444C4.5437 8.27563 4.27262 9.2874 3.48144 9.74421C2.69025 10.201 1.67846 9.92992 1.22167 9.13874C0.765282 8.34764 1.03617 7.3357 1.82714 6.87897Z" fill="url(#t1rl-g)"/>
    <path d="M9.84667 2.22175C10.6377 1.76509 11.6495 2.03645 12.1064 2.82721C12.2712 3.11258 12.342 3.42711 12.3271 3.73346C12.2949 4.39469 12.144 5.12681 12.4746 5.70026C12.8057 6.27373 13.5156 6.50978 14.1045 6.81257C14.3772 6.95281 14.6145 7.17081 14.7793 7.45612C15.2361 8.24727 14.9649 9.25905 14.1738 9.71589C13.3826 10.1727 12.3709 9.90162 11.9141 9.11042C11.7494 8.82504 11.6794 8.51051 11.6943 8.20417C11.7266 7.54286 11.8768 6.81076 11.5459 6.23737C11.2147 5.66396 10.5049 5.42789 9.91601 5.12507C9.64334 4.98476 9.40593 4.76682 9.2412 4.48151C8.78485 3.69046 9.05581 2.67851 9.84667 2.22175Z" fill="url(#t1rl-g)"/>
    <path d="M4.50781 2.27839C5.2989 1.82171 6.31071 2.0929 6.76757 2.88385C7.22408 3.67496 6.95309 4.68685 6.1621 5.14362C5.37103 5.60035 4.35924 5.32907 3.90234 4.53815C3.44576 3.74699 3.7167 2.73513 4.50781 2.27839Z" fill="url(#t1rl-g)"/>
  </svg>
);

/* ── ReasoningLog ───────────────────────────────────────────────────────── */
const ReasoningLog = ({
  inProgress  = true,
  interrupted = false,
  steps: stepsProp,
  className,
  ...rest
}) => {
  const defaultSteps = [
    'Analyzing user inquiry...',
    'Identifying CRM action items...',
    'Querying customer and vehicle records...',
    'Validating inventory and deal status...',
    'Synthesizing optimal response...',
  ];

  const steps = stepsProp || defaultSteps;

  const [expanded,     setExpanded]     = React.useState(inProgress && !interrupted);
  const [elapsed,      setElapsed]      = React.useState(0);
  const [visibleCount, setVisibleCount] = React.useState(inProgress && !interrupted ? 1 : steps.length);

  /* Live elapsed-time counter */
  React.useEffect(() => {
    setElapsed(0);
    if (!inProgress || interrupted) return;
    const id = setInterval(() => setElapsed(t => +(t + 0.1).toFixed(1)), 100);
    return () => clearInterval(id);
  }, [inProgress, interrupted]);

  /* When done/interrupted — reveal remaining steps instantly.                */
  /* Live component stays expanded; it will be unmounted by the parent once  */
  /* streaming starts. Historical messages start collapsed via useState init. */
  /* When switching back to in-progress — reset to showing only first step.  */
  React.useEffect(() => {
    if (!inProgress || interrupted) {
      setVisibleCount(steps.length);
    } else {
      setVisibleCount(1);
      setExpanded(true);
    }
  }, [inProgress, interrupted]);

  /* Called by the active step's TypewriterText once it finishes typing.     */
  /* Reveals the next step — creating a natural chain: type → reveal → type. */
  const handleStepDone = React.useCallback(() => {
    setVisibleCount(c => Math.min(c + 1, steps.length));
  }, [steps.length]);

  const timeStr = elapsed > 0 ? `${elapsed.toFixed(1)}s` : '';

  const cls = [
    't1-rl',
    inProgress  ? 't1-rl--in-progress' : 't1-rl--done',
    interrupted ? 't1-rl--interrupted'  : '',
    className || '',
  ].filter(Boolean).join(' ');

  /* ── Interrupted state ── */
  if (interrupted) {
    return (
      <div className={cls} {...rest}>
        <div className="t1-rl__logo-col">
          <T1AiLogo spinning={false} />
        </div>
        <div className="t1-rl__main">
          <div className="t1-rl__header t1-rl__header--static">
            <div className="t1-rl__header-left">
              <span className="t1-rl__status t1-rl__status--interrupted">
                Response stopped by you
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cls} {...rest}>

      {/* ── Logo ── */}
      <div className="t1-rl__logo-col">
        <T1AiLogo spinning={inProgress} />
      </div>

      {/* ── Main content ── */}
      <div className="t1-rl__main">

        {/* Clickable header — toggles expand/collapse */}
        <button
          className="t1-rl__header"
          type="button"
          onClick={() => setExpanded(e => !e)}
          aria-expanded={expanded}
          aria-label={expanded ? 'Collapse reasoning steps' : 'Expand reasoning steps'}
        >
          <div className="t1-rl__header-left">
            <span className={inProgress
              ? 't1-rl__status t1-rl__status--thinking'
              : 't1-rl__status t1-rl__status--done'
            }>
              {inProgress ? 'Thinking...' : 'Thought for'}
            </span>
            <span className="t1-rl__timer">
              {inProgress ? timeStr : '10s'}
            </span>
          </div>
          <i
            className={'ph ph-caret-up t1-rl__chevron' + (expanded ? '' : ' t1-rl__chevron--collapsed')}
            aria-hidden="true"
          />
        </button>

        {/* Subtitle */}
        <p className="t1-rl__subtitle">
          {inProgress
            ? "We\u2019re building a response for you\u2026"
            : "We\u2019ve completed the response."}
        </p>

        {/* Step list — grid-template-rows height animation */}
        <div className={'t1-rl__steps-wrap' + (expanded ? ' is-open' : '')}>
          <div className="t1-rl__steps-inner">
            {steps.slice(0, visibleCount).map((text, i) => {
              const isActive = inProgress && i === visibleCount - 1;
              /* instant=true when component mounts already-done (no animation) */
              const instant  = !inProgress && !interrupted;
              return (
                <AnimatedStep
                  key={i}
                  text={text}
                  isActive={isActive}
                  instant={instant}
                  /* Only the active (last visible) step gets the callback.   */
                  /* When typing finishes, it triggers the next step to mount. */
                  onDone={isActive ? handleStepDone : undefined}
                />
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

/* -------- Document-Card -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   DOCUMENT CARD  (Figma: aiT1DocumentCard)
   BEM prefix: t1-docc

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Phi   — icon inside the icon block (size=24, weight="regular")
   Link  — action links (size="large", appearance="primary")
           override: .t1-docc .t1-link { font-weight:500; line-height:20px }

   Props
   ─────────────────────────────────────────────────────────────────────────
   title      string                      Card heading          'Title'
   icon       string                      Phosphor icon name    'file-text'
   subtitles  string[]                    Dot-separated labels  3 × 'subtitle'
   links      {label, href?, onClick}[]   Action links          2 links
   className  string                      Extra CSS class

   Anatomy
   ─────────────────────────────────────────────────────────────────────────
   .t1-docc
     .t1-docc__icon-block
       Phi (ph-{icon}, 24px, regular weight)
     .t1-docc__content
       .t1-docc__title
       .t1-docc__subtitle-row
         .t1-docc__subtitle-item  [× n]
           span.t1-docc__subtitle-text
           span.t1-docc__dot      (omitted on last item)
       .t1-docc__btn-group
         Link size="large"  [× n]
   ========================================================================== */

const DocumentCard = ({
  title     = 'Title',
  icon      = 'file-text',
  subtitles = ['subtitle', 'subtitle', 'subtitle'],
  links     = [
    { label: 'Button1' },
    { label: 'Button 2' },
  ],
  className,
  ...rest
}) => {

  const cls = ['t1-docc', className].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>

      {/* ── Icon block ──────────────────────────────────────────────────── */}
      {/* Phi is the kit wrapper for Phosphor icons (_core.jsx).            */}
      {/* size=24 matches Figma's aiT1IconBlock (48 × 48 container).        */}
      <div className="t1-docc__icon-block" aria-hidden="true">
        <Phi name={icon} size={24} weight="regular" />
      </div>

      {/* ── Content column ──────────────────────────────────────────────── */}
      <div className="t1-docc__content">

        {/* Title */}
        <div className="t1-docc__title">{title}</div>

        {/* Subtitle row — dot-separated items */}
        {subtitles && subtitles.length > 0 && (
          <div className="t1-docc__subtitle-row">
            {subtitles.map((text, i) => (
              <div key={i} className="t1-docc__subtitle-item">
                <span className="t1-docc__subtitle-text">{text}</span>
                {/* Dot separator after every item except the last */}
                {i < subtitles.length - 1 && (
                  <span className="t1-docc__dot" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Action links — use kit Link component (size="large" = 14px)    */}
        {links && links.length > 0 && (
          <div className="t1-docc__btn-group">
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.href || '#'}
                size="large"
                appearance="primary"
                onClick={link.onClick}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

/* -------- Response -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   RESPONSE  (Figma: aiT1Response)
   BEM prefix: t1-response

   Props
   ─────────────────────────────────────────────────────────────────────────
   title         string      summary/title line   (body2Medium 14/500/20)
   children      ReactNode   body text            (body2Regular 14/400/16)
   orderedList   string[]    numbered list items
   unorderedList string[]    bullet list items
   contentSlot   ReactNode   custom card slot (dashed border)
   showFeedback  boolean     render FeedbackAction row    default true
   filterCount   number      passed to FeedbackAction     default 2
   sourceCount   number      passed to FeedbackAction     default 2
   showFilter    boolean                                  default true
   showSource    boolean                                  default true
   filterItems   string[]    filter labels in modal       optional
   sourceItems   string[]    source labels in modal       optional
   onFilterClick function    override filter chip click   optional
   onSourceClick function    override source chip click   optional
   responseText  string    plain-text copy of the response; if omitted,
                           Response assembles it from title + children +
                           orderedList + unorderedList automatically.
   onCopy / onThumbUp / onThumbDown / onMore / onRegenerate  callbacks
   className     string

   Layout (Figma tokens)
   ─────────────────────────────────────────────────────────────────────────
   root          flex-col · gap 12px · padding-left 24px · min-width 160px
   __main        flex-col · gap 4px
   __header      flex-col · gap 0
   __title       body2Medium  14px / 500 / 20px lh · color #161616
   __body-text   body2Regular 14px / 400 / 16px lh · color #161616
   ========================================================================== */

const Response = ({
  title,
  children,
  orderedList,
  unorderedList,
  contentSlot,
  showFeedback  = true,
  filterCount   = 2,
  sourceCount   = 2,
  showFilter    = true,
  showSource    = true,
  filterItems,
  sourceItems,
  onFilterClick,
  onSourceClick,
  responseText: responseTextProp,
  onCopy,
  onThumbUp,
  onThumbDown,
  onMore,
  onRegenerate,
  className,
  ...rest
}) => {
  /* Build plain text for clipboard if consumer didn't provide it explicitly */
  const responseText = responseTextProp || (() => {
    const parts = [];
    if (title) parts.push(title);
    if (typeof children === 'string') parts.push(children);
    if (orderedList  && orderedList.length)  parts.push(orderedList.map((t, i) => `${i + 1}. ${t}`).join('\n'));
    if (unorderedList && unorderedList.length) parts.push(unorderedList.map(t => `• ${t}`).join('\n'));
    return parts.join('\n');
  })();

  return (
  <div className={['t1-response', className].filter(Boolean).join(' ')} {...rest}>

    {/* ── Main content ─────────────────────────────────────────────────── */}
    <div className="t1-response__main">
      <div className="t1-response__header">
        {title    && <div className="t1-response__title">{title}</div>}
        {children && <div className="t1-response__body-text">{children}</div>}
      </div>

      {/* Ordered list */}
      {orderedList && orderedList.length > 0 && (
        <div className="t1-response__list">
          <ol>
            {orderedList.map((item, i) => <li key={i}>{item}</li>)}
          </ol>
        </div>
      )}

      {/* Unordered list */}
      {unorderedList && unorderedList.length > 0 && (
        <div className="t1-response__list">
          <ul>
            {unorderedList.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      )}
    </div>

    {/* ── Content slot (dashed violet border) ──────────────────────────── */}
    {contentSlot && (
      <div className="t1-response__slot">{contentSlot}</div>
    )}

    {/* ── Feedback action row ───────────────────────────────────────────── */}
    {showFeedback && (
      <FeedbackAction
        filterCount={filterCount}
        sourceCount={sourceCount}
        showFilter={showFilter}
        showSource={showSource}
        filterItems={filterItems}
        sourceItems={sourceItems}
        onFilterClick={onFilterClick}
        onSourceClick={onSourceClick}
        responseText={responseText}
        onCopy={onCopy}
        onThumbUp={onThumbUp}
        onThumbDown={onThumbDown}
        onMore={onMore}
        onRegenerate={onRegenerate}
      />
    )}

  </div>
  );
};

/* -------- Chat-Container -------- */
/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   CHAT-CONTAINER
   BEM prefix: t1-chat

   Props
   ─────────────────────────────────────────────────────────────────────────
   messages        array     structured mode — renders turns from a data array
                  [{
                    role:    'user' | 'assistant'
                    content: string | ReactNode   — main text / body
                    title:   string               — (assistant only) summary title
                    filterCount: number           — (assistant only) default 2
                    sourceCount: number           — (assistant only) default 2
                    showFilter:  boolean          — (assistant only) default true
                    showSource:  boolean          — (assistant only) default true
                  }]

                  user       → ChatBubble (right-aligned)
                  assistant  → Response (left-aligned, no avatar)

   onEditMessage  (index, newText) => void
                  Called when the user saves an inline edit on a ChatBubble.
                  index = position of the message in the messages array.

   children       ReactNode passthrough mode — developer wraps turns manually.
                  child.props.role === 'user'      → right-aligned ChatBubble row
                  child.props.role === 'assistant' → Response row (no avatar)
                  any other role / no role         → assistant-aligned row

   className      string    extra class
   ========================================================================== */

const ChatContainer = ({
  messages,
  onEditMessage,
  children,
  className,
  ...rest
}) => {
  /* ── Messages-array mode ────────────────────────────────────────────────── */
  if (messages && messages.length > 0) {
    return (
      <div className={['t1-chat', className].filter(Boolean).join(' ')} {...rest}>
        {messages.map((msg, i) => (
          <div key={i} className={`t1-chat__row t1-chat__row--${msg.role}`}>
            {msg.role === 'assistant'
              ? <Response
                  title={msg.title}
                  filterCount={msg.filterCount !== undefined ? msg.filterCount : 2}
                  sourceCount={msg.sourceCount !== undefined ? msg.sourceCount : 2}
                  showFilter={msg.showFilter  !== undefined ? msg.showFilter  : true}
                  showSource={msg.showSource  !== undefined ? msg.showSource  : true}
                >
                  {msg.content}
                </Response>
              : <ChatBubble
                  role="user"
                  onEdit={onEditMessage ? (newText) => onEditMessage(i, newText) : undefined}
                >
                  {msg.content}
                </ChatBubble>
            }
          </div>
        ))}
      </div>
    );
  }

  /* ── Children passthrough mode ──────────────────────────────────────────── */
  /* Inspect each child's role prop to decide row type.                        */
  const wrappedChildren = React.Children.map(children, (child, i) => {
    if (!child) return null;
    const role = child.props && child.props.role;

    if (role === 'user') {
      return (
        <div key={i} className="t1-chat__row t1-chat__row--user">
          {child}
        </div>
      );
    }

    /* assistant or non-bubble content (Response, cards, etc.) */
    return (
      <div key={i} className="t1-chat__row t1-chat__row--assistant">
        {child}
      </div>
    );
  });

  return (
    <div className={['t1-chat', className].filter(Boolean).join(' ')} {...rest}>
      {wrappedChildren}
    </div>
  );
};

/* -------- app -------- */
/* ==========================================================================
   T1 UI Kit — Showcase app
   Side-nav with all 48 Figma pages; main pane shows the component & variants.
   Page names are 1:1 with Figma page names.
   ========================================================================== */

// Group display order — controls the order sections appear in the sidebar
const GROUP_ORDER = [
  'Chat Core',
  'Shell & Layout',
  'AI Output Cards',
  'Domain Cards',
  'Forms & Inputs',
  'Buttons & Actions',
  'Status & Data',
  'Notifications',
  'Primitives',
];

const PAGES = [
  // ── Chat Core ──────────────────────────────────────────────────────────────
  // The primary building blocks for a conversation thread
  { id: 'Response',                   group: 'Chat Core',        status: 'done' },
  { id: 'Chat-Bubble',                group: 'Chat Core',        status: 'done' },
  { id: 'Chat-Container',             group: 'Chat Core',        status: 'done' },
  { id: 'Prompt-Input',               group: 'Chat Core',        status: 'done' },
  { id: 'Feedback-Action',            group: 'Chat Core',        status: 'done' },
  { id: 'Reasoning-Log',              group: 'Chat Core',        status: 'done' },
  { id: 'Welcome',                    group: 'Chat Core',        status: 'done' },
  { id: 'Suggestion-List',            group: 'Chat Core',        status: 'done' },

  // ── Shell & Layout ─────────────────────────────────────────────────────────
  // Structural chrome — navigation and window frames
  { id: 'Side-Navigation',            group: 'Shell & Layout',   status: 'done' },
  { id: 'Nav-Bar',                    group: 'Shell & Layout',   status: 'done' },
  { id: 'App-Bar',                    group: 'Shell & Layout',   status: 'done' },
  { id: 'Global-Search',              group: 'Shell & Layout',   status: 'done' },

  // ── AI Output Cards ────────────────────────────────────────────────────────
  // Rich cards that embed inside Response contentSlot or thread
  { id: 'Planner-Card',               group: 'AI Output Cards',  status: 'done' },
  { id: 'Message-Draft',              group: 'AI Output Cards',  status: 'done' },
  { id: 'Document-Card',              group: 'AI Output Cards',  status: 'done' },
  { id: 'Completion-Card',            group: 'AI Output Cards',  status: 'done' },
  { id: 'Tip-Card',                   group: 'AI Output Cards',  status: 'done' },
  { id: 'Notify-My-Card',             group: 'AI Output Cards',  status: 'done' },
  { id: 'Conversation-History-Card',  group: 'AI Output Cards',  status: 'done' },
  { id: 'Quote',                      group: 'AI Output Cards',  status: 'done' },

  // ── Domain Cards ───────────────────────────────────────────────────────────
  // CRM data display cards
  { id: 'Deal-Card',                  group: 'Domain Cards',     status: 'done' },
  { id: 'Task-Card',                  group: 'Domain Cards',     status: 'done' },
  { id: 'Listing-Card',               group: 'Domain Cards',     status: 'done' },
  { id: 'Credit-Score-Card',          group: 'Domain Cards',     status: 'done' },

  // ── Forms & Inputs ─────────────────────────────────────────────────────────
  // User input controls
  { id: 'Dropdown',                   group: 'Forms & Inputs',   status: 'done' },
  { id: 'Input-Text',                 group: 'Forms & Inputs',   status: 'done' },
  { id: 'Search',                     group: 'Forms & Inputs',   status: 'done' },
  { id: 'Checkbox',                   group: 'Forms & Inputs',   status: 'done' },
  { id: 'Switch',                     group: 'Forms & Inputs',   status: 'done' },

  // ── Buttons & Actions ──────────────────────────────────────────────────────
  // Clickable elements and action triggers
  { id: 'Button',                     group: 'Buttons & Actions', status: 'done' },
  { id: 'Icon-Button',                group: 'Buttons & Actions', status: 'done' },
  { id: 'Link',                       group: 'Buttons & Actions', status: 'done' },
  { id: 'Interactive-Icon',           group: 'Buttons & Actions', status: 'done' },
  { id: 'FAB-Icon',                   group: 'Buttons & Actions', status: 'done' },
  { id: 'Gradient-Icon-Button',       group: 'Buttons & Actions', status: 'done' },
  { id: 'Fav-Bar-Icon',               group: 'Buttons & Actions', status: 'done' },

  // ── Status & Data ──────────────────────────────────────────────────────────
  // Identity, counts, tags, and progress
  { id: 'Avatar',                     group: 'Status & Data',    status: 'done' },
  { id: 'Badge',                      group: 'Status & Data',    status: 'done' },
  { id: 'Chip',                       group: 'Status & Data',    status: 'done' },
  { id: 'Progress-Bar',               group: 'Status & Data',    status: 'done' },

  // ── Notifications ──────────────────────────────────────────────────────────
  // Alerts, dialogs, and empty states
  { id: 'Notification-Banner-Toast',  group: 'Notifications',    status: 'done' },
  { id: 'Modal',                      group: 'Notifications',    status: 'done' },
  { id: 'Empty',                      group: 'Notifications',    status: 'done' },

  // ── Primitives ─────────────────────────────────────────────────────────────
  // Base-level layout helpers
  { id: 'Seperator',                  group: 'Primitives',       status: 'done' },
  { id: 'Divider',                    group: 'Primitives',       status: 'done' },
];

const Section = ({ title, children }) => (
  <>
    <div className="kit-section-title">{title}</div>
    <div className="kit-surface">{children}</div>
  </>
);
const Row = ({ children, style }) => <div className="kit-row" style={style}>{children}</div>;
const Label = ({ children }) => <div className="kit-label">{children}</div>;
const Col = ({ children, style }) => <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>{children}</div>;

/* ---------- page bodies ---------- */
const P = {};

P['Button'] = () => {
  const COLORS = ['primary', 'neutral', 'error'];
  const VARIANTS = ['contained', 'outlined', 'text'];
  const SIZES = ['lg', 'md', 'sm'];
  const row = { display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' };

  return (
    <>
      <Section title="Matrix · 3 colors × 3 variants × 3 sizes">
        <div style={{ display: 'grid', gridTemplateColumns: '96px repeat(3, 1fr)', gap: 24, alignItems: 'start' }}>
          <div />
          {VARIANTS.map(v => <div key={v} className="kit-label" style={{ textTransform: 'capitalize' }}>{v}</div>)}
          {COLORS.map(c => (
            <React.Fragment key={c}>
              <div className="kit-label" style={{ textTransform: 'capitalize', alignSelf: 'center' }}>{c}</div>
              {VARIANTS.map(v => (
                <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
                  {SIZES.map(s => <Button key={s} variant={v} color={c} size={s}>Label</Button>)}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </Section>

      <Section title="States · primary / lg">
        <div style={row}>
          <Col><Label>default</Label><Button color="primary" size="lg">Label</Button></Col>
          <Col><Label>hover</Label><Button color="primary" size="lg" state="hover">Label</Button></Col>
          <Col><Label>active</Label><Button color="primary" size="lg" state="active">Label</Button></Col>
          <Col><Label>loading</Label><Button color="primary" size="lg" loading>Label</Button></Col>
          <Col><Label>disabled</Label><Button color="primary" size="lg" disabled>Label</Button></Col>
        </div>
        <div style={{ ...row, marginTop: 20 }}>
          <Col><Label>outlined · default</Label><Button variant="outlined" size="lg">Label</Button></Col>
          <Col><Label>outlined · hover</Label><Button variant="outlined" size="lg" state="hover">Label</Button></Col>
          <Col><Label>outlined · active</Label><Button variant="outlined" size="lg" state="active">Label</Button></Col>
          <Col><Label>outlined · disabled</Label><Button variant="outlined" size="lg" disabled>Label</Button></Col>
        </div>
        <div style={{ ...row, marginTop: 20 }}>
          <Col><Label>text · default</Label><Button variant="text" size="lg">Label</Button></Col>
          <Col><Label>text · hover</Label><Button variant="text" size="lg" state="hover">Label</Button></Col>
          <Col><Label>text · active</Label><Button variant="text" size="lg" state="active">Label</Button></Col>
          <Col><Label>text · disabled</Label><Button variant="text" size="lg" disabled>Label</Button></Col>
        </div>
      </Section>

      <Section title="With Phosphor icons (CDN)">
        <div style={row}>
          <Button iconStart="plus">Add deal</Button>
          <Button iconEnd="arrow-right" variant="outlined">Continue</Button>
          <Button iconStart="download-simple" variant="text">Download</Button>
          <Button iconStart="trash" color="error">Delete</Button>
          <Button iconStart="magnifying-glass" size="md">Search</Button>
          <Button iconStart="star" size="sm" variant="outlined" color="neutral">Favorite</Button>
        </div>
      </Section>
    </>
  );
};
P['Icon-Button'] = () => {
  const ico   = <i className="ph ph-magnifying-glass" style={{fontSize:16}} />;
  const icoSm = <i className="ph ph-magnifying-glass" style={{fontSize:14}} />;
  const icoLg = <i className="ph ph-magnifying-glass" style={{fontSize:20}} />;
  return (
    <>
      <Section title="Neutral / Contained">
        <Row>
          <IconButton color="neutral" style="contained" size="md" icon={ico} aria-label="default" />
          <IconButton color="neutral" style="contained" size="md" icon={ico} states="hover"    aria-label="hover" />
          <IconButton color="neutral" style="contained" size="md" icon={ico} states="active"   aria-label="active" />
          <IconButton color="neutral" style="contained" size="md" icon={ico} states="disabled" aria-label="disabled" />
          <IconButton color="neutral" style="contained" size="md" loading    aria-label="loading" />
        </Row>
      </Section>
      <Section title="Neutral / Plain">
        <Row>
          <IconButton color="neutral" style="plain" size="md" icon={ico} aria-label="default" />
          <IconButton color="neutral" style="plain" size="md" icon={ico} states="hover"    aria-label="hover" />
          <IconButton color="neutral" style="plain" size="md" icon={ico} states="active"   aria-label="active" />
          <IconButton color="neutral" style="plain" size="md" icon={ico} states="disabled" aria-label="disabled" />
        </Row>
      </Section>
      <Section title="Inverse / Contained">
        <Row>
          <IconButton color="inverse" style="contained" size="md" icon={ico} aria-label="default" />
          <IconButton color="inverse" style="contained" size="md" icon={ico} states="hover"    aria-label="hover" />
          <IconButton color="inverse" style="contained" size="md" icon={ico} states="active"   aria-label="active" />
          <IconButton color="inverse" style="contained" size="md" icon={ico} states="disabled" aria-label="disabled" />
        </Row>
      </Section>
      <Section title="Inverse / Plain">
        <Row style={{background:'#3F4757',padding:'12px 16px',borderRadius:'var(--t1-radius-xs)',display:'inline-flex'}}>
          <IconButton color="inverse" style="plain" size="md" icon={ico} aria-label="default" />
          <IconButton color="inverse" style="plain" size="md" icon={ico} states="hover"    aria-label="hover" />
          <IconButton color="inverse" style="plain" size="md" icon={ico} states="active"   aria-label="active" />
          <IconButton color="inverse" style="plain" size="md" icon={ico} states="disabled" aria-label="disabled" />
        </Row>
      </Section>
      <Section title="Sizes">
        <Row>
          <IconButton color="neutral" style="contained" size="sm" icon={icoSm} aria-label="sm" />
          <IconButton color="neutral" style="contained" size="md" icon={ico}   aria-label="md" />
          <IconButton color="neutral" style="contained" size="lg" icon={icoLg} aria-label="lg" />
        </Row>
      </Section>
    </>
  );
};
P['Badge'] = () => (
  <>
    <Section title="Counts">
      <Row>
        <Badge count={1} color="primary" />
        <Badge count={7} color="primary" />
        <Badge count={99} color="primary" />
        <Badge count={100} color="primary" />
      </Row>
    </Section>
    <Section title="Colors">
      <Row>
        <Badge count={7} color="primary" />
        <Badge count={7} color="success" />
        <Badge count={7} color="error" />
        <Badge count={7} color="warning" />
        <Badge count={7} color="neutral" />
      </Row>
    </Section>
    <Section title="Light">
      <Row>
        <Badge count={7} color="primary" light />
        <Badge count={7} color="success" light />
        <Badge count={7} color="error" light />
      </Row>
    </Section>
    <Section title="Dot">
      <Row>
        <Badge dot color="primary" />
        <Badge dot color="success" />
        <Badge dot color="error" />
      </Row>
    </Section>
  </>
);
P['Avatar'] = () => (
  <>
    <Section title="Sizes">
      <Row>
        {['xs','sm','md','lg','xl','2xl'].map(s => <Avatar key={s} size={s} type="icon" />)}
      </Row>
    </Section>
    <Section title="Types">
      <Row>
        <Avatar type="icon" />
        <Avatar type="letter" initials="AB" />
        <Avatar type="letter" initials="SC" />
        <Avatar type="image" src="https://i.pravatar.cc/80?img=12" />
      </Row>
    </Section>
    <Section title="Variants">
      <Row>
        <Avatar type="letter" initials="T1" variant="circle" />
        <Avatar type="letter" initials="T1" variant="rounded" />
      </Row>
    </Section>
    <Section title="Status">
      <Row>
        <Avatar type="letter" initials="AB" status="online" />
        <Avatar type="letter" initials="AB" status="away" />
        <Avatar type="letter" initials="AB" status="busy" />
      </Row>
    </Section>
  </>
);
P['Chip'] = () => (
  <>
    <Section title="Outlined · Neutral"><Row>
      <Chip variant="outlined" color="neutral" size="md">Chip</Chip>
      <Chip variant="outlined" color="neutral" size="md" startIcon="tag">With icon</Chip>
      <Chip variant="outlined" color="neutral" size="md" endIcon="chevron-down">Dropdown</Chip>
      <Chip variant="outlined" color="neutral" size="xs">xs size</Chip>
      <Chip variant="outlined" color="neutral" size="md" disabled>Disabled</Chip>
    </Row></Section>
    <Section title="Outlined · Primary"><Row>
      <Chip variant="outlined" color="primary" size="md">Chip</Chip>
      <Chip variant="outlined" color="primary" size="md" startIcon="star">Starred</Chip>
      <Chip variant="outlined" color="primary" size="md" endIcon="chevron-down">Filter</Chip>
      <Chip variant="outlined" color="primary" size="xs">xs size</Chip>
      <Chip variant="outlined" color="primary" size="md" disabled>Disabled</Chip>
    </Row></Section>
    <Section title="Soft · Neutral"><Row>
      <Chip variant="soft" color="neutral" size="md">Chip</Chip>
      <Chip variant="soft" color="neutral" size="md" startIcon="tag">Tag</Chip>
      <Chip variant="soft" color="neutral" size="md" endIcon="x">Removable</Chip>
      <Chip variant="soft" color="neutral" size="xs">xs size</Chip>
      <Chip variant="soft" color="neutral" size="md" disabled>Disabled</Chip>
    </Row></Section>
    <Section title="Soft · Primary"><Row>
      <Chip variant="soft" color="primary" size="md">Chip</Chip>
      <Chip variant="soft" color="primary" size="md" startIcon="check">Active</Chip>
      <Chip variant="soft" color="primary" size="md" endIcon="x">Removable</Chip>
      <Chip variant="soft" color="primary" size="xs">xs size</Chip>
      <Chip variant="soft" color="primary" size="md" disabled>Disabled</Chip>
    </Row></Section>
    <Section title="With avatar (md only)"><Row>
      <Chip variant="outlined" color="neutral" size="md" avatar="https://i.pravatar.cc/40">John D.</Chip>
      <Chip variant="soft" color="primary" size="md" avatar="https://i.pravatar.cc/41">Jane S.</Chip>
    </Row></Section>
  </>
);
P['Switch'] = () => (
  <>
    <Section title="Unchecked / Checked"><Row>
      <Switch label="Off" />
      <Switch checked label="On" />
    </Row></Section>
    <Section title="Disabled"><Row>
      <Switch label="Disabled off" disabled />
      <Switch checked label="Disabled on" disabled />
    </Row></Section>
  </>
);
P['Checkbox'] = () => {
  const grid4 = { display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '16px 32px', alignItems: 'center', justifyItems: 'start' };
  const colHead = { fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--t1-fg-muted)' };
  const Grid = ({ children }) => <div style={grid4}>{children}</div>;
  const H = ({ label }) => <span style={colHead}>{label}</span>;
  return (
    <>
      <Section title="Brand · Square">
        <Grid>
          <H label="Default" /><H label="Hover" /><H label="Active" /><H label="Disabled" />
          <Checkbox /><Checkbox state="hover" /><Checkbox state="active" /><Checkbox disabled />
          <Checkbox checked /><Checkbox checked state="hover" /><Checkbox checked state="active" /><Checkbox checked disabled />
          <Checkbox indeterminate /><Checkbox indeterminate state="hover" /><Checkbox indeterminate state="active" /><Checkbox indeterminate disabled />
        </Grid>
      </Section>
      <Section title="Brand · Circle">
        <Grid>
          <H label="Default" /><H label="Hover" /><H label="Active" /><H label="Disabled" />
          <Checkbox shape="circle" /><Checkbox shape="circle" state="hover" /><Checkbox shape="circle" state="active" /><Checkbox shape="circle" disabled />
          <Checkbox shape="circle" checked /><Checkbox shape="circle" checked state="hover" /><Checkbox shape="circle" checked state="active" /><Checkbox shape="circle" checked disabled />
          <Checkbox shape="circle" indeterminate /><Checkbox shape="circle" indeterminate state="hover" /><Checkbox shape="circle" indeterminate state="active" /><Checkbox shape="circle" indeterminate disabled />
        </Grid>
      </Section>
      <Section title="Success · Square (no indeterminate)">
        <Grid>
          <H label="Default" /><H label="Hover" /><H label="Active" /><H label="Disabled" />
          <Checkbox color="success" /><Checkbox color="success" state="hover" /><Checkbox color="success" state="active" /><Checkbox color="success" disabled />
          <Checkbox color="success" checked /><Checkbox color="success" checked state="hover" /><Checkbox color="success" checked state="active" /><Checkbox color="success" checked disabled />
        </Grid>
      </Section>
      <Section title="With label &amp; description">
        <Col>
          <Checkbox label="Unchecked" />
          <Checkbox label="Checked" checked />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Disabled" disabled />
          <Checkbox color="success" label="Success checked" checked />
          <Checkbox label="Notifications" description="Email me when a deal changes" />
          <Checkbox checked label="Auto-save drafts" description="Save every 30 seconds" />
          <Checkbox label="Disabled with description" description="This option is currently unavailable" disabled />
        </Col>
      </Section>
    </>
  );
};
P['Input-Text'] = () => {
  const SearchIco = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14"/>
    </svg>
  );
  const MailIco = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="3" width="14" height="10" rx="1.5"/>
      <polyline points="1,3 8,9 15,3"/>
    </svg>
  );
  const ClearIco = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/>
    </svg>
  );
  return (
    <>
      <Section title="States"><div style={{display:'grid', gap: 16, gridTemplateColumns:'1fr 1fr'}}>
        <InputText label="Default"       placeholder="Enter text" />
        <InputText label="Filled"        value="Sarah Chen" />
        <InputText label="With assistive" placeholder="name@example.com" assistive="We'll never share your email." />
        <InputText label="Error"         value="bad@email" error="Please enter a valid email address." />
        <InputText label="Disabled"      value="Locked value" disabled />
      </div></Section>
      <Section title="Prefix / suffix icons"><div style={{display:'grid', gap: 16, gridTemplateColumns:'1fr 1fr'}}>
        <InputText label="Search"         placeholder="Search…"          startIcon={<SearchIco />} />
        <InputText label="Email"          placeholder="you@example.com"  startIcon={<MailIco />} endIcon={<ClearIco />} />
        <InputText label="Filled + icons" value="hello@tekion.com"       startIcon={<MailIco />} endIcon={<ClearIco />} />
        <InputText label="Error + icons"  value="bad@email"              startIcon={<MailIco />} error="Please enter a valid email address." />
      </div></Section>
      <Section title="Character counter"><div style={{display:'grid', gap: 16, gridTemplateColumns:'1fr 1fr'}}>
        <InputText label="Counter empty"   placeholder="Type something…"  maxLength={256} />
        <InputText label="Counter filled"  value="Sarah Chen"             maxLength={50} />
        <InputText label="Error + counter" value="bad-value" error="Please enter a valid value." maxLength={256} />
        <InputText label="Disabled + counter" value="Locked"              maxLength={100} disabled />
      </div></Section>
      <Section title="All features"><div style={{display:'grid', gap: 16, gridTemplateColumns:'1fr 1fr'}}>
        <InputText
          label="Full example"
          placeholder="Search messages…"
          startIcon={<SearchIco />}
          endIcon={<ClearIco />}
          assistive="Up to 256 characters."
          maxLength={256}
        />
        <InputText
          label="Full error"
          value="bad@email"
          startIcon={<MailIco />}
          endIcon={<ClearIco />}
          error="Please enter a valid email address."
          maxLength={256}
        />
      </div></Section>
    </>
  );
};
P['Chat-Bubble'] = () => {
  const [log, setLog] = React.useState('');
  return (
    <>
      <Section title="Default — hover to reveal Copy &amp; Edit">
        <div style={{display:'flex', flexDirection:'column', gap: 8, width: 480, alignItems: 'flex-end'}}>
          <ChatBubble
            onCopy={(t)  => setLog(`Copied: "${t}"`)}
            onEdit={(t)  => setLog(`Edited: "${t}"`)}
          >Can you pull up the open deals for Sarah Chen?</ChatBubble>
          <ChatBubble
            onCopy={(t)  => setLog(`Copied: "${t}"`)}
            onEdit={(t)  => setLog(`Edited: "${t}"`)}
          >Draft a follow-up for the Accord deal.</ChatBubble>
          <ChatBubble
            onCopy={(t)  => setLog(`Copied: "${t}"`)}
            onEdit={(t)  => setLog(`Edited: "${t}"`)}
          >Which deals are closing this week?</ChatBubble>
        </div>
        {log && <div style={{ marginTop: 12, fontSize: 12, color: 'var(--t1-fg-muted)', fontFamily: 'ui-monospace, monospace' }}>{log}</div>}
      </Section>
      <Section title="Hover state (frozen)">
        <div style={{display:'flex', flexDirection:'column', gap: 8, width: 480, alignItems: 'flex-end'}}>
          <ChatBubble state="hover" onCopy={() => setLog('Copied!')} onEdit={(t) => setLog(`Edit saved: "${t}"`)}>
            Can you pull up the open deals for Sarah Chen?
          </ChatBubble>
        </div>
      </Section>
    </>
  );
};
P['Prompt-Input'] = () => {
  const [log, setLog] = React.useState('');
  return (
    <>
      <Section title="Desktop · Default">
        <PromptInput
          onSend={v    => setLog(`Sent: "${v}"`)}
          onAttach={() => setLog('Attach clicked')}
          onMic={()    => setLog('Mic clicked')}
        />
        {log && <div style={{ marginTop: 8, fontSize: 12, color: 'var(--t1-fg-muted)' }}>{log}</div>}
      </Section>
      <Section title="Desktop · With Search Chip">
        <PromptInput showSearchChip />
      </Section>
      <Section title="Desktop · Disabled">
        <PromptInput disabled />
      </Section>
      <Section title="Desktop · Loading">
        <PromptInput loading />
      </Section>
      <Section title="Mobile · Default (inline)">
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, display: 'inline-block', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <PromptInput mobile onSend={v => setLog(`Mobile sent: "${v}"`)} />
        </div>
      </Section>
      <Section title="Mobile · With Search Chip (focus to expand)">
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, display: 'inline-block', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <PromptInput mobile showSearchChip onSend={v => setLog(`Mobile sent: "${v}"`)} />
        </div>
      </Section>
    </>
  );
};
P['Welcome'] = () => (
  <>
    <Section title="Default">
      <Welcome />
    </Section>
    <Section title="Custom name &amp; description">
      <Welcome name="Sarah" description="What can I help you with?" />
    </Section>
  </>
);
P['Suggestion-List'] = () => (
  <Section title="Suggestions · count=5">
    <SuggestionList
      items={[
        { label: 'What are my open deals?',                 icon: 'chat-circle-text' },
        { label: 'Show deals closing this week',            icon: 'chat-circle-text' },
        { label: 'Find customers not contacted in 30 days', icon: 'chat-circle-text' },
        { label: 'Draft a follow-up for the Accord deal',   icon: 'chat-circle-text' },
        { label: 'Summarize today\'s test drives',          icon: 'chat-circle-text' },
      ]}
      onSelect={(item, i) => console.log('suggestion selected', i, item)}
    />
  </Section>
);
P['App-Bar'] = () => {
  const [log, setLog] = React.useState('');
  return (
    <>
      <Section title="Interactive — click controls / layout icon to cycle variants">
        <AppBar
          onMinimize={()   => setLog('→ stickyMinimized')}
          onFullscreen={() => setLog('→ fullscreen')}
          onRestore={()    => setLog('→ panel (restored)')}
          onCollapse={()   => setLog('→ panel (collapsed)')}
          onMove={t        => setLog('→ move: ' + t)}
          onClose={()      => setLog('✕ close')}
        />
        {log && <div style={{marginTop:8,fontSize:12,color:'var(--t1-neutral-500)'}}>{log}</div>}
      </Section>
      <Section title="panel (400px) · orientation=right"><AppBar type="panel" /></Section>
      <Section title="panel · orientation=left"><AppBar type="panel" orientation="left" /></Section>
      <Section title="fullscreen (full width)"><AppBar type="fullscreen" /></Section>
      <Section title="stickyMaximized (drag grip + Move & Resize menu)"><AppBar type="stickyMaximized" /></Section>
      <Section title="stickyMinimized (drag grip + collapse)"><AppBar type="stickyMinimized" /></Section>
      <Section title="mobileDrag (drag pill + close)"><AppBar type="mobileDrag" /></Section>
    </>
  );
};
P['Side-Navigation'] = () => {
  const PINNED = [
    { id: 'pc1', label: 'Monthly Sales Review' },
    { id: 'pc2', label: 'Summarize recent hot leads' },
    { id: 'pc3', label: 'Draft quote for Model X' },
  ];
  const TASKS = [
    { id: 'rt1', label: 'Daily Sales Report' },
    { id: 'rt2', label: 'Prepare monthly performance reports' },
    { id: 'rt3', label: 'Analyze quarterly revenue trends' },
  ];
  const CHATS = [
    { id: 'rc1', label: 'Monthly Sales Review' },
    { id: 'rc2', label: 'Summarize recent hot leads' },
    { id: 'rc3', label: 'Draft quote for Model X' },
    { id: 'rc4', label: 'Last high-priority test drives' },
    { id: 'rc5', label: 'Coordinate follow-up calls with prospects' },
    { id: 'rc6', label: 'Schedule follow-up meetings' },
  ];

  return (
    <>
      <Section title="Default — Sections Expanded (190:24915)">
        <SideNavigation
          scheduledTask={false}
          sections="Expanded"
          task="Default"
          activeNav="tasks"
          pinnedChats={PINNED}
          recentChats={CHATS}
          style={{ height: 560 }}
        />
      </Section>
      <Section title="Scheduled Task — Sections Expanded">
        <SideNavigation
          scheduledTask={true}
          sections="Expanded"
          task="Default"
          activeNav="tasks"
          pinnedChats={PINNED}
          recentTasks={TASKS}
          recentChats={CHATS}
          style={{ height: 560 }}
        />
      </Section>
      <Section title="Sections Collapsed (190:25007)">
        <SideNavigation
          scheduledTask={true}
          sections="Collapsed"
          task="Collapsed"
          activeNav="tasks"
          pinnedChats={PINNED}
          recentTasks={TASKS}
          recentChats={CHATS}
          style={{ height: 560 }}
        />
      </Section>
      <Section title="Task Expanded (190:25049)">
        <SideNavigation
          scheduledTask={true}
          sections="Expanded"
          task="Expanded"
          activeNav="tasks"
          pinnedChats={PINNED}
          recentTasks={TASKS}
          recentChats={CHATS}
          style={{ height: 560 }}
        />
      </Section>
    </>
  );
};
P['Nav-Bar'] = () => (
  <>
    <Section title="Mobile — Hamburger + More (8:60377)">
      <NavBar
        title="Title"
        onMenuClick={() => {}}
        showMore={true}
        style={{ maxWidth: 400 }}
      />
    </Section>
    <Section title="Mobile — Hamburger + New Chat + More">
      <NavBar
        title="Title"
        onMenuClick={() => {}}
        showNewChat={true}
        showMore={true}
        style={{ maxWidth: 400 }}
      />
    </Section>
    <Section title="Desktop — Title + Action Button (430:41165)">
      <NavBar
        title="Task"
        actionLabel="New Task"
        actionIcon="plus"
        onAction={() => {}}
      />
    </Section>
    <Section title="Title only">
      <NavBar title="Title" />
    </Section>
  </>
);
P['Modal'] = () => {
  const [open, setOpen] = React.useState(null);
  const close = () => setOpen(null);

  /* Inline panel — renders .t1-modal without the fixed overlay, so it's
     visible directly on the page without needing to click anything. */
  const ModalPanel = ({ title, subtitle, primaryLabel, secondaryLabel, children, width = 480 }) => (
    <div className="t1-modal" style={{ width, maxWidth: '100%' }}>
      <div className="t1-modal__header">
        <div className="t1-modal__header-content">
          {title    && <p className="t1-modal__title">{title}</p>}
          {subtitle && <p className="t1-modal__subtitle">{subtitle}</p>}
        </div>
        <div className="t1-modal__close">
          <IconButton color="neutral" style="plain" size="sm" aria-label="Close">
            <Phi name="x" size={16} weight="bold" />
          </IconButton>
        </div>
      </div>
      {children && <div className="t1-modal__body">{children}</div>}
      {(primaryLabel || secondaryLabel) && (
        <div className="t1-modal__footer">
          {secondaryLabel && <Button variant="outlined" color="neutral" size="md">{secondaryLabel}</Button>}
          {primaryLabel   && <Button variant="contained" color="primary" size="md">{primaryLabel}</Button>}
        </div>
      )}
    </div>
  );

  return (
    <>
      <Section title="Title + body + footer">
        <ModalPanel title="Delete draft?" primaryLabel="Delete" secondaryLabel="Cancel">
          <p style={{ margin:0, fontSize:14, lineHeight:'20px', color:'var(--t1-neutral-700)' }}>
            This action cannot be undone. The draft will be permanently removed from your account.
          </p>
        </ModalPanel>
      </Section>

      <Section title="Title + subtitle + body + footer">
        <ModalPanel
          title="Title goes here"
          subtitle="Sub title text content will appear here."
          primaryLabel="Confirm"
          secondaryLabel="Cancel"
        >
          <p style={{ margin:0, fontSize:14, lineHeight:'20px', color:'var(--t1-neutral-700)' }}>
            Content area — add any body content here: forms, lists, rich text, etc.
          </p>
        </ModalPanel>
      </Section>

      <Section title="No footer — close button only">
        <ModalPanel title="Read-only information">
          <p style={{ margin:0, fontSize:14, lineHeight:'20px', color:'var(--t1-neutral-700)' }}>
            This modal has no footer. It is used for read-only content that requires no action other than dismissal.
          </p>
        </ModalPanel>
      </Section>

      <Section title="Narrow (360px)">
        <ModalPanel title="Confirm action" primaryLabel="OK" secondaryLabel="Cancel" width={360}>
          <p style={{ margin:0, fontSize:14, lineHeight:'20px', color:'var(--t1-neutral-700)' }}>
            Are you sure you want to proceed?
          </p>
        </ModalPanel>
      </Section>

      <Section title="Interactive — opens with full overlay backdrop">
        <Row>
          <Button onClick={() => setOpen('confirm')}>Delete confirm</Button>
          <Button variant="outlined" color="neutral" onClick={() => setOpen('info')}>Info modal</Button>
          <Button variant="outlined" color="neutral" onClick={() => setOpen('subtitle')}>With subtitle</Button>
          <Button variant="outlined" color="neutral" onClick={() => setOpen('nofoot')}>No footer</Button>
        </Row>
      </Section>

      {/* Overlay-triggered modals */}
      <Modal open={open === 'confirm'} title="Delete draft?" onClose={close} secondaryLabel="Cancel" primaryLabel="Delete" onPrimary={close}>
        <p style={{ margin:0, fontSize:14, lineHeight:'20px', color:'var(--t1-neutral-700)' }}>
          This action cannot be undone. The draft will be permanently removed.
        </p>
      </Modal>
      <Modal open={open === 'info'} title="Title goes here" onClose={close} secondaryLabel="Label" primaryLabel="Label" onPrimary={close}>
        <p style={{ margin:0, fontSize:14, lineHeight:'20px', color:'var(--t1-neutral-700)' }}>
          Content area — add any body content here: forms, lists, rich text, etc.
        </p>
      </Modal>
      <Modal open={open === 'subtitle'} title="Title goes here" subtitle="Sub title text content will appear here." onClose={close} secondaryLabel="Cancel" primaryLabel="Confirm" onPrimary={close}>
        <p style={{ margin:0, fontSize:14, lineHeight:'20px', color:'var(--t1-neutral-700)' }}>
          Modal with both a title and a subtitle in the header.
        </p>
      </Modal>
      <Modal open={open === 'nofoot'} title="Read-only info" onClose={close}>
        <p style={{ margin:0, fontSize:14, lineHeight:'20px', color:'var(--t1-neutral-700)' }}>
          This modal has no footer — only a close button in the header.
        </p>
      </Modal>
    </>
  );
};
P['Notification-Banner-Toast'] = () => (
  <>
    {/* ── Toast ─────────────────────────────────────────────────────────── */}
    <Section title="Toast · info">
      <Toast color="info" title="Update available" description="Version 2.4 will be deployed tomorrow at 9 AM." onClose={()=>{}} />
    </Section>
    <Section title="Toast · error">
      <Toast color="error" title="Submission failed" description="Please check the required fields and try again." onClose={()=>{}} />
    </Section>
    <Section title="Toast · warning">
      <Toast color="warning" title="Session expiring" description="Your session will expire in 5 minutes." onClose={()=>{}} />
    </Section>
    <Section title="Toast · success">
      <Toast color="success" title="Deal saved" description="Deal #DEAL-10042 has been saved successfully." onClose={()=>{}} />
    </Section>
    <Section title="Toast · no close button">
      <Col>
        <Toast color="info"    title="Syncing data"       description="Fetching latest records from DMS." />
        <Toast color="success" title="Payment confirmed"  description="Transaction ID: TXN-98127" />
      </Col>
    </Section>

    {/* ── Notification Banner ───────────────────────────────────────────── */}
    <Section title="Notification Banner · neutral">
      <NotificationBanner color="neutral" title="System maintenance" description="Scheduled downtime on Saturday 2–4 AM." onClose={()=>{}} />
    </Section>
    <Section title="Notification Banner · info">
      <NotificationBanner color="info" title="New feature available" description="Try the updated Deal Manager in your sidebar." onClose={()=>{}} />
    </Section>
    <Section title="Notification Banner · error">
      <NotificationBanner color="error" title="Sync failed" description="Could not connect to DMS. Retry or contact support." onClose={()=>{}} />
    </Section>
    <Section title="Notification Banner · warning">
      <NotificationBanner color="warning" title="Incomplete profile" description="Add missing fields before submitting the deal." onClose={()=>{}} />
    </Section>
    <Section title="Notification Banner · success">
      <NotificationBanner color="success" title="Deal submitted" description="Deal #DEAL-10042 is now pending finance approval." onClose={()=>{}} />
    </Section>
    <Section title="Notification Banner · no close button">
      <Col>
        <NotificationBanner color="info"    title="Read-only mode"    description="You have view-only access to this record." />
        <NotificationBanner color="warning" title="Draft auto-saved"  description="Your changes were saved automatically." />
      </Col>
    </Section>
  </>
);
P['Search'] = () => {
  const DEMO_OPTIONS = ['Acura MDX', 'BMW 5 Series', 'Chevrolet Silverado', 'Ford F-150', 'Honda Accord', 'Toyota Camry'];
  return (
    <>
      <Section title="md — default / hover / active / error / disabled">
        <div style={{ display:'flex', gap:24, alignItems:'flex-start', flexWrap:'wrap' }}>
          <div style={{ width:220 }}><Search size="md" label="Search" placeholder="Search..." /></div>
          <div style={{ width:220 }}><Search size="md" label="Search" placeholder="Search..." options={DEMO_OPTIONS} /></div>
          <div style={{ width:220 }}><Search size="md" label="Search" placeholder="Search..." error="Something went wrong" /></div>
          <div style={{ width:220 }}><Search size="md" label="Search" placeholder="Disabled" disabled={true} /></div>
        </div>
      </Section>
      <Section title="lg — default / with options / error">
        <div style={{ display:'flex', gap:24, alignItems:'flex-start', flexWrap:'wrap' }}>
          <div style={{ width:260 }}><Search size="lg" label="Search" placeholder="Search..." /></div>
          <div style={{ width:260 }}><Search size="lg" label="Search" placeholder="Search..." options={DEMO_OPTIONS} /></div>
          <div style={{ width:260 }}><Search size="lg" label="Search" placeholder="Search..." error="No results found" /></div>
        </div>
      </Section>
    </>
  );
};
P['Global-Search'] = () => (
  <>
    <Section title="AI mode — normalSearch · default (node 8:69133)">
      <GlobalSearch initialMode="ai" />
    </Section>
    <Section title="Search mode — Search · default (node 8:69136)">
      <GlobalSearch initialMode="search" />
    </Section>
    <Section title="Interactive — type in AI mode to reveal Ask button">
      <GlobalSearch onAsk={v => console.log('Ask:', v)} />
    </Section>
  </>
);
P['Dropdown'] = () => {
  const STAGES    = ['Prospect', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiating', 'Closed Won', 'Closed Lost'];
  const ASSIGNEES = ['Alice Johnson', 'Bob Smith', 'Carlos Rivera', 'Diana Park', 'Ethan Moore'];
  const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 };
  return (
    <>
      <Section title="Basic — click header to open, select to close">
        <div style={grid}>
          <Dropdown title="Deal Stage" placeholder="Select stage" items={STAGES} />
          <Dropdown title="Assigned To" placeholder="Select person" items={ASSIGNEES} />
        </div>
      </Section>

      <Section title="With search — type to filter">
        <div style={grid}>
          <Dropdown title="Deal Stage" placeholder="Select stage" items={STAGES} search />
          <Dropdown title="Assigned To" placeholder="Select person" items={ASSIGNEES} search />
        </div>
      </Section>

      <Section title="With description + search">
        <div style={{ maxWidth: 320 }}>
          <Dropdown
            title="Deal Stage"
            description="Current stage of this deal"
            placeholder="Select a stage"
            search
            items={STAGES}
          />
        </div>
      </Section>

      <Section title="With dividers">
        <div style={{ maxWidth: 280 }}>
          <Dropdown title="Deal Stage" placeholder="Select stage" items={STAGES} dividers />
        </div>
      </Section>

      <Section title="Grouped sections + search">
        <div style={{ maxWidth: 280 }}>
          <Dropdown
            title="Assign To"
            placeholder="Select a person"
            search
            sections={[
              { label: 'Sales', items: ['Alice Johnson', 'Bob Smith'] },
              { label: 'Pre-Sales', items: ['Carlos Rivera', 'Diana Park'] },
              { label: 'Management', items: ['Ethan Moore', 'Fiona Walsh'] },
            ]}
          />
        </div>
      </Section>
    </>
  );
};
P['Quote'] = () => {
  const col = { display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 };
  return (
    <>
      <Section title="Default">
        <div style={col}>
          <Quote>
            {"\"I understand you've seen higher numbers online. Those are often retail prices, not trade-in values. Let me show you the reconditioning costs and market average for this specific VIN to clarify the difference.\""}
          </Quote>
        </div>
      </Section>
      <Section title="Short quote">
        <div style={col}>
          <Quote>{"\"We'd like to test drive the Accord this weekend.\""}</Quote>
          <Quote>{"\"Can you walk me through the financing options available for the Model Y?\""}</Quote>
        </div>
      </Section>
    </>
  );
};
P['FAB-Icon'] = () => {
  const Item = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      {children}
      {label && <div style={{ fontSize: 11, color: 'var(--t1-fg-muted)' }}>{label}</div>}
    </div>
  );
  return (
    <>
      <Section title="Live — hover &amp; click to see state transitions">
        <Row>
          <Item label="default · hover · active"><FabIcon /></Item>
          <Item label="disabled"><FabIcon disabled /></Item>
        </Row>
      </Section>

      <Section title="All 3 states (Figma: default / hover / active)">
        <Row>
          <Item label="default">
            <button className="t1-fab" style={{ pointerEvents: 'none' }}>
              <svg className="t1-fab__logo" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ag1" x1="0.422607" y1="2.13244" x2="17.3755" y2="6.01376" gradientUnits="userSpaceOnUse"><stop stopColor="#25C8A5"/><stop offset="0.5" stopColor="#1B90B4"/><stop offset="1" stopColor="#1A6CC4"/></linearGradient></defs>
                <path d="M7.0275 4.57162C7.70578 3.22474 9.44818 2.13244 10.9184 2.13244H15.5774L14.3486 4.57162L11.1368 4.68878C10.2383 4.72137 9.42704 5.2367 9.01478 6.03654L6.08408 11.7288H3.42202L7.0275 4.57162Z" fill="url(#ag1)"/>
                <path d="M1.65233 2.13244L7.30849 2.13509L6.07968 4.57427H0.422607L1.65233 2.13244Z" fill="url(#ag1)"/>
                <path d="M13.9847 6.58877L11.7974 6.5923L10.5677 9.03412L12.0274 9.04204C12.2159 9.03942 12.3401 9.23674 12.2555 9.40499L10.0075 13.8675H12.6695L15.2822 8.65623C15.7623 7.69783 15.0559 6.57205 13.9838 6.58877H13.9847Z" fill="url(#ag1)"/>
              </svg>
            </button>
          </Item>
          <Item label="hover">
            <button className="t1-fab" style={{ pointerEvents: 'none', background: 'linear-gradient(98.52deg, rgb(231,252,255) 0%, rgb(243,231,205) 100%)' }}>
              <svg className="t1-fab__logo" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ag2" x1="0.422607" y1="2.13244" x2="17.3755" y2="6.01376" gradientUnits="userSpaceOnUse"><stop stopColor="#25C8A5"/><stop offset="0.5" stopColor="#1B90B4"/><stop offset="1" stopColor="#1A6CC4"/></linearGradient></defs>
                <path d="M7.0275 4.57162C7.70578 3.22474 9.44818 2.13244 10.9184 2.13244H15.5774L14.3486 4.57162L11.1368 4.68878C10.2383 4.72137 9.42704 5.2367 9.01478 6.03654L6.08408 11.7288H3.42202L7.0275 4.57162Z" fill="url(#ag2)"/>
                <path d="M1.65233 2.13244L7.30849 2.13509L6.07968 4.57427H0.422607L1.65233 2.13244Z" fill="url(#ag2)"/>
                <path d="M13.9847 6.58877L11.7974 6.5923L10.5677 9.03412L12.0274 9.04204C12.2159 9.03942 12.3401 9.23674 12.2555 9.40499L10.0075 13.8675H12.6695L15.2822 8.65623C15.7623 7.69783 15.0559 6.57205 13.9838 6.58877H13.9847Z" fill="url(#ag2)"/>
              </svg>
            </button>
          </Item>
          <Item label="active">
            <button className="t1-fab" style={{ pointerEvents: 'none', background: 'linear-gradient(98.52deg, rgb(189,247,255) 0%, rgb(245,237,201) 100%)' }}>
              <svg className="t1-fab__logo" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ag3" x1="0.422607" y1="2.13244" x2="17.3755" y2="6.01376" gradientUnits="userSpaceOnUse"><stop stopColor="#25C8A5"/><stop offset="0.5" stopColor="#1B90B4"/><stop offset="1" stopColor="#1A6CC4"/></linearGradient></defs>
                <path d="M7.0275 4.57162C7.70578 3.22474 9.44818 2.13244 10.9184 2.13244H15.5774L14.3486 4.57162L11.1368 4.68878C10.2383 4.72137 9.42704 5.2367 9.01478 6.03654L6.08408 11.7288H3.42202L7.0275 4.57162Z" fill="url(#ag3)"/>
                <path d="M1.65233 2.13244L7.30849 2.13509L6.07968 4.57427H0.422607L1.65233 2.13244Z" fill="url(#ag3)"/>
                <path d="M13.9847 6.58877L11.7974 6.5923L10.5677 9.03412L12.0274 9.04204C12.2159 9.03942 12.3401 9.23674 12.2555 9.40499L10.0075 13.8675H12.6695L15.2822 8.65623C15.7623 7.69783 15.0559 6.57205 13.9838 6.58877H13.9847Z" fill="url(#ag3)"/>
              </svg>
            </button>
          </Item>
        </Row>
      </Section>
    </>
  );
};
P['Fav-Bar-Icon'] = () => {
  const FBItem = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      {children}
      <span style={{ fontSize: 11, color: 'var(--t1-fg-muted)' }}>{label}</span>
    </div>
  );
  return (
    <Section title="Fav Bar Icon">
      <Row>
        <FBItem label="default"><FavBarIcon /></FBItem>
        <FBItem label="interactive"><FavBarIcon onClick={() => {}} /></FBItem>
      </Row>
    </Section>
  );
};
P['Gradient-Icon-Button'] = () => {
  const ico = React.createElement('i', { className: 'ph ph-sparkle', style: { fontSize: 16 } });
  return (
    <Section title="Gradient Icon Button">
      <Row>
        <GradientIconButton state="default"  aria-label="default"  icon={ico} />
        <GradientIconButton state="hover"    aria-label="hover"    icon={ico} />
        <GradientIconButton state="active"   aria-label="active"   icon={ico} />
        <GradientIconButton state="disabled" aria-label="disabled" icon={ico} />
      </Row>
    </Section>
  );
};
P['Feedback-Action'] = () => {
  const [log, setLog] = React.useState('');
  return (
    <>
      <Section title="Interactive — click to try all states">
        <FeedbackAction
          filterCount={3}
          sourceCount={5}
          onCopy={()       => setLog('Copied to clipboard!')}
          onThumbUp={v     => setLog(v ? '👍 Marked as helpful'     : 'Helpful rating removed')}
          onThumbDown={v   => setLog(v ? '👎 Marked as not helpful' : 'Not-helpful rating removed')}
          onMore={()       => setLog('More options clicked')}
          onRegenerate={() => setLog('Regenerating response…')}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: 'var(--t1-fg-muted)', minHeight: 18 }}>{log || 'Click any action above'}</div>
      </Section>
      <Section title="Default (Figma reference — 1 filter, 1 source)">
        <FeedbackAction />
      </Section>
      <Section title="Without chips">
        <FeedbackAction showFilter={false} showSource={false} />
      </Section>
    </>
  );
};
P['Empty'] = () => {
  const center = { display: 'flex', justifyContent: 'center' };
  const w      = { width: 260 };
  return (
    <>
      <Section title="Full — title + description + buttons + link">
        <div style={center}><div style={w}>
          <Empty
            icon="image-broken"
            title="Title"
            description="Placeholder text describing the purpose of this empty state."
            secondaryLabel="Button"
            primaryLabel="Button"
            helpText="Need help?"
            linkText="Contact support"
          />
        </div></div>
      </Section>

      <Section title="Title + Description">
        <div style={center}><div style={w}>
          <Empty
            icon="magnifying-glass"
            title="No results found"
            description="Try adjusting your search or filters to find what you're looking for."
          />
        </div></div>
      </Section>

      <Section title="Title only">
        <div style={center}><div style={w}>
          <Empty icon="folder-open" title="Nothing here yet" />
        </div></div>
      </Section>

      <Section title="With primary action">
        <div style={center}><div style={w}>
          <Empty
            icon="plus-circle"
            title="No items yet"
            description="Get started by creating your first item."
            primaryLabel="Create item"
          />
        </div></div>
      </Section>

      <Section title="Both actions, no link">
        <div style={center}><div style={w}>
          <Empty
            icon="cloud-slash"
            title="Connection lost"
            description="We couldn't load your data. Please try again."
            secondaryLabel="Dismiss"
            primaryLabel="Retry"
            linkText=""
          />
        </div></div>
      </Section>
    </>
  );
};
P['Message-Draft'] = () => (
  <>
    <Section title="Interactive — click content then Send">
      <MessageDraft />
    </Section>
    <Section title="Custom recipient">
      <MessageDraft
        to="Marcus Webb"
        body={"Hi Marcus,\n\nJust confirming your appointment on Friday at 2 PM for the trade-in appraisal.\n\nSee you then!\nDean"}
      />
    </Section>
  </>
);
P['Tip-Card'] = () => (<Section title="Tip"><TipCard /></Section>);
P['Task-Card'] = () => (<Section title="Task"><TaskCard /></Section>);
P['Deal-Card'] = () => (<Section title="Deal"><DealCard /></Section>);
P['Listing-Card'] = () => {
  /* Items array — any length. Component renders all rows dynamically. */
  const ITEMS = [
    { initials: 'MW', title: 'Marcus Webb',  id: '#DL-2841', chip: 'Hot Lead',
      subtitle1: 'Sales Consultant', subtitle2: 'Downtown Toyota',
      description: 'marcus.webb@tekion.com',
      suffixLabel: 'Last contact', suffixDetail: '2h ago' },
    { initials: 'AS', title: 'Anna Stone',   id: '#DL-2842',
      subtitle1: 'Finance Manager',  subtitle2: 'Bay Honda',
      description: 'anna.stone@bayhonda.com',
      suffixLabel: 'Last contact', suffixDetail: 'Yesterday' },
    { initials: 'TK', title: 'Tom Kim',      id: '#DL-2843', chip: 'New',
      subtitle1: 'GM',               subtitle2: 'Sunrise Ford',
      description: 'tom.kim@sunriseford.com',
      suffixLabel: 'Last contact', suffixDetail: '3 days' },
    { initials: 'SL', title: 'Sarah Lee',    id: '#DL-2844', chip: 'Hot',
      subtitle1: 'Sales Consultant', subtitle2: 'Metro Chevy',
      description: 'sarah.lee@metrochevy.com',
      suffixLabel: 'Last contact', suffixDetail: '1h ago' },
    { initials: 'RP', title: 'Ryan Park',    id: '#DL-2845',
      subtitle1: 'BDC Manager',     subtitle2: 'Eastside Nissan',
      description: 'ryan.park@eastnissan.com',
      suffixLabel: 'Last contact', suffixDetail: '4 days' },
  ];

  return (
    <>
      {/* expanded=true — avatar prefix, any number of rows */}
      <Section title="expanded=true">
        <div style={{ maxWidth: 780 }}>
          <ListingCard
            expanded={true}
            onItemClick={(item) => alert('Clicked: ' + item.title)}
            items={ITEMS}
          />
        </div>
      </Section>

      {/* expanded=false — compact, no avatar */}
      <Section title="expanded=false">
        <div style={{ maxWidth: 360 }}>
          <ListingCard expanded={false} items={ITEMS} />
        </div>
      </Section>

      {/* Suffix nested properties */}
      <Section title="Suffix — label / detail toggles">
        <div style={{ display:'flex', gap:24, flexWrap:'wrap', alignItems:'flex-start' }}>
          {[
            { label: 'label + detail', suffixLabel: 'Label',     suffixDetail: 'Detail'  },
            { label: 'detail only',    suffixLabel: undefined,   suffixDetail: '$42,500' },
            { label: 'label only',     suffixLabel: '2 days ago',suffixDetail: undefined },
            { label: 'no suffix',      suffixLabel: undefined,   suffixDetail: undefined },
          ].map(({ label, suffixLabel, suffixDetail }) => (
            <div key={label}>
              <div style={{ fontSize:11, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', color:'#969aa3', marginBottom:8 }}>{label}</div>
              <div style={{ width: 340 }}>
                <ListingCard expanded={false} items={[{
                  initials:'CN', title:'Title', id:'#123', chip:'Chip',
                  subtitle1:'Subtitle1', subtitle2:'Subtitle2',
                  description:'Description1',
                  suffixLabel, suffixDetail,
                }]} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Chip prop */}
      <Section title="Chip — present / absent">
        <div style={{ display:'flex', gap:24, flexWrap:'wrap', alignItems:'flex-start' }}>
          <div>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', color:'#969aa3', marginBottom:8 }}>with chip</div>
            <div style={{ maxWidth: 500 }}>
              <ListingCard expanded={true} items={[
                { initials:'JD', title:'John Doe', id:'#456', chip:'New',
                  subtitle1:'2024 Honda Accord', subtitle2:'Silver',
                  description:'john.doe@tekion.com', suffixLabel:'1h ago', suffixDetail:'$42,500' },
              ]} />
            </div>
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', color:'#969aa3', marginBottom:8 }}>no chip</div>
            <div style={{ maxWidth: 500 }}>
              <ListingCard expanded={true} items={[
                { initials:'JD', title:'John Doe', id:'#456',
                  subtitle1:'2024 Honda Accord', subtitle2:'Silver',
                  description:'john.doe@tekion.com', suffixLabel:'1h ago', suffixDetail:'$42,500' },
              ]} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};
P['Credit-Score-Card'] = () => (<Section title="Credit score"><CreditScoreCard /></Section>);
P['Completion-Card'] = () => (<Section title="Completion"><CompletionCard /></Section>);
P['Conversation-History-Card'] = () => (<Section title="History"><Col><ConversationHistoryCard /><ConversationHistoryCard title="Inventory gap analysis" when="Yesterday" preview="Found 12 models below target stock level" /></Col></Section>);
P['Notify-My-Card'] = () => (
  <>
    <Section title="Default — click to notify">
      <NotifyMyCard />
    </Section>
    <Section title="Notified">
      <NotifyMyCard notified={true} />
    </Section>
    <Section title="Custom copy">
      <NotifyMyCard
        heading="Generating your deal summary is taking longer than expected."
        description="We'll send you a notification once the summary is ready."
        actionLabel="Notify me when done"
      />
    </Section>
  </>
);
P['Planner-Card'] = () => {
  const completedLists = [
    {
      label: '1. List',
      items: [
        { text: 'Select Customer',        checked: true },
        { text: 'Draft follow-up SMS',     checked: true },
        { text: 'Check inventory status',  checked: true },
        { text: 'Schedule test drive',     checked: true },
        { text: 'Send calendar invite',    checked: true },
      ],
    },
    {
      label: '2. List',
      items: [
        { text: 'Prepare trade-in quote',   checked: true },
        { text: 'Run credit pre-check',     checked: true },
        { text: 'Review financing options',  checked: true },
        { text: 'Confirm delivery date',     checked: true },
        { text: 'Schedule follow-up call',   checked: true },
      ],
    },
  ];
  return (
    <>
      <Section title="Default — in progress">
        <PlannerCard />
      </Section>
      <Section title="Completed — all done">
        <PlannerCard title="Flora Fleisher: Action Plan" lists={completedLists} />
      </Section>
      <Section title="Single list">
        <PlannerCard
          title="Quick Follow-up"
          lists={[{ label: '1. List', items: [
            { text: 'Call customer',        checked: true  },
            { text: 'Send quote via email', checked: false },
            { text: 'Log in CRM',           checked: false },
          ]}]}
        />
      </Section>
    </>
  );
};
P['Reasoning-Log'] = () => (
  <>
    <Section title="In Progress">
      <ReasoningLog inProgress={true} interrupted={false} />
    </Section>
    <Section title="Done">
      <ReasoningLog inProgress={false} interrupted={false} />
    </Section>
    <Section title="Interrupted">
      <ReasoningLog inProgress={false} interrupted={true} />
    </Section>
  </>
);
P['Document-Card'] = () => (
  <>
    <Section title="Default (Figma)">
      <DocumentCard />
    </Section>
    <Section title="Document reference">
      <DocumentCard
        title="Vehicle Inspection Report"
        icon="file-text"
        subtitles={['PDF', '2.4 MB', 'Updated today']}
        links={[{ label: 'View', href: '#' }, { label: 'Download', href: '#' }]}
      />
    </Section>
    <Section title="Contract">
      <DocumentCard
        title="Sales Agreement — DEAL-10042"
        icon="file-doc"
        subtitles={['DOCX', 'Draft', 'Awaiting signature']}
        links={[{ label: 'Open', href: '#' }, { label: 'Sign', href: '#' }]}
      />
    </Section>
    <Section title="No subtitles">
      <DocumentCard
        title="Proof of Insurance"
        icon="shield-check"
        subtitles={[]}
        links={[{ label: 'View', href: '#' }, { label: 'Replace', href: '#' }]}
      />
    </Section>
  </>
);
P['Response'] = () => (
  <Section title="Full response">
    <Response
      title="Summary text"
      filterCount={2}
      sourceCount={2}
    >
      Based on your open pipeline, 3 deals need attention this afternoon. Sarah Chen is ready to close — she responded positively to the financing terms. Michael Rodriguez is waiting for the trade-in appraisal. David Park asked for a callback by 4 PM.
    </Response>
    <br />
    <Response
      title="Pipeline Summary"
      orderedList={['Follow up with Sarah Chen on financing terms', 'Get trade-in appraisal for Rodriguez deal', 'Call David Park before 4 PM']}
      filterCount={1}
      sourceCount={3}
    />
    <br />
    <Response
      title="Action Items"
      unorderedList={['Review open deals in CRM', 'Update deal stages for today\'s meetings', 'Send follow-up emails to warm leads']}
      showFilter={false}
      sourceCount={2}
    />
  </Section>
);
P['Chat-Container'] = () => (
  <>
    <Section title="messages prop (structured)">
      <ChatContainer messages={[
        { role: 'user',      content: 'Who are my hot leads today?' },
        { role: 'assistant', title: 'Top Leads Today', content: 'Based on engagement score and deal stage, here are your top 3 leads for today.', filterCount: 1, sourceCount: 3 },
        { role: 'user',      content: "Can you show me Sarah Chen's deal details?" },
        { role: 'assistant', title: 'Sarah Chen — Deal Summary', content: 'Sarah Chen is interested in a 2024 Honda Accord EX. Deal score 94 — highest in your pipeline.', filterCount: 2, sourceCount: 2 },
      ]} />
    </Section>
    <Section title="children passthrough (auto role-detection)">
      <ChatContainer>
        <ChatBubble role="user">What's the status of my open deals?</ChatBubble>
        <Response role="assistant" title="Open Deals Summary" filterCount={2} sourceCount={4}>
          You have 12 open deals totaling $840K. 3 are in final negotiation.
        </Response>
        <ChatBubble role="user">Which ones need follow-up this week?</ChatBubble>
        <Response role="assistant" title="Priority Follow-ups" filterCount={1} sourceCount={2}>
          Focus on Johnson Family Motors (expires Friday) and Westside Auto Group (waiting on trade-in appraisal).
        </Response>
      </ChatContainer>
    </Section>
  </>
);
P['Link'] = () => (<Section title="Links"><Row><Link>Default link</Link><Link underlined>Underlined link</Link><Link size="small">Small</Link><Link size="large">Large</Link><Link appearance="neutral">Neutral</Link></Row></Section>);
P['Interactive-Icon'] = () => {
  const Ico = ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  );
  const icoSize = { xs:10, sm:12, md:14, lg:16, xl:20 };
  const SIZES  = ['xs','sm','md','lg','xl'];
  const STATES = ['default','hover','active','disabled'];
  const COLORS = ['neutral','primary','error'];
  const colSub = { fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--t1-fg-muted)', marginBottom: 12 };
  return (
    <Section title="Interactive Icon">
      {COLORS.map(color => (
        <div key={color} style={{ marginBottom: 24 }}>
          <div style={colSub}>{color}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(5,auto)', gap: '10px 16px', alignItems: 'center' }}>
            <div/>
            {SIZES.map(s => <span key={s} style={{ fontSize: 10, color: 'var(--t1-fg-muted)', textAlign: 'center' }}>{s}</span>)}
            {STATES.map(state => (
              <React.Fragment key={state}>
                <span style={{ fontSize: 10, color: 'var(--t1-fg-muted)', whiteSpace: 'nowrap' }}>{state}</span>
                {SIZES.map(size => (
                  <InteractiveIcon key={size} color={color} size={size} states={state}
                    aria-label={`${color} ${size} ${state}`}
                    icon={<Ico size={icoSize[size]}/>}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </Section>
  );
};
P['Seperator'] = () => (<>
  <Section title="Horizontal (fullWidth)"><Separator /></Section>
  <Section title="Horizontal (inset)"><Separator variant="inset" /></Section>
  <Section title="Vertical"><div style={{display:'flex', alignItems:'center', gap: 12, height: 20}}><span>Before</span><Separator orientation="vertical" /><span>After</span></div></Section>
  <Section title="Pipe"><div style={{display:'flex', alignItems:'center', gap: 12, height: 20}}><span>Label A</span><Separator orientation="vertical" variant="pipe" /><span>Label B</span></div></Section>
</>);
P['Divider'] = P['Seperator'];
P['Progress-Bar'] = () => {
  const [val, setVal] = React.useState(35);
  const sliderStyle = {
    WebkitAppearance: 'none', appearance: 'none',
    flex: 1, height: 4, borderRadius: 9999,
    background: `linear-gradient(to right, #4285f4 ${val}%, #d4d5d6 ${val}%)`,
    outline: 'none', cursor: 'pointer', border: 'none',
  };
  return (
    <>
      <Section title="Interactive — drag slider to adjust">
        <div style={{ maxWidth: 400 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <input
              type="range" min={0} max={100} value={val}
              onChange={e => setVal(Number(e.target.value))}
              style={sliderStyle}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--t1-fg)', minWidth: 36, textAlign: 'right' }}>{val}%</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <ProgressBar value={val} label="Upload progress" color="brand" />
            <ProgressBar value={val} label="Tasks completed" color="success" />
          </div>
        </div>
      </Section>
      <Section title="Brand · 0 / 25 / 50 / 75 / 100">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
          {[0, 25, 50, 75, 100].map(v => <ProgressBar key={v} value={v} label="Label" color="brand" />)}
        </div>
      </Section>
      <Section title="Success · 0 / 25 / 50 / 75 / 100">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
          {[0, 25, 50, 75, 100].map(v => <ProgressBar key={v} value={v} label="Label" color="success" />)}
        </div>
      </Section>
      <Section title="Without label">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
          <ProgressBar value={val} color="brand" />
          <ProgressBar value={val} color="success" />
        </div>
      </Section>
      <Section title="Indeterminate">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
          <ProgressBar determinate={false} color="brand" />
          <ProgressBar determinate={false} color="success" />
        </div>
      </Section>
    </>
  );
};

/* ---------- shell ---------- */
function App() {
  const initial = (typeof localStorage !== 'undefined' && localStorage.getItem('t1-kit-page')) || 'Button';
  const [activeId, setActiveId] = React.useState(initial);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => { localStorage.setItem('t1-kit-page', activeId); }, [activeId]);

  const filtered = PAGES.filter(p => !search || p.id.toLowerCase().includes(search.toLowerCase()));
  const grouped = filtered.reduce((acc, p) => { (acc[p.group] = acc[p.group] || []).push(p); return acc; }, {});
  const activePage = PAGES.find(p => p.id === activeId) || PAGES[0];
  const Component = P[activePage.id];

  return (
    <div className="kit-app">
      <aside className="kit-sidenav">
        <div className="kit-brand">
          <div className="kit-brand-mark"><img src="../assets/T1.svg" width="18" height="14" alt="T1" style={{ display: 'block' }} /></div>
          <div>
            <div className="kit-brand-title">T1 Design System</div>
            <div className="kit-brand-sub">UI Kit · {PAGES.length} components</div>
          </div>
        </div>
        <div className="kit-search">
          <Icon name="search" size={14} />
          <input placeholder="Search components…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {GROUP_ORDER.filter(g => grouped[g]).map(group => (
          <div key={group}>
            <div className="kit-nav-group-title">{group}</div>
            {grouped[group].map(p => (
              <div key={p.id} className={`kit-nav-item ${p.status} ${p.id === activeId ? 'active' : ''}`}
                onClick={() => setActiveId(p.id)}>
                <span className="dot" />
                <span>{p.id}</span>
              </div>
            ))}
          </div>
        ))}
      </aside>

      <main className="kit-main">
        <div className="kit-page-head">
          <h1 className="kit-page-title">{activePage.id}</h1>
        </div>
        {Component ? <Component /> : (
          <div className="kit-stub">
            <strong>{activePage.id}</strong>
            <em>No implementation yet — see Figma /{activePage.id}</em>
          </div>
        )}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
