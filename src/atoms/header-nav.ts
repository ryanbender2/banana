import { atom } from 'jotai';

export interface HeaderNav {
  title: string;
  href: string;
}

export const headerNavAtom = atom<HeaderNav[]>([]);
