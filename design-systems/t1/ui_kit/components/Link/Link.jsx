/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   LINK — from /Link
   ========================================================================== */
const Link = ({ children, href = '#', underlined = false, size = 'medium', appearance = 'primary' }) => (
  <a href={href} className={`t1-link t1-link--${size} t1-link--${appearance}${underlined ? ' is-underlined' : ''}`}>{children}</a>
);
