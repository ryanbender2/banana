import { atom, ExtractAtomValue } from 'jotai';

export const userAtom = atom({
  name: '',
  email: '',
  avatar: '',
});

export type User = ExtractAtomValue<typeof userAtom>;
