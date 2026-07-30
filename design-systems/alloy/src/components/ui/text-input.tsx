import { useState, useRef, useEffect } from 'react'

const DropdownIcon = ({ stroke = '#262626' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={stroke} strokeWidth="1.5" />
    <path d="M8 11l4 4 4-4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="11" r="0.875" fill="currentColor" />
  </svg>
)

const InfoDotIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="5" r="0.875" fill="currentColor" />
    <path d="M8 7.5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const ITEMS = [
  { value: 'Silverado' },
  { value: 'Colorado' },
  { value: 'Tahoe' },
  { value: 'Suburban' },
  { value: 'Traverse' },
  { value: 'Blazer', label: 'Blazer (unavailable)', disabled: true },
]

function DropdownDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`drp-input-standard-outlined-container-bg-large drp-input-standard-outlined-container-bg-large--dropdown${isOpen ? ' drp-input-standard-outlined-container-bg-large--open' : ''}`}
      style={{ maxWidth: '320px', width: '100%', position: 'relative' }}
    >
      <div
        className={`drp-input-standard-outlined-field${isOpen ? ' is-active' : ''}`}
        style={{ cursor: 'pointer' }}
        onClick={() => setIsOpen(o => !o)}
      >
        <input
          type="text"
          className="drp-input-standard-outlined-input"
          placeholder=" "
          id="demo-dropdown-input"
          value={selected}
          readOnly
        />
        <label className="drp-input-standard-outlined-label" htmlFor="demo-dropdown-input">
          Vehicle model
        </label>
        <span
          className="drp-input-standard-outlined-icon"
          style={isOpen ? { transform: 'translateY(-50%) rotate(180deg)' } : undefined}
        >
          <DropdownIcon />
        </span>
        {isOpen && (
          <div className="drp-input-standard-outlined-menu">
            {ITEMS.map(item => (
              <div
                key={item.value}
                className={`drp-input-standard-outlined-menu-item${item.disabled ? ' drp-disabled' : ''}${selected === item.value ? ' is-selected' : ''}`}
                onClick={item.disabled ? undefined : (e) => {
                  e.stopPropagation()
                  setSelected(item.value)
                  setIsOpen(false)
                }}
              >
                {item.label || item.value}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function TextInputPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Text Input</h1>
        <p className="doc-page-header__desc">
          A single-line text field with a floating label. The label sits in the center of the field
          when empty and floats up to a smaller size when the field has a value or is focused.
          Includes a Dropdown variant for selection controls.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Text Input</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=2977-51504" target="_blank" rel="noreferrer">View in Figma ↗</a>
          <a className="doc-page-header__link" href="https://aecgm-dev.tekion.xyz/docs/ui-components/" target="_blank" rel="noreferrer">Storybook ↗</a>
        </div>
      </div>

      {/* Variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">Variants</h2>
        <p className="doc-section__subtitle">Two field types: a plain text input and a dropdown selector. Click into the text input to see the floating label in action.</p>

        <div className="doc-variant-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="drp-input-standard-outlined-container-bg-large" style={{ maxWidth: '280px', width: '100%' }}>
                <div className="drp-input-standard-outlined-field">
                  <input type="text" className="drp-input-standard-outlined-input" placeholder=" " id="v-ti-1" />
                  <label className="drp-input-standard-outlined-label" htmlFor="v-ti-1">First name</label>
                </div>
              </div>
            </div>
            <div className="doc-variant-card__label">Text Input</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="drp-input-standard-outlined-container-bg-large drp-input-standard-outlined-container-bg-large--dropdown" style={{ maxWidth: '280px', width: '100%' }}>
                <div className="drp-input-standard-outlined-field">
                  <input type="text" className="drp-input-standard-outlined-input" placeholder=" " id="v-dd-1" readOnly />
                  <label className="drp-input-standard-outlined-label" htmlFor="v-dd-1">State</label>
                  <span className="drp-input-standard-outlined-icon">
                    <DropdownIcon />
                  </span>
                </div>
              </div>
            </div>
            <div className="doc-variant-card__label">Dropdown</div>
          </div>

        </div>

        <pre className="doc-code"><span className="hl-com">&lt;!-- Text Input --&gt;</span>{'\n'}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-container-bg-large"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-field"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;input</span> <span className="hl-attr">type</span>=<span className="hl-val">"text"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-input"</span> <span className="hl-attr">placeholder</span>=<span className="hl-val">" "</span> <span className="hl-attr">id</span>=<span className="hl-val">"field-1"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;label</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-label"</span> <span className="hl-attr">for</span>=<span className="hl-val">"field-1"</span><span className="hl-tag">&gt;</span>First name<span className="hl-tag">&lt;/label&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'\n'}<span className="hl-com">&lt;!-- Dropdown — add the --dropdown modifier + trailing icon --&gt;</span>{'\n'}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-container-bg-large drp-input-standard-outlined-container-bg-large--dropdown"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-field"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;input</span> <span className="hl-attr">type</span>=<span className="hl-val">"text"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-input"</span> <span className="hl-attr">placeholder</span>=<span className="hl-val">" "</span> <span className="hl-attr">id</span>=<span className="hl-val">"field-2"</span> <span className="hl-attr">readonly</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;label</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-label"</span> <span className="hl-attr">for</span>=<span className="hl-val">"field-2"</span><span className="hl-tag">&gt;</span>State<span className="hl-tag">&lt;/label&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-icon"</span><span className="hl-tag">&gt;</span><span className="hl-com">&lt;!-- chevron SVG --&gt;</span><span className="hl-tag">&lt;/span&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span></pre>
      </div>

      {/* Dropdown Menu */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dropdown Menu</h2>
        <p className="doc-section__subtitle">The Dropdown variant opens a menu panel directly beneath the field. Click the field below to open it, then click an option to select it.</p>

        <div className="doc-variant-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>

          <div className="doc-variant-card" style={{ overflow: 'visible' }}>
            <div className="doc-variant-card__preview" style={{ alignItems: 'flex-start', minHeight: '380px', paddingTop: '24px', paddingBottom: '280px', position: 'relative', overflow: 'visible' }}>
              <DropdownDemo />
            </div>
            <div className="doc-variant-card__label">Interactive demo — click to open</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{ alignItems: 'flex-start' }}>
              <div style={{ width: '100%', maxWidth: '320px', borderLeft: '1px solid #b3b3b3', borderRight: '1px solid #b3b3b3', borderBottom: '1px solid #b3b3b3', borderRadius: '0 0 4px 4px', overflow: 'hidden', padding: '8px 0' }}>
                <div className="drp-input-standard-outlined-menu-item" style={{ pointerEvents: 'none' }}>Suggestion 1</div>
                <div className="drp-input-standard-outlined-menu-item" style={{ pointerEvents: 'none' }}>Suggestion 2</div>
                <div className="drp-input-standard-outlined-menu-item is-hovered" style={{ pointerEvents: 'none' }}>Suggestion 3</div>
                <div className="drp-input-standard-outlined-menu-item is-selected" style={{ pointerEvents: 'none' }}>Suggestion 4</div>
                <div className="drp-input-standard-outlined-menu-item drp-disabled" style={{ pointerEvents: 'none' }}>Suggestion 5 (disabled)</div>
              </div>
            </div>
            <div className="doc-variant-card__label">Menu item states</div>
          </div>

        </div>

        <div className="doc-variant-grid" style={{ marginTop: '16px' }}>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{ width: '100%', maxWidth: '280px', borderLeft: '1px solid #b3b3b3', borderRight: '1px solid #b3b3b3', borderBottom: '1px solid #b3b3b3', borderRadius: '0 0 4px 4px', padding: '8px 0' }}>
                <div className="drp-input-standard-outlined-menu-item" style={{ pointerEvents: 'none' }}>Option label</div>
              </div>
            </div>
            <div className="doc-variant-card__label">Default</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{ width: '100%', maxWidth: '280px', borderLeft: '1px solid #b3b3b3', borderRight: '1px solid #b3b3b3', borderBottom: '1px solid #b3b3b3', borderRadius: '0 0 4px 4px', padding: '8px 0' }}>
                <div className="drp-input-standard-outlined-menu-item is-hovered" style={{ pointerEvents: 'none' }}>Option label</div>
              </div>
            </div>
            <div className="doc-variant-card__label">Hover / Focused</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{ width: '100%', maxWidth: '280px', borderLeft: '1px solid #b3b3b3', borderRight: '1px solid #b3b3b3', borderBottom: '1px solid #b3b3b3', borderRadius: '0 0 4px 4px', padding: '8px 0' }}>
                <div className="drp-input-standard-outlined-menu-item is-selected" style={{ pointerEvents: 'none' }}>Option label</div>
              </div>
            </div>
            <div className="doc-variant-card__label">Selected</div>
          </div>

        </div>

        <pre className="doc-code"><span className="hl-com">&lt;!-- Open dropdown — add the --open modifier on the outer container --&gt;</span>{'\n'}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-container-bg-large drp-input-standard-outlined-container-bg-large--dropdown drp-input-standard-outlined-container-bg-large--open"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-field"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;input</span> <span className="hl-attr">type</span>=<span className="hl-val">"text"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-input"</span> <span className="hl-attr">placeholder</span>=<span className="hl-val">" "</span> <span className="hl-attr">id</span>=<span className="hl-val">"state"</span> <span className="hl-attr">readonly</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;label</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-label"</span> <span className="hl-attr">for</span>=<span className="hl-val">"state"</span><span className="hl-tag">&gt;</span>State<span className="hl-tag">&lt;/label&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-icon"</span><span className="hl-tag">&gt;</span><span className="hl-com">&lt;!-- icon --&gt;</span><span className="hl-tag">&lt;/span&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-menu"</span><span className="hl-tag">&gt;</span>{'\n'}{'      '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-menu-item"</span><span className="hl-tag">&gt;</span>California<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'      '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-menu-item is-selected"</span><span className="hl-tag">&gt;</span>Texas<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'      '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-menu-item"</span><span className="hl-tag">&gt;</span>Florida<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'      '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-menu-item drp-disabled"</span><span className="hl-tag">&gt;</span>N/A<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span></pre>
      </div>

      {/* States */}
      <div className="doc-section">
        <h2 className="doc-section__title">States</h2>
        <p className="doc-section__subtitle">All interactive states shown for both variants. Focus/Active states apply a 2px blue outline; Error and Disabled use distinct colors.</p>

        <div className="doc-variant-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>

          {/* Text Input States */}
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '24px', width: '100%' }}>

              <div>
                <div className="doc-state-label">Default (empty)</div>
                <div className="drp-input-standard-outlined-container-bg-large">
                  <div className="drp-input-standard-outlined-field" style={{ pointerEvents: 'none' }}>
                    <input type="text" className="drp-input-standard-outlined-input" placeholder=" " id="s-ti-default" tabIndex={-1} />
                    <label className="drp-input-standard-outlined-label" htmlFor="s-ti-default">Label</label>
                  </div>
                </div>
              </div>

              <div>
                <div className="doc-state-label">Has value</div>
                <div className="drp-input-standard-outlined-container-bg-large">
                  <div className="drp-input-standard-outlined-field" style={{ pointerEvents: 'none' }}>
                    <input type="text" className="drp-input-standard-outlined-input" placeholder=" " id="s-ti-value" defaultValue="John Smith" tabIndex={-1} />
                    <label className="drp-input-standard-outlined-label" htmlFor="s-ti-value">Full name</label>
                  </div>
                </div>
              </div>

              <div>
                <div className="doc-state-label">Hover</div>
                <div className="drp-input-standard-outlined-container-bg-large">
                  <div className="drp-input-standard-outlined-field is-hovered" style={{ pointerEvents: 'none' }}>
                    <input type="text" className="drp-input-standard-outlined-input" placeholder=" " id="s-ti-hover" tabIndex={-1} />
                    <label className="drp-input-standard-outlined-label" htmlFor="s-ti-hover">Label</label>
                  </div>
                </div>
              </div>

              <div>
                <div className="doc-state-label">Active / Focus</div>
                <div className="drp-input-standard-outlined-container-bg-large">
                  <div className="drp-input-standard-outlined-field is-active" style={{ pointerEvents: 'none' }}>
                    <input type="text" className="drp-input-standard-outlined-input" placeholder=" " id="s-ti-active" tabIndex={-1} />
                    <label className="drp-input-standard-outlined-label" htmlFor="s-ti-active">Label</label>
                  </div>
                </div>
              </div>

              <div>
                <div className="doc-state-label">Error</div>
                <div className="drp-input-standard-outlined-container-bg-large drp-input-standard-outlined-container-bg-large--error">
                  <div className="drp-input-standard-outlined-field" style={{ pointerEvents: 'none' }}>
                    <input type="text" className="drp-input-standard-outlined-input" placeholder=" " id="s-ti-error" defaultValue="john@" tabIndex={-1} />
                    <label className="drp-input-standard-outlined-label" htmlFor="s-ti-error">Email</label>
                  </div>
                  <p className="drp-input-standard-outlined-assistive"><ErrorIcon />Enter a valid email address</p>
                </div>
              </div>

              <div>
                <div className="doc-state-label" style={{ color: '#c3cfd9' }}>Disabled</div>
                <div className="drp-input-standard-outlined-container-bg-large drp-disabled">
                  <div className="drp-input-standard-outlined-field">
                    <input type="text" className="drp-input-standard-outlined-input" placeholder=" " id="s-ti-disabled" disabled tabIndex={-1} />
                    <label className="drp-input-standard-outlined-label" htmlFor="s-ti-disabled">Label</label>
                  </div>
                </div>
              </div>

            </div>
            <div className="doc-variant-card__label">Text Input</div>
          </div>

          {/* Dropdown States */}
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '24px', width: '100%' }}>

              <div>
                <div className="doc-state-label">Default (empty)</div>
                <div className="drp-input-standard-outlined-container-bg-large drp-input-standard-outlined-container-bg-large--dropdown">
                  <div className="drp-input-standard-outlined-field" style={{ pointerEvents: 'none' }}>
                    <input type="text" className="drp-input-standard-outlined-input" placeholder=" " id="s-dd-default" readOnly tabIndex={-1} />
                    <label className="drp-input-standard-outlined-label" htmlFor="s-dd-default">Label</label>
                    <span className="drp-input-standard-outlined-icon"><DropdownIcon /></span>
                  </div>
                </div>
              </div>

              <div>
                <div className="doc-state-label">Has value</div>
                <div className="drp-input-standard-outlined-container-bg-large drp-input-standard-outlined-container-bg-large--dropdown">
                  <div className="drp-input-standard-outlined-field" style={{ pointerEvents: 'none' }}>
                    <input type="text" className="drp-input-standard-outlined-input" placeholder=" " id="s-dd-value" defaultValue="California" readOnly tabIndex={-1} />
                    <label className="drp-input-standard-outlined-label" htmlFor="s-dd-value">State</label>
                    <span className="drp-input-standard-outlined-icon"><DropdownIcon /></span>
                  </div>
                </div>
              </div>

              <div>
                <div className="doc-state-label">Hover</div>
                <div className="drp-input-standard-outlined-container-bg-large drp-input-standard-outlined-container-bg-large--dropdown">
                  <div className="drp-input-standard-outlined-field is-hovered" style={{ pointerEvents: 'none' }}>
                    <input type="text" className="drp-input-standard-outlined-input" placeholder=" " id="s-dd-hover" readOnly tabIndex={-1} />
                    <label className="drp-input-standard-outlined-label" htmlFor="s-dd-hover">Label</label>
                    <span className="drp-input-standard-outlined-icon"><DropdownIcon /></span>
                  </div>
                </div>
              </div>

              <div>
                <div className="doc-state-label">Active / Open</div>
                <div className="drp-input-standard-outlined-container-bg-large drp-input-standard-outlined-container-bg-large--dropdown">
                  <div className="drp-input-standard-outlined-field is-active" style={{ pointerEvents: 'none' }}>
                    <input type="text" className="drp-input-standard-outlined-input" placeholder=" " id="s-dd-active" readOnly tabIndex={-1} />
                    <label className="drp-input-standard-outlined-label" htmlFor="s-dd-active">Label</label>
                    <span className="drp-input-standard-outlined-icon" style={{ transform: 'translateY(-50%) rotate(180deg)' }}><DropdownIcon /></span>
                  </div>
                </div>
              </div>

              <div>
                <div className="doc-state-label">Error</div>
                <div className="drp-input-standard-outlined-container-bg-large drp-input-standard-outlined-container-bg-large--dropdown drp-input-standard-outlined-container-bg-large--error">
                  <div className="drp-input-standard-outlined-field" style={{ pointerEvents: 'none' }}>
                    <input type="text" className="drp-input-standard-outlined-input" placeholder=" " id="s-dd-error" readOnly tabIndex={-1} />
                    <label className="drp-input-standard-outlined-label" htmlFor="s-dd-error">State</label>
                    <span className="drp-input-standard-outlined-icon"><DropdownIcon stroke="#c5001a" /></span>
                  </div>
                  <p className="drp-input-standard-outlined-assistive"><ErrorIcon />This field is required</p>
                </div>
              </div>

              <div>
                <div className="doc-state-label" style={{ color: '#c3cfd9' }}>Disabled</div>
                <div className="drp-input-standard-outlined-container-bg-large drp-input-standard-outlined-container-bg-large--dropdown drp-disabled">
                  <div className="drp-input-standard-outlined-field">
                    <input type="text" className="drp-input-standard-outlined-input" placeholder=" " id="s-dd-disabled" disabled readOnly tabIndex={-1} />
                    <label className="drp-input-standard-outlined-label" htmlFor="s-dd-disabled">Label</label>
                    <span className="drp-input-standard-outlined-icon"><DropdownIcon stroke="#c3cfd9" /></span>
                  </div>
                </div>
              </div>

            </div>
            <div className="doc-variant-card__label">Dropdown</div>
          </div>

        </div>
      </div>

      {/* With Assistive Text */}
      <div className="doc-section">
        <h2 className="doc-section__title">With Assistive Text</h2>
        <p className="doc-section__subtitle">An optional assistive text line below the field provides hints, character counts, or validation feedback. Error state turns the assistive text red.</p>

        <div className="doc-variant-grid">

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="drp-input-standard-outlined-container-bg-large" style={{ maxWidth: '280px', width: '100%' }}>
                <div className="drp-input-standard-outlined-field">
                  <input type="text" className="drp-input-standard-outlined-input" placeholder=" " id="asst-hint" />
                  <label className="drp-input-standard-outlined-label" htmlFor="asst-hint">Phone number</label>
                </div>
                <p className="drp-input-standard-outlined-assistive">e.g. (555) 000-0000</p>
              </div>
            </div>
            <div className="doc-variant-card__label">Helper hint</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="drp-input-standard-outlined-container-bg-large drp-input-standard-outlined-container-bg-large--error" style={{ maxWidth: '280px', width: '100%' }}>
                <div className="drp-input-standard-outlined-field">
                  <input type="text" className="drp-input-standard-outlined-input" placeholder=" " id="asst-error" defaultValue="not-an-email" />
                  <label className="drp-input-standard-outlined-label" htmlFor="asst-error">Email</label>
                </div>
                <p className="drp-input-standard-outlined-assistive"><ErrorIcon />Enter a valid email address</p>
              </div>
            </div>
            <div className="doc-variant-card__label">Error message</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="drp-input-standard-outlined-container-bg-large drp-input-standard-outlined-container-bg-large--dropdown" style={{ maxWidth: '280px', width: '100%' }}>
                <div className="drp-input-standard-outlined-field">
                  <input type="text" className="drp-input-standard-outlined-input" placeholder=" " id="asst-dd" defaultValue="California" readOnly />
                  <label className="drp-input-standard-outlined-label" htmlFor="asst-dd">State</label>
                  <span className="drp-input-standard-outlined-icon"><DropdownIcon /></span>
                </div>
                <p className="drp-input-standard-outlined-assistive"><InfoDotIcon />Select your state of residence</p>
              </div>
            </div>
            <div className="doc-variant-card__label">Dropdown with hint</div>
          </div>

        </div>

        <pre className="doc-code"><span className="hl-com">&lt;!-- With assistive hint --&gt;</span>{'\n'}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-container-bg-large"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-field"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;input</span> <span className="hl-attr">type</span>=<span className="hl-val">"text"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-input"</span> <span className="hl-attr">placeholder</span>=<span className="hl-val">" "</span> <span className="hl-attr">id</span>=<span className="hl-val">"phone"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;label</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-label"</span> <span className="hl-attr">for</span>=<span className="hl-val">"phone"</span><span className="hl-tag">&gt;</span>Phone number<span className="hl-tag">&lt;/label&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;p</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-assistive"</span><span className="hl-tag">&gt;</span>e.g. (555) 000-0000<span className="hl-tag">&lt;/p&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'\n'}<span className="hl-com">&lt;!-- Error — add the --error modifier to the outer container --&gt;</span>{'\n'}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-container-bg-large drp-input-standard-outlined-container-bg-large--error"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-field"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;input</span> <span className="hl-attr">type</span>=<span className="hl-val">"text"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-input"</span> <span className="hl-attr">placeholder</span>=<span className="hl-val">" "</span> <span className="hl-attr">id</span>=<span className="hl-val">"email"</span> <span className="hl-attr">value</span>=<span className="hl-val">"not-valid"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;label</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-label"</span> <span className="hl-attr">for</span>=<span className="hl-val">"email"</span><span className="hl-tag">&gt;</span>Email<span className="hl-tag">&lt;/label&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;p</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-input-standard-outlined-assistive"</span><span className="hl-tag">&gt;</span>Enter a valid email address<span className="hl-tag">&lt;/p&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span></pre>
      </div>

      {/* Design Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">All tokens are defined in <code>styles/tokens.css</code>. Text Input is driven primarily by the <code>--text-input-*</code> family (20 tokens). One typography token from the formal <code>--input-standard-outlined-*</code> family (<code>--input-standard-outlined-typography-font-family</code>) is also consumed — it's the only brand-overridden token.</p>

        <h3 className="doc-token-group">Container &amp; field</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--text-input-height</code></td><td>56px</td><td>Field height</td></tr>
              <tr><td><code>--text-input-bg</code></td><td><span className="doc-swatch" style={{ background: '#f2f2f2', border: '1px solid #ddd' }}></span>#f2f2f2</td><td>Field background fill</td></tr>
              <tr><td><code>--text-input-border-width</code></td><td>2px</td><td>Bottom border thickness</td></tr>
              <tr><td><code>--text-input-border-radius</code></td><td>4px 4px 0 0</td><td>Corner radius (top corners only)</td></tr>
              <tr><td><code>--text-input-padding-x</code></td><td>16px</td><td>Horizontal padding inside field</td></tr>
              <tr><td><code>--text-input-gap</code></td><td>4px</td><td>Gap between field and assistive text</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Border color — state ramp</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--text-input-border-default</code></td><td><span className="doc-swatch" style={{ background: '#e6e6e6' }}></span>#e6e6e6</td><td>Default border</td></tr>
              <tr><td><code>--text-input-border-hover</code></td><td><span className="doc-swatch" style={{ background: '#b3b3b3' }}></span>#b3b3b3</td><td>Hover border</td></tr>
              <tr><td><code>--text-input-border-active</code></td><td><span className="doc-swatch" style={{ background: '#262626' }}></span>#262626</td><td>Active / focus / open border</td></tr>
              <tr><td><code>--text-input-border-error</code></td><td><span className="doc-swatch" style={{ background: '#d64022' }}></span>#d64022</td><td>Error border</td></tr>
              <tr><td><code>--text-input-border-disabled</code></td><td><span className="doc-swatch" style={{ background: '#e6e6e6' }}></span>#e6e6e6</td><td>Disabled border (same as default)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Text color</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--text-input-value-color</code></td><td><span className="doc-swatch" style={{ background: '#262626' }}></span>#262626</td><td>Input value text</td></tr>
              <tr><td><code>--text-input-label-color</code></td><td><span className="doc-swatch" style={{ background: '#666666' }}></span>#666666</td><td>Floating label text</td></tr>
              <tr><td><code>--text-input-assistive-color</code></td><td><span className="doc-swatch" style={{ background: '#666666' }}></span>#666666</td><td>Assistive text (default)</td></tr>
              <tr><td><code>--text-input-disabled-color</code></td><td><span className="doc-swatch" style={{ background: '#b3b3b3' }}></span>#b3b3b3</td><td>Disabled — text, label, and icon color</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Error state</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--text-input-error-label</code></td><td><span className="doc-swatch" style={{ background: '#d64022' }}></span>#d64022</td><td>Label color when field has <code>--error</code></td></tr>
              <tr><td><code>--text-input-error-assistive</code></td><td><span className="doc-swatch" style={{ background: '#d64022' }}></span>#d64022</td><td>Assistive text color when field has <code>--error</code></td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Typography</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--text-input-value-size</code></td><td>16px</td><td>Input value + prompt-label font size</td></tr>
              <tr><td><code>--text-input-label-size</code></td><td>12px</td><td>Floated label font size</td></tr>
              <tr><td><code>--text-input-assistive-size</code></td><td>12px</td><td>Assistive text font size</td></tr>
              <tr><td><code>--input-standard-outlined-typography-font-family</code></td><td>Chevy_Sans:Medium</td><td>Input + label font (overridden per brand — see below)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">Font swaps only. Buick <code>Buick_Text</code>, GMC <code>StratumGMC</code>, Cadillac <code>Cadillac_Gothic_Narrow</code>; Chevy keeps <code>Chevy_Sans:Medium</code>. All colors — the <code>#f2f2f2</code> fill, the <code>#e6e6e6</code> → <code>#b3b3b3</code> → <code>#262626</code> border ramp, the <code>#d64022</code> error red, and the <code>#b3b3b3</code> disabled tone — hold constant across all four brands. No brand tints the field navy, orange, or red. The <code>4px 4px 0 0</code> top-rounded / flat-bottom radius also does not change per brand.</p>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Always pair the input with a visible label — the floating label doubles as both hint and label.</li>
              <li>Use <code>placeholder=" "</code> (a single space) on the input; the CSS relies on <code>:placeholder-shown</code> to detect the empty state.</li>
              <li>Use the <code>disabled</code> HTML attribute for unavailable fields so assistive technology announces the state.</li>
              <li>Pair an error state with an assistive text message explaining what went wrong.</li>
              <li>Use the Dropdown variant (with <code>readonly</code>) for fields that open a picker or select list.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't omit the <code>placeholder=" "</code> attribute — without it the floating label won't detect the empty state correctly.</li>
              <li>Don't use a red border alone to signal errors — always include the assistive error message.</li>
              <li>Don't use the plain Text Input for controlled-choice selections — use the Dropdown variant.</li>
              <li>Don't rely on color alone to indicate required fields — add explicit text or an asterisk in the label.</li>
              <li>Don't remove the focus ring — it is required for keyboard accessibility.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
