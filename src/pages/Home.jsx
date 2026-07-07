import { useEffect } from 'react'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import About from '../components/About'
import Clients from '../components/Clients'
import Work from '../components/Work'
import Stack from '../components/Stack'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import SEOHead from '../components/SEOHead'

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
      <SEOHead
        title="Design & Plugin Engineer"
        description="Reuben Oluwafemi is a Design & Frontend Engineer crafting intuitive user interfaces and building custom WordPress plugins. Available for freelance projects."
        canonical="https://www.usereuben.com/"
        schema={homeSchema}
      />
      <Navigation />
      <Hero />
      <About />
      {/* <Clients /> */}
      <Work />
      <Stack />
      <Contact />
      <Footer />
    </>
  )
}

export default Home

