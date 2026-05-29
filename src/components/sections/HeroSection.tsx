'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useTransform, MotionValue } from 'framer-motion'
import { useLang } from '@/context/LangContext'
import { DemoModal } from '@/components/ui/DemoModal'

/* ─────────────────────────────────────────────────────────────
   FadingVideo — rAF crossfade
───────────────────────────────────────────────────────────── */
const FADE_MS = 500
const FADE_OUT_LEAD = 0.55

function FadingVideo({ src, className, style }: {
  src: string; className?: string; style?: React.CSSProperties
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number>(0)
  const fadingOutRef = useRef(false)

  const fadeTo = useCallback((target: number, durationMs: number) => {
    cancelAnimationFrame(rafRef.current)
    const video = videoRef.current
    if (!video) return
    const start = performance.now()
    const from = parseFloat(video.style.opacity || '0')
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1)
      video.style.opacity = String(from + (target - from) * t)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onLoaded = () => { video.style.opacity = '0'; video.play().catch(() => {}); fadeTo(1, FADE_MS) }
    const onTimeUpdate = () => {
      const rem = video.duration - video.currentTime
      if (!fadingOutRef.current && rem <= FADE_OUT_LEAD && rem > 0) { fadingOutRef.current = true; fadeTo(0, FADE_MS) }
    }
    const onEnded = () => {
      video.style.opacity = '0'
      setTimeout(() => { video.currentTime = 0; video.play().catch(() => {}); fadingOutRef.current = false; fadeTo(1, FADE_MS) }, 100)
    }
    video.addEventListener('loadeddata', onLoaded)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended', onEnded)
    return () => { cancelAnimationFrame(rafRef.current); video.removeEventListener('loadeddata', onLoaded); video.removeEventListener('timeupdate', onTimeUpdate); video.removeEventListener('ended', onEnded) }
  }, [fadeTo])

  return <video ref={videoRef} src={src} autoPlay muted playsInline preload="auto" className={className} style={{ ...style, opacity: 0 }} />
}

/* ─────────────────────────────────────────────────────────────
   AuroraCanvas — floating color orbs
───────────────────────────────────────────────────────────── */
function AuroraCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const orbs = [
      { x: 0.35, y: 0.25, r: 0.38, color: '#6366f1', phase: 0, speed: 0.0004 },
      { x: 0.65, y: 0.35, r: 0.30, color: '#8b5cf6', phase: 1.2, speed: 0.0005 },
      { x: 0.50, y: 0.60, r: 0.32, color: '#06b6d4', phase: 2.5, speed: 0.0003 },
      { x: 0.20, y: 0.55, r: 0.22, color: '#c084fc', phase: 3.8, speed: 0.0006 },
    ]

    let t = 0
    const draw = () => {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      t++

      orbs.forEach(o => {
        const x = (o.x + Math.sin(t * o.speed + o.phase) * 0.08) * W
        const y = (o.y + Math.cos(t * o.speed * 0.7 + o.phase) * 0.06) * H
        const r = o.r * Math.min(W, H)

        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, o.color + '28')
        g.addColorStop(0.5, o.color + '10')
        g.addColorStop(1, o.color + '00')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />
}

/* ─────────────────────────────────────────────────────────────
   Particles — subtle floating dots
───────────────────────────────────────────────────────────── */
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r: Math.random() * 1.3 + 0.4,
      a: Math.random() * 0.25 + 0.05,
    }))

    const draw = () => {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.a})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none z-[2]" />
}

/* ─────────────────────────────────────────────────────────────
   ShimmerText — "SOLAI" with animated gradient sweep
───────────────────────────────────────────────────────────── */
function ShimmerText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'block',
      fontFamily: 'var(--font-serif), serif',
      fontStyle: 'italic',
      fontWeight: 900,
      fontSize: 'clamp(5.5rem, 15vw, 14rem)',
      lineHeight: 1,
      letterSpacing: '-0.04em',
      whiteSpace: 'nowrap',
      background: 'linear-gradient(105deg, #fff 0%, #c7d2fe 18%, #818cf8 32%, #fff 44%, #c084fc 58%, #67e8f9 72%, #fff 82%, #a5b4fc 100%)',
      backgroundSize: '250% 100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'shimmer 5s linear infinite',
    }}>
      {children}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────
   TaglineCycler — cycles through taglines with blur+fade
───────────────────────────────────────────────────────────── */
function TaglineCycler({ lines }: { lines: string[] }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % lines.length), 3800)
    return () => clearInterval(t)
  }, [lines.length])

  return (
    <div style={{ position: 'relative', height: '4.2em', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, filter: 'blur(8px)', y: 18 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          exit={{ opacity: 0, filter: 'blur(8px)', y: -18 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            fontFamily: 'var(--font-barlow), sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(0.95rem, 1.6vw, 1.25rem)',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.35,
          }}
        >
          {lines[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   CountUp stat
───────────────────────────────────────────────────────────── */
function CountUp({ target, color }: { target: string; color: string }) {
  const [val, setVal] = useState('0')
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const m = target.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/)
    if (!m) { setVal(target); return }
    const [, pre, raw, suf] = m
    const num = parseFloat(raw)
    const start = performance.now()
    const dur = 1100
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      const v = Number.isInteger(num) ? Math.round(e * num) : (e * num).toFixed(1)
      setVal(pre + v + suf)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, target])

  return (
    <div ref={ref} style={{
      fontFamily: 'var(--font-serif), serif',
      fontStyle: 'italic',
      fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
      fontWeight: 400,
      lineHeight: 1,
      color,
      filter: `drop-shadow(0 0 18px ${color}55)`,
    }}>{val}</div>
  )
}

/* ─────────────────────────────────────────────────────────────
   HeroSection
───────────────────────────────────────────────────────────── */
export function HeroSection() {
  const { t, lang } = useLang()
  const [demoOpen, setDemoOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(timer)
  }, [])

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 22, filter: 'blur(10px)' },
    animate: mounted ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {},
    transition: { duration: 0.75, delay, ease },
  })

  const STATS = [
    { n: '9', label: lang === 'vi' ? 'Sản phẩm live' : 'Live products', color: '#818cf8' },
    { n: '11+', label: lang === 'vi' ? 'Công cụ AI' : 'AI tools', color: '#c084fc' },
    { n: '24/7', label: lang === 'vi' ? 'Hoạt động liên tục' : 'Always running', color: '#67e8f9' },
  ]

  const INTEGRATIONS = ['HubSpot', 'Google', 'Facebook', 'Claude AI', 'Gemini', 'Cron', 'Zapier', 'BigQuery']

  const sectionStyle = { minHeight: '100svh', background: '#020208' }

  const sectionContent = (
    <section id="hero" className="relative overflow-hidden" style={sectionStyle}>

        {/* ── Video BG ── */}
        <FadingVideo
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
        />

        {/* ── Dark overlay ── */}
        <div className="absolute inset-0 z-[0] pointer-events-none" style={{ background: 'rgba(2,2,8,0.55)' }} />

        {/* ── Aurora orbs ── */}
        <AuroraCanvas />

        {/* ── Particles ── */}
        <ParticleCanvas />

        {/* ── Dot grid ── */}
        <div className="absolute inset-0 pointer-events-none z-[2] opacity-[0.018]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

        {/* ── Bottom gradient fade ── */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-[3]"
          style={{ background: 'linear-gradient(to top, #020208, transparent)' }} />

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col" style={{ minHeight: '100svh' }}>

          {/* ════ DESKTOP ════ */}
          <div className="hidden md:flex flex-col flex-1">

            {/* SOLAI — center stage */}
            <motion.div
              className="mx-auto mt-[10vh] text-center"
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(16px)' }}
              animate={mounted ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1.1, delay: 0.15, ease }}
            >
              <ShimmerText>SOLAI</ShimmerText>
            </motion.div>

            {/* Divider line under SOLAI */}
            <motion.div
              className="mx-auto mt-6"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={mounted ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.7, ease }}
              style={{ width: 'clamp(200px, 35vw, 520px)', height: 1, background: 'linear-gradient(90deg, transparent, rgba(165,180,252,0.5), transparent)', transformOrigin: 'center' }}
            />

            {/* Badge */}
            <motion.div className="mx-auto mt-5" {...fadeIn(0.8)}>
              <div className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
                <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
                  {t.hero.badge}
                </span>
              </div>
            </motion.div>

            {/* Tagline cycler */}
            <motion.div className="mx-auto mt-8 text-center" style={{ maxWidth: '42rem', padding: '0 2rem' }} {...fadeIn(0.95)}>
              <TaglineCycler lines={t.hero.taglines} />
            </motion.div>

            {/* Sub-description */}
            <motion.p
              className="mx-auto mt-5 text-center"
              style={{
                fontFamily: 'var(--font-barlow), sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)',
                color: 'rgba(255,255,255,0.35)',
                lineHeight: 1.75,
                maxWidth: '34rem',
              }}
              {...fadeIn(1.05)}
            >
              {t.hero.subheading}
            </motion.p>

            {/* CTAs */}
            <motion.div className="mx-auto mt-9 flex items-center gap-4" {...fadeIn(1.15)}>
              <a href="#products"
                className="liquid-glass-strong inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
                style={{ fontFamily: 'var(--font-barlow), sans-serif', boxShadow: '0 0 32px rgba(99,102,241,0.35)' }}>
                {t.hero.ctaProducts}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
              </a>
              <button
                onClick={() => setDemoOpen(true)}
                className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm text-white/60 transition-all hover:text-white hover:border-white/25 hover:scale-105"
                style={{ fontFamily: 'var(--font-barlow), sans-serif', fontWeight: 400, borderColor: 'rgba(255,255,255,0.1)' }}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" fillOpacity="0.85"><polygon points="3,1.5 13,7 3,12.5" /></svg>
                {t.hero.ctaDemo}
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div className="mx-auto mt-16 flex items-center gap-12" {...fadeIn(1.3)}>
              {STATS.map((s, i, arr) => (
                <div key={s.n} className="flex items-center gap-12">
                  <div className="flex flex-col items-center gap-2">
                    <CountUp target={s.n} color={s.color} />
                    <div style={{
                      fontFamily: 'var(--font-barlow), sans-serif',
                      fontSize: 10,
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: 'rgba(255,255,255,0.3)',
                    }}>{s.label}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)' }} />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ════ MOBILE ════ */}
          <div
            className="md:hidden flex flex-col items-center justify-center flex-1 px-6 py-28 text-center"
            style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 0.2s' }}
          >
            <div className="liquid-glass mb-7 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
              <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>
                {t.hero.badge}
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-serif), serif',
              fontStyle: 'italic',
              fontWeight: 900,
              fontSize: 'clamp(4.5rem, 24vw, 7.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              marginBottom: '1.5rem',
              background: 'linear-gradient(105deg, #fff 0%, #c7d2fe 20%, #818cf8 35%, #fff 47%, #c084fc 60%, #67e8f9 75%, #fff 85%, #a5b4fc 100%)',
              backgroundSize: '250% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 5s linear infinite',
            }}>
              SOLAI
            </h1>

            <div style={{ marginBottom: '1.5rem', width: '100%' }}>
              <TaglineCycler lines={t.hero.taglines} />
            </div>

            <p style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 300,
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.7,
              maxWidth: '28rem',
              marginBottom: '2.5rem',
            }}>
              {t.hero.subheading}
            </p>

            <div className="flex flex-col gap-3 w-full" style={{ maxWidth: 300 }}>
              <a href="#products"
                className="liquid-glass-strong w-full inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold text-white"
                style={{ fontFamily: 'var(--font-barlow), sans-serif', boxShadow: '0 0 24px rgba(99,102,241,0.3)' }}>
                {t.hero.ctaProducts}
              </a>
              <button
                onClick={() => setDemoOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-full border px-6 py-3.5 text-sm text-white/50"
                style={{ fontFamily: 'var(--font-barlow), sans-serif', borderColor: 'rgba(255,255,255,0.1)' }}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" fillOpacity="0.8"><polygon points="3,1.5 13,7 3,12.5" /></svg>
                {t.hero.ctaDemo}
              </button>
            </div>

            <div className="mt-14 flex items-center gap-8">
              {STATS.map((s, i, arr) => (
                <div key={s.n} className="flex items-center gap-8">
                  <div className="flex flex-col items-center gap-1.5">
                    <CountUp target={s.n} color={s.color} />
                    <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-barlow), sans-serif' }}>
                      {s.label}
                    </div>
                  </div>
                  {i < arr.length - 1 && <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.08)' }} />}
                </div>
              ))}
            </div>
          </div>

          {/* ════ Integration ticker — both layouts ════ */}
          <motion.div
            className="relative z-10 pb-10 mt-auto overflow-hidden"
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.5, ease }}
          >
            <p className="text-center mb-4" style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontSize: 11,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.22)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              {lang === 'vi' ? 'Tích hợp với' : 'Integrates with'}
            </p>
            {/* Scrolling ticker */}
            <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
              <div style={{ display: 'flex', gap: '3.5rem', animation: 'ticker 22s linear infinite', width: 'max-content' }}>
                {[...INTEGRATIONS, ...INTEGRATIONS].map((name, i) => (
                  <span key={i} style={{
                    fontFamily: 'var(--font-serif), serif',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.55)',
                    letterSpacing: '-0.02em',
                    whiteSpace: 'nowrap',
                  }}>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Corner accents ── */}
        {[
          { cls: 'top-0 left-0', d: 'M0 55 L0 0 L55 0', c: 'rgba(99,102,241,0.45)' },
          { cls: 'top-0 right-0', d: 'M200 55 L200 0 L145 0', c: 'rgba(99,102,241,0.45)' },
          { cls: 'bottom-0 left-0', d: 'M0 145 L0 200 L55 200', c: 'rgba(6,182,212,0.35)' },
          { cls: 'bottom-0 right-0', d: 'M200 145 L200 200 L145 200', c: 'rgba(6,182,212,0.35)' },
        ].map((a, i) => (
          <svg key={i} className={`absolute ${a.cls} pointer-events-none z-20`}
            width="200" height="200" viewBox="0 0 200 200" fill="none"
            style={{ opacity: mounted ? 0.6 : 0, transition: 'opacity 1.2s ease 1.4s' }}>
            <path d={a.d} stroke={a.c} strokeWidth="1" />
          </svg>
        ))}

        {/* ── Scroll cue ── */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
          style={{ opacity: mounted ? 0.3 : 0, transition: 'opacity 1s ease 2s' }}>
          <div className="h-8 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.45))' }} />
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="animate-bounce">
            <path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>
      </section>
  )

  return (
    <>
      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer { 0%{background-position:100% 50%} 100%{background-position:-100% 50%} }
        @keyframes ticker  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      `}</style>

      {sectionContent}

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  )
}
