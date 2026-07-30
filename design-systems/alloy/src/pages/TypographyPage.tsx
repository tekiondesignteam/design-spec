import type { CSSProperties } from 'react'
import './home.css'
import { useBrand } from '../context/BrandContext'

function TypeRow({ name, size, lh, ls = 0, weight, heading, level, sample, decoration, transform }: {
  name: string
  size: number
  lh: number
  ls?: number
  weight?: number
  heading?: boolean
  level?: 1 | 2 | 3 | 4 | 5 | 6
  sample: string
  decoration?: CSSProperties['textDecoration']
  transform?: CSSProperties['textTransform']
}) {
  const style: CSSProperties = {
    fontSize: `${size}px`,
    lineHeight: `${lh}px`,
    letterSpacing: `${ls}px`,
  }
  if (heading) {
    // h5/h6 read from per-headline tokens so brands (e.g. Cadillac) can
    // swap the family at smaller display sizes. h1–h4 use the generic tokens.
    const useGranular = level === 5 || level === 6
    style.fontFamily = useGranular
      ? `var(--type-headline-${level}-family)`
      : 'var(--type-heading-family)'
    style.fontWeight = (useGranular
      ? `var(--type-headline-${level}-weight)`
      : 'var(--type-heading-weight)') as CSSProperties['fontWeight']
  } else if (weight != null) {
    style.fontWeight = weight
  }
  if (decoration) style.textDecoration = decoration
  if (transform) style.textTransform = transform

  return (
    <div className="type-row">
      <div className="type-row__role">
        <div className="type-row__role-name">{name}</div>
      </div>
      <div className="type-row__sample" style={style}>{sample}</div>
      <div className="type-row__meta">
        <div className="type-meta-item"><span className="type-meta-item__label">Size</span><span className="type-meta-item__val">{size}</span></div>
        <div className="type-meta-item"><span className="type-meta-item__label">LH</span><span className="type-meta-item__val">{lh}</span></div>
        <div className="type-meta-item"><span className="type-meta-item__label">LS</span><span className="type-meta-item__val">{ls}</span></div>
      </div>
    </div>
  )
}

export default function TypographyPage() {
  const { brand } = useBrand()
  const isCompact = brand === 'chevrolet' || brand === 'cadillac'
  const bodyScale = isCompact
    ? { b1: { size: 16, lh: 24 }, b2: { size: 14, lh: 22 }, b3: { size: 12, lh: 20 } }
    : { b1: { size: 18, lh: 25 }, b2: { size: 16, lh: 22 }, b3: { size: 14, lh: 20 } }

  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Foundations</div>
        <h1 className="doc-page-header__title">Typography</h1>
        <p className="doc-page-header__desc">
          Type scale powering all DRP UI components — mirrors the Figma{' '}
          <code>base-typography</code> variable collection. Switch brands above to re-render
          headlines in each brand's display font; body text switches to its matching text font.
        </p>
      </div>

      <div id="typography" className="foundations-section">
        <div className="type-group-label">Headlines</div>
        <div className="type-scale">
          <TypeRow name="headline-1" size={64} lh={68} ls={-1} heading level={1} sample="Configure Order" />
          <TypeRow name="headline-2" size={48} lh={56} ls={-1} heading level={2} sample="Package Selection" />
          <TypeRow name="headline-3" size={40} lh={48} ls={-1} heading level={3} sample="Available Trims" />
          <TypeRow name="headline-4" size={32} lh={40} ls={0} heading level={4} sample="Exterior Colors" />
          <TypeRow name="headline-5" size={24} lh={30} ls={0} heading level={5} sample="Interior Options" />
          <TypeRow name="headline-6" size={20} lh={24} ls={0} heading level={6} sample="Premium Features" />
        </div>

        <div className="type-group-label">Body 1 — {bodyScale.b1.size} / {bodyScale.b1.lh}</div>
        <div className="type-scale">
          <TypeRow name="body-1-light"      size={bodyScale.b1.size} lh={bodyScale.b1.lh} ls={0} weight={400} sample="Select your preferred exterior color." />
          <TypeRow name="body-1-regular"    size={bodyScale.b1.size} lh={bodyScale.b1.lh} ls={0} weight={500} sample="Select your preferred exterior color." />
          <TypeRow name="body-1-medium"     size={bodyScale.b1.size} lh={bodyScale.b1.lh} ls={0} weight={500} sample="Select your preferred exterior color." />
          <TypeRow name="body-1-bold"       size={bodyScale.b1.size} lh={bodyScale.b1.lh} ls={0} weight={700} sample="Select your preferred exterior color." />
          <TypeRow name="body-1-extra-bold" size={bodyScale.b1.size} lh={bodyScale.b1.lh} ls={0} weight={700} sample="Select your preferred exterior color." />
          <TypeRow name="body-1-link"       size={bodyScale.b1.size} lh={bodyScale.b1.lh} ls={0} weight={500} sample="Select your preferred exterior color." decoration="underline" />
          <TypeRow name="body-1-all-caps"   size={bodyScale.b1.size} lh={bodyScale.b1.lh} ls={0} weight={500} sample="Select your preferred exterior color." transform="uppercase" />
          <TypeRow name="body-1-button"     size={bodyScale.b1.size} lh={bodyScale.b1.lh} ls={0} weight={600} sample="Schedule a Test Drive" />
          <TypeRow name="body-1-list"       size={bodyScale.b1.size} lh={bodyScale.b1.lh} ls={0} weight={500} sample="Select your preferred exterior color." />
        </div>

        <div className="type-group-label">Body 2 — {bodyScale.b2.size} / {bodyScale.b2.lh}</div>
        <div className="type-scale">
          <TypeRow name="body-2-light"      size={bodyScale.b2.size} lh={bodyScale.b2.lh} ls={0} weight={400} sample="Available in 8 premium color combinations." />
          <TypeRow name="body-2-regular"    size={bodyScale.b2.size} lh={bodyScale.b2.lh} ls={0} weight={500} sample="Available in 8 premium color combinations." />
          <TypeRow name="body-2-medium"     size={bodyScale.b2.size} lh={bodyScale.b2.lh} ls={0} weight={500} sample="Available in 8 premium color combinations." />
          <TypeRow name="body-2-bold"       size={bodyScale.b2.size} lh={bodyScale.b2.lh} ls={0} weight={700} sample="Available in 8 premium color combinations." />
          <TypeRow name="body-2-extra-bold" size={bodyScale.b2.size} lh={bodyScale.b2.lh} ls={0} weight={700} sample="Available in 8 premium color combinations." />
          <TypeRow name="body-2-link"       size={bodyScale.b2.size} lh={bodyScale.b2.lh} ls={0} weight={500} sample="Available in 8 premium color combinations." decoration="underline" />
          <TypeRow name="body-2-all-caps"   size={bodyScale.b2.size} lh={bodyScale.b2.lh} ls={0} weight={500} sample="Available in 8 premium color combinations." transform="uppercase" />
          <TypeRow name="body-2-button"     size={bodyScale.b2.size} lh={bodyScale.b2.lh} ls={0} weight={600} sample="Schedule a Test Drive" />
          <TypeRow name="body-2-list"       size={bodyScale.b2.size} lh={bodyScale.b2.lh} ls={0} weight={500} sample="Available in 8 premium color combinations." />
        </div>

        <div className="type-group-label">Body 3 — {bodyScale.b3.size} / {bodyScale.b3.lh}</div>
        <div className="type-scale">
          <TypeRow name="body-3-light"       size={bodyScale.b3.size} lh={bodyScale.b3.lh} ls={0} weight={400} sample="Required — enter a valid plate number." />
          <TypeRow name="body-3-regular"     size={bodyScale.b3.size} lh={bodyScale.b3.lh} ls={0} weight={500} sample="Required — enter a valid plate number." />
          <TypeRow name="body-3-medium"      size={bodyScale.b3.size} lh={bodyScale.b3.lh} ls={0} weight={500} sample="Required — enter a valid plate number." />
          <TypeRow name="body-3-bold"        size={bodyScale.b3.size} lh={bodyScale.b3.lh} ls={0} weight={700} sample="Required — enter a valid plate number." />
          <TypeRow name="body-3-extra-bold"  size={bodyScale.b3.size} lh={bodyScale.b3.lh} ls={0} weight={700} sample="Required — enter a valid plate number." />
          <TypeRow name="body-3-link"        size={bodyScale.b3.size} lh={bodyScale.b3.lh} ls={0} weight={500} sample="Required — enter a valid plate number." decoration="underline" />
          <TypeRow name="body-3-all-caps"    size={bodyScale.b3.size} lh={bodyScale.b3.lh} ls={0} weight={500} sample="Required — enter a valid plate number." transform="uppercase" />
          <TypeRow name="body-3-navigation"  size={bodyScale.b3.size} lh={bodyScale.b3.lh} ls={0} weight={600} sample="Vehicles · Offers · Finance" />
          <TypeRow name="body-3-button"      size={bodyScale.b3.size} lh={bodyScale.b3.lh} ls={0} weight={600} sample="Learn More" />
          <TypeRow name="body-3-list"        size={bodyScale.b3.size} lh={bodyScale.b3.lh} ls={0} weight={500} sample="Required — enter a valid plate number." />
        </div>

        <div className="type-font-note">
          <strong>Fonts by brand:</strong>{' '}
          Chevrolet — headlines <code>Chevy_Sans Demi</code>, body <code>Chevy_Sans</code> ·
          Buick — headlines <code>Buick_Text Medium</code>, body <code>Buick_Text</code> ·
          GMC — headlines <code>StratumGMC Black</code>, body <code>StratumGMC</code> ·
          Cadillac — headlines 1–4 <code>Cadillac_Gothic_Wide Bold</code>, headlines 5–6 <code>Cadillac_Gothic Bold</code> (regular cut), body <code>Cadillac_Gothic_Narrow</code>
        </div>
      </div>
    </>
  )
}
