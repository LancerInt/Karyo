import { useState } from 'react'
import { Arrow } from './icons'

/* No submission endpoint is configured. Rather than fake a success state, the
   form composes an email to Kriya's verified address. Set this to a real POST
   endpoint to wire up live submission. */
const FORM_ENDPOINT = ''
const CONTACT_EMAIL = 'info@kriya.ltd'

type Fields = {
  name: string
  email: string
  company: string
  interest: string
  message: string
}
const EMPTY: Fields = { name: '', email: '', company: '', interest: '', message: '' }

const INTERESTS = [
  'Microbial actives',
  'Botanical actives',
  'Multi-active combination',
  'Formulation & delivery',
  'Partnership / other',
]

type Status =
  | { kind: 'idle' }
  | { kind: 'email'; note: string }
  | { kind: 'sent' }
  | { kind: 'error'; note: string }

export default function Enquiry() {
  const [f, setF] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [busy, setBusy] = useState(false)

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setF((prev) => ({ ...prev, [k]: e.target.value }))
    setErrors((prev) => ({ ...prev, [k]: undefined }))
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof Fields, string>> = {}
    if (!f.name.trim()) next.name = 'Please add your name.'
    if (!f.email.trim()) next.email = 'Please add a work email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) next.email = 'That email doesn’t look right.'
    if (!f.message.trim()) next.message = 'Tell us a little about your project.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      setStatus({ kind: 'idle' })
      return
    }

    // Live endpoint path (only when configured)
    if (FORM_ENDPOINT) {
      try {
        setBusy(true)
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(f),
        })
        setBusy(false)
        if (!res.ok) throw new Error('bad status')
        setStatus({ kind: 'sent' })
        setF(EMPTY)
        return
      } catch {
        setBusy(false)
        setStatus({
          kind: 'error',
          note: `Something went wrong sending that. Please email us directly at ${CONTACT_EMAIL}.`,
        })
        return
      }
    }

    // Honest fallback: open the user's email client with a prefilled message.
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
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = href
    setStatus({
      kind: 'email',
      note: 'Your email app should now open with the details ready to send. If it doesn’t, copy your note and email us directly.',
    })
  }

  return (
    <section className="section section--dark-rich" id="enquiry">
      <div className="wrap enquiry__grid">
        <div className="enquiry__aside">
          <p className="eyebrow reveal">Partnership Enquiry</p>
          <h2 className="display-lg reveal" style={{ color: 'var(--ivory)' }}>
            Let&rsquo;s shape your next <span className="ital" style={{ color: 'var(--sage-200)' }}>delivery system.</span>
          </h2>
          <p className="lede reveal">
            Discuss your active, application, and formulation goals with Kriya.
          </p>

          <div className="enquiry__contacts reveal" data-delay="1">
            <div className="enquiry__contact">
              <span className="k">Email</span>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
            <div className="enquiry__contact">
              <span className="k">Phone</span>
              <a href="tel:+916385848466">+91 63858 48466</a>
            </div>
            <div className="enquiry__contact">
              <span className="k">WhatsApp</span>
              <a href="https://wa.me/916385848466" target="_blank" rel="noopener noreferrer">
                wa.me/916385848466
              </a>
            </div>
          </div>
        </div>

        <form className="form reveal" data-delay="1" onSubmit={onSubmit} noValidate>
          <div className="form__row">
            <div className="field">
              <label htmlFor="f-name">
                Name <span className="req" aria-hidden="true">*</span>
              </label>
              <input
                id="f-name"
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
              {errors.name && <span className="field__error" id="e-name">{errors.name}</span>}
            </div>
            <div className="field">
              <label htmlFor="f-email">
                Work email <span className="req" aria-hidden="true">*</span>
              </label>
              <input
                id="f-email"
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
              {errors.email && <span className="field__error" id="e-email">{errors.email}</span>}
            </div>
          </div>

          <div className="form__row">
            <div className="field">
              <label htmlFor="f-company">
                Company <span className="opt">(optional)</span>
              </label>
              <input
                id="f-company"
                name="company"
                type="text"
                autoComplete="organization"
                value={f.company}
                onChange={set('company')}
                placeholder="Company name"
              />
            </div>
            <div className="field">
              <label htmlFor="f-interest">
                Area of interest <span className="opt">(optional)</span>
              </label>
              <select id="f-interest" name="interest" value={f.interest} onChange={set('interest')}>
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
            <label htmlFor="f-message">
              Project requirements <span className="req" aria-hidden="true">*</span>
            </label>
            <textarea
              id="f-message"
              name="message"
              value={f.message}
              onChange={set('message')}
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'e-message' : undefined}
              placeholder="Your active, the application you have in mind, and what you’d like delivery to achieve."
            />
            {errors.message && <span className="field__error" id="e-message">{errors.message}</span>}
          </div>

          <div className="form__foot">
            <button className="btn btn--primary" type="submit" disabled={busy}>
              {busy ? 'Sending…' : 'Send Enquiry'} <Arrow />
            </button>
            <p className="form__note">
              We&rsquo;ll use your details only to respond to this enquiry.
            </p>
          </div>

          <div aria-live="polite">
            {status.kind === 'email' && <p className="form__status">{status.note}</p>}
            {status.kind === 'sent' && (
              <p className="form__status">Thanks — your enquiry has been sent. We&rsquo;ll be in touch soon.</p>
            )}
            {status.kind === 'error' && (
              <p className="form__status">
                {status.note.split(CONTACT_EMAIL)[0]}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
