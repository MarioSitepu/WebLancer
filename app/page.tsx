import { HeroSection } from '@/components/hero-section-9'
import OrderNow from '@/components/ordernow'
import Services from '@/components/services'
import Technology from '@/components/technology'
import Portfolio from '@/components/portofolio'
import Testimonials from '@/components/testimonials'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <OrderNow />
      <Services />
      <Technology />
      <Portfolio />
      <Testimonials />
      <Footer />
    </div>
  )
}