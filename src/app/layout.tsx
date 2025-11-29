import StateSetters from '@/atoms/StateSetters';
import { User } from '@/atoms/user';
import { AppSidebar } from '@/components/app-sidebar';
import { RealtimeCursors } from '@/components/realtime-cursors';
import { SiteHeader } from '@/components/site-header';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import StoreHydrate from '@/lib/jotai';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import '../globals.css';
import { ServersStateSetter } from '@/channels/servers';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Banana',
  description: 'Banana is a minecraft server manager.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const referer = headersList.get('x-referer');

  if (referer === '/auth/login') {
    return (
      <html lang="en" suppressHydrationWarning>
        <body>{children}</body>
      </html>
    );
  }

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <StoreHydrate user={user} />
          <ServersStateSetter />
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
              {children}
            </SidebarInset>
          </SidebarProvider>
          <StateSetters />
        </ThemeProvider>
      </body>
    </html>
  );
}
