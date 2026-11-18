import { useEffect, useRef, useState } from 'react'
import { StageVisual } from '../illustrations/Diagrams'

const STAGES = [
  {
    n: '01',
    t: 'Actives',
    d: 'Microbial and botanical actives — each sensitive to the conditions around it, from moisture and heat to the tank it will eventually meet.',
  },
  {
    n: '02',
    t: 'Protective matrix',
    d: 'A structured matrix and carrier system is designed around the active to help shield it through storage, transport, and handling.',
  },
  {
    n: '03',
    t: 'Integrated delivery system',
    d: 'One or more actives are combined into a single delivery system, so a complete approach travels together rather than as separate parts.',
  },
  {
    n: '04',
    t: 'Application format',
    d: 'The system is translated into a practical agricultural format, designed to support straightforward storage, mixing, and use in the field.',
  },
]

export default function Story() {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx)
            setActive(idx)
          }
        })
      },
      { threshold: 0.6, rootMargin: '-20% 0px -30% 0px' },
    )
    stepRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="section section--dark-rich" id="how">
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow">How It Works</p>
          <h2 className="display-lg" style={{ color: 'var(--ivory)' }}>
            From sensitive actives to <span className="ital" style={{ color: 'var(--sage-200)' }}>practical delivery.</span>
          </h2>
          <p className="lede" style={{ marginTop: '1.25rem' }}>
            A conceptual view of what the platform does, stage by stage — an
            explanation of function, not a verified manufacturing process.
          </p>
        </div>

        <div className="story__grid">
          <div className="story__sticky" aria-hidden="true">
            <div className="story__stage-visual">
              <StageVisual stage={active} className="story__stage-svg" />
            </div>
            <div className="annot" style={{ marginTop: '1.25rem' }}>
              <span className="dot" />
              Conceptual illustration · stage {STAGES[active].n}
            </div>
          </div>

          <div className="story__steps">
            {STAGES.map((s, i) => (
              <div
                key={s.n}
                className="story__step reveal"
                data-active={active === i}
                data-idx={i}
                ref={(el) => (stepRefs.current[i] = el)}
              >
                <span className="num">{s.n}</span>
                <h3 className="display-sm">{s.t}</h3>
                <p>{s.d}</p>
                <div className="story__step-visual">
                  <StageVisual stage={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
