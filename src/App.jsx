import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Loader from './shared/components/Loader'
import Cursor from './shared/components/Cursor'
import ShockwaveField from './shared/components/ShockwaveField'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Projects from './pages/Projects/Projects'
import Services from './pages/Services/Services'
import StartProject from './pages/StartProject/StartProject'
import Blogs from './pages/Blog/Blogs'
import BlogPost from './pages/Blog/BlogPost'
import SampleProposal from './pages/SampleProposal/SampleProposal'
import TaskBoard from './pages/TaskBoard/TaskBoard'
import NotFound from './pages/NotFound/NotFound'
import { ThemeProvider } from './shared/context/ThemeContext'
import { useLenis } from './shared/hooks/useLenis'
import { useCursor } from './shared/hooks/useCursor'
import { useMagneticButtons } from './shared/hooks/useMagneticButtons'
import { useAnimations } from './shared/hooks/useAnimations'

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
    <Router>
      <a href="#main" className="skip-link">Skip to content</a>
      <Backdrop />
      <div className="overflow-x-hidden w-[95%] mx-auto z-1">
        <ScrollToTop />
        <Loader />
        <Cursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/start-a-project" element={<StartProject />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
          <Route path="/proposal" element={<SampleProposal />} />
          <Route path="/protected-task-board" element={<TaskBoard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default function Root() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HelmetProvider>
  )
}
