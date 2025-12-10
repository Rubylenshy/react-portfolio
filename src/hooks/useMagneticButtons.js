import { useEffect } from 'react'
import { gsap } from 'gsap'

export function useMagneticButtons() {
  useEffect(() => {
    const cleanupFunctions = []
    let timeoutId = null

    // Use setTimeout to ensure DOM is ready
    timeoutId = setTimeout(() => {
      const buttons = document.querySelectorAll('.magnetic-btn')
      
      buttons.forEach(btn => {
        const handleMouseMove = (e) => {
          const rect = btn.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          
          gsap.to(btn, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: "power2.out"
          })
        }

        const handleMouseLeave = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          })
        }

        btn.addEventListener('mousemove', handleMouseMove)
        btn.addEventListener('mouseleave', handleMouseLeave)
        
        cleanupFunctions.push(() => {
          btn.removeEventListener('mousemove', handleMouseMove)
          btn.removeEventListener('mouseleave', handleMouseLeave)
        })
      })
    }, 100)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [])
}

