'use client';

import { HeaderNav, headerNavAtom } from '@/atoms/header-nav';
import { User, userAtom } from '@/atoms/user';
import { useSetAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { useEffect } from 'react';

interface StoreHydrateProps {
  user: User;
}

const StoreHydrate: React.FC<StoreHydrateProps> = ({ user }) => {
  useHydrateAtoms([[userAtom, user]]);
  return null;
};

export default StoreHydrate;

export const HeaderNavProvider: React.FC<{ navs: HeaderNav[] }> = ({
  navs,
}) => {
  const setHeaderNav = useSetAtom(headerNavAtom);
  useEffect(() => {
    setHeaderNav(navs);
  }, [navs, setHeaderNav]);
  return null;
};
