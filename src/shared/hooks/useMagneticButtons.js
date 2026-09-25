import { useEffect } from 'react'
import { gsap } from 'gsap'

export function useMagneticButtons() {
  useEffect(() => {
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    let active = null

    const release = (btn) => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
    }

    // Delegated, so buttons rendered by later routes are magnetic too
    const handleMove = (e) => {
      const btn = e.target instanceof Element ? e.target.closest('.magnetic-btn') : null

      if (active && active !== btn) {
        release(active)
        active = null
      }
      if (!btn) return

      active = btn
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' })
    }

    document.addEventListener('mousemove', handleMove)

    return () => {
      document.removeEventListener('mousemove', handleMove)
      if (active) gsap.set(active, { x: 0, y: 0 })
    }
  }, [])
}
