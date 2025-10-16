'use client'

import { createContext, useContext, ReactNode } from 'react'
import { getTranslations, type Locale } from '@/locales'

interface LocaleContextType {
  locale: Locale
  t: ReturnType<typeof getTranslations>
}

const LocaleContext = createContext<LocaleContextType | null>(null)

export function LocaleProvider({
  children,
  locale
}: {
  children: ReactNode
  locale: Locale
}) {
  const t = getTranslations(locale)

  return (
    <LocaleContext.Provider value={{ locale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return context
}
