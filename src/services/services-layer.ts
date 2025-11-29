import { Layer } from 'effect';
import { Supabase } from './supabase';
import { Database } from './db';
import { Docker } from './docker';

export const AppServices = Layer.mergeAll(
  Supabase.Default,
  Database.Default,
  Docker.Default,
);
