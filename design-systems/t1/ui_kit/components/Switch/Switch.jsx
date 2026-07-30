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
