'use client';

import { serversAtom } from '@/atoms/servers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { env } from '@/env';
import { HeaderNavProvider } from '@/lib/jotai';
import { useAtomValue } from 'jotai';
import ServerStatus from './_components/ServerStatus';
import { Button } from '@/components/ui/button';

const ServersPage: React.FC = () => {
  const servers = useAtomValue(serversAtom);

  return (
    <>
      <HeaderNavProvider
        navs={[
          {
            title: 'Servers',
            href: '/servers',
          },
        ]}
      />
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {servers.map(server => (
          <Card key={server.id} className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                <ServerStatus status={server.status} />
                {env.NEXT_PUBLIC_SERVER_ADDRESS}:{server.port}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button>Start</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ServersPage;
