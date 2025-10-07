export interface Conversation {
  id: number
  recipientId: number
  senderId: number
  lastMessageTimestamp?: number
}