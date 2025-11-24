'use client'

import { supabase } from "@/utils/supabase";
import { RealtimePresenceState } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const roomOne = supabase.channel('room_01')

export default function Home() {
  const [presenceState, setPresenceState] = useState<RealtimePresenceState | null>(null)

  useEffect(() => {
    const sub = roomOne
      .on('presence', { event: 'sync' }, () => {
        const newState = roomOne.presenceState()
        console.log('sync', newState)
        setPresenceState(newState)
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('join', key, newPresences)
        setPresenceState((prev) => ({ ...prev, [key]: newPresences }))
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('leave', key, leftPresences)
        setPresenceState((prev) => ({ ...prev, [key]: leftPresences }))
      })
      .subscribe()

    return () => {
      sub.unsubscribe()
    }
  }, [])

  return (
    <main>
      <h1>Hello World</h1>
      <pre>{JSON.stringify(presenceState, null, 2)}</pre>
    </main>
  );
}
