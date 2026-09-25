import { ChevronDown } from 'lucide-react'

/* ── Shared form primitives ────────────────────────────────────────
   One uniform, custom-styled input/select/textarea used everywhere in
   the task board — the Eisenhower matrix and the Kanban board alike —
   so every control reads as the same design system. Single-line
   controls are full-round like the site's pills; native <select>
   chrome is stripped (appearance-none) and replaced with our own
   chevron to keep it consistent across browsers. */

const controlBase =
  'w-full min-w-0 border border-[var(--color-border-strong)] px-4 py-2 text-sm text-primary placeholder:text-[var(--color-text-muted)] outline-none transition-colors hover:border-[var(--color-text-muted)] focus:border-[var(--color-signal-text)] focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed'

const toneClass = (tone) =>
  tone === 'surface' ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-bg)]'

export const TextField = ({ className = '', tone = 'bg', ...props }) => (
  <input {...props} className={`${controlBase} rounded-full ${toneClass(tone)} ${className}`} />
)

export const TextAreaField = ({ className = '', tone = 'bg', ...props }) => (
  <textarea
    {...props}
    className={`${controlBase} rounded-2xl ${toneClass(tone)} resize-y min-h-[90px] ${className}`}
  />
)

export const SelectField = ({ className = '', children, ...props }) => (
  <div className={`relative min-w-0 ${className}`}>
    <select
      {...props}
      className={`${controlBase} rounded-full appearance-none bg-[var(--color-surface)] pr-9 cursor-pointer`}
    >
      {children}
    </select>
    <ChevronDown
      className="w-3.5 h-3.5 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
      aria-hidden="true"
    />
  </div>
)
