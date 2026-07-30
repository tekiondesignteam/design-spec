import { useState, useRef, type ChangeEvent, type FormEvent } from 'react'

const SearchIconSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16 16L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const ClearIconSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

function SearchWithSuggestions({ isGo, suggestions, ariaLabel, placeholder }: {
  isGo?: boolean
  suggestions: string[]
  ariaLabel?: string
  placeholder?: string
}) {
  const [value, setValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const filtered = value.trim()
    ? suggestions.filter(s => s.toLowerCase().includes(value.trim().toLowerCase()))
    : []

  const handleInput = (e: FormEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>) => {
    const v = (e.target as HTMLInputElement).value
    setValue(v)
    setIsOpen(v.trim().length > 0)
  }

  const handleFocus = () => {
    if (value.trim()) setIsOpen(true)
  }

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 150)
  }

  const handleClear = () => {
    setValue('')
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleSelect = (item: string) => {
    setValue(item)
    setIsOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div
      ref={wrapperRef}
      className={`search${isGo ? ' search--go' : ''}${isOpen ? ' search--open' : ''}`}
      style={{maxWidth:'100%', width:'100%'}}
    >
      <div className={`search__field${isOpen ? ' is-active' : ''}`}>
        {!isGo && (
          <span className="search__icon"><SearchIconSvg /></span>
        )}
        <input
          ref={inputRef}
          type="text"
          className="search__input"
          placeholder={placeholder || 'Search vehicles…'}
          aria-label={ariaLabel || 'Search'}
          autoComplete="off"
          value={value}
          onInput={handleInput}
          onChange={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {value && (
          <button className="search__clear is-visible" aria-label="Clear search" onMouseDown={e => e.preventDefault()} onClick={handleClear}>
            <ClearIconSvg />
          </button>
        )}
        {isGo && (
          <>
            <div className="search__divider"></div>
            <button className="search__go" aria-label="Submit search">Go</button>
          </>
        )}
      </div>
      {isOpen && (
        <div className="search__menu">
          {filtered.length > 0 ? filtered.map(item => (
            <div
              key={item}
              className="search__menu-item"
              data-value={item}
              onMouseDown={e => e.preventDefault()}
              onClick={() => handleSelect(item)}
            >
              {item}
            </div>
          )) : (
            <div className="search__menu-empty">No results for &ldquo;{value}&rdquo;</div>
          )}
        </div>
      )}
    </div>
  )
}

const SUGGESTIONS_1 = [
  'Chevrolet Silverado', 'Chevrolet Blazer', 'Chevrolet Equinox',
  'Chevrolet Malibu', 'Chevrolet Colorado', 'Chevrolet Tahoe',
  'Chevrolet Traverse', 'Chevrolet Trax'
]
const SUGGESTIONS_2 = [
  'GMC Sierra', 'GMC Canyon', 'GMC Acadia',
  'GMC Terrain', 'GMC Yukon', 'GMC Savana',
  'GMC Envoy', 'GMC Jimmy'
]

export default function SearchPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Search</h1>
        <p className="doc-page-header__desc">
          A search input field with an inline search icon, a clear button that appears when the
          field has a value, and an optional autocomplete suggestion dropdown. Includes a "Go"
          variant that adds a bold action label and divider on the trailing edge.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Search</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=1860-13798" target="_blank" rel="noreferrer">View in Figma ↗</a>
          <a className="doc-page-header__link" href="https://aecgm-dev.tekion.xyz/docs/ui-components/" target="_blank" rel="noreferrer">Storybook ↗</a>
        </div>
      </div>

      {/* Variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">Variants</h2>
        <p className="doc-section__subtitle">Two variants: the standard search field with a left magnifier icon, and the Go variant which moves the icon to the right and adds a bold "Go" label with a divider.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr 1fr'}}>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="search" style={{maxWidth:'320px', width:'100%'}}>
                <div className="search__field">
                  <span className="search__icon"><SearchIconSvg /></span>
                  <input type="text" className="search__input" placeholder="Search" aria-label="Search" />
                  <button className="search__clear" aria-label="Clear search" tabIndex={-1}><ClearIconSvg /></button>
                </div>
              </div>
            </div>
            <div className="doc-variant-card__label">Default</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="search search--go" style={{maxWidth:'320px', width:'100%'}}>
                <div className="search__field">
                  <input type="text" className="search__input" placeholder="Search" aria-label="Search" />
                  <button className="search__clear" aria-label="Clear search" tabIndex={-1}><ClearIconSvg /></button>
                  <div className="search__divider"></div>
                  <button className="search__go" aria-label="Submit search">Go</button>
                </div>
              </div>
            </div>
            <div className="doc-variant-card__label">With Go</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="search search--disabled" style={{maxWidth:'320px', width:'100%'}}>
                <div className="search__field">
                  <span className="search__icon"><SearchIconSvg /></span>
                  <input type="text" className="search__input" placeholder="Search" aria-label="Search" disabled />
                </div>
              </div>
            </div>
            <div className="doc-variant-card__label">Disabled</div>
          </div>

        </div>

        <pre className="doc-code"><span className="hl-com">&lt;!-- Default --&gt;</span>{'\n'}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"search"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"search__field"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"search__icon"</span><span className="hl-tag">&gt;</span>...<span className="hl-tag">&lt;/span&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;input</span> <span className="hl-attr">type</span>=<span className="hl-val">"text"</span> <span className="hl-attr">class</span>=<span className="hl-val">"search__input"</span> <span className="hl-attr">placeholder</span>=<span className="hl-val">"Search"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"search__clear"</span><span className="hl-tag">&gt;</span>...<span className="hl-tag">&lt;/button&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span></pre>
      </div>

      {/* States */}
      <div className="doc-section">
        <h2 className="doc-section__title">States</h2>
        <p className="doc-section__subtitle">All interactive states shown for both variants. The clear button appears only when the field has a value.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{flexDirection:'column', alignItems:'stretch', gap:'24px', width:'100%'}}>
              <div>
                <div className="doc-state-label">Default (empty)</div>
                <div className="search"><div className="search__field" style={{pointerEvents:'none'}}>
                  <span className="search__icon"><SearchIconSvg /></span>
                  <input type="text" className="search__input" placeholder="Search" tabIndex={-1} readOnly />
                </div></div>
              </div>
              <div>
                <div className="doc-state-label">Hover</div>
                <div className="search"><div className="search__field is-hovered" style={{pointerEvents:'none'}}>
                  <span className="search__icon"><SearchIconSvg /></span>
                  <input type="text" className="search__input" placeholder="Search" tabIndex={-1} readOnly />
                </div></div>
              </div>
              <div>
                <div className="doc-state-label">Active / Has value</div>
                <div className="search"><div className="search__field is-active" style={{pointerEvents:'none'}}>
                  <span className="search__icon"><SearchIconSvg /></span>
                  <input type="text" className="search__input" defaultValue="Chevrolet Silverado" tabIndex={-1} readOnly />
                  <button className="search__clear is-visible" tabIndex={-1} aria-label="Clear" style={{pointerEvents:'none'}}><ClearIconSvg /></button>
                </div></div>
              </div>
              <div>
                <div className="doc-state-label" style={{color:'#c3cfd9'}}>Disabled</div>
                <div className="search search--disabled"><div className="search__field">
                  <span className="search__icon"><SearchIconSvg /></span>
                  <input type="text" className="search__input" placeholder="Search" disabled tabIndex={-1} />
                </div></div>
              </div>
            </div>
            <div className="doc-variant-card__label">Standard</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{flexDirection:'column', alignItems:'stretch', gap:'24px', width:'100%'}}>
              <div>
                <div className="doc-state-label">Default (empty)</div>
                <div className="search search--go"><div className="search__field" style={{pointerEvents:'none'}}>
                  <input type="text" className="search__input" placeholder="Search" tabIndex={-1} readOnly />
                  <div className="search__divider"></div>
                  <button className="search__go" tabIndex={-1} style={{pointerEvents:'none'}}>Go</button>
                </div></div>
              </div>
              <div>
                <div className="doc-state-label">Hover</div>
                <div className="search search--go"><div className="search__field is-hovered" style={{pointerEvents:'none'}}>
                  <input type="text" className="search__input" placeholder="Search" tabIndex={-1} readOnly />
                  <div className="search__divider"></div>
                  <button className="search__go" tabIndex={-1} style={{pointerEvents:'none'}}>Go</button>
                </div></div>
              </div>
              <div>
                <div className="doc-state-label">Active / Has value</div>
                <div className="search search--go"><div className="search__field is-active" style={{pointerEvents:'none'}}>
                  <input type="text" className="search__input" defaultValue="GMC Sierra" tabIndex={-1} readOnly />
                  <button className="search__clear is-visible" tabIndex={-1} aria-label="Clear" style={{pointerEvents:'none'}}><ClearIconSvg /></button>
                  <div className="search__divider"></div>
                  <button className="search__go" tabIndex={-1} style={{pointerEvents:'none'}}>Go</button>
                </div></div>
              </div>
              <div>
                <div className="doc-state-label" style={{color:'#c3cfd9'}}>Disabled</div>
                <div className="search search--go search--disabled"><div className="search__field">
                  <input type="text" className="search__input" placeholder="Search" disabled tabIndex={-1} />
                  <div className="search__divider"></div>
                  <button className="search__go" tabIndex={-1} disabled>Go</button>
                </div></div>
              </div>
            </div>
            <div className="doc-variant-card__label">With Go</div>
          </div>

        </div>
      </div>

      {/* With Suggestions */}
      <div className="doc-section">
        <h2 className="doc-section__title">With Suggestions</h2>
        <p className="doc-section__subtitle">Type in the field below to see autocomplete suggestions. The dropdown appears when the field has a value. Click a suggestion to select it, or click × to clear.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>

          <div className="doc-variant-card" style={{overflow:'visible'}}>
            <div className="doc-variant-card__preview" style={{alignItems:'stretch', paddingBottom:'200px'}}>
              <SearchWithSuggestions suggestions={SUGGESTIONS_1} ariaLabel="Search vehicles" placeholder="Search vehicles…" />
            </div>
            <div className="doc-variant-card__label">Standard</div>
          </div>

          <div className="doc-variant-card" style={{overflow:'visible'}}>
            <div className="doc-variant-card__preview" style={{alignItems:'stretch', paddingBottom:'200px'}}>
              <SearchWithSuggestions isGo suggestions={SUGGESTIONS_2} ariaLabel="Search vehicles" placeholder="Search vehicles…" />
            </div>
            <div className="doc-variant-card__label">With Go</div>
          </div>

        </div>
      </div>

      {/* Design Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">All tokens are defined in <code>styles/tokens.css</code>. Search owns the <code>--search-*</code> family (14 tokens).</p>
        <p className="doc-section__subtitle" style={{marginTop:'-4px'}}><strong>Search inherits typography from <code>--menu-font-family</code> and <code>--menu-font-family-selected</code>. See the <a href="/components/menu">Menu page</a> for font tokens.</strong></p>

        <h3 className="doc-token-group">Container &amp; layout</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--search-height</code></td><td>56px</td></tr>
              <tr><td><code>--search-bg</code></td><td><span className="doc-swatch" style={{background:'#f2f2f2', border:'1px solid #ddd'}}></span>#f2f2f2</td></tr>
              <tr><td><code>--search-border-width</code></td><td>2px (bottom border only)</td></tr>
              <tr><td><code>--search-border-radius</code></td><td>4px (top corners; bottom is flat)</td></tr>
              <tr><td><code>--search-padding-x</code></td><td>16px</td></tr>
              <tr><td><code>--search-gap</code></td><td>16px (icon ↔ input ↔ clear)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Border — state ramp</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--search-border-default</code></td><td><span className="doc-swatch" style={{background:'#e6e6e6'}}></span>#e6e6e6</td></tr>
              <tr><td><code>--search-border-hover</code></td><td><span className="doc-swatch" style={{background:'#b3b3b3'}}></span>#b3b3b3</td></tr>
              <tr><td><code>--search-border-active</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Color — text &amp; icons</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--search-text</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626 (typed value + Go label)</td></tr>
              <tr><td><code>--search-placeholder</code></td><td><span className="doc-swatch" style={{background:'#666666'}}></span>#666666</td></tr>
              <tr><td><code>--search-text-disabled</code></td><td><span className="doc-swatch" style={{background:'#b3b3b3'}}></span>#b3b3b3</td></tr>
              <tr><td><code>--search-icon</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td></tr>
              <tr><td><code>--search-icon-disabled</code></td><td><span className="doc-swatch" style={{background:'#c3cfd9'}}></span>#c3cfd9</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">Class hooks: <code>.search</code> (root — note: Search is one of two unprefixed components; see CLAUDE.md), <code>.search--go</code>, <code>.search--disabled</code>, <code>.search--open</code>. Child elements: <code>.search__field</code>, <code>.search__icon</code>, <code>.search__input</code>, <code>.search__clear</code>, <code>.search__divider</code>, <code>.search__go</code>, <code>.search__menu</code>, <code>.search__menu-item</code>, <code>.search__menu-empty</code>. All defined in <code>styles/global.css</code>.</p>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">No <code>--search-*</code> token is directly overridden in <code>brands.css</code>. Brand re-themes reach Search indirectly: the input and Go label consume <code>--menu-font-family</code> / <code>--menu-font-family-selected</code>, and the suggestions dropdown uses Menu's own state tokens — so any brand-swap to the Menu family propagates here.</p>
        <ul className="doc-brand-list">
          <li><strong>Buick</strong> — Input + Go font swap to <code>Buick_Text</code> (regular) / <code>Buick_Text:Bold</code> (selected + Go label) via shared Menu tokens. Suggestion items pick up Buick's <code>--menu-item-bg-hover</code> <code>#efedea</code>. Field colors (border ramp, bg) stay at Chevy defaults.</li>
          <li><strong>GMC</strong> — Font swaps to <code>StratumGMC</code> (regular + Bold) via Menu tokens. Suggestions hover background becomes <code>#ebebeb</code>. Field ramp unchanged.</li>
          <li><strong>Cadillac</strong> — Font swaps to <code>Cadillac_Gothic_Narrow</code> (regular + Bold) via Menu tokens. No Search-specific color overrides; field keeps the neutral border ramp. The Cadillac navy doesn't appear on Search — it's pure type re-theming.</li>
        </ul>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Always include a search icon — it sets user expectation that this field triggers a query.</li>
              <li>Show the clear (×) button as soon as the field has any value so users can reset quickly.</li>
              <li>Use the "Go" variant when search requires an explicit submit action (e.g., a new page load).</li>
              <li>Show at most 5–7 suggestions; use a scrollable list for longer sets.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't remove the search icon — the field looks like a plain text input without it.</li>
              <li>Don't show suggestions when the field is empty — only open the dropdown after the user starts typing.</li>
              <li>Don't use both a left search icon and a "Go" button together — the Go variant uses no left icon.</li>
              <li>Don't use this component for non-search contexts; use Text Input for form fields.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
