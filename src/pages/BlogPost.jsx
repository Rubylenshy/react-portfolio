import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Share2, Copy, Check, Calendar, Clock, Tag } from 'lucide-react'
import BlogNavigation from '../components/BlogNavigation'
import Breadcrumb from '../components/Breadcrumb'
import Footer from '../components/Footer'
import blogsData from '../assets/data/blogs.json'

/* ─── helpers ─── */
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getThumbnailSrc(url) {
  if (!url) return null
  const match = url.match(/[-\w]{25,}/)
  if (match) return `https://drive.google.com/thumbnail?id=${match[0]}&sz=w800`
  return url
}

/* ─── Author Avatar ─── */
const AuthorAvatar = ({ name, avatarUrl }) => {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className="w-9 h-9 rounded-full object-cover border border-[var(--color-border)]"
      />
    )
  }
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono font-semibold text-[var(--color-text-secondary)]">
      {initials}
    </div>
  )
}

/* ─── Share Button ─── */
const ShareButton = ({ title }) => {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {}
    }
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      id="share-post-btn"
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[rgba(255,255,255,0.25)] transition-all duration-200 text-xs font-mono"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : 'Share'}
    </button>
  )
}

/* ─── TOC Sidebar ─── */
const useTocHeadings = (markdown) => {
  const [headings, setHeadings] = useState([])
  useEffect(() => {
    if (!markdown) return
    const lines = markdown.split('\n')
    const found = []
    lines.forEach(line => {
      const m = line.match(/^(#{2,3})\s+(.+)/)
      if (m) {
        const level = m[1].length
        const text = m[2].trim()
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
        found.push({ id, text, level })
      }
    })
    setHeadings(found)
  }, [markdown])
  return headings
}

const TocSidebar = ({ headings }) => {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (!headings.length) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-20% 0% -70% 0%' }
    )
    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (!headings.length) return null

  return (
    <aside
      className="hidden xl:block"
      style={{
        position: 'sticky',
        top: '88px',
        alignSelf: 'start',
        maxHeight: 'calc(100vh - 120px)',
        overflowY: 'auto',
      }}
    >
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-4">
        On this page
      </p>
      <nav>
        <ul className="space-y-2">
          {headings.map(h => (
            <li key={h.id} style={{ paddingLeft: h.level === 3 ? '0.75rem' : '0' }}>
              <a
                href={`#${h.id}`}
                className={`block text-xs leading-relaxed transition-colors duration-200 ${
                  activeId === h.id
                    ? 'text-[var(--color-text-primary)] font-medium'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

/* ─── Markdown Code Block ─── */
const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '')
  if (!inline && match) {
    return (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        customStyle={{
          margin: '1.5rem 0',
          borderRadius: '0.75rem',
          fontSize: '0.8125rem',
          lineHeight: '1.7',
          border: '1px solid var(--color-border)',
        }}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    )
  }
  return (
    <code
      className="px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[0.8em] font-mono text-emerald-300"
      {...props}
    >
      {children}
    </code>
  )
}

/* ─── Main BlogPost Page ─── */
const BlogPost = () => {
  const { slug } = useParams()
  const [markdown, setMarkdown] = useState(null)
  const [error, setError] = useState(false)

  const post = blogsData.find(p => p.slug === slug)
  const headings = useTocHeadings(markdown)
  const thumb = getThumbnailSrc(post?.thumbnail)

  useEffect(() => {
    if (!post) return
    fetch(`/blogs/${slug}.md`)
      .then(r => {
        if (!r.ok) throw new Error('Not found')
        return r.text()
      })
      .then(setMarkdown)
      .catch(() => setError(true))
  }, [slug, post])

  /* Update page title for SEO */
  useEffect(() => {
    if (post) {
      document.title = `${post.title} — Reuben Oluwafemi`
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', post.excerpt)
    }
    return () => {
      document.title = 'Reuben Oluwafemi'
    }
  }, [post])

  if (!post) {
    return (
      <div className="blog-page min-h-screen flex flex-col">
        <BlogNavigation />
        <div className="flex-1 flex items-center justify-center text-[var(--color-text-secondary)] font-mono text-sm">
          Post not found.{' '}
          <Link to="/blogs" className="underline ml-1 hover:text-[var(--color-text-primary)]">
            Back to blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-page min-h-screen flex flex-col">
      <BlogNavigation />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        {/* Breadcrumb */}
        <Breadcrumb postTitle={post.title} />

        {/* Hero Header */}
        <header className="mb-12 flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 min-w-0">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-secondary)]"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-[var(--color-text-primary)] leading-tight tracking-tight mb-4">
              {post.title}
            </h1>

            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-6 max-w-xl">
              {post.excerpt}
            </p>

            {/* Author + Meta */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2.5">
                <AuthorAvatar name={post.author} avatarUrl={post.authorAvatar} />
                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                  {post.author}
                </span>
              </div>
              <span className="text-[var(--color-border)]">·</span>
              <span className="flex items-center gap-1 text-xs font-mono text-[var(--color-text-muted)]">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-[var(--color-text-muted)]">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
              <ShareButton title={post.title} />
            </div>
          </div>

          {/* Thumbnail */}
          {thumb && (
            <div className="w-full md:w-72 h-44 rounded-2xl overflow-hidden flex-shrink-0 border border-[var(--color-border)]">
              <img
                src={thumb}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </header>

        {/* Two-column body: Markdown + sticky TOC */}
        <div
          className="xl:grid xl:gap-16"
          style={{ gridTemplateColumns: '1fr 13rem' }}
        >
          {/* Markdown Body */}
          <article className="min-w-0 prose-blog">
            {error && (
              <p className="text-[var(--color-text-secondary)] font-mono text-sm">
                Failed to load post content.
              </p>
            )}
            {!markdown && !error && (
              <div className="space-y-4 animate-pulse">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 rounded bg-[var(--color-surface)]"
                    style={{ width: `${70 + (i % 3) * 10}%` }}
                  />
                ))}
              </div>
            )}
            {markdown && (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
                components={{ code: CodeBlock }}
              >
                {markdown}
              </ReactMarkdown>
            )}
          </article>

          {/* TOC — sticky right column */}
          <TocSidebar headings={headings} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default BlogPost
