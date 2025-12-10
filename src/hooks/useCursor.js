import { useEffect } from 'react'
import { gsap } from 'gsap'

export function useCursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return
    }

    let handleMouseMove = null
    let ticker = null
    const cleanupFunctions = []

    // Use setTimeout to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const cursorCircle = document.querySelector('.cursor-circle')
      if (!cursorCircle) return

      let mouseX = 0
      let mouseY = 0
      let cursorX = 0
      let cursorY = 0

      handleMouseMove = (e) => {
        mouseX = e.clientX
        mouseY = e.clientY
      }

      document.addEventListener('mousemove', handleMouseMove)

      ticker = gsap.ticker.add(() => {
        cursorX += (mouseX - cursorX) * 0.15
        cursorY += (mouseY - cursorY) * 0.15
        cursorCircle.style.left = cursorX + 'px'
        cursorCircle.style.top = cursorY + 'px'
      })

      const interactiveElements = document.querySelectorAll('a, button, .magnetic-btn')
      
      interactiveElements.forEach(el => {
        const handleMouseEnter = () => {
          document.body.classList.add('hover-active')
        }
        const handleMouseLeave = () => {
          document.body.classList.remove('hover-active')
        }
        
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
        
        cleanupFunctions.push(() => {
          el.removeEventListener('mouseenter', handleMouseEnter)
          el.removeEventListener('mouseleave', handleMouseLeave)
        })
      })
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      if (handleMouseMove) {
        document.removeEventListener('mousemove', handleMouseMove)
      }
      if (ticker) {
        gsap.ticker.remove(ticker)
      }
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [])
}

