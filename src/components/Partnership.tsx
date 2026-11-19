import { useState } from 'react'
import { Arrow } from './icons'

/* No server endpoint is configured, so the form opens the visitor's email app
   with the details prefilled — and the UI says so plainly. Set FORM_ENDPOINT to
   a real POST URL to enable live submission with a confirmed success state. */
const FORM_ENDPOINT = ''
const CONTACT_EMAIL = 'info@kriya.ltd'
const opensEmailApp = !FORM_ENDPOINT

type Fields = { name: string; email: string; company: string; interest: string; message: string }
const EMPTY: Fields = { name: '', email: '', company: '', interest: '', message: '' }

const INTERESTS = [
  'Microbial actives',
  'Botanical actives',
  'Multi-active systems',
  'Formulation & delivery',
  'Partnership / other',
]

type Status =
  | { kind: 'idle' }
  | { kind: 'info'; text: string }
  | { kind: 'ok'; text: string }
  | { kind: 'err'; text: string }

export default function Partnership() {
  const [f, setF] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [busy, setBusy] = useState(false)

  const set =
    (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setF((p) => ({ ...p, [k]: e.target.value }))
      setErrors((p) => ({ ...p, [k]: undefined }))
    }

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {}
    if (!f.name.trim()) next.name = 'Please add your name.'
    if (!f.email.trim()) next.email = 'Please add a work email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
      next.email = 'That email doesn’t look right.'
    if (!f.message.trim()) next.message = 'Please describe your project requirements.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      setStatus({ kind: 'idle' })
      return
    }

    if (FORM_ENDPOINT) {
      try {
        setBusy(true)
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(f),
        })
        setBusy(false)
        if (!res.ok) throw new Error()
        setStatus({ kind: 'ok', text: 'Thanks — your enquiry has been sent. We’ll be in touch soon.' })
        setF(EMPTY)
      } catch {
        setBusy(false)
        setStatus({
          kind: 'err',
          text: `Something went wrong. Please email us directly at ${CONTACT_EMAIL}.`,
        })
      }
      return
    }

    // Email-app fallback — stated plainly, never shown as a confirmed submission.
    const subject = `Karyo enquiry — ${f.company || f.name}`
    const body = [
      `Name: ${f.name}`,
      `Work email: ${f.email}`,
      f.company && `Company: ${f.company}`,
      f.interest && `Area of interest: ${f.interest}`,
      '',
      'Project requirements:',
      f.message,
    ]
      .filter(Boolean)
      .join('\n')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setStatus({
      kind: 'info',
      text: `Opening your email app with these details addressed to ${CONTACT_EMAIL}. Your enquiry is sent once you send that email.`,
    })
  }

  return (
    <section className="section partner" id="partner">
      <div className="wrap">
        <div className="partner__head" data-rise>
          <p className="eyebrow">Partnership</p>
          <h2 className="h-section">Bring us your formulation challenge.</h2>
          <p className="lede" style={{ marginTop: '1.5rem' }}>
            Tell us about your active ingredients, intended application, and delivery requirements.
            Start a technical discussion with Kriya.
          </p>
        </div>

        <div className="partner__grid">
          <div>
            <figure className="partner__media">
              <img
                src="/img/karyo-contact.webp"
                srcSet="/img/karyo-contact-800.webp 800w, /img/karyo-contact-1280.webp 1280w, /img/karyo-contact.webp 1600w"
                sizes="(min-width: 920px) 40vw, 90vw"
                alt="Botanical samples and amber glassware arranged in warm daylight."
                loading="lazy"
                decoding="async"
                width={1600}
                height={1200}
              />
            </figure>

            <div className="contact__details">
              <div className="contact__row">
                <span className="k">Email</span>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <div className="contact__row">
                <span className="k">Phone</span>
                <a href="tel:+916385848466">+91 63858 48466</a>
              </div>
              <div className="contact__row">
                <span className="k">WhatsApp</span>
                <a href="https://wa.me/916385848466" target="_blank" rel="noopener noreferrer">
                  wa.me/916385848466
                </a>
              </div>
            </div>
          </div>

          <form className="form" onSubmit={onSubmit} noValidate>
            <div className="form__row">
              <div className="field">
                <label htmlFor="c-name">
                  Name <span className="req" aria-hidden="true">*</span>
                </label>
                <input
                  id="c-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={f.name}
                  onChange={set('name')}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'e-name' : undefined}
                  placeholder="Your name"
                />
                {errors.name && (
                  <span className="field__err" id="e-name">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="field">
                <label htmlFor="c-email">
                  Work email <span className="req" aria-hidden="true">*</span>
                </label>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={f.email}
                  onChange={set('email')}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'e-email' : undefined}
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <span className="field__err" id="e-email">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="form__row">
              <div className="field">
                <label htmlFor="c-company">
                  Company <span className="opt">(optional)</span>
                </label>
                <input
                  id="c-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={f.company}
                  onChange={set('company')}
                  placeholder="Company name"
                />
              </div>
              <div className="field">
                <label htmlFor="c-interest">
                  Area of interest <span className="opt">(optional)</span>
                </label>
                <select id="c-interest" name="interest" value={f.interest} onChange={set('interest')}>
                  <option value="">Select an area…</option>
                  {INTERESTS.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="c-message">
                Project requirements <span className="req" aria-hidden="true">*</span>
              </label>
              <textarea
                id="c-message"
                name="message"
                value={f.message}
                onChange={set('message')}
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'e-message' : undefined}
                placeholder="Your active ingredients, intended application, and delivery requirements."
              />
              {errors.message && (
                <span className="field__err" id="e-message">
                  {errors.message}
                </span>
              )}
            </div>

            <div className="form__foot">
              <button className="btn btn--accent" type="submit" disabled={busy}>
                {busy ? 'Sending…' : opensEmailApp ? 'Prepare enquiry email' : 'Send enquiry'} <Arrow />
              </button>
              {opensEmailApp && (
                <p className="form__hint">This opens your email app with the details ready to send.</p>
              )}
            </div>

            <div aria-live="polite">
              {status.kind === 'ok' && <p className="form__status form__status--ok">{status.text}</p>}
              {status.kind === 'info' && (
                <p className="form__status form__status--info">{status.text}</p>
              )}
              {status.kind === 'err' && (
                <p className="form__status form__status--err">
                  {status.text.split(CONTACT_EMAIL)[0]}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
