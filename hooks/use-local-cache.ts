'use client'
import { useCallback, useState } from 'react'
import { cacheKey, Message, mergeMessages, safeParse } from '@/lib/supabase/client'
export function useLocalCache(roomId: string) { const [cached, setCached] = useState<Message[]>(() => { if (typeof window === 'undefined') return []; try { return safeParse(localStorage.getItem(cacheKey(roomId))) } catch { return [] } }); const write = useCallback((messages: Message[]) => { const next = mergeMessages(messages); setCached(next); try { localStorage.setItem(cacheKey(roomId), JSON.stringify(next)) } catch {} }, [roomId]); return { cached, write } }
