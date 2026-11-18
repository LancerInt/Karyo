import { Arrow } from './icons'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__media">
        <img
          src="/img/karyo-hero.webp"
          srcSet="/img/karyo-hero-800.webp 800w, /img/karyo-hero-1280.webp 1280w, /img/karyo-hero.webp 1600w"
          sizes="100vw"
          alt="A translucent protective sphere holding microbial and botanical actives, resting on a dew-covered leaf."
          fetchPriority="high"
          decoding="async"
          width={1600}
          height={900}
        />
      </div>

      <div className="hero__wrap">
        <div className="wrap">
          <div className="hero__copy">
            <p className="eyebrow">Karyo™ by Kriya</p>
            <h1 className="h-hero hero__title">Protection and delivery for agricultural actives.</h1>
            <p className="hero__sub">
              A platform for protecting, combining, and delivering microbial and botanical actives
              in practical agricultural formulations.
            </p>
            <div className="hero__actions">
              <a className="btn btn--accent" href="#platform">
                Explore Karyo <Arrow />
              </a>
              <a className="btn btn--outline" href="#contact">
                Discuss Your Project
              </a>
            </div>
            <div className="hero__tags">
              <span>Microbial actives</span>
              <span className="sep" aria-hidden="true" />
              <span>Botanical actives</span>
              <span className="sep" aria-hidden="true" />
              <span>Multi-active systems</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
