import { pgTable as table, serial, text, uuid } from 'drizzle-orm/pg-core';

/** Contains user information to be used for various app purposes. */
export const user = table('user', {
  id: uuid().notNull(),
  name: text(),
  avatarPath: text('avatar_path'),
});

export const usersAllowedToAccessApp = table('users_allowed_to_access_app', {
  id: serial().primaryKey(),
  email: text().notNull(),
});
