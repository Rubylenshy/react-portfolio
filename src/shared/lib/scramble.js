const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+/<>=_'
const FRAME_MS = 40

// Decodes `el`'s text from random glyphs, resolving left to right. Spaces stay put, so
// monospace text keeps its width. Returns a cancel function that restores the final text.
export function scramble(el, { text = el.textContent, duration = 0.8, delay = 0, onDone } = {}) {
  let raf = 0
  let timer = 0

  const run = () => {
    const t0 = performance.now()
    let last = 0
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / (duration * 1000))
      if (p < 1) {
        if (now - last >= FRAME_MS) {
          last = now
          const resolved = Math.floor(p * text.length)
          let out = text.slice(0, resolved)
          for (let i = resolved; i < text.length; i++) {
            out += text[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0]
          }
          el.textContent = out
        }
        raf = requestAnimationFrame(tick)
      } else {
        el.textContent = text
        onDone?.()
      }
    }
    raf = requestAnimationFrame(tick)
  }

  if (delay > 0) timer = setTimeout(run, delay * 1000)
  else run()

  return () => {
    clearTimeout(timer)
    cancelAnimationFrame(raf)
    el.textContent = text
  }
}
