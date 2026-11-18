import { useRef, useState } from 'react'
import { ComboGlyph, ComboViz } from '../illustrations/Diagrams'

type Combo = 'mm' | 'bb' | 'mb'

const OPTIONS: { id: Combo; idx: string; title: string; heading: string; desc: string }[] = [
  {
    id: 'mm',
    idx: 'A',
    title: 'Microbial + Microbial',
    heading: 'Two microbial actives, one system',
    desc: 'A supported direction for co-delivering more than one microbial active within a single protective matrix, so they can be handled and applied together.',
  },
  {
    id: 'bb',
    idx: 'B',
    title: 'Botanical + Botanical',
    heading: 'Botanical actives, combined',
    desc: 'A supported direction for bringing botanical actives together in one carrier, designed so a combined botanical approach travels as a single format.',
  },
  {
    id: 'mb',
    idx: 'C',
    title: 'Microbial + Botanical',
    heading: 'A hybrid of biology and botany',
    desc: 'A supported direction for pairing microbial and botanical actives within one delivery system — the kind of cross-type combination Karyo is built to explore.',
  },
]

export default function Combinations() {
  const [active, setActive] = useState<Combo>('mb')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const current = OPTIONS.find((o) => o.id === active)!

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const dir = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1
    const next = (i + dir + OPTIONS.length) % OPTIONS.length
    setActive(OPTIONS[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section className="section section--dark-rich">
      <div className="wrap">
        <div className="section-head reveal" style={{ maxWidth: '58ch' }}>
          <p className="eyebrow">Combinations</p>
          <h2 className="display-lg" style={{ color: 'var(--ivory)' }}>
            A platform for different <span className="ital" style={{ color: 'var(--sage-200)' }}>active combinations.</span>
          </h2>
        </div>

        <div className="combo__grid">
          <div className="combo__tabs reveal" role="tablist" aria-label="Active combinations" aria-orientation="vertical">
            {OPTIONS.map((o, i) => (
              <button
                key={o.id}
                ref={(el) => (tabRefs.current[i] = el)}
                className="combo__tab"
                role="tab"
                id={`combo-tab-${o.id}`}
                aria-selected={active === o.id}
                aria-controls="combo-panel"
                tabIndex={active === o.id ? 0 : -1}
                onClick={() => setActive(o.id)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <ComboGlyph type={o.id} className="combo__glyph" />
                <span className="t">{o.title}</span>
                <span className="idx">{o.idx}</span>
              </button>
            ))}
          </div>

          <div
            className="combo__stage reveal"
            id="combo-panel"
            role="tabpanel"
            aria-labelledby={`combo-tab-${active}`}
          >
            <ComboViz type={active} className="combo__viz" />
            <div className="combo__desc">
              <h3 className="display-sm">{current.heading}</h3>
              <p>{current.desc}</p>
            </div>
            <p className="combo__note">
              Shown as supported platform directions — not a claim that every
              combination is compatible or commercially validated.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
