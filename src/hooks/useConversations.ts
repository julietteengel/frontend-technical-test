import { useQuery } from '@tanstack/react-query'
import { getConversations } from '@/lib/api'
import { CONFIG } from '@/config/constants'

export function useConversations(userId: number) {
  return useQuery({
    queryKey: ['conversations', userId],
    queryFn: () => getConversations(userId),
    staleTime: CONFIG.CACHE.CONVERSATIONS_STALE_TIME,
  })
}
