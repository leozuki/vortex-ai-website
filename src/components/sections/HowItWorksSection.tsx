'use client'

import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/context/LangContext'
import { SemanticIcon } from '@/components/ui/SemanticIcon'

const STEPS = {
  vi: [
    { n: '01', icon: 'mail', title: 'Mô tả bài toán của bạn', desc: 'Kể cho chúng tôi nghe doanh nghiệp bạn đang gặp vấn đề gì. Không cần biết AI là gì.' },
    { n: '02', icon: 'search', title: 'Chúng tôi phân tích & đề xuất', desc: 'Trong 48 giờ, nhận bản roadmap chi tiết với giải pháp phù hợp nhất, timeline và chi phí rõ ràng.' },
    { n: '03', icon: 'zap', title: 'Triển khai nhanh — thấy kết quả sớm', desc: 'Không phải dự án 6 tháng. Chúng tôi ship MVP trong 2–4 tuần, đo kết quả, cải tiến liên tục.' },
    { n: '04', icon: 'trend', title: 'Scale khi bạn sẵn sàng', desc: 'Sản phẩm được xây để grow. Thêm tính năng, mở rộng team, tích hợp hệ thống khác — không cần viết lại từ đầu.' },
  ],
  en: [
    { n: '01', icon: 'mail', title: 'Describe your problem', desc: "Tell us what your business is struggling with. No need to know anything about AI." },
    { n: '02', icon: 'search', title: 'We analyze & propose', desc: 'Within 48 hours, receive a detailed roadmap with the best-fit solution, clear timeline and cost.' },
    { n: '03', icon: 'zap', title: 'Fast deployment — early results', desc: "Not a 6-month project. We ship an MVP in 2–4 weeks, measure results, iterate continuously." },
    { n: '04', icon: 'trend', title: 'Scale when you\'re ready', desc: 'Products built to grow. Add features, expand teams, integrate other systems — no rewrite needed.' },
  ],
}

function TimelineItem({ s, index, lang }: { s: any; index: number; lang: 'vi' | 'en' }) {
  const itemRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true)
    }, { threshold: 0.15 })
    if (itemRef.current) obs.observe(itemRef.current)
    return () => obs.disconnect()
  }, [])

  const isEven = index % 2 === 0

  return (
    <div
      ref={itemRef}
      className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-16 md:mb-24 last:mb-0 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-8 blur-sm'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Spacer or Left Card */}
      <div className={`w-full md:w-[45%] flex ${isEven ? 'justify-end' : 'justify-start md:order-2'}`}>
        <div 
          className="w-full max-w-[450px] p-6 rounded-2xl border backdrop-blur-md flex flex-col gap-3 transition-colors duration-300"
          style={{
            background: 'rgba(255, 255, 255, 0.015)',
            borderColor: 'rgba(255, 255, 255, 0.04)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <SemanticIcon name={s.icon} size={20} color="#22d3ee" />
            </div>
            <div>
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest leading-none block mb-1">
                STEP {s.n}
              </span>
              <h3 className="text-base font-bold text-white leading-tight">{s.title}</h3>
            </div>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed pl-1">{s.desc}</p>
        </div>
      </div>

      {/* Timeline Node Dot */}
      <div className="absolute left-[20px] md:left-1/2 top-10 md:top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 hidden sm:flex h-8 w-8 items-center justify-center rounded-full border bg-[#020208] border-cyan-500/30 shadow-[0_0_12px_rgba(34,211,238,0.15)]">
        <div className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
      </div>

      {/* Spacer for other side */}
      <div className="hidden md:block w-[45%]" />
    </div>
  )
}

export function HowItWorksSection() {
  const { lang } = useLang()
  const steps = STEPS[lang]

  return (
    <section 
      id="how-it-works" 
      className="relative w-full py-24 md:py-32 overflow-hidden" 
      style={{ background: '#020208' }}
    >
      <div 
        className="pointer-events-none absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.2), transparent)' }} 
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            {lang === 'vi' ? 'Quy trình làm việc' : 'How we work'}
          </p>
          <h2 className="mb-4 text-4xl font-black text-white md:text-5xl">
            {lang === 'vi' ? 'Từ ý tưởng đến' : 'From idea to'}{' '}
            <span className="grad-text-green">{lang === 'vi' ? 'production' : 'production'}</span>
          </h2>
        </div>

        {/* Timeline body */}
        <div className="relative w-full flex flex-col items-center">
          
          {/* Vertical center timeline line */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-px bg-white/5 -translate-x-1/2" />

          {steps.map((s, i) => (
            <TimelineItem
              key={i}
              s={s}
              index={i}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
