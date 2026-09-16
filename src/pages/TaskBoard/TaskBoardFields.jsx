import { ChevronDown } from 'lucide-react'

/* ── Shared form primitives ────────────────────────────────────────
   One uniform, custom-styled input/select/textarea used everywhere in
   the task board — the Eisenhower matrix and the Kanban board alike —
   so every control reads as the same design system. Native <select>
   chrome is stripped (appearance-none) and replaced with our own
   chevron to keep it consistent across browsers. */

const controlBase =
  'w-full min-w-0 rounded-sm border border-[var(--color-border)] px-3 py-2 text-sm text-primary placeholder:text-[var(--color-text-muted)] outline-none transition-colors focus:border-[var(--color-border-strong)] disabled:opacity-50 disabled:cursor-not-allowed'

const toneClass = (tone) =>
  tone === 'surface' ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-bg)]'

export const TextField = ({ className = '', tone = 'bg', ...props }) => (
  <input {...props} className={`${controlBase} ${toneClass(tone)} ${className}`} />
)

export const TextAreaField = ({ className = '', tone = 'bg', ...props }) => (
  <textarea
    {...props}
    className={`${controlBase} ${toneClass(tone)} resize-y min-h-[90px] ${className}`}
  />
)

export const SelectField = ({ className = '', children, ...props }) => (
  <div className={`relative min-w-0 ${className}`}>
    <select
      {...props}
      className={`${controlBase} appearance-none bg-[var(--color-surface)] pr-8 cursor-pointer`}
    >
      {children}
    </select>
    <ChevronDown className="w-3.5 h-3.5 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted" />
  </div>
)
