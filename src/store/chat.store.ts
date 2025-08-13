import { create } from 'zustand'

interface Message { id: string; content: string; senderId: string; createdAt: string }
interface ChatState {
  messages: Record<string, Message[]>
  addMessage: (convId: string, msg: Message) => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: {},
  addMessage: (convId, msg) => set(s => ({ messages: { ...s.messages, [convId]: [...(s.messages[convId] || []), msg] } }))
}))
