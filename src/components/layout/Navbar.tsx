'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { LangToggle } from '@/components/ui/LangToggle'
import { DemoModal } from '@/components/ui/DemoModal'
import { VortexLogoMark, VortexWordmark } from '@/components/ui/VortexLogo'
import { clsx } from 'clsx'

export function Navbar() {
  const { t, lang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
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
      <nav className={clsx(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled ? 'border-b border-white/[0.06] bg-[#09090f]/85 backdrop-blur-xl' : 'bg-transparent'
      )}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <a href="/" className="flex items-center gap-2.5">
            <VortexLogoMark size={34} />
            <VortexWordmark size={18} />
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href}
                className="text-sm text-zinc-400 transition-colors hover:text-white">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <LangToggle />
            <button onClick={() => setDemoOpen(true)}
              className="shimmer-btn rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 16px rgba(99,102,241,0.25)' }}>
              {t.nav.requestDemo}
            </button>
          </div>

          <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/[0.06] bg-[#09090f]/95 px-5 py-4 space-y-2 backdrop-blur-xl">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="block py-2 text-sm text-zinc-300 hover:text-white">
                {l.label}
              </a>
            ))}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
              <LangToggle />
              <button onClick={() => { setDemoOpen(true); setMenuOpen(false) }}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                {t.nav.requestDemo}
              </button>
            </div>
          </div>
        )}
      </nav>
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  )
}
