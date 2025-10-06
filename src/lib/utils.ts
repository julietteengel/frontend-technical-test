import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import DOMPurify from 'isomorphic-dompurify'

/**
 * Format timestamp to relative time (e.g., "il y a 2 heures")
 */
export function formatTime(timestamp: number): string {
  return formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
    locale: fr,
  })
}

/**
 * Sanitize user input to prevent XSS attacks
 */
export function sanitize(dirty: string): string {
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [] })
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
