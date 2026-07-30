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
