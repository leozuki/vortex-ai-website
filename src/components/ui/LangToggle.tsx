'use client'

import { useLang } from '@/context/LangContext'
import { clsx } from 'clsx'

export function LangToggle() {
  const { lang, setLang } = useLang()

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-sm">
      <button
        onClick={() => setLang('vi')}
        className={clsx(
          'rounded-full px-3 py-1 font-medium transition-all',
          lang === 'vi'
            ? 'bg-indigo-500 text-white shadow'
            : 'text-zinc-400 hover:text-white'
        )}
      >
        VI
      </button>
      <button
        onClick={() => setLang('en')}
        className={clsx(
          'rounded-full px-3 py-1 font-medium transition-all',
          lang === 'en'
            ? 'bg-indigo-500 text-white shadow'
            : 'text-zinc-400 hover:text-white'
        )}
      >
        EN
      </button>
    </div>
  )
}
