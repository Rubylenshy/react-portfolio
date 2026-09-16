import { STATUSES, DEFAULT_GROUP, statusById, priorityById, badgeStyle, formatShortDate } from './kanbanConstants'

const GENERAL_COLOR = '#9ca3af'
const statusOrder = STATUSES.reduce((acc, s, i) => ({ ...acc, [s.id]: i }), {})

const KanbanListView = ({ cards, groups, onOpen }) => {
  const sorted = [...cards].sort((a, b) => {
    const byStatus = (statusOrder[a.status] ?? 0) - (statusOrder[b.status] ?? 0)
    if (byStatus !== 0) return byStatus
    return new Date(b.updatedAt) - new Date(a.updatedAt)
  })

  if (sorted.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface)] px-8 py-16 text-center">
        <p className="text-sm text-secondary">No work items match your filters.</p>
      </div>
    )
  }

  return (
    <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] overflow-x-auto">
      <table className="w-full min-w-[640px] table-fixed text-left border-collapse">
        <colgroup>
          <col className="w-[38%]" />
          <col className="w-[18%]" />
          <col className="w-[16%]" />
          <col className="w-[14%]" />
          <col className="w-[14%]" />
        </colgroup>
        <thead>
          <tr className="border-b border-[var(--color-border)] text-[10px] font-mono uppercase tracking-[0.15em] text-muted">
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Group</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Priority</th>
            <th className="px-4 py-3 font-medium text-right">Updated</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((card) => {
            const status = statusById(card.status)
            const priority = priorityById(card.priority)
            return (
              <tr
                key={card.id}
                onClick={() => onOpen(card.id)}
                className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-surface-strong)] transition-colors cursor-pointer"
              >
                <td className="px-4 py-3 text-sm text-secondary truncate">{card.title}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      aria-hidden="true"
                      className="shrink-0 w-2 h-2 rounded-full"
                      style={{ backgroundColor: groups[card.group] || GENERAL_COLOR }}
                    />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted truncate">
                      {card.group || DEFAULT_GROUP}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="inline-flex max-w-full items-center gap-1.5 rounded-full border px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider truncate"
                    style={badgeStyle(status.color)}
                  >
                    {status.label}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="inline-flex max-w-full items-center gap-1.5 rounded-full border px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider truncate"
                    style={badgeStyle(priority.color)}
                  >
                    {priority.label}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-[10px] font-mono uppercase tracking-wider text-muted truncate">
                  {formatShortDate(card.updatedAt)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default KanbanListView
