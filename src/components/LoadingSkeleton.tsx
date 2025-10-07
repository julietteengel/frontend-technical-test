export function ConversationSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 animate-pulse">
      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  )
}

export function ConversationListSkeleton() {
  return (
    <div className="divide-y divide-gray-200">
      {Array.from({ length: 5 }, (_, i) => (
        <ConversationSkeleton key={i} />
      ))}
    </div>
  )
}

export function MessageSkeleton() {
  return (
    <div className="flex gap-2 mb-4 animate-pulse">
      <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
      <div className="flex-1">
        <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-16 bg-gray-300 rounded-2xl w-3/4"></div>
      </div>
    </div>
  )
}

export function MessageListSkeleton() {
  return (
    <div className="flex-1 p-4">
      {Array.from({ length: 5 }, (_, i) => (
        <MessageSkeleton key={i} />
      ))}
    </div>
  )
}
