'use client';

import { User, userAtom } from '@/atoms/user';
import { useHydrateAtoms } from 'jotai/utils';

interface StoreHydrateProps {
  user: User;
}

const StoreHydrate: React.FC<StoreHydrateProps> = ({ user }) => {
  useHydrateAtoms([[userAtom, user]]);
  return null;
};

export default StoreHydrate;
