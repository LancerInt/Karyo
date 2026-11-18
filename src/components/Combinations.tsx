import { useRef, useState } from 'react'
import { ComboViz, ComboSwatch, type Combo } from './Schematics'

const TABS: { id: Combo; label: string; heading: string; desc: string }[] = [
  {
    id: 'mm',
    label: 'Microbial + Microbial',
    heading: 'Microbial + Microbial',
    desc: 'Explore delivery architectures that bring microbial actives together within a coordinated system.',
  },
  {
    id: 'bb',
    label: 'Botanical + Botanical',
    heading: 'Botanical + Botanical',
    desc: 'Explore carrier and matrix designs for combinations of botanical actives.',
  },
  {
    id: 'mb',
    label: 'Microbial + Botanical',
    heading: 'Microbial + Botanical',
    desc: 'Bring microbial and botanical actives into a shared delivery design, with compatibility considered for the intended formulation.',
  },
]

export default function Combinations() {
  const [active, setActive] = useState<Combo>('mb')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const current = TABS.find((t) => t.id === active)!

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const keys = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End']
    if (!keys.includes(e.key)) return
    e.preventDefault()
    let next = i
    if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = TABS.length - 1
    else {
      const dir = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1
      next = (i + dir + TABS.length) % TABS.length
    }
    setActive(TABS[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section className="section section--sage" id="combinations">
      <div className="wrap">
        <div className="combo__head reveal">
          <div>
            <p className="eyebrow">Combinations</p>
            <h2 className="h-section">Different actives. A shared delivery approach.</h2>
          </div>
          <p className="lede" style={{ maxWidth: '38ch' }}>
            Karyo supports the development of delivery systems around different active combinations.
          </p>
        </div>

        <div className="combo__grid">
          <div className="combo__tabs reveal" role="tablist" aria-label="Active combinations" aria-orientation="vertical">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => (tabRefs.current[i] = el)}
                className="combo__tab"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={active === t.id}
                aria-controls="combo-panel"
                tabIndex={active === t.id ? 0 : -1}
                onClick={() => setActive(t.id)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <ComboSwatch type={t.id} />
                <span className="label">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="combo__panel reveal" data-delay="1" id="combo-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
            <ComboViz type={active} />
            <h3>{current.heading}</h3>
            <p>{current.desc}</p>
            <p className="combo__note">
              Compatibility and performance depend on the selected actives and formulation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
