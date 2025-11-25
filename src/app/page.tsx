import { AppSidebar } from '@/components/app-sidebar';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { SectionCards } from '@/components/section-cards';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';

import StateSetters from '@/atoms/StateSetters';
import { User } from '@/atoms/user';
import { RealtimeCursors } from '@/components/realtime-cursors';
import StoreHydrate from '@/lib/jotai';
import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Banana',
  description: 'Banana is a minecraft server manager.',
};

export default async function Home() {
  const supabase = await createClient();

  const { data: authData, error } = await supabase.auth.getClaims();
  if (error || !authData?.claims) {
    redirect('/auth/login');
    return null;
  }

  const authUser = authData.claims;

  const user: User = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    name: authUser.user_metadata?.full_name ?? 'Unknown User',
    email: authUser.email ?? '',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    avatar:
      authUser.user_metadata?.picture ??
      'https://avatar.iran.liara.run/public/11',
  };

  return (
    <>
      <RealtimeCursors roomName="banana_cursors_01" />
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <StoreHydrate user={user} />
      <StateSetters />
    </>
  );
}
