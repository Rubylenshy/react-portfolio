import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navigation from '../../shared/components/Navigation'
import Hero from './components/Hero'
import AboutIntro from '../../shared/components/AboutIntro'
import Work from './components/Work'
import Stack from './components/Stack'
import Contact from '../../shared/components/Contact'
import Footer from '../../shared/components/Footer'
import SEOHead from '../../shared/components/SEOHead'
import person from '../../shared/data/person.json'

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    person,
    {
      '@type': 'WebSite',
      '@id': 'https://www.usereuben.com/#website',
      name: 'Reuben Oluwafemi — WordPress Plugin & Frontend Developer',
      url: 'https://www.usereuben.com/',
      description:
        'Portfolio of Reuben Oluwafemi, WordPress Plugin & Frontend Developer.',
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

  return (
    <>
      <SEOHead
        title="WordPress Plugin & Frontend Developer"
        description="Reuben Oluwafemi is a WordPress Plugin & Frontend Developer building custom plugins and fast React and Vue.js interfaces. Available for freelance work."
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

