'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { LangToggle } from '@/components/ui/LangToggle'
import { DemoModal } from '@/components/ui/DemoModal'
import { VortexLogoMark, VortexWordmark } from '@/components/ui/VortexLogo'

export function Navbar() {
  const { t, lang } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const links = [
    { label: t.nav.home, href: '/#hero' },
    { label: t.nav.products, href: '/#products' },
    { label: lang === 'vi' ? 'Giải pháp' : 'Solutions', href: '/#solutions' },
    { label: lang === 'vi' ? 'Tài nguyên AI' : 'AI Resources', href: '/resources' },
    { label: t.nav.contact, href: '/#contact' },
  ]

  return (
    <>
      <nav
        className="fixed inset-x-0 z-50 transition-all duration-500"
        style={{
          top: 16,
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'none' : 'translateY(-8px)',
          paddingLeft: 'clamp(16px, 4vw, 40px)',
          paddingRight: 'clamp(16px, 4vw, 40px)',
        }}
      >
        <div className="flex items-center justify-between">

          {/* Left — logo circle */}
          <a
            href="/"
            className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full transition-all hover:scale-105"
          >
            <VortexLogoMark size={28} />
          </a>

          {/* Center — pill nav (desktop) */}
          <div className="hidden md:flex items-center">
            <div className="liquid-glass flex items-center rounded-full px-1.5 py-1.5">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-white/80 transition-all hover:text-white hover:bg-white/[0.06]"
                  style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
                >
                  {l.label}
                </a>
              ))}
              <div className="mx-1 h-5 w-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <LangToggle />
              <button
                onClick={() => setDemoOpen(true)}
                className="ml-1 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-all hover:bg-white/90 hover:scale-105"
                style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
              >
                {t.nav.requestDemo}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right — wordmark (desktop) */}
          <div className="hidden md:flex h-12 w-12 items-center justify-end">
            <VortexWordmark size={15} />
          </div>

          {/* Mobile hamburger */}
          <button
            className="liquid-glass md:hidden flex h-11 w-11 items-center justify-center rounded-full text-white/70 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="liquid-glass-strong md:hidden mt-3 rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="px-4 py-3 space-y-0.5">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.05] transition-all"
                  style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
                >
                  {l.label}
                </a>
              ))}
              <div className="pt-2 border-t flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <LangToggle />
                <button
                  onClick={() => { setDemoOpen(true); setMenuOpen(false) }}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
                  style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
                >
                  {t.nav.requestDemo}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  )
}
