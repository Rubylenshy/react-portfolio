import { useEffect } from 'react'
import { Trash2, X } from 'lucide-react'
import {
  STATUSES,
  PRIORITIES,
  BTN_DANGER,
  BTN_PRIMARY,
  formatShortDate,
} from './kanbanConstants'
import { TextField, TextAreaField, SelectField } from './TaskBoardFields'

const KanbanCardModal = ({ card, groups, onChange, onDelete, onClose }) => {
  useEffect(() => {
    const onEscape = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!card) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Work item detail"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[var(--color-scrim)] backdrop-blur-md" aria-hidden="true" />
      <div
        data-lenis-prevent
        className="card relative z-10 w-full max-w-xl max-h-[85vh] overflow-auto !rounded-[24px] !border-[var(--color-border-strong)] shadow-2xl modal-zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
          <p className="eyebrow"><span className="signal-dot" aria-hidden="true" />Work Item</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="icon-btn !w-9 !h-9"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <label className="block min-w-0">
            <span className="field-label">Title</span>
            <TextField
              type="text"
              value={card.title}
              onChange={(e) => onChange({ title: e.target.value })}
              autoFocus
            />
          </label>

          <label className="block min-w-0">
            <span className="field-label">Description</span>
            <TextAreaField
              value={card.description}
              onChange={(e) => onChange({ description: e.target.value })}
              rows={4}
              placeholder="Add more detail…"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="block min-w-0">
              <span className="field-label">Group</span>
              <SelectField value={card.group} onChange={(e) => onChange({ group: e.target.value })}>
                {Object.keys(groups).map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </SelectField>
            </label>

            <label className="block min-w-0">
              <span className="field-label">Status</span>
              <SelectField value={card.status} onChange={(e) => onChange({ status: e.target.value })}>
                {STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </SelectField>
            </label>

            <label className="block min-w-0">
              <span className="field-label">Priority</span>
              <SelectField value={card.priority} onChange={(e) => onChange({ priority: e.target.value })}>
                {PRIORITIES.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </SelectField>
            </label>
          </div>

          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-eyebrow text-muted pt-4 border-t border-[var(--color-border)]">
            <span>Created {formatShortDate(card.createdAt)}</span>
            <span>Updated {formatShortDate(card.updatedAt)}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button type="button" onClick={() => onDelete(card.id)} className={`inline-flex items-center gap-2 ${BTN_DANGER}`}>
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" /> Delete
            </button>
            <button type="button" onClick={onClose} className={BTN_PRIMARY}>Done</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KanbanCardModal
