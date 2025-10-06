import en from './en'
import fr from './fr'

export const locales = { en, fr }
export type Locale = keyof typeof locales
export const defaultLocale: Locale = 'fr'

export function getTranslations(locale: Locale = defaultLocale) {
  return locales[locale]
}
