'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getTranslations, type Locale } from '@/locales'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const params = useParams()
  const lang = (params.lang as Locale) || 'fr'
  const t = getTranslations(lang)

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-lbc-orange/10 rounded-full mx-auto flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-lbc-orange"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t.error.title}
          </h2>
          <p className="text-gray-600">
            {t.error.description}
          </p>
        </div>

        <button
          onClick={reset}
          className="w-full px-6 py-3 bg-lbc-orange text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
        >
          {t.error.tryAgain}
        </button>

        {error.digest && (
          <p className="mt-4 text-xs text-gray-400">
            {t.error.errorId}: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
