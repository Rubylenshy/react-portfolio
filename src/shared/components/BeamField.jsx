// Fixed background: a faint 12-column grid whose lines carry beams of light that fire
// at staggered intervals, plus a slow-drifting aurora. Pure CSS animation (transform +
// opacity only); colors come from the --beam-* theme tokens. Hidden under reduced motion.

// Vertical beams: [column line 0–12, duration (s), delay (s), desktopOnly]
const VERTICAL = [
  [0, 6.5, 0.4, false],
  [1, 8, 3.1, true],
  [2, 5.5, 1.6, true],
  [3, 7, 4.8, false],
  [4, 6, 2.2, true],
  [5, 9, 0.9, true],
  [6, 5, 3.7, false],
  [7, 7.5, 5.6, true],
  [8, 6.5, 1.1, false],
  [9, 8.5, 2.9, true],
  [10, 5.5, 4.3, true],
  [11, 7, 0.2, true],
  [12, 6, 2.6, false],
]

// Horizontal sweeps: [top %, duration (s), delay (s), reverse]
const HORIZONTAL = [
  [22, 11, 1.8, false],
  [58, 13, 6.4, true],
  [84, 12, 3.9, false],
]

const BeamField = () => (
  <div className="beam-field" aria-hidden="true">
    <div className="beam-aurora" />

    <div className="beam-grid">
      {VERTICAL.map(([col, duration, delay, desktopOnly]) => (
        <span
          key={col}
          className={`beam-line ${desktopOnly ? 'beam-desktop-only' : ''}`}
          style={{ left: `${(col / 12) * 100}%` }}
        >
          <span
            className="beam"
            style={{ '--beam-duration': `${duration}s`, '--beam-delay': `-${delay}s` }}
          />
        </span>
      ))}
    </div>

    {HORIZONTAL.map(([top, duration, delay, reverse], i) => (
      <span
        key={top}
        className={`beam-line-h ${i === 1 ? 'beam-desktop-only' : ''}`}
        style={{ top: `${top}%` }}
      >
        <span
          className={`beam-h ${reverse ? 'beam-reverse' : ''}`}
          style={{ '--beam-duration': `${duration}s`, '--beam-delay': `-${delay}s` }}
        />
      </span>
    ))}
  </div>
)

export default BeamField
