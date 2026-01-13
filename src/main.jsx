import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/css/index.css'

// Apply theme before React hydration to prevent flash
(function applyInitialTheme() {
  const THEME_STORAGE_KEY = 'portfolio-theme'
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system'
  }

  const getStoredTheme = () => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY)
      return stored && Object.values(THEMES).includes(stored) ? stored : THEMES.SYSTEM
    } catch {
      return THEMES.SYSTEM
    }
  }

  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const themePreference = getStoredTheme()
  const resolvedTheme = themePreference === THEMES.SYSTEM ? getSystemTheme() : themePreference
  
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(resolvedTheme)
  root.setAttribute('data-theme', resolvedTheme)
  root.style.colorScheme = resolvedTheme

  // Enable transitions after initial load
  requestAnimationFrame(() => {
    root.classList.add('theme-transition-ready')
  })
})()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

