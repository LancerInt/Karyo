import { useRef, useState } from 'react'
import { MatrixCore } from '../illustrations/Diagrams'

const CAPS = [
  {
    n: '01',
    t: 'Active Protection',
    d: 'Protect living and botanical actives from degradation during storage, transport, and handling.',
  },
  {
    n: '02',
    t: 'Encapsulation & Matrix Design',
    d: 'Protective layers, structured matrices, and carrier systems built around single or combined actives.',
  },
  {
    n: '03',
    t: 'Multi-Active Integration',
    d: 'Co-delivery of one or more microbial and/or botanical actives within one unified system.',
  },
  {
    n: '04',
    t: 'Delivery Architecture',
    d: 'Shape how actives are dispersed, suspended, solubilised, or released during application.',
  },
  {
    n: '05',
    t: 'Format Flexibility',
    d: 'Translate actives into practical agricultural formats suited to different use cases.',
  },
  {
    n: '06',
    t: 'Stability & Application Compatibility',
    d: 'Designed to support shelf life, water compatibility, and predictable tank behaviour in the field.',
  },
]

export default function Capabilities() {
  const [open, setOpen] = useState<number | null>(0)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  return (
    <section className="section section--dark" id="capabilities">
      <div className="wrap">
        <div className="section-head reveal" style={{ maxWidth: '62ch' }}>
          <p className="eyebrow">Capabilities</p>
          <h2 className="display-lg" style={{ color: 'var(--ivory)' }}>
            Six functions, one <span className="ital" style={{ color: 'var(--sage-200)' }}>protective core.</span>
          </h2>
        </div>

        {/* desktop: central illustration flanked by editorial entries */}
        <div className="caps__layout">
          <div className="caps__col caps__col--left">
            {CAPS.slice(0, 3).map((c, i) => (
              <article className="cap reveal" data-delay={i + 1} key={c.n}>
                <div className="cap__head">
                  <span className="cap__num">{c.n}</span>
                  <h3 className="cap__title" style={{ color: 'var(--ivory)' }}>{c.t}</h3>
                </div>
                <p style={{ color: 'var(--sage-200)' }}>{c.d}</p>
              </article>
            ))}
          </div>

          <div className="caps__center reveal">
            <MatrixCore className="caps__svg" />
            <p className="conceptual-tag" style={{ textAlign: 'center', marginTop: '1rem' }}>
              Conceptual illustration
            </p>
          </div>

          <div className="caps__col caps__col--right">
            {CAPS.slice(3).map((c, i) => (
              <article className="cap reveal" data-delay={i + 1} key={c.n}>
                <div className="cap__head">
                  <span className="cap__num">{c.n}</span>
                  <h3 className="cap__title" style={{ color: 'var(--ivory)' }}>{c.t}</h3>
                </div>
                <p style={{ color: 'var(--sage-200)' }}>{c.d}</p>
              </article>
            ))}
          </div>
        </div>

        {/* mobile: accessible accordion */}
        <div className="caps__accordion">
          {CAPS.map((c, i) => {
            const isOpen = open === i
            return (
              <div className="acc__item" key={c.n}>
                <h3 style={{ margin: 0 }}>
                  <button
                    className="acc__btn"
                    aria-expanded={isOpen}
                    aria-controls={`cap-panel-${i}`}
                    id={`cap-btn-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="cap__num">{c.n}</span>
                    <span className="acc__title">{c.t}</span>
                    <span className="acc__sign" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  className="acc__panel"
                  id={`cap-panel-${i}`}
                  role="region"
                  aria-labelledby={`cap-btn-${i}`}
                  ref={(el) => (panelRefs.current[i] = el)}
                  style={{ maxHeight: isOpen ? `${panelRefs.current[i]?.scrollHeight ?? 360}px` : 0 }}
                >
                  <p>{c.d}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
