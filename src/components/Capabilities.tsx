import { CapIcon } from './icons'

const CAPS = [
  {
    icon: 'protect',
    t: 'Active Protection',
    d: 'Designed to help protect sensitive actives during storage, transport, and handling.',
  },
  {
    icon: 'encapsulate',
    t: 'Encapsulation & Matrix Design',
    d: 'Protective layers, matrices, and carrier systems developed around individual or combined actives.',
  },
  {
    icon: 'integrate',
    t: 'Multi-Active Integration',
    d: 'Delivery systems that can accommodate microbial actives, botanical actives, or combinations of both.',
  },
  {
    icon: 'delivery',
    t: 'Delivery Architecture',
    d: 'Design considerations for how actives disperse, suspend, solubilise, or release during application.',
  },
  {
    icon: 'format',
    t: 'Format Flexibility',
    d: 'Translation of delivery systems into practical agricultural formats for different use cases.',
  },
  {
    icon: 'stability',
    t: 'Stability & Application Compatibility',
    d: 'A focus on shelf life, water compatibility, tank behaviour, and usability.',
  },
]

export default function Capabilities() {
  return (
    <section className="section section--white" id="capabilities">
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow">Capabilities</p>
          <h2 className="h-section">Six capabilities. One delivery platform.</h2>
        </div>

        <div className="caps__list">
          {CAPS.map((c, i) => (
            <article className="capx reveal" data-delay={(i % 2) + 1} key={c.t}>
              <span className="capx__icon">
                <CapIcon name={c.icon} />
              </span>
              <div>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
