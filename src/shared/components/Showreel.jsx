import { useEffect, useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'

// Full-width rounded media panel with a looping showreel. The lime "View Showreel"
// pill opens it fullscreen with sound; the round button toggles playback.
// Autoplay is skipped under prefers-reduced-motion.
const Showreel = ({ src, className = '', parallax = false }) => {
    const videoRef = useRef(null)
    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!reduce) video.play().catch(() => {})

        const onPlay = () => setPlaying(true)
        const onPause = () => setPlaying(false)
        const onFullscreenChange = () => {
            if (!document.fullscreenElement) {
                video.muted = true
                video.controls = false
            }
        }
        video.addEventListener('play', onPlay)
        video.addEventListener('pause', onPause)
        document.addEventListener('fullscreenchange', onFullscreenChange)
        return () => {
            video.removeEventListener('play', onPlay)
            video.removeEventListener('pause', onPause)
            document.removeEventListener('fullscreenchange', onFullscreenChange)
        }
    }, [])

    const togglePlay = () => {
        const video = videoRef.current
        if (!video) return
        if (video.paused) video.play().catch(() => {})
        else video.pause()
    }

    const openFullscreen = () => {
        const video = videoRef.current
        if (!video) return
        video.muted = false
        video.controls = true
        video.currentTime = 0
        video.play().catch(() => {})
        video.requestFullscreen?.().catch(() => {})
    }

    return (
        <div className={`media relative aspect-[16/10] md:aspect-[21/9] ${className}`}>
            <div className="absolute inset-0" {...(parallax && { 'data-parallax': '6' })}>
                <video
                    ref={videoRef}
                    src={src}
                    title="Showreel"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-[112%] -top-[6%] object-cover"
                />
            </div>

            {/* Bottom scrim keeps the controls legible over any frame */}
            <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"
            />

            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex items-center gap-2">
                <button type="button" onClick={openFullscreen} className="pill pill-signal pill-sm magnetic-btn">
                    View Showreel
                </button>
                <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={playing ? 'Pause showreel' : 'Play showreel'}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-black hover:opacity-85 transition-opacity"
                >
                    {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-px" />}
                </button>
            </div>
        </div>
    )
}

export default Showreel
