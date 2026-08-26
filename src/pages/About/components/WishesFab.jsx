import { useState } from 'react'
import { Gift } from 'lucide-react'
import { isBirthdayToday } from './BirthdayConfetti'
import WishesModal from './WishesModal'

const WishesFab = () => {
    const [isOpen, setIsOpen] = useState(false)

    if (!isBirthdayToday()) return null

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Send a birthday wish"
                className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 w-14 h-14 flex items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-inverse)] border border-[var(--color-border)] shadow-lg hover:opacity-90 transition-opacity magnetic-btn animate-wishes-pulse"
            >
                <Gift className="w-6 h-6" />
            </button>
            <WishesModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
}

export default WishesFab
