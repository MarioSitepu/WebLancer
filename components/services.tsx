"use client"

import { useEffect, useRef, useState } from "react"
import { Code, Palette, Smartphone, Zap } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Modern, scalable web applications built with cutting-edge technologies and best practices.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces designed with user experience and accessibility in mind.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Perfect performance across all devices. Mobile-first approach for optimal user experience.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Lightning-fast websites optimized for speed, SEO, and user engagement metrics.",
  },
]

export default function Services() {
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
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">What I Offer</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">Services & Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Comprehensive digital solutions tailored to your business needs and goals
          </p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            const isVisible = visibleItems.includes(index)

            return (
              <div
                key={index}
                data-index={index}
                className={`p-8 border border-border rounded-lg group hover:border-primary transition-all duration-500 transform hover:-translate-y-2 hover:shadow-lg ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  animation: isVisible ? `fadeIn 0.8s ease-out ${index * 0.1}s forwards` : "none",
                }}
              >
                <Icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
