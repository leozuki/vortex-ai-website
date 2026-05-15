import { notFound } from 'next/navigation'
import { products } from '@/data/products'
import { productDetails, minimalDetails } from '@/data/productDetails'
import { ProductDetailClient } from './ProductDetailClient'

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  if (!product) notFound()

  const detail = productDetails[id] ?? minimalDetails[id]
  if (!detail) {
    // Fallback for products without detailed pages
    return <ProductDetailClient product={product} detail={null} />
  }

  return <ProductDetailClient product={product} detail={detail} />
}
