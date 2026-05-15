'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { products } from '@/data/products'

interface DemoModalProps {
  open: boolean
  onClose: () => void
}

export function DemoModal({ open, onClose }: DemoModalProps) {
  const { t, lang } = useLang()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setSubmitted(false)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#111118] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-zinc-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mb-4 text-4xl">🎉</div>
            <p className="text-lg font-medium text-white">{t.demo.success}</p>
          </div>
        ) : (
          <>
            <h2 className="mb-1 text-xl font-bold text-white">{t.demo.title}</h2>
            <p className="mb-6 text-sm text-zinc-400">{t.demo.subheading}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-zinc-300">{t.demo.name}</label>
                <input
                  required
                  type="text"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="Nguyen Van A"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-300">{t.demo.email}</label>
                <input
                  required
                  type="email"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="email@company.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-300">{t.demo.productInterest}</label>
                <select
                  className="w-full rounded-lg border border-white/10 bg-[#1a1a24] px-4 py-2.5 text-white focus:border-indigo-500 focus:outline-none transition-colors"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 py-3 font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {loading ? t.demo.submitting : t.demo.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
