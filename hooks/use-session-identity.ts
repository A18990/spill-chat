'use client'
import { useEffect, useState } from 'react'
import { getDisplayName, getSessionId, saveDisplayName } from '@/lib/supabase/client'
export function useSessionIdentity() { const [sessionId, setSessionId] = useState<string | null>(null); const [displayName, setDisplayNameState] = useState<string | null>(null); useEffect(() => { setSessionId(getSessionId()); setDisplayNameState(getDisplayName()) }, []); return { sessionId, displayName, setDisplayName: (name: string) => { saveDisplayName(name); setDisplayNameState(name.trim()) } } }
