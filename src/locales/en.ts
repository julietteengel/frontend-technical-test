export default {
  app: {
    title: 'Leboncoin Messages',
  },
  conversations: {
    noConversations: 'No conversations yet',
    loadError: 'Failed to load conversations',
    newConversation: 'New conversation',
    selectUser: 'Select a user',
    cancel: 'Cancel',
    start: 'Start',
  },
  messages: {
    noMessages: 'No messages yet',
    loadError: 'Failed to load messages',
    inputPlaceholder: 'Type a message...',
    send: 'Send',
    you: 'You',
    other: 'Other',
  },
  error: {
    title: "It's not you, it's me",
    description: "Something went wrong on our end. We're working to fix it.",
    tryAgain: 'Try again',
    errorId: 'Error ID',
  },
  common: {
    retry: 'Retry',
  },
  notFound: {
    title: 'Page not found',
    description: "The page you're looking for doesn't exist or has been moved.",
    backHome: 'Back to conversations',
  },
} as const
