import { Link } from 'react-router-dom'

const BackHomeButton = ({ label = 'Back Home', className = '' }) => {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-text-primary border border-border-base rounded-full px-4 py-2 hover:bg-text-primary hover:text-text-inverse transition-colors ${className}`}
    >
      <i className="fa-solid fa-arrow-left text-[0.8rem]" />
      {label}
    </Link>
  )
}

export default BackHomeButton


