'use client';

import {
  IconServer2,
  IconGlobeFilled,
  IconSettings,
} from '@tabler/icons-react';
import * as React from 'react';

import icon from '@/assets/icon.png';
import { userAtom } from '@/atoms/user';
import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';

const data = {
  navMain: [
    {
      title: 'Servers',
      url: '/servers',
      icon: IconServer2,
    },
    {
      title: 'Worlds',
      url: '/worlds',
      icon: IconGlobeFilled,
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '/settings',
      icon: IconSettings,
    },
  ],
};

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const user = useAtomValue(userAtom);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <Image src={icon} alt="Banana" className="size-5!" />
                <span className="text-base font-semibold">Banana</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};
