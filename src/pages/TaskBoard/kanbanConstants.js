/* ── Kanban design palette ─────────────────────────────────────────
   Single source of truth for status/priority colors and the shared
   button/card/dropdown classes, so every piece of the board reads as
   one visual system. */

// Done uses the site's signal color (lime on dark, olive on light)
export const STATUSES = [
  { id: 'backlog', label: 'Backlog', hint: 'Not started', color: '#8A8A8A' },
  { id: 'queue', label: 'To Do', hint: 'Queued', color: '#60a5fa' },
  { id: 'inprogress', label: 'In Progress', hint: 'Active', color: '#fb923c' },
  { id: 'done', label: 'Done', hint: 'Shipped', color: 'var(--color-signal-text)' },
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

/* Shared classes — built on the site's global .pill / .card component classes */

export const BTN_PRIMARY = 'pill pill-invert pill-sm'

export const BTN_SECONDARY = 'pill pill-ghost pill-sm'

export const BTN_GHOST = 'pill pill-sm text-muted hover:text-primary'

export const BTN_DANGER = 'pill pill-danger pill-sm'

export const CARD_CLASS = 'card card-hover cursor-pointer'

// Label text is mixed toward the primary text color so it keeps contrast in both themes
export const badgeStyle = (color) => ({
  color: `color-mix(in srgb, ${color} 55%, var(--color-text-primary))`,
  borderColor: `color-mix(in srgb, ${color} 45%, var(--color-border))`,
  backgroundColor: `color-mix(in srgb, ${color} 14%, var(--color-surface))`,
})
