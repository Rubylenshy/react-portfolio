const About = () => {
  return (
      <section
          id="about"
          className="px-6 py-12 md:py-24 max-w-[1400px] mx-auto border-t border-white/5"
      >
          <div className="flex flex-col items-center pb-5">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-4">
                  The Developer Story
              </h2>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 mx-auto max-w-6xl">
              {/* Left column: avatar + bold intro */}
              <div className="flex items-center lg:items-start gap-4 lg:gap-6">
                  <div className="magnetic-btn max-h-fit max-w-fit inline-flex items-center justify-center rounded-full border border-white/80 p-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.1)] transition duration-300">
                      <img
                          src="/images/profile.jpeg"
                          alt="Profile"
                          width={72}
                          height={72}
                          className="rounded-full grayscale hover:grayscale-0 transition duration-500"
                      />
                  </div>
                  <div className="flex flex-col">
                      <span className="text-[11px] md:text-xs font-mono uppercase tracking-[0.25em] text-secondary mb-3">
                          Frontend & Wordpress Engineer
                      </span>
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.05]">
                          Engineering
                          <br />
                          <span className="text-gray-500">for real users</span>
                      </h3>
                  </div>
              </div>

              {/* Right column: story + metrics */}
              <div className="flex-1 items-center lg:items-start w-full space-y-8">
                  <p className="text-sm md:text-base text-gray-400 leading-7 md:leading-8 font-light max-w-xl">
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
                      exciting projects, each one pushing{" "}
                      <span className="highlight-amber">
                          performance, clarity, and user experience
                      </span>{" "}
                      a little further.
                  </p>

                  <div className="flex flex-wrap lg:flex-nowrap gap-6 md:gap-10">
                      <div className="flex flex-col min-w-[120px]">
                          <span className="text-3xl font-semibold text-white">
                              8+
                          </span>
                          <span className="text-[10px] uppercase tracking-widest text-secondary mt-1">
                              WordPress plugins delivered
                          </span>
                      </div>
                      <div className="h-10 w-px bg-white/10 hidden md:block"></div>
                      <div className="flex flex-col min-w-[120px]">
                          <span className="text-3xl font-semibold text-white">
                              6+
                          </span>
                          <span className="text-[10px] uppercase tracking-widest text-secondary mt-1">
                              Satisfied clients
                          </span>
                      </div>
                      <div className="h-10 w-px bg-white/10 hidden md:block"></div>
                      <div className="flex flex-col min-w-[120px]">
                          <span className="text-3xl font-semibold text-white">
                              98.9%
                          </span>
                          <span className="text-[10px] uppercase tracking-widest text-secondary mt-1">
                              Delivery success rate
                          </span>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  );
}

export default About

