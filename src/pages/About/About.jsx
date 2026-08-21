import Navigation from '../../shared/components/Navigation'
import Footer from '../../shared/components/Footer'
import Contact from '../../shared/components/Contact'
import AboutIntro from '../../shared/components/AboutIntro'
import SEOHead from '../../shared/components/SEOHead'
import Showreel from '../../shared/components/Showreel'
import ShadowHeading from '../../shared/components/ShadowHeading'
import SkillsChart from './components/SkillsChart'
import ExperienceTimeline from './components/ExperienceTimeline'

const About = () => {
    return (
        <>
            <SEOHead
                title="About"
                description="Reuben Oluwafemi is a Design & Frontend Engineer specializing in WordPress plugin architecture and modern frontend engineering. Learn about his background, skills, and experience."
                canonical="https://www.usereuben.com/about"
            />
            <Navigation />
            <div className="pt-24 md:pt-28">
                <section className="max-w-[1400px] mx-auto px-6 pt-4 pb-12 text-center grid-frame">
                    <ShadowHeading
                        as="h1"
                        offset={4}
                        className="text-5xl md:text-6xl font-bold tracking-tighter text-[var(--color-text-primary)] mb-4"
                    >
                        A bit about Reuben Oluwafemi
                    </ShadowHeading>
                    <p className="text-base md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                        Lately I'm most curious about using AI to turn ten keystrokes into one — automating the small friction out of everyday work.
                    </p>
                </section>
                <AboutIntro />
                <Showreel src="/videos/usereuben_showcase.mp4" />
                <SkillsChart />
                <ExperienceTimeline />
                <Contact />
            </div>
            <Footer />
        </>
    )
}

export default About
