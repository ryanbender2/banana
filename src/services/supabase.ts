import { createClient } from '@/lib/supabase/server';
import { Effect } from 'effect';

/** Supabase client service. */
export class Supabase extends Effect.Service<Supabase>()('Supabase', {
  effect: Effect.promise(() => createClient()),
}) {}
