import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext(undefined)

const THEME_STORAGE_KEY = 'portfolio-theme'
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
}

/**
 * Resolves the actual theme from system preference
 */
const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Gets the stored theme preference or defaults to 'system'
 */
const getStoredTheme = () => {
  if (typeof window === 'undefined') return THEMES.SYSTEM
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return stored && Object.values(THEMES).includes(stored) ? stored : THEMES.SYSTEM
  } catch {
    return THEMES.SYSTEM
  }
}

/**
 * Applies theme to document root
 */
const applyTheme = (theme) => {
  if (typeof document === 'undefined') return
  
  const root = document.documentElement
  const resolvedTheme = theme === THEMES.SYSTEM ? getSystemTheme() : theme
  
  // Remove all theme classes
  root.classList.remove('light', 'dark')
  
  // Add the resolved theme class
  root.classList.add(resolvedTheme)
  
  // Set data attribute for CSS selectors
  root.setAttribute('data-theme', resolvedTheme)
  
  // Prevent transition on initial load
  root.style.colorScheme = resolvedTheme
}

export const ThemeProvider = ({ children }) => {
  const [themePreference, setThemePreference] = useState(() => {
    // Initialize from storage, but don't apply yet (prevents flash)
    return getStoredTheme()
  })
  
  const [resolvedTheme, setResolvedTheme] = useState(() => {
    const pref = getStoredTheme()
    return pref === THEMES.SYSTEM ? getSystemTheme() : pref
  })

  // Apply theme on mount and when preference changes
  useEffect(() => {
    applyTheme(themePreference)
    const newResolved = themePreference === THEMES.SYSTEM ? getSystemTheme() : themePreference
    setResolvedTheme(newResolved)
  }, [themePreference])

  // Listen to system preference changes when in system mode
  useEffect(() => {
    if (themePreference !== THEMES.SYSTEM) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light'
      applyTheme(THEMES.SYSTEM)
      setResolvedTheme(newTheme)
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
    // Fallback for older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [themePreference])

  const setTheme = useCallback((newTheme) => {
    if (!Object.values(THEMES).includes(newTheme)) {
      console.warn(`Invalid theme: ${newTheme}`)
      return
    }
    
    setThemePreference(newTheme)
    
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    } catch (error) {
      console.warn('Failed to save theme preference:', error)
    }
  }, [])

  const value = {
    theme: themePreference,
    resolvedTheme,
    setTheme,
    themes: THEMES
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
