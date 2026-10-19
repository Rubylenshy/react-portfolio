// Build-time entry for scripts/prerender.mjs: renders one route to an HTML string.
// Effects don't run here, so browser-only code in useEffect is fine; render bodies must not
// touch window/document.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import Root from './App.jsx'

export function render(url, prerenderData = {}) {
  const helmetContext = {}
  const html = renderToString(
    <Root router={StaticRouter} location={url} helmetContext={helmetContext} prerenderData={prerenderData} />,
  )
  const { helmet } = helmetContext
  const head = [helmet.title, helmet.meta, helmet.link, helmet.script]
    .map((part) => part.toString())
    .filter(Boolean)
    .join('\n    ')
  return { html, head }
}
