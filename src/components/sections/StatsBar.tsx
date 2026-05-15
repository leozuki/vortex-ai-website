'use client'

import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/context/LangContext'

const stats = [
  { value: 9, suffix: '', labelKey: 'products' as const, color: '#6366f1' },
  { value: 4, suffix: '+', labelKey: 'aiModels' as const, color: '#8b5cf6' },
  { value: 5, suffix: '+', labelKey: 'platforms' as const, color: '#06b6d4' },
  { value: 10, suffix: '+', labelKey: 'clients' as const, color: '#10b981' },
]

function useCountUp(target: number, duration = 1200, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, active])
  return count
}

function StatItem({ value, suffix, labelKey, color }: typeof stats[0]) {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const count = useCountUp(value, 1000, active)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.5 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-col items-center py-10 px-4">
      <span
        className="text-4xl font-black md:text-5xl"
        style={{ color }}
      >
        {count}{suffix}
      </span>
      <span className="mt-2 text-sm text-zinc-500">{t.stats[labelKey]}</span>
      <div
        className="mt-3 h-0.5 w-12 rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </div>
  )
}

export function StatsBar() {
  return (
    <section
      className="relative border-y border-white/5"
      style={{ background: 'linear-gradient(180deg, #0d0d18 0%, #0a0a0f 100%)' }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-white/5 md:grid-cols-4 md:divide-y-0">
        {stats.map((s) => (
          <StatItem key={s.labelKey} {...s} />
        ))}
      </div>
    </section>
  )
}
