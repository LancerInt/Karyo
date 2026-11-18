import { useEffect, useState } from 'react'
import { Arrow } from './icons'

const LINKS = [
  { href: '#platform', label: 'Platform' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#combinations', label: 'Combinations' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`hdr ${solid || open ? 'hdr--solid' : ''}`}>
      <div className="wrap hdr__inner">
        <div className="brand">
          <a href="#top" aria-label="Karyo — home" style={{ display: 'inline-flex', alignItems: 'baseline' }}>
            <span className="brand__word">
              Karyo<span className="brand__tm">™</span>
            </span>
          </a>
          <span className="brand__by">By Kriya</span>
        </div>

        <nav className="hdr__nav" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} className="hdr__link" href={l.href}>
              {l.label}
            </a>
          ))}
          <a className="btn btn--accent btn--sm" href="#contact">
            Discuss Your Project
          </a>
        </nav>

        <button
          className="hdr__burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className={`hdr__panel ${open ? 'hdr__panel--open' : ''}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a className="btn btn--accent" href="#contact" onClick={() => setOpen(false)}>
          Discuss Your Project <Arrow />
        </a>
      </div>
    </header>
  )
}
