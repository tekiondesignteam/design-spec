import type { MouseEvent, ReactNode } from 'react'

export type InlineButtonSize = 'large' | 'medium' | 'small'
export type InlineButtonTheme = 'primary' | 'inverse'

export type InlineButtonProps = {
  children: ReactNode
  size?: InlineButtonSize
  theme?: InlineButtonTheme
  href?: string
  disabled?: boolean
  className?: string
  tabIndex?: number
  onClick?: (e: MouseEvent<HTMLElement>) => void
}

export function InlineButton({
  children,
  size = 'large',
  theme = 'primary',
  href,
  disabled,
  className,
  tabIndex,
  onClick,
}: InlineButtonProps) {
  const cls = [
    'drp-button-link-container-bg',
    `drp-button-link-color-${theme}`,
    `drp-button-link-typography-${size}`,
    disabled ? 'drp-disabled' : '',
    className ?? '',
  ].filter(Boolean).join(' ')

  if (href !== undefined) {
    return (
      <a href={href} className={cls} tabIndex={tabIndex} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls} disabled={disabled} tabIndex={tabIndex} onClick={onClick}>
      {children}
    </button>
  )
}

export default function InlineButtonPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Inline Button</h1>
        <p className="doc-page-header__desc">
          Inline buttons (link-style) are used for actions that appear within text content or need minimal
          visual weight. Unlike contained buttons, they have no background or border — only a text label
          with an optional icon. They are distinct from navigation links: they trigger actions, not page transitions.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Inline Button - Primary</span>
          <span className="doc-tag doc-tag--blue">Inline Button - Inverse</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=4740-67485" target="_blank" rel="noreferrer">View in Figma ↗</a>
          <a className="doc-page-header__link" href="https://aecgm-dev.tekion.xyz/docs/ui-components/?path=/story/ui-components-button--primary" target="_blank" rel="noreferrer">Storybook ↗</a>
        </div>
      </div>

      {/* Primary – Sizes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Primary — Sizes</h2>
        <p className="doc-section__subtitle">The Primary inline button uses the brand's button font and plain button color. Three sizes share the same color tokens — only typography scale changes.</p>
        <div className="doc-variant-grid">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-large">Large (16px)</button>
                <button className="drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-medium">Medium (14px)</button>
                <button className="drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-small">Small (12px)</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Sizes</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Large (default) --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-large"</span><span className="hl-tag">&gt;</span><span className="hl-text">Learn more</span><span className="hl-tag">&lt;/button&gt;</span></pre>
      </div>

      {/* Primary – Interactive States */}
      <div className="doc-section">
        <h2 className="doc-section__title">Primary — Interactive States</h2>
        <p className="doc-section__subtitle">All states are shown below.</p>
        <div className="doc-variant-grid">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-large" style={{pointerEvents:'none'}}>Default</button>
                <button className="drp-button-link-container-bg drp-button-link-color-primary is-hovered drp-button-link-typography-large" style={{pointerEvents:'none'}}>Hover</button>
                <button className="drp-button-link-container-bg drp-button-link-color-primary is-pressed drp-button-link-typography-large" style={{pointerEvents:'none'}}>Pressed</button>
                <button className="drp-button-link-container-bg drp-button-link-color-primary drp-disabled drp-button-link-typography-large" style={{pointerEvents:'none'}} disabled>Disabled</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Primary states</div>
          </div>
        </div>
      </div>

      {/* Primary – With Icons */}
      <div className="doc-section">
        <h2 className="doc-section__title">Primary — With Icons</h2>
        <p className="doc-section__subtitle">Icons inherit <code>currentColor</code>. Large and Medium use 24×24px icons; Small uses 16×16px icons.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-large">
                  <i className="drp-icon drp-icon--plus" aria-hidden="true"></i>Leading Icon
                </button>
                <button className="drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-large">
                  Trailing Icon<i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div className="doc-variant-card__label">Large</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-medium">
                  <i className="drp-icon drp-icon--plus" aria-hidden="true"></i>Leading Icon
                </button>
                <button className="drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-medium">
                  Trailing Icon<i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div className="doc-variant-card__label">Medium</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-small">
                  <i className="drp-icon drp-icon--plus" aria-hidden="true" style={{width:'16px', height:'16px'}}></i>Leading Icon
                </button>
                <button className="drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-small">
                  Trailing Icon<i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true" style={{width:'16px', height:'16px'}}></i>
                </button>
              </div>
            </div>
            <div className="doc-variant-card__label">Small</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Leading icon --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-link-container-bg drp-button-link-color-primary drp-button-link-typography-large"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;i</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-icon drp-icon--plus"</span> <span className="hl-attr">aria-hidden</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;&lt;/i&gt;</span>{'\n'}{'  '}<span className="hl-text">Button Label</span>{'\n'}<span className="hl-tag">&lt;/button&gt;</span></pre>
      </div>

      {/* Inverse – Sizes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Inverse — Sizes</h2>
        <p className="doc-section__subtitle">Inverse inline buttons use white text (<code>#ffffff</code>) for use on dark or image-filled backgrounds. Three sizes share the same color tokens — only typography scale changes.</p>
        <div className="doc-variant-grid">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-link-container-bg drp-button-link-color-inverse drp-button-link-typography-large">Large (16px)</button>
                <button className="drp-button-link-container-bg drp-button-link-color-inverse drp-button-link-typography-medium">Medium (14px)</button>
                <button className="drp-button-link-container-bg drp-button-link-color-inverse drp-button-link-typography-small">Small (12px)</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Sizes</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Large (default) --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-link-container-bg drp-button-link-color-inverse drp-button-link-typography-large"</span><span className="hl-tag">&gt;</span><span className="hl-text">Learn more</span><span className="hl-tag">&lt;/button&gt;</span></pre>
      </div>

      {/* Inverse – Interactive States */}
      <div className="doc-section">
        <h2 className="doc-section__title">Inverse — Interactive States</h2>
        <p className="doc-section__subtitle">All states are shown below.</p>
        <div className="doc-variant-grid">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-link-container-bg drp-button-link-color-inverse drp-button-link-typography-large" style={{pointerEvents:'none'}}>Default</button>
                <button className="drp-button-link-container-bg drp-button-link-color-inverse is-hovered drp-button-link-typography-large" style={{pointerEvents:'none'}}>Hover</button>
                <button className="drp-button-link-container-bg drp-button-link-color-inverse is-pressed drp-button-link-typography-large" style={{pointerEvents:'none'}}>Pressed</button>
                <button className="drp-button-link-container-bg drp-button-link-color-inverse drp-disabled drp-button-link-typography-large" style={{pointerEvents:'none'}} disabled>Disabled</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Inverse states</div>
          </div>
        </div>
      </div>

      {/* Inverse – With Icons */}
      <div className="doc-section">
        <h2 className="doc-section__title">Inverse — With Icons</h2>
        <p className="doc-section__subtitle">Icons inherit <code>currentColor</code>. Large and Medium use 24×24px icons; Small uses 16×16px icons.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-link-container-bg drp-button-link-color-inverse drp-button-link-typography-large">
                  <i className="drp-icon drp-icon--plus" aria-hidden="true"></i>Leading Icon
                </button>
                <button className="drp-button-link-container-bg drp-button-link-color-inverse drp-button-link-typography-large">
                  Trailing Icon<i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div className="doc-variant-card__label">Large</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-link-container-bg drp-button-link-color-inverse drp-button-link-typography-medium">
                  <i className="drp-icon drp-icon--plus" aria-hidden="true"></i>Leading Icon
                </button>
                <button className="drp-button-link-container-bg drp-button-link-color-inverse drp-button-link-typography-medium">
                  Trailing Icon<i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div className="doc-variant-card__label">Medium</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-link-container-bg drp-button-link-color-inverse drp-button-link-typography-small">
                  <i className="drp-icon drp-icon--plus" aria-hidden="true" style={{width:'16px', height:'16px'}}></i>Leading Icon
                </button>
                <button className="drp-button-link-container-bg drp-button-link-color-inverse drp-button-link-typography-small">
                  Trailing Icon<i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true" style={{width:'16px', height:'16px'}}></i>
                </button>
              </div>
            </div>
            <div className="doc-variant-card__label">Small</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Leading icon --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-link-container-bg drp-button-link-color-inverse drp-button-link-typography-large"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;i</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-icon drp-icon--plus"</span> <span className="hl-attr">aria-hidden</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;&lt;/i&gt;</span>{'\n'}{'  '}<span className="hl-text">Button Label</span>{'\n'}<span className="hl-tag">&lt;/button&gt;</span></pre>
      </div>

      {/* Design Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">Base values in <code>styles/tokens.css</code>; per-brand overrides in <code>styles/brands.css</code>. Inline Button owns the <code>--button-link-*</code> token family (containers are zero-chrome; all weight lives in typography + color). Full token list: see <code>styles/tokens.css</code> lines 232–266.</p>

        <h3 className="doc-token-group">Container</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--button-link-container-bg-height</code></td><td>24px</td></tr>
              <tr><td><code>--button-link-container-bg-padding</code></td><td>0</td></tr>
              <tr><td><code>--button-link-container-bg-gap</code></td><td>8px (icon–label gap)</td></tr>
              <tr><td><code>--button-link-container-bg-border-radius</code></td><td>0</td></tr>
              <tr><td><code>--button-link-container-bg-border-width</code></td><td>0</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">Complete set — no omitted container tokens. No brand overrides on this group.</p>

        <h3 className="doc-token-group">Primary — color</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--button-link-color-primary-color</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td></tr>
              <tr><td><code>--button-link-color-primary-hover-color</code></td><td><span className="doc-swatch" style={{background:'#0e4180'}}></span>#0e4180</td></tr>
              <tr><td><code>--button-link-color-primary-active-color</code></td><td><span className="doc-swatch" style={{background:'#0e4180'}}></span>#0e4180</td></tr>
              <tr><td><code>--button-link-color-primary-disabled-color</code></td><td><span className="doc-swatch" style={{background:'#c3cfd9'}}></span>#c3cfd9</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">Complete set — no omitted primary color tokens. All four are overridden by every brand.</p>

        <h3 className="doc-token-group">Inverse — color</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--button-link-color-inverse-color</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ccc'}}></span>#ffffff</td></tr>
              <tr><td><code>--button-link-color-inverse-hover-color</code></td><td><span className="doc-swatch" style={{background:'#e6e6e6'}}></span>#e6e6e6</td></tr>
              <tr><td><code>--button-link-color-inverse-disabled-color</code></td><td><span className="doc-swatch" style={{background:'#666'}}></span>#666666</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">Complete set — no omitted inverse color tokens. Inverse colors do not change across brands — the white-on-dark treatment is brand-agnostic.</p>

        <h3 className="doc-token-group">Typography</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--button-link-typography-large-font-family</code></td><td><code>'Chevy_Sans:Medium', sans-serif</code></td></tr>
              <tr><td><code>--button-link-typography-large-font-size</code></td><td>16px (Buick + GMC override to 18px)</td></tr>
              <tr><td><code>--button-link-typography-large-line-height</code></td><td>24px (Buick + GMC override to 25px)</td></tr>
              <tr><td><code>--button-link-typography-large-font-weight</code></td><td>500 (Buick, GMC, Cadillac override to 400)</td></tr>
              <tr><td><code>--button-link-typography-large-letter-spacing</code></td><td>0 (no brand override per Figma)</td></tr>
              <tr><td><code>--button-link-typography-large-text-transform</code></td><td><code>none</code> (GMC + Cadillac switch to <code>uppercase</code>)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">+12 more typography vars: each of <code>medium</code> (14/22) and <code>small</code> (12/20) ships its own <code>-font-family</code>, <code>-font-size</code>, <code>-line-height</code>, <code>-font-weight</code>, <code>-letter-spacing</code>, <code>-text-transform</code>. Buick + GMC override all three sizes up to 18/25, 16/22, 14/20.</p>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">Token swaps only; no variant or layout changes. Each brand overrides the full Primary color ramp plus the three typography font-family tokens. All three non-Chevy brands also drop <code>font-weight</code> to 400 (Regular, vs Chevy 500). Buick + GMC scale every size up to 18/25, 16/22, 14/20. GMC and Cadillac also switch <code>text-transform</code> to <code>uppercase</code>.</p>
        <ul className="doc-brand-list">
          <li><strong>Buick</strong> — routes all four Primary color tokens through <code>var(--brand-color)</code> = <code>#D44400</code> (default, hover, active all resolve to the same orange; disabled becomes <code>#a7a6a4</code>). Font swaps to <code>Buick_Text</code>; <code>font-weight: 400</code>; sizes shift to 18/25, 16/22, 14/20. No text-transform change.</li>
          <li><strong>GMC</strong> — Primary default <code>#CC0000</code>, hover <code>#25282A</code>, active <code>#060505</code>, disabled <code>#929495</code>. Font swaps to <code>StratumGMC</code>; <code>font-weight: 400</code>; sizes shift to 18/25, 16/22, 14/20; all three sizes set <code>text-transform: uppercase</code>. Letter-spacing is <code>0</code> per Figma.</li>
          <li><strong>Cadillac</strong> — Primary default <code>#171473</code> (navy), hover/active <code>#211fab</code> (lighter indigo), disabled <code>#D2D2D2</code>. Font swaps to <code>Cadillac_Gothic</code>; <code>font-weight: 400</code>; sizes match Chevy (16/14/12); all three sizes set <code>text-transform: uppercase</code>. Letter-spacing is <code>0</code> per Figma.</li>
        </ul>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Use for secondary, low-emphasis actions within text or card content.</li>
              <li>Pair a trailing arrow icon with directional labels like "Learn more" or "View details".</li>
              <li>Use Inverse on dark hero banners, dark drawers, or photo backgrounds.</li>
              <li>Keep labels concise and action-oriented (verb + noun pattern).</li>
              <li>Size down (medium/small) when the surrounding text is body or caption size.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't use inline buttons as page-navigation links — use <code>&lt;a&gt;</code> anchors instead.</li>
              <li>Don't use them for primary call-to-action — use a contained <code>.drp-button-contained-color-primary-filled</code> button.</li>
              <li>Don't combine Primary and Inverse themes in the same light or dark section.</li>
              <li>Don't use Primary inline buttons on dark backgrounds — they will have low contrast.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
