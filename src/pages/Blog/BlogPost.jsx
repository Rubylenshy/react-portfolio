import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEOHead from '../../shared/components/SEOHead'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Share2, Check, Calendar, Clock } from 'lucide-react'
import Navigation from '../../shared/components/Navigation'
import Breadcrumb from './components/Breadcrumb'
import Footer from '../../shared/components/Footer'
import Contact from '../../shared/components/Contact'
import blogsData from './data/blogs.json'
import { useTheme } from '../../shared/context/ThemeContext'

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
  if (match) return `https://lh3.googleusercontent.com/d/${match[0]}=w800`
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
      } catch { }
    }
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      id="share-post-btn"
      onClick={handleShare}
      type="button"
      className="pill pill-ghost pill-sm"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-signal-text" aria-hidden="true" /> : <Share2 className="w-3.5 h-3.5" aria-hidden="true" />}
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
      <p className="eyebrow mb-5">
        On this page
      </p>
      <nav aria-label="Table of contents">
        <ul className="space-y-1 border-l border-[var(--color-border)]">
          {headings.map(h => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={activeId === h.id ? 'location' : undefined}
                style={{ paddingLeft: h.level === 3 ? '1.75rem' : '1rem' }}
                className={`-ml-px block py-1 border-l text-[13px] leading-relaxed transition-colors duration-200 ${activeId === h.id
                    ? 'border-[var(--color-signal-text)] text-signal-text font-medium'
                    : 'border-transparent text-muted hover:text-primary'
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
  const { theme } = useTheme()
  const match = /language-(\w+)/.exec(className || '')
  if (!inline && match) {
    return (
      <SyntaxHighlighter
        style={theme === 'light' ? oneLight : vscDarkPlus}
        language={match[1]}
        PreTag="div"
        customStyle={{
          margin: '1.5rem 0',
          borderRadius: '16px',
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
      className="font-mono"
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

  const articleSchema = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: {
          '@type': 'Person',
          name: post.author,
          url: 'https://www.usereuben.com/',
        },
        publisher: {
          '@type': 'Person',
          name: 'Reuben Oluwafemi',
          url: 'https://www.usereuben.com/',
        },
        url: `https://www.usereuben.com/blogs/${post.slug}`,
        ...(getThumbnailSrc(post.thumbnail) && {
          image: getThumbnailSrc(post.thumbnail),
        }),
      }
    : null

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
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
    <div className="min-h-screen flex flex-col">
      {post && (
        <SEOHead
          title={post.title}
          description={post.excerpt}
          canonical={`https://www.usereuben.com/blogs/${post.slug}`}
          image={getThumbnailSrc(post.thumbnail) || undefined}
          type="article"
          schema={articleSchema}
        />
      )}
      <Navigation />

      <main id="main" className="flex-1 w-full px-4 md:px-10 pt-32 pb-16 md:pt-44 max-w-[1400px] mx-auto grid-frame">
       <div className="max-w-6xl mx-auto w-full">
        {/* Breadcrumb */}
        <Breadcrumb postTitle={post.title} />

        {/* Cover Image — full-width, after breadcrumb */}
        {thumb && (
          <div className="media w-full mb-12" style={{ maxHeight: '460px' }}>
            <img
              src={thumb}
              alt={post.title}
              className="w-full h-full object-cover"
              style={{ maxHeight: '460px', width: '100%' }}
            />
          </div>
        )}

        {/* Hero Header */}
        <header className="mb-12">
          <div className="flex-1 min-w-0">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-semibold text-primary leading-[1.02] tracking-display mb-6 max-w-4xl">
              {post.title}
            </h1>

            <p className="text-base md:text-lg text-muted leading-relaxed mb-8 max-w-2xl">
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
              <span className="text-muted" aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-eyebrow text-muted">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-eyebrow text-muted">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
              <ShareButton title={post.title} />
            </div>
          </div>
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
                components={{
                  code(props) {
                    const { children, className, node, ...rest } = props;
                    const isBlockCode = /language-(\w+)/.exec(className || '');

                    if (!isBlockCode) {
                      return (
                        <code {...rest}>
                          {children}
                        </code>
                      );
                    }

                    return (
                      <CodeBlock className={className} {...rest}>
                        {children}
                      </CodeBlock>
                    );
                  }
                }}
              >
                {markdown}
              </ReactMarkdown>
            )}
          </article>

          {/* TOC — sticky right column */}
          <TocSidebar headings={headings} />
        </div>
       </div>
      </main>

      <Contact num="01" />
      <Footer />
    </div>
  )
}

export default BlogPost
