'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import type { Product, VisualType } from '@/types'
import { useLang } from '@/context/LangContext'
import { ProductVisual } from '@/components/ui/ProductVisual'
import { ProductIcon } from '@/components/ui/ProductIcon'

interface ProductCardProps {
  product: Product
  large?: boolean
}

function ArrowDiagIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function ProductCard({ product, large }: ProductCardProps) {
  const { t, lang } = useLang()
  const [hovered, setHovered] = useState(false)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef<HTMLElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const mouseXRatio = x / rect.width - 0.5
    const mouseYRatio = y / rect.height - 0.5

    cardRef.current!.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`)
    cardRef.current!.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`)

    // Calculate sheen position for holographic reflection
    const sheenX = (mouseXRatio + 0.5) * 100
    const sheenY = (mouseYRatio + 0.5) * 100
    cardRef.current!.style.setProperty('--sheen-x', `${sheenX}%`)
    cardRef.current!.style.setProperty('--sheen-y', `${sheenY}%`)

    // Limit rotation to maximum 12 degrees for refined aesthetic
    setRotateX(-mouseYRatio * 12)
    setRotateY(mouseXRatio * 12)
  }

  function handleMouseEnter() {
    setHovered(true)
    window.dispatchEvent(new CustomEvent('solaiProductHover', { detail: { id: product.id, name: product.name } }))
  }

  function handleMouseLeave() {
    setHovered(false)
    setRotateX(0)
    setRotateY(0)
    window.dispatchEvent(new CustomEvent('solaiProductHover', { detail: { id: null, name: null } }))
  }

  return (
    <article
      ref={cardRef}
      className="spotlight-card group relative flex flex-col h-full overflow-hidden rounded-2xl cursor-default select-none"
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
        transform: hovered
          ? `perspective(1000px) translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          : 'perspective(1000px) translateY(0) rotateX(0deg) rotateY(0deg)',
        transition: hovered
          ? 'box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease'
          : 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

      {/* Holographic Refractive Sheen overlay */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none mix-blend-color-dodge transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, 
            rgba(255, 255, 255, 0) 0%,
            ${product.color}15 25%,
            rgba(99, 102, 241, 0.12) 40%,
            rgba(6, 182, 212, 0.15) 50%,
            rgba(236, 72, 153, 0.12) 60%,
            ${product.color}18 75%,
            rgba(255, 255, 255, 0) 100%
          )`,
          backgroundSize: '250% 250%',
          backgroundPosition: 'var(--sheen-x, 50%) var(--sheen-y, 50%)',
          opacity: hovered ? 0.45 : 0,
        }}
      />
      
      {/* Glossy Overlay Highlight */}
      <div
        className="absolute inset-0 z-[6] pointer-events-none mix-blend-overlay transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 220px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.12) 0%, transparent 75%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Visual illustration */}
      <div className="relative overflow-hidden z-10">
        <ProductVisual type={product.visual} color={product.color} large={large} />

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
            <ProductIcon type={product.visual as VisualType} color={product.color} size={22} hovered={hovered} />
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
