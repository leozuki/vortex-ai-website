'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/context/LangContext'
import { DemoModal } from '@/components/ui/DemoModal'

/* ─────────────────────────────────────────────────────────────
   FadingVideo — rAF-based crossfade, no CSS transitions
───────────────────────────────────────────────────────────── */
const FADE_MS = 500
const FADE_OUT_LEAD = 0.55

function FadingVideo({ src, className, style }: {
  src: string
  className?: string
  style?: React.CSSProperties
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

    const onLoaded = () => {
      video.style.opacity = '0'
      video.play().catch(() => {})
      fadeTo(1, FADE_MS)
    }
    const onTimeUpdate = () => {
      const remaining = video.duration - video.currentTime
      if (!fadingOutRef.current && remaining <= FADE_OUT_LEAD && remaining > 0) {
        fadingOutRef.current = true
        fadeTo(0, FADE_MS)
      }
    }
    const onEnded = () => {
      video.style.opacity = '0'
      setTimeout(() => {
        video.currentTime = 0
        video.play().catch(() => {})
        fadingOutRef.current = false
        fadeTo(1, FADE_MS)
      }, 100)
    }

    video.addEventListener('loadeddata', onLoaded)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended', onEnded)
    return () => {
      cancelAnimationFrame(rafRef.current)
      video.removeEventListener('loadeddata', onLoaded)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('ended', onEnded)
    }
  }, [fadeTo])

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ ...style, opacity: 0 }}
    />
  )
}

/* ─────────────────────────────────────────────────────────────
   BlurText — word-by-word IntersectionObserver + Framer Motion
───────────────────────────────────────────────────────────── */
function BlurText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const words = text.split(' ')

  return (
    <p
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', rowGap: '0.05em' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={inView
            ? { filter: 'blur(0px)', opacity: 1, y: 0 }
            : { filter: 'blur(10px)', opacity: 0, y: 50 }
          }
          transition={{ duration: 0.7, delay: (i * 100) / 1000, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  )
}

/* ─────────────────────────────────────────────────────────────
   ArrowUpRight icon
───────────────────────────────────────────────────────────── */
function ArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
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

  const fadeIn = (delay: number) => ({
    initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
    animate: mounted ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  })

  const HEADLINE = lang === 'vi'
    ? 'Báo cáo tự viết. Quy trình tự chạy. Bạn lo việc quan trọng hơn.'
    : 'Reports write themselves. Workflows run themselves. You focus on what matters.'

  const STATS = [
    { n: '9', label: lang === 'vi' ? 'Sản phẩm live' : 'Live products', color: '#818cf8' },
    { n: '11+', label: lang === 'vi' ? 'Công cụ AI' : 'AI tools', color: '#c084fc' },
    { n: '24/7', label: lang === 'vi' ? 'Hoạt động liên tục' : 'Always running', color: '#67e8f9' },
  ]

  const INTEGRATIONS = ['HubSpot', 'Google', 'Facebook', 'Claude', 'Gemini']

  return (
    <>
      <section
        id="hero"
        className="relative overflow-hidden"
        style={{ minHeight: '100svh', background: '#000' }}
      >
        {/* ── Background Video ── */}
        <FadingVideo
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
          className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0 pointer-events-none"
          style={{ width: '120%', height: '120%' }}
        />

        {/* ── z-10 content layer ── */}
        <div className="relative z-10 flex flex-col" style={{ minHeight: '100svh' }}>

          {/* ════ DESKTOP layout ════ */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">

            {/* SOLAI — top-center, massive, full gradient */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: '7vh' }}
              initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
              animate={mounted ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <span style={{
                display: 'block',
                lineHeight: '0.88',
                fontSize: 'clamp(5rem, 14vw, 13rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                fontFamily: 'var(--font-serif), serif',
                fontStyle: 'italic',
                whiteSpace: 'nowrap',
                background: 'linear-gradient(135deg, #fff 0%, #e0e7ff 30%, #a5b4fc 55%, #c084fc 75%, #67e8f9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                SOLAI
              </span>
            </motion.div>

            {/* Badge + tagline — left-center */}
            <motion.div
              className="absolute pointer-events-auto"
              style={{ top: '48%', left: '4vw', maxWidth: '30vw' }}
              {...fadeIn(0.65)}
            >
              <div className="liquid-glass mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5">
                <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold text-black">
                  {lang === 'vi' ? 'Mới' : 'New'}
                </span>
                <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.85)', paddingRight: 4 }}>
                  {t.hero.badge}
                </span>
              </div>
              <p style={{
                fontFamily: 'var(--font-barlow), sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.3,
              }}>
                {t.hero.taglines[0]}
              </p>
            </motion.div>

            {/* Subheading — bottom-left */}
            <motion.div
              className="absolute"
              style={{ bottom: '14vh', left: '4vw', maxWidth: '26vw' }}
              {...fadeIn(0.85)}
            >
              <p style={{
                fontFamily: 'var(--font-barlow), sans-serif',
                fontWeight: 300,
                fontSize: 13,
                color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.65,
              }}>
                {t.hero.subheading}
              </p>
            </motion.div>

            {/* CTAs — bottom-right */}
            <motion.div
              className="absolute flex flex-col items-end gap-3 pointer-events-auto"
              style={{ bottom: '14vh', right: '4vw' }}
              {...fadeIn(1.0)}
            >
              <a
                href="#products"
                className="liquid-glass-strong inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium text-white transition-all hover:scale-105 active:scale-95"
                style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
              >
                {t.hero.ctaProducts}
                <ArrowUpRight size={16} />
              </a>
              <button
                onClick={() => setDemoOpen(true)}
                className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm text-white/60 transition-all hover:text-white hover:scale-105"
                style={{ fontFamily: 'var(--font-barlow), sans-serif', fontWeight: 300 }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" fillOpacity="0.9">
                  <polygon points="3,1.5 13,7 3,12.5" />
                </svg>
                {t.hero.ctaDemo}
              </button>
            </motion.div>

            {/* Stats — right-center */}
            <motion.div
              className="absolute flex flex-col gap-7"
              style={{ top: '50%', right: '4vw', transform: 'translateY(-50%)' }}
              {...fadeIn(1.1)}
            >
              {STATS.map(s => (
                <div key={s.n} className="text-right">
                  <div style={{
                    fontFamily: 'var(--font-serif), serif',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                    fontWeight: 400,
                    lineHeight: 1,
                    background: `linear-gradient(135deg, ${s.color} 0%, ${s.color}99 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {s.n}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-barlow), sans-serif',
                    fontSize: 10,
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'rgba(255,255,255,0.25)',
                    marginTop: 3,
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Center vertical divider */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              style={{ top: '28%' }}
              {...fadeIn(1.3)}
            >
              <div className="w-px h-20" style={{ background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.45), transparent)' }} />
              <span style={{
                fontSize: 9,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: 'rgba(99,102,241,0.5)',
                writingMode: 'vertical-rl',
                fontFamily: 'var(--font-barlow), sans-serif',
              }}>
                SOLAI
              </span>
              <div className="w-px h-14" style={{ background: 'linear-gradient(to bottom, rgba(99,102,241,0.3), transparent)' }} />
            </motion.div>

            {/* Corner accents */}
            {[
              { pos: 'top-0 left-0', path: 'M0 60 L0 0 L60 0', color: 'rgba(99,102,241,0.5)' },
              { pos: 'top-0 right-0', path: 'M200 60 L200 0 L140 0', color: 'rgba(99,102,241,0.5)' },
              { pos: 'bottom-0 left-0', path: 'M0 140 L0 200 L60 200', color: 'rgba(6,182,212,0.4)' },
              { pos: 'bottom-0 right-0', path: 'M200 140 L200 200 L140 200', color: 'rgba(6,182,212,0.4)' },
            ].map((c, i) => (
              <svg key={i} className={`absolute ${c.pos}`} width="200" height="200" viewBox="0 0 200 200" fill="none"
                style={{ opacity: mounted ? 0.35 : 0, transition: 'opacity 1s ease 1.5s' }}>
                <path d={c.path} stroke={c.color} strokeWidth="1" />
              </svg>
            ))}

            {/* Scroll indicator */}
            <div
              className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              style={{ opacity: mounted ? 0.3 : 0, transition: 'opacity 1s ease 1.8s' }}
            >
              <div className="h-10 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.35))' }} />
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="animate-bounce">
                <path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* ════ MOBILE stacked layout ════ */}
          <div
            className="md:hidden relative z-10 flex flex-col items-center justify-center px-6 py-24 text-center"
            style={{ minHeight: '100svh', opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 0.2s' }}
          >
            {/* Badge */}
            <div className="liquid-glass mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5">
              <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold text-black">
                {lang === 'vi' ? 'Mới' : 'New'}
              </span>
              <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.85)', paddingRight: 4 }}>
                {t.hero.badge}
              </span>
            </div>

            {/* Brand name */}
            <h1 style={{
              fontFamily: 'var(--font-serif), serif',
              fontStyle: 'italic',
              fontWeight: 900,
              fontSize: 'clamp(4rem, 22vw, 7rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #fff 0%, #e0e7ff 30%, #a5b4fc 55%, #c084fc 75%, #67e8f9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              SOLAI
            </h1>

            {/* BlurText headline */}
            <BlurText
              text={HEADLINE}
              className="mb-3 text-base font-semibold"
              key={lang}
            />

            <p className="mb-10 text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.35)', maxWidth: '28rem', fontFamily: 'var(--font-barlow), sans-serif', fontWeight: 300 }}>
              {t.hero.subheading}
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-center gap-3 w-full" style={{ maxWidth: 300 }}>
              <a
                href="#products"
                className="liquid-glass-strong w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-white"
                style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
              >
                {t.hero.ctaProducts}
                <ArrowUpRight size={15} />
              </a>
              <button
                onClick={() => setDemoOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm text-white/50"
                style={{ fontFamily: 'var(--font-barlow), sans-serif', fontWeight: 300 }}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" fillOpacity="0.8">
                  <polygon points="3,1.5 13,7 3,12.5" />
                </svg>
                {t.hero.ctaDemo}
              </button>
            </div>

            {/* Stats */}
            <div className="mt-14 flex gap-6">
              {STATS.map((s, i, arr) => (
                <div key={s.n} className="flex items-center gap-6">
                  <div className="text-center">
                    <div style={{
                      fontFamily: 'var(--font-serif), serif',
                      fontStyle: 'italic',
                      fontSize: '1.75rem',
                      fontWeight: 400,
                      lineHeight: 1,
                      background: `linear-gradient(135deg, ${s.color} 0%, ${s.color}99 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>{s.n}</div>
                    <div style={{
                      marginTop: 3,
                      fontSize: 9,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255,255,255,0.25)',
                      fontFamily: 'var(--font-barlow), sans-serif',
                    }}>{s.label}</div>
                  </div>
                  {i < arr.length - 1 && <div className="h-7 w-px" style={{ background: 'rgba(255,255,255,0.08)' }} />}
                </div>
              ))}
            </div>
          </div>

          {/* ════ Partners/Integrations — bottom (both layouts) ════ */}
          <motion.div
            className="relative z-10 mt-auto hidden md:flex flex-col items-center gap-4 pb-8"
            {...fadeIn(1.4)}
          >
            <div className="liquid-glass rounded-full px-3.5 py-1" style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontSize: 11,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.6)',
            }}>
              {lang === 'vi' ? 'Tích hợp với các nền tảng hàng đầu' : 'Integrates with top platforms'}
            </div>
            <div className="flex items-center gap-10 md:gap-14">
              {INTEGRATIONS.map(name => (
                <span key={name} style={{
                  fontFamily: 'var(--font-serif), serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '-0.02em',
                }}>
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  )
}
