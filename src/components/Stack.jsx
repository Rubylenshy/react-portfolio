import {
  Atom,
  Box,
  Boxes,
  Braces,
  CircleDot,
  Columns,
  Database,
  Figma,
  FileCode2,
  GitBranch,
  Globe,
  Laptop,
  LayoutTemplate,
  Palette,
  Sparkles,
  Triangle,
  Wrench,
} from 'lucide-react'

const Stack = () => {
  const tools = [
    { label: 'VS Code', icon: Laptop },
    { label: 'CodeSandbox', icon: Boxes },
    { label: 'Wordpress', icon: Globe },
    { label: 'Vercel', icon: Triangle },
    { label: 'Bitbucket', icon: GitBranch },
    { label: 'Figma', icon: Figma },
    { label: 'Notion', icon: LayoutTemplate },
    { label: 'Trello', icon: Columns },
    { label: 'Canva', icon: Sparkles },
    { label: 'Adobe Photoshop', icon: Palette },
  ]

  const frontendStack = [
    { label: 'VueJS', icon: '' },
    { label: 'ReactJS', icon: Atom },
    { label: 'Next.js', icon: CircleDot },
    { label: 'JavaScript (ES6+)', icon: Braces },
    { label: 'PHP', icon: Braces },
    { label: 'DevTools', icon: Wrench },
    { label: 'Bootstrap', icon: Box },
    { label: 'SCSS', icon: Palette },
    { label: 'HTML5', icon: FileCode2 },
    { label: 'MySQL', icon: Database },
    { label: 'Git/GitHub', icon: GitBranch },
  ]

  const renderItems = (items) => {
    return [...items, ...items].map((item, idx) => {
      const Icon = item.icon
      return (
        <span key={`${item.label}-${idx}`} className="mx-8 inline-flex items-center gap-2">
          {Icon ? <Icon className="w-4 h-4 text-white/80" /> : <i className="fa fa-circle text-white/80"></i>}
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

