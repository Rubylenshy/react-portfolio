import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useAnimations() {
  useEffect(() => {
    // Use setTimeout to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      // Loader Sequence
      const overlayEl = document.getElementById('loader-overlay')
      if (!overlayEl) return

      const loaderTl = gsap.timeline()

      loaderTl
        .to(overlayEl, {
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: function() {
            const prog = this.progress() * 150
            overlayEl.style.maskImage = `radial-gradient(circle, transparent ${prog}%, black ${prog}%)`
            overlayEl.style.webkitMaskImage = `radial-gradient(circle, transparent ${prog}%, black ${prog}%)`
          }
        })
        .set(overlayEl, { display: 'none' })
        .from(".hero-char", {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power3.out"
        }, "-=0.5")
        .to(".hero-fade-in", {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out"
        }, "-=0.5")

      // Scroll Animations
      const sections = document.querySelectorAll("section:not(:first-child)")
      sections.forEach(section => {
        const elements = section.querySelectorAll("h2, h3, p, .project-card, .group")
        if (elements.length > 0) {
          gsap.from(elements, {
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
          })
        }
      })

      // Parallax for Hero Background
      const heroBg = document.getElementById('hero-bg')
      if (heroBg) {
        gsap.to(heroBg, {
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom top",
            scrub: true
          },
          y: 200,
          scale: 1.1
        })
      }
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
}

