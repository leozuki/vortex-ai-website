'use client'

import { useState, useRef, useEffect } from 'react'
import { Copy, Check, ExternalLink, Star, Terminal, ChevronDown, ArrowUpRight } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useLang } from '@/context/LangContext'
import { aiModels, githubRepos, prompts, aiTips } from '@/data/resources'
import type { GitHubRepo, AIModel } from '@/data/resources'
import { ResourcesHero } from '@/components/ui/ResourcesHero'

/* ─── Copy button ───────────────────────────────────────── */
function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false)
  return (
    <button
      onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000) }}
      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all shrink-0"
      style={{ background: ok ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)', color: ok ? '#22c55e' : 'rgba(255,255,255,0.4)', border: `1px solid ${ok ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.07)'}` }}>
      {ok ? <Check size={11} /> : <Copy size={11} />}
      {ok ? 'Copied' : 'Copy'}
    </button>
  )
}

/* ─── FadeUp ─────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>
      {children}
    </div>
  )
}

/* ─── MODEL CARD ─────────────────────────────────────────── */
function ModelCard({ m, lang }: { m: AIModel; lang: 'vi' | 'en' }) {
  const [hov, setHov] = useState(false)

  // visual "benchmark bars" per model
  const bars: Record<string, [number, number, number]> = {
    'claude-sonnet': [96, 92, 88],
    'gemini-flash':  [78, 98, 72],
    'gpt4o':         [88, 85, 90],
    'llama':         [80, 75, 70],
    'deepseek':      [91, 79, 88],
    'suno':          [60, 95, 50],
  }
  const [reasoning, speed, creative] = bars[m.id] ?? [80, 80, 80]

  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-default transition-all duration-300"
      style={{
        background: '#0f0f1a',
        border: `1px solid ${hov ? m.color + '35' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hov ? `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${m.color}20` : '0 2px 16px rgba(0,0,0,0.3)',
        transform: hov ? 'translateY(-4px)' : 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Visual header */}
      <div className="relative h-32 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${m.color}18 0%, ${m.color}08 60%, #0a0a14 100%)` }}>
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle 100px at 50% 80%, ${m.color}20 0%, transparent 70%)` }} />
        {/* Accent line top */}
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${m.color}, transparent)`, opacity: hov ? 1 : 0.4, transition: 'opacity 0.3s' }} />

        {/* Model initial/logo */}
        <div className="relative flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl font-black text-xl"
            style={{ background: `${m.color}22`, border: `1px solid ${m.color}40`, color: m.color, fontFamily: 'monospace' }}>
            {m.name.slice(0, 2)}
          </div>
          {/* Tag badge */}
          <span className="rounded-full px-3 py-0.5 text-[10px] font-bold"
            style={{ background: `${m.tagColor}18`, color: m.tagColor, border: `1px solid ${m.tagColor}30` }}>
            {m.tag}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-white text-sm leading-tight">{m.name}</h3>
          <a href={m.url} target="_blank" rel="noopener noreferrer"
            className="shrink-0 flex h-6 w-6 items-center justify-center rounded-lg transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.3)' }}
            onClick={e => e.stopPropagation()}>
            <ExternalLink size={11} />
          </a>
        </div>
        <p className="text-[11px] text-white/30 mb-3">{m.provider}</p>
        <p className="text-xs text-white/45 leading-relaxed mb-4 flex-1">{m.bestFor[lang]}</p>

        {/* Mini benchmark bars */}
        <div className="space-y-2 mb-4">
          {[['Reasoning', reasoning, m.color], ['Speed', speed, '#22c55e'], ['Creative', creative, '#a855f7']].map(([label, val, col]) => (
            <div key={label as string} className="flex items-center gap-2">
              <span className="text-[9px] text-white/25 w-14 shrink-0">{label as string}</span>
              <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: hov ? `${val}%` : '0%', background: col as string }} />
              </div>
              <span className="text-[9px] font-mono" style={{ color: col as string }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Specs */}
        <div className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <span className="text-[10px] text-white/25">{m.contextWindow}</span>
          <span className="text-[10px] font-semibold" style={{ color: m.color }}>{m.pricing}</span>
        </div>

        {/* Strengths chips */}
        <div className="mt-3 flex flex-wrap gap-1">
          {m.strengths.slice(0, 3).map(s => (
            <span key={s} className="rounded-md px-2 py-0.5 text-[9px]"
              style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── REPO CARD ──────────────────────────────────────────── */
function RepoCard({ repo, lang }: { repo: GitHubRepo; lang: 'vi' | 'en' }) {
  const [hov, setHov] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const previewLines = [
    `$ ${repo.install.slice(0, 46)}${repo.install.length > 46 ? '...' : ''}`,
    `↳ Installing ${repo.displayName}...`,
    `✓ Ready`,
  ]

  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: '#0f0f1a',
        border: `1px solid ${hov ? repo.color + '35' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hov ? `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${repo.color}18` : '0 2px 16px rgba(0,0,0,0.3)',
        transform: hov ? 'translateY(-4px)' : 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Visual header — terminal preview */}
      <div className="relative h-36 overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${repo.color}10 0%, #08080f 100%)` }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${repo.color}, transparent)`, opacity: hov ? 1 : 0.35, transition: 'opacity 0.3s' }} />

        {/* Terminal window */}
        <div className="absolute inset-x-4 top-5 rounded-lg overflow-hidden"
          style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-1.5 px-3 py-1.5" style={{ background: 'rgba(255,255,255,0.03)' }}>
            {['#ef4444', '#f59e0b', '#22c55e'].map(c => <div key={c} style={{ width: 6, height: 6, borderRadius: '50%', background: c, opacity: 0.7 }} />)}
            <span className="ml-1 text-[9px] text-white/20 font-mono">terminal</span>
          </div>
          <div className="px-3 py-2">
            {previewLines.map((l, i) => (
              <div key={i} className="text-[9px] font-mono leading-relaxed"
                style={{ color: i === 0 ? '#e2e8f0' : i === 2 ? '#22c55e' : 'rgba(255,255,255,0.35)' }}>
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* Stars badge */}
        <div className="absolute bottom-3 right-4 flex items-center gap-1 rounded-full px-2 py-0.5"
          style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Star size={9} className="text-amber-400" fill="currentColor" />
          <span className="text-[9px] font-bold text-amber-400">{repo.stars}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider"
              style={{ color: repo.color }}>{repo.category}</span>
            <h3 className="font-bold text-white text-base leading-tight mt-0.5">{repo.displayName}</h3>
          </div>
          <a href={repo.url} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <ArrowUpRight size={13} />
          </a>
        </div>

        <p className="text-xs text-white/55 font-semibold mb-2 leading-snug">{repo.tagline[lang]}</p>
        <p className="text-xs text-white/35 leading-relaxed mb-4 flex-1 line-clamp-3">{repo.desc[lang]}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {repo.tags.slice(0, 4).map(t => (
            <span key={t} className="rounded-md px-2 py-0.5 text-[9px]"
              style={{ background: `${repo.color}10`, color: `${repo.color}99`, border: `1px solid ${repo.color}20` }}>
              {t}
            </span>
          ))}
        </div>

        {/* Killer feature */}
        <div className="mb-4 rounded-xl px-3 py-2.5 text-[11px] leading-relaxed"
          style={{ background: `${repo.color}08`, border: `1px solid ${repo.color}15`, color: 'rgba(255,255,255,0.45)' }}>
          {repo.killer[lang]}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-xs font-semibold transition-all"
          style={{
            background: expanded ? `${repo.color}12` : 'rgba(255,255,255,0.03)',
            color: expanded ? repo.color : 'rgba(255,255,255,0.3)',
            border: `1px solid ${expanded ? repo.color + '25' : 'rgba(255,255,255,0.05)'}`,
          }}>
          <div className="flex items-center gap-2">
            <Terminal size={11} />
            <span>Quick setup</span>
          </div>
          <ChevronDown size={12} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
        </button>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-bold uppercase tracking-wider text-white/25">Install</span>
                <CopyBtn text={repo.install} />
              </div>
              <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <pre className="px-4 py-3 text-[10px] text-emerald-400 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">{repo.install}</pre>
              </div>
            </div>

            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-2 block">Steps</span>
              <ol className="space-y-2">
                {repo.steps[lang].map((step, i) => (
                  <li key={i} className="flex gap-3 text-xs text-white/40 leading-relaxed">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px] font-black mt-0.5"
                      style={{ background: `${repo.color}20`, color: repo.color }}>{i + 1}</span>
                    <span className="font-mono">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── PROMPT CARD ────────────────────────────────────────── */
function PromptCard({ p, lang }: { p: typeof prompts[number]; lang: 'vi' | 'en' }) {
  const [hov, setHov] = useState(false)
  const [open, setOpen] = useState(false)

  const preview = p.prompt.slice(0, 120).trim()

  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: '#0f0f1a',
        border: `1px solid ${hov ? p.categoryColor + '35' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hov ? `0 16px 50px rgba(0,0,0,0.45), 0 0 0 1px ${p.categoryColor}15` : '0 2px 12px rgba(0,0,0,0.3)',
        transform: hov ? 'translateY(-3px)' : 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Visual header — prompt preview */}
      <div className="relative h-28 overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${p.categoryColor}12 0%, #080810 100%)` }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${p.categoryColor}, transparent)`, opacity: hov ? 1 : 0.3, transition: 'opacity 0.3s' }} />
        <div className="absolute inset-x-4 inset-y-3 rounded-lg px-3 py-2 overflow-hidden"
          style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-[9px] font-mono text-white/40 leading-relaxed line-clamp-4">{preview}...</p>
        </div>
        <div className="absolute bottom-2 right-4">
          <span className="rounded-full px-2 py-0.5 text-[9px] font-bold"
            style={{ background: `${p.categoryColor}20`, color: p.categoryColor, border: `1px solid ${p.categoryColor}30` }}>
            {p.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-white text-sm mb-1 leading-tight">{p.title[lang]}</h3>
        <p className="text-xs text-white/35 mb-3 leading-relaxed flex-1">{p.desc[lang]}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {p.tags.slice(0, 2).map(t => (
              <span key={t} className="text-[9px] rounded px-1.5 py-0.5"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.05)' }}>
                {t}
              </span>
            ))}
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="text-[11px] font-semibold transition-colors"
            style={{ color: open ? p.categoryColor : 'rgba(255,255,255,0.3)' }}>
            {open ? 'Collapse' : 'View prompt'}
          </button>
        </div>

        {open && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] uppercase tracking-wider font-bold text-white/20">Full prompt</span>
              <CopyBtn text={p.prompt} />
            </div>
            <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <pre className="px-4 py-3 text-[10px] text-white/55 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-60">{p.prompt}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── TIP CARD ───────────────────────────────────────────── */
function TipCard({ tip, lang }: { tip: typeof aiTips[number]; lang: 'vi' | 'en' }) {
  const [hov, setHov] = useState(false)
  const levelColor = tip.level === 'beginner' ? '#22c55e' : tip.level === 'intermediate' ? '#f59e0b' : '#ef4444'
  const levelBg = tip.level === 'beginner' ? 'rgba(34,197,94,0.1)' : tip.level === 'intermediate' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)'

  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: '#0f0f1a',
        border: `1px solid ${hov ? tip.color + '30' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hov ? `0 16px 50px rgba(0,0,0,0.45)` : '0 2px 12px rgba(0,0,0,0.3)',
        transform: hov ? 'translateY(-3px)' : 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Visual header */}
      <div className="relative h-24 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${tip.color}12 0%, #080810 100%)` }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${tip.color}, transparent)`, opacity: hov ? 0.8 : 0.2, transition: 'opacity 0.3s' }} />
        {/* Big icon via semantic SVG mapping — fallback to colored initial */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
          style={{ background: `${tip.color}18`, border: `1px solid ${tip.color}30`, fontSize: 24 }}>
          <span style={{ filter: 'grayscale(0.2)' }}>{tip.icon}</span>
        </div>
        <div className="absolute bottom-2 right-3">
          <span className="rounded-full px-2 py-0.5 text-[9px] font-bold capitalize"
            style={{ background: levelBg, color: levelColor, border: `1px solid ${levelColor}25` }}>
            {tip.level}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-white text-sm mb-2 leading-tight">{tip.title[lang]}</h3>
        <p className="text-xs text-white/38 leading-relaxed">{tip.body[lang]}</p>
      </div>
    </div>
  )
}

/* ─── Section heading ─────────────────────────────────────── */
function SectionHead({ label, title, count, color = '#6366f1' }: { label: string; title: string; count: number; color?: string }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="h-px w-6" style={{ background: color }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color }}>{label}</span>
        </div>
        <h2 className="text-2xl font-black text-white">{title}</h2>
      </div>
      <span className="rounded-full px-3 py-1 text-xs font-bold"
        style={{ background: `${color}10`, color: `${color}80`, border: `1px solid ${color}20` }}>
        {count} items
      </span>
    </div>
  )
}

/* ─── Main page ───────────────────────────────────────────── */
type Filter = 'all' | 'models' | 'repos' | 'prompts' | 'tips'

const FILTER_OPTIONS: { key: Filter; labelVi: string; labelEn: string; count: number; color: string }[] = [
  { key: 'all',     labelVi: 'Tất cả',        labelEn: 'All',           count: aiModels.length + githubRepos.length + prompts.length + aiTips.length, color: '#6366f1' },
  { key: 'models',  labelVi: 'AI Models',      labelEn: 'AI Models',     count: aiModels.length,    color: '#8b5cf6' },
  { key: 'repos',   labelVi: 'GitHub Repos',   labelEn: 'GitHub Repos',  count: githubRepos.length, color: '#3b82f6' },
  { key: 'prompts', labelVi: 'Prompt Library', labelEn: 'Prompt Library', count: prompts.length,    color: '#f59e0b' },
  { key: 'tips',    labelVi: 'Tips & Tricks',  labelEn: 'Tips & Tricks', count: aiTips.length,      color: '#10b981' },
]

export default function ResourcesPage() {
  const { lang } = useLang()
  const [filter, setFilter] = useState<Filter>('all')
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 60) }, [])

  const show = (key: Filter) => filter === 'all' || filter === key

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#08080f' }}>
      <Navbar />
      <main className="flex-1">

        {/* ── HERO ── */}
        <ResourcesHero
          title={lang === 'vi' ? 'Tài Nguyên AI' : 'AI Toolkit'}
          subtitle={
            lang === 'vi'
              ? 'GitHub repos hay nhất, AI models thực chiến, prompt templates và tips từ đội ngũ SOLAI — đủ để bắt đầu xây sản phẩm ngay hôm nay.'
              : 'Top GitHub repos, production AI models, prompt templates and tips from the SOLAI team — everything to start building today.'
          }
          eyebrowLabel={lang === 'vi' ? 'open --resources' : 'open --resources'}
          stats={[
            { n: aiModels.length, label: 'AI Models', color: '#8b5cf6' },
            { n: githubRepos.length, label: 'GitHub Repos', color: '#3b82f6' },
            { n: prompts.length, label: 'Prompts', color: '#f59e0b' },
            { n: aiTips.length, label: 'Tips', color: '#10b981' },
          ]}
        />

        {/* ── STICKY FILTER BAR ── */}
        <div className="sticky top-16 z-30"
          style={{ background: 'rgba(8,8,15,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
              {FILTER_OPTIONS.map(opt => {
                const active = filter === opt.key
                const label = lang === 'vi' ? opt.labelVi : opt.labelEn
                return (
                  <button
                    key={opt.key}
                    onClick={() => setFilter(opt.key)}
                    className="shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200"
                    style={{
                      background: active ? `${opt.color}18` : 'transparent',
                      color: active ? opt.color : 'rgba(255,255,255,0.35)',
                      border: `1px solid ${active ? opt.color + '35' : 'rgba(255,255,255,0.06)'}`,
                      boxShadow: active ? `0 0 16px ${opt.color}15` : 'none',
                    }}>
                    {label}
                    <span className="rounded-full px-1.5 py-px text-[9px] font-bold"
                      style={{ background: active ? `${opt.color}25` : 'rgba(255,255,255,0.05)', color: active ? opt.color : 'rgba(255,255,255,0.2)' }}>
                      {opt.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="mx-auto max-w-7xl px-4 py-14 space-y-20">

          {/* AI MODELS */}
          {show('models') && (
            <FadeUp>
              <SectionHead
                label={lang === 'vi' ? 'Mô hình AI' : 'AI Models'}
                title={lang === 'vi' ? 'Models được dùng trong sản phẩm thực' : 'Models used in production'}
                count={aiModels.length}
                color="#8b5cf6"
              />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {aiModels.map((m, i) => (
                  <FadeUp key={m.id} delay={i * 50}>
                    <ModelCard m={m} lang={lang} />
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          )}

          {/* GITHUB REPOS */}
          {show('repos') && (
            <FadeUp>
              <SectionHead
                label="GitHub"
                title={lang === 'vi' ? 'Open-source repos đáng Star nhất' : 'Best open-source repos to star'}
                count={githubRepos.length}
                color="#3b82f6"
              />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {githubRepos.map((repo, i) => (
                  <FadeUp key={repo.id} delay={i * 50}>
                    <RepoCard repo={repo} lang={lang} />
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          )}

          {/* PROMPTS */}
          {show('prompts') && (
            <FadeUp>
              <SectionHead
                label="Prompts"
                title={lang === 'vi' ? 'Template prompt copy-paste ngay' : 'Copy-paste prompt templates'}
                count={prompts.length}
                color="#f59e0b"
              />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {prompts.map((p, i) => (
                  <FadeUp key={p.id} delay={i * 50}>
                    <PromptCard p={p} lang={lang} />
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          )}

          {/* TIPS */}
          {show('tips') && (
            <FadeUp>
              <SectionHead
                label="Tips"
                title={lang === 'vi' ? 'Mẹo AI thực chiến từ đội ngũ' : 'Practical AI tips from the team'}
                count={aiTips.length}
                color="#10b981"
              />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {aiTips.map((tip, i) => (
                  <FadeUp key={tip.id} delay={i * 40}>
                    <TipCard tip={tip} lang={lang} />
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          )}

        </div>
      </main>
      <Footer />
    </div>
  )
}
