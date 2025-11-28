import {
  RealtimePresenceJoinPayload,
  RealtimePresenceLeavePayload,
} from '@supabase/supabase-js';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useEffectEvent } from 'react';
import { User, userAtom } from './user';
import { supabase } from '@/lib/supabase/client';

export const presenceAtom = atom<User[]>([]);

const room = supabase.channel('banana_room_01');

export const usePresenceSetter = () => {
  const user = useAtomValue(userAtom);
  const setPresence = useSetAtom(presenceAtom);

  const handleSync = useEffectEvent(() => {
    const newState = room.presenceState<User>();
    setPresence(Object.values(newState).flatMap(user => user));
  });

  const handleJoin = useEffectEvent(
    ({ newPresences }: RealtimePresenceJoinPayload<User>) => {
      setPresence(prev => [...prev, ...newPresences]);
    },
  );

  const handleLeave = useEffectEvent(
    ({ leftPresences }: RealtimePresenceLeavePayload<User>) => {
      setPresence(prev =>
        prev.filter(
          user => !leftPresences.map(user => user.email).includes(user.email),
        ),
      );
    },
  );

  useEffect(() => {
    if (!user.email) {
      return;
    }

    const channelSubOne = room
      .on('presence', { event: 'sync' }, handleSync)
      .on('presence', { event: 'join' }, handleJoin)
      .on('presence', { event: 'leave' }, handleLeave)
      .subscribe(async status => {
        if (status !== 'SUBSCRIBED') {
          return;
        }
        await room.track(user);
      });

    return () => {
      channelSubOne.unsubscribe();
      room.untrack();
    };
  }, [user]);
};
