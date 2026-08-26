import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import confetti from 'canvas-confetti'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const DRAFT_KEY = 'birthdayWishDraft'

const loadDraft = () => {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    return raw ? JSON.parse(raw) : { fromName: '', message: '' }
  } catch {
    return { fromName: '', message: '' }
  }
}

const WishesModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('')
  const [fromName, setFromName] = useState('')
  const [message, setMessage] = useState('')
  const successIconRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    const draft = loadDraft()
    setFromName(draft.fromName)
    setMessage(draft.message)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || status === 'success') return
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ fromName, message }))
    } catch {
      // localStorage unavailable (private mode, quota, etc.) — drafts just won't persist
    }
  }, [fromName, message, isOpen, status])

  useEffect(() => {
    if (!isOpen) return
    if (PUBLIC_KEY) emailjs.init({ publicKey: PUBLIC_KEY })
    const onEscape = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) {
      setStatus('idle')
      setErrorMessage('')
    }
  }, [isOpen])

  useEffect(() => {
    if (status !== 'success') return
    const timer = setTimeout(() => onClose(), 3000)
    return () => clearTimeout(timer)
  }, [status, onClose])

  useEffect(() => {
    if (status !== 'success' || !successIconRef.current) return
    const rect = successIconRef.current.getBoundingClientRect()
    confetti({
      particleCount: 60,
      spread: 100,
      startVelocity: 35,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      zIndex: 10000,
    })
  }, [status])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('error')
      setErrorMessage('Email is not configured. Add VITE_EMAILJS_* env variables.')
      return
    }

    const nameField = e.target.elements.from_name
    if (!nameField.value.trim()) {
      nameField.value = 'Anonymous'
    }

    setStatus('sending')
    setErrorMessage('')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, { publicKey: PUBLIC_KEY })
      setStatus('success')
      e.target.reset()
      setFromName('')
      setMessage('')
      try {
        localStorage.removeItem(DRAFT_KEY)
      } catch {
        // localStorage unavailable — nothing to clean up
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage(err?.text || err?.message || 'Something went wrong.')
    }
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Send a birthday wish"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" aria-hidden="true" />
      <div
        className="relative z-10 flex flex-col items-end gap-4 w-full max-w-md max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-full w-10 h-10 flex items-center justify-center bg-[var(--color-surface)] hover:bg-[var(--color-surface-strong)] border border-[var(--color-border)] text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-border-strong)]"
          aria-label="Close"
        >
          <i className="fa-solid fa-times text-lg" />
        </button>
        <div className="w-full rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-2xl modal-zoom-in overflow-auto mb-[10vh]">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center text-center gap-4 p-6 md:p-8 py-16">
              <div ref={successIconRef} className="flex items-center justify-center w-16 h-16 rounded-full bg-green-400/10 border border-green-400/30">
                <i className="fa-solid fa-champagne-glasses text-3xl text-green-400" />
              </div>
              <p className="font-mono text-sm uppercase tracking-widest text-green-400">Wish sent</p>
              <p className="font-mono text-sm text-muted max-w-sm">Thank you so much! You're the best!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="mb-6 text-center">
                <p className="text-lg md:text-xl font-semibold text-primary">🎂 It's my birthday, drop a wish!</p>
                <p className="font-mono text-xs text-muted mt-1">warning: may cause extreme happiness</p>
              </div>
              <fieldset disabled={status === 'sending'} className="contents">
                <label className="block">
                  <span className="block font-mono text-[10px] text-left uppercase tracking-widest text-muted mb-2">Your name</span>
                  <input
                    type="text"
                    name="from_name"
                    placeholder="Anonymous"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-primary placeholder-[var(--color-text-muted)] font-mono text-sm focus:outline-none focus:border-[var(--color-border-strong)] transition-colors disabled:opacity-60"
                  />
                </label>
                <label className="block mt-4">
                  <span className="block font-mono text-[10px] text-left uppercase tracking-widest text-muted mb-2">Your wish <span className="text-red-400">*</span></span>
                  <textarea
                    name="message"
                    placeholder="Happy birthday! Hope your day is..."
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-primary placeholder-[var(--color-text-muted)] font-mono text-sm focus:outline-none focus:border-[var(--color-border-strong)] transition-colors resize-y min-h-[100px] disabled:opacity-60"
                    required
                  />
                </label>

                {status === 'error' && (
                  <p className="mt-4 font-mono text-sm text-red-400">{errorMessage}</p>
                )}

                <div className="mt-6 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[var(--color-accent)] text-[var(--color-accent-inverse)] font-mono text-xs uppercase font-bold tracking-widest hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <i className="fa-solid fa-circle-notch fa-spin text-sm" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-gift text-sm" />
                        Send wish
                      </>
                    )}
                  </button>
                </div>
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default WishesModal
