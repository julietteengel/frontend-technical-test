import {
  conversationsResponseSchema,
  messagesResponseSchema,
  usersResponseSchema,
  type Conversation,
  type Message,
  type User,
} from './schemas'

const API_BASE_URL = 'http://localhost:3005'

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
  const data = await apiRequest<Conversation[]>(`/conversations/${userId}`)
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
): Promise<Message> {
  return apiRequest<Message>(`/messages/${conversationId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ authorId, body }),
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
  return apiRequest<Conversation>(`/conversations/${senderId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipientId }),
  })
}
