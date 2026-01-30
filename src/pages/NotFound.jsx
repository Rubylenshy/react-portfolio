import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const NotFound = () => {
  return (
    <>
      <main
        className="min-h-[85vh] bg-[#030303] text-white px-6 pt-16 pb-20 md:pt-20 md:pb-24 flex flex-col items-center justify-center"
        data-scroll-animate
      >
        <div className="max-w-xl mx-auto w-full text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gray-500 mb-4">
            Error 404
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-4">
            Page not found
          </h1>
          <p className="text-secondary text-base leading-relaxed font-light mb-10">
            The route you’re looking for doesn’t exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-white border border-white/10 rounded-full px-5 py-3 hover:bg-white hover:text-black transition-colors"
          >
            <i className="fa-solid fa-arrow-left text-[0.8rem]" />
            Back Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default NotFound
