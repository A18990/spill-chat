import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'http://localhost:54321',
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'build-placeholder-key',
)

export type Message = { id: string; room_id: string; sender_name: string; sender_session_id: string; content: string; created_at: string }
export type Room = { id: string; name: string | null; created_at: string }
export const MAX_MESSAGES = 50
export const cacheKey = (roomId: string) => `spillchat_cache_${roomId}`
export const mergeMessages = (messages: Message[]) => Array.from(new Map(messages.map((m) => [m.id, m])).values()).sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at)).slice(-MAX_MESSAGES)
export const safeParse = (value: string | null): Message[] => { try { const parsed = value ? JSON.parse(value) : []; return Array.isArray(parsed) ? parsed : [] } catch { return [] } }
export const formatTime = (value: string) => new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(value))
export const formatDay = (value: string) => new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'short', day: 'numeric' }).format(new Date(value))
export const initials = (name: string) => name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase() || '?'
export const sanitizeName = (value: string) => value.trim().replace(/\s+/g, ' ').slice(0, 32)
export const sanitizeMessage = (value: string) => value.trim().slice(0, 2000)
export const isValidUuid = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
export const isMine = (message: Message, sessionId: string | null) => Boolean(sessionId && message.sender_session_id === sessionId)
export const channelName = (roomId: string) => `spillchat-room-${roomId}`
export const getSessionId = () => { const key = 'spillchat_session_id'; const existing = localStorage.getItem(key); if (existing) return existing; const value = crypto.randomUUID(); localStorage.setItem(key, value); return value }
export const getDisplayName = () => localStorage.getItem('spillchat_display_name')
export const saveDisplayName = (value: string) => localStorage.setItem('spillchat_display_name', sanitizeName(value))
export const roomUrl = (id: string) => `${window.location.origin}/room/${id}`
export const emptyCopy = 'Be the first to spill something.'
