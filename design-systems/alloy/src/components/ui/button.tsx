import type { MouseEvent, ReactNode } from 'react'

export type ButtonSize = 'large' | 'medium' | 'small'
export type ButtonVariant = 'filled' | 'outlined' | 'plain'
export type ButtonTheme = 'primary' | 'inverse'

export type ButtonProps = {
  children: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
  theme?: ButtonTheme
  disabled?: boolean
  className?: string
  tabIndex?: number
  ariaLabel?: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

/**
 * Reusable contained button atom. Mirrors the documented variants on this page —
 * use this in molecules / templates instead of re-typing the class strings.
 */
export function Button({
  children,
  size = 'large',
  variant = 'filled',
  theme = 'primary',
  disabled,
  className,
  tabIndex,
  ariaLabel,
  onClick,
}: ButtonProps) {
  const cls = [
    `drp-button-contained-container-bg-${size}`,
    `drp-button-contained-color-${theme}-${variant}`,
    disabled ? 'drp-disabled' : '',
    className ?? '',
  ].filter(Boolean).join(' ')
  return (
    <button
      type="button"
      className={cls}
      disabled={disabled}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function ButtonPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Button</h1>
        <p className="doc-page-header__desc">
          Contained buttons trigger actions. The <strong>Primary filled</strong> variant is the strongest
          visual weight and should appear only once per view as the main call-to-action.
          Use <strong>Outline</strong> for secondary actions and <strong>Plain</strong> for low-emphasis
          contextual actions. Use <strong>Inverse</strong> variants on dark or image backgrounds.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Button - Primary</span>
          <span className="doc-tag doc-tag--blue">Button - Inverse</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=4740-60659" target="_blank" rel="noreferrer">View in Figma ↗</a>
          <a className="doc-page-header__link" href="https://aecgm-dev.tekion.xyz/docs/ui-components/?path=/story/ui-components-button--primary" target="_blank" rel="noreferrer">Storybook ↗</a>
        </div>
      </div>

      {/* Primary – Style Variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">Primary — Style Variants</h2>
        <p className="doc-section__subtitle">Three visual styles for different levels of emphasis. All use the same size tokens; only color tokens differ.</p>
        <div className="doc-variant-grid">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-filled">Button</button>
            </div>
            <div className="doc-variant-card__label">Filled (default)</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-outlined">Button</button>
            </div>
            <div className="doc-variant-card__label">Outline</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-plain">Button</button>
            </div>
            <div className="doc-variant-card__label">Plain</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Filled --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-container-bg-large drp-button-contained-color-primary-filled"</span><span className="hl-tag">&gt;</span><span className="hl-text">Button</span><span className="hl-tag">&lt;/button&gt;</span>{'\n\n'}<span className="hl-tag">&lt;!-- Outline --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-container-bg-large drp-button-contained-color-primary-outlined"</span><span className="hl-tag">&gt;</span><span className="hl-text">Button</span><span className="hl-tag">&lt;/button&gt;</span>{'\n\n'}<span className="hl-tag">&lt;!-- Plain --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-container-bg-large drp-button-contained-color-primary-plain"</span><span className="hl-tag">&gt;</span><span className="hl-text">Button</span><span className="hl-tag">&lt;/button&gt;</span></pre>
      </div>

      {/* Primary – Interactive States */}
      <div className="doc-section">
        <h2 className="doc-section__title">Primary — Interactive States</h2>
        <p className="doc-section__subtitle">All states are shown below.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-filled" style={{pointerEvents:'none'}}>Default</button>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-filled is-hovered" style={{pointerEvents:'none'}}>Hover / Pressed</button>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-filled drp-disabled" style={{pointerEvents:'none'}} disabled>Disabled</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Filled states</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-outlined" style={{pointerEvents:'none'}}>Default</button>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-outlined is-hovered" style={{pointerEvents:'none'}}>Hover / Pressed</button>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-outlined drp-disabled" style={{pointerEvents:'none'}} disabled>Disabled</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Outline states</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-plain" style={{pointerEvents:'none'}}>Default</button>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-plain is-hovered" style={{pointerEvents:'none'}}>Hover / Pressed</button>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-plain drp-disabled" style={{pointerEvents:'none'}} disabled>Disabled</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Plain states</div>
          </div>
        </div>
      </div>

      {/* Primary – Sizes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Primary — Sizes</h2>
        <p className="doc-section__subtitle">Three size options: Large (48px), Medium (40px), Small (32px). Size modifiers apply to all style variants.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-filled">Large (48px)</button>
                <button className="drp-button-contained-container-bg-medium drp-button-contained-color-primary-filled">Medium (40px)</button>
                <button className="drp-button-contained-container-bg-small drp-button-contained-color-primary-filled">Small (32px)</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Filled</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-outlined">Large (48px)</button>
                <button className="drp-button-contained-container-bg-medium drp-button-contained-color-primary-outlined">Medium (40px)</button>
                <button className="drp-button-contained-container-bg-small drp-button-contained-color-primary-outlined">Small (32px)</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Outline</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-plain">Large (48px)</button>
                <button className="drp-button-contained-container-bg-medium drp-button-contained-color-primary-plain">Medium (40px)</button>
                <button className="drp-button-contained-container-bg-small drp-button-contained-color-primary-plain">Small (32px)</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Plain</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Large (default) --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-container-bg-large drp-button-contained-color-primary-filled"</span><span className="hl-tag">&gt;</span><span className="hl-text">Button</span><span className="hl-tag">&lt;/button&gt;</span>{'\n\n'}<span className="hl-tag">&lt;!-- Medium --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-container-bg-medium drp-button-contained-color-primary-filled"</span><span className="hl-tag">&gt;</span><span className="hl-text">Button</span><span className="hl-tag">&lt;/button&gt;</span>{'\n\n'}<span className="hl-tag">&lt;!-- Small --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-container-bg-small drp-button-contained-color-primary-filled"</span><span className="hl-tag">&gt;</span><span className="hl-text">Button</span><span className="hl-tag">&lt;/button&gt;</span></pre>
      </div>

      {/* Primary – With Icons */}
      <div className="doc-section">
        <h2 className="doc-section__title">Primary — With Icons</h2>
        <p className="doc-section__subtitle">Leading and trailing icons can be added inside the button. Icons inherit <code>currentColor</code>.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{gap:'20px'}}>
              <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-filled">
                <i className="drp-icon drp-icon--plus" aria-hidden="true"></i>
                Leading Icon
              </button>
              <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-filled">
                Trailing Icon
                <i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
            <div className="doc-variant-card__label">Filled</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{gap:'20px'}}>
              <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-outlined">
                <i className="drp-icon drp-icon--plus" aria-hidden="true"></i>
                Leading Icon
              </button>
              <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-outlined">
                Trailing Icon
                <i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
            <div className="doc-variant-card__label">Outline</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-plain">
                  <i className="drp-icon drp-icon--plus" aria-hidden="true"></i>
                  Leading Icon
                </button>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-primary-plain">
                  Trailing Icon
                  <i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div className="doc-variant-card__label">Plain</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Leading icon --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-container-bg-large drp-button-contained-color-primary-filled"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;i</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-icon drp-icon--plus"</span> <span className="hl-attr">aria-hidden</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;&lt;/i&gt;</span>{'\n'}{'  '}<span className="hl-text">Button Label</span>{'\n'}<span className="hl-tag">&lt;/button&gt;</span>{'\n\n'}<span className="hl-tag">&lt;!-- Trailing icon --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-container-bg-large drp-button-contained-color-primary-filled"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-text">Button Label</span>{'\n'}{'  '}<span className="hl-tag">&lt;i</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-icon drp-icon--circle-arrow-right"</span> <span className="hl-attr">aria-hidden</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;&lt;/i&gt;</span>{'\n'}<span className="hl-tag">&lt;/button&gt;</span></pre>
      </div>

      {/* Inverse – Style Variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">Inverse — Style Variants</h2>
        <p className="doc-section__subtitle">Use Inverse buttons on dark or image-filled backgrounds. The Filled variant uses a white background with dark text.</p>
        <div className="doc-variant-grid">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-filled">Button</button>
            </div>
            <div className="doc-variant-card__label">Filled (default)</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-outlined">Button</button>
            </div>
            <div className="doc-variant-card__label">Outline</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-plain">Button</button>
            </div>
            <div className="doc-variant-card__label">Plain</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Filled --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-container-bg-large drp-button-contained-color-inverse-filled"</span><span className="hl-tag">&gt;</span><span className="hl-text">Button</span><span className="hl-tag">&lt;/button&gt;</span>{'\n\n'}<span className="hl-tag">&lt;!-- Outline --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-container-bg-large drp-button-contained-color-inverse-outlined"</span><span className="hl-tag">&gt;</span><span className="hl-text">Button</span><span className="hl-tag">&lt;/button&gt;</span>{'\n\n'}<span className="hl-tag">&lt;!-- Plain --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-container-bg-large drp-button-contained-color-inverse-plain"</span><span className="hl-tag">&gt;</span><span className="hl-text">Button</span><span className="hl-tag">&lt;/button&gt;</span></pre>
      </div>

      {/* Inverse – Interactive States */}
      <div className="doc-section">
        <h2 className="doc-section__title">Inverse — Interactive States</h2>
        <p className="doc-section__subtitle">All states are shown below.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-filled" style={{pointerEvents:'none'}}>Default</button>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-filled" style={{pointerEvents:'none', backgroundColor:'#e6e6e6'}}>Hover / Pressed</button>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-filled" style={{pointerEvents:'none', backgroundColor:'rgba(255,255,255,0.4)', color:'rgba(255,255,255,0.5)', cursor:'not-allowed'}} disabled>Disabled</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Filled states</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-outlined" style={{pointerEvents:'none'}}>Default</button>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-outlined" style={{pointerEvents:'none', backgroundColor:'rgba(255,255,255,0.1)'}}>Hover / Pressed</button>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-outlined" style={{pointerEvents:'none', borderColor:'rgba(255,255,255,0.4)', color:'rgba(255,255,255,0.4)', cursor:'not-allowed'}} disabled>Disabled</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Outline states</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-plain" style={{pointerEvents:'none'}}>Default</button>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-plain" style={{pointerEvents:'none', color:'#e6e6e6'}}>Hover / Pressed</button>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-plain" style={{pointerEvents:'none', color:'rgba(255,255,255,0.4)', cursor:'not-allowed'}} disabled>Disabled</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Plain states</div>
          </div>
        </div>
      </div>

      {/* Inverse – Sizes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Inverse — Sizes</h2>
        <p className="doc-section__subtitle">Three size options: Large (48px), Medium (40px), Small (32px). Size modifiers apply to all style variants.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-filled">Large (48px)</button>
                <button className="drp-button-contained-container-bg-medium drp-button-contained-color-inverse-filled">Medium (40px)</button>
                <button className="drp-button-contained-container-bg-small drp-button-contained-color-inverse-filled">Small (32px)</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Filled</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-outlined">Large (48px)</button>
                <button className="drp-button-contained-container-bg-medium drp-button-contained-color-inverse-outlined">Medium (40px)</button>
                <button className="drp-button-contained-container-bg-small drp-button-contained-color-inverse-outlined">Small (32px)</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Outline</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-plain">Large (48px)</button>
                <button className="drp-button-contained-container-bg-medium drp-button-contained-color-inverse-plain">Medium (40px)</button>
                <button className="drp-button-contained-container-bg-small drp-button-contained-color-inverse-plain">Small (32px)</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Plain</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Large (default) --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-container-bg-large drp-button-contained-color-inverse-filled"</span><span className="hl-tag">&gt;</span><span className="hl-text">Button</span><span className="hl-tag">&lt;/button&gt;</span>{'\n\n'}<span className="hl-tag">&lt;!-- Medium --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-container-bg-medium drp-button-contained-color-inverse-filled"</span><span className="hl-tag">&gt;</span><span className="hl-text">Button</span><span className="hl-tag">&lt;/button&gt;</span>{'\n\n'}<span className="hl-tag">&lt;!-- Small --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-container-bg-small drp-button-contained-color-inverse-filled"</span><span className="hl-tag">&gt;</span><span className="hl-text">Button</span><span className="hl-tag">&lt;/button&gt;</span></pre>
      </div>

      {/* Inverse – With Icons */}
      <div className="doc-section">
        <h2 className="doc-section__title">Inverse — With Icons</h2>
        <p className="doc-section__subtitle">Leading and trailing icons can be added inside the button. Icons inherit <code>currentColor</code>.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark" style={{gap:'20px'}}>
              <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-filled">
                <i className="drp-icon drp-icon--plus" aria-hidden="true"></i>
                Leading Icon
              </button>
              <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-filled">
                Trailing Icon
                <i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
            <div className="doc-variant-card__label">Filled</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark" style={{gap:'20px'}}>
              <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-outlined">
                <i className="drp-icon drp-icon--plus" aria-hidden="true"></i>
                Leading Icon
              </button>
              <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-outlined">
                Trailing Icon
                <i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
            <div className="doc-variant-card__label">Outline</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-plain">
                  <i className="drp-icon drp-icon--plus" aria-hidden="true"></i>
                  Leading Icon
                </button>
                <button className="drp-button-contained-container-bg-large drp-button-contained-color-inverse-plain">
                  Trailing Icon
                  <i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div className="doc-variant-card__label">Plain</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Leading icon --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-container-bg-large drp-button-contained-color-inverse-filled"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;i</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-icon drp-icon--plus"</span> <span className="hl-attr">aria-hidden</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;&lt;/i&gt;</span>{'\n'}{'  '}<span className="hl-text">Button Label</span>{'\n'}<span className="hl-tag">&lt;/button&gt;</span>{'\n\n'}<span className="hl-tag">&lt;!-- Trailing icon --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-button-contained-container-bg-large drp-button-contained-color-inverse-filled"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-text">Button Label</span>{'\n'}{'  '}<span className="hl-tag">&lt;i</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-icon drp-icon--circle-arrow-right"</span> <span className="hl-attr">aria-hidden</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;&lt;/i&gt;</span>{'\n'}<span className="hl-tag">&lt;/button&gt;</span></pre>
      </div>

      {/* Design Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">Chevy base values shown, grouped by category. Base tokens live in <code>styles/tokens.css</code>; Buick, GMC, and Cadillac override selected tokens in <code>styles/brands.css</code> (see Brand notes below). Each group highlights the representative tokens — full size/state matrices expand to ~90+ variables.</p>

        <h3 className="doc-token-group">Contained — Primary (filled / outlined / plain)</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--button-contained-container-bg-large-height</code></td><td>48px</td><td>Large container height</td></tr>
              <tr><td><code>--button-contained-container-bg-large-padding</code></td><td>0 24px</td><td>Horizontal padding (large)</td></tr>
              <tr><td><code>--button-contained-container-bg-large-border-radius</code></td><td>8px</td><td>Border radius (all sizes)</td></tr>
              <tr><td><code>--button-contained-container-bg-large-border-width</code></td><td>2px</td><td>Border width (all sizes)</td></tr>
              <tr><td><code>--button-contained-color-primary-filled-background-color</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td><td>Filled default bg</td></tr>
              <tr><td><code>--button-contained-color-primary-filled-color</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ccc'}}></span>#ffffff</td><td>Filled default text</td></tr>
              <tr><td><code>--button-contained-color-primary-outlined-border-color</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td><td>Outlined default border</td></tr>
              <tr><td><code>--button-contained-color-primary-plain-color</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td><td>Plain default text</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">+ medium (40px) and small (32px) container heights with matching padding/gap, and <code>hover</code>/<code>active</code>/<code>disabled</code> state tokens for each of the three style variants.</p>

        <h3 className="doc-token-group">Contained — Inverse (filled / outlined / plain)</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--button-contained-color-inverse-filled-background-color</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ccc'}}></span>#ffffff</td><td>Filled default bg</td></tr>
              <tr><td><code>--button-contained-color-inverse-filled-color</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Filled default text</td></tr>
              <tr><td><code>--button-contained-color-inverse-outlined-color</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ccc'}}></span>#ffffff</td><td>Outlined default text/border</td></tr>
              <tr><td><code>--button-contained-color-inverse-plain-color</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ccc'}}></span>#ffffff</td><td>Plain default text</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">+ <code>hover</code>/<code>disabled</code> state tokens for bg, border, and text on each of the three style variants. Sizing tokens are shared with Contained Primary.</p>

        <h3 className="doc-token-group">Icon-button — Rectangular</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--button-contained-icon-container-rect-bg-large-height</code></td><td>48px</td><td>Large square height</td></tr>
              <tr><td><code>--button-contained-icon-container-rect-bg-large-width</code></td><td>48px</td><td>Large square width</td></tr>
              <tr><td><code>--button-contained-icon-container-rect-bg-large-border-radius</code></td><td>8px</td><td>Corner rounding</td></tr>
              <tr><td><code>--button-contained-icon-container-rect-bg-large-border-width</code></td><td>2px</td><td>Outlined border width</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">+ medium (40px) and small (32px) size variants. Color tokens are shared with Contained — icon-buttons re-use <code>--button-contained-color-primary-*</code> and <code>-inverse-*</code>.</p>

        <h3 className="doc-token-group">Icon-button — Circular</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--button-contained-icon-container-circle-bg-large-height</code></td><td>48px</td><td>Large circle height</td></tr>
              <tr><td><code>--button-contained-icon-container-circle-bg-large-width</code></td><td>48px</td><td>Large circle width</td></tr>
              <tr><td><code>--button-contained-icon-container-circle-bg-large-border-radius</code></td><td>50%</td><td>Full-round corners</td></tr>
              <tr><td><code>--button-contained-icon-container-circle-bg-large-border-width</code></td><td>2px</td><td>Outlined border width</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">+ medium (40px) and small (32px) size variants. Always a perfect circle — GMC and Cadillac override the <em>rectangular</em> icon-button radius to <code>0</code> but leave circle at 50%.</p>

        <h3 className="doc-token-group">Typography</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--button-contained-typography-large-font-family</code></td><td>'Chevy_Sans:Demi', sans-serif</td><td>Label font family</td></tr>
              <tr><td><code>--button-contained-typography-large-font-weight</code></td><td>600</td><td>Weight (Demi)</td></tr>
              <tr><td><code>--button-contained-typography-large-font-size</code></td><td>16px</td><td>Large label size</td></tr>
              <tr><td><code>--button-contained-typography-large-line-height</code></td><td>24px</td><td>Large line height</td></tr>
              <tr><td><code>--button-contained-typography-large-letter-spacing</code></td><td>0</td><td>Tracking (Chevy base)</td></tr>
              <tr><td><code>--button-contained-typography-large-text-transform</code></td><td>none</td><td>Case (Chevy base)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">+ matching <code>-medium</code> (14px/22px) and <code>-small</code> (12px/20px) typography sets. Buick and GMC bump all three sizes up to 18/25, 16/22, 14/20. GMC and Cadillac switch <code>text-transform</code> to <code>uppercase</code>; <code>letter-spacing</code> is <code>0</code> for every brand per Figma.</p>

        <h3 className="doc-token-group">Contained — Neutral (filled / outlined / plain)</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--button-contained-color-neutral-filled-background-color</code></td><td><span className="doc-swatch" style={{background:'#1a1a1a'}}></span>#1a1a1a</td></tr>
              <tr><td><code>--button-contained-color-neutral-filled-color</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ccc'}}></span>#ffffff</td></tr>
              <tr><td><code>--button-contained-color-neutral-filled-hover-background-color</code></td><td><span className="doc-swatch" style={{background:'#333'}}></span>#333333</td></tr>
              <tr><td><code>--button-contained-color-neutral-outlined-border-color</code></td><td><span className="doc-swatch" style={{background:'#1a1a1a'}}></span>#1a1a1a</td></tr>
              <tr><td><code>--button-contained-color-neutral-outlined-color</code></td><td><span className="doc-swatch" style={{background:'#1a1a1a'}}></span>#1a1a1a</td></tr>
              <tr><td><code>--button-contained-color-neutral-plain-color</code></td><td><span className="doc-swatch" style={{background:'#1a1a1a'}}></span>#1a1a1a</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">+21 more neutral vars across <code>filled</code> / <code>outlined</code> / <code>plain</code> for <code>icon-color</code>, <code>hover</code>, and <code>disabled</code> states. Neutral is a brand-agnostic dark treatment — <strong>no brand overrides any neutral token</strong>. Class hooks: <code>.drp-button-contained-color-neutral-filled|outlined|plain</code> (defined in <code>styles/global.css:387–719</code>). No demo is rendered above because the site's own JSX does not currently consume these classes; they exist in CSS for downstream product surfaces.</p>

        <p className="doc-section__subtitle" style={{marginTop:'24px'}}>Full token list: see <code>styles/tokens.css</code> lines 10–226 for every size, state, and style variant, and <code>styles/brands.css</code> for per-brand overrides.</p>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">Per-brand overrides applied to Button via <code>[data-brand]</code> blocks in <code>styles/brands.css</code>. Chevrolet uses the base values shown in the Design Tokens section above.</p>
        <ul className="doc-brand-list">
          <li>
            <strong>Buick</strong> — Primary filled swaps to a dark ramp (bg <code>#333333</code>, hover/active <code>#6f6f6d</code>, disabled <code>#d7d5d3</code>). Outlined uses a warm off-white surface (<code>#f6f5f4</code>) with <code>#333333</code> border and <code>#222222</code> text; hover bg deepens to <code>#d7d5d3</code>. Plain text uses <code>var(--brand-color)</code> (<code>#D44400</code>) across default/hover/active, with <code>#a7a6a4</code> disabled. Typography switches to <code>'Buick_Text'</code>; contained labels use <code>font-weight: 500</code> (Medium, vs Chevy 600) and link/inline-button labels use <code>font-weight: 400</code> (Regular, vs Chevy 500). Buick also bumps every size up: large 18/25, medium 16/22, small 14/20 (vs Chevy 16/24, 14/22, 12/20). No uppercase or letter-spacing.
          </li>
          <li>
            <strong>GMC</strong> — All container and rectangular icon-button radii drop to <code>0</code> (square corners). Filled default inverts to white bg + <code>#CC0000</code> border + <code>#060505</code> text; hover/active flips to red bg with white text. Outlined default uses <code>#060505</code> border + text; hover/active invert to <code>#25282A</code> bg + white text. Plain runs <code>#CC0000</code> → <code>#25282A</code> (hover) → <code>#060505</code> (active), disabled <code>#929495</code>. Typography: <code>'StratumGMC'</code>, <code>text-transform: uppercase</code> across all sizes. Contained labels use <code>font-weight: 500</code> (Medium, vs Chevy 600); link/inline-button labels use <code>font-weight: 400</code> (Regular, vs Chevy 500). GMC also bumps every size up: large 18/25, medium 16/22, small 14/20 (vs Chevy 16/24, 14/22, 12/20). Letter-spacing is <code>0</code> per Figma.
          </li>
          <li>
            <strong>Cadillac</strong> — All container and rectangular icon-button radii drop to <code>0</code>. Filled default is navy <code>#171473</code> + white text; hover/active invert to transparent bg + <code>#282828</code> border + <code>#282828</code> text (outlined look). Outlined default uses <code>#282828</code> border + text; hover/active fill to <code>#282828</code> bg + white text. Plain: <code>#171473</code> default, <code>#211fab</code> hover/active. Typography: <code>'Cadillac_Gothic'</code>, <code>text-transform: uppercase</code> across all sizes. Contained labels use <code>font-weight: 500</code> (Medium, vs Chevy 600); link/inline-button labels use <code>font-weight: 400</code> (Regular, vs Chevy 500). Font sizes match Chevy (16/14/12). Letter-spacing is <code>0</code> per Figma.
          </li>
        </ul>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Use <strong>one</strong> filled Primary button per view as the main call-to-action (e.g. "Schedule Test Drive").</li>
              <li>Use Outline for secondary page-level actions that complement the primary CTA.</li>
              <li>Use Plain for low-emphasis, contextual actions within a content section.</li>
              <li>Use Inverse variants inside hero banners, dark overlays, or photo backgrounds.</li>
              <li>Always provide a meaningful label — avoid labels like "Click here".</li>
              <li>Use the <code>disabled</code> HTML attribute for truly unavailable actions so screen readers announce the state.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't use more than one <strong>filled Primary</strong> button side-by-side — it removes visual hierarchy.</li>
              <li>Don't place a Primary button on a dark or photo background — use Inverse Filled instead.</li>
              <li>Don't mix more than two button styles in the same action group (e.g. no Plain + Outline + Filled together).</li>
              <li>Don't truncate button labels — if the label doesn't fit, shorten the copy instead of clipping text.</li>
              <li>Don't use buttons for navigation between pages — use links for that purpose.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
