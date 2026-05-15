'use client'

import { useLang } from '@/context/LangContext'
import { VortexLogoMark, VortexWordmark } from '@/components/ui/VortexLogo'

export function Footer() {
  const { t } = useLang()

  return (
    <footer className="border-t border-white/[0.06]" style={{ background: '#09090f' }}>
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <VortexLogoMark size={38} />
            <div>
              <VortexWordmark size={17} />
              <div className="mt-0.5 text-xs text-zinc-600">{t.footer.tagline}</div>
            </div>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-zinc-600">
            <a href="#products" className="hover:text-zinc-300 transition-colors">{t.footer.links.products}</a>
            <a href="#contact" className="hover:text-zinc-300 transition-colors">{t.footer.links.contact}</a>
          </nav>

          {/* Social — placeholder links */}
          <div className="flex items-center gap-2">
            {['GH', 'LI', 'TW'].map((s) => (
              <a key={s} href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] text-[10px] font-bold text-zinc-600 hover:border-white/20 hover:text-zinc-300 transition-all">
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-white/[0.04] pt-6 text-center text-xs text-zinc-700">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  )
}
