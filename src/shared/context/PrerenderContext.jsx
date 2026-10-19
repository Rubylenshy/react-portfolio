import { createContext, useContext } from 'react'

// Data the build-time prerender bakes into a page (scripts/prerender.mjs), e.g. blog
// markdown keyed by slug, so the first render matches the static HTML without a fetch.
// Empty in dev and on routes that weren't prerendered.
const PrerenderContext = createContext({})

export function PrerenderProvider({ data = {}, children }) {
  return <PrerenderContext.Provider value={data}>{children}</PrerenderContext.Provider>
}

export function usePrerenderData() {
  return useContext(PrerenderContext)
}
