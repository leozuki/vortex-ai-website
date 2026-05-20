'use client'

import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/context/LangContext'
import { products } from '@/data/products'
import { ProductCard } from './ProductCard'

function AnimatedCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.06 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
        filter: inView ? 'blur(0px)' : 'blur(4px)',
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 60}ms,
                     transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 60}ms,
                     filter 0.5s ease ${index * 60}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* Section heading with inline badge */
function SectionHeading() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.3 })
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
        transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Label chip */}
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

      {/* Main headline */}
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

export function ProductsGrid() {
  const featured = products.filter((p) => p.featured)
  const others = products.filter((p) => !p.featured)

  return (
    <section
      id="products"
      className="relative py-28 px-4"
      style={{ background: '#07070e' }}
    >
      {/* Top edge glow */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.35), transparent)' }}
      />

      {/* Faint radial glow center */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 900, height: 500,
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.035) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="mx-auto max-w-6xl relative z-10">
        <SectionHeading />

        {/* Featured — 3 col */}
        <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <AnimatedCard key={product.id} index={i}>
              <ProductCard product={product} />
            </AnimatedCard>
          ))}
        </div>

        {/* Others — 3 col */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((product, i) => (
            <AnimatedCard key={product.id} index={featured.length + i}>
              <ProductCard product={product} />
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  )
}
