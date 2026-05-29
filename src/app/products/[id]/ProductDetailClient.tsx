'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronDown, Zap } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProductIcon } from '@/components/ui/ProductIcon'
import { ProductMockup } from '@/components/ui/ProductMockup'
import { SemanticIcon } from '@/components/ui/SemanticIcon'
import { ProductPageHero } from '@/components/ui/ProductPageHero'
import type { Product, VisualType } from '@/types'
import type { ProductDetail, PainPoint } from '@/data/productDetails'

interface Props {
  product: Product
  detail: ProductDetail | null
}

/* ─── Hooks ──────────────────────────────────────────────── */

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
    // Parse: optional prefix + number + optional suffix (e.g. "<1 min", "99.8%", "24/7")
    const match = target.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/)
    if (!match) {
      requestAnimationFrame(() => setDisplay(target))
      return
    }
    const [, prefix, raw, suffix] = match
    const num = parseFloat(raw)
    if (isNaN(num)) {
      requestAnimationFrame(() => setDisplay(target))
      return
    }
    const start = performance.now()
    const dur = 900
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      const v = Number.isInteger(num) ? Math.round(e * num) : (e * num).toFixed(1)
      setDisplay(prefix + v + suffix)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])
  return display
}

function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const { ref, inView } = useInView(0.06)
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

/* ─── Stat card ───────────────────────────────────────────── */

function StatCard({ metric, label, color }: { metric: string; label: string; color: string }) {
  const { ref, inView } = useInView(0.4)
  const display = useCountUp(metric, inView)
  return (
    <div ref={ref} className="liquid-glass flex flex-col items-center gap-2 py-8 px-6 text-center rounded-2xl">
      <span className="font-black tabular-nums tracking-tight leading-none"
        style={{
          fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          filter: `drop-shadow(0 0 16px ${color}50)`,
        }}>
        {display}
      </span>
      <span className="text-xs text-white/40 leading-snug max-w-[120px] font-medium tracking-wide">{label}</span>
    </div>
  )
}

/* ─── Feature card ─────────────────────────────────────────── */

function FeatureCard({ feature, color, lang, index }: {
  feature: { icon: string; title: { vi: string; en: string }; desc: { vi: string; en: string } }
  color: string; lang: 'vi' | 'en'; index: number
}) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    cardRef.current!.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    cardRef.current!.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  return (
    <div
      ref={cardRef}
      className="liquid-glass rounded-2xl cursor-default flex flex-col"
      style={{
        padding: '20px',
        minHeight: 160,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? `0 0 0 1px ${color}25, 0 16px 40px ${color}10` : 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] z-0"
        style={{
          background: `radial-gradient(circle 160px at var(--mx,50%) var(--my,50%), ${color}08 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
        }} />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Icon + number */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ background: `${color}14`, border: `1px solid ${color}25` }}>
            <SemanticIcon name={feature.icon} size={18} color={color} />
          </div>
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase"
            style={{ color: `${color}55` }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="text-sm font-bold text-white leading-snug mb-2">
          {feature.title[lang]}
        </h3>
        <p className="text-xs leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.38)' }}>
          {feature.desc[lang]}
        </p>
      </div>
    </div>
  )
}

/* ─── Pain point card ─────────────────────────────────────── */

function PainCard({ p, lang, delay }: { p: PainPoint; lang: 'vi' | 'en'; delay: number }) {
  return (
    <FadeUp delay={delay}>
      <div className="liquid-glass rounded-2xl p-5 flex items-start gap-4 h-full">
        <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
          <SemanticIcon name={p.icon} size={18} color="#ef4444" />
        </div>
        <p className="text-sm leading-relaxed text-white/45 pt-1">{p.text[lang]}</p>
      </div>
    </FadeUp>
  )
}

/* ─── Main Component ─────────────────────────────────────── */

export function ProductDetailClient({ product, detail }: Props) {
  const { lang } = useLang()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const c = product.color

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#07070e' }}>
      <Navbar />

      <main className="flex-1">

        {/* ══════════════════════════════════════════════════════
            HERO — ProductPageHero (canvas animation, editorial)
        ═══════════════════════════════════════════════════════ */}
        <ProductPageHero
          name={product.name}
          category={lang === 'vi' ? 'Sản phẩm' : 'Product'}
          featured={product.featured}
          tagline={detail ? detail.tagline[lang] : product.headline[lang]}
          color={c}
          stats={detail
            ? detail.results.slice(0, 3).map(r => ({ metric: r.metric, label: r.label[lang] }))
            : [{ metric: '24/7', label: lang === 'vi' ? 'Hoạt động' : 'Uptime' }]
          }
          tech={product.tech}
          ctaLabel={product.cta[lang]}
          demoLabel={lang === 'vi' ? 'Đặt demo' : 'Book demo'}
          backLabel={lang === 'vi' ? 'Tất cả sản phẩm' : 'All products'}
          eyebrowIcon={<ProductIcon type={product.visual as VisualType} color={c} size={12} />}
        />

        {/* ── MOCKUP — full-width, overlapping hero bottom ── */}
        <div className="relative" style={{ background: '#07070e', marginTop: -40 }}>
          <div className="mx-auto max-w-5xl px-4 pb-0">
            <FadeUp delay={100}>
              <div className="relative">
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
                  style={{ width: '80%', height: 60, background: c, filter: 'blur(50px)', opacity: 0.2, borderRadius: '50%' }} />
                <div style={{
                  transform: 'perspective(1200px) rotateX(4deg)',
                  transformOrigin: 'center bottom',
                  boxShadow: `0 40px 120px rgba(0,0,0,0.85), 0 0 0 1px ${c}15`,
                  borderRadius: 16,
                  overflow: 'hidden',
                }}>
                  <ProductMockup productId={product.id} color={c} />
                </div>
              </div>
            </FadeUp>
          </div>
          {/* dark blend from hero to rest */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-16 z-20"
            style={{ background: 'linear-gradient(to bottom, #07070e, transparent)' }} />
        </div>

        {/* ── Stats strip ── */}
        {detail && (
          <div className="relative z-10 mx-auto max-w-4xl px-4 pt-16 pb-4">
            <FadeUp>
              <div className="grid grid-cols-3 gap-3">
                {detail.results.map((r, i) => (
                  <StatCard key={i} metric={r.metric} label={r.label[lang]} color={c} />
                ))}
              </div>
            </FadeUp>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            PAIN POINTS
        ═══════════════════════════════════════════════════════ */}
        {detail && detail.painPoints?.length > 0 && (
          <section className="relative px-4 py-24 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #07070e 0%, #0a0a15 100%)' }}>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${c}20, transparent)` }} />

            <div className="mx-auto max-w-4xl">
              <FadeUp className="mb-10 text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: c + '60' }}>
                  {lang === 'vi' ? 'Bạn có đang gặp những vấn đề này?' : 'Sound familiar?'}
                </p>
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                  {lang === 'vi' ? 'Vấn đề mà hầu hết doanh nghiệp chưa giải quyết được' : 'Problems most businesses haven\'t solved yet'}
                </h2>
              </FadeUp>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {detail.painPoints.map((p: PainPoint, i: number) => (
                  <PainCard key={i} p={p} lang={lang} delay={i * 80} />
                ))}
              </div>

              <FadeUp className="mt-10 flex justify-center">
                <span className="liquid-glass rounded-full px-5 py-2 text-xs font-bold" style={{ color: c }}>
                  {lang === 'vi' ? `${product.name} giải quyết tất cả` : `${product.name} solves all of this`}
                </span>
              </FadeUp>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════
            FEATURES
        ═══════════════════════════════════════════════════════ */}
        {detail && detail.features.length > 0 && (
          <section className="relative px-4 py-24 overflow-hidden">
            <div className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(ellipse 50% 50% at 85% 50%, ${c}08 0%, transparent 60%)` }} />

            <div className="mx-auto max-w-6xl relative">
              <FadeUp className="mb-12">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 liquid-glass">
                      <Zap size={10} style={{ color: c }} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: c }}>
                        {lang === 'vi' ? 'Tính năng' : 'Features'}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                      {lang === 'vi' ? 'Mọi thứ bạn cần, không hơn không kém' : 'Everything you need, nothing you don\'t'}
                    </h2>
                  </div>
                  <p className="text-sm text-white/25 max-w-xs leading-relaxed md:text-right">
                    {lang === 'vi' ? 'Mỗi tính năng giải quyết đúng một vấn đề cụ thể.' : 'Each feature solves exactly one specific problem.'}
                  </p>
                </div>
              </FadeUp>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {detail.features.map((f, i) => (
                  <FadeUp key={i} delay={i * 50}>
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
          <section className="relative px-4 py-24 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #07070e 0%, #0b0b18 50%, #07070e 100%)' }}>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${c}15, transparent)` }} />

            <div className="mx-auto max-w-4xl relative">
              <FadeUp className="mb-14 text-center">
                <span className="liquid-glass inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: c }}>
                  {lang === 'vi' ? 'Quy trình' : 'How it works'}
                </span>
                <h2 className="text-3xl font-black text-white md:text-4xl">
                  {lang === 'vi' ? 'Đơn giản hơn bạn nghĩ' : 'Simpler than you think'}
                </h2>
              </FadeUp>

              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="absolute top-8 left-[16.67%] right-[16.67%] h-px hidden md:block pointer-events-none"
                  style={{ background: `linear-gradient(to right, transparent, ${c}25 20%, ${c}25 80%, transparent)` }} />

                {detail.howItWorks.map((step, i) => (
                  <FadeUp key={i} delay={i * 100}>
                    <div className="flex flex-col items-center text-center group">
                      <div className="relative z-10 mb-5">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full font-black text-xl liquid-glass transition-all duration-300 group-hover:scale-110"
                          style={{ color: c, boxShadow: `0 0 20px ${c}15` }}>
                          {step.number}
                        </div>
                      </div>
                      <h3 className="mb-2 font-bold text-white text-base leading-snug">{step.title[lang]}</h3>
                      <p className="text-sm leading-relaxed text-white/30">{step.desc[lang]}</p>
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
          <section className="relative px-4 py-20">
            <div className="mx-auto max-w-2xl">
              <FadeUp className="mb-10 text-center">
                <span className="liquid-glass inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: c }}>
                  FAQ
                </span>
                <h2 className="text-3xl font-black text-white">
                  {lang === 'vi' ? 'Câu hỏi thường gặp' : 'Common questions'}
                </h2>
              </FadeUp>

              <div className="space-y-2">
                {detail.faq.map((item, i) => {
                  const open = openFaq === i
                  return (
                    <FadeUp key={i} delay={i * 60}>
                      <div className={`liquid-glass rounded-2xl overflow-hidden transition-all duration-300`}
                        style={{ boxShadow: open ? `0 0 20px ${c}10` : 'none' }}>
                        <button onClick={() => setOpenFaq(open ? null : i)}
                          className="flex w-full items-center justify-between px-6 py-5 text-left gap-4">
                          <div className="flex items-center gap-3">
                            <span className="font-black text-xs tabular-nums" style={{ color: c + '50' }}>
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="text-sm font-semibold text-white leading-snug">{item.q[lang]}</span>
                          </div>
                          <div className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full liquid-glass">
                            <ChevronDown size={12} className="transition-transform duration-300 text-white/35"
                              style={{ transform: open ? 'rotate(180deg)' : 'none' }} />
                          </div>
                        </button>
                        <div style={{ maxHeight: open ? '400px' : '0px', overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
                          <div className="px-6 pb-5" style={{ borderTop: `1px solid ${c}12` }}>
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
            BOTTOM CTA
        ═══════════════════════════════════════════════════════ */}
        <section className="relative px-4 py-28 overflow-hidden">
          <div className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${c}12 0%, transparent 60%)` }} />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${c}30, transparent)` }} />

          <FadeUp className="mx-auto max-w-lg text-center relative">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl blur-2xl opacity-35 scale-150 pointer-events-none" style={{ background: c }} />
                <div className="liquid-glass relative flex h-20 w-20 items-center justify-center rounded-3xl"
                  style={{ boxShadow: `0 0 40px ${c}25` }}>
                  <ProductIcon type={product.visual as VisualType} color={c} size={32} />
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-white md:text-[2.5rem] leading-tight tracking-tight mb-4">
              {lang === 'vi' ? 'Sẵn sàng bắt đầu?' : 'Ready to get started?'}
            </h2>
            <p className="mb-3 text-base leading-relaxed text-white/35">
              {lang === 'vi' ? 'Demo 30 phút — miễn phí, không ràng buộc.' : '30-min demo — free, no commitment.'}
            </p>

            <div className="mb-8 flex items-center justify-center gap-5 flex-wrap">
              {(lang === 'vi'
                ? ['Miễn phí tư vấn', 'Phản hồi trong 24h', 'Không ràng buộc']
                : ['Free consultation', 'Reply within 24h', 'No commitment']
              ).map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-white/28">
                  <span style={{ color: c }}>✓</span> {t}
                </span>
              ))}
            </div>

            <Link href="/#contact"
              className="group liquid-glass-strong relative inline-flex items-center gap-2.5 rounded-2xl px-9 py-4 text-base font-bold text-white overflow-hidden transition-all duration-300 hover:scale-[1.04] active:scale-95"
              style={{ boxShadow: `0 0 40px ${c}30` }}>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-[inherit]"
                style={{ background: `linear-gradient(135deg, ${c}18, transparent)` }} />
              <span className="relative">{product.cta[lang]}</span>
              <ArrowUpRight size={16} className="relative transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </FadeUp>
        </section>

      </main>
      <Footer />
    </div>
  )
}
