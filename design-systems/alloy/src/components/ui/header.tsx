import { Avatar } from './avatar'
import type { AvatarSize } from './avatar'
import { InlineButton } from './inline-button'
import { useBrand } from '../../context/BrandContext'
import type { Brand } from '../../context/brand-constants'
import chevroletLogo from '../../../assets/brand-logos/chevrolet.svg'
import buickLogo from '../../../assets/brand-logos/buick.avif'
import gmcLogo from '../../../assets/brand-logos/gmc.avif'
import cadillacLogo from '../../../assets/brand-logos/cadillac.svg'

type HeaderVariant = 'tier-1' | 'tier-3' | 'sc'
type Viewport = 'desktop' | 'tablet' | 'mobile'

type BrandSpec = {
  brand: Brand
  label: string
  logoSrc: string
  logoAlt: string
  dealership: string
}

const BRAND_SPECS: readonly BrandSpec[] = [
  { brand: 'chevrolet', label: 'Chevrolet', logoSrc: chevroletLogo, logoAlt: 'Chevrolet', dealership: 'RIVERSIDE CHEVROLET' },
  { brand: 'cadillac',  label: 'Cadillac',  logoSrc: cadillacLogo,  logoAlt: 'Cadillac',  dealership: 'RIVERSIDE CADILLAC' },
  { brand: 'buick',     label: 'Buick',     logoSrc: buickLogo,     logoAlt: 'Buick',     dealership: 'RIVERSIDE BUICK' },
  { brand: 'gmc',       label: 'GMC',       logoSrc: gmcLogo,       logoAlt: 'GMC',       dealership: 'RIVERSIDE GMC' },
]

const TIER_1_NAV = ['Vehicles', 'Shop'] as const
const TIER_3_NAV = ['Search Inventory', 'Build & Buy'] as const

// Inline hamburger matches assets/icons/menu.svg but uses currentColor so it
// inherits --header-icon-color from the brand scope instead of a masked fill.
function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M.5 3.33c0-.27.22-.5.5-.5h14a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5M.5 8c0-.28.22-.5.5-.5h14a.5.5 0 0 1 0 1H1A.5.5 0 0 1 .5 8m0 4.67c0-.28.22-.5.5-.5h14a.5.5 0 1 1 0 1H1a.5.5 0 0 1-.5-.5"
        fill="currentColor"
      />
    </svg>
  )
}

function NavLink({ label }: { label: string }) {
  return (
    <InlineButton href="#" size="large" theme="primary" tabIndex={-1} onClick={(e) => e.preventDefault()}>
      {label}
    </InlineButton>
  )
}

function MenuButton() {
  return (
    <button type="button" className="drp-header__icon-btn" aria-label="Open menu" tabIndex={-1}>
      <MenuIcon />
    </button>
  )
}

function avatarSizeFor(viewport: Viewport): AvatarSize {
  return viewport === 'desktop' ? 'desktop' : 'mobile'
}

function BrandBlock({ spec }: { spec: BrandSpec }) {
  return (
    <div className="drp-header__brand">
      <img className="drp-header__logo" src={spec.logoSrc} alt={`${spec.logoAlt} logo`} />
      <div className="drp-header__divider" aria-hidden="true" />
      <p className="drp-header__dealership">{spec.dealership}</p>
    </div>
  )
}

function Header({ variant, viewport, spec }: { variant: HeaderVariant; viewport: Viewport; spec: BrandSpec }) {
  const cls = `drp-header drp-header--${variant}`
  const avatarSize = avatarSizeFor(viewport)

  if (variant === 'tier-1') {
    if (viewport === 'desktop') {
      return (
        <header className={cls} data-viewport={viewport} role="banner">
          <div className="drp-header__left">
            <MenuButton />
            {TIER_1_NAV.map((label) => <NavLink key={label} label={label} />)}
          </div>
          <div className="drp-header__logo-center">
            <img className="drp-header__logo" src={spec.logoSrc} alt={`${spec.logoAlt} logo`} />
          </div>
          <div className="drp-header__right">
            <Avatar size={avatarSize} loggedOut ariaLabel="Account menu" />
          </div>
        </header>
      )
    }
    // tablet / mobile: two rows
    return (
      <header className={cls} data-viewport={viewport} role="banner">
        <div className="drp-header__top-row">
          <MenuButton />
          <img className="drp-header__logo" src={spec.logoSrc} alt={`${spec.logoAlt} logo`} />
          <Avatar size={avatarSize} loggedOut ariaLabel="Account menu" />
        </div>
        <nav className="drp-header__nav-row" aria-label="Primary">
          {TIER_1_NAV.map((label) => <NavLink key={label} label={label} />)}
        </nav>
      </header>
    )
  }

  if (variant === 'tier-3') {
    if (viewport === 'mobile') {
      return (
        <header className={cls} data-viewport={viewport} role="banner">
          <BrandBlock spec={spec} />
          <div className="drp-header__actions">
            <Avatar size={avatarSize} initials="AM" ariaLabel="Account menu" />
            <MenuButton />
          </div>
        </header>
      )
    }
    if (viewport === 'tablet') {
      return (
        <header className={cls} data-viewport={viewport} role="banner">
          <div className="drp-header__top-row">
            <BrandBlock spec={spec} />
            <div className="drp-header__actions">
              <Avatar size={avatarSize} initials="AM" ariaLabel="Account menu" />
              <MenuButton />
            </div>
          </div>
          <nav className="drp-header__nav-row" aria-label="Primary">
            {TIER_3_NAV.map((label) => <NavLink key={label} label={label} />)}
          </nav>
        </header>
      )
    }
    // desktop
    return (
      <header className={cls} data-viewport={viewport} role="banner">
        <BrandBlock spec={spec} />
        <nav className="drp-header__nav" aria-label="Primary">
          {TIER_3_NAV.map((label) => <NavLink key={label} label={label} />)}
        </nav>
        <div className="drp-header__actions">
          <Avatar size={avatarSize} initials="AM" ariaLabel="Account menu" />
          <MenuButton />
        </div>
      </header>
    )
  }

  // sc variant — no nav, no menu on any viewport
  return (
    <header className={cls} data-viewport={viewport} role="banner">
      <BrandBlock spec={spec} />
      <div className="drp-header__actions">
        <Avatar size={avatarSize} initials="AM" ariaLabel="Account menu" />
      </div>
    </header>
  )
}

function BrandShowcase({ variant }: { variant: HeaderVariant }) {
  const { brand } = useBrand()
  const spec = BRAND_SPECS.find((s) => s.brand === brand) ?? BRAND_SPECS[0]
  return (
    <div className="doc-variant-card doc-variant-card--wide">
      <div className="doc-variant-card__preview" style={{ padding: '20px', alignItems: 'stretch' }}>
        <Header variant={variant} viewport="desktop" spec={spec} />
      </div>
    </div>
  )
}

const RESPONSIVE_VARIANTS: readonly { variant: HeaderVariant; title: string }[] = [
  { variant: 'tier-1', title: 'Pre-Checkout · Tier 1' },
  { variant: 'tier-3', title: 'Pre-Checkout · Tier 3' },
  { variant: 'sc',     title: 'Secure Checkout' },
]

const VIEWPORTS: readonly { viewport: Viewport; label: string }[] = [
  { viewport: 'tablet', label: 'Tablet · 768px' },
  { viewport: 'mobile', label: 'Mobile · 375px' },
]

function ResponsiveShowcase() {
  const { brand } = useBrand()
  const spec = BRAND_SPECS.find((s) => s.brand === brand) ?? BRAND_SPECS[0]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {RESPONSIVE_VARIANTS.map(({ variant, title }) => (
        <div key={variant}>
          <div className="doc-variant-card__label" style={{ marginBottom: '12px', textTransform: 'none' }}>{title}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
            {VIEWPORTS.map(({ viewport, label }) => (
              <div key={viewport}>
                <div className="doc-variant-card">
                  <div className="doc-variant-card__preview" style={{ padding: '20px', alignItems: 'stretch', minHeight: 0 }}>
                    <div style={{ width: viewport === 'tablet' ? 768 : 375, flex: '0 0 auto' }}>
                      <Header variant={variant} viewport={viewport} spec={spec} />
                    </div>
                  </div>
                </div>
                <div className="doc-variant-card__label" style={{ marginTop: '8px', textTransform: 'none', opacity: 0.7 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function HeaderPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Domain Components</div>
        <h1 className="doc-page-header__title">Header</h1>
        <p className="doc-page-header__desc">
          Global site header used across all DRP storefronts. Three variants cover the full buying
          journey: the <strong>Pre-Checkout Tier 1</strong> header anchors brand-level entry points
          with a centered logo, hamburger menu, and top-level nav ("Vehicles", "Shop"); the{' '}
          <strong>Pre-Checkout Tier 3</strong> header adds the dealership context plus
          inventory-level nav ("Search Inventory", "Build &amp; Buy") once a shopper is inside a
          specific dealer storefront; and the <strong>Secure Checkout</strong> header strips the nav
          to keep the buyer focused on completing the purchase. Every variant ships three viewport
          layouts — desktop (88 px), tablet (64 / 120 px), and mobile (80 / 121 px).
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Tier 1</span>
          <span className="doc-tag doc-tag--blue">Tier 3</span>
          <span className="doc-tag doc-tag--blue">Secure Checkout</span>
          <span className="doc-tag">3 viewports</span>
          <a
            className="doc-page-header__link"
            href="https://www.figma.com/design/N61BUizbR9D2lm53KgUBqg/GM-%E2%80%A2-02.01-Navigation?node-id=478-3685"
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

      {/* Tier 1 */}
      <div className="doc-section">
        <h2 className="doc-section__title">Pre-Checkout · Tier 1</h2>
        <p className="doc-section__subtitle">
          Used on brand-level surfaces above a specific dealership — the home page, research content,
          model overviews. Layout: hamburger menu + two primary nav links on the left, centered brand
          logo, account avatar on the right. No dealership name in this tier. Use the brand
          switcher (top right) to preview each brand — tokens swap via <code>[data-brand]</code>.
        </p>
        <BrandShowcase variant="tier-1" />
      </div>

      {/* Tier 3 */}
      <div className="doc-section">
        <h2 className="doc-section__title">Pre-Checkout · Tier 3</h2>
        <p className="doc-section__subtitle">
          Used inside a specific dealership storefront — Vehicle Listings, Vehicle Details,
          Configurator, Cart. Adds the dealership anchor (logo · divider · dealership name) on the
          left, inventory-level nav in the center, and avatar + hamburger on the right.
        </p>
        <BrandShowcase variant="tier-3" />
      </div>

      {/* Secure Checkout */}
      <div className="doc-section">
        <h2 className="doc-section__title">Secure Checkout</h2>
        <p className="doc-section__subtitle">
          Rendered during checkout (Buyer Info, Financing, Review). Primary navigation and the
          hamburger are removed so the buyer stays focused on completing the purchase. Only the
          account avatar persists on the right.
        </p>
        <BrandShowcase variant="sc" />
      </div>

      {/* Responsive / Viewports */}
      <div className="doc-section">
        <h2 className="doc-section__title">Responsive Viewports</h2>
        <p className="doc-section__subtitle">
          Each variant adapts to tablet (768 px) and mobile (375 px). Tier 1 and Tier 3 stack the
          nav into a second row below the brand/action cluster; Secure Checkout and mobile Tier 3
          collapse the logo + dealership into a two-line stack and drop the vertical divider. Icons
          shrink from 40 px to 32 px below desktop.
        </p>
        <ResponsiveShowcase />
      </div>

      {/* Anatomy */}
      <div className="doc-section">
        <h2 className="doc-section__title">Anatomy</h2>
        <p className="doc-section__subtitle">
          The three variants share a common token surface but differ in which slots are present.
        </p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Slot</th><th>Tier 1</th><th>Tier 3</th><th>Secure Checkout</th></tr></thead>
            <tbody>
              <tr>
                <td><code>Brand block</code> (logo · divider · dealership)</td>
                <td>Logo only, centered</td>
                <td>✓ full</td>
                <td>✓ full (divider drops on mobile)</td>
              </tr>
              <tr>
                <td><code>Primary nav</code></td>
                <td>Vehicles · Shop</td>
                <td>Search Inventory · Build &amp; Buy</td>
                <td>—</td>
              </tr>
              <tr>
                <td><code>Hamburger / menu</code></td>
                <td>Left (before nav)</td>
                <td>Right (after avatar)</td>
                <td>—</td>
              </tr>
              <tr>
                <td><code>Account avatar</code></td>
                <td>Right (logged-out glyph)</td>
                <td>Right (initials)</td>
                <td>Right (initials)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Built from */}
      <div className="doc-section">
        <h2 className="doc-section__title">Built from</h2>
        <p className="doc-section__subtitle">
          The molecule composes two atomic primitives via tree-shaken named imports, and engineers
          two surfaces in-place. Each with explicit rationale below.
        </p>
        <ul className="doc-brand-list">
          <li>
            <strong><code>Avatar</code></strong> — imported as a named export (<code>Avatar</code>
            {' '}+ <code>AvatarSize</code> from <code>./avatar</code>). Fills the account slot on
            every variant. One of only two atomic components in the library that exports a reusable
            React primitive.
          </li>
          <li>
            <strong><code>InlineButton</code></strong> — imported as a named export
            (<code>InlineButton</code> from <code>./inline-button</code>). Used for every primary
            nav link (Vehicles, Shop, Search Inventory, Build &amp; Buy). The other atomic that
            exports a reusable primitive.
          </li>
          <li>
            <strong>Layout frame</strong> (<code>.drp-header</code>) — engineered in-place. The
            tier-1 / tier-3 / secure-checkout × desktop / tablet / mobile grid has 9 layout
            permutations with tier-specific slot shuffling (hamburger-left vs. hamburger-right,
            centered brand block vs. anchored). No atomic "AppShellHeader" exists to reuse.
          </li>
          <li>
            <strong>Hamburger button</strong> (<code>.drp-header__icon-btn</code>) — engineered
            in-place. Atomic IconButton (<code>.drp-button-contained-icon-container-*</code>) is a
            CSS-only treatment (no React export) that wraps a 24&nbsp;px glyph inside a 40&nbsp;px
            button with internal padding. Header's Figma spec is a 40&nbsp;px full-bleed SVG
            (glyph fills the button, no padding) — the atomic CSS doesn't support this variant, so
            a Header-scoped icon-btn class is required regardless.
          </li>
        </ul>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">
          Each non-Chevy brand overrides ~10 tokens in <code>styles/brands.css</code> — surface
          color, divider, dealership + nav typography, icon color. Layout, spacing, sizing, and
          the hamburger glyph are brand-invariant.
        </p>
        <ul className="doc-brand-list">
          <li>
            <strong>Buick</strong> — bg warms to <code>#efedea</code>, border + divider to{' '}
            <code>#d7d5d3</code>, dealership + nav text to <code>#222222</code>, icon to{' '}
            <code>#333333</code>. Dealership font <code>Buick_Text</code> weight 600, nav{' '}
            <code>Buick_Text</code> weight 500.
          </li>
          <li>
            <strong>GMC</strong> — bg <code>#ebebeb</code>, border + divider <code>#d4d4d4</code>,
            dealership + nav text <code>#060505</code> (near-black), icon <code>#25282a</code>.
            Dealership font <code>StratumGMC</code> weight 700 at 18/25, nav{' '}
            <code>StratumGMC</code> weight 500 at 18/25 (larger than Chevy's 16/24).
          </li>
          <li>
            <strong>Cadillac</strong> — bg stays at the Chevy <code>#f2f2f2</code>, border{' '}
            <code>#a0a0a0</code> (darker), divider <code>#d2d2d2</code>, dealership + nav text{' '}
            <code>#282828</code>, icon <code>#0d0d0d</code>. Dealership font{' '}
            <code>Cadillac_Gothic_Narrow:Bold</code> weight 700, nav{' '}
            <code>Cadillac_Gothic_Narrow</code> weight 500.
          </li>
        </ul>
        <p className="doc-section__subtitle">
          <strong>Known gap:</strong> GMC defines <code>--header-nav-font-size: 18px</code> and{' '}
          <code>--header-nav-line-height: 25px</code> to match the brand's 18/25 body ramp, but
          these three tokens (<code>--header-nav-font-size</code>,{' '}
          <code>--header-nav-line-height</code>, <code>--header-nav-font-weight</code>) are
          defined but <em>not consumed</em> anywhere in <code>styles/global.css</code>. Nav
          typography currently comes from the <code>InlineButton</code> primitive's own token
          scope, not <code>--header-nav-*</code>. Tracked as <strong>S9</strong> in{' '}
          <code>systemic-findings.md</code>.
        </p>
      </div>

      {/* Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">
          Chevrolet base values defined in <code>styles/tokens.css</code>; brand overrides in{' '}
          <code>styles/brands.css</code> under each <code>[data-brand]</code> block; consumed in{' '}
          <code>styles/global.css</code>. Standard architecture.
        </p>
        <p className="doc-section__subtitle">
          <strong>Surface + layout</strong>
        </p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--header-bg</code></td><td><span className="doc-swatch" style={{background:'#f2f2f2', border:'1px solid #ccc'}}></span>#f2f2f2</td><td>Background</td></tr>
              <tr><td><code>--header-border-color</code></td><td><span className="doc-swatch" style={{background:'#e6e6e6', border:'1px solid #ccc'}}></span>#e6e6e6</td><td>Bottom border</td></tr>
              <tr><td><code>--header-divider-color</code></td><td><span className="doc-swatch" style={{background:'#e6e6e6', border:'1px solid #ccc'}}></span>#e6e6e6</td><td>Vertical divider color</td></tr>
              <tr><td><code>--header-divider-width</code></td><td>1px</td><td>Vertical divider width</td></tr>
              <tr><td><code>--header-divider-height</code></td><td>32px</td><td>Vertical divider height</td></tr>
              <tr><td><code>--header-icon-color</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Avatar + hamburger color</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle" style={{ marginTop: '16px' }}>
          <strong>Sizing — heights, padding, gaps</strong>
        </p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--header-height-desktop</code></td><td>88px</td><td>Desktop row height (all variants)</td></tr>
              <tr><td><code>--header-height-tablet-pc</code></td><td>120px</td><td>Tier 1 / Tier 3 tablet height</td></tr>
              <tr><td><code>--header-height-tablet-sc</code></td><td>64px</td><td>Secure Checkout tablet height</td></tr>
              <tr><td><code>--header-height-mobile-pc</code></td><td>121px</td><td>Tier 1 mobile height</td></tr>
              <tr><td><code>--header-height-mobile-compact</code></td><td>80px</td><td>Tier 3 + SC mobile height</td></tr>
              <tr><td><code>--header-padding-x</code></td><td>24px</td><td>Desktop + tablet horizontal padding</td></tr>
              <tr><td><code>--header-padding-x-mobile</code></td><td>16px</td><td>Mobile horizontal padding</td></tr>
              <tr><td><code>--header-padding-y</code></td><td>16px</td><td>Vertical padding (non-SC)</td></tr>
              <tr><td><code>--header-padding-y-mobile-sc</code></td><td>8px</td><td>Secure Checkout vertical padding (mobile)</td></tr>
              <tr><td><code>--header-row-gap</code></td><td>16px</td><td>Gap between brand row and nav row (tier-1/3 tablet+mobile)</td></tr>
              <tr><td><code>--header-gap-group</code></td><td>16px</td><td>Logo → divider → dealership gap</td></tr>
              <tr><td><code>--header-gap-group-stacked</code></td><td>8px</td><td>Logo → dealership gap when stacked (mobile)</td></tr>
              <tr><td><code>--header-gap-nav</code></td><td>40px</td><td>Between nav links</td></tr>
              <tr><td><code>--header-gap-actions</code></td><td>24px</td><td>Avatar → hamburger gap</td></tr>
              <tr><td><code>--header-icon-size-desktop</code></td><td>40px</td><td>Hamburger / avatar hit-area (desktop)</td></tr>
              <tr><td><code>--header-icon-size-compact</code></td><td>32px</td><td>Hamburger / avatar hit-area (tablet+mobile)</td></tr>
              <tr><td><code>--header-logo-height</code></td><td>33px</td><td>Logo height</td></tr>
              <tr><td><code>--header-logo-max-width</code></td><td>90px</td><td>Logo max-width (cap)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle" style={{ marginTop: '16px' }}>
          <strong>Dealership anchor typography</strong>
        </p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--header-dealership-font-family</code></td><td>'Chevy_Sans:Bold'</td><td>Dealership name font</td></tr>
              <tr><td><code>--header-dealership-font-weight</code></td><td>700</td><td>Dealership name weight</td></tr>
              <tr><td><code>--header-dealership-font-size</code></td><td>16px</td><td>Dealership name size (desktop + tablet)</td></tr>
              <tr><td><code>--header-dealership-font-size-compact</code></td><td>14px</td><td>Dealership name size (mobile)</td></tr>
              <tr><td><code>--header-dealership-line-height</code></td><td>24px</td><td>Dealership name line-height (desktop + tablet)</td></tr>
              <tr><td><code>--header-dealership-line-height-compact</code></td><td>22px</td><td>Dealership name line-height (mobile)</td></tr>
              <tr><td><code>--header-dealership-letter-spacing</code></td><td>0</td><td>Dealership letter-spacing</td></tr>
              <tr><td><code>--header-dealership-color</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Dealership name text color</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle" style={{ marginTop: '16px' }}>
          <strong>Primary nav typography</strong>
        </p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to / status</th></tr></thead>
            <tbody>
              <tr><td><code>--header-nav-font-family</code></td><td>'Chevy_Sans'</td><td>Consumed on <code>.drp-header</code> base; sets nav link font family.</td></tr>
              <tr><td><code>--header-nav-color</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Consumed on <code>.drp-header</code> base.</td></tr>
              <tr><td><code>--header-nav-font-weight</code></td><td>500</td><td><em>Defined + brand-overridden, but not consumed in global.css. Nav weight currently comes from InlineButton primitive. See S9.</em></td></tr>
              <tr><td><code>--header-nav-font-size</code></td><td>16px</td><td><em>Defined + GMC-overridden to 18px, but not consumed in global.css. See S9.</em></td></tr>
              <tr><td><code>--header-nav-line-height</code></td><td>24px</td><td><em>Defined + GMC-overridden to 25px, but not consumed in global.css. See S9.</em></td></tr>
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
              <li>Use <strong>Tier 1</strong> on brand-level surfaces above a specific dealership (home, model overview, research).</li>
              <li>Switch to <strong>Tier 3</strong> once the shopper enters a dealership storefront — the dealership anchor + inventory nav belong here.</li>
              <li>Swap to <strong>Secure Checkout</strong> the moment the buyer enters checkout (Buyer Info, Financing, Review).</li>
              <li>Keep the hamburger icon shape consistent across brands — only the color token changes.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't show Tier 1 nav labels on Tier 3 pages — they belong to different levels of the IA.</li>
              <li>Don't show the hamburger or primary nav during Secure Checkout — it pulls the buyer out of the purchase flow.</li>
              <li>Don't replace the hamburger with a location or cart glyph — the menu icon is canonical across all brands.</li>
              <li>Don't swap the brand logo with a custom dealer logo — brand identity must remain primary.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
