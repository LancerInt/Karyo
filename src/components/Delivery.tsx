import { DeliveryIcon } from '../illustrations/Diagrams'

const CELLS = [
  {
    ic: 'shield',
    k: 'Through the journey',
    t: 'Protection',
    d: 'Designed to support the active through storage and handling, before it ever reaches the field.',
  },
  {
    ic: 'disperse',
    k: 'In the mix',
    t: 'Behaviour',
    d: 'Built to influence how actives disperse, suspend, solubilise, or release during application.',
  },
  {
    ic: 'format',
    k: 'The deliverable',
    t: 'Format',
    d: 'Format selection matched to the use case, so the system arrives in a practical agricultural form.',
  },
  {
    ic: 'water',
    k: 'At the tank',
    t: 'Compatibility',
    d: 'Considered for water compatibility and predictable behaviour in the spray tank.',
  },
]

export default function Delivery() {
  return (
    <section className="section section--light" id="applications">
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow">Delivery Design</p>
          <h2 className="display-lg">
            Designed around the <span className="ital">application.</span>
          </h2>
          <p className="lede" style={{ marginTop: '1.25rem' }}>
            Delivery choices are made with the end use in view — from the
            shelf, to the tank, to the field.
          </p>
        </div>

        <div className="delivery__row">
          {CELLS.map((c, i) => (
            <article className="delivery__cell reveal" data-delay={(i % 3) + 1} key={c.t}>
              <DeliveryIcon name={c.ic} className="ic" />
              <span className="k" style={{ display: 'block', marginTop: '1.5rem' }}>{c.k}</span>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
