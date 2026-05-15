'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { solutions } from '@/data/solutions'

export function SolutionsSection() {
  const { lang } = useLang()
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const sol = solutions[active]

  return (
    <section id="solutions" className="relative py-28 px-4" style={{ background: 'linear-gradient(180deg, #09090f 0%, #0d0d18 50%, #09090f 100%)' }}>
      {/* Horizontal separator glow */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' }} />

      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-14 text-center"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">Solutions</p>
          <h2 className="mb-4 text-4xl font-black text-white md:text-5xl">
            {lang === 'vi' ? 'Giải pháp theo' : 'Solutions for'}{' '}
            <span className="grad-text">từng ngành</span>
          </h2>
          <p className="mx-auto max-w-lg text-zinc-500">
            {lang === 'vi'
              ? 'Không có giải pháp one-size-fits-all. Chúng tôi hiểu bài toán của từng lĩnh vực.'
              : "There's no one-size-fits-all. We understand the specific problems of each industry."}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 0.7s ease 0.15s' }}>
          {/* Tab list */}
          <div className="flex flex-row gap-2 lg:flex-col">
            {solutions.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-all duration-300"
                style={{
                  background: active === i ? `${s.color}14` : 'transparent',
                  border: `1px solid ${active === i ? s.color + '35' : 'rgba(255,255,255,0.05)'}`,
                }}
              >
                <span className="text-xl">{s.icon}</span>
                <span className="hidden text-sm font-medium text-zinc-300 lg:block">{s.industry[lang]}</span>
                {active === i && (
                  <div className="ml-auto hidden h-1.5 w-1.5 rounded-full lg:block" style={{ background: s.color }} />
                )}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div
            key={sol.id}
            className="rounded-2xl border border-white/[0.06] p-7 animate-fade-in"
            style={{ background: 'linear-gradient(160deg, #13131e 0%, #0e0e18 100%)' }}
          >
            {/* Header */}
            <div className="mb-5 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
                style={{ background: `${sol.color}15` }}>
                {sol.icon}
              </div>
              <div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: sol.color }}>
                  {sol.industry[lang]}
                </div>
                <h3 className="text-xl font-black text-white">{sol.headline[lang]}</h3>
              </div>
            </div>

            {/* Pain → Fix */}
            <div className="mb-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-4">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-red-400">❌ Bài toán</div>
                <p className="text-sm text-zinc-400">{sol.pain[lang]}</p>
              </div>
              <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-400">✅ Giải pháp</div>
                <p className="text-sm text-zinc-400">{sol.fix[lang]}</p>
              </div>
            </div>

            {/* Outcomes */}
            <div className="mb-5 space-y-2">
              {sol.outcomes.map((o, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-zinc-300">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    style={{ background: `${sol.color}20`, color: sol.color }}>✓</span>
                  {o[lang]}
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="shimmer-btn inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${sol.color}, ${sol.color}bb)` }}
            >
              {lang === 'vi' ? 'Tư vấn giải pháp này' : 'Get this solution'}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
