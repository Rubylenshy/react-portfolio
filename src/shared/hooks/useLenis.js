import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    // Native scroll under reduced motion; callers fall back when window.lenis is undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Make lenis available globally for scrollTo
    window.lenis = lenis

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.lenis = undefined
    }
  }, [])
}
