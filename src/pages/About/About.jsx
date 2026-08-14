import Navigation from '../../shared/components/Navigation'
import Footer from '../../shared/components/Footer'
import Contact from '../../shared/components/Contact'
import AboutIntro from '../../shared/components/AboutIntro'
import SEOHead from '../../shared/components/SEOHead'
import ProjectCollage from './components/ProjectCollage'
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
                <AboutIntro />
                <ProjectCollage />
                <SkillsChart />
                <ExperienceTimeline />
                <Contact />
            </div>
            <Footer />
        </>
    )
}

export default About
