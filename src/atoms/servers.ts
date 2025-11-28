import { InferSelectModel } from 'drizzle-orm';
import { atom } from 'jotai';
import * as schema from '@/db/schema';

export const serversAtom = atom<InferSelectModel<typeof schema.servers>[]>([]);
