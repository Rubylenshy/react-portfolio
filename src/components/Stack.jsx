const Stack = () => {
  const tools = [
    { label: 'VS Code', iconClass: 'fa-solid fa-code' },
    { label: 'CodeSandbox', iconClass: 'fa-solid fa-boxes-stacked' },
    { label: 'WordPress', iconClass: 'fa-brands fa-wordpress' },
    { label: 'Vercel', iconClass: 'fa-solid fa-play' },
    { label: 'Bitbucket', iconClass: 'fa-brands fa-bitbucket' },
    { label: 'Figma', iconClass: 'fa-brands fa-figma' },
    { label: 'Notion', iconClass: 'fa-brands fa-notion' },
    { label: 'Trello', iconClass: 'fa-brands fa-trello' },
    { label: 'Canva', iconClass: 'fa-solid fa-wand-magic-sparkles' },
    { label: 'Adobe Photoshop', iconClass: 'fa-solid fa-image' },
  ]

  const frontendStack = [
    { label: 'VueJS', iconClass: 'fa-brands fa-vuejs' },
    { label: 'ReactJS', iconClass: 'fa-brands fa-react' },
    { label: 'Next.js', iconClass: 'fa-solid fa-circle-dot' },
    { label: 'JavaScript (ES6+)', iconClass: 'fa-brands fa-js' },
    { label: 'PHP', iconClass: 'fa-brands fa-php' },
    { label: 'DevTools', iconClass: 'fa-solid fa-screwdriver-wrench' },
    { label: 'Bootstrap', iconClass: 'fa-brands fa-bootstrap' },
    { label: 'SCSS', iconClass: 'fa-brands fa-sass' },
    { label: 'HTML5', iconClass: 'fa-brands fa-html5' },
    { label: 'MySQL', iconClass: 'fa-solid fa-database' },
    { label: 'Git/GitHub', iconClass: 'fa-brands fa-git-alt' },
  ]

  const renderItems = (items) => {
    return [...items, ...items].map((item, idx) => {
      return (
        <span key={`${item.label}-${idx}`} className="mx-8 inline-flex items-center gap-2">
          {item.iconClass ? (
            <i className={`${item.iconClass} text-white/80 text-sm`}></i>
          ) : (
            <i className="fa-solid fa-circle text-white/80 text-[0.6rem]"></i>
          )}
          <span>{item.label}</span>
        </span>
      )
    })
  }

  return (
    <section id="stack" className="py-12 border-y border-white/5 bg-black/50 backdrop-blur-sm overflow-hidden mt-12">
      <div className="space-y-6">
        <div className="marquee-track font-mono text-sm md:text-base text-gray-500 uppercase tracking-widest">
          {renderItems(tools)}
        </div>
        <div
          className="marquee-track font-mono text-sm md:text-base text-gray-500 uppercase tracking-widest"
          style={{ animationDirection: 'reverse' }}
        >
          {renderItems(frontendStack)}
        </div>
      </div>
    </section>
  )
}

export default Stack

