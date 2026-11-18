import HeroCanvas from './HeroCanvas'
import { Arrow } from './icons'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__poster" aria-hidden="true" />
      <HeroCanvas />
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__scrim--bottom" aria-hidden="true" />

      <div className="hero__inner">
        <div className="wrap">
          <div className="hero__content">
            <p className="eyebrow">Active Delivery &amp; Protection</p>
            <h1 className="display-xl hero__title">
              <span className="ln">Protect the active.</span>
              <span className="ln ln2">Design the delivery.</span>
            </h1>
            <p className="hero__copy">
              Karyo™ brings microbial and botanical actives into structured
              agricultural delivery systems.
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#platform">
                Explore the Platform <Arrow />
              </a>
              <a className="btn btn--ghost" href="#enquiry">
                Discuss Your Project
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__meta">
        <span className="annot">
          <span className="dot" />
          Actives held within a protective matrix
        </span>
        <div className="conceptual-tag" style={{ marginTop: '0.6rem' }}>
          Conceptual illustration
        </div>
      </div>

      <a className="hero__scroll" href="#platform" aria-label="Scroll to platform">
        <span className="rail" aria-hidden="true" />
        Scroll
      </a>
    </section>
  )
}
