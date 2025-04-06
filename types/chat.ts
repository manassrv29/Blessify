import type { Message } from "ai"

export interface ChatMessage {
  chatId: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

export interface EmotionData {
  primaryEmotion: string
  intensity: number
  distressDetected: boolean
  timestamp: Date
}

export interface ChatSession {
  id: string
  title: string
  lastMessage: string
  lastUpdated: Date
  messages: Message[]
}

