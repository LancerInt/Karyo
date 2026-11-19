import { Arrow } from './icons'

export default function Hero() {
  return (
    <section className="hero on-dark" id="top">
      <div className="hero__media">
        <img
          src="/img/karyo-hero-leaf.webp"
          srcSet="/img/karyo-hero-leaf-800.webp 800w, /img/karyo-hero-leaf-1280.webp 1280w, /img/karyo-hero-leaf.webp 1600w"
          sizes="100vw"
          alt="A dew droplet resting on a sunlit green leaf."
          fetchPriority="high"
          decoding="async"
          width={1600}
          height={900}
        />
      </div>

      <div className="hero__wrap">
        <div className="wrap">
          <div className="hero__copy">
            <p className="eyebrow">Karyo™ — a Kriya technology platform</p>
            <h1 className="h-display hero__title">
              Active protection.
              <br />
              Considered delivery.
            </h1>
            <p className="hero__sub">
              Delivery systems for microbial and botanical actives—designed around protection,
              combination, and practical agricultural use.
            </p>
            <div className="hero__actions">
              <a className="btn btn--accent" href="#sequence">
                Explore the platform <Arrow />
              </a>
              <a className="btn btn--ghost" href="#partner">
                Discuss your formulation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
