import { integer, serial, pgTable as table, text } from 'drizzle-orm/pg-core';

export const usersAllowedToAccessApp = table('users_allowed_to_access_app', {
  id: serial().primaryKey(),
  email: text().notNull(),
});

export const servers = table('servers', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  address: text().notNull(),
  port: text().notNull(),
  containerId: text(),
  worldId: integer('world_id').references(() => worlds.id),
});

export const worldOwners = table('world_owners', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
});

export const worlds = table('worlds', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  description: text(),
  ownerId: integer('owner_id').references(() => worldOwners.id),
  directory: text().notNull(),
});
