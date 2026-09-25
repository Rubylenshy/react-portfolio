import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

const MODES = ['light', 'dark', 'system']
const THEME_COLORS = { dark: '#0A0A0A', light: '#F5F5F2' }
const lightQuery = () => window.matchMedia('(prefers-color-scheme: light)')

function getInitialMode() {
  try {
    const stored = localStorage.getItem('theme')
    if (MODES.includes(stored)) return stored
  } catch {}
  return 'dark'
}

function resolveTheme(mode) {
  if (mode === 'system') return lightQuery().matches ? 'light' : 'dark'
  return mode
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode)
  const [theme, setTheme] = useState(() => resolveTheme(getInitialMode()))

  // Follow OS changes while in 'system' mode
  useEffect(() => {
    setTheme(resolveTheme(mode))
    try {
      localStorage.setItem('theme', mode)
    } catch {}
    if (mode !== 'system') return
    const mq = lightQuery()
    const onChange = () => setTheme(mq.matches ? 'light' : 'dark')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [mode])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
  }, [theme])

  // toggleTheme('light' | 'dark' | 'system'), or no argument to flip light/dark
  const toggleTheme = (value) => {
    if (MODES.includes(value)) {
      setMode(value)
    } else {
      setMode(theme === 'dark' ? 'light' : 'dark')
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
