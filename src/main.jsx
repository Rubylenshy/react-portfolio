import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { preloadRoute, preloadAllRoutes } from './App.jsx'
import './shared/css/index.css'

// Prerendered pages embed the data their first render used (see scripts/prerender.mjs)
function readPrerenderData() {
  try {
    return JSON.parse(document.getElementById('__PRERENDER_DATA__')?.textContent || '{}')
  } catch {
    return {}
  }
}

// createRoot (not hydrateRoot) replaces the static HTML on first render. The prerendered
// markup is for crawlers and first paint; theme and motion settings only exist client-side.
// The current page's chunk loads first so that render is synchronous (no blank fallback);
// the rest are fetched when the browser is idle so later navigation doesn't wait.
const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 2000))

preloadRoute(window.location.pathname)
  .catch(() => {})
  .then(() => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App prerenderData={readPrerenderData()} />
      </React.StrictMode>,
    )
    idle(() => preloadAllRoutes().catch(() => {}))
  })
