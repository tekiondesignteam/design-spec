export type AvatarSize = 'desktop' | 'mobile'

export function Avatar({ size = 'desktop', loggedOut = false, initials = 'AM', ariaLabel = 'Account menu' }: {
  size?: AvatarSize
  loggedOut?: boolean
  initials?: string
  ariaLabel?: string
}) {
  const cls = ['drp-avatar', size === 'mobile' ? 'drp-avatar--mobile' : '', loggedOut ? 'is-logged-out' : '']
    .filter(Boolean).join(' ')
  return (
    <button type="button" className={cls} aria-label={ariaLabel}>
      {loggedOut
        ? <span className="drp-avatar__user-icon" aria-hidden="true"></span>
        : <span className="drp-avatar__initials">{initials}</span>}
    </button>
  )
}

function Notification({ size = 'desktop', count = 1, ariaLabel }: {
  size?: AvatarSize
  count?: number
  ariaLabel?: string
}) {
  const display = count > 9 ? '9+' : String(count)
  const cls = ['drp-notification', size === 'mobile' ? 'drp-notification--mobile' : '', count === 0 ? 'is-empty' : '']
    .filter(Boolean).join(' ')
  return (
    <button type="button" className={cls} aria-label={ariaLabel ?? `${count} unread notifications`}>
      <span className="drp-notification__bell" aria-hidden="true"></span>
      <span className="drp-notification__badge">{display}</span>
    </button>
  )
}

function Cluster({ size, loggedOut, count = 1 }: {
  size: AvatarSize
  loggedOut: boolean
  count?: number
}) {
  return (
    <div className="drp-avatar-group">
      <Notification size={size} count={count} />
      <Avatar size={size} loggedOut={loggedOut} />
    </div>
  )
}

export default function AvatarPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Avatar + Notification</h1>
        <p className="doc-page-header__desc">
          Header-right cluster used in the global navigation bar. A notification bell with a
          brand-colored unread-count pill badge is paired with a user avatar disc — initials
          when signed-in, generic user icon when signed-out.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Avatar</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=20408-69707" target="_blank" rel="noreferrer">View in Figma ↗</a>
          <a className="doc-page-header__link" href="https://aecgm-dev.tekion.xyz/docs/ui-components/" target="_blank" rel="noreferrer">Storybook ↗</a>
        </div>
      </div>

      {/* All variants — one card per size × state */}
      <div className="doc-section">
        <h2 className="doc-section__title">Variants</h2>
        <p className="doc-section__subtitle">Two sizes (40px desktop · 32px mobile) × two states (logged-in with initials · logged-out with <code>circle-user</code> icon). The bell-with-badge stays the same in both states.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'repeat(2, 1fr)'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <Cluster size="desktop" loggedOut={false} count={1} />
            </div>
            <div className="doc-variant-card__label">Desktop · Logged-in · 40px</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <Cluster size="desktop" loggedOut={true} count={1} />
            </div>
            <div className="doc-variant-card__label">Desktop · Logged-out · 40px</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <Cluster size="mobile" loggedOut={false} count={1} />
            </div>
            <div className="doc-variant-card__label">Mobile · Logged-in · 32px</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <Cluster size="mobile" loggedOut={true} count={1} />
            </div>
            <div className="doc-variant-card__label">Mobile · Logged-out · 32px</div>
          </div>
        </div>
      </div>

      {/* Badge counts — one card per count variation */}
      <div className="doc-section">
        <h2 className="doc-section__title">Badge Counts</h2>
        <p className="doc-section__subtitle">Single-digit badges stay square-ish at 16×16px. Double-digit counts expand horizontally; counts above 9 show <code>9+</code>. A count of 0 hides the badge entirely.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'repeat(4, 1fr)'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview"><Notification count={0} /></div>
            <div className="doc-variant-card__label">0 · hidden</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview"><Notification count={1} /></div>
            <div className="doc-variant-card__label">1 · single digit</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview"><Notification count={12} /></div>
            <div className="doc-variant-card__label">12 · capped at 9+</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview"><Notification count={99} /></div>
            <div className="doc-variant-card__label">99 · capped at 9+</div>
          </div>
        </div>
      </div>

      {/* Code */}
      <div className="doc-section">
        <h2 className="doc-section__title">Code</h2>
        <p className="doc-section__subtitle">Minimal HTML — both buttons should have descriptive <code>aria-label</code>s. Mark the bell icon as <code>aria-hidden</code> and keep the badge count in the button's label for screen readers.</p>
        <pre className="doc-code"><span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-avatar-group"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-notification"</span> <span className="hl-attr">aria-label</span>=<span className="hl-val">"3 unread notifications"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-notification__bell"</span> <span className="hl-attr">aria-hidden</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;&lt;/span&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-notification__badge"</span><span className="hl-tag">&gt;</span>3<span className="hl-tag">&lt;/span&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;/button&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-avatar"</span> <span className="hl-attr">aria-label</span>=<span className="hl-val">"Account menu"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-avatar__initials"</span><span className="hl-tag">&gt;</span>AM<span className="hl-tag">&lt;/span&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;/button&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'\n'}<span className="hl-com">&lt;!-- Logged out — swap initials for user icon --&gt;</span>{'\n'}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-avatar is-logged-out"</span> <span className="hl-attr">aria-label</span>=<span className="hl-val">"Sign in"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-avatar__user-icon"</span> <span className="hl-attr">aria-hidden</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;&lt;/span&gt;</span>{'\n'}<span className="hl-tag">&lt;/button&gt;</span></pre>
      </div>

      {/* Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">All 31 tokens are defined in <code>styles/tokens.css</code> and consumed in <code>styles/global.css</code>. Only three are overridden per brand — <code>--notification-badge-bg</code>, <code>--avatar-initials-font-family</code>, and <code>--notification-badge-font-family</code> (see <strong>Brand notes</strong> below). Everything else is brand-invariant.</p>

        <h3 className="doc-token-group">Avatar sizing &amp; shape</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--avatar-size-desktop</code></td><td>40px</td><td>Disc diameter (desktop)</td></tr>
              <tr><td><code>--avatar-size-mobile</code></td><td>32px</td><td>Disc diameter (mobile)</td></tr>
              <tr><td><code>--avatar-radius</code></td><td>1000px</td><td>Full round (pill value forces a circle at any size)</td></tr>
              <tr><td><code>--avatar-gap</code></td><td>16px</td><td>Gap between the bell and the avatar inside <code>.drp-avatar-group</code></td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Avatar color &amp; stroke</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--avatar-bg</code></td><td>transparent</td><td>Disc fill — <strong>no fill</strong>; the stroke + initials / icon carry all visual weight</td></tr>
              <tr><td><code>--avatar-stroke-width</code></td><td>1.5px</td><td>Disc outline thickness</td></tr>
              <tr><td><code>--avatar-stroke-color</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Disc outline color</td></tr>
              <tr><td><code>--avatar-user-icon-color</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Logged-out user-icon color</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Initials typography</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--avatar-initials-color</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Initials text color (brand-invariant)</td></tr>
              <tr><td><code>--avatar-initials-font-family</code></td><td>'Chevy_Sans:Bold'</td><td>Initials font family (<strong>overridden per brand</strong>)</td></tr>
              <tr><td><code>--avatar-initials-font-weight</code></td><td>700</td><td>Bold on every brand</td></tr>
              <tr><td><code>--avatar-initials-font-size-desktop</code></td><td>14px</td><td>Initials size (desktop)</td></tr>
              <tr><td><code>--avatar-initials-font-size-mobile</code></td><td>12px</td><td>Initials size (mobile)</td></tr>
              <tr><td><code>--avatar-initials-lh</code></td><td>20px</td><td>Initials line-height</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Bell (trigger)</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--avatar-bell-size</code></td><td>24px</td><td>Bell glyph size</td></tr>
              <tr><td><code>--avatar-bell-color</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Bell stroke color (brand-invariant)</td></tr>
              <tr><td><code>--avatar-bell-hit</code></td><td>40px</td><td>Hit-target / tap area around the bell</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Notification badge shape &amp; color</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--notification-badge-height</code></td><td>16px</td><td>Pill height</td></tr>
              <tr><td><code>--notification-badge-min-width</code></td><td>16px</td><td>Pill min-width (square at single digit)</td></tr>
              <tr><td><code>--notification-badge-radius</code></td><td>1000px</td><td>Full round</td></tr>
              <tr><td><code>--notification-badge-border-width</code></td><td>1px</td><td>Halo thickness</td></tr>
              <tr><td><code>--notification-badge-border-color</code></td><td><span className="doc-swatch" style={{background:'#ffffff', border:'1px solid #ddd'}}></span>#ffffff</td><td>Halo color — <strong>white</strong>, brand-invariant</td></tr>
              <tr><td><code>--notification-badge-padding-x</code></td><td>4px</td><td>Horizontal padding for <code>9+</code> / multi-digit counts</td></tr>
              <tr><td><code>--notification-badge-bg</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td><td>Pill background (<strong>overridden per brand</strong>)</td></tr>
              <tr><td><code>--notification-badge-color</code></td><td><span className="doc-swatch" style={{background:'#ffffff', border:'1px solid #ddd'}}></span>#ffffff</td><td>Pill text color (brand-invariant)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Badge typography &amp; position</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--notification-badge-font-family</code></td><td>'Chevy_Sans:Bold'</td><td>Pill font family (<strong>overridden per brand</strong>)</td></tr>
              <tr><td><code>--notification-badge-font-weight</code></td><td>700</td><td>Bold on every brand</td></tr>
              <tr><td><code>--notification-badge-font-size</code></td><td>10px</td><td>Pill text size</td></tr>
              <tr><td><code>--notification-badge-lh</code></td><td>14px</td><td>Pill line-height (flex-centered inside the 16px pill)</td></tr>
              <tr><td><code>--notification-badge-offset-top</code></td><td>2px</td><td>Pill vertical offset from bell</td></tr>
              <tr><td><code>--notification-badge-offset-right</code></td><td>4px</td><td>Pill horizontal offset from bell</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">Only three tokens change per brand — all on the badge and the initials. Everything else (disc transparency, <code>#262626</code> stroke / bell, sizes, padding, and the white badge halo) is brand-invariant.</p>
        <ul className="doc-brand-list">
          <li><strong>Buick</strong> — <code>--notification-badge-bg</code> <span className="doc-swatch" style={{background:'#333333'}}></span><code>#333333</code> (dark gray, <em>not</em> Buick orange); <code>--avatar-initials-font-family</code> and <code>--notification-badge-font-family</code> → <code>'Buick_Text:Bold'</code>.</li>
          <li><strong>GMC</strong> — <code>--notification-badge-bg</code> <span className="doc-swatch" style={{background:'#25282A'}}></span><code>#25282A</code> (near-black, <em>not</em> GMC red); <code>--avatar-initials-font-family</code> and <code>--notification-badge-font-family</code> → <code>'StratumGMC:Bold'</code>.</li>
          <li><strong>Cadillac</strong> — <code>--notification-badge-bg</code> <span className="doc-swatch" style={{background:'#171473'}}></span><code>#171473</code> (Cadillac navy — the one brand that actually tints the badge with its brand color); <code>--avatar-initials-font-family</code> and <code>--notification-badge-font-family</code> → <code>'Cadillac_Gothic:Bold'</code>.</li>
        </ul>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Provide an <code>aria-label</code> on both the avatar and bell buttons.</li>
              <li>Cap the displayed count at <code>9+</code> — don't let double-digit numbers stretch the pill.</li>
              <li>Hide the badge entirely when the unread count reaches 0.</li>
              <li>Use the logged-out variant whenever there is no signed-in user — don't fall back to random initials.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't fill the avatar disc — <code>--avatar-bg</code> is <code>transparent</code>; only the 1.5px <code>#262626</code> stroke and the initials / user icon carry visual weight.</li>
              <li>Don't use this component decoratively — both the avatar and bell must open real menus.</li>
              <li>Don't stack more than two letters inside the disc.</li>
              <li>Don't omit the 1px white halo on the badge — it separates the pill from the bell when they overlap.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
