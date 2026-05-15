'use client'

interface VortexLogoProps {
  size?: number
  className?: string
}

export function VortexLogoMark({ size = 36, className }: VortexLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="vx-grad-a" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <linearGradient id="vx-grad-b" x1="36" y1="0" x2="0" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
        </linearGradient>
        <filter id="vx-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Outer ring */}
      <circle cx="18" cy="18" r="16.5" stroke="url(#vx-grad-a)" strokeWidth="0.75" strokeOpacity="0.4" />

      {/* Inner glow disc */}
      <circle cx="18" cy="18" r="13" fill="url(#vx-grad-b)" />

      {/* Vortex spiral arms — 3 arcs creating swirl */}
      <g filter="url(#vx-glow)">
        {/* Arm 1 — top to right */}
        <path
          d="M18 6 C24 6, 30 12, 28 18 C26 22, 22 24, 18 22"
          stroke="url(#vx-grad-a)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arm 2 — right to bottom-left */}
        <path
          d="M28 18 C28 25, 22 31, 15 29 C10 27, 7 22, 9 18"
          stroke="url(#vx-grad-a)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.7"
          fill="none"
        />
        {/* Arm 3 — inner tightest */}
        <path
          d="M9 18 C9 14, 12 11, 16 11 C20 11, 22 14, 21 17"
          stroke="url(#vx-grad-a)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity="0.45"
          fill="none"
        />
      </g>

      {/* Center dot */}
      <circle cx="18" cy="18" r="2.2" fill="white" fillOpacity="0.95" filter="url(#vx-glow)" />
      <circle cx="18" cy="18" r="1" fill="white" />
    </svg>
  )
}

export function VortexWordmark({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <span
      className={className}
      style={{ fontSize: size, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}
    >
      <span style={{
        background: 'linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 50%, #7dd3fc 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        Vortex
      </span>
      <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, fontSize: size * 0.85 }}>
        {' '}AI
      </span>
    </span>
  )
}
