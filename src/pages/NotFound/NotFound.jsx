import { ArrowLeft } from 'lucide-react'
import Navigation from '../../shared/components/Navigation'
import Footer from '../../shared/components/Footer'
import Pill from '../../shared/components/Pill'

const NotFound = () => {
  return (
    <>
      <Navigation />

      <main
        id="main"
        className="relative min-h-[85vh] px-4 md:px-10 pt-32 pb-20 md:pt-40 md:pb-24 flex flex-col items-center justify-center max-w-[1400px] mx-auto grid-frame overflow-hidden"
      >
        <p
          aria-hidden="true"
          className="ghost-text absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[42vw] xl:text-[520px]"
        >
          404
        </p>

        <div className="relative max-w-xl mx-auto w-full text-center" data-reveal-group>
          <p className="eyebrow justify-center">
            <span className="eyebrow-num">404</span>
            <span aria-hidden="true">—</span>
            <span>Error 404</span>
          </p>
          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-display leading-[0.95] text-primary">
            Page not found
          </h1>
          <p className="mt-6 text-muted text-base leading-relaxed">
            The route you’re looking for doesn’t exist or has been moved.
          </p>
          <div className="mt-10">
            <Pill variant="invert" to="/">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back Home
            </Pill>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default NotFound
