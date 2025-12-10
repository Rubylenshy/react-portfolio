import { useEffect } from 'react'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import About from '../components/About'
import Work from '../components/Work'
import Stack from '../components/Stack'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const Home = () => {
  useEffect(() => {
    if (window.__homeVisited) {
      const fadeEls = document.querySelectorAll('.hero-fade-in')
      const charEls = document.querySelectorAll('.hero-char')
      fadeEls.forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      })
      charEls.forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      })
    } else {
      window.__homeVisited = true
    }
  }, [])

  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Work />
      <Stack />
      <Contact />
      <Footer />
    </>
  )
}

export default Home

