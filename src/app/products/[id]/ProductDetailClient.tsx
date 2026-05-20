'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight, ChevronDown, Zap } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProductVisual } from '@/components/ui/ProductVisual'
import { ProductIcon } from '@/components/ui/ProductIcon'
import type { Product, VisualType } from '@/types'
import type { ProductDetail, PainPoint } from '@/data/productDetails'

interface Props {
  product: Product
  detail: ProductDetail | null
}

/* ─── Hooks ──────────────────────────────────────────────────────── */

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useCountUp(target: string, inView: boolean) {
  const [display, setDisplay] = useState('0')
  useEffect(() => {
    if (!inView) return
    const num = parseFloat(target.replace(/[^0-9.]/g, ''))
    if (isNaN(num)) { setDisplay(target); return }
    const suffix = target.replace(/[0-9.]/g, '')
    const start = performance.now()
    const dur = 900
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      const v = Number.isInteger(num) ? Math.round(e * num) : (e * num).toFixed(1)
      setDisplay(v + suffix)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])
  return display
}

/* ─── BlurWords — word-by-word blur-in ──────────────────────────── */

function BlurWords({ text, className = '', baseDelay = 0 }: {
  text: string; className?: string; baseDelay?: number
}) {
  const { ref, inView } = useInView(0.08)
  const words = text.split(' ')
  return (
    <p
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', rowGap: '0.08em', columnGap: '0.28em' }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            opacity: inView ? 1 : 0,
            filter: inView ? 'blur(0px)' : 'blur(10px)',
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * 55}ms,
                         filter 0.65s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * 55}ms,
                         transform 0.65s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * 55}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </p>
  )
}

/* ─── FadeUp ────────────────────────────────────────────────────── */

function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const { ref, inView } = useInView(0.06)
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(28px)',
      filter: inView ? 'blur(0px)' : 'blur(4px)',
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                   transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                   filter 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

/* ─── Screenshot availability ─────────────────────────────────── */
const SCREENSHOT_IDS = new Set([
  'digital-office', 'crm', 'bigdata-pipeline', 'hubspot-auto',
  'arcso', 'extensions-suite', 'taomeettrap', 'crm-v2',
])

/* ─── Liquid-glass stat card ──────────────────────────────────── */

function StatCard({ metric, label, color }: { metric: string; label: string; color: string }) {
  const { ref, inView } = useInView(0.4)
  const display = useCountUp(metric, inView)
  return (
    <div
      ref={ref}
      className="liquid-glass flex flex-col items-center gap-2 py-8 px-6 text-center rounded-2xl"
    >
      <span
        className="font-black tabular-nums tracking-tight leading-none"
        style={{
          fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
          color,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          filter: `drop-shadow(0 0 16px ${color}50)`,
        }}
      >
        {display}
      </span>
      <span className="text-xs text-white/40 leading-snug max-w-[120px] font-medium tracking-wide">{label}</span>
    </div>
  )
}

/* ─── Liquid-glass feature card ───────────────────────────────── */

const TAG_COLORS = [
  'rgba(129,140,248,0.12)', 'rgba(192,132,252,0.12)', 'rgba(103,232,249,0.12)',
  'rgba(251,191,36,0.12)',  'rgba(52,211,153,0.12)',
]

function FeatureCard({ feature, color, lang, index, tags }: {
  feature: { icon: string; title: { vi: string; en: string }; desc: { vi: string; en: string } }
  color: string; lang: 'vi' | 'en'; index: number
  tags?: string[]
}) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    cardRef.current!.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    cardRef.current!.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  const defaultTags = [
    feature.title[lang].split(' ')[0],
    `v${index + 1}.0`,
    index % 2 === 0 ? 'AI-powered' : 'Auto',
  ]
  const displayTags = tags ?? defaultTags

  return (
    <div
      ref={cardRef}
      className="liquid-glass rounded-2xl cursor-default flex flex-col min-h-[280px] transition-all duration-400"
      style={{
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 0 0 1px ${color}25, 0 20px 50px ${color}12, inset 0 1px 1px rgba(255,255,255,0.12)`
          : 'inset 0 1px 1px rgba(255,255,255,0.07)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight follow */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] z-0"
        style={{
          background: `radial-gradient(circle 180px at var(--mx,50%) var(--my,50%), ${color}0a 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }} />

      <div className="relative z-10 p-6 flex flex-col flex-1">
        {/* Top row: icon box + tags */}
        <div className="flex items-start justify-between gap-3 mb-auto">
          {/* Icon */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl"
            style={{
              background: `${color}14`,
              border: `1px solid ${color}25`,
              boxShadow: hovered ? `0 0 12px ${color}20` : 'none',
              transition: 'box-shadow 0.3s',
            }}>
            {feature.icon}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-end gap-1.5 max-w-[65%]">
            {displayTags.slice(0, 3).map((tag, ti) => (
              <span
                key={ti}
                className="rounded-full px-2.5 py-0.5 text-[10px] font-medium whitespace-nowrap"
                style={{
                  background: TAG_COLORS[ti % TAG_COLORS.length],
                  color: 'rgba(255,255,255,0.65)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-[24px]" />

        {/* Bottom: number + title + desc */}
        <div className="mt-5">
          <span className="block text-[10px] font-bold tracking-[0.18em] uppercase mb-2"
            style={{ color: `${color}55` }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-lg font-bold text-white leading-snug tracking-tight mb-2">
            {feature.title[lang]}
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {feature.desc[lang]}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Pain point card ─────────────────────────────────────────── */

function PainCard({ p, lang, delay }: { p: PainPoint; lang: 'vi' | 'en'; delay: number }) {
  return (
    <FadeUp delay={delay}>
      <div className="liquid-glass rounded-2xl p-5 flex items-start gap-4 h-full">
        <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl text-xl"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.18)' }}>
          {p.icon}
        </div>
        <p className="text-sm leading-relaxed text-white/50 pt-1">{p.text[lang]}</p>
      </div>
    </FadeUp>
  )
}

/* ─── Main Component ────────────────────────────────────────────── */

export function ProductDetailClient({ product, detail }: Props) {
  const { lang } = useLang()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setTimeout(() => setMounted(true), 60) }, [])

  const c = product.color
  const hasScreenshot = SCREENSHOT_IDS.has(product.id)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#07070e' }}>
      <Navbar />

      <main className="flex-1">

        {/* ══════════════════════════════════════════════════════
            HERO — full-bleed cinematic
        ═══════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col overflow-hidden">

          {/* ── Full-bleed screenshot or gradient background ── */}
          {hasScreenshot ? (
            <>
              <div className="absolute inset-0 z-0">
                <Image
                  src={`/screenshots/${product.id}.png`}
                  alt={product.name}
                  fill
                  className="object-cover object-top"
                  style={{ opacity: 0.18 }}
                  priority
                />
              </div>
              {/* Vignette bottom + sides */}
              <div className="absolute inset-0 z-0" style={{
                background: 'linear-gradient(to bottom, rgba(7,7,14,0.55) 0%, rgba(7,7,14,0.35) 40%, rgba(7,7,14,0.7) 75%, #07070e 100%)',
              }} />
              <div className="absolute inset-0 z-0" style={{
                background: 'linear-gradient(to right, rgba(7,7,14,0.6) 0%, transparent 30%, transparent 70%, rgba(7,7,14,0.6) 100%)',
              }} />
            </>
          ) : (
            <>
              <div className="absolute inset-0 z-0" style={{ background: `radial-gradient(ellipse 80% 70% at 50% 0%, ${c}1a 0%, transparent 60%)` }} />
              <div className="absolute inset-0 z-0" style={{ background: '#07070e' }} />
            </>
          )}

          {/* Colored glow from product accent */}
          <div className="absolute z-0 pointer-events-none"
            style={{
              width: 700, height: 700,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${c}18 0%, transparent 65%)`,
              top: '-15%', right: '-10%',
              filter: 'blur(60px)',
            }} />
          <div className="absolute z-0 pointer-events-none"
            style={{
              width: 400, height: 400,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${c}10 0%, transparent 65%)`,
              bottom: '10%', left: '5%',
              filter: 'blur(50px)',
            }} />

          {/* Grid */}
          <div className="absolute inset-0 z-0 opacity-[0.025]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          }} />

          {/* ── Content ── */}
          <div className="relative z-10 flex-1 flex flex-col pt-28 pb-20 px-4">
            <div className="mx-auto w-full max-w-6xl">

              {/* Breadcrumb */}
              <div
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'none' : 'translateY(12px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                }}
                className="mb-14"
              >
                <Link href="/#products"
                  className="inline-flex items-center gap-2.5 text-sm text-white/30 hover:text-white/70 transition-colors duration-200 group">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full liquid-glass transition-all duration-200 group-hover:scale-110">
                    <ArrowLeft size={12} />
                  </span>
                  {lang === 'vi' ? 'Tất cả sản phẩm' : 'All products'}
                </Link>
              </div>

              <div className="grid gap-12 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] lg:gap-20 items-center">

                {/* ── Left col ── */}
                <div>
                  {/* Badge row */}
                  <div
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? 'none' : 'translateY(16px)',
                      transition: 'opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s',
                    }}
                    className="mb-6 flex flex-wrap items-center gap-2.5"
                  >
                    <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] liquid-glass"
                      style={{ color: c }}>
                      <ProductIcon type={product.visual as VisualType} color={c} size={12} />
                      {product.name}
                    </span>
                    {product.featured && (
                      <span className="liquid-glass rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/35">
                        Flagship
                      </span>
                    )}
                  </div>

                  {/* Headline — blur-words */}
                  <div style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', marginBottom: '1.5rem' }}>
                    <BlurWords
                      text={detail ? detail.tagline[lang] : product.headline[lang]}
                      className="font-black text-white leading-[1.08] tracking-tight"
                      baseDelay={150}
                    />
                  </div>

                  {/* Description */}
                  <FadeUp delay={300}>
                    <p className="mb-8 text-base leading-relaxed max-w-lg" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {detail ? detail.heroDesc[lang] : product.desc[lang]}
                    </p>
                  </FadeUp>

                  {/* Tech tags */}
                  <FadeUp delay={380}>
                    <div className="mb-9">
                      <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/20">
                        {lang === 'vi' ? 'Công nghệ' : 'Tech stack'}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.tech.map((t) => (
                          <span key={t}
                            className="liquid-glass rounded-lg px-3 py-1.5 text-[11px] font-mono font-medium text-white/40 hover:text-white/70 cursor-default transition-colors">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </FadeUp>

                  {/* CTAs */}
                  <FadeUp delay={440}>
                    <div className="flex flex-wrap gap-3">
                      <a href="/#contact"
                        className="group relative inline-flex items-center gap-2.5 rounded-2xl px-7 py-3.5 text-sm font-bold text-white overflow-hidden liquid-glass-strong transition-all duration-300 hover:scale-[1.03] active:scale-95"
                        style={{ boxShadow: `0 0 28px ${c}30` }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${c}50`}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px ${c}30`}
                      >
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit]"
                          style={{ background: `linear-gradient(135deg, ${c}20, transparent)` }} />
                        <span className="relative">{product.cta[lang]}</span>
                        <ArrowUpRight size={15} className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                      <a href="/#contact"
                        className="liquid-glass inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-medium text-white/45 transition-all duration-200 hover:text-white/75 active:scale-95">
                        {lang === 'vi' ? 'Đặt demo' : 'Book demo'}
                      </a>
                    </div>
                  </FadeUp>
                </div>

                {/* ── Right col: liquid-glass product card ── */}
                <FadeUp delay={200} className="lg:sticky lg:top-24">
                  <div className="relative">
                    <div className="absolute -inset-6 rounded-3xl pointer-events-none"
                      style={{ background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${c}1a, transparent 70%)` }} />

                    <div className="liquid-glass-strong relative rounded-2xl overflow-hidden"
                      style={{ boxShadow: `0 0 0 1px ${c}20, 0 24px 64px rgba(0,0,0,0.4)` }}>

                      {/* Card chrome bar */}
                      <div className="flex items-center justify-between px-4 py-3"
                        style={{ borderBottom: `1px solid ${c}18` }}>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
                          <span className="text-[11px] font-medium" style={{ color: `${c}cc` }}>{product.name}</span>
                        </div>
                        <div className="flex gap-1.5">
                          {['#ef4444', '#f59e0b', '#10b981'].map(col => (
                            <div key={col} className="h-2.5 w-2.5 rounded-full opacity-60" style={{ background: col }} />
                          ))}
                        </div>
                      </div>

                      {/* Screenshot / visual */}
                      <div className={hasScreenshot ? 'relative overflow-hidden' : 'p-3'}>
                        {hasScreenshot ? (
                          <Image
                            src={`/screenshots/${product.id}.png`}
                            alt={product.name}
                            width={960}
                            height={600}
                            className="w-full h-auto object-cover object-top"
                            priority
                          />
                        ) : (
                          <ProductVisual type={product.visual as VisualType} color={c} large />
                        )}
                      </div>

                      <div className="absolute inset-0 pointer-events-none rounded-[inherit]"
                        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(255,255,255,0.01) 100%)' }} />
                    </div>
                  </div>
                </FadeUp>
              </div>

              {/* ── Bottom stats strip ── */}
              {detail && (
                <FadeUp delay={500} className="mt-20">
                  <div className="grid grid-cols-3 gap-3">
                    {detail.results.map((r, i) => (
                      <StatCard key={i} metric={r.metric} label={r.label[lang]} color={c} />
                    ))}
                  </div>
                </FadeUp>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PAIN POINTS
        ═══════════════════════════════════════════════════════ */}
        {detail && detail.painPoints?.length > 0 && (
          <section className="relative px-4 py-24 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #07070e 0%, #0a0a15 100%)' }}>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${c}25, transparent)` }} />

            <div className="mx-auto max-w-4xl">
              <FadeUp className="mb-12 text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-4" style={{ color: c + '70' }}>
                  {lang === 'vi' ? 'Bạn đang gặp vấn đề này?' : 'Sound familiar?'}
                </p>
                <BlurWords
                  text={lang === 'vi' ? 'Những vấn đề mà hầu hết doanh nghiệp đang chịu đựng' : 'Problems most businesses are still putting up with'}
                  className="text-2xl md:text-3xl font-black text-white leading-tight justify-center"
                />
              </FadeUp>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {detail.painPoints.map((p: PainPoint, i: number) => (
                  <PainCard key={i} p={p} lang={lang} delay={i * 80} />
                ))}
              </div>

              <FadeUp className="mt-10 flex justify-center">
                <div className="inline-flex flex-col items-center gap-3">
                  <div className="w-px h-8" style={{ background: `linear-gradient(to bottom, rgba(239,68,68,0.3), ${c}50)` }} />
                  <span className="liquid-glass rounded-full px-4 py-1.5 text-xs font-bold"
                    style={{ color: c }}>
                    {lang === 'vi' ? `${product.name} giải quyết tất cả` : `${product.name} solves all of this`}
                  </span>
                </div>
              </FadeUp>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════
            FEATURES
        ═══════════════════════════════════════════════════════ */}
        {detail && detail.features.length > 0 && (
          <section className="relative px-4 py-28 overflow-hidden">
            <div className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(ellipse 55% 50% at 90% 50%, ${c}09 0%, transparent 60%)` }} />

            <div className="mx-auto max-w-6xl relative">
              <FadeUp className="mb-16">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 liquid-glass">
                      <Zap size={10} style={{ color: c }} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: c }}>
                        {lang === 'vi' ? 'Tính năng' : 'Features'}
                      </span>
                    </div>
                    <BlurWords
                      text={lang === 'vi' ? 'Được xây dựng để tạo ra kết quả thực' : 'Built to deliver real results'}
                      className="text-3xl md:text-4xl font-black text-white leading-tight"
                    />
                  </div>
                  <p className="text-sm text-white/25 max-w-xs leading-relaxed">
                    {lang === 'vi'
                      ? 'Mỗi tính năng được thiết kế để giải quyết một vấn đề cụ thể.'
                      : 'Every feature is designed to solve a specific problem.'}
                  </p>
                </div>
              </FadeUp>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {detail.features.map((f, i) => (
                  <FadeUp key={i} delay={i * 55}>
                    <FeatureCard feature={f} color={c} lang={lang} index={i} />
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════
            HOW IT WORKS
        ═══════════════════════════════════════════════════════ */}
        {detail && detail.howItWorks.length > 0 && (
          <section className="relative px-4 py-28 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #07070e 0%, #0a0a14 50%, #07070e 100%)' }}>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${c}18, transparent)` }} />
            <div className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(ellipse 40% 55% at 15% 50%, ${c}09 0%, transparent 55%)` }} />

            <div className="mx-auto max-w-4xl relative">
              <FadeUp className="mb-16 text-center">
                <span className="liquid-glass inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: c }}>
                  {lang === 'vi' ? 'Quy trình' : 'How it works'}
                </span>
                <BlurWords
                  text={lang === 'vi' ? 'Ba bước — không phức tạp hơn.' : 'Three steps — no more.'}
                  className="text-3xl font-black text-white md:text-4xl justify-center"
                />
              </FadeUp>

              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Connector line */}
                <div className="absolute top-8 left-[16.67%] right-[16.67%] h-px hidden md:block pointer-events-none"
                  style={{ background: `linear-gradient(to right, transparent, ${c}30 20%, ${c}30 80%, transparent)` }} />

                {detail.howItWorks.map((step, i) => (
                  <FadeUp key={i} delay={i * 100}>
                    <div className="flex flex-col items-center text-center group">
                      <div className="relative z-10 mb-5">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full font-black text-xl liquid-glass transition-all duration-300 group-hover:scale-110"
                          style={{ color: c, boxShadow: `0 0 20px ${c}18` }}>
                          {step.number}
                        </div>
                      </div>
                      <h3 className="mb-2.5 font-bold text-white text-base leading-snug">{step.title[lang]}</h3>
                      <p className="text-sm leading-relaxed text-white/35">{step.desc[lang]}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════
            FAQ
        ═══════════════════════════════════════════════════════ */}
        {detail && detail.faq.length > 0 && (
          <section className="relative px-4 py-24 overflow-hidden">
            <div className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(ellipse 40% 50% at 80% 50%, ${c}07 0%, transparent 60%)` }} />

            <div className="mx-auto max-w-2xl relative">
              <FadeUp className="mb-12 text-center">
                <span className="liquid-glass inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: c }}>
                  FAQ
                </span>
                <BlurWords
                  text={lang === 'vi' ? 'Câu hỏi thường gặp' : 'Common questions'}
                  className="text-3xl font-black text-white justify-center"
                />
              </FadeUp>

              <div className="space-y-2">
                {detail.faq.map((item, i) => {
                  const open = openFaq === i
                  return (
                    <FadeUp key={i} delay={i * 60}>
                      <div className={`liquid-glass rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'liquid-glass-strong' : ''}`}
                        style={{ boxShadow: open ? `0 0 24px ${c}10` : 'none' }}>
                        <button
                          onClick={() => setOpenFaq(open ? null : i)}
                          className="flex w-full items-center justify-between px-6 py-5 text-left gap-4">
                          <div className="flex items-center gap-3">
                            <span className="font-black text-xs tabular-nums" style={{ color: c + '55' }}>
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="text-sm font-semibold text-white leading-snug">{item.q[lang]}</span>
                          </div>
                          <div className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full liquid-glass transition-all duration-300">
                            <ChevronDown size={12} className="transition-transform duration-300 text-white/35"
                              style={{ transform: open ? 'rotate(180deg)' : 'none' }} />
                          </div>
                        </button>

                        <div style={{
                          maxHeight: open ? '400px' : '0px',
                          overflow: 'hidden',
                          transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
                        }}>
                          <div className="px-6 pb-5" style={{ borderTop: `1px solid ${c}15` }}>
                            <p className="pt-4 text-sm leading-relaxed text-white/35">{item.a[lang]}</p>
                          </div>
                        </div>
                      </div>
                    </FadeUp>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════
            CTA
        ═══════════════════════════════════════════════════════ */}
        <section className="relative px-4 py-32 overflow-hidden">
          <div className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 70% 80% at 50% 50%, ${c}12 0%, transparent 60%)` }} />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${c}35, transparent)` }} />
          <div className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          <FadeUp className="mx-auto max-w-xl text-center relative">
            {/* Big icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl blur-2xl opacity-40 scale-150 pointer-events-none"
                  style={{ background: c }} />
                <div className="liquid-glass relative flex h-20 w-20 items-center justify-center rounded-3xl"
                  style={{ boxShadow: `0 0 40px ${c}25` }}>
                  <ProductIcon type={product.visual as VisualType} color={c} size={32} />
                </div>
              </div>
            </div>

            <BlurWords
              text={lang === 'vi' ? 'Sẵn sàng bắt đầu?' : 'Ready to get started?'}
              className="text-3xl font-black text-white md:text-[2.5rem] leading-tight tracking-tight mb-4 justify-center"
            />

            <p className="mb-3 text-base leading-relaxed text-white/40">
              {lang === 'vi'
                ? 'Demo 30 phút — miễn phí, không ràng buộc, không cần cài đặt.'
                : '30-minute demo — free, no commitment, nothing to install.'}
            </p>

            <div className="mb-10 flex items-center justify-center gap-5 flex-wrap">
              {(lang === 'vi'
                ? ['Miễn phí tư vấn', 'Phản hồi trong 24h', 'Không ràng buộc']
                : ['Free consultation', 'Reply within 24h', 'No commitment']
              ).map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-white/30">
                  <span style={{ color: c }}>✓</span> {t}
                </span>
              ))}
            </div>

            <a href="/#contact"
              className="group liquid-glass-strong relative inline-flex items-center gap-2.5 rounded-2xl px-9 py-4 text-base font-bold text-white overflow-hidden transition-all duration-300 hover:scale-[1.04] active:scale-95"
              style={{ boxShadow: `0 0 40px ${c}30` }}>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit]"
                style={{ background: `linear-gradient(135deg, ${c}18, transparent)` }} />
              <span className="relative">{product.cta[lang]}</span>
              <ArrowUpRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </FadeUp>
        </section>

      </main>
      <Footer />
    </div>
  )
}
