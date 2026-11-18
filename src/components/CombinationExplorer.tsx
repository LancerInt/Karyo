import { useEffect, useRef, useState } from 'react'
import { useInView } from '../lib/hooks'
import { useMotion } from '../lib/motion'

type Combo = 'mm' | 'bb' | 'mb'

const TABS: { id: Combo; label: string; heading: string; desc: string }[] = [
  { id: 'mm', label: 'Microbial + Microbial', heading: 'Microbial + Microbial', desc: 'Explore delivery architectures that bring microbial actives together within a coordinated system.' },
  { id: 'bb', label: 'Botanical + Botanical', heading: 'Botanical + Botanical', desc: 'Explore carrier and matrix designs for combinations of botanical actives.' },
  { id: 'mb', label: 'Microbial + Botanical', heading: 'Microbial + Botanical', desc: 'Bring microbial and botanical actives into a shared delivery design, with compatibility considered for the intended formulation.' },
]

const MICRO = { src: '/img/karyo-microbial.webp', srcSet: '/img/karyo-microbial-560.webp 560w, /img/karyo-microbial.webp 900w' }
const BOT = { src: '/img/karyo-botanical.webp', srcSet: '/img/karyo-botanical-560.webp 560w, /img/karyo-botanical.webp 900w' }

type Slot = { kind: 'm' | 'b'; left: string; scale: number }
// which instances are visible per state, and where they settle
const LAYOUT: Record<Combo, { A: Slot; B: Slot }> = {
  mm: { A: { kind: 'm', left: '34%', scale: 0.92 }, B: { kind: 'm', left: '68%', scale: 1.06 } },
  bb: { A: { kind: 'b', left: '33%', scale: 1.02 }, B: { kind: 'b', left: '67%', scale: 0.95 } },
  mb: { A: { kind: 'm', left: '35%', scale: 1.0 }, B: { kind: 'b', left: '66%', scale: 1.0 } },
}

function Asset({ slot, float, floatRev }: { slot: Slot; float: boolean; floatRev: boolean }) {
  const img = slot.kind === 'm' ? MICRO : BOT
  return (
    <div
      className="combx__asset"
      style={{ left: slot.left, transform: `translate(-50%, -50%) scale(${slot.scale})` }}
    >
      <img
        className={float ? `floating ${floatRev ? 'floating--rev' : ''}` : ''}
        src={img.src}
        srcSet={img.srcSet}
        sizes="(max-width: 820px) 45vw, 28vw"
        alt=""
        loading="lazy"
        decoding="async"
        width={900}
        height={900}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  )
}

export default function CombinationExplorer() {
  const [active, setActive] = useState<Combo>('mb')
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [ind, setInd] = useState<{ x: number; w: number }>({ x: 0, w: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, '0px 0px -10% 0px')
  const { motionOff } = useMotion()

  const idx = TABS.findIndex((t) => t.id === active)
  const cur = TABS[idx]
  const layout = LAYOUT[active]
  const float = !motionOff && inView

  useEffect(() => {
    const btn = pillRefs.current[idx]
    if (btn) setInd({ x: btn.offsetLeft, w: btn.offsetWidth })
  }, [idx])

  useEffect(() => {
    const onResize = () => {
      const btn = pillRefs.current[idx]
      if (btn) setInd({ x: btn.offsetLeft, w: btn.offsetWidth })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [idx])

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End']
    if (!keys.includes(e.key)) return
    e.preventDefault()
    let n = i
    if (e.key === 'Home') n = 0
    else if (e.key === 'End') n = TABS.length - 1
    else n = (i + (e.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length
    setActive(TABS[n].id)
    pillRefs.current[n]?.focus()
  }

  return (
    <section className="section combx" id="combinations" ref={sectionRef}>
      <div className="wrap">
        <div className="combx__head reveal">
          <p className="eyebrow">Combinations</p>
          <h2 className="h-section">Different actives. A shared delivery approach.</h2>
        </div>

        <div className="combx__pills reveal" role="tablist" aria-label="Active combinations">
          <span className="combx__ind" aria-hidden="true" style={{ transform: `translateX(${ind.x}px)`, width: ind.w }} />
          {TABS.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => (pillRefs.current[i] = el)}
              className="combx__pill"
              role="tab"
              id={`pill-${t.id}`}
              aria-selected={active === t.id}
              aria-controls="combx-panel"
              tabIndex={active === t.id ? 0 : -1}
              onClick={() => setActive(t.id)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="combx__body" id="combx-panel" role="tabpanel" aria-labelledby={`pill-${active}`}>
          <div className="combx__stage reveal">
            <Asset slot={layout.A} float={float} floatRev={false} />
            <Asset slot={layout.B} float={float} floatRev />
            {/* shared carrier + connector shown only for the hybrid */}
            <svg className="combx__svg" viewBox="0 0 800 500" style={{ opacity: active === 'mb' ? 1 : 0, transition: 'opacity .5s ease' }} aria-hidden="true">
              <ellipse cx="400" cy="250" rx="320" ry="190" fill="none" stroke="#b7c7bd" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="2 12" />
              <line x1="300" y1="250" x2="500" y2="250" stroke="#b7c7bd" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="4 9" />
            </svg>
          </div>

          <div className="combx__text" key={active}>
            <h3 className="fade">{cur.heading}</h3>
            <p className="fade">{cur.desc}</p>
            <p className="combx__note">Compatibility and performance depend on the selected actives and formulation.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
