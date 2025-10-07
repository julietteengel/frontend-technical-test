'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { getConversations, getUsers } from '@/lib/api'
import { getLoggedUserId } from '@/utils/getLoggedUserId'
import { getTranslations, type Locale } from '@/locales'

interface ConversationHeaderProps {
  lang: Locale
  conversationId: number
}

export function ConversationHeader({ lang, conversationId }: ConversationHeaderProps) {
  const t = getTranslations(lang)
  const loggedUserId = getLoggedUserId()

  const { data: conversations } = useQuery({
    queryKey: ['conversations', loggedUserId],
    queryFn: () => getConversations(loggedUserId),
    staleTime: 30000,
  })

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 60000,
  })

  const conversation = conversations?.find(c => c.id === conversationId)
  const otherUserId = conversation?.senderId === loggedUserId
    ? conversation?.recipientId
    : conversation?.senderId
  const otherUser = users?.find(u => u.id === otherUserId)

  return (
    <header className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Link
          href={`/${lang}`}
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
