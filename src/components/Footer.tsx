export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__top">
          <div>
            <div className="ftr__brand">
              Karyo<span>™</span>
            </div>
            <p className="ftr__by">A technology platform by Kriya.</p>
          </div>
          <nav className="ftr__links" aria-label="Footer">
            <a href="#platform">Platform</a>
            <a href="#sequence">Process</a>
            <a href="#systems">Systems</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#partner">Partnership</a>
          </nav>
        </div>
        <div className="ftr__bottom">
          <span>© {new Date().getFullYear()} Kriya. All rights reserved.</span>
          <div className="legal">
            <a href="mailto:info@kriya.ltd">info@kriya.ltd</a>
            <a href="https://kriya.ltd/policies#privacy" target="_blank" rel="noopener noreferrer">
              Privacy
            </a>
            <a href="https://kriya.ltd/" target="_blank" rel="noopener noreferrer">
              kriya.ltd
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
