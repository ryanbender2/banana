'use client';

import { HeaderNavProvider } from '@/lib/jotai';
import { useAtomValue } from 'jotai';
import { serversAtom } from '@/atoms/servers';

const ServersPage: React.FC = () => {
  const servers = useAtomValue(serversAtom);

  console.log(servers);

  return (
    <div>
      <HeaderNavProvider
        navs={[
          {
            title: 'Servers',
            href: '/servers',
          },
        ]}
      />
    </div>
  );
};

export default ServersPage;
