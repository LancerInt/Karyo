import { useEffect, useState } from 'react'
import { Arrow } from './icons'

const LINKS = [
  { href: '#platform', label: 'Platform' },
  { href: '#how', label: 'How It Works' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#applications', label: 'Applications' },
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
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
    <header className={`nav ${solid || open ? 'nav--solid' : ''}`}>
      <div className="wrap nav__inner">
        <div className="nav__brand">
          <a href="#top" aria-label="Karyo — home" style={{ display: 'inline-flex' }}>
            <span className="nav__word">
              Karyo<span className="nav__tm">™</span>
            </span>
          </a>
          <a
            className="nav__by"
            href="https://kriya.ltd/"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Kriya
          </a>
        </div>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} className="nav__link" href={l.href}>
              {l.label}
            </a>
          ))}
          <a className="btn btn--primary nav__cta" href="#enquiry">
            Discuss Your Project <Arrow />
          </a>
        </nav>

        <button
          className="nav__burger"
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

      <div id="mobile-menu" className={`nav__panel ${open ? 'nav__panel--open' : ''}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a className="btn btn--primary" href="#enquiry" onClick={() => setOpen(false)}>
          Discuss Your Project <Arrow />
        </a>
      </div>
    </header>
  )
}
