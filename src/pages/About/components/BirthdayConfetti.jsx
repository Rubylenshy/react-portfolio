import { useEffect } from 'react'
import confetti from 'canvas-confetti'

const BIRTHDAY_MONTH = 7 // August (0-indexed)
const BIRTHDAY_DAY = 27
const DURATION_MS = 15000
const BURST_INTERVAL_MS = 300

export const isBirthdayToday = () => {
    const now = new Date()
    return now.getMonth() === BIRTHDAY_MONTH && now.getDate() === BIRTHDAY_DAY
}

const BirthdayConfetti = () => {
    useEffect(() => {
        if (!isBirthdayToday()) return
        if (window.__birthdayConfettiPlayed) return
        window.__birthdayConfettiPlayed = true

        const end = Date.now() + DURATION_MS

        const fire = () => {
            confetti({
                particleCount: 40,
                spread: 70,
                startVelocity: 45,
                origin: {
                    x: Math.random(),
                    y: Math.random() * 0.3,
                },
                zIndex: 9999,
            })

            if (Date.now() < end) {
                setTimeout(fire, BURST_INTERVAL_MS)
            }
        }

        fire()
    }, [])

    return null
}

export default BirthdayConfetti
