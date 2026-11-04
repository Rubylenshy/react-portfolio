import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scramble } from '../../../shared/lib/scramble'

gsap.registerPlugin(ScrollTrigger)

// Fired by useAnimations' loader timeline when the hero should start playing in
export const LOADER_REVEAL_EVENT = 'loader:reveal'

const GHOST_START = 0.35
const GHOST_STAGGER = 0.07
const GHOST_DECODE = 0.42

const fontsReady = () =>
  Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((resolve) => setTimeout(resolve, 1500)),
  ])

// Hero name lockup: intro (3D letter rise + ghost-line decode), then while live a cursor
// lift on the first name, a halftone spotlight on the ghost line, idle sweeps and glitches,
// and a scroll-scrubbed split of the two lines. Returns a cleanup function.
export function initHeroMotion(root, { waitForLoader }) {
  const q = (sel) => [...root.querySelectorAll(sel)]
  const h1 = root.querySelector('.hero-name')
  const ghostWord = root.querySelector('.hero-ghost-word')
  const letters = q('.hero-letter')
  const glyphs = q('.hero-glyph')
  const ghostLetters = q('.hero-ghost-letter')
  const fades = q('.hero-fade-in')
  const decoders = q('[data-scramble]')
  const fine = window.matchMedia('(pointer: fine)').matches

  const cancels = []
  const calls = []
  let killed = false
  let live = false
  let visible = true
  let hovering = false
  let sweepTl = null
  let lifts = []
  let fontSize = parseFloat(getComputedStyle(h1).fontSize)

  const ctx = gsap.context(() => {
    gsap.set(letters, {
      yPercent: 115,
      rotateX: -75,
      opacity: 0,
      transformPerspective: 700,
      transformOrigin: '50% 100%',
    })
    gsap.set(ghostLetters, { opacity: 0 })

    // The two lines drift apart as the hero scrolls away
    const [firstWord, lastWord] = q('.hero-word')
    const split = (xPercent) => ({
      xPercent,
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top top', end: () => `+=${h1.offsetTop + h1.offsetHeight}`, scrub: 0.6 },
    })
    gsap.to(firstWord, split(-14))
    gsap.to(lastWord, split(9))
  }, root)

  // ── Halftone spotlight on the ghost line (eased toward `target` every frame) ──
  const spot = { x: 0, y: 0, r: 0 }
  const target = { x: 0, y: 0, r: 0 }
  const applied = { x: NaN, y: NaN, r: NaN }

  const tick = () => {
    spot.x += (target.x - spot.x) * 0.18
    spot.y += (target.y - spot.y) * 0.18
    spot.r += (target.r - spot.r) * 0.14
    if (Math.abs(spot.x - applied.x) + Math.abs(spot.y - applied.y) + Math.abs(spot.r - applied.r) < 0.3) return
    applied.x = spot.x
    applied.y = spot.y
    applied.r = spot.r
    ghostWord.style.setProperty('--spot-x', `${spot.x.toFixed(1)}px`)
    ghostWord.style.setProperty('--spot-y', `${spot.y.toFixed(1)}px`)
    ghostWord.style.setProperty('--spot-r', `${Math.max(0, spot.r).toFixed(1)}px`)
  }

  const sweep = () => {
    if (!live || !visible || hovering || document.hidden) return
    const w = ghostWord.offsetWidth
    const R = fontSize * 0.75
    Object.assign(target, { x: -R, y: ghostWord.offsetHeight * 0.5, r: 0 })
    Object.assign(spot, target)
    sweepTl = gsap.timeline()
      .to(target, { r: R, duration: 0.5, ease: 'power2.out' }, 0)
      .to(target, { x: w + R, duration: 2.2, ease: 'power1.inOut' }, 0)
      .to(target, { r: 0, duration: 0.5, ease: 'power2.in' }, 1.7)
  }

  const glitch = () => {
    if (!live || !visible || document.hidden) return
    const el = glyphs[(Math.random() * glyphs.length) | 0]
    el.classList.remove('is-glitch')
    void el.offsetWidth
    el.classList.add('is-glitch')
  }

  // Repeats `fn` at random intervals; each loop keeps only its pending call in `calls`
  const loop = (fn, min, max) => {
    const slot = calls.length
    const next = () => {
      fn()
      calls[slot] = gsap.delayedCall(gsap.utils.random(min, max), next)
    }
    calls[slot] = gsap.delayedCall(gsap.utils.random(min, max), next)
  }

  // ── Pointer: lift first-name letters near the cursor, steer the spotlight ──
  const onMove = (e) => {
    if (!live) return
    const g = ghostWord.getBoundingClientRect()
    target.x = e.clientX - g.left
    target.y = e.clientY - g.top

    letters.forEach((el, i) => {
      const word = el.offsetParent.getBoundingClientRect()
      const cx = word.left + el.offsetLeft + el.offsetWidth / 2
      const cy = word.top + word.height / 2
      const k = Math.max(0, 1 - Math.hypot(e.clientX - cx, e.clientY - cy) / (fontSize * 1.2))
      lifts[i](-k * k * fontSize * 0.13)
    })
  }

  const onEnter = () => {
    if (!live) return
    hovering = true
    sweepTl?.kill()
    target.r = fontSize * 0.85
  }

  const onLeave = () => {
    hovering = false
    target.r = 0
    lifts.forEach((lift) => lift(0))
  }

  const onResize = () => {
    fontSize = parseFloat(getComputedStyle(h1).fontSize)
  }

  const goLive = () => {
    live = true
    root.classList.add('is-live')
    gsap.set(letters, { clearProps: 'transform,opacity' })
    lifts = letters.map((el) => gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' }))
    sweep()
    loop(sweep, 6, 9)
    loop(glitch, 1.8, 4.2)
  }

  // ── Intro ──
  const decodeGhost = (el) => {
    el.style.opacity = '1'
    cancels.push(
      scramble(el, {
        duration: GHOST_DECODE,
        onDone: () => {
          el.style.width = ''
          el.classList.add('is-lit')
        },
      })
    )
  }

  const play = () => {
    if (killed) return
    // Lock each ghost letter to its final width so the decode doesn't shift the line
    ghostLetters.forEach((el) => {
      el.style.width = `${el.getBoundingClientRect().width}px`
    })

    ctx.add(() => {
      const tl = gsap.timeline()
      tl.to(letters, {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.06,
      })
      ghostLetters.forEach((el, i) => {
        tl.call(decodeGhost, [el], GHOST_START + i * GHOST_STAGGER)
      })
      tl.to(fades, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out' }, 0.45)
      tl.call(() => {
        decoders.forEach((el, i) => cancels.push(scramble(el, { duration: 0.9, delay: i * 0.08 })))
      }, null, 0.5)
      tl.call(goLive, null, GHOST_START + ghostLetters.length * GHOST_STAGGER + GHOST_DECODE + 0.3)
    })
  }

  let fallback = 0
  const start = () => {
    clearTimeout(fallback)
    document.removeEventListener(LOADER_REVEAL_EVENT, start)
    fontsReady().then(play)
  }

  if (waitForLoader) {
    document.addEventListener(LOADER_REVEAL_EVENT, start)
    fallback = setTimeout(start, 3000)
  } else {
    start()
  }

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
  })
  io.observe(h1)

  gsap.ticker.add(tick)
  window.addEventListener('resize', onResize)
  if (fine) {
    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerenter', onEnter)
    root.addEventListener('pointerleave', onLeave)
  }

  return () => {
    killed = true
    clearTimeout(fallback)
    document.removeEventListener(LOADER_REVEAL_EVENT, start)
    cancels.forEach((cancel) => cancel())
    calls.forEach((call) => call.kill())
    sweepTl?.kill()
    io.disconnect()
    gsap.ticker.remove(tick)
    window.removeEventListener('resize', onResize)
    root.removeEventListener('pointermove', onMove)
    root.removeEventListener('pointerenter', onEnter)
    root.removeEventListener('pointerleave', onLeave)
    ghostLetters.forEach((el) => {
      el.style.width = ''
      el.style.opacity = ''
      el.classList.remove('is-lit')
    })
    root.classList.remove('is-live')
    ctx.revert()
  }
}
