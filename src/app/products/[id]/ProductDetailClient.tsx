'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronDown, ArrowUpRight } from 'lucide-react'
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

function useCountUp(target: string, inView: boolean) {
  const [display, setDisplay] = useState('0')
  useEffect(() => {
    if (!inView) return
    const num = parseFloat(target.replace(/[^0-9.]/g, ''))
    if (isNaN(num)) { setDisplay(target); return }
    const suffix = target.replace(/[0-9.]/g, '')
    let start = 0
    const steps = 40
    const inc = num / steps
    let frame = 0
    const timer = setInterval(() => {
      frame++
      start = Math.min(start + inc, num)
      const val = Number.isInteger(num) ? Math.round(start).toString() : start.toFixed(1)
      setDisplay(val + suffix)
      if (frame >= steps) clearInterval(timer)
    }, 30)
    return () => clearInterval(timer)
  }, [inView, target])
  return display
}

function CounterMetric({ metric, label, color }: { metric: string; label: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const display = useCountUp(metric, inView)
  return (
    <div ref={ref} className="flex flex-col items-center py-10 px-6 text-center">
      <span className="text-4xl font-black md:text-5xl tabular-nums" style={{ color }}>{display}</span>
      <span className="mt-2 text-xs text-zinc-500 leading-snug max-w-[100px]">{label}</span>
    </div>
  )
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

export function ProductDetailClient({ product, detail }: Props) {
  const { lang } = useLang()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#09090f' }}>
      <Navbar />

      <main className="flex-1 pt-20">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden px-4 py-20 md:py-28">
          {/* Background layers */}
          <div className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 70% 60% at 60% 0%, ${product.color}20 0%, transparent 60%)` }} />
          <div className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 40% 40% at 20% 80%, ${product.color}10 0%, transparent 60%)` }} />
          {/* Grid dots */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

          <div className="mx-auto max-w-6xl">
            <Link href="/#products"
              className="mb-10 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-white transition-colors group">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] group-hover:border-white/20 transition-colors">
                <ArrowLeft size={13} />
              </span>
              {lang === 'vi' ? 'Tất cả sản phẩm' : 'All products'}
            </Link>

            <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
              {/* Left */}
              <div>
                {/* Badge row */}
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
                    style={{ background: `${product.color}18`, color: product.color, border: `1px solid ${product.color}35` }}>
                    <ProductIcon type={product.visual as VisualType} color={product.color} size={14} />
                    {product.name}
                  </span>
                  {product.featured && (
                    <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      Flagship
                    </span>
                  )}
                </div>

                <h1 className="mb-5 text-4xl font-black text-white leading-tight md:text-5xl lg:text-[52px]">
                  {detail ? detail.tagline[lang] : product.headline[lang]}
                </h1>
                <p className="mb-8 text-lg text-zinc-400 leading-relaxed max-w-lg">
                  {detail ? detail.heroDesc[lang] : product.desc[lang]}
                </p>

                {/* Tech stack */}
                <div className="mb-10 flex flex-wrap gap-2">
                  {product.tech.map((t) => (
                    <span key={t} className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-xs text-zinc-400 hover:border-white/20 hover:text-zinc-200 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <a href="/#contact"
                    className="shimmer-btn relative inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${product.color}, ${product.color}cc)`, boxShadow: `0 0 28px ${product.color}35` }}>
                    {product.cta[lang]}
                    <ArrowUpRight size={14} />
                  </a>
                  <a href="/#contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-zinc-300 hover:bg-white/[0.07] hover:border-white/15 transition-all">
                    {lang === 'vi' ? 'Đặt demo' : 'Book demo'}
                  </a>
                </div>
              </div>

              {/* Right — visual */}
              <div className="relative">
                {/* Glow halo */}
                <div className="pointer-events-none absolute -inset-8 rounded-3xl opacity-30"
                  style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${product.color}30, transparent 70%)` }} />
                <div className="relative rounded-2xl overflow-hidden border border-white/[0.07]"
                  style={{ background: `linear-gradient(135deg, ${product.color}10 0%, rgba(255,255,255,0.02) 100%)` }}>
                  <div className="p-1">
                    <ProductVisual type={product.visual as VisualType} color={product.color} large />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── METRICS BAR ── */}
        {detail && (
          <section className="relative border-y border-white/[0.04]" style={{ background: '#0b0b12' }}>
            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-3 divide-x divide-white/[0.04]">
                {detail.results.map((r, i) => (
                  <CounterMetric key={i} metric={r.metric} label={r.label[lang]} color={product.color} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FEATURES ── */}
        {detail && detail.features.length > 0 && (
          <section className="relative px-4 py-24 overflow-hidden">
            <div className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(ellipse 50% 40% at 80% 50%, ${product.color}0a 0%, transparent 60%)` }} />
            <div className="mx-auto max-w-6xl relative">
              <FadeIn className="mb-16 text-center">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
                  {lang === 'vi' ? 'Tính năng' : 'Features'}
                </p>
                <h2 className="text-3xl font-black text-white md:text-4xl">
                  {lang === 'vi' ? 'Mọi thứ bạn cần' : 'Everything you need'}
                  <br />
                  <span className="bg-gradient-to-r from-white/60 to-white/30 bg-clip-text text-transparent">
                    {lang === 'vi' ? '— không thừa, không thiếu.' : '— nothing more, nothing less.'}
                  </span>
                </h2>
              </FadeIn>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {detail.features.map((f, i) => (
                  <FadeIn key={i} delay={i * 60}>
                    <FeatureCard feature={f} color={product.color} lang={lang} />
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── HOW IT WORKS ── */}
        {detail && detail.howItWorks.length > 0 && (
          <section className="relative px-4 py-24 overflow-hidden" style={{ background: '#0b0b12' }}>
            <div className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(ellipse 50% 60% at 20% 50%, ${product.color}08 0%, transparent 60%)` }} />
            <div className="mx-auto max-w-3xl relative">
              <FadeIn className="mb-16 text-center">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
                  {lang === 'vi' ? 'Quy trình' : 'How it works'}
                </p>
                <h2 className="text-3xl font-black text-white md:text-4xl">
                  {lang === 'vi' ? 'Hoạt động như thế nào?' : 'Simple by design.'}
                </h2>
              </FadeIn>

              <div className="relative">
                {/* Vertical connecting line */}
                <div className="absolute left-[27px] top-8 bottom-8 w-px hidden sm:block"
                  style={{ background: `linear-gradient(to bottom, transparent, ${product.color}40, transparent)` }} />

                <div className="space-y-5">
                  {detail.howItWorks.map((s, i) => (
                    <FadeIn key={i} delay={i * 100}>
                      <div className="flex gap-5 group">
                        <div className="relative flex-shrink-0">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-sm font-black transition-all duration-300 group-hover:scale-105"
                            style={{ background: `${product.color}20`, color: product.color, border: `1px solid ${product.color}30` }}>
                            {s.number}
                          </div>
                        </div>
                        <div className="flex-1 rounded-2xl border border-white/[0.05] p-6 transition-all duration-300 group-hover:border-white/10"
                          style={{ background: 'linear-gradient(160deg, #13131e 0%, #0e0e18 100%)' }}>
                          <h3 className="mb-2 font-bold text-white">{s.title[lang]}</h3>
                          <p className="text-sm leading-relaxed text-zinc-500">{s.desc[lang]}</p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        {detail && detail.faq.length > 0 && (
          <section className="px-4 py-24">
            <div className="mx-auto max-w-2xl">
              <FadeIn className="mb-12 text-center">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">FAQ</p>
                <h2 className="text-3xl font-black text-white">
                  {lang === 'vi' ? 'Câu hỏi thường gặp' : 'Common questions'}
                </h2>
              </FadeIn>
              <div className="space-y-3">
                {detail.faq.map((item, i) => (
                  <FadeIn key={i} delay={i * 60}>
                    <div className="rounded-2xl border overflow-hidden transition-all duration-300"
                      style={{
                        borderColor: openFaq === i ? `${product.color}35` : 'rgba(255,255,255,0.05)',
                        background: openFaq === i
                          ? `linear-gradient(160deg, ${product.color}08, #0e0e18)`
                          : 'linear-gradient(160deg, #13131e, #0e0e18)',
                      }}>
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="flex w-full items-center justify-between px-6 py-5 text-left gap-4">
                        <span className="text-sm font-semibold text-white">{item.q[lang]}</span>
                        <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300"
                          style={{ background: openFaq === i ? `${product.color}25` : 'rgba(255,255,255,0.05)' }}>
                          <ChevronDown size={13} className="text-zinc-400 transition-transform duration-300"
                            style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', color: openFaq === i ? product.color : undefined }} />
                        </span>
                      </button>
                      {openFaq === i && (
                        <div className="border-t px-6 py-5 text-sm leading-relaxed text-zinc-400 animate-fade-in"
                          style={{ borderColor: `${product.color}20` }}>
                          {item.a[lang]}
                        </div>
                      )}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="relative px-4 py-28 overflow-hidden">
          <div className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 70% 80% at 50% 50%, ${product.color}15 0%, transparent 65%)` }} />
          <div className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

          <FadeIn className="mx-auto max-w-xl text-center relative">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl mx-auto"
              style={{ background: `${product.color}20`, border: `1px solid ${product.color}35` }}>
              <ProductIcon type={product.visual as VisualType} color={product.color} size={28} />
            </div>
            <h2 className="mb-4 text-3xl font-black text-white md:text-4xl">
              {lang === 'vi' ? 'Sẵn sàng bắt đầu?' : 'Ready to get started?'}
            </h2>
            <p className="mb-10 text-zinc-400 text-lg">
              {lang === 'vi'
                ? 'Đặt lịch demo 30 phút. Miễn phí, không ràng buộc.'
                : 'Book a 30-minute demo. Free, no commitment.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="/#contact"
                className="shimmer-btn inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-base font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${product.color}, ${product.color}bb)`, boxShadow: `0 0 40px ${product.color}35` }}>
                {product.cta[lang]}
                <ArrowUpRight size={16} />
              </a>
            </div>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </div>
  )
}

interface FeatureCardProps {
  feature: { icon: string; title: { vi: string; en: string }; desc: { vi: string; en: string } }
  color: string
  lang: 'vi' | 'en'
}

function FeatureCard({ feature, color, lang }: FeatureCardProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="group relative rounded-2xl border p-6 overflow-hidden transition-all duration-400 cursor-default"
      style={{
        borderColor: hovered ? `${color}35` : 'rgba(255,255,255,0.05)',
        background: hovered
          ? `linear-gradient(160deg, ${color}0a 0%, #0e0e18 100%)`
          : 'linear-gradient(160deg, #13131e 0%, #0e0e18 100%)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? `0 8px 32px ${color}12` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: hovered ? 0.5 : 0 }} />

      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-xl transition-all duration-300"
        style={{ background: `${color}${hovered ? '25' : '15'}` }}>
        {feature.icon}
      </div>
      <h3 className="mb-2.5 text-sm font-bold text-white">{feature.title[lang]}</h3>
      <p className="text-xs leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors">{feature.desc[lang]}</p>
    </div>
  )
}
