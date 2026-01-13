const About = () => {
  return (
      <section
          id="about"
          className="px-6 py-12 md:py-24 max-w-[1400px] mx-auto border-t border-divider"
      >
          <div className="flex flex-col items-center pb-5">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-text-secondary mb-4">
                  The Developer Story
              </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
              <div className="md:col-span-4">
                  <div className="flex flex-row md:flex-col gap-3 pb-5">
                      <div className="magnetic-btn max-h-fit max-w-fit inline-flex items-center justify-center rounded-full border border-border-base p-[3px] transition duration-300">
                          <img
                              src="./src/assets/images/profile.jpg"
                              alt="Profile"
                              width={60}
                              height={60}
                              className="rounded-full grayscale hover:grayscale-0 transition duration-500"
                          />
                      </div>
                      <h3 className="text-3xl md:text-5xl font-semibold tracking-tighter text-text-primary mb-6">
                          Engineering
                          <br />
                          <span className="text-text-tertiary">Solutions</span>
                      </h3>
                  </div>
                  <p className="text-sm md:text-base text-text-secondary leading-7 font-light mb-8">
                      I'm a{" "}
                      <span className="highlight-cyan">
                          frontend-focused engineer
                      </span>{" "}
                      who thinks in{" "}
                      <span className="highlight-purple">
                          systems, not just screens
                      </span>
                      . With a strong foundation in WordPress plugin development
                      and{" "}
                      <span className="highlight-cyan">
                          modern frontend engineering
                      </span>
                      , I build interfaces that feel{" "}
                      <span className="highlight-green">intuitive</span> and
                      codebases that stay{" "}
                      <span className="highlight-green">maintainable</span> long
                      after launch. I'm currently working on a number of
                      exciting projects that I'm looking forward to sharing each
                      one pushing{" "}
                      <span className="highlight-amber">
                          performance, clarity, and user experience
                      </span>{" "}
                      a little further.
                  </p>

                  <div className="flex gap-4">
                      <div className="flex flex-col">
                          <span className="text-2xl font-semibold text-text-primary">
                              8+
                          </span>
                          <span className="text-[10px] uppercase tracking-widest text-text-secondary mt-1">
                              WordPress plugins delivered
                          </span>
                      </div>
                      <div className="w-[1px] bg-divider"></div>
                      <div className="flex flex-col">
                          <span className="text-2xl font-semibold text-text-primary">
                              6+
                          </span>
                          <span className="text-[10px] uppercase tracking-widest text-text-secondary mt-1">
                              Satisfied clients
                          </span>
                      </div>
                      <div className="w-[1px] bg-divider"></div>
                      <div className="flex flex-col">
                          <span className="text-2xl font-semibold text-text-primary">
                              98.9%
                          </span>
                          <span className="text-[10px] uppercase tracking-widest text-text-secondary mt-1">
                              Delivery Success Rate
                          </span>
                      </div>
                  </div>
              </div>

              <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card 1 */}
                  <div className="p-8 bg-surface-elevated border border-border-base rounded-sm hover:bg-surface-hover transition-colors duration-500 group">
                      <div className="w-10 h-10 bg-surface-base border border-border-base rounded-full flex items-center justify-center mb-6 text-icon-primary group-hover:scale-110 transition-transform">
                          <i className="fa-solid fa-puzzle-piece text-sm" />
                      </div>
                      <h4 className="text-lg font-medium text-text-primary mb-2">
                          Plugin Development
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed">
                          I develop custom, high-performance WordPress plugins
                          designed to extend functionality without sacrificing
                          speed, security, or scalability. Every plugin is built
                          with users experience and long-term maintenance in
                          mind.
                      </p>
                  </div>

                  {/* Card 2 */}
                  <div className="p-8 bg-surface-elevated border border-border-base rounded-sm hover:bg-surface-hover transition-colors duration-500 group">
                      <div className="w-10 h-10 bg-surface-base border border-border-base rounded-full flex items-center justify-center mb-6 text-icon-primary group-hover:scale-110 transition-transform">
                          <i className="fa-solid fa-layer-group text-sm" />
                      </div>
                      <h4 className="text-lg font-medium text-text-primary mb-2">
                          Design Engineering
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed">
                          I translate Figma designs into precise, interactive
                          interfaces using React, Tailwind CSS, and modern
                          frontend techniques—bridging the gap between design
                          intent and production-ready code.
                      </p>
                  </div>

                  {/* Card 3 */}
                  <div className="p-8 bg-surface-elevated border border-border-base rounded-sm hover:bg-surface-hover transition-colors duration-500 group">
                      <div className="w-10 h-10 bg-surface-base border border-border-base rounded-full flex items-center justify-center mb-6 text-icon-primary group-hover:scale-110 transition-transform">
                          <i className="fa-solid fa-microchip text-sm" />
                      </div>
                      <h4 className="text-lg font-medium text-text-primary mb-2">
                          API Integration
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed">
                          I integrate third-party services like Stripe and
                          HubSpot into web applications, creating seamless data
                          flows and automated workflows that quietly do their
                          job in the background.
                      </p>
                  </div>

                  {/* Card 4 */}
                  <div className="p-8 bg-surface-elevated border border-border-base rounded-sm hover:bg-surface-hover transition-colors duration-500 group">
                      <div className="w-10 h-10 bg-surface-base border border-border-base rounded-full flex items-center justify-center mb-6 text-icon-primary group-hover:scale-110 transition-transform">
                          <i className="fa-solid fa-gauge-high text-sm" />
                      </div>
                      <h4 className="text-lg font-medium text-text-primary mb-2">
                          Performance Optimization
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed">
                          I audit and refactor existing codebases to improve
                          load times, accessibility, and Core Web Vitals,
                          consistently targeting 90+ Lighthouse scores and fast,
                          reliable user experiences.
                      </p>
                  </div>
              </div>
          </div>
      </section>
  );
}

export default About

