'use client'

import type { VisualType } from '@/types'

interface ProductIconProps {
  type: VisualType
  color: string
  size?: number
  className?: string
}

export function ProductIcon({ type, color, size = 32, className }: ProductIconProps) {
  const props = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', className }

  switch (type) {
    case 'agents':
      return (
        <svg {...props}>
          <circle cx="6" cy="16" r="3.5" stroke={color} strokeWidth="1.5" />
          <circle cx="16" cy="7" r="3" stroke={color} strokeWidth="1.5" />
          <circle cx="16" cy="25" r="3" stroke={color} strokeWidth="1.5" />
          <circle cx="26" cy="16" r="3.5" stroke={color} strokeWidth="1.5" />
          <line x1="9.4" y1="14.6" x2="13.1" y2="9" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <line x1="9.4" y1="17.4" x2="13.1" y2="23" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <line x1="19" y1="8.5" x2="22.8" y2="13.8" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <line x1="19" y1="23.5" x2="22.8" y2="18.2" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="6" cy="16" r="1.2" fill={color} />
          <circle cx="26" cy="16" r="1.2" fill={color} />
        </svg>
      )
    case 'data':
      return (
        <svg {...props}>
          <path d="M4 8 L16 4 L28 8 L16 12 Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M4 16 L16 12 L28 16 L16 20 Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" fill={`${color}18`} />
          <path d="M4 24 L16 20 L28 24 L16 28 Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" fill={`${color}30`} />
          <line x1="4" y1="8" x2="4" y2="24" stroke={color} strokeWidth="1.2" strokeOpacity="0.4" />
          <line x1="28" y1="8" x2="28" y2="24" stroke={color} strokeWidth="1.2" strokeOpacity="0.4" />
        </svg>
      )
    case 'monitor':
      return (
        <svg {...props}>
          <rect x="3" y="5" width="26" height="17" rx="2.5" stroke={color} strokeWidth="1.5" />
          <polyline points="7,17 10,13 13,15 17,9 21,12 25,8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="11" y1="22" x2="21" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="22" x2="16" y2="27" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="25" cy="8" r="2" fill={color} fillOpacity="0.8" />
        </svg>
      )
    case 'creative':
      return (
        <svg {...props}>
          <rect x="3" y="8" width="26" height="16" rx="2" stroke={color} strokeWidth="1.5" />
          <rect x="3" y="8" width="3.5" height="16" rx="1" fill={color} fillOpacity="0.3" />
          <rect x="25.5" y="8" width="3.5" height="16" rx="1" fill={color} fillOpacity="0.3" />
          <circle cx="9" cy="11" r="1.2" fill={color} fillOpacity="0.5" />
          <circle cx="9" cy="21" r="1.2" fill={color} fillOpacity="0.5" />
          <circle cx="23" cy="11" r="1.2" fill={color} fillOpacity="0.5" />
          <circle cx="23" cy="21" r="1.2" fill={color} fillOpacity="0.5" />
          <polygon points="13,12 13,20 21,16" fill={color} fillOpacity="0.7" />
        </svg>
      )
    case 'crm':
      return (
        <svg {...props}>
          <rect x="3" y="4" width="12" height="7" rx="2" stroke={color} strokeWidth="1.4" fill={`${color}18`} />
          <rect x="17" y="4" width="12" height="7" rx="2" stroke={color} strokeWidth="1.4" fill={`${color}18`} />
          <rect x="10" y="14" width="12" height="7" rx="2" stroke={color} strokeWidth="1.4" fill={`${color}30`} />
          <rect x="3" y="24" width="7" height="5" rx="1.5" stroke={color} strokeWidth="1.3" fill={`${color}40`} />
          <line x1="9" y1="11" x2="16" y2="14" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" />
          <line x1="23" y1="11" x2="18" y2="14" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" />
          <line x1="16" y1="21" x2="6.5" y2="24" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" />
        </svg>
      )
    case 'report':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="22" rx="2.5" stroke={color} strokeWidth="1.5" />
          <line x1="7" y1="9" x2="17" y2="9" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <line x1="7" y1="13" x2="17" y2="13" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <line x1="7" y1="17" x2="13" y2="17" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="24" cy="22" r="6" stroke={color} strokeWidth="1.5" fill={`${color}15`} />
          <polyline points="21,22 23,24 27,20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'desktop':
      return (
        <svg {...props}>
          <rect x="2" y="4" width="28" height="19" rx="2.5" stroke={color} strokeWidth="1.5" />
          <line x1="2" y1="9.5" x2="30" y2="9.5" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="5.5" cy="7" r="1.1" fill={color} fillOpacity="0.6" />
          <circle cx="9" cy="7" r="1.1" fill={color} fillOpacity="0.6" />
          <circle cx="12.5" cy="7" r="1.1" fill={color} fillOpacity="0.6" />
          <rect x="5" y="12.5" width="7" height="8" rx="1.5" stroke={color} strokeWidth="1.2" fill={`${color}15`} />
          <rect x="14.5" y="12.5" width="12" height="3" rx="1" fill={color} fillOpacity="0.25" />
          <rect x="14.5" y="17.5" width="8.5" height="3" rx="1" fill={color} fillOpacity="0.15" />
          <line x1="10" y1="23" x2="22" y2="23" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="23" x2="16" y2="28" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'extension':
      return (
        <svg {...props}>
          <path d="M14 5 H20 V9 C21.5 9 23 10.5 23 12 C23 13.5 21.5 15 20 15 V19 H14 V15 C12.5 15 11 13.5 11 12 C11 10.5 12.5 9 14 9 Z"
            stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill={`${color}15`} />
          <circle cx="17" cy="12" r="2" fill={color} fillOpacity="0.6" />
          <line x1="5" y1="9" x2="10" y2="9" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.5" />
          <line x1="5" y1="13" x2="10" y2="13" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.5" />
          <line x1="5" y1="17" x2="10" y2="17" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.5" />
          <line x1="21" y1="22" x2="28" y2="22" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.5" />
          <line x1="21" y1="26" x2="26" y2="26" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.5" />
        </svg>
      )
    case 'dms':
      return (
        <svg {...props}>
          <rect x="3" y="6" width="20" height="22" rx="2" stroke={color} strokeWidth="1.5" fill={`${color}10`} />
          <path d="M3 6 L3 6 Q3 4 5 4 L18 4 L23 9 L23 28 Q23 28 21 28 L5 28 Q3 28 3 26 Z" stroke={color} strokeWidth="1.4" fill={`${color}10`} />
          <path d="M18 4 L18 9 L23 9" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <line x1="7" y1="14" x2="19" y2="14" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <line x1="7" y1="18" x2="19" y2="18" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <line x1="7" y1="22" x2="15" y2="22" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="26" cy="24" r="4.5" stroke={color} strokeWidth="1.4" fill={`${color}20`} />
          <polyline points="24,24 25.5,25.5 28,22.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'transcript':
      return (
        <svg {...props}>
          <rect x="11" y="3" width="10" height="14" rx="5" stroke={color} strokeWidth="1.5" fill={`${color}15`} />
          <path d="M6 16 Q6 23 16 23 Q26 23 26 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <line x1="16" y1="23" x2="16" y2="28" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="11" y1="28" x2="21" y2="28" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="14" y1="8" x2="18" y2="8" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
          <line x1="13" y1="11" x2="19" y2="11" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
        </svg>
      )
    case 'ads':
      return (
        <svg {...props}>
          <rect x="3" y="18" width="5" height="10" rx="1.5" stroke={color} strokeWidth="1.4" fill={`${color}20`} />
          <rect x="10" y="13" width="5" height="15" rx="1.5" stroke={color} strokeWidth="1.4" fill={`${color}30`} />
          <rect x="17" y="7" width="5" height="21" rx="1.5" stroke={color} strokeWidth="1.4" fill={`${color}40`} />
          <rect x="24" y="3" width="5" height="25" rx="1.5" stroke={color} strokeWidth="1.4" fill={`${color}55`} />
          <polyline points="5.5,17 12.5,12 19.5,6 26.5,2" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" />
        </svg>
      )
    default:
      return null
  }
}
