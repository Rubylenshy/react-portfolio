import { useState, useEffect } from 'react'
import { ArrowDown } from 'lucide-react'

const Navigation = () => {
  const [hasScrolled, setHasScrolled] = useState(false)
  const resumeLink = "https://drive.google.com/file/d/1rfrexOJ8LFlsh_uwTFipmUpxtaFIoqIz/view?usp=sharing";
  const githubLink = "https://github.com/Rubylenshy";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.lenis?.scroll || window.scrollY || document.documentElement.scrollTop || 0
      setHasScrolled(scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    let lenisScrollHandler = null
    if (window.lenis) {
      lenisScrollHandler = () => {
        const scrollY = window.lenis.scroll || 0
        setHasScrolled(scrollY > 80)
      }
      window.lenis.on('scroll', lenisScrollHandler)
    }

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (window.lenis && lenisScrollHandler) {
        window.lenis.off('scroll', lenisScrollHandler)
      }
    }
  }, [])

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element && window.lenis) {
      window.lenis.scrollTo(element, { offset: -80 })
    }
  }

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full flex justify-between items-center z-50 text-white pointer-events-none transition-all duration-500 ease-out ${
          hasScrolled 
            ? 'px-6 py-4 bg-black/40 backdrop-blur-xl border-b border-white/10 mix-blend-normal shadow-lg shadow-black/20' 
            : 'px-6 py-6 mix-blend-difference'
        }`}
      >
      <a 
        href="#" 
        className="flex flex-col pointer-events-auto group magnetic-btn"
        onClick={(e) => {
          e.preventDefault()
          if (window.lenis) window.lenis.scrollTo(0)
        }}
      >
          <span className="font-sans text-sm font-semibold tracking-tight group-hover:text-gray-300 transition-colors">
            Reuben Oluwafemi
          </span>
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
            Engineer & Designer
          </span>
        </a>
        
        <div className="hidden md:flex items-center gap-1 pointer-events-auto bg-white/5 backdrop-blur-md px-1.5 py-1.5 rounded-full border border-white/5">
          <a 
            href="#about" 
            className="px-5 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors"
            onClick={(e) => scrollToSection(e, 'about')}
          >
            About
          </a>
          <a 
            href="#work" 
            className="px-5 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors"
            onClick={(e) => scrollToSection(e, 'work')}
          >
            Projects
          </a>
          <a 
            href="#stack" 
            className="px-5 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors"
            onClick={(e) => scrollToSection(e, 'stack')}
          >
            Stack
          </a>
        </div>
        
        <a
          href={resumeLink}
          title="Resume"
          aria-label="View Resume"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wrapper magnetic-btn !p-0 pointer-events-auto"
        >
          {/* Button Content */}
          <button className="!text-xs btn md:!text-sm !px-2 md:!px-4 hover:!bg-white/10 transition-colors">
            <i className="far fa-file-pdf mr-2"></i>
            <span>View Resume</span>  
          </button>
        </a>
      </nav>

      {/* --- Mobile Bottom Nav (separate layer to prevent scroll jumps) --- */}
      <div className="flex md:hidden items-center gap-1 pointer-events-auto fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-white/5 backdrop-blur-md px-1.5 py-1.5 rounded-full border border-white/5">
        <a
          href="#about"
          className="px-5 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors"
          onClick={(e) => scrollToSection(e, 'about')}
        >
          About
        </a>
        <a 
          href="#work"
          className="px-5 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors"
          onClick={(e) => scrollToSection(e, 'work')}
        >
          Projects
        </a>
        <a 
          href="#stack"
          className="px-5 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors"
          onClick={(e) => scrollToSection(e, 'stack')}
        >
          Stack
        </a>
      </div>
    </>
  )
}

export default Navigation

