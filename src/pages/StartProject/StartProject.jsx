import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import Navigation from '../../shared/components/Navigation'
import Footer from '../../shared/components/Footer'
import SEOHead from '../../shared/components/SEOHead'
import Eyebrow from '../../shared/components/Eyebrow'
import Pill from '../../shared/components/Pill'
import capabilities from '../../shared/data/capabilities.json'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const EMAIL = 'reztomoloju@gmail.com'

const BUDGETS = ['Under $1k', '$1k – $3k', '$3k – $8k', '$8k – $15k', '$15k+', 'Not sure yet']
const TIMELINES = ['ASAP (under 2 weeks)', '2 – 4 weeks', '1 – 3 months', '3+ months', 'Flexible']

const EMPTY = { from_name: '', email: '', company: '', services: [], budget: '', timeline: '', message: '' }

const validate = (values) => {
  const errors = {}
  if (!values.from_name.trim()) errors.from_name = 'Please add your name.'
  if (!values.email.trim()) errors.email = 'Please add your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'That email doesn’t look right.'
  if (!values.message.trim()) errors.message = 'Tell me a little about what you’re building.'
  return errors
}

const FieldError = ({ id, message }) =>
  message ? (
    <p id={id} className="field-error" role="alert">
      {message}
    </p>
  ) : null

const SelectField = ({ id, label, value, onChange, options, placeholder }) => (
  <div>
    <label htmlFor={id} className="field-label">{label}</label>
    <div className="relative">
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`field ${value ? '' : '!text-primary'}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
        aria-hidden="true"
      />
    </div>
  </div>
)

const StartProject = () => {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('')
  const formRef = useRef(null)
  const successRef = useRef(null)

  const update = (name, value) => {
    const next = { ...values, [name]: value }
    setValues(next)
    if (attempted) setErrors(validate(next))
  }

  const toggleService = (role) => {
    update(
      'services',
      values.services.includes(role)
        ? values.services.filter((s) => s !== role)
        : [...values.services, role]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setAttempted(true)
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      formRef.current?.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('error')
      setErrorMessage('Email is not configured. Add VITE_EMAILJS_* env variables.')
      return
    }

    setStatus('sending')
    setErrorMessage('')

    const projectType = values.services.join(', ')
    const details = [
      values.message.trim(),
      '',
      `Budget: ${values.budget || 'Not specified'}`,
      `Timeline: ${values.timeline || 'Not specified'}`,
    ].join('\n')

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: values.from_name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          project_type: projectType,
          budget: values.budget,
          timeline: values.timeline,
          message: details,
        },
        { publicKey: PUBLIC_KEY }
      )
      setStatus('success')
      setValues(EMPTY)
      setTimeout(() => successRef.current?.focus(), 50)
    } catch (err) {
      setStatus('error')
      setErrorMessage(err?.text || err?.message || 'Something went wrong.')
    }
  }

  const fieldProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: (e) => update(name, e.target.value),
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: 'field',
  })

  return (
    <>
      <SEOHead
        title="Start a Project"
        description="Tell Reuben Oluwafemi what you're building — a short brief form for custom WordPress plugins, React frontends, integrations and performance work. Replies within 48 hours."
        canonical="https://www.usereuben.com/start-a-project"
      />
      <Navigation />

      <main
        id="main"
        className="max-w-[1400px] mx-auto grid-frame px-4 md:px-10 pt-32 md:pt-44 pb-20 md:pb-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left — sticky intake pane */}
          <aside className="lg:pr-16 lg:border-r border-[var(--color-border)] pb-14 lg:pb-0">
            <div className="lg:sticky lg:top-32">
              <Eyebrow
                num="01"
                label="Intake"
                className="pb-2 border-b border-[var(--color-signal-text)]"
              />
              <h1 className="mt-8 font-semibold tracking-display leading-[0.92] text-[clamp(52px,8vw,112px)]">
                <span className="block text-primary">Start a</span>
                <span className="block text-muted">Project</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-muted leading-relaxed max-w-md">
                A short form to understand your needs and determine fit.
              </p>

              <hr className="my-10 border-[var(--color-border)]" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-10">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-eyebrow text-muted mb-3">
                    How I work
                  </p>
                  <p className="text-sm text-secondary leading-relaxed max-w-sm">
                    I take on a limited number of projects at a time so each one gets senior focus.
                    Every request is read and answered personally — no bots, no sales team.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-eyebrow text-muted mb-3">
                    Direct contact
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="block text-base font-medium text-primary hover:text-signal-text transition-colors break-all"
                  >
                    {EMAIL}
                  </a>
                  <p className="text-sm text-muted mt-1">Nigeria · Remote Worldwide</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Right — form */}
          <div className="lg:pl-16 pt-14 lg:pt-0 border-t lg:border-t-0 border-[var(--color-border)]">
            {status === 'success' ? (
              <div
                ref={successRef}
                tabIndex={-1}
                className="card p-8 md:p-12 text-center flex flex-col items-center gap-5 outline-none"
                role="status"
              >
                <span className="w-16 h-16 rounded-full flex items-center justify-center bg-[var(--color-signal)] text-[var(--color-signal-ink)]">
                  <Check className="w-7 h-7" aria-hidden="true" />
                </span>
                <p className="font-mono text-[11px] uppercase tracking-eyebrow text-signal-text">Request sent</p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-display text-primary">
                  Thanks for reaching out.
                </h2>
                <p className="text-base text-muted max-w-sm leading-relaxed">
                  I’ll review your brief personally and reply with next steps within{' '}
                  <span className="text-primary font-medium">48 hours</span>.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  <Pill variant="ghost" to="/projects">See all projects</Pill>
                  <Pill variant="ghost" onClick={() => setStatus('idle')}>Send another</Pill>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Start a project">
                <fieldset disabled={status === 'sending'} className="space-y-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div>
                      <label htmlFor="from_name" className="field-label">Your name *</label>
                      <input type="text" autoComplete="name" placeholder="Jane Doe" required {...fieldProps('from_name')} />
                      <FieldError id="from_name-error" message={errors.from_name} />
                    </div>
                    <div>
                      <label htmlFor="email" className="field-label">Email *</label>
                      <input type="email" autoComplete="email" placeholder="jane@company.com" required {...fieldProps('email')} />
                      <FieldError id="email-error" message={errors.email} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="field-label">Company</label>
                    <input type="text" autoComplete="organization" placeholder="Acme Inc." {...fieldProps('company')} />
                  </div>

                  <fieldset>
                    <legend className="field-label !mb-4">Where can I help?</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {capabilities.map((item) => {
                        const checked = values.services.includes(item.role)
                        return (
                          <label
                            key={item.id}
                            className={`relative flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--color-signal-text)] ${
                              checked
                                ? 'border-[var(--color-signal-text)] bg-[var(--color-signal-tint)]'
                                : 'border-[var(--color-border-strong)] hover:border-[var(--color-text-muted)]'
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={checked}
                              onChange={() => toggleService(item.role)}
                            />
                            <span
                              aria-hidden="true"
                              className={`mt-0.5 w-4 h-4 shrink-0 rounded-full border flex items-center justify-center ${
                                checked
                                  ? 'bg-[var(--color-signal)] border-[var(--color-signal)] text-[var(--color-signal-ink)]'
                                  : 'border-[var(--color-border-strong)]'
                              }`}
                            >
                              {checked && <Check className="w-3 h-3" />}
                            </span>
                            <span>
                              <span className="block text-sm font-medium text-primary">{item.role}</span>
                              <span className="block mt-1 text-xs text-muted leading-relaxed">{item.pills.join(' · ')}</span>
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </fieldset>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <SelectField
                      id="budget"
                      label="Budget range (USD)"
                      value={values.budget}
                      onChange={(e) => update('budget', e.target.value)}
                      options={BUDGETS}
                      placeholder="Select range"
                    />
                    <SelectField
                      id="timeline"
                      label="Ideal timeline"
                      value={values.timeline}
                      onChange={(e) => update('timeline', e.target.value)}
                      options={TIMELINES}
                      placeholder="Select timeline"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="field-label">What are you building? *</label>
                    <textarea
                      rows={6}
                      placeholder="A few sentences about your goals, timeline, and success metrics."
                      required
                      {...fieldProps('message')}
                      className="field resize-y min-h-[160px]"
                    />
                    <FieldError id="message-error" message={errors.message} />
                  </div>

                  {status === 'error' && (
                    <p className="field-error !text-sm" role="alert">{errorMessage}</p>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <button
                      type="submit"
                      className="pill pill-signal pill-lg pill-arrow magnetic-btn w-full sm:w-auto"
                    >
                      {status === 'sending' ? 'Sending…' : 'Send Request'}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <p className="font-mono text-[11px] uppercase tracking-eyebrow text-muted">
                      Brief form · 48h response
                    </p>
                  </div>
                </fieldset>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default StartProject
