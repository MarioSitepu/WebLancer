"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration and inventory management.",
    tags: ["React", "Node.js", "PostgreSQL"],
    image: "/modern-ecommerce-website.png",
  },
  {
    title: "Portfolio Website",
    description: "Clean, minimalist portfolio showcasing creative work with smooth animations.",
    tags: ["Next.js", "Tailwind CSS", "Animation"],
    image: "/creative-portfolio-design.png",
  },
  {
    title: "SaaS Dashboard",
    description: "Analytics dashboard with real-time data visualization and user management.",
    tags: ["React", "TypeScript", "Charts"],
    image: "/modern-dashboard-analytics.jpg",
  },
  {
    title: "Mobile App Design",
    description: "User-friendly mobile application interface with intuitive navigation patterns.",
    tags: ["Mobile Design", "UI/UX", "Prototyping"],
    image: "/mobile-app-interface.png",
  },
]

export default function Portfolio() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0", 10)
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1 },
    )

    const items = sectionRef.current?.querySelectorAll("[data-index]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">Selected Work</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            A selection of recent projects that showcase my skills and approach to design and development
          </p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              data-index={index}
              className={`group overflow-hidden rounded-lg border border-border hover:border-primary transition-all duration-500 ${
                visibleItems.includes(index) ? "opacity-100" : "opacity-0"
              }`}
              style={{
                animation: visibleItems.includes(index) ? `fadeIn 0.8s ease-out ${index * 0.1}s forwards` : "none",
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-card h-64 sm:h-72">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ExternalLink className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-sm font-medium hover:bg-primary/5 transition-all duration-300 transform hover:scale-105"
          >
            View All Projects
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
