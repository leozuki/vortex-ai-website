'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import type { Product, VisualType } from '@/types'
import { useLang } from '@/context/LangContext'
import { ProductVisual } from '@/components/ui/ProductVisual'
import { ProductIcon } from '@/components/ui/ProductIcon'

interface ProductCardProps {
  product: Product
}

function ArrowDiagIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, lang } = useLang()
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.current!.style.setProperty('--mouse-x', `${x}%`)
    cardRef.current!.style.setProperty('--mouse-y', `${y}%`)
  }

  return (
    <article
      ref={cardRef}
      className="spotlight-card group relative flex flex-col overflow-hidden rounded-2xl cursor-default select-none"
      style={{
        background: hovered
          ? 'linear-gradient(160deg, #14141f 0%, #0f0f1a 100%)'
          : 'linear-gradient(160deg, #111119 0%, #0c0c15 100%)',
        border: hovered
          ? `1px solid ${product.color}35`
          : '1px solid rgba(255,255,255,0.055)',
        boxShadow: hovered
          ? `0 0 0 1px ${product.color}25, 0 20px 60px ${product.color}10, 0 4px 20px rgba(0,0,0,0.5)`
          : '0 2px 12px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Animated top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] z-10"
        style={{
          background: hovered
            ? `linear-gradient(90deg, transparent 0%, ${product.color} 40%, ${product.color}88 70%, transparent 100%)`
            : `linear-gradient(90deg, transparent 0%, ${product.color}30 50%, transparent 100%)`,
          transition: 'background 0.4s ease',
        }}
      />

      {/* Spotlight follow layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${product.color}08 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Visual illustration */}
      <div className="relative overflow-hidden z-10">
        <ProductVisual type={product.visual} color={product.color} />

        {/* Featured pill */}
        {product.featured && (
          <span
            className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: `linear-gradient(135deg, ${product.color}22, ${product.color}12)`,
              border: `1px solid ${product.color}35`,
              color: product.color,
              boxShadow: `0 0 12px ${product.color}20`,
            }}
          >
            {t.products.featuredLabel}
          </span>
        )}

        {/* Category */}
        <span
          className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-medium tracking-wide"
          style={{
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.07)',
            color: 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {t.products.categories[product.category]}
        </span>
      </div>

      {/* Body */}
      <div className="relative z-10 flex flex-1 flex-col p-5 pt-4">
        {/* Product identifier */}
        <div className="mb-3 flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-xl shrink-0"
            style={{
              width: 40, height: 40,
              background: `linear-gradient(135deg, ${product.color}18 0%, ${product.color}08 100%)`,
              border: `1px solid ${product.color}30`,
              boxShadow: `0 0 16px ${product.color}15`,
            }}
          >
            <ProductIcon type={product.visual as VisualType} color={product.color} size={22} />
          </div>
          <span
            className="text-[11px] font-bold uppercase tracking-[0.15em]"
            style={{ color: `${product.color}cc` }}
          >
            {product.name}
          </span>
        </div>

        {/* Headline */}
        <h3 className="mb-2.5 text-[1.05rem] font-bold leading-snug text-white">
          {product.headline[lang]}
        </h3>

        {/* Description */}
        <p className="mb-5 flex-1 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
          {product.desc[lang]}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1">
            {product.tech.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="tech-chip"
                style={{
                  background: `${product.color}10`,
                  border: `1px solid ${product.color}20`,
                  color: `${product.color}bb`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={`/products/${product.id}`}
            className="flex items-center gap-1.5 text-[11px] font-semibold transition-all duration-300 ml-2 shrink-0"
            style={{
              color: hovered ? product.color : 'rgba(255,255,255,0.22)',
            }}
          >
            <span className="hidden sm:block">Chi tiết</span>
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-300"
              style={{
                background: hovered ? `${product.color}18` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${hovered ? product.color + '40' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <ArrowDiagIcon size={12} color={hovered ? product.color : 'rgba(255,255,255,0.3)'} />
            </div>
          </Link>
        </div>
      </div>
    </article>
  )
}
