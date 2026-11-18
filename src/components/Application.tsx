import { useEffect, useRef } from 'react'
import { useMotion } from '../lib/motion'

const STRIP = ['Storage & handling', 'Water compatibility', 'Tank behaviour', 'Application format']

export default function Application() {
  const bannerRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const { motionOff } = useMotion()

  // restrained scroll-linked image translation, clipped by the banner
  useEffect(() => {
    const banner = bannerRef.current
    const media = mediaRef.current
    if (!banner || !media) return
    if (motionOff) {
      media.style.transform = ''
      return
    }
    let raf = 0
    let visible = true
    const io = new IntersectionObserver((e) => (visible = e[0].isIntersecting), { rootMargin: '10% 0px' })
    io.observe(banner)
    const update = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        if (!visible) return
        const rect = banner.getBoundingClientRect()
        const vh = window.innerHeight
        const p = (rect.top + rect.height / 2 - vh / 2) / vh // -1..1 roughly
        media.style.transform = `translateY(${(p * -28).toFixed(1)}px)`
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      cancelAnimationFrame(raf)
      media.style.transform = ''
    }
  }, [motionOff])

  return (
    <section aria-labelledby="app-heading">
      <div className="appbanner" ref={bannerRef}>
        <div className="appbanner__media" ref={mediaRef}>
          <img
            src="/img/karyo-field.webp"
            srcSet="/img/karyo-field-800.webp 800w, /img/karyo-field-1280.webp 1280w, /img/karyo-field.webp 1600w"
            sizes="100vw"
            alt="A crop field at dawn with a dew-covered leaf in the foreground."
            loading="lazy"
            decoding="async"
            width={1600}
            height={1000}
          />
        </div>
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
          <p className="eyebrow"><span className="eyebrow__i">05</span> Application factors</p>
          <div className="appstrip">
            {STRIP.map((s) => (
              <div className="appstrip__cell" key={s}>
                <span className="appstrip__tick" aria-hidden="true" />
                <h3>{s}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
