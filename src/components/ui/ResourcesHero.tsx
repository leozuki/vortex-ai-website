'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ─── Animated grid of fading code snippets ─────────────── */
const CODE_FRAGMENTS = [
  'import { claude } from "@anthropic-ai/sdk"',
  'const res = await model.complete({ prompt })',
  'pipeline.run({ source: "bigquery" })',
  'agent.spawn({ tools: ["search", "code"] })',
  'await crm.sync({ provider: "hubspot" })',
  'model.embed(text, { dims: 1536 })',
  'workflow.trigger({ event: "lead.created" })',
  'llm.chat([{ role: "user", content }])',
  'db.vector.query({ top_k: 5, embedding })',
  'report.generate({ template, data })',
  'scheduler.cron("0 9 * * 1-5", task)',
  'api.route("/webhook", handler)',
  'stream.pipe(transform).pipe(sink)',
  'cache.set(key, value, { ttl: 3600 })',
  'graph.traverse({ start, depth: 3 })',
  'nlp.extract({ text, entities: true })',
]

function CodeGrid() {
  const [cells, setCells] = useState<{ text: string; opacity: number; color: string }[]>([])

  useEffect(() => {
    const COLS = 3
    const ROWS = 6
    const COUNT = COLS * ROWS
    const colors = ['#6366f1', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b']

    const make = () => Array.from({ length: COUNT }, (_, i) => ({
      text: CODE_FRAGMENTS[i % CODE_FRAGMENTS.length],
      opacity: Math.random() * 0.18 + 0.04,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    setCells(make())

    const interval = setInterval(() => {
      setCells(prev => prev.map(c =>
        Math.random() < 0.12
          ? { text: CODE_FRAGMENTS[Math.floor(Math.random() * CODE_FRAGMENTS.length)], opacity: Math.random() * 0.22 + 0.05, color: colors[Math.floor(Math.random() * colors.length)] }
          : c
      ))
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="grid grid-cols-3 gap-0 h-full">
        {cells.map((c, i) => (
          <div
            key={i}
            className="flex items-center px-6 border-b border-r"
            style={{
              borderColor: 'rgba(255,255,255,0.03)',
              opacity: c.opacity,
              transition: 'opacity 1.2s ease',
              overflow: 'hidden',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono, "Fira Code", monospace)',
              fontSize: 'clamp(9px, 1vw, 12px)',
              color: c.color,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              letterSpacing: '0.02em',
            }}>
              {c.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Blinking cursor ────────────────────────────────────── */
function Cursor({ color }: { color: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '3px',
        height: '0.85em',
        background: color,
        marginLeft: 6,
        verticalAlign: 'middle',
        animation: 'blink 1.1s step-end infinite',
      }}
    />
  )
}

/* ─── ResourcesHero ──────────────────────────────────────── */
export interface ResourcesHeroProps {
  title: string
  subtitle: string
  stats: { n: number | string; label: string; color: string }[]
  eyebrowLabel: string
}

export function ResourcesHero({ title, subtitle, stats, eyebrowLabel }: ResourcesHeroProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t) }, [])

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <section
      className="relative overflow-hidden flex flex-col"
      style={{ minHeight: '64vh', background: '#050509' }}
    >
      <style>{`@keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }`}</style>

      {/* ── Code grid background ── */}
      <CodeGrid />

      {/* ── Top edge gradient ── */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-[1]"
        style={{ background: 'linear-gradient(to bottom, #050509, transparent)' }} />

      {/* ── Bottom edge gradient ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[1]"
        style={{ background: 'linear-gradient(to top, #050509, transparent)' }} />

      {/* ── Radial center glow ── */}
      <div className="absolute inset-0 pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)' }} />

      {/* ── Corner accent — top left ── */}
      <svg className="absolute top-0 left-0 pointer-events-none z-[3]"
        width="140" height="140" viewBox="0 0 140 140" fill="none"
        style={{ opacity: mounted ? 0.5 : 0, transition: 'opacity 1s ease 0.8s' }}>
        <path d="M0 48 L0 0 L48 0" stroke="#6366f1" strokeWidth="1" />
        <circle cx="0" cy="0" r="2" fill="#6366f1" fillOpacity="0.6" />
      </svg>
      {/* ── Corner accent — top right ── */}
      <svg className="absolute top-0 right-0 pointer-events-none z-[3]"
        width="140" height="140" viewBox="0 0 140 140" fill="none"
        style={{ opacity: mounted ? 0.5 : 0, transition: 'opacity 1s ease 0.8s' }}>
        <path d="M140 48 L140 0 L92 0" stroke="#8b5cf6" strokeWidth="1" />
        <circle cx="140" cy="0" r="2" fill="#8b5cf6" fillOpacity="0.6" />
      </svg>
      {/* ── Corner accent — bottom left ── */}
      <svg className="absolute bottom-0 left-0 pointer-events-none z-[3]"
        width="140" height="140" viewBox="0 0 140 140" fill="none"
        style={{ opacity: mounted ? 0.3 : 0, transition: 'opacity 1s ease 1s' }}>
        <path d="M0 92 L0 140 L48 140" stroke="rgba(6,182,212,0.6)" strokeWidth="1" />
      </svg>
      {/* ── Corner accent — bottom right ── */}
      <svg className="absolute bottom-0 right-0 pointer-events-none z-[3]"
        width="140" height="140" viewBox="0 0 140 140" fill="none"
        style={{ opacity: mounted ? 0.3 : 0, transition: 'opacity 1s ease 1s' }}>
        <path d="M140 92 L140 140 L92 140" stroke="rgba(6,182,212,0.6)" strokeWidth="1" />
      </svg>

      {/* ── Thin rule bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none"
        style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)' }} />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col flex-1 justify-center items-center px-6 pt-32 pb-16 text-center">

        {/* Eyebrow — terminal style */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease }}
        >
          <span className="liquid-glass inline-flex items-center gap-2.5 rounded-lg px-4 py-2 text-[11px] font-mono tracking-wider"
            style={{ color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>~/solai</span>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>$</span>
            {eyebrowLabel}
            <Cursor color="#10b981" />
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
          animate={mounted ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          style={{
            fontFamily: 'var(--font-serif), serif',
            fontStyle: 'italic',
            fontWeight: 900,
            fontSize: 'clamp(3rem, 9vw, 8rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            background: 'linear-gradient(135deg, #fff 0%, #c7d2fe 30%, #8b5cf6 60%, #67e8f9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.25rem',
          }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={mounted ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease }}
          style={{
            fontFamily: 'var(--font-barlow), sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(0.875rem, 2vw, 1.05rem)',
            color: 'rgba(255,255,255,0.42)',
            maxWidth: '36rem',
            lineHeight: 1.65,
            marginBottom: '3rem',
          }}
        >
          {subtitle}
        </motion.p>

        {/* Stat row */}
        <motion.div
          className="flex items-center justify-center flex-wrap gap-8"
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55, ease }}
        >
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              {/* Horizontal rule above */}
              <div style={{ width: 1, height: 24, background: `linear-gradient(to bottom, transparent, ${s.color}50)`, marginBottom: 4 }} />
              <span style={{
                fontFamily: 'var(--font-serif), serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                lineHeight: 1,
                color: s.color,
                filter: `drop-shadow(0 0 10px ${s.color}50)`,
              }}>{s.n}</span>
              <span style={{
                fontFamily: 'var(--font-barlow), sans-serif',
                fontSize: 10,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.25)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
              }}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        style={{ opacity: mounted ? 0.25 : 0, transition: 'opacity 1s ease 1.4s' }}>
        <div className="h-8 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.4))' }} />
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="animate-bounce">
          <path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  )
}
