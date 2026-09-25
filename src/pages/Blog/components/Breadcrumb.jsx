import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const Breadcrumb = ({ postTitle }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-eyebrow text-muted">
        <li>
          <Link
            to="/"
            className="hover:text-primary transition-colors duration-150"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="w-3 h-3" />
        </li>
        <li>
          <Link
            to="/blogs"
            className="hover:text-primary transition-colors duration-150"
          >
            Blog
          </Link>
        </li>
        {postTitle && (
          <>
            <li aria-hidden="true">
              <ChevronRight className="w-3 h-3" />
            </li>
            <li className="text-primary truncate max-w-[200px] md:max-w-xs" aria-current="page">
              {postTitle}
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}

export default Breadcrumb
