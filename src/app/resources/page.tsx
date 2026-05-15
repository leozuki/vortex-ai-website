'use client'

import { useState } from 'react'
import { Copy, Check, ExternalLink, Star, ChevronDown, Terminal } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useLang } from '@/context/LangContext'
import { aiModels, githubRepos, prompts, aiTips } from '@/data/resources'
import type { GitHubRepo } from '@/data/resources'

const TABS = ['repos', 'models', 'prompts', 'tips'] as const
type Tab = typeof TABS[number]

const TAB_LABELS = {
  vi: { repos: '⭐ GitHub Hay', models: '🤖 Mô hình AI', prompts: '📝 Prompt Library', tips: '💡 Tips & Tricks' },
  en: { repos: '⭐ GitHub Stars', models: '🤖 AI Models', prompts: '📝 Prompt Library', tips: '💡 Tips & Tricks' },
}

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy}
      className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-400 transition-all hover:bg-white/[0.08] hover:text-white shrink-0">
      {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
      {copied ? 'Copied!' : (label ?? 'Copy')}
    </button>
  )
}

function RepoCard({ repo, lang }: { repo: GitHubRepo; lang: 'vi' | 'en' }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-2xl border overflow-hidden transition-all duration-300"
      style={{
        borderColor: expanded ? `${repo.color}30` : 'rgba(255,255,255,0.05)',
        background: expanded
          ? `linear-gradient(160deg, ${repo.color}07 0%, #0e0e18 100%)`
          : 'linear-gradient(160deg, #13131e 0%, #0e0e18 100%)',
      }}>

      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            {/* Category + Stars row */}
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                style={{ background: `${repo.color}18`, color: repo.color, border: `1px solid ${repo.color}30` }}>
                {repo.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-400">
                <Star size={11} fill="currentColor" /> {repo.stars}
              </span>
            </div>

            {/* Name */}
            <h3 className="text-lg font-black text-white leading-tight">{repo.displayName}</h3>
            <p className="text-xs font-mono text-zinc-600 mt-0.5">{repo.name}</p>
          </div>

          {/* GitHub link */}
          <a href={repo.url} target="_blank" rel="noopener noreferrer"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-500 hover:text-white hover:border-white/20 transition-all"
            onClick={(e) => e.stopPropagation()}>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Tagline */}
        <p className="mb-3 text-sm font-semibold text-zinc-200 leading-snug">{repo.tagline[lang]}</p>

        {/* Description */}
        <p className="mb-4 text-xs text-zinc-500 leading-relaxed">{repo.desc[lang]}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.tags.map((t) => (
            <span key={t} className="rounded-md border border-white/[0.05] bg-white/[0.02] px-2 py-0.5 text-[10px] text-zinc-600">{t}</span>
          ))}
        </div>

        {/* Killer feature highlight */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-xs text-zinc-400 leading-relaxed mb-4">
          {repo.killer[lang]}
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-xs font-semibold transition-all"
          style={{
            background: expanded ? `${repo.color}18` : 'rgba(255,255,255,0.04)',
            color: expanded ? repo.color : '#71717a',
            border: `1px solid ${expanded ? repo.color + '30' : 'rgba(255,255,255,0.05)'}`,
          }}>
          <span>{lang === 'vi' ? '📖 Hướng dẫn sử dụng chi tiết' : '📖 Detailed usage guide'}</span>
          <ChevronDown size={14} className="transition-transform duration-300" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }} />
        </button>
      </div>

      {/* Expanded guide */}
      {expanded && (
        <div className="border-t px-5 pb-6 animate-fade-in" style={{ borderColor: `${repo.color}20` }}>

          {/* Install command */}
          <div className="mt-5 mb-5">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-zinc-500">
              <Terminal size={12} />
              {lang === 'vi' ? 'Cài đặt nhanh' : 'Quick install'}
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-white/[0.06] bg-black/40 px-4 py-3">
              <pre className="flex-1 min-w-0 overflow-x-auto text-xs text-emerald-400 font-mono whitespace-pre-wrap leading-relaxed">{repo.install}</pre>
              <CopyButton text={repo.install} />
            </div>
          </div>

          {/* Steps */}
          <div className="mb-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-600">
              {lang === 'vi' ? 'Các bước bắt đầu' : 'Getting started'}
            </p>
            <ol className="space-y-2.5">
              {repo.steps[lang].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black mt-0.5"
                    style={{ background: `${repo.color}20`, color: repo.color }}>
                    {i + 1}
                  </span>
                  <span className="text-xs text-zinc-400 leading-relaxed font-mono">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Use cases */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-600">
              {lang === 'vi' ? 'Dùng để làm gì?' : 'Use cases'}
            </p>
            <ul className="space-y-1.5">
              {repo.useCases[lang].map((uc, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-400 leading-relaxed">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: repo.color }} />
                  {uc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ResourcesPage() {
  const { lang } = useLang()
  const [tab, setTab] = useState<Tab>('repos')
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null)
  const [tipFilter, setTipFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const labels = TAB_LABELS[lang]
  const filteredTips = tipFilter === 'all' ? aiTips : aiTips.filter(t => t.level === tipFilter)

  const categories = ['all', ...Array.from(new Set(githubRepos.map(r => r.category)))]
  const filteredRepos = categoryFilter === 'all' ? githubRepos : githubRepos.filter(r => r.category === categoryFilter)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#09090f' }}>
      <Navbar />
      <main className="flex-1 pt-20">

        {/* Hero */}
        <section className="relative overflow-hidden px-4 py-20 text-center"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.2) 0%, transparent 65%), #09090f' }}>
          <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-indigo-400">
            {lang === 'vi' ? 'Tài nguyên AI' : 'AI Resources'}
          </p>
          <h1 className="mb-4 text-4xl font-black text-white md:text-6xl">
            <span className="grad-text">Components Gallery</span>
          </h1>
          <p className="mx-auto max-w-xl text-zinc-400">
            {lang === 'vi'
              ? 'GitHub repos hay nhất về AI — kèm hướng dẫn tiếng Việt, lệnh cài đặt và use cases thực chiến.'
              : 'Best AI GitHub repos — with Vietnamese guides, install commands, and real-world use cases.'}
          </p>
        </section>

        {/* Tabs */}
        <div className="sticky top-16 z-30 border-b border-white/[0.06]"
          style={{ background: 'rgba(9,9,15,0.92)', backdropFilter: 'blur(16px)' }}>
          <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className="shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all"
                style={{
                  background: tab === t ? 'rgba(99,102,241,0.15)' : 'transparent',
                  color: tab === t ? '#a5b4fc' : '#71717a',
                  border: `1px solid ${tab === t ? 'rgba(99,102,241,0.3)' : 'transparent'}`,
                }}>
                {labels[t]}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-12">

          {/* ── Repos Tab ── */}
          {tab === 'repos' && (
            <div>
              {/* Category filter */}
              <div className="mb-6 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setCategoryFilter(cat)}
                    className="rounded-full border px-3 py-1.5 text-xs font-medium transition-all capitalize"
                    style={{
                      background: categoryFilter === cat ? 'rgba(99,102,241,0.15)' : 'transparent',
                      borderColor: categoryFilter === cat ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.06)',
                      color: categoryFilter === cat ? '#a5b4fc' : '#71717a',
                    }}>
                    {cat === 'all' ? (lang === 'vi' ? `Tất cả (${githubRepos.length})` : `All (${githubRepos.length})`) : cat}
                  </button>
                ))}
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {filteredRepos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} lang={lang} />
                ))}
              </div>
            </div>
          )}

          {/* ── Models Tab ── */}
          {tab === 'models' && (
            <div className="space-y-4">
              <p className="mb-6 text-sm text-zinc-500">
                {lang === 'vi' ? '6 mô hình AI thực chiến được dùng trong các sản phẩm của Vortex AI.' : '6 AI models used in production at Vortex AI products.'}
              </p>
              {aiModels.map((m) => (
                <div key={m.id} className="rounded-2xl border border-white/[0.05] p-6 transition-all hover:border-white/[0.1]"
                  style={{ background: 'linear-gradient(160deg, #13131e 0%, #0e0e18 100%)' }}>
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="text-base font-bold text-white">{m.name}</span>
                        <span className="text-xs text-zinc-600">by {m.provider}</span>
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                          style={{ background: `${m.tagColor}20`, color: m.tagColor }}>
                          {m.tag}
                        </span>
                      </div>
                      <p className="mb-3 text-sm text-zinc-400">{m.bestFor[lang]}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {m.strengths.map((s) => (
                          <span key={s} className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-500">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 text-right text-xs">
                      <div><span className="text-zinc-600">Context: </span><span className="text-zinc-300">{m.contextWindow}</span></div>
                      <div><span className="text-zinc-600">Price: </span><span className="text-zinc-300">{m.pricing}</span></div>
                      <a href={m.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors">
                        <ExternalLink size={11} /> Docs
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Prompts Tab ── */}
          {tab === 'prompts' && (
            <div className="space-y-4">
              <p className="mb-6 text-sm text-zinc-500">
                {lang === 'vi' ? 'Prompt templates thực chiến. Click để xem và copy ngay.' : 'Battle-tested prompt templates. Click to expand and copy.'}
              </p>
              {prompts.map((p) => (
                <div key={p.id} className="rounded-2xl border border-white/[0.05] overflow-hidden transition-all hover:border-white/[0.1]"
                  style={{ background: 'linear-gradient(160deg, #13131e 0%, #0e0e18 100%)' }}>
                  <button className="w-full flex items-center gap-4 p-5 text-left"
                    onClick={() => setExpandedPrompt(expandedPrompt === p.id ? null : p.id)}>
                    <span className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                      style={{ background: `${p.categoryColor}20`, color: p.categoryColor }}>
                      {p.category}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-sm">{p.title[lang]}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{p.desc[lang]}</div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="hidden sm:block text-[10px] text-zinc-600 border border-white/[0.06] rounded px-1.5 py-0.5">{t}</span>
                      ))}
                    </div>
                  </button>
                  {expandedPrompt === p.id && (
                    <div className="border-t border-white/[0.06] animate-fade-in">
                      <div className="flex justify-end px-4 pt-3">
                        <CopyButton text={p.prompt} />
                      </div>
                      <pre className="overflow-x-auto px-5 py-4 text-xs leading-relaxed text-zinc-400 font-mono whitespace-pre-wrap">
                        {p.prompt}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── Tips Tab ── */}
          {tab === 'tips' && (
            <div>
              <div className="mb-6 flex flex-wrap gap-2">
                {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((l) => (
                  <button key={l} onClick={() => setTipFilter(l)}
                    className="rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-all"
                    style={{
                      background: tipFilter === l ? 'rgba(99,102,241,0.15)' : 'transparent',
                      borderColor: tipFilter === l ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.06)',
                      color: tipFilter === l ? '#a5b4fc' : '#71717a',
                    }}>
                    {l === 'all' ? (lang === 'vi' ? 'Tất cả' : 'All') : l}
                  </button>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredTips.map((tip) => (
                  <div key={tip.id} className="rounded-2xl border border-white/[0.05] p-5 transition-all hover:border-white/[0.1]"
                    style={{ background: 'linear-gradient(160deg, #13131e 0%, #0e0e18 100%)' }}>
                    <div className="mb-3 flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
                        style={{ background: `${tip.color}15` }}>
                        {tip.icon}
                      </div>
                      <div>
                        <h3 className="mb-1 text-sm font-bold text-white">{tip.title[lang]}</h3>
                        <span className="rounded-full px-2 py-0.5 text-[9px] font-bold capitalize"
                          style={{
                            background: tip.level === 'beginner' ? '#10b98120' : tip.level === 'intermediate' ? '#f59e0b20' : '#ef444420',
                            color: tip.level === 'beginner' ? '#10b981' : tip.level === 'intermediate' ? '#f59e0b' : '#ef4444',
                          }}>
                          {tip.level}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed text-zinc-400">{tip.body[lang]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
