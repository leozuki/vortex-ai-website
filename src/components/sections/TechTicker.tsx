'use client'

const ITEMS = [
  { label: 'Claude Sonnet 4', color: '#d4a27a' },
  { label: 'Gemini 2.0 Flash', color: '#4285f4' },
  { label: 'GPT-4o', color: '#10a37f' },
  { label: 'Llama 3.3', color: '#0ea5e9' },
  { label: 'Next.js 16', color: '#ffffff' },
  { label: 'NestJS', color: '#e0234e' },
  { label: 'Python 3.12', color: '#f7ca3d' },
  { label: 'Electron', color: '#47848f' },
  { label: 'Suno v4', color: '#f59e0b' },
  { label: 'Imagen 3', color: '#34a853' },
  { label: 'PostgreSQL', color: '#336791' },
  { label: 'SQLite', color: '#06b6d4' },
  { label: 'WebSocket', color: '#8b5cf6' },
  { label: 'Telegram API', color: '#229ed9' },
  { label: 'ffmpeg', color: '#6bc946' },
  { label: 'Chrome MV3', color: '#ec4899' },
]

// Duplicate for seamless loop
const DOUBLED = [...ITEMS, ...ITEMS]

export function TechTicker() {
  return (
    <div className="relative overflow-hidden border-y border-white/[0.04] py-4" style={{ background: '#0c0c14' }}>
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
        style={{ background: 'linear-gradient(to right, #0c0c14, transparent)' }} />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
        style={{ background: 'linear-gradient(to left, #0c0c14, transparent)' }} />

      <div className="flex animate-ticker gap-6 whitespace-nowrap" style={{ width: 'max-content' }}>
        {DOUBLED.map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.06]"
            style={{ background: `${item.color}08` }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
            <span className="text-xs font-medium text-zinc-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
