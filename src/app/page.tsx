'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProductsGrid } from '@/components/sections/ProductsGrid'
import { SolutionsSection } from '@/components/sections/SolutionsSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { WelcomeLoader } from '@/components/ui/WelcomeLoader'
import { AuroraCanvas } from '@/components/ui/AuroraCanvas'
import { ConnectedNodeCanvas } from '@/components/ui/ConnectedNodeCanvas'
import { GlobalMascots } from '@/components/ui/GlobalMascots'
import Lenis from 'lenis'

const SECTIONS = [
  { id: 'hero', label: '01 // CORE', startProgress: 0.0 },
  { id: 'products', label: '02 // FLEET', startProgress: 0.30 },
  { id: 'solutions', label: '03 // SOLUTIONS', startProgress: 0.55 },
  { id: 'how-it-works', label: '04 // SYSTEM', startProgress: 0.78 },
  { id: 'contact', label: '05 // CONTACT', startProgress: 0.95 },
]

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 45, damping: 22, mass: 0.8 })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!loaded) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [loaded])

  // Track active section based on scroll progress thresholds
  useEffect(() => {
    if (!loaded) return

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.18) {
        setActiveSection('hero')
      } else if (latest < 0.44) {
        setActiveSection('products')
      } else if (latest < 0.68) {
        setActiveSection('solutions')
      } else if (latest < 0.90) {
        setActiveSection('how-it-works')
      } else {
        setActiveSection('contact')
      }
    })

    return () => unsubscribe()
  }, [loaded, scrollYProgress])

  const handleHUDClick = (startProgress: number) => {
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = window.innerHeight
    const targetScrollY = startProgress * (scrollHeight - clientHeight)
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' })
  }

  return (
    <AnimatePresence mode="wait">
      {!loaded ? (
        <WelcomeLoader key="loader" onComplete={() => setLoaded(true)} />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex min-h-screen flex-col overflow-x-hidden relative"
          style={{ background: '#020208' }}
        >
          {/* Ambient space canvas background */}
          <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <AuroraCanvas smoothProgress={smoothProgress} isMobile={isMobile} />
            <div className="absolute inset-0 z-1 pointer-events-auto">
              <ConnectedNodeCanvas />
            </div>
            <div className="absolute inset-0 bg-radial-[ellipse_80%_80%_at_50%_50%,transparent_30%,#020208_95%] pointer-events-none z-2" />
          </div>

          <Navbar />

          {/* Clean Vertical Flow Page */}
          <main className="flex-1 relative z-10 flex flex-col w-full">
            <div id="hero" className="relative z-10 w-full">
              <HeroSection />
            </div>
            
            <div id="products" className="relative z-20 w-full">
              <ProductsGrid />
            </div>

            <div id="solutions" className="relative z-30 w-full">
              <SolutionsSection />
            </div>

            <div id="how-it-works" className="relative z-40 w-full">
              <HowItWorksSection />
            </div>

            <div id="contact" className="relative z-50 w-full">
              <ContactSection />
            </div>

            <Footer />
          </main>

          {/* Global Mascot Controller Chat Widget */}
          <GlobalMascots scrollProgress={smoothProgress} isMobile={isMobile} />

          {/* Clean Floating Sidebar Scroll Indicator */}
          {!isMobile && (
            <div className="scroll-index-hud">
              {SECTIONS.map((s) => (
                <div
                  key={s.id}
                  className={`scroll-index-item ${activeSection === s.id ? 'active' : ''}`}
                  onClick={() => handleHUDClick(s.startProgress)}
                >
                  <span className="scroll-index-dot" />
                  <span className="hidden lg:inline">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
