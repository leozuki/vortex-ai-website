'use client'

import { useState, useEffect, useRef } from 'react'
import { useLang } from '@/context/LangContext'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { DemoModal } from '@/components/ui/DemoModal'
import { VortexLogoMark } from '@/components/ui/VortexLogo'

const SOCIAL_PROOF = [
  { label: '9', sub: 'AI Products' },
  { label: '4+', sub: 'AI Models' },
  { label: '24/7', sub: 'Uptime' },
]

/* Unique animated icon for the CTA */
function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <polygon points="3,1.5 13,7 3,12.5" fill="currentColor" fillOpacity="0.9" />
    </svg>
  )
}

/* Orbital rings around the logo */
function OrbitalRings({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className="absolute inset-0 pointer-events-none">
      <defs>
        <linearGradient id="ring-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
          <stop offset="40%" stopColor="#6366f1" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ring-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
          <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Ring 1 */}
      <ellipse cx={size/2} cy={size/2} rx={size/2 - 4} ry={size/4}
        stroke="url(#ring-grad-1)" strokeWidth="0.8"
        style={{ animation: 'spin-slow 10s linear infinite', transformOrigin: 'center' }} />
      {/* Ring 2 — tilted */}
      <ellipse cx={size/2} cy={size/2} rx={size/2 - 16} ry={size/3}
        stroke="url(#ring-grad-2)" strokeWidth="0.6"
        style={{ animation: 'spin-rev 14s linear infinite', transformOrigin: 'center', transform: 'rotateX(55deg)' }} />
      {/* Orbit dots */}
      <circle r="3" fill="#818cf8" fillOpacity="0.8"
        style={{ offsetPath: `path('M ${size/2} ${size/2 - (size/2 - 4)} A ${size/2 - 4} ${size/4} 0 1 1 ${size/2 - 0.01} ${size/2 - (size/2 - 4)}')`, animation: 'border-beam 8s linear infinite', offsetDistance: '0%' } as React.CSSProperties} />
      <circle r="2" fill="#06b6d4" fillOpacity="0.7"
        style={{ offsetPath: `path('M ${size/2} ${size/2 - (size/2 - 16)} A ${size/2 - 16} ${size/3} 0 1 0 ${size/2 - 0.01} ${size/2 - (size/2 - 16)}')`, animation: 'border-beam 12s linear infinite reverse', offsetDistance: '0%' } as React.CSSProperties} />
    </svg>
  )
}

export function HeroSection() {
  const { t } = useLang()
  const [demoOpen, setDemoOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        id="hero"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center"
      >
        {/* ── Aurora mesh background ── */}
        <div className="pointer-events-none absolute inset-0" style={{ background: '#07070e' }} />

        {/* Aurora blob 1 — indigo */}
        <div
          className="aurora-1 pointer-events-none absolute"
          style={{
            width: 700, height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)',
            top: '5%', left: '30%',
            filter: 'blur(60px)',
          }}
        />
        {/* Aurora blob 2 — cyan */}
        <div
          className="aurora-2 pointer-events-none absolute"
          style={{
            width: 500, height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(99,102,241,0.06) 50%, transparent 70%)',
            top: '20%', right: '20%',
            filter: 'blur(70px)',
          }}
        />
        {/* Aurora blob 3 — violet bottom */}
        <div
          className="aurora-3 pointer-events-none absolute"
          style={{
            width: 600, height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 65%)',
            bottom: '-10%', left: '10%',
            filter: 'blur(80px)',
          }}
        />

        {/* Fine grid — angled */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          }}
        />

        {/* Radial vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 100% 70% at 50% 0%, rgba(99,102,241,0.14) 0%, transparent 60%)' }}
        />

        {/* ── Content ── */}
        <div
          className="relative z-10 max-w-5xl w-full"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'none' : 'translateY(32px)',
            transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Logo mark with orbital rings */}
          <div className="mb-8 flex justify-center">
            <div className="relative" style={{ width: 120, height: 120 }}>
              {/* Glow behind */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(99,102,241,0.45) 0%, transparent 65%)',
                  filter: 'blur(20px)',
                  transform: 'scale(1.4)',
                }}
              />
              {/* Orbital rings */}
              <OrbitalRings size={120} />
              {/* Logo centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <VortexLogoMark size={52} />
              </div>
            </div>
          </div>

          {/* Badge */}
          <div
            className="mb-6 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.08) 100%)',
              border: '1px solid rgba(99,102,241,0.28)',
              color: '#a5b4fc',
              boxShadow: '0 0 20px rgba(99,102,241,0.12)',
            }}
          >
            <span className="ping-dot text-indigo-400">
              <span className="bg-indigo-400 rounded-full" style={{ animation: 'pulse-ring 1.8s ease-out infinite' }} />
              <span className="bg-indigo-400" />
            </span>
            {t.hero.badge}
          </div>

          {/* Headline */}
          <h1 className="mb-6 font-black leading-[1.04] tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}>
            <AnimatedText
              phrases={t.hero.taglines}
              interval={3400}
              className="grad-text-aurora"
            />
          </h1>

          {/* Sub */}
          <p className="mx-auto mb-10 max-w-lg leading-relaxed text-zinc-400"
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.125rem)' }}>
            {t.hero.subheading}
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {/* Primary — animated border CTA */}
            <a
              href="#products"
              className="shimmer-btn group relative inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.03] active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                boxShadow: '0 0 30px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              {t.hero.ctaProducts}
              <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>

            {/* Secondary — glass button */}
            <button
              onClick={() => setDemoOpen(true)}
              className="group inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 0 20px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(99,102,241,0.4)'
                ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(99,102,241,0.08)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)'
                ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)'
              }}
            >
              <PlayIcon />
              {t.hero.ctaDemo}
            </button>
          </div>

          {/* Stats strip */}
          <div className="mt-16 flex items-center justify-center gap-0">
            {SOCIAL_PROOF.map((s, i) => (
              <div key={s.label} className="flex items-center">
                <div className="flex flex-col items-center px-8">
                  <span
                    className="text-3xl font-black"
                    style={{
                      background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {s.label}
                  </span>
                  <span className="mt-0.5 text-xs text-zinc-600 font-medium tracking-wide">{s.sub}</span>
                </div>
                {i < SOCIAL_PROOF.length - 1 && (
                  <div className="h-8 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)' }} />
                )}
              </div>
            ))}
            <div className="mx-8 h-8 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)' }} />
            <div className="text-xs text-left leading-relaxed" style={{ color: 'rgba(255,255,255,0.22)' }}>
              Production-ready.<br />Not prototypes.
            </div>
          </div>
        </div>

        {/* Scroll caret */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="h-12 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.25))' }} />
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className="animate-bounce">
            <path d="M1 1l5 5 5-5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </section>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  )
}
