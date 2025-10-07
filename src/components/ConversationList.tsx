'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getConversations, getUsers } from '@/lib/api'
import { formatTime } from '@/lib/utils'
import { getLoggedUserId } from '@/utils/getLoggedUserId'
import { getTranslations, type Locale } from '@/locales'
import { Avatar } from './Avatar'
import { ConversationListSkeleton } from './LoadingSkeleton'
import { ErrorMessage } from './ErrorMessage'

interface ConversationListProps {
  lang: Locale
}

export function ConversationList({ lang }: ConversationListProps) {
  const t = getTranslations(lang)
  const loggedUserId = getLoggedUserId()

  const { data: conversations, isLoading: loadingConvs, error, refetch } = useQuery({
    queryKey: ['conversations', loggedUserId],
    queryFn: () => getConversations(loggedUserId),
  })

  const { data: users, isLoading: loadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  const isLoading = loadingConvs || loadingUsers

  if (isLoading) {
    return <ConversationListSkeleton />
  }

  if (error) {
    return (
      <div className="p-4">
        <ErrorMessage
          message={t.conversations.loadError}
          onRetry={() => refetch()}
          lang={lang}
        />
      </div>
    )
  }

  if (!conversations || conversations.length === 0) {
    return <div className="p-4 text-center text-gray-500">{t.conversations.noConversations}</div>
  }

  return (
    <div className="divide-y divide-gray-200">
      {conversations.map((conversation) => {
        const otherUserId =
          conversation.senderId === loggedUserId
            ? conversation.recipientId
            : conversation.senderId

        const otherUser = users?.find((u) => u.id === otherUserId)

        if (!otherUser) return null

        return (
          <Link
            key={conversation.id}
            href={`/${lang}/conversations/${conversation.id}`}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
          >
            <Avatar nickname={otherUser.nickname} userId={otherUser.id} />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{otherUser.nickname}</p>
              <p className="text-sm text-gray-500">
                {formatTime(conversation.lastMessageTimestamp * 1000, lang)}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
