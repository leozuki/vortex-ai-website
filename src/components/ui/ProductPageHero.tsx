'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

/* ─── Animated canvas background ────────────────────────── */
function StageCanvas({ color }: { color: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const blobs = Array.from({ length: 4 }, (_, i) => ({
      x: canvas.width * (0.2 + i * 0.22),
      y: canvas.height * (0.3 + (i % 2) * 0.35),
      r: 180 + i * 60,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.3,
      phase: i * Math.PI * 0.5,
    }))

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.3,
      a: Math.random() * 0.4 + 0.05,
    }))

    const hex = (alpha: number) => {
      const a = Math.round(alpha * 255).toString(16).padStart(2, '0')
      return color + a
    }

    let t = 0
    const draw = () => {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      t += 0.005

      blobs.forEach((b, i) => {
        b.x += Math.sin(t + b.phase) * 0.6 + b.vx
        b.y += Math.cos(t * 0.7 + b.phase) * 0.5 + b.vy
        if (b.x < -b.r) b.x = W + b.r
        if (b.x > W + b.r) b.x = -b.r
        if (b.y < -b.r) b.y = H + b.r
        if (b.y > H + b.r) b.y = -b.r

        const alpha = i === 0 ? 0.18 : 0.09
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        g.addColorStop(0, hex(alpha))
        g.addColorStop(1, hex(0))
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()
      })

      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = hex(p.a)
        ctx.fill()
      })

      const scanY = ((t * 60) % H)
      const sg = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80)
      sg.addColorStop(0, hex(0))
      sg.addColorStop(0.5, hex(0.04))
      sg.addColorStop(1, hex(0))
      ctx.fillStyle = sg
      ctx.fillRect(0, scanY - 80, W, 160)

      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [color])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.9 }} />
}

/* ─── Letter-by-letter reveal ────────────────────────────── */
function SplitReveal({ text, color, delay = 0 }: { text: string; color: string; delay?: number }) {
  const [go, setGo] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setGo(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    /*
     * overflow:hidden creates the "slide up from below" mask.
     * paddingBottom + negative marginBottom give room for descenders
     * so they aren't clipped by the tight line-height of the parent h1.
     */
    <span style={{
      display: 'inline-flex',
      overflow: 'hidden',
      paddingBottom: '0.18em',
      marginBottom: '-0.18em',
      verticalAlign: 'bottom',
    }}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: '105%', opacity: 0 }}
          animate={go ? { y: '0%', opacity: 1 } : {}}
          transition={{ duration: 0.65, delay: i * 0.045, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'inline-block',
            ...(ch === ' ' ? { width: '0.3em' } : {}),
            background: `linear-gradient(180deg, #fff 0%, ${color}cc 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  )
}

/* ─── Stat card ───────────────────────────────────────────── */
function HeroStat({ metric, label, color, delay }: {
  metric: string; label: string; color: string; delay: number
}) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <motion.div
      className="liquid-glass rounded-2xl p-5 flex flex-col gap-2 min-w-[130px]"
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      animate={show ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span style={{
        fontFamily: 'var(--font-serif), serif',
        fontStyle: 'italic',
        fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
        fontWeight: 400,
        lineHeight: 1.1,
        color,
        filter: `drop-shadow(0 0 12px ${color}60)`,
      }}>{metric}</span>
      <span style={{
        fontFamily: 'var(--font-barlow), sans-serif',
        fontSize: 11,
        fontWeight: 400,
        color: 'rgba(255,255,255,0.35)',
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
      }}>{label}</span>
    </motion.div>
  )
}

/* ─── ProductPageHero ─────────────────────────────────────── */
export interface ProductPageHeroProps {
  name: string
  category: string
  featured?: boolean
  tagline: string
  color: string
  stats: { metric: string; label: string }[]
  tech: string[]
  ctaLabel: string
  demoLabel: string
  backLabel: string
  eyebrowIcon?: React.ReactNode
}

export function ProductPageHero({
  name, category, featured, tagline, color,
  stats, tech, ctaLabel, demoLabel, backLabel, eyebrowIcon,
}: ProductPageHeroProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  const words = name.split(' ')
  const line1 = words[0] ?? ''
  const line2 = words.slice(1).join(' ')

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <section
      className="relative overflow-hidden flex flex-col"
      style={{ minHeight: '100svh', background: '#020208' }}
    >
      <StageCanvas color={color} />

      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

      {/* Corner accents */}
      {[
        { cls: 'top-0 left-0',    d: 'M0 64 L0 0 L64 0',       c: color },
        { cls: 'top-0 right-0',   d: 'M160 64 L160 0 L96 0',   c: color },
        { cls: 'bottom-0 left-0', d: 'M0 96 L0 160 L64 160',   c: 'rgba(6,182,212,0.5)' },
        { cls: 'bottom-0 right-0',d: 'M160 96 L160 160 L96 160',c: 'rgba(6,182,212,0.5)' },
      ].map((a, i) => (
        <svg key={i} className={`absolute ${a.cls} pointer-events-none z-10`}
          width="160" height="160" viewBox="0 0 160 160" fill="none"
          style={{ opacity: mounted ? 0.5 : 0, transition: 'opacity 1s ease 1.2s' }}>
          <path d={a.d} stroke={a.c} strokeWidth="1" />
        </svg>
      ))}

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{ height: 1, background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 px-6 md:px-16 lg:px-20 pt-28 pb-12">

        {/* Kicker row */}
        <motion.div
          className="flex items-center justify-between mb-auto"
          initial={{ opacity: 0, y: -12 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease }}
        >
          <Link href="/#products"
            className="inline-flex items-center gap-2 text-xs font-medium transition-colors hover:text-white/70"
            style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-barlow), sans-serif' }}>
            <ArrowLeft size={11} />
            {backLabel}
          </Link>

          <span
            className="liquid-glass inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ color, fontFamily: 'var(--font-barlow), sans-serif' }}>
            {eyebrowIcon}
            {category}
            {featured && <span style={{ opacity: 0.45 }}>· Flagship</span>}
          </span>
        </motion.div>

        {/* Main editorial area */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12 mt-16 md:mt-0">

          {/* Left: big name */}
          <div className="flex-1 min-w-0">

            {/* Inline category kicker */}
            <motion.p
              className="mb-4 text-sm font-medium"
              style={{ color: `${color}90`, fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '0.06em' }}
              initial={{ opacity: 0 }}
              animate={mounted ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.25, ease }}
            >
              // {category}
            </motion.p>

            {/*
             * Product name — letter by letter.
             * NO overflow:hidden on h1 (would clip the animated letters).
             * lineHeight: 1 gives enough room; SplitReveal handles its own clip mask.
             */}
            <h1 style={{
              fontFamily: 'var(--font-serif), serif',
              fontStyle: 'italic',
              fontWeight: 900,
              fontSize: 'clamp(3.2rem, 9vw, 8.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              margin: 0,
              padding: 0,
            }}>
              <div style={{ overflow: 'visible' }}>
                <SplitReveal text={line1} color={color} delay={350} />
              </div>
              {line2 && (
                <div style={{ overflow: 'visible' }}>
                  <SplitReveal text={line2} color={color} delay={500} />
                </div>
              )}
            </h1>

            {/* Tagline */}
            <motion.p
              className="mt-6 max-w-md"
              style={{
                fontFamily: 'var(--font-barlow), sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.7,
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.75, ease }}
            >
              {tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9, ease }}
            >
              <a href="/#contact"
                className="liquid-glass-strong inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
                style={{ fontFamily: 'var(--font-barlow), sans-serif', boxShadow: `0 0 28px ${color}30` }}>
                {ctaLabel}
                <ArrowUpRight size={14} />
              </a>
              <a href="/#contact"
                className="liquid-glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-white/35 transition-all hover:text-white/65"
                style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>
                {demoLabel}
              </a>
            </motion.div>

            {/* Tech chips */}
            <motion.div
              className="mt-5 flex flex-wrap gap-1.5"
              initial={{ opacity: 0 }}
              animate={mounted ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.05, ease }}
            >
              {tech.map(t => (
                <span key={t} className="liquid-glass rounded-full px-3 py-1 text-[10px] font-mono text-white/25">
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: stat cards */}
          <div className="flex md:flex-col gap-3 flex-wrap md:flex-nowrap shrink-0">
            {stats.map((s, i) => (
              <HeroStat key={i} metric={s.metric} label={s.label} color={color} delay={800 + i * 120} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        style={{ opacity: mounted ? 0.25 : 0, transition: 'opacity 1s ease 1.6s' }}>
        <div className="h-8 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.5))' }} />
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="animate-bounce">
          <path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  )
}
