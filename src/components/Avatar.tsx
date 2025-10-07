import { getAvatarColor, getInitials } from '@/lib/utils'

interface AvatarProps {
  nickname: string
  userId: number
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({ nickname, userId, size = 'md' }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  }

  return (
    <div
      className={`${sizeClasses[size]} ${getAvatarColor(
        userId
      )} rounded-full flex items-center justify-center font-bold text-white`}
    >
      {getInitials(nickname)}
    </div>
  )
}
