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
