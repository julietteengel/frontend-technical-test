import {
  conversationsResponseSchema,
  messagesResponseSchema,
  usersResponseSchema,
  type Conversation,
  type Message,
  type User,
} from './schemas'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === 'production'
    ? (() => { throw new Error('NEXT_PUBLIC_API_URL is required in production') })()
    : 'http://localhost:3005')

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }
  return response.json()
}

export async function getConversations(userId: number): Promise<Conversation[]> {
  const data = await apiRequest<Conversation[]>(`/conversations?senderId=${userId}`)
  return conversationsResponseSchema.parse(data)
}

export async function getMessages(conversationId: number): Promise<Message[]> {
  const data = await apiRequest<Message[]>(`/messages/${conversationId}`)
  return messagesResponseSchema.parse(data)
}

export async function sendMessage(
  conversationId: number,
  authorId: number,
  body: string
): Promise<void> {
  await apiRequest('/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      conversationId,
      authorId,
      body,
      timestamp: Math.floor(Date.now() / 1000),
    }),
  })
}

export async function getUsers(): Promise<User[]> {
  const data = await apiRequest<User[]>('/users')
  return usersResponseSchema.parse(data)
}

export async function createConversation(
  senderId: number,
  recipientId: number
): Promise<Conversation> {
  return apiRequest<Conversation>('/conversations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ senderId, recipientId }),
  })
}
