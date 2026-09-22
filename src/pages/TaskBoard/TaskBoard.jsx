import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Navigation from '../../shared/components/Navigation'
import Footer from '../../shared/components/Footer'
import Eyebrow from '../../shared/components/Eyebrow'
import SEOHead from '../../shared/components/SEOHead'
import { useLocalStorageState } from '../../shared/hooks/useLocalStorageState'
import { BTN_SECONDARY } from './kanbanConstants'
import { TextField, SelectField } from './TaskBoardFields'
import Kanban from './Kanban'

const SESSION_UNLOCK_KEY = 'taskboard_unlocked'
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000
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

const isSessionValid = () => {
  if (typeof window === 'undefined') return false
  const unlockedAt = Number(window.localStorage.getItem(SESSION_UNLOCK_KEY))
  return Number.isFinite(unlockedAt) && unlockedAt > 0 && Date.now() - unlockedAt < SESSION_DURATION_MS
}

const clearSession = () => {
  window.localStorage.removeItem(SESSION_UNLOCK_KEY)
}

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
        window.localStorage.setItem(SESSION_UNLOCK_KEY, String(Date.now()))
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
    <main id="main" className="min-h-screen text-primary flex items-center justify-center px-4 md:px-6 py-20">
      <div className="w-full max-w-md">
        <p className="eyebrow w-full justify-center mb-6">
          <span className="signal-dot signal-dot-pulse" aria-hidden="true" />
          Protected
        </p>
        <h1 className="text-center font-semibold tracking-display leading-[0.92] text-6xl md:text-7xl mb-10">
          <span className="block text-primary">Task</span>
          <span className="block display-ghost">Board</span>
        </h1>
        <form onSubmit={handleSubmit} className="card p-7 md:p-8">
          <label htmlFor="taskboard-password" className="field-label">
            Password
          </label>
          <input
            id="taskboard-password"
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? 'taskboard-password-error' : undefined}
            className="field"
          />
          {error && (
            <p id="taskboard-password-error" className="field-error" role="alert">{error}</p>
          )}
          <button
            type="submit"
            disabled={checking}
            className="pill pill-signal mt-8 w-full"
          >
            {checking ? 'Checking…' : 'Unlock'}
          </button>
        </form>
        <p className="mt-5 font-mono text-[11px] text-muted text-center leading-relaxed">
          This is a soft deterrent, not real security — everything here still
          ships in the client bundle.
        </p>
      </div>
    </main>
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
      {QUADRANTS.map((quadrant, qi) => (
        <section
          key={quadrant.id}
          aria-labelledby={`quadrant-${quadrant.id}`}
          className="card min-w-0 p-5 md:p-6 flex flex-col"
        >
          <div className="flex items-start justify-between gap-3 mb-5">
            <div className="min-w-0">
              <Eyebrow num={`0${qi + 1}`} label={quadrant.hint} />
              <h3 id={`quadrant-${quadrant.id}`} className="mt-2 text-xl font-semibold tracking-tight text-primary">
                {quadrant.label}
              </h3>
            </div>
            <span className="shrink-0 font-mono text-[11px] text-muted">{day[quadrant.id].length}</span>
          </div>

          <ul className="space-y-2 mb-5 min-h-[1.5rem] flex-1">
            {day[quadrant.id].length === 0 && (
              <li className="font-mono text-[11px] uppercase tracking-eyebrow text-muted">No tasks yet.</li>
            )}
            {day[quadrant.id].map((task) => (
              <li
                key={task.id}
                className="min-w-0 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-3"
              >
                <div className="flex items-start gap-2 min-w-0">
                  <input
                    type="checkbox"
                    checked={!!task.done}
                    onChange={() => toggleDone(quadrant.id, task.id, task._category)}
                    aria-label={task.done ? 'Mark task not done' : 'Mark task done'}
                    className="shrink-0 mt-0.5 w-4 h-4 accent-[var(--color-signal-text)] cursor-pointer"
                  />
                  <span
                    aria-hidden="true"
                    title={task._category}
                    className="shrink-0 mt-1.5 w-2 h-2 rounded-full"
                    style={{ backgroundColor: categoryColors?.[task._category] || GENERAL_COLOR }}
                  />
                  <span
                    className={`flex-1 min-w-0 text-sm break-words ${
                      task.done ? 'text-muted line-through' : 'text-secondary'
                    }`}
                  >
                    {task.text}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteTask(quadrant.id, task.id, task._category)}
                    aria-label="Delete task"
                    className="shrink-0 rounded-full w-7 h-7 flex items-center justify-center border border-[var(--color-border-strong)] text-muted hover:text-primary hover:border-[var(--color-text-muted)] transition-colors"
                  >
                    ×
                  </button>
                </div>
                <div className="flex justify-end mt-2">
                  <select
                    aria-label="Move to quadrant"
                    value={quadrant.id}
                    onChange={(e) => moveTask(quadrant.id, task.id, e.target.value, task._category)}
                    className="max-w-full font-mono text-[11px] uppercase tracking-wider bg-[var(--color-surface)] border border-[var(--color-border-strong)] rounded-full px-3 py-1 text-muted hover:text-primary cursor-pointer"
                  >
                    {QUADRANTS.map((q) => (
                      <option key={q.id} value={q.id}>
                        {q.label}
                      </option>
                    ))}
                  </select>
                </div>
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
            <TextField
              type="text"
              value={draft[quadrant.id]}
              onChange={(e) => setDraft((prev) => ({ ...prev, [quadrant.id]: e.target.value }))}
              placeholder="Add a task…"
              className="flex-1 min-w-0"
            />
            <button type="submit" className={`shrink-0 ${BTN_SECONDARY}`}>
              Add
            </button>
          </form>
        </section>
      ))}
    </div>
  )
}

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
        id="main"
        className="min-h-screen text-primary px-4 md:px-10 pt-32 pb-20 md:pt-44 md:pb-28 max-w-[1400px] mx-auto grid-frame"
      >
        <div className="w-full">
          <div className="flex items-end justify-between mb-12 md:mb-16 flex-wrap gap-6">
            <div>
              <p className="eyebrow">
                <span className="signal-dot signal-dot-pulse" aria-hidden="true" />
                Protected
              </p>
              <h1 className="mt-6 font-semibold tracking-display leading-[0.9] text-[clamp(52px,9vw,128px)]">
                Task Board
              </h1>
            </div>

            {/* Tabs */}
            <div className="inline-flex flex-wrap gap-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] p-1" role="tablist" aria-label="Board type">
              {[
                { id: 'matrix', label: 'Eisenhower Matrix' },
                { id: 'kanban', label: 'Kanban Board' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pill pill-sm ${
                    activeTab === tab.id ? 'pill-active' : 'text-muted hover:text-primary'
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
              <div className="card p-5 md:p-6 flex flex-col md:flex-row md:items-end gap-5 mb-4 min-w-0">
                <div className="shrink-0">
                  <label className="block font-mono text-[11px] uppercase tracking-eyebrow text-muted mb-2">
                    Date
                  </label>
                  <TextField
                    type="date"
                    value={date}
                    onChange={(e) => selectDate(e.target.value)}
                    tone="surface"
                    className="!w-auto"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <label className="block font-mono text-[11px] uppercase tracking-eyebrow text-muted mb-2">
                    Category
                  </label>
                  <div className="flex flex-wrap items-center gap-2 min-w-0">
                    <span
                      aria-hidden="true"
                      className="shrink-0 w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: categoryColors[category] || GENERAL_COLOR }}
                    />
                    <SelectField
                      value={category}
                      onChange={(e) => selectCategory(e.target.value)}
                      className="w-auto min-w-[10rem]"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </SelectField>
                    <form onSubmit={addCategory} className="flex gap-2 shrink-0">
                      <TextField
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New category…"
                        className="!w-40"
                      />
                      <button type="submit" className={`shrink-0 ${BTN_SECONDARY}`}>
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

          {activeTab === 'kanban' && <Kanban />}
        </div>
      </main>

      <Footer />
    </>
  )
}

/* ── Route entry: gate wraps content ───────────────────────────── */

const TaskBoard = () => {
  const [unlocked, setUnlocked] = useState(() => {
    if (isSessionValid()) return true
    clearSession()
    return false
  })

  useEffect(() => {
    if (!unlocked) return undefined

    const checkExpiry = () => {
      if (!isSessionValid()) {
        clearSession()
        setUnlocked(false)
      }
    }

    const interval = setInterval(checkExpiry, 60 * 1000)
    document.addEventListener('visibilitychange', checkExpiry)
    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', checkExpiry)
    }
  }, [unlocked])

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />
  }

  return <TaskBoardContent />
}

export default TaskBoard
