'use client'

import Link from 'next/link'
import { getLoggedUserId } from '@/utils/getLoggedUserId'
import { useLocale } from '@/contexts/LocaleContext'
import { useConversations } from '@/hooks/useConversations'
import { useUsers } from '@/hooks/useUsers'

interface ConversationHeaderProps {
  conversationId: number
}

export function ConversationHeader({ conversationId }: ConversationHeaderProps) {
  const { locale, t } = useLocale()
  const loggedUserId = getLoggedUserId()

  const { data: conversations } = useConversations(loggedUserId)
  const { data: users } = useUsers()

  const conversation = conversations?.find(c => c.id === conversationId)
  const otherUserId = conversation?.senderId === loggedUserId
    ? conversation?.recipientId
    : conversation?.senderId
  const otherUser = users?.find(u => u.id === otherUserId)

  return (
    <header className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Link
          href={`/${locale}`}
          className="text-gray-600 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-lbc-orange rounded transition-colors"
          aria-label="Back to conversations"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-gray-900">
          {otherUser?.nickname || t.app.title}
        </h1>
      </div>
    </header>
  )
}
