/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   SEPARATOR / DIVIDER — from /Seperator and /Divider
   ========================================================================== */
const Separator = ({ orientation = 'horizontal', variant = 'fullWidth' }) => (
  <div className={`t1-sep t1-sep--${orientation} t1-sep--${variant}`} />
);
const Divider = Separator;
