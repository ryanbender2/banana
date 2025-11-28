import * as schema from '@/db/schema';
import * as Pg from '@effect/sql-drizzle/Pg';
import { PgClient } from '@effect/sql-pg';
import { Effect } from 'effect';

export class Database extends Effect.Service<Database>()('Database', {
  effect: Pg.make({ schema }),
  dependencies: [PgClient.layer({ database: 'public' })],
}) {}
