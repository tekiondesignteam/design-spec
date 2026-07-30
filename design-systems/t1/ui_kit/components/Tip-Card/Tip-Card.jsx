/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   TIP-CARD — from /Tip-Card (4:420)
   BackgroundColorSuccessRadiusMd: bg rgb(239,250,238), border rgb(6,188,117),
   radius 6. Type=tip (64h) or Type=insight (96h). Content: green label + green body.
   ========================================================================== */
const TipCard = ({
  type = 'tip',
  body = type === 'insight'
    ? 'She is currently comparing offer with a competitor\u2019s AeroVibe inventory. Focus on her specific requirement to differentiate'
    : 'Shift the focus to the tax savings she gets by trading in vs. selling privately.',
}) => {
  const label = type === 'insight' ? 'AI Insight:' : 'Tip:';
  return (
    <div className={`t1-tip-v2 t1-tip-v2--${type}`}>
      <span className="t1-tip-v2__label">{label}</span>
      <span className="t1-tip-v2__body">{body}</span>
    </div>
  );
};
