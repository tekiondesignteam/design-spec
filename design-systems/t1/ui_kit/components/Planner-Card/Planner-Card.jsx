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
