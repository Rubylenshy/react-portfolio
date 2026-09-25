import { X } from 'lucide-react'
import {
  STATUSES,
  DEFAULT_GROUP,
  statusById,
  priorityById,
  badgeStyle,
  formatShortDate,
} from './kanbanConstants'

const GENERAL_COLOR = '#9ca3af'

const KanbanCard = ({ card, groupColor, onOpen, onMove, onDelete }) => {
  const status = statusById(card.status)
  const priority = priorityById(card.priority)

  return (
    <li
      onClick={() => onOpen(card.id)}
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-border-strong)] transition-colors cursor-pointer p-3.5"
      style={{ borderLeft: `3px solid ${status.color}` }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onOpen(card.id)
          }}
          className="flex-1 min-w-0 text-left text-sm font-medium text-primary break-words hover:text-signal-text transition-colors"
        >
          {card.title}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(card.id)
          }}
          aria-label="Delete work item"
          className="shrink-0 rounded-full w-7 h-7 flex items-center justify-center text-muted hover:text-primary hover:bg-[var(--color-surface-raised)] transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {card.description && (
        <p className="text-xs text-muted leading-relaxed mb-2 line-clamp-2">{card.description}</p>
      )}

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            aria-hidden="true"
            className="shrink-0 w-2 h-2 rounded-full"
            style={{ backgroundColor: groupColor || GENERAL_COLOR }}
          />
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted truncate">
            {card.group || DEFAULT_GROUP}
          </span>
        </div>
        <span
          className="shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider"
          style={badgeStyle(priority.color)}
        >
          {priority.label}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 mt-2.5 pt-2.5 border-t border-[var(--color-border)]">
        <select
          aria-label="Move work item"
          value={card.status}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onMove(card.id, e.target.value)}
          className="shrink min-w-0 font-mono text-[11px] uppercase tracking-wider bg-[var(--color-surface)] border border-[var(--color-border-strong)] rounded-full px-3 py-1 text-muted hover:text-primary cursor-pointer"
        >
          {STATUSES.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted">
          {formatShortDate(card.updatedAt)}
        </span>
      </div>
    </li>
  )
}

export default KanbanCard
