import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const ContactModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('')

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('error')
      setErrorMessage('Email is not configured. Add VITE_EMAILJS_* env variables.')
      return
    }
    setStatus('sending')
    setErrorMessage('')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, { publicKey: PUBLIC_KEY })
      setStatus('success')
      e.target.reset()
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
      aria-label="Request form"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" aria-hidden="true" />
      <div
        className="relative z-10 flex flex-col items-end gap-4 w-full max-w-2xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-full w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Close"
        >
          <i className="fa-solid fa-times text-lg" />
        </button>
        <div className="w-full rounded-sm border border-white/10 bg-[#1a1a1a] shadow-2xl modal-zoom-in overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block">
                  <span className="block font-mono text-[10px] text-left uppercase tracking-widest text-gray-400 mb-2">Your name</span>
                  <input
                    type="text"
                    name="from_name"
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-sm focus:outline-none focus:border-white/30 transition-colors"
                    required
                  />
                </label>
                <label className="block">
                  <span className="block font-mono text-[10px] text-left uppercase tracking-widest text-gray-400 mb-2">Company</span>
                  <input
                    type="text"
                    name="company"
                    placeholder="Acme Inc."
                    className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-sm focus:outline-none focus:border-white/30 transition-colors"
                  />
                </label>
              </div>
              <div className="space-y-4">
                <label className="block">
                  <span className="block font-mono text-[10px] text-left uppercase tracking-widest text-gray-400 mb-2">Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-sm focus:outline-none focus:border-white/30 transition-colors"
                    required
                  />
                </label>
                <label className="block">
                  <span className="block font-mono text-[10px] text-left uppercase tracking-widest text-gray-400 mb-2">Project type</span>
                  <input
                    type="text"
                    name="project_type"
                    placeholder="New product build"
                    className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-sm focus:outline-none focus:border-white/30 transition-colors"
                  />
                </label>
              </div>
            </div>
            <label className="block mt-4">
              <span className="block font-mono text-[10px] text-left uppercase tracking-widest text-gray-400 mb-2">What are you building?</span>
              <textarea
                name="message"
                placeholder="A few sentences about your goals, timeline, and success metrics."
                rows={4}
                className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-sm focus:outline-none focus:border-white/30 transition-colors resize-y min-h-[100px]"
              />
            </label>

            {status === 'success' && (
              <p className="mt-4 font-mono text-sm text-green-400">Request sent. We’ll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="mt-4 font-mono text-sm text-red-400">{errorMessage}</p>
            )}

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-white text-black font-mono text-xs uppercase font-bold tracking-widest hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  'Sending…'
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane text-sm" />
                    Send request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactModal
