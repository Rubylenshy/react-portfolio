import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Clock, Calendar, Tag } from 'lucide-react'
import BlogNavigation from '../components/BlogNavigation'
import Footer from '../components/Footer'
import blogsData from '../assets/data/blogs.json'

// Transform Google Drive file ID or shareable link → direct embed thumbnail
function getThumbnailSrc(url) {
  if (!url) return null
  const match = url.match(/[-\w]{25,}/)
  if (match) return `https://lh3.googleusercontent.com/d/${match[0]}=w800`
  return url
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const BlogCard = ({ post }) => {
  const thumb = getThumbnailSrc(post.thumbnail)

  return (
    <Link
      to={`/blogs/${post.slug}`}
      className="group blog-card flex flex-col sm:flex-row gap-5 p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="sm:w-44 sm:flex-shrink-0 h-44 sm:h-32 rounded-xl overflow-hidden bg-[var(--color-bg-secondary)] relative">
        {thumb ? (
          <img
            src={thumb}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          /* Gradient fallback */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg-secondary)]">
            <span className="font-mono text-2xl text-[var(--color-text-muted)] select-none">{'</>'}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between gap-3 min-w-0">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-secondary)]"
            >
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-base md:text-lg font-semibold text-[var(--color-text-primary)] leading-snug group-hover:text-[var(--color-accent)] transition-colors duration-200 line-clamp-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-[11px] font-mono text-[var(--color-text-muted)] mt-auto">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readingTime}
          </span>
        </div>
      </div>
    </Link>
  )
}

const Blogs = () => {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return blogsData
    const q = query.toLowerCase()
    return blogsData.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
    )
  }, [query])

  return (
    <div className="blog-page min-h-screen flex flex-col">
      <BlogNavigation />

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--color-text-secondary)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Dev Logs
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--color-text-primary)] mb-4">
            The Blog.
          </h1>
          <p className="text-base text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
            Long-form breakdowns of WordPress plugins, system design notes,
            and front-end deep dives.
          </p>
        </header>

        {/* Search */}
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <input
            id="blog-search"
            type="text"
            placeholder="Search posts, tags…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] text-sm font-mono outline-none focus:border-[rgba(255,255,255,0.3)] transition-colors duration-200"
          />
        </div>

        {/* TODO: FILTER_BAR — add tag filters + pagination here when post count reaches 8+ */}

        {/* List */}
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filtered.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-[var(--color-text-muted)] font-mono text-sm">
            No posts match &quot;{query}&quot;
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Blogs
