import { useEffect, useMemo, useState } from 'react'
import { LayoutGrid, List as ListIcon, Search, Sparkles } from 'lucide-react'
import { useLocalStorageState } from '../../shared/hooks/useLocalStorageState'
import {
  DEFAULT_GROUP,
  DEFAULT_PRIORITY,
  BTN_SECONDARY,
  nextGroupColor,
} from './kanbanConstants'
import { getDailyRemark } from './kanbanQuotes'
import { TextField } from './TaskBoardFields'
import KanbanBoardView from './KanbanBoardView'
import KanbanListView from './KanbanListView'
import KanbanCardModal from './KanbanCardModal'

const GENERAL_COLOR = '#9ca3af'

const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

const Kanban = () => {
  const [groups, setGroups] = useLocalStorageState('taskboard:kanban:groups', () => ({
    [DEFAULT_GROUP]: GENERAL_COLOR,
  }))
  const [cards, setCards] = useLocalStorageState('taskboard:kanban:cards', () => [])
  const [view, setView] = useLocalStorageState('taskboard:kanban:view', () => 'board')

  const [search, setSearch] = useState('')
  const [selectedGroups, setSelectedGroups] = useState([])
  const [newGroupName, setNewGroupName] = useState('')
  const [selectedCardId, setSelectedCardId] = useState(null)
  const [, forceTick] = useState(0)

  // Keep the daily remark fresh if the tab is left open across the 5pm boundary.
  useEffect(() => {
    const interval = setInterval(() => forceTick((n) => n + 1), 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const addGroup = (name) => {
    const trimmed = name.trim()
    if (!trimmed || groups[trimmed]) return
    setGroups((prev) => ({ ...prev, [trimmed]: nextGroupColor(prev) }))
  }

  const handleAddGroup = (e) => {
    e.preventDefault()
    addGroup(newGroupName)
    setNewGroupName('')
  }

  const toggleGroupFilter = (name) => {
    setSelectedGroups((prev) =>
      prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name]
    )
  }

  const addCard = (status, title) => {
    const now = new Date().toISOString()
    const group = selectedGroups.length === 1 ? selectedGroups[0] : DEFAULT_GROUP
    const card = {
      id: genId(),
      title,
      description: '',
      group,
      status,
      priority: DEFAULT_PRIORITY,
      createdAt: now,
      updatedAt: now,
      doneAt: status === 'done' ? now : null,
    }
    setCards((prev) => [...prev, card])
  }

  const patchCard = (id, patch) => {
    setCards((prev) =>
      prev.map((card) => {
        if (card.id !== id) return card
        const now = new Date().toISOString()
        const next = { ...card, ...patch, updatedAt: now }
        if (patch.status) {
          next.doneAt = patch.status === 'done' ? now : null
        }
        return next
      })
    )
  }

  const moveCard = (id, status) => patchCard(id, { status })
  const deleteCard = (id) => {
    setCards((prev) => prev.filter((c) => c.id !== id))
    setSelectedCardId((current) => (current === id ? null : current))
  }

  const filteredCards = useMemo(() => {
    const query = search.trim().toLowerCase()
    return cards.filter((card) => {
      if (selectedGroups.length > 0 && !selectedGroups.includes(card.group)) return false
      if (!query) return true
      return (
        card.title.toLowerCase().includes(query) ||
        card.description.toLowerCase().includes(query)
      )
    })
  }, [cards, search, selectedGroups])

  const remark = useMemo(() => getDailyRemark(cards), [cards])
  const selectedCard = cards.find((c) => c.id === selectedCardId) ?? null
  const hasFilters = search.trim() !== '' || selectedGroups.length > 0

  return (
    <div className="min-w-0">
      {/* Daily remark */}
      <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3.5 mb-6 flex items-start gap-3">
        <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-[var(--color-accent-tint)]" />
        <p className="min-w-0 text-sm text-secondary break-words">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mr-2">
            {remark.label}
          </span>
          {remark.message}
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-0 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <TextField
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search work items…"
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
          {Object.keys(groups).map((name) => {
            const active = selectedGroups.includes(name)
            return (
              <button
                key={name}
                type="button"
                onClick={() => toggleGroupFilter(name)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                  active
                    ? 'border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] text-primary'
                    : 'border-[var(--color-border)] text-muted hover:text-primary'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: groups[name] }}
                />
                <span className="truncate max-w-[8rem]">{name}</span>
              </button>
            )
          })}
          <form onSubmit={handleAddGroup} className="flex gap-2 shrink-0">
            <TextField
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="New group…"
              className="!w-32"
            />
            <button type="submit" className={`shrink-0 ${BTN_SECONDARY}`}>Add</button>
          </form>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setSelectedGroups([])
              }}
              className="shrink-0 text-[10px] font-mono uppercase tracking-wider text-muted hover:text-primary transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="inline-flex shrink-0 gap-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-1.5 backdrop-blur-md self-start">
          <button
            type="button"
            onClick={() => setView('board')}
            aria-label="Board view"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              view === 'board'
                ? 'bg-[var(--color-accent)] text-[var(--color-accent-inverse)]'
                : 'text-muted hover:text-primary'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setView('list')}
            aria-label="List view"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              view === 'list'
                ? 'bg-[var(--color-accent)] text-[var(--color-accent-inverse)]'
                : 'text-muted hover:text-primary'
            }`}
          >
            <ListIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {view === 'board' ? (
        <KanbanBoardView
          cards={filteredCards}
          groups={groups}
          onOpen={setSelectedCardId}
          onMove={moveCard}
          onDelete={deleteCard}
          onAddCard={addCard}
        />
      ) : (
        <KanbanListView cards={filteredCards} groups={groups} onOpen={setSelectedCardId} />
      )}

      {selectedCard && (
        <KanbanCardModal
          card={selectedCard}
          groups={groups}
          onChange={(patch) => patchCard(selectedCard.id, patch)}
          onDelete={(id) => deleteCard(id)}
          onClose={() => setSelectedCardId(null)}
        />
      )}
    </div>
  )
}

export default Kanban
