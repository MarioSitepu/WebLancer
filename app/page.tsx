import { HeroSection } from '@/components/hero-section-9'
import Services from '@/components/services'
import Technology from '@/components/technology'
import Portfolio from '@/components/portofolio'
import Testimonials from '@/components/testimonials'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Services />
      <Technology />
      <Portfolio />
      <Testimonials />
    </div>
  )
}