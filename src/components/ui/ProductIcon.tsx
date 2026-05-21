'use client'

import type { VisualType } from '@/types'

interface Props {
  type: VisualType
  color: string
  size?: number
  className?: string
}

export function ProductIcon({ type, color, size = 32, className }: Props) {
  const s = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', className }
  const id = type // stable gradient id prefix

  switch (type) {

    /* ── agents: hexagonal neural hub ── */
    case 'agents': {
      const hex = (cx: number, cy: number, r: number) => {
        const pts = Array.from({ length: 6 }, (_, i) => {
          const a = (Math.PI / 180) * (60 * i - 30)
          return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
        }).join(' ')
        return pts
      }
      return (
        <svg {...s}>
          <defs>
            <linearGradient id={`${id}-g1`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id={`${id}-g2`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Outer hex */}
          <polygon points={hex(16, 16, 13)} fill={`url(#${id}-g2)`} stroke={`url(#${id}-g1)`} strokeWidth="1" />
          {/* Inner hex */}
          <polygon points={hex(16, 16, 7)} fill={`url(#${id}-g1)`} fillOpacity="0.25" stroke={`url(#${id}-g1)`} strokeWidth="1.5" />
          {/* Spoke lines */}
          {Array.from({ length: 6 }, (_, i) => {
            const a = (Math.PI / 180) * (60 * i - 30)
            const x2 = 16 + 13 * Math.cos(a)
            const y2 = 16 + 13 * Math.sin(a)
            return <line key={i} x1={16 + 7 * Math.cos(a)} y1={16 + 7 * Math.sin(a)} x2={x2} y2={y2}
              stroke={color} strokeWidth="0.8" strokeOpacity="0.4" />
          })}
          {/* Center dot */}
          <circle cx="16" cy="16" r="3" fill={color} />
          <circle cx="16" cy="16" r="1.2" fill="white" fillOpacity="0.9" />
        </svg>
      )
    }

    /* ── data: converging funnel / pipeline ── */
    case 'data':
      return (
        <svg {...s}>
          <defs>
            <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor={color} />
            </linearGradient>
          </defs>
          {/* Funnel shape */}
          <path d="M4 6 L28 6 L20 16 L20 27 L12 27 L12 16 Z"
            fill={`url(#${id}-g)`} fillOpacity="0.18"
            stroke={`url(#${id}-g)`} strokeWidth="1.5" strokeLinejoin="round" />
          {/* Flow lines inside funnel */}
          <line x1="11" y1="9"  x2="21" y2="9"  stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
          <line x1="13" y1="12" x2="19" y2="12" stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
          <line x1="14.5" y1="15" x2="17.5" y2="15" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.8" />
          {/* Output dot */}
          <circle cx="16" cy="27" r="2.5" fill={color} />
        </svg>
      )

    /* ── monitor: pulse / heartbeat wave ── */
    case 'monitor':
      return (
        <svg {...s}>
          <defs>
            <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={color} stopOpacity="0.2" />
              <stop offset="50%" stopColor={color} />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          {/* Screen bezel */}
          <rect x="2" y="5" width="28" height="19" rx="3.5"
            fill={color} fillOpacity="0.06" stroke={color} strokeWidth="1.5" />
          {/* Pulse wave */}
          <polyline
            points="4,15 7,15 9.5,9 12,21 14.5,11 17,15 20,15 22.5,9 25,15 28,15"
            stroke={`url(#${id}-g)`} strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" fill="none"
          />
          {/* Live pulse dot */}
          <circle cx="28" cy="15" r="2.2" fill="#10b981" />
          <circle cx="28" cy="15" r="4"   fill="#10b981" fillOpacity="0.15" />
          {/* Stand */}
          <path d="M12 24 L20 24 M16 24 L16 28 M10 28 L22 28"
            stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )

    /* ── creative: play button + sound wave ── */
    case 'creative':
      return (
        <svg {...s}>
          <defs>
            <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          {/* Outer circle */}
          <circle cx="16" cy="16" r="13" fill={`url(#${id}-g)`} fillOpacity="0.12" stroke={`url(#${id}-g)`} strokeWidth="1.5" />
          {/* Play triangle */}
          <polygon points="13,10.5 23,16 13,21.5" fill={`url(#${id}-g)`} />
          {/* Sound waves (left arcs) */}
          <path d="M8 10 Q5 16 8 22"  stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" strokeOpacity="0.5" />
          <path d="M5.5 7.5 Q1 16 5.5 24.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" strokeOpacity="0.25" />
        </svg>
      )

    /* ── crm: people + pipeline arc ── */
    case 'crm':
      return (
        <svg {...s}>
          <defs>
            <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          {/* 3 person silhouettes */}
          {/* Center */}
          <circle cx="16" cy="10" r="4" fill={`url(#${id}-g)`} />
          <path d="M9 26 Q9 19 16 19 Q23 19 23 26" fill={`url(#${id}-g)`} fillOpacity="0.4" />
          {/* Left person (smaller) */}
          <circle cx="7" cy="12" r="3" fill={color} fillOpacity="0.5" />
          <path d="M2 26 Q2 20.5 7 20.5 Q11.5 20.5 11.5 25" fill={color} fillOpacity="0.2" />
          {/* Right person (smaller) */}
          <circle cx="25" cy="12" r="3" fill="#10b981" fillOpacity="0.5" />
          <path d="M20.5 25 Q20.5 20.5 25 20.5 Q30 20.5 30 26" fill="#10b981" fillOpacity="0.2" />
          {/* Connection arc */}
          <path d="M7 15 Q16 6 25 15" stroke={`url(#${id}-g)`} strokeWidth="1" fill="none" strokeDasharray="2 2" strokeOpacity="0.5" />
        </svg>
      )

    /* ── report: lightning bolt automation ── */
    case 'report':
      return (
        <svg {...s}>
          <defs>
            <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          {/* Lightning bolt */}
          <polygon
            points="19,3 8,18 15,18 13,29 24,14 17,14"
            fill={`url(#${id}-g)`} fillOpacity="0.25"
            stroke={`url(#${id}-g)`} strokeWidth="1.5" strokeLinejoin="round"
          />
          {/* Inner fill for bolt */}
          <polygon
            points="18,7 11,18 16,18 14,26 21,15 16,15"
            fill={`url(#${id}-g)`} fillOpacity="0.5"
          />
        </svg>
      )

    /* ── desktop: layered browser windows ── */
    case 'desktop':
      return (
        <svg {...s}>
          <defs>
            <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          {/* Back window */}
          <rect x="7" y="4" width="22" height="16" rx="3" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
          <rect x="7" y="4" width="22" height="4.5" rx="3" fill={color} fillOpacity="0.15" />
          {/* Mid window */}
          <rect x="4" y="9" width="22" height="16" rx="3" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
          <rect x="4" y="9" width="22" height="4.5" rx="3" fill={color} fillOpacity="0.2" />
          {/* Front window */}
          <rect x="1" y="14" width="22" height="16" rx="3" fill="rgba(255,255,255,0.03)" stroke={`url(#${id}-g)`} strokeWidth="1.5" />
          <rect x="1" y="14" width="22" height="4.5" rx="3" fill={`url(#${id}-g)`} fillOpacity="0.25" />
          {/* Traffic lights */}
          <circle cx="4.5"  cy="16.3" r="1.1" fill="#ef4444" fillOpacity="0.9" />
          <circle cx="7.5"  cy="16.3" r="1.1" fill="#f59e0b" fillOpacity="0.9" />
          <circle cx="10.5" cy="16.3" r="1.1" fill="#10b981" fillOpacity="0.9" />
          {/* Content rows */}
          <rect x="4" y="21" width="16" height="2" rx="1" fill="rgba(255,255,255,0.15)" />
          <rect x="4" y="25" width="11" height="2" rx="1" fill="rgba(255,255,255,0.08)" />
        </svg>
      )

    /* ── extension: chrome puzzle piece ── */
    case 'extension':
      return (
        <svg {...s}>
          <defs>
            <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          {/* Main puzzle piece — clean path */}
          <path
            d="M5 5 H15 V9.5 C15 9.5 18 7.5 18 10 C18 12.5 15 10.5 15 10.5 V15 H10.5 C10.5 15 12.5 18 10 18 C7.5 18 9.5 15 9.5 15 H5 Z"
            fill={`url(#${id}-g)`} fillOpacity="0.2"
            stroke={`url(#${id}-g)`} strokeWidth="1.5" strokeLinejoin="round"
          />
          {/* Second piece — offset diagonal */}
          <path
            d="M15 15 H25 V19.5 C25 19.5 28 17.5 28 20 C28 22.5 25 20.5 25 20.5 V25 H20.5 C20.5 25 22.5 28 20 28 C17.5 28 19.5 25 19.5 25 H15 Z"
            fill={color} fillOpacity="0.1"
            stroke={color} strokeWidth="1" strokeLinejoin="round" strokeOpacity="0.6"
          />
          {/* Accent dot at junction */}
          <circle cx="15" cy="15" r="2.5" fill={`url(#${id}-g)`} />
          <circle cx="15" cy="15" r="1"   fill="white" fillOpacity="0.9" />
        </svg>
      )

    /* ── dms: document with shield lock ── */
    case 'dms':
      return (
        <svg {...s}>
          <defs>
            <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          {/* Document */}
          <path d="M5 3 L19 3 L25 9 L25 29 L5 29 Z"
            fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M19 3 L19 9 L25 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Text lines */}
          <line x1="9" y1="15" x2="21" y2="15" stroke="rgba(255,255,255,0.3)" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="9" y1="19" x2="21" y2="19" stroke="rgba(255,255,255,0.2)" strokeWidth="1.3" strokeLinecap="round" />
          {/* Shield badge bottom-right */}
          <path d="M20 21 L27 23.5 L27 28 Q27 31 23.5 32 Q20 31 20 28 Z"
            fill={`url(#${id}-g)`} fillOpacity="0.85" />
          {/* Check inside shield */}
          <polyline points="21.5,27 23,28.5 26,25" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    /* ── transcript: microphone wave ── */
    case 'transcript':
      return (
        <svg {...s}>
          <defs>
            <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          {/* Mic body */}
          <rect x="10" y="2" width="12" height="16" rx="6" fill={`url(#${id}-g)`} fillOpacity="0.2" stroke={`url(#${id}-g)`} strokeWidth="1.5" />
          {/* Mic grille lines */}
          <line x1="13" y1="8"  x2="19" y2="8"  stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
          <line x1="13" y1="11" x2="19" y2="11" stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
          <line x1="13" y1="14" x2="19" y2="14" stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
          {/* Stand */}
          <path d="M7 18 Q7 25 16 25 Q25 25 25 18" stroke={`url(#${id}-g)`} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <line x1="16" y1="25" x2="16" y2="29" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="11" y1="29" x2="21" y2="29" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          {/* Sound rings */}
          <path d="M4 11 Q2.5 16 4 21"  stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" strokeOpacity="0.4" />
          <path d="M28 11 Q29.5 16 28 21" stroke="#a78bfa" strokeWidth="1.3" strokeLinecap="round" fill="none" strokeOpacity="0.4" />
        </svg>
      )

    /* ── ads: target crosshair + upward arrow ── */
    case 'ads':
      return (
        <svg {...s}>
          <defs>
            <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          {/* Crosshair rings */}
          <circle cx="14" cy="15" r="11" stroke={color} strokeWidth="1" strokeOpacity="0.2" fill="none" />
          <circle cx="14" cy="15" r="7"  stroke={color} strokeWidth="1.2" strokeOpacity="0.45" fill="none" />
          <circle cx="14" cy="15" r="3.5" stroke={`url(#${id}-g)`} strokeWidth="1.5" fill="none" />
          {/* Crosshair ticks */}
          <line x1="14" y1="2"  x2="14" y2="5.5"  stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
          <line x1="14" y1="24.5" x2="14" y2="28" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
          <line x1="1"  y1="15" x2="4.5"  y2="15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
          {/* Bullseye */}
          <circle cx="14" cy="15" r="1.5" fill={`url(#${id}-g)`} />
          {/* Arrow up-right */}
          <path d="M22 10 L28 4 M28 4 L22 4 M28 4 L28 10" stroke={`url(#${id}-g)`} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    default:
      return null
  }
}
