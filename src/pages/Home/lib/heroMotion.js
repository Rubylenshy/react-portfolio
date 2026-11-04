import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scramble } from '../../../shared/lib/scramble'

gsap.registerPlugin(ScrollTrigger)

// Fired by useAnimations' loader timeline when the hero should start playing in
export const LOADER_REVEAL_EVENT = 'loader:reveal'

const GHOST_START = 0.3
const GHOST_STAGGER = 0.05
const GHOST_DECODE = 0.32

const fontsReady = () =>
  Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((resolve) => setTimeout(resolve, 1500)),
  ])

// Hero name lockup: intro (3D letter rise + ghost-line decode), a cursor lift on the first
// name and a halftone spotlight on the ghost line, and a scroll-scrubbed 3D orbit that spins
// both lines away as the hero leaves (and back in on the way up). Returns a cleanup function.
export function initHeroMotion(root, { waitForLoader }) {
  const q = (sel) => [...root.querySelectorAll(sel)]
  const h1 = root.querySelector('.hero-name')
  const [firstWord, ghostWord] = q('.hero-word')
  const letters = q('.hero-letter')
  const glyphs = q('.hero-glyph')
  const ghostLetters = q('.hero-ghost-letter')
  const ghostGlyphs = q('.hero-ghost-glyph')
  const fades = q('.hero-fade-in')
  const fine = window.matchMedia('(pointer: fine)').matches

  const cancels = []
  let killed = false
  let live = false
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
    gsap.set(ghostGlyphs, { opacity: 0 })

    // Each letter circles a vertical axis just behind itself and recedes, fanning outward,
    // so nothing swings toward the viewer; backface-visibility hides it past 90deg
    const orbit = (targets, dir) => {
      const mid = (targets.length - 1) / 2
      return {
        rotationY: dir * 180,
        z: () => -fontSize * 0.7,
        x: (i) => (i - mid) * fontSize * 0.12,
        yPercent: -35,
        transformPerspective: 900,
        transformOrigin: () => `50% 50% ${-fontSize * 0.45}px`,
        ease: 'power2.in',
        stagger: { each: 0.05, from: dir > 0 ? 'start' : 'end' },
      }
    }

    gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: () => `+=${h1.offsetTop + h1.offsetHeight}`,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    })
      .to(ghostWord, { '--halftone': 0, duration: 0.15 }, 0)
      .to(glyphs, orbit(glyphs, -1), 0)
      .to(ghostLetters, orbit(ghostLetters, 1), 0.08)
      .to([...glyphs, ...ghostLetters], { opacity: 0, duration: 0.5, ease: 'none' }, 0.45)
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

  // ── Pointer: lift first-name letters near the cursor, steer the spotlight ──
  const onMove = (e) => {
    if (!live) return
    const g = ghostWord.getBoundingClientRect()
    target.x = e.clientX - g.left
    target.y = e.clientY - g.top

    const word = firstWord.getBoundingClientRect()
    letters.forEach((el, i) => {
      const cx = word.left + el.offsetLeft + el.offsetWidth / 2
      const cy = word.top + word.height / 2
      const k = Math.max(0, 1 - Math.hypot(e.clientX - cx, e.clientY - cy) / (fontSize * 1.2))
      lifts[i](-k * k * fontSize * 0.13)
    })
  }

  const onEnter = () => {
    if (live) target.r = fontSize * 0.85
  }

  const onLeave = () => {
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
    ghostGlyphs.forEach((el) => {
      el.style.width = `${el.getBoundingClientRect().width}px`
    })

    ctx.add(() => {
      const tl = gsap.timeline()
      tl.to(letters, {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.045,
      })
      ghostGlyphs.forEach((el, i) => {
        tl.call(decodeGhost, [el], GHOST_START + i * GHOST_STAGGER)
      })
      tl.to(fades, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'expo.out' }, 0.4)
      tl.call(goLive, null, GHOST_START + ghostGlyphs.length * GHOST_STAGGER + GHOST_DECODE + 0.2)
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
    gsap.ticker.remove(tick)
    window.removeEventListener('resize', onResize)
    root.removeEventListener('pointermove', onMove)
    root.removeEventListener('pointerenter', onEnter)
    root.removeEventListener('pointerleave', onLeave)
    ghostGlyphs.forEach((el) => {
      el.style.width = ''
      el.style.opacity = ''
      el.classList.remove('is-lit')
    })
    root.classList.remove('is-live')
    ctx.revert()
  }
}
