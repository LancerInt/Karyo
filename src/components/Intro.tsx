import { Arrow } from './icons'

export default function Intro() {
  return (
    <section className="section section--ivory" id="platform">
      <div className="wrap intro">
        <div className="reveal">
          <p className="eyebrow"><span className="eyebrow__i">01</span> The Platform</p>
          <h2 className="h-section">An active is only part of the formulation.</h2>
          <p className="lede" style={{ marginTop: '1.25rem' }}>
            How an active is protected, combined, and delivered matters. Karyo focuses on the
            delivery system around microbial and botanical actives—from protective matrices and
            carriers to practical application formats.
          </p>
          <a className="textlink" href="#story" style={{ marginTop: '1.75rem' }}>
            Explore the platform <Arrow />
          </a>
        </div>

        <div className="intro__spec reveal" data-delay="1" aria-hidden="true">
          <div className="intro__spec__row">
            <span className="k">01</span>
            <div>
              <span className="t">Protect</span>
              <p className="d">Matrices and carriers designed around sensitive actives.</p>
            </div>
          </div>
          <div className="intro__spec__row">
            <span className="k">02</span>
            <div>
              <span className="t">Combine</span>
              <p className="d">Microbial, botanical, and hybrid actives in one system.</p>
            </div>
          </div>
          <div className="intro__spec__row">
            <span className="k">03</span>
            <div>
              <span className="t">Deliver</span>
              <p className="d">Dispersion, release, and format built for the field.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
