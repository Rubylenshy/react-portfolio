
const Hero = () => {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element && window.lenis) {
      window.lenis.scrollTo(element, { offset: -80 })
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-12 md:pt-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2b8b3b39-e23c-43e6-be7b-500fa586c81f_1600w.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-60 scale-105"
          id="hero-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="z-10 relative flex flex-col items-center text-center w-full max-w-5xl mx-auto">
        <div className="mb-6 flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hero-fade-in opacity-0">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-300">
            Available for Hire
          </span>
        </div>

        <h1 className="text-5xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white uppercase leading-[0.9] flex flex-col items-center mix-blend-overlay">
          <div className="overflow-hidden">
            <span className="hero-char">Reuben</span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-char">Oluwafemi</span>
          </div>
        </h1>

        <div className="mt-8 md:mt-12 max-w-xl mx-auto opacity-0 hero-fade-in px-6">
          <p className="font-sans text-sm md:text-lg text-gray-300 leading-relaxed font-light">
            Bridging the gap between{' '}
            <span className="text-white font-medium">engineering logic</span> and{' '}
            <span className="text-white font-medium">creative design</span>. Specializing in
            high-performance WordPress Plugin architecture and top-value digital experiences.
          </p>
        </div>

        {/* Custom Animated Button */}
        <div className="mt-12 opacity-0 hero-fade-in btn-container">
          <a href="#work" className="btn-wrapper magnetic-btn" onClick={(e) => scrollToSection(e, 'work')}>
            {/* Lines */}
            <div className="line horizontal top"></div>
            <div className="line vertical right"></div>
            <div className="line horizontal bottom"></div>
            <div className="line vertical left"></div>

            {/* Dots */}
            <div className="dot top left"></div>
            <div className="dot top right"></div>
            <div className="dot bottom right"></div>
            <div className="dot bottom left"></div>

            {/* Button Content */}
            <button className="btn">
              <span>View Expertise</span>
              <svg className="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7"></path>
                <path d="M7 7h10v10"></path>
              </svg>
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero

