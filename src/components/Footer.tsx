export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div>
            <div className="footer__brand">
              Karyo<span>™</span>
            </div>
            <p className="footer__tag">A technology platform by Kriya.</p>
          </div>
          <nav className="footer__links" aria-label="Footer">
            <a href="#platform">Platform</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#combinations">Combinations</a>
            <a href="#contact">Contact</a>
            <a href="https://kriya.ltd/" target="_blank" rel="noopener noreferrer">Kriya</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span>© {year} Kriya Ltd. All rights reserved.</span>
          <div className="legal">
            <a href="mailto:info@kriya.ltd">info@kriya.ltd</a>
            <a href="https://kriya.ltd/policies#privacy" target="_blank" rel="noopener noreferrer">Privacy</a>
            <a href="https://kriya.ltd/" target="_blank" rel="noopener noreferrer">kriya.ltd</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
