'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Lang, Translations } from '@/types'
import { vi } from '@/i18n/vi'
import { en } from '@/i18n/en'

interface LangContextType {
  lang: Lang
  t: Translations
  setLang: (l: Lang) => void
}

const LangContext = createContext<LangContextType>({
  lang: 'vi',
  t: vi,
  setLang: () => {},
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('vi')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null
    if (stored === 'vi' || stored === 'en') {
      setTimeout(() => setLangState(stored), 0)
    }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  return (
    <LangContext.Provider value={{ lang, t: lang === 'vi' ? vi : en, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
