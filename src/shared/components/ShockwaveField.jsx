import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

/**
 * ShockwaveField — full-bleed animated background: an expanding, noise-distorted
 * halftone ring rendered through a fixed screen-space grid of rounded-square dots.
 *
 * One WebGL full-screen quad. The ring's organic outline (multi-band angular noise)
 * and its drifting hot nodes are computed on the CPU once per frame into a 512×1
 * texture indexed by angle, so the fragment shader only does an atan + lookup per
 * pixel. The grid never moves — only the field passes through it.
 *
 * @param {number} pitch    Dot spacing in CSS px (~16; drop to ~10 for denser grain)
 * @param {number} noiseAmp How far the ring deviates from a circle, as a fraction of its radius
 */

const LOOP = 13 // seconds
const IGNITE = 0.3
const EXIT = 11
const ANGLE_SAMPLES = 512
const FRAME_MS = 1000 / 60

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)

// Background, navy bloom around the wave, and the 5-stop intensity ramp (low → high)
const PALETTES = {
  dark: {
    bg: hex('#000108'),
    bloom: hex('#04101B'),
    ramp: ['#000108', '#0A2540', '#1282C4', '#119CDC', '#0BD1FF'].map(hex),
    glow: 0.35,
    floor: 0.09,
  },
  light: {
    bg: hex('#F5F5F2'),
    bloom: hex('#E8EEF2'),
    ramp: ['#F5F5F2', '#D3E2EC', '#6FA7CC', '#1282C4', '#0A4F80'].map(hex),
    glow: 0,
    floor: 0.1,
  },
}

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG = `
// Some mobile GPUs lack highp in fragment shaders; fall back rather than fail to compile
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uPitch;
uniform float uRingR;
uniform float uWidth;
uniform float uAmp;
uniform float uNoiseAmp;
uniform float uFloor;
uniform float uGlow;
uniform vec3 uBg;
uniform vec3 uBloom;
uniform vec3 uRamp0;
uniform vec3 uRamp1;
uniform vec3 uRamp2;
uniform vec3 uRamp3;
uniform vec3 uRamp4;
uniform sampler2D uRing;

vec3 ramp(float v) {
  v = clamp(v, 0.0, 1.0);
  if (v < 0.3) return mix(uRamp0, uRamp1, v / 0.3);
  if (v < 0.6) return mix(uRamp1, uRamp2, (v - 0.3) / 0.3);
  if (v < 0.82) return mix(uRamp2, uRamp3, (v - 0.6) / 0.22);
  return mix(uRamp3, uRamp4, (v - 0.82) / 0.18);
}

// Field intensity at a device-pixel position
float fieldAt(vec2 p) {
  vec2 c = p - 0.5 * uRes;
  float R = 0.5 * length(uRes);
  float r = length(c) / R;
  float a = atan(c.y, c.x);
  vec4 s = texture2D(uRing, vec2(a / 6.2831853 + 0.5, 0.5));
  float offset = s.r * 2.0 - 1.0;
  float node = s.g;

  float rr = uRingR * (1.0 + uNoiseAmp * offset);
  float w = uWidth * (1.0 + 0.6 * node);
  float d = (r - rr) / w;
  // Sharper leading edge, softer trailing edge toward the interior
  float band = exp(-d * d * (d > 0.0 ? 1.0 : 0.4));
  // Faint navy residue inside the ring
  float residue = r < rr ? 0.07 * smoothstep(0.0, rr, r) : 0.0;
  return uAmp * (band * (0.7 + 0.65 * node) + residue);
}

void main() {
  vec2 p = gl_FragCoord.xy;

  // Fixed screen-space grid — sample the field once per cell at its center
  vec2 cc = (floor(p / uPitch) + 0.5) * uPitch;
  float v = max(fieldAt(cc), uFloor);
  float vc = clamp(v, 0.0, 1.0);

  // Rounded-square dot whose size and color both follow the field
  float halfSize = uPitch * mix(0.05, 0.47, vc * vc * (3.0 - 2.0 * vc));
  float radius = halfSize * 0.35;
  vec2 q = abs(p - cc) - vec2(halfSize - radius);
  float sd = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
  float dotA = 1.0 - smoothstep(-0.75, 0.75, sd);

  // Continuous field for the background bloom and the additive glow on the hottest core
  float vp = fieldAt(p);
  vec3 bg = uBg + (uBloom - uBg) * clamp(vp * 1.6, 0.0, 1.0);
  vec3 col = mix(bg, ramp(vc), dotA);
  col += uRamp4 * uGlow * smoothstep(0.85, 1.1, vp);

  gl_FragColor = vec4(col, 1.0);
}
`

// Seeded PRNG so each loop gets a fresh-but-deterministic shape
const mulberry32 = (seed) => () => {
  seed |= 0
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

// Three frequency bands of angular noise (periodic around the circle), plus two hot nodes
const makeCycleShape = (cycle) => {
  const rand = mulberry32(cycle * 9973 + 17)
  const bands = [
    [2, 3],
    [4, 5, 6, 7],
    [9, 11, 13, 16],
  ]
  const terms = []
  let total = 0
  bands.forEach((freqs, octave) => {
    freqs.forEach((k) => {
      const amp = Math.pow(0.5, octave) * (0.6 + 0.4 * rand())
      total += amp
      terms.push({
        k,
        amp,
        phase: rand() * Math.PI * 2,
        speed: (rand() - 0.5) * 0.5,
      })
    })
  })
  terms.forEach((t) => (t.amp /= total * 0.55))

  const nodes = [
    { theta: rand() * Math.PI * 2, speed: 0.1 + rand() * 0.08, strength: 1 },
    { theta: rand() * Math.PI * 2, speed: -(0.06 + rand() * 0.08), strength: 0.7 },
  ]
  return { terms, nodes }
}

const angularDist = (a, b) => {
  const d = Math.abs(a - b) % (Math.PI * 2)
  return d > Math.PI ? Math.PI * 2 - d : d
}

const fillRingTexture = (data, shape, t) => {
  for (let i = 0; i < ANGLE_SAMPLES; i++) {
    // Matches the shader's lookup: u = a / 2π + 0.5 with a in [-π, π]
    const a = (i / ANGLE_SAMPLES - 0.5) * Math.PI * 2
    let offset = 0
    for (const term of shape.terms) {
      offset += term.amp * Math.sin(term.k * a + term.phase + term.speed * t)
    }
    offset = Math.max(-1, Math.min(1, offset))
    let node = 0
    for (const n of shape.nodes) {
      const d = angularDist(a, n.theta + n.speed * t)
      node += n.strength * Math.exp(-(d * d) / (2 * 0.3 * 0.3))
    }
    node = Math.min(1, node)
    data[i * 4] = Math.round((offset * 0.5 + 0.5) * 255)
    data[i * 4 + 1] = Math.round(node * 255)
    data[i * 4 + 2] = 0
    data[i * 4 + 3] = 255
  }
}

const smoothstep = (a, b, x) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

// Timeline → ring radius (fraction of the half-diagonal), band width and brightness
const waveState = (t) => {
  const u = Math.max(0, Math.min(1, (t - IGNITE) / (EXIT - IGNITE)))
  // Ease-out into near-linear: hurries through the center, then drifts slowly through the outer thirds
  const ease = 0.55 * (1 - Math.pow(1 - u, 3)) + 0.45 * u
  const ringR = 0.004 + 1.2 * ease
  const width = 0.004 + 0.13 * smoothstep(0, 1, ringR)
  const amp =
    smoothstep(IGNITE, IGNITE + 0.9, t) *
    (0.5 + 0.4 * ease) *
    // Kept dim while the ring crosses the text-heavy middle of the screen
    (0.3 + 0.7 * smoothstep(0.15, 0.6, ringR)) *
    (1 - smoothstep(EXIT - 1, EXIT + 0.3, t))
  return { ringR, width, amp }
}

const ShockwaveField = ({ pitch = 16, noiseAmp = 0.25 }) => {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const paletteRef = useRef(PALETTES[theme] ?? PALETTES.dark)
  const redrawRef = useRef(null)

  // Theme changes only swap uniforms; a static (reduced-motion) frame is redrawn
  useEffect(() => {
    paletteRef.current = PALETTES[theme] ?? PALETTES.dark
    redrawRef.current?.()
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) return // No WebGL: the body background shows through

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const compile = (type, src) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader))
      }
      return shader
    }
    const program = gl.createProgram()
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      // Shader unsupported on this GPU: hide the canvas so the body background shows through
      console.error(gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
      canvas.style.display = 'none'
      return
    }
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const loc = {}
    ;[
      'uRes', 'uPitch', 'uRingR', 'uWidth', 'uAmp', 'uNoiseAmp', 'uFloor', 'uGlow',
      'uBg', 'uBloom', 'uRamp0', 'uRamp1', 'uRamp2', 'uRamp3', 'uRamp4', 'uRing',
    ].forEach((name) => (loc[name] = gl.getUniformLocation(program, name)))

    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.uniform1i(loc.uRing, 0)
    const ringData = new Uint8Array(ANGLE_SAMPLES * 4)

    // Touch devices get a lower pixel ratio: the shader runs per device pixel and
    // phone GPUs choke on a full 3x screen
    const coarse = window.matchMedia('(pointer: coarse)').matches
    let dpr = 1
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2)
      // The canvas' own box, not innerWidth/innerHeight, which jump as mobile toolbars show/hide
      const w = Math.round(canvas.clientWidth * dpr)
      const h = Math.round(canvas.clientHeight * dpr)
      // Resizing clears the buffer, so skip no-op resize events (fired constantly while scrolling on iOS)
      if (w === canvas.width && h === canvas.height) return
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
    }
    resize()

    let shape = null
    let shapeCycle = -1

    const draw = (elapsed) => {
      const cycle = Math.floor(elapsed / LOOP)
      const t = elapsed - cycle * LOOP
      if (cycle !== shapeCycle) {
        shape = makeCycleShape(cycle)
        shapeCycle = cycle
      }
      fillRingTexture(ringData, shape, elapsed)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, ANGLE_SAMPLES, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, ringData)

      const { ringR, width, amp } = waveState(t)
      const pal = paletteRef.current
      gl.uniform2f(loc.uRes, canvas.width, canvas.height)
      gl.uniform1f(loc.uPitch, Math.max(4, pitch * dpr))
      gl.uniform1f(loc.uRingR, ringR)
      gl.uniform1f(loc.uWidth, width)
      gl.uniform1f(loc.uAmp, amp)
      gl.uniform1f(loc.uNoiseAmp, noiseAmp)
      gl.uniform1f(loc.uFloor, pal.floor)
      gl.uniform1f(loc.uGlow, pal.glow)
      gl.uniform3fv(loc.uBg, pal.bg)
      gl.uniform3fv(loc.uBloom, pal.bloom)
      pal.ramp.forEach((c, i) => gl.uniform3fv(loc[`uRamp${i}`], c))
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    // Reduced motion: one static mid-expansion frame, redrawn only on resize/theme change
    const STATIC_TIME = 5.5
    if (reduceMotion) {
      const drawStatic = () => draw(STATIC_TIME)
      redrawRef.current = drawStatic
      drawStatic()
      const onResize = () => {
        resize()
        drawStatic()
      }
      window.addEventListener('resize', onResize)
      return () => {
        window.removeEventListener('resize', onResize)
        redrawRef.current = null
      }
    }

    let rafId = null
    let last = 0
    let elapsed = 0
    let visible = true
    let lost = false

    const tick = (now) => {
      rafId = requestAnimationFrame(tick)
      const delta = now - last
      if (delta < FRAME_MS - 1) return // cap at 60fps on high-refresh displays
      // Clamp long gaps (tab hidden / paused) so the loop resumes where it left off
      elapsed += Math.min(delta, 100) / 1000
      last = now
      draw(elapsed)
    }

    const start = () => {
      if (rafId !== null || lost || !visible || document.hidden) return
      last = performance.now()
      rafId = requestAnimationFrame(tick)
    }
    const stop = () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = null
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    observer.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    const onLost = (e) => {
      e.preventDefault()
      lost = true
      stop()
    }
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('resize', resize)
    canvas.addEventListener('webglcontextlost', onLost)

    start()

    return () => {
      stop()
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('webglcontextlost', onLost)
      gl.deleteTexture(texture)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [pitch, noiseAmp])

  return <canvas ref={canvasRef} className="shockwave-field" aria-hidden="true" />
}

export default ShockwaveField
