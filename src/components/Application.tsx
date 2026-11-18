const STRIP = [
  { n: '01', t: 'Storage & handling' },
  { n: '02', t: 'Water compatibility' },
  { n: '03', t: 'Tank behaviour' },
  { n: '04', t: 'Application format' },
]

export default function Application() {
  return (
    <section aria-labelledby="app-heading">
      <div className="appbanner">
        <img
          className="appbanner__img"
          src="/img/karyo-field.webp"
          srcSet="/img/karyo-field-800.webp 800w, /img/karyo-field-1280.webp 1280w, /img/karyo-field.webp 1600w"
          sizes="100vw"
          alt="A crop field at dawn with a dew-covered leaf in the foreground."
          loading="lazy"
          decoding="async"
          width={1600}
          height={900}
        />
        <div className="wrap appbanner__inner">
          <h2 className="h-section" id="app-heading">Designed with application in mind.</h2>
          <p>
            From storage and handling to mixing and use, delivery design connects the active with
            the requirements of the application.
          </p>
        </div>
      </div>

      <div className="section--ivory" style={{ paddingBlock: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="wrap">
          <div className="appstrip">
            {STRIP.map((s) => (
              <div className="appstrip__cell" key={s.n}>
                <span className="appstrip__n">{s.n}</span>
                <h3>{s.t}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
