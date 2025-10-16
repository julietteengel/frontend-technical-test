export const CONFIG = {
  API: {
    BASE_URL:
      process.env.NEXT_PUBLIC_API_URL ??
      (process.env.NODE_ENV === 'production'
        ? (() => {
            throw new Error('NEXT_PUBLIC_API_URL is required in production')
          })()
        : 'http://localhost:3005'),
  },
  CACHE: {
    USERS_STALE_TIME: 60000, // 1 minute
    CONVERSATIONS_STALE_TIME: 30000, // 30 seconds
    MESSAGES_STALE_TIME: 1000, // 1 second
  },
  POLLING: {
    MESSAGES_INTERVAL: 5000, // 5 seconds
  },
} as const
