/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   FAV-BAR-ICON — AI Sidebar Favourite Bar Item
   Figma: /T1-Components    (aiT1FavBarItem)

   Container   56px tall · 12px h-pad · 6px v-pad · flex-column centre
   Logo tile   40×40px · border-radius 4px · brand gradient background
   T1 mark     24×18px white SVG wordmark centred inside tile
   ========================================================================== */

const T1LogoWhite = () => (
  <svg
    className="t1-favbar-icon__logo"
    width="24"
    height="18"
    viewBox="0 0 24 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M10.4468 3.74071C11.5196 1.67514 14.2755 0 16.6009 0H23.9699L22.0263 3.74071L16.9464 3.92038C15.5252 3.97036 14.242 4.76066 13.59 5.9873L8.95458 14.7169H4.74408L10.4468 3.74071Z" fill="white"/>
    <path d="M1.94501 0L10.8912 0.00405277L8.94763 3.74476H0L1.94501 0Z" fill="white"/>
    <path d="M21.4507 6.83419L17.9912 6.8396L16.0462 10.5844L18.3549 10.5965C18.6531 10.5925 18.8495 10.8951 18.7158 11.1531L15.1601 17.9969H19.3706L23.503 10.0048C24.2624 8.53504 23.145 6.80856 21.4494 6.83419H21.4507Z" fill="white"/>
  </svg>
);

const FavBarIcon = ({ onClick, className, 'aria-label': ariaLabel, ...rest }) => (
  <div
    className={['t1-favbar-icon', className || ''].filter(Boolean).join(' ')}
    onClick={onClick}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    aria-label={ariaLabel || 'T1 AI assistant'}
    onKeyDown={onClick ? (e => { if (e.key === 'Enter' || e.key === ' ') onClick(e); }) : undefined}
    {...rest}
  >
    <div className="t1-favbar-icon__tile">
      <T1LogoWhite />
    </div>
  </div>
);
