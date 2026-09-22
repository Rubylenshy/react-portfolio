import { useEffect } from 'react'
import { gsap } from 'gsap'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, .magnetic-btn'

export function useCursor() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    let ticker = null
    let handleMove = null
    let handleOver = null
    let handleLeave = null

    // Use setTimeout to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const cursorCircle = document.querySelector('.cursor-circle')
      const cursorDot = document.querySelector('.cursor-dot')
      if (!cursorCircle || !cursorDot) return

      let mouseX = 0
      let mouseY = 0
      let cursorX = 0
      let cursorY = 0

      handleMove = (e) => {
        mouseX = e.clientX
        mouseY = e.clientY
        cursorDot.style.left = mouseX + 'px'
        cursorDot.style.top = mouseY + 'px'
        document.body.classList.add('cursor-ready')
      }

      // Delegated, so elements rendered by later routes get the hover state too
      handleOver = (e) => {
        const hit = e.target instanceof Element && e.target.closest(INTERACTIVE)
        document.body.classList.toggle('hover-active', Boolean(hit))
      }

      handleLeave = () => document.body.classList.remove('cursor-ready', 'hover-active')

      document.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseover', handleOver)
      document.documentElement.addEventListener('mouseleave', handleLeave)

      ticker = () => {
        cursorX += (mouseX - cursorX) * 0.15
        cursorY += (mouseY - cursorY) * 0.15
        cursorCircle.style.left = cursorX + 'px'
        cursorCircle.style.top = cursorY + 'px'
      }
      gsap.ticker.add(ticker)
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      if (handleMove) document.removeEventListener('mousemove', handleMove)
      if (handleOver) document.removeEventListener('mouseover', handleOver)
      if (handleLeave) document.documentElement.removeEventListener('mouseleave', handleLeave)
      if (ticker) gsap.ticker.remove(ticker)
    }
  }, [])
}
