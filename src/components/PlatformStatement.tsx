export default function PlatformStatement() {
  return (
    <section className="section pstate" id="platform">
      <div className="wrap pstate__grid">
        <div data-rise>
          <p className="eyebrow">The platform</p>
          <h2 className="h-section">The active is the starting point.</h2>
          <p className="lede" style={{ marginTop: '1.5rem' }}>
            Karyo focuses on the system around the active: how it is protected, how it is combined,
            and how it is prepared for agricultural application.
          </p>
        </div>

        <figure className="pstate__media" data-rise>
          <img
            src="/img/karyo-formulation-study.webp"
            srcSet="/img/karyo-formulation-study-600.webp 600w, /img/karyo-formulation-study-900.webp 900w"
            sizes="(min-width: 900px) 420px, 90vw"
            alt="A pale formulation settling in a glass vessel, lit by soft daylight."
            loading="lazy"
            decoding="async"
            width={900}
            height={675}
          />
        </figure>
      </div>
    </section>
  )
}
