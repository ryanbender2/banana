import { atom } from 'jotai';

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export const userAtom = atom<User>();
