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
