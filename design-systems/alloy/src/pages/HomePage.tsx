import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { useBrand } from '../context/BrandContext'
import type { Brand } from '../context/brand-constants'
import chevroletLogo from '../../assets/brand-logos/chevrolet.svg'
import buickLogo from '../../assets/brand-logos/buick.avif'
import gmcLogo from '../../assets/brand-logos/gmc.avif'
import cadillacLogo from '../../assets/brand-logos/cadillac.svg'
import chevroletVehicle from '../../assets/vehicles/chevrolet-blazer-ev.png'
import buickVehicle from '../../assets/vehicles/buick-envista.png'
import gmcVehicle from '../../assets/vehicles/gmc-sierra-1500.png'
import cadillacVehicle from '../../assets/vehicles/cadillac-escalade.png'
import './home.css'

const BRAND_LOGO_FOR_PREVIEW: Record<Brand, string> = {
  chevrolet: chevroletLogo,
  buick: buickLogo,
  gmc: gmcLogo,
  cadillac: cadillacLogo,
}

const BRAND_INFO: Record<Brand, { label: string; src: string }> = {
  chevrolet: { label: 'Chevrolet', src: chevroletLogo },
  buick: { label: 'Buick', src: buickLogo },
  gmc: { label: 'GMC', src: gmcLogo },
  cadillac: { label: 'Cadillac', src: cadillacLogo },
}

const BRAND_DEALERSHIP: Record<Brand, string> = {
  chevrolet: 'RIVERSIDE CHEVROLET',
  buick: 'RIVERSIDE BUICK',
  gmc: 'RIVERSIDE GMC',
  cadillac: 'RIVERSIDE CADILLAC',
}

const BRAND_VEHICLE: Record<Brand, { name: string; trim: string; msrp: string; image: string }> = {
  chevrolet: { name: '2025 Blazer EV',    trim: 'SS, AWD',    msrp: '$48,500', image: chevroletVehicle },
  buick:     { name: '2025 Envista',      trim: 'ST, AWD',    msrp: '$24,100', image: buickVehicle },
  gmc:       { name: '2025 Sierra 1500',  trim: 'Pro, 4WD',   msrp: '$37,700', image: gmcVehicle },
  cadillac:  { name: '2025 Escalade',     trim: 'Sport, AWD', msrp: '$80,795', image: cadillacVehicle },
}

function HomeSlider() {
  const value = 50
  return (
    <div className="drp-slider-container" style={{ width: '100%' }}>
      <div className="drp-slider-header">
        <span className="drp-slider-typography-title">Volume</span>
        <span className="drp-slider-value"><output>{value}</output></span>
      </div>
      <div className="drp-slider-track-wrap">
        <input
          type="range"
          className="drp-slider-input"
          min="0"
          max="100"
          defaultValue={value}
          aria-label="Volume"
          tabIndex={-1}
          readOnly
          style={{ '--fill': `${value}%` } as CSSProperties}
        />
      </div>
    </div>
  )
}

export default function HomePage() {
  const { brand } = useBrand()
  const activeBrand = BRAND_INFO[brand] ?? BRAND_INFO.chevrolet
  const headerPreviewLogo = BRAND_LOGO_FOR_PREVIEW[brand] ?? chevroletLogo
  const dealership = BRAND_DEALERSHIP[brand] ?? BRAND_DEALERSHIP.chevrolet
  const vehicle = BRAND_VEHICLE[brand] ?? BRAND_VEHICLE.chevrolet
  return (
    <>
      {/* Hero */}
      <div className="hero">
        <div className="hero__eyebrow">Tekion · Digital Retail Program</div>
        <div className="hero__brand-logo" data-brand={brand}>
          <img src={activeBrand.src} alt={`${activeBrand.label} logo`} />
        </div>
        <h1 className="hero__title">GM Design System — {activeBrand.label}<br />Component Documentation</h1>
        <p className="hero__desc">
          Interactive reference for all DRP shared components — extracted directly from the
          GM Core Variables Figma library. Each component includes live demos, design token
          references, and usage guidelines.
        </p>
        <div className="hero__links">
          <Link to="/components/button" className="btn--filled">Browse Components</Link>
          <a href="https://aecgm-dev.tekion.xyz/docs/ui-components/" target="_blank" rel="noreferrer" className="btn--outline">Open Storybook ↗</a>
        </div>
      </div>

      {/* Foundations */}
      <p id="foundations" className="section-title">Foundations</p>
      <p className="section-desc">
        The design primitives that power every component — color palettes, typography scale,
        and iconography system. All values are sourced from the GM Core Variables Figma library.
      </p>

      <div className="doc-card-grid">

        <div className="doc-card">
          <div className="doc-card__preview" style={{ gap: '6px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: 'var(--brand-color)' }}></div>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: 'var(--brand-color-hover)' }}></div>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#1a1a1a' }}></div>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#888888' }}></div>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#e6e6e6' }}></div>
          </div>
          <Link to="/foundations/colors" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Colors</div>
              <div className="doc-card__desc">Brand palette, neutral scale, and feedback colors. Brand tokens adapt live to the active brand switcher.</div>
            </div>
            <div className="doc-card__footer">
              <span>3 palettes · brand responsive</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview" style={{ flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--type-heading-family)', fontWeight: 'var(--type-heading-weight)', fontSize: '40px', lineHeight: 1, letterSpacing: '-1px', color: '#1a1a1a' }}>Aa</div>
            <div style={{ fontSize: '13px', color: '#666', letterSpacing: '0.04em' }}>Headline · Body · Caption</div>
          </div>
          <Link to="/foundations/typography" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Typography</div>
              <div className="doc-card__desc">Full type scale with 6 headlines and 3 body sizes across 9–10 weight and style variants. Mirrors Figma's base-typography collection.</div>
            </div>
            <div className="doc-card__footer">
              <span>35 text styles · 4 brand fonts</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview" style={{ gap: '4px', alignItems: 'flex-end' }}>
            <div style={{ width: '8px', height: '8px', background: 'var(--brand-color)', borderRadius: '2px' }}></div>
            <div style={{ width: '16px', height: '16px', background: 'var(--brand-color)', borderRadius: '2px' }}></div>
            <div style={{ width: '24px', height: '24px', background: 'var(--brand-color)', borderRadius: '2px' }}></div>
            <div style={{ width: '32px', height: '32px', background: 'var(--brand-color)', borderRadius: '2px' }}></div>
          </div>
          <Link to="/foundations/spacing" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Spacing</div>
              <div className="doc-card__desc">Semantic spacing tokens for container and selectable surfaces — padding, gap, and stack. Values are brand-invariant and resolve to a fixed 13-step scale.</div>
            </div>
            <div className="doc-card__footer">
              <span>42 tokens · brand invariant</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview" style={{ gap: '20px', color: '#1a1a1a', fontSize: '28px' }}>
            <i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i>
            <i className="drp-icon drp-icon--circle-chevron-down" aria-hidden="true"></i>
            <i className="drp-icon drp-icon--circle-check" aria-hidden="true"></i>
            <i className="drp-icon drp-icon--circle-user" aria-hidden="true"></i>
          </div>
          <Link to="/foundations/iconography" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Iconography</div>
              <div className="doc-card__desc">Inline SVG icons drawn on a 16×16 or 24×24 grid with a 1.5px stroke. Color is inherited via currentColor.</div>
            </div>
            <div className="doc-card__footer">
              <span>2 sizes · currentColor</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

      </div>

      {/* Components */}
      <p id="components" className="section-title" style={{ marginTop: '72px' }}>Components</p>
      <p className="section-desc">
        All components are sourced from the <strong>🔵 GM • 01. Core Variables (Latest)</strong> Figma library.
        Each component page includes all variants, states, sizes, and the CSS tokens that power them.
      </p>

      <div className="doc-card-grid">

        <div className="doc-card">
          <div className="doc-card__preview">
            <button className="drp-button-contained-container-bg-medium drp-button-contained-color-primary-filled" style={{ pointerEvents: 'none' }}>Button</button>
          </div>
          <Link to="/components/button" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Button</div>
              <div className="doc-card__desc">Primary and Inverse contained buttons with filled, outline, and plain styles across all sizes and states.</div>
            </div>
            <div className="doc-card__footer">
              <span>6 component sets</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview">
            <button className="drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-large" style={{ pointerEvents: 'none' }}>Learn more<i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></button>
          </div>
          <Link to="/components/inline-button" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Inline Button</div>
              <div className="doc-card__desc">Link-style buttons for inline text actions. Primary and Inverse themes, three sizes, with optional leading/trailing icons.</div>
            </div>
            <div className="doc-card__footer">
              <span>2 component sets</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview" style={{ gap: '12px' }}>
            <button className="drp-button-contained-icon-container-rect-bg-medium drp-button-contained-color-primary-filled" aria-label="Favorite" style={{ pointerEvents: 'none' }}>
              <i className="drp-icon drp-icon--heart" aria-hidden="true"></i>
            </button>
            <button className="drp-button-contained-icon-container-circle-bg-medium drp-button-contained-color-primary-outlined" aria-label="Favorite" style={{ pointerEvents: 'none' }}>
              <i className="drp-icon drp-icon--heart" aria-hidden="true"></i>
            </button>
          </div>
          <Link to="/components/icon-button" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Icon Button</div>
              <div className="doc-card__desc">Square and circular icon-only buttons. Primary and Inverse themes, filled/outline/plain styles, three sizes.</div>
            </div>
            <div className="doc-card__footer">
              <span>2 component sets</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview" style={{ gap: '16px' }}>
            <label className="drp-checkbox-container" style={{ pointerEvents: 'none' }}>
              <input type="checkbox" className="checkbox__input" tabIndex={-1} readOnly />
              <span className="checkbox__box">
                <svg className="checkbox__check" viewBox="0 0 11 9" fill="none" aria-hidden="true"><path d="M1 4.5L4 7.5L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </label>
            <label className="drp-checkbox-container" style={{ pointerEvents: 'none' }}>
              <input type="checkbox" className="checkbox__input" defaultChecked tabIndex={-1} readOnly />
              <span className="checkbox__box">
                <svg className="checkbox__check" viewBox="0 0 11 9" fill="none" aria-hidden="true"><path d="M1 4.5L4 7.5L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </label>
          </div>
          <Link to="/components/checkbox" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Checkbox</div>
              <div className="doc-card__desc">Three check states (unchecked, checked, indeterminate) with full interactive state coverage and label placement options.</div>
            </div>
            <div className="doc-card__footer">
              <span>1 component set</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview" style={{ gap: '8px', flexWrap: 'wrap' }}>
            <span className="chip chip--selectable chip--md is-selected" style={{ pointerEvents: 'none' }}>SUV</span>
            <span className="chip chip--dismissable chip--md" style={{ pointerEvents: 'none' }}>
              Under $40k
              <span className="chip__dismiss" aria-hidden="true"><i className="drp-icon drp-icon--close" /></span>
            </span>
            <span className="chip chip--information chip--md chip--color-success" style={{ pointerEvents: 'none' }}>In stock</span>
          </div>
          <Link to="/components/chip" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Chip</div>
              <div className="doc-card__desc">Compact labels in four variants: Selectable filters, Dismissable tokens, Plain inline status, and Information badges (subtle or emphasis).</div>
            </div>
            <div className="doc-card__footer">
              <span>4 variants · 3 sizes</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview" style={{ gap: '16px' }}>
            <label className="drp-radio-container" style={{ pointerEvents: 'none' }}>
              <input type="radio" className="radio__input" name="home-radio-prev" tabIndex={-1} readOnly />
              <span className="radio__box"><span className="radio__dot"></span></span>
            </label>
            <label className="drp-radio-container" style={{ pointerEvents: 'none' }}>
              <input type="radio" className="radio__input" name="home-radio-prev" defaultChecked tabIndex={-1} readOnly />
              <span className="radio__box"><span className="radio__dot"></span></span>
            </label>
          </div>
          <Link to="/components/radio" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Radio Button</div>
              <div className="doc-card__desc">Mutually exclusive single-selection control. Unselected and selected states with full interactive state coverage and label placement options.</div>
            </div>
            <div className="doc-card__footer">
              <span>1 component set</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <HomeSlider />
          </div>
          <Link to="/components/slider" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Slider</div>
              <div className="doc-card__desc">Single and Range sliders for continuous value selection. Displays the current value in a badge with full disabled state support.</div>
            </div>
            <div className="doc-card__footer">
              <span>2 component sets</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview" style={{ gap: '16px' }}>
            <label className="drp-switch-container" style={{ pointerEvents: 'none' }}>
              <input type="checkbox" className="switch__input" tabIndex={-1} readOnly />
              <span className="switch__track"><span className="switch__thumb"></span></span>
            </label>
            <label className="drp-switch-container" style={{ pointerEvents: 'none' }}>
              <input type="checkbox" className="switch__input" defaultChecked tabIndex={-1} readOnly />
              <span className="switch__track"><span className="switch__thumb"></span></span>
            </label>
          </div>
          <Link to="/components/switch" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Switch</div>
              <div className="doc-card__desc">Binary toggle for immediate On/Off actions. Off and On states with full interactive state coverage and label placement options.</div>
            </div>
            <div className="doc-card__footer">
              <span>1 component set</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview">
            <div className="drp-input-standard-outlined-container-bg-large" style={{ maxWidth: '200px', width: '100%', pointerEvents: 'none' }}>
              <div className="drp-input-standard-outlined-field">
                <input type="text" className="drp-input-standard-outlined-input" placeholder=" " id="home-ti-1" defaultValue="John Smith" tabIndex={-1} readOnly />
                <label className="drp-input-standard-outlined-label" htmlFor="home-ti-1">Full name</label>
              </div>
            </div>
          </div>
          <Link to="/components/text-input" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Text Input</div>
              <div className="doc-card__desc">Single-line text field with floating label, error, and disabled states. Includes a dropdown variant with chevron icon.</div>
            </div>
            <div className="doc-card__footer">
              <span>2 component sets</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview">
            <div className="search" style={{ maxWidth: '220px', width: '100%', pointerEvents: 'none' }}>
              <div className="search__field">
                <span className="search__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M16 16L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <input type="text" className="search__input" placeholder="Search" tabIndex={-1} readOnly />
              </div>
            </div>
          </div>
          <Link to="/components/search" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Search</div>
              <div className="doc-card__desc">Search field with magnifier icon, clear button, and autocomplete suggestion dropdown. Includes a "Go" action variant.</div>
            </div>
            <div className="doc-card__footer">
              <span>2 component sets</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview">
            <div className="drp-tab-contained-container drp-tab-contained-container--lg" style={{ pointerEvents: 'none' }}>
              <button className="drp-tab-contained-tab-container-bg is-selected" tabIndex={-1}><span>Overview</span></button>
              <button className="drp-tab-contained-tab-container-bg" tabIndex={-1}><span>Specs</span></button>
            </div>
          </div>
          <Link to="/components/tabs" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Tabs</div>
              <div className="doc-card__desc">Contained joined tab bar for switching between related content panels. Supports 2–5 tabs at a fixed 48px height.</div>
            </div>
            <div className="doc-card__footer">
              <span>2 sizes · 2–5 tabs</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview" style={{ alignItems: 'stretch' }}>
            <div className="drp-stepper-container stepper--lg" style={{ pointerEvents: 'none', width: '100%' }}>
              <div className="drp-stepper-track">
                <button className="drp-stepper-item is-active" tabIndex={-1} aria-selected="true">
                  <span className="drp-stepper-badge">1</span>
                  <span className="drp-stepper-label">Vehicle</span>
                </button>
                <button className="drp-stepper-item" tabIndex={-1} aria-selected="false">
                  <span className="drp-stepper-badge">2</span>
                  <span className="drp-stepper-label">Review</span>
                </button>
              </div>
            </div>
          </div>
          <Link to="/components/stepper" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Stepper</div>
              <div className="doc-card__desc">Horizontal step-progress bar for multi-step checkout flows. Large desktop and Small mobile variants with collapsing inactive steps.</div>
            </div>
            <div className="doc-card__footer">
              <span>2 sizes · 2–5 steps</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview" style={{ gap: '16px', flexDirection: 'column' }}>
            <a href="#" className="drp-link-container-large" style={{ pointerEvents: 'none' }}>Primary link</a>
            <a href="#" className="drp-link-container-large drp-link-color-neutral" style={{ pointerEvents: 'none' }}>Neutral link</a>
          </div>
          <Link to="/components/link" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Link</div>
              <div className="doc-card__desc">Inline underlined navigation links. Primary, Neutral, and Inverse color styles with optional leading or trailing icons across three sizes.</div>
            </div>
            <div className="doc-card__footer">
              <span>3 styles · 3 sizes</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview" style={{ alignItems: 'flex-start', padding: '16px 0' }}>
            <div className="drp-list-container-bg is-open" style={{ position: 'static', width: '180px', boxShadow: 'none', borderRadius: '0', padding: '0' }}>
              <button className="drp-list-item-container-bg" style={{ pointerEvents: 'none' }}>
                <div className="menu__body"><span className="menu__label">Sedan</span></div>
                <span className="menu__tick"><svg viewBox="0 0 16 16" fill="none"><path d="M2.5 8.5L6 12L13.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              </button>
              <button className="drp-list-item-container-bg is-selected" style={{ pointerEvents: 'none' }}>
                <div className="menu__body"><span className="menu__label">SUV</span></div>
                <span className="menu__tick"><svg viewBox="0 0 16 16" fill="none"><path d="M2.5 8.5L6 12L13.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              </button>
              <button className="drp-list-item-container-bg" style={{ pointerEvents: 'none' }}>
                <div className="menu__body"><span className="menu__label">Truck</span></div>
                <span className="menu__tick"><svg viewBox="0 0 16 16" fill="none"><path d="M2.5 8.5L6 12L13.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              </button>
            </div>
          </div>
          <Link to="/components/menu" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Menu</div>
              <div className="doc-card__desc">Floating dropdown list with single-select, icons, descriptions, section headers, dividers, and built-in search.</div>
            </div>
            <div className="doc-card__footer">
              <span>5 variants · search support</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview" style={{ alignItems: 'flex-start', padding: '16px 0' }}>
            <div className="drp-accordion-group" style={{ width: '220px' }}>
              <div className="drp-accordion-container-bg">
                <button className="drp-accordion-container-summary-bg" style={{ pointerEvents: 'none' }} aria-expanded="false" tabIndex={-1}>
                  <span className="accordion__icon" aria-hidden="true">
                    <i className="drp-icon drp-icon--plus accordion__icon-closed"></i>
                    <i className="drp-icon drp-icon--circle-minus accordion__icon-open"></i>
                  </span>
                  <div className="accordion__label-wrap"><span className="accordion__label">Exterior Color</span></div>
                </button>
              </div>
              <div className="drp-accordion-container-bg">
                <button className="drp-accordion-container-summary-bg" style={{ pointerEvents: 'none' }} aria-expanded="false" tabIndex={-1}>
                  <span className="accordion__icon" aria-hidden="true">
                    <i className="drp-icon drp-icon--plus accordion__icon-closed"></i>
                    <i className="drp-icon drp-icon--circle-minus accordion__icon-open"></i>
                  </span>
                  <div className="accordion__label-wrap"><span className="accordion__label">Interior Trim</span></div>
                </button>
              </div>
            </div>
          </div>
          <Link to="/components/accordion" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Accordion</div>
              <div className="doc-card__desc">Stacked disclosure items with a plus / circle-minus toggle icon. Supports left and right icon positions, optional decorative icons, and disabled state.</div>
            </div>
            <div className="doc-card__footer">
              <span>2 icon positions · group support</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview">
            <nav className="drp-breadcrumb-container" aria-label="Breadcrumb" style={{ pointerEvents: 'none' }}>
              <ol className="drp-breadcrumb-list">
                <li className="drp-breadcrumb-item">
                  <a className="drp-breadcrumb-typography-small-default">Home</a>
                </li>
                <li className="drp-breadcrumb-item">
                  <svg className="drp-breadcrumb-sep" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <a className="drp-breadcrumb-typography-small-default">Vehicles</a>
                </li>
                <li className="drp-breadcrumb-item">
                  <svg className="drp-breadcrumb-sep" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="drp-breadcrumb-typography-small-current" aria-current="page">Silverado</span>
                </li>
              </ol>
            </nav>
          </div>
          <Link to="/components/breadcrumb" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Breadcrumb</div>
              <div className="doc-card__desc">Horizontal navigation trail showing the user's location in a hierarchy. Supports 2–5+ levels with truncation, hover, active, and disabled states.</div>
            </div>
            <div className="doc-card__footer">
              <span>5 depth variants · truncation support</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview">
            <div className="drp-toggle-group drp-toggle-group--lg" role="group" aria-label="Home toggle preview" style={{ pointerEvents: 'none' }}>
              <button type="button" className="drp-toggle-group__item is-selected" aria-pressed="true" tabIndex={-1}>Grid</button>
              <button type="button" className="drp-toggle-group__item" aria-pressed="false" tabIndex={-1}>List</button>
            </div>
          </div>
          <Link to="/components/toggle-button" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Toggle Button Group</div>
              <div className="doc-card__desc">Mutually exclusive toggle buttons with independent rounded borders and a brand-filled selected state. Two sizes, 2–5 options, auto or equal width.</div>
            </div>
            <div className="doc-card__footer">
              <span>2 sizes · 2–5 options</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview" style={{ padding: '8px', overflow: 'visible' }}>
            <div
              className="tooltip tooltip--arrow-bottom-right"
              role="tooltip"
              style={{ width: '240px', pointerEvents: 'none', transform: 'scale(0.85)', transformOrigin: 'center' }}
            >
              <p className="tooltip__body">Estimated arrival — actual delivery date may vary by dealer.</p>
              <span className="tooltip__arrow" aria-hidden="true" />
            </div>
          </div>
          <Link to="/components/tooltip" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Tooltip</div>
              <div className="doc-card__desc">Dark contextual overlay with info chip, title row, body, and inverse link. Nine arrow positions anchor it to any trigger.</div>
            </div>
            <div className="doc-card__footer">
              <span>9 arrow positions · fixed 384px</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview" style={{ gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button type="button" className="drp-quick-filter is-selected" aria-pressed="true" tabIndex={-1} style={{ pointerEvents: 'none', minWidth: 0, padding: '3px 11px', flex: 'none' }}>
              <i className="drp-icon drp-icon--zap drp-quick-filter__icon" aria-hidden="true" style={{ fontSize: 18 }} />
              <span className="drp-quick-filter__label" style={{ fontSize: 13 }}>Electric</span>
            </button>
            <button type="button" className="drp-quick-filter" aria-pressed="false" tabIndex={-1} style={{ pointerEvents: 'none', minWidth: 0, padding: '4px 12px', flex: 'none' }}>
              <i className="drp-icon drp-icon--car-suv drp-quick-filter__icon" aria-hidden="true" style={{ fontSize: 18 }} />
              <span className="drp-quick-filter__label" style={{ fontSize: 13 }}>SUV</span>
            </button>
          </div>
          <Link to="/components/quick-filter" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Quick Filter</div>
              <div className="doc-card__desc">Multi-select pill buttons with icon + label for one-tap refinement on the Vehicle Search Result page. Brand-themed labels (Title-case Chevy/Buick, UPPERCASE GMC/Cadillac) and 8px or square corners per brand.</div>
            </div>
            <div className="doc-card__footer">
              <span>4 brand label sets · multi-select</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        <div className="doc-card">
          <div className="doc-card__preview" style={{ gap: '16px' }}>
            <div className="drp-avatar-group" style={{ pointerEvents: 'none' }}>
              <span className="drp-notification" role="img" aria-label="1 unread">
                <span className="drp-notification__bell" aria-hidden="true"></span>
                <span className="drp-notification__badge">1</span>
              </span>
              <span className="drp-avatar" role="img" aria-label="AM">
                <span className="drp-avatar__initials">AM</span>
              </span>
            </div>
          </div>
          <Link to="/components/avatar" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Avatar + Notification</div>
              <div className="doc-card__desc">Header-right cluster with a user avatar (initials or logged-out icon) and a bell with a brand-colored unread-count pill badge.</div>
            </div>
            <div className="doc-card__footer">
              <span>2 sizes · 2 states</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

      </div>

      {/* Domain Components */}
      <p id="domain-components" className="section-title" style={{ marginTop: '72px' }}>Domain Components</p>
      <p className="section-desc">
        Molecules and templates built by composing the atomic components above.
        These cover product-specific surfaces like site headers, footers, and cards.
      </p>

      <div className="doc-card-grid">

        {/* Header — real .drp-header--tier-3 desktop, scaled to fit */}
        <div className="doc-card">
          <div className="doc-card__preview doc-card__preview--domain">
            <div className="doc-card__domain-frame" style={{ '--thumb-w': '720px', '--thumb-scale': 0.34 } as CSSProperties}>
              <header className="drp-header drp-header--tier-3" data-viewport="desktop" role="banner">
                <div className="drp-header__brand">
                  <img className="drp-header__logo" src={headerPreviewLogo} alt={`${activeBrand.label} logo`} />
                  <div className="drp-header__divider" aria-hidden="true" />
                  <p className="drp-header__dealership">{dealership}</p>
                </div>
                <div className="drp-header__actions">
                  <span className="drp-avatar" role="img" aria-label="AM">
                    <span className="drp-avatar__initials">AM</span>
                  </span>
                </div>
              </header>
            </div>
          </div>
          <Link to="/domain-components/header" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Header</div>
              <div className="doc-card__desc">Pre-Checkout (Tier 1 + Tier 3) and Secure-Checkout site headers. Brand logo, dealership anchor, hamburger menu, primary nav, and account avatar — composed from atomic components, responsive across desktop/tablet/mobile.</div>
            </div>
            <div className="doc-card__footer">
              <span>3 variants · 3 viewports · 4 brands</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        {/* Configurator Sub-header — real desktop tier-3 (no ZIP), scaled */}
        <div className="doc-card">
          <div className="doc-card__preview doc-card__preview--domain">
            <div className="doc-card__domain-frame" style={{ '--thumb-w': '880px', '--thumb-scale': 0.28 } as CSSProperties}>
              <div className="drp-config-subheader drp-config-subheader--tier-3" data-viewport="desktop">
                <div className="drp-config-subheader__identity">
                  <div className="drp-config-subheader__name">
                    <h1 className="drp-config-subheader__title">{vehicle.name}</h1>
                  </div>
                  <p className="drp-config-subheader__subtitle">{vehicle.trim}</p>
                </div>
                <div className="drp-config-subheader__tabs-wrap">
                  <div className="drp-config-subheader__tabs" role="tablist" aria-label="Configurator steps">
                    <button type="button" role="tab" aria-selected="true" tabIndex={-1} className="drp-config-subheader__tab is-selected"><span className="drp-config-subheader__tab-label">Model</span></button>
                    <button type="button" role="tab" aria-selected="false" tabIndex={-1} className="drp-config-subheader__tab"><span className="drp-config-subheader__tab-label">Exterior</span></button>
                    <button type="button" role="tab" aria-selected="false" tabIndex={-1} className="drp-config-subheader__tab"><span className="drp-config-subheader__tab-label">Interior</span></button>
                    <button type="button" role="tab" aria-selected="false" tabIndex={-1} className="drp-config-subheader__tab"><span className="drp-config-subheader__tab-label">Summary</span></button>
                  </div>
                </div>
                <div className="drp-config-subheader__right">
                  <span className="drp-config-subheader__count" aria-label="249 matches">249</span>
                </div>
              </div>
            </div>
          </div>
          <Link to="/domain-components/configurator-sub-header" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Configurator Sub-header</div>
              <div className="doc-card__desc">Secondary nav shown below the global Header while a shopper is building a vehicle. Trim identity + inline edit, underlined step tabs (Model → Summary, with Cab &amp; Bed for trucks), running Net Price, inventory match pill — two tiers, three viewports.</div>
            </div>
            <div className="doc-card__footer">
              <span>2 tiers · 3 viewports · 4 brands</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        {/* Footer (My Account) — real .drp-footer--account with atomic Buttons, scaled */}
        <div className="doc-card">
          <div className="doc-card__preview doc-card__preview--domain">
            <div className="doc-card__domain-frame" style={{ '--thumb-w': '720px', '--thumb-scale': 0.36 } as CSSProperties}>
              <div className="drp-footer drp-footer--account" data-viewport="desktop">
                <ul className="drp-footer__links">
                  <li><span className="drp-footer__link">Privacy Statement</span></li>
                  <li><span className="drp-footer__link">Legal</span></li>
                  <li><span className="drp-footer__link">AdChoices</span></li>
                </ul>
                <div className="drp-footer__actions">
                  <button type="button" className="drp-button-contained-container-bg-large drp-button-contained-color-primary-outlined" tabIndex={-1}>Cancel</button>
                  <button type="button" className="drp-button-contained-container-bg-large drp-button-contained-color-primary-filled" tabIndex={-1}>Continue</button>
                </div>
              </div>
            </div>
          </div>
          <Link to="/domain-components/footer" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">Footer</div>
              <div className="doc-card__desc">Three purpose-built footers — VDP disclaimer, My Account action bar (Cancel + Continue + chat FAB), and Configurator step footer with next-step CTA. Shares the GM legal-links row; responsive across desktop, tablet, and mobile.</div>
            </div>
            <div className="doc-card__footer">
              <span>3 variants · 3 viewports · 4 brands</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        {/* VSR Filter — real top-of-rail (location row + payment tabs + Filters heading) */}
        <div className="doc-card">
          <div className="doc-card__preview doc-card__preview--domain">
            <div className="doc-card__domain-frame" style={{ '--thumb-w': '380px', '--thumb-scale': 0.62 } as CSSProperties}>
              <div className="drp-vsr-filter drp-vsr-filter--desktop" data-viewport="desktop">
                <div className="drp-vsr-filter__location">
                  <div className="drp-vsr-filter__location-row">
                    <i className="drp-icon drp-icon--map-pin drp-vsr-filter__location-pin" aria-hidden="true" />
                    <span className="drp-vsr-filter__location-zip">92504, Riverside, CA</span>
                    <span className="drp-vsr-filter__location-edit" aria-hidden="true">
                      <i className="drp-icon drp-icon--pencil" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="drp-vsr-filter__location-miles">(100 miles)</div>
                </div>
                <div className="drp-tab-contained-container drp-tab-contained-container--lg drp-vsr-filter__payment-tabs" role="tablist" aria-label="Payment method">
                  <button type="button" role="tab" aria-selected="true"  tabIndex={-1} className="drp-tab-contained-tab-container-bg is-selected"><span>Cash</span></button>
                  <button type="button" role="tab" aria-selected="false" tabIndex={-1} className="drp-tab-contained-tab-container-bg"><span>Finance</span></button>
                  <button type="button" role="tab" aria-selected="false" tabIndex={-1} className="drp-tab-contained-tab-container-bg"><span>Lease</span></button>
                </div>
                <div className="drp-vsr-filter__heading-row">
                  <h2 className="drp-vsr-filter__heading">Filters</h2>
                </div>
              </div>
            </div>
          </div>
          <Link to="/domain-components/vsr-filter" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">VSR Filter</div>
              <div className="doc-card__desc">Vehicle Search Result rail — ZIP / radius header, Cash/Finance/Lease tabs with payment slider, twelve refinement accordions (Year, Vehicle, color swatches, Drive Type, MPG, Range, etc.), and a mobile sheet with sticky Filters header + Clear All / Apply action bar.</div>
            </div>
            <div className="doc-card__footer">
              <span>3 viewports · 4 brands</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        {/* VSR Card — real .drp-vsr-card miniature with brand vehicle image */}
        <div className="doc-card">
          <div className="doc-card__preview doc-card__preview--domain">
            <div className="doc-card__domain-frame" style={{ '--thumb-w': '380px', '--thumb-scale': 0.6 } as CSSProperties}>
              <div className="drp-vsr-card">
                <div className="drp-vsr-card__status-row">
                  <span className="drp-vsr-card__status">Available Now</span>
                </div>
                <div className="drp-vsr-card__info">
                  <div className="drp-vsr-card__name">
                    <span>{vehicle.name}</span>
                    <span>{vehicle.trim}</span>
                  </div>
                  <div className="drp-vsr-card__msrp">
                    <span className="drp-vsr-card__msrp-label">MSRP:</span>
                    <span className="drp-vsr-card__msrp-value">{vehicle.msrp}</span>
                  </div>
                </div>
                <div className="drp-vsr-card__content">
                  <div className="drp-vsr-card__image">
                    <img src={vehicle.image} alt={`${vehicle.name} ${vehicle.trim}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to="/domain-components/vsr-card" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">VSR Card</div>
              <div className="doc-card__desc">Vehicle Search Result tile — status, hero image, dealer-priced Cash / Finance / Lease term block, and a footer that swaps from VIN line to Quick View + View Details CTAs on desktop hover. Mobile shows both at once.</div>
            </div>
            <div className="doc-card__footer">
              <span>3 types · 2 viewports · 4 brands</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        {/* VSR Quick View — real hero + dots + identity panel, scaled */}
        <div className="doc-card">
          <div className="doc-card__preview doc-card__preview--domain">
            <div className="doc-card__domain-frame" style={{ '--thumb-w': '560px', '--thumb-scale': 0.42 } as CSSProperties}>
              <div className="drp-vsr-quick-view" style={{ padding: '24px', minHeight: 0 }}>
                <div className="drp-vsr-quick-view__media" style={{ gap: '12px' }}>
                  <div className="drp-vsr-quick-view__gallery" style={{ minHeight: 0 }}>
                    <div className="drp-vsr-quick-view__hero" style={{ height: '160px', padding: '0 16px' }}>
                      <img src={vehicle.image} alt={`${vehicle.name} ${vehicle.trim}`} />
                    </div>
                    <div className="drp-vsr-quick-view__dots" role="tablist" aria-label="Image gallery position">
                      <span role="tab" aria-selected="false" className="drp-vsr-quick-view__dot" />
                      <span role="tab" aria-selected="true"  className="drp-vsr-quick-view__dot is-active" />
                      <span role="tab" aria-selected="false" className="drp-vsr-quick-view__dot" />
                      <span role="tab" aria-selected="false" className="drp-vsr-quick-view__dot" />
                    </div>
                  </div>
                </div>
                <div className="drp-vsr-quick-view__info">
                  <div className="drp-vsr-quick-view__identity">
                    <div className="drp-vsr-quick-view__name-block">
                      <h2 className="drp-vsr-quick-view__title">
                        <span className="drp-vsr-quick-view__title-line">{vehicle.name}</span>
                        <span className="drp-vsr-quick-view__title-line">{vehicle.trim}</span>
                      </h2>
                      <span className="drp-vsr-quick-view__vin">Quick View</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to="/domain-components/vsr-quick-view" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">VSR Quick View</div>
              <div className="doc-card__desc">Desktop-only modal preview launched from a VSR Card. Image gallery (hero + chevron nav + dots + color callouts) on the left; identity panel + 2×2 specs grid + Key Installed Options + Add to Favorites / View & Buy CTA pair on the right. Brand-aware.</div>
            </div>
            <div className="doc-card__footer">
              <span>Desktop · 4 brands</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

        {/* VSR Mini Math Box — real .drp-vsr-math-box, Cadillac dark-flip works automatically */}
        <div className="doc-card">
          <div className="doc-card__preview doc-card__preview--domain">
            <div className="doc-card__domain-frame" style={{ '--thumb-w': '420px', '--thumb-scale': 0.52 } as CSSProperties}>
              <section className="drp-vsr-math-box" style={{ width: '420px', padding: '20px 20px 24px', gap: '16px' }} aria-label="Price Summary">
                <header className="drp-vsr-math-box__header">
                  <h3 className="drp-vsr-math-box__title">Price Summary</h3>
                </header>
                <div className="drp-vsr-math-box__lines">
                  <div className="drp-vsr-math-box__line">
                    <div className="drp-vsr-math-box__line-row">
                      <span className="drp-vsr-math-box__line-label">MSRP</span>
                      <span className="drp-vsr-math-box__line-amount">{vehicle.msrp}</span>
                    </div>
                  </div>
                  <div className="drp-vsr-math-box__line">
                    <div className="drp-vsr-math-box__line-row">
                      <span className="drp-vsr-math-box__line-label">Customer Allowance</span>
                      <span className="drp-vsr-math-box__line-amount">-$3,000.00</span>
                    </div>
                  </div>
                </div>
                <div className="drp-vsr-math-box__totals">
                  <div className="drp-vsr-math-box__total">
                    <span className="drp-vsr-math-box__total-label">Total Price</span>
                    <span className="drp-vsr-math-box__total-amount">$24,430.00</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <Link to="/domain-components/vsr-math-box" className="doc-card__nav">
            <div className="doc-card__body">
              <div className="doc-card__name">VSR Mini Math Box</div>
              <div className="doc-card__desc">Price Summary panel — MSRP, allowances, totals, and "Other offers you may qualify for". Three financing modes (Cash · Finance · Lease) cross with three vehicle statuses (Available / Central Stock / In Transit) for nine variants. Cadillac flips to a dark theme.</div>
            </div>
            <div className="doc-card__footer">
              <span>3 modes · 3 statuses · 4 brands</span>
              <span className="doc-card__arrow"><i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i></span>
            </div>
          </Link>
        </div>

      </div>
    </>
  )
}
