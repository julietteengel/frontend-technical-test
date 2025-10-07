import { getTranslations, type Locale } from '@/locales'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
  lang: Locale
}

export function ErrorMessage({ message, onRetry, lang }: ErrorMessageProps) {
  const t = getTranslations(lang)

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-800 mb-2">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          {t.common.retry}
        </button>
      )}
    </div>
  )
}
