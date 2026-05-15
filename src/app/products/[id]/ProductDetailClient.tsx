'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight, ChevronDown, Zap, CheckCircle2 } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProductVisual } from '@/components/ui/ProductVisual'
import { ProductIcon } from '@/components/ui/ProductIcon'
import type { Product, VisualType } from '@/types'
import type { ProductDetail } from '@/data/productDetails'

interface Props {
  product: Product
  detail: ProductDetail | null
}

/* ─── Hooks ──────────────────────────────────────────────────────────── */

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
    let start = 0; const steps = 50; const inc = num / steps; let frame = 0
    const timer = setInterval(() => {
      frame++; start = Math.min(start + inc, num)
      const val = Number.isInteger(num) ? Math.round(start).toString() : start.toFixed(1)
      setDisplay(val + suffix)
      if (frame >= steps) clearInterval(timer)
    }, 25)
    return () => clearInterval(timer)
  }, [inView, target])
  return display
}

/* ─── Primitives ─────────────────────────────────────────────────────── */

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.06)
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

function GradientBorder({ children, color, className = '', radius = '1rem' }: {
  children: React.ReactNode; color: string; className?: string; radius?: string
}) {
  return (
    <div className={`relative ${className}`} style={{ borderRadius: radius }}>
      <div className="absolute inset-0 rounded-[inherit] p-px pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${color}50, ${color}10, transparent, ${color}20)`, borderRadius: radius }}>
        <div className="w-full h-full rounded-[inherit]" style={{ background: '#0e0e1a' }} />
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}

function StatCard({ metric, label, color }: { metric: string; label: string; color: string }) {
  const { ref, inView } = useInView(0.4)
  const display = useCountUp(metric, inView)
  return (
    <div ref={ref} className="relative flex flex-col items-center gap-2 py-10 px-8 text-center group">
      {/* Subtle hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${color}08, transparent)` }} />
      <span className="relative font-black tabular-nums tracking-tight leading-none"
        style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', color, filter: `drop-shadow(0 0 20px ${color}60)` }}>
        {display}
      </span>
      <span className="relative text-xs text-zinc-500 leading-snug max-w-[120px] font-medium">{label}</span>
    </div>
  )
}

/* ─── Feature Bento ──────────────────────────────────────────────────── */

function FeatureLarge({ feature, color, lang, index }: {
  feature: { icon: string; title: { vi: string; en: string }; desc: { vi: string; en: string } }
  color: string; lang: 'vi' | 'en'; index: number
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="relative rounded-2xl overflow-hidden cursor-default col-span-1 md:col-span-2 transition-all duration-500"
      style={{
        background: hovered
          ? `linear-gradient(145deg, ${color}12 0%, #0f0f1d 60%, ${color}06 100%)`
          : 'linear-gradient(145deg, #111120 0%, #0d0d18 100%)',
        border: `1px solid ${hovered ? color + '30' : 'rgba(255,255,255,0.05)'}`,
        boxShadow: hovered ? `0 0 40px ${color}15, inset 0 1px 0 ${color}15` : 'inset 0 1px 0 rgba(255,255,255,0.03)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-px transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${color}80 50%, transparent 100%)`, opacity: hovered ? 1 : 0.2 }} />
      {/* Corner glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}18, transparent 70%)`, opacity: hovered ? 1 : 0.3 }} />

      <div className="flex flex-col md:flex-row gap-6 p-8">
        <div className="flex-shrink-0">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-all duration-300"
            style={{ background: `${color}${hovered ? '22' : '14'}`, border: `1px solid ${color}${hovered ? '40' : '20'}` }}>
            {feature.icon}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase"
              style={{ color: color + 'aa' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-base font-bold text-white">{feature.title[lang]}</h3>
          </div>
          <p className="text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400 max-w-xl"
            style={{ transition: 'color 0.3s' }}>
            {feature.desc[lang]}
          </p>
        </div>
      </div>
    </div>
  )
}

function FeatureSmall({ feature, color, lang, index }: {
  feature: { icon: string; title: { vi: string; en: string }; desc: { vi: string; en: string } }
  color: string; lang: 'vi' | 'en'; index: number
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="relative rounded-2xl overflow-hidden cursor-default h-full transition-all duration-500"
      style={{
        background: hovered
          ? `linear-gradient(145deg, ${color}10 0%, #0f0f1d 100%)`
          : 'linear-gradient(145deg, #111120 0%, #0d0d18 100%)',
        border: `1px solid ${hovered ? color + '28' : 'rgba(255,255,255,0.05)'}`,
        boxShadow: hovered ? `0 0 24px ${color}10` : 'none',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)`, opacity: hovered ? 0.8 : 0.15, transition: 'opacity 0.4s' }} />

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-lg transition-all duration-300"
            style={{ background: `${color}${hovered ? '20' : '12'}` }}>
            {feature.icon}
          </div>
          <span className="text-[10px] font-bold tracking-[0.15em]"
            style={{ color: color + '60' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 className="mb-2 text-sm font-bold text-white leading-snug">{feature.title[lang]}</h3>
        <p className="text-xs leading-relaxed text-zinc-600 group-hover:text-zinc-500">{feature.desc[lang]}</p>
      </div>
    </div>
  )
}

/* ─── Screenshot availability ───────────────────────────────────────── */
const SCREENSHOT_IDS = new Set([
  'digital-office', 'crm', 'bigdata-pipeline', 'hubspot-auto',
  'arcso', 'extensions-suite', 'taomeettrap', 'crm-v2',
])

/* ─── Main Component ─────────────────────────────────────────────────── */

export function ProductDetailClient({ product, detail }: Props) {
  const { lang } = useLang()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const c = product.color

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#080810' }}>
      <Navbar />

      <main className="flex-1 pt-20">

        {/* ═══════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden px-4 pt-16 pb-24 md:pt-20 md:pb-32">
          {/* Ambient background */}
          <div className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 80% 70% at 65% -10%, ${c}1a 0%, transparent 55%)` }} />
          <div className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 50% 40% at 10% 90%, ${c}0d 0%, transparent 55%)` }} />
          {/* Noise texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.018]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '200px 200px' }} />
          {/* Dot grid */}
          <div className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: `radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />

          <div className="mx-auto max-w-7xl">
            {/* Breadcrumb */}
            <FadeUp className="mb-12">
              <Link href="/#products"
                className="inline-flex items-center gap-2.5 text-sm text-zinc-600 hover:text-white transition-colors duration-200 group">
                <span className="flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 group-hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <ArrowLeft size={12} />
                </span>
                <span className="group-hover:text-zinc-300">{lang === 'vi' ? 'Tất cả sản phẩm' : 'All products'}</span>
              </Link>
            </FadeUp>

            <div className="grid gap-12 lg:grid-cols-[1fr_480px] lg:gap-16 xl:gap-24 items-start">

              {/* ── Left col ── */}
              <div>
                {/* Badge row */}
                <FadeUp delay={60}>
                  <div className="mb-6 flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em]"
                      style={{ background: `${c}15`, color: c, border: `1px solid ${c}30`, boxShadow: `0 0 12px ${c}15` }}>
                      <ProductIcon type={product.visual as VisualType} color={c} size={13} />
                      {product.name}
                    </span>
                    {product.featured && (
                      <span className="rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em]"
                        style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        Flagship
                      </span>
                    )}
                  </div>
                </FadeUp>

                {/* Headline */}
                <FadeUp delay={100}>
                  <h1 className="mb-6 font-black text-white leading-[1.1] tracking-tight"
                    style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                    {detail ? detail.tagline[lang] : product.headline[lang]}
                  </h1>
                </FadeUp>

                {/* Description */}
                <FadeUp delay={140}>
                  <p className="mb-8 text-lg leading-relaxed max-w-xl"
                    style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {detail ? detail.heroDesc[lang] : product.desc[lang]}
                  </p>
                </FadeUp>

                {/* Tech stack */}
                <FadeUp delay={180}>
                  <div className="mb-10">
                    <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-700">
                      {lang === 'vi' ? 'Công nghệ' : 'Tech stack'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.tech.map((t) => (
                        <span key={t}
                          className="rounded-lg px-3 py-1.5 text-[11px] font-mono font-medium transition-all duration-200 hover:text-white cursor-default"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.45)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeUp>

                {/* CTAs */}
                <FadeUp delay={220}>
                  <div className="flex flex-wrap gap-3">
                    <a href="/#contact"
                      className="group relative inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-bold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                      style={{ background: `linear-gradient(135deg, ${c} 0%, ${c}cc 100%)`, boxShadow: `0 0 30px ${c}35` }}>
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.12), transparent)' }} />
                      <span className="relative">{product.cta[lang]}</span>
                      <ArrowUpRight size={15} className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <a href="/#contact"
                      className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-medium transition-all duration-200 hover:scale-[1.01]"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)' }}>
                      {lang === 'vi' ? 'Đặt demo' : 'Book demo'}
                    </a>
                  </div>
                </FadeUp>
              </div>

              {/* ── Right col: Visual card ── */}
              <FadeUp delay={160} className="lg:sticky lg:top-28">
                <div className="relative">
                  {/* Outer glow */}
                  <div className="absolute -inset-6 rounded-3xl pointer-events-none"
                    style={{ background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${c}20, transparent 70%)` }} />

                  {/* Glassmorphism card */}
                  <div className="relative rounded-2xl overflow-hidden"
                    style={{ border: `1px solid ${c}25`, background: `linear-gradient(145deg, ${c}0c 0%, rgba(255,255,255,0.02) 50%, ${c}06 100%)` }}>

                    {/* Card top bar */}
                    <div className="flex items-center justify-between px-4 py-3 border-b"
                      style={{ borderColor: `${c}15`, background: `${c}08` }}>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
                        <span className="text-[11px] font-medium" style={{ color: `${c}cc` }}>{product.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                        <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                        <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                      </div>
                    </div>

                    <div className={SCREENSHOT_IDS.has(product.id) ? 'relative overflow-hidden' : 'p-3'}>
                      {SCREENSHOT_IDS.has(product.id) ? (
                        <Image
                          src={`/screenshots/${product.id}.png`}
                          alt={product.name}
                          width={960}
                          height={600}
                          className="w-full h-auto object-cover object-top"
                          style={{ display: 'block' }}
                          priority
                        />
                      ) : (
                        <ProductVisual type={product.visual as VisualType} color={c} large />
                      )}
                    </div>

                    {/* Overlay shimmer */}
                    <div className="absolute inset-0 pointer-events-none rounded-2xl"
                      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(255,255,255,0.01) 100%)' }} />
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            METRICS BAR
        ════════════════════════════════════════════════════════ */}
        {detail && (
          <FadeUp>
            <section className="relative overflow-hidden"
              style={{ background: 'linear-gradient(180deg, #080810 0%, #0b0b16 50%, #080810 100%)' }}>
              {/* Subtle line separators */}
              <div className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${c}25, transparent)` }} />
              <div className="absolute inset-x-0 bottom-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${c}15, transparent)` }} />

              <div className="mx-auto max-w-4xl">
                <div className="grid grid-cols-3">
                  {detail.results.map((r, i) => (
                    <div key={i} style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <StatCard metric={r.metric} label={r.label[lang]} color={c} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </FadeUp>
        )}

        {/* ═══════════════════════════════════════════════════════
            FEATURES — BENTO GRID
        ════════════════════════════════════════════════════════ */}
        {detail && detail.features.length > 0 && (
          <section className="relative px-4 py-28 overflow-hidden">
            <div className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(ellipse 60% 50% at 85% 50%, ${c}09 0%, transparent 60%)` }} />

            <div className="mx-auto max-w-6xl relative">
              {/* Section header */}
              <FadeUp className="mb-16">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1"
                      style={{ background: `${c}12`, border: `1px solid ${c}25` }}>
                      <Zap size={10} style={{ color: c }} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: c }}>
                        {lang === 'vi' ? 'Tính năng' : 'Features'}
                      </span>
                    </div>
                    <h2 className="text-3xl font-black text-white leading-tight md:text-4xl">
                      {lang === 'vi' ? 'Được xây dựng để' : 'Built to'}{' '}
                      <span className="bg-clip-text text-transparent"
                        style={{ backgroundImage: `linear-gradient(135deg, ${c} 0%, ${c}88 100%)` }}>
                        {lang === 'vi' ? 'tạo ra kết quả thực' : 'deliver real results'}
                      </span>
                    </h2>
                  </div>
                  <p className="text-sm text-zinc-600 max-w-xs leading-relaxed md:text-right">
                    {lang === 'vi'
                      ? 'Mỗi tính năng được thiết kế để giải quyết một vấn đề cụ thể.'
                      : 'Every feature is designed to solve a specific problem.'}
                  </p>
                </div>
              </FadeUp>

              {/* Bento grid — first item spans 2 cols, rest fill */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
                {detail.features.map((f, i) => (
                  <FadeUp key={i} delay={i * 55}>
                    {i === 0 ? (
                      <FeatureLarge feature={f} color={c} lang={lang} index={i} />
                    ) : (
                      <FeatureSmall feature={f} color={c} lang={lang} index={i} />
                    )}
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════
            HOW IT WORKS
        ════════════════════════════════════════════════════════ */}
        {detail && detail.howItWorks.length > 0 && (
          <section className="relative px-4 py-28 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #080810 0%, #0a0a14 100%)' }}>
            <div className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(ellipse 45% 60% at 15% 50%, ${c}09 0%, transparent 55%)` }} />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${c}15, transparent)` }} />

            <div className="mx-auto max-w-4xl relative">
              <FadeUp className="mb-16 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1"
                  style={{ background: `${c}12`, border: `1px solid ${c}25` }}>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: c }}>
                    {lang === 'vi' ? 'Quy trình' : 'How it works'}
                  </span>
                </div>
                <h2 className="text-3xl font-black text-white md:text-4xl">
                  {lang === 'vi' ? 'Ba bước — không phức tạp hơn.' : 'Three steps — no more.'}
                </h2>
              </FadeUp>

              <div className="relative space-y-4">
                {/* Connecting line */}
                <div className="absolute left-7 top-14 bottom-14 w-px hidden sm:block pointer-events-none"
                  style={{ background: `linear-gradient(to bottom, transparent, ${c}35 20%, ${c}35 80%, transparent)` }} />

                {detail.howItWorks.map((step, i) => (
                  <FadeUp key={i} delay={i * 110}>
                    <div className="flex gap-5 group">
                      {/* Number node */}
                      <div className="relative flex-shrink-0 z-10">
                        <div className="flex h-14 w-14 flex-col items-center justify-center rounded-2xl transition-all duration-400 group-hover:scale-105"
                          style={{
                            background: `linear-gradient(145deg, ${c}22 0%, ${c}10 100%)`,
                            border: `1px solid ${c}35`,
                            boxShadow: `0 0 16px ${c}15`,
                          }}>
                          <span className="font-black text-sm leading-none tabular-nums" style={{ color: c }}>{step.number}</span>
                        </div>
                        {/* Pulse ring */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                          style={{ boxShadow: `0 0 0 6px ${c}12` }} />
                      </div>

                      {/* Card */}
                      <div className="flex-1 rounded-2xl p-6 transition-all duration-400 group-hover:-translate-y-0.5"
                        style={{
                          background: 'linear-gradient(145deg, #111120 0%, #0d0d18 100%)',
                          border: '1px solid rgba(255,255,255,0.05)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
                        }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLElement
                          el.style.borderColor = `${c}25`
                          el.style.boxShadow = `0 8px 32px ${c}12, inset 0 1px 0 ${c}10`
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLElement
                          el.style.borderColor = 'rgba(255,255,255,0.05)'
                          el.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.03)'
                        }}>
                        <div className="flex items-start justify-between mb-2.5">
                          <h3 className="font-bold text-white text-[15px] leading-snug">{step.title[lang]}</h3>
                          <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                            style={{ color: c }} />
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-500">{step.desc[lang]}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════
            FAQ
        ════════════════════════════════════════════════════════ */}
        {detail && detail.faq.length > 0 && (
          <section className="relative px-4 py-24 overflow-hidden">
            <div className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(ellipse 40% 50% at 80% 50%, ${c}07 0%, transparent 60%)` }} />

            <div className="mx-auto max-w-2xl relative">
              <FadeUp className="mb-12 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1"
                  style={{ background: `${c}12`, border: `1px solid ${c}25` }}>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: c }}>FAQ</span>
                </div>
                <h2 className="text-3xl font-black text-white">
                  {lang === 'vi' ? 'Câu hỏi thường gặp' : 'Common questions'}
                </h2>
              </FadeUp>

              <div className="space-y-2.5">
                {detail.faq.map((item, i) => {
                  const open = openFaq === i
                  return (
                    <FadeUp key={i} delay={i * 70}>
                      <div className="rounded-2xl overflow-hidden transition-all duration-300"
                        style={{
                          border: `1px solid ${open ? c + '30' : 'rgba(255,255,255,0.05)'}`,
                          background: open
                            ? `linear-gradient(145deg, ${c}0a 0%, #0f0f1d 100%)`
                            : 'linear-gradient(145deg, #111120 0%, #0d0d18 100%)',
                          boxShadow: open ? `0 0 30px ${c}10` : 'none',
                        }}>
                        {/* Question */}
                        <button
                          onClick={() => setOpenFaq(open ? null : i)}
                          className="flex w-full items-center justify-between px-6 py-5 text-left gap-4 group">
                          <div className="flex items-center gap-3">
                            <span className="font-black text-xs tabular-nums" style={{ color: c + '70' }}>
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="text-sm font-semibold text-white leading-snug">{item.q[lang]}</span>
                          </div>
                          <div className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300"
                            style={{ background: open ? `${c}22` : 'rgba(255,255,255,0.05)', border: `1px solid ${open ? c + '35' : 'rgba(255,255,255,0.07)'}` }}>
                            <ChevronDown size={12} className="transition-transform duration-300"
                              style={{ color: open ? c : 'rgba(255,255,255,0.4)', transform: open ? 'rotate(180deg)' : 'none' }} />
                          </div>
                        </button>

                        {/* Answer */}
                        <div style={{
                          maxHeight: open ? '400px' : '0px',
                          overflow: 'hidden',
                          transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)',
                        }}>
                          <div className="px-6 pb-5 border-t" style={{ borderColor: `${c}18` }}>
                            <p className="pt-4 text-sm leading-relaxed text-zinc-500">{item.a[lang]}</p>
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

        {/* ═══════════════════════════════════════════════════════
            CTA SECTION
        ════════════════════════════════════════════════════════ */}
        <section className="relative px-4 py-32 overflow-hidden">
          {/* Multi-layer background */}
          <div className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 80% 90% at 50% 50%, ${c}14 0%, transparent 60%)` }} />
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(180deg, #080810 0%, #0b0b18 50%, #080810 100%)' }} />
          {/* Dot grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />
          {/* Top glow line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent 0%, ${c}40 50%, transparent 100%)` }} />

          <FadeUp className="mx-auto max-w-xl text-center relative">
            {/* Icon */}
            <div className="mb-8 relative inline-flex">
              <div className="absolute inset-0 rounded-3xl blur-2xl opacity-50 scale-150 pointer-events-none"
                style={{ background: c }} />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl mx-auto"
                style={{
                  background: `linear-gradient(145deg, ${c}25 0%, ${c}10 100%)`,
                  border: `1px solid ${c}40`,
                  boxShadow: `0 0 0 1px ${c}15, 0 0 40px ${c}20`,
                }}>
                <ProductIcon type={product.visual as VisualType} color={c} size={32} />
              </div>
            </div>

            <h2 className="mb-4 text-3xl font-black text-white md:text-[2.6rem] leading-tight tracking-tight">
              {lang === 'vi' ? 'Sẵn sàng bắt đầu?' : 'Ready to get started?'}
            </h2>
            <p className="mb-3 text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {lang === 'vi'
                ? 'Demo 30 phút — miễn phí, không ràng buộc, không cần cài đặt.'
                : '30-minute demo — free, no commitment, nothing to install.'}
            </p>

            {/* Trust signals */}
            <div className="mb-10 flex items-center justify-center gap-5">
              {(lang === 'vi'
                ? ['Miễn phí tư vấn', 'Phản hồi trong 24h', 'Không ràng buộc']
                : ['Free consultation', 'Reply within 24h', 'No commitment']
              ).map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-zinc-600">
                  <span style={{ color: c }}>✓</span> {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="/#contact"
                className="group relative inline-flex items-center gap-2.5 rounded-xl px-9 py-4 text-base font-bold text-white overflow-hidden transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: `linear-gradient(135deg, ${c} 0%, ${c}bb 100%)`,
                  boxShadow: `0 0 40px ${c}35, 0 4px 24px ${c}20`,
                }}>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15), transparent)' }} />
                <span className="relative">{product.cta[lang]}</span>
                <ArrowUpRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </FadeUp>
        </section>

      </main>
      <Footer />
    </div>
  )
}
