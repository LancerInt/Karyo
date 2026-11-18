import { Arrow } from './icons'

const LAYERS = [
  {
    lbl: 'Upstream',
    nm: 'Discovery & strains',
    ds: 'Finding and selecting microbial actives — the science of what works.',
    badge: 'Elsewhere in Kriya',
    active: false,
  },
  {
    lbl: 'Midstream',
    nm: 'Fermentation engineering',
    ds: 'Producing and stabilising actives at the process level.',
    badge: 'Elsewhere in Kriya',
    active: false,
  },
  {
    lbl: 'Delivery layer',
    nm: 'Karyo™ — Delivery & Protection',
    ds: 'Protecting, combining, and translating actives into agricultural delivery systems.',
    badge: 'This platform',
    active: true,
  },
]

export default function KriyaRelation() {
  return (
    <section className="section section--ivory">
      <div className="wrap kriya__grid">
        <div className="reveal">
          <p className="eyebrow">In the Kriya Stack</p>
          <h2 className="display-lg">
            The delivery layer <span className="ital">within Kriya.</span>
          </h2>
          <p className="lede" style={{ marginTop: '1.25rem' }}>
            Kriya discovers microbial actives and engineers how they are made.
            Karyo is the layer that protects those actives, combines them, and
            carries them into the field — distinct from discovery and
            fermentation, and built to work across them.
          </p>
          <a
            className="link-arrow"
            href="https://kriya.ltd/technology/karyo"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: '2rem', display: 'inline-flex' }}
          >
            Explore Kriya&rsquo;s technology <Arrow />
          </a>
        </div>

        <div className="stack reveal" data-delay="1" aria-label="Where Karyo sits in the Kriya technology stack">
          {LAYERS.map((l) => (
            <div className={`stack__layer ${l.active ? 'stack__layer--active' : ''}`} key={l.nm}>
              <div>
                <span className="lbl">{l.lbl}</span>
                <div className="nm">{l.nm}</div>
                <p className="ds">{l.ds}</p>
              </div>
              <span
                className="stack__badge"
                style={{ color: l.active ? 'var(--clay-400)' : 'var(--ink-soft)' }}
              >
                {l.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
