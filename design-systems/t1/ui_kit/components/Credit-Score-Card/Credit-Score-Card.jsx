/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   CREDIT-SCORE-CARD  (Figma: )
   BEM prefix: t1-csc

   Props
   ─────────────────────────────────────────────────────────────────────────
   score          number    credit score 300–850          default: 745
   maxApproval    string    max loan amount               default: '$65,000'
   eligibleApr    string    eligible APR                  default: '3.99%'
   showChip       boolean   show "Tier 1 Qualified" chip  default: true
   chipLabel      string    chip text                     default: 'Tier 1 Qualified'
   onDownload     function  Download button callback
   onApply        function  Apply to Deal button callback
   className      string    extra class

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Button  — "Download" (contained neutral) + "Apply to Deal" (contained primary)

   Animation
   ─────────────────────────────────────────────────────────────────────────
   • Score counter animates from 300 → target over 1.4 s (ease-out cubic)
   • Handle slides along the arc in sync with the counter via requestAnimationFrame
   • "Tier 1 Qualified" chip fades + slides in after 1.2 s delay (CSS transition)

   Arc segment approach
   ─────────────────────────────────────────────────────────────────────────
   • 6 equal-angular segments (each ≈ 30°) — equal visual weight on the gauge
   • HALF_GAP = 12 score pts pulled back from every internal boundary so that
     adjacent strokeLinecap="round" caps produce a clean ~3–4 px gap between
     segments, exactly matching the Figma pill-shaped band design
   • sweep=1 selects the correct outer (top) arc using center (135, 125)
   ========================================================================== */

(function () {

  const ARC_CX = 135, ARC_CY = 125, ARC_R = 120, ARC_SW = 14;
  const MIN_S = 300, MAX_S = 850;

  /*
   * Equal-angular segment boundaries (raw, before gap inset):
   *   550 pts ÷ 6 ≈ 91.67 pts each → boundaries 300, 392, 483, 575, 667, 758, 850
   *
   * HALF_GAP = 12 pts pulled from each side of every internal boundary.
   * With ARC_R=120 and strokeWidth=14 (cap radius 7), a 12-pt inset on each
   * side creates ~24 pts of dead space = 7.9° of arc = 16.5 px, so the two
   * adjacent round caps (each 7 px) leave ≈ 2.5 px of clear background between
   * them — the subtle gap seen in the Figma.
   */
  const G = 12; // half-gap score points
  const ARC_SEGMENTS = [
    { s1: 300,     s2: 392 - G, color: '#8B2020' }, // maroon   300 → 380
    { s1: 392 + G, s2: 483 - G, color: '#F52F1D' }, // red      404 → 471
    { s1: 483 + G, s2: 667 - G, color: '#F5C03A' }, // yellow   495 → 655  (merged orange+amber)
    { s1: 667 + G, s2: 758 - G, color: '#7BC86C' }, // lt-green 679 → 746
    { s1: 758 + G, s2: 850,     color: '#06BC75' }, // green    770 → 850
  ];

  /* Convert credit score → SVG angle (180° at score 300, 0° at score 850) */
  function scoreToAngle(s) {
    return 180 - ((s - MIN_S) / (MAX_S - MIN_S)) * 180;
  }

  /* Polar → SVG cartesian (y-axis inverted in SVG) */
  function polar(deg) {
    const rad = (deg * Math.PI) / 180;
    return {
      x: +(ARC_CX + ARC_R * Math.cos(rad)).toFixed(4),
      y: +(ARC_CY - ARC_R * Math.sin(rad)).toFixed(4),
    };
  }

  /*
   * SVG arc path from score s1 → s2.
   * sweep=1 (CW in SVG) selects the top semicircle using center (ARC_CX, ARC_CY).
   * large-arc-flag=0 always; all segments are < 30° so always the minor arc.
   */
  function arcPath(s1, s2) {
    const p1 = polar(scoreToAngle(s1));
    const p2 = polar(scoreToAngle(s2));
    return `M ${p1.x} ${p1.y} A ${ARC_R} ${ARC_R} 0 0 1 ${p2.x} ${p2.y}`;
  }

  /* Score → arc segment / handle ring color (vivid, matches the arc band) */
  function getScoreColor(s) {
    if (s >= 770) return '#06BC75';
    if (s >= 690) return '#7BC86C';
    if (s >= 510) return '#F5C03A'; // merged yellow band
    if (s >= 420) return '#F52F1D';
    return '#8B2020';
  }

  /*
   * Score → rating label text color.
   * Uses darker semantic tones for legibility inside the gauge.
   * Excellent (#057a4c) is the Figma-confirmed value; others follow the same
   * "dark variant of the arc hue" pattern.
   */
  function getScoreLabelColor(s) {
    if (s >= 740) return '#057a4c'; // Excellent — Figma token confirmed
    if (s >= 670) return '#2d9154'; // Good
    if (s >= 580) return '#b55c00'; // Fair
    return '#c0291a';               // Poor
  }

  /* Score → rating label */
  function getScoreLabel(s) {
    if (s >= 740) return 'Excellent Score';
    if (s >= 670) return 'Good Score';
    if (s >= 580) return 'Fair Score';
    return 'Poor Score';
  }

  /* ── CreditScoreGauge — the animated SVG arc ─────────────────────────────── */
  const CreditScoreGauge = ({ targetScore }) => {
    const [displayed, setDisplayed] = React.useState(MIN_S);
    const rafRef = React.useRef(null);

    React.useEffect(() => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const startTime = performance.now();
      const from = MIN_S;
      const to   = targetScore;
      const duration = 1400;

      const tick = (now) => {
        const t = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        setDisplayed(Math.round(from + (to - from) * eased));
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafRef.current);
    }, [targetScore]);

    const handle     = polar(scoreToAngle(displayed));
    const scoreColor = getScoreColor(displayed);
    const scoreLabel = getScoreLabel(displayed);

    return (
      <svg
        className="t1-csc__arc"
        viewBox="0 0 270 145"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`Credit score ${displayed} — ${scoreLabel}`}
      >
        {/*
         * ── 6 pill-shaped arc segments ────────────────────────────────────
         * Each segment uses strokeLinecap="round" so both ends are naturally
         * rounded, matching the Figma pill/capsule design.
         * The HALF_GAP insets in ARC_SEGMENTS ensure adjacent round caps do
         * NOT touch — a clean ~3 px background gap shows between each band.
         * sweep=1 draws the correct outward-facing (top) semicircle.
         */}
        {ARC_SEGMENTS.map(seg => (
          <path
            key={seg.s1}
            d={arcPath(seg.s1, seg.s2)}
            fill="none"
            stroke={seg.color}
            strokeWidth={ARC_SW}
            strokeLinecap="round"
          />
        ))}

        {/* ── Handle: white filled circle + thick colored ring (no center dot) ── */}
        <circle cx={handle.x} cy={handle.y} r="12" fill="white" />
        <circle cx={handle.x} cy={handle.y} r="9.5" fill="none" stroke={scoreColor} strokeWidth="5" />

        {/* ── Score number ── */}
        <text
          x="135" y="82"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="32"
          fontWeight="600"
          fill="#444f5c"
          style={{ fontFamily: 'inherit' }}
        >
          {displayed}
        </text>

        {/* ── Score rating label ── */}
        <text
          x="135" y="110"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="14"
          fontWeight="500"
          fill={getScoreLabelColor(displayed)}
          style={{ fontFamily: 'inherit' }}
        >
          {scoreLabel}
        </text>

        {/* ── Range labels (positioned below arc endpoints) ── */}
        <text
          x="15" y="138"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="12"
          fontWeight="400"
          fill="#969aa3"
          style={{ fontFamily: 'inherit' }}
        >
          300
        </text>
        <text
          x="255" y="138"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="12"
          fontWeight="400"
          fill="#969aa3"
          style={{ fontFamily: 'inherit' }}
        >
          850
        </text>
      </svg>
    );
  };

  /* ── CreditScoreCard ─────────────────────────────────────────────────────── */
  window.CreditScoreCard = ({
    score        = 745,
    maxApproval  = '$65,000',
    eligibleApr  = '3.99%',
    showChip     = true,
    chipLabel    = 'Tier 1 Qualified',
    onDownload,
    onApply,
    className,
    ...rest
  }) => {
    /* Chip fades in after the score animation finishes (1.2 s delay set in CSS) */
    const [chipReady, setChipReady] = React.useState(false);
    React.useEffect(() => {
      setChipReady(false);
      const t = setTimeout(() => setChipReady(true), 50);
      return () => clearTimeout(t);
    }, [score]);

    return (
      <div className={['t1-csc', className].filter(Boolean).join(' ')} {...rest}>

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="t1-csc__header">CREDIT PRE-QUALIFICATION</div>

        {/* ── Body ────────────────────────────────────────────────────────── */}
        <div className="t1-csc__body">

          {/* Score estimate label */}
          <div className="t1-csc__est-label">SCORE ESTIMATE</div>

          {/* Gauge + qualification chip */}
          <div className="t1-csc__gauge">
            <CreditScoreGauge targetScore={score} />
            {showChip && (
              <span
                className={[
                  't1-csc__qual-chip',
                  chipReady ? '' : 't1-csc__qual-chip--hidden',
                ].filter(Boolean).join(' ')}
                role="status"
              >
                {chipLabel}
              </span>
            )}
          </div>

          {/* Stat mini-cards */}
          <div className="t1-csc__stats">
            <div className="t1-csc__stat">
              <div className="t1-csc__stat-label">MAX APPROVAL</div>
              <div className="t1-csc__stat-value">{maxApproval}</div>
            </div>
            <div className="t1-csc__stat">
              <div className="t1-csc__stat-label">ELIGIBLE APR</div>
              <div className="t1-csc__stat-value t1-csc__stat-value--apr">{eligibleApr}</div>
            </div>
          </div>

        </div>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <div className="t1-csc__footer">
          <Button
            variant="contained"
            color="neutral"
            size="md"
            onClick={onDownload}
          >
            Download
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="md"
            onClick={onApply}
          >
            Apply to Deal
          </Button>
        </div>

      </div>
    );
  };

})();
