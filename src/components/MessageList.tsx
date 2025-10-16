'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { getMessages } from '@/lib/api'
import { getLoggedUserId } from '@/utils/getLoggedUserId'
import { useLocale } from '@/contexts/LocaleContext'
import { Avatar } from './Avatar'
import { MessageListSkeleton } from './LoadingSkeleton'
import { ErrorMessage } from './ErrorMessage'
import { MessageInput } from './MessageInput'
import { formatTime } from '@/lib/utils'
import { sanitize } from '@/lib/sanitize'

interface MessageListProps {
  conversationId: number
}

export function MessageList({ conversationId }: MessageListProps) {
  const { locale, t } = useLocale()
  const loggedUserId = getLoggedUserId()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { data: messages, isLoading, error, refetch } = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => getMessages(conversationId),
    refetchInterval: (query) => {
      // Only poll when tab is visible and query succeeded
      return document.visibilityState === 'visible' ? 5000 : false
    },
    staleTime: 1000,
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (isLoading) {
    return <MessageListSkeleton />
  }

  if (error) {
    return (
      <div className="flex-1 p-4">
        <ErrorMessage
          message={t.messages.loadError}
          onRetry={() => refetch()}
        />
      </div>
    )
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-4" role="log" aria-live="polite" aria-label="Messages">
        {!messages || messages.length === 0 ? (
          <div className="text-center text-gray-500">{t.messages.noMessages}</div>
        ) : (
          messages.map((message) => {
            const isOwnMessage = message.authorId === loggedUserId
            return (
              <div
                key={message.id}
                className={`flex gap-2 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
                role="article"
                aria-label={`Message from ${isOwnMessage ? 'you' : 'other user'}`}
              >
                <Avatar
                  nickname={isOwnMessage ? t.messages.you : t.messages.other}
                  userId={message.authorId}
                  size="sm"
                />
                <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
                  <p className="text-xs text-gray-500 mb-1">
                    {formatTime(message.timestamp * 1000, locale)}
                  </p>
                  <div
                    className={`rounded-2xl px-4 py-2 max-w-xs break-words ${
                      isOwnMessage
                        ? 'bg-chat-sent text-white'
                        : 'bg-chat-received text-gray-900'
                    }`}
                  >
                    {sanitize(message.body)}
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput conversationId={conversationId} />
    </>
  )
}
