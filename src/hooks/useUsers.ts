import { useQuery } from '@tanstack/react-query'
import { getUsers } from '@/lib/api'
import { CONFIG } from '@/config/constants'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: CONFIG.CACHE.USERS_STALE_TIME,
  })
}
