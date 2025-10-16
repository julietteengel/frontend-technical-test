import { z } from 'zod'
import { defaultLocale, type Locale } from '@/locales'

export const localeSchema = z.enum(['en', 'fr'])

export function validateLocale(lang: string): Locale {
  const result = localeSchema.safeParse(lang)
  return result.success ? result.data : defaultLocale
}
