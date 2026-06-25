import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const BlogNavigation = () => {
  const { pathname } = useLocation()
  const isPost = pathname.startsWith('/blogs/') && pathname !== '/blogs/'

  return (
    <nav className="blog-nav sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)] backdrop-blur-md bg-opacity-80">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: back link */}
        <Link
          to={isPost ? '/blogs' : '/'}
          className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200 text-sm font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          {isPost ? 'All posts' : 'Home'}
        </Link>

        {/* Right: nav links */}
        <div className="flex items-center gap-6 text-sm font-mono">
          <Link
            to="/blogs"
            className={`transition-colors duration-200 ${
              pathname === '/blogs'
                ? 'text-[var(--color-text-primary)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            Blog
          </Link>
          <Link
            to="/projects"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
          >
            Projects
          </Link>
          <Link
            to="/"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
          >
            Home
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default BlogNavigation
