/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   FAB-ICON — AI Chat Floating Action Button
   Figma: /T1-Components    (aiT1ChatFab component set)

   Shape     32 × 32 px · border-radius 24px (rounded square, not circle)
   States    default · hover · active  — handled by CSS pseudo-classes
   Icon      aiLogoT1  (16 × 16 px, inline SVG from assets/aiLogoT1.svg)

   Props
   ─────────────────────────────────────────────────────────────────────────
   disabled  boolean  — muted, pointer-events off
   onClick   fn       — click handler
   className string   — extra class names
   ========================================================================== */

/* ── Inline aiLogoT1 SVG ─────────────────────────────────────────────────── */
/*   Uses a unique gradient ID per instance to avoid conflicts when           */
/*   multiple FABs appear on the same page.                                   */
let _fabLogoCounter = 0;
const AiLogoT1 = ({ size = 16 }) => {
  const id = React.useRef('fab-g-' + (++_fabLogoCounter)).current;
  return (
    <svg
      className="t1-fab__logo"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0.422607" y1="2.13244" x2="17.3755" y2="6.01376" gradientUnits="userSpaceOnUse">
          <stop stopColor={`rgb(${37},${200},${165})`} />
          <stop offset="0.5" stopColor={`rgb(${27},${144},${180})`} />
          <stop offset="1" stopColor={`rgb(${26},${108},${196})`} />
        </linearGradient>
      </defs>
      <path
        d="M7.0275 4.57162C7.70578 3.22474 9.44818 2.13244 10.9184 2.13244H15.5774L14.3486 4.57162L11.1368 4.68878C10.2383 4.72137 9.42704 5.2367 9.01478 6.03654L6.08408 11.7288H3.42202L7.0275 4.57162Z"
        fill={`url(#${id})`}
      />
      <path
        d="M1.65233 2.13244L7.30849 2.13509L6.07968 4.57427H0.422607L1.65233 2.13244Z"
        fill={`url(#${id})`}
      />
      <path
        d="M13.9847 6.58877L11.7974 6.5923L10.5677 9.03412L12.0274 9.04204C12.2159 9.03942 12.3401 9.23674 12.2555 9.40499L10.0075 13.8675H12.6695L15.2822 8.65623C15.7623 7.69783 15.0559 6.57205 13.9838 6.58877H13.9847Z"
        fill={`url(#${id})`}
      />
    </svg>
  );
};

/* ── FabIcon component ───────────────────────────────────────────────────── */
const FabIcon = ({
  disabled  = false,
  onClick,
  className,
  ...rest
}) => {
  const cls = [
    't1-fab',
    disabled ? 'is-disabled' : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={cls}
      disabled={disabled}
      onClick={onClick}
      type="button"
      aria-label="Open AI assistant"
      {...rest}
    >
      <AiLogoT1 size={16} />
    </button>
  );
};
