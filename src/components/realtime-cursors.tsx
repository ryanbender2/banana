'use client';

import { userAtom } from '@/atoms/user';
import { Cursor } from '@/components/cursor';
import { useRealtimeCursors } from '@/hooks/use-realtime-cursors';
import { useAtomValue } from 'jotai';

const THROTTLE_MS = 40;

export const RealtimeCursors = ({ roomName }: { roomName: string }) => {
  const user = useAtomValue(userAtom);
  const { cursors } = useRealtimeCursors({
    roomName,
    username: user?.name ?? '',
    throttleMs: THROTTLE_MS,
  });

  return (
    <div>
      {Object.keys(cursors).map(id => (
        <Cursor
          key={id}
          className="fixed z-50 transition-transform ease-in-out"
          style={{
            transitionDuration: '20ms',
            top: 0,
            left: 0,
            transform: `translate(${cursors[id].position.x}px, ${cursors[id].position.y}px)`,
          }}
          color={cursors[id].color}
          name={cursors[id].user.name}
        />
      ))}
    </div>
  );
};
