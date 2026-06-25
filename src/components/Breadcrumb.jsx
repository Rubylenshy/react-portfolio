import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const Breadcrumb = ({ postTitle }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-xs font-mono text-[var(--color-text-secondary)]">
        <li>
          <Link
            to="/"
            className="hover:text-[var(--color-text-primary)] transition-colors duration-150"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="w-3 h-3 opacity-40" />
        </li>
        <li>
          <Link
            to="/blogs"
            className="hover:text-[var(--color-text-primary)] transition-colors duration-150"
          >
            Blog
          </Link>
        </li>
        {postTitle && (
          <>
            <li aria-hidden="true">
              <ChevronRight className="w-3 h-3 opacity-40" />
            </li>
            <li className="text-[var(--color-text-primary)] truncate max-w-[200px] md:max-w-xs">
              {postTitle}
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}

export default Breadcrumb
