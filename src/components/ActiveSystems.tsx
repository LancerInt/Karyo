export default function ActiveSystems() {
  return (
    <section className="section systems on-dark" id="systems">
      <div className="wrap">
        <div className="systems__head" data-rise>
          <p className="eyebrow">Active systems</p>
          <h2 className="h-section">Microbial. Botanical. Combined.</h2>
        </div>

        <div className="systems__panels">
          <article className="panel" tabIndex={0} aria-label="Microbial actives — petri-dish study">
            <div className="panel__media">
              <img
                src="/img/karyo-microbial-study.webp"
                srcSet="/img/karyo-microbial-study-560.webp 560w, /img/karyo-microbial-study.webp 900w"
                sizes="(min-width: 760px) 44vw, 90vw"
                alt="Two glass petri dishes on warm stone, with botanical shadows."
                loading="lazy"
                decoding="async"
                width={900}
                height={1125}
              />
            </div>
            <p className="panel__label">Microbial actives</p>
            <p className="panel__cap">Living actives, with handling and stability needs of their own.</p>
          </article>

          <article className="panel" tabIndex={0} aria-label="Botanical actives — amber-vial study">
            <div className="panel__media">
              <img
                src="/img/karyo-botanical-study.webp"
                srcSet="/img/karyo-botanical-study-560.webp 560w, /img/karyo-botanical-study.webp 900w"
                sizes="(min-width: 760px) 44vw, 90vw"
                alt="A neem sprig beside an amber vial in warm daylight."
                loading="lazy"
                decoding="async"
                width={900}
                height={1125}
              />
            </div>
            <p className="panel__label">Botanical actives</p>
            <p className="panel__cap">Plant-derived actives, prepared for consistent delivery.</p>
          </article>
        </div>

        <div className="systems__statement" data-rise>
          <p className="systems__big">
            Karyo can support microbial–microbial, botanical–botanical, and microbial–botanical
            delivery systems.
          </p>
          <p className="systems__qual">
            Compatibility and performance depend on the selected actives and formulation.
          </p>
        </div>
      </div>
    </section>
  )
}
