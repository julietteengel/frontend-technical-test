import { useQuery } from '@tanstack/react-query'
import { getMessages } from '@/lib/api'
import { CONFIG } from '@/config/constants'

export function useMessages(conversationId: number) {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => getMessages(conversationId),
    staleTime: CONFIG.CACHE.MESSAGES_STALE_TIME,
    refetchInterval: (query) => {
      return document.visibilityState === 'visible'
        ? CONFIG.POLLING.MESSAGES_INTERVAL
        : false
    },
  })
}
