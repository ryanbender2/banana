import {
  boolean,
  integer,
  serial,
  pgTable as table,
  text,
} from 'drizzle-orm/pg-core';

export const usersAllowedToAccessApp = table('users_allowed_to_access_app', {
  id: serial().primaryKey(),
  email: text().notNull(),
});

export type UserAllowedToAccessApp =
  typeof usersAllowedToAccessApp.$inferSelect;

export const servers = table('servers', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  port: text().notNull(),
  containerId: text(),
  status: text().notNull().default('STOPPED'),
  worldId: integer('world_id').references(() => worlds.id),
});

export type Server = typeof servers.$inferSelect;

export const worldOwners = table('world_owners', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
});

export type WorldOwner = typeof worldOwners.$inferSelect;

export const worlds = table('worlds', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  description: text(),
  ownerId: integer('owner_id').references(() => worldOwners.id),
  directory: text().notNull(),
  difficulty: text().notNull().default('normal'),
  hardcore: boolean().notNull().default(false),
  mode: text().notNull().default('survival'),
});

export type World = typeof worlds.$inferSelect;
