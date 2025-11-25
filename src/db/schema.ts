import { pgTable as table, text, uuid } from 'drizzle-orm/pg-core';

export const user = table('user', {
  id: uuid().notNull(),
  name: text(),
  avatarPath: text('avatar_path'),
});
