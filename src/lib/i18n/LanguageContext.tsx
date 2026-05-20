'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import t, { Lang, Translations } from './translations'

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  T: Translations
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'fr',
  setLang: () => {},
  T: t.fr,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('mmi_lang') as Lang | null
    if (saved === 'en' || saved === 'fr') setLangState(saved)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('mmi_lang', l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, T: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
