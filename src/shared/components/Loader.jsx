const Loader = () => {
  return (
    <div
      id="loader-overlay"
      className="loader-overlay"
      aria-hidden="true"
      style={{
        maskImage: 'radial-gradient(circle, transparent 0%, black 0%)',
        WebkitMaskImage: 'radial-gradient(circle, transparent 0%, black 0%)'
      }}
    >
      <span className="signal-dot signal-dot-pulse" />
    </div>
  )
}

export default Loader
