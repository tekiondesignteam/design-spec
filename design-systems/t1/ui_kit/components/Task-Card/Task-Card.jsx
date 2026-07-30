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
