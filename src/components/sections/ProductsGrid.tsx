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
      { threshold: 0.08 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.98)',
        transition: `opacity 0.55s ease ${index * 65}ms, transform 0.55s ease ${index * 65}ms`,
      }}
    >
      {children}
    </div>
  )
}

export function ProductsGrid() {
  const { t } = useLang()
  const headRef = useRef<HTMLDivElement>(null)
  const [headIn, setHeadIn] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeadIn(true) }, { threshold: 0.3 })
    if (headRef.current) obs.observe(headRef.current)
    return () => obs.disconnect()
  }, [])

  const featured = products.filter((p) => p.featured)
  const others = products.filter((p) => !p.featured)

  return (
    <section
      id="products"
      className="relative py-28 px-4"
      style={{ background: '#09090f' }}
    >
      {/* Subtle top separator glow */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)' }} />

      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div
          ref={headRef}
          className="mb-16 text-center"
          style={{
            opacity: headIn ? 1 : 0,
            transform: headIn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400">
            {t.products.heading}
          </p>
          <h2 className="mb-4 text-4xl font-black text-white md:text-5xl">
            Bài toán thật.{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Kết quả thật.
            </span>
          </h2>
          <p className="mx-auto max-w-lg text-zinc-500">{t.products.subheading}</p>
        </div>

        {/* Featured — 3 col */}
        <div className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
