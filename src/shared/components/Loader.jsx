const Loader = () => {
  return (
    <div
      id="loader-overlay"
      className="fixed inset-0 bg-white z-[99999] pointer-events-none"
      style={{
        maskImage: 'radial-gradient(circle, transparent 0%, black 0%)',
        WebkitMaskImage: 'radial-gradient(circle, transparent 0%, black 0%)'
      }}
    />
  )
}

export default Loader

