import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

/**
 * Pill — every button on the site.
 * Renders a <Link> when `to` is set, an <a> when `href` is set, otherwise a <button>.
 *
 * @param {'invert'|'signal'|'ghost'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} arrow   - append an up-right arrow that nudges on hover
 * @param {boolean} magnetic - opt into the magnetic hover pull
 */
const Pill = ({
  variant = 'invert',
  size = 'md',
  arrow = false,
  magnetic = true,
  to,
  href,
  className = '',
  children,
  ...rest
}) => {
  const classes = [
    'pill',
    `pill-${variant}`,
    size === 'sm' && 'pill-sm',
    size === 'lg' && 'pill-lg',
    arrow && 'pill-arrow',
    magnetic && 'magnetic-btn',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {children}
      {arrow && <ArrowUpRight className="w-4 h-4" aria-hidden="true" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}

export default Pill
