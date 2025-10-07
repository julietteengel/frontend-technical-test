import { z } from 'zod'

// User schema
export const userSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  token: z.string(),
})

export type User = z.infer<typeof userSchema>

// Message schema
export const messageSchema = z.object({
  id: z.number(),
  conversationId: z.number(),
  authorId: z.number(),
  timestamp: z.number(),
  body: z.string(),
})

export type Message = z.infer<typeof messageSchema>

// Conversation schema
export const conversationSchema = z.object({
  id: z.number(),
  recipientId: z.number(),
  senderId: z.number(),
  lastMessageTimestamp: z.number().optional(),
})

export type Conversation = z.infer<typeof conversationSchema>

// API response schemas
export const conversationsResponseSchema = z.array(conversationSchema)
export const messagesResponseSchema = z.array(messageSchema)
export const usersResponseSchema = z.array(userSchema)

// Form validation schemas
export const sendMessageSchema = z.object({
  body: z.string().min(1, 'Message cannot be empty').max(1000, 'Message too long'),
})

export const createConversationSchema = z.object({
  recipientId: z.coerce.number().positive('Please select a user').min(1, 'Please select a user'),
})

export type CreateConversationForm = z.infer<typeof createConversationSchema>
