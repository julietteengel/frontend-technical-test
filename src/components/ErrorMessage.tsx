'use client'

import { useLocale } from '@/contexts/LocaleContext'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const { t } = useLocale()

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
      <p className="text-red-800 mb-2">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-colors"
          aria-label="Retry loading"
        >
          {t.common.retry}
        </button>
      )}
    </div>
  )
}
