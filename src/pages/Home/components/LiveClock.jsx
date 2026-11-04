import { useEffect, useState } from 'react'

// Ticking local time in Nigeria; renders a placeholder until mounted (prerender-safe)
const LiveClock = ({ className = '' }) => {
  const [time, setTime] = useState(null)

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Lagos',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className={`items-center gap-2.5 font-mono text-[11px] uppercase tracking-eyebrow text-secondary tabular-nums ${className}`}>
      <span>Nigeria</span>
      <span className="text-muted" aria-hidden="true">/</span>
      <time>{time ?? '--:--:--'}</time>
      <span className="text-muted">WAT</span>
    </span>
  )
}

export default LiveClock
