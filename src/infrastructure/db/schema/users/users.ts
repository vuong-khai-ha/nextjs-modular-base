import {
  pgTable,
  bigserial,
  varchar,
  smallint,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { userSessions } from './sessions'

export const users = pgTable(
  'users',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    username: varchar('username', { length: 50 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    passwordDigest: varchar('password_digest', { length: 255 }).notNull(),
    role: smallint('role').default(0).notNull(),
    status: smallint('status').default(1).notNull(),
    fullName: varchar('full_name', { length: 255 }),
    avatarUrl: varchar('avatar_url', { length: 255 }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
      .defaultNow()
      .notNull(),
  },
  (users) => {
    return {
      usernameIndex: uniqueIndex('index_users_on_username').on(users.username),
      emailIndex: uniqueIndex('index_users_on_email').on(users.email),
    }
  },
)

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(userSessions, {
    relationName: 'userSessions',
  }),
}))
