'use server';

import { Database } from '@/services/db';
import { AppServices } from '@/services/services-layer';
import { Effect } from 'effect';
import { Server } from '@/db/schema';

export const getServers = async (): Promise<Server[]> =>
  Effect.gen(function* () {
    const db = yield* Database;
    return yield* db.query.servers.findMany();
  }).pipe(
    Effect.catchTag('SqlError', () => Effect.succeed([])),
    Effect.provide(AppServices),
    Effect.runPromise,
  );
