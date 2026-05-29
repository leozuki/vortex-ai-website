'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { solutions, Solution } from '@/data/solutions'
import { SemanticIcon } from '@/components/ui/SemanticIcon'
import { motion } from 'framer-motion'

function SolutionCard({
  sol,
  index,
  isActive,
  lang,
  onVisible,
}: {
  sol: Solution
  index: number
  isActive: boolean
  lang: 'vi' | 'en'
  onVisible: (idx: number) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          onVisible(index)
        }
      },
      {
        root: null,
        rootMargin: '-30% 0px -40% 0px', // trigger when card is near center
        threshold: 0.1,
      }
    )
    if (cardRef.current) obs.observe(cardRef.current)
    return () => obs.disconnect()
  }, [index, onVisible])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isActive) return
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const mouseXRatio = x / rect.width - 0.5
    const mouseYRatio = y / rect.height - 0.5

    cardRef.current!.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`)
    cardRef.current!.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`)

    const sheenX = (mouseXRatio + 0.5) * 100
    const sheenY = (mouseYRatio + 0.5) * 100
    cardRef.current!.style.setProperty('--sheen-x', `${sheenX}%`)
    cardRef.current!.style.setProperty('--sheen-y', `${sheenY}%`)

    setRotateX(-mouseYRatio * 8)
    setRotateY(mouseXRatio * 8)
  }

  function handleMouseLeave() {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div
      ref={cardRef}
      className="p-6 md:p-8 rounded-2xl border backdrop-blur-xl transition-all duration-500 flex flex-col gap-6 relative overflow-hidden"
      style={{
        background: isActive
          ? 'linear-gradient(160deg, #13131e 0%, #0c0c16 100%)'
          : 'rgba(255, 255, 255, 0.01)',
        borderColor: isActive ? `${sol.color}35` : 'rgba(255, 255, 255, 0.04)',
        boxShadow: isActive ? `0 20px 50px ${sol.color}0a` : 'none',
        opacity: isActive ? 1 : 0.22,
        transform: isActive
          ? `perspective(1000px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          : 'perspective(1000px) scale(0.96) rotateX(0deg) rotateY(0deg)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight follow layer */}
      {isActive && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle 240px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${sol.color}08 0%, transparent 70%)`,
            transition: 'opacity 0.3s',
          }}
        />
      )}

      {/* Holographic Refractive Sheen overlay */}
      {isActive && (
        <div
          className="absolute inset-0 z-[5] pointer-events-none mix-blend-color-dodge transition-opacity duration-300 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, 
              rgba(255, 255, 255, 0) 0%,
              ${sol.color}15 25%,
              rgba(99, 102, 241, 0.12) 40%,
              rgba(6, 182, 212, 0.15) 50%,
              rgba(236, 72, 153, 0.12) 60%,
              ${sol.color}18 75%,
              rgba(255, 255, 255, 0) 100%
            )`,
            backgroundSize: '250% 250%',
            backgroundPosition: 'var(--sheen-x, 50%) var(--sheen-y, 50%)',
          }}
        />
      )}
      
      {/* Glossy Overlay Highlight */}
      {isActive && (
        <div
          className="absolute inset-0 z-[6] pointer-events-none mix-blend-overlay transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(circle 260px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.12) 0%, transparent 75%)`,
          }}
        />
      )}

      {/* Title block */}
      <div className="flex items-start gap-4 relative z-10">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: `${sol.color}15`,
            border: `1px solid ${sol.color}30`,
          }}
        >
          <SemanticIcon name={sol.icon} size={22} color={sol.color} />
        </div>
        <div>
          <div className="mb-1 text-xs font-semibold uppercase tracking-widest font-mono" style={{ color: sol.color }}>
            {sol.industry[lang]}
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white">{sol.headline[lang]}</h3>
        </div>
      </div>

      {/* Pain vs Fix */}
      <div className="grid gap-4 sm:grid-cols-2 relative z-10">
        <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-4 flex flex-col gap-1.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-red-400">❌ {lang === 'vi' ? 'Bài toán' : 'Pain Point'}</div>
          <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">{sol.pain[lang]}</p>
        </div>
        <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4 flex flex-col gap-1.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-semibold">✅ {lang === 'vi' ? 'Giải pháp' : 'Fix'}</div>
          <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">{sol.fix[lang]}</p>
        </div>
      </div>

      {/* Outcomes */}
      <div className="space-y-2.5 relative z-10">
        {sol.outcomes.map((o, idx) => (
          <div key={idx} className="flex items-center gap-3 text-xs md:text-sm text-zinc-300">
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
              style={{ background: `${sol.color}20`, color: sol.color }}
            >
              ✓
            </span>
            <span>{o[lang]}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="relative z-10">
        <a
          href="#contact"
          onMouseEnter={() => {
            window.dispatchEvent(new CustomEvent('solaiProductHover', { detail: { id: `consult-${sol.id}`, name: sol.industry[lang] } }))
          }}
          onMouseLeave={() => {
            window.dispatchEvent(new CustomEvent('solaiProductHover', { detail: { id: null, name: null } }))
          }}
          className="shimmer-btn inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs md:text-sm font-semibold text-white transition-all hover:opacity-90 mt-2"
          style={{ background: `linear-gradient(135deg, ${sol.color}, ${sol.color}bb)` }}
        >
          {lang === 'vi' ? 'Tư vấn giải pháp này' : 'Get this solution'}
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  )
}

function HologramIndicator({ sol, lang }: { sol: Solution; lang: 'vi' | 'en' }) {
  return (
    <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center">
      {/* Outer rotating neon dash circle */}
      <div 
        className="absolute inset-0 rounded-full border border-dashed animate-spin-cw" 
        style={{ borderColor: `${sol.color}25`, borderWidth: '1.5px' }}
      />
      {/* Middle dotted reverse circle */}
      <div 
        className="absolute inset-6 rounded-full border border-dotted animate-spin-ccw" 
        style={{ borderColor: `${sol.color}35`, borderWidth: '1px' }}
      />
      {/* Inner solid frame ring */}
      <div 
        className="absolute inset-12 rounded-full border flex flex-col items-center justify-center p-4 text-center select-none"
        style={{ 
          borderColor: `${sol.color}30`, 
          background: `radial-gradient(circle, ${sol.color}0a 0%, transparent 80%)`,
          boxShadow: `inset 0 0 30px ${sol.color}05, 0 0 50px ${sol.color}08`
        }}
      >
        {/* Glowing Radar Sweep */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none opacity-40"
          style={{
            background: `conic-gradient(from 0deg, ${sol.color}aa 0deg, transparent 90deg, transparent 360deg)`,
            maskImage: 'radial-gradient(circle, black 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 100%)',
            animation: 'spin-clockwise 6s linear infinite'
          }}
        />

        <div className="mb-2.5 relative z-10">
          <SemanticIcon name={sol.icon} size={32} color={sol.color} />
        </div>

        <div className="font-mono text-[8px] text-zinc-500 uppercase tracking-[0.2em] mb-1">
          {lang === 'vi' ? 'Hệ thống SOLAI' : 'SOLAI CORE'}
        </div>
        <div className="text-xs font-black text-white tracking-wider max-w-[140px] truncate">
          {sol.industry[lang]}
        </div>

        <div className="mt-3 font-mono text-[8px] text-zinc-400 space-y-0.5 z-10">
          <div>INDEX: <span style={{ color: sol.color }} className="font-bold">0.9984</span></div>
          <div>STATUS: <span className="text-emerald-400 font-bold">ONLINE</span></div>
        </div>
      </div>

      {/* corner tick brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: sol.color }} />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: sol.color }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: sol.color }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: sol.color }} />
    </div>
  )
}

export function SolutionsSection() {
  const { lang } = useLang()
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const handleVisibleCard = useCallback((idx: number) => {
    setActive(idx)
  }, [])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const sol = solutions[active]

  // Render clean fallback tab structure for mobile screens
  if (isMobile) {
    return (
      <section id="solutions" className="relative py-20 px-4" style={{ background: '#020208' }}>
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' }} />
        <div className="mx-auto max-w-xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">Solutions</p>
            <h2 className="mb-3 text-3xl font-black text-white">
              {lang === 'vi' ? 'Giải pháp theo' : 'Solutions for'}{' '}
              <span className="grad-text">từng ngành</span>
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {solutions.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all"
                  style={{
                    background: active === i ? `${s.color}14` : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${active === i ? s.color + '40' : 'rgba(255,255,255,0.05)'}`,
                    color: active === i ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  <SemanticIcon name={s.icon} size={14} color={active === i ? s.color : 'rgba(255,255,255,0.45)'} />
                  <span>{s.industry[lang]}</span>
                </button>
              ))}
            </div>

            <div
              key={sol.id}
              className="rounded-2xl border border-white/[0.06] p-6 flex flex-col gap-5"
              style={{ background: 'linear-gradient(160deg, #13131e 0%, #0e0e18 100%)' }}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${sol.color}15` }}>
                  <SemanticIcon name={sol.icon} size={20} color={sol.color} />
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: sol.color }}>
                    {sol.industry[lang]}
                  </div>
                  <h3 className="text-lg font-black text-white">{sol.headline[lang]}</h3>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-4 text-xs">
                  <div className="font-bold text-red-400 mb-1">❌ Bài toán</div>
                  <p className="text-zinc-400">{sol.pain[lang]}</p>
                </div>
                <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4 text-xs">
                  <div className="font-bold text-emerald-400 mb-1">✅ Giải pháp</div>
                  <p className="text-zinc-400">{sol.fix[lang]}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                {sol.outcomes.map((o, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
                      style={{ background: `${sol.color}20`, color: sol.color }}>✓</span>
                    {o[lang]}
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="shimmer-btn inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-semibold text-white transition-all"
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

  return (
    <section 
      id="solutions" 
      className="relative w-full py-24 md:py-32"
      style={{ background: '#020208' }}
    >
      <div 
        className="pointer-events-none absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent)' }} 
      />

      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-12 relative z-10">
        
        {/* Left Column - Sticky Radar & Title */}
        <div className="w-full lg:w-[40%] lg:sticky lg:top-28 h-fit flex flex-col items-center lg:items-start justify-center relative z-10">
          <div 
            className="absolute w-[250px] h-[250px] rounded-full opacity-[0.14] blur-[100px] pointer-events-none transition-all duration-750 ease-out z-0"
            style={{
              backgroundColor: sol.color,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          <div className="text-center lg:text-left select-none pointer-events-none z-10 mb-8 w-full">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-400 mb-1">
              {lang === 'vi' ? 'GIẢI PHÁP ĐO MAY' : 'BESPOKE SOLUTIONS'}
            </p>
            <h2 className="text-3xl font-black text-white leading-tight">
              {lang === 'vi' ? 'Tối ưu theo' : 'Customized for'}<br />
              <span className="grad-text">từng lĩnh vực.</span>
            </h2>
          </div>

          <div className="relative z-10 flex justify-center w-full lg:justify-start">
            <HologramIndicator sol={sol} lang={lang} />
          </div>
        </div>

        {/* Right Column - Scrolling cards list */}
        <div className="w-full lg:w-[60%] flex flex-col gap-10">
          {solutions.map((s, idx) => (
            <SolutionCard
              key={s.id}
              sol={s}
              index={idx}
              isActive={active === idx}
              lang={lang}
              onVisible={handleVisibleCard}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
