import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, PenLine, ArrowRight } from 'lucide-react'
import Navigation from '../../shared/components/Navigation'
import Footer from '../../shared/components/Footer'
import Contact from '../../shared/components/Contact'
import blogsData from './data/blogs.json'
import SEOHead from '../../shared/components/SEOHead'

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

const Thumb = ({ post, className = '' }) => {
  const thumb = getThumbnailSrc(post.thumbnail)
  return (
    <div className={`media media-hover relative ${className}`}>
      {thumb ? (
        <img src={thumb} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-2xl text-muted select-none" aria-hidden="true">{'</>'}</span>
        </div>
      )}
    </div>
  )
}

const FeaturedPost = ({ post }) => (
  <Link
    to={`/blogs/${post.slug}`}
    className="group card card-hover p-2 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center"
  >
    <div className="order-2 lg:order-1 flex flex-col gap-5 px-5 pb-6 lg:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="tag tag-signal">Featured</span>
        <span className="font-mono text-[11px] uppercase tracking-eyebrow text-muted">{post.readingTime}</span>
      </div>
      <h2 className="text-3xl md:text-[36px] font-semibold tracking-display leading-[1.1] text-primary">
        {post.title}
      </h2>
      <p className="text-[15px] md:text-base text-muted leading-relaxed">{post.excerpt}</p>
      <p className="font-mono text-[11px] uppercase tracking-eyebrow text-muted">{formatDate(post.date)}</p>
      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-eyebrow text-primary group-hover:text-signal-text transition-colors">
        Read Essay <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </div>
    <Thumb post={post} className="order-1 lg:order-2 aspect-[16/10] !rounded-[16px]" />
  </Link>
)

const BlogCard = ({ post }) => (
  <Link to={`/blogs/${post.slug}`} className="group card card-hover p-2 flex flex-col h-full">
    <Thumb post={post} className="aspect-[16/10] !rounded-[16px]" />
    <div className="flex-1 flex flex-col gap-3 px-4 pt-5 pb-4 min-w-0">
      <div className="flex items-center justify-between gap-3">
        <span className="tag">{post.tags[0]}</span>
        <span className="font-mono text-[11px] uppercase tracking-eyebrow text-muted">{post.readingTime}</span>
      </div>
      <h2 className="text-lg md:text-xl font-semibold tracking-tight text-primary leading-snug line-clamp-2">
        {post.title}
      </h2>
      <p className="text-sm text-muted leading-relaxed line-clamp-2">{post.excerpt}</p>
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-[var(--color-border)]">
        <span className="font-mono text-[11px] uppercase tracking-eyebrow text-muted">{formatDate(post.date)}</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-eyebrow text-primary group-hover:text-signal-text transition-colors">
          Read <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
      </div>
    </div>
  </Link>
)

const ALL_TAGS = [...new Set(blogsData.flatMap((p) => p.tags))]

const Blogs = () => {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return blogsData.filter((p) => {
      if (activeTag !== 'all' && !p.tags.includes(activeTag)) return false
      if (!q) return true
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [query, activeTag])

  // Newest post is featured while browsing everything
  const showFeatured = activeTag === 'all' && !query.trim() && filtered.length > 0
  const [featured, ...rest] = filtered
  const gridPosts = showFeatured ? rest : filtered

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Dev Blog"
        description="Long-form breakdowns of WordPress plugins, system design notes, and front-end deep dives by Reuben Oluwafemi."
        canonical="https://www.usereuben.com/blogs"
      />
      <Navigation />

      <main id="main" className="w-full mx-auto max-w-[1400px] grid-frame px-4 md:px-10 pt-32 md:pt-44 pb-16">
        {/* Header */}
        <header className="mb-14 md:mb-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-end" data-reveal-group>
          <div className="md:col-span-8">
            <p className="eyebrow">
              <span className="signal-dot signal-dot-pulse" aria-hidden="true" />
              Dev Logs
            </p>
            <h1 className="mt-6 font-semibold tracking-display leading-[0.9] text-primary text-[clamp(56px,11vw,160px)]">
              The Blog.
            </h1>
          </div>
          <p className="md:col-span-4 text-base text-muted leading-relaxed">
            Long-form breakdowns of WordPress plugins, system design notes,
            and front-end deep dives.
          </p>
        </header>

        {showFeatured && (
          <div className="mb-16 md:mb-20" data-reveal>
            <FeaturedPost post={featured} />
          </div>
        )}

        {/* Filter row + search */}
        <div className="mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6" data-reveal>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
            {['all', ...ALL_TAGS].map((tag) => {
              const isActive = activeTag === tag
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  aria-pressed={isActive}
                  className={`pill pill-sm ${isActive ? 'pill-active' : 'pill-ghost'}`}
                >
                  {tag}
                </button>
              )
            })}
          </div>

          <div className="relative w-full lg:max-w-xs">
            <label htmlFor="blog-search" className="sr-only">Search posts</label>
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" aria-hidden="true" />
            <input
              id="blog-search"
              type="search"
              placeholder="Search posts, tags…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="field !pl-7 font-mono !text-sm"
            />
          </div>
        </div>

        {/* Grid */}
        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-reveal-group key={activeTag}>
            {gridPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card !border-dashed text-center py-20 text-muted font-mono text-sm">
            No posts match &quot;{query || activeTag}&quot;
          </div>
        ) : null}
      </main>

      {/* Editorial note */}
      <section className="max-w-[1400px] w-full mx-auto px-4 md:px-10 py-20 md:py-28 text-center grid-frame">
        <div data-reveal-group>
          <span className="mx-auto w-11 h-11 rounded-full !flex items-center justify-center border border-[var(--color-border-strong)] text-signal-text">
            <PenLine className="w-4 h-4" aria-hidden="true" />
          </span>
          <p className="mt-8 text-2xl md:text-4xl font-medium tracking-tight leading-snug text-primary max-w-4xl mx-auto">
            AI is changing what work looks like. I care about helping people adapt to that without disrupting how they learn. I'm Reuben — let's connect.
          </p>
          <p className="mt-14 text-base text-muted">Does this thinking align with your needs?</p>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/start-a-project" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-eyebrow text-primary hover:text-signal-text transition-colors">
              Start a Project <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link to="/services" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-eyebrow text-primary hover:text-signal-text transition-colors">
              Services <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Contact num="01" />
      <Footer />
    </div>
  )
}

export default Blogs
