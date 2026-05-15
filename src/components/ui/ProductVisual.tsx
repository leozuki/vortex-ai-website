'use client'

import type { VisualType } from '@/types'

interface ProductVisualProps {
  type: VisualType
  color: string
  large?: boolean
}

export function ProductVisual({ type, color, large }: ProductVisualProps) {
  return (
    <div className={`relative w-full overflow-hidden rounded-xl ${large ? 'h-72 md:h-80' : 'h-36'}`} style={{ background: `${color}0d` }}>
      {/* Base dot grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(${color}40 1px, transparent 1px)`,
          backgroundSize: '18px 18px',
        }}
      />
      {/* Radial glow from bottom */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 110%, ${color}30 0%, transparent 65%)` }}
      />
      {/* Top vignette */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, transparent 30%)' }} />

      {/* Per-type illustration */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ transform: large ? 'scale(1.85)' : 'scale(1)', transformOrigin: 'center center' }}>
        {type === 'agents' && <AgentsVisual color={color} />}
        {type === 'data' && <DataVisual color={color} />}
        {type === 'monitor' && <MonitorVisual color={color} />}
        {type === 'creative' && <CreativeVisual color={color} />}
        {type === 'crm' && <CRMVisual color={color} />}
        {type === 'report' && <ReportVisual color={color} />}
        {type === 'desktop' && <DesktopVisual color={color} />}
        {type === 'extension' && <ExtensionVisual color={color} />}
        {type === 'dms' && <DMSVisual color={color} />}
        {type === 'transcript' && <TranscriptVisual color={color} />}
        {type === 'ads' && <AdsVisual color={color} />}
      </div>
    </div>
  )
}

/* ─── Shared primitives ──────────────────────────────────────────────── */

function UICard({ x, y, w, h, color, opacity = 0.1 }: { x: number; y: number; w: number; h: number; color: string; opacity?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx="5" fill={color} fillOpacity={opacity} stroke={color} strokeOpacity={opacity * 2.5} strokeWidth="0.6" />
}

function Pill({ x, y, w, h = 6, color, opacity = 0.35 }: { x: number; y: number; w: number; h?: number; color: string; opacity?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={color} fillOpacity={opacity} />
}

function StatusDot({ x, y, status }: { x: number; y: number; status: 'green' | 'yellow' | 'red' | string }) {
  const c = status === 'green' ? '#10b981' : status === 'yellow' ? '#f59e0b' : status === 'red' ? '#ef4444' : status
  return (
    <g>
      <circle cx={x} cy={y} r={4} fill={c} fillOpacity="0.2" />
      <circle cx={x} cy={y} r={2.5} fill={c} fillOpacity="0.9" />
    </g>
  )
}

function WindowChrome({ color, x = 10, y = 8, w = 240, h = 84 }: { color: string; x?: number; y?: number; w?: number; h?: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="7" fill={color} fillOpacity="0.07" stroke={color} strokeOpacity="0.22" strokeWidth="0.8" />
      <rect x={x} y={y} width={w} height={18} rx="7" fill={color} fillOpacity="0.13" />
      <rect x={x} y={y + 9} width={w} height={9} fill={color} fillOpacity="0.08" />
      <circle cx={x + 13} cy={y + 9} r="3.5" fill="#ef4444" fillOpacity="0.7" />
      <circle cx={x + 24} cy={y + 9} r="3.5" fill="#f59e0b" fillOpacity="0.7" />
      <circle cx={x + 35} cy={y + 9} r="3.5" fill="#10b981" fillOpacity="0.7" />
    </>
  )
}

/* ─── 1. Agents ─────────────────────────────────────────────────────── */

function AgentsVisual({ color }: { color: string }) {
  const nodes = [
    { x: 30, y: 50, label: 'Planner', size: 11, pulse: true },
    { x: 90, y: 28, label: 'Mgr', size: 8 },
    { x: 90, y: 72, label: 'Mgr', size: 8 },
    { x: 145, y: 18, label: 'W1', size: 7 },
    { x: 145, y: 50, label: 'W2', size: 7 },
    { x: 145, y: 82, label: 'W3', size: 7 },
    { x: 200, y: 50, label: 'Review', size: 9, pulse: true },
    { x: 242, y: 50, label: 'Done', size: 8, done: true },
  ]
  const edges: [number, number, number, number][] = [
    [30, 50, 90, 28], [30, 50, 90, 72],
    [90, 28, 145, 18], [90, 28, 145, 50], [90, 72, 145, 50], [90, 72, 145, 82],
    [145, 18, 200, 50], [145, 50, 200, 50], [145, 82, 200, 50],
    [200, 50, 242, 50],
  ]

  return (
    <svg width="270" height="100" viewBox="0 0 270 100">
      {/* Edges */}
      {edges.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={color} strokeWidth="1.2" strokeOpacity="0.28" strokeDasharray="3.5 2.5" />
      ))}
      {/* Status line at bottom */}
      <rect x={10} y={92} width={250} height={4} rx="2" fill={color} fillOpacity="0.08" />
      <rect x={10} y={92} width={180} height={4} rx="2" fill={color} fillOpacity="0.4" />

      {nodes.map((n, i) => {
        const c = n.done ? '#10b981' : color
        return (
          <g key={i}>
            {n.pulse && <circle cx={n.x} cy={n.y} r={n.size + 6} fill={c} fillOpacity="0.1" />}
            <circle cx={n.x} cy={n.y} r={n.size} fill={c} fillOpacity={n.pulse ? 0.25 : 0.15} stroke={c} strokeOpacity={n.pulse ? 0.8 : 0.5} strokeWidth="1.2" />
            <circle cx={n.x} cy={n.y} r={n.size * 0.42} fill={c} fillOpacity="0.9" />
            <text x={n.x} y={n.y + n.size + 7} textAnchor="middle" fill={c} fontSize="6.5" opacity="0.65">{n.label}</text>
          </g>
        )
      })}

      {/* Task chips */}
      {[18, 50, 82].map((y, i) => (
        <g key={i}>
          <rect x={155} y={y - 5} width={32} height={9} rx="4" fill={color} fillOpacity={0.12 + i * 0.04} stroke={color} strokeOpacity="0.2" strokeWidth="0.5" />
        </g>
      ))}
    </svg>
  )
}

/* ─── 2. Data Pipeline ───────────────────────────────────────────────── */

function DataVisual({ color }: { color: string }) {
  const phases = [
    { label: 'Collect', icon: '↓', rows: [70, 55, 45, 80] },
    { label: 'Enrich', icon: '⊕', rows: [60, 75, 50, 90] },
    { label: 'Score', icon: '★', rows: [92, 85, 40, 78] },
  ]

  return (
    <svg width="270" height="100" viewBox="0 0 270 100">
      {phases.map((ph, pi) => (
        <g key={pi}>
          {/* Phase card */}
          <UICard x={12 + pi * 86} y={6} w={74} h={80} color={color} opacity={0.07 + pi * 0.02} />
          {/* Header */}
          <rect x={12 + pi * 86} y={6} width={74} height={16} rx="5" fill={color} fillOpacity={0.13 + pi * 0.04} />
          <text x={49 + pi * 86} y={17} textAnchor="middle" fill={color} fontSize="7.5" fontWeight="600" opacity="0.8">{ph.label}</text>

          {/* Data rows */}
          {ph.rows.map((w, ri) => (
            <g key={ri}>
              <rect x={17 + pi * 86} y={27 + ri * 14} width={64} height={9} rx="2" fill={color} fillOpacity="0.07" />
              <rect x={17 + pi * 86} y={27 + ri * 14} width={w * 0.56} height={9} rx="2" fill={color} fillOpacity={0.18 + pi * 0.08} />
            </g>
          ))}

          {/* Arrow to next */}
          {pi < 2 && (
            <g>
              <line x1={86 + pi * 86} y1={46} x2={100 + pi * 86} y2={46} stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
              <polygon points={`${98 + pi * 86},42.5 ${104 + pi * 86},46 ${98 + pi * 86},49.5`} fill={color} fillOpacity="0.6" />
            </g>
          )}
        </g>
      ))}

      {/* Score output on right */}
      <UICard x={272} y={18} w={0} h={64} color={color} opacity={0} />
      {[92, 85, 78, 40].map((s, i) => (
        <g key={i}>
          <circle cx={258} cy={27 + i * 14} r="7" fill={color} fillOpacity={s > 70 ? 0.25 : 0.08} stroke={color} strokeOpacity={s > 70 ? 0.5 : 0.2} strokeWidth="0.6" />
          <text x={258} y={31 + i * 14} textAnchor="middle" fill={color} fontSize="6" fontWeight="700" opacity={s > 70 ? 0.9 : 0.4}>{s}</text>
        </g>
      ))}
    </svg>
  )
}

/* ─── 3. Monitor (Web Fleet) ────────────────────────────────────────── */

function MonitorVisual({ color }: { color: string }) {
  const sites = [
    { name: 'shop.vn', uptime: 99.8, ms: 142, ok: true },
    { name: 'api.vn', uptime: 100, ms: 88, ok: true },
    { name: 'blog.vn', uptime: 97.2, ms: 310, ok: false },
  ]
  const spark = [88, 92, 85, 94, 90, 97, 99, 96, 98, 100, 99, 100]

  return (
    <svg width="270" height="100" viewBox="0 0 270 100">
      <WindowChrome color={color} x={8} y={5} w={254} h={90} />

      {/* Sidebar */}
      <rect x={8} y={23} width={56} height={72} fill={color} fillOpacity="0.06" />
      {['Overview', 'Sites', 'Alerts', 'SSL'].map((t, i) => (
        <g key={i}>
          <rect x={12} y={28 + i * 14} width={48} height={10} rx="5"
            fill={color} fillOpacity={i === 1 ? 0.35 : 0.08} />
          <text x={36} y={36 + i * 14} textAnchor="middle" fill={color} fontSize="6.5" opacity={i === 1 ? 0.9 : 0.45}>{t}</text>
        </g>
      ))}

      {/* Main content */}
      {sites.map((s, i) => (
        <g key={i}>
          <rect x={70} y={26 + i * 20} width={186} height={16} rx="4"
            fill={color} fillOpacity={i === 2 ? 0.12 : 0.07}
            stroke={i === 2 ? '#ef4444' : color} strokeOpacity={i === 2 ? 0.35 : 0.12} strokeWidth="0.6" />
          <StatusDot x={80} y={34 + i * 20} status={s.ok ? 'green' : 'yellow'} />
          <text x={88} y={37.5 + i * 20} fill={color} fontSize="7" opacity="0.8">{s.name}</text>
          <text x={140} y={37.5 + i * 20} fill={s.ok ? '#10b981' : '#f59e0b'} fontSize="6.5" opacity="0.85">{s.uptime}%</text>
          <text x={172} y={37.5 + i * 20} fill={color} fontSize="6.5" opacity="0.5">{s.ms}ms</text>

          {/* Mini sparkline */}
          <polyline
            points={spark.slice(0, 8).map((v, j) => `${210 + j * 5},${40 + i * 20 - v * 0.06}`).join(' ')}
            fill="none" stroke={s.ok ? '#10b981' : '#f59e0b'} strokeWidth="1.1" strokeOpacity="0.6" strokeLinejoin="round"
          />
        </g>
      ))}

      {/* Alert badge */}
      <rect x={172} y={76} width={72} height={12} rx="5" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeOpacity="0.3" strokeWidth="0.6" />
      <text x={208} y={85} textAnchor="middle" fill="#ef4444" fontSize="6.5" opacity="0.85">⚠ blog.vn slow</text>
    </svg>
  )
}

/* ─── 4. Creative (TaoMeetsTrap) ─────────────────────────────────────── */

function CreativeVisual({ color }: { color: string }) {
  const steps = ['Lyrics', 'Music', 'Visual', 'Video', 'Upload']
  const done = [true, true, true, false, false]

  return (
    <svg width="270" height="100" viewBox="0 0 270 100">
      {/* Film strip bg */}
      <rect x={8} y={30} width={254} height={44} rx="5" fill={color} fillOpacity="0.06" stroke={color} strokeOpacity="0.15" strokeWidth="0.8" />
      {/* Sprocket holes */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <g key={i}>
          <rect x={16 + i * 36} y={33} width={8} height={7} rx="2" fill={color} fillOpacity="0.2" />
          <rect x={16 + i * 36} y={60} width={8} height={7} rx="2" fill={color} fillOpacity="0.2" />
        </g>
      ))}

      {/* Pipeline steps */}
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={30 + i * 46} y={38} width={36} height={24} rx="4"
            fill={color} fillOpacity={done[i] ? 0.18 : 0.06}
            stroke={done[i] ? color : color} strokeOpacity={done[i] ? 0.55 : 0.2} strokeWidth={done[i] ? 1 : 0.5} />
          {done[i] && <text x={48 + i * 46} y={48} textAnchor="middle" fill={color} fontSize="9" opacity="0.7">✓</text>}
          <text x={48 + i * 46} y={58} textAnchor="middle" fill={color} fontSize="6" opacity={done[i] ? 0.8 : 0.4}>{s}</text>
        </g>
      ))}

      {/* Progress indicator */}
      <rect x={8} y={80} width={254} height={4} rx="2" fill={color} fillOpacity="0.1" />
      <rect x={8} y={80} width={145} height={4} rx="2" fill={color} fillOpacity="0.55" />
      <text x={160} y={84} fill={color} fontSize="6.5" opacity="0.6">3/5 steps</text>

      {/* Waveform */}
      {[...Array(22)].map((_, i) => {
        const h = 3 + Math.abs(Math.sin(i * 1.1) * 5 + Math.sin(i * 0.4) * 3)
        return <rect key={i} x={12 + i * 11} y={17 - h / 2} width={7} height={h} rx="2"
          fill={color} fillOpacity={i < 14 ? 0.35 : 0.12} />
      })}
      <text x={8} y={27} fill={color} fontSize="6" opacity="0.45">suno_track.mp3</text>
    </svg>
  )
}

/* ─── 5. CRM ─────────────────────────────────────────────────────────── */

function CRMVisual({ color }: { color: string }) {
  const cols = [
    { label: 'Lead', count: 12, cards: ['Cty ABC', 'Anh Minh', 'Bà Lan'] },
    { label: 'Qualified', count: 7, cards: ['Tập đoàn X', 'Startup Y'] },
    { label: 'Proposal', count: 4, cards: ['Cty DEF'] },
    { label: 'Won ✓', count: 3, cards: [], won: true },
  ]

  return (
    <svg width="270" height="100" viewBox="0 0 270 100">
      {cols.map((col, ci) => (
        <g key={ci}>
          {/* Column header */}
          <rect x={8 + ci * 65} y={6} width={60} height={13} rx="5"
            fill={col.won ? '#10b981' : color} fillOpacity={col.won ? 0.2 : 0.12} />
          <text x={38 + ci * 65} y={16} textAnchor="middle"
            fill={col.won ? '#10b981' : color} fontSize="6.5" fontWeight="600" opacity="0.85">
            {col.label}
          </text>
          <text x={62 + ci * 65} y={16} fill={col.won ? '#10b981' : color} fontSize="5.5" opacity="0.55">{col.count}</text>

          {/* Deal cards */}
          {col.cards.map((card, cdi) => (
            <g key={cdi}>
              <rect x={8 + ci * 65} y={24 + cdi * 22} width={60} height={17} rx="4"
                fill={color} fillOpacity={0.07 + cdi * 0.02}
                stroke={color} strokeOpacity="0.15" strokeWidth="0.5" />
              <circle cx={16 + ci * 65} cy={32.5 + cdi * 22} r="3.5" fill={color} fillOpacity="0.3" />
              <text x={22 + ci * 65} y={35.5 + cdi * 22} fill={color} fontSize="6" opacity="0.7">{card}</text>
              <Pill x={8 + ci * 65} y={37 + cdi * 22} w={30} h={4} color={color} opacity={0.15} />
            </g>
          ))}

          {/* Won column - big number */}
          {col.won && (
            <g>
              <text x={38 + ci * 65} y={55} textAnchor="middle" fill="#10b981" fontSize="20" fontWeight="700" opacity="0.3">3</text>
              <text x={38 + ci * 65} y={66} textAnchor="middle" fill="#10b981" fontSize="6.5" opacity="0.6">deals won</text>
              <text x={38 + ci * 65} y={80} textAnchor="middle" fill="#10b981" fontSize="7" opacity="0.5">67% WR</text>
            </g>
          )}
        </g>
      ))}

      {/* Bottom stats bar */}
      <rect x={8} y={88} width={254} height={8} rx="3" fill={color} fillOpacity="0.05" />
      <text x={14} y={95} fill={color} fontSize="6" opacity="0.4">Pipeline: 890M VND</text>
      <text x={175} y={95} fill="#10b981" fontSize="6" opacity="0.6">↑ 23% vs last week</text>
    </svg>
  )
}

/* ─── 6. Report (Hubspot Auto) ───────────────────────────────────────── */

function ReportVisual({ color }: { color: string }) {
  const bars = [42, 68, 53, 81, 59, 94, 71]
  const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

  return (
    <svg width="270" height="100" viewBox="0 0 270 100">
      {/* Email card */}
      <UICard x={8} y={6} w={154} h={88} color={color} opacity={0.06} />
      <rect x={8} y={6} width={154} height={14} rx="5" fill={color} fillOpacity="0.12" />
      <text x={14} y={16} fill={color} fontSize="6.5" opacity="0.7">📊 Weekly HubSpot Report</text>

      {/* Bar chart inside card */}
      {bars.map((v, i) => (
        <g key={i}>
          <rect x={20 + i * 19} y={82 - v * 0.52} width={13} height={v * 0.52} rx="3"
            fill={color} fillOpacity={i === 5 ? 0.65 : 0.2 + i * 0.04} />
          <text x={26 + i * 19} y={90} textAnchor="middle" fill={color} fontSize="5.5" opacity="0.4">{days[i]}</text>
        </g>
      ))}

      {/* Metrics on right side of card */}
      {[['48', 'Deals'], ['$320M', 'Pipeline'], ['67%', 'Win rate']].map(([v, l], i) => (
        <g key={i}>
          <text x={118} y={35 + i * 20} fill={color} fontSize="10" fontWeight="700" opacity="0.75">{v}</text>
          <text x={118} y={43 + i * 20} fill={color} fontSize="6" opacity="0.4">{l}</text>
          {i < 2 && <line x1={118} y1={47 + i * 20} x2={152} y2={47 + i * 20} stroke={color} strokeOpacity="0.1" strokeWidth="0.5" />}
        </g>
      ))}

      {/* Right side: email send indicator */}
      <UICard x={168} y={6} w={94} h={88} color={color} opacity={0.07} />
      <rect x={168} y={6} width={94} height={14} rx="5" fill={color} fillOpacity="0.12" />
      <text x={215} y={16} textAnchor="middle" fill={color} fontSize="6.5" opacity="0.7">Auto-send</text>

      {/* Cron schedule display */}
      <rect x={175} y={25} width={80} height={10} rx="4" fill={color} fillOpacity="0.1" />
      <text x={215} y={33} textAnchor="middle" fill={color} fontSize="6.5" opacity="0.65">Mon 08:00 every week</text>

      {/* Recipients */}
      {['CEO', 'Marketing', 'Sales'].map((r, i) => (
        <g key={i}>
          <circle cx={183} cy={48 + i * 13} r="5" fill={color} fillOpacity="0.2" />
          <text x={183} y={51.5 + i * 13} textAnchor="middle" fill={color} fontSize="5" opacity="0.7">{r[0]}</text>
          <Pill x={192} y={44 + i * 13} w={48} h={8} color={color} opacity={0.08} />
          <text x={195} y={50 + i * 13} fill={color} fontSize="6" opacity="0.5">{r}</text>
        </g>
      ))}

      <rect x={175} y={83} width={80} height={9} rx="4" fill="#10b981" fillOpacity="0.18" />
      <text x={215} y={90} textAnchor="middle" fill="#10b981" fontSize="6.5" opacity="0.8">✓ Sent 2 minutes ago</text>
    </svg>
  )
}

/* ─── 7. Desktop (ArcSo) ─────────────────────────────────────────────── */

function DesktopVisual({ color }: { color: string }) {
  const accounts = [
    { name: 'Page Chính', platform: 'FB', status: 'green' },
    { name: 'Shop ABC', platform: 'FB', status: 'green' },
    { name: 'Gmail Work', platform: 'GM', status: 'green' },
    { name: 'Test Acc', platform: 'FB', status: 'yellow' },
  ]

  return (
    <svg width="270" height="100" viewBox="0 0 270 100">
      <WindowChrome color={color} x={8} y={5} w={254} h={90} />

      {/* URL bar */}
      <rect x={48} y={9} width={170} height={9} rx="4" fill={color} fillOpacity="0.1" />
      <text x={133} y={16} textAnchor="middle" fill={color} fontSize="5.5" opacity="0.4">ArcSo — Multi-Account Manager</text>

      {/* Left sidebar */}
      <rect x={8} y={23} width={60} height={72} fill={color} fillOpacity="0.07" />
      {['All Accs', 'Facebook', 'Gmail', 'Settings'].map((t, i) => (
        <g key={i}>
          <rect x={11} y={27 + i * 15} width={54} height={11} rx="4"
            fill={color} fillOpacity={i === 0 ? 0.3 : 0.06} />
          <text x={38} y={35.5 + i * 15} textAnchor="middle" fill={color} fontSize="6.5" opacity={i === 0 ? 0.9 : 0.45}>{t}</text>
        </g>
      ))}

      {/* Account list */}
      {accounts.map((acc, i) => (
        <g key={i}>
          <rect x={74} y={25 + i * 17} width={182} height={13} rx="4"
            fill={color} fillOpacity={0.06 + i * 0.015}
            stroke={color} strokeOpacity="0.12" strokeWidth="0.5" />
          {/* Avatar */}
          <circle cx={84} cy={31.5 + i * 17} r="5" fill={color} fillOpacity="0.2" />
          <text x={84} y={34.5 + i * 17} textAnchor="middle" fill={color} fontSize="5" fontWeight="700" opacity="0.8">{acc.platform}</text>
          <text x={93} y={34.5 + i * 17} fill={color} fontSize="6.5" opacity="0.75">{acc.name}</text>
          <StatusDot x={244} y={31.5 + i * 17} status={acc.status} />
          {/* Session indicator */}
          <Pill x={175} y={28 + i * 17} w={36} h={7} color={color} opacity={0.1} />
          <text x={177} y={33.5 + i * 17} fill={color} fontSize="5.5" opacity="0.5">Container #{i + 1}</text>
        </g>
      ))}

      {/* Bottom bar */}
      <rect x={74} y={90} width={182} height={5} fill={color} fillOpacity="0.06" />
      <text x={80} y={94} fill={color} fontSize="5.5" opacity="0.4">4 active · Last backup: 2h ago</text>
    </svg>
  )
}

/* ─── 8. Extension ───────────────────────────────────────────────────── */

function ExtensionVisual({ color }: { color: string }) {
  return (
    <svg width="270" height="100" viewBox="0 0 270 100">
      {/* Browser window */}
      <WindowChrome color={color} x={8} y={5} w={254} h={90} />

      {/* URL bar */}
      <rect x={50} y={9.5} width={160} height={8} rx="4" fill={color} fillOpacity="0.1" />
      <text x={130} y={16} textAnchor="middle" fill={color} fontSize="5.5" opacity="0.35">facebook.com/ads/manager</text>

      {/* Page content (blurred background) */}
      {[0, 1, 2].map(i => (
        <rect key={i} x={14} y={28 + i * 18} width={160} height={13} rx="3" fill={color} fillOpacity={0.04 + i * 0.01} />
      ))}
      {[0, 1, 2].map(i => (
        <rect key={i} x={14} y={32 + i * 18} width={80 + i * 20} height={5} rx="2" fill={color} fillOpacity="0.08" />
      ))}

      {/* Extension popup panel */}
      <rect x={162} y={24} width={94} height={70} rx="6" fill="#0c0c14" stroke={color} strokeOpacity="0.4" strokeWidth="0.8" />
      {/* Popup header */}
      <rect x={162} y={24} width={94} height={16} rx="6" fill={color} fillOpacity="0.18" />
      <text x={209} y={35} textAnchor="middle" fill={color} fontSize="7" fontWeight="600" opacity="0.9">AI Assistant</text>

      {/* Chat message */}
      <rect x={167} y={45} width={70} height={14} rx="4" fill={color} fillOpacity="0.12" />
      <text x={170} y={52} fill={color} fontSize="5.5" opacity="0.65">Tóm tắt trang này</text>
      <text x={170} y={58} fill={color} fontSize="5" opacity="0.4">cho tôi...</text>

      {/* Response */}
      <rect x={167} y={63} width={84} height={18} rx="4" fill={color} fillOpacity="0.07" />
      <Pill x={170} y={66} w={72} h={4.5} color={color} opacity={0.15} />
      <Pill x={170} y={73} w={60} h={4.5} color={color} opacity={0.1} />

      {/* Input box */}
      <rect x={167} y={85} width={64} height={8} rx="3" fill={color} fillOpacity="0.1" stroke={color} strokeOpacity="0.25" strokeWidth="0.5" />
      <rect x={234} y={85} width={18} height={8} rx="3" fill={color} fillOpacity="0.35" />
      <text x={243} y={91} textAnchor="middle" fill={color} fontSize="6" opacity="0.8">↑</text>

      {/* Toolbar badge */}
      <circle cx={228} cy={13} r="5.5" fill={color} fillOpacity="0.25" stroke={color} strokeOpacity="0.5" strokeWidth="0.8" />
      <text x={228} y={17} textAnchor="middle" fill={color} fontSize="7" fontWeight="700" opacity="0.9">A</text>
    </svg>
  )
}

/* ─── 9. DMS ─────────────────────────────────────────────────────────── */

function DMSVisual({ color }: { color: string }) {
  const docs = [
    { name: 'HĐ Dịch vụ Q1.pdf', tag: 'Hợp đồng', status: 'Đã duyệt', ok: true, exp: '31/03' },
    { name: 'Báo cáo tháng 4.xlsx', tag: 'Báo cáo', status: 'Chờ duyệt', ok: false, exp: '—' },
    { name: 'Giấy phép KD 2025', tag: 'Pháp lý', status: 'Đã duyệt', ok: true, exp: '01/07' },
  ]

  return (
    <svg width="270" height="100" viewBox="0 0 270 100">
      {/* Left nav */}
      <UICard x={8} y={6} w={52} h={88} color={color} opacity={0.06} />
      {['📁 Tất cả', '📋 Chờ duyệt', '✅ Đã duyệt', '⏰ Sắp HH'].map((t, i) => (
        <g key={i}>
          <rect x={10} y={10 + i * 18} width={48} height={12} rx="4"
            fill={color} fillOpacity={i === 0 ? 0.28 : 0.06} />
          <text x={34} y={19 + i * 18} textAnchor="middle" fill={color} fontSize="6" opacity={i === 0 ? 0.9 : 0.5}>{t}</text>
        </g>
      ))}

      {/* Search bar */}
      <rect x={66} y={6} width={196} height={12} rx="5" fill={color} fillOpacity="0.08" stroke={color} strokeOpacity="0.2" strokeWidth="0.5" />
      <text x={72} y={15} fill={color} fontSize="6.5" opacity="0.35">🔍  Tìm hồ sơ...</text>

      {/* Table header */}
      <rect x={66} y={22} width={196} height={10} rx="4" fill={color} fillOpacity="0.1" />
      {['Tên tài liệu', 'Loại', 'Trạng thái', 'HH'].map((h, i) => (
        <text key={i} x={[70, 148, 186, 248][i]} y={30} fill={color} fontSize="5.5" fontWeight="600" opacity="0.5">{h}</text>
      ))}

      {/* Rows */}
      {docs.map((d, i) => (
        <g key={i}>
          <rect x={66} y={35 + i * 18} width={196} height={14} rx="4"
            fill={color} fillOpacity={0.05 + i * 0.01}
            stroke={color} strokeOpacity="0.1" strokeWidth="0.4" />
          <text x={70} y={44 + i * 18} fill={color} fontSize="6" opacity="0.75">{d.name}</text>
          <rect x={145} y={37 + i * 18} width={30} height={9} rx="4" fill={color} fillOpacity="0.15" />
          <text x={160} y={43.5 + i * 18} textAnchor="middle" fill={color} fontSize="5.5" opacity="0.65">{d.tag}</text>
          <StatusDot x={195} y={42 + i * 18} status={d.ok ? 'green' : 'yellow'} />
          <text x={202} y={44.5 + i * 18} fill={d.ok ? '#10b981' : '#f59e0b'} fontSize="5.5" opacity="0.8">{d.status}</text>
          <text x={248} y={44.5 + i * 18} fill={color} fontSize="6" opacity="0.45">{d.exp}</text>
        </g>
      ))}

      {/* AI tag indicator */}
      <rect x={66} y={90} width={196} height={5} fill={color} fillOpacity="0.04" />
      <text x={70} y={94} fill={color} fontSize="5.5" opacity="0.35">✨ Gemini AI auto-tagged 3 docs</text>
    </svg>
  )
}

/* ─── 10. Transcript (VideoKL) ──────────────────────────────────────── */

function TranscriptVisual({ color }: { color: string }) {
  const lines = [
    { t: '00:00:12', text: 'Chào mừng các bạn đến với buổi họp...', conf: 98 },
    { t: '00:00:28', text: 'Hôm nay chúng ta sẽ thảo luận về...', conf: 96 },
    { t: '00:01:05', text: 'Kết quả quý 1 tốt hơn dự kiến 23%...', conf: 99 },
  ]

  // Waveform data
  const wave = [3, 8, 14, 22, 18, 26, 19, 12, 24, 28, 22, 16, 30, 24, 18, 12, 22, 28, 20, 14, 8, 4, 10, 16, 22, 18, 12, 6]

  return (
    <svg width="270" height="100" viewBox="0 0 270 100">
      {/* Left: audio waveform panel */}
      <UICard x={8} y={6} w={86} h={88} color={color} opacity={0.07} />
      <text x={51} y={17} textAnchor="middle" fill={color} fontSize="6.5" opacity="0.6">Audio Input</text>

      {/* Waveform */}
      {wave.map((h, i) => (
        <rect key={i} x={12 + i * 3} y={50 - h / 2} width={2} height={h} rx="1"
          fill={color} fillOpacity={i < 18 ? 0.55 : 0.2} />
      ))}
      {/* Playhead */}
      <line x1={66} y1={25} x2={66} y2={75} stroke={color} strokeWidth="1" strokeOpacity="0.7" />
      <circle cx={66} cy={50} r="3" fill={color} fillOpacity="0.8" />

      {/* Time display */}
      <text x={51} y={85} textAnchor="middle" fill={color} fontSize="7.5" fontWeight="600" opacity="0.7">01:45 / 03:20</text>

      {/* Processing badge */}
      <rect x={14} y={22} width={60} height={10} rx="4" fill={color} fillOpacity="0.15" />
      <text x={44} y={29} textAnchor="middle" fill={color} fontSize="5.5" opacity="0.75">⚡ Whisper large-v3</text>

      {/* Right: transcript panel */}
      <UICard x={100} y={6} w={162} h={88} color={color} opacity={0.06} />
      <text x={181} y={17} textAnchor="middle" fill={color} fontSize="6.5" opacity="0.6">Transcript</text>

      {lines.map((l, i) => (
        <g key={i}>
          {/* Timestamp pill */}
          <rect x={104} y={22 + i * 22} width={34} height={8} rx="3" fill={color} fillOpacity="0.18" />
          <text x={121} y={28.5 + i * 22} textAnchor="middle" fill={color} fontSize="5.5" fontWeight="600" opacity="0.8">{l.t}</text>
          {/* Text */}
          <text x={142} y={28.5 + i * 22} fill={color} fontSize="6" opacity="0.7">{l.text}</text>
          {/* Confidence */}
          <rect x={242} y={22 + i * 22} width={16} height={8} rx="3" fill="#10b981" fillOpacity="0.15" />
          <text x={250} y={28.5 + i * 22} textAnchor="middle" fill="#10b981" fontSize="5.5" opacity="0.7">{l.conf}%</text>
        </g>
      ))}

      {/* Export options */}
      <rect x={104} y={90} width={154} height={4} rx="2" fill={color} fillOpacity="0.04" />
      {['JSON', 'SRT', 'TXT'].map((fmt, i) => (
        <g key={i}>
          <rect x={104 + i * 40} y={82} width={34} height={8} rx="3" fill={color} fillOpacity={i === 0 ? 0.3 : 0.1} />
          <text x={121 + i * 40} y={88.5} textAnchor="middle" fill={color} fontSize="5.5" opacity={i === 0 ? 0.9 : 0.5}>{fmt}</text>
        </g>
      ))}
    </svg>
  )
}

/* ─── 11. Ads Portal ─────────────────────────────────────────────────── */

function AdsVisual({ color }: { color: string }) {
  const accounts = [
    { name: 'Shop Thời Trang', spend: '2.4M', roas: '4.2×', status: 'green' },
    { name: 'Khóa học Online', spend: '1.8M', roas: '3.8×', status: 'green' },
    { name: 'Food Delivery', spend: '3.1M', roas: '2.1×', status: 'yellow' },
  ]
  const chartH = [40, 55, 48, 62, 58, 70, 65]

  return (
    <svg width="270" height="100" viewBox="0 0 270 100">
      {/* Left: account list */}
      <UICard x={8} y={6} w={108} h={88} color={color} opacity={0.06} />
      <rect x={8} y={6} width={108} height={14} rx="5" fill={color} fillOpacity="0.12" />
      <text x={62} y={16} textAnchor="middle" fill={color} fontSize="6.5" fontWeight="600" opacity="0.8">Ad Accounts</text>

      {accounts.map((acc, i) => (
        <g key={i}>
          <rect x={11} y={24 + i * 22} width={102} height={18} rx="4"
            fill={color} fillOpacity={0.06 + i * 0.02}
            stroke={color} strokeOpacity="0.12" strokeWidth="0.5" />
          <StatusDot x={19} y={33 + i * 22} status={acc.status} />
          <text x={26} y={35 + i * 22} fill={color} fontSize="6" opacity="0.8">{acc.name}</text>
          <text x={14} y={39.5 + i * 22} fill={color} fontSize="5.5" opacity="0.4">Spend: {acc.spend}</text>
          <text x={68} y={39.5 + i * 22} fill="#10b981" fontSize="5.5" opacity="0.7">ROAS {acc.roas}</text>
        </g>
      ))}

      {/* Totals */}
      <rect x={11} y={88} width={102} height={5} rx="2" fill={color} fillOpacity="0.05" />
      <text x={14} y={92} fill={color} fontSize="5.5" opacity="0.4">Total: 7.3M VND / 3 accs</text>

      {/* Right: chart + token */}
      <UICard x={122} y={6} w={140} h={55} color={color} opacity={0.07} />
      <text x={192} y={17} textAnchor="middle" fill={color} fontSize="6.5" opacity="0.6">Spend (7 ngày)</text>

      {chartH.map((h, i) => (
        <g key={i}>
          <rect x={128 + i * 18} y={55 - h * 0.5} width={13} height={h * 0.5} rx="3"
            fill={color} fillOpacity={i === 5 ? 0.65 : 0.22} />
          <text x={134 + i * 18} y={60} textAnchor="middle" fill={color} fontSize="5" opacity="0.35">
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][i]}
          </text>
        </g>
      ))}

      {/* Token status */}
      <UICard x={122} y={66} w={140} h={28} color={color} opacity={0.07} />
      <text x={128} y={76} fill={color} fontSize="6.5" opacity="0.7">🔑 Token Status</text>
      <StatusDot x={132} y={86} status="green" />
      <text x={140} y={89} fill="#10b981" fontSize="6" opacity="0.75">Auto-refreshed · 58 ngày còn lại</text>

      {/* Alert badge */}
      <rect x={175} y={73} width={82} height={9} rx="4" fill="#f59e0b" fillOpacity="0.15" />
      <text x={216} y={79.5} textAnchor="middle" fill="#f59e0b" fontSize="5.5" opacity="0.8">⚠ Food: budget 20% còn</text>
    </svg>
  )
}
