import { lazy, useState } from 'react'

/**
 * lazyPage — React.lazy for route components, plus a `preload()` that resolves the module
 * ahead of render. A page that's been preloaded renders synchronously (no Suspense fallback),
 * which matters twice: main.jsx preloads the current route before createRoot so the
 * prerendered HTML isn't swapped for an empty fallback, and the build-time prerender preloads
 * every page because renderToString can't wait for lazy components.
 */
export function lazyPage(load) {
  let Loaded = null
  let pending = null

  const preload = () => {
    pending ??= load().then((module) => {
      Loaded = module.default
      return module
    })
    return pending
  }

  const Lazy = lazy(preload)

  // Pick the implementation once per mount so a later preload can't swap the component type
  // (which would remount the page and drop its state).
  const Page = (props) => {
    const [Component] = useState(() => Loaded ?? Lazy)
    return <Component {...props} />
  }
  Page.preload = preload
  return Page
}
