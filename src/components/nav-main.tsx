'use client';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuLink,
} from '@/components/ui/sidebar';
import { type Icon } from '@tabler/icons-react';
import { Separator } from './ui/separator';
import { usePathname } from 'next/navigation';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <Separator />
        <SidebarMenu>
          {items.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuLink
                href={item.url}
                tooltip={item.title}
                isActive={pathname === item.url}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
