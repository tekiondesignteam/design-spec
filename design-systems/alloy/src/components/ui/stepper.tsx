import { useState } from 'react'

const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function StepperLg({ steps, initialActive = 0, ariaLabel }: {
  steps: string[]
  initialActive?: number
  ariaLabel?: string
}) {
  const [active, setActive] = useState(initialActive)
  return (
    <div className="drp-stepper-container drp-stepper-container--lg" role="tablist" aria-label={ariaLabel}>
      {steps.map((step, i) => (
        <button
          key={i}
          className={`drp-stepper-item${active === i ? ' is-active' : ''}`}
          role="tab"
          aria-selected={active === i}
          onClick={() => setActive(i)}
        >
          <span className="drp-stepper-badge">{i + 1}</span>
          <span className="drp-stepper-label">{step}</span>
        </button>
      ))}
    </div>
  )
}

function StepperSm({ steps, initialActive = 0, ariaLabel }: {
  steps: string[]
  initialActive?: number
  ariaLabel?: string
}) {
  const [active, setActive] = useState(initialActive)
  return (
    <div className="drp-stepper-container drp-stepper-container--sm" role="tablist" aria-label={ariaLabel}>
      <button
        className="drp-stepper-nav drp-stepper-nav--prev"
        aria-label="Previous step"
        disabled={active === 0}
        onClick={() => setActive(a => Math.max(0, a - 1))}
      >
        <ChevronLeft />
      </button>
      <div className="drp-stepper-track">
        {steps.map((step, i) => (
          <button
            key={i}
            className={`drp-stepper-item${active === i ? ' is-active' : ''}`}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
          >
            <span className="drp-stepper-badge">{i + 1}</span>
            <span className="drp-stepper-label">{step}</span>
          </button>
        ))}
      </div>
      <button
        className="drp-stepper-nav drp-stepper-nav--next"
        aria-label="Next step"
        disabled={active === steps.length - 1}
        onClick={() => setActive(a => Math.min(steps.length - 1, a + 1))}
      >
        <ChevronRight />
      </button>
    </div>
  )
}

export default function StepperPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Stepper</h1>
        <p className="doc-page-header__desc">
          A step-progress indicator for multi-step checkout and wizard flows.
          Each step shows a numbered badge and a label. The active step is
          underlined in blue; inactive steps show a 1px gray baseline.
          A compact mobile variant collapses inactive steps to badge-only width
          and supports optional prev/next navigation arrows.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Stepper</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=2348-14585" target="_blank" rel="noreferrer">View in Figma ↗</a>
          <a className="doc-page-header__link" href="https://aecgm-dev.tekion.xyz/docs/ui-components/" target="_blank" rel="noreferrer">Storybook ↗</a>
        </div>
      </div>

      {/* Variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">Variants</h2>
        <p className="doc-section__subtitle">Two size variants: Large (48px) for desktop page flows, and Small (40px) for mobile — inactive steps collapse to badge-only with optional navigation arrows.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{padding:'20px 24px'}}>
              <StepperLg steps={['Vehicle', 'Options', 'Review']} ariaLabel="Desktop stepper example" />
            </div>
            <div className="doc-variant-card__label">Large — 48px</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{padding:'20px 24px'}}>
              <StepperSm steps={['Vehicle', 'Options', 'Review']} ariaLabel="Mobile stepper example" />
            </div>
            <div className="doc-variant-card__label">Small — 40px</div>
          </div>
        </div>
      </div>

      {/* Step Counts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Step Counts</h2>
        <p className="doc-section__subtitle">Stepper supports 2–4 steps. Steps are equal-width on desktop; the mobile variant collapses inactive steps so only the active label is visible.</p>

        <div className="doc-variant-card" style={{marginBottom:'24px'}}>
          <div className="doc-variant-card__preview" style={{padding:'20px 24px'}}>
            <StepperLg steps={['Vehicle', 'Review']} />
          </div>
          <div className="doc-variant-card__label">2 steps</div>
        </div>

        <div className="doc-variant-card" style={{marginBottom:'24px'}}>
          <div className="doc-variant-card__preview" style={{padding:'20px 24px'}}>
            <StepperLg steps={['Vehicle', 'Finance', 'Review']} />
          </div>
          <div className="doc-variant-card__label">3 steps</div>
        </div>

        <div className="doc-variant-card">
          <div className="doc-variant-card__preview" style={{padding:'20px 24px'}}>
            <StepperLg steps={['Vehicle', 'Options', 'Finance', 'Review']} />
          </div>
          <div className="doc-variant-card__label">4 steps (maximum)</div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="doc-section">
        <h2 className="doc-section__title">Mobile Navigation</h2>
        <p className="doc-section__subtitle">The mobile stepper compresses inactive steps to 32px (badge only). Optional prev/next arrows navigate through steps. Click any step or use the arrows below.</p>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px', marginBottom:'24px'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{padding:'20px 24px'}}>
              <StepperSm steps={['Vehicle', 'Options', 'Finance', 'Review']} ariaLabel="Mobile navigation demo" />
            </div>
            <div className="doc-variant-card__label">Small — 40px · 4 steps · with navigation arrows</div>
          </div>
        </div>
      </div>

      {/* Code */}
      <div className="doc-section">
        <h2 className="doc-section__title">Code</h2>
        <p className="doc-section__subtitle">Desktop (<code>--lg</code>) is a flat row of full steps. Mobile (<code>--sm</code>) wraps the step list in a <code>.drp-stepper-track</code> with optional <code>--prev</code> / <code>--next</code> nav buttons — inactive steps collapse to <code>.drp-stepper-compact-w</code> (32px) and only the active step expands. Selection is driven by the component's <code>onClick</code> handlers (React state); there are no data-attribute hooks.</p>
        <pre className="doc-code"><span className="hl-com">&lt;!-- Desktop (Large) --&gt;</span>{'\n'}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-stepper-container drp-stepper-container--lg"</span> <span className="hl-attr">role</span>=<span className="hl-val">"tablist"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-stepper-item is-active"</span> <span className="hl-attr">role</span>=<span className="hl-val">"tab"</span> <span className="hl-attr">aria-selected</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-stepper-badge"</span><span className="hl-tag">&gt;</span>1<span className="hl-tag">&lt;/span&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-stepper-label"</span><span className="hl-tag">&gt;</span>Vehicle<span className="hl-tag">&lt;/span&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;/button&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'\n'}<span className="hl-com">&lt;!-- Mobile (Small) with nav arrows --&gt;</span>{'\n'}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-stepper-container drp-stepper-container--sm"</span> <span className="hl-attr">role</span>=<span className="hl-val">"tablist"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-stepper-nav drp-stepper-nav--prev"</span><span className="hl-tag">&gt;…&lt;/button&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-stepper-track"</span><span className="hl-tag">&gt;…&lt;/div&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-stepper-nav drp-stepper-nav--next"</span><span className="hl-tag">&gt;…&lt;/button&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span></pre>
      </div>

      {/* Design Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">All 18 tokens are defined in <code>styles/tokens.css</code>. Four are overridden per brand — <code>--stepper-border-active</code>, <code>--stepper-badge-bg</code>, <code>--stepper-font-family</code>, and <code>--stepper-badge-font-family</code> (see <strong>Brand notes</strong>). Everything else is brand-invariant.</p>

        <h3 className="doc-token-group">Sizing &amp; layout</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--stepper-height-lg</code></td><td>48px</td><td>Desktop (Large) row height</td></tr>
              <tr><td><code>--stepper-height-sm</code></td><td>40px</td><td>Mobile (Small) row height</td></tr>
              <tr><td><code>--stepper-nav-size</code></td><td>40px</td><td>Width/height of <code>.drp-stepper-nav</code> prev/next buttons</td></tr>
              <tr><td><code>--stepper-compact-w</code></td><td>32px</td><td>Collapsed width of inactive mobile step (badge-only)</td></tr>
              <tr><td><code>--stepper-padding-x</code></td><td>16px</td><td>Horizontal padding inside each step</td></tr>
              <tr><td><code>--stepper-gap</code></td><td>8px</td><td>Gap between the badge and label inside a step</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Underline / baseline</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--stepper-border-default</code></td><td><span className="doc-swatch" style={{background:'#e6e6e6', border:'1px solid #ccc'}}></span>#e6e6e6</td><td>1px gray baseline under every step (brand-invariant)</td></tr>
              <tr><td><code>--stepper-border-active</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td><td>Active step underline color (<strong>overridden per brand</strong>)</td></tr>
              <tr><td><code>--stepper-underline</code></td><td>4px</td><td>Active-step underline thickness (brand-invariant)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Badge</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--stepper-badge-bg</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td><td>Badge background (<strong>overridden per brand</strong>)</td></tr>
              <tr><td><code>--stepper-badge-text</code></td><td><span className="doc-swatch" style={{background:'#ffffff', border:'1px solid #ddd'}}></span>#ffffff</td><td>Badge text color (brand-invariant)</td></tr>
              <tr><td><code>--stepper-badge-size</code></td><td>16px</td><td>Badge height / min-width (auto-widens to fit digits)</td></tr>
              <tr><td><code>--stepper-badge-radius</code></td><td>1000px</td><td>Full round pill</td></tr>
              <tr><td><code>--stepper-badge-font-family</code></td><td>'Chevy_Sans:Demi'</td><td>Badge font (<strong>overridden per brand</strong>)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Label typography</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--stepper-text</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Step label + nav-arrow color (brand-invariant)</td></tr>
              <tr><td><code>--stepper-font-family</code></td><td>'Chevy_Sans:Demi'</td><td>Label font (<strong>overridden per brand</strong>)</td></tr>
              <tr><td><code>--stepper-font-size</code></td><td>16px</td><td>Label size (brand-invariant)</td></tr>
              <tr><td><code>--stepper-lh</code></td><td>24px</td><td>Label line-height (brand-invariant)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">Narrow brand surface — four tokens override per brand. The gray baseline (<code>#e6e6e6</code>), underline thickness (<code>4px</code>), badge text (<code>#ffffff</code>), label color (<code>#262626</code>), sizes, and layout are all brand-invariant.</p>
        <ul className="doc-brand-list">
          <li><strong>Buick</strong> — <code>--stepper-border-active</code> and <code>--stepper-badge-bg</code> → <code>var(--brand-color)</code> (<span className="doc-swatch" style={{background:'#D44400'}}></span><code>#D44400</code>). Fonts → <code>Buick_Text</code> (both label and badge).</li>
          <li><strong>GMC</strong> — <code>--stepper-border-active</code> and <code>--stepper-badge-bg</code> → <code>var(--brand-color)</code> (<span className="doc-swatch" style={{background:'#CC0000'}}></span><code>#CC0000</code>). Fonts → <code>StratumGMC</code> (both).</li>
          <li><strong>Cadillac</strong> — <code>--stepper-border-active</code> and <code>--stepper-badge-bg</code> <em>hardcode</em> <span className="doc-swatch" style={{background:'#171473'}}></span><code>#171473</code> (not routed through <code>var(--brand-color)</code> — same pattern as Slider). Fonts → <code>Cadillac_Gothic</code> (both — unlike Slider, Stepper does not split between <code>Cadillac_Gothic</code> and the <code>_Narrow</code> face).</li>
        </ul>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Keep step labels to 1–2 words — the mobile variant must fit the active label in the available space.</li>
              <li>Always show all steps including future ones — users need to understand the full flow upfront.</li>
              <li>Use the mobile variant (Small) on viewports below 768px and the desktop variant (Large) above.</li>
              <li>Include prev/next arrows on mobile when steps are not directly tappable.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't use more than 4 steps — the mobile stepper becomes difficult to navigate.</li>
              <li>Don't skip steps or reorder them without user action — the numbered badges imply a sequence.</li>
              <li>Don't use Stepper for tab-based content switching — use the Tabs component instead.</li>
              <li>Don't add icons or extra content inside step items — the badge number is the only permitted indicator.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
