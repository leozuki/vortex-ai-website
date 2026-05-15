'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import type { Product, VisualType } from '@/types'
import { useLang } from '@/context/LangContext'
import { ProductVisual } from '@/components/ui/ProductVisual'
import { ProductIcon } from '@/components/ui/ProductIcon'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, lang } = useLang()
  const [hovered, setHovered] = useState(false)

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] transition-all duration-400 cursor-default"
      style={{
        background: 'linear-gradient(160deg, #13131e 0%, #0e0e18 100%)',
        boxShadow: hovered
          ? `0 0 0 1px ${product.color}40, 0 24px 64px ${product.color}14`
          : '0 0 0 1px rgba(255,255,255,0.04)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transitionProperty: 'transform, box-shadow',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top stripe */}
      <div
        className="h-px w-full transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${product.color} 50%, transparent 100%)`,
          opacity: hovered ? 0.6 : 0.15,
        }}
      />

      {/* Visual illustration */}
      <div className="relative overflow-hidden">
        <ProductVisual type={product.visual} color={product.color} />
        {/* Featured pill */}
        {product.featured && (
          <span
            className="absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: `${product.color}22`,
              color: product.color,
              border: `1px solid ${product.color}40`,
            }}
          >
            {t.products.featuredLabel}
          </span>
        )}
        {/* Category */}
        <span className="absolute right-3 top-3 rounded-full border border-white/8 bg-black/40 px-2.5 py-0.5 text-[10px] text-zinc-500 backdrop-blur-sm">
          {t.products.categories[product.category]}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Name with icon */}
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: product.color }}>
          <ProductIcon type={product.visual as VisualType} color={product.color} size={14} />
          {product.name}
        </div>

        {/* Headline — marketing hook */}
        <h3 className="mb-3 text-lg font-bold leading-snug text-white">
          {product.headline[lang]}
        </h3>

        {/* Description */}
        <p className="mb-5 flex-1 text-sm leading-relaxed text-zinc-400">
          {product.desc[lang]}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1">
            {product.tech.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-md px-2 py-0.5 text-[10px] font-medium"
                style={{ background: `${product.color}12`, color: `${product.color}cc` }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA arrow → detail page */}
          <Link
            href={`/products/${product.id}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300"
            style={{
              borderColor: hovered ? product.color : 'rgba(255,255,255,0.08)',
              background: hovered ? `${product.color}20` : 'transparent',
              color: hovered ? product.color : 'rgba(255,255,255,0.3)',
            }}
          >
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}
