import { useEffect, useState } from 'react'
import { Arrow } from './icons'

const LINKS: [string, string][] = [
  ['Platform', '#platform'],
  ['Process', '#sequence'],
  ['Systems', '#systems'],
  ['Capabilities', '#capabilities'],
  ['Partnership', '#partner'],
]

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className={`hdr ${solid ? 'hdr--solid' : ''}`}>
      <div className="wrap hdr__inner">
        <a className="brand" href="#top" aria-label="Karyo — home">
          <span className="brand__word">
            Karyo<span className="brand__tm">™</span>
          </span>
          <span className="brand__by">by Kriya</span>
        </a>

        <nav className="hdr__nav" aria-label="Primary">
          {LINKS.map(([label, href]) => (
            <a key={href} className="hdr__link" href={href}>
              {label}
            </a>
          ))}
        </nav>

        <button
          className="hdr__burger"
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-nav" className={`hdr__panel ${open ? 'hdr__panel--open' : ''}`}>
        {LINKS.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a className="btn btn--accent" href="#partner" onClick={() => setOpen(false)}>
          Discuss your formulation <Arrow />
        </a>
      </div>
    </header>
  )
}
