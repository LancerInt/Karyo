import { useRef, useState } from 'react'
import { CapVisual } from './CapabilityVisuals'
import { Arrow } from './icons'

const CAPS = [
  { id: 'protect', n: '01', t: 'Active Protection', d: 'Designed to help protect sensitive actives during storage, transport, and handling.' },
  { id: 'matrix', n: '02', t: 'Encapsulation & Matrix Design', d: 'Protective layers, matrices, and carrier systems developed around individual or combined actives.' },
  { id: 'integrate', n: '03', t: 'Multi-Active Integration', d: 'Delivery systems that can accommodate microbial actives, botanical actives, or combinations of both.' },
  { id: 'delivery', n: '04', t: 'Delivery Architecture', d: 'Design considerations for how actives disperse, suspend, solubilise, or release during application.' },
  { id: 'format', n: '05', t: 'Format Flexibility', d: 'Translation of delivery systems into practical agricultural formats for different use cases.' },
  { id: 'compat', n: '06', t: 'Stability & Application Compatibility', d: 'A focus on shelf life, water compatibility, tank behaviour, and usability.' },
]

export default function CapabilityExplorer() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const cap = CAPS[active]

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const keys = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End']
    if (!keys.includes(e.key)) return
    e.preventDefault()
    let next = i
    if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = CAPS.length - 1
    else next = (i + (e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1) + CAPS.length) % CAPS.length
    setActive(next)
    refs.current[next]?.focus()
  }

  return (
    <section className="section section--white" id="capabilities">
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow">Capabilities</p>
          <h2 className="h-section">Six capabilities. One delivery platform.</h2>
        </div>

        <div className="capex__grid">
          <div className="capex__list reveal" role="tablist" aria-label="Platform capabilities" aria-orientation="vertical">
            {CAPS.map((c, i) => (
              <button
                key={c.id}
                ref={(el) => (refs.current[i] = el)}
                className="capex__item"
                role="tab"
                id={`cap-${c.id}`}
                aria-selected={active === i}
                aria-controls="cap-panel"
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <span className="n">{c.n}</span>
                <span className="t">{c.t}</span>
                <span className="chev" aria-hidden="true"><Arrow /></span>
              </button>
            ))}
          </div>

          <div className="capex__panel reveal" data-delay="1">
            <div className="capex__stage" id="cap-panel" role="tabpanel" aria-labelledby={`cap-${cap.id}`}>
              <CapVisual key={cap.id} id={cap.id} />
            </div>
            <div className="capex__copy" key={cap.id}>
              <h3 className="fade">{cap.t}</h3>
              <p className="fade">{cap.d}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
