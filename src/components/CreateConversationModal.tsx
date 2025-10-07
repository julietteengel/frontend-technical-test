'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsers, createConversation, getConversations } from '@/lib/api'
import { getLoggedUserId } from '@/utils/getLoggedUserId'
import { getTranslations, type Locale } from '@/locales'
import { Avatar } from './Avatar'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createConversationSchema, type CreateConversationForm } from '@/lib/schemas'

interface CreateConversationModalProps {
  lang: Locale
  isOpen: boolean
  onClose: () => void
}

export function CreateConversationModal({
  lang,
  isOpen,
  onClose,
}: CreateConversationModalProps) {
  const t = getTranslations(lang)
  const loggedUserId = getLoggedUserId()
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateConversationForm>({
    resolver: zodResolver(createConversationSchema),
    mode: 'onChange',
  })

  const selectedUserId = watch('recipientId')

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: isOpen,
  })

  const { data: conversations } = useQuery({
    queryKey: ['conversations', loggedUserId],
    queryFn: () => getConversations(loggedUserId),
    enabled: isOpen,
  })

  const mutation = useMutation({
    mutationFn: (recipientId: number) =>
      createConversation(loggedUserId, recipientId),
    onSuccess: async (conversation) => {
      await queryClient.invalidateQueries({ queryKey: ['conversations'] })
      reset()
      onClose()
      router.push(`/${lang}/conversations/${conversation.id}`)
    },
  })

  if (!isOpen) return null

  const availableUsers = users?.filter((user) => user.id !== loggedUserId)

  const onSubmit = (data: CreateConversationForm) => {
    // Check if conversation already exists
    const existingConversation = conversations?.find(
      (conv) =>
        (conv.senderId === loggedUserId && conv.recipientId === data.recipientId) ||
        (conv.recipientId === loggedUserId && conv.senderId === data.recipientId)
    )

    if (existingConversation) {
      // Navigate to existing conversation
      reset()
      onClose()
      router.push(`/${lang}/conversations/${existingConversation.id}`)
    } else {
      // Create new conversation
      mutation.mutate(data.recipientId)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      reset()
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 id="modal-title" className="text-xl font-bold text-gray-900">
            {t.conversations.newConversation}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {t.conversations.selectUser}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div className="flex-1 h-4 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {availableUsers?.map((user) => {
                  const isSelected = Number(selectedUserId) === user.id
                  return (
                  <label
                    key={user.id}
                    className={`w-full flex items-center gap-3 p-3 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-lbc-orange/10'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      value={user.id}
                      {...register('recipientId', {
                        setValueAs: (value) => parseInt(value, 10)
                      })}
                      className="sr-only"
                      aria-label={`Select ${user.nickname}`}
                    />
                    <Avatar nickname={user.nickname} userId={user.id} size="sm" />
                    <span className="flex-1 font-medium text-gray-900">
                      {user.nickname}
                    </span>
                    {selectedUserId === user.id && (
                      <svg
                        className="w-5 h-5 text-lbc-orange"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </label>
                  )
                })}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 flex gap-3">
            <button
              type="button"
              onClick={() => {
                reset()
                onClose()
              }}
              disabled={mutation.isPending}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-lbc-orange transition-colors disabled:opacity-50"
              aria-label="Cancel"
            >
              {t.conversations.cancel}
            </button>
            <button
              type="submit"
              disabled={!Number(selectedUserId) || mutation.isPending}
              className="flex-1 px-4 py-2 bg-lbc-orange text-white rounded-lg hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-lbc-orange focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Start conversation"
            >
              {mutation.isPending ? '...' : t.conversations.start}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
