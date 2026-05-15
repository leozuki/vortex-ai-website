'use client'

import { useState } from 'react'
import { Send, MessageSquare, Calendar, Settings2, Rocket } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { products } from '@/data/products'

const VALUE_ICONS = [MessageSquare, Calendar, Settings2, Rocket]

export function ContactSection() {
  const { t, lang } = useLang()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      product: (form.elements.namedItem('product') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="relative py-28 px-4"
      style={{
        background:
          'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(99,102,241,0.1) 0%, transparent 60%), #0a0a0f',
      }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-14 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            {t.contact.heading}
          </div>
          <h2 className="mb-3 text-3xl font-black text-white md:text-5xl">
            Sẵn sàng{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              hợp tác?
            </span>
          </h2>
          <p className="text-zinc-400">{t.contact.subheading}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          {/* Left panel */}
          <div className="space-y-4">
            {t.contact.valueProps.map((prop, i) => {
              const Icon = VALUE_ICONS[i]
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-white/10 hover:bg-white/[0.04]"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: 'rgba(99,102,241,0.15)' }}
                  >
                    <Icon size={18} className="text-indigo-400" />
                  </div>
                  <span className="pt-0.5 text-sm text-zinc-300">{prop}</span>
                </div>
              )
            })}

            {/* Contact info */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
              <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">Contact</div>
              <div className="space-y-1.5 text-sm text-zinc-400">
                <div>📍 Vietnam · Remote-ready</div>
                <div>🌐 vortexai.vn</div>
                <div>📬 hello@vortexai.vn</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className="rounded-2xl border border-white/5 p-7"
            style={{ background: 'linear-gradient(160deg, #111118 0%, #0d0d14 100%)' }}
          >
            {submitted ? (
              <div className="flex h-full min-h-48 items-center justify-center">
                <div className="text-center">
                  <div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl"
                    style={{ background: 'rgba(16,185,129,0.15)' }}
                  >
                    ✅
                  </div>
                  <p className="text-lg font-bold text-white">{t.contact.form.success}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                      {t.contact.form.name}
                    </label>
                    <input
                      name="name"
                      required
                      type="text"
                      className="w-full rounded-xl border border-white/8 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-indigo-500/60 focus:bg-white/8 focus:ring-1 focus:ring-indigo-500/20"
                      placeholder="Nguyen Van A"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                      {t.contact.form.email}
                    </label>
                    <input
                      name="email"
                      required
                      type="email"
                      className="w-full rounded-xl border border-white/8 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-indigo-500/60 focus:bg-white/8 focus:ring-1 focus:ring-indigo-500/20"
                      placeholder="email@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                    {t.contact.form.company}
                  </label>
                  <input
                    name="company"
                    type="text"
                    className="w-full rounded-xl border border-white/8 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-indigo-500/60 focus:bg-white/8 focus:ring-1 focus:ring-indigo-500/20"
                    placeholder="Company Inc."
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                    {t.contact.form.product}
                  </label>
                  <select
                    name="product"
                    className="w-full rounded-xl border border-white/8 bg-[#1a1a24] px-4 py-2.5 text-sm text-white outline-none transition-all focus:border-indigo-500/60"
                  >
                    <option value="">{t.contact.form.productPlaceholder}</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full resize-none rounded-xl border border-white/8 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-indigo-500/60 focus:bg-white/8 focus:ring-1 focus:ring-indigo-500/20"
                    placeholder={lang === 'vi' ? 'Mô tả nhu cầu của bạn...' : 'Describe your needs...'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg active:scale-95 disabled:opacity-60"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    boxShadow: '0 0 20px rgba(99,102,241,0.25)',
                  }}
                >
                  <Send size={16} />
                  {loading ? t.contact.form.submitting : t.contact.form.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
