import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Blogs from './pages/Blogs'
import { useLenis } from './hooks/useLenis'
import { useCursor } from './hooks/useCursor'
import { useMagneticButtons } from './hooks/useMagneticButtons'
import { useAnimations } from './hooks/useAnimations'

function App() {
  useLenis()
  useCursor()
  useMagneticButtons()
  useAnimations()

  return (
    <ThemeProvider>
      <Router>
        <div className="overflow-x-hidden w-full">
          <Loader />
          <Cursor />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blogs" element={<Blogs />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

