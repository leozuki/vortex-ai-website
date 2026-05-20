'use client'

import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/context/LangContext'

const stats = [
  { value: 9,   suffix: '',  labelKey: 'products'  as const, color: '#6366f1', icon: '◈' },
  { value: 4,   suffix: '+', labelKey: 'aiModels'  as const, color: '#8b5cf6', icon: '◉' },
  { value: 5,   suffix: '+', labelKey: 'platforms' as const, color: '#06b6d4', icon: '◎' },
  { value: 10,  suffix: '+', labelKey: 'clients'   as const, color: '#10b981', icon: '◆' },
]

function useCountUp(target: number, duration = 1000, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - elapsed, 3)
      setCount(Math.round(eased * target))
      if (elapsed < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration, active])
  return count
}

function StatItem({ value, suffix, labelKey, color, icon }: typeof stats[0]) {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const count = useCountUp(value, 900, active)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.4 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="group relative flex flex-col items-center py-10 px-6 overflow-hidden"
      style={{
        transition: 'background 0.3s ease',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = `${color}06` }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
    >
      {/* Icon glyph */}
      <span
        className="mb-3 text-lg font-black leading-none"
        style={{ color: `${color}50` }}
      >
        {icon}
      </span>

      {/* Number */}
      <span
        className="text-5xl font-black leading-none tracking-tight md:text-6xl"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: active ? 1 : 0,
          transform: active ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {count}{suffix}
      </span>

      {/* Label */}
      <span className="mt-2.5 text-xs font-medium uppercase tracking-[0.15em]"
        style={{ color: 'rgba(255,255,255,0.3)' }}>
        {t.stats[labelKey]}
      </span>

      {/* Bottom accent */}
      <div
        className="mt-4 h-px rounded-full"
        style={{
          width: active ? 40 : 0,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s',
        }}
      />

      {/* Subtle corner glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 120px at 50% 50%, ${color}08 0%, transparent 70%)`,
        }}
      />
    </div>
  )
}

export function StatsBar() {
  return (
    <section
      className="relative"
      style={{
        background: 'linear-gradient(180deg, #0b0b16 0%, #08080f 100%)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.25), transparent)' }}
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0"
          style={{ '--divide-color': 'rgba(255,255,255,0.04)' } as React.CSSProperties}>
          {stats.map((s) => (
            <StatItem key={s.labelKey} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
