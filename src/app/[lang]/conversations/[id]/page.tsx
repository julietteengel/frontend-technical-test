import { notFound } from 'next/navigation'
import { ConversationHeader } from '@/components/ConversationHeader'
import { MessageList } from '@/components/MessageList'
import type { Locale } from '@/locales'

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
        <ConversationHeader lang={lang as Locale} conversationId={conversationId} />
        <MessageList lang={lang as Locale} conversationId={conversationId} />
      </div>
    </div>
  )
}
