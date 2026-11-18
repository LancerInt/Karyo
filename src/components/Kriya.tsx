import { Arrow } from './icons'

export default function Kriya() {
  return (
    <section className="section section--white">
      <div className="wrap kriya">
        <div className="reveal">
          <p className="eyebrow"><span className="eyebrow__i">06</span> By Kriya</p>
          <h2 className="h-section">A Kriya technology platform.</h2>
          <p className="lede" style={{ marginTop: '1.25rem' }}>
            Karyo brings a dedicated focus on active protection and delivery to Kriya&rsquo;s wider
            technology portfolio.
          </p>
          <a
            className="textlink"
            href="https://kriya.ltd/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: '1.75rem' }}
          >
            Explore Kriya <Arrow />
          </a>
        </div>

        <div className="kriya__card reveal" data-delay="1" aria-hidden="true">
          <div className="mono">
            Karyo<span>™</span>
          </div>
          <p>A technology platform by Kriya.</p>
        </div>
      </div>
    </section>
  )
}
