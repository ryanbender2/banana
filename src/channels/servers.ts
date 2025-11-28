'use client';

import { serversAtom } from '@/atoms/servers';
import * as schema from '@/db/schema';
import { supabase } from '@/lib/supabase/client';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { InferSelectModel } from 'drizzle-orm';
import { useSetAtom } from 'jotai';
import { useEffect, useEffectEvent } from 'react';

const SERVERS_CHANNEL = 'servers_room_01';

const subscribe = (
  onEvent: (
    payload: RealtimePostgresChangesPayload<
      InferSelectModel<typeof schema.servers>
    >,
  ) => void,
) =>
  supabase
    .channel(SERVERS_CHANNEL)
    .on<
      InferSelectModel<typeof schema.servers>
    >('postgres_changes', { event: '*', schema: 'public', table: 'servers' }, onEvent)
    .subscribe();

export const ServersStateSetter: React.FC = () => {
  const setServers = useSetAtom(serversAtom);

  const handleEvent = useEffectEvent(
    (
      payload: RealtimePostgresChangesPayload<
        InferSelectModel<typeof schema.servers>
      >,
    ) => {
      switch (payload.eventType) {
        case 'INSERT':
          setServers(prev => [...prev, payload.new]);
          break;
        case 'UPDATE':
          setServers(prev =>
            prev.map(server =>
              server.id === payload.new.id ? payload.new : server,
            ),
          );
          break;
        case 'DELETE':
          setServers(prev =>
            prev.filter(server => server.id !== payload.old.id),
          );
          break;
      }
    },
  );

  useEffect(() => {
    const channel = subscribe(handleEvent);
    return () => {
      channel.unsubscribe();
    };
  }, []);

  return null;
};
