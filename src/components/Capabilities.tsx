import { useState } from 'react'

const CAPS = [
  {
    t: 'Active protection',
    d: 'Designed to help protect sensitive actives during storage, transport, and handling.',
  },
  {
    t: 'Encapsulation and matrix design',
    d: 'Protective layers, matrices, and carrier systems around individual or combined actives.',
  },
  {
    t: 'Multi-active integration',
    d: 'Delivery architectures for microbial, botanical, and hybrid combinations.',
  },
  {
    t: 'Delivery architecture',
    d: 'Consideration of dispersion, suspension, solubilisation, and release during application.',
  },
  {
    t: 'Format flexibility',
    d: 'Translation of delivery systems into practical agricultural formats.',
  },
  {
    t: 'Stability and application compatibility',
    d: 'A focus on shelf life, water compatibility, tank behaviour, and usability.',
  },
]

export default function Capabilities() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section" id="capabilities">
      <div className="wrap caps__grid">
        <div className="caps__aside" data-rise>
          <p className="eyebrow">Capabilities</p>
          <h2 className="h-section">Built around the demands of delivery.</h2>
        </div>

        <div className="caps__list">
          {CAPS.map((c, i) => {
            const isOpen = open === i
            return (
              <div className="acc" data-open={isOpen} key={c.t}>
                <h3 style={{ margin: 0 }}>
                  <button
                    className="acc__btn"
                    type="button"
                    id={`cap-h-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`cap-b-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="acc__title">{c.t}</span>
                    <span className="acc__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  className="acc__body"
                  id={`cap-b-${i}`}
                  role="region"
                  aria-labelledby={`cap-h-${i}`}
                >
                  <div className="acc__bodyinner">
                    <p>{c.d}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
