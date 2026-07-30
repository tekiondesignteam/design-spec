import type { CSSProperties } from 'react'
import './home.css'

type SpacingToken = { name: string; value: number }

const SCALE = [0, 1, 2, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64]

const CONTAINER_PADDING = [
  { name: '--spacing-container-padding-none', value: 0 },
  { name: '--spacing-container-padding-1px',  value: 1 },
  { name: '--spacing-container-padding-2px',  value: 2 },
  { name: '--spacing-container-padding-4px',  value: 4 },
  { name: '--spacing-container-padding-xs',   value: 8 },
  { name: '--spacing-container-padding-s',    value: 16 },
  { name: '--spacing-container-padding-m',    value: 24 },
  { name: '--spacing-container-padding-32px', value: 32 },
  { name: '--spacing-container-padding-l',    value: 40 },
  { name: '--spacing-container-padding-xl',   value: 48 },
  { name: '--spacing-container-padding-56px', value: 56 },
]

const CONTAINER_GAP = [
  { name: '--spacing-container-gap-none', value: 0 },
  { name: '--spacing-container-gap-2px',  value: 2 },
  { name: '--spacing-container-gap-xs',   value: 4 },
  { name: '--spacing-container-gap-s',    value: 8 },
  { name: '--spacing-container-gap-m',    value: 16 },
  { name: '--spacing-container-gap-l',    value: 24 },
  { name: '--spacing-container-gap-xl',   value: 40 },
]

const CONTAINER_STACK = [
  { name: '--spacing-container-stack-none', value: 0 },
  { name: '--spacing-container-stack-xs',   value: 8 },
  { name: '--spacing-container-stack-s',    value: 16 },
  { name: '--spacing-container-stack-m',    value: 24 },
  { name: '--spacing-container-stack-l',    value: 40 },
  { name: '--spacing-container-stack-xl',   value: 64 },
]

const SELECTABLE_PADDING = [
  { name: '--spacing-selectable-padding-none', value: 0 },
  { name: '--spacing-selectable-padding-1px',  value: 1 },
  { name: '--spacing-selectable-padding-2px',  value: 2 },
  { name: '--spacing-selectable-padding-xs',   value: 4 },
  { name: '--spacing-selectable-padding-s',    value: 8 },
  { name: '--spacing-selectable-padding-m',    value: 16 },
  { name: '--spacing-selectable-padding-l',    value: 24 },
  { name: '--spacing-selectable-padding-12',   value: 12 },
]

const SELECTABLE_GAP = [
  { name: '--spacing-selectable-gap-none', value: 0 },
  { name: '--spacing-selectable-gap-1px',  value: 1 },
  { name: '--spacing-selectable-gap-xs',   value: 2 },
  { name: '--spacing-selectable-gap-s',    value: 4 },
  { name: '--spacing-selectable-gap-m',    value: 8 },
  { name: '--spacing-selectable-gap-l',    value: 16 },
]

const SELECTABLE_STACK = [
  { name: '--spacing-selectable-stack-none', value: 0 },
  { name: '--spacing-selectable-stack-s',    value: 8 },
  { name: '--spacing-selectable-stack-m',    value: 16 },
  { name: '--spacing-selectable-stack-l',    value: 24 },
]

function SpacingRow({ name, value }: SpacingToken) {
  return (
    <div className="spacing-row">
      <code className="spacing-row__name">{name}</code>
      <div className="spacing-row__value">{value}px</div>
      <div className="spacing-row__preview">
        {value === 0
          ? <span className="spacing-preview spacing-preview--zero" aria-label="zero" />
          : <span className="spacing-preview" style={{ '--size': `${value}px` } as CSSProperties} />}
      </div>
    </div>
  )
}

function SpacingGroup({ label, rows }: { label: string; rows: SpacingToken[] }) {
  return (
    <div className="spacing-group">
      <div className="spacing-group__label">{label}</div>
      <div className="spacing-table">
        <div className="spacing-table__head">
          <div>Token</div>
          <div>Value</div>
          <div>Preview</div>
        </div>
        {rows.map(r => <SpacingRow key={r.name} name={r.name} value={r.value} />)}
      </div>
    </div>
  )
}

export default function SpacingPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Foundations</div>
        <h1 className="doc-page-header__title">Spacing</h1>
        <p className="doc-page-header__desc">
          Semantic spacing tokens organized by surface (<code>container</code>, <code>selectable</code>)
          and axis (<code>padding</code>, <code>gap</code>, <code>stack</code>). Values are brand-invariant —
          every brand resolves to the same pixel value; only the swatch color on this page responds to the
          brand switcher.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">42 tokens · brand invariant</span>
        </div>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Scale</h2>
        <p className="doc-section__subtitle">
          Every semantic token below resolves to one of these 13 values. New tokens must be added to this
          scale first — do not introduce one-off values.
        </p>
        <div className="spacing-scale">
          {SCALE.map(v => (
            <div className="spacing-scale__item" key={v}>
              {v === 0
                ? <span className="spacing-preview spacing-preview--zero" aria-label="zero" />
                : <span className="spacing-preview spacing-scale__swatch" style={{ '--size': `${v}px` } as CSSProperties} />}
              <span className="spacing-scale__label">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div id="spacing" className="foundations-section">
        <SpacingGroup label="Container — padding" rows={CONTAINER_PADDING} />
        <SpacingGroup label="Container — gap"     rows={CONTAINER_GAP} />
        <SpacingGroup label="Container — stack"   rows={CONTAINER_STACK} />
        <SpacingGroup label="Selectable — padding" rows={SELECTABLE_PADDING} />
        <SpacingGroup label="Selectable — gap"     rows={SELECTABLE_GAP} />
        <SpacingGroup label="Selectable — stack"   rows={SELECTABLE_STACK} />
      </div>
    </>
  )
}
