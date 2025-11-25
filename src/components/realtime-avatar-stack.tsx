'use client';

import { presenceAtom } from '@/atoms/presence';
import { AvatarStack } from '@/components/avatar-stack';
import { useAtomValue } from 'jotai';

export const RealtimeAvatarStack = () => {
  const users = useAtomValue(presenceAtom);

  return (
    <AvatarStack
      avatars={users.map(user => ({ name: user.name, image: user.avatar }))}
    />
  );
};
