import { EncapsulationFigure } from '../illustrations/Diagrams'

const POINTS = [
  {
    k: 'Protection',
    t: 'Shield microbial and botanical actives from degradation during storage, transport, and handling.',
  },
  {
    k: 'Encapsulation',
    t: 'Build protective layers, structured matrices, and carrier systems around single or combined actives.',
  },
  {
    k: 'Combination',
    t: 'Co-deliver one or more actives together within a single, unified system.',
  },
  {
    k: 'Delivery',
    t: 'Translate actives into practical formats designed for real agricultural conditions.',
  },
]

export default function Platform() {
  return (
    <section className="section section--ivory" id="platform">
      <div className="wrap platform__grid">
        <div className="platform__lead reveal">
          <p className="eyebrow">The Platform</p>
          <h2 className="display-lg">
            Good actives need <span className="ital">thoughtful delivery.</span>
          </h2>
          <p className="lede">
            An active&rsquo;s value depends not only on what it is, but on how it
            is protected, combined, and delivered in the field. Karyo is the
            layer that carries it there.
          </p>

          <div className="platform__points">
            {POINTS.map((p, i) => (
              <div className="platform__point reveal" data-delay={(i % 3) + 1} key={p.k}>
                <span className="k">{String(i + 1).padStart(2, '0')}</span>
                <p>
                  <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{p.k}.</strong>{' '}
                  {p.t}
                </p>
              </div>
            ))}
          </div>
        </div>

        <figure className="platform__figure reveal" data-delay="1">
          <EncapsulationFigure className="platform__svg" />
          <figcaption className="conceptual-tag" style={{ marginTop: '1rem', color: 'var(--ink-soft)', textAlign: 'center' }}>
            Conceptual illustration — active, matrix, and carrier
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
