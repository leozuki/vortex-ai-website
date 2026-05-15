import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsBar } from '@/components/sections/StatsBar'
import { TechTicker } from '@/components/sections/TechTicker'
import { ProductsGrid } from '@/components/sections/ProductsGrid'
import { SolutionsSection } from '@/components/sections/SolutionsSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: '#09090f' }}>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsBar />
        <TechTicker />
        <ProductsGrid />
        <SolutionsSection />
        <HowItWorksSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
