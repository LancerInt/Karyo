import { useEffect, useRef, useState } from 'react'

const CH = [
  {
    n: '01',
    ey: 'Active systems',
    h: 'Start with the active.',
    p: 'Microbial and botanical actives bring different requirements to a formulation. Karyo supports delivery design around single actives and combinations.',
  },
  {
    n: '02',
    ey: 'Formulation design',
    h: 'Design the delivery system.',
    p: 'Protective matrices, carrier systems, and delivery behaviour are considered together, with the intended formulation in view.',
  },
  {
    n: '03',
    ey: 'Application requirements',
    h: 'Consider the application.',
    p: 'Storage, handling, water compatibility, tank behaviour, and format requirements help shape the delivery approach.',
  },
]

/* Chapter visuals — a composed pairing, then formulation, then application.
   The same frame holds each; only a restrained crossfade separates them. */
function Pairing() {
  return (
    <>
      <img
        className="seq__cover"
        src="/img/karyo-microbial-study.webp"
        srcSet="/img/karyo-microbial-study-560.webp 560w, /img/karyo-microbial-study.webp 900w"
        sizes="(min-width: 1024px) 42vw, 90vw"
        alt="Two glass petri dishes resting on warm stone."
        loading="lazy"
        decoding="async"
        width={900}
        height={1125}
      />
      <div className="seq__inset">
        <img
          src="/img/karyo-botanical-study.webp"
          srcSet="/img/karyo-botanical-study-560.webp 560w, /img/karyo-botanical-study.webp 900w"
          sizes="(min-width: 1024px) 20vw, 40vw"
          alt="A neem sprig beside an amber glass vial."
          loading="lazy"
          decoding="async"
          width={900}
          height={1125}
        />
      </div>
    </>
  )
}
function Formulation() {
  return (
    <img
      className="seq__cover"
      src="/img/karyo-formulation-study.webp"
      srcSet="/img/karyo-formulation-study-600.webp 600w, /img/karyo-formulation-study-900.webp 900w, /img/karyo-formulation-study.webp 1400w"
      sizes="(min-width: 1024px) 42vw, 90vw"
      alt="A pale formulation swirling in a conical glass flask."
      loading="lazy"
      decoding="async"
      width={1400}
      height={1050}
    />
  )
}
function Field() {
  return (
    <img
      className="seq__cover"
      src="/img/karyo-application.webp"
      srcSet="/img/karyo-application-800.webp 800w, /img/karyo-application-1280.webp 1280w, /img/karyo-application.webp 1600w"
      sizes="(min-width: 1024px) 42vw, 90vw"
      alt="Young crop rows running toward the horizon at dawn."
      loading="lazy"
      decoding="async"
      width={1600}
      height={900}
    />
  )
}

const VIS = [Pairing, Formulation, Field]

export default function Sequence() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLDivElement[]
    if (!els.length || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.i)
            if (!Number.isNaN(i)) setActive(i)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="section seq" id="sequence" aria-label="From active to application">
      <div className="wrap">
        <div className="seq__head" data-rise>
          <p className="eyebrow">The approach</p>
          <h2 className="h-section">From active to application.</h2>
        </div>

        <div className="seq__grid">
          <div className="seq__media" aria-hidden="true">
            <div className="seq__frame">
              {VIS.map((V, i) => (
                <div className="seq__layer" data-active={active === i} key={i}>
                  <V />
                </div>
              ))}
            </div>
          </div>

          <div className="seq__chapters">
            {CH.map((c, i) => {
              const V = VIS[i]
              return (
                <div
                  className="seq__chapter"
                  data-i={i}
                  ref={(el) => {
                    refs.current[i] = el
                  }}
                  key={c.n}
                >
                  <div className="seq__cmedia" aria-hidden="true">
                    <V />
                  </div>
                  <p className="seq__num">
                    {c.n} — {c.ey}
                  </p>
                  <h3 className="h-chapter">{c.h}</h3>
                  <p>{c.p}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
