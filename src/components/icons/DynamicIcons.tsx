'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface IconProps {
  color: string
  size?: number
  className?: string
  hovered?: boolean
}

// Spoke helper for AgentsIcon
const getHexPoints = (cx: number, cy: number, r: number) => {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30)
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
  }).join(' ')
}

/* ── 1. AgentsIcon ── */
export function AgentsIcon({ color, size = 32, className, hovered = false }: IconProps) {
  const s = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', className }
  const pointsOuter = getHexPoints(16, 16, 13)
  const pointsInner = getHexPoints(16, 16, 7)

  return (
    <svg {...s}>
      <defs>
        <linearGradient id="agents-g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="agents-g2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {/* Outer hex */}
      <motion.polygon
        points={pointsOuter}
        fill="url(#agents-g2)"
        stroke="url(#agents-g1)"
        strokeWidth="1"
        animate={{ rotate: hovered ? 360 : [0, 360] }}
        style={{ originX: '16px', originY: '16px' }}
        transition={{
          duration: hovered ? 8 : 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      {/* Inner hex */}
      <motion.polygon
        points={pointsInner}
        fill="url(#agents-g1)"
        fillOpacity="0.25"
        stroke="url(#agents-g1)"
        strokeWidth="1.5"
        animate={{
          scale: hovered ? [1, 1.15, 1] : [1, 1.05, 1],
          rotate: hovered ? -360 : [0, -360],
        }}
        style={{ originX: '16px', originY: '16px' }}
        transition={{
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: hovered ? 12 : 30, repeat: Infinity, ease: 'linear' },
        }}
      />
      {/* Spokes */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 180) * (60 * i - 30)
        const x1 = 16 + 7 * Math.cos(a)
        const y1 = 16 + 7 * Math.sin(a)
        const x2 = 16 + 13 * Math.cos(a)
        const y2 = 16 + 13 * Math.sin(a)
        return (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="0.8"
            initial={{ strokeOpacity: 0.4 }}
            animate={{
              strokeOpacity: hovered ? [0.2, 0.8, 0.2] : 0.4,
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.25,
              repeat: Infinity,
            }}
          />
        )
      })}
      {/* Center dot */}
      <circle cx="16" cy="16" r="3" fill={color} />
      <motion.circle
        cx="16"
        cy="16"
        r="1.2"
        fill="white"
        animate={{ scale: hovered ? [1, 1.5, 1] : 1 }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </svg>
  )
}

/* ── 2. DataIcon ── */
export function DataIcon({ color, size = 32, className, hovered = false }: IconProps) {
  const s = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', className }

  return (
    <svg {...s}>
      <defs>
        <linearGradient id="data-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      {/* Funnel shape */}
      <path
        d="M4 6 L28 6 L20 16 L20 27 L12 27 L12 16 Z"
        fill="url(#data-g)"
        fillOpacity="0.18"
        stroke="url(#data-g)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Flow lines inside funnel */}
      <line x1="11" y1="9" x2="21" y2="9" stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="13" y1="12" x2="19" y2="12" stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="14.5" y1="15" x2="17.5" y2="15" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.8" />
      
      {/* Dynamic flowing drops */}
      <motion.circle
        cx="16"
        cy="8"
        r="1.5"
        fill={color}
        animate={hovered ? { y: [0, 16], opacity: [0, 1, 0] } : { y: [0, 10], opacity: [0, 0.7, 0] }}
        transition={{ duration: hovered ? 1.2 : 2.5, repeat: Infinity, ease: 'easeIn' }}
      />
      <motion.circle
        cx="16"
        cy="8"
        r="1.2"
        fill={color}
        animate={hovered ? { y: [0, 16], opacity: [0, 1, 0] } : { y: [0, 10], opacity: [0, 0.7, 0] }}
        transition={{ duration: hovered ? 1.2 : 2.5, delay: hovered ? 0.6 : 1.25, repeat: Infinity, ease: 'easeIn' }}
      />
      {/* Output dot */}
      <motion.circle
        cx="16"
        cy="27"
        r="2.5"
        fill={color}
        animate={{ scale: hovered ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </svg>
  )
}

/* ── 3. MonitorIcon ── */
export function MonitorIcon({ color, size = 32, className, hovered = false }: IconProps) {
  const s = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', className }

  return (
    <svg {...s}>
      <defs>
        <linearGradient id="monitor-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      {/* Screen bezel */}
      <rect
        x="2"
        y="5"
        width="28"
        height="19"
        rx="3.5"
        fill={color}
        fillOpacity="0.06"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Pulse wave path with drawing effect */}
      <motion.path
        d="M4,15 L7,15 L9.5,9 L12,21 L14.5,11 L17,15 L20,15 L22.5,9 L25,15 L28,15"
        stroke="url(#monitor-g)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        animate={{
          pathLength: hovered ? [0, 1] : 1,
        }}
        transition={{
          duration: 1.5,
          repeat: hovered ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />
      {/* Live pulse dot */}
      <motion.circle
        cx="28"
        cy="15"
        r="2.2"
        fill="#10b981"
        animate={{ scale: hovered ? [1, 1.4, 1] : 1 }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
      <circle cx="28" cy="15" r="4" fill="#10b981" fillOpacity="0.15" />
      {/* Stand */}
      <path d="M12 24 L20 24 M16 24 L16 28 M10 28 L22 28" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ── 4. CreativeIcon ── */
export function CreativeIcon({ color, size = 32, className, hovered = false }: IconProps) {
  const s = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', className }

  return (
    <svg {...s}>
      <defs>
        <linearGradient id="creative-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      {/* Outer circle */}
      <motion.circle
        cx="16"
        cy="16"
        r="13"
        fill="url(#creative-g)"
        fillOpacity="0.12"
        stroke="url(#creative-g)"
        strokeWidth="1.5"
        animate={{ scale: hovered ? [1, 1.05, 1] : 1 }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      {/* Play triangle */}
      <motion.polygon
        points="13,10.5 23,16 13,21.5"
        fill="url(#creative-g)"
        animate={{ x: hovered ? [0, 1.5, 0] : 0 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Sound waves (left arcs) with rippling */}
      <motion.path
        d="M8 10 Q5 16 8 22"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        initial={{ strokeOpacity: 0.5 }}
        animate={{
          strokeOpacity: hovered ? [0.3, 0.9, 0.3] : 0.5,
          scale: hovered ? [0.95, 1.05, 0.95] : 1,
        }}
        style={{ originX: '16px', originY: '16px' }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      <motion.path
        d="M5.5 7.5 Q1 16 5.5 24.5"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        initial={{ strokeOpacity: 0.25 }}
        animate={{
          strokeOpacity: hovered ? [0.1, 0.6, 0.1] : 0.25,
          scale: hovered ? [0.9, 1.1, 0.9] : 1,
        }}
        style={{ originX: '16px', originY: '16px' }}
        transition={{ duration: 1.2, delay: 0.3, repeat: Infinity }}
      />
    </svg>
  )
}

/* ── 5. CrmIcon ── */
export function CrmIcon({ color, size = 32, className, hovered = false }: IconProps) {
  const s = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', className }

  return (
    <svg {...s}>
      <defs>
        <linearGradient id="crm-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      {/* Connection arc */}
      <motion.path
        d="M7 15 Q16 6 25 15"
        stroke="url(#crm-g)"
        strokeWidth="1"
        fill="none"
        strokeDasharray="2 2"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: hovered ? [0, -10] : 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      {/* 3 person silhouettes */}
      {/* Center */}
      <g>
        <motion.circle
          cx="16"
          cy="10"
          r="4"
          fill="url(#crm-g)"
          animate={{ y: hovered ? [0, -2, 0] : 0 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M9 26 Q9 19 16 19 Q23 19 23 26"
          fill="url(#crm-g)"
          fillOpacity="0.4"
          animate={{ y: hovered ? [0, -1.5, 0] : 0 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </g>
      {/* Left person */}
      <g>
        <motion.circle
          cx="7"
          cy="12"
          r="3"
          fill={color}
          fillOpacity="0.5"
          animate={{ y: hovered ? [0, -2.5, 0] : 0 }}
          transition={{ duration: 1.2, delay: 0.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M2 26 Q2 20.5 7 20.5 Q11.5 20.5 11.5 25"
          fill={color}
          fillOpacity="0.2"
          animate={{ y: hovered ? [0, -1.8, 0] : 0 }}
          transition={{ duration: 1.2, delay: 0.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </g>
      {/* Right person */}
      <g>
        <motion.circle
          cx="25"
          cy="12"
          r="3"
          fill="#10b981"
          fillOpacity="0.5"
          animate={{ y: hovered ? [0, -2.5, 0] : 0 }}
          transition={{ duration: 1.2, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M20.5 25 Q20.5 20.5 25 20.5 Q30 20.5 30 26"
          fill="#10b981"
          fillOpacity="0.2"
          animate={{ y: hovered ? [0, -1.8, 0] : 0 }}
          transition={{ duration: 1.2, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </g>
    </svg>
  )
}

/* ── 6. ReportIcon ── */
export function ReportIcon({ color, size = 32, className, hovered = false }: IconProps) {
  const s = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', className }

  return (
    <svg {...s}>
      <defs>
        <linearGradient id="report-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      {/* Lightning bolt */}
      <motion.polygon
        points="19,3 8,18 15,18 13,29 24,14 17,14"
        fill="url(#report-g)"
        fillOpacity="0.25"
        stroke="url(#report-g)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        animate={{
          scale: hovered ? [1, 1.05, 0.98, 1.05, 1] : 1,
          rotate: hovered ? [0, -3, 3, -3, 0] : 0,
        }}
        style={{ originX: '16px', originY: '16px' }}
        transition={{ duration: 0.8, repeat: hovered ? Infinity : 0 }}
      />
      {/* Inner fill for bolt */}
      <motion.polygon
        points="18,7 11,18 16,18 14,26 21,15 16,15"
        fill="url(#report-g)"
        fillOpacity="0.5"
        animate={{
          fillOpacity: hovered ? [0.4, 0.8, 0.4] : 0.5,
        }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </svg>
  )
}

/* ── 7. DesktopIcon ── */
export function DesktopIcon({ color, size = 32, className, hovered = false }: IconProps) {
  const s = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', className }

  return (
    <svg {...s}>
      <defs>
        <linearGradient id="desktop-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      {/* Back window */}
      <motion.g
        animate={{
          x: hovered ? 2 : 0,
          y: hovered ? -2 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <rect x="7" y="4" width="22" height="16" rx="3" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
        <rect x="7" y="4" width="22" height="4.5" rx="3" fill={color} fillOpacity="0.15" />
      </motion.g>

      {/* Mid window */}
      <motion.g
        animate={{
          x: hovered ? 1 : 0,
          y: hovered ? -1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <rect x="4" y="9" width="22" height="16" rx="3" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
        <rect x="4" y="9" width="22" height="4.5" rx="3" fill={color} fillOpacity="0.2" />
      </motion.g>

      {/* Front window */}
      <motion.g
        animate={{
          x: hovered ? -2 : 0,
          y: hovered ? 2 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <rect x="1" y="14" width="22" height="16" rx="3" fill="rgba(255,255,255,0.03)" stroke="url(#desktop-g)" strokeWidth="1.5" />
        <rect x="1" y="14" width="22" height="4.5" rx="3" fill="url(#desktop-g)" fillOpacity="0.25" />
        {/* Traffic lights */}
        <circle cx="4.5"  cy="16.3" r="1.1" fill="#ef4444" fillOpacity="0.9" />
        <circle cx="7.5"  cy="16.3" r="1.1" fill="#f59e0b" fillOpacity="0.9" />
        <circle cx="10.5" cy="16.3" r="1.1" fill="#10b981" fillOpacity="0.9" />
        {/* Content rows */}
        <rect x="4" y="21" width="16" height="2" rx="1" fill="rgba(255,255,255,0.15)" />
        <rect x="4" y="25" width="11" height="2" rx="1" fill="rgba(255,255,255,0.08)" />
      </motion.g>
    </svg>
  )
}

/* ── 8. ExtensionIcon ── */
export function ExtensionIcon({ color, size = 32, className, hovered = false }: IconProps) {
  const s = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', className }

  return (
    <svg {...s}>
      <defs>
        <linearGradient id="extension-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      {/* Piece 1: Left */}
      <motion.path
        d="M5 5 H15 V9.5 C15 9.5 18 7.5 18 10 C18 12.5 15 10.5 15 10.5 V15 H10.5 C10.5 15 12.5 18 10 18 C7.5 18 9.5 15 9.5 15 H5 Z"
        fill="url(#extension-g)"
        fillOpacity="0.2"
        stroke="url(#extension-g)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        animate={{
          x: hovered ? 1 : 0,
          y: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      {/* Piece 2: Right */}
      <motion.path
        d="M15 15 H25 V19.5 C25 19.5 28 17.5 28 20 C28 22.5 25 20.5 25 20.5 V25 H20.5 C20.5 25 22.5 28 20 28 C17.5 28 19.5 25 19.5 25 H15 Z"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        strokeWidth="1"
        strokeLinejoin="round"
        strokeOpacity="0.6"
        animate={{
          x: hovered ? -1 : 0,
          y: hovered ? -1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      {/* Center connection dot */}
      <motion.circle
        cx="15"
        cy="15"
        r="2.5"
        fill="url(#extension-g)"
        animate={{ scale: hovered ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 0.6, repeat: hovered ? Infinity : 0 }}
      />
      <circle cx="15" cy="15" r="1" fill="white" fillOpacity="0.9" />
    </svg>
  )
}

/* ── 9. DmsIcon ── */
export function DmsIcon({ color, size = 32, className, hovered = false }: IconProps) {
  const s = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', className }

  return (
    <svg {...s}>
      <defs>
        <linearGradient id="dms-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      {/* Document */}
      <path
        d="M5 3 L19 3 L25 9 L25 29 L5 29 Z"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M19 3 L19 9 L25 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Text lines */}
      <line x1="9" y1="15" x2="21" y2="15" stroke="rgba(255,255,255,0.3)" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="9" y1="19" x2="21" y2="19" stroke="rgba(255,255,255,0.2)" strokeWidth="1.3" strokeLinecap="round" />
      
      {/* Shield badge with pulse */}
      <motion.path
        d="M20 21 L27 23.5 L27 28 Q27 31 23.5 32 Q20 31 20 28 Z"
        fill="url(#dms-g)"
        fillOpacity="0.85"
        animate={{
          scale: hovered ? [1, 1.1, 1] : 1,
        }}
        style={{ originX: '23.5px', originY: '26.5px' }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      {/* Check inside shield - dynamic pathLength */}
      <motion.polyline
        points="21.5,27 23,28.5 26,25"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          pathLength: hovered ? [0, 1] : 1,
        }}
        transition={{ duration: 0.6 }}
      />
    </svg>
  )
}

/* ── 10. TranscriptIcon ── */
export function TranscriptIcon({ color, size = 32, className, hovered = false }: IconProps) {
  const s = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', className }

  return (
    <svg {...s}>
      <defs>
        <linearGradient id="transcript-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      {/* Mic body */}
      <motion.rect
        x="10"
        y="2"
        width="12"
        height="16"
        rx="6"
        fill="url(#transcript-g)"
        fillOpacity="0.2"
        stroke="url(#transcript-g)"
        strokeWidth="1.5"
        animate={{
          y: hovered ? [0, -1, 1, -0.5, 0] : 0,
        }}
        transition={{ duration: 0.5, repeat: hovered ? Infinity : 0 }}
      />
      {/* Mic grille lines */}
      <line x1="13" y1="8"  x2="19" y2="8"  stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="13" y1="11" x2="19" y2="11" stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="13" y1="14" x2="19" y2="14" stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
      
      {/* Stand */}
      <path d="M7 18 Q7 25 16 25 Q25 25 25 18" stroke="url(#transcript-g)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <line x1="16" y1="25" x2="16" y2="29" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="29" x2="21" y2="29" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Sound rings - rippling ripples */}
      <motion.path
        d="M4 11 Q2.5 16 4 21"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        initial={{ strokeOpacity: 0.4 }}
        animate={{
          strokeOpacity: hovered ? [0.2, 0.9, 0.2] : 0.4,
          x: hovered ? [-1, 1, -1] : 0,
        }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      <motion.path
        d="M28 11 Q29.5 16 28 21"
        stroke="#a78bfa"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        initial={{ strokeOpacity: 0.4 }}
        animate={{
          strokeOpacity: hovered ? [0.2, 0.9, 0.2] : 0.4,
          x: hovered ? [1, -1, 1] : 0,
        }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
    </svg>
  )
}

/* ── 11. AdsIcon ── */
export function AdsIcon({ color, size = 32, className, hovered = false }: IconProps) {
  const s = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', className }

  return (
    <svg {...s}>
      <defs>
        <linearGradient id="ads-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      {/* Target rings */}
      <circle cx="14" cy="15" r="11" stroke={color} strokeWidth="1" strokeOpacity="0.2" fill="none" />
      
      {/* Middle ring - slow spin */}
      <motion.circle
        cx="14"
        cy="15"
        r="7"
        stroke={color}
        strokeWidth="1.2"
        strokeOpacity="0.45"
        fill="none"
        strokeDasharray="4 2"
        animate={{ rotate: hovered ? -360 : 0 }}
        style={{ originX: '14px', originY: '15px' }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Inner ring - clockwise spin */}
      <motion.circle
        cx="14"
        cy="15"
        r="3.5"
        stroke="url(#ads-g)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="2 1"
        animate={{ rotate: 360 }}
        style={{ originX: '14px', originY: '15px' }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      {/* Ticks */}
      <line x1="14" y1="2"  x2="14" y2="5.5"  stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="14" y1="24.5" x2="14" y2="28" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="1"  y1="15" x2="4.5"  y2="15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      
      {/* Bullseye */}
      <circle cx="14" cy="15" r="1.5" fill="url(#ads-g)" />
      
      {/* Arrow up-right with firing transition */}
      <motion.path
        d="M22 10 L28 4 M28 4 L22 4 M28 4 L28 10"
        stroke="url(#ads-g)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={
          hovered
            ? {
                x: [0, 4, -4, 0],
                y: [0, -4, 4, 0],
              }
            : {}
        }
        transition={{ duration: 0.8, repeat: hovered ? Infinity : 0, ease: 'easeInOut' }}
      />
    </svg>
  )
}
