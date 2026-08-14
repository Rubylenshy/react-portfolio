const GlassyBubbles = () => {
  const bubbles = [
    {
      label: 'Frontend Dev',
      floatClass: 'glass-bubble-float-1 hero-bubble hero-bubble-designs',
    },
    {
      label: 'Designer',
      floatClass: 'glass-bubble-float-2 hero-bubble hero-bubble-codes',
    },
    {
      label: 'CMS Plugin Dev',
      floatClass: 'glass-bubble-float-3 hero-bubble hero-bubble-wp',
    }
  ]

  return (
    <>
      {bubbles.map((bubble) => (
        <div
          key={bubble.label}
          className={`glass-bubble ${bubble.floatClass} px-3 py-1.5 md:px-4 md:py-2 flex items-center justify-center`}
        >
          <span className="font-mono text-[9px] md:text-[10px] tracking-[0.28em] uppercase text-primary">
            {bubble.label}
          </span>
        </div>
      ))}
    </>
  )
}

export default GlassyBubbles


