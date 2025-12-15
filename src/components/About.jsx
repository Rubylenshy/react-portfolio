const About = () => {
  return (
    <section id="about" className="px-6 py-12 md:py-24 max-w-[1400px] mx-auto border-t border-white/5">
      <div className="flex flex-col items-center pb-5">
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-4">
          The Developer Story
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-4">
          <div className="flex flex-row md:flex-col gap-3 pb-5">
            <div className="magnetic-btn max-h-fit max-w-fit inline-flex items-center justify-center rounded-full border border-white p-[3px] transition duration-300">
              <img
                src="./src/assets/images/profile.jpg"
                alt="Profile"
                width={60}
                height={60}
                className="rounded-full grayscale hover:grayscale-0 transition duration-500"
              />
            </div>
            <h3 className="text-3xl md:text-5xl font-semibold tracking-tighter text-white mb-6">
              Engineering<br />
              <span className="text-gray-500">Solutions</span>
            </h3>
          </div>
          <p className="text-sm md:text-base text-gray-400 leading-7 font-light mb-8">
            I don't just write code; I craft systems. With a deep focus on WordPress plugin
            development and frontend engineering, I build tools that empower users and interfaces
            that delight them. My approach is rooted in technical precision and design intuition.
          </p>

          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-white">8+</span>
              <span className="text-[10px] uppercase tracking-widest text-secondary mt-1">
                Plugins Built
              </span>
            </div>
            <div className="w-[1px] bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-white">98.9%</span>
              <span className="text-[10px] uppercase tracking-widest text-secondary mt-1">
                Delivery Rate
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1 */}
          <div className="p-8 bg-white/5 border border-white/5 rounded-sm hover:bg-white/10 transition-colors duration-500 group">
            <div className="w-10 h-10 bg-black border border-white/10 rounded-full flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-puzzle-piece text-sm" />
            </div>
            <h4 className="text-lg font-medium text-white mb-2">Plugin Development</h4>
            <p className="text-sm text-secondary leading-relaxed">
              Building custom, high-performance WordPress plugins that extend functionality without
              compromising site speed or security.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 bg-white/5 border border-white/5 rounded-sm hover:bg-white/10 transition-colors duration-500 group">
            <div className="w-10 h-10 bg-black border border-white/10 rounded-full flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-layer-group text-sm" />
            </div>
            <h4 className="text-lg font-medium text-white mb-2">Design Engineering</h4>
            <p className="text-sm text-secondary leading-relaxed">
              Translating Figma designs into pixel-perfect, interactive code using Tailwind, React,
              and modern CSS techniques.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 bg-white/5 border border-white/5 rounded-sm hover:bg-white/10 transition-colors duration-500 group">
            <div className="w-10 h-10 bg-black border border-white/10 rounded-full flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-microchip text-sm" />
            </div>
            <h4 className="text-lg font-medium text-white mb-2">API Integration</h4>
            <p className="text-sm text-secondary leading-relaxed">
              Seamlessly connecting third-party services (Stripe, HubSpot, Custom Service) into web ecosystems
              for automated workflows.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-8 bg-white/5 border border-white/5 rounded-sm hover:bg-white/10 transition-colors duration-500 group">
            <div className="w-10 h-10 bg-black border border-white/10 rounded-full flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-gauge-high text-sm" />
            </div>
            <h4 className="text-lg font-medium text-white mb-2">Performance Optimization</h4>
            <p className="text-sm text-secondary leading-relaxed">
              Auditing and refactoring codebases to achieve 90+ Lighthouse scores and sub-second
              load times.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

