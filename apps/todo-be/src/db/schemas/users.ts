import {
  pgTable,
  serial,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/pg-core';
import crypto from 'crypto';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: varchar('name'),
    email: varchar('email').notNull(),
    password: varchar('password_digest').notNull(),
    resourceId: varchar('resource_id')
      .notNull()
      .$defaultFn(() => crypto.randomBytes(12).toString('hex')),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => ({
    uniqueEmail: unique().on(t.email),
    uniqueResourceId: unique().on(t.resourceId),
  })
);

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
