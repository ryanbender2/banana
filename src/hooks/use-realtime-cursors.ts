import { createClient } from '@/lib/supabase/client';
import {
  RealtimeChannel,
  REALTIME_SUBSCRIBE_STATES,
} from '@supabase/supabase-js';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Throttle a callback to a certain delay, It will only call the callback if the delay has passed, with the arguments
 * from the last call
 */
const useThrottleCallback = <Params extends unknown[]>(
  callback: (...args: Params) => unknown,
  delay: number,
) => {
  const lastCall = useRef(0);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Params) => {
      const now = Date.now();
      const remainingTime = delay - (now - lastCall.current);

      if (remainingTime <= 0) {
        if (timeout.current) {
          clearTimeout(timeout.current);
          timeout.current = null;
        }
        lastCall.current = now;
        callback(...args);
        return;
      }

      timeout.current ??= setTimeout(() => {
        lastCall.current = Date.now();
        timeout.current = null;
        callback(...args);
      }, remainingTime);
    },
    [callback, delay],
  );
};

const supabase = createClient();

const generateRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`;

const generateRandomNumber = () => Math.floor(Math.random() * 100);

const EVENT_NAME = 'realtime-cursor-move';

interface CursorEventPayload {
  position: {
    x: number;
    y: number;
  };
  user: {
    id: number;
    name: string;
  };
  color: string;
  timestamp: number;
}

export const useRealtimeCursors = ({
  roomName,
  username,
  throttleMs,
}: {
  roomName: string;
  username: string;
  throttleMs: number;
}) => {
  const [color] = useState(generateRandomColor());
  const [userId] = useState(generateRandomNumber());
  const [cursors, setCursors] = useState<Record<string, CursorEventPayload>>(
    {},
  );
  const cursorPayload = useRef<CursorEventPayload | null>(null);

  const channelRef = useRef<RealtimeChannel | null>(null);

  const callback = useCallback(
    (event: MouseEvent) => {
      if (!username) {
        return;
      }

      const { clientX, clientY } = event;

      const payload: CursorEventPayload = {
        position: {
          x: clientX,
          y: clientY,
        },
        user: {
          id: userId,
          name: username,
        },
        color: color,
        timestamp: new Date().getTime(),
      };

      cursorPayload.current = payload;

      channelRef.current?.send({
        type: 'broadcast',
        event: EVENT_NAME,
        payload: payload,
      });
    },
    [color, userId, username],
  );

  const handleMouseMove = useThrottleCallback(callback, throttleMs);

  useEffect(() => {
    if (!username) {
      return;
    }

    const channel = supabase.channel(roomName);

    channel
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        leftPresences.forEach(function (element) {
          // Remove cursor when user leaves
          setCursors(prev => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (prev[element.key]) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              delete prev[element.key];
            }

            return { ...prev };
          });
        });
      })
      .on('presence', { event: 'join' }, () => {
        if (!cursorPayload.current) return;

        // All cursors broadcast their position when a new cursor joins
        channelRef.current?.send({
          type: 'broadcast',
          event: EVENT_NAME,
          payload: cursorPayload.current,
        });
      })
      .on(
        'broadcast',
        { event: EVENT_NAME },
        (data: { payload: CursorEventPayload }) => {
          const { user } = data.payload;
          // Don't render your own cursor
          if (user.id === userId) return;

          setCursors(prev => {
            if (prev[userId]) {
              delete prev[userId];
            }

            return {
              ...prev,
              [user.id]: data.payload,
            };
          });
        },
      )
      .subscribe(async status => {
        if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
          await channel.track({ key: userId });
          channelRef.current = channel;
        } else {
          setCursors({});
          channelRef.current = null;
        }
      });

    return () => {
      channel.unsubscribe();
      channelRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    if (!username) {
      return;
    }

    // Add event listener for mousemove
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove, username]);

  return { cursors };
};
