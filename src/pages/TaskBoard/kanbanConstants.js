/* ── Kanban design palette ─────────────────────────────────────────
   Single source of truth for status/priority colors and the shared
   button/card/dropdown classes, so every piece of the board reads as
   one visual system. */

export const STATUSES = [
  { id: 'backlog', label: 'Backlog', hint: 'Not started', color: '#9ca3af' },
  { id: 'queue', label: 'To Do', hint: 'Queued', color: '#60a5fa' },
  { id: 'inprogress', label: 'In Progress', hint: 'Active', color: '#fb923c' },
  { id: 'done', label: 'Done', hint: 'Shipped', color: '#4ade80' },
]

export const PRIORITIES = [
  { id: 'low', label: 'Low', color: '#9ca3af' },
  { id: 'medium', label: 'Medium', color: '#60a5fa' },
  { id: 'high', label: 'High', color: '#fb923c' },
  { id: 'urgent', label: 'Urgent', color: '#f87171' },
]

export const DEFAULT_GROUP = 'General'
export const DEFAULT_STATUS = 'backlog'
export const DEFAULT_PRIORITY = 'medium'

export const GROUP_PALETTE = [
  '#f87171', '#fb923c', '#facc15', '#4ade80',
  '#22d3ee', '#818cf8', '#f472b6', '#c084fc',
]

export const statusById = (id) => STATUSES.find((s) => s.id === id) ?? STATUSES[0]
export const priorityById = (id) => PRIORITIES.find((p) => p.id === id) ?? PRIORITIES[1]

export const nextGroupColor = (existingColors) => {
  const assigned = Object.keys(existingColors).filter((c) => c !== DEFAULT_GROUP).length
  return GROUP_PALETTE[assigned % GROUP_PALETTE.length]
}

export const formatShortDate = (iso) => {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/* Shared classes — buttons, cards, dropdowns, inputs */

export const BTN_PRIMARY =
  'rounded-full bg-[var(--color-accent)] text-[var(--color-accent-inverse)] px-4 py-2 text-[11px] font-mono uppercase tracking-widest transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed'

export const BTN_SECONDARY =
  'rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-[11px] font-mono uppercase tracking-widest text-primary hover:border-[var(--color-border-strong)] transition-colors'

export const BTN_GHOST =
  'rounded-full px-4 py-2 text-[11px] font-mono uppercase tracking-widest text-muted hover:text-primary transition-colors'

export const BTN_DANGER =
  'rounded-full border border-red-400/30 bg-red-400/10 px-4 py-2 text-[11px] font-mono uppercase tracking-widest text-red-400 hover:bg-red-400/20 transition-colors'

export const CARD_CLASS =
  'rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-strong)] transition-colors cursor-pointer'

export const badgeStyle = (color) => ({
  color,
  borderColor: `color-mix(in srgb, ${color} 45%, var(--color-border))`,
  backgroundColor: `color-mix(in srgb, ${color} 14%, var(--color-surface))`,
})
