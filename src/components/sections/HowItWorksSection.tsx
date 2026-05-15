'use client'

import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/context/LangContext'

const STEPS = {
  vi: [
    { n: '01', icon: '💬', title: 'Mô tả bài toán của bạn', desc: 'Kể cho chúng tôi nghe doanh nghiệp bạn đang gặp vấn đề gì. Không cần biết AI là gì.' },
    { n: '02', icon: '🔍', title: 'Chúng tôi phân tích & đề xuất', desc: 'Trong 48 giờ, nhận bản roadmap chi tiết với giải pháp phù hợp nhất, timeline và chi phí rõ ràng.' },
    { n: '03', icon: '⚡', title: 'Triển khai nhanh — thấy kết quả sớm', desc: 'Không phải dự án 6 tháng. Chúng tôi ship MVP trong 2–4 tuần, đo kết quả, cải tiến liên tục.' },
    { n: '04', icon: '📈', title: 'Scale khi bạn sẵn sàng', desc: 'Sản phẩm được xây để grow. Thêm tính năng, mở rộng team, tích hợp hệ thống khác — không cần viết lại từ đầu.' },
  ],
  en: [
    { n: '01', icon: '💬', title: 'Describe your problem', desc: "Tell us what your business is struggling with. No need to know anything about AI." },
    { n: '02', icon: '🔍', title: 'We analyze & propose', desc: 'Within 48 hours, receive a detailed roadmap with the best-fit solution, clear timeline and cost.' },
    { n: '03', icon: '⚡', title: 'Fast deployment — early results', desc: "Not a 6-month project. We ship an MVP in 2–4 weeks, measure results, iterate continuously." },
    { n: '04', icon: '📈', title: 'Scale when you\'re ready', desc: 'Products built to grow. Add features, expand teams, integrate other systems — no rewrite needed.' },
  ],
}

export function HowItWorksSection() {
  const { lang } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const steps = STEPS[lang]

  return (
    <section className="relative py-28 px-4" style={{ background: '#09090f' }}>
      <div ref={ref} className="mx-auto max-w-5xl">
        <div className="mb-14 text-center"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            {lang === 'vi' ? 'Quy trình làm việc' : 'How we work'}
          </p>
          <h2 className="mb-4 text-4xl font-black text-white md:text-5xl">
            {lang === 'vi' ? 'Từ ý tưởng đến' : 'From idea to'}{' '}
            <span className="grad-text-green">{lang === 'vi' ? 'production' : 'production'}</span>
          </h2>
        </div>

        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line desktop */}
          <div className="pointer-events-none absolute top-10 left-[12.5%] right-[12.5%] hidden h-px lg:block"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3) 20%, rgba(99,102,241,0.3) 80%, transparent)' }} />

          {steps.map((s, i) => (
            <div key={i}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(28px)',
                transition: `all 0.6s ease ${i * 100}ms`,
              }}>
              <div className="relative flex flex-col items-center text-center">
                {/* Number bubble */}
                <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10">
                  <span className="text-3xl">{s.icon}</span>
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-black text-white">
                    {s.n}
                  </div>
                </div>
                <h3 className="mb-2 text-sm font-bold text-white">{s.title}</h3>
                <p className="text-xs leading-relaxed text-zinc-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
