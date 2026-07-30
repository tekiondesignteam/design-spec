import { useState, useRef, useEffect } from 'react'

const TickSvg = () => (
  <span className="menu__tick">
    <svg viewBox="0 0 16 16" fill="none">
      <path d="M2.5 8.5L6 12L13.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </span>
)

const ChevronSvg = ({ isOpen = false }: { isOpen?: boolean }) => (
  <span style={{ display: 'inline-flex', width: '1em', height: '1em', transition: 'transform 0.15s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
    <svg viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </span>
)

const SearchIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

function InteractiveMenuDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('Colorado')
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const items = [
    { label: 'Silverado' },
    { label: 'Colorado' },
    { label: 'Tahoe' },
    { label: 'Suburban' },
    { label: 'Blazer' },
    { label: 'Corvette (unavailable)', disabled: true },
  ]

  const handleSelect = (label: string) => {
    setSelected(label)
    setIsOpen(false)
  }

  return (
    <div style={{position:'relative', display:'inline-block'}} ref={containerRef}>
      <button
        className="drp-button-contained-container-bg-medium drp-button-contained-color-primary-plain"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(o => !o)}
      >
        {selected || 'Select model'}
        <ChevronSvg isOpen={isOpen} />
      </button>
      {isOpen && (
        <div className="drp-list-container-bg is-open" role="menu" aria-label="Select vehicle model" style={{top:'calc(100% + 4px)', left:0}}>
          {items.map(item => (
            <button
              key={item.label}
              className={`drp-list-item-container-bg${selected === item.label ? ' is-selected' : ''}${item.disabled ? ' drp-disabled' : ''}`}
              role="menuitem"
              aria-checked={selected === item.label}
              disabled={item.disabled}
              onClick={() => !item.disabled && handleSelect(item.label)}
            >
              <div className="menu__body"><span className="menu__label">{item.label}</span></div>
              <TickSvg />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function SearchMenuDemo() {
  const [query, setQuery] = useState('')
  const ALL_ITEMS = [
    { label: 'Silverado' },
    { label: 'Colorado', selected: true },
    { label: 'Tahoe' },
    { label: 'Suburban' },
    { label: 'Blazer' },
    { label: 'Equinox' },
    { label: 'Traverse' },
  ]
  const filtered = query.trim()
    ? ALL_ITEMS.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))
    : ALL_ITEMS

  return (
    <div className="drp-list-container-bg is-open" style={{position:'static', width:'240px'}}>
      <div className="menu__search">
        <div className="menu__search-row">
          <span className="menu__search-icon"><SearchIcon /></span>
          <input
            type="text"
            className="menu__search-input"
            placeholder="Search models…"
            aria-label="Search menu items"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="menu__search-line"></div>
      </div>
      {filtered.map(item => (
        <button key={item.label} className={`drp-list-item-container-bg${item.selected ? ' is-selected' : ''}`} role="menuitem">
          <div className="menu__body"><span className="menu__label">{item.label}</span></div>
          <TickSvg />
        </button>
      ))}
    </div>
  )
}

export default function MenuPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Menu</h1>
        <p className="doc-page-header__desc">
          A floating list of options that appears on demand — typically triggered by a button or dropdown field.
          Items support a <strong>selected</strong> state with a checkmark indicator
          and an optional <strong>description</strong> line below the label.
          Sections can be separated with <strong>dividers</strong> and labelled with <strong>headers</strong>.
          A built-in <strong>search</strong> row filters the list as the user types.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Menu</span>
          <span className="doc-tag doc-tag--blue">.Menu List</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=3769-50175" target="_blank" rel="noreferrer">View in Figma ↗</a>
        </div>
      </div>

      {/* Variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">Variants</h2>
        <p className="doc-section__subtitle">Two item types: a standard label-only item and an item with a secondary description line. Both support selected and disabled states.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{alignItems:'flex-start', padding:'20px 0'}}>
              <div className="drp-list-container-bg is-open" style={{position:'static', width:'100%', maxWidth:'240px', boxShadow:'none', borderRadius:0, padding:0}}>
                <button className="drp-list-item-container-bg" style={{pointerEvents:'none'}}>
                  <div className="menu__body"><span className="menu__label">Option label</span></div>
                  <TickSvg />
                </button>
                <button className="drp-list-item-container-bg is-selected" style={{pointerEvents:'none'}}>
                  <div className="menu__body"><span className="menu__label">Selected option</span></div>
                  <TickSvg />
                </button>
                <button className="drp-list-item-container-bg drp-disabled" style={{pointerEvents:'none'}}>
                  <div className="menu__body"><span className="menu__label">Disabled option</span></div>
                  <TickSvg />
                </button>
              </div>
            </div>
            <div className="doc-variant-card__label">Standard</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{alignItems:'flex-start', padding:'20px 0'}}>
              <div className="drp-list-container-bg is-open" style={{position:'static', width:'100%', maxWidth:'240px', boxShadow:'none', borderRadius:0, padding:0}}>
                <button className="drp-list-item-container-bg" style={{pointerEvents:'none'}}>
                  <div className="menu__body"><span className="menu__label">Option label</span><span className="menu__desc">Secondary detail text</span></div>
                  <TickSvg />
                </button>
                <button className="drp-list-item-container-bg is-selected" style={{pointerEvents:'none'}}>
                  <div className="menu__body"><span className="menu__label">Selected option</span><span className="menu__desc">Secondary detail text</span></div>
                  <TickSvg />
                </button>
                <button className="drp-list-item-container-bg drp-disabled" style={{pointerEvents:'none'}}>
                  <div className="menu__body"><span className="menu__label">Disabled option</span><span className="menu__desc">Secondary detail text</span></div>
                  <TickSvg />
                </button>
              </div>
            </div>
            <div className="doc-variant-card__label">With Description</div>
          </div>

        </div>

        <pre className="doc-code"><span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-list-item-container-bg"</span> <span className="hl-attr">role</span>=<span className="hl-val">"menuitem"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"menu__body"</span><span className="hl-tag">&gt;</span><span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"menu__label"</span><span className="hl-tag">&gt;</span>Option<span className="hl-tag">&lt;/span&gt;&lt;/div&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"menu__tick"</span><span className="hl-tag">&gt;</span>...<span className="hl-tag">&lt;/span&gt;</span>{'\n'}<span className="hl-tag">&lt;/button&gt;</span>{'\n'}{'\n'}<span className="hl-tag">&lt;!-- Selected --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-list-item-container-bg is-selected"</span> <span className="hl-attr">role</span>=<span className="hl-val">"menuitem"</span> <span className="hl-attr">aria-checked</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;</span>...<span className="hl-tag">&lt;/button&gt;</span></pre>
      </div>

      {/* Interactive Demo */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Demo</h2>
        <p className="doc-section__subtitle">Click the button to open the menu. Click an item to select it — the tick appears and the menu closes. Click outside to dismiss.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>

          <div className="doc-variant-card" style={{overflow:'visible'}}>
            <div className="doc-variant-card__preview" style={{flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start', padding:'24px', minHeight:'420px', overflow:'visible'}}>
              <InteractiveMenuDemo />
            </div>
            <div className="doc-variant-card__label">Click to open — click an item to select</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{alignItems:'flex-start', padding:'20px 0'}}>
              <div className="drp-list-container-bg is-open" style={{position:'static', width:'100%', maxWidth:'240px', boxShadow:'none', borderRadius:0, padding:0}}>
                {[
                  { label: 'Default', cls: '' },
                  { label: 'Hover', cls: ' is-hovered' },
                  { label: 'Pressed', cls: ' is-pressed' },
                  { label: 'Selected', cls: ' is-selected' },
                  { label: 'Disabled', cls: ' drp-disabled' },
                ].map(item => (
                  <button key={item.label} className={`drp-list-item-container-bg${item.cls}`} style={{pointerEvents:'none'}}>
                    <div className="menu__body"><span className="menu__label">{item.label}</span></div>
                    <TickSvg />
                  </button>
                ))}
              </div>
            </div>
            <div className="doc-variant-card__label">Item states reference</div>
          </div>

        </div>

        <pre className="doc-code"><span className="hl-com">&lt;!-- Wrap trigger + menu in a position:relative container --&gt;</span>{'\n'}<span className="hl-tag">&lt;div</span> <span className="hl-attr">style</span>=<span className="hl-val">"position:relative; display:inline-block;"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"..."</span> <span className="hl-attr">aria-haspopup</span>=<span className="hl-val">"menu"</span> <span className="hl-attr">aria-expanded</span>=<span className="hl-val">"false"</span><span className="hl-tag">&gt;</span>Select option<span className="hl-tag">&lt;/button&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-list-container-bg"</span> <span className="hl-attr">role</span>=<span className="hl-val">"menu"</span><span className="hl-tag">&gt;</span>...<span className="hl-tag">&lt;/div&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span></pre>
      </div>

      {/* With Description */}
      <div className="doc-section">
        <h2 className="doc-section__title">With Description</h2>
        <p className="doc-section__subtitle">Each item can carry a secondary description line below the label. Use it to clarify the option — keep it to one short sentence.</p>
        <div className="doc-variant-grid">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{alignItems:'flex-start', padding:'20px 0'}}>
              <div className="drp-list-container-bg is-open" style={{position:'static', minWidth:'280px', maxWidth:'320px'}}>
                {[
                  { label: 'Finance', desc: 'Pay monthly with approved credit', selected: false },
                  { label: 'Lease', desc: 'Lower monthly payment, fixed term', selected: true },
                  { label: 'Cash', desc: 'Full payment, no interest', selected: false },
                  { label: 'Balloon', desc: 'Not available in your region', disabled: true },
                ].map(item => (
                  <button key={item.label} className={`drp-list-item-container-bg${item.selected ? ' is-selected' : ''}${item.disabled ? ' drp-disabled' : ''}`} style={{pointerEvents:'none'}}>
                    <div className="menu__body">
                      <span className="menu__label">{item.label}</span>
                      <span className="menu__desc">{item.desc}</span>
                    </div>
                    <TickSvg />
                  </button>
                ))}
              </div>
            </div>
            <div className="doc-variant-card__label">Items with descriptions</div>
          </div>
        </div>
      </div>

      {/* Grouped with Header & Divider */}
      <div className="doc-section">
        <h2 className="doc-section__title">Grouped with Header &amp; Divider</h2>
        <p className="doc-section__subtitle">Use a <code>.menu__header</code> to label a section and a <code>.menu__divider</code> to visually separate groups of related options.</p>
        <div className="doc-variant-grid">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{alignItems:'flex-start', padding:'20px 0'}}>
              <div className="drp-list-container-bg is-open" style={{position:'static', width:'240px'}}>
                <div className="menu__header" role="presentation">Body Style</div>
                <button className="drp-list-item-container-bg" style={{pointerEvents:'none'}}>
                  <div className="menu__body"><span className="menu__label">Truck</span></div>
                  <TickSvg />
                </button>
                <button className="drp-list-item-container-bg is-selected" style={{pointerEvents:'none'}}>
                  <div className="menu__body"><span className="menu__label">SUV</span></div>
                  <TickSvg />
                </button>
                <div className="menu__divider" role="separator"></div>
                <div className="menu__header" role="presentation">Electric</div>
                <button className="drp-list-item-container-bg" style={{pointerEvents:'none'}}>
                  <div className="menu__body"><span className="menu__label">BEV</span></div>
                  <TickSvg />
                </button>
                <button className="drp-list-item-container-bg" style={{pointerEvents:'none'}}>
                  <div className="menu__body"><span className="menu__label">PHEV</span></div>
                  <TickSvg />
                </button>
              </div>
            </div>
            <div className="doc-variant-card__label">Grouped sections</div>
          </div>
        </div>
      </div>

      {/* With Search */}
      <div className="doc-section">
        <h2 className="doc-section__title">With Search</h2>
        <p className="doc-section__subtitle">An optional search row at the top filters visible items as the user types. Use when the list has more than 7–8 options.</p>
        <div className="doc-variant-grid">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{alignItems:'flex-start', padding:'20px 0'}}>
              <SearchMenuDemo />
            </div>
            <div className="doc-variant-card__label">Menu with search — type to filter</div>
          </div>
        </div>

        <pre className="doc-code"><span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-list-container-bg is-open"</span> <span className="hl-attr">role</span>=<span className="hl-val">"menu"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"menu__search"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"menu__search-row"</span><span className="hl-tag">&gt;</span>{'\n'}{'      '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"menu__search-icon"</span><span className="hl-tag">&gt;</span>...<span className="hl-tag">&lt;/span&gt;</span>{'\n'}{'      '}<span className="hl-tag">&lt;input</span> <span className="hl-attr">type</span>=<span className="hl-val">"text"</span> <span className="hl-attr">class</span>=<span className="hl-val">"menu__search-input"</span> <span className="hl-attr">placeholder</span>=<span className="hl-val">"Search…"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"menu__search-line"</span><span className="hl-tag">&gt;&lt;/div&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-list-item-container-bg"</span> <span className="hl-attr">role</span>=<span className="hl-val">"menuitem"</span><span className="hl-tag">&gt;</span>...<span className="hl-tag">&lt;/button&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span></pre>
      </div>

      {/* Design Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">All tokens are defined in <code>styles/tokens.css</code>. Menu owns the <code>--menu-*</code> family (30 tokens); per-brand overrides live in <code>styles/brands.css</code>.</p>

        <h3 className="doc-token-group">Container</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--menu-bg</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ccc'}}></span>#ffffff</td></tr>
              <tr><td><code>--menu-border</code></td><td><span className="doc-swatch" style={{background:'#e6e6e6'}}></span>#e6e6e6</td></tr>
              <tr><td><code>--menu-radius</code></td><td>4px</td></tr>
              <tr><td><code>--menu-width</code></td><td>240px (min-width)</td></tr>
              <tr><td><code>--menu-shadow</code></td><td>0 1px 2px rgba(0,0,0,.10), 0 1px 1px rgba(0,0,0,.06)</td></tr>
              <tr><td><code>--menu-py</code></td><td>8px (vertical padding)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Item layout</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--menu-item-px</code></td><td>24px</td></tr>
              <tr><td><code>--menu-item-py</code></td><td>12px</td></tr>
              <tr><td><code>--menu-item-gap</code></td><td>8px (label ↔ tick)</td></tr>
              <tr><td><code>--menu-icon-size</code></td><td>24px</td></tr>
              <tr><td><code>--menu-tick-size</code></td><td>16px</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Item color</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--menu-item-bg</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ccc'}}></span>#ffffff</td></tr>
              <tr><td><code>--menu-item-bg-hover</code></td><td><span className="doc-swatch" style={{background:'#f2f2f2'}}></span>#f2f2f2</td></tr>
              <tr><td><code>--menu-item-bg-selected</code></td><td><span className="doc-swatch" style={{background:'#f2f2f2'}}></span>#f2f2f2</td></tr>
              <tr><td><code>--menu-text</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td></tr>
              <tr><td><code>--menu-text-disabled</code></td><td><span className="doc-swatch" style={{background:'#b3b3b3'}}></span>#b3b3b3</td></tr>
              <tr><td><code>--menu-tick-color</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td></tr>
              <tr><td><code>--menu-divider-color</code></td><td><span className="doc-swatch" style={{background:'#e6e6e6'}}></span>#e6e6e6</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Typography</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--menu-font-family</code></td><td>'Chevy_Sans:Medium', sans-serif</td></tr>
              <tr><td><code>--menu-font-family-selected</code></td><td>'Chevy_Sans:Demi', sans-serif</td></tr>
              <tr><td><code>--menu-font-size</code></td><td>14px</td></tr>
              <tr><td><code>--menu-lh</code></td><td>22px</td></tr>
              <tr><td><code>--menu-header-size</code></td><td>12px (group headers)</td></tr>
              <tr><td><code>--menu-header-lh</code></td><td>20px</td></tr>
              <tr><td><code>--menu-desc-size</code></td><td>12px (description line)</td></tr>
              <tr><td><code>--menu-desc-lh</code></td><td>20px</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Description &amp; search row</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--menu-desc-text</code></td><td><span className="doc-swatch" style={{background:'#666'}}></span>#666666</td></tr>
              <tr><td><code>--menu-desc-disabled</code></td><td><span className="doc-swatch" style={{background:'#b3b3b3'}}></span>#b3b3b3</td></tr>
              <tr><td><code>--menu-search-border</code></td><td><span className="doc-swatch" style={{background:'#d2d2d2'}}></span>#d2d2d2</td></tr>
              <tr><td><code>--menu-search-px</code></td><td>16px</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">Class hooks: <code>.drp-list-container-bg</code> (popover), <code>.drp-list-item-container-bg</code> (item row) — defined in <code>styles/global.css</code>. Child elements use unprefixed BEM (<code>.menu__body</code>, <code>.menu__label</code>, <code>.menu__desc</code>, <code>.menu__tick</code>, <code>.menu__header</code>, <code>.menu__divider</code>, <code>.menu__search*</code>).</p>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">Token swaps only; no variant or layout changes. All three brands repaint tick color, swap the font, and tune item-hover and text colors; corner radius varies.</p>
        <ul className="doc-brand-list">
          <li><strong>Buick</strong> — Font swaps to <code>Buick_Text</code>. Type scales up: <code>--menu-font-size</code> 14→16px, <code>--menu-header-size</code> 12→14px. Palette warms: <code>--menu-text</code> <code>#222222</code>, <code>--menu-border</code> <code>#d7d5d3</code>, <code>--menu-item-bg-hover</code> + <code>-selected</code> <code>#efedea</code>. Tick routes through <code>var(--brand-color)</code> = <code>#D44400</code>. Radius unchanged (keeps Chevy's <code>4px</code>).</li>
          <li><strong>GMC</strong> — Font swaps to <code>StratumGMC</code>. Type scales up same as Buick (14→16px, 12→14px). Palette darkens: <code>--menu-text</code> <code>#060505</code>, <code>--menu-border</code> <code>#d4d4d4</code>, <code>--menu-item-bg-hover</code> + <code>-selected</code> <code>#ebebeb</code>. Tick routes through <code>var(--brand-color)</code> = <code>#CC0000</code>. <code>--menu-radius</code> drops to <code>0</code> (square corners).</li>
          <li><strong>Cadillac</strong> — Font swaps to <code>Cadillac_Gothic_Narrow</code>. Type size stays at Chevy's 14px (unlike Buick/GMC). <code>--menu-text</code> <code>#282828</code>, <code>--menu-border</code> <code>#d2d2d2</code>. Tick is navy <code>#171473</code>. <code>--menu-radius</code> is <code>2px</code> (distinct from both other brands).</li>
        </ul>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Always wrap the trigger + menu in a <code>position: relative</code> container so the menu positions correctly below the trigger.</li>
              <li>Mark the initially selected option with <code>is-selected</code> and <code>aria-checked="true"</code>.</li>
              <li>Add <code>aria-haspopup="menu"</code> and <code>aria-expanded</code> to the trigger button so screen readers announce the control correctly.</li>
              <li>Use a <code>.menu__header</code> to label groups when there are two or more distinct sections.</li>
              <li>Add the search row when the list has 8 or more items — it prevents long scrolling.</li>
              <li>Close the menu after an item is selected for single-select menus.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't use more than 10 items without a search or pagination — long lists overwhelm users.</li>
              <li>Don't nest menus inside menus — use a different pattern instead.</li>
              <li>Don't use <code>.menu__header</code> as a clickable item — it is purely a section label with no interaction.</li>
              <li>Don't let the menu overflow the viewport — position it to open upward or to the side if it would clip at the bottom.</li>
              <li>Don't mix icons on some items but not others within the same list.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
