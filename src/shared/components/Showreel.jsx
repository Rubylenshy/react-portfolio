const Showreel = ({ src }) => {
    return (
        <section className="max-w-[1400px] mx-auto grid-frame bg-[var(--color-bg)] border-t border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6 md:px-14 py-16">
            <div className="relative">
                <span className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-[var(--color-border-strong)]" />
                <span className="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-[var(--color-border-strong)]" />
                <span className="absolute -bottom-3 -left-3 w-6 h-6 border-b border-l border-[var(--color-border-strong)]" />
                <span className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-[var(--color-border-strong)]" />

                <div className="border border-[var(--color-border)] rounded-sm bg-[var(--color-bg)] p-4 md:p-6">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-[var(--color-border-strong)] shadow-lg">
                        <video
                            src={src}
                            title="Showreel"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
        </section>
    )
}

export default Showreel
