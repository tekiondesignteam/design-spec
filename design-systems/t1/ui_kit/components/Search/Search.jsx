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
