import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Navigation from '../../shared/components/Navigation'
import Footer from '../../shared/components/Footer'
import SEOHead from '../../shared/components/SEOHead'
import { useLocalStorageState } from '../../shared/hooks/useLocalStorageState'

const SESSION_UNLOCK_KEY = 'taskboard_unlocked'
const DATA_KEY = 'taskboard:eisenhower'
const SELECTION_KEY = 'taskboard:selection'
const DEFAULT_CATEGORY = 'General'

const QUADRANTS = [
  {
    id: 'q1',
    label: 'Urgent & Important',
    hint: 'Do first',
  },
  {
    id: 'q2',
    label: 'Important, Not Urgent',
    hint: 'Schedule',
  },
  {
    id: 'q3',
    label: 'Urgent, Not Important',
    hint: 'Delegate',
  },
  {
    id: 'q4',
    label: 'Neither',
    hint: 'Eliminate',
  },
]

const EMPTY_DAY = { q1: [], q2: [], q3: [], q4: [] }

const GENERAL_COLOR = '#9ca3af'
const CATEGORY_PALETTE = [
  '#f87171', '#fb923c', '#facc15', '#4ade80',
  '#22d3ee', '#818cf8', '#f472b6', '#c084fc',
]

const nextCategoryColor = (prevColors) => {
  const assigned = Object.keys(prevColors).filter((c) => c !== DEFAULT_CATEGORY).length
  return CATEGORY_PALETTE[assigned % CATEGORY_PALETTE.length]
}

const todayISO = () => new Date().toISOString().slice(0, 10)

const hashHex = async (text) => {
  const encoded = new TextEncoder().encode(text)
  const digest = await window.crypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/* ── Password gate ─────────────────────────────────────────────── */

const PasswordGate = ({ onUnlock }) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)

  const expectedHash = import.meta.env.VITE_TASKBOARD_PASSWORD_HASH

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!expectedHash) {
      setError('No password configured.')
      return
    }

    setChecking(true)
    try {
      const enteredHash = await hashHex(password)
      if (enteredHash.toLowerCase() === expectedHash.toLowerCase()) {
        window.sessionStorage.setItem(SESSION_UNLOCK_KEY, '1')
        onUnlock()
      } else {
        setError('Incorrect password.')
      }
    } catch (err) {
      console.error(err)
      setError('Could not verify password in this browser.')
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-primary flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted mb-3 text-center">
          Protected
        </p>
        <h1 className="text-xl font-mono uppercase tracking-widest text-center mb-8">
          Task Board
        </h1>
        <form
          onSubmit={handleSubmit}
          className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-6 backdrop-blur-md"
        >
          <label
            htmlFor="taskboard-password"
            className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-2"
          >
            Password
          </label>
          <input
            id="taskboard-password"
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-primary outline-none focus:border-[var(--color-border-strong)] transition-colors"
            placeholder="••••••••"
          />
          {error && (
            <p className="mt-3 text-xs text-red-400 font-mono">{error}</p>
          )}
          <button
            type="submit"
            disabled={checking}
            className="mt-5 w-full rounded-full bg-[var(--color-accent)] text-[var(--color-accent-inverse)] py-2.5 text-[11px] font-mono uppercase tracking-widest transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {checking ? 'Checking…' : 'Unlock'}
          </button>
        </form>
        <p className="mt-4 text-[10px] font-mono text-muted text-center leading-relaxed">
          This is a soft deterrent, not real security — everything here still
          ships in the client bundle.
        </p>
      </div>
    </div>
  )
}

/* ── Eisenhower matrix ─────────────────────────────────────────── */

const EisenhowerMatrix = ({ data, setData, category, date, categoryColors }) => {
  const [draft, setDraft] = useState({ q1: '', q2: '', q3: '', q4: '' })

  const isAggregate = category === DEFAULT_CATEGORY

  const day = useMemo(() => {
    if (!isAggregate) {
      const own = data?.[category]?.[date] ?? EMPTY_DAY
      return {
        q1: own.q1.map((t) => ({ ...t, _category: category })),
        q2: own.q2.map((t) => ({ ...t, _category: category })),
        q3: own.q3.map((t) => ({ ...t, _category: category })),
        q4: own.q4.map((t) => ({ ...t, _category: category })),
      }
    }
    const merged = { q1: [], q2: [], q3: [], q4: [] }
    Object.keys(data).forEach((cat) => {
      const catDay = data[cat]?.[date]
      if (!catDay) return
      QUADRANTS.forEach((q) => {
        catDay[q.id].forEach((task) => merged[q.id].push({ ...task, _category: cat }))
      })
    })
    return merged
  }, [data, category, date, isAggregate])

  const updateDay = (targetCategory, updater) => {
    setData((prev) => {
      const prevCategory = prev[targetCategory] ?? {}
      const prevDay = prevCategory[date] ?? EMPTY_DAY
      const nextDay = updater(prevDay)
      return {
        ...prev,
        [targetCategory]: {
          ...prevCategory,
          [date]: nextDay,
        },
      }
    })
  }

  const addTask = (quadrantId) => {
    const text = draft[quadrantId].trim()
    if (!text) return
    const task = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, text, done: false }
    updateDay(category, (prevDay) => ({ ...prevDay, [quadrantId]: [...prevDay[quadrantId], task] }))
    setDraft((prev) => ({ ...prev, [quadrantId]: '' }))
  }

  const deleteTask = (quadrantId, taskId, taskCategory) => {
    updateDay(taskCategory, (prevDay) => ({
      ...prevDay,
      [quadrantId]: prevDay[quadrantId].filter((t) => t.id !== taskId),
    }))
  }

  const toggleDone = (quadrantId, taskId, taskCategory) => {
    updateDay(taskCategory, (prevDay) => ({
      ...prevDay,
      [quadrantId]: prevDay[quadrantId].map((t) =>
        t.id === taskId ? { ...t, done: !t.done } : t
      ),
    }))
  }

  const moveTask = (fromQuadrantId, taskId, toQuadrantId, taskCategory) => {
    if (fromQuadrantId === toQuadrantId) return
    updateDay(taskCategory, (prevDay) => {
      const task = prevDay[fromQuadrantId].find((t) => t.id === taskId)
      if (!task) return prevDay
      return {
        ...prevDay,
        [fromQuadrantId]: prevDay[fromQuadrantId].filter((t) => t.id !== taskId),
        [toQuadrantId]: [...prevDay[toQuadrantId], task],
      }
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {QUADRANTS.map((quadrant) => (
        <div
          key={quadrant.id}
          className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
        >
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-primary">
              {quadrant.label}
            </h3>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
              {quadrant.hint}
            </span>
          </div>

          <ul className="space-y-2 mb-4 min-h-[1.5rem]">
            {day[quadrant.id].length === 0 && (
              <li className="text-xs text-muted font-mono">No tasks yet.</li>
            )}
            {day[quadrant.id].map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-2 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2"
              >
                <input
                  type="checkbox"
                  checked={!!task.done}
                  onChange={() => toggleDone(quadrant.id, task.id, task._category)}
                  aria-label={task.done ? 'Mark task not done' : 'Mark task done'}
                  className="shrink-0 w-4 h-4 accent-[var(--color-accent)] cursor-pointer"
                />
                <span
                  aria-hidden="true"
                  title={task._category}
                  className="shrink-0 w-2 h-2 rounded-full"
                  style={{ backgroundColor: categoryColors?.[task._category] || GENERAL_COLOR }}
                />
                <span
                  className={`flex-1 text-sm break-words ${
                    task.done ? 'text-muted line-through' : 'text-secondary'
                  }`}
                >
                  {task.text}
                </span>
                <select
                  aria-label="Move to quadrant"
                  value={quadrant.id}
                  onChange={(e) => moveTask(quadrant.id, task.id, e.target.value, task._category)}
                  className="text-[10px] font-mono uppercase tracking-wider bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-2 py-1 text-muted focus:outline-none"
                >
                  {QUADRANTS.map((q) => (
                    <option key={q.id} value={q.id}>
                      {q.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => deleteTask(quadrant.id, task.id, task._category)}
                  aria-label="Delete task"
                  className="shrink-0 rounded-full w-6 h-6 flex items-center justify-center border border-[var(--color-border)] text-muted hover:text-primary hover:border-[var(--color-border-strong)] transition-colors"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              addTask(quadrant.id)
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={draft[quadrant.id]}
              onChange={(e) => setDraft((prev) => ({ ...prev, [quadrant.id]: e.target.value }))}
              placeholder="Add a task…"
              className="flex-1 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-primary outline-none focus:border-[var(--color-border-strong)] transition-colors"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-inverse)] px-4 text-[11px] font-mono uppercase tracking-widest transition-opacity hover:opacity-90"
            >
              Add
            </button>
          </form>
        </div>
      ))}
    </div>
  )
}

/* ── Kanban placeholder ────────────────────────────────────────── */

const KanbanPlaceholder = () => (
  <div className="rounded-sm border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface)] px-8 py-20 text-center">
    <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted mb-3">
      Coming Soon
    </p>
    <h3 className="text-lg font-mono uppercase tracking-widest text-primary mb-2">
      Kanban Board
    </h3>
    <p className="text-sm text-secondary max-w-md mx-auto">
      An Azure Boards–style backlog / in-progress / done board is planned for
      this space — swimlanes, work item types, and all.
    </p>
  </div>
)

/* ── Page content (post-unlock) ────────────────────────────────── */

const TaskBoardContent = () => {
  const [data, setData] = useLocalStorageState(DATA_KEY, () => ({
    [DEFAULT_CATEGORY]: { [todayISO()]: EMPTY_DAY },
  }))
  const [selection, setSelection] = useLocalStorageState(SELECTION_KEY, () => ({
    category: DEFAULT_CATEGORY,
    date: todayISO(),
  }))
  const [categoryColors, setCategoryColors] = useLocalStorageState('taskboard:categoryColors', () => ({
    [DEFAULT_CATEGORY]: GENERAL_COLOR,
  }))
  const [activeTab, setActiveTab] = useState('matrix')
  const [newCategory, setNewCategory] = useState('')

  const categories = useMemo(() => {
    const known = Object.keys(data)
    return known.length > 0 ? known : [DEFAULT_CATEGORY]
  }, [data])

  const category = categories.includes(selection.category) ? selection.category : categories[0]
  const date = selection.date || todayISO()

  const selectCategory = (nextCategory) => {
    setSelection((prev) => ({ ...prev, category: nextCategory }))
    setData((prev) => (prev[nextCategory] ? prev : { ...prev, [nextCategory]: {} }))
  }

  const selectDate = (nextDate) => {
    setSelection((prev) => ({ ...prev, date: nextDate }))
    setData((prev) => {
      const prevCategory = prev[category] ?? {}
      if (prevCategory[nextDate]) return prev
      return { ...prev, [category]: { ...prevCategory, [nextDate]: EMPTY_DAY } }
    })
  }

  const addCategory = (e) => {
    e.preventDefault()
    const name = newCategory.trim()
    if (!name) return
    setData((prev) => (prev[name] ? prev : { ...prev, [name]: { [date]: EMPTY_DAY } }))
    setCategoryColors((prev) => (prev[name] ? prev : { ...prev, [name]: nextCategoryColor(prev) }))
    setSelection({ category: name, date })
    setNewCategory('')
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <SEOHead
        title="Task Board"
        description="Private task board — Eisenhower matrix and Kanban board."
      />
      <Navigation />

      <main
        className="min-h-screen bg-[var(--color-bg)] text-primary px-6 pt-28 pb-20 md:pt-32 md:pb-24 max-w-[1400px] mx-auto"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <h1 className="text-xl font-mono uppercase tracking-widest">Task Board</h1>

            {/* Tabs */}
            <div className="inline-flex flex-wrap gap-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-1.5 backdrop-blur-md">
              {[
                { id: 'matrix', label: 'Eisenhower Matrix' },
                { id: 'kanban', label: 'Kanban Board' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[var(--color-accent)] text-[var(--color-accent-inverse)]'
                      : 'text-muted hover:text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'matrix' && (
            <>
              {/* Date + category controls */}
              <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => selectDate(e.target.value)}
                    className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-primary outline-none focus:border-[var(--color-border-strong)] transition-colors"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-2">
                    Category
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="shrink-0 w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: categoryColors[category] || GENERAL_COLOR }}
                    />
                    <select
                      value={category}
                      onChange={(e) => selectCategory(e.target.value)}
                      className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-primary outline-none focus:border-[var(--color-border-strong)] transition-colors"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <form onSubmit={addCategory} className="flex gap-2">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New category…"
                        className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-primary outline-none focus:border-[var(--color-border-strong)] transition-colors w-40"
                      />
                      <button
                        type="submit"
                        className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-[11px] font-mono uppercase tracking-widest text-primary hover:border-[var(--color-border-strong)] transition-colors"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <EisenhowerMatrix
                data={data}
                setData={setData}
                category={category}
                date={date}
                categoryColors={categoryColors}
              />
            </>
          )}

          {activeTab === 'kanban' && <KanbanPlaceholder />}
        </div>
      </main>

      <Footer />
    </>
  )
}

/* ── Route entry: gate wraps content ───────────────────────────── */

const TaskBoard = () => {
  const [unlocked, setUnlocked] = useState(
    () => typeof window !== 'undefined' && window.sessionStorage.getItem(SESSION_UNLOCK_KEY) === '1'
  )

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />
  }

  return <TaskBoardContent />
}

export default TaskBoard
