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
