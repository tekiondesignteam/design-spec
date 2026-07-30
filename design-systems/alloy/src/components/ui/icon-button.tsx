import type { MouseEvent, ReactNode } from 'react'

export type IconButtonSize = 'large' | 'medium' | 'small'
export type IconButtonShape = 'rect' | 'circle'
export type IconButtonVariant = 'filled' | 'outlined' | 'plain'
export type IconButtonTheme = 'primary' | 'inverse'

export type IconButtonProps = {
  children: ReactNode
  ariaLabel: string
  size?: IconButtonSize
  shape?: IconButtonShape
  variant?: IconButtonVariant
  theme?: IconButtonTheme
  disabled?: boolean
  className?: string
  tabIndex?: number
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

/**
 * Reusable icon-only button atom. Use in molecules / templates instead of
 * re-typing the icon-container class strings.
 */
export function IconButton({
  children,
  ariaLabel,
  size = 'medium',
  shape = 'rect',
  variant = 'filled',
  theme = 'primary',
  disabled,
  className,
  tabIndex,
  onClick,
}: IconButtonProps) {
  const cls = [
    `drp-button-contained-icon-container-${shape}-bg-${size}`,
    `drp-button-contained-color-${theme}-${variant}`,
    disabled ? 'drp-disabled' : '',
    className ?? '',
  ].filter(Boolean).join(' ')
  return (
    <button
      type="button"
      className={cls}
      aria-label={ariaLabel}
      disabled={disabled}
      tabIndex={tabIndex}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function IconButtonPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Icon Button</h1>
        <p className="doc-page-header__desc">
          Icon-only buttons for compact action areas — toolbars, cards, and media controls.
          Available in <strong>Rectangle</strong> and <strong>Circle</strong> shapes across three sizes.
          The <strong>Primary</strong> theme follows the brand's button color system and works on light backgrounds.
          The <strong>Inverse</strong> theme uses white and works on dark or image backgrounds.
          Always include an <code>aria-label</code> since there is no visible text.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Icon Button - Primary</span>
          <span className="doc-tag doc-tag--blue">Icon Button - Inverse</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=4743-63425" target="_blank" rel="noreferrer">View in Figma ↗</a>
          <a className="doc-page-header__link" href="https://aecgm-dev.tekion.xyz/docs/ui-components/?path=/story/ui-components-button--primary" target="_blank" rel="noreferrer">Storybook ↗</a>
        </div>
      </div>

      {/* Primary — Style Variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">Primary — Style Variants</h2>
        <p className="doc-section__subtitle">Three visual styles × two shapes. All share the same size tokens; only color tokens differ. Rectangle uses the brand corner radius; circle is always 50%.</p>
        <div className="doc-variant-grid">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{gap:'16px'}}>
              <button className="drp-button-contained-icon-container-rect-bg-medium drp-button-contained-color-primary-filled" aria-label="Favorite"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
              <button className="drp-button-contained-icon-container-circle-bg-medium drp-button-contained-color-primary-filled" aria-label="Favorite"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
            </div>
            <div className="doc-variant-card__label">Filled</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{gap:'16px'}}>
              <button className="drp-button-contained-icon-container-rect-bg-medium drp-button-contained-color-primary-outlined" aria-label="Favorite"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
              <button className="drp-button-contained-icon-container-circle-bg-medium drp-button-contained-color-primary-outlined" aria-label="Favorite"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
            </div>
            <div className="doc-variant-card__label">Outline</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{gap:'16px'}}>
              <button className="drp-button-contained-icon-container-rect-bg-medium drp-button-contained-color-primary-plain" aria-label="Favorite"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
              <button className="drp-button-contained-icon-container-circle-bg-medium drp-button-contained-color-primary-plain" aria-label="Favorite"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
            </div>
            <div className="doc-variant-card__label">Plain</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Filled · Rectangle --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-icon-container-rect-bg-medium drp-button-contained-color-primary-filled"</span> <span className="hl-attr">aria-label</span>=<span className="hl-val">"Add item"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-icon"</span><span className="hl-tag">&gt;</span><span className="hl-tag">&lt;svg .../&gt;</span><span className="hl-tag">&lt;/span&gt;</span>{'\n'}<span className="hl-tag">&lt;/button&gt;</span></pre>
      </div>

      {/* Primary — Interactive States */}
      <div className="doc-section">
        <h2 className="doc-section__title">Primary — Interactive States</h2>
        <p className="doc-section__subtitle">All states are shown below. State classes mirror the button component: <code>is-hovered</code> for hover/pressed, <code>drp-disabled</code> + <code>disabled</code> for disabled.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          {[
            ['drp-button-contained-color-primary-filled', 'Filled states'],
            ['drp-button-contained-color-primary-outlined', 'Outline states'],
            ['drp-button-contained-color-primary-plain', 'Plain states'],
          ].map(([colorClass, label]) => (
            <div className="doc-variant-card" key={label}>
              <div className="doc-variant-card__preview">
                <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                  <div style={{display:'flex', alignItems:'center', gap:'14px'}}>
                    <button className={`drp-button-contained-icon-container-rect-bg-medium ${colorClass}`} style={{pointerEvents:'none'}} aria-label="Default"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
                    <span style={{fontSize:'14px'}}>Default</span>
                  </div>
                  <div style={{display:'flex', alignItems:'center', gap:'14px'}}>
                    <button className={`drp-button-contained-icon-container-rect-bg-medium ${colorClass} is-hovered`} style={{pointerEvents:'none'}} aria-label="Hover / Pressed"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
                    <span style={{fontSize:'14px'}}>Hover / Pressed</span>
                  </div>
                  <div style={{display:'flex', alignItems:'center', gap:'14px'}}>
                    <button className={`drp-button-contained-icon-container-rect-bg-medium ${colorClass} drp-disabled`} style={{pointerEvents:'none'}} aria-label="Disabled" disabled><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
                    <span style={{fontSize:'14px', opacity:0.45}}>Disabled</span>
                  </div>
                </div>
              </div>
              <div className="doc-variant-card__label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary — Sizes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Primary — Sizes</h2>
        <p className="doc-section__subtitle">Three sizes: Large (48×48px), Medium (40×40px), Small (32×32px). Size modifiers apply to all style and shape variants.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          {[
            ['drp-button-contained-color-primary-filled', 'Filled'],
            ['drp-button-contained-color-primary-outlined', 'Outline'],
            ['drp-button-contained-color-primary-plain', 'Plain'],
          ].map(([colorClass, label]) => (
            <div className="doc-variant-card" key={label}>
              <div className="doc-variant-card__preview">
                <div style={{display:'inline-flex', flexDirection:'column', alignItems:'center', gap:'20px'}}>
                  <button className={`drp-button-contained-icon-container-rect-bg-large ${colorClass}`} aria-label="Large"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
                  <button className={`drp-button-contained-icon-container-rect-bg-medium ${colorClass}`} aria-label="Medium"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
                  <button className={`drp-button-contained-icon-container-rect-bg-small ${colorClass}`} aria-label="Small"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
                </div>
              </div>
              <div className="doc-variant-card__label">{label}</div>
            </div>
          ))}
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Large --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-icon-container-rect-bg-large drp-button-contained-color-primary-filled"</span> <span className="hl-attr">aria-label</span>=<span className="hl-val">"Add item"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-icon"</span><span className="hl-tag">&gt;</span><span className="hl-tag">&lt;svg .../&gt;</span><span className="hl-tag">&lt;/span&gt;</span>{'\n'}<span className="hl-tag">&lt;/button&gt;</span></pre>
      </div>

      {/* Inverse — Style Variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">Inverse — Style Variants</h2>
        <p className="doc-section__subtitle">Inverse icon buttons use white fill, border, and icon color on dark or image backgrounds. Rectangle and Circle shapes both supported.</p>
        <div className="doc-variant-grid">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark" style={{gap:'16px'}}>
              <button className="drp-button-contained-icon-container-rect-bg-medium drp-button-contained-color-inverse-filled" aria-label="Favorite"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
              <button className="drp-button-contained-icon-container-circle-bg-medium drp-button-contained-color-inverse-filled" aria-label="Favorite"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
            </div>
            <div className="doc-variant-card__label">Filled</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark" style={{gap:'16px'}}>
              <button className="drp-button-contained-icon-container-rect-bg-medium drp-button-contained-color-inverse-outlined" aria-label="Favorite"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
              <button className="drp-button-contained-icon-container-circle-bg-medium drp-button-contained-color-inverse-outlined" aria-label="Favorite"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
            </div>
            <div className="doc-variant-card__label">Outline</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark" style={{gap:'16px'}}>
              <button className="drp-button-contained-icon-container-rect-bg-medium drp-button-contained-color-inverse-plain" aria-label="Favorite"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
              <button className="drp-button-contained-icon-container-circle-bg-medium drp-button-contained-color-inverse-plain" aria-label="Favorite"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
            </div>
            <div className="doc-variant-card__label">Plain</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Inverse filled rectangle --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-icon-container-rect-bg-medium drp-button-contained-color-inverse-filled"</span> <span className="hl-attr">aria-label</span>=<span className="hl-val">"Add item"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-icon"</span><span className="hl-tag">&gt;</span><span className="hl-tag">&lt;svg .../&gt;</span><span className="hl-tag">&lt;/span&gt;</span>{'\n'}<span className="hl-tag">&lt;/button&gt;</span></pre>
      </div>

      {/* Inverse — Interactive States */}
      <div className="doc-section">
        <h2 className="doc-section__title">Inverse — Interactive States</h2>
        <p className="doc-section__subtitle">All states are shown below. Inverse buttons use white on dark — colors are brand-agnostic.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'14px'}}>
                  <button className="drp-button-contained-icon-container-rect-bg-medium drp-button-contained-color-inverse-filled" style={{pointerEvents:'none'}} aria-label="Default"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
                  <span style={{fontSize:'14px', color:'rgba(255,255,255,0.9)'}}>Default</span>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'14px'}}>
                  <button className="drp-button-contained-icon-container-rect-bg-medium drp-button-contained-color-inverse-filled" style={{pointerEvents:'none', backgroundColor:'#e6e6e6'}} aria-label="Hover / Pressed"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
                  <span style={{fontSize:'14px', color:'rgba(255,255,255,0.9)'}}>Hover / Pressed</span>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'14px'}}>
                  <button className="drp-button-contained-icon-container-rect-bg-medium drp-button-contained-color-inverse-filled drp-disabled" style={{pointerEvents:'none'}} aria-label="Disabled" disabled><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
                  <span style={{fontSize:'14px', color:'rgba(255,255,255,0.4)'}}>Disabled</span>
                </div>
              </div>
            </div>
            <div className="doc-variant-card__label">Filled states</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'14px'}}>
                  <button className="drp-button-contained-icon-container-rect-bg-medium drp-button-contained-color-inverse-outlined" style={{pointerEvents:'none'}} aria-label="Default"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
                  <span style={{fontSize:'14px', color:'rgba(255,255,255,0.9)'}}>Default</span>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'14px'}}>
                  <button className="drp-button-contained-icon-container-rect-bg-medium drp-button-contained-color-inverse-outlined" style={{pointerEvents:'none', backgroundColor:'rgba(255,255,255,0.1)'}} aria-label="Hover / Pressed"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
                  <span style={{fontSize:'14px', color:'rgba(255,255,255,0.9)'}}>Hover / Pressed</span>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'14px'}}>
                  <button className="drp-button-contained-icon-container-rect-bg-medium drp-button-contained-color-inverse-outlined drp-disabled" style={{pointerEvents:'none'}} aria-label="Disabled" disabled><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
                  <span style={{fontSize:'14px', color:'rgba(255,255,255,0.4)'}}>Disabled</span>
                </div>
              </div>
            </div>
            <div className="doc-variant-card__label">Outline states</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'14px'}}>
                  <button className="drp-button-contained-icon-container-rect-bg-medium drp-button-contained-color-inverse-plain" style={{pointerEvents:'none'}} aria-label="Default"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
                  <span style={{fontSize:'14px', color:'rgba(255,255,255,0.9)'}}>Default</span>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'14px'}}>
                  <button className="drp-button-contained-icon-container-rect-bg-medium drp-button-contained-color-inverse-plain" style={{pointerEvents:'none', backgroundColor:'rgba(255,255,255,0.1)'}} aria-label="Hover / Pressed"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
                  <span style={{fontSize:'14px', color:'rgba(255,255,255,0.9)'}}>Hover / Pressed</span>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'14px'}}>
                  <button className="drp-button-contained-icon-container-rect-bg-medium drp-button-contained-color-inverse-plain drp-disabled" style={{pointerEvents:'none'}} aria-label="Disabled" disabled><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
                  <span style={{fontSize:'14px', color:'rgba(255,255,255,0.4)'}}>Disabled</span>
                </div>
              </div>
            </div>
            <div className="doc-variant-card__label">Plain states</div>
          </div>
        </div>
      </div>

      {/* Inverse — Sizes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Inverse — Sizes</h2>
        <p className="doc-section__subtitle">Three sizes: Large (48×48px), Medium (40×40px), Small (32×32px). Size modifiers apply to all style and shape variants.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          {[
            ['drp-button-contained-color-inverse-filled', 'Filled'],
            ['drp-button-contained-color-inverse-outlined', 'Outline'],
            ['drp-button-contained-color-inverse-plain', 'Plain'],
          ].map(([colorClass, label]) => (
            <div className="doc-variant-card" key={label}>
              <div className="doc-variant-card__preview doc-variant-card__preview--dark">
                <div style={{display:'inline-flex', flexDirection:'column', alignItems:'center', gap:'20px'}}>
                  <button className={`drp-button-contained-icon-container-rect-bg-large ${colorClass}`} aria-label="Large"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
                  <button className={`drp-button-contained-icon-container-rect-bg-medium ${colorClass}`} aria-label="Medium"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
                  <button className={`drp-button-contained-icon-container-rect-bg-small ${colorClass}`} aria-label="Small"><i className="drp-icon drp-icon--heart" aria-hidden="true"></i></button>
                </div>
              </div>
              <div className="doc-variant-card__label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Design Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">Base values in <code>styles/tokens.css</code>; per-brand overrides in <code>styles/brands.css</code>. Icon Button owns the <code>--button-contained-icon-container-*</code> family and shares all color tokens with the contained Button. Full token list: see <code>styles/tokens.css</code> lines 150–190 (containers) and 10–226 (shared color ramp).</p>

        <h3 className="doc-token-group">Rectangular shape — sizing</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--button-contained-icon-container-rect-bg-large-height</code></td><td>48px (width also 48px)</td></tr>
              <tr><td><code>--button-contained-icon-container-rect-bg-medium-height</code></td><td>40px (width also 40px)</td></tr>
              <tr><td><code>--button-contained-icon-container-rect-bg-small-height</code></td><td>32px (width also 32px)</td></tr>
              <tr><td><code>--button-contained-icon-container-rect-bg-large-border-radius</code></td><td>8px (brand-overridable; GMC + Cadillac set <code>0</code>)</td></tr>
              <tr><td><code>--button-contained-icon-container-rect-bg-large-border-width</code></td><td>2px</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">+8 more rectangular vars: each of <code>small</code> / <code>medium</code> / <code>large</code> also ships <code>-width</code>, <code>-border-radius</code>, <code>-border-width</code>. Small also ships <code>-padding: 0</code>.</p>

        <h3 className="doc-token-group">Circular shape — sizing</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--button-contained-icon-container-circle-bg-large-height</code></td><td>48px (width also 48px)</td></tr>
              <tr><td><code>--button-contained-icon-container-circle-bg-medium-height</code></td><td>40px</td></tr>
              <tr><td><code>--button-contained-icon-container-circle-bg-small-height</code></td><td>32px</td></tr>
              <tr><td><code>--button-contained-icon-container-circle-bg-large-border-radius</code></td><td>50% (no brand overrides — always pill)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">+8 more circular vars: each size ships <code>-width</code>, <code>-border-radius</code>, <code>-border-width</code>.</p>

        <h3 className="doc-token-group">Primary — color (shared with Button)</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--button-contained-color-primary-filled-background-color</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td></tr>
              <tr><td><code>--button-contained-color-primary-filled-color</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ccc'}}></span>#ffffff</td></tr>
              <tr><td><code>--button-contained-color-primary-outlined-border-color</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td></tr>
              <tr><td><code>--button-contained-color-primary-plain-color</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">+49 more primary color vars across filled / outlined / plain for hover, pressed, disabled states. See the <a href="/components/button">Button</a> page for the full ramp.</p>

        <h3 className="doc-token-group">Inverse — color (shared with Button)</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--button-contained-color-inverse-filled-background-color</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ccc'}}></span>#ffffff</td></tr>
              <tr><td><code>--button-contained-color-inverse-filled-color</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td></tr>
              <tr><td><code>--button-contained-color-inverse-outlined-border-color</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ccc'}}></span>#ffffff</td></tr>
              <tr><td><code>--focus-ring-color</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">+23 more inverse color vars across filled / outlined / plain for hover, pressed, disabled. Inverse colors do not change across brands — the white-on-dark treatment is brand-agnostic by design.</p>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">Token swaps only; no variant or layout changes. Icon Button inherits the Button color system — see the <a href="/components/button">Button</a> page for the full per-brand color ramps. The only icon-button-specific override is the rectangular corner radius.</p>
        <ul className="doc-brand-list">
          <li><strong>Buick</strong> — no icon-button-specific overrides. Inherits Buick's Primary filled dark ramp (<code>#333333</code>) and Plain orange (<code>#D44400</code>) from Button. Rectangular radius stays at the Chevy default <code>8px</code>.</li>
          <li><strong>GMC</strong> — sets <code>--button-contained-icon-container-rect-bg-{'{'}small,medium,large{'}'}-border-radius</code> to <code>0</code> (square rect corners). Circular shape keeps <code>50%</code>. Inherits GMC's red Primary (<code>#CC0000</code>) and inverted filled treatment (white bg + red border) from Button.</li>
          <li><strong>Cadillac</strong> — sets the same three rect radius tokens to <code>0</code> (square rect corners). Circular shape keeps <code>50%</code>. Inherits Cadillac's navy Primary (<code>#171473</code>) from Button.</li>
        </ul>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Always include an <code>aria-label</code> describing the action — icon buttons have no visible label.</li>
              <li>Pair with a tooltip to reveal the action label on hover for sighted users.</li>
              <li>Use Primary on light/white backgrounds and Inverse (white fill) on dark/image backgrounds.</li>
              <li>Use Circle shape for media controls and avatar-adjacent actions.</li>
              <li>Scale down to Small (32px) only in dense toolbars where tap targets are supplemented by surrounding space.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't use icon buttons without an <code>aria-label</code> — they are inaccessible to screen reader users.</li>
              <li>Don't use Small (32px) as the only touch target in mobile contexts — it falls below the 44px minimum.</li>
              <li>Don't mix Primary and Inverse in the same surface without a visible background contrast boundary.</li>
              <li>Don't use an icon that doesn't clearly communicate the action without a text label.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
