import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../lib/hooks'
import { useMotion } from '../lib/motion'
import { ProtectSVG, CombineSVG, DeliverSVG } from './StoryVisuals'

const CH = [
  {
    n: '01',
    t: 'Protect',
    h: 'Build protection around the active.',
    p: 'Protective matrices and carrier systems are designed around sensitive microbial and botanical actives.',
  },
  {
    n: '02',
    t: 'Combine',
    h: 'Bring different actives into the design.',
    p: 'Explore delivery systems for microbial, botanical, and hybrid active combinations.',
  },
  {
    n: '03',
    t: 'Deliver',
    h: 'Design around practical application.',
    p: 'Consider dispersion, suspension, solubilisation, release, and format requirements for the intended application.',
  },
]

function StageContent({ index }: { index: number }) {
  if (index === 0) {
    return (
      <>
        <img
          className="st-raster st-matrix"
          src="/img/karyo-matrix.webp"
          srcSet="/img/karyo-matrix-700.webp 700w, /img/karyo-matrix.webp 1100w"
          sizes="(max-width: 860px) 90vw, 40vw"
          alt=""
          loading="lazy"
          decoding="async"
          width={1100}
          height={1100}
        />
        <ProtectSVG />
      </>
    )
  }
  if (index === 1) {
    return (
      <>
        <img className="st-raster st-micro" src="/img/karyo-microbial.webp" srcSet="/img/karyo-microbial-560.webp 560w, /img/karyo-microbial.webp 900w"
          sizes="(max-width: 860px) 45vw, 25vw" alt="Microbial actives illustration." loading="lazy" decoding="async" width={900} height={900} />
        <img className="st-raster st-bot" src="/img/karyo-botanical.webp" srcSet="/img/karyo-botanical-560.webp 560w, /img/karyo-botanical.webp 900w"
          sizes="(max-width: 860px) 45vw, 25vw" alt="Botanical actives illustration." loading="lazy" decoding="async" width={900} height={900} />
        <CombineSVG />
      </>
    )
  }
  return <DeliverSVG />
}

export default function Story() {
  const mobile = useMediaQuery('(max-width: 860px)')
  const { reduced } = useMotion()
  const stacked = mobile || reduced
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  // desktop: map scroll position within the 220vh track to a chapter
  useEffect(() => {
    if (stacked) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const el = trackRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const total = el.offsetHeight - vh
        const scrolled = Math.min(Math.max(-rect.top, 0), total)
        const prog = total > 0 ? scrolled / total : 0
        const idx = Math.min(CH.length - 1, Math.floor(prog * CH.length))
        setActive(idx)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [stacked])

  const goToChapter = (i: number) => {
    const el = trackRef.current
    if (!el) return
    if (stacked) {
      setActive(i)
      return
    }
    const vh = window.innerHeight
    const total = el.offsetHeight - vh
    const top = el.getBoundingClientRect().top + window.scrollY
    const target = top + ((i + 0.5) / CH.length) * total
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  if (stacked) {
    return (
      <section className="story" id="story" aria-label="Explore the delivery platform">
        <div className="wrap">
          <div className="story__mobile">
            <div className="section-head reveal" style={{ marginBottom: 0 }}>
              <p className="eyebrow">Explore the platform</p>
              <h2 className="h-section" style={{ color: 'var(--on-dark)' }}>From protection to practical delivery.</h2>
            </div>
            {CH.map((c, i) => (
              <article className="story__mchapter reveal" key={c.n}>
                <div className="story__mstage">
                  <StageContent index={i} />
                  <span className="story__cap">Conceptual platform illustration.</span>
                </div>
                <div>
                  <span className="n">{c.n} · {c.t}</span>
                  <h3>{c.h}</h3>
                  <p>{c.p}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="story" id="story" aria-label="Explore the delivery platform">
      <div ref={trackRef} style={{ height: '220vh', position: 'relative' }}>
        <div className="story__sticky">
          <div className="wrap story__grid">
            <div className="story__stage">
              {CH.map((_, i) => (
                <div className="story__layer" data-active={active === i} key={i}>
                  <StageContent index={i} />
                </div>
              ))}
              <span className="story__cap">Conceptual platform illustration.</span>
            </div>

            <div className="story__panel">
              <div className="story__controls" role="list">
                {CH.map((c, i) => (
                  <button
                    key={c.n}
                    className="story__ctrl"
                    aria-current={active === i}
                    onClick={() => goToChapter(i)}
                  >
                    <span className="n">{c.n}</span>
                    <span className="t">{c.t}</span>
                  </button>
                ))}
              </div>

              {CH.map((c, i) => (
                <div className="story__chapter" data-active={active === i} key={c.n} aria-hidden={active !== i}>
                  <h3>{c.h}</h3>
                  <p>{c.p}</p>
                </div>
              ))}

              <div className="story__pline" aria-hidden="true">
                <i style={{ transform: `scaleX(${(active + 1) / CH.length})` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
