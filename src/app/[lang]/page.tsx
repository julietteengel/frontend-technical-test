import { getTranslations, type Locale } from '@/locales'
import { ConversationListWithModal } from '@/components/ConversationListWithModal'

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const t = getTranslations(lang as Locale)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white shadow-lg min-h-screen">
        <header className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">{t.app.title}</h1>
        </header>
        <ConversationListWithModal lang={lang as Locale} />
      </div>
    </div>
  )
}
