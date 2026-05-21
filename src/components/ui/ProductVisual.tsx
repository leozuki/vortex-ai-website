'use client'

import type { VisualType } from '@/types'

interface ProductVisualProps {
  type: VisualType
  color: string
  large?: boolean
}

export function ProductVisual({ type, color, large }: ProductVisualProps) {
  const height = large ? 'h-72 md:h-80' : 'h-44'

  return (
    <div className={`relative w-full overflow-hidden ${height}`}
      style={{ background: `linear-gradient(160deg, #0d0d18 0%, #0a0a14 100%)` }}>

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${color}18 0%, transparent 70%)` }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }} />

      {/* 3D floating card */}
      <div className="absolute inset-0 flex items-center justify-center"
        style={{ padding: large ? '16px 20px' : '12px 14px' }}>
        <div
          className="relative w-full h-full"
          style={{
            transform: 'perspective(900px) rotateX(6deg) rotateY(-4deg) rotateZ(-0.5deg)',
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
          }}
        >
          {/* Glow beneath */}
          <div className="absolute -bottom-3 left-4 right-4 h-4 rounded-full blur-xl pointer-events-none"
            style={{ background: `${color}35` }} />

          {/* The actual SVG mockup */}
          <div className="relative w-full h-full rounded-xl overflow-hidden"
            style={{
              background: 'rgba(12,12,22,0.95)',
              border: `1px solid ${color}25`,
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px ${color}10`,
            }}>
            <svg
              width="100%" height="100%"
              viewBox="0 0 260 90"
              preserveAspectRatio="xMidYMid meet"
            >
              {type === 'agents'    && <AgentsVisual    color={color} />}
              {type === 'data'      && <DataVisual      color={color} />}
              {type === 'monitor'   && <MonitorVisual   color={color} />}
              {type === 'creative'  && <CreativeVisual  color={color} />}
              {type === 'crm'       && <CRMVisual       color={color} />}
              {type === 'report'    && <ReportVisual    color={color} />}
              {type === 'desktop'   && <DesktopVisual   color={color} />}
              {type === 'extension' && <ExtensionVisual color={color} />}
              {type === 'dms'       && <DMSVisual       color={color} />}
              {type === 'transcript'&& <TranscriptVisual color={color} />}
              {type === 'ads'       && <AdsVisual       color={color} />}
            </svg>
          </div>
        </div>
      </div>

      {/* Top reflection sheen */}
      <div className="absolute top-0 left-0 right-0 h-12 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.03) 0%, transparent 100%)' }} />
    </div>
  )
}

/* ─── Tiny shared primitives (no emoji, pure SVG) ─── */

function Bar({ x, y, w, h, color, op = 0.6 }: { x: number; y: number; w: number; h: number; color: string; op?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx="2" fill={color} fillOpacity={op} />
}

function Row({ x, y, w, h = 6, color, op = 0.12 }: { x: number; y: number; w: number; h?: number; color: string; op?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={3} fill={color} fillOpacity={op} />
}

function Dot({ x, y, c }: { x: number; y: number; c: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={3.5} fill={c} fillOpacity="0.15" />
      <circle cx={x} cy={y} r={2}   fill={c} fillOpacity="0.9" />
    </g>
  )
}

function TitleBar({ x = 0, y = 0, w = 260, h = 18, color }: { x?: number; y?: number; w?: number; h?: number; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6"
        fill={color} fillOpacity="0.1" stroke={color} strokeOpacity="0.2" strokeWidth="0.6" />
      <circle cx={x + 10} cy={y + h/2} r="2.5" fill="#ef4444" fillOpacity="0.8" />
      <circle cx={x + 18} cy={y + h/2} r="2.5" fill="#f59e0b" fillOpacity="0.8" />
      <circle cx={x + 26} cy={y + h/2} r="2.5" fill="#10b981" fillOpacity="0.8" />
    </g>
  )
}

function Card({ x, y, w, h, color, op = 0.08, glow = false }: { x: number; y: number; w: number; h: number; color: string; op?: number; glow?: boolean }) {
  return (
    <g>
      {glow && <rect x={x-1} y={y-1} width={w+2} height={h+2} rx="6" fill={color} fillOpacity="0.08" />}
      <rect x={x} y={y} width={w} height={h} rx="5"
        fill={color} fillOpacity={op}
        stroke={color} strokeOpacity={glow ? 0.4 : 0.15} strokeWidth="0.7" />
    </g>
  )
}

/* ─── 1. Agents — neural workflow graph ─── */
function AgentsVisual({ color }: { color: string }) {
  const nodes = [
    { x: 22,  y: 45, r: 10, c: color,     label: 'Input' },
    { x: 75,  y: 22, r: 7,  c: '#06b6d4', label: 'Plan' },
    { x: 75,  y: 58, r: 7,  c: '#8b5cf6', label: 'Exec' },
    { x: 140, y: 22, r: 7,  c: '#10b981', label: 'W1' },
    { x: 140, y: 45, r: 7,  c: '#10b981', label: 'W2' },
    { x: 140, y: 68, r: 7,  c: '#10b981', label: 'W3' },
    { x: 198, y: 45, r: 9,  c: color,     label: 'Review' },
    { x: 240, y: 45, r: 8,  c: '#10b981', label: 'Done', done: true },
  ]
  const edges: [number, number, number, number, string][] = [
    [22, 45, 75, 22, color],
    [22, 45, 75, 58, color],
    [75, 22, 140, 22, '#06b6d4'],
    [75, 22, 140, 45, '#06b6d4'],
    [75, 58, 140, 45, '#8b5cf6'],
    [75, 58, 140, 68, '#8b5cf6'],
    [140, 22, 198, 45, '#10b981'],
    [140, 45, 198, 45, '#10b981'],
    [140, 68, 198, 45, '#10b981'],
    [198, 45, 240, 45, color],
  ]
  return (
    <g>
      {/* Background label */}
      <text x="4" y="9" fill={color} fontSize="5.5" opacity="0.3" fontWeight="600">MULTI-AGENT WORKFLOW</text>
      {edges.map(([x1,y1,x2,y2,c],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={c} strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 2" />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r + 5} fill={n.c} fillOpacity="0.06" />
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} fillOpacity={n.done ? 0.3 : 0.15} stroke={n.c} strokeWidth="1" strokeOpacity="0.7" />
          <circle cx={n.x} cy={n.y} r={n.r * 0.38} fill={n.c} />
          <text x={n.x} y={n.y + n.r + 7} textAnchor="middle" fill={n.c} fontSize="5.5" opacity="0.6">{n.label}</text>
        </g>
      ))}
      {/* Progress bar */}
      <Row x={4} y={82} w={252} h={4} color={color} op={0.08} />
      <Bar x={4} y={82} w={195} h={4} color={color} op={0.5} />
      <text x="6" y="88" fill={color} fontSize="4.5" opacity="0.4">Progress</text>
      <text x="202" y="88" fill={color} fontSize="4.5" opacity="0.5">78%</text>
    </g>
  )
}

/* ─── 2. Data Pipeline — 3 stage funnel ─── */
function DataVisual({ color }: { color: string }) {
  const stages = [
    { label: 'Collect', sublabel: '1.4M rows', bars: [0.9, 0.7, 0.55, 0.8], c: '#94a3b8' },
    { label: 'Enrich',  sublabel: '+FB/GG',    bars: [0.8, 0.9, 0.6, 0.85], c: color },
    { label: 'Score',   sublabel: 'AI ranked',  bars: [0.95, 0.85, 0.45, 0.78], c: '#10b981' },
  ]
  return (
    <g>
      <text x="4" y="9" fill={color} fontSize="5.5" opacity="0.3" fontWeight="600">DATA PIPELINE · AI SCORING</text>
      {stages.map((st, si) => (
        <g key={si}>
          <Card x={8 + si * 84} y={12} w={76} h={68} color={st.c} op={0.07} />
          {/* Header */}
          <rect x={8 + si * 84} y={12} width={76} height={14} rx="5" fill={st.c} fillOpacity="0.18" />
          <text x={46 + si * 84} y={22} textAnchor="middle" fill={st.c} fontSize="7" fontWeight="700" opacity="0.9">{st.label}</text>
          <text x={46 + si * 84} y={31} textAnchor="middle" fill={st.c} fontSize="5.5" opacity="0.5">{st.sublabel}</text>
          {/* Data bars */}
          {st.bars.map((p, bi) => (
            <g key={bi}>
              <Row x={12 + si * 84} y={36 + bi * 10} w={68} color={st.c} op={0.07} />
              <Bar x={12 + si * 84} y={36 + bi * 10} w={68 * p} h={6} color={st.c} op={0.45} />
            </g>
          ))}
          {/* Arrow to next */}
          {si < 2 && (
            <g>
              <path d={`M${84 + si * 84},46 L${92 + si * 84},46`} stroke={st.c} strokeWidth="1.5" strokeOpacity="0.5" />
              <polygon points={`${90 + si * 84},43 ${94 + si * 84},46 ${90 + si * 84},49`} fill={st.c} fillOpacity="0.6" />
            </g>
          )}
        </g>
      ))}
      {/* Score output dots */}
      {[{ s: 92, c: '#10b981' }, { s: 87, c: '#10b981' }, { s: 42, c: '#f59e0b' }, { s: 31, c: '#ef4444' }].map((d, i) => (
        <g key={i}>
          <circle cx={252} cy={22 + i * 14} r={6} fill={d.c} fillOpacity={d.s > 60 ? 0.2 : 0.1} stroke={d.c} strokeWidth="0.8" strokeOpacity="0.5" />
          <text x={252} y={26 + i * 14} textAnchor="middle" fill={d.c} fontSize="5.5" fontWeight="700" opacity="0.85">{d.s}</text>
        </g>
      ))}
    </g>
  )
}

/* ─── 3. Monitor / Web Fleet ─── */
function MonitorVisual({ color }: { color: string }) {
  const sites = [
    { name: 'shop.vn',  up: '99.8%', ms: '142ms', ok: true  },
    { name: 'api.vn',   up: '100%',  ms: ' 88ms', ok: true  },
    { name: 'blog.vn',  up: '97.2%', ms: '310ms', ok: false },
  ]
  const spark = [88,92,85,94,90,97,99,96,100,98,100]
  return (
    <g>
      <TitleBar color={color} />
      {/* Sidebar */}
      <rect x={0} y={18} width={52} height={72} fill={color} fillOpacity="0.05" />
      {['Overview','Sites','Alerts','SSL'].map((t, i) => (
        <g key={i}>
          <rect x={3} y={22 + i*14} width={46} height={10} rx="4"
            fill={color} fillOpacity={i===1 ? 0.28 : 0.07} />
          <text x={26} y={30+i*14} textAnchor="middle" fill={color} fontSize="6" opacity={i===1 ? 0.9 : 0.4}>{t}</text>
        </g>
      ))}
      {/* Header row */}
      <rect x={56} y={20} width={200} height={10} rx="3" fill={color} fillOpacity="0.1" />
      {['Site','Uptime','Response','Trend'].map((h, i) => (
        <text key={i} x={[60,110,152,198][i]} y={28} fill={color} fontSize="5.5" fontWeight="600" opacity="0.45">{h}</text>
      ))}
      {/* Rows */}
      {sites.map((s, i) => (
        <g key={i}>
          <rect x={56} y={34+i*17} width={200} height={13} rx="4"
            fill={color} fillOpacity={i===2 ? 0.1 : 0.06}
            stroke={i===2 ? '#ef4444' : color} strokeOpacity={i===2?0.3:0.1} strokeWidth="0.6" />
          <Dot x={62} y={40+i*17} c={s.ok ? '#10b981' : '#f59e0b'} />
          <text x={70} y={43+i*17} fill={color} fontSize="6.5" opacity="0.8">{s.name}</text>
          <text x={112} y={43+i*17} fill={s.ok?'#10b981':'#f59e0b'} fontSize="6.5" opacity="0.9">{s.up}</text>
          <text x={152} y={43+i*17} fill={color} fontSize="6" opacity="0.5">{s.ms}</text>
          <polyline
            points={spark.slice(0,8).map((v,j)=>`${195+j*4},${45+i*17 - v*0.05}`).join(' ')}
            fill="none" stroke={s.ok?'#10b981':'#f59e0b'} strokeWidth="1.2" strokeOpacity="0.7" strokeLinejoin="round"
          />
        </g>
      ))}
      {/* Alert */}
      <rect x={56} y={87} width={200} height={0} fill="none" />
      <rect x={140} y={82} width={116} height={8} rx="3" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeOpacity="0.25" strokeWidth="0.5" />
      <rect x={143} y={84.5} width={4} height={3} rx="0.5" fill="#ef4444" fillOpacity="0.8" />
      <text x={150} y={88.5} fill="#ef4444" fontSize="5.5" opacity="0.8">blog.vn response too slow</text>
    </g>
  )
}

/* ─── 4. Creative / TaoMeetsTrap ─── */
function CreativeVisual({ color }: { color: string }) {
  const wave = [3,6,9,14,10,16,20,14,22,26,18,22,28,20,16,12,18,24,16,10,6,4,8,14]
  const steps = [
    { label: 'Lyrics',  done: true,  c: color    },
    { label: 'Music',   done: true,  c: '#a78bfa' },
    { label: 'Visual',  done: true,  c: '#ec4899' },
    { label: 'Render',  done: false, c: color     },
    { label: 'Upload',  done: false, c: color     },
  ]
  return (
    <g>
      <text x="4" y="9" fill={color} fontSize="5.5" opacity="0.3" fontWeight="600">AI VIDEO GENERATION · PIPELINE</text>
      {/* Waveform strip */}
      <rect x={0} y={12} width={260} height={28} rx="4" fill={color} fillOpacity="0.05" />
      {wave.map((h, i) => (
        <rect key={i} x={6 + i * 10} y={26 - h/2} width={7} height={h} rx="2"
          fill={color} fillOpacity={i < 14 ? 0.6 : 0.2} />
      ))}
      {/* Playhead */}
      <line x1={144} y1={13} x2={144} y2={39} stroke={color} strokeWidth="1.5" strokeOpacity="0.8" />
      <circle cx={144} cy={26} r="3" fill={color} />
      {/* Time */}
      <text x={150} y={21} fill={color} fontSize="5.5" opacity="0.6">01:24 / 03:18</text>
      {/* Pipeline steps */}
      {steps.map((st, i) => (
        <g key={i}>
          <rect x={8 + i*50} y={45} width={44} height={28} rx="5"
            fill={st.done ? st.c : color} fillOpacity={st.done ? 0.15 : 0.06}
            stroke={st.done ? st.c : color} strokeOpacity={st.done ? 0.5 : 0.15} strokeWidth="0.8" />
          {/* Check mark if done */}
          {st.done && (
            <polyline points={`${18+i*50},59 ${22+i*50},63 ${32+i*50},53`}
              stroke={st.c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          )}
          {/* Dots if not done */}
          {!st.done && (
            <g>
              <circle cx={22+i*50} cy={59} r="2" fill={color} fillOpacity="0.3" />
              <circle cx={30+i*50} cy={59} r="2" fill={color} fillOpacity="0.3" />
            </g>
          )}
          <text x={30+i*50} y={74} textAnchor="middle" fill={st.done?st.c:color} fontSize="5.5" opacity={st.done?0.8:0.3}>{st.label}</text>
        </g>
      ))}
      {/* Progress */}
      <Row x={0} y={82} w={260} h={5} color={color} op={0.08} />
      <Bar x={0} y={82} w={156} h={5} color={color} op={0.5} />
      <text x="3" y="88" fill={color} fontSize="4.5" opacity="0.4">3 of 5 complete</text>
      <text x="200" y="88" fill={color} fontSize="4.5" opacity="0.5">60%</text>
    </g>
  )
}

/* ─── 5. CRM Kanban ─── */
function CRMVisual({ color }: { color: string }) {
  const cols = [
    { label: 'Lead',     count: '12', cards: ['Cty ABC', 'Anh Minh'],  c: '#94a3b8' },
    { label: 'Qualify',  count: '7',  cards: ['Startup Y', 'Tập đoàn X'], c: color },
    { label: 'Proposal', count: '4',  cards: ['Cty DEF'],              c: '#a78bfa' },
    { label: 'Won',      count: '3',  cards: [],                       c: '#10b981', won: true },
  ]
  return (
    <g>
      <text x="4" y="9" fill={color} fontSize="5.5" opacity="0.3" fontWeight="600">CRM PIPELINE</text>
      {cols.map((col, ci) => (
        <g key={ci}>
          {/* Column */}
          <rect x={4+ci*63} y={12} width={58} height={74} rx="5"
            fill={col.c} fillOpacity="0.04" stroke={col.c} strokeOpacity="0.12" strokeWidth="0.6" />
          {/* Header */}
          <rect x={4+ci*63} y={12} width={58} height={13} rx="5" fill={col.c} fillOpacity="0.15" />
          <text x={33+ci*63} y={21.5} textAnchor="middle" fill={col.c} fontSize="6.5" fontWeight="700" opacity="0.9">{col.label}</text>
          <text x={55+ci*63} y={21.5} fill={col.c} fontSize="5.5" opacity="0.55">{col.count}</text>
          {/* Cards */}
          {col.won ? (
            <g>
              {/* Big WIN indicator */}
              <text x={33+ci*63} y={52} textAnchor="middle" fill="#10b981" fontSize="22" fontWeight="900" opacity="0.15">3</text>
              {/* Win rate badge */}
              <rect x={10+ci*63} y={56} width={46} height={11} rx="4" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeOpacity="0.3" strokeWidth="0.6" />
              <text x={33+ci*63} y={64} textAnchor="middle" fill="#10b981" fontSize="6.5" fontWeight="700" opacity="0.9">67% Win Rate</text>
            </g>
          ) : col.cards.map((card, cdi) => (
            <g key={cdi}>
              <rect x={8+ci*63} y={29+cdi*20} width={50} height={16} rx="4"
                fill={col.c} fillOpacity={0.08+cdi*0.02}
                stroke={col.c} strokeOpacity="0.18" strokeWidth="0.5" />
              <circle cx={15+ci*63} cy={37+cdi*20} r="3" fill={col.c} fillOpacity="0.4" />
              <text x={21+ci*63} y={40+cdi*20} fill={col.c} fontSize="6" opacity="0.75">{card}</text>
              <Row x={8+ci*63} y={41+cdi*20} w={30} h={4} color={col.c} op={0.15} />
            </g>
          ))}
        </g>
      ))}
      {/* Bottom stats */}
      <rect x={0} y={87} width={260} height={3} fill={color} fillOpacity="0.06" />
      <text x="4" y="88.5" fill={color} fontSize="5" opacity="0.35">Pipeline  890M VND</text>
      <text x="170" y="88.5" fill="#10b981" fontSize="5" opacity="0.6">+23% vs last week</text>
    </g>
  )
}

/* ─── 6. Report / HubSpot Auto ─── */
function ReportVisual({ color }: { color: string }) {
  const bars = [42, 68, 53, 81, 59, 94, 71]
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  return (
    <g>
      {/* Left — email card */}
      <Card x={0} y={4} w={152} h={82} color={color} op={0.06} />
      <rect x={0} y={4} width={152} height={14} rx="5" fill={color} fillOpacity="0.12" />
      {/* Email icon (envelope shape) */}
      <rect x={5} y={7} width={14} height={8} rx="1.5" fill={color} fillOpacity="0.5" />
      <polyline points="5,7 12,12 19,7" stroke="rgba(0,0,0,0.4)" strokeWidth="0.8" fill="none" />
      <text x={24} y={15} fill={color} fontSize="6.5" fontWeight="600" opacity="0.8">Weekly HubSpot Report</text>
      {/* Bar chart */}
      {bars.map((v, i) => (
        <g key={i}>
          <Bar x={10+i*18} y={20} w={12} h={56*v/100} color={color} op={i===5?0.7:0.25} />
          <text x={16+i*18} y={83} textAnchor="middle" fill={color} fontSize="5" opacity="0.4">{days[i]}</text>
        </g>
      ))}
      {/* Metrics */}
      <text x={118} y={35} fill={color} fontSize="11" fontWeight="700" opacity="0.7">48</text>
      <text x={118} y={43} fill={color} fontSize="5.5" opacity="0.35">Deals closed</text>
      <line x1={118} y1={46} x2={150} y2={46} stroke={color} strokeOpacity="0.1" strokeWidth="0.5" />
      <text x={118} y={57} fill={color} fontSize="9" fontWeight="700" opacity="0.65">67%</text>
      <text x={118} y={64} fill={color} fontSize="5.5" opacity="0.35">Win rate</text>

      {/* Right — schedule */}
      <Card x={156} y={4} w={104} h={82} color={color} op={0.07} />
      <rect x={156} y={4} width={104} height={14} rx="5" fill={color} fillOpacity="0.12" />
      {/* Clock icon */}
      <circle cx={162} cy={11} r="4" fill="none" stroke={color} strokeOpacity="0.6" strokeWidth="0.8" />
      <line x1={162} y1={8.5} x2={162} y2={11} stroke={color} strokeWidth="0.8" strokeLinecap="round" />
      <line x1={162} y1={11} x2={164} y2={12.5} stroke={color} strokeWidth="0.8" strokeLinecap="round" />
      <text x={169} y={15} fill={color} fontSize="6.5" fontWeight="600" opacity="0.8">Auto-Schedule</text>
      {/* Cron display */}
      <rect x={160} y={22} width={96} height={9} rx="3" fill={color} fillOpacity="0.1" />
      <text x={208} y={29} textAnchor="middle" fill={color} fontSize="6" opacity="0.65">Mon 08:00 · every week</text>
      {/* Recipients */}
      {['CEO', 'Marketing', 'Sales'].map((r, i) => (
        <g key={i}>
          <circle cx={166} cy={45+i*13} r="5" fill={color} fillOpacity="0.2" />
          <text x={166} y={48.5+i*13} textAnchor="middle" fill={color} fontSize="5.5" fontWeight="700" opacity="0.8">{r[0]}</text>
          <Row x={175} y={41+i*13} w={78} h={8} color={color} op={0.06} />
          <text x={178} y={47+i*13} fill={color} fontSize="6" opacity="0.55">{r}</text>
        </g>
      ))}
      {/* Sent badge */}
      <rect x={160} y={80} width={96} height={5} rx="2" fill="#10b981" fillOpacity="0.15" />
      {/* Check mark */}
      <polyline points="162,82.5 164,84 167,81.5" stroke="#10b981" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x={170} y={84} fill="#10b981" fontSize="5.5" opacity="0.8">Sent 2 min ago</text>
    </g>
  )
}

/* ─── 7. Desktop / ArcSo ─── */
function DesktopVisual({ color }: { color: string }) {
  const accs = [
    { name: 'Page Chính', platform: 'FB', ok: true  },
    { name: 'Shop ABC',   platform: 'FB', ok: true  },
    { name: 'Gmail Work', platform: 'G',  ok: true  },
    { name: 'Test Acc',   platform: 'FB', ok: false },
  ]
  return (
    <g>
      <TitleBar color={color} />
      {/* URL bar */}
      <rect x={36} y={6} width={188} height={9} rx="4" fill={color} fillOpacity="0.1" />
      <text x={130} y={13} textAnchor="middle" fill={color} fontSize="5.5" opacity="0.35">ArcSo — Multi-Account Manager</text>
      {/* Sidebar */}
      <rect x={0} y={18} width={54} height={72} fill={color} fillOpacity="0.06" />
      {['All Accs','Facebook','Gmail','Settings'].map((t, i) => (
        <g key={i}>
          <rect x={2} y={22+i*14} width={50} height={11} rx="4"
            fill={color} fillOpacity={i===0?0.28:0.06} />
          <text x={27} y={31+i*14} textAnchor="middle" fill={color} fontSize="6" opacity={i===0?0.9:0.4}>{t}</text>
        </g>
      ))}
      {/* Account table header */}
      <rect x={58} y={20} width={200} height={9} rx="3" fill={color} fillOpacity="0.1" />
      {['Account','Platform','Status'].map((h, i) => (
        <text key={i} x={[62,136,188][i]} y={27} fill={color} fontSize="5.5" opacity="0.4" fontWeight="600">{h}</text>
      ))}
      {/* Rows */}
      {accs.map((a, i) => (
        <g key={i}>
          <rect x={58} y={32+i*14} width={200} height={11} rx="4"
            fill={color} fillOpacity="0.05"
            stroke={color} strokeOpacity="0.1" strokeWidth="0.5" />
          <circle cx={65} cy={37.5+i*14} r="4" fill={color} fillOpacity="0.2" />
          <text x={65} y={40.5+i*14} textAnchor="middle" fill={color} fontSize="5" fontWeight="700" opacity="0.75">{a.platform[0]}</text>
          <text x={73} y={40+i*14} fill={color} fontSize="6" opacity="0.75">{a.name}</text>
          <Row x={130} y={34+i*14} w={38} h={7} color={color} op={0.12} />
          <text x={149} y={40+i*14} textAnchor="middle" fill={color} fontSize="5.5" opacity="0.5">Container</text>
          <Dot x={196} y={37.5+i*14} c={a.ok?'#10b981':'#f59e0b'} />
          <text x={202} y={40.5+i*14} fill={a.ok?'#10b981':'#f59e0b'} fontSize="5.5" opacity="0.8">{a.ok?'Active':'Warning'}</text>
        </g>
      ))}
    </g>
  )
}

/* ─── 8. Extension Suite ─── */
function ExtensionVisual({ color }: { color: string }) {
  return (
    <g>
      <TitleBar color={color} />
      {/* URL */}
      <rect x={36} y={6} width={188} height={9} rx="4" fill={color} fillOpacity="0.08" />
      <text x={130} y={13} textAnchor="middle" fill={color} fontSize="5.5" opacity="0.3">facebook.com/ads/manager</text>
      {/* Page content */}
      {[0,1,2].map(i => <Row key={i} x={2} y={22+i*16} w={148} h={12} color={color} op={0.04} />)}
      {[0,1,2].map(i => <Row key={i} x={6} y={26+i*16} w={80+i*18} h={5} color={color} op={0.1} />)}
      {/* Extension popup */}
      <rect x={154} y={20} width={106} height={70} rx="6"
        fill="rgba(10,10,18,0.97)" stroke={color} strokeOpacity="0.5" strokeWidth="0.8" />
      <rect x={154} y={20} width={106} height={15} rx="6" fill={color} fillOpacity="0.2" />
      {/* AI badge */}
      <circle cx={161} cy={27.5} r="5" fill={color} fillOpacity="0.3" />
      <text x={161} y={30.5} textAnchor="middle" fill={color} fontSize="6.5" fontWeight="700" opacity="0.9">A</text>
      <text x={213} y={31} textAnchor="middle" fill={color} fontSize="7" fontWeight="700" opacity="0.9">AI Assistant</text>
      {/* Chat bubble user */}
      <rect x={158} y={40} width={74} height={14} rx="4" fill={color} fillOpacity="0.15" />
      <text x={162} y={47} fill={color} fontSize="5.5" opacity="0.7">Summarize this page</text>
      <text x={162} y={52} fill={color} fontSize="5" opacity="0.45">in bullet points...</text>
      {/* Response */}
      <rect x={158} y={58} width={98} height={20} rx="4" fill={color} fillOpacity="0.07" />
      <Row x={162} y={62} w={88} h={4} color={color} op={0.2} />
      <Row x={162} y={68} w={76} h={4} color={color} op={0.14} />
      <Row x={162} y={74} w={60} h={4} color={color} op={0.09} />
      {/* Input */}
      <rect x={158} y={82} width={78} height={8} rx="3" fill={color} fillOpacity="0.1" stroke={color} strokeOpacity="0.3" strokeWidth="0.5" />
      <rect x={239} y={82} width={17} height={8} rx="3" fill={color} fillOpacity="0.4" />
      {/* Send arrow */}
      <path d="M243,90 L248,86 L243,82" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />
      {/* Toolbar icon */}
      <circle cx={240} cy={13} r="5" fill={color} fillOpacity="0.3" stroke={color} strokeOpacity="0.6" strokeWidth="0.7" />
      <text x={240} y={16.5} textAnchor="middle" fill="white" fontSize="6.5" fontWeight="700" opacity="0.8">A</text>
    </g>
  )
}

/* ─── 9. DMS Pro ─── */
function DMSVisual({ color }: { color: string }) {
  const docs = [
    { name: 'HĐ Dịch vụ Q1.pdf',    tag: 'Contract', ok: true,  exp: '31/03' },
    { name: 'Báo cáo tháng 4.xlsx',  tag: 'Report',   ok: false, exp: '—'     },
    { name: 'Giấy phép KD 2025.pdf', tag: 'Legal',    ok: true,  exp: '01/07' },
  ]
  return (
    <g>
      {/* Left nav */}
      <Card x={0} y={2} w={52} h={88} color={color} op={0.06} />
      {/* Nav items */}
      {[
        { label: 'All Files',  active: true  },
        { label: 'Pending',    active: false },
        { label: 'Approved',   active: false },
        { label: 'Expiring',   active: false },
      ].map((item, i) => (
        <g key={i}>
          <rect x={2} y={6+i*18} width={48} height={13} rx="4"
            fill={color} fillOpacity={item.active ? 0.28 : 0.06} />
          {/* Tiny icon */}
          <rect x={6} y={10+i*18} width={5} height={6} rx="0.8" fill={color} fillOpacity={item.active?0.8:0.35} />
          <text x={14} y={15+i*18} fill={color} fontSize="6" opacity={item.active?0.9:0.45}>{item.label}</text>
          {i===1 && <circle cx={46} cy={12.5} r="3.5" fill="#f59e0b" fillOpacity="0.8" />}
          {i===1 && <text x={46} y={15} textAnchor="middle" fill="black" fontSize="4.5" fontWeight="700" opacity="0.9">2</text>}
        </g>
      ))}
      {/* Search */}
      <rect x={56} y={2} width={202} height={10} rx="4" fill={color} fillOpacity="0.08" stroke={color} strokeOpacity="0.2" strokeWidth="0.5" />
      {/* Search icon */}
      <circle cx={62} cy={7} r="2.5" fill="none" stroke={color} strokeOpacity="0.4" strokeWidth="0.7" />
      <line x1={64} y1={9} x2={66} y2={11} stroke={color} strokeOpacity="0.4" strokeWidth="0.7" />
      <text x={70} y={10} fill={color} fontSize="5.5" opacity="0.3">Search documents...</text>
      {/* Table header */}
      <rect x={56} y={15} width={202} height={10} rx="3" fill={color} fillOpacity="0.1" />
      {['Document','Type','Status','Exp'].map((h, i) => (
        <text key={i} x={[60,142,174,236][i]} y={23} fill={color} fontSize="5.5" opacity="0.45" fontWeight="600">{h}</text>
      ))}
      {/* Rows */}
      {docs.map((d, i) => (
        <g key={i}>
          <rect x={56} y={28+i*18} width={202} height={14} rx="4"
            fill={color} fillOpacity="0.05" stroke={color} strokeOpacity="0.08" strokeWidth="0.5" />
          {/* Doc icon */}
          <rect x={60} y={31+i*18} width={6} height={8} rx="1" fill={color} fillOpacity="0.3" />
          <line x1={60} y1={33.5+i*18} x2={66} y2={33.5+i*18} stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
          <text x={70} y={38+i*18} fill={color} fontSize="6" opacity="0.75">{d.name}</text>
          <rect x={138} y={30+i*18} width={30} height={9} rx="4" fill={color} fillOpacity="0.15" />
          <text x={153} y={37+i*18} textAnchor="middle" fill={color} fontSize="5.5" opacity="0.7">{d.tag}</text>
          <Dot x={180} y={35+i*18} c={d.ok?'#10b981':'#f59e0b'} />
          <text x={187} y={38+i*18} fill={d.ok?'#10b981':'#f59e0b'} fontSize="5.5" opacity="0.85">{d.ok?'Approved':'Pending'}</text>
          <text x={236} y={38+i*18} fill={color} fontSize="5.5" opacity="0.45">{d.exp}</text>
        </g>
      ))}
      {/* AI tag notice */}
      <rect x={56} y={84} width={202} height={6} rx="2" fill={color} fillOpacity="0.08" />
      {/* Spark icon */}
      <path d="M59,88 L61,85 L62,87 L64,84 L65,88" stroke={color} strokeWidth="0.8" fill="none" strokeOpacity="0.7" strokeLinecap="round" />
      <text x={68} y={88.5} fill={color} fontSize="5.5" opacity="0.5">Gemini AI auto-tagged 3 docs</text>
    </g>
  )
}

/* ─── 10. Transcript / VideoKL ─── */
function TranscriptVisual({ color }: { color: string }) {
  const wave = [3,7,12,20,16,24,18,10,22,26,20,14,28,22,16,10,20,26,18,12,7,4,9,14,20,16]
  const lines = [
    { t: '00:12', text: 'Chào mừng các bạn đến với buổi họp hôm nay' },
    { t: '00:28', text: 'Hôm nay chúng ta sẽ thảo luận về kết quả Q1' },
    { t: '01:05', text: 'Doanh thu tăng 23% so với dự kiến ban đầu...' },
  ]
  return (
    <g>
      {/* Left: waveform */}
      <Card x={0} y={2} w={82} h={88} color={color} op={0.06} />
      <text x={41} y={13} textAnchor="middle" fill={color} fontSize="6" opacity="0.5" fontWeight="600">Audio</text>
      {/* Waveform */}
      {wave.map((h, i) => (
        <rect key={i} x={5+i*3} y={50 - h/2} width={2.2} height={h} rx="1"
          fill={color} fillOpacity={i < 17 ? 0.65 : 0.2} />
      ))}
      {/* Playhead */}
      <line x1={55} y1={22} x2={55} y2={72} stroke={color} strokeWidth="1.2" strokeOpacity="0.8" />
      <circle cx={55} cy={50} r="2.5" fill={color} />
      {/* Time */}
      <text x={41} y={82} textAnchor="middle" fill={color} fontSize="6.5" fontWeight="600" opacity="0.65">01:45 / 03:20</text>
      {/* Model badge */}
      <rect x={5} y={15} width={72} height={9} rx="3" fill={color} fillOpacity="0.15" />
      {/* Whisper icon — waveform lines */}
      <path d="M8,19.5 L8,20.5 M10,18.5 L10,21.5 M12,17 L12,23 M14,18.5 L14,21.5 M16,19.5 L16,20.5" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
      <text x={20} y={22} fill={color} fontSize="5.5" opacity="0.7">Whisper large-v3</text>
      {/* Right: transcript */}
      <Card x={86} y={2} w={174} h={88} color={color} op={0.05} />
      <text x={173} y={13} textAnchor="middle" fill={color} fontSize="6" opacity="0.5" fontWeight="600">Transcript</text>
      {lines.map((l, i) => (
        <g key={i}>
          <rect x={90} y={18+i*22} width={28} height={9} rx="3" fill={color} fillOpacity="0.2" />
          <text x={104} y={25.5+i*22} textAnchor="middle" fill={color} fontSize="5.5" fontWeight="600" opacity="0.8">{l.t}</text>
          <text x={122} y={25.5+i*22} fill={color} fontSize="6" opacity="0.7">{l.text}</text>
          <Row x={90} y={30+i*22} w={166} h={5} color={color} op={0.06} />
        </g>
      ))}
      {/* Export */}
      {['JSON','SRT','TXT'].map((fmt, i) => (
        <g key={i}>
          <rect x={90+i*40} y={80} width={34} height={9} rx="3" fill={color} fillOpacity={i===0?0.3:0.1} />
          <text x={107+i*40} y={87} textAnchor="middle" fill={color} fontSize="6" opacity={i===0?0.9:0.5}>{fmt}</text>
        </g>
      ))}
    </g>
  )
}

/* ─── 11. Ads Portal ─── */
function AdsVisual({ color }: { color: string }) {
  const accs = [
    { name: 'Shop Thời Trang', spend: '2.4M', roas: '4.2×', ok: true  },
    { name: 'Khóa học Online', spend: '1.8M', roas: '3.8×', ok: true  },
    { name: 'Food Delivery',   spend: '3.1M', roas: '2.1×', ok: false },
  ]
  const bars = [40,55,48,62,58,72,66]
  return (
    <g>
      {/* Left: accounts */}
      <Card x={0} y={2} w={112} h={88} color={color} op={0.06} />
      <rect x={0} y={2} width={112} height={14} rx="5" fill={color} fillOpacity="0.12" />
      {/* Ads icon */}
      <rect x={5} y={5} width={9} height={7} rx="1.5" fill={color} fillOpacity="0.6" />
      <line x1={7} y1={7} x2={12} y2={7} stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
      <text x={18} y={13} fill={color} fontSize="6.5" fontWeight="700" opacity="0.85">Ad Accounts</text>
      {accs.map((a, i) => (
        <g key={i}>
          <rect x={3} y={20+i*22} width={106} height={18} rx="4"
            fill={color} fillOpacity="0.07" stroke={color} strokeOpacity="0.12" strokeWidth="0.5" />
          <Dot x={11} y={29+i*22} c={a.ok?'#10b981':'#f59e0b'} />
          <text x={18} y={31.5+i*22} fill={color} fontSize="6.5" opacity="0.8">{a.name}</text>
          <text x={6} y={36+i*22} fill={color} fontSize="5.5" opacity="0.4">{a.spend}</text>
          <rect x={70} y={26+i*22} width={36} height={8} rx="3" fill="#10b981" fillOpacity="0.15" />
          <text x={88} y={32+i*22} textAnchor="middle" fill="#10b981" fontSize="6" fontWeight="700" opacity="0.85">ROAS {a.roas}</text>
        </g>
      ))}
      <text x={3} y={88} fill={color} fontSize="5" opacity="0.35">Total: 7.3M · 3 accounts</text>
      {/* Right: chart */}
      <Card x={116} y={2} w={144} h={56} color={color} op={0.07} />
      <text x={188} y={13} textAnchor="middle" fill={color} fontSize="6" opacity="0.5" fontWeight="600">Spend (7 days)</text>
      {bars.map((h, i) => (
        <g key={i}>
          <Bar x={122+i*18} y={52 - h*0.5} w={13} h={h*0.5} color={color} op={i===5?0.7:0.3} />
          <text x={128+i*18} y={58} textAnchor="middle" fill={color} fontSize="5" opacity="0.35">
            {['M','T','W','T','F','S','S'][i]}
          </text>
        </g>
      ))}
      {/* Token status */}
      <Card x={116} y={62} w={144} h={28} color={color} op={0.07} />
      {/* Key icon */}
      <circle cx={123} cy={71} r="3.5" fill="none" stroke={color} strokeOpacity="0.5" strokeWidth="0.8" />
      <line x1={126} y1={71} x2={131} y2={71} stroke={color} strokeWidth="0.8" strokeOpacity="0.5" />
      <line x1={129} y1={71} x2={129} y2={73.5} stroke={color} strokeWidth="0.8" strokeOpacity="0.5" />
      <text x={135} y={74} fill={color} fontSize="6" opacity="0.65" fontWeight="600">Token Status</text>
      <Dot x={124} y={82} c="#10b981" />
      <text x={130} y={85} fill="#10b981" fontSize="5.5" opacity="0.8">Auto-refresh · 58 days left</text>
      {/* Alert */}
      <rect x={116} y={79} width={144} height={9} rx="3" fill="#f59e0b" fillOpacity="0.08" />
      {/* Warning icon */}
      <path d="M118,84 L121.5,78.5 L125,84 Z" fill="#f59e0b" fillOpacity="0.7" />
      <text x={128} y={85.5} fill="#f59e0b" fontSize="5.5" opacity="0.75">Food: budget 20% remaining</text>
    </g>
  )
}
