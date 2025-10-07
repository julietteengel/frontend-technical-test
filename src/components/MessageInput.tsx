'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sendMessage } from '@/lib/api'
import { getLoggedUserId } from '@/utils/getLoggedUserId'
import { getTranslations, type Locale } from '@/locales'
import { sendMessageSchema } from '@/lib/schemas'
import type { z } from 'zod'

interface MessageInputProps {
  conversationId: number
  lang: Locale
}

type FormData = z.infer<typeof sendMessageSchema>

export function MessageInput({ conversationId, lang }: MessageInputProps) {
  const t = getTranslations(lang)
  const loggedUserId = getLoggedUserId()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(sendMessageSchema),
  })

  const mutation = useMutation({
    mutationFn: (data: FormData) => sendMessage(conversationId, loggedUserId, data.body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['messages', conversationId] })
      await queryClient.refetchQueries({ queryKey: ['messages', conversationId] })
      reset()
    },
    onError: (error) => {
      console.error('Error sending message:', error)
    },
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border-t border-gray-200 bg-white sticky bottom-0">
      {errors.body && <p className="text-sm text-red-600 mb-2" role="alert">{errors.body.message}</p>}
      {mutation.isError && <p className="text-sm text-red-600 mb-2" role="alert">{t.messages.loadError}</p>}
      <div className="flex gap-2">
        <input
          type="text"
          {...register('body')}
          placeholder={t.messages.inputPlaceholder}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-lbc-orange focus:border-transparent"
          disabled={mutation.isPending}
          aria-label="Message text"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="px-6 py-2 bg-lbc-orange text-white rounded-full hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-lbc-orange focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          {t.messages.send}
        </button>
      </div>
    </form>
  )
}
