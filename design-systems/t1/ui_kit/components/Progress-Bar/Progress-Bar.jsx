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
