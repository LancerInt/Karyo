const STEPS = [
  { n: '01', t: 'Protect', d: 'Design protective systems around sensitive actives.' },
  { n: '02', t: 'Combine', d: 'Explore single-active, multi-active, and microbial–botanical systems.' },
  { n: '03', t: 'Deliver', d: 'Translate delivery concepts into formats suited to agricultural use.' },
]

export default function WhatKaryo() {
  return (
    <section className="section section--ivory" id="platform">
      <div className="wrap whatk__grid">
        <figure className="whatk__figure reveal">
          <img
            src="/img/karyo-matrix.webp"
            srcSet="/img/karyo-matrix-700.webp 700w, /img/karyo-matrix.webp 1100w"
            sizes="(max-width: 860px) 100vw, 560px"
            alt="An open protective matrix revealing active particles held inside a carrier structure."
            loading="lazy"
            decoding="async"
            width={1100}
            height={1100}
          />
          <figcaption className="whatk__cap">Conceptual illustration.</figcaption>
        </figure>

        <div className="whatk__content reveal" data-delay="1">
          <p className="eyebrow">The Platform</p>
          <h2 className="h-section">An active is only part of the formulation.</h2>
          <p className="lede" style={{ marginTop: '1.25rem' }}>
            How an active is protected, combined, and delivered matters. Karyo focuses on the
            delivery system around microbial and botanical actives—from protective matrices and
            carriers to practical application formats.
          </p>

          <div className="whatk__steps">
            {STEPS.map((s) => (
              <div className="step" key={s.n}>
                <span className="step__n">{s.n}</span>
                <div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
