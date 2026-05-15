'use client'

import { useState, useEffect } from 'react'
import { ArrowDown } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { DemoModal } from '@/components/ui/DemoModal'
import { VortexLogoMark } from '@/components/ui/VortexLogo'

const SOCIAL_PROOF = [
  { label: '9', sub: 'AI Products' },
  { label: '4+', sub: 'AI Models' },
  { label: '24/7', sub: 'Uptime' },
]

export function HeroSection() {
  const { t } = useLang()
  const [demoOpen, setDemoOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">

        {/* ── Background layers ── */}
        <div className="pointer-events-none absolute inset-0" style={{ background: '#09090f' }} />

        {/* Top glow */}
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(99,102,241,0.22) 0%, transparent 65%)' }} />

        {/* Bottom ambient */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-96"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 110%, rgba(139,92,246,0.08) 0%, transparent 60%)' }} />

        {/* Fine dot grid */}
        <div className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 100%)',
          }} />

        {/* Left / right glow orbs */}
        <div className="pointer-events-none absolute left-1/4 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
          style={{ background: 'rgba(99,102,241,0.07)' }} />
        <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full blur-[100px]"
          style={{ background: 'rgba(139,92,246,0.05)' }} />

        {/* ── Content ── */}
        <div
          className="relative z-10 max-w-4xl"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Logo mark — hero size */}
          <div className="mb-7 flex justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{ background: 'rgba(99,102,241,0.35)', transform: 'scale(1.6)' }}
              />
              <VortexLogoMark size={64} className="relative" />
            </div>
          </div>

          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
            style={{ borderColor: 'rgba(99,102,241,0.35)', background: 'rgba(99,102,241,0.1)', color: '#a5b4fc' }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400" />
            </span>
            {t.hero.badge}
          </div>

          {/* Headline */}
          <h1 className="mb-5 text-5xl font-black leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
            <AnimatedText
              phrases={t.hero.taglines}
              interval={3400}
              className="bg-gradient-to-br from-white via-indigo-200 to-violet-300 bg-clip-text text-transparent"
            />
          </h1>

          {/* Sub */}
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            {t.hero.subheading}
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#products"
              className="group inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-xl active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 0 24px rgba(99,102,241,0.35)',
              }}
            >
              {t.hero.ctaProducts}
              <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <button
              onClick={() => setDemoOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/[0.08] hover:border-white/20 active:scale-95"
            >
              {t.hero.ctaDemo}
            </button>
          </div>

          {/* Social proof strip */}
          <div className="mt-12 flex items-center justify-center gap-8">
            {SOCIAL_PROOF.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-2xl font-black text-white">{s.label}</span>
                <span className="text-xs text-zinc-600">{s.sub}</span>
              </div>
            ))}
            <div className="h-8 w-px bg-white/[0.06]" />
            <div className="text-xs leading-snug text-zinc-600 text-left max-w-[120px]">
              Production-ready.<br />Not demos.
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="h-10 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />
          <ArrowDown size={13} className="animate-bounce text-zinc-700" />
        </div>
      </section>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  )
}
