"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"

const projects = [
  {
    id: "ecommerce",
    title: "Website E-Commerce",
    description: "Joki pembuatan website toko online dengan integrasi payment gateway dan manajemen produk.",
    tags: ["React", "Node.js", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    href: "#",
  },
  {
    id: "portfolio",
    title: "Website Portfolio",
    description: "Joki website portfolio dengan desain modern dan animasi yang menarik untuk showcase karya.",
    tags: ["Next.js", "Tailwind CSS", "Animation"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    href: "#",
  },
  {
    id: "dashboard",
    title: "Dashboard Admin",
    description: "Joki pembuatan dashboard admin dengan visualisasi data real-time dan manajemen user.",
    tags: ["React", "TypeScript", "Charts"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    href: "#",
  },
  {
    id: "mobile",
    title: "Aplikasi Mobile",
    description: "Joki aplikasi mobile dengan UI/UX yang user-friendly dan navigasi yang intuitif.",
    tags: ["Flutter", "React Native", "UI/UX"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    href: "#",
  },
  {
    id: "landing",
    title: "Landing Page",
    description: "Joki landing page dengan desain menarik, performa optimal, dan SEO friendly.",
    tags: ["Next.js", "Tailwind CSS", "SEO"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    href: "#",
  },
]

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Simple navigation
  const goToSlide = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const card = container.children[index] as HTMLElement
      card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
      setCurrentIndex(index)
    }
  }

  const nextSlide = () => {
    const next = (currentIndex + 1) % projects.length
    goToSlide(next)
  }

  const prevSlide = () => {
    const prev = (currentIndex - 1 + projects.length) % projects.length
    goToSlide(prev)
  }

  // Handle scroll to update current index
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollPosition = container.scrollLeft
      const cardWidth = container.offsetWidth
      const index = Math.round(scrollPosition / cardWidth)
      setCurrentIndex(index)
    }

    // Throttle scroll events untuk performa lebih baik
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    container.addEventListener("scroll", throttledScroll, { passive: true })
    return () => container.removeEventListener("scroll", throttledScroll)
  }, [])

  // Touch/Drag handlers (optional, hanya jika diperlukan)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <section id="portfolio" className="py-16 md:py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Proyek yang Telah Kami Selesaikan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Beberapa contoh proyek joki website dan aplikasi yang telah kami kerjakan dengan hasil memuaskan
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-2 rounded-md border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous project"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex === projects.length - 1}
            className="p-2 rounded-md border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next project"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center"
            >
              <a
                href={project.href}
                className="group block rounded-lg border border-border hover:border-primary transition-colors duration-300 overflow-hidden bg-card"
              >
                {/* Image with lazy loading */}
                <div className="relative overflow-hidden bg-muted h-64 sm:h-72">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-200 ${
                currentIndex === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
