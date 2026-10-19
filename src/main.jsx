import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
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
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App prerenderData={readPrerenderData()} />
  </React.StrictMode>,
)
