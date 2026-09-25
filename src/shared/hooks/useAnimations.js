import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const REVEAL_FROM = { opacity: 0, y: 24, filter: 'blur(8px)' }
const REVEAL_TO = {
  opacity: 1,
  y: 0,
  filter: 'blur(0px)',
  duration: 0.6,
  ease: 'expo.out',
  stagger: 0.06,
  clearProps: 'filter,transform,opacity',
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useAnimations() {
  useEffect(() => {
    const reduce = prefersReducedMotion()
    let refreshTimer = null

    const scheduleRefresh = () => {
      clearTimeout(refreshTimer)
      refreshTimer = setTimeout(() => {
        // Drop triggers whose elements left the DOM on a route change
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger && !t.trigger.isConnected) t.kill()
        })
        ScrollTrigger.refresh()
      }, 150)
    }

    // Use setTimeout to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const overlayEl = document.getElementById('loader-overlay')

      if (reduce) {
        // No loader, no intro, no reveals — just show everything
        window.__loaderPlayed = true
        if (overlayEl) overlayEl.style.display = 'none'
        gsap.set('.hero-char, .hero-fade-in', { opacity: 1, y: 0 })
        return
      }

      // Play loader + hero intro only once per session
      if (overlayEl && !window.__loaderPlayed) {
        window.__loaderPlayed = true

        const loaderTl = gsap.timeline()

        loaderTl
          .to(overlayEl, {
            duration: 1.2,
            ease: 'power2.inOut',
            onUpdate: function () {
              const prog = this.progress() * 150
              overlayEl.style.maskImage = `radial-gradient(circle, transparent ${prog}%, black ${prog}%)`
              overlayEl.style.webkitMaskImage = `radial-gradient(circle, transparent ${prog}%, black ${prog}%)`
            },
          })
          .set(overlayEl, { display: 'none' })
          .from('.hero-char', {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.08,
            ease: 'expo.out',
          }, '-=0.5')
          .to('.hero-fade-in', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'expo.out',
          }, '-=0.6')
      } else if (overlayEl && window.__loaderPlayed) {
        // Ensure overlay is hidden on non-initial routes
        overlayEl.style.display = 'none'
      }

      // ── Scroll reveals ──────────────────────────────────────────
      // [data-reveal] reveals itself; [data-reveal-group] reveals its direct children
      // with a 60ms stagger; unannotated sections fall back to h1/h2/h3/p.
      const revealed = new WeakSet()

      const reveal = (targets, trigger) => {
        const els = targets.filter((el) => !revealed.has(el))
        if (!els.length) return
        els.forEach((el) => revealed.add(el))
        // Animate back to each element's own resting opacity (e.g. dimmed cards)
        const resting = els.map((el) => getComputedStyle(el).opacity)
        gsap.fromTo(els, REVEAL_FROM, {
          ...REVEAL_TO,
          opacity: (i) => resting[i],
          scrollTrigger: { trigger, start: 'top 85%', once: true },
        })
      }

      const scan = (root) => {
        if (!(root instanceof Element)) return

        const within = (sel) => [
          ...(root.matches(sel) ? [root] : []),
          ...root.querySelectorAll(sel),
        ]

        within('[data-reveal]').forEach((el) => reveal([el], el))
        within('[data-reveal-group]').forEach((group) =>
          reveal([...group.children], group)
        )
        // Slow parallax for hero media
        within('[data-parallax]').forEach((el) => {
          if (revealed.has(el)) return
          revealed.add(el)
          gsap.to(el, {
            yPercent: parseFloat(el.dataset.parallax) || 8,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          })
        })

        within('section:not([data-hero]):not([data-no-reveal])').forEach((section) => {
          if (section.querySelector('[data-reveal], [data-reveal-group]')) return
          reveal([...section.querySelectorAll('h1, h2, h3, p')], section)
        })
      }

      scan(document.body)

      const observer = new MutationObserver((mutations) => {
        let added = false
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              scan(node)
              added = true
            }
          })
        })
        if (added) scheduleRefresh()
      })

      observer.observe(document.body, { childList: true, subtree: true })

      window.__animationsObserver = observer
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(refreshTimer)
      if (window.__animationsObserver) {
        window.__animationsObserver.disconnect()
        window.__animationsObserver = null
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])
}
