import { formatDistanceToNow, type Locale as DateFnsLocale } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import type { Locale } from '@/locales'

const dateLocales: Record<Locale, DateFnsLocale> = {
  fr: fr,
  en: enUS,
}

/**
 * Format timestamp to relative time (e.g., "2 hours ago" or "il y a 2 heures")
 */
export function formatTime(timestamp: number, locale: Locale = 'fr'): string {
  return formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
    locale: dateLocales[locale],
  })
}

/**
 * Generate consistent avatar color based on user ID
 */
export function getAvatarColor(userId: number): string {
  const colors = [
    'bg-avatar-yellow',
    'bg-avatar-red',
    'bg-avatar-pink',
    'bg-avatar-teal',
    'bg-avatar-blue',
    'bg-avatar-purple',
  ]
  return colors[userId % colors.length]
}

/**
 * Get user initials from nickname
 */
export function getInitials(nickname: string): string {
  return nickname
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
