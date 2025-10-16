'use client'

import { ConversationListWithModal } from '@/components/ConversationListWithModal'
import { useLocale } from '@/contexts/LocaleContext'

export default function Home() {
  const { t } = useLocale()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white shadow-lg min-h-screen">
        <header className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">{t.app.title}</h1>
        </header>
        <main>
          <ConversationListWithModal />
        </main>
      </div>
    </div>
  )
}
