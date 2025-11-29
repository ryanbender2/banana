'use server';

import * as schema from '@/db/schema';
import { Database } from '@/services/db';
import { Docker } from '@/services/docker';
import { AppServices } from '@/services/services-layer';
import { NodeContext } from '@effect/platform-node';
import { FileSystem } from '@effect/platform/FileSystem';
import { eq } from 'drizzle-orm';
import { Data, Effect } from 'effect';

class WorldNotFoundError extends Data.TaggedError('WorldNotFoundError')<{
  worldId: number;
}> {}

interface StartServerProps {
  serverId: number;
  port: string;
  worldId: number;
  /**
   * The image to use for the server.
   * @default 'itzg/minecraft-server'
   */
  image?: string;
  /**
   * The version of the image to use for the server.
   * @default 'latest'
   */
  version?: string;
  /**
   * The image declares an initial and maximum Java memory-heap limit of 1 GB.
   * @default '5G'
   */
  memory?: string;
}

export const startServer = async (props: StartServerProps) =>
  Effect.gen(function* () {
    const {
      serverId,
      port,
      worldId,
      image = 'itzg/minecraft-server',
      version = 'latest',
      memory = '5G',
    } = props;
    const docker = yield* Docker;
    const db = yield* Database;
    const fs = yield* FileSystem;

    const world = yield* db.query.worlds.findFirst({
      where: eq(schema.worlds.id, worldId),
    });

    if (!world) {
      return yield* Effect.fail(new WorldNotFoundError({ worldId }));
    }

    if (!(yield* fs.exists(world.directory))) {
      return yield* Effect.fail(new WorldNotFoundError({ worldId }));
    }

    const container = yield* docker.createContainer({
      Image: `${image}:${version}`,
      Env: [
        'TYPE=SPIGOT',
        `MEMORY=${memory}`,
        `DIFFICULTY=${world.difficulty}`,
        `HARDCORE=${world.hardcore}`,
        `MODE=${world.mode}`,
      ],
      HostConfig: {
        PortBindings: {
          '25565/tcp': [
            {
              HostIp: '0.0.0.0',
              HostPort: port,
            },
          ],
        },
        Mounts: [
          {
            Type: 'bind',
            Source: world.directory,
            Target: '/data',
          },
        ],
      },
    });

    yield* db
      .update(schema.servers)
      .set({
        containerId: container.id,
        worldId: worldId,
      })
      .where(eq(schema.servers.id, serverId));
  }).pipe(
    Effect.provide(AppServices),
    Effect.provide(NodeContext.layer),
    Effect.either,
    Effect.runPromise,
  );
