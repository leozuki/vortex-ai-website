'use client'

import { useEffect, useRef } from 'react'

interface AuroraCanvasProps {
  smoothProgress: any
  isMobile: boolean
}

// Color palettes for different scroll stages
const COLOR_SETS = [
  ['#6366f1', '#8b5cf6', '#06b6d4', '#c084fc'], // Hero: Indigo & Violet & Cyan
  ['#3b82f6', '#4f46e5', '#8b5cf6', '#6366f1'], // Products: Deep Blue & Indigo
  ['#047857', '#10b981', '#06b6d4', '#059669'], // Solutions: Emerald & Mint
  ['#0891b2', '#06b6d4', '#14b8a6', '#0284c7'], // How It Works: Cyan & Teal
  ['#f43f5e', '#be185d', '#8b5cf6', '#ec4899'], // Contact: Rose & Magenta
]

function parseHex(hex: string) {
  const num = parseInt(hex.replace('#', ''), 16)
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  }
}

function lerpColor(hex1: string, hex2: string, factor: number) {
  const c1 = parseHex(hex1)
  const c2 = parseHex(hex2)
  const r = Math.round(c1.r + (c2.r - c1.r) * factor)
  const g = Math.round(c1.g + (c2.g - c1.g) * factor)
  const b = Math.round(c1.b + (c2.b - c1.b) * factor)
  return { r, g, b }
}

export function AuroraCanvas({ smoothProgress, isMobile }: AuroraCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf: number

    const resize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Setup color orbs
    const orbs = [
      { x: 0.3, y: 0.25, r: 0.45, phase: 0, speed: 0.0004 },
      { x: 0.7, y: 0.3, r: 0.35, phase: 1.2, speed: 0.0005 },
      { x: 0.5, y: 0.65, r: 0.4, phase: 2.5, speed: 0.0003 },
      { x: 0.2, y: 0.6, r: 0.25, phase: 3.8, speed: 0.0006 },
    ]

    // Setup warp stars
    const starCount = isMobile ? 35 : 160
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * 2000 - 1000,
      y: Math.random() * 2000 - 1000,
      z: Math.random() * 1000,
      px: 0,
      py: 0
    }))

    let t = 0
    let lastProgress = 0
    let scrollSpeed = 0

    const draw = () => {
      if (!canvas || !ctx) return
      const W = canvas.width
      const H = canvas.height
      
      // Clear canvas with deep space blue-black tailing
      ctx.fillStyle = 'rgba(2, 2, 8, 0.22)'
      ctx.fillRect(0, 0, W, H)
      t++

      // Get progress and calculate dynamic speed warp
      const progress = Math.min(Math.max(smoothProgress.get() || 0, 0), 1)
      const rawSpeed = Math.abs(progress - lastProgress) * 60
      lastProgress = progress

      // Eased scroll speed tracker
      scrollSpeed = scrollSpeed * 0.92 + rawSpeed * 0.08
      
      // Base starfield movement + scroll-linked warp speed
      const warpSpeed = 0.35 + scrollSpeed * 52

      // Interpolate colors based on global scroll position
      const setIndex = progress * (COLOR_SETS.length - 1)
      const idx1 = Math.floor(setIndex)
      const idx2 = Math.min(idx1 + 1, COLOR_SETS.length - 1)
      const factor = setIndex - idx1

      const currentColors = COLOR_SETS[idx1].map((c, i) => lerpColor(c, COLOR_SETS[idx2][i], factor))
      
      // 1. Draw organic morphing color orbs
      orbs.forEach((o, i) => {
        const x = (o.x + Math.sin(t * o.speed + o.phase) * 0.06) * W
        const y = (o.y + Math.cos(t * o.speed * 0.7 + o.phase) * 0.05) * H
        const r = o.r * Math.min(W, H)
        const color = currentColors[i]

        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.11)`) // Semi-transparent glow
        g.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.027)`)
        g.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      })

      // 2. Draw warp stars
      const cx = W / 2
      const cy = H / 2
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(0.68, 0.15 + scrollSpeed * 0.6)})`
      
      stars.forEach(s => {
        s.z -= warpSpeed
        if (s.z <= 0) {
          s.z = 1000
          s.x = Math.random() * 2000 - 1000
          s.y = Math.random() * 2000 - 1000
          s.px = 0
          s.py = 0
        }

        const k = 500 / s.z
        const px = s.x * k + cx
        const py = s.y * k + cy

        if (s.px !== 0 && s.py !== 0 && px >= 0 && px <= W && py >= 0 && py <= H) {
          ctx.beginPath()
          ctx.moveTo(px, py)
          ctx.lineTo(s.px, s.py)
          // Long streaks when moving fast
          ctx.lineWidth = Math.min(2.2, Math.max(0.4, (200 + scrollSpeed * 400) / s.z))
          ctx.stroke()
        }

        s.px = px
        s.py = py
      })

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [smoothProgress, isMobile])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />
}
