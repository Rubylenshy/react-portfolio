import { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, matchPath } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Loader from './shared/components/Loader'
import Cursor from './shared/components/Cursor'
import ShockwaveField from './shared/components/ShockwaveField'
import NotFound from './pages/NotFound/NotFound'
import { lazyPage } from './shared/lib/lazyPage'
import { ThemeProvider } from './shared/context/ThemeContext'
import { PrerenderProvider } from './shared/context/PrerenderContext'
import { useLenis } from './shared/hooks/useLenis'
import { useCursor } from './shared/hooks/useCursor'
import { useMagneticButtons } from './shared/hooks/useMagneticButtons'
import { useAnimations } from './shared/hooks/useAnimations'

// Each page is its own chunk; see lazyPage for how preloading keeps prerendered HTML on screen
const ROUTES = [
  { path: '/', Page: lazyPage(() => import('./pages/Home/Home')) },
  { path: '/about', Page: lazyPage(() => import('./pages/About/About')) },
  { path: '/projects', Page: lazyPage(() => import('./pages/Projects/Projects')) },
  { path: '/services', Page: lazyPage(() => import('./pages/Services/Services')) },
  { path: '/start-a-project', Page: lazyPage(() => import('./pages/StartProject/StartProject')) },
  { path: '/blogs', Page: lazyPage(() => import('./pages/Blog/Blogs')) },
  { path: '/blogs/:slug', Page: lazyPage(() => import('./pages/Blog/BlogPost')) },
  { path: '/proposal', Page: lazyPage(() => import('./pages/SampleProposal/SampleProposal')) },
  { path: '/protected-task-board', Page: lazyPage(() => import('./pages/TaskBoard/TaskBoard')) },
]

// Resolves the chunk for `pathname` (no-op for NotFound, which is bundled eagerly)
export function preloadRoute(pathname) {
  const route = ROUTES.find(({ path }) => matchPath(path, pathname))
  return route ? route.Page.preload() : Promise.resolve()
}

export function preloadAllRoutes() {
  return Promise.all(ROUTES.map(({ Page }) => Page.preload()))
}

// Routes with their own scoped palette skip the shockwave/grain backdrop
const PLAIN_BACKDROP_ROUTES = ['/proposal']

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}

function Backdrop() {
  const { pathname } = useLocation()
  if (PLAIN_BACKDROP_ROUTES.includes(pathname)) return null
  return (
    <>
      <ShockwaveField pitch={5} noiseAmp={0.25} />
      <div className="grain" aria-hidden="true" />
    </>
  )
}

function App() {
  useLenis()
  useCursor()
  useMagneticButtons()
  useAnimations()

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Backdrop />
      <div className="relative z-[2] overflow-x-hidden w-[95%] mx-auto bg-[var(--color-bg)] transition-colors duration-300">
        <ScrollToTop />
        <Loader />
        <Cursor />
        <Suspense fallback={null}>
          <Routes>
            {ROUTES.map(({ path, Page }) => (
              <Route key={path} path={path} element={<Page />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  )
}

export default function Root({ router: Router = BrowserRouter, location, helmetContext, prerenderData }) {
  return (
    <HelmetProvider context={helmetContext}>
      <PrerenderProvider data={prerenderData}>
        <ThemeProvider>
          <Router location={location}>
            <App />
          </Router>
        </ThemeProvider>
      </PrerenderProvider>
    </HelmetProvider>
  )
}
