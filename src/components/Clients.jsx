import { useEffect, useRef } from 'react'
import '../assets/css/clients.css'

const Clients = () => {
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let animationId
    let scrollPosition = 0

    const scroll = () => {
      scrollPosition += 1
      scrollContainer.scrollLeft = scrollPosition

      // Reset to start when reaching the end for infinite scroll
      if (scrollPosition >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollPosition = 0
      }

      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationId)
  }, [])

  const clients = [
    { name: 'Agile System', src: '/images/clients/agile.png' },
    { name: 'Nestlify ', src: '/images/clients/nestlify.png' },
    { name: 'NISER', src: '/images/clients/niser.webp' },
    { name: 'Plugli', src: '/images/clients/plugli.png' },
    { name: 'Hive Africa', src: '/images/clients/hive.png' }
  ]

  // Duplicate clients for seamless infinite scroll
  const duplicatedClients = [...clients, ...clients, ...clients]

  return (
    <section className="clients-section">
      <div className="clients-container">
        <div className="clients-scroll" ref={scrollContainerRef}>
          <div className="clients-track">
            {duplicatedClients.map((client, index) => (
              <div key={index} className="client-logo">
                <img src={client.src} alt={client.name} title={client.name} width={50} height={50} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Clients
