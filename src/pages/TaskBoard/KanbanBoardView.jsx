import { useState } from 'react'
import { STATUSES, BTN_SECONDARY } from './kanbanConstants'
import { TextField } from './TaskBoardFields'
import KanbanCard from './KanbanCard'

const COLUMN_WIDTH = 'w-[300px] sm:w-[320px]'

const KanbanBoardView = ({ cards, groups, onOpen, onMove, onDelete, onAddCard }) => {
  const [drafts, setDrafts] = useState({ backlog: '', queue: '', inprogress: '', done: '' })

  const submitDraft = (statusId) => {
    const text = drafts[statusId].trim()
    if (!text) return
    onAddCard(statusId, text)
    setDrafts((prev) => ({ ...prev, [statusId]: '' }))
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1">
      {STATUSES.map((status) => {
        const columnCards = cards.filter((c) => c.status === status.id)
        return (
          <div
            key={status.id}
            className={`shrink-0 ${COLUMN_WIDTH} rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-4 flex flex-col`}
          >
            <div className="flex items-baseline justify-between gap-2 mb-4 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  aria-hidden="true"
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: status.color }}
                />
                <h3 className="text-xs font-mono uppercase tracking-widest text-primary truncate">
                  {status.label}
                </h3>
                <span className="text-[10px] font-mono text-muted shrink-0">{columnCards.length}</span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted shrink-0">
                {status.hint}
              </span>
            </div>

            <ul className="space-y-2 mb-4 min-h-[1.5rem] flex-1 max-h-[60vh] overflow-y-auto pr-0.5">
              {columnCards.length === 0 && (
                <li className="text-xs text-muted font-mono">No items.</li>
              )}
              {columnCards.map((card) => (
                <KanbanCard
                  key={card.id}
                  card={card}
                  groupColor={groups[card.group]}
                  onOpen={onOpen}
                  onMove={onMove}
                  onDelete={onDelete}
                />
              ))}
            </ul>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                submitDraft(status.id)
              }}
              className="flex gap-2"
            >
              <TextField
                type="text"
                value={drafts[status.id]}
                onChange={(e) => setDrafts((prev) => ({ ...prev, [status.id]: e.target.value }))}
                placeholder="Add a work item…"
                className="flex-1 min-w-0"
              />
              <button type="submit" className={`shrink-0 ${BTN_SECONDARY}`}>Add</button>
            </form>
          </div>
        )
      })}
    </div>
  )
}

export default KanbanBoardView
