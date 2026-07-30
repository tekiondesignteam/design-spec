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
