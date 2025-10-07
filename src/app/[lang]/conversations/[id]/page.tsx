import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations, type Locale } from '@/locales'
import { MessageList } from '@/components/MessageList'

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang, id } = await params
  const conversationId = Number(id)

  if (isNaN(conversationId)) {
    notFound()
  }

  const t = getTranslations(lang as Locale)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
        <header className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Link href={`/${lang}`} className="text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">{t.app.title}</h1>
          </div>
        </header>
        <MessageList lang={lang as Locale} conversationId={conversationId} />
      </div>
    </div>
  )
}
