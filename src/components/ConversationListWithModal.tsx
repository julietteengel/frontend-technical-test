'use client'

import { useState, lazy, Suspense } from 'react'
import { ConversationList } from './ConversationList'
import { useLocale } from '@/contexts/LocaleContext'

const CreateConversationModal = lazy(() =>
  import('./CreateConversationModal').then((mod) => ({
    default: mod.CreateConversationModal,
  }))
)

export function ConversationListWithModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useLocale()

  return (
    <>
      <div className="p-4 border-b border-gray-200 bg-white">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full px-4 py-2 bg-lbc-orange text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          {t.conversations.newConversation}
        </button>
      </div>
      <ConversationList />
      {isModalOpen && (
        <Suspense fallback={null}>
          <CreateConversationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </Suspense>
      )}
    </>
  )
}
