import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import Navigation from '../../shared/components/Navigation'
import Hero from './components/Hero'
import AboutIntro from '../../shared/components/AboutIntro'
import Work from './components/Work'
import Stack from './components/Stack'
import Contact from '../../shared/components/Contact'
import Footer from '../../shared/components/Footer'
import SEOHead from '../../shared/components/SEOHead'

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://www.usereuben.com/#person',
      name: 'Reuben Oluwafemi',
      url: 'https://www.usereuben.com/',
      jobTitle: 'Design & Plugin Engineer',
      description:
        'Frontend & WordPress plugin engineer specializing in custom UI and innovative solutions.',
      email: 'reztomoloju@gmail.com',
      sameAs: [
        'https://twitter.com/tomoloj_',
        'https://www.instagram.com/reuben.ig_',
        'https://github.com/Rubylenshy',
        'https://www.linkedin.com/in/reuben-tomoloju/',
        'https://profiles.wordpress.org/reztomoloju/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.usereuben.com/#website',
      name: 'Reuben Oluwafemi — Design & Plugin Engineer',
      url: 'https://www.usereuben.com/',
      description:
        'Portfolio of Reuben Oluwafemi, Design & Plugin Engineer.',
      author: { '@id': 'https://www.usereuben.com/#person' },
    },
  ],
}

const Home = () => {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const timer = setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -80 })
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [location.hash])

  // The loader timeline plays the hero intro on the very first load. On any later
  // arrival at Home (from another route, or a revisit) play a short intro here instead.
  useEffect(() => {
    const introWillPlay = !window.__loaderPlayed
    window.__homeVisited = true
    if (introWillPlay) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set('.hero-char, .hero-fade-in', { opacity: 1, y: 0, yPercent: 0 })
      return
    }
    gsap.fromTo('.hero-char', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'expo.out' })
    gsap.to('.hero-fade-in', { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'expo.out', delay: 0.2 })
  }, [])

  return (
    <>
      <SEOHead
        title="Design & Plugin Engineer"
        description="Reuben Oluwafemi is a Design & Frontend Engineer crafting intuitive user interfaces and building custom WordPress plugins. Available for freelance projects."
        canonical="https://www.usereuben.com/"
        schema={homeSchema}
      />
      <Navigation />
      <Hero />
      <AboutIntro num="01" />
      <Work />
      <Stack />
      <Contact num="04" />
      <Footer />
    </>
  )
}

export default Home

