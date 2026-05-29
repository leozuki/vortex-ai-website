'use client'

import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/context/LangContext'
import { products } from '@/data/products'
import { ProductCard } from './ProductCard'
import { TechTicker } from './TechTicker'

function AnimatedCard({ children, index, className }: { children: React.ReactNode; index: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.05 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${className || ''} h-full flex flex-col`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
        filter: inView ? 'blur(0px)' : 'blur(4px)',
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms,
                     transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms,
                     filter 0.6s ease ${index * 80}ms`,
      }}
    >
      {children}
    </div>
  )
}

function SectionHeading() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="mb-16 text-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="mb-4 flex justify-center">
        <span
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em]"
          style={{
            background: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.2)',
            color: '#818cf8',
          }}
        >
          <svg width="6" height="6" viewBox="0 0 6 6">
            <circle cx="3" cy="3" r="3" fill="#818cf8" />
          </svg>
          {t.products.heading}
        </span>
      </div>

      <h2
        className="mb-4 font-black leading-tight tracking-tight text-white"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
      >
        Bài toán thật.{' '}
        <span
          style={{
            background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #67e8f9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Kết quả thật.
        </span>
      </h2>

      <p className="mx-auto max-w-md text-base" style={{ color: 'rgba(255,255,255,0.35)' }}>
        {t.products.subheading}
      </p>
    </div>
  )
}

function getBentoSpan(id: string) {
  switch (id) {
    case 'digital-office':
      return 'md:col-span-2 md:row-span-2'
    case 'bigdata-pipeline':
      return 'md:col-span-1 md:row-span-2'
    case 'crm':
      return 'md:col-span-2 md:row-span-1'
    case 'web-fleet':
      return 'md:col-span-1 md:row-span-1'
    case 'taomeettrap':
      return 'md:col-span-1 md:row-span-1'
    case 'extensions-suite':
      return 'md:col-span-2 md:row-span-1'
    case 'hubspot-auto':
      return 'md:col-span-1 md:row-span-1'
    case 'arcso':
      return 'md:col-span-1 md:row-span-1'
    case 'dms':
      return 'md:col-span-1 md:row-span-1'
    case 'video-transcript':
      return 'md:col-span-2 md:row-span-1'
    case 'ads-portal':
      return 'md:col-span-1 md:row-span-1'
    default:
      return 'md:col-span-1 md:row-span-1'
  }
}

export function ProductsGrid() {
  return (
    <section
      id="products"
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ background: '#020208' }}
    >
      {/* Top divider light line */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.2), transparent)' }}
      />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <SectionHeading />

        {/* Clean Static Bento Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 auto-rows-[minmax(280px,_auto)]">
          {products.map((product, i) => {
            const bentoSpan = getBentoSpan(product.id)
            return (
              <AnimatedCard key={product.id} index={i} className={bentoSpan}>
                <ProductCard product={product} large={product.id === 'digital-office'} />
              </AnimatedCard>
            )
          })}
        </div>
      </div>

      {/* Tech Ticker at the bottom */}
      <div className="mt-20">
        <TechTicker />
      </div>
    </section>
  )
}
