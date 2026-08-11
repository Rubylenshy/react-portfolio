import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useAnimations() {
  useEffect(() => {
    // Use setTimeout to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const overlayEl = document.getElementById('loader-overlay')

      // Play loader + hero intro only once per session
      if (overlayEl && !window.__loaderPlayed) {
        window.__loaderPlayed = true

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
      } else if (overlayEl && window.__loaderPlayed) {
        // Ensure overlay is hidden on non-initial routes
        overlayEl.style.display = 'none'
      }

      // Scroll Animations - run for existing and future sections/pages
      const animatedSections = new Set()

      const animateSection = (section) => {
        if (!section || animatedSections.has(section)) return
        const elements = section.querySelectorAll("h1, h2, h3, p, .project-card, .group")
        if (elements.length === 0) return

        animatedSections.add(section)

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

      const initialSections = document.querySelectorAll(
        "section:not(:first-child), main[data-scroll-animate]"
      )
      initialSections.forEach((section) => animateSection(section))

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (!(node instanceof HTMLElement)) return

            const tag = node.tagName.toLowerCase()

            if (tag === 'section' || (tag === 'main' && node.hasAttribute('data-scroll-animate'))) {
              animateSection(node)
            }

            node
              .querySelectorAll?.('section, main[data-scroll-animate]')
              .forEach((section) => animateSection(section))
          })
        })
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true
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

      // Store observer for cleanup
      window.__animationsObserver = observer
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      if (window.__animationsObserver) {
        window.__animationsObserver.disconnect()
        window.__animationsObserver = null
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
}

