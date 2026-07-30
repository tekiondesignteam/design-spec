import { useBrand } from '../../context/BrandContext'

type Variant = 'vdp' | 'account' | 'configurator'
type Viewport = 'desktop' | 'tablet' | 'mobile'

/* ---- Inline icons (currentColor) --------------------------------------- */

function AdChoicesIcon() {
  // AdChoices registered self-regulatory mark — always the official teal #00AECD
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.26878 15.8351C3.04198 15.8351 3.58322 15.4392 4.12445 15.1225C4.58837 14.8849 5.05229 14.5682 5.59353 14.3307C8.06775 12.9847 10.542 11.5596 13.0162 10.1344C13.7894 9.73856 14.7946 9.34268 15.3358 8.6301C15.4904 8.39258 15.7224 8.07588 15.6451 7.68C15.4131 6.80907 14.3306 6.49237 13.6348 6.0965C11.9337 5.14639 10.1554 4.11711 8.45435 3.16701C7.83579 2.77113 6.90796 2.05856 6.13476 2.61278C5.82548 2.77113 5.67085 2.92948 5.59353 3.16701C5.51621 3.48371 5.59353 3.87959 5.59353 4.19629V6.7299C5.59353 7.44247 5.51621 7.9967 5.98012 8.3134C6.13476 8.39258 6.44404 8.47175 6.676 8.39258C7.4492 8.07588 7.21724 6.65072 7.21724 5.54227V4.67134C8.53167 5.38392 9.8461 6.0965 11.1605 6.7299C11.6245 6.96742 12.3976 7.20495 12.5523 7.83835C12.7069 8.55093 11.2379 9.10515 10.7739 9.34268L5.43889 12.4305C5.05229 12.668 4.04713 13.4598 3.42858 13.2223C3.19662 13.1431 3.04198 12.9056 3.04198 12.7472C2.96466 12.4305 2.96466 11.9555 2.96466 11.5596V9.02598V4.75052C2.96466 4.11711 2.88734 3.32536 3.1193 2.92948C3.66054 2.13773 4.89765 3.56289 5.28425 2.29608C5.36157 1.97938 5.20693 1.66268 5.05229 1.50433C4.74301 1.02928 3.35126 0.316701 2.81002 0.158351C2.65538 0.0791753 2.26878 0 2.03682 0C0.722392 0.237526 1.03167 2.37526 1.03167 3.95876V11.7971C1.03167 12.9847 0.877031 14.5682 1.34095 15.2808C1.57291 15.6767 1.80487 15.6767 2.26878 15.8351ZM6.2894 10.6887C7.4492 10.6887 7.52652 9.18433 6.44404 8.94681C5.82548 8.86763 5.36157 9.50103 5.51621 10.0553C5.67085 10.4511 5.9028 10.5303 6.2894 10.6887Z" fill="#00AECD"/>
    </svg>
  )
}

function PrivacyChoicesIcon() {
  // Privacy Choices registered mark — always the official blue #0066FF
  return (
    <svg width="29" height="20" viewBox="0 0 29 20" fill="none" aria-hidden="true">
      <path d="M22.0479 3C25.8218 3 29 6.1 29 10C29 13.9 25.9211 17 22.0479 17H6.95215C3.07886 17 0 13.9 0 10C0 6.1 3.07886 3 6.95215 3H22.0479ZM6.95215 4.2002C3.77407 4.2002 1.19141 6.8 1.19141 10C1.19141 13.2 3.77407 15.7998 6.95215 15.7998H13.7051L16.7842 4.2002H6.95215ZM24.0342 7C23.8355 6.80003 23.4379 6.80001 23.2393 7L21.0547 9.2002L18.8701 7C18.6715 6.8 18.2738 6.8 18.0752 7C17.8767 7.19997 17.8768 7.59977 18.0752 7.7998L20.2607 10L18.1748 12.2002C17.9762 12.4002 17.9762 12.8 18.1748 13C18.3734 13.1999 18.7701 13.1998 18.9688 13L21.1543 10.7998L23.3389 13C23.5375 13.2 23.9352 13.2 24.1338 13C24.3322 12.8 24.3322 12.4002 24.1338 12.2002L21.9482 10L24.0342 7.7998C24.2327 7.59978 24.2328 7.19998 24.0342 7ZM11.3223 7.09961C11.521 6.90001 11.9181 6.89983 12.2158 7.09961C12.4145 7.29961 12.5141 7.70039 12.3154 7.90039L8.14355 12.7998C8.04425 12.8998 7.945 13 7.8457 13C7.64709 13.0999 7.34897 13.1003 7.15039 12.9004L4.96582 10.7002C4.76725 10.5003 4.76735 10.1004 4.96582 9.90039C5.16445 9.70039 5.56211 9.70039 5.76074 9.90039L7.54785 11.5996L11.3223 7.09961Z" fill="#0066FF"/>
    </svg>
  )
}

function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10.66 1.85a1.4 1.4 0 0 1 1.85 0l1.6 1.6c.51.5.51 1.32 0 1.83l-.3.3-3.44-3.44zM14.8 6c.91-.9.91-2.35 0-3.25l-1.6-1.6-.01-.02a2.4 2.4 0 0 0-3.24.02L2.73 8.36l-.12.2-2.08 6.28a.5.5 0 0 0 .64.63l6.22-2.13.2-.12zm-1.7.3-5.88 5.87-3.44-3.44 5.87-5.87zM3.28 9.7l2.98 2.98L1.8 14.2z" fill="currentColor"/>
    </svg>
  )
}

function AsteriskIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
      <path d="m4 5.71 2.2.64-1.47 1.96.91.64 1.31-1.99L8.31 9l.9-.67-1.44-1.92L10 5.77l-.33-1.08-2.16.78L7.58 3H6.47l.06 2.44-2.2-.8z" fill="currentColor"/>
    </svg>
  )
}

/* ---- Shared subcomponents ---------------------------------------------- */

const FOOTER_LINKS: readonly { label: string; glyph?: 'adchoices' | 'privacy' }[] = [
  { label: 'GM Privacy Statement' },
  { label: 'Legal' },
  { label: 'AdChoices', glyph: 'adchoices' },
  { label: 'Your Privacy Choices & Opt-Out Rights', glyph: 'privacy' },
  { label: 'GPC Honored' },
]

function GlobalLinks() {
  return (
    <ul className="drp-footer__links">
      {FOOTER_LINKS.map(({ label, glyph }) => (
        <li key={label}>
          <a
            href="#"
            className="drp-footer__link"
            onClick={(e) => e.preventDefault()}
            tabIndex={-1}
          >
            {glyph === 'adchoices' && <span className="drp-footer__link-glyph"><AdChoicesIcon /></span>}
            {glyph === 'privacy' && <span className="drp-footer__link-glyph"><PrivacyChoicesIcon /></span>}
            {label}
          </a>
        </li>
      ))}
    </ul>
  )
}

function Disclaimer() {
  return (
    <div className="drp-footer__disclaimer">
      <p className="drp-footer__disclaimer-heading">Important Note</p>
      <p className="drp-footer__disclaimer-body">
        This information is intended as an estimate and is not a sales contract. It is not a final
        representation of your pricing. Your final pricing is subject to the dealer's assessment of
        your trade-in vehicle (if applicable), verification of all taxes and fees, qualification for
        financing, and to the dealer's preparation of final sales documents. Accessory pricing does
        not include dealer installation and labor fees, which may be extra. You are not obligated to
        purchase this vehicle until you have signed the applicable documents.
      </p>
    </div>
  )
}

function ChatFab({ variant }: { variant?: 'default' | 'primary' } = {}) {
  const cls = variant === 'primary'
    ? 'drp-footer__chat-fab drp-footer__chat-fab--primary'
    : 'drp-footer__chat-fab'
  return (
    <button
      type="button"
      className={cls}
      aria-label="Open chat"
      tabIndex={-1}
      onClick={(e) => e.preventDefault()}
    >
      <i className="drp-icon drp-icon--message-circle-text" aria-hidden="true" />
    </button>
  )
}

/* ---- Atomic CTA reuse (contained button classes) ----------------------- */

function OutlineButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="drp-button-contained-container-bg-large drp-button-contained-color-primary-outlined"
      tabIndex={-1}
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </button>
  )
}

function FilledButton({ children, withArrow }: { children: React.ReactNode; withArrow?: boolean }) {
  return (
    <button
      type="button"
      className="drp-button-contained-container-bg-large drp-button-contained-color-primary-filled"
      tabIndex={-1}
      onClick={(e) => e.preventDefault()}
    >
      {children}
      {withArrow && <i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true" />}
    </button>
  )
}

function PriceCluster({ price }: { price: string }) {
  return (
    <div className="drp-footer__price">
      <span className="drp-footer__price-label">Net Price After Offers</span>
      <div className="drp-footer__price-row">
        <div className="drp-footer__price-amount">
          <span className="drp-footer__price-value">{price}</span>
          <span className="drp-footer__price-footnote" aria-hidden="true"><AsteriskIcon /></span>
        </div>
        <span className="drp-footer__price-method">Cash</span>
        <button
          type="button"
          className="drp-footer__price-edit"
          aria-label="Edit price"
          tabIndex={-1}
          onClick={(e) => e.preventDefault()}
        >
          <PencilIcon />
        </button>
      </div>
    </div>
  )
}

function FinancePriceCluster() {
  return (
    <div className="drp-footer__finance">
      <p className="drp-footer__finance-headline">
        $364.81/mo. - Finance
      </p>
      <div className="drp-footer__finance-row">
        <p className="drp-footer__finance-terms">
          72 months <span className="drp-footer__finance-dot" aria-hidden="true">|</span> 5.9% APR <span className="drp-footer__finance-dot" aria-hidden="true">|</span> $2,500 down payment
        </p>
        <button
          type="button"
          className="drp-footer__price-edit"
          aria-label="Edit finance terms"
          tabIndex={-1}
          onClick={(e) => e.preventDefault()}
        >
          <PencilIcon />
        </button>
      </div>
    </div>
  )
}

function BackButton() {
  return (
    <button
      type="button"
      className="drp-button-contained-container-bg-large drp-button-contained-color-primary-outlined drp-footer__back-btn"
      aria-label="Back"
      tabIndex={-1}
      onClick={(e) => e.preventDefault()}
    >
      <i className="drp-icon drp-icon--circle-arrow-left" aria-hidden="true" />
    </button>
  )
}

/* ---- Main composition -------------------------------------------------- */

function Footer({ variant, viewport }: { variant: Variant; viewport: Viewport }) {
  const cls = `drp-footer drp-footer--${variant}`

  if (variant === 'vdp') {
    return (
      <footer className={cls} data-viewport={viewport}>
        <GlobalLinks />
        <Disclaimer />
      </footer>
    )
  }

  if (variant === 'account') {
    return (
      <footer className={cls} data-viewport={viewport}>
        <GlobalLinks />
        <div className="drp-footer__actions">
          <OutlineButton>Cancel</OutlineButton>
          <FilledButton withArrow>Continue</FilledButton>
          <ChatFab />
        </div>
      </footer>
    )
  }

  // configurator
  if (viewport === 'mobile') {
    return (
      <footer className={cls} data-viewport={viewport}>
        <FinancePriceCluster />
        <div className="drp-footer__config-actions">
          <FilledButton withArrow>Next</FilledButton>
        </div>
      </footer>
    )
  }
  if (viewport === 'tablet') {
    return (
      <footer className={cls} data-viewport={viewport}>
        <FinancePriceCluster />
        <div className="drp-footer__config-actions">
          <OutlineButton>Skip</OutlineButton>
          <BackButton />
          <FilledButton withArrow>Next</FilledButton>
        </div>
      </footer>
    )
  }
  return (
    <footer className={cls} data-viewport={viewport}>
      <div className="drp-footer__config-main">
        <OutlineButton>Skip</OutlineButton>
        <div className="drp-footer__config-actions">
          <BackButton />
          <FilledButton withArrow>Next</FilledButton>
        </div>
      </div>
      <div className="drp-footer__config-side">
        <ChatFab variant="primary" />
      </div>
    </footer>
  )
}

/* ---- Showcase wrappers ------------------------------------------------- */

const VARIANT_META: readonly { variant: Variant; title: string; subtitle: string }[] = [
  {
    variant: 'vdp',
    title: 'Product Detail Page Footer',
    subtitle: 'Vehicle Detail Page footer — legal disclaimer block + GM global links row. No primary action; the CTA lives inline on the page.',
  },
  {
    variant: 'account',
    title: 'My Account / Form Footer',
    subtitle: "Sticky action bar for account flows and multi-step forms — global links on the left, Cancel + Continue on the right, floating Chat affordance anchored top-right.",
  },
  {
    variant: 'configurator',
    title: 'Configurator Step Footer',
    subtitle: 'Stepper-style bottom bar used inside the vehicle configurator — Skip (left), Back + Next (right), and a persistent Chat FAB panel on desktop. Tablet and mobile add a Finance price cluster so the shopper can see monthly payment while stepping through the build.',
  },
]

function DesktopShowcase({ variant }: { variant: Variant }) {
  useBrand() // subscribe — CSS does the work via [data-brand]
  return (
    <div className="doc-variant-card doc-variant-card--wide">
      <div className="doc-variant-card__preview" style={{ padding: '20px', alignItems: 'stretch' }}>
        <Footer variant={variant} viewport="desktop" />
      </div>
    </div>
  )
}

const RESPONSIVE_VIEWPORTS: readonly { viewport: Viewport; label: string; width: number }[] = [
  { viewport: 'tablet', label: 'Tablet · 768px', width: 768 },
  { viewport: 'mobile', label: 'Mobile · 375px', width: 375 },
]

function ResponsiveShowcase({ variant }: { variant: Variant }) {
  useBrand()
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
      {RESPONSIVE_VIEWPORTS.map(({ viewport, label, width }) => (
        <div key={viewport}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{ padding: '20px', alignItems: 'stretch', minHeight: 0 }}>
              <div style={{ width, flex: '0 0 auto' }}>
                <Footer variant={variant} viewport={viewport} />
              </div>
            </div>
          </div>
          <div className="doc-variant-card__label" style={{ marginTop: '8px', textTransform: 'none', opacity: 0.7 }}>{label}</div>
        </div>
      ))}
    </div>
  )
}

export default function FooterPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Domain Components</div>
        <h1 className="doc-page-header__title">Footer</h1>
        <p className="doc-page-header__desc">
          Site footer — three purpose-built variants that share the same GM legal-links row and
          brand-aware type/color treatment: a <strong>VDP disclaimer</strong> footer, a compact
          <strong> My Account</strong> action bar, and a <strong>Configurator</strong> step footer.
          All three are responsive across desktop, tablet, and mobile, and rethemes live via the
          brand switcher (top right).
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">VDP</span>
          <span className="doc-tag doc-tag--blue">My Account</span>
          <span className="doc-tag doc-tag--blue">Configurator</span>
          <span className="doc-tag">3 viewports</span>
          <a
            className="doc-page-header__link"
            href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=483-4381"
            target="_blank"
            rel="noreferrer"
          >
            View in Figma ↗
          </a>
          <a
            className="doc-page-header__link"
            href="https://aecgm-dev.tekion.xyz/docs/ui-components/"
            target="_blank"
            rel="noreferrer"
          >
            Storybook ↗
          </a>
        </div>
      </div>

      {VARIANT_META.map(({ variant, title, subtitle }) => (
        <div className="doc-section" key={variant}>
          <h2 className="doc-section__title">{title}</h2>
          <p className="doc-section__subtitle">{subtitle}</p>
          <div className="doc-variant-card__label" style={{ marginBottom: '12px', textTransform: 'none' }}>
            Desktop · 1920px
          </div>
          <DesktopShowcase variant={variant} />
          <div className="doc-variant-card__label" style={{ margin: '20px 0 12px', textTransform: 'none' }}>
            Responsive
          </div>
          <ResponsiveShowcase variant={variant} />
        </div>
      ))}

      {/* Anatomy */}
      <div className="doc-section">
        <h2 className="doc-section__title">Anatomy</h2>
        <p className="doc-section__subtitle">
          Each variant shares the same GM legal-links row (<code>GlobalLinks</code>) but pairs it
          with a different trailing cluster.
        </p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Slot</th><th>VDP</th><th>My Account</th><th>Configurator</th></tr></thead>
            <tbody>
              <tr>
                <td><code>GlobalLinks</code> (5 legal links w/ AdChoices + Privacy glyphs)</td>
                <td>✓</td>
                <td>✓ (desktop + tablet only)</td>
                <td>—</td>
              </tr>
              <tr>
                <td><code>Disclaimer</code> ("Important Note" heading + long legal paragraph)</td>
                <td>✓</td>
                <td>—</td>
                <td>—</td>
              </tr>
              <tr>
                <td>Cancel · Continue CTAs</td>
                <td>—</td>
                <td>✓ (Outline + Filled w/ arrow · stacks full-width on mobile)</td>
                <td>—</td>
              </tr>
              <tr>
                <td>Skip · Back · Next stepper CTAs</td>
                <td>—</td>
                <td>—</td>
                <td>✓ (Next on all · Skip + Back added on tablet + desktop)</td>
              </tr>
              <tr>
                <td>Finance price cluster ($/mo. · Finance · terms · edit)</td>
                <td>—</td>
                <td>—</td>
                <td>✓ tablet + mobile</td>
              </tr>
              <tr>
                <td><code>ChatFab</code> (48 px circular filled chat affordance)</td>
                <td>—</td>
                <td>✓ desktop + tablet</td>
                <td>✓ desktop (primary blue, in dedicated 424px panel)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle" style={{ marginTop: '16px' }}>
          <strong>Component reuse:</strong> Cancel and Continue/Exterior CTAs render the atomic
          contained-button classes (<code>drp-button-contained-container-bg-large</code> +
          <code> drp-button-contained-color-primary-*</code>) from the <code>Button</code> atom.
          The variant subscribes to <code>useBrand()</code> from
          <code> ../../context/BrandContext</code> so the whole surface re-themes via
          <code> [data-brand]</code> overrides. Net-new chrome (global-links row, disclaimer block,
          chat-FAB, AdChoices / privacy-shield glyphs) is engineered inline because no atom exists
          in the library yet.
        </p>
      </div>

      {/* Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">
          Chevrolet base values shown below — grouped into Surface, Typography, Spacing, Price cluster, and Chat FAB. Switch brand via the top-right switcher to see live overrides; token definitions live in <code>styles/tokens.css</code> and per-brand swaps in <code>styles/brands.css</code>.
        </p>

        <h3 className="doc-token-group">Surface</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--footer-bg</code></td><td><span className="doc-swatch" style={{background:'#ffffff', border:'1px solid #ccc'}}></span>#ffffff</td><td>Default footer surface</td></tr>
              <tr><td><code>--footer-bg-configurator</code></td><td><span className="doc-swatch" style={{background:'#f2f2f2'}}></span>#f2f2f2</td><td>Configurator grey row</td></tr>
              <tr><td><code>--footer-border-color</code></td><td><span className="doc-swatch" style={{background:'#e6e6e6'}}></span>#e6e6e6</td><td>Top border</td></tr>
              <tr><td><code>--footer-text-color</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Primary text</td></tr>
              <tr><td><code>--footer-text-subtle-color</code></td><td><span className="doc-swatch" style={{background:'#666666'}}></span>#666666</td><td>Links, disclaimer body, price label</td></tr>
              <tr><td><code>--footer-icon-color</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Link glyph row, price-edit pencil</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Typography</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--footer-font-family</code></td><td>Chevy_Sans</td><td>Root footer family</td></tr>
              <tr><td><code>--footer-links-font-family</code></td><td>Chevy_Sans</td><td>—</td></tr>
              <tr><td><code>--footer-links-font-weight</code></td><td>400</td><td>—</td></tr>
              <tr><td><code>--footer-links-font-size</code></td><td>12px</td><td>body-3</td></tr>
              <tr><td><code>--footer-links-line-height</code></td><td>20px</td><td>Also sets glyph row height</td></tr>
              <tr><td><code>--footer-disclaimer-heading-font-family</code></td><td>Chevy_Sans:Bold</td><td>"Important Note"</td></tr>
              <tr><td><code>--footer-disclaimer-heading-font-weight</code></td><td>700</td><td>—</td></tr>
              <tr><td><code>--footer-disclaimer-heading-font-size</code></td><td>14px</td><td>body-2-bold</td></tr>
              <tr><td><code>--footer-disclaimer-heading-line-height</code></td><td>22px</td><td>—</td></tr>
              <tr><td><code>--footer-disclaimer-body-font-family</code></td><td>Chevy_Sans</td><td>Legal paragraph</td></tr>
              <tr><td><code>--footer-disclaimer-body-font-weight</code></td><td>400</td><td>—</td></tr>
              <tr><td><code>--footer-disclaimer-body-font-size</code></td><td>12px</td><td>body-3</td></tr>
              <tr><td><code>--footer-disclaimer-body-line-height</code></td><td>20px</td><td>—</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Spacing</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--footer-padding-x-desktop</code></td><td>40px</td><td>Desktop horizontal padding</td></tr>
              <tr><td><code>--footer-padding-y-desktop</code></td><td>40px</td><td>Desktop vertical padding (VDP)</td></tr>
              <tr><td><code>--footer-padding-x-tablet</code></td><td>24px</td><td>—</td></tr>
              <tr><td><code>--footer-padding-y-tablet</code></td><td>24px</td><td>—</td></tr>
              <tr><td><code>--footer-padding-x-mobile</code></td><td>16px</td><td>—</td></tr>
              <tr><td><code>--footer-padding-y-mobile</code></td><td>16px</td><td>—</td></tr>
              <tr><td><code>--footer-action-row-height</code></td><td>80px</td><td>Account + Configurator action row min-height</td></tr>
              <tr><td><code>--footer-gap-links</code></td><td>24px</td><td>Horizontal gap between legal links</td></tr>
              <tr><td><code>--footer-gap-stack</code></td><td>16px</td><td>Vertical stack gap (links → disclaimer)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Price cluster</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--footer-price-label-font-size</code></td><td>14px</td><td>"Net Price After Offers", "Cash", finance terms</td></tr>
              <tr><td><code>--footer-price-label-line-height</code></td><td>22px</td><td>—</td></tr>
              <tr><td><code>--footer-price-label-font-weight</code></td><td>500</td><td>—</td></tr>
              <tr><td><code>--footer-price-value-font-family</code></td><td>Chevy_Sans:Bold</td><td>$XX,XXX value + finance headline</td></tr>
              <tr><td><code>--footer-price-value-font-weight</code></td><td>700</td><td>—</td></tr>
              <tr><td><code>--footer-price-value-font-size</code></td><td>20px</td><td>—</td></tr>
              <tr><td><code>--footer-price-value-line-height</code></td><td>24px</td><td>—</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Chat FAB</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--footer-chat-fab-size</code></td><td>48px</td><td>Circular FAB diameter</td></tr>
              <tr><td><code>--footer-chat-fab-bg</code></td><td><span className="doc-swatch" style={{background:'#787878'}}></span>#787878</td><td>Default fill (My Account)</td></tr>
              <tr><td><code>--footer-chat-fab-color</code></td><td><span className="doc-swatch" style={{background:'#ffffff', border:'1px solid #ccc'}}></span>#ffffff</td><td>Icon color</td></tr>
              <tr><td><code>--footer-chat-fab-primary-bg</code></td><td><span className="doc-swatch" style={{background:'#0077D9'}}></span>#0077D9</td><td>Configurator desktop primary variant</td></tr>
            </tbody>
          </table>
        </div>

      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Render the <strong>VDP footer</strong> at the bottom of any merchandising or detail page — the disclaimer is required legal copy for any page that shows pricing.</li>
              <li>Render the <strong>My Account</strong> footer as a sticky bar at the bottom of account/form flows so the primary action stays reachable.</li>
              <li>Use the <strong>Configurator</strong> footer only inside the build flow — Skip and Back sit on the left/center and Next (primary) on the right. The Finance cluster keeps monthly payment visible on tablet and mobile.</li>
              <li>Keep the global links cluster in the same left-aligned order across variants so shoppers build muscle memory.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't hide the disclaimer on pages that display a price — legal requires it.</li>
              <li>Don't swap Continue for multiple filled CTAs — one primary action per footer.</li>
              <li>Don't drop the Chat FAB panel on Configurator desktop — the dedicated 424px side panel with the primary-blue FAB is how configurator chat stays visible throughout the build.</li>
              <li>Don't re-introduce the chat FAB on mobile My Account — it's hidden on mobile so Cancel + Continue can stack full-width unobstructed.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
