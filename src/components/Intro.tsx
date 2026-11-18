import { Arrow } from './icons'

export default function Intro() {
  return (
    <section className="section section--ivory" id="platform">
      <div className="wrap intro">
        <div className="reveal">
          <p className="eyebrow">The Platform</p>
          <h2 className="h-section">An active is only part of the formulation.</h2>
          <p className="lede" style={{ marginTop: '1.25rem' }}>
            How an active is protected, combined, and delivered matters. Karyo focuses on the
            delivery system around microbial and botanical actives—from protective matrices and
            carriers to practical application formats.
          </p>
          <a className="textlink" href="#story" style={{ marginTop: '1.75rem' }}>
            Explore the platform <Arrow />
          </a>
        </div>

        <div className="intro__words reveal" data-delay="1" aria-hidden="true">
          <span><span className="dot" /> Protect</span>
          <span><span className="dot" /> Combine</span>
          <span><span className="dot" /> Deliver</span>
        </div>
      </div>
    </section>
  )
}
