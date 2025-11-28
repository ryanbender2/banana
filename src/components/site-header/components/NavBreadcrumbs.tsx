'use client';

import React from 'react';
import { headerNavAtom } from '@/atoms/header-nav';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useAtomValue } from 'jotai';

const NavBreadcrumbs: React.FC = () => {
  const titles = useAtomValue(headerNavAtom);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {titles.map((title, idx) => (
          <React.Fragment key={title.href}>
            <BreadcrumbItem>
              <BreadcrumbLink href={title.href}>{title.title}</BreadcrumbLink>
            </BreadcrumbItem>
            {idx < titles.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavBreadcrumbs;
