'use client'

import React from 'react'

/* ─── Shared primitives ─────────────────────────────────── */

function MockupShell({ color, children, title = '' }: {
  color: string; children: React.ReactNode; title?: string
}) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden select-none"
      style={{
        background: '#0d0d16',
        border: `1px solid rgba(255,255,255,0.07)`,
        boxShadow: `0 0 0 1px ${color}18, 0 32px 80px rgba(0,0,0,0.7)`,
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      }}>
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: '#111120', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex gap-1.5">
          {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.7 }} />
          ))}
        </div>
        <div className="flex-1 flex justify-center">
          <div className="rounded-md px-4 py-0.5 text-[10px]"
            style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.2)', minWidth: 160, textAlign: 'center' }}>
            {title || 'app.SOLAI.vn'}
          </div>
        </div>
        <div style={{ width: 60 }} />
      </div>
      {children}
    </div>
  )
}

function Sidebar({ items, active, color }: { items: string[]; active: number; color: string }) {
  return (
    <div style={{ width: 140, background: '#0b0b18', borderRight: '1px solid rgba(255,255,255,0.04)', padding: '12px 8px', flexShrink: 0 }}>
      {items.map((item, i) => (
        <div key={item} style={{
          padding: '6px 10px',
          borderRadius: 6,
          marginBottom: 2,
          fontSize: 11,
          fontWeight: i === active ? 600 : 400,
          color: i === active ? color : 'rgba(255,255,255,0.3)',
          background: i === active ? `${color}14` : 'transparent',
        }}>
          {item}
        </div>
      ))}
    </div>
  )
}

function Badge({ label, variant = 'green' }: { label: string; variant?: 'green' | 'yellow' | 'red' | 'blue' | 'purple' | 'gray' }) {
  const colors: Record<string, [string, string]> = {
    green:  ['rgba(34,197,94,0.15)',  '#22c55e'],
    yellow: ['rgba(234,179,8,0.15)',  '#eab308'],
    red:    ['rgba(239,68,68,0.15)',  '#ef4444'],
    blue:   ['rgba(59,130,246,0.15)', '#3b82f6'],
    purple: ['rgba(168,85,247,0.15)', '#a855f7'],
    gray:   ['rgba(255,255,255,0.08)','rgba(255,255,255,0.35)'],
  }
  const [bg, col] = colors[variant]
  return (
    <span style={{
      padding: '1px 7px',
      borderRadius: 20,
      fontSize: 9,
      fontWeight: 600,
      background: bg,
      color: col,
      whiteSpace: 'nowrap' as const,
    }}>{label}</span>
  )
}

function Bar({ pct, color, h = 4 }: { pct: number; color: string; h?: number }) {
  return (
    <div style={{ height: h, borderRadius: 99, background: 'rgba(255,255,255,0.05)', overflow: 'hidden', flex: 1 }}>
      <div style={{ height: '100%', width: `${pct}%`, borderRadius: 99, background: color }} />
    </div>
  )
}

function MiniChart({ data, color, h = 36 }: { data: number[]; color: string; h?: number }) {
  const max = Math.max(...data)
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${h - (v / max) * (h - 4)}`).join(' ')
  return (
    <svg width="100%" height={h} viewBox={`0 0 100 ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`g${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
      <polygon points={`0,${h} ${pts} 100,${h}`} fill={`url(#g${color.replace('#','')})`} />
    </svg>
  )
}

/* ─── Per-product mockups ──────────────────────────────── */

function DigitalOfficeMockup({ color }: { color: string }) {
  const agents = [
    { name: 'Planner', model: 'Claude Sonnet', status: 'done', task: 'Phân tích & chia 8 subtask' },
    { name: 'Manager', model: 'Gemini Flash', status: 'done', task: 'Phân công 3 workers' },
    { name: 'Worker A', model: 'Claude Haiku', status: 'running', task: 'Viết email draft (3/5)' },
    { name: 'Worker B', model: 'GPT-4o', status: 'running', task: 'Tóm tắt tài liệu (2/5)' },
    { name: 'Worker C', model: 'Ollama', status: 'pending', task: 'Chờ Manager phân công' },
    { name: 'Reviewer', model: 'Claude Sonnet', status: 'pending', task: 'Chờ Workers hoàn thành' },
  ]
  const statusColor: Record<string, 'green' | 'blue' | 'gray'> = { done: 'green', running: 'blue', pending: 'gray' }

  return (
    <MockupShell color={color} title="Digital Office — AI Agent Dashboard">
      <div style={{ display: 'flex', height: 340 }}>
        <Sidebar items={['Dashboard', 'Agents', 'Tasks', 'History', 'Settings']} active={1} color={color} />
        <div style={{ flex: 1, padding: 16, overflowY: 'auto' as const }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>Agent Network</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Task: Soạn báo cáo Q4 & gửi email team</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <Badge label="2 running" variant="blue" />
              <Badge label="2 done" variant="green" />
            </div>
          </div>

          {/* Agent rows */}
          {agents.map((a) => (
            <div key={a.name} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
              borderRadius: 8, marginBottom: 4,
              background: a.status === 'running' ? `${color}08` : 'rgba(255,255,255,0.02)',
              border: `1px solid ${a.status === 'running' ? color + '20' : 'rgba(255,255,255,0.04)'}`,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: a.status === 'done' ? '#22c55e' : a.status === 'running' ? color : 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{a.name}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginTop: 1 }}>{a.task}</div>
              </div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginRight: 8 }}>{a.model}</div>
              <Badge label={a.status === 'done' ? '✓ Done' : a.status === 'running' ? '● Running' : '○ Pending'} variant={statusColor[a.status]} />
            </div>
          ))}

          {/* Progress */}
          <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Tiến độ tổng thể</span>
              <span style={{ fontSize: 10, fontWeight: 700, color }}>42%</span>
            </div>
            <Bar pct={42} color={color} h={5} />
          </div>
        </div>
      </div>
    </MockupShell>
  )
}

function BigdataMockup({ color }: { color: string }) {
  const leads = [
    { name: 'Nguyễn Văn Hùng', company: 'FPT Corp', score: 94, segment: 'Hot', status: 'Call today' },
    { name: 'Trần Thị Lan', company: 'Vingroup', score: 87, segment: 'Hot', status: 'Call today' },
    { name: 'Lê Minh Khoa', company: 'Techcombank', score: 71, segment: 'Warm', status: 'Follow-up' },
    { name: 'Phạm Quỳnh Anh', company: 'MoMo', score: 65, segment: 'Warm', status: 'Nurture' },
    { name: 'Hoàng Đức Long', company: 'VNG', score: 42, segment: 'Cold', status: 'Wait' },
  ]
  return (
    <MockupShell color={color} title="BigData Pipeline — Lead Intelligence">
      <div style={{ display: 'flex', height: 340 }}>
        <Sidebar items={['Overview', 'Leads', 'Segments', 'Scoring', 'Export']} active={1} color={color} />
        <div style={{ flex: 1, padding: 16 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {[{ v: '2,847', l: 'Total Leads' }, { v: '94', l: 'Avg Score' }, { v: '38%', l: 'Hot Leads' }].map(s => (
              <div key={s.l} style={{ flex: 1, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color }}>{s.v}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginTop: 1 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 70px 70px 80px', gap: 8, padding: '4px 8px', marginBottom: 4 }}>
            {['Name', 'Company', 'Score', 'Segment', 'Action'].map(h => (
              <div key={h} style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
            ))}
          </div>

          {leads.map((l) => (
            <div key={l.name} style={{
              display: 'grid', gridTemplateColumns: '1fr 100px 70px 70px 80px',
              gap: 8, padding: '8px 8px', borderRadius: 6, marginBottom: 2,
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)',
              alignItems: 'center',
            }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{l.name}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{l.company}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: l.score >= 80 ? '#22c55e' : l.score >= 60 ? color : 'rgba(255,255,255,0.3)' }}>{l.score}</span>
              </div>
              <Badge label={l.segment} variant={l.segment === 'Hot' ? 'red' : l.segment === 'Warm' ? 'yellow' : 'gray'} />
              <Badge label={l.status} variant={l.status === 'Call today' ? 'green' : l.status === 'Follow-up' ? 'blue' : 'gray'} />
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  )
}

function WebFleetMockup({ color }: { color: string }) {
  const sites = [
    { url: 'shop.client-a.vn', uptime: 99.97, rt: 184, ssl: 89, score: 96, status: 'ok' },
    { url: 'blog.agency.com', uptime: 99.81, rt: 312, ssl: 45, score: 78, status: 'warn' },
    { url: 'app.startup.io', uptime: 100, rt: 98, ssl: 120, score: 99, status: 'ok' },
    { url: 'landing.ecom.vn', uptime: 98.4, rt: 891, ssl: 12, score: 61, status: 'alert' },
    { url: 'api.saas.dev', uptime: 99.99, rt: 43, ssl: 210, score: 98, status: 'ok' },
  ]
  const chartData = [72, 80, 68, 91, 85, 95, 88, 92, 89, 97, 94, 99]
  return (
    <MockupShell color={color} title="Web Fleet — Infrastructure Monitor">
      <div style={{ display: 'flex', height: 340 }}>
        <Sidebar items={['Overview', 'Sites', 'Alerts', 'SSL', 'Deploys']} active={1} color={color} />
        <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#22c55e' }}>5/5</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>Sites Online</div>
            </div>
            <div style={{ flex: 2, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginBottom: 4 }}>Avg response time (24h)</div>
              <MiniChart data={chartData} color={color} h={30} />
            </div>
          </div>

          {sites.map((s) => (
            <div key={s.url} style={{
              display: 'grid', gridTemplateColumns: '1fr 60px 60px 55px 55px',
              alignItems: 'center', gap: 8, padding: '7px 10px',
              borderRadius: 7, background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${s.status === 'alert' ? 'rgba(239,68,68,0.2)' : s.status === 'warn' ? 'rgba(234,179,8,0.12)' : 'rgba(255,255,255,0.04)'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.status === 'ok' ? '#22c55e' : s.status === 'warn' ? '#eab308' : '#ef4444', flexShrink: 0 }} />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace' }}>{s.url}</span>
              </div>
              <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 600 }}>{s.uptime}%</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{s.rt}ms</span>
              <span style={{ fontSize: 10, color: s.ssl < 30 ? '#ef4444' : s.ssl < 60 ? '#eab308' : 'rgba(255,255,255,0.3)' }}>{s.ssl}d</span>
              <Badge label={`${s.score}`} variant={s.score >= 90 ? 'green' : s.score >= 70 ? 'yellow' : 'red'} />
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  )
}

function TaomeetsMockup({ color }: { color: string }) {
  const steps = [
    { n: '01', name: 'Theme Selection', desc: 'Đường phố Sài Gòn', status: 'done' },
    { n: '02', name: 'Lyrics (GPT-4o)', desc: '32 bars generated', status: 'done' },
    { n: '03', name: 'Music (Suno)', desc: 'trap_viet_style_v3', status: 'running' },
    { n: '04', name: 'Visuals (Imagen 3)', desc: '10 images queued', status: 'pending' },
    { n: '05', name: 'Video Assembly', desc: 'ffmpeg 1080p', status: 'pending' },
    { n: '06', name: 'YouTube Upload', desc: 'SEO auto-optimize', status: 'pending' },
  ]
  const chartData = [120, 145, 132, 178, 165, 210, 198, 234, 221, 289, 301, 312]
  return (
    <MockupShell color={color} title="TaoMeetsTrap — AI Video Pipeline">
      <div style={{ display: 'flex', height: 340 }}>
        <Sidebar items={['Pipeline', 'Schedule', 'Library', 'Analytics', 'Config']} active={0} color={color} />
        <div style={{ flex: 1, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>Today Run — 06:00 AM</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>Step 3/6 · Est. 4 min remaining</div>
            </div>
            <Badge label="● In Progress" variant="blue" />
          </div>

          {steps.map((s) => (
            <div key={s.n} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
              borderRadius: 7, marginBottom: 4,
              background: s.status === 'running' ? `${color}0a` : 'rgba(255,255,255,0.02)',
              border: `1px solid ${s.status === 'running' ? color + '25' : 'rgba(255,255,255,0.04)'}`,
            }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: s.status === 'done' ? '#22c55e' : s.status === 'running' ? color : 'rgba(255,255,255,0.15)', minWidth: 16 }}>{s.n}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 500, color: s.status === 'pending' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.8)' }}>{s.name}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>{s.desc}</div>
              </div>
              <Badge label={s.status === 'done' ? '✓' : s.status === 'running' ? '◉ Running' : '○'} variant={s.status === 'done' ? 'green' : s.status === 'running' ? 'blue' : 'gray'} />
            </div>
          ))}

          <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginBottom: 4 }}>Channel views (30d)</div>
            <MiniChart data={chartData} color={color} h={28} />
          </div>
        </div>
      </div>
    </MockupShell>
  )
}

function CrmMockup({ color }: { color: string }) {
  const cols = [
    { name: 'Lead', count: 12, deals: [{ name: 'FPT Corp', val: '120M', daysAgo: 2 }, { name: 'Vincom Retail', val: '80M', daysAgo: 5 }] },
    { name: 'Qualified', count: 8, deals: [{ name: 'Masan Group', val: '340M', daysAgo: 1 }, { name: 'Kinh Do', val: '95M', daysAgo: 3 }] },
    { name: 'Proposal', count: 5, deals: [{ name: 'Techcombank', val: '500M', daysAgo: 0 }] },
    { name: 'Won', count: 3, deals: [{ name: 'VNG Cloud', val: '220M', daysAgo: 7 }] },
  ]
  return (
    <MockupShell color={color} title="CRM v6.0 — Sales Pipeline">
      <div style={{ display: 'flex', height: 340 }}>
        <Sidebar items={['Pipeline', 'Contacts', 'Reports', 'Reminders', 'Team']} active={0} color={color} />
        <div style={{ flex: 1, padding: 12, overflowX: 'auto' as const }}>
          <div style={{ display: 'flex', gap: 8, minWidth: 600 }}>
            {cols.map((col) => (
              <div key={col.name} style={{ flex: 1, minWidth: 130 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, padding: '0 4px' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{col.name}</span>
                  <span style={{ fontSize: 9, background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)', padding: '1px 5px', borderRadius: 4 }}>{col.count}</span>
                </div>
                {col.deals.map((d) => (
                  <div key={d.name} style={{
                    padding: '8px 10px', borderRadius: 8, marginBottom: 6,
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: 3 }}>{d.name}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color }}>{d.val}</div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)', marginTop: 3 }}>{d.daysAgo === 0 ? 'Today' : `${d.daysAgo}d ago`}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupShell>
  )
}

function HubspotMockup({ color }: { color: string }) {
  const chartData = [42, 58, 51, 67, 73, 65, 80, 76, 89, 84, 92, 88]
  return (
    <MockupShell color={color} title="HubSpot Auto — Weekly Report">
      <div style={{ display: 'flex', height: 340 }}>
        <Sidebar items={['Reports', 'Schedule', 'Templates', 'History', 'Settings']} active={0} color={color} />
        <div style={{ flex: 1, padding: 16 }}>
          <div style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', marginBottom: 10 }}>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginBottom: 6 }}>Weekly Report — {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' })}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
              {[{ l: 'Deals Closed', v: '14', d: '+3 vs last week', c: '#22c55e' }, { l: 'Win Rate', v: '68%', d: '+5pp', c: color }, { l: 'Pipeline', v: '4.2B', d: 'Total value', c: 'rgba(255,255,255,0.6)' }].map(m => (
                <div key={m.l}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: m.c }}>{m.v}</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>{m.l}</div>
                  <div style={{ fontSize: 8, color: '#22c55e', marginTop: 1 }}>{m.d}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginBottom: 4 }}>Deal velocity (12 weeks)</div>
            <MiniChart data={chartData} color={color} h={38} />
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { label: 'Next run', value: 'Mon 07:00', icon: '⏰' },
              { label: 'Recipients', value: '6 people', icon: '👥' },
              { label: 'Template', value: 'Sales Weekly', icon: '📋' },
            ].map(i => (
              <div key={i.label} style={{ flex: 1, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{i.value}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>{i.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupShell>
  )
}

function ArcsoMockup({ color }: { color: string }) {
  const accounts = [
    { name: 'Marketing FB #1', platform: 'Facebook', status: 'active', proxy: 'VN-HCM-01', color: '#3b82f6' },
    { name: 'Support Gmail', platform: 'Gmail', status: 'active', proxy: 'VN-HN-03', color: '#ef4444' },
    { name: 'Marketing FB #2', platform: 'Facebook', status: 'active', proxy: 'VN-HCM-02', color: '#3b82f6' },
    { name: 'Sales Gmail #1', platform: 'Gmail', status: 'idle', proxy: 'SG-01', color: '#ef4444' },
    { name: 'Brand FB Page', platform: 'Facebook', status: 'error', proxy: 'VN-DN-01', color: '#3b82f6' },
    { name: 'CS Gmail #2', platform: 'Gmail', status: 'active', proxy: 'VN-HCM-04', color: '#ef4444' },
  ]
  return (
    <MockupShell color={color} title="ArcSo — Multi-Account Manager">
      <div style={{ display: 'flex', height: 340 }}>
        <Sidebar items={['Accounts', 'Sessions', 'Proxy', 'Schedule', 'Backup']} active={0} color={color} />
        <div style={{ flex: 1, padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>6 accounts · 4 active</div>
            <div style={{ display: 'flex', gap: 5 }}>
              <Badge label="4 Active" variant="green" />
              <Badge label="1 Idle" variant="gray" />
              <Badge label="1 Error" variant="red" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {accounts.map((a) => (
              <div key={a.name} style={{
                padding: '8px 10px', borderRadius: 8,
                background: a.status === 'error' ? 'rgba(239,68,68,0.05)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${a.status === 'error' ? 'rgba(239,68,68,0.2)' : a.status === 'active' ? `${color}15` : 'rgba(255,255,255,0.04)'}`,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>{a.proxy}</div>
                </div>
                <Badge label={a.status} variant={a.status === 'active' ? 'green' : a.status === 'idle' ? 'gray' : 'red'} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupShell>
  )
}

function ExtensionMockup({ color }: { color: string }) {
  return (
    <MockupShell color={color} title="Extensions Suite — Browser AI">
      <div style={{ display: 'flex', height: 340, alignItems: 'flex-start', justifyContent: 'center', padding: 20, gap: 16 }}>
        {/* Extension popup */}
        <div style={{ width: 260, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: '#12121e', flexShrink: 0 }}>
          <div style={{ padding: '10px 12px', background: '#0e0e1a', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, background: `${color}22`, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'white' }}>SOLAI</span>
            <div style={{ marginLeft: 'auto' }}>
              <Badge label="Active" variant="green" />
            </div>
          </div>
          <div style={{ padding: 12 }}>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>AI Assistant (Ctrl+Shift+A)</div>
            <div style={{ borderRadius: 8, background: 'rgba(255,255,255,0.04)', padding: '8px 10px', marginBottom: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Tóm tắt trang này cho tôi</div>
              <div style={{ width: '100%', height: 1, background: `${color}30`, margin: '6px 0' }} />
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
                Trang này là bài viết về xu hướng AI trong marketing 2025. Có 3 điểm chính: personalization, automation và predictive analytics...
              </div>
            </div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Facebook Ads</div>
            {[{ name: 'Campaign A', spend: '2.1M', roas: '4.2x' }, { name: 'Campaign B', spend: '850K', roas: '2.8x' }].map(ad => (
              <div key={ad.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.02)', marginBottom: 4 }}>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>{ad.name}</span>
                <span style={{ fontSize: 9, color }}>{ad.roas} ROAS</span>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>{ad.spend}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Repost panel */}
        <div style={{ flex: 1 }}>
          <div style={{ borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: 12, marginBottom: 8 }}>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginBottom: 6 }}>Auto-Repost</div>
            {[{ name: 'Facebook', on: true }, { name: 'Instagram', on: true }, { name: 'LinkedIn', on: false }, { name: 'Twitter/X', on: true }].map(p => (
              <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{p.name}</span>
                <Badge label={p.on ? 'ON' : 'OFF'} variant={p.on ? 'green' : 'gray'} />
              </div>
            ))}
          </div>
          <div style={{ borderRadius: 8, background: `${color}12`, border: `1px solid ${color}25`, padding: '8px 10px', textAlign: 'center' as const }}>
            <div style={{ fontSize: 11, fontWeight: 600, color }}>1 Click → 3 Platforms</div>
          </div>
        </div>
      </div>
    </MockupShell>
  )
}

function DmsMockup({ color }: { color: string }) {
  const docs = [
    { name: 'HĐ_FPT_Q4_2024.pdf', dept: 'Sales', tag: 'Hợp đồng', status: 'Approved', exp: '31/12/2025' },
    { name: 'Báo cáo tài chính Q3.xlsx', dept: 'Finance', tag: 'Báo cáo', status: 'Pending', exp: '—' },
    { name: 'NDA_VNG_Group.pdf', dept: 'Legal', tag: 'NDA', status: 'Approved', exp: '15/06/2025' },
    { name: 'Phụ lục HĐ_Vingroup.docx', dept: 'Sales', tag: 'Hợp đồng', status: 'Draft', exp: '—' },
    { name: 'Giấy phép kinh doanh.pdf', dept: 'Admin', tag: 'Giấy phép', status: 'Approved', exp: '30/03/2025' },
  ]
  return (
    <MockupShell color={color} title="DMS Pro — Document Management">
      <div style={{ display: 'flex', height: 340 }}>
        <Sidebar items={['All Docs', 'Pending', 'My Docs', 'Expiring', 'Search']} active={0} color={color} />
        <div style={{ flex: 1, padding: 14 }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            {[{ v: '1,284', l: 'Total' }, { v: '3', l: 'Expiring Soon' }, { v: '7', l: 'Awaiting Approval' }].map(s => (
              <div key={s.l} style={{ flex: 1, padding: '6px 8px', borderRadius: 7, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color }}>{s.v}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>{s.l}</div>
              </div>
            ))}
          </div>

          {docs.map((d) => (
            <div key={d.name} style={{
              display: 'grid', gridTemplateColumns: '1fr 60px 70px 65px 70px',
              gap: 6, padding: '7px 8px', borderRadius: 6, marginBottom: 3,
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)',
              alignItems: 'center',
            }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{d.name}</div>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{d.dept}</span>
              <Badge label={d.tag} variant="blue" />
              <Badge label={d.status} variant={d.status === 'Approved' ? 'green' : d.status === 'Pending' ? 'yellow' : 'gray'} />
              <span style={{ fontSize: 9, color: d.exp !== '—' && d.exp.includes('2025') ? '#eab308' : 'rgba(255,255,255,0.2)' }}>{d.exp}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  )
}

function TranscriptMockup({ color }: { color: string }) {
  const lines = [
    { time: '00:00', speaker: 'Minh', text: 'Chào mọi người. Hôm nay chúng ta họp về kế hoạch Q1 2025.' },
    { time: '00:12', speaker: 'Lan', text: 'Vâng, tôi đã chuẩn bị slide rồi. Chúng ta bắt đầu với phần budget nhé?' },
    { time: '00:28', speaker: 'Minh', text: 'Đồng ý. Anh Nam, anh có thể chia sẻ số liệu Q4 không?' },
    { time: '00:41', speaker: 'Nam', text: 'Doanh thu Q4 đạt 8.2 tỷ, vượt KPI 12%. Chi phí giảm 8% nhờ automation.' },
    { time: '01:03', speaker: 'Lan', text: 'Tuyệt vời. Q1 target chúng ta đặt là 10 tỷ, tăng 22% so với Q4.' },
  ]
  const waveData = Array.from({ length: 40 }, (_, i) => Math.sin(i * 0.4) * 0.4 + Math.random() * 0.6)
  return (
    <MockupShell color={color} title="VideoKL — Transcript & Meeting Minutes">
      <div style={{ display: 'flex', height: 340 }}>
        <Sidebar items={['Transcript', 'Summary', 'Export', 'Batch', 'Settings']} active={0} color={color} />
        <div style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          {/* Waveform */}
          <div style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>meeting_q1_planning.mp4</span>
              <span style={{ fontSize: 9, color }}>95.2% accuracy · 01:45:22</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: 32, gap: 1 }}>
              {waveData.map((h, i) => (
                <div key={i} style={{ flex: 1, background: i < 15 ? color : 'rgba(255,255,255,0.1)', borderRadius: 2, height: `${Math.max(15, h * 100)}%` }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>00:00</span>
              <span style={{ fontSize: 8, color }}>▶ 00:28</span>
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>01:45:22</span>
            </div>
          </div>

          {/* Transcript lines */}
          <div style={{ flex: 1, overflowY: 'auto' as const }}>
            {lines.map((l) => (
              <div key={l.time} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 9, color, fontFamily: 'monospace', minWidth: 35, marginTop: 1 }}>{l.time}</span>
                <div>
                  <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.45)', marginRight: 5 }}>{l.speaker}:</span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{l.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupShell>
  )
}

function AdsPortalMockup({ color }: { color: string }) {
  const campaigns = [
    { name: 'Retargeting Q1', account: 'Brand Main', spend: '12.4M', roas: '6.8x', status: 'active' },
    { name: 'Lookalike 1%', account: 'Brand Main', spend: '8.1M', roas: '4.2x', status: 'active' },
    { name: 'Cold Traffic', account: 'Agency A', spend: '5.3M', roas: '1.9x', status: 'warn' },
    { name: 'Brand Awareness', account: 'Agency B', spend: '3.8M', roas: '—', status: 'active' },
  ]
  const chartData = [41, 55, 48, 62, 70, 65, 78, 73, 82, 88, 84, 91]
  return (
    <MockupShell color={color} title="Ads Portal — Facebook Ads Hub">
      <div style={{ display: 'flex', height: 340 }}>
        <Sidebar items={['Overview', 'Campaigns', 'Accounts', 'Alerts', 'Reports']} active={0} color={color} />
        <div style={{ flex: 1, padding: 14 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            {[{ v: '3', l: 'Accounts' }, { v: '29.6M', l: 'Total Spend' }, { v: '4.7x', l: 'Avg ROAS' }].map(s => (
              <div key={s.l} style={{ flex: 1, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color }}>{s.v}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>{s.l}</div>
              </div>
            ))}
            <div style={{ flex: 2, padding: '6px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginBottom: 2 }}>ROAS trend</div>
              <MiniChart data={chartData} color={color} h={30} />
            </div>
          </div>

          {campaigns.map((c) => (
            <div key={c.name} style={{
              display: 'grid', gridTemplateColumns: '1fr 90px 70px 60px 60px',
              gap: 6, padding: '8px 10px', borderRadius: 7, marginBottom: 4,
              background: 'rgba(255,255,255,0.02)', border: `1px solid ${c.status === 'warn' ? 'rgba(234,179,8,0.15)' : 'rgba(255,255,255,0.04)'}`,
              alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{c.name}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>{c.account}</div>
              </div>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{c.spend}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: c.roas !== '—' ? (parseFloat(c.roas) >= 4 ? '#22c55e' : color) : 'rgba(255,255,255,0.3)' }}>{c.roas}</span>
              <Badge label={c.status} variant={c.status === 'active' ? 'green' : 'yellow'} />
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  )
}

/* ─── Main export ───────────────────────────────────────── */

const MOCKUP_MAP: Record<string, (props: { color: string }) => React.ReactElement> = {
  'digital-office': DigitalOfficeMockup,
  'bigdata-pipeline': BigdataMockup,
  'web-fleet': WebFleetMockup,
  'taomeettrap': TaomeetsMockup,
  'crm': CrmMockup,
  'hubspot-auto': HubspotMockup,
  'arcso': ArcsoMockup,
  'extensions-suite': ExtensionMockup,
  'dms': DmsMockup,
  'video-transcript': TranscriptMockup,
  'ads-portal': AdsPortalMockup,
}

export function ProductMockup({ productId, color }: { productId: string; color: string }) {
  const Component = MOCKUP_MAP[productId]
  if (!Component) return null
  return <Component color={color} />
}
