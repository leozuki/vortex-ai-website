'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

/* ─── FadingVideo (shared) ───────────────────────────────── */
const FADE_MS = 500
const FADE_OUT_LEAD = 0.55

export function FadingVideo({ src, className, style }: {
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

  return (
    <video ref={videoRef} src={src} autoPlay muted playsInline preload="auto"
      className={className} style={{ ...style, opacity: 0 }} />
  )
}

/* ─── PageHero ───────────────────────────────────────────── */
export interface PageHeroProps {
  /** Small pill above the title */
  eyebrow?: React.ReactNode
  /** Big editorial title — shown in Instrument Serif italic */
  title: string
  /** Optional subtitle / description */
  description?: string
  /** Accent color for glows, gradients and decorations */
  color?: string
  /** Gradient override for the title text (CSS gradient string) */
  titleGradient?: string
  /** Extra content below description (CTAs, badges, …) */
  children?: React.ReactNode
  /** Bottom section (e.g. stat row) */
  footer?: React.ReactNode
  /** Video src (defaults to the cinematic hero video) */
  video?: string
  /** Overlay opacity on top of video (0 = none, 1 = full black) */
  overlayOpacity?: number
  /** Min-height override */
  minHeight?: string
}

const DEFAULT_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4'

export function PageHero({
  eyebrow,
  title,
  description,
  color = '#818cf8',
  titleGradient,
  children,
  footer,
  video = DEFAULT_VIDEO,
  overlayOpacity = 0.45,
  minHeight = '72vh',
}: PageHeroProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t) }, [])

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const gradient = titleGradient ??
    `linear-gradient(135deg, #fff 0%, #e0e7ff 25%, ${color} 55%, #c084fc 80%, #67e8f9 100%)`

  return (
    <section
      className="relative overflow-hidden flex flex-col"
      style={{ minHeight, background: '#000' }}
    >
      {/* ── Video background ── */}
      <FadingVideo
        src={video}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* ── Dark overlay (contrast control) ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: `rgba(0,0,0,${overlayOpacity})` }} />

      {/* ── Color accent glow ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${color}22 0%, transparent 65%)` }} />

      {/* ── Corner accents ── */}
      <svg className="absolute top-0 left-0 pointer-events-none z-[2]"
        width="160" height="160" viewBox="0 0 160 160" fill="none"
        style={{ opacity: mounted ? 0.4 : 0, transition: 'opacity 1s ease 1s' }}>
        <path d="M0 50 L0 0 L50 0" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      </svg>
      <svg className="absolute top-0 right-0 pointer-events-none z-[2]"
        width="160" height="160" viewBox="0 0 160 160" fill="none"
        style={{ opacity: mounted ? 0.4 : 0, transition: 'opacity 1s ease 1s' }}>
        <path d="M160 50 L160 0 L110 0" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      </svg>
      <svg className="absolute bottom-0 left-0 pointer-events-none z-[2]"
        width="160" height="160" viewBox="0 0 160 160" fill="none"
        style={{ opacity: mounted ? 0.3 : 0, transition: 'opacity 1s ease 1.2s' }}>
        <path d="M0 110 L0 160 L50 160" stroke="rgba(6,182,212,0.5)" strokeWidth="1" />
      </svg>
      <svg className="absolute bottom-0 right-0 pointer-events-none z-[2]"
        width="160" height="160" viewBox="0 0 160 160" fill="none"
        style={{ opacity: mounted ? 0.3 : 0, transition: 'opacity 1s ease 1.2s' }}>
        <path d="M160 110 L160 160 L110 160" stroke="rgba(6,182,212,0.5)" strokeWidth="1" />
      </svg>

      {/* ── Thin horizontal rule ── */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none"
        style={{ height: 1, background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }} />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col flex-1 items-center justify-center px-6 pt-32 pb-16 text-center">

        {/* Eyebrow */}
        {eyebrow && (
          <motion.div
            className="mb-6"
            initial={{ filter: 'blur(8px)', opacity: 0, y: 16 }}
            animate={mounted ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            {eyebrow}
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ filter: 'blur(12px)', opacity: 0, y: 24 }}
          animate={mounted ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          style={{
            fontFamily: 'var(--font-serif), serif',
            fontStyle: 'italic',
            fontWeight: 900,
            fontSize: 'clamp(3.2rem, 10vw, 8.5rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            background: gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: description ? '1.25rem' : '2rem',
          }}
        >
          {title}
        </motion.h1>

        {/* Description */}
        {description && (
          <motion.p
            initial={{ filter: 'blur(6px)', opacity: 0, y: 16 }}
            animate={mounted ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              color: 'rgba(255,255,255,0.5)',
              maxWidth: '38rem',
              lineHeight: 1.65,
              marginBottom: children ? '2rem' : 0,
            }}
          >
            {description}
          </motion.p>
        )}

        {/* Children (CTAs etc.) */}
        {children && (
          <motion.div
            initial={{ filter: 'blur(6px)', opacity: 0, y: 14 }}
            animate={mounted ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.48, ease }}
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Footer (stat row etc.) */}
      {footer && (
        <motion.div
          className="relative z-10 pb-8 px-6"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease }}
        >
          {footer}
        </motion.div>
      )}

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        style={{ opacity: mounted ? 0.3 : 0, transition: 'opacity 1s ease 1.4s' }}>
        <div className="h-8 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.4))' }} />
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="animate-bounce">
          <path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  )
}
