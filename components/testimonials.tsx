"use client"

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, Tech Startup",
    content:
      "Exceptional work and attention to detail. The freelancer transformed our vision into reality with a beautiful, functional website that exceeded all expectations.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Marketing Director",
    content:
      "Professional, responsive, and incredibly talented. The design is modern and the development is solid. Highly recommended for any digital project.",
    rating: 5,
  },
  {
    name: "Emma Williams",
    role: "Product Manager",
    content:
      "Great communication throughout the project. The final product was delivered on time and is performing beautifully. Would definitely work together again.",
    rating: 5,
  },
]

export default function Testimonials() {
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
      { threshold: 0.2 },
    )

    const items = sectionRef.current?.querySelectorAll("[data-index]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">Social Proof</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">Client Testimonials</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            What my clients say about working together
          </p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              data-index={index}
              className={`p-8 border border-border rounded-lg bg-background hover:border-primary transition-all duration-500 transform hover:-translate-y-2 ${
                visibleItems.includes(index) ? "opacity-100" : "opacity-0"
              }`}
              style={{
                animation: visibleItems.includes(index) ? `fadeIn 0.8s ease-out ${index * 0.1}s forwards` : "none",
              }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>

              {/* Author */}
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
