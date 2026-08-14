import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Loader from './shared/components/Loader'
import Cursor from './shared/components/Cursor'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Projects from './pages/Projects/Projects'
import Blogs from './pages/Blog/Blogs'
import BlogPost from './pages/Blog/BlogPost'
import SampleProposal from './pages/SampleProposal/SampleProposal'
import NotFound from './pages/NotFound/NotFound'
import { ThemeProvider } from './shared/context/ThemeContext'
import { useLenis } from './shared/hooks/useLenis'
import { useCursor } from './shared/hooks/useCursor'
import { useMagneticButtons } from './shared/hooks/useMagneticButtons'
import { useAnimations } from './shared/hooks/useAnimations'

function App() {
  useLenis()
  useCursor()
  useMagneticButtons()
  useAnimations()

  return (
    <Router>
      <div className="overflow-x-hidden w-full selection:bg-white/20 selection:text-white">
        <Loader />
        <Cursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
          <Route path="/proposal" element={<SampleProposal />} />
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
